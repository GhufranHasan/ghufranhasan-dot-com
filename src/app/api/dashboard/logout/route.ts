import { NextRequest, NextResponse } from 'next/server'
import {
  dashboardCookieName,
  dashboardTwoFactorCookieName,
  getDashboardCookieOptions,
  getDashboardTwoFactorCookieOptions,
  revokeDashboardSession,
  revokeDashboardChallenge,
} from '@/lib/dashboard/auth'
import { isSameOriginRequest } from '@/lib/security/request'

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 })
  }

  let revoked = true
  try {
    await revokeDashboardSession(request.cookies.get(dashboardCookieName)?.value)
    await revokeDashboardChallenge(request.cookies.get(dashboardTwoFactorCookieName)?.value)
  } catch {
    revoked = false
    console.error('Dashboard session revocation unavailable.')
  }
  const response = NextResponse.json(
    revoked ? { message: 'Dashboard locked.' } : { error: 'Browser access cleared, but server revocation failed. Rotate your dashboard secret to revoke all sessions.' },
    { status: revoked ? 200 : 503 },
  )
  response.cookies.set(dashboardCookieName, '', getDashboardCookieOptions(0))
  response.cookies.set(
    dashboardTwoFactorCookieName,
    '',
    getDashboardTwoFactorCookieOptions(0)
  )
  if (dashboardCookieName !== 'gh_dashboard_session') {
    response.cookies.set('gh_dashboard_session', '', getDashboardCookieOptions(0))
    response.cookies.set('gh_dashboard_2fa', '', getDashboardTwoFactorCookieOptions(0))
  }

  return response
}
