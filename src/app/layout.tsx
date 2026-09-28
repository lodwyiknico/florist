import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ClientProviders } from '@shared/providers/ClientProviders'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Florist — Toko Bunga & Pengiriman Segar',
    template: '%s | Florist',
  },
  description:
    'Layanan pemesanan karangan bunga segar, buket wisuda, pernikahan, dan ucapan selamat dengan pengiriman cepat.',
  keywords: ['florist', 'toko bunga', 'buket bunga', 'flower delivery', 'karangan bunga'],
  authors: [{ name: 'Florist Team' }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#6366f1',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  )
}
