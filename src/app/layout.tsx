import { Providers } from '@/components/providers/providers'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

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
  return (
    <html lang="en">
      <body className={cn('bg-neutral-950 text-white', inter.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
