import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Private Website Dashboard',
  description:
    'Private dashboard for Ghufran Hasan to monitor website visits, forms, downloads, subscribers, and database status.',
  robots: {
    index: false,
    follow: false,
  },
}

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
          Add a private password before opening this dashboard. This keeps your
          applications, subscribers, and analytics away from public visitors.
        </p>
        <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/8 p-4">
          <p className="text-sm font-semibold text-white">Add this to `.env.local`:</p>
          <code className="mt-3 block overflow-x-auto rounded-lg bg-purple-950/80 p-4 text-sm text-orange-100">
            DASHBOARD_PASSWORD=choose-a-strong-private-password
          </code>
          <p className="mt-3 text-sm text-white/58">
            Restart the Next.js server after adding it.
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
