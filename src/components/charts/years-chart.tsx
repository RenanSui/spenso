'use client'

import { cn } from '@/lib/utils'
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
  const allYears = years.map((year) => year.year)
  const filteredAllYears = allYears.filter(
    (year, index) => allYears.indexOf(year) === index,
  )

  const revenueYears = years.filter((year) => year.type === 'income')
  const expenseYears = years
    .filter((year) => year.type === 'expense')
    .map((year) => ({ ...years, sum: year.sum * -1 }))

  const data = {
    labels: filteredAllYears.map((year) => year),
    datasets: [
      {
        label: 'revenue',
        data: revenueYears.map((year) => year.sum),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'expenses',
        data: expenseYears.map((year) => year.sum),
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
