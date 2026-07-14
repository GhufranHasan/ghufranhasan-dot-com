'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackSiteEvent } from '@/lib/siteEventClient'

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 90)
}

function getSectionLabel(section: Element, index: number) {
  const explicitLabel =
    section.getAttribute('data-section-name') ||
    section.getAttribute('aria-label') ||
    section.querySelector('h1,h2,h3')?.textContent ||
    section.id

  return explicitLabel?.replace(/\s+/g, ' ').trim() || `Section ${index + 1}`
}

function shouldTrackClick(element: Element) {
  if (element.hasAttribute('data-track-event')) return true

  if (element instanceof HTMLButtonElement) {
    return element.type === 'submit' || /print|save|download/i.test(element.textContent || '')
  }

  if (!(element instanceof HTMLAnchorElement)) return false

  const href = element.getAttribute('href') || ''

  return [
    '/free-audit',
    '/thank-you',
    '/resources/linkedin-website-funnel-checklist',
    'calendly.com',
    'linkedin.com',
    'mailto:',
    'wa.me',
  ].some((target) => href.includes(target))
}

export default function SiteAnalyticsTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || pathname.startsWith('/dashboard')) return

    trackSiteEvent({
      eventType: 'page_view',
      eventName: pathname === '/' ? 'Home page viewed' : `${pathname} viewed`,
      metadata: {
        title: document.title,
      },
    })
  }, [pathname])

  useEffect(() => {
    if (!pathname || pathname.startsWith('/dashboard')) return

    const trackedSections = new Set<string>()
    const sections = Array.from(document.querySelectorAll('section, header'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const section = entry.target
          const index = sections.indexOf(section)
          const label = getSectionLabel(section, index)
          const sectionId = section.id || slugify(label) || `section-${index + 1}`
          const trackingKey = `${pathname}:${sectionId}`

          if (trackedSections.has(trackingKey)) return

          trackedSections.add(trackingKey)
          trackSiteEvent({
            eventType: 'section_view',
            eventName: label,
            sectionId,
            metadata: {
              sectionIndex: index + 1,
            },
          })
        })
      },
      { threshold: 0.45 }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    if (!pathname || pathname.startsWith('/dashboard')) return

    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const clickable = target.closest('a,button')
      if (!clickable || !shouldTrackClick(clickable)) return

      const closestSection = clickable.closest('section,header')
      const sectionLabel = closestSection
        ? getSectionLabel(closestSection, 0)
        : 'Global'
      const label =
        clickable.getAttribute('aria-label') ||
        clickable.textContent?.replace(/\s+/g, ' ').trim() ||
        clickable.getAttribute('href') ||
        'CTA click'

      trackSiteEvent({
        eventType: 'cta_click',
        eventName: label.slice(0, 140),
        sectionId:
          closestSection?.id ||
          (sectionLabel ? slugify(sectionLabel) : undefined),
        metadata: {
          href:
            clickable instanceof HTMLAnchorElement
              ? clickable.getAttribute('href')
              : null,
          section: sectionLabel,
        },
      })
    }

    document.addEventListener('click', handleClick, { capture: true })

    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [pathname])

  return null
}
