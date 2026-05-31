import type { Metadata } from 'next'
import './globals.css'
import StickyCTA from '@/components/layout/StickyCTA'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://ghufranhasan.com'),
  title: {
    default: 'Ghufran Hasan | LinkedIn Funnel Strategist for B2B Agencies',
    template: '%s | Ghufran Hasan',
  },
  description: 'I help B2B agency founders turn LinkedIn attention into qualified demo bookings with aligned profile messaging and conversion-focused websites.',
  keywords: [
    'LinkedIn funnel strategist',
    'B2B agency growth',
    'LinkedIn profile optimization',
    'conversion website design',
    'website conversion strategy',
    'qualified demo bookings',
  ],
  authors: [{ name: 'Ghufran Hasan' }],
  creator: 'Ghufran Hasan',
  publisher: 'Ghufran Hasan',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ghufran Hasan | Turn LinkedIn Attention Into Qualified Demos',
    description: 'A LinkedIn-to-website conversion system for B2B agency founders who are getting visibility but not enough booked calls.',
    url: 'https://ghufranhasan.com',
    siteName: 'Ghufran Hasan',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/profile.png',
        width: 1200,
        height: 630,
        alt: 'Ghufran Hasan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghufran Hasan | LinkedIn Funnel Strategist',
    description: 'Turn LinkedIn attention into qualified demo bookings with profile and website conversion strategy.',
    images: ['/images/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <div className="site-backdrop" aria-hidden="true" />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  )
}
