import { NextRequest, NextResponse } from 'next/server'
import {
  createDashboardTwoFactorChallenge,
  completeDashboardTwoFactorChallenge,
  consumeDashboardLoginAttempt,
  revokeDashboardChallenge,
  createDashboardTwoFactorCode,
  dashboardCookieName,
  dashboardTwoFactorCookieName,
  getDashboardCookieOptions,
  getDashboardTwoFactorCookieOptions,
  getDashboardTwoFactorEmailConfig,
  isDashboardConfigured,
  verifyDashboardPassword,
} from '@/lib/dashboard/auth'
import {
  readJsonObject,
  hasJsonContentType,
  isPayloadTooLarge,
  isSameOriginRequest,
} from '@/lib/security/request'

type ResendResult = {
  message?: string
  error?: {
    message?: string
  }
}

const maskEmail = (email: string) => {
  const [name = '', domain = ''] = email.split('@')
  const visibleName = name.length <= 2 ? name[0] || '*' : name.slice(0, 2)

  return domain ? `${visibleName}***@${domain}` : 'your email'
}

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      })[character] ?? character
  )

async function sendDashboardCode(code: string) {
  const { apiKey, fromEmail, recipientEmail } = getDashboardTwoFactorEmailConfig()

  if (!apiKey || !fromEmail || !recipientEmail) return false

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    signal: AbortSignal.timeout(10_000),
    body: JSON.stringify({
      from: fromEmail,
      to: recipientEmail,
      subject: 'Your Ghufran Hasan dashboard verification code',
      html: `
        <h1>Dashboard verification code</h1>
        <p>Use this code to finish signing in to the private website dashboard:</p>
        <p style="font-size: 32px; font-weight: 700; letter-spacing: 8px;">${escapeHtml(code)}</p>
        <p>This code expires in 5 minutes. If you did not request it, ignore this email and consider changing your dashboard password.</p>
      `,
    }),
  })

  if (!response.ok) {
    const result = (await response.json().catch(() => ({}))) as ResendResult
    console.error('Dashboard 2FA email delivery error:', {
      status: response.status,
      message: result.error?.message || result.message || 'Unknown Resend error',
    })
    return false
  }

  return true
}

export async function POST(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 })
  }
  const body = await readJsonObject(request, 1_024)
  if (!body || !hasJsonContentType(request) || isPayloadTooLarge(request, 1_024)) {
    return NextResponse.json({ error: 'Invalid dashboard login request.' }, { status: 400 })
  }
  if (!isDashboardConfigured()) {
    return NextResponse.json({ error: 'Secure dashboard sign-in is unavailable. Contact the site owner.' }, { status: 503 })
  }

  const codeStep = typeof body.code === 'string'
  try {
    const retryAfter = await consumeDashboardLoginAttempt(request, codeStep)
    if (retryAfter > 0) {
      return NextResponse.json(
        { error: 'Too many sign-in attempts. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } },
      )
    }

    if (codeStep) {
      const session = await completeDashboardTwoFactorChallenge(
        request.cookies.get(dashboardTwoFactorCookieName)?.value, body.code as string,
      )
      if (!session) {
        return NextResponse.json({ error: 'The verification code is incorrect or expired. Start again if needed.' }, { status: 401 })
      }
      const response = NextResponse.json({ message: 'Dashboard unlocked.' })
      response.cookies.set(dashboardCookieName, session, getDashboardCookieOptions())
      response.cookies.set(dashboardTwoFactorCookieName, '', getDashboardTwoFactorCookieOptions(0))
      if (dashboardCookieName !== 'gh_dashboard_session') {
        response.cookies.set('gh_dashboard_session', '', getDashboardCookieOptions(0))
        response.cookies.set('gh_dashboard_2fa', '', getDashboardTwoFactorCookieOptions(0))
      }
      return response
    }

    const password = typeof body.password === 'string' ? body.password : ''
    if (!verifyDashboardPassword(password)) {
      return NextResponse.json({ error: 'Sign-in failed. Check your credentials.' }, { status: 401 })
    }
    await revokeDashboardChallenge(request.cookies.get(dashboardTwoFactorCookieName)?.value)
    const code = createDashboardTwoFactorCode()
    const challenge = await createDashboardTwoFactorChallenge(code)
    const sent = await sendDashboardCode(code).catch(() => false)
    if (!sent) {
      await revokeDashboardChallenge(challenge)
      return NextResponse.json({ error: 'A verification code could not be delivered. Please try again later.' }, { status: 502 })
    }
    const { recipientEmail } = getDashboardTwoFactorEmailConfig()
    const response = NextResponse.json({
      message: 'Verification code sent.',
      requiresTwoFactor: true,
      destination: maskEmail(recipientEmail),
      expiresInMinutes: 5,
    }, { status: 202 })
    response.cookies.set(dashboardTwoFactorCookieName, challenge, getDashboardTwoFactorCookieOptions())
    return response
  } catch {
    console.error('Dashboard sign-in security service unavailable; access denied.')
    return NextResponse.json({ error: 'Secure sign-in is temporarily unavailable. Please try again later.' }, { status: 503 })
  }
}
