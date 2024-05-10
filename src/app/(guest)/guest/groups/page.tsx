'use client'

import { CurrencyToggle } from '@/components/currency-toggle'
import { GroupCardSkeleton } from '@/components/group-card-skeleton'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { mockUser } from '@/lib/mocks'
import * as React from 'react'
import { GuestCreateGroupDialog } from '../_components/guest-create-group-dialog'
import { GuestDashboardTabs } from '../_components/guest-dashboard-tabs'
import { GuestGroups } from '../_components/guest-groups'
import { TransactionsContext } from '../_components/guest-provider'

export default function Page() {
  const { transactions, groups } = React.useContext(TransactionsContext)
  const user = mockUser

  return (
    <Shell variant="sidebar">
      <PageHeader className="max-w-full flex-row gap-4">
        <PageHeaderHeading size="sm" className="flex-1">
          Groups
        </PageHeaderHeading>
        <CurrencyToggle />
        <GuestCreateGroupDialog userId={user.id} />
      </PageHeader>
      <GuestDashboardTabs />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <React.Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            <GroupCardSkeleton key={i} />
          ))}
        >
          <GuestGroups groups={groups} transactions={transactions} />
        </React.Suspense>
      </section>
    </Shell>
  )
}
