'use client'

import { currencyStateAtom } from '@/atoms/global'
import { cn, formatValue } from '@/lib/utils'
import { Transaction } from '@/types'
import { useAtom } from 'jotai'
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
import { CurrencyToggle } from '../currency-toggle'

type AnalyticTableProps = {
  transactions: Transaction[]
} & HTMLAttributes<HTMLDivElement>

export const AnalyticTable = ({ className, transactions }: AnalyticTableProps) => {
  const [currency] = useAtom(currencyStateAtom)

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
      <div className="flex items-center justify-between p-1">
        <h1 className="p-1 text-lg font-medium">Recent Transactions</h1>
        <CurrencyToggle />
      </div>
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

            const formatted = formatValue(amount, currency)

            return (
              <TableRow key={id}>
                <TableCell
                  className={cn(
                    'text-sm font-medium capitalize',
                    type === 'expense' ? 'text-red-400' : null,
                  )}
                >
                  {type}
                </TableCell>
                <TableCell className="text-xs">{product}</TableCell>
                <TableCell
                  className={cn('text-xs', type === 'expense' ? 'text-red-400' : null)}
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
