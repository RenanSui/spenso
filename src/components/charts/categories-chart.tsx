'use client'

import { currencyStateAtom } from '@/atoms/global'
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
import { useAtom } from 'jotai'
import { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type CategoriesChartProps = {
  className?: string
  categories: TransactionCategories[]
  rates: CurrencyRates[]
}

export const CategoriesChart = ({
  categories,
  className,
  rates,
}: CategoriesChartProps) => {
  const [currencyState] = useAtom(currencyStateAtom)

  const data = useMemo(() => {
    const calculatedCategories = categories.map((category) => {
      const returnCalculatedSum = () => {
        const sum = category.sum
        const currency = category.currency
        const transactionRates = rates.find((item) => item.base === currency)
        const currencyRate = transactionRates?.rates[currencyState] ?? 1
        const newSum = parseFloat((sum * currencyRate).toFixed(2))
        return newSum
      }
      return { ...category, sum: returnCalculatedSum() }
    })

    const removedCategoryDuplicates = removeDuplicatesAndSum(calculatedCategories)

    const sortedCategories = removedCategoryDuplicates.sort(
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

function removeDuplicatesAndSum(
  transactions: TransactionCategories[],
): TransactionCategories[] {
  // Create a map to store unique categories and their sums
  const categoryMap = new Map<string, number>()

  // Iterate through the transactions
  transactions.forEach((transaction) => {
    const { category, sum } = transaction
    // If category already exists in the map, update the sum
    if (categoryMap.has(category)) {
      const currentSum = categoryMap.get(category)!
      categoryMap.set(category, currentSum + sum)
    } else {
      // If category does not exist, add it to the map
      categoryMap.set(category, sum)
    }
  })

  // Create an array of TransactionCategories objects from the map
  const uniqueTransactions: TransactionCategories[] = []
  categoryMap.forEach((sum, category) => {
    uniqueTransactions.push({ category, sum, currency: 'Currency' }) // Assuming currency is constant
  })

  return uniqueTransactions
}
