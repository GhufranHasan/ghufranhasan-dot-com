'use client'

export type SiteEventPayload = {
  eventType:
    | 'page_view'
    | 'section_view'
    | 'cta_click'
    | 'download'
    | 'form_submission'
    | 'system'
  eventName: string
  path?: string
  sectionId?: string
  resourceSlug?: string
  metadata?: Record<string, string | number | boolean | null | undefined>
}

const visitorKey = 'gh_site_visitor_id'
const sessionKey = 'gh_site_session_id'

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}_${crypto.randomUUID()}`
  }

  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

function getStorageId(storage: Storage, key: string, prefix: string) {
  const existing = storage.getItem(key)
  if (existing) return existing

  const created = createId(prefix)
  storage.setItem(key, created)
  return created
}

function getVisitorId() {
  try {
    return getStorageId(window.localStorage, visitorKey, 'visitor')
  } catch {
    return ''
  }
}

function getSessionId() {
  try {
    return getStorageId(window.sessionStorage, sessionKey, 'session')
  } catch {
    return ''
  }
}

export function trackSiteEvent(payload: SiteEventPayload) {
  if (typeof window === 'undefined') return
  if (window.location.pathname.startsWith('/dashboard')) return

  const eventPayload = {
    ...payload,
    path: payload.path || `${window.location.pathname}${window.location.search}`,
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    referrer: document.referrer || '',
  }

  const body = JSON.stringify(eventPayload)

  if ('sendBeacon' in navigator) {
    const blob = new Blob([body], { type: 'application/json' })
    navigator.sendBeacon('/api/site-events', blob)
    return
  }

  void fetch('/api/site-events', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  })
}
