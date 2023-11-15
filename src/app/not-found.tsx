import { getUser } from '@/actions/server/user'
import { ErrorCard } from '@/components/cards/error-card'
import { SiteHeader } from '@/components/layouts/site-header'
import { Shell } from '@/components/shells/shell'

export default async function PageNotFound() {
  const user = await getUser()

  return (
    <>
      <SiteHeader user={user} />
      <Shell variant="centered">
        <ErrorCard
          title="Page not found"
          description="The page you are looking for does not exist"
          retryLink="/"
          retryLinkText="Go to Home"
        />
      </Shell>
    </>
  )
}
