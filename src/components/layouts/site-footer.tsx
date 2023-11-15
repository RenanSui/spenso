import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Icons } from '../ui/icons'
import { ThemeToggle } from './theme-toggle'

export const SiteFooter = () => {
  return (
    <div className="flex w-full justify-end border-t border-neutral-900  px-8 py-4">
      <div className="flex">
        <Link
          href={siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({
              size: 'icon',
              variant: 'ghost',
            }),
          )}
        >
          <Icons.github className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">GitHub</span>
        </Link>
        <ThemeToggle />
      </div>
    </div>
  )
}
