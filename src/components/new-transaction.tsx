'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { TransactionForm } from './transactions/transaction-form'
import { buttonVariants } from './ui/button'
import { Separator } from './ui/separator'

export const NewTransaction = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn(buttonVariants({ size: 'sm' }), 'px-6')}>
        New
      </DialogTrigger>
      <DialogContent className="dialog-scroll max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <Separator />
        <TransactionForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
