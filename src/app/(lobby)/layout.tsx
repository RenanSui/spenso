import { SiteHeader } from '@/components/SiteHeader'

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
