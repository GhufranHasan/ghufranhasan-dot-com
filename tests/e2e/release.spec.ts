import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const routes = [
  '/', '/free-audit', '/thank-you', '/services', '/process', '/pricing', '/proof',
  '/work', '/resources', '/resources/linkedin-website-funnel-checklist', '/faq',
  '/contact', '/linkedin-website-funnel', '/linkedin-website-examples',
  '/linkedin-profile-optimization', '/website-conversion-strategy',
  '/cta-funnel-clarity', '/case-studies', '/blog',
]

test.beforeEach(async ({ page }) => {
  // Exercise the real UI without adding QA visits to the owner's analytics.
  await page.route('**/api/site-events', (route) => route.fulfill({
    status: 201, contentType: 'application/json', body: '{"accepted":true}',
  }))
  await page.route(/https:\/\/.*(googletagmanager|google-analytics)\.com\//, (route) => route.abort())
})

for (const path of routes) {
  test(`page loads and links resolve: ${path}`, async ({ page, request, baseURL }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    const response = await page.goto(path, { waitUntil: 'domcontentloaded' })
    expect(response?.status()).toBe(200)
    await expect(page.locator('main h1').first()).toBeVisible()
    await expect(page.locator('h1', { hasText: 'Choose the Page You Need' })).toHaveCount(0)
    await page.waitForTimeout(400)

    const links = await page.locator('a[href]').evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href')!))
    for (const href of new Set(links.filter((href) => href.startsWith('/') || href.startsWith('#')))) {
      const target = new URL(href, new URL(path, baseURL))
      const result = await request.get(target.pathname + target.search)
      expect(result.ok(), `${path}: ${href}`).toBeTruthy()
      if (target.hash) {
        const html = await result.text()
        expect(html, `${path}: missing anchor ${href}`).toContain(`id="${decodeURIComponent(target.hash.slice(1))}"`)
      }
    }
    expect(errors).toEqual([])
  })
}

for (const width of [320, 390, 820, 1440]) {
  test(`responsive layout: ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 640 ? 844 : 1000 })
    for (const path of ['/', '/free-audit', '/pricing', '/resources', '/faq']) {
      await page.goto(path, { waitUntil: 'domcontentloaded' })
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
      expect(overflow, `${path} overflows at ${width}px`).toBeFalsy()
      const clippedText = await page.locator('main a, main button').evaluateAll((elements) => elements.filter((el) => {
        const rect = el.getBoundingClientRect()
        const style = getComputedStyle(el)
        return rect.width > 0 && style.whiteSpace === 'nowrap' && el.scrollWidth > el.clientWidth + 3
      }).map((el) => el.textContent?.trim()))
      expect(clippedText, `${path}: clipped buttons at ${width}px`).toEqual([])
    }
  })
}

for (const path of ['/', '/free-audit', '/resources/linkedin-website-funnel-checklist', '/faq', '/dashboard']) {
  test(`accessibility: ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    // Let reveal animations finish for the visible viewport before inspecting it.
    await page.waitForTimeout(700)
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(violations.map(({ id, impact, nodes }) => ({ id, impact, nodes: nodes.map((node) => ({ target: node.target, failureSummary: node.failureSummary })) }))).toEqual([])
  })
}

test('mobile navigation and FAQ work with keyboard controls', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const toggle = page.locator('button[aria-controls="mobile-navigation"]')
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  const faq = page.locator('#faqs button[aria-expanded]').nth(1)
  await faq.click()
  await expect(faq).toHaveAttribute('aria-expanded', 'true')
  const answerId = await faq.getAttribute('aria-controls')
  await expect(page.locator(`[id="${answerId}"]`)).toBeVisible()
})

test('intake dropdown stays visible, supports keys, and closes on Tab', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/free-audit')
  const field = page.getByRole('combobox', { name: 'What do you want more of?' })
  await field.scrollIntoViewIfNeeded()
  await field.click()
  const menu = page.getByRole('listbox')
  await expect(menu).toBeVisible()
  const bounds = await menu.boundingBox()
  expect(bounds!.y).toBeGreaterThanOrEqual(0)
  expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(845)
  await field.press('End')
  const activeId = await field.getAttribute('aria-activedescendant')
  await expect(page.locator(`[id="${activeId}"]`)).toBeInViewport()
  await field.press('Enter')
  await expect(field).toHaveAttribute('aria-expanded', 'false')
  await field.click()
  await field.press('Tab')
  await expect(field).toHaveAttribute('aria-expanded', 'false')
})

