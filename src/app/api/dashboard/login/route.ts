import { NextRequest, NextResponse } from 'next/server'
import {
  createDashboardSessionValue,
  dashboardCookieName,
  getDashboardCookieOptions,
  isDashboardConfigured,
  verifyDashboardPassword,
} from '@/lib/dashboard/auth'

const cleanText = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

export async function POST(request: NextRequest) {
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
