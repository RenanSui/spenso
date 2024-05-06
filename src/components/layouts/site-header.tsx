import { getGroups } from '@/actions/server/transactions-groups'
import { dashboardConfig } from '@/config/dashboard'
import { siteConfig } from '@/config/site'
import { addGroupsToNavbarNav } from '@/lib/utils-config'
import { User } from '@/types'
import GroupsCombobox from '../groups-combobox'
import { AuthDropdown } from './auth-dropdown'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

export const SiteHeader = async ({ user }: { user: User | null }) => {
  const transactionsGroups = await getGroups()

  const SidebarNav = transactionsGroups
    ? await addGroupsToNavbarNav(dashboardConfig.SidebarNav, transactionsGroups)
    : dashboardConfig.SidebarNav

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-neutral-900 dark:bg-neutral-950">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav sidebarNavItems={SidebarNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <GroupsCombobox />
            <AuthDropdown user={user} />
          </nav>
        </div>
      </div>
    </header>
  )
}