test('intake reports API errors and redirects only after a confirmed save', async ({ page }) => {
  test.setTimeout(90_000)
  await page.goto('/free-audit')
  await page.getByLabel('Full Name', { exact: true }).fill('Release QA')
  await page.getByLabel('Email Address', { exact: true }).fill('qa@example.com')
  await page.getByLabel('LinkedIn Profile URL', { exact: true }).fill('https://linkedin.com/in/release-qa')
  await page.getByLabel('Website URL', { exact: true }).fill('https://example.com')
  await page.getByLabel('Agency Service', { exact: true }).fill('Business consulting')
  await page.getByLabel('What have you already tried?', { exact: true }).fill('Reviewed the page and enquiry flow.')
  for (const select of await page.getByRole('combobox').all()) {
    await select.click()
    await page.getByRole('option').first().click()
  }
  await page.route('**/api/audit-requests', (route) => route.fulfill({
    status: 503, contentType: 'application/json', body: '{"error":"Please try again in a moment."}',
  }))
  const submit = page.getByRole('button', { name: 'Request My Free Review', exact: true })
  await submit.click()
  await expect(page.locator('form [role="alert"]')).toContainText('Please try again')
  await expect(page).toHaveURL(/\/free-audit$/)
  await page.unroute('**/api/audit-requests')
  await page.route('**/api/audit-requests', (route) => route.fulfill({
    status: 201, contentType: 'application/json', body: '{"id":"test-only","message":"Saved"}',
  }))
  await submit.click()
  await expect(page).toHaveURL(/\/thank-you$/)
})

test('public APIs reject malformed payloads and foreign origins without writes', async ({ request, baseURL }) => {
  const headers = { Origin: baseURL!, 'Content-Type': 'application/json' }
  for (const endpoint of ['/api/audit-requests', '/api/newsletter/subscribe']) {
    for (const data of ['null', '[]', '{']) {
      const response = await request.post(endpoint, { headers, data })
      expect(response.status(), `${endpoint}: ${data}`).toBe(400)
    }
    const denied = await request.post(endpoint, { headers: { ...headers, Origin: 'https://untrusted.example' }, data: '{}' })
    expect(denied.status()).toBe(403)
  }
})

test('dashboard mutations require authentication', async ({ request, baseURL }) => {
  for (const endpoint of [
    '/api/dashboard/audit-requests/00000000-0000-4000-8000-000000000000',
    '/api/dashboard/newsletter-subscribers/00000000-0000-4000-8000-000000000000',
    '/api/dashboard/site-events/00000000-0000-4000-8000-000000000000',
  ]) {
    const response = await request.delete(endpoint, { headers: { Origin: baseURL! } })
    expect(response.status()).toBe(401)
  }
  const response = await request.get('/dashboard')
  expect(response.headers()['x-robots-tag']).toContain('noindex')
  expect(response.headers()['cache-control']).toContain('no-store')
  expect((await request.get('/')).headers()['content-security-policy']).not.toContain('unsafe-eval')
})

test('social modal traps focus, closes with Escape, and restores the trigger', async ({ page }) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'All Links', exact: true })
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Connect with Ghufran' })
  await expect(dialog).toBeVisible()
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press('Tab')
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBeTruthy()
  }
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

test('checklist scores, resets, and prints without site navigation', async ({ page }) => {
  await page.goto('/resources/linkedin-website-funnel-checklist')
  const yesButtons = page.getByRole('button', { name: 'Yes', exact: true })
  await expect(yesButtons).toHaveCount(10)
  for (const button of await yesButtons.all()) await button.click()
  await expect(page.getByText('10 of 10 checked', { exact: true })).toBeVisible()
  await expect(page.getByText('Mostly aligned', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: /reset/i }).click()
  await expect(page.getByText('0 of 10 checked', { exact: true })).toBeVisible()
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('.site-navigation')).toBeHidden()
  await expect(page.locator('.site-footer')).toBeHidden()
})
