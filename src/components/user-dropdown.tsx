'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { AvatarIcon, DashboardIcon, ExitIcon, GearIcon, ListBulletIcon } from '@radix-ui/react-icons'
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
import { SessionUser } from '@/types'

export const UserDropdown = ({ user }: { user: SessionUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="user-menu-trigger">
        <Avatar>
          <AvatarImage className="h-8 w-8 rounded-full" src={user.image || ''} />
          <AvatarFallback>
            <div className="h-8 w-8 rounded-full bg-neutral-300 dark:bg-neutral-800" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-neutral-400">{user.email}</p>
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
