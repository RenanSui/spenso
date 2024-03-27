import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
  return (
    <section className="container grid max-w-6xl items-center gap-8 pt-0 md:py-8 md:pt-0">
      <h1 className="sr-only">Spenso</h1>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 z-[-1] opacity-60 dark:opacity-50">
        <Image
          className="absolute inset-0 h-full w-full object-cover text-transparent opacity-50"
          src={siteConfig.unsplash.lobby.imageUrl}
          width={1920}
          height={1080}
          priority={true}
          alt={'photo of a cup of coffee in a table with a notebook and a pencil'}
        />

        <div className="sr-only relative z-10 flex h-full flex-col justify-between p-4 px-8">
          <Link
            className="text-2xl font-semibold tracking-tight text-black dark:text-white"
            href="/"
          >
            Spenso
          </Link>
          <p className="text-black dark:text-white">
            Photo by{' '}
            <a
              className="hover:underline"
              href={siteConfig.unsplash.lobby.authorUrl}
              target="_blank"
            >
              {siteConfig.unsplash.lobby.author}
            </a>{' '}
            on{' '}
            <a
              className="hover:underline"
              href={siteConfig.unsplash.lobby.imagePageUrl}
              target="_blank"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>

      <section className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 py-12 text-center md:pt-32">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Simple way to manage personal finances
        </h1>
        <span className="max-w-[42rem] leading-normal text-neutral-600 [text-wrap:balance] dark:text-neutral-400 sm:text-xl sm:leading-8">
          Take charge of your finances with Spenso. Our free budget tracker helps you
          understand your spending for a brighter financial future. Find Happiness In
          Budgeting!
        </span>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link className={buttonVariants()} href="/dashboard/analytics">
            Try now
          </Link>
          <Link className={buttonVariants({ variant: 'outline' })} href="/signin">
            Sign in
          </Link>
        </div>
      </section>
    </section>
  )
}
