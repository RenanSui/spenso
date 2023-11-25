'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { transactionTypeses } from '@/lib/transactions'
import { cn } from '@/lib/utils'
import { Transaction } from '@/types'
import { Column, ColumnDef } from '@tanstack/react-table'
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react'
import React, { ReactNode, useState } from 'react'
import { DataTable } from '../data-table/data-table'
import { DeleteTransaction } from '../transactions/delete-transaction'
import { UpdateTransaction } from '../transactions/update-transaction'

interface TransactionsTableShellProps {
  data: Transaction[]
}

export function TransactionsTableShell({
  data: transactions,
}: TransactionsTableShellProps) {
  const columns = React.useMemo<ColumnDef<Transaction, unknown>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value: unknown) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: unknown) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'type',
        header: ({ column }) => (
          <SortableHeader column={column}>Type</SortableHeader>
        ),
        cell: ({ row }) => {
          const type = String(row.getValue('type'))
          return (
            <span
              className={cn(
                'capitalize',
                type === 'expense' ? 'text-red-500' : null,
              )}
            >
              {type}
            </span>
          )
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
      {
        accessorKey: 'product',
        header: () => <>Product</>,
      },
      {
        accessorKey: 'amount',
        header: ({ column }) => (
          <SortableHeader column={column}>Amount</SortableHeader>
        ),
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue('amount'))
          const type = row.getValue('type') as 'expense' | 'income'
          const formatted = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(amount)

          return (
            <div
              className={cn(
                'font-medium',
                type === 'expense' ? 'text-red-500' : null,
              )}
            >
              {type === 'expense' ? '- ' : null}
              {formatted}
            </div>
          )
        },
      },
      {
        accessorKey: 'category',
        header: () => <>Category</>,
        cell: ({ row }) => {
          const category = String(row.getValue('category'))
          return <span className="capitalize">{category}</span>
        },
      },
      {
        accessorKey: 'date',
        header: ({ column }) => (
          <SortableHeader column={column}>Date</SortableHeader>
        ),
        sortingFn: (itemA, itemB): number => {
          const dateA = new Date(itemA.original.date).getTime()
          const dateB = new Date(itemB.original.date).getTime()

          console.log({ dateA, dateB })

          return dateA < dateB ? 1 : dateA > dateB ? -1 : 0
        },
        cell: ({ row }) => {
          const date = new Date(row.getValue('date'))

          const Year = date.getFullYear()
          const Month = String(date.getMonth() + 1).padStart(2, '0')
          const Day = String(date.getDate()).padStart(2, '0')

          return `${Year}/${Month}/${Day}`
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => <TableDropdown transaction={row.original} />,
      },
    ],
    [],
  )

  return (
    <DataTable
      data={transactions}
      columns={columns}
      searchableColumns={[{ id: 'product', title: 'Product' }]}
      filterableColumns={[
        { id: 'type', title: 'Type', options: transactionTypeses },
      ]}
    />
  )
}

const SortableHeader = ({
  children,
  column,
}: {
  children: ReactNode
  column: Column<Transaction, unknown>
}) => (
  <Button
    className="text-xs dark:text-neutral-400 dark:hover:bg-neutral-800"
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  >
    {children}
    <ChevronsUpDown className="ml-2 h-3 w-3" />
  </Button>
)

const TableDropdown = ({ transaction }: { transaction: Transaction }) => {
  const [openDelete, setDelete] = useState(false)
  const [openUpdate, setUpdate] = useState(false)
  const [openDuplicate, setDuplicate] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setUpdate(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDuplicate(true)}>
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem
            className={cn(
              'bg-red-500 text-white shadow-sm hover:bg-red-700 focus:bg-red-700 focus:text-white dark:focus:bg-red-700',
            )}
            onClick={() => setDelete(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateTransaction
        open={openUpdate}
        setOpen={setUpdate}
        transaction={transaction}
      />

      <DeleteTransaction
        open={openDelete}
        setOpen={setDelete}
        transactionId={transaction.id}
      />

      {/* duplicate  */}
      <UpdateTransaction
        open={openDuplicate}
        setOpen={setDuplicate}
        transaction={transaction}
        isDuplicateItem={true}
      />
    </>
  )
}
