'use client'

import { currencyStateAtom } from '@/atoms/global'
import { returnCalculatedValue } from '@/lib/transactions'
import { cn, toPositive } from '@/lib/utils'
import { CurrencyRates, TransactionCategories } from '@/types'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type CategoriesChartProps = {
  className?: string
  categories: TransactionCategories[]
  rates: CurrencyRates[]
}

export const CategoriesChart = ({ categories, className, rates }: CategoriesChartProps) => {
  const [currencyState] = useAtom(currencyStateAtom)

  const data = useMemo(() => {
    const calculatedCategories = categories.map((category) => {
      return {
        ...category,
        sum: returnCalculatedValue(category.sum, category.currency, rates, currencyState),
      }
    })

    const sortedCategories = calculatedCategories.sort((item1, item2) => toPositive(item1.sum) - toPositive(item2.sum))

    const labels = sortedCategories.map((category) => category.category)
    const sums = sortedCategories.map((category) => toPositive(category.sum))

    return {
      labels,
      datasets: [
        {
          label: 'Category expenses',
          data: sums,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    }
  }, [categories, currencyState, rates])

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
