import { getUser } from '@/actions/server/user'
import { SidebarNav } from '@/components/layouts/sidebar-nav'
import { SiteFooter } from '@/components/layouts/site-footer'
import { SiteHeader } from '@/components/layouts/site-header'
import { ScrollArea } from '@/components/ui/scroll-area'
import { dashboardConfig } from '@/config/dashboard'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  if (!user) redirect('/signin')

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <div className="mx-auto w-full max-w-[1440px] flex-1 items-start px-4 sm:px-8 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r dark:border-neutral-900 md:sticky md:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <SidebarNav items={dashboardConfig.SidebarNav} className="p-1" />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
      <SiteFooter />
    </div>
  )
}
