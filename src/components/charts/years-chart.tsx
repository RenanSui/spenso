'use client'

import { useMounted } from '@/hooks/use-mounted'
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
import { HTMLAttributes, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { useCurrencyAtom } from '../providers/currency-provider'
import { Skeleton } from '../ui/skeleton'

interface YearsChartProps extends HTMLAttributes<HTMLDivElement> {
  years: TransactionYears[]
  rates: (CurrencyRates | null)[]
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend)
ChartJS.defaults.elements.line.tension = 0.4

export const YearsChart = ({ years, rates }: YearsChartProps) => {
  const mounted = useMounted()
  const currencyState = useCurrencyAtom()

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

  return mounted ? <Line className="max-h-[300px]" data={data} /> : <Skeleton className="h-[300px] w-full"></Skeleton>
}

function fillRemainingYears(years: TransactionYears[]) {
  const yearsMap = new Map<string, TransactionYears>()

  for (const year of years) {
    const { currency, sum, type, year: tYear } = year
    let group = yearsMap.get(tYear + type + currency)

    if (!group) {
      group = { currency, type, year: tYear, sum }
      yearsMap.set(tYear + type + currency, group)
    }
  }

  // create opposite map if "year" or "type" do not exist
  for (const year of years) {
    const { currency, type, year: tYear } = year
    const oppositeType = type === 'income' ? 'expense' : 'income'
    let group = yearsMap.get(tYear + oppositeType + currency)

    if (!group) {
      group = { currency, type: oppositeType, year: tYear, sum: 0 }
      yearsMap.set(tYear + oppositeType + currency, group)
    }
  }

  return Array.from(yearsMap.values()).sort((item1, item2) => Number(item1.year) - Number(item2.year))
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
