import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

type GroupPillProps = HTMLAttributes<HTMLDivElement>

export default function GroupPill({ children, className }: GroupPillProps) {
  return <div className={cn('text-foregound bg-background', className)}>{children}</div>
}
