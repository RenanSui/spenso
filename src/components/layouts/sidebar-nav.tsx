'use client'

import { cn } from '@/lib/utils'
import type { SidebarNavItem } from '@/types/nav-item'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SidebarNavItem[]
}

export const SidebarNav = ({ className, items, ...props }: SidebarNavProps) => {
  const segment = useSelectedLayoutSegment()

  if (!items?.length) return null

  return (
    <div className={cn('flex w-full flex-col gap-2', className)} {...props}>
      {items.map((item, index) => {
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
                'hover:bg-muted hover:text-foreground group flex w-full items-center rounded-md border border-transparent px-2 py-1',
                item.href.includes(String(segment))
                  ? 'bg-neutral-800 font-medium text-neutral-50'
                  : 'text-muted-foreground',
                item.disabled && 'pointer-events-none opacity-60',
              )}
            >
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
