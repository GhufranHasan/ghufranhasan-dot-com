import { expect, test } from '@playwright/test'
import sharp from 'sharp'

const assetNames = ['linkedin-profile-blueprint', 'website-decision-path', 'cta-enquiry-flow', 'funnel-checklist-cover', 'website-comparison-cover']

test('all 3D masters and sharing images are valid and within their size budgets', async ({ request }) => {
  for (const name of assetNames) {
    const master = await request.get(`/images/resources/${name}-3d.webp`)
    expect(master.status()).toBe(200)
    const body = await master.body()
    expect(body.length).toBeLessThan(200_000)
    const metadata = await sharp(body).metadata()
    expect(metadata.format).toBe('webp')
    expect([metadata.width, metadata.height]).toEqual([1200, 720])
    const social = await request.get(`/images/resources/${name}-3d-social.jpg`)
    expect(social.status()).toBe(200)
    const sharing = await sharp(await social.body()).metadata()
    expect(sharing.format).toBe('jpeg')
    expect([sharing.width, sharing.height]).toEqual([1200, 630])
  }
})

for (const width of [360, 390, 412, 820, 1440]) {
  test(`3D illustrations are visible and correctly framed at ${width}px`, async ({ page }, testInfo) => {
    test.setTimeout(120_000)
    await page.route('**/api/site-events', (route) => route.fulfill({ status: 201, contentType: 'application/json', body: '{"accepted":true}' }))
    await page.route(/https:\/\/.*(googletagmanager|google-analytics)\.com\//, (route) => route.abort())
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/blog')
    for (const image of await page.locator('main article article img').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBeTruthy()
      expect(decodeURIComponent(await image.evaluate((element: HTMLImageElement) => element.currentSrc))).toContain('-3d.webp')
      const box = await image.boundingBox()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1)
      expect(box!.width / box!.height).toBeCloseTo(5 / 3, 1)
    }
    if (width === 390 || width === 1440) {
      await page.locator('main section').first().screenshot({ path: testInfo.outputPath(`blog-3d-${width}.png`) })
    }
    await page.goto('/linkedin-profile-optimization')
    const cover = page.locator('main figure img')
    await expect(cover).toHaveAttribute('loading', 'eager')
    await expect(cover).toHaveAttribute('fetchpriority', 'high')
    await cover.scrollIntoViewIfNeeded()
    await expect.poll(() => cover.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBeTruthy()
    if (width === 390 || width === 1440) {
      await page.locator('main figure').screenshot({ path: testInfo.outputPath(`profile-3d-${width}.png`) })
    }
    expect(errors).toEqual([])
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  })
}
