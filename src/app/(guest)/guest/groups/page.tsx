'use client'

import { CreateGroupDialog } from '@/app/(dashboard)/dashboard/_components/create-group-dialog'
import { CurrencyToggle } from '@/components/currency-toggle'
import { DashboardTabs } from '@/components/dashboard-tabs'
import { GroupCardSkeleton } from '@/components/group-card-skeleton'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { mockUser } from '@/lib/mocks'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { GuestGroups } from '../_components/guest-groups'
import { TransactionsContext } from '../_components/guest-provider'

type PageParams = {
  searchParams: {
    deleting: string
  }
}

export default function Page(params: PageParams) {
  const guest = React.useContext(TransactionsContext)
  const user = mockUser

  const deleting = params.searchParams.deleting ?? 'false'
  const isDeleting = deleting === 'true'

  return (
    <Shell variant="sidebar">
      <PageHeader className="max-w-full flex-row gap-4">
        <PageHeaderHeading size="sm" className="flex-1">
          Groups
        </PageHeaderHeading>
        <CurrencyToggle />
        <CreateGroupDialog userId={user.id} route="guest" createGroup={guest.createGroup} />
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
          <GuestGroups groups={guest.groups} transactions={guest.transactions} />
        </React.Suspense>
      </section>
    </Shell>
  )
}
