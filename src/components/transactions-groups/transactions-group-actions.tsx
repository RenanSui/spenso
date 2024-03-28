'use client'

import { cn } from '@/lib/utils'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { HTMLAttributes, useState } from 'react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { DeleteTransactionsGroup } from './delete-transactions-group'
import { UpdateTransactionsGroup } from './update-transactions-group'

interface TransactionsGroupActionsProps extends HTMLAttributes<HTMLDivElement> {
  groupId: string
  title: string
}

export const TransactionsGroupActions = ({ groupId, title }: TransactionsGroupActionsProps) => {
  const [isDisabled, setIsDisabled] = useState(false)

  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)

  return (
    <div>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={isDisabled}
            variant="ghost"
            size="icon"
            className={cn('px-0', isDisabled ? 'bg-red-400' : '')}
          >
            <span className="sr-only">Open menu</span>
            <DotsVerticalIcon
              className={cn(
                'transition-all duration-300',
                open ? 'rotate-90' : '',
                isDisabled ? 'rotate-90 text-red-900' : '',
              )}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsDisabled(true)
              setOpenUpdate(true)
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              'bg-red-500 text-white shadow-sm hover:bg-red-700 focus:bg-red-700 focus:text-white dark:focus:bg-red-700',
            )}
            onClick={() => {
              setIsDisabled(true)
              setOpenDelete(true)
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateTransactionsGroup
        title={title}
        groupId={groupId}
        open={openUpdate}
        setOpen={setOpenUpdate}
        setIsUpdating={setIsDisabled}
      />

      <DeleteTransactionsGroup
        groupId={groupId}
        open={openDelete}
        setOpen={setOpenDelete}
        setIsDeleting={setIsDisabled}
      />
    </div>
  )
}
