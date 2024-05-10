'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { CreateGroupSchema, createGroupSchema } from '@/lib/validations/group'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { TransactionsContext } from './guest-provider'

interface GuestCreateGroupDialogProps extends React.ComponentPropsWithoutRef<typeof Dialog> {
  userId: string | null | undefined
}

export function GuestCreateGroupDialog({ userId, onOpenChange, ...props }: GuestCreateGroupDialogProps) {
  const guest = React.useContext(TransactionsContext)
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 640px)')

  const form = useForm<CreateGroupSchema>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      title: '',
    },
  })

  async function onSubmit(input: CreateGroupSchema) {
    if (!userId) return

    const newGroupId = String(Math.floor(Math.random() * 1000000000))

    guest.createGroup({
      ...input,
      user_id: userId,
      created_at: new Date().toString(),
      id: newGroupId,
    })

    toast.success('Group created')

    setLoading(false)
    onOpenChange?.(false)
    form.reset()

    router.push(`/guest/groups/${newGroupId}`)
  }

  if (isDesktop) {
    return (
      <Dialog
        onOpenChange={(open) => {
          if (!open) {
            form.reset()
          }
          onOpenChange?.(open)
        }}
        {...props}
      >
        {onOpenChange ? null : (
          <DrawerTrigger asChild>
            <Button size="sm">Create group</Button>
          </DrawerTrigger>
        )}
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create a new group</DialogTitle>
            <DialogDescription>Create a new group to manage your transactions</DialogDescription>
          </DialogHeader>
          <CreateGroupForm form={form} onSubmit={onSubmit}>
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
                Add group
              </Button>
            </DialogFooter>
          </CreateGroupForm>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer
      onOpenChange={(open) => {
        if (!open) {
          form.reset()
        }
        onOpenChange?.(open)
      }}
      {...props}
    >
      {onOpenChange ? null : (
        <DrawerTrigger asChild>
          <Button size="sm">Create group</Button>
        </DrawerTrigger>
      )}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create a new group</DrawerTitle>
          <DrawerDescription>Create a new group to manage your transactions</DrawerDescription>
        </DrawerHeader>
        <CreateGroupForm form={form} onSubmit={onSubmit} className="px-4">
          <DrawerFooter className="flex-col-reverse px-0">
            <DrawerClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DrawerClose>
            <Button type="submit" disabled={loading}>
              {loading && <Icons.spinner className="mr-2 size-4 animate-spin" aria-hidden="true" />}
              Add group
            </Button>
          </DrawerFooter>
        </CreateGroupForm>
      </DrawerContent>
    </Drawer>
  )
}

interface CreateGroupFormProps extends Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> {
  children: React.ReactNode
  form: UseFormReturn<CreateGroupSchema>
  onSubmit: (data: CreateGroupSchema) => void
}

function CreateGroupForm({ children, form, onSubmit, className, ...props }: CreateGroupFormProps) {
  return (
    <Form {...form}>
      <form
        className={cn('grid w-full gap-4', className)}
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        {...props}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Type group name here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  )
}
