'use client'

import { addTransactionsGroup, updateTransactionsGroup } from '@/actions/server/transactions-groups'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const formSchema = z.object({
  title: z.string().min(1),
})

export const TransactionsGroupForm = ({
  formAction,
  setOpen,
  setIsUpdating,
  groupId,
  title,
}: {
  setOpen?: Dispatch<SetStateAction<boolean>>
  setIsUpdating?: Dispatch<SetStateAction<boolean>>
  formAction: 'add' | 'update'
  groupId?: string
  title?: string
}) => {
  const form = useForm<z.z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title ?? '',
    },
  })

  const processForm: SubmitHandler<z.infer<typeof formSchema>> = async (values: z.infer<typeof formSchema>) => {
    if (formAction === 'add') {
      await addTransactionsGroup({ ...values })
    }

    if (formAction === 'update') {
      await updateTransactionsGroup({ ...values, id: groupId })
      setIsUpdating?.(false)
    }

    setOpen?.(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(processForm)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Title
                <Required />
              </FormLabel>
              <FormControl>
                <Input placeholder="Ex: Finances" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-2">
          {formAction === 'update' ? (
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => {
                setOpen?.(false)
                setIsUpdating?.(false)
              }}
            >
              Cancel
            </Button>
          ) : (
            ''
          )}
          <Button size="sm" type="submit">
            {formAction === 'add' ? 'Submit' : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

const Required = () => <span className="text-red-500"> *</span>
