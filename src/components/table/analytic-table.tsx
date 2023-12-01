'use client'

import { cn } from '@/lib/utils'
import { Transaction } from '@/types'
import { HTMLAttributes } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

type AnalyticTableProps = {
  transactions: Transaction[]
} & HTMLAttributes<HTMLDivElement>

export const AnalyticTable = ({
  className,
  transactions,
}: AnalyticTableProps) => {
  const data = transactions
    .map((item) => ({
      id: item.id,
      type: item.type,
      product: item.product,
      amount: item.amount,
    }))
    .reverse()
    .slice(0, 20)

  return (
    <div
      className={cn(
        'dialog-scroll h-[708px] overflow-hidden overflow-y-scroll rounded-xl border dark:border-neutral-800 ',
        className,
      )}
    >
      <h1 className="mx-2 my-2 text-lg font-medium">Recent Transactions</h1>
      <Table className="">
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow className="">
            <TableHead>Type</TableHead>
            <TableHead>Product</TableHead>
            <TableHead className="w-[100px]">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {data.map((transaction) => {
            const { amount, id, product, type } = transaction

            const isNegative = type === 'expense'
            const amountFixed = Number(amount.toFixed(2))

            const formatted = new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(isNegative ? amountFixed * -1 : amountFixed)

            return (
              <TableRow key={id}>
                <TableCell
                  className={cn(
                    'text-sm font-medium capitalize',
                    type === 'expense' ? 'text-red-500' : null,
                  )}
                >
                  {type}
                </TableCell>
                <TableCell className="text-xs">{product}</TableCell>
                <TableCell
                  className={cn(
                    'text-xs',
                    type === 'expense' ? 'text-red-500' : null,
                  )}
                >
                  {formatted}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
