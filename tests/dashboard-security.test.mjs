import assert from 'node:assert/strict'
import fs from 'node:fs'
import { after, beforeEach, test } from 'node:test'
import { PGlite } from '@electric-sql/pglite'
import { NextRequest } from 'next/server.js'
import { loadServerModule } from './helpers/server-module.mjs'

const db = await PGlite.create()
await db.exec('create role anon; create role authenticated; create role service_role bypassrls;')
// A sentinel verifies that applying the auth migration never modifies existing applications.
await db.exec("create table public.audit_requests (id integer); insert into public.audit_requests values (42);")
await db.exec('grant select, insert, update, delete on public.audit_requests to anon, authenticated;')
const migration = fs.readFileSync(new URL('../supabase/migrations/20261027000000_harden_dashboard_auth.sql', import.meta.url), 'utf8')
await db.exec(migration)
after(async () => db.close())
beforeEach(async () => {
  await db.exec('reset role; truncate dashboard_sessions, dashboard_login_challenges, dashboard_auth_rate_limits;')
})

const baseEnv = {
  NODE_ENV: 'production',
  DASHBOARD_PASSWORD: 'a-long-test-only-passphrase-123',
  DASHBOARD_SESSION_SECRET: 'test-only-independent-secret-'.repeat(3),
  DASHBOARD_2FA_EMAIL: 'owner@example.com',
  RESEND_API_KEY: 'test-only-email-key',
  RESEND_FROM_EMAIL: 'Owner <owner@example.com>',
  NEXT_PUBLIC_SUPABASE_URL: 'https://test-only.supabase.co',
  SUPABASE_SERVICE_ROLE_KEY: 'different-test-only-server-key',
}

async function databaseRequest(table, options = {}) {
  const body = options.body
  if (table === 'rpc/dashboard_consume_rate_limit') {
    return (await db.query('select public.dashboard_consume_rate_limit($1,$2,$3) as value', [body.p_key_hash, body.p_limit, body.p_window_seconds])).rows[0].value
  }
  if (table === 'rpc/dashboard_complete_login') {
    return (await db.query('select public.dashboard_complete_login($1,$2,$3) as value', [body.p_challenge_hash, body.p_code_hash, body.p_session_hash])).rows[0].value
  }
  if (table === 'rpc/dashboard_validate_session') {
    return (await db.query('select public.dashboard_validate_session($1) as value', [body.p_token_hash])).rows[0].value
  }
  if (table === 'dashboard_login_challenges' && options.method === 'POST') {
    return (await db.query('insert into public.dashboard_login_challenges (token_hash,code_hash) values ($1,$2) returning token_hash', [body.token_hash, body.code_hash])).rows
  }
  if (['dashboard_login_challenges', 'dashboard_sessions'].includes(table) && options.method === 'DELETE') {
    await db.query(`delete from public.${table} where token_hash = $1`, [options.query.slice('token_hash=eq.'.length)])
    return undefined
  }
  throw new Error('Unexpected database call: ' + table)
}

function harness({ overrides = {}, store = databaseRequest } = {}) {
  const env = { ...baseEnv, ...overrides }
  const auth = loadServerModule('src/lib/dashboard/auth.ts', {
    env, mocks: { 'next/headers': {}, '@/lib/supabase/admin': { supabaseAdminRequest: store } },
  })
  return { auth, env }
}

const loginRequest = (body, cookie = '', origin = 'https://example.com') => new NextRequest('https://example.com/api/dashboard/login', {
  method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', Cookie: cookie }, body: JSON.stringify(body),
})

function loginRoute(auth, sendEmail = async () => new Response('{}', { status: 200 })) {
  return loadServerModule('src/app/api/dashboard/login/route.ts', {
    env: baseEnv, globals: { fetch: sendEmail },
    mocks: { '@/lib/dashboard/auth': auth, '@/lib/security/request': loadServerModule('src/lib/security/request.ts', { env: baseEnv }) },
  })
}

test('security migration is repeatable and preserves existing application records', async () => {
  await db.exec(migration)
  assert.deepEqual((await db.query('select * from public.audit_requests')).rows, [{ id: 42 }])
})

test('anonymous and ordinary signed-in database users cannot read auth tables or call auth RPCs', async () => {
  for (const role of ['anon', 'authenticated']) {
    await db.exec(`set role ${role}`)
    for (const table of ['audit_requests', 'dashboard_sessions', 'dashboard_login_challenges', 'dashboard_auth_rate_limits']) {
      await assert.rejects(db.query(`select * from public.${table}`), /permission denied/)
      await assert.rejects(db.query(`delete from public.${table}`), /permission denied/)
    }
    await assert.rejects(db.query('insert into public.dashboard_login_challenges (token_hash,code_hash) values ($1,$2)', ['a'.repeat(64), 'b'.repeat(64)]), /permission denied/)
    await assert.rejects(db.query('select public.dashboard_complete_login($1,$2,$3)', ['a'.repeat(64), 'b'.repeat(64), 'c'.repeat(64)]), /permission denied/)
    await assert.rejects(db.query('select public.dashboard_validate_session($1)', ['a'.repeat(64)]), /permission denied/)
    await assert.rejects(db.query('select public.dashboard_consume_rate_limit($1,5,900)', ['a'.repeat(64)]), /permission denied/)
    await db.exec('reset role')
  }
  await db.exec('set role service_role')
  assert.equal((await db.query('select public.dashboard_consume_rate_limit($1,5,900) as value', ['a'.repeat(64)])).rows[0].value, 0)
  await db.exec('reset role')
})

