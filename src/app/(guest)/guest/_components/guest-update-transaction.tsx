'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Transaction } from '@/types'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { Dispatch, HTMLAttributes, SetStateAction } from 'react'
import { GuestTransactionForm } from './guest-transaction-form'

interface GuestUpdateTransactionProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean
  transaction: Transaction
  isDuplicateItem?: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setIsDisable?: Dispatch<SetStateAction<boolean>>
}

export const GuestUpdateTransaction = ({
  open,
  setOpen,
  children,
  transaction,
  setIsDisable,
  isDuplicateItem = false,
}: GuestUpdateTransactionProps) => {
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
        <GuestTransactionForm
          formAction={isDuplicateItem ? 'add' : 'update'}
          setOpen={setOpen}
          transaction={transaction}
        />
      </DialogContent>
    </Dialog>
  )
}
