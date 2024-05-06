import { OAuthSignIn } from '@/components/auth/oauth-signin'
import { Shell } from '@/components/shells/shell'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (session?.user) redirect('/signout')

  return (
    <Shell className="container max-w-lg">
      <Card className="bg-white">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>Choose your preferred sign in method</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthSignIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
                Or continue with
              </span>
            </div>
          </div>
          {/* <SignInForm /> */}
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          {/* <div className="text-sm text-neutral-950 dark:text-neutral-400">
            <span className="mr-1 hidden sm:inline-block">Don&apos;t have an account?</span>
            <Link
              aria-label="Sign up"
              href="/signup"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Sign up
            </Link>
          </div>
          <Link
            aria-label="Reset password"
            href="/signin/reset-password"
            className="text-primary text-sm underline-offset-4 transition-colors hover:underline"
          >
            Reset password
          </Link> */}
        </CardFooter>
      </Card>
    </Shell>
  )
}

// export default async function Page() {
//   const session = await getServerSession(authOptions)
//   if (session?.user) redirect('/signout')

//   return (
//     <section className="flex bg-white text-white dark:bg-black">
//       <div className="absolute bottom-0 left-0 right-0 top-0 w-screen md:relative">
//         <Image
//           className="absolute inset-0 h-full w-full object-cover text-transparent opacity-50"
//           src={siteConfig.unsplash.auth.imageUrl}
//           width={1280}
//           height={1080}
//           alt={'photo of city buildings during daytime'}
//         />

//         <div className="relative z-10 flex h-full flex-col justify-between p-4 px-8">
//           <Link className="text-2xl font-semibold tracking-tight text-black dark:text-white" href="/">
//             Spenso
//           </Link>
//           <p className="text-black dark:text-white">
//             Photo by{' '}
//             <a className="hover:underline" href={siteConfig.unsplash.auth.authorUrl} target="_blank">
//               {siteConfig.unsplash.auth.author}
//             </a>{' '}
//             on{' '}
//             <a className="hover:underline" href={siteConfig.unsplash.auth.imagePageUrl} target="_blank">
//               Unsplash
//             </a>
//           </p>
//         </div>
//       </div>

//       <div className="relative z-10 flex h-screen w-screen items-center justify-center p-8">
//         <div className="w-full max-w-[480px] rounded-xl border p-6 shadow dark:border-neutral-900 dark:bg-black xl:mx-8">
//           <div className="flex flex-col space-y-1 pb-6">
//             <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-white">Sign in</h1>
//             <p className="text-sm text-neutral-800 dark:text-zinc-400">Choose your preferred sign in method</p>
//           </div>

//           <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
//             <OAuthSignIn />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }
