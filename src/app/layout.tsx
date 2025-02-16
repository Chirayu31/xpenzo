import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import QueryClientProviderWrapper from '@/utils/QueryClientProvider'
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/ui/nav'
import { SessionProvider } from 'next-auth/react'

const inter = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Xpenzo',
  description: 'Best expense management tool on the planet',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <QueryClientProviderWrapper>
          <Navbar />
          {children}
        </QueryClientProviderWrapper>
        <Toaster />
      </body>
    </html>
  )
}
