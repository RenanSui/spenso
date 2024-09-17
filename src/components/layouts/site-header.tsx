import { siteConfig } from '@/config/site'
import { type User } from '@/types'
import GroupsCombobox from '../groups-combobox'
import { AuthDropdown } from './auth-dropdown'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

export const SiteHeader = async ({ user }: { user: User | null }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav items={siteConfig.mainNav} />
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
