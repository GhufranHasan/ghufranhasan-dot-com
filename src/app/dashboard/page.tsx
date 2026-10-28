import { createPageMetadata } from '@/lib/seo/metadata'
import { connection } from 'next/server'
import { Database } from 'lucide-react'
import DashboardLoginForm from '@/components/dashboard/DashboardLoginForm'
import DashboardView from '@/components/dashboard/DashboardView'
import {
  isDashboardAuthenticated,
  isDashboardConfigured,
} from '@/lib/dashboard/auth'
import {
  getDashboardData,
  normalizeDashboardPeriod,
} from '@/lib/supabase/dashboard'

export const metadata = createPageMetadata({
  title: 'Private Website Dashboard',
  description: 'Private dashboard for Ghufran Hasan to monitor website visits, forms, downloads, subscribers, and database status.',
  path: "/dashboard",
  robots: {
    index: false,
    follow: false,
  },
})

function DashboardSetupNotice() {
  return (
    <main className="min-h-screen px-4 py-10 md:px-8">
      <section className="mx-auto max-w-3xl rounded-2xl border border-orange-500/25 bg-purple-950/70 p-6 shadow-glow backdrop-blur-md md:p-8">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/25">
          <Database size={23} />
        </div>
        <h1 className="text-3xl font-bebas text-white md:text-5xl">
          Dashboard Setup Needed
        </h1>
        <p className="mt-4 leading-relaxed text-white/68">
          Finish the required security setup before opening this dashboard.
          This keeps your applications, subscribers, and analytics away from public
          visitors.
        </p>
        <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/8 p-4">
          <p className="text-sm font-semibold text-white">Add this to `.env.local`:</p>
          <code className="mt-3 block overflow-x-auto rounded-lg bg-purple-950/80 p-4 text-sm text-orange-100">
            DASHBOARD_PASSWORD=use-a-unique-password-with-at-least-16-characters
            {'\n'}
            DASHBOARD_SESSION_SECRET=use-32-or-more-random-characters
            {'\n'}
            DASHBOARD_2FA_EMAIL=your-gmail-or-admin-inbox@example.com
            {'\n'}
            RESEND_API_KEY=your-resend-api-key
            {'\n'}
            RESEND_FROM_EMAIL=Ghufran Hasan &lt;ghufran@ghufranhasan.com&gt;
          </code>
          <p className="mt-3 text-sm text-white/58">
            Email verification is required. The recipient can be Gmail; the sender
            must be verified in Resend. Apply the dashboard security migration in
            Supabase and restart the local server after updating your configuration.
          </p>
        </div>
      </section>
    </main>
  )
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ period?: string | string[] }>
}) {
  await connection()

  if (!isDashboardConfigured()) {
    if (process.env.NODE_ENV === 'production') {
      return <main className="flex min-h-screen items-center px-4 py-10 md:px-8"><DashboardLoginForm available={false} /></main>
    }
    return <DashboardSetupNotice />
  }

  const isAuthenticated = await isDashboardAuthenticated()

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center px-4 py-10 md:px-8">
        <DashboardLoginForm />
      </main>
    )
  }

  const params = await searchParams
  const period = Array.isArray(params.period) ? params.period[0] : params.period
  const dashboardData = await getDashboardData(
    normalizeDashboardPeriod(period)
  )

  return <DashboardView data={dashboardData} />
}
