'use client'

import { useMounted } from '@/hooks/use-mounted'
import { getCurrencyValue } from '@/lib/transactions'
import { cn, toPositive } from '@/lib/utils'
import { CurrencyRates, TransactionCategories } from '@/types'
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
import { useCurrencyAtom } from '../providers/currency-provider'
import { Skeleton } from '../ui/skeleton'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type CategoriesChartProps = {
  className?: string
  categories: TransactionCategories[]
  rates: (CurrencyRates | null)[]
}

export const CategoriesChart = ({
  categories,
  className,
  rates,
}: CategoriesChartProps) => {
  const mounted = useMounted()
  const currency = useCurrencyAtom()
  const data = getCategoriesData(categories, rates, currency)

  return mounted ? (
    <div
      className={cn(
        'relative flex w-full items-center justify-center rounded-xl border p-2 hover:bg-neutral-100 dark:border-neutral-800 dark:hover:bg-neutral-900',
        className,
      )}
    >
      {categories.length !== 0 ? <Bar data={data} /> : null}
    </div>
  ) : (
    <Skeleton className={cn('h-[350px] lg:col-span-2', className)} />
  )
}

function getCategoriesData(
  categories: TransactionCategories[],
  rates: (CurrencyRates | null)[],
  currency: string,
) {
  const calculatedCategories = removeDuplicateCategories(
    getCalculatedCategories(categories, rates, currency),
  )
  const sortedCategories = calculatedCategories.sort(
    (item1, item2) => toPositive(item1.sum) - toPositive(item2.sum),
  )

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
}

function getCalculatedCategories(
  categories: TransactionCategories[],
  rates: (CurrencyRates | null)[],
  currency: string,
) {
  return categories.map((category) => ({
    ...category,
    sum: getCurrencyValue(category.sum, category.currency, rates, currency),
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
