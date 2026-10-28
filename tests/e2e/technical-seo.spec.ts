import { expect, test } from '@playwright/test'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

const publicRoutes = [
  '/', '/services', '/process', '/pricing', '/proof', '/work', '/case-studies',
  '/free-audit', '/resources', '/resources/linkedin-website-funnel-checklist',
  '/faq', '/contact', '/linkedin-website-funnel', '/linkedin-website-examples',
  '/linkedin-profile-optimization', '/website-conversion-strategy', '/cta-funnel-clarity', '/blog',
]

test.beforeEach(async ({ page }) => {
  await page.route('**/api/site-events', (route) => route.fulfill({
    status: 201, contentType: 'application/json', body: '{"accepted":true}',
  }))
  await page.route(/https:\/\/.*(googletagmanager|google-analytics)\.com\//, (route) => route.abort())
})

test('hero text and actions are visible before JavaScript runs', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL })
  const page = await context.newPage()
  await page.goto('/')
  const heading = page.locator('#home h1')
  await expect(heading).toBeVisible()
  await expect(page.locator('#home p').first()).toBeVisible()
  await expect(page.locator('#home a[href="/free-audit"]')).toBeVisible()
  const hiddenAncestors = await heading.evaluate((element) => {
    const hidden: string[] = []
    for (let node: Element | null = element; node; node = node.parentElement) {
      const style = getComputedStyle(node)
      if (Number(style.opacity) === 0 || style.visibility === 'hidden' || style.transform !== 'none') hidden.push(node.tagName)
    }
    return hidden
  })
  expect(hiddenAncestors).toEqual([])
  await context.close()
})

test('each public route has unique, complete social metadata and a matching canonical', async ({ page, request }) => {
  test.setTimeout(120_000)
  const titles = new Set<string>()
  const descriptions = new Set<string>()
  for (const path of publicRoutes) {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    const title = await page.title()
    expect(titles.has(title), `${path}: duplicate title`).toBeFalsy()
    titles.add(title)
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(descriptions.has(description!), `${path}: duplicate description`).toBeFalsy()
    descriptions.add(description!)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://ghufranhasan.com${path === '/' ? '' : path}`)
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `https://ghufranhasan.com${path === '/' ? '' : path}`)
    for (const property of ['og:title', 'twitter:title']) {
      await expect(page.locator(`meta[${property.startsWith('og:') ? 'property' : 'name'}="${property}"]`)).toHaveAttribute('content', title)
    }
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', description!)
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', description!)
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200')
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content', '630')
  }
  const image = await request.get('/social-preview')
  expect(image.status()).toBe(200)
  expect(image.headers()['content-type']).toContain('image/png')
  const png = await image.body()
  expect(png.readUInt32BE(16)).toBe(1200)
  expect(png.readUInt32BE(20)).toBe(630)
})

test('unknown paths return HTTP 404, noindex, and no homepage canonical', async ({ request, page }) => {
  for (const path of ['/this-page-does-not-exist', '/resources/missing/deep-page']) {
    for (const userAgent of ['Mozilla/5.0', 'Googlebot', 'Twitterbot']) {
      const response = await request.get(path, { headers: { 'User-Agent': userAgent } })
      expect(response.status()).toBe(404)
      const html = await response.text()
      expect(html).toMatch(/name="robots" content="[^"]*noindex/)
      expect(html).not.toContain('rel="canonical"')
      expect((await request.head(path)).status()).toBe(404)
    }
    const response = await page.goto(path)
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page could not be found')
    await expect(page.getByRole('link', { name: 'Services Open page' })).toBeVisible()
  }
})

test('www redirect preserves path and query without matching the canonical host', async ({ request }) => {
  for (const path of ['/', '/services?source=linkedin&campaign=profile', '/resources/missing?next=%2Fprocess&tag=one&tag=two']) {
    const response = await request.get(path, { headers: { Host: 'www.ghufranhasan.com' }, maxRedirects: 0 })
    expect(response.status()).toBe(308)
    expect(new URL(response.headers().location).href).toBe(new URL(path, 'https://ghufranhasan.com').href)
  }
  const response = await request.get('/services?source=linkedin', { headers: { Host: 'ghufranhasan.com' }, maxRedirects: 0 })
  expect(response.status()).toBe(200)
  expect(response.headers().location).toBeUndefined()
})

test('public navigation exposes interior pages as crawlable anchors', async ({ page }) => {
  for (const path of ['/', '/free-audit', '/resources']) {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    for (const target of ['/services', '/process', '/work', '/case-studies']) {
      await expect(page.locator(`footer a[href="${target}"]`)).toBeVisible()
    }
  }
})

test('public pages have one screen heading and no heading-level jumps', async ({ page }) => {
  test.setTimeout(120_000)
  for (const path of [...publicRoutes, '/thank-you']) {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    // Ignore print-only headings; check DOM structure without scroll-reveal opacity affecting it.
    const headings = await page.locator('h1,h2,h3,h4,h5,h6').evaluateAll((nodes) => nodes.filter((node) => {
      for (let parent: Element | null = node; parent; parent = parent.parentElement) {
        if (getComputedStyle(parent).display === 'none') return false
      }
      return true
    }).map((node) => ({ level: Number(node.tagName[1]), text: node.textContent?.trim() })))
    expect(headings.filter((heading) => heading.level === 1), path).toHaveLength(1)
    const jumps = headings.filter((heading, index) => index > 0 && heading.level > headings[index - 1].level + 1)
    expect(jumps, path).toEqual([])
  }
})

