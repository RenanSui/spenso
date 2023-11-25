import { Providers } from '@/components/providers/providers'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL('https://spenso.vercel.app'),
  keywords: [
    'nextjs',
    'react',
    'react server components',
    'expense',
    'income',
    'revenue',
    'tracker',
  ],
  authors: [
    {
      name: 'renansui',
      url: 'https://renansui.vercel.app',
    },
  ],
  creator: 'renansui',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: '/opengraph-image.png',
  },
  twitter: {
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/opengraph-image.png`],
    creator: '@LichterRenan',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-white text-black dark:bg-neutral-950 dark:text-white',
          inter.className,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
