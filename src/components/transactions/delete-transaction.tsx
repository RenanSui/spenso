'use client'

import { deleteTransaction } from '@/actions/server/transactions'
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
import { Dispatch, HTMLAttributes, SetStateAction } from 'react'

interface DeleteTransactionProps extends HTMLAttributes<HTMLDivElement> {
  transactionId: string
  groupId: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setIsDisable: Dispatch<SetStateAction<boolean>>
}

export const DeleteTransaction = ({
  open,
  setOpen,
  groupId,
  children,
  className,
  setIsDisable,
  transactionId,
}: DeleteTransactionProps) => {
  const DeleteTransaction = async () => await deleteTransaction(transactionId, groupId)

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
              DeleteTransaction()
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
