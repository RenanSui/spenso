import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import { getTransactionsById } from '@/actions/server/transactions'
import { getTransactionsGroupById } from '@/actions/server/transactions-groups'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { TransactionsTableShell } from '@/components/shells/transactions-table-shell'
import { TransactionsGroupActions } from '@/components/transactions-groups/transactions-group-actions'
import { buttonVariants } from '@/components/ui/button'
import { sortTransactions } from '@/lib/transactions'
import { DashboardIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const { id: groupId } = params
  const transactionGroup = await getTransactionsGroupById(groupId)

  if (transactionGroup.length === 0) notFound()

  const { title } = transactionGroup[0]

  const transactions = await getTransactionsById(groupId)
  const newTransaction = sortTransactions(transactions)
  const allRates = await getAllTransactionsRates(newTransaction)

  return (
    <Shell className="my-4">
      <PageHeader separated>
        <PageHeaderHeading size="sm" className="flex items-center justify-between">
          {title}
          <div className="flex items-center justify-center gap-1">
            <Link
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              href={`/dashboard/analytics/${groupId}?title=${title}`}
            >
              <DashboardIcon className="h-5 w-5" />
            </Link>
            <TransactionsGroupActions groupId={groupId} title={title} />
          </div>
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">Manage your transactions</PageHeaderDescription>
      </PageHeader>

      <TransactionsTableShell groupId={groupId} data={newTransaction} rates={allRates} />
    </Shell>
  )
}
