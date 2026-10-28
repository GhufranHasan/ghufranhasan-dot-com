import 'server-only'

import { createHash, createHmac, randomBytes, randomInt, timingSafeEqual } from 'node:crypto'
import { isIP } from 'node:net'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { supabaseAdminRequest } from '@/lib/supabase/admin'

export const dashboardCookieName = process.env.NODE_ENV === 'production'
  ? '__Host-gh_dashboard_session' : 'gh_dashboard_session'
export const dashboardTwoFactorCookieName = process.env.NODE_ENV === 'production'
  ? '__Host-gh_dashboard_2fa' : 'gh_dashboard_2fa'
const sessionDurationSeconds = 2 * 60 * 60
export const twoFactorDurationSeconds = 5 * 60
const tokenPattern = /^[A-Za-z0-9_-]{43}$/

function cleanEnvValue(value?: string) {
  return value?.trim().replace(/^['"]|['"]$/g, '') ?? ''
}
function getDashboardPassword() {
  return cleanEnvValue(process.env.DASHBOARD_PASSWORD)
}
function getSessionSecret() {
  const secret = cleanEnvValue(process.env.DASHBOARD_SESSION_SECRET)
  return secret.length >= 32 && secret !== cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY) ? secret : ''
}
export function getDashboardTwoFactorEmailConfig() {
  return {
    apiKey: cleanEnvValue(process.env.RESEND_API_KEY),
    fromEmail: cleanEnvValue(process.env.RESEND_FROM_EMAIL),
    recipientEmail: cleanEnvValue(process.env.DASHBOARD_2FA_EMAIL).toLowerCase(),
  }
}
export function hasTwoFactorConfigured() {
  const { apiKey, fromEmail, recipientEmail } = getDashboardTwoFactorEmailConfig()
  return Boolean(apiKey && fromEmail && recipientEmail.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail))
}
export function isDashboardConfigured() {
  const password = getDashboardPassword()
  return Boolean(password.length >= 16 && password.length <= 256 && getSessionSecret()
    && hasTwoFactorConfigured() && cleanEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL)
    && cleanEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY))
}
export function verifyDashboardPassword(password: string) {
  if (!isDashboardConfigured() || password.length > 256) return false
  const hash = (value: string) => createHash('sha256').update(value).digest()
  return timingSafeEqual(hash(password), hash(getDashboardPassword()))
}
function digest(kind: string, ...values: string[]) {
  const secret = getSessionSecret()
  if (!secret) throw new Error('Dashboard security is not configured.')
  // Rotating the password, recipient, or independent secret invalidates existing tokens.
  return createHmac('sha256', secret).update(JSON.stringify([
    'dashboard-v2', kind, getDashboardPassword(),
    getDashboardTwoFactorEmailConfig().recipientEmail, ...values,
  ])).digest('hex')
}
export function createDashboardSessionValue() {
  return randomBytes(32).toString('base64url')
}
export function createDashboardTwoFactorCode() {
  return randomInt(0, 1_000_000).toString().padStart(6, '0')
}
export async function createDashboardTwoFactorChallenge(code: string) {
  if (!isDashboardConfigured() || !/^\d{6}$/.test(code)) throw new Error('Invalid dashboard challenge.')
  const token = createDashboardSessionValue()
  const saved = await supabaseAdminRequest<{ token_hash: string }[]>('dashboard_login_challenges', {
    method: 'POST', prefer: 'return=representation',
    body: { token_hash: digest('challenge', token), code_hash: digest('code', token, code) },
  })
  if (!saved[0]?.token_hash) throw new Error('Dashboard challenge could not be saved.')
  return token
}
export async function completeDashboardTwoFactorChallenge(token: string | undefined, code: string) {
  if (!isDashboardConfigured() || !token || !tokenPattern.test(token) || !/^\d{6}$/.test(code)) return null
  const session = createDashboardSessionValue()
  const accepted = await supabaseAdminRequest<boolean>('rpc/dashboard_complete_login', {
    method: 'POST',
    body: {
      p_challenge_hash: digest('challenge', token),
      p_code_hash: digest('code', token, code),
      p_session_hash: digest('session', session),
    },
  })
  return accepted === true ? session : null
}
export async function verifyDashboardSessionValue(token?: string) {
  if (!isDashboardConfigured() || !token || !tokenPattern.test(token)) return false
  try {
    return await supabaseAdminRequest<boolean>('rpc/dashboard_validate_session', {
      method: 'POST', body: { p_token_hash: digest('session', token) },
    }) === true
  } catch {
    console.error('Dashboard session validation unavailable; access denied.')
    return false
  }
}
export async function isDashboardAuthenticated() {
  return verifyDashboardSessionValue((await cookies()).get(dashboardCookieName)?.value)
}
async function revokeToken(table: string, kind: string, token?: string) {
  if (!token || !tokenPattern.test(token) || !getSessionSecret()) return
  await supabaseAdminRequest(table, { method: 'DELETE', query: 'token_hash=eq.' + digest(kind, token) })
}
export async function revokeDashboardSession(token?: string) {
  await revokeToken('dashboard_sessions', 'session', token)
}
export async function revokeDashboardChallenge(token?: string) {
  await revokeToken('dashboard_login_challenges', 'challenge', token)
}
export function getDashboardCookieOptions(maxAge = sessionDurationSeconds) {
  return {
    httpOnly: true, sameSite: 'strict' as const, secure: process.env.NODE_ENV === 'production',
    path: '/', maxAge, priority: 'high' as const,
  }
}
export function getDashboardTwoFactorCookieOptions(maxAge = twoFactorDurationSeconds) {
  return getDashboardCookieOptions(maxAge)
}
function getDashboardClientIp(request: NextRequest) {
  // Vercel overwrites this at its edge; self-hosted unknown clients share one budget.
  if (process.env.VERCEL !== '1') return 'unknown'
  const ip = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
  return ip && isIP(ip) ? ip : 'unknown'
}
export async function consumeDashboardLoginAttempt(request: NextRequest, codeStep: boolean) {
  const checks = [
    { key: 'ip:' + getDashboardClientIp(request), limit: 15 },
    { key: codeStep ? 'owner:code' : 'owner:password', limit: codeStep ? 60 : 30 },
  ]
  for (const { key, limit } of checks) {
    const retryAfter = await supabaseAdminRequest<number>('rpc/dashboard_consume_rate_limit', {
      method: 'POST',
      body: { p_key_hash: digest('rate', key), p_limit: limit, p_window_seconds: 900 },
    })
    if (!Number.isInteger(retryAfter) || retryAfter < 0) throw new Error('Invalid dashboard rate limit response.')
    if (retryAfter > 0) return retryAfter
  }
  return 0
}
