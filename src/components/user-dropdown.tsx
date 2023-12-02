'use client'

import { SessionUser } from '@/actions/server/user'

import {
  AvatarIcon,
  DashboardIcon,
  ExitIcon,
  GearIcon,
  ListBulletIcon,
} from '@radix-ui/react-icons'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { UserAvatar } from './user-avatar'

export const UserDropdown = ({ user }: { user: SessionUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="user-menu-trigger">
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
          <DropdownMenuItem asChild className="pointer-events-none opacity-60">
            <Link href="/dashboard/account">
              <AvatarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/analytics">
              <DashboardIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Analytics
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/transactions">
              <ListBulletIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Transactions
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="pointer-events-none opacity-60">
            <Link href="/dashboard/settings">
              <GearIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              Settings
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
  )
}
