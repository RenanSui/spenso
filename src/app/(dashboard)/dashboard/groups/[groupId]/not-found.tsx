import { ErrorCard } from '@/components/error-card'
import { Shell } from '@/components/shells/shell'

export default function GroupNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Group not found"
        description="The Group may have been deleted"
        retryLink="/"
        retryLinkText="Go to Home"
      />
    </Shell>
  )
}
