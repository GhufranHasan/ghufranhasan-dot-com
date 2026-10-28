'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/layout/Navigation'
import StickyCTA from '@/components/layout/StickyCTA'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import SiteAnalyticsTracker from '@/components/analytics/SiteAnalyticsTracker'

export default function AppShell({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  if (isDashboard) {
    return <>{children}</>
  }

  return (
    <>
      <Navigation />
      <main className="overflow-x-clip">{children}</main>
      {footer}
      <StickyCTA />
      <SiteAnalyticsTracker />
      <GoogleAnalytics />
    </>
  )
}
