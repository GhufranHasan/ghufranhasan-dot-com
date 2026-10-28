import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import sharp from 'sharp'

const resourcePages = ['/blog', '/resources', '/website-conversion-strategy', '/linkedin-profile-optimization', '/cta-funnel-clarity']

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.route('**/api/site-events', (route) => route.fulfill({ status: 201, contentType: 'application/json', body: '{"accepted":true}' }))
  await page.route(/https:\/\/.*(googletagmanager|google-analytics)\.com\//, (route) => route.abort())
})

test('all header cutouts have genuine transparency and bounded file sizes', async ({ request }) => {
  for (const name of ['linkedin-profile-blueprint', 'website-decision-path', 'cta-enquiry-flow', 'funnel-checklist-cover', 'website-comparison-cover']) {
    const response = await request.get(`/images/resources/${name}-header.webp`)
    expect(response.status()).toBe(200)
    const buffer = await response.body()
    expect(buffer.length).toBeLessThan(200_000)
    const metadata = await sharp(buffer).metadata()
    expect(metadata.hasAlpha).toBe(true)
    expect([metadata.width, metadata.height]).toEqual([1200, 960])
    const stats = await sharp(buffer).stats()
    expect(stats.channels[3].min).toBe(0)
    expect(stats.channels[3].max).toBe(255)
  }
})

for (const failure of ['denied', 'exception']) {
  test(`hero stays usable without Three.js console errors when GPU access is ${failure}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.addInitScript((failure) => {
      Object.defineProperty(navigator, 'hardwareConcurrency', { configurable: true, value: 8 })
      Object.defineProperty(navigator, 'deviceMemory', { configurable: true, value: 8 })
      Object.defineProperty(navigator, 'connection', { configurable: true, value: { saveData: false, effectiveType: '4g', addEventListener() {}, removeEventListener() {} } })
      const nativeGetContext = HTMLCanvasElement.prototype.getContext
      HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, options?: unknown) {
        if (type === 'webgl2') {
          if (failure === 'exception') throw new Error('GPU context creation is blocked')
          return null
        }
        return nativeGetContext.call(this, type, options)
      } as typeof nativeGetContext
    }, failure)
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => { if (message.type() === 'error' && /THREE|WebGLRenderer|GPU context/i.test(message.text())) errors.push(message.text()) })
    await page.goto('/')
    await expect(page.locator('[data-hero-3d]').locator('..')).toHaveAttribute('data-webgl', 'unavailable', { timeout: 20_000 })
    await expect(page.locator('[data-hero-3d]')).not.toHaveAttribute('data-engine', /three/)
    await expect(page.locator('#home h1')).toBeVisible()
    await expect(page.locator('#home a[href="/free-audit"]')).toBeVisible()
    expect(errors).toEqual([])
  })
}

test('sprint and handoff cards are real links with existing destination anchors', async ({ page, request, baseURL }) => {
  test.setTimeout(120_000)
  await page.goto('/')
  const sprint = page.locator('#services article a')
  const handoff = page.locator('#lead-path article a')
  await expect(sprint).toHaveCount(6)
  await expect(handoff).toHaveCount(4)
  const htmlByPath = new Map<string, string>()
  for (const card of [...await sprint.all(), ...await handoff.all()]) {
    const href = await card.getAttribute('href')
    expect(href).toBeTruthy()
    const target = new URL(href!, baseURL)
    if (!htmlByPath.has(target.pathname)) {
      const response = await request.get(target.pathname)
      expect(response.status()).toBe(200)
      htmlByPath.set(target.pathname, await response.text())
    }
    expect(htmlByPath.get(target.pathname)).toContain(`id="${target.hash.slice(1)}"`)
  }
  await sprint.first().scrollIntoViewIfNeeded()
  await sprint.first().focus()
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/\/process#diagnosis$/)
  await expect(page.locator('#diagnosis')).toBeInViewport()
})

for (const width of [360, 390, 412, 820, 1440]) {
  test(`resource header composition, loading, and footer remain usable at ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(180_000)
    await page.setViewportSize({ width, height: width < 640 ? 844 : 1000 })
    const problems: string[] = []
    page.on('pageerror', (error) => problems.push(error.message))
    page.on('console', (message) => { if (/Largest Contentful Paint|WebGLRenderer|hydration/i.test(message.text()) && ['error', 'warning'].includes(message.type())) problems.push(message.text()) })
    for (const path of resourcePages) {
      await page.goto(path)
      const art = page.locator('[data-resource-header-art]')
      await expect(art).toHaveCount(1)
      await expect(art).toHaveAttribute('loading', 'eager')
      await expect(art).toHaveAttribute('fetchpriority', 'high')
      await expect.poll(() => art.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBeTruthy()
      const imageBox = await art.boundingBox()
      const titleBox = await page.locator('main h1').boundingBox()
      expect(imageBox!.x).toBeGreaterThanOrEqual(0)
      expect(imageBox!.x + imageBox!.width).toBeLessThanOrEqual(width + 1)
      if (width >= 1024) expect(imageBox!.x).toBeGreaterThan(titleBox!.x + titleBox!.width)
      if (path === '/blog' || path === '/resources') {
        for (const image of await page.locator('main section').first().locator('img').all()) await expect(image).toHaveAttribute('loading', 'eager')
      }
      if ((width === 390 || width === 1440) && ['/blog', '/website-conversion-strategy'].includes(path)) {
        await page.locator('main header').screenshot({ path: testInfo.outputPath(`header-${path.slice(1)}-${width}.png`), style: 'nav.fixed, body > div.fixed, nextjs-portal { visibility: hidden !important; }' })
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    }
    const review = page.locator('footer aside[aria-labelledby="footer-review-title"]')
    await review.scrollIntoViewIfNeeded()
    const card = await review.boundingBox()
    const note = await review.locator('p').last().boundingBox()
    expect(card!.y + card!.height - note!.y - note!.height).toBeLessThan(34)
    if (width === 390 || width === 1440) {
      await review.screenshot({ path: testInfo.outputPath(`footer-review-${width}.png`), style: 'nav.fixed, body > div.fixed, nextjs-portal { visibility: hidden !important; }' })
    }
    await expect(review.getByRole('link', { name: 'Request free review' })).toBeVisible()
    await review.getByRole('link', { name: 'Request free review' }).click()
    await expect(page).toHaveURL(/\/free-audit#request-audit$/)
    await expect(page.getByRole('button', { name: 'Request My Free Review', exact: true })).toBeVisible()
    expect(problems).toEqual([])
  })
}

test('new resource header and footer meet accessibility checks', async ({ page }) => {
  await page.goto('/resources')
  const { violations } = await new AxeBuilder({ page }).include('main').include('footer').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([])
})
