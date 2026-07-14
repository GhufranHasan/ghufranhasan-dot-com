import { NextRequest, NextResponse } from 'next/server'
import { isDashboardAuthenticated } from '@/lib/dashboard/auth'
import { deleteSiteEvent } from '@/lib/supabase/siteEvents'

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const isAuthenticated = await isDashboardAuthenticated()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Dashboard access required.' }, { status: 401 })
  }

  const { id } = await context.params

  if (!isUuid(id)) {
    return NextResponse.json(
      { error: 'Choose a valid website event.' },
      { status: 400 }
    )
  }

  try {
    const deletedEvent = await deleteSiteEvent(id)

    return NextResponse.json({ deleted: Boolean(deletedEvent), id })
  } catch (error) {
    console.error('Dashboard event delete error:', error)

    return NextResponse.json(
      { error: 'The website event could not be deleted.' },
      { status: 500 }
    )
  }
}
