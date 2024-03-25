'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { SetStateAction } from 'jotai'
import { Dispatch, HTMLAttributes } from 'react'
import { Separator } from '../ui/separator'
import { TransactionsGroupForm } from './transactions-group-form'

interface UpdateTransactionsGroupProps extends HTMLAttributes<HTMLDivElement> {
  groupId: string
  title: string
  setIsUpdating: Dispatch<SetStateAction<boolean>>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const UpdateTransactionsGroup = ({
  groupId,
  setIsUpdating,
  title,
  open,
  setOpen,
}: UpdateTransactionsGroupProps) => {
  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> Update Group</AlertDialogTitle>
          </AlertDialogHeader>
          <Separator />
          <TransactionsGroupForm
            formAction="update"
            groupId={groupId}
            title={title}
            setOpen={setOpen}
            setIsUpdating={setIsUpdating}
          />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
