import { Signout } from '@/components/auth/sign-out'
import { PageHeader, PageHeaderDescription, PageHeaderHeading } from '@/components/page-header'
import { Shell } from '@/components/shells/shell'

export default async function Page() {
  // const session = await getServerSession(authOptions)
  // if (!session?.user) redirect('/signin')

  return (
    <Shell className="container max-w-md rounded-xl border border-neutral-200 bg-white shadow dark:border-neutral-800 lg:bg-transparent">
      <PageHeader className="text-center">
        <PageHeaderHeading size="sm">Sign out</PageHeaderHeading>
        <PageHeaderDescription size="sm">Are you sure you want to sign out?</PageHeaderDescription>
      </PageHeader>
      <Signout />
    </Shell>
  )
}
