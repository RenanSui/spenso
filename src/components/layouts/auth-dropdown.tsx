import { ExitIcon, SunIcon } from '@radix-ui/react-icons'
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { type User } from '@/types'
import { Icons } from '../ui/icons'
import { ThemeToggle } from './theme-toggle'

interface AuthDropdownProps extends React.ComponentPropsWithRef<typeof DropdownMenuTrigger>, ButtonProps {
  user: User | null
}

export function AuthDropdown({ user, className, ...props }: AuthDropdownProps) {
  const initials = `${user?.name?.split(' ')[0]?.charAt(0)} ${user?.name?.split(' ')[1]?.charAt(0)}`
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
              <DropdownMenuItem asChild>
                <Link href={'/dashboard/groups'}>
                  <Icons.dashboardIcon className="mr-2 size-4" aria-hidden="true" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={'/dashboard/account'} className="pointer-events-none opacity-60">
                  <Icons.avatarIcon className="mr-2 size-4" aria-hidden="true" />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={'/dashboard/settings'}>
                  <Icons.gearIcon className="mr-2 size-4" aria-hidden="true" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <div className="flex items-center justify-between px-2 py-1.5">
                <div className="flex items-center text-sm">
                  <SunIcon className="mr-2 size-4" aria-hidden="true" />
                  Theme
                </div>
                <ThemeToggle combobox />
              </div>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/signout">
                <ExitIcon className="mr-2 size-4" aria-hidden="true" />
                Log out
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
