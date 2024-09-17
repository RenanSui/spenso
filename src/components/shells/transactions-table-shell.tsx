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
import { transactionTypeses } from '@/config/dashboard'
import { useMounted } from '@/hooks/use-mounted'
import { cn, formatValue } from '@/lib/utils'
import { type CurrencyRates, type Transaction, type TransactionInsert, type TransactionUpdate } from '@/types'
import { type Column, type ColumnDef } from '@tanstack/react-table'
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react'
import React, { type ReactNode, useEffect, useState } from 'react'
import { DataTable } from '../data-table/data-table'
import { useCurrencyAtom } from '../providers/currency-provider'
import { ChangeTransactionGroup } from '../transactions/change-transaction-group'
import { DeleteTransaction } from '../transactions/delete-transaction'
import { UpdateTransaction } from '../transactions/update-transaction'

interface TransactionsTableShellProps {
  data: Transaction[]
  rates: (CurrencyRates | null)[]
  groupId?: string
  addTransaction?: (formData: TransactionInsert) => unknown
  updateTransaction?: (formData: TransactionUpdate) => unknown
  updateTransactionGroup?: (transactionId: string, oldGroupId: string, newGroupId: string) => unknown
  deleteTransaction?: (transactionId: string) => unknown
}

export function TransactionsTableShell({
  data: transactions,
  rates,
  groupId,
  addTransaction,
  updateTransaction,
  updateTransactionGroup,
  deleteTransaction,
}: TransactionsTableShellProps) {
  const currencyState = useCurrencyAtom()
  const mounted = useMounted()

  const columns = React.useMemo<ColumnDef<Transaction, unknown>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) =>
          groupId ? (
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value: unknown) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          ) : null,
        cell: ({ row }) =>
          groupId ? (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value: unknown) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          ) : null,
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
        filterFn: (row, id, value: string[]) => {
          return value.includes(String(row.getValue(id)))
        },
      },
      {
        accessorKey: 'product',
        header: ({ column }) => <SortableHeader column={column}>Item</SortableHeader>,
      },
      {
        accessorKey: 'amount',
        header: ({ column }) => <SortableHeader column={column}>Amount</SortableHeader>,
        cell: ({ row }) => {
          const type = row.getValue('type')

          const returnFormatted = () => {
            const amount = parseFloat(row.getValue('amount'))
            const currency = String(row.getValue('currency'))

            const transactionRates = rates.find((item) => item?.base === currency)
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
        cell: ({ row }) =>
          groupId ? (
            <TableDropdown
              updateTransaction={updateTransaction}
              transaction={row.original}
              updateTransactionGroup={updateTransactionGroup}
              deleteTransaction={deleteTransaction}
            />
          ) : null,
      },
    ],
    [currencyState, deleteTransaction, groupId, rates, updateTransaction, updateTransactionGroup],
  )

  return mounted ? (
    <DataTable
      groupId={groupId}
      data={transactions}
      columns={columns}
      addTransaction={addTransaction}
      deleteTransaction={deleteTransaction}
      searchableColumns={[{ id: 'product', title: 'Product' }]}
      filterableColumns={[{ id: 'type', title: 'Type', options: transactionTypeses }]}
    />
  ) : null
}

const SortableHeader = ({ children, column }: { children: ReactNode; column: Column<Transaction, unknown> }) => (
  <Button
    className="text-xs dark:text-neutral-400 dark:hover:bg-neutral-800"
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  >
    {children}
    <ChevronsUpDown className="ml-2 size-3" />
  </Button>
)

type TableDropdownProps = {
  transaction: Transaction
  updateTransaction?: (formData: TransactionUpdate) => unknown
  updateTransactionGroup?: (transactionId: string, oldGroupId: string, newGroupId: string) => unknown
  deleteTransaction?: (transactionId: string) => unknown
}

const TableDropdown = ({
  transaction,
  updateTransactionGroup,
  deleteTransaction,
  updateTransaction,
}: TableDropdownProps) => {
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
          <Button disabled={isDisable} variant="ghost" className={cn('size-8 p-0', isDisable ? 'bg-red-400' : '')}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal
              className={cn(
                'size-4 transition-all duration-300',
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
          <DropdownMenuItem onClick={() => handleUpdate(true)}>Duplicate</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleChangeGroup()}>Change Group</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDelete()} title="destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {updateTransaction ? (
        <UpdateTransaction
          open={openUpdate}
          setOpen={setUpdate}
          transaction={transaction}
          setIsDisable={setIsDisable}
          isDuplicateItem={openDuplicate}
          updateTransaction={updateTransaction}
        />
      ) : null}

      {updateTransactionGroup ? (
        <ChangeTransactionGroup
          open={openChangeGroup}
          setOpen={setChangeGroup}
          setIsDisable={setIsDisable}
          transaction={transaction}
          updateTransactionGroup={updateTransactionGroup}
        />
      ) : null}

      {deleteTransaction ? (
        <DeleteTransaction
          open={openDelete}
          setOpen={setDelete}
          transactionId={transaction.id}
          setIsDisable={setIsDisable}
          deleteTransaction={deleteTransaction}
        />
      ) : null}
    </>
  )
}
