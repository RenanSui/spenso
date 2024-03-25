'use client'

import { currencyStateAtom } from '@/atoms/global'
import { cn, formatValue } from '@/lib/utils'
import { CurrencyRates, Transaction } from '@/types'
import { useAtom } from 'jotai'
import { HTMLAttributes, useMemo } from 'react'
import { CurrencyToggle } from '../currency-toggle'
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
  rates: CurrencyRates[]
} & HTMLAttributes<HTMLDivElement>

export const AnalyticTable = ({ className, transactions, rates }: AnalyticTableProps) => {
  const [currencyState] = useAtom(currencyStateAtom)

  const data = useMemo(() => {
    return transactions
      .map((item) => {
        const returnCalculatedAmount = () => {
          const amount = item.amount
          const currency = item.currency

          const transactionRates = rates.find((item) => item.base === currency)
          const currencyRate = transactionRates?.rates[currencyState] ?? 1
          const newAmount = parseFloat((amount * currencyRate).toFixed(2))

          return newAmount
        }

        const calculatedAmount = returnCalculatedAmount()

        return {
          id: item.id,
          type: item.type,
          product: item.product,
          amount: calculatedAmount,
        }
      })
      .reverse()
      .slice(0, 20)
  }, [currencyState, rates, transactions])

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

            const formatted = formatValue(amount, currencyState)

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
