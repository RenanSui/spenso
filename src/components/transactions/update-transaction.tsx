'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Transaction } from '@/types'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Dispatch, HTMLAttributes, SetStateAction } from 'react'
import { TransactionForm } from './transaction-form'

interface UpdateTransactionProps extends HTMLAttributes<HTMLDivElement> {
  transaction: Transaction
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  isDuplicateItem?: boolean
}

export const UpdateTransaction = ({
  children,
  transaction,
  open,
  setOpen,
  isDuplicateItem = false,
}: UpdateTransactionProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="dialog-scroll max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>
            {isDuplicateItem ? 'Duplicate' : 'Update'} Transaction
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <TransactionForm
          formAction={isDuplicateItem ? 'add' : 'update'}
          setOpen={setOpen}
          transaction={transaction}
        />
      </DialogContent>
    </Dialog>
  )
}
