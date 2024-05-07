import { getGroups } from '@/actions/server/transactions-groups'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { CreateGroupDialog } from '../_components/create-group-dialog'
import { Groups } from '../_components/groups'
import { CurrencyToggle } from '@/components/currency-toggle'

export default async function GroupsPage() {
  const user = await getUser()
  if (!user) {
    redirect('/signin')
  }

  const groupsPromise = getGroups()

  return (
    <Shell variant="sidebar">
      <PageHeader className="max-w-full flex-row gap-4">
        <PageHeaderHeading size="sm" className="flex-1">
          Groups
        </PageHeaderHeading>
        <CurrencyToggle />
        <CreateGroupDialog userId={user.id} />
      </PageHeader>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <React.Suspense
          fallback={Array.from({ length: 3 }).map((_, i) => (
            // <StoreCardSkeleton key={i} />
            <div key={i}></div>
          ))}
        >
          <Groups groupsPromise={groupsPromise} />
        </React.Suspense>
      </section>
    </Shell>
  )
}
