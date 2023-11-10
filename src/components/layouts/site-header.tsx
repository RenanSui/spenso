import { SessionUser } from '@/actions/server/user'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { AvatarIcon, DashboardIcon, ExitIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { UserAvatar } from '../user-avatar'

interface SiteHeaderProps {
  user: SessionUser | null
}

export const SiteHeader = ({ user }: SiteHeaderProps) => {
  return (
    <header className="flex items-center justify-between gap-2 border-b-[1px] border-neutral-900 px-8 py-4 md:justify-end">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar user={user} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-neutral-400">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <AvatarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <DashboardIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/signout">
                <ExitIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link className={buttonVariants({ size: 'sm' })} href={'/signin'}>
          Sign in
        </Link>
      )}
    </header>
  )
}
