import type { Metadata } from 'next'
import { Bebas_Neue, Lato } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Ghufran Hasan | LinkedIn Funnel Strategist',
  description: 'Helping B2B agency founders fix inconsistent LinkedIn leads and book more qualified demos.',
  keywords: 'LinkedIn strategist, B2B marketing, funnel builder, web developer',
  authors: [{ name: 'Ghufran Hasan' }],
  openGraph: {
    title: 'Ghufran Hasan | LinkedIn Funnel Strategist',
    description: 'Turn LinkedIn into your #1 client acquisition channel',
    type: 'website',
    locale: 'en_US',
  },
}

const bebas = Bebas_Neue({ 
  weight: '400', 
  subsets: ['latin'], 
  variable: '--font-bebas' 
})

const lato = Lato({ 
  weight: ['400', '700', '900'], 
  subsets: ['latin'], 
  variable: '--font-lato' 
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${lato.variable} scroll-smooth`}>
      <body className="antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}