import { CurrencyRates, Transaction, TransactionCategories, TransactionTypeses, TransactionYears } from '@/types'
import { CardChartShell } from '../charts/card-chart'
import { CategoriesChart } from '../charts/categories-chart'
import { LineChartShell } from '../charts/line-charts-shell'
import { TypeChart } from '../charts/type-chart'
import { AnalyticTable } from '../table/analytic-table'

type AnalyticsProps = {
  transactions: Transaction[]
  categories: TransactionCategories[]
  types: TransactionTypeses[]
  years: TransactionYears[]
  allRates: (CurrencyRates | null)[]
}

export const TransactionAnalyticsShell = async ({
  transactions,
  allRates,
  categories,
  types,
  years,
}: AnalyticsProps) => {
  if (!transactions) return null

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <CardChartShell transactions={transactions} rates={allRates} />

      <LineChartShell className="h-[350px] lg:col-span-2" transactions={transactions} years={years} rates={allRates} />

      <AnalyticTable className="h-[716px] lg:row-span-2" transactions={transactions} rates={allRates} />

      <TypeChart className="lg:col-span-2 lg:h-[350px]" types={types} rates={allRates} />

      <CategoriesChart className="h-[350px] lg:col-span-3" categories={categories} rates={allRates} />
    </div>
  )
}
