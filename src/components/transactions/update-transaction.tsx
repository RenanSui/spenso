'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Transaction, TransactionUpdate } from '@/types'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Dispatch, HTMLAttributes, SetStateAction } from 'react'
import { UpdateTransactionForm } from './update-transaction-form'
import { updateTransaction } from '@/actions/server/transactions'

interface UpdateTransactionProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  transaction: Transaction
  isDuplicateItem?: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setIsDisable?: Dispatch<SetStateAction<boolean>>
  updateTransaction: (formData: TransactionUpdate) => unknown
}

export const UpdateTransaction = ({
  open,
  setOpen,
  children,
  transaction,
  setIsDisable,
  isDuplicateItem = false,
}: UpdateTransactionProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setTimeout(() => setIsDisable?.(false), 700)
        setOpen(open)
      }}
    >
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="dialog-scroll max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>{isDuplicateItem ? 'Duplicate' : 'Update'} Transaction</DialogTitle>
        </DialogHeader>
        <Separator />
        <UpdateTransactionForm setOpen={setOpen} transaction={transaction} updateTransaction={updateTransaction} />
      </DialogContent>
    </Dialog>
  )
}
