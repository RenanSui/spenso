'use client'

import { cn } from '@/lib/utils'
import type { SidebarNavItem } from '@/types/nav-item'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Icons } from '../ui/icons'
import { ChevronLeftIcon } from '@radix-ui/react-icons'

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[]
}

export const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
  const segment = useSelectedLayoutSegment()

  if (!items?.length) return null

  return (
    <div className={cn('flex w-full flex-col gap-2', className)} {...props}>
      {items.map((item, index) => {
        const Icon = item.icon ? Icons[item.icon] : ChevronLeftIcon

        return item.href ? (
          <Link
            className={cn(
              '',
              item.disabled && 'pointer-events-none opacity-60',
            )}
            aria-label={item.title}
            key={index}
            href={item.href}
          >
            <span
              className={cn(
                'group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-neutral-950 hover:bg-neutral-100 dark:text-neutral-50 dark:hover:bg-neutral-800',
                item.href.includes(String(segment))
                  ? 'bg-neutral-100 font-medium text-black dark:bg-neutral-800 dark:text-neutral-50'
                  : '',
                item.disabled && 'pointer-events-none opacity-60',
              )}
            >
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className="text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline"
          >
            {item.title}
          </span>
        )
      })}
    </div>
  )
}
