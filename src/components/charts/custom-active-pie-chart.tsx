'use client'

import { cn } from '@/lib/utils'
import { Transaction } from '@/types'
import { useTheme } from 'next-themes'
import { HTMLAttributes, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'

type CustomActivePieChartShellProps = {
  transactions: Transaction[]
} & HTMLAttributes<HTMLDivElement>

export const CustomActivePieChartShell = ({
  className,
  transactions,
}: CustomActivePieChartShellProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const { theme } = useTheme()

  const data = [
    {
      name: 'revenue',
      value: 0,
      fill: theme === 'dark' ? '#f5f5f5' : '#262626',
    },
    {
      name: 'expense',
      value: 0,
      fill: theme === 'dark' ? '#f5f5f5' : '#262626',
    },
  ]

  transactions.forEach((item) => {
    if (item.type === 'income') {
      data[0].value = Number((data[0].value + item.amount).toFixed(2))
    }
    if (item.type === 'expense') {
      data[1].value = Number((data[1].value + item.amount).toFixed(2))
    }
  })

  return (
    <div
      className={cn(
        'rounded-xl border hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900',
        className,
      )}
    >
      <h1 className="mx-6 my-2 text-lg font-medium">Revenue comparison</h1>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart width={400} height={400}>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            color="red"
            floodColor="red"
            stopColor="red"
            innerRadius={60}
            outerRadius={80}
            // fill=""
            dataKey="value"
            onMouseEnter={(data, index) => setActiveIndex(index)}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}
