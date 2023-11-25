'use client'

import { cn } from '@/lib/utils'
import { Transaction } from '@/types'
import { HTMLAttributes } from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type LineChartShellProps = {
  transactions: Transaction[]
} & HTMLAttributes<HTMLDivElement>

export const LineChartShell = ({
  transactions,
  className,
}: LineChartShellProps) => {
  const data = transactions
    .map((item) => ({
      year: new Date(item.date).getFullYear().toString(),
      date: new Date(item.date).getTime(),
      Revenue: item.type === 'income' ? item.amount : 0,
      Expense: item.type === 'expense' ? item.amount * -1 : 0,
    }))
    .sort((item1, item2) => item1.date - item2.date)

  console.log(data)

  return (
    <div
      className={cn(
        'rounded-xl border hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900',
        className,
      )}
    >
      <h1 className="mx-6 my-2 text-lg font-medium">Total Earnings / Year</h1>
      {data.length !== 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
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
              strokeDasharray="1 1"
            />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Revenue"
              stroke="#499c69"
              activeDot={{ r: 8 }}
              dot={false}
              strokeDasharray="2 2"
            />
            <Line
              type="monotone"
              dataKey="Expense"
              stroke="#9c4949"
              dot={false}
              strokeDasharray="2 2"
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[350px] w-full" />
      )}
    </div>
  )
}
