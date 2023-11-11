import { getUser, getUserId } from '@/actions/server/user'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default async function Page() {
  const user = await getUser()
  const userId = await getUserId()

  return (
    <div>
      <h1 className="text-2xl">Home</h1>
      <Link className={buttonVariants()} href="/dashboard/analytics">
        Dashboard Analytics
      </Link>
      <pre>user: {JSON.stringify(user, null, 2)}</pre>
      <pre>userId: {JSON.stringify(userId, null, 2)}</pre>
    </div>
  )
}
