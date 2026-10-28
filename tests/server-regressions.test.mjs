import assert from 'node:assert/strict'
import { test } from 'node:test'
import { loadServerModule } from './helpers/server-module.mjs'

const requestHelpers = loadServerModule('src/lib/security/request.ts')

function fakeCanvas(getContext) {
  const listeners = new Map()
  return {
    getContext: (...args) => getContext(...args, listeners),
    addEventListener: (type, listener) => listeners.set(type, listener),
    removeEventListener: (type) => listeners.delete(type),
    listeners,
  }
}

test('optional WebGL fails quietly when context creation is denied and does not retry in the same session', () => {
  const { createOptionalWebGLContext } = loadServerModule('src/lib/visuals/webgl.ts')
  let calls = 0
  let prevented = false
  const canvas = fakeCanvas((name, attributes, listeners) => {
    calls += 1
    assert.equal(name, 'webgl2')
    assert.equal(attributes.powerPreference, 'low-power')
    listeners.get('webglcontextcreationerror')({ preventDefault() { prevented = true } })
    return null
  })
  assert.equal(createOptionalWebGLContext(canvas), null)
  assert.equal(createOptionalWebGLContext(canvas), null)
  assert.equal(calls, 1)
  assert.equal(prevented, true)
  assert.equal(canvas.listeners.size, 0)
})

test('optional WebGL handles sandbox exceptions without exposing an uncaught failure', () => {
  const { createOptionalWebGLContext } = loadServerModule('src/lib/visuals/webgl.ts')
  const canvas = fakeCanvas(() => { throw new Error('GPU access denied') })
  assert.equal(createOptionalWebGLContext(canvas), null)
  assert.equal(canvas.listeners.size, 0)
})

test('optional WebGL rejects an already-lost context', () => {
  const { createOptionalWebGLContext } = loadServerModule('src/lib/visuals/webgl.ts')
  assert.equal(createOptionalWebGLContext(fakeCanvas(() => ({ isContextLost: () => true }))), null)
})

test('optional WebGL reuses a valid context and releases it only while active', () => {
  const { createOptionalWebGLContext, releaseOptionalWebGLContext } = loadServerModule('src/lib/visuals/webgl.ts')
  let lost = false
  let releases = 0
  const context = {
    isContextLost: () => lost,
    getExtension: () => ({ loseContext() { releases += 1; lost = true } }),
  }
  assert.equal(createOptionalWebGLContext(fakeCanvas(() => context)), context)
  releaseOptionalWebGLContext(context)
  releaseOptionalWebGLContext(context)
  assert.equal(releases, 1)
})

test('bounded JSON parser rejects null, arrays, primitives and malformed input', async () => {
  for (const body of ['null', '[]', 'true', '1', '"text"', '{', '']) {
    const request = new Request('http://localhost/', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
    assert.equal(await requestHelpers.readJsonObject(request, 1024), null)
  }
})

test('bounded JSON parser enforces bytes even without Content-Length', async () => {
  const request = new Request('http://localhost/', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: 'a'.repeat(2000) }),
  })
  assert.equal(await requestHelpers.readJsonObject(request, 1024), null)
  const valid = new Request('http://localhost/', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"name":"Test"}',
  })
  assert.equal((await requestHelpers.readJsonObject(valid, 1024)).name, 'Test')
})

test('production local-storage reads do not touch the filesystem and writes fail closed', () => {
  let touchedDisk = false
  const storage = loadServerModule('src/lib/storage/localStore.ts', {
    env: { NODE_ENV: 'production' },
    mocks: { 'node:fs': { existsSync() { touchedDisk = true; throw new Error('Unexpected filesystem access') } } },
  })
  assert.equal(storage.canUseLocalStorage(), false)
  assert.equal(storage.getLocalAuditRequests().length, 0)
  assert.throws(() => storage.saveLocalAuditRequest({}), /Durable database/)
  assert.equal(touchedDisk, false)
})

for (const [name, file, operation] of [
  ['audit request', 'src/lib/supabase/auditRequests.ts', 'createAuditRequest'],
  ['newsletter subscriber', 'src/lib/supabase/newsletterSubscribers.ts', 'upsertNewsletterSubscriber'],
]) {
  test(`production ${name} never reports a failed database write as success`, async () => {
    const unavailable = new Error('Database unavailable')
    const service = loadServerModule(file, {
      mocks: {
        '@/lib/supabase/admin': { supabaseAdminRequest: async () => { throw unavailable } },
        '@/lib/storage/localStore': {
          canUseLocalStorage: () => false,
          saveLocalAuditRequest: () => { throw new Error('Local fallback must not run') },
          saveLocalNewsletterSubscriber: () => { throw new Error('Local fallback must not run') },
        },
      },
    })
    await assert.rejects(service[operation]({}), (error) => error === unavailable)
  })
}

test('unconfigured dashboard rejects legacy and forged sessions without a database call', async () => {
  const auth = loadServerModule('src/lib/dashboard/auth.ts', {
    env: { NODE_ENV: 'production', DASHBOARD_PASSWORD: 'test-password', DASHBOARD_SESSION_SECRET: 'test-only-secret-'.repeat(4) },
    mocks: {
      'next/headers': {},
      '@/lib/supabase/admin': { supabaseAdminRequest() { throw new Error('Unexpected database call') } },
    },
  })
  assert.equal(auth.verifyDashboardPassword('wrong-password'), false)
  assert.equal(auth.isDashboardConfigured(), false)
  assert.equal(await auth.verifyDashboardSessionValue('old.signed.cookie'), false)
  assert.equal(await auth.verifyDashboardSessionValue('a'.repeat(43)), false)
  assert.equal(auth.getDashboardCookieOptions().httpOnly, true)
  assert.equal(auth.getDashboardCookieOptions().secure, true)
  assert.equal(auth.dashboardCookieName.startsWith('__Host-'), true)
})
