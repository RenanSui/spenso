'use client'

import { cn } from '@/lib/utils'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type CategoriesChartProps = {
  className?: string
  categories: { category: string; sum: number }[]
}

export const CategoriesChart = ({
  categories,
  className,
}: CategoriesChartProps) => {
  const labels = categories.map((category) => category.category)

  const data = {
    labels,
    datasets: [
      {
        label: 'Category expenses',
        data: categories.map((category) => category.sum),
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
      {categories.length !== 0 ? <Bar data={data} /> : null}
    </div>
  )
}