test('login requires a strong password, independent secret, configured owner inbox, email sender and database', () => {
  assert.equal(harness().auth.isDashboardConfigured(), true)
  for (const overrides of [
    { DASHBOARD_PASSWORD: 'short' }, { DASHBOARD_SESSION_SECRET: '' },
    { DASHBOARD_SESSION_SECRET: baseEnv.SUPABASE_SERVICE_ROLE_KEY },
    { DASHBOARD_2FA_EMAIL: '' }, { DASHBOARD_2FA_EMAIL: 'not-an-email' },
    { RESEND_API_KEY: '' }, { RESEND_FROM_EMAIL: '' }, { SUPABASE_SERVICE_ROLE_KEY: '' },
  ]) assert.equal(harness({ overrides }).auth.isDashboardConfigured(), false)
  assert.equal(harness().auth.verifyDashboardPassword(baseEnv.DASHBOARD_PASSWORD), true)
  assert.equal(harness().auth.verifyDashboardPassword(baseEnv.DASHBOARD_PASSWORD + 'x'), false)
})

test('codes are single-use and duplicate completion requests cannot create a second session', async () => {
  const { auth } = harness()
  const challenge = await auth.createDashboardTwoFactorChallenge('123456')
  const attempts = await Promise.all([
    auth.completeDashboardTwoFactorChallenge(challenge, '123456'),
    auth.completeDashboardTwoFactorChallenge(challenge, '123456'),
  ])
  const sessions = attempts.filter(Boolean)
  assert.equal(sessions.length, 1)
  assert.equal(await auth.verifyDashboardSessionValue(sessions[0]), true)
  assert.equal(await auth.completeDashboardTwoFactorChallenge(challenge, '123456'), null)
  const stored = (await db.query('select token_hash from public.dashboard_sessions')).rows[0].token_hash
  assert.notEqual(stored, sessions[0])
  assert.equal(stored.length, 64)
})

test('five wrong codes destroy a challenge and expired challenges cannot complete', async () => {
  const { auth } = harness()
  const challenge = await auth.createDashboardTwoFactorChallenge('123456')
  for (let i = 0; i < 5; i++) assert.equal(await auth.completeDashboardTwoFactorChallenge(challenge, '999999'), null)
  assert.equal(await auth.completeDashboardTwoFactorChallenge(challenge, '123456'), null)
  const expired = await auth.createDashboardTwoFactorChallenge('123456')
  await db.exec("update public.dashboard_login_challenges set expires_at = now() - interval '1 second'")
  assert.equal(await auth.completeDashboardTwoFactorChallenge(expired, '123456'), null)
})

test('malformed tokens/codes and SQL null parameters cannot create a session', async () => {
  let calls = 0
  const { auth } = harness({ store: async () => { calls++; return true } })
  for (const code of ['123-456', ' 123456', '1234567', '１２３４５６']) {
    assert.equal(await auth.completeDashboardTwoFactorChallenge('a'.repeat(43), code), null)
  }
  for (const token of ['legacy.signed.cookie', 'x', 'a'.repeat(44)]) assert.equal(await auth.verifyDashboardSessionValue(token), false)
  assert.equal(calls, 0)
  const { auth: real } = harness()
  await real.createDashboardTwoFactorChallenge('123456')
  const { token_hash } = (await db.query('select token_hash from public.dashboard_login_challenges')).rows[0]
  const result = await db.query('select public.dashboard_complete_login($1,null,$2) as value', [token_hash, 'a'.repeat(64)])
  assert.equal(result.rows[0].value, false)
  assert.equal((await db.query('select * from public.dashboard_sessions')).rows.length, 0)
})

test('sessions expire after inactivity or absolute lifetime and are revoked on logout', async () => {
  const { auth } = harness()
  const signIn = async () => auth.completeDashboardTwoFactorChallenge(await auth.createDashboardTwoFactorChallenge('123456'), '123456')
  const first = await signIn()
  await auth.revokeDashboardSession(first)
  assert.equal(await auth.verifyDashboardSessionValue(first), false)
  const idle = await signIn()
  await db.exec("update public.dashboard_sessions set last_seen_at = now() - interval '31 minutes'")
  assert.equal(await auth.verifyDashboardSessionValue(idle), false)
  const expired = await signIn()
  await db.exec("update public.dashboard_sessions set expires_at = now() - interval '1 second'")
  assert.equal(await auth.verifyDashboardSessionValue(expired), false)
})

