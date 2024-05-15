'use client'

import { getTransactions } from '@/actions/server/transactions'
import { getGroups } from '@/actions/server/transactions-groups'
import { CreateGroupDialog } from '@/app/(dashboard)/dashboard/_components/create-group-dialog'
import { Groups } from '@/app/(dashboard)/dashboard/_components/groups'
import { CurrencyToggle } from '@/components/currency-toggle'
import { DashboardTabs } from '@/components/dashboard-tabs'
import { GroupCardSkeleton } from '@/components/group-card-skeleton'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { mockUser } from '@/lib/mocks'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { TransactionsContext } from '../_components/guest-provider'

type PageParams = {
  searchParams: {
    deleting: string
  }
}

export default function Page(params: PageParams) {
  const [groupsPromise, setGroupsPromise] = React.useState<ReturnType<typeof getGroups> | null>(null)
  const [transactionsPromise, setTransactionsPromise] = React.useState<ReturnType<typeof getTransactions> | null>(null)

  const { groups, transactions, createGroup } = React.useContext(TransactionsContext)
  const user = mockUser

  const deleting = params.searchParams.deleting ?? 'false'
  const isDeleting = deleting === 'true'

  React.useEffect(() => {
    function initLoad() {
      const groupsPromise = Promise.resolve(groups)
      setGroupsPromise(groupsPromise)

      const transactionsPromise = Promise.resolve(transactions)
      setTransactionsPromise(transactionsPromise)
    }
    initLoad()
  }, [groups, transactions])

  return (
    <Shell variant="sidebar">
      <PageHeader className="max-w-full flex-row gap-4">
        <PageHeaderHeading size="sm" className="flex-1">
          Groups
        </PageHeaderHeading>
        <CurrencyToggle />
        <CreateGroupDialog userId={user.id} route="guest" createGroup={createGroup} />
      </PageHeader>
      <DashboardTabs route="guest" />
      <section
        className={cn(
          'grid gap-4 transition-all md:grid-cols-2 xl:grid-cols-4',
          isDeleting ? 'pointer-events-none blur-sm' : '',
        )}
      >
        <React.Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <GroupCardSkeleton key={i} />
          ))}
        >
          {groupsPromise && transactionsPromise ? (
            <Groups groupsPromise={groupsPromise} transactionsPromise={transactionsPromise} route="guest" />
          ) : null}
        </React.Suspense>
      </section>
    </Shell>
  )
}
