import { ErrorCard } from '@/components/cards/error-card'
import { SiteFooter } from '@/components/layouts/site-footer'
import { Shell } from '@/components/shells/shell'

export default async function PageNotFound() {
  return (
    <>
      <Shell variant="centered">
        <ErrorCard
          title="Page not found"
          description="The page you are looking for does not exist"
          retryLink="/"
          retryLinkText="Go to Home"
        />
      </Shell>
      <SiteFooter />
    </>
  )
}
