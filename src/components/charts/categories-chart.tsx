'use client'

import { getCurrencyValue } from '@/lib/transactions'
import { cn, toPositive } from '@/lib/utils'
import { CurrencyRates, TransactionCategories } from '@/types'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { useCurrencyAtom } from '../providers/currency-provider'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type CategoriesChartProps = {
  className?: string
  categories: TransactionCategories[]
  rates: (CurrencyRates | null)[]
}

export const CategoriesChart = ({ categories, className, rates }: CategoriesChartProps) => {
  const currencyState = useCurrencyAtom()

  const data = useMemo(() => {
    const calculatedCategories = removeDuplicateCategories(getCalculatedCategories(categories, rates, currencyState))
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
        'relative flex w-full items-center justify-center rounded-xl border p-2 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900',
        className,
      )}
    >
      {categories.length !== 0 ? <Bar data={data} /> : null}
    </div>
  )
}

function getCalculatedCategories(
  categories: TransactionCategories[],
  rates: (CurrencyRates | null)[],
  currencyState: string,
) {
  return categories.map((category) => ({
    ...category,
    sum: getCurrencyValue(category.sum, category.currency, rates, currencyState),
  }))
}

function removeDuplicateCategories(transactions: TransactionCategories[]) {
  const categoriesMap = new Map<string, TransactionCategories>()

  transactions.forEach((transaction) => {
    const { category, currency } = transaction
    let group = categoriesMap.get(category)

    if (!group) {
      group = { category, currency, sum: 0 }
      categoriesMap.set(category, group)
    }

    group.sum += transaction.sum
  })

  return Array.from(categoriesMap.values())
}
