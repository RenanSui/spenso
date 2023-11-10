import { getUser } from '@/actions/server/user'
import { SiteHeader } from '@/components/layouts/site-header'

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()

  return (
    <div>
      <SiteHeader user={user} />
      {children}
    </div>
  )
}
