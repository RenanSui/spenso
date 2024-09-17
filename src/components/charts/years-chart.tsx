'use client'

import { useMounted } from '@/hooks/use-mounted'
import { getCurrencyValue } from '@/lib/transactions'
import { removeArrayDuplicates, toPositive } from '@/lib/utils'
import { type CurrencyRates, type TransactionYears } from '@/types'
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
import { useMemo, type HTMLAttributes } from 'react'
import { Line } from 'react-chartjs-2'
import { useCurrencyAtom } from '../providers/currency-provider'
import { Skeleton } from '../ui/skeleton'

interface YearsChartProps extends HTMLAttributes<HTMLDivElement> {
  years: TransactionYears[]
  rates: (CurrencyRates | null)[]
}

setupChartDefaults()

export const YearsChart = ({ years, rates }: YearsChartProps) => {
  const mounted = useMounted()
  const currencyState = useCurrencyAtom()

  const data = useMemo(() => {
    const uniqueYears = getUniqueYears(years)
    const filledYears = fillMissingYears(years)

    const income = calculateYearData(filledYears, 'income', rates, currencyState)
    const expense = calculateYearData(filledYears, 'expense', rates, currencyState).map(toPositive)

    return createChartData(uniqueYears, income, expense)
  }, [currencyState, rates, years])

  if (!mounted) return <Skeleton className="h-[300px] w-full"></Skeleton>

  return <Line className="max-h-[300px]" data={data} />
}

// 1. Function to get unique years
function getUniqueYears(years: TransactionYears[]): string[] {
  return removeArrayDuplicates(years.map((y) => y.year))
}

// 2. Function to fill missing year data
function fillMissingYears(years: TransactionYears[]): TransactionYears[] {
  const yearMap = new Map<string, TransactionYears>()

  years.forEach(({ currency, sum, type, year }) => {
    const key = `${year}-${type}-${currency}`
    if (!yearMap.has(key)) {
      yearMap.set(key, { year, type, currency, sum })
    }
  })

  // Ensure both income and expense exist for every year
  years.forEach(({ year, currency, type }) => {
    const oppositeType = type === 'income' ? 'expense' : 'income'
    const key = `${year}-${oppositeType}-${currency}`
    if (!yearMap.has(key)) {
      yearMap.set(key, { year, type: oppositeType, currency, sum: 0 })
    }
  })

  return Array.from(yearMap.values()).sort((a, b) => Number(a.year) - Number(b.year))
}

// 3. Function to calculate year data with converted currencies
function calculateYearData(
  years: TransactionYears[],
  type: 'income' | 'expense',
  rates: (CurrencyRates | null)[],
  currencyState: string,
): number[] {
  const filtered = years.filter((y) => y.type === type)
  const calculated = filtered.map((y) => ({
    ...y,
    sum: getCurrencyValue(y.sum, y.currency, rates, currencyState),
  }))
  return sumByYear(calculated).map((y) => y.sum)
}

// 4. Function to sum transactions by year
function sumByYear(transactions: TransactionYears[]): { year: string; sum: number }[] {
  const yearSums: { [year: string]: { year: string; sum: number } } = {}

  transactions.forEach(({ year, sum }) => {
    if (yearSums[year] === undefined) {
      yearSums[year] = { year, sum }
    } else {
      const currentSum = yearSums[year] as { year: string; sum: number }
      currentSum.sum += sum
    }
  })

  return Object.values(yearSums)
}

// 5. Function to generate chart data
function createChartData(labels: string[], income: number[], expense: number[]) {
  return {
    labels,
    datasets: [
      {
        label: 'revenue',
        data: income,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
        fill: true,
      },
      {
        label: 'expenses',
        data: expense,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  }
}

function setupChartDefaults() {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend)
  ChartJS.defaults.elements.line.tension = 0.4
}
