import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from './providers'
import AppShell from '@/components/layout/AppShell'

export const metadata: Metadata = {
  metadataBase: new URL('https://ghufranhasan.com'),
  title: {
    default: 'LinkedIn-to-Website Conversion for Service Businesses | Ghufran Hasan',
    template: '%s | Ghufran Hasan',
  },
  description: 'Ghufran Hasan helps LinkedIn-active service businesses diagnose and improve the handoff between LinkedIn positioning, website messaging, proof, and CTA.',
  keywords: [
    'personal brand website',
    'LinkedIn funnel strategist',
    'service business website funnel',
    'LinkedIn profile optimization',
    'conversion website design',
    'website conversion strategy',
    'consultant website conversion',
    'coach website conversion',
    'CTA path',
  ],
  authors: [{ name: 'Ghufran Hasan' }],
  creator: 'Ghufran Hasan',
  publisher: 'Ghufran Hasan',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LinkedIn-to-Website Conversion for Service Businesses | Ghufran Hasan',
    description: 'Diagnose and improve the handoff between LinkedIn positioning, website messaging, proof, and CTA.',
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
    title: 'LinkedIn-to-Website Conversion for Service Businesses | Ghufran Hasan',
    description: 'Diagnose and improve the handoff between LinkedIn positioning, website messaging, proof, and CTA.',
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
          <AppShell>{children}</AppShell>
        </ClientProviders>
      </body>
    </html>
  )
}
