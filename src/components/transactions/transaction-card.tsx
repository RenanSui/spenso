'use client'

import { cn } from '@/lib/utils'
import { Transaction } from '@/types'
import { HTMLAttributes } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'

interface TransactionCardProps extends HTMLAttributes<HTMLDivElement> {
  data: Transaction[]
}

export const TransactionCard = ({
  className,
  data: transactions,
}: TransactionCardProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {transactions.map((transaction) => {
        const amount = parseFloat(transaction.amount)
        const formatted = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(amount)

        const isExpense = transaction.transaction_type === 'expense'

        return (
          <Card className={cn(' w-full', className)} key={transaction.id}>
            <CardHeader>
              <CardTitle>{transaction.product}</CardTitle>
              <CardDescription>{transaction.merchant_name}</CardDescription>
            </CardHeader>
            <CardContent>{transaction.description}</CardContent>
            <CardFooter className="flex justify-between">
              <CardDescription
                className={cn(
                  isExpense ? 'text-red-500 dark:text-red-400' : '',
                )}
              >
                {isExpense ? '- ' : null}
                {formatted}
              </CardDescription>
              <CardDescription>
                {transaction.transaction_date.replaceAll('-', '/')}
              </CardDescription>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
