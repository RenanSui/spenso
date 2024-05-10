'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import * as React from 'react'

import { TransactionsContext } from './guest-provider'

interface GuestDeleteTransactionProps extends React.HTMLAttributes<HTMLDivElement> {
  transactionId: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsDisable: React.Dispatch<React.SetStateAction<boolean>>
}

export const GuestDeleteTransaction = ({
  open,
  setOpen,
  children,
  className,
  setIsDisable,
  transactionId,
}: GuestDeleteTransactionProps) => {
  const guest = React.useContext(TransactionsContext)
  const deleteTransaction = async () => guest.deleteTransaction(transactionId)

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className={cn(className)}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your transaction.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsDisable(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteTransaction()
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
