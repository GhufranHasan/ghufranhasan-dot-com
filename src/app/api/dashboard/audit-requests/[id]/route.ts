import { NextRequest, NextResponse } from 'next/server'
import {
  auditRequestStatuses,
  deleteAuditRequest,
  updateAuditRequestStatus,
  type AuditRequestStatus,
} from '@/lib/supabase/auditRequests'
import { isDashboardAuthenticated } from '@/lib/dashboard/auth'

const validStatuses = new Set<string>(auditRequestStatuses)

const cleanText = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const isAuthenticated = await isDashboardAuthenticated()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Dashboard access required.' }, { status: 401 })
  }

  const { id } = await context.params
  const body = await request.json().catch(() => ({}))
  const status = cleanText(body.status, 80)

  if (!isUuid(id) || !validStatuses.has(status)) {
    return NextResponse.json(
      { error: 'Choose a valid review status.' },
      { status: 400 }
    )
  }

  try {
    const updatedRequest = await updateAuditRequestStatus(
      id,
      status as AuditRequestStatus
    )

    return NextResponse.json({ auditRequest: updatedRequest })
  } catch (error) {
    console.error('Dashboard audit status update error:', error)

    return NextResponse.json(
      { error: 'The review status could not be updated.' },
      { status: 500 }
    )
  }
}

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
      { error: 'Choose a valid review application.' },
      { status: 400 }
    )
  }

  try {
    const deletedRequest = await deleteAuditRequest(id)

    return NextResponse.json({ deleted: Boolean(deletedRequest), id })
  } catch (error) {
    console.error('Dashboard audit delete error:', error)

    return NextResponse.json(
      { error: 'The review application could not be deleted.' },
      { status: 500 }
    )
  }
}
