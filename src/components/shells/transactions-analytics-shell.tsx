import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import {
  getTransactionsCategories,
  getTransactionsTypes,
  getTransactionsYears,
} from '@/actions/server/transactions'
import { Transaction } from '@/types'
import { CardChartShell } from '../charts/card-chart'
import { CategoriesChart } from '../charts/categories-chart'
import { TypeChart } from '../charts/type-chart'
import { YearsChart } from '../charts/years-chart'
import { AnalyticTable } from '../table/analytic-table'

type AnalyticsProps = { transactions: Transaction[] | null }

export const TransactionAnalyticsShell = async ({ transactions }: AnalyticsProps) => {
  if (!transactions) return null

  const categories = await getTransactionsCategories()
  const types = await getTransactionsTypes()
  const years = await getTransactionsYears()
  const allRates = await getAllTransactionsRates(transactions)

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
      <CardChartShell transactions={transactions} rates={allRates} />

      <YearsChart className="lg:col-span-2" years={years} rates={allRates} />

      <AnalyticTable
        className="lg:row-span-2"
        transactions={transactions}
        rates={allRates}
      />

      <TypeChart className="lg:col-span-2" types={types} rates={allRates} />

      <CategoriesChart
        className="lg:col-span-3"
        categories={categories}
        rates={allRates}
      />
    </div>
  )
}
