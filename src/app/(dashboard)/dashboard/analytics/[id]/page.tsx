import { getAllTransactionsRates } from '@/actions/server/currency-rates'
import { getTransactionsById } from '@/actions/server/transactions'
import { getTransactionsGroupById } from '@/actions/server/transactions-groups'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { TransactionAnalyticsShell } from '@/components/shells/transactions-analytics-shell'
import { Button, buttonVariants } from '@/components/ui/button'
import { getTransactionsYears, getTransactionsTypes, getTransactionsCategories } from '@/lib/transactions'
import { DotsVerticalIcon, ListBulletIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const group = await getTransactionsGroupById(params.id)
  if (!group) notFound()

  const transactions = await getTransactionsById(params.id)
  if (!transactions) notFound()

  const years = getTransactionsYears(transactions)
  const types = getTransactionsTypes(transactions)
  const categories = getTransactionsCategories(transactions)
  const allRates = (await getAllTransactionsRates(transactions)) ?? []

  return (
    <Shell className="my-4">
      <PageHeader separated>
        <PageHeaderHeading size="sm" className="flex items-center justify-between">
          {group.title}
          <div className="flex items-center justify-center gap-1">
            <Link
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              href={`/dashboard/transactions/${params.id}?title=${group.title}`}
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
        transactions={transactions ?? []}
        categories={categories}
        types={types}
        years={years}
        allRates={allRates}
      />
    </Shell>
  )
}
