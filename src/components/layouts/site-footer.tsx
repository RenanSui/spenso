import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { Icons } from '../ui/icons'
import { ThemeToggle } from './theme-toggle'

export const SiteFooter = () => {
  return (
    <footer className="w-full border-t bg-white px-4 py-4 dark:border-neutral-900 dark:bg-neutral-950 md:px-8">
      <div
        id="footer-bottom"
        aria-labelledby="footer-bottom-heading"
        className="mx-auto flex max-w-[1440px] items-center justify-between space-x-4"
      >
        <div className="flex-1 text-left text-sm leading-loose dark:text-neutral-400">
          Built by{' '}
          <Link
            href={siteConfig.links.githubAccount}
            target="_blank"
            rel="noreferrer"
            className="font-semibold transition-colors hover:underline dark:hover:text-neutral-100"
          >
            Renansui
            <span className="sr-only">Twitter</span>
          </Link>
          .
        </div>
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
    </footer>
  )
}
