import { AvatarIcon, DashboardIcon, ExitIcon, GearIcon, ListBulletIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, type ButtonProps } from '@/components/ui/button'
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
import { cn } from '@/lib/utils'
import { SessionUser } from '@/types'

interface AuthDropdownProps extends React.ComponentPropsWithRef<typeof DropdownMenuTrigger>, ButtonProps {
  user: SessionUser | null | undefined
}

export function AuthDropdown({ user, className, ...props }: AuthDropdownProps) {
  const initials = `${user?.name?.split(' ')[0].charAt(0)} ${user?.name?.split(' ')[1].charAt(0)}`
  const email = `${user?.email}`

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className={cn('size-8 rounded-full', className)} {...props}>
              <Avatar className="size-8">
                <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
                <AvatarFallback className="capitalize">{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-neutral-500">{email}</p>
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
                <ExitIcon className="mr-2 size-4" aria-hidden="true" />
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button size="sm" className={cn(className)} {...props}>
          <Link href="/signin">
            Sign In
            <span className="sr-only">Sign In</span>
          </Link>
        </Button>
      )}
    </>
  )
}
