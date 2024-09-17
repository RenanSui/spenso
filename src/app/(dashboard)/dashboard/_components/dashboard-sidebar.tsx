import { SidebarNav } from '@/components/layouts/sidebar-nav'
import { ScrollArea } from '@/components/ui/scroll-area'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { type NavItemWithChildren } from '@/types'
import Link from 'next/link'
import React from 'react'

interface DashboardSidebarProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  sidebarItems: NavItemWithChildren[]
}

export function DashboardSidebar({ children, className, sidebarItems, ...props }: DashboardSidebarProps) {
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
        <SidebarNav items={sidebarItems} className="p-1 pt-4" />
      </ScrollArea>
    </aside>
  )
}
