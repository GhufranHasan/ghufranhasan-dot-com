'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import Navigation from '@/components/layout/Navigation'
import StickyCTA from '@/components/layout/StickyCTA'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import SiteAnalyticsTracker from '@/components/analytics/SiteAnalyticsTracker'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  if (isDashboard) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
      <StickyCTA />
      <SiteAnalyticsTracker />
      <GoogleAnalytics />
    </>
  )
}
