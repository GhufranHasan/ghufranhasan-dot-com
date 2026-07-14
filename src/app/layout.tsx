import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from './providers'
import StickyCTA from '@/components/layout/StickyCTA'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'

export const metadata: Metadata = {
  metadataBase: new URL('https://ghufranhasan.com'),
  title: {
    default: 'Ghufran Hasan | LinkedIn-to-Website Funnel Strategist',
    template: '%s | Ghufran Hasan',
  },
  description: 'Helping B2B founders, coaches, and creators turn LinkedIn attention into booked conversations through profile, website, and CTA alignment.',
  keywords: [
    'personal brand website',
    'LinkedIn funnel strategist',
    'B2B founder website funnel',
    'LinkedIn profile optimization',
    'conversion website design',
    'website conversion strategy',
    'booked conversations',
  ],
  authors: [{ name: 'Ghufran Hasan' }],
  creator: 'Ghufran Hasan',
  publisher: 'Ghufran Hasan',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ghufran Hasan | LinkedIn-to-Website Funnel Strategist',
    description: 'A LinkedIn-to-website conversion system for B2B founders, coaches, and creators who are getting visibility but not enough booked conversations.',
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
    title: 'Ghufran Hasan | LinkedIn-to-Website Funnel Strategist',
    description: 'Turn LinkedIn attention into booked conversations with profile, website, and CTA alignment.',
    images: ['/images/profile.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'geo.position': '51.5074;-0.1278',
    'geo.region': 'GB',
    'geo.placename': 'London',
    'ICBM': '51.5074, -0.1278',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className="antialiased">
        <div className="site-backdrop" aria-hidden="true" />
        <ClientProviders>
          <Navigation />
          <main>{children}</main>
          <Footer />
          <StickyCTA />
        </ClientProviders>
        <GoogleAnalytics />
      </body>
    </html>
  )
}
