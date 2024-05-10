'use client'

import { SidebarNav } from '@/components/layouts/sidebar-nav'
import { ScrollArea } from '@/components/ui/scroll-area'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { DashboardConfig } from '@/types'
import Link from 'next/link'

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const guestDashboardConfig: DashboardConfig = {
  SidebarNav: [
    {
      title: 'Finances',
      href: '/guest/groups',
      disabled: false,
      icon: 'listBulletIcon',
      description: 'Manage your finances',
      items: [],
    },
    {
      title: 'Account',
      href: '/',
      disabled: true,
      icon: 'avatarIcon',
      description: 'Manage your account settings',
      items: [],
    },
    {
      title: 'Settings',
      href: '/',
      disabled: true,
      icon: 'gearIcon',
      description: 'Manage the website settings',
      items: [],
    },
  ],
}

export function GuestDashboardSidebar({ children, className, ...props }: DashboardSidebarProps) {
  return (
    <aside className={cn('h-screen w-full', className)} {...props}>
      <div className="hidden h-[3.55rem] items-center border-b border-border/60 px-6 lg:flex">
        <Link
          href="/"
          className="flex w-fit items-center font-heading tracking-wider text-foreground/90 transition-colors hover:text-foreground"
        >
          {siteConfig.name}
        </Link>
      </div>
      <div className="flex flex-col gap-2.5 px-4 pt-2 lg:px-6 lg:pt-4">{children}</div>
      <ScrollArea className="h-[calc(100vh-8rem)] px-3 py-2.5 lg:px-5">
        <SidebarNav items={guestDashboardConfig.SidebarNav} className="p-1 pt-4" />
      </ScrollArea>
    </aside>
  )
}
