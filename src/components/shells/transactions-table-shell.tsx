'use client'

import { currencyStateAtom } from '@/atoms/global'
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
import { transactionTypeses } from '@/config/dashboard'
import { cn, formatValue } from '@/lib/utils'
import { CurrencyRates, Transaction } from '@/types'
import { Column, ColumnDef } from '@tanstack/react-table'
import { useAtom } from 'jotai'
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react'
import React, { ReactNode, useEffect, useState } from 'react'
import { DataTable } from '../data-table/data-table'
import { ChangeTransactionGroup } from '../transactions/change-transaction-group'
import { DeleteTransaction } from '../transactions/delete-transaction'
import { UpdateTransaction } from '../transactions/update-transaction'

interface TransactionsTableShellProps {
  data: Transaction[]
  rates: CurrencyRates[]
  groupId: string
}

export function TransactionsTableShell({ data: transactions, rates, groupId }: TransactionsTableShellProps) {
  const [currencyState] = useAtom(currencyStateAtom)

  const columns = React.useMemo<ColumnDef<Transaction, unknown>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value: unknown) => table.toggleAllPageRowsSelected(!!value)}
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
        header: ({ column }) => <SortableHeader column={column}>Type</SortableHeader>,
        cell: ({ row }) => {
          const type = String(row.getValue('type'))
          return <span className={cn('pl-4 capitalize', type === 'expense' ? 'text-red-400' : null)}>{type}</span>
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
        header: ({ column }) => <SortableHeader column={column}>Amount</SortableHeader>,
        cell: ({ row }) => {
          const type = row.getValue('type') as 'expense' | 'income'

          const returnFormatted = () => {
            const amount = parseFloat(row.getValue('amount'))
            const currency = String(row.getValue('currency'))

            const transactionRates = rates.find((item) => item.base === currency)
            const currencyRate = transactionRates?.rates[currencyState] ?? 1
            const newAmount = parseFloat((amount * currencyRate).toFixed(2))

            return formatValue(newAmount, currencyState)
          }

          const formatted = returnFormatted()

          return <div className={cn('pl-4 font-medium', type === 'expense' ? 'text-red-400' : '')}>{formatted}</div>
        },
      },
      {
        accessorKey: 'category',
        header: ({ column }) => <SortableHeader column={column}>Category</SortableHeader>,
        cell: ({ row }) => {
          const category = String(row.getValue('category'))
          return <span className="pl-4 capitalize">{category}</span>
        },
      },
      {
        accessorKey: 'date',
        header: ({ column }) => <SortableHeader column={column}>Date</SortableHeader>,
        sortingFn: (itemA, itemB): number => {
          const dateA = new Date(itemA.original.date).getTime()
          const dateB = new Date(itemB.original.date).getTime()

          return dateA < dateB ? 1 : dateA > dateB ? -1 : 0
        },
        cell: ({ row }) => {
          const date = new Date(row.getValue('date'))

          const Year = date.getFullYear()
          const Month = String(date.getMonth() + 1).padStart(2, '0')
          const Day = String(date.getDate()).padStart(2, '0')

          return <div className="pl-1">{`${Year}/${Month}/${Day}`}</div>
        },
      },
      {
        accessorKey: 'currency',
        header: ({ column }) => <SortableHeader column={column}>Currency</SortableHeader>,
        cell: ({ row }) => {
          const currency = String(row.getValue('currency'))

          return <div className="pl-4">{currency}</div>
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => <TableDropdown transaction={row.original} />,
      },
    ],
    [currencyState, rates],
  )

  return (
    <DataTable
      groupId={groupId}
      data={transactions}
      columns={columns}
      searchableColumns={[{ id: 'product', title: 'Product' }]}
      filterableColumns={[{ id: 'type', title: 'Type', options: transactionTypeses }]}
    />
  )
}

const SortableHeader = ({ children, column }: { children: ReactNode; column: Column<Transaction, unknown> }) => (
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
  const [open, setOpen] = useState(false)

  const [isDisable, setIsDisable] = useState(false)

  const [openUpdate, setUpdate] = useState(false)
  const [openChangeGroup, setChangeGroup] = useState(false)
  const [openDuplicate, setDuplicate] = useState(false)
  const [openDelete, setDelete] = useState(false)

  useEffect(() => {
    if (!openUpdate) setDuplicate(false)
  }, [openChangeGroup, openUpdate])

  const handleUpdate = (isDuplicate?: boolean) => {
    if (isDuplicate) setDuplicate(true)
    setIsDisable(true)
    setUpdate(true)
  }

  const handleDelete = () => {
    setIsDisable(true)
    setDelete(true)
  }

  const handleChangeGroup = () => {
    setIsDisable(true)
    setChangeGroup(true)
  }

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button disabled={isDisable} variant="ghost" className={cn('h-8 w-8 p-0', isDisable ? 'bg-red-400' : '')}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal
              className={cn(
                'h-4 w-4 transition-all duration-300',
                !open ? '-rotate-90' : '',
                isDisable ? 'text-red-900' : '',
              )}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleUpdate()}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleDelete()} title="destructive">
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUpdate(true)}>Duplicate</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleChangeGroup()}>Change Group</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateTransaction
        open={openUpdate}
        setOpen={setUpdate}
        transaction={transaction}
        setIsDisable={setIsDisable}
        isDuplicateItem={openDuplicate}
      />

      <ChangeTransactionGroup
        open={openChangeGroup}
        setOpen={setChangeGroup}
        setIsDisable={setIsDisable}
        transactionId={transaction.id}
        transactionGroupId={transaction.group_id ?? ''}
      />

      <DeleteTransaction
        open={openDelete}
        setOpen={setDelete}
        transactionId={transaction.id}
        setIsDisable={setIsDisable}
      />
    </>
  )
}
