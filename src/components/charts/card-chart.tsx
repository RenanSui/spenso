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

  const revenueFiltered = sums.filter((item) => item >= 0)
  const expensesFiltered = sums.filter((item) => item < 0)

  const revenueValue = revenueFiltered.reduce((acc, curr) => acc + curr, 0)
  const expensesValue = expensesFiltered.reduce((acc, curr) => acc + curr, 0)

  const revenue = {
    length: revenueFiltered.length,
    value: parseFloat(revenueValue.toFixed(2)),
  }
  const expenses = {
    length: expensesFiltered.length,
    value: parseFloat(expensesValue.toFixed(2)),
  }

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
