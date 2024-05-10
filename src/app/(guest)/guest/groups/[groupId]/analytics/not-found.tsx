import { ErrorCard } from '@/components/error-card'
import { Shell } from '@/components/shells/shell'

export default function GroupNotFound() {
  return (
    <Shell variant="centered" className="max-w-md">
      <ErrorCard
        title="Group not found"
        description="The group may have expired or you may have already updated your group"
        retryLink="/"
        retryLinkText="Go to Home"
      />
    </Shell>
  )
}
