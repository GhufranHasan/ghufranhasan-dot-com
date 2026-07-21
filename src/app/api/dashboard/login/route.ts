import { NextRequest, NextResponse } from 'next/server'
import {
  createDashboardSessionValue,
  dashboardCookieName,
  getDashboardCookieOptions,
  isDashboardConfigured,
  verifyDashboardPassword,
} from '@/lib/dashboard/auth'
import {
  getClientIp,
  hasJsonContentType,
  isPayloadTooLarge,
  isSameOriginRequest,
} from '@/lib/security/request'

const WINDOW_MS = 15 * 60_000
const MAX_LOGIN_ATTEMPTS_PER_WINDOW = 5
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const cleanText = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

const isRateLimited = (key: string) => {
  const now = Date.now()
  const current = rateLimitStore.get(key)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  current.count += 1
  rateLimitStore.set(key, current)
  return current.count > MAX_LOGIN_ATTEMPTS_PER_WINDOW
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 })
  }

  if (!hasJsonContentType(request) || isPayloadTooLarge(request, 1_024)) {
    return NextResponse.json({ error: 'Invalid dashboard login request.' }, { status: 400 })
  }

  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many login attempts. Please wait before trying again.' },
      { status: 429 }
    )
  }

  if (!isDashboardConfigured()) {
    return NextResponse.json(
      { error: 'Dashboard password is not configured.' },
      { status: 503 }
    )
  }

  const body = await request.json().catch(() => ({}))
  const password = cleanText(body.password, 200)

  if (!verifyDashboardPassword(password)) {
    return NextResponse.json(
      { error: 'The dashboard password is incorrect.' },
      { status: 401 }
    )
  }

  const response = NextResponse.json({ message: 'Dashboard unlocked.' })
  response.cookies.set(
    dashboardCookieName,
    createDashboardSessionValue(),
    getDashboardCookieOptions()
  )

  return response
}
