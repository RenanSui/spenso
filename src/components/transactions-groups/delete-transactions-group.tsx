'use client'

import { deleteTransactionsGroup } from '@/actions/server/transactions-groups'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Dispatch, HTMLAttributes, SetStateAction } from 'react'

interface DeleteTransactionsGroupProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  groupId: string
  setOpen: Dispatch<SetStateAction<boolean>>
  setIsDeleting: Dispatch<SetStateAction<boolean>>
}

export const DeleteTransactionsGroup = ({ open, groupId, setOpen, setIsDeleting }: DeleteTransactionsGroupProps) => {
  const DeleteTransactionGroup = async () => {
    setIsDeleting(true)
    await deleteTransactionsGroup(groupId)
  }

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Group</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your group.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleting(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => DeleteTransactionGroup()}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
