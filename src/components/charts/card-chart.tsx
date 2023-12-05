'use client'

import { Transaction } from '@/types'
import { HTMLAttributes } from 'react'
import { AnalyticCard } from '../cards/analytic-card'

type CardChartShellProps = {
  transactions: Transaction[]
} & HTMLAttributes<HTMLDivElement>

export const CardChartShell = ({
  transactions: data,
  className,
}: CardChartShellProps) => {
  const sums = data.map((item) => item.amount)

  const revenueFilter = sums.filter((item) => item >= 0)
  const expensesFilter = sums.filter((item) => item < 0)

  const revenueValue = revenueFilter.reduce((acc, curr) => acc + curr, 0)
  const expensesValue = expensesFilter.reduce((acc, curr) => acc + curr, 0)

  const revenue = { length: revenueFilter.length, value: revenueValue }
  const expenses = { length: expensesFilter.length, value: expensesValue }
  const totals = {
    length: revenue.length + expenses.length,
    value: revenue.value + expenses.value,
  }

  return (
    <>
      <AnalyticCard
        className={className}
        total={totals.length}
        wallet={totals}
        title="total"
      />
      <AnalyticCard
        className={className}
        total={totals.length}
        wallet={revenue}
        title="total profit"
      />
      <AnalyticCard
        className={className}
        total={totals.length}
        wallet={expenses}
        title="total expenses"
      />
    </>
  )
}
