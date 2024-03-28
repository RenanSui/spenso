'use client'

import { currencyStateAtom } from '@/atoms/global'
import { returnCalculatedValue } from '@/lib/transactions'
import { removeArrayDuplicates, toPositive } from '@/lib/utils'
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
import { HTMLAttributes, useMemo } from 'react'
import { Line } from 'react-chartjs-2'

interface YearsChartProps extends HTMLAttributes<HTMLDivElement> {
  years: TransactionYears[]
  rates: CurrencyRates[]
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const YearsChart = ({ years, rates }: YearsChartProps) => {
  const [currencyState] = useAtom(currencyStateAtom)

  const newYears = removeArrayDuplicates(years.map((year) => year.year))

  const data = useMemo(() => {
    const sums = years.map((year) => returnCalculatedValue(year.sum, year.currency, rates, currencyState))

    const incomes = sums.filter((sum) => sum >= 0)
    const expenses = sums.filter((sum) => sum < 0).map((sum) => toPositive(sum))

    return {
      labels: newYears.map((year) => year),
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
  }, [currencyState, newYears, rates, years])

  return years.length !== 0 ? <Line data={data} /> : null
}
