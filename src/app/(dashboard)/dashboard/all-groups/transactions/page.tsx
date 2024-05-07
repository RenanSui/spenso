import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import { getTransactions } from '@/actions/server/transactions'
import { TransactionsTableShell } from '@/components/shells/transactions-table-shell'
import { getUser } from '@/lib/auth'
import { notFound, redirect } from 'next/navigation'

export default async function TransactionsPage() {
  const user = await getUser()
  if (!user) {
    redirect('/signin')
  }

  const transactions = await getTransactions()
  if (!transactions) notFound()

  const allRates = (await getAllTransactionsRates(transactions)) ?? []

  return (
    <div className="space-y-6">
      <TransactionsTableShell data={transactions} rates={allRates} />
    </div>
  )
}
