import { getTransactionsGroup } from '@/actions/server/transactions-groups'
import { SidebarNav } from '@/components/layouts/sidebar-nav'
import { SiteFooter } from '@/components/layouts/site-footer'
import { SiteHeader } from '@/components/layouts/site-header'
import { ScrollArea } from '@/components/ui/scroll-area'
import { dashboardConfig } from '@/config/dashboard'
import { authOptions } from '@/lib/auth'
import { addTransactionsGroupToNavbarNav } from '@/lib/utils-config'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/signin')

  const transactionsGroups = await getTransactionsGroup()
  const newSidebarNav = await addTransactionsGroupToNavbarNav(dashboardConfig.SidebarNav, transactionsGroups)

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader user={session?.user} />
      <div className="mx-auto w-full max-w-[1440px] flex-1 items-start px-4 sm:px-8 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="-ml-2 hidden h-full border-r dark:border-neutral-900 md:block">
          <ScrollArea className="py-6 pr-6 lg:py-8">
            <SidebarNav items={newSidebarNav} className="p-1" />
          </ScrollArea>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
      <SiteFooter />
    </div>
  )
}
