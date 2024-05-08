import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import { getTransactions } from '@/actions/server/transactions'
import { TransactionAnalyticsShell } from '@/components/shells/transactions-analytics-shell'
import { getUser } from '@/lib/auth'
import { getTransactionsYears, getTransactionsTypes, getTransactionsCategories } from '@/lib/transactions'
import { notFound, redirect } from 'next/navigation'

export default async function AnalyticsPage() {
  const user = await getUser()
  if (!user) {
    redirect('/signin')
  }

  const transactions = await getTransactions()
  if (!transactions) notFound()

  const years = getTransactionsYears(transactions)
  const types = getTransactionsTypes(transactions)
  const categories = getTransactionsCategories(transactions)
  const allRates = (await getAllTransactionsRates(transactions)) ?? []

  return (
    <div className="space-y-6">
      <TransactionAnalyticsShell
        transactions={transactions}
        categories={categories}
        types={types}
        years={years}
        allRates={allRates}
      />
    </div>
  )
}
