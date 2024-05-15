import { DashboardSidebar } from '@/app/(dashboard)/dashboard/_components/dashboard-sidebar'
import { PageHeaderDescription } from '@/components/page-header'
import { CurrencyProvider } from '@/components/providers/currency-provider'
import { guestDashboardConfig } from '@/config/guest'
import { getUser } from '@/lib/auth'
import { mockUser } from '@/lib/mocks'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { GuestDashboardHeader } from './_components/guest-dashboard-header'
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
            <DashboardSidebar
              className="top-0 z-30 hidden flex-col gap-4 border-r border-border/60 lg:sticky lg:block"
              sidebarItems={guestDashboardConfig.SidebarNav}
            >
              <GuestGroupSwitcher userId={user.id} />
            </DashboardSidebar>
            <div className="flex flex-col">
              <GuestDashboardHeader user={null}>
                <GuestDashboardSidebarSheet>
                  <DashboardSidebar sidebarItems={guestDashboardConfig.SidebarNav}>
                    <GuestGroupSwitcher userId={user.id} />
                  </DashboardSidebar>
                </GuestDashboardSidebarSheet>
              </GuestDashboardHeader>
              <main className="flex-1 overflow-hidden px-6">
                {children}
                <PageHeaderDescription size="sm">All your data will be deleted upon close.</PageHeaderDescription>
                <PageHeaderDescription size="sm">
                  <Link href="/signin" className="underline transition-all hover:text-foreground">
                    Sign In
                  </Link>{' '}
                  to sync your data.
                </PageHeaderDescription>
              </main>
            </div>
          </div>
        </SidebarProvider>
      </CurrencyProvider>
    </GuestProvider>
  )
}
