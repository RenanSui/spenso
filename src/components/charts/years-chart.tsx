'use client'

import { currencyStateAtom } from '@/atoms/global'
import { getCurrencyValue } from '@/lib/transactions'
import { removeArrayDuplicates, toPositive } from '@/lib/utils'
import { CurrencyRates, TransactionYears } from '@/types'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useAtom } from 'jotai'
import { HTMLAttributes, useMemo } from 'react'
import { Line } from 'react-chartjs-2'

interface YearsChartProps extends HTMLAttributes<HTMLDivElement> {
  years: TransactionYears[]
  rates: (CurrencyRates | null)[]
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend)
ChartJS.defaults.elements.line.tension = 0.4

export const YearsChart = ({ years, rates }: YearsChartProps) => {
  const [currencyState] = useAtom(currencyStateAtom)

  const data = useMemo(() => {
    const allYears = removeArrayDuplicates(years.map((year) => year.year))
    const filledYears = fillRemainingYears(years)

    const incomes = filledYears.filter((year) => year.type === 'income')
    const expenses = filledYears.filter((year) => year.type === 'expense')

    const calculatedIncomes = sumTransactionsByYear(getCalculatedYears(incomes, rates, currencyState))
    const calculatedExpenses = sumTransactionsByYear(getCalculatedYears(expenses, rates, currencyState))

    const incomeValues = calculatedIncomes.map((year) => year.sum)
    const expenseValues = calculatedExpenses.map((year) => year.sum).map((sum) => toPositive(sum))

    return {
      labels: allYears.map((year) => year),
      datasets: [
        {
          label: 'revenue',
          data: incomeValues,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.2)',
          fill: true,
        },
        {
          label: 'expenses',
          data: expenseValues,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
      ],
    }
  }, [currencyState, rates, years])

  return years.length !== 0 ? <Line data={data} /> : null
}

function fillRemainingYears(years: TransactionYears[]) {
  const formatYears = new Map<string, TransactionYears>()

  for (const year of years) {
    const { currency, sum, type, year: tYear } = year

    let group = formatYears.get(tYear + type + currency)

    if (!group) {
      group = { currency, type, year: tYear, sum }
      formatYears.set(tYear + type + currency, group)
    }

    const oppositeType = type === 'income' ? 'expense' : 'income'
    let group2 = formatYears.get(tYear + oppositeType + currency)

    if (!group2) {
      group2 = { currency, type: oppositeType, year: tYear, sum: 0 }
      formatYears.set(tYear + oppositeType + currency, group2)
    }
  }

  return Array.from(formatYears.values()).sort((item1, item2) => Number(item1.year) - Number(item2.year))
}

function sumTransactionsByYear(transactions: TransactionYears[]) {
  const yearSums: { [year: string]: { year: string; sum: number } } = {}

  for (const transaction of transactions) {
    if (!yearSums[transaction.year]) {
      yearSums[transaction.year] = {
        year: transaction.year,
        sum: transaction.sum,
      }
    } else {
      yearSums[transaction.year].sum += transaction.sum
    }
  }

  return Object.values(yearSums)
}

function getCalculatedYears(years: TransactionYears[], rates: (CurrencyRates | null)[], currencyState: string) {
  return years.map((year) => ({
    ...year,
    sum: getCurrencyValue(year.sum, year.currency, rates, currencyState),
  }))
}
