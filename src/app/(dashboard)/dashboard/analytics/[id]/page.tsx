import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import {
  getTransactionsById,
  getTransactionsCategoriesByGroupId,
  getTransactionsTypesByGroupId,
  getTransactionsYearsByGroupId,
} from '@/actions/server/transactions'
import { getTransactionsGroupById } from '@/actions/server/transactions-groups'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { TransactionAnalyticsShell } from '@/components/shells/transactions-analytics-shell'
import { Button, buttonVariants } from '@/components/ui/button'
import { DotsVerticalIcon, ListBulletIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const { id: groupId } = params

  const transactions = await getTransactionsById(groupId)
  if (!transactions) notFound()

  const transactionGroup = await getTransactionsGroupById(groupId)
  if (transactionGroup.length === 0) notFound()

  const { title } = transactionGroup[0]

  const categories = await getTransactionsCategoriesByGroupId(groupId)
  const types = await getTransactionsTypesByGroupId(groupId)
  const years = await getTransactionsYearsByGroupId(groupId)
  const allRates = await getAllTransactionsRates(transactions)

  return (
    <Shell className="my-4">
      <PageHeader separated>
        <PageHeaderHeading size="sm" className="flex items-center justify-between">
          {title}
          <div className="flex items-center justify-center gap-1">
            <Link
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              href={`/dashboard/transactions/${groupId}?title=${title}`}
            >
              <ListBulletIcon className="h-5 w-5" />
            </Link>
            <Button className="px-0" variant="ghost" size="icon" disabled>
              <DotsVerticalIcon />
            </Button>
          </div>
        </PageHeaderHeading>
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
