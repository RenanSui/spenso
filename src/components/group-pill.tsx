import { cn } from '@/lib/utils'
import { type HTMLAttributes } from 'react'

type GroupPillProps = HTMLAttributes<HTMLDivElement>

export default function GroupPill({ children, className }: GroupPillProps) {
  return <div className={cn('bg-background', className)}>{children}</div>
}
