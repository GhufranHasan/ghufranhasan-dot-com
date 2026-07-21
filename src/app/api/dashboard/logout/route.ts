import { NextRequest, NextResponse } from 'next/server'
import {
  dashboardCookieName,
  getDashboardCookieOptions,
} from '@/lib/dashboard/auth'
import { isSameOriginRequest } from '@/lib/security/request'

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 })
  }

  const response = NextResponse.json({ message: 'Dashboard locked.' })
  response.cookies.set(dashboardCookieName, '', getDashboardCookieOptions(0))

  return response
}
