import { SiteHeader } from '@/components/site-header'

export default function LobbyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <SiteHeader />
      {children}
    </div>
  )
}