test('structured data models a stable person and service graph', async ({ page }) => {
  await page.goto('/')
  const json = await page.locator('script[type="application/ld+json"]').first().textContent()
  expect(json).not.toContain('ProfessionalService')
  const nodes = JSON.parse(json!)
  const person = nodes.find((node: Record<string, string>) => node['@type'] === 'Person')
  const service = nodes.find((node: Record<string, string>) => node['@type'] === 'Service')
  expect(person['@id']).toBe('https://ghufranhasan.com/#person')
  expect(service.provider['@id']).toBe(person['@id'])
  expect(service.serviceType).toBeTruthy()
  for (const offer of service.hasOfferCatalog.itemListElement) {
    expect(offer.itemOffered['@type']).toBe('Service')
    expect(offer.itemOffered.serviceType).toBeTruthy()
    expect(offer.itemOffered.provider['@id']).toBe(person['@id'])
  }
})

test('optional desktop scene renders nonblank pixels and animates after load', async ({ page }, testInfo) => {
  test.setTimeout(120_000)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, value: 8 })
    Object.defineProperty(navigator, 'deviceMemory', { configurable: true, value: 8 })
    Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: false, effectiveType: '4g', addEventListener() {}, removeEventListener() {} } })
  })
  await page.goto('/')
  const canvas = page.locator('[data-hero-3d]')
  await expect(canvas.locator('..')).toHaveAttribute('data-webgl', 'ready', { timeout: 30_000 })
  const nonblank = await canvas.evaluate((element) => new Promise<boolean>((resolve) => {
    requestAnimationFrame(() => {
      const canvas = element as HTMLCanvasElement
      const gl = canvas.getContext('webgl2')!
      const pixels = new Uint8Array(canvas.width * canvas.height * 4)
      gl.readPixels(0, 0, canvas.width, canvas.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
      resolve(pixels.some((value) => value > 0))
    })
  }))
  expect(nonblank).toBeTruthy()
  const first = await canvas.screenshot()
  await page.waitForTimeout(450)
  expect((await canvas.screenshot()).equals(first)).toBeFalsy()
  await page.screenshot({ path: testInfo.outputPath('desktop-hero.png'), fullPage: false })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(canvas.locator('..')).toHaveAttribute('data-webgl', 'skipped')
})

for (const condition of ['reduced motion', 'save data', 'slow connection', 'low CPU', 'low memory', 'mobile']) {
  test(`optional Three.js is not downloaded with ${condition}`, async ({ page }) => {
    if (condition === 'reduced motion') await page.emulateMedia({ reducedMotion: 'reduce' })
    if (condition === 'mobile') await page.setViewportSize({ width: 390, height: 844 })
    await page.addInitScript((condition) => {
      Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, value: condition === 'low CPU' ? 2 : 8 })
      Object.defineProperty(navigator, 'deviceMemory', { configurable: true, value: condition === 'low memory' ? 2 : 8 })
      Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: condition === 'save data', effectiveType: condition === 'slow connection' ? '2g' : '4g', addEventListener() {}, removeEventListener() {} } })
    }, condition)
    const chunkRoot = path.join(process.cwd(), '.next/static/chunks')
    const threeChunks = readdirSync(chunkRoot, { recursive: true, encoding: 'utf8' })
      .filter((file) => file.endsWith('.js') && readFileSync(path.join(chunkRoot, file), 'utf8').includes('THREE.WebGLRenderer'))
      .map((file) => file.split(path.sep).join('/'))
    expect(threeChunks.length, 'Production build must contain a detectable Three.js chunk').toBeGreaterThan(0)
    const requestedScripts: string[] = []
    page.on('request', (request) => {
      if (request.resourceType() === 'script') requestedScripts.push(new URL(request.url()).pathname)
    })
    await page.goto('/')
    await expect(page.locator('[data-hero-3d]').locator('..')).toHaveAttribute('data-webgl', 'skipped')
    await page.waitForTimeout(1800)
    expect(await page.locator('[data-hero-3d]').evaluate((canvas) => canvas.getAttribute('data-engine'))).toBeNull()
    // Compare actual requests with this build's renderer chunk, without re-fetching script bodies.
    for (const chunk of threeChunks) {
      expect(requestedScripts.some((url) => url.endsWith(`/${chunk}`)), chunk).toBeFalsy()
    }
  })
}

for (const width of [360, 390, 412]) {
  test(`mobile navigation, CTAs and every intake dropdown: ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(120_000)
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/')
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: false })
    const toggle = page.locator('button[aria-controls="mobile-navigation"]')
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await page.keyboard.press('Escape')
    await page.locator('#home a[href="/free-audit"]').click()
    await expect(page).toHaveURL(/\/free-audit$/)
    await page.getByLabel('Full Name', { exact: true }).fill('Mobile QA')
    await page.getByLabel('Email Address', { exact: true }).fill('qa@example.com')
    for (const field of await page.getByRole('combobox').all()) {
      await field.click()
      const menu = page.getByRole('listbox')
      await expect(menu).toBeVisible()
      const box = await menu.boundingBox()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.y).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1)
      expect(box!.y + box!.height).toBeLessThanOrEqual(845)
      await field.press('End')
      await field.press('Enter')
      await expect(field).toHaveAttribute('aria-expanded', 'false')
      // The closed menu remains mounted briefly for its exit animation.
      await expect(menu).toHaveCount(0)
    }
    const submit = page.getByRole('button', { name: 'Request My Free Review', exact: true })
    await submit.scrollIntoViewIfNeeded()
    await expect(submit).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    await page.screenshot({ path: testInfo.outputPath(`audit-${width}.png`), fullPage: false })
  })
}
