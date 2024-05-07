import { getGroups } from '@/actions/server/transactions-groups'
import { CurrencyProvider } from '@/components/providers/currency-provider'
import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DashboardHeader } from './_components/dashboard-header'
import { DashboardSidebar } from './_components/dashboard-sidebar'
import { DashboardSidebarSheet } from './_components/dashboard-sidebar-sheet'
import { GroupSwitcher } from './_components/group-switcher'
import { SidebarProvider } from './_components/sidebar-provider'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()
  if (!user) redirect('/signin')

  const groupsPromise = getGroups()

  return (
    <CurrencyProvider>
      <SidebarProvider>
        <div className="grid min-h-screen w-full lg:grid-cols-[17.5rem_1fr]">
          <DashboardSidebar className="top-0 z-30 hidden flex-col gap-4 border-r border-border/60 lg:sticky lg:block">
            <GroupSwitcher userId={user.id} groupsPromise={groupsPromise} />
          </DashboardSidebar>
          <div className="flex flex-col">
            <DashboardHeader user={user}>
              <DashboardSidebarSheet>
                <DashboardSidebar>
                  <GroupSwitcher userId={user.id} groupsPromise={groupsPromise} />
                </DashboardSidebar>
              </DashboardSidebarSheet>
            </DashboardHeader>
            <main className="flex-1 overflow-hidden px-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </CurrencyProvider>
  )
}
