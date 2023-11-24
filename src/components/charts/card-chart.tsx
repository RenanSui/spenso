'use client'

import { Transaction } from '@/types'
import { HTMLAttributes } from 'react'
import { AnalyticCard } from '../cards/analytic-card'

type CardChartShellProps = {
  transactions: Transaction[]
} & HTMLAttributes<HTMLDivElement>

export const CardChartShell = ({
  transactions,
  className,
}: CardChartShellProps) => {
  const wallet = {
    totals: { length: 0, value: 0 },
    revenue: { length: 0, value: 0 },
    expenses: { length: 0, value: 0 },
  }

  transactions?.forEach((item) => {
    if (item.type === 'income') {
      wallet.revenue.value += item.amount
      wallet.revenue.length++
    }
    if (item.type === 'expense') {
      wallet.expenses.value -= item.amount
      wallet.expenses.length++
    }
  })

  wallet.totals.value = wallet.revenue.value + wallet.expenses.value
  wallet.totals.length = wallet.revenue.length + wallet.expenses.length

  return (
    <>
      <AnalyticCard
        className={className}
        wallet={wallet.totals}
        title="total"
      />
      <AnalyticCard
        className={className}
        wallet={wallet.revenue}
        title="total profit"
      />
      <AnalyticCard
        className={className}
        wallet={wallet.expenses}
        title="total expenses"
      />
    </>
  )
}
