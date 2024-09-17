import { getTransactions } from '@/actions/server/transactions'
import { addGroup, getGroups } from '@/actions/server/transactions-groups'
import { CurrencyToggle } from '@/components/currency-toggle'
import { DashboardTabs } from '@/components/dashboard-tabs'
import { GroupCardSkeleton } from '@/components/group-card-skeleton'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { CreateGroupDialog } from '../_components/create-group-dialog'
import { Groups } from '../_components/groups'

export default async function GroupsPage() {
  const user = await getUser()
  if (!user) {
    redirect('/signin')
  }

  const groupsPromise = getGroups()
  const transactionsPromise = getTransactions()

  return (
    <Shell variant="sidebar">
      <PageHeader className="max-w-full flex-row gap-4">
        <PageHeaderHeading size="sm" className="flex-1">
          Groups
        </PageHeaderHeading>
        <CurrencyToggle />
        <CreateGroupDialog userId={user.id} route="dashboard" createGroup={addGroup} />
      </PageHeader>
      <DashboardTabs />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <React.Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <GroupCardSkeleton key={i} />
          ))}
        >
          <Groups groupsPromise={groupsPromise} transactionsPromise={transactionsPromise} />
        </React.Suspense>
      </section>
    </Shell>
  )
}
