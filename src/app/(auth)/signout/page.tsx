import { getUser } from '@/actions/server/user'
import { Signout } from '@/components/auth/sign-out'
import { buttonVariants } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Page() {
  const user = await getUser()
  if (!user) redirect('/signin')

  return (
    <section className="flex bg-white text-white dark:bg-black">
      <div className="absolute bottom-0 left-0 right-0 top-0 w-screen md:relative">
        <Image
          className="absolute inset-0 h-full w-full object-cover text-transparent opacity-50"
          src={siteConfig.unsplash.auth.imageUrl}
          width={1280}
          height={1080}
          alt={'photo of city buildings during daytime'}
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-4 px-8">
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
              href={siteConfig.unsplash.auth.authorUrl}
              target="_blank"
            >
              {siteConfig.unsplash.auth.author}
            </a>{' '}
            on{' '}
            <a
              className="hover:underline"
              href={siteConfig.unsplash.auth.imagePageUrl}
              target="_blank"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>

      <div className="relative z-10 flex h-screen w-screen items-center justify-center p-8">
        <div className="w-full max-w-xs rounded-xl bg-transparent p-6 shadow xl:mx-8">
          <div className="flex flex-col items-center space-y-1 pb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-white">
              Sign out
            </h1>
            <p className="w-[150px] text-center text-neutral-800 dark:text-zinc-400">
              Are you sure you want to sign out?
            </p>
          </div>

          <div className="flex justify-center space-x-2">
            <Signout className="w-full">Log out</Signout>
            <Link
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'w-full',
              )}
              href={'/'}
            >
              Go back
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
