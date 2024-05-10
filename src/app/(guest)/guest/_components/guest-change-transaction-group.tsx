'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Transaction } from '@/types'
import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import { TransactionsContext } from './guest-provider'

interface GuestChangeTransactionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  transactionGroupId: string
  transaction: Transaction
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsDisable?: React.Dispatch<React.SetStateAction<boolean>>
}

const formSchema = z.object({
  groupId: z.string().min(1),
})

export const GuestChangeTransactionGroup = ({
  open,
  setOpen,
  children,
  setIsDisable,
  transaction,
  transactionGroupId,
}: GuestChangeTransactionGroupProps) => {
  const guest = React.useContext(TransactionsContext)

  const form = useForm<z.z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupId: transactionGroupId,
    },
  })

  const processForm: SubmitHandler<z.infer<typeof formSchema>> = async (values: z.infer<typeof formSchema>) => {
    if (values.groupId !== transactionGroupId) {
      guest.updateTransaction({ ...transaction, group_id: values.groupId })
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
                      {guest.groups?.map((group, index) => {
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
