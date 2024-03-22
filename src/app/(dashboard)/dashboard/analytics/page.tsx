import { getTransactions } from '@/actions/server/transactions'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { TransactionAnalyticsShell } from '@/components/shells/transactions-analytics-shell'

export default async function Page() {
  const transactions = await getTransactions()

  return (
    <Shell className="my-4">
      <PageHeader separated>
        <PageHeaderHeading size="sm">Analytics</PageHeaderHeading>
        <PageHeaderDescription size="sm">Analyse your transactions</PageHeaderDescription>
      </PageHeader>

      <TransactionAnalyticsShell transactions={transactions} />
    </Shell>
  )
}
