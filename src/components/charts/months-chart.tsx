import { currencyStateAtom } from '@/atoms/global'
import { toPositive } from '@/lib/utils'
import { CurrencyRates, Transaction } from '@/types'
import {
  CategoryScale,
  Chart as ChartJS,
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

interface MonthsChartProps extends HTMLAttributes<HTMLDivElement> {
  // years: TransactionYears[]
  rates: CurrencyRates[]
  transactions: Transaction[]
  year: string
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

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
  const [currencyState] = useAtom(currencyStateAtom)

  const data = useMemo(() => {
    const months = monthsOfTheYear.map((month) => month.substring(0, 3))

    const filteredTransactions = transactions.filter((item) => item.year === year)
    const newTransactions = filteredTransactions.map((item) => {
      const returnCalculatedAmount = () => {
        const sum = item.amount
        const currency = item.currency

        const transactionRates = rates.find((item) => item.base === currency)
        const currencyRate = transactionRates?.rates[currencyState] ?? 1
        const newSum = parseFloat((sum * currencyRate).toFixed(2))

        return newSum as number
      }

      return {
        ...item,
        amount: returnCalculatedAmount(),
      }
    })

    const getMonths = newTransactions.map((item) => {
      return {
        month: months[new Date(item.date).getMonth()],
        amount: item.amount,
      }
    })

    const incomeMonths = removeDuplicatesAndSumMonths(
      getMonths.filter((item) => item.amount >= 0),
    )
    const expenseMonths = removeDuplicatesAndSumMonths(
      getMonths.filter((item) => item.amount < 0),
    )

    const incomeAmounts = months.map((month) => {
      const monthData = incomeMonths.find((nMonth) => nMonth.month === month)
      return monthData?.amount ?? 0
    })

    const expenseAmounts = months.map((month) => {
      const monthData = expenseMonths.find((nMonth) => nMonth.month === month)
      return toPositive(monthData?.amount ?? 0)
    })

    const incomeDataset = {
      label: 'revenue',
      data: incomeAmounts,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }

    const expenseDataset = {
      label: 'expense',
      data: expenseAmounts,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }

    return {
      labels: months,
      datasets: [incomeDataset, expenseDataset],
    }
  }, [currencyState, rates, transactions, year])

  return transactions.length !== 0 ? <Line data={data} /> : null
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
