'use client'

import { updateTransactionGroup } from '@/actions/server/transactions'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useGroups } from '@/hooks/use-groups'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, HTMLAttributes, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Separator } from '../ui/separator'

interface ChangeTransactionGroupProps extends HTMLAttributes<HTMLDivElement> {
  transactionId: string
  transactionGroupId: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setIsDisable?: Dispatch<SetStateAction<boolean>>
}

const formSchema = z.object({
  groupId: z.string().min(1),
})

export const ChangeTransactionGroup = ({
  open,
  setOpen,
  children,
  setIsDisable,
  transactionId,
  transactionGroupId,
}: ChangeTransactionGroupProps) => {
  const { data: transactionsGroups } = useGroups()

  const form = useForm<z.z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupId: transactionGroupId,
    },
  })

  const processForm: SubmitHandler<z.infer<typeof formSchema>> = async (values: z.infer<typeof formSchema>) => {
    if (values.groupId !== transactionGroupId) {
      const oldGroupId = transactionGroupId
      const newGroupId = values.groupId
      await updateTransactionGroup(transactionId, oldGroupId, newGroupId)
    }

    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        setIsDisable?.(false)
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="dialog-scroll max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Change Group</DialogTitle>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
            <FormField
              control={form.control}
              name="groupId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Group
                    <Required />
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a group" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {transactionsGroups?.map((group, index) => {
                        return (
                          <SelectItem className="capitalize" key={index} value={group.id}>
                            {group.title}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-1">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => {
                  setIsDisable?.(false)
                  setOpen(false)
                }}
              >
                Close
              </Button>
              <Button size="sm" type="submit">
                Change
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

const Required = () => <span className="text-red-500"> *</span>