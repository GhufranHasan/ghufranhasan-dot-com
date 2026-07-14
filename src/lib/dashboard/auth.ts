import 'server-only'

import { createHmac, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const dashboardCookieName = 'gh_dashboard_session'
const sessionDurationSeconds = 60 * 60 * 8

function cleanEnvValue(value?: string) {
  return value?.trim().replace(/^['"]|['"]$/g, '') ?? ''
}

export function isDashboardConfigured() {
  return Boolean(cleanEnvValue(process.env.DASHBOARD_PASSWORD))
}

function getDashboardPassword() {
  return cleanEnvValue(process.env.DASHBOARD_PASSWORD)
}

function getSessionSecret() {
  return (
    cleanEnvValue(process.env.DASHBOARD_SESSION_SECRET) ||
    cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY) ||
    getDashboardPassword()
  )
}

function signSessionPayload(payload: string) {
  return createHmac('sha256', getSessionSecret()).update(payload).digest('hex')
}

function safeCompare(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  if (leftBuffer.length !== rightBuffer.length) return false

  return timingSafeEqual(leftBuffer, rightBuffer)
}

export function verifyDashboardPassword(password: string) {
  const configuredPassword = getDashboardPassword()

  if (!configuredPassword) return false

  return safeCompare(password, configuredPassword)
}

export function createDashboardSessionValue() {
  const expiresAt = Date.now() + sessionDurationSeconds * 1000
  const payload = String(expiresAt)
  const signature = signSessionPayload(payload)

  return `${payload}.${signature}`
}

export function getDashboardCookieOptions(maxAge = sessionDurationSeconds) {
  return {
    httpOnly: true,
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
  }
}

export function verifyDashboardSessionValue(value?: string) {
  if (!value || !getSessionSecret()) return false

  const [expiresAt, signature] = value.split('.')
  if (!expiresAt || !signature) return false

  const expiry = Number(expiresAt)
  if (!Number.isFinite(expiry) || expiry <= Date.now()) return false

  return safeCompare(signature, signSessionPayload(expiresAt))
}

export async function isDashboardAuthenticated() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(dashboardCookieName)

  return verifyDashboardSessionValue(sessionCookie?.value)
}
