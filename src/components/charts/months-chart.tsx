import { Months } from '@/assets/data/date'
import { useMounted } from '@/hooks/use-mounted'
import { getCurrencyValue } from '@/lib/transactions'
import { toPositive } from '@/lib/utils'
import { type CurrencyRates, type Transaction } from '@/types'
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

interface MonthsChartProps extends HTMLAttributes<HTMLDivElement> {
  rates: (CurrencyRates | null)[]
  transactions: Transaction[]
  year: string
}

setupChartDefaults()

export const MonthsChart = ({ year, transactions, rates }: MonthsChartProps) => {
  const mounted = useMounted()
  const currencyState = useCurrencyAtom()

  const data = useMemo(() => {
    const filteredTransactions = transactions.filter((transaction) => transaction.year === year)
    const newTransactions = mapTransactionsToMonths(filteredTransactions, rates, currencyState)

    const incomes = formatMonthData(accumulateByMonth(newTransactions.filter((t) => t.amount >= 0)))
    const expenses = formatMonthData(accumulateByMonth(newTransactions.filter((t) => t.amount < 0)))

    const incomesAmounts = Months.map((month) => incomes.find((income) => income.month === month)?.amount ?? 0)
    const expensesAmounts = Months.map((month) => toPositive(expenses.find((e) => e.month === month)?.amount ?? 0))

    return generateChartData(incomesAmounts, expensesAmounts)
  }, [currencyState, rates, transactions, year])

  if (!mounted) return <Skeleton className="h-[300px] w-full" />

  return <Line className="max-h-[300px]" data={data} />
}

const generateChartData = (incomeAmounts: number[], expenseAmounts: number[]) => ({
  labels: Months.map((month) => month.substring(0, 3)),
  datasets: [
    {
      label: 'revenue',
      data: incomeAmounts,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.3)',
      fill: true,
    },
    {
      label: 'expense',
      data: expenseAmounts,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.3)',
      fill: true,
    },
  ],
})

type TransactionMonth = { month: string; amount: number }

// 1. Function to accumulate amounts by month
function accumulateByMonth(transactions: TransactionMonth[]): Map<string, number> {
  const monthMap = new Map<string, number>()

  transactions.forEach(({ month, amount }) => {
    monthMap.set(month, (monthMap.get(month) ?? 0) + amount)
  })

  return monthMap
}

// 2. Function to format the accumulated amounts
function formatMonthData(monthMap: Map<string, number>): TransactionMonth[] {
  return Array.from(monthMap.entries()).map(([month, amount]) => ({
    month,
    amount: parseFloat(amount.toFixed(2)),
  }))
}

function mapTransactionsToMonths(transactions: Transaction[], rates: (CurrencyRates | null)[], currencyState: string) {
  return transactions.map((item) => ({
    month: Months[new Date(item.date).getMonth()] ?? 'Unknown',
    amount: getCurrencyValue(item.amount, item.currency, rates, currencyState),
  }))
}

function setupChartDefaults() {
  ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
  ChartJS.defaults.elements.line.tension = 0.4
}
