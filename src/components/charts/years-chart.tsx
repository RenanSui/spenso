'use client'

import { currencyStateAtom } from '@/atoms/global'
import { cn, removeArrayDuplicates, toPositive } from '@/lib/utils'
import { CurrencyRates, TransactionYears } from '@/types'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'

type YearsChartProps = {
  className: string
  years: TransactionYears[]
  rates: CurrencyRates[]
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const YearsChart = ({ className, years: Years, rates }: YearsChartProps) => {
  const [currencyState] = useAtom(currencyStateAtom)

  const years = removeArrayDuplicates(Years.map((year) => year.year))

  const data = useMemo(() => {
    const sums = Years.map((year) => {
      const returnCalculatedSum = () => {
        const sum = year.sum
        const currency = year.currency

        const transactionRates = rates.find((item) => item.base === currency)
        const currencyRate = transactionRates?.rates[currencyState] ?? 1
        const newSum = parseFloat((sum * currencyRate).toFixed(2))

        return newSum
      }

      return returnCalculatedSum()
    })

    const incomes = sums.filter((sum) => sum >= 0)
    const expenses = sums.filter((sum) => sum < 0).map((sum) => toPositive(sum))

    return {
      labels: years.map((year) => year),
      datasets: [
        {
          label: 'revenue',
          data: incomes,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: 'expenses',
          data: expenses,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    }
  }, [Years, currencyState, rates, years])

  return (
    <div
      className={cn(
        'relative flex h-[350px] w-full items-center justify-center rounded-xl border p-2 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900',
        className,
      )}
    >
      {years.length !== 0 ? <Line data={data} /> : null}
    </div>
  )
}
