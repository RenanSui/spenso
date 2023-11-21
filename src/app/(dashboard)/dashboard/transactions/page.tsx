import { getTransactions } from '@/actions/server/transactions'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { TransactionsTableShell } from '@/components/shells/transactions-table-shell'

export default async function Page() {
  const data = await getTransactions()
  const transactions = data || null

  return (
    <Shell className="my-4">
      <PageHeader separated>
        <PageHeaderHeading size="sm">Transactions</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your transactions
        </PageHeaderDescription>
      </PageHeader>

      <TransactionsTableShell data={transactions ?? []} />
    </Shell>
  )
}
