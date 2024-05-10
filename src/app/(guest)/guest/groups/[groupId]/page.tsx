'use client'

import { GuestDeleteGroupDialog } from '@/app/(guest)/guest/_components/guest-delete-group-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { CreateGroupSchema, createGroupSchema } from '@/lib/validations/group'
import { zodResolver } from '@hookform/resolvers/zod'
import { notFound } from 'next/navigation'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { TransactionsContext } from '../../_components/guest-provider'

type GroupPageProps = {
  params: {
    groupId: string
  }
}

export default function Page(params: GroupPageProps) {
  const groupId = params.params.groupId
  const guest = React.useContext(TransactionsContext)

  const form = useForm<CreateGroupSchema>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      title: '',
    },
  })

  const group = guest.groups.find((group) => group.id === groupId)
  if (!group) return notFound()

  const onSubmit = (formData: CreateGroupSchema) => guest.updateGroup({ ...group, ...formData })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xs:flex-row xs:items-center xs:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{group.title}</h2>
      </div>

      <Card as="section">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Update your group</CardTitle>
          <CardDescription>Update your group name or delete it</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className={cn('grid w-full max-w-xl gap-5')}
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
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
              <div className="flex flex-col gap-2 xs:flex-row">
                <Button type="submit">Update group</Button>

                <GuestDeleteGroupDialog groupId={group.id} />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
