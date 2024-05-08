'use client'

import { getCurrencyValue } from '@/lib/transactions'
import { cn, formatValue } from '@/lib/utils'
import { CurrencyRates, Transaction } from '@/types'
import { HTMLAttributes, useMemo } from 'react'
import { CurrencyToggle } from '../currency-toggle'
import { useCurrencyAtom } from '../providers/currency-provider'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

type AnalyticTableProps = {
  transactions: Transaction[]
  rates: (CurrencyRates | null)[]
} & HTMLAttributes<HTMLDivElement>

export const AnalyticTable = ({ className, transactions, rates }: AnalyticTableProps) => {
  const currencyState = useCurrencyAtom()

  const data = useMemo(() => {
    return transactions
      .map((item) => ({ ...item, amount: getCurrencyValue(item.amount, item.currency, rates, currencyState) }))
      .slice(0, 12)
  }, [currencyState, rates, transactions])

  return (
    <div
      className={cn(
        'dialog-scroll overflow-hidden overflow-y-scroll rounded-xl border dark:border-neutral-800 ',
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

            const formatted = formatValue(amount, currencyState)

            return (
              <TableRow key={id}>
                <TableCell
                  className={cn(
                    'text-sm font-medium capitalize',
                    type === 'expense' ? 'text-red-600 dark:text-red-400' : null,
                  )}
                >
                  {type}
                </TableCell>
                <TableCell className="text-xs">{product}</TableCell>
                <TableCell className={cn('text-xs', type === 'expense' ? 'text-red-600 dark:text-red-400' : null)}>
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
