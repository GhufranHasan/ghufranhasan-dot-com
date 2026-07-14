import 'server-only'

import type { AuditRequestRecord } from '@/lib/supabase/auditRequests'
import type { NewsletterSubscriberRecord } from '@/lib/supabase/newsletterSubscribers'
import type { SiteEventRecord, SiteEventType } from '@/lib/supabase/siteEvents'
import { supabaseAdminRequest } from '@/lib/supabase/admin'

type SafeQueryResult<T> =
  | { ok: true; data: T[]; error?: undefined }
  | { ok: false; data: T[]; error: string }

export type DatabaseStatus = {
  label: string
  status: 'connected' | 'needs_setup' | 'error'
  message: string
  rows?: number
}

export type DashboardMetric = {
  label: string
  value: number
  note: string
}

export type EventGroup = {
  label: string
  count: number
  visitors: number
  lastSeen: string | null
}

export type TimeSeriesPoint = {
  label: string
  pageViews: number
  ctaClicks: number
  downloads: number
  formSubmissions: number
}

export type LeadStatusGroup = {
  label: string
  status: string
  count: number
}

export type DashboardData = {
  lastUpdated: string
  windowLabel: string
  periodDays: DashboardPeriodDays
  bucketLabel: string
  metrics: DashboardMetric[]
  databaseStatus: DatabaseStatus[]
  auditRequests: AuditRequestRecord[]
  newsletterSubscribers: NewsletterSubscriberRecord[]
  timeSeries: TimeSeriesPoint[]
  leadStatuses: LeadStatusGroup[]
  topPages: EventGroup[]
  topSections: EventGroup[]
  ctaClicks: EventGroup[]
  downloads: EventGroup[]
  recentEvents: SiteEventRecord[]
}

export const dashboardPeriods = [1, 7, 14, 30, 90, 180, 365] as const

export type DashboardPeriodDays = (typeof dashboardPeriods)[number]

export function normalizeDashboardPeriod(value: unknown): DashboardPeriodDays {
  const parsedValue =
    typeof value === 'string' || typeof value === 'number'
      ? Number(value)
      : Number.NaN

  return dashboardPeriods.includes(parsedValue as DashboardPeriodDays)
    ? (parsedValue as DashboardPeriodDays)
    : 30
}

async function safeSupabaseQuery<T>(
  table: string,
  query: string
): Promise<SafeQueryResult<T>> {
  try {
    const data = await supabaseAdminRequest<T[]>(table, { query })
    return { ok: true, data }
  } catch (error) {
    return {
      ok: false,
      data: [],
      error: error instanceof Error ? error.message : 'Unknown Supabase error',
    }
  }
}

function makeDatabaseStatus<T>(
  label: string,
  result: SafeQueryResult<T>
): DatabaseStatus {
  if (result.ok) {
    return {
      label,
      status: 'connected',
      message: result.data.length
        ? `${result.data.length} recent row${result.data.length === 1 ? '' : 's'} readable.`
        : 'Connected. No rows found yet.',
      rows: result.data.length,
    }
  }

  return {
    label,
    status: 'error',
    message: result.error,
  }
}

function getUniqueVisitorCount(events: SiteEventRecord[]) {
  return new Set(events.map((event) => event.visitor_id).filter(Boolean)).size
}

function groupEvents(
  events: SiteEventRecord[],
  eventType: SiteEventType,
  getLabel: (event: SiteEventRecord) => string | null
) {
  const groups = new Map<
    string,
    { count: number; visitors: Set<string>; lastSeen: string | null }
  >()

  events
    .filter((event) => event.event_type === eventType)
    .forEach((event) => {
      const label = getLabel(event)
      if (!label) return

      const current =
        groups.get(label) ?? { count: 0, visitors: new Set<string>(), lastSeen: null }

      current.count += 1
      if (event.visitor_id) current.visitors.add(event.visitor_id)
      if (!current.lastSeen || event.created_at > current.lastSeen) {
        current.lastSeen = event.created_at
      }

      groups.set(label, current)
    })

  return Array.from(groups.entries())
    .map(([label, value]) => ({
      label,
      count: value.count,
      visitors: value.visitors.size,
      lastSeen: value.lastSeen,
    }))
    .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
}

function countEvents(events: SiteEventRecord[], eventType: SiteEventType) {
  return events.filter((event) => event.event_type === eventType).length
}

