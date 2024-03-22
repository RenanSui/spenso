import { getTransactions } from '@/actions/server/transactions'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { TransactionsTableShell } from '@/components/shells/transactions-table-shell'
import { getAllRates, sortTransactions } from '@/lib/transactions'

export default async function Page() {
  const transactions = await getTransactions()
  const newTransaction = sortTransactions(transactions)
  const allRates = await getAllRates(newTransaction)

  return (
    <Shell className="my-4">
      <PageHeader separated>
        <PageHeaderHeading size="sm">Transactions</PageHeaderHeading>
        <PageHeaderDescription size="sm">Manage your transactions</PageHeaderDescription>
      </PageHeader>

      <TransactionsTableShell data={newTransaction} rates={allRates} />
    </Shell>
  )
}
