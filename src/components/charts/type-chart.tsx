'use client'

import { cn } from '@/lib/utils'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

type TypeChartProps = {
  className: string
  types: {
    type: string
    sum: number
  }[]
}

ChartJS.register(ArcElement, Tooltip, Legend)

export const TypeChart = ({ className, types }: TypeChartProps) => {
  const data = {
    labels: types.map((type) => type.type).reverse(),
    datasets: [
      {
        label: 'amount',
        data: types.map((type) => type.sum).reverse(),
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
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
      <div className="flex h-[350px] w-full items-center justify-center ">
        {types.length !== 0 ? <Doughnut data={data} /> : null}
      </div>
    </div>
  )
}
