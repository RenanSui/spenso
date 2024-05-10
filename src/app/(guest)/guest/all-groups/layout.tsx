import { CurrencyToggle } from '@/components/currency-toggle'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { getUser } from '@/lib/auth'
import { mockUser } from '@/lib/mocks'
import { notFound, redirect } from 'next/navigation'
import { GuestCreateGroupDialog } from '../_components/guest-create-group-dialog'
import { GuestDashboardTabs } from '../_components/guest-dashboard-tabs'

type GroupLayoutProps = React.PropsWithChildren

export default async function AllGroupLayout({ children }: GroupLayoutProps) {
  const authUser = await getUser()
  if (authUser) redirect('/')

  const user = mockUser
  if (!user) return notFound()

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
      <div className="overflow-hidden">{children}</div>
    </Shell>
  )
}