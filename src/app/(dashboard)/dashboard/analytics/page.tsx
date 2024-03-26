import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import {
  getTransactions,
  getTransactionsCategories,
  getTransactionsTypes,
  getTransactionsYears,
} from '@/actions/server/transactions'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { TransactionAnalyticsShell } from '@/components/shells/transactions-analytics-shell'

export default async function Page() {
  const transactions = await getTransactions()
  if (!transactions) return null

  const categories = await getTransactionsCategories()
  const types = await getTransactionsTypes()
  const years = await getTransactionsYears()
  const allRates = await getAllTransactionsRates(transactions)

  return (
    <Shell className="my-4">
      <PageHeader separated>
        <PageHeaderHeading size="sm">Analytics</PageHeaderHeading>
        <PageHeaderDescription size="sm">Analyse your transactions</PageHeaderDescription>
      </PageHeader>

      <TransactionAnalyticsShell
        transactions={transactions}
        categories={categories}
        types={types}
        years={years}
        allRates={allRates}
      />
    </Shell>
  )
}
