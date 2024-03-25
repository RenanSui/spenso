'use client'

import { currencyStateAtom } from '@/atoms/global'
import { cn } from '@/lib/utils'
import { CurrencyRates, TransactionTypeses } from '@/types'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'

type TypeChartProps = {
  className: string
  types: TransactionTypeses[]
  rates: CurrencyRates[]
}

ChartJS.register(ArcElement, Tooltip, Legend)

export const TypeChart = ({ className, types, rates }: TypeChartProps) => {
  const [currencyState] = useAtom(currencyStateAtom)

  const data = useMemo(() => {
    const calculatedTypes = types.map((type) => {
      const returnCalculatedSum = () => {
        const sum = type.sum
        const currency = type.currency
        const transactionRates = rates.find((item) => item.base === currency)
        const currencyRate = transactionRates?.rates[currencyState] ?? 1
        const newSum = parseFloat((sum * currencyRate).toFixed(2))
        return newSum
      }
      return { ...type, sum: returnCalculatedSum() }
    })

    const incomes = calculatedTypes
      .map((item) => item.sum)
      .filter((item) => item >= 0) // less or equal 0 only
      .reduce((acc, curr) => acc + curr, 0)

    const expenses = calculatedTypes
      .map((item) => item.sum)
      .filter((item) => item < 0) // less than 0 only
      .reduce((acc, curr) => acc + curr, 0)

    const newTypes = [
      {
        type: 'income',
        sum: incomes,
      },
      {
        type: 'expense',
        sum: expenses,
      },
    ]

    return {
      labels: newTypes.map((type) => type.type),
      datasets: [
        {
          label: 'amount',
          data: newTypes.map((type) => type.sum),
          backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    }
  }, [currencyState, rates, types])

  return (
    <div
      className={cn(
        'relative flex h-[350px] w-full items-center justify-center rounded-xl border p-2 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900',
        className,
      )}
    >
      <div className="flex h-[350px] w-full items-center justify-center ">
        {types.length !== 0 ? <Doughnut data={data} /> : null}
      </div>
    </div>
  )
}
