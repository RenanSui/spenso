import { getUser } from '@/actions/server/user'
import { SiteHeader } from '@/components/layouts/site-header'

export default async function PageNotFound() {
  const user = await getUser()

  return (
    <>
      <SiteHeader user={user} />
    </>
  )
}
