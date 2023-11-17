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
import { Transaction } from '@/types/transactions'
import { Column, ColumnDef } from '@tanstack/react-table'
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react'
import { ReactNode } from 'react'

export const TransactionColumns: ColumnDef<Transaction>[] = [
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
    accessorKey: 'transaction_type',
    header: ({ column }) => (
      <SortableHeader column={column}>Type</SortableHeader>
    ),
    cell: ({ row }) => {
      const transactionType = String(row.getValue('transaction_type'))
      return <span className="capitalize">{transactionType}</span>
    },
  },
  {
    accessorKey: 'product',
    header: ({ column }) => (
      <SortableHeader column={column}>Product</SortableHeader>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <SortableHeader column={column}>Amount</SortableHeader>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <SortableHeader column={column}>Category</SortableHeader>
    ),
    cell: ({ row }) => {
      const category = String(row.getValue('category'))
      return <span className="capitalize">{category}</span>
    },
  },
  {
    accessorKey: 'transaction_date',
    header: ({ column }) => (
      <SortableHeader column={column}>Date</SortableHeader>
    ),
    cell: ({ row }) => {
      const transactionDate = String(row.getValue('transaction_date'))
      return transactionDate.replaceAll('-', '/')
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original

      return (
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
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="bg-red-500 text-white shadow-sm hover:bg-red-700 focus:bg-red-700 focus:text-white dark:focus:bg-red-700">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const SortableHeader = ({
  children,
  column,
}: {
  children: ReactNode
  column: Column<Transaction, unknown>
}) => (
  <Button
    className="dark:hover:bg-neutral-800"
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  >
    {children}
    <ChevronsUpDown className="ml-2 h-3 w-3" />
  </Button>
)
