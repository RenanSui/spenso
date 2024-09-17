import { Signout } from '@/components/auth/sign-out'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getUser()
  if (!user) redirect('/signin')

  return (
    <Shell className="container max-w-md rounded-xl text-neutral-950 dark:text-neutral-50 lg:bg-transparent">
      <PageHeader className="text-center">
        <PageHeaderHeading size="sm">Sign out</PageHeaderHeading>
        <PageHeaderDescription size="sm">Are you sure you want to sign out?</PageHeaderDescription>
      </PageHeader>
      <Signout />
    </Shell>
  )
}
