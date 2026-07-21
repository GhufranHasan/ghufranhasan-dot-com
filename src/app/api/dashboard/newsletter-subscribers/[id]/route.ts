import { NextRequest, NextResponse } from 'next/server'
import { isDashboardAuthenticated } from '@/lib/dashboard/auth'
import {
  deleteNewsletterSubscriber,
  newsletterSubscriberStatuses,
  updateNewsletterSubscriberStatus,
  type NewsletterSubscriberStatus,
} from '@/lib/supabase/newsletterSubscribers'
import {
  hasJsonContentType,
  isPayloadTooLarge,
  isSameOriginRequest,
} from '@/lib/security/request'

const validStatuses = new Set<string>(newsletterSubscriberStatuses)

const cleanText = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

const isUuid = (value: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 })
  }

  if (!hasJsonContentType(request) || isPayloadTooLarge(request, 1_024)) {
    return NextResponse.json({ error: 'Invalid dashboard update request.' }, { status: 400 })
  }

  const isAuthenticated = await isDashboardAuthenticated()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Dashboard access required.' }, { status: 401 })
  }

  const { id } = await context.params
  const body = await request.json().catch(() => ({}))
  const status = cleanText(body.status, 80)

  if (!isUuid(id) || !validStatuses.has(status)) {
    return NextResponse.json(
      { error: 'Choose a valid subscriber status.' },
      { status: 400 }
    )
  }

  try {
    const subscriber = await updateNewsletterSubscriberStatus(
      id,
      status as NewsletterSubscriberStatus
    )

    return NextResponse.json({ subscriber })
  } catch (error) {
    console.error('Dashboard subscriber status update error:', error)

    return NextResponse.json(
      { error: 'The subscriber status could not be updated.' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 })
  }

  const isAuthenticated = await isDashboardAuthenticated()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Dashboard access required.' }, { status: 401 })
  }

  const { id } = await context.params

  if (!isUuid(id)) {
    return NextResponse.json(
      { error: 'Choose a valid newsletter subscriber.' },
      { status: 400 }
    )
  }

  try {
    const subscriber = await deleteNewsletterSubscriber(id)

    return NextResponse.json({ deleted: Boolean(subscriber), id })
  } catch (error) {
    console.error('Dashboard subscriber delete error:', error)

    return NextResponse.json(
      { error: 'The subscriber could not be deleted.' },
      { status: 500 }
    )
  }
}
