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
import { HTMLAttributes, useState } from 'react'
import { Icons } from '../ui/icons'

interface DeleteTransactionProps extends HTMLAttributes<HTMLDivElement> {
  transactionId: string
}

export const DeleteTransaction = ({
  children,
  className,
  transactionId,
}: DeleteTransactionProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const DeleteTransaction = () => deleteTransaction(transactionId)

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50',
          'w-full bg-red-500 text-white shadow-sm hover:bg-red-700 focus:bg-red-700 focus:text-white dark:focus:bg-red-700',
          className,
        )}
      >
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            transaction and remove your data from our servers.
            {transactionId}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setIsLoading(true)
              DeleteTransaction()
            }}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