test('password, owner email and session-secret rotation invalidate earlier sessions', async () => {
  const { auth } = harness()
  const session = await auth.completeDashboardTwoFactorChallenge(await auth.createDashboardTwoFactorChallenge('123456'), '123456')
  for (const overrides of [
    { DASHBOARD_PASSWORD: 'another-strong-test-only-passphrase' },
    { DASHBOARD_SESSION_SECRET: 'a-new-independent-test-only-secret'.repeat(2) },
    { DASHBOARD_2FA_EMAIL: 'changed@example.com' },
  ]) assert.equal(await harness({ overrides }).auth.verifyDashboardSessionValue(session), false)
})

test('rate limits survive separate server modules and spoofed forwarded IP changes', async () => {
  const request = (ip) => ({ headers: new Headers({ 'x-forwarded-for': ip, 'x-real-ip': ip }) })
  for (let i = 0; i < 15; i++) {
    assert.equal(await harness().auth.consumeDashboardLoginAttempt(request('198.51.100.' + i), false), 0)
  }
  assert.ok(await harness().auth.consumeDashboardLoginAttempt(request('203.0.113.20'), false) > 0)
  const stored = JSON.stringify((await db.query('select * from public.dashboard_auth_rate_limits')).rows)
  assert.equal(stored.includes('198.51.100'), false)
})

test('owner-level rate budget still blocks attempts spread across trusted edge IPs', async () => {
  const { auth } = harness({ overrides: { VERCEL: '1' } })
  for (let i = 0; i < 30; i++) {
    assert.equal(await auth.consumeDashboardLoginAttempt({ headers: new Headers({ 'x-vercel-forwarded-for': '198.51.100.' + i }) }, false), 0)
  }
  assert.ok(await auth.consumeDashboardLoginAttempt({ headers: new Headers({ 'x-vercel-forwarded-for': '203.0.113.1' }) }, false) > 0)
})

test('database outages fail closed without falling back to a password-only session', async () => {
  const { auth } = harness({ store: async () => { throw new Error('Offline') } })
  assert.equal(await auth.verifyDashboardSessionValue('a'.repeat(43)), false)
  const response = await loginRoute(auth).POST(loginRequest({ password: baseEnv.DASHBOARD_PASSWORD }))
  assert.equal(response.status, 503)
  assert.equal(response.headers.has('set-cookie'), false)
})

test('password step sends codes only to the server-configured owner and never issues a session cookie', async () => {
  const { auth } = harness()
  let mail
  const route = loginRoute(auth, async (_url, options) => { mail = JSON.parse(options.body); return new Response('{}') })
  const response = await route.POST(loginRequest({ password: baseEnv.DASHBOARD_PASSWORD, email: 'attacker@example.com' }))
  assert.equal(response.status, 202)
  assert.equal(mail.to, 'owner@example.com')
  const cookies = response.headers.get('set-cookie')
  assert.ok(cookies.includes('__Host-gh_dashboard_2fa='))
  assert.equal(cookies.includes('__Host-gh_dashboard_session='), false)
  assert.equal((await db.query('select * from public.dashboard_sessions')).rows.length, 0)
})

test('email delivery failure cannot create an authenticated session or usable challenge', async () => {
  const { auth } = harness()
  const response = await loginRoute(auth, async () => new Response('{}', { status: 403 })).POST(loginRequest({ password: baseEnv.DASHBOARD_PASSWORD }))
  assert.equal(response.status, 502)
  assert.equal(response.headers.has('set-cookie'), false)
  assert.equal((await db.query('select * from public.dashboard_login_challenges')).rows.length, 0)
})

test('successful email verification sets host-only secure cookies; replay fails', async () => {
  const { auth } = harness()
  const token = await auth.createDashboardTwoFactorChallenge('123456')
  const route = loginRoute(auth)
  const request = () => loginRequest({ code: '123456' }, auth.dashboardTwoFactorCookieName + '=' + token)
  const response = await route.POST(request())
  assert.equal(response.status, 200)
  const cookie = response.headers.get('set-cookie')
  assert.ok(cookie.includes('__Host-gh_dashboard_session='))
  assert.ok(cookie.includes('HttpOnly'))
  assert.ok(cookie.includes('Secure'))
  assert.ok(cookie.includes('SameSite=strict'))
  assert.equal(cookie.includes('Domain='), false)
  assert.equal((await route.POST(request())).status, 401)
})

test('cross-origin sign-in is denied before touching auth storage', async () => {
  const { auth } = harness({ store: () => { throw new Error('Must not touch storage') } })
  const response = await loginRoute(auth).POST(loginRequest({ password: baseEnv.DASHBOARD_PASSWORD }, '', 'https://attacker.example'))
  assert.equal(response.status, 403)
})
