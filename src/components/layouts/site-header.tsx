import { SessionUser } from '@/actions/server/user'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { UserDropdown } from '../user-dropdown'

interface SiteHeaderProps {
  user: SessionUser | null
}

export const SiteHeader = ({ user }: SiteHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-center border-b-[1px] border-neutral-900">
      <div className="mx-auto flex w-full max-w-[1440px] flex-1 items-start justify-between px-4 py-4 sm:px-8">
        <Link className="text-xl font-semibold tracking-tight" href="/">
          Spenso
        </Link>
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