function getBucketKey(date: Date, periodDays: DashboardPeriodDays) {
  if (periodDays === 1) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}`
  }

  if (periodDays <= 90) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  }

  return `${date.getFullYear()}-${date.getMonth()}`
}

function getBucketLabel(date: Date, periodDays: DashboardPeriodDays) {
  if (periodDays === 1) {
    return new Intl.DateTimeFormat('en', {
      hour: 'numeric',
    }).format(date)
  }

  if (periodDays <= 90) {
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    year: '2-digit',
  }).format(date)
}

function getBucketStart(date: Date, periodDays: DashboardPeriodDays) {
  const bucket = new Date(date)

  if (periodDays === 1) {
    bucket.setMinutes(0, 0, 0)
    return bucket
  }

  if (periodDays <= 90) {
    bucket.setHours(0, 0, 0, 0)
    return bucket
  }

  bucket.setDate(1)
  bucket.setHours(0, 0, 0, 0)
  return bucket
}

function addBucketInterval(date: Date, periodDays: DashboardPeriodDays) {
  const next = new Date(date)

  if (periodDays === 1) {
    next.setHours(next.getHours() + 1)
    return next
  }

  if (periodDays <= 90) {
    next.setDate(next.getDate() + 1)
    return next
  }

  next.setMonth(next.getMonth() + 1)
  return next
}

function getBucketDescription(periodDays: DashboardPeriodDays) {
  if (periodDays === 1) return 'Hourly'
  if (periodDays <= 90) return 'Daily'
  return 'Monthly'
}

function buildTimeSeries(
  events: SiteEventRecord[],
  since: Date,
  periodDays: DashboardPeriodDays
) {
  const buckets = new Map<string, TimeSeriesPoint>()
  let cursor = getBucketStart(since, periodDays)
  const end = new Date()

  while (cursor <= end) {
    const bucketDate = new Date(cursor)
    buckets.set(getBucketKey(bucketDate, periodDays), {
      label: getBucketLabel(bucketDate, periodDays),
      pageViews: 0,
      ctaClicks: 0,
      downloads: 0,
      formSubmissions: 0,
    })
    cursor = addBucketInterval(cursor, periodDays)
  }

  events.forEach((event) => {
    const eventDate = new Date(event.created_at)
    const key = getBucketKey(eventDate, periodDays)
    const bucket = buckets.get(key)
    if (!bucket) return

    if (event.event_type === 'page_view') bucket.pageViews += 1
    if (event.event_type === 'cta_click') bucket.ctaClicks += 1
    if (event.event_type === 'download') bucket.downloads += 1
    if (event.event_type === 'form_submission') bucket.formSubmissions += 1
  })

  return Array.from(buckets.values())
}

function getLeadStatuses(requests: AuditRequestRecord[]) {
  const groups = new Map<string, number>()

  requests.forEach((request) => {
    groups.set(request.status, (groups.get(request.status) ?? 0) + 1)
  })

  return Array.from(groups.entries()).map(([status, count]) => ({
    status,
    label: status.replace(/_/g, ' '),
    count,
  }))
}

export async function getDashboardData(
  periodDays: DashboardPeriodDays = 30
): Promise<DashboardData> {
  const since = new Date()
  since.setDate(since.getDate() - periodDays)

  const auditQuery =
    `select=id,name,email,linkedin_url,website_url,agency_service,business_type,average_client_value,current_lead_source,main_problem,desired_outcome,timeline,implementation_budget,engagement_intent,status,created_at,updated_at&created_at=gte.${since.toISOString()}&order=created_at.desc&limit=200`
  const subscribersQuery =
    `select=id,email,name,source,resource_slug,status,created_at,updated_at&created_at=gte.${since.toISOString()}&order=created_at.desc&limit=200`
  const eventsQuery = `select=id,event_type,event_name,path,section_id,resource_slug,visitor_id,session_id,referrer,user_agent,metadata,created_at&created_at=gte.${since.toISOString()}&order=created_at.desc&limit=1500`

  const [auditResult, subscribersResult, eventsResult] = await Promise.all([
    safeSupabaseQuery<AuditRequestRecord>('audit_requests', auditQuery),
    safeSupabaseQuery<NewsletterSubscriberRecord>(
      'newsletter_subscribers',
      subscribersQuery
    ),
    safeSupabaseQuery<SiteEventRecord>('site_events', eventsQuery),
  ])

  const events = eventsResult.data
  const pageViews = countEvents(events, 'page_view')
  const sectionViews = countEvents(events, 'section_view')
  const downloadsCount = countEvents(events, 'download')
  const ctaClicksCount = countEvents(events, 'cta_click')
  const formSubmissionsCount = auditResult.data.length
  const newAuditRequests = auditResult.data.filter(
    (request) => request.status === 'new'
  ).length

  const configured =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)

  return {
    lastUpdated: new Date().toISOString(),
    windowLabel: periodDays === 1 ? 'Last 24 hours' : `Last ${periodDays} days`,
    periodDays,
    bucketLabel: getBucketDescription(periodDays),
    metrics: [
      {
        label: 'Visits',
        value: pageViews,
        note: 'First-party page views recorded after tracking is deployed.',
      },
      {
        label: 'Unique visitors',
        value: getUniqueVisitorCount(events),
        note: 'Anonymous visitor IDs, not personal profiles.',
      },
      {
        label: 'Audit applications',
        value: formSubmissionsCount,
        note: `${newAuditRequests} new application${newAuditRequests === 1 ? '' : 's'} need review.`,
      },
      {
        label: 'Checklist downloads',
        value: downloadsCount,
        note: 'Print / save PDF actions from resource pages.',
      },
      {
        label: 'CTA clicks',
        value: ctaClicksCount,
        note: 'Tracked clicks to application, booking, email, and social paths.',
      },
      {
        label: 'Newsletter subscribers',
        value: subscribersResult.data.length,
        note: 'Stored in Supabase from the newsletter form.',
      },
      {
        label: 'Section views',
        value: sectionViews,
        note: 'Visible page sections that entered the viewport.',
      },
    ],
    databaseStatus: [
      {
        label: 'Supabase environment',
        status: configured ? 'connected' : 'needs_setup',
        message: configured
          ? 'Supabase URL and service role key are configured server-side.'
          : 'Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
      },
      makeDatabaseStatus('Audit requests table', auditResult),
      makeDatabaseStatus('Newsletter subscribers table', subscribersResult),
      makeDatabaseStatus('Site events table', eventsResult),
    ],
    auditRequests: auditResult.data,
    newsletterSubscribers: subscribersResult.data,
    timeSeries: buildTimeSeries(events, since, periodDays),
    leadStatuses: getLeadStatuses(auditResult.data),
    topPages: groupEvents(events, 'page_view', (event) => event.path || '/'),
    topSections: groupEvents(
      events,
      'section_view',
      (event) => event.section_id || event.event_name
    ),
    ctaClicks: groupEvents(events, 'cta_click', (event) => event.event_name),
    downloads: groupEvents(
      events,
      'download',
      (event) => event.resource_slug || event.event_name
    ),
    recentEvents: events.slice(0, 40),
  }
}
