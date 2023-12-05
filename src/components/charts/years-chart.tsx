'use client'

import { cn, removeArrayDuplicates } from '@/lib/utils'
import { TransactionTypes } from '@/types'
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
import { Line } from 'react-chartjs-2'

type YearsChartProps = {
  className: string
  years: {
    year: string
    type: TransactionTypes
    sum: number
  }[]
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

export const YearsChart = ({ className, years }: YearsChartProps) => {
  const allYears = removeArrayDuplicates(years.map((year) => year.year))
  const allSums = years.map((year) => year.sum)

  const incomes = allSums.filter((sum) => sum >= 0)
  const expenses = allSums.filter((sum) => sum < 0).map((sum) => sum * -1)

  const data = {
    labels: allYears.map((year) => year),
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
