import { Providers } from '@/components/providers/providers'
import { Toaster } from '@/components/ui/toaster'
import { siteConfig } from '@/config/site'
import { fontHeading, fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL('https://spenso.vercel.app'),
  keywords: ['nextjs', 'react', 'react server components', 'expense', 'income', 'revenue', 'tracker'],
  authors: [{ name: 'renansui', url: 'https://renansui.vercel.app' }],
  creator: 'renansui',
  openGraph: {
    type: 'website',
    locale: 'en',
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
    creator: '@adsjksui',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable,
          fontHeading.variable,
        )}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
