import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import sharp from 'sharp'

const guides = [
  '/linkedin-profile-optimization', '/website-conversion-strategy', '/cta-funnel-clarity',
]
const collections = ['/blog', '/resources']

test.beforeEach(async ({ page }) => {
  await page.route('**/api/site-events', (route) => route.fulfill({
    status: 201, contentType: 'application/json', body: '{"accepted":true}',
  }))
  await page.route(/https:\/\/.*(googletagmanager|google-analytics)\.com\//, (route) => route.abort())
})

for (const path of guides) {
  test(`guide content, media, metadata, and keyboard interaction: ${path}`, async ({ page, request }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    expect((await page.goto(path))?.status()).toBe(200)
    await expect(page.locator('main h1')).toHaveCount(1)
    expect((await page.locator('main article').first().innerText()).split(/\s+/).length).toBeGreaterThan(650)
    const figure = page.locator('main figure img')
    await figure.scrollIntoViewIfNeeded()
    await expect(figure).toBeVisible()
    await expect(figure).toHaveAttribute('alt', /.+/)
    await expect(figure).toHaveAttribute('loading', 'eager')
    await expect(figure).toHaveAttribute('fetchpriority', 'high')
    await expect.poll(() => figure.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBeTruthy()

    const anchors = await page.getByRole('navigation', { name: 'On this page' }).locator('a').evaluateAll((items) => items.map((item) => item.getAttribute('href')!))
    for (const anchor of anchors) await expect(page.locator(anchor)).toHaveCount(1)
    const jump = page.getByRole('link', { name: 'Read the guide', exact: true })
    await jump.click()
    await expect(page).toHaveURL(new RegExp(`${anchors[0]}$`))
    const question = page.locator('main details summary').first()
    await question.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('main details').first()).toHaveAttribute('open', '')
    await expect(page.locator('main a[href="/free-audit"]')).toHaveCount(1)
    await expect(page.locator('main a[href="/contact"]')).toHaveCount(0)

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://ghufranhasan.com${path}`)
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article')
    const socialImage = await page.locator('meta[property="og:image"]').getAttribute('content')
    expect(socialImage).toMatch(/\/images\/resources\/.+-3d-social\.jpg$/)
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', socialImage!)
    const response = await request.get(new URL(socialImage!).pathname)
    expect(response.ok()).toBeTruthy()
    const socialAsset = await response.body()
    const socialMetadata = await sharp(socialAsset).metadata()
    expect(socialMetadata.format).toBe('jpeg')
    expect(socialMetadata.width).toBe(1200)
    expect(socialMetadata.height).toBe(630)
    const article = await page.locator('main script[type="application/ld+json"]').evaluateAll((scripts) => scripts.map((script) => JSON.parse(script.textContent!)).find((schema) => schema['@type'] === 'Article'))
    expect(article.mainEntityOfPage['@id']).toBe(`https://ghufranhasan.com${path}`)
    expect(article.author['@id']).toBe('https://ghufranhasan.com/#person')
    expect(article.wordCount).toBeGreaterThan(650)
    expect(article.dateModified).toContain('2026-10-28')
    expect(errors).toEqual([])
  })
}

for (const path of collections) {
  test(`all collection cards have relevant working thumbnails and links: ${path}`, async ({ page, request }) => {
    await page.goto(path)
    const cards = page.locator('main article article')
    await expect(cards).toHaveCount(5)
    const sources = new Set<string>()
    for (const [index, card] of (await cards.all()).entries()) {
      const image = card.locator('img')
      await image.scrollIntoViewIfNeeded()
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBeTruthy()
      await expect(image).toHaveAttribute('loading', index < (path === '/blog' ? 3 : 2) ? 'eager' : 'lazy')
      await expect(image).toHaveAttribute('srcset', /\d+w/)
      const src = await image.evaluate((element: HTMLImageElement) => element.currentSrc)
      expect(decodeURIComponent(src)).toContain('-3d.webp')
      sources.add(src)
      const asset = await request.get(src, { headers: { Accept: 'image/avif,image/webp,image/*;q=0.8,*/*;q=0.5' } })
      expect(asset.ok()).toBeTruthy()
      expect(asset.headers()['content-type']).toMatch(/image\/(webp|avif)/)
      expect((await asset.body()).length).toBeLessThan(200_000)
      const href = await card.locator('a').getAttribute('href')
      expect((await request.get(href!)).status()).toBe(200)
    }
    expect(sources.size).toBe(5)
    const collection = await page.locator('main script[type="application/ld+json"]').evaluateAll((scripts) => scripts.map((script) => JSON.parse(script.textContent!)).find((schema) => schema['@type'] === 'CollectionPage'))
    expect(collection.mainEntity.numberOfItems).toBe(5)
  })
}

for (const width of [360, 390, 412, 820, 1440]) {
  test(`resource layouts remain readable and unclipped at ${width}px`, async ({ page }) => {
    test.setTimeout(120_000)
    await page.setViewportSize({ width, height: width < 640 ? 844 : 1000 })
    for (const path of [...guides, ...collections]) {
      await page.goto(path)
      await expect(page.locator('main h1')).toBeVisible()
      if (width < 640 && guides.includes(path)) {
        const figure = await page.locator('main figure img').boundingBox()
        expect(figure!.y, `${path}: illustration should begin above the mobile fold`).toBeLessThan(744)
      }
      const overflow = await page.locator('main h1, main h2, main h3, main p, main img, main summary, main a').evaluateAll((elements) => elements.filter((element) => {
        const rect = element.getBoundingClientRect()
        return rect.width > 0 && (rect.left < -1 || rect.right > window.innerWidth + 1 || element.scrollWidth > element.clientWidth + 2)
      }).map((element) => ({ tag: element.tagName, text: element.textContent?.slice(0, 90) })))
      expect(overflow, `${path} at ${width}px`).toEqual([])
      const levelJumps = await page.locator('main h1, main h2, main h3').evaluateAll((headings) => headings.filter((heading, index) => index > 0 && Number(heading.tagName.slice(1)) > Number(headings[index - 1].tagName.slice(1)) + 1).map((heading) => heading.textContent))
      expect(levelJumps).toEqual([])
      if (width === 390 || width === 1440) {
        for (const image of await page.locator('main img').all()) {
          await image.scrollIntoViewIfNeeded()
          await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBeTruthy()
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
        await page.screenshot({ path: `test-results/resources-${path.slice(1)}-${width}-top.png` })
        await page.screenshot({ path: `test-results/resources-${path.slice(1)}-${width}.png`, fullPage: true })
      }
    }
  })
}

for (const path of [...guides, ...collections]) {
  test(`resource content accessibility: ${path}`, async ({ page }) => {
    await page.goto(path)
    const { violations } = await new AxeBuilder({ page }).include('main').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([])
  })
}

test('guide text, contents links, and questions work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL })
  const page = await context.newPage()
  for (const path of guides) {
    await page.goto(path)
    await expect(page.locator('main h1')).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'On this page' })).toBeVisible()
    await page.locator('main summary').first().click()
    await expect(page.locator('main details').first()).toHaveAttribute('open', '')
  }
  await context.close()
})
