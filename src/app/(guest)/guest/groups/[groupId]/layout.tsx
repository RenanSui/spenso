import { GroupTabs } from '@/components/group-tabs'
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header'
import { Shell } from '@/components/shells/shell'

interface GroupLayoutProps extends React.PropsWithChildren {
  params: {
    groupId: string
  }
}

export default async function GroupLayout({
  children,
  params,
}: GroupLayoutProps) {
  const groupId = params.groupId

  return (
    <Shell variant="sidebar" className="gap-4">
      <PageHeader>
        <PageHeaderHeading size="sm">Dashboard</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your group
        </PageHeaderDescription>
      </PageHeader>
      <GroupTabs groupId={groupId} route="guest" />
      <div className="overflow-hidden">{children}</div>
    </Shell>
  )
}
