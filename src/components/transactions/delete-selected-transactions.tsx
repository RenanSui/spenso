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
import { Transaction } from '@/types'
import { Row } from '@tanstack/react-table'
import { Dispatch, HTMLAttributes, SetStateAction } from 'react'

interface DeleteSelectedTransactionsProps extends HTMLAttributes<HTMLDivElement> {
  rows: Row<unknown>[]
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  resetRows: (defaultState?: boolean | undefined) => void
}

export const DeleteSelectedTransaction = ({
  children,
  className,
  rows,
  open,
  setOpen,
  resetRows,
}: DeleteSelectedTransactionsProps) => {
  const deleteSelections = () => {
    const transactions = rows.map((row) => row.original) as Transaction[]
    transactions.forEach(async (transaction) => await deleteTransaction(transaction.id, transaction.group_id ?? ''))
    resetRows()
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className={cn(className)}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all your selected transactions.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteSelections()}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
