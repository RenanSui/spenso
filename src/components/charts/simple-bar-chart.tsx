'use client'

import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { HTMLAttributes } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type SimpleBarChartProps = {
  categoriesSum: { category: string; sum: number }[]
} & HTMLAttributes<HTMLDivElement>

export const SimpleBarChart = ({
  className,
  categoriesSum,
}: SimpleBarChartProps) => {
  const { theme } = useTheme()

  const data = categoriesSum.map((category) => ({
    category: category.category,
    total: category.sum,
  }))

  return (
    <div
      className={cn(
        'rounded-xl border capitalize text-black hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900',
        className,
      )}
    >
      <h1 className="mx-6 my-2 text-lg font-medium dark:text-white">
        Categories expenses
      </h1>
      {data.length !== 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              className="dark:stroke-neutral-800"
              strokeDasharray="3 3"
            />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip itemStyle={{ color: '#707070' }} />
            <Legend />
            <Bar
              dataKey="total"
              fill={theme === 'dark' ? '#f5f5f5' : '#262626'}
              activeBar={<Rectangle fill="#ef4444" stroke="purple" />}
              strokeDasharray="5 5"
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[350px] w-full" />
      )}
    </div>
  )
}
