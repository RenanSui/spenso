import { CurrencyProvider } from '@/components/providers/currency-provider'
import { getUser } from '@/lib/auth'
import { mockUser } from '@/lib/mocks'
import { notFound, redirect } from 'next/navigation'
import { GuestDashboardHeader } from './_components/guest-dashboard-header'
import { GuestDashboardSidebar } from './_components/guest-dashboard-sidebar'
import { GuestDashboardSidebarSheet } from './_components/guest-dashboard-sidebar-sheet'
import { GuestGroupSwitcher } from './_components/guest-group-switcher'
import { GuestProvider } from './_components/guest-provider'
import { SidebarProvider } from './_components/guest-sidebar-provider'

export default async function GuestLayout({ children }: { children: React.ReactNode }) {
  const authUser = await getUser()
  if (authUser) redirect('/')

  const user = mockUser
  if (!user) return notFound()

  return (
    <GuestProvider>
      <CurrencyProvider>
        <SidebarProvider>
          <div className="grid min-h-screen w-full lg:grid-cols-[17.5rem_1fr]">
            <GuestDashboardSidebar className="top-0 z-30 hidden flex-col gap-4 border-r border-border/60 lg:sticky lg:block">
              <GuestGroupSwitcher userId={user.id} />
            </GuestDashboardSidebar>
            <div className="flex flex-col">
              <GuestDashboardHeader user={null}>
                <GuestDashboardSidebarSheet>
                  <GuestDashboardSidebar>
                    <GuestGroupSwitcher userId={user.id} />
                  </GuestDashboardSidebar>
                </GuestDashboardSidebarSheet>
              </GuestDashboardHeader>
              <main className="flex-1 overflow-hidden px-6">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </CurrencyProvider>
    </GuestProvider>
  )
}
