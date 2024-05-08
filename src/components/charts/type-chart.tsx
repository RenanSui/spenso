'use client'

import { getCurrencyValue } from '@/lib/transactions'
import { cn } from '@/lib/utils'
import { CurrencyRates, TransactionTypeses } from '@/types'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useCurrencyAtom } from '../providers/currency-provider'

type TypeChartProps = {
  className: string
  types: TransactionTypeses[]
  rates: (CurrencyRates | null)[]
}

ChartJS.register(ArcElement, Tooltip, Legend)

export const TypeChart = ({ className, types, rates }: TypeChartProps) => {
  const currencyState = useCurrencyAtom()

  const data = useMemo(() => {
    const calculatedTypes = types.map((type) => {
      return { sum: getCurrencyValue(type.sum, type.currency, rates, currencyState) }
    })

    const incomes = calculatedTypes
      .map((type) => type.sum)
      .filter((type) => type >= 0) // Only value greater or equal to 0
      .reduce((acc, curr) => acc + curr, 0)

    const expenses = calculatedTypes
      .map((type) => type.sum)
      .filter((type) => type < 0) // Only values less than 0
      .reduce((acc, curr) => acc + curr, 0)

    const newTypes = [
      { type: 'income', sum: incomes },
      { type: 'expense', sum: expenses },
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
        'relative flex w-full items-center justify-center rounded-xl border p-2 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900',
        className,
      )}
    >
      <div className="flex w-full items-center justify-center ">
        {types.length !== 0 ? <Doughnut data={data} /> : null}
      </div>
    </div>
  )
}
