import { NextRequest, NextResponse } from 'next/server'
import { createSiteEvent, type SiteEventType } from '@/lib/supabase/siteEvents'

const allowedEventTypes = new Set<SiteEventType>([
  'page_view',
  'section_view',
  'cta_click',
  'download',
  'form_submission',
  'system',
])

const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 80
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const cleanText = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

const getClientIp = (request: NextRequest) => {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

const isRateLimited = (key: string) => {
  const now = Date.now()
  const current = rateLimitStore.get(key)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  current.count += 1
  rateLimitStore.set(key, current)
  return current.count > MAX_REQUESTS_PER_WINDOW
}

function sanitizeMetadata(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .slice(0, 20)
      .map(([key, entry]) => {
        if (typeof entry === 'string') return [key.slice(0, 60), entry.slice(0, 500)]
        if (typeof entry === 'number' || typeof entry === 'boolean') {
          return [key.slice(0, 60), entry]
        }

        return [key.slice(0, 60), null]
      })
  )
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)

  if (isRateLimited(ip)) {
    return NextResponse.json({ accepted: false }, { status: 202 })
  }

  try {
    const body = await request.json()
    const eventType = cleanText(body.eventType, 40) as SiteEventType
    const path = cleanText(body.path, 500)

    if (!allowedEventTypes.has(eventType) || path.startsWith('/dashboard')) {
      return NextResponse.json({ accepted: false }, { status: 202 })
    }

    await createSiteEvent({
      eventType,
      eventName: cleanText(body.eventName, 160) || eventType,
      path: path || '/',
      sectionId: cleanText(body.sectionId, 140),
      resourceSlug: cleanText(body.resourceSlug, 180),
      visitorId: cleanText(body.visitorId, 120),
      sessionId: cleanText(body.sessionId, 120),
      referrer: cleanText(body.referrer, 500),
      userAgent: cleanText(request.headers.get('user-agent'), 500),
      metadata: sanitizeMetadata(body.metadata),
    })

    return NextResponse.json({ accepted: true }, { status: 201 })
  } catch (error) {
    console.error('Site event tracking error:', error)

    return NextResponse.json({ accepted: false }, { status: 202 })
  }
}
