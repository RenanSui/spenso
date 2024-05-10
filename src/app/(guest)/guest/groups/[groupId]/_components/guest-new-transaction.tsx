'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { GuestTransactionForm } from '../../../_components/guest-transaction-form'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export const GuestNewTransaction = ({ groupId }: { groupId: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ size: 'sm' }), 'px-6')}>New</DialogTrigger>
      <DialogContent className="dialog-scroll max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <Separator />
        <GuestTransactionForm groupId={groupId} formAction="add" setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
