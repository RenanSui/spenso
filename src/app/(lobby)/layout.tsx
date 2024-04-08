import { SiteFooter } from '@/components/layouts/site-footer'
import { SiteHeader } from '@/components/layouts/site-header'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function LobbyLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={session?.user} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
