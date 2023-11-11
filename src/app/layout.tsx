import SessionProvider from '@/components/session-provider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { authOptions } from './api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spenso',
  description:
    'Spenso is the easiest way to keep track of your income and spending',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={cn('bg-neutral-950 text-white', inter.className)}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
