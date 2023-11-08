import { Grainy } from '@/components/grainy'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Expenser',
  description: 'Tracking where your money is going.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn('bg-black text-white', inter.className)}>
        {children}
        <Grainy />
      </body>
    </html>
  )
}
