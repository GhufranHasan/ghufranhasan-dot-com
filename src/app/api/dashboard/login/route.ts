import { NextRequest, NextResponse } from 'next/server'
import {
  createDashboardSessionValue,
  createDashboardTwoFactorChallengeValue,
  createDashboardTwoFactorCode,
  dashboardCookieName,
  dashboardTwoFactorCookieName,
  getDashboardCookieOptions,
  getDashboardTwoFactorCookieOptions,
  getDashboardTwoFactorEmailConfig,
  isDashboardConfigured,
  hasTwoFactorConfigured,
  verifyDashboardPassword,
  verifyDashboardTwoFactorCode,
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

type ResendResult = {
  message?: string
  error?: {
    message?: string
  }
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
  return current.count > MAX_LOGIN_ATTEMPTS_PER_WINDOW
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
    body: JSON.stringify({
      from: fromEmail,
      to: recipientEmail,
      subject: 'Your Ghufran Hasan dashboard verification code',
      html: `
        <h1>Dashboard verification code</h1>
        <p>Use this code to finish signing in to the private website dashboard:</p>
        <p style="font-size: 32px; font-weight: 700; letter-spacing: 8px;">${escapeHtml(code)}</p>
        <p>This code expires in 10 minutes. If you did not request it, ignore this email and consider changing your dashboard password.</p>
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
  const code = cleanText(body.code, 20)

  if (code) {
    const challengeCookie = request.cookies.get(dashboardTwoFactorCookieName)

    if (!verifyDashboardTwoFactorCode(challengeCookie?.value, code)) {
      return NextResponse.json(
        { error: 'The verification code is incorrect or expired.' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ message: 'Dashboard unlocked.' })
    response.cookies.set(
      dashboardCookieName,
      createDashboardSessionValue(),
      getDashboardCookieOptions()
    )
    response.cookies.set(
      dashboardTwoFactorCookieName,
      '',
      getDashboardTwoFactorCookieOptions(0)
    )

    return response
  }

  if (!verifyDashboardPassword(password)) {
    return NextResponse.json(
      { error: 'The dashboard password is incorrect.' },
      { status: 401 }
    )
  }

  // If two-factor email is configured, challenge with 2FA
  if (hasTwoFactorConfigured()) {
    const twoFactorCode = createDashboardTwoFactorCode()
    const codeSent = await sendDashboardCode(twoFactorCode)

    if (!codeSent) {
      return NextResponse.json(
        {
          error:
            'The dashboard password was accepted, but the verification code could not be sent. Check DASHBOARD_2FA_EMAIL, RESEND_API_KEY, and RESEND_FROM_EMAIL.',
        },
        { status: 502 }
      )
    }

    const { recipientEmail } = getDashboardTwoFactorEmailConfig()
    const response = NextResponse.json(
      {
        message: 'Verification code sent.',
        requiresTwoFactor: true,
        destination: maskEmail(recipientEmail),
        expiresInMinutes: 10,
      },
      { status: 202 }
    )
    response.cookies.set(
      dashboardTwoFactorCookieName,
      createDashboardTwoFactorChallengeValue(twoFactorCode),
      getDashboardTwoFactorCookieOptions()
    )

    return response
  }

  // Otherwise, unlock the dashboard directly with password
  const response = NextResponse.json({ message: 'Dashboard unlocked.' })
  response.cookies.set(
    dashboardCookieName,
    createDashboardSessionValue(),
    getDashboardCookieOptions()
  )

  return response
}
