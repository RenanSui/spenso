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
      <Card>
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
