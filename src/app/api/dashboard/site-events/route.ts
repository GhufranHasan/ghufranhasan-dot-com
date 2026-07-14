import { NextRequest, NextResponse } from 'next/server'
import { isDashboardAuthenticated } from '@/lib/dashboard/auth'
import { dashboardPeriods, normalizeDashboardPeriod } from '@/lib/supabase/dashboard'
import { deleteSiteEventsFromDate } from '@/lib/supabase/siteEvents'

export async function DELETE(request: NextRequest) {
  const isAuthenticated = await isDashboardAuthenticated()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Dashboard access required.' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const periodDays = normalizeDashboardPeriod(body.periodDays)
  const confirmation = typeof body.confirmation === 'string' ? body.confirmation : ''

  if (confirmation !== 'DELETE_EVENTS') {
    return NextResponse.json(
      { error: 'Type DELETE_EVENTS to confirm this cleanup.' },
      { status: 400 }
    )
  }

  if (!dashboardPeriods.includes(periodDays)) {
    return NextResponse.json(
      { error: 'Choose a valid cleanup period.' },
      { status: 400 }
    )
  }

  try {
    const since = new Date()
    since.setDate(since.getDate() - periodDays)

    const deletedEvents = await deleteSiteEventsFromDate(since.toISOString())

    return NextResponse.json({
      deleted: deletedEvents.length,
      periodDays,
    })
  } catch (error) {
    console.error('Dashboard bulk event cleanup error:', error)

    return NextResponse.json(
      { error: 'The selected website events could not be deleted.' },
      { status: 500 }
    )
  }
}
