import { SessionUser } from '@/actions/server/user'
import { dashboardConfig } from '@/config/dashboard'
import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { UserDropdown } from '../user-dropdown'
import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

interface SiteHeaderProps {
  user: SessionUser | null
}

export const SiteHeader = ({ user }: SiteHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-center border-b bg-white dark:border-neutral-900 dark:bg-neutral-950">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 items-start justify-between px-4 py-4 sm:px-8">
        <MainNav items={siteConfig.mainNav} />
        <MobileNav sidebarNavItems={dashboardConfig.SidebarNav} />
        {user ? (
          <UserDropdown user={user} />
        ) : (
          <Link className={buttonVariants({ size: 'sm' })} href={'/signin'}>
            Sign in
          </Link>
        )}
      </div>
    </header>
  )
}
