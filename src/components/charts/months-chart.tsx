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
import { type HTMLAttributes, useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { useCurrencyAtom } from '../providers/currency-provider'
import { Skeleton } from '../ui/skeleton'

interface MonthsChartProps extends HTMLAttributes<HTMLDivElement> {
  rates: (CurrencyRates | null)[]
  transactions: Transaction[]
  year: string
}

ChartJS.register(CategoryScale, Filler, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
ChartJS.defaults.elements.line.tension = 0.4

const monthsOfTheYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const MonthsChart = ({ year, transactions, rates }: MonthsChartProps) => {
  const mounted = useMounted()
  const currencyState = useCurrencyAtom()

  const data = useMemo(() => {
    const months = monthsOfTheYear.map((month) => month.substring(0, 3))

    const filteredTransactions = transactions.filter((transaction) => transaction.year === year)

    const newTransactions = filteredTransactions.map((item) => {
      return {
        month: months[new Date(item.date).getMonth()],
        amount: getCurrencyValue(item.amount, item.currency, rates, currencyState),
      }
    })

    const incomeMonths = removeDuplicatesAndSumMonths(newTransactions.filter((month) => month.amount >= 0))
    const expenseMonths = removeDuplicatesAndSumMonths(newTransactions.filter((month) => month.amount < 0))

    const incomeAmounts = months.map((month) => incomeMonths.find((income) => income.month === month)?.amount ?? 0)
    const expenseAmounts = months.map((month) =>
      toPositive(expenseMonths.find((expense) => expense.month === month)?.amount ?? 0),
    )

    const incomeDataset = {
      label: 'revenue',
      data: incomeAmounts,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.3)',
      fill: true,
    }

    const expenseDataset = {
      label: 'expense',
      data: expenseAmounts,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.3)',
      fill: true,
    }

    return {
      labels: months,
      datasets: [incomeDataset, expenseDataset],
    }
  }, [currencyState, rates, transactions, year])

  return mounted ? <Line className="max-h-[300px]" data={data} /> : <Skeleton className="h-[300px] w-full"></Skeleton>
}

type TransactionMonth = {
  month: string
  amount: number
}

function removeDuplicatesAndSumMonths(transactions: TransactionMonth[]) {
  const monthMap = new Map<string, number>()

  transactions.forEach((transaction) => {
    const { month, amount } = transaction
    if (monthMap.has(month)) {
      const currentAmount = monthMap.get(month)!
      monthMap.set(month, parseFloat((currentAmount + amount).toFixed(2)))
    } else {
      monthMap.set(month, amount)
    }
  })

  const uniqueTransactions: TransactionMonth[] = []
  monthMap.forEach((amount, month) => {
    uniqueTransactions.push({ month, amount })
  })

  return uniqueTransactions
}
