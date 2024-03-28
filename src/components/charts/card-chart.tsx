'use client'

import { currencyStateAtom } from '@/atoms/global'
import { returnCalculatedValue } from '@/lib/transactions'
import { CurrencyRates, Transaction } from '@/types'
import { useAtom } from 'jotai'
import { HTMLAttributes, useMemo } from 'react'
import { AnalyticCard } from '../cards/analytic-card'

type CardChartShellProps = {
  transactions: Transaction[]
  rates: CurrencyRates[]
} & HTMLAttributes<HTMLDivElement>

export const CardChartShell = ({ transactions, className, rates }: CardChartShellProps) => {
  const [currencyState] = useAtom(currencyStateAtom)

  const calculated = useMemo(() => {
    const sums = transactions.map((item) => {
      const { amount, currency } = item
      return returnCalculatedValue(amount, currency, rates, currencyState)
    })

    const revenue = {
      length: sums.filter((item) => item >= 0).length,
      value: sums.filter((item) => item >= 0).reduce((acc, curr) => acc + curr, 0),
    }
    const expenses = {
      length: sums.filter((item) => item < 0).length,
      value: sums.filter((item) => item < 0).reduce((acc, curr) => acc + curr, 0),
    }

    const totals = {
      length: revenue.length + expenses.length,
      value: revenue.value + expenses.value,
    }

    return { totals, revenue, expenses }
  }, [currencyState, transactions, rates])

  return (
    <>
      <AnalyticCard className={className} total={calculated.totals.length} wallet={calculated.totals}>
        total
      </AnalyticCard>

      <AnalyticCard className={className} total={calculated.totals.length} wallet={calculated.revenue}>
        total profit
      </AnalyticCard>

      <AnalyticCard className={className} total={calculated.totals.length} wallet={calculated.expenses}>
        total expenses
      </AnalyticCard>
    </>
  )
}
