'use client'

import { currencyStateAtom } from '@/atoms/global'
import { CurrencyRates, Transaction } from '@/types'
import { useAtom } from 'jotai'
import { HTMLAttributes, useMemo } from 'react'
import { AnalyticCard } from '../cards/analytic-card'

type CardChartShellProps = {
  transactions: Transaction[]
  rates: CurrencyRates[]
} & HTMLAttributes<HTMLDivElement>

export const CardChartShell = ({
  transactions: data,
  className,
  rates,
}: CardChartShellProps) => {
  const [currencyState] = useAtom(currencyStateAtom)

  // const sums = useMemo(
  //   () =>
  //     data.map((item) => {
  //       const returnCalculatedAmount = () => {
  //         const amount = item.amount
  //         const currency = item.currency

  //         const transactionRates = rates.find((item) => item.base === currency)
  //         const currencyRate = transactionRates?.rates[currencyState] ?? 1
  //         const newAmount = parseFloat((amount * currencyRate).toFixed(2))

  //         return newAmount
  //       }

  //       return returnCalculatedAmount()
  //     }),
  //   [currencyState, data, rates],
  // )

  // const revenueFiltered = sums.filter((item) => item >= 0)
  // const expensesFiltered = sums.filter((item) => item < 0)

  // const revenueValue = revenueFiltered.reduce((acc, curr) => acc + curr, 0)
  // const expensesValue = expensesFiltered.reduce((acc, curr) => acc + curr, 0)

  // const revenue = {
  //   length: revenueFiltered.length,
  //   value: parseFloat(revenueValue.toFixed(2)),
  // }
  // const expenses = {
  //   length: expensesFiltered.length,
  //   value: parseFloat(expensesValue.toFixed(2)),
  // }

  // const totals = {
  //   length: revenue.length + expenses.length,
  //   value: revenue.value + expenses.value,
  // }

  const calculated = useMemo(() => {
    const sums = data.map((item) => {
      const returnCalculatedAmount = () => {
        const amount = item.amount
        const currency = item.currency
        const transactionRates = rates.find((item) => item.base === currency)
        const currencyRate = transactionRates?.rates[currencyState] ?? 1
        const newAmount = parseFloat((amount * currencyRate).toFixed(2))
        return newAmount
      }
      return returnCalculatedAmount()
    })

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

    return {
      totals,
      revenue,
      expenses,
    }
  }, [currencyState, data, rates])

  return (
    <>
      <AnalyticCard
        className={className}
        total={calculated.totals.length}
        wallet={calculated.totals}
        title="total"
      />
      <AnalyticCard
        className={className}
        total={calculated.totals.length}
        wallet={calculated.revenue}
        title="total profit"
      />
      <AnalyticCard
        className={className}
        total={calculated.totals.length}
        wallet={calculated.expenses}
        title="total expenses"
      />
    </>
  )
}
