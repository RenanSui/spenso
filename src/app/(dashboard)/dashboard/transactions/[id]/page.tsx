import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import { getTransactionsById } from '@/actions/server/transactions'
import { getGroupById } from '@/actions/server/transactions-groups'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { TransactionsTableShell } from '@/components/shells/transactions-table-shell'
import { TransactionsGroupActions } from '@/components/transactions-groups/transactions-group-actions'
import { buttonVariants } from '@/components/ui/button'
import { DashboardIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const group = await getGroupById(params.id)
  if (!group) notFound()

  const transactions = await getTransactionsById(params.id)
  if (!transactions) notFound()

  const allRates = (await getAllTransactionsRates(transactions)) ?? []

  return (
    <Shell className="my-4">
      <PageHeader separated>
        <PageHeaderHeading size="sm" className="flex items-center justify-between">
          {group.title}
          <div className="flex items-center justify-center gap-1">
            <Link
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              href={`/dashboard/analytics/${params.id}?title=${group.title}`}
            >
              <DashboardIcon className="h-5 w-5" />
            </Link>
            <TransactionsGroupActions groupId={params.id} title={group.title} />
          </div>
        </PageHeaderHeading>
        <PageHeaderDescription size="sm">Manage your transactions</PageHeaderDescription>
      </PageHeader>

      <TransactionsTableShell groupId={params.id} data={transactions} rates={allRates} />
    </Shell>
  )
}
