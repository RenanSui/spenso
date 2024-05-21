import Image from 'next/image'
import Link from 'next/link'

import { siteConfig } from '@/config/site'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="relative grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2">
      <Link
        href="/"
        className="absolute left-8 top-6 z-40 flex items-center text-lg font-bold tracking-tight text-neutral-50/80 transition-colors hover:text-neutral-50 lg:text-neutral-950/80 lg:hover:text-neutral-950 dark:lg:text-neutral-50/80 lg:hover:dark:text-neutral-50"
      >
        {/* <Icons.logo className="mr-2 size-6" aria-hidden="true" /> */}
        <span>{siteConfig.name}</span>
      </Link>
      <main className="absolute left-1/2 top-1/2 z-30 flex w-full -translate-x-1/2 -translate-y-1/2 items-center lg:static lg:left-0 lg:top-0 lg:flex lg:translate-x-0 lg:translate-y-0">
        {children}
      </main>
      <div className="relative aspect-video size-full">
        <Image
          src={siteConfig.unsplash.auth.imageUrl}
          alt="photo of a japanese street with people passing by"
          fill
          className="absolute inset-0 object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white to-black/80 dark:from-black lg:to-black/40" />
        <div className="absolute bottom-4 right-4 z-20 line-clamp-1 rounded-md bg-muted px-3 py-1.5 text-sm text-neutral-500">
          Photo by{' '}
          <a
            href={siteConfig.unsplash.auth.authorUrl}
            className="underline transition-colors hover:text-neutral-900"
          >
            {siteConfig.unsplash.auth.author}{' '}
          </a>
          {' on '}
          <a
            href={siteConfig.unsplash.auth.imagePageUrl}
            className="underline transition-colors hover:text-neutral-900"
          >
            Unsplash
          </a>
        </div>
      </div>
    </div>
  )
}
