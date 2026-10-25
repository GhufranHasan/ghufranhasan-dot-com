import 'server-only'

import { createHmac, randomBytes, randomInt, timingSafeEqual } from 'crypto'
import { cookies } from 'next/headers'

export const dashboardCookieName = 'gh_dashboard_session'
export const dashboardTwoFactorCookieName = 'gh_dashboard_2fa'
const sessionDurationSeconds = 60 * 60 * 8
const twoFactorDurationSeconds = 10 * 60

function cleanEnvValue(value?: string) {
  return value?.trim().replace(/^['"]|['"]$/g, '') ?? ''
}

export function isDashboardConfigured() {
  return Boolean(getDashboardPassword() && getSessionSecret())
}

export function hasTwoFactorConfigured() {
  const emailConfig = getDashboardTwoFactorEmailConfig()

  return Boolean(
    emailConfig.apiKey &&
    emailConfig.fromEmail &&
    emailConfig.recipientEmail
  )
}

function getDashboardPassword() {
  return cleanEnvValue(process.env.DASHBOARD_PASSWORD)
}

function getSessionSecret() {
  const secret =
    cleanEnvValue(process.env.DASHBOARD_SESSION_SECRET) ||
    cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY)

  return secret.length >= 32 ? secret : ''
}

export function getDashboardTwoFactorEmailConfig() {
  return {
    apiKey: cleanEnvValue(process.env.RESEND_API_KEY),
    fromEmail: cleanEnvValue(process.env.RESEND_FROM_EMAIL),
    recipientEmail: cleanEnvValue(process.env.DASHBOARD_2FA_EMAIL),
  }
}

function signSessionPayload(payload: string) {
  return createHmac('sha256', getSessionSecret()).update(payload).digest('hex')
}

function createCodeDigest(nonce: string, code: string) {
  return createHmac('sha256', getSessionSecret())
    .update(`${nonce}.${code}`)
    .digest('hex')
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
  const payload = `${expiresAt}.${randomBytes(16).toString('hex')}`
  const signature = signSessionPayload(payload)

  return `${payload}.${signature}`
}

export function createDashboardTwoFactorCode() {
  return randomInt(0, 1_000_000).toString().padStart(6, '0')
}

export function createDashboardTwoFactorChallengeValue(code: string) {
  const expiresAt = Date.now() + twoFactorDurationSeconds * 1000
  const nonce = randomBytes(16).toString('hex')
  const codeDigest = createCodeDigest(nonce, code)
  const payload = `${expiresAt}.${nonce}.${codeDigest}`
  const signature = signSessionPayload(`2fa.${payload}`)

  return `${payload}.${signature}`
}

export function getDashboardCookieOptions(maxAge = sessionDurationSeconds) {
  return {
    httpOnly: true,
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
    priority: 'high' as const,
  }
}

export function getDashboardTwoFactorCookieOptions(maxAge = twoFactorDurationSeconds) {
  return getDashboardCookieOptions(maxAge)
}

export function verifyDashboardSessionValue(value?: string) {
  if (!value || !getSessionSecret()) return false

  const [expiresAt, nonce, signature] = value.split('.')
  if (!expiresAt || !nonce || !signature) return false

  const expiry = Number(expiresAt)
  if (!Number.isFinite(expiry) || expiry <= Date.now()) return false

  return safeCompare(signature, signSessionPayload(`${expiresAt}.${nonce}`))
}

export function verifyDashboardTwoFactorCode(value: string | undefined, code: string) {
  if (!value || !getSessionSecret()) return false

  const cleanCode = code.replace(/\D/g, '')
  if (!/^\d{6}$/.test(cleanCode)) return false

  const [expiresAt, nonce, codeDigest, signature] = value.split('.')
  if (!expiresAt || !nonce || !codeDigest || !signature) return false

  const expiry = Number(expiresAt)
  if (!Number.isFinite(expiry) || expiry <= Date.now()) return false

  const payload = `${expiresAt}.${nonce}.${codeDigest}`
  if (!safeCompare(signature, signSessionPayload(`2fa.${payload}`))) {
    return false
  }

  return safeCompare(codeDigest, createCodeDigest(nonce, cleanCode))
}

export async function isDashboardAuthenticated() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(dashboardCookieName)

  return verifyDashboardSessionValue(sessionCookie?.value)
}
