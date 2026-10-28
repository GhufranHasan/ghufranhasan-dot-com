import { expect, test } from '@playwright/test'

test('signed-out dashboard shows no records or configuration details', async ({ page, request }) => {
  const response = await page.goto('/dashboard')
  expect(response?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dashboard Access')
  await expect(page.getByLabel('Dashboard Password')).toBeVisible()
  await expect(page.getByRole('navigation')).toHaveCount(0)
  const html = await (await request.get('/dashboard')).text()
  for (const privateDetail of ['RESEND_API_KEY', 'DASHBOARD_SESSION_SECRET', 'Funnel Review Applications']) {
    expect(html).not.toContain(privateDetail)
  }
  expect(html).not.toMatch(/[a-z0-9._%+-]+@gmail\.com/i)
  const headers = response!.headers()
  expect(headers['cache-control']).toContain('no-store')
  expect(headers['x-robots-tag']).toContain('noindex')
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'")
  expect(headers['x-frame-options']).toBe('DENY')
})

test('every admin mutation rejects missing, old and forged sessions before touching records', async ({ request, baseURL }) => {
  const id = '00000000-0000-4000-8000-000000000000'
  const mutations = [
    { endpoint: `/api/dashboard/audit-requests/${id}`, method: 'PATCH', data: { status: 'reviewed' } },
    { endpoint: `/api/dashboard/audit-requests/${id}`, method: 'DELETE' },
    { endpoint: `/api/dashboard/newsletter-subscribers/${id}`, method: 'PATCH', data: { status: 'unsubscribed' } },
    { endpoint: `/api/dashboard/newsletter-subscribers/${id}`, method: 'DELETE' },
    { endpoint: `/api/dashboard/site-events/${id}`, method: 'DELETE' },
    { endpoint: '/api/dashboard/site-events', method: 'DELETE', data: { periodDays: 1, confirmation: 'DELETE_EVENTS' } },
  ]
  for (const cookie of ['', 'gh_dashboard_session=legacy.signed.cookie', `__Host-gh_dashboard_session=${'x'.repeat(43)}`]) {
    for (const { endpoint, method, data } of mutations) {
      const response = await request.fetch(endpoint, {
        method, data, headers: { Origin: baseURL!, Cookie: cookie, 'Content-Type': 'application/json' },
      })
      expect(response.status(), endpoint).toBe(401)
    }
  }
})

test('dashboard login and logout reject cross-site requests without sending mail', async ({ request }) => {
  for (const endpoint of ['/api/dashboard/login', '/api/dashboard/logout']) {
    const response = await request.post(endpoint, {
      headers: { Origin: 'https://attacker.example', 'Content-Type': 'application/json' }, data: '{}',
    })
    expect(response.status()).toBe(403)
    expect(response.headers()['set-cookie']).toBeUndefined()
  }
})

test('owner login screen remains usable on mobile without exposing account details', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto('/dashboard')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360)
  await expect(page.getByLabel('Dashboard Password')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Send verification code' })).toBeVisible()
})

test('dashboard uses fresh CSP nonces, hydrates, and blocks injected scripts', async ({ page, request }) => {
  const errors: string[] = []
  const consoleErrors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()) })
  // Parser-inserted markup exercises CSP independently of privileged DevTools evaluation.
  await page.route('**/dashboard', async (route) => {
    const response = await route.fetch()
    const nonce = response.headers()['content-security-policy'].match(/'nonce-([^']+)'/)![1]
    const body = (await response.text()).replace('</head>',
      `<script nonce="${nonce}">window.__dashboardTrusted = true</script><script>window.__dashboardInjected = true</script></head>`)
    await route.fulfill({ response, body })
  })
  const response = await page.goto('/dashboard')
  const policy = response!.headers()['content-security-policy']
  const scriptPolicy = policy.split(';').find((part) => part.trim().startsWith('script-src'))!
  expect(scriptPolicy).toContain("'strict-dynamic'")
  expect(scriptPolicy).not.toContain("'unsafe-inline'")
  expect(scriptPolicy).not.toContain("'unsafe-eval'")
  const nonce = scriptPolicy.match(/'nonce-([^']+)'/)![1]
  expect(nonce.length).toBeGreaterThanOrEqual(32)
  const nextPolicy = (await request.get('/dashboard')).headers()['content-security-policy']
  expect(nextPolicy).not.toContain(`'nonce-${nonce}'`)
  await page.waitForFunction(() => [...document.scripts].some((script) => Boolean(script.nonce)))
  expect(await page.evaluate(() => '__dashboardTrusted' in window)).toBeTruthy()
  expect(await page.evaluate(() => '__dashboardInjected' in window)).toBeFalsy()
  expect(consoleErrors.filter((message) => /Content Security Policy|Refused to|violates/i.test(message))).toHaveLength(1)
  expect(errors).toEqual([])
})
