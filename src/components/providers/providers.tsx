import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { ReactQueryProvider } from './react-query-provider'
import SessionProvider from './session-provider'
import { NextThemesProvider } from './theme-provider'

export const Providers = async ({
  children,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const session = await getServerSession(authOptions)

  return (
    <SessionProvider session={session}>
      <ReactQueryProvider>
        <NextThemesProvider>{children}</NextThemesProvider>
      </ReactQueryProvider>
    </SessionProvider>
  )
}
