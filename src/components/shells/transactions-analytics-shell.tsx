import { getTransactionsCategories } from '@/actions/server/transactions'
import { Transaction } from '@/types'
import { CardChartShell } from '../charts/card-chart'
import { CustomActivePieChartShell } from '../charts/custom-active-pie-chart'
import { LineChartShell } from '../charts/line-chart'
import { SimpleBarChart } from '../charts/simple-bar-chart'
import { AnalyticTable } from '../table/analytic-table'

type AnalyticsProps = { transactions: Transaction[] | null }

export const TransactionAnalyticsShell = async ({
  transactions,
}: AnalyticsProps) => {
  const categoriesSum = await getTransactionsCategories()

  if (!transactions) return null
  if (!categoriesSum) return null

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
      <CardChartShell transactions={transactions} />

      <LineChartShell className="lg:col-span-2" transactions={transactions} />

      <AnalyticTable className="lg:row-span-2" transactions={transactions} />

      <CustomActivePieChartShell
        className="lg:col-span-2"
        transactions={transactions}
      />

      <SimpleBarChart className="lg:col-span-3" categoriesSum={categoriesSum} />
    </div>
  )
}
