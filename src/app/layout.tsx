import type { Metadata } from 'next'
import './globals.css'
import ClientProviders from './providers'
import AppShell from '@/components/layout/AppShell'
import Footer from '@/components/layout/Footer'

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
          <AppShell footer={<Footer />}>{children}</AppShell>
        </ClientProviders>
      </body>
    </html>
  )
}
