import { addGroup } from '@/actions/server/transactions-groups'
import { CurrencyToggle } from '@/components/currency-toggle'
import { DashboardTabs } from '@/components/dashboard-tabs'
import { PageHeader, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { CreateGroupDialog } from '../_components/create-group-dialog'

type GroupLayoutProps = React.PropsWithChildren

export default async function AllGroupLayout({ children }: GroupLayoutProps) {
  const user = await getUser()

  if (!user) {
    redirect('/signin')
  }

  return (
    <Shell variant="sidebar">
      <PageHeader className="max-w-full flex-row gap-4">
        <PageHeaderHeading size="sm" className="flex-1">
          Groups
        </PageHeaderHeading>
        <CurrencyToggle />
        <CreateGroupDialog
          userId={user.id}
          route="dashboard"
          createGroup={addGroup}
        />
      </PageHeader>
      <DashboardTabs />
      <div className="overflow-hidden">{children}</div>
    </Shell>
  )
}
