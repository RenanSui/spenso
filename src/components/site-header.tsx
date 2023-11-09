import { getUser } from '@/actions/server/user'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

export const SiteHeader = async () => {
  const user = await getUser()

  return (
    <header className="flex items-center justify-between gap-2 border-b-[1px] border-neutral-900 px-8 py-4 md:justify-end">
      {user ? (
        <>
          <Image
            src={user.image ?? ''}
            alt={'profile pic'}
            className="rounded-full"
            width={32}
            height={32}
          />
          {/* <UserDropdown /> */}
          <Link className={buttonVariants({ size: 'sm' })} href={'/signout'}>
            Sign out
          </Link>
        </>
      ) : (
        <Link className={buttonVariants({ size: 'sm' })} href={'/signin'}>
          Sign in
        </Link>
      )}
    </header>
  )
}
