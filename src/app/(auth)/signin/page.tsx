import signInPhoto from '@/../public/images/sign_in_photo.jpg'
import { OAuthSignIn } from '@/components/auth/oauth-signin'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
  // const user = await getUser()
  // if (user) redirect('/')

  return (
    <section className="flex bg-black text-white">
      <div className="absolute bottom-0 left-0 right-0 top-0 w-screen md:relative">
        <Image
          className="absolute inset-0 h-full w-full object-cover text-transparent opacity-50"
          src={signInPhoto}
          alt={'photo of city buildings during daytime'}
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-4 px-8">
          <Link className="text-2xl font-semibold tracking-tight" href="/">
            Spenso
          </Link>
          <p>
            Photo by{' '}
            <a
              className="hover:underline"
              href="https://unsplash.com/@seanpollock?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              target="_blank"
            >
              Sean Pollock
            </a>{' '}
            on{' '}
            <a
              className="hover:underline"
              href="https://unsplash.com/photos/low-angle-photo-of-city-high-rise-buildings-during-daytime-PhYq704ffdA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
              target="_blank"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>

      <div className="relative z-10 flex h-screen w-screen items-center justify-center p-8">
        <div className="w-full max-w-[480px] rounded-xl border border-neutral-900 bg-black p-6 shadow xl:mx-8">
          <div className="flex flex-col space-y-1 pb-6">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="text-sm text-zinc-400">
              Choose your preferred sign in method
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
            <OAuthSignIn />
          </div>
        </div>
      </div>
    </section>
  )
}
