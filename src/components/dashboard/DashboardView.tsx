'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  Database,
  Download,
  ExternalLink,
  FileText,
  Gauge,
  Inbox,
  LineChart,
  LogOut,
  Mail,
  MousePointerClick,
  PieChart,
  RefreshCw,
  ServerCrash,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react'
import type {
  DashboardData,
  EventGroup,
  LeadStatusGroup,
  TimeSeriesPoint,
} from '@/lib/supabase/dashboard'

const dashboardPeriodOptions = [1, 7, 14, 30, 90, 180, 365] as const

type AuditRequest = DashboardData['auditRequests'][number]
type NewsletterSubscriber = DashboardData['newsletterSubscribers'][number]
type SiteEvent = DashboardData['recentEvents'][number]

const statusOptions = [
  'new',
  'reviewed',
  'audit_sent',
  'call_booked',
  'converted',
  'not_fit',
] as const

const subscriberStatusOptions = ['active', 'unsubscribed', 'bounced'] as const

const statusLabels: Record<string, string> = {
  new: 'New',
  reviewed: 'Reviewed',
  audit_sent: 'Audit sent',
  call_booked: 'Call booked',
  converted: 'Converted',
  not_fit: 'Not fit',
  active: 'Active',
  unsubscribed: 'Unsubscribed',
  bounced: 'Bounced',
}

const sidebarItems = [
  { label: 'Overview', href: '#overview', icon: Gauge },
  { label: 'Analytics', href: '#analytics', icon: LineChart },
  { label: 'Leads', href: '#leads', icon: Inbox },
  { label: 'Subscribers', href: '#subscribers', icon: Mail },
  { label: 'Events', href: '#events', icon: Activity },
  { label: 'Database', href: '#database', icon: Database },
]

const metricIcons = [
  Activity,
  Users,
  Inbox,
  Download,
  MousePointerClick,
  Mail,
  FileText,
]

const chartColors = ['#ff8403', '#ffb15a', '#fefefe', '#a855f7', '#22c55e', '#f43f5e']

function formatDate(value?: string | null) {
  if (!value) return 'No activity yet'

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

function formatFullDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value))
}

function statusClass(status: string) {
  if (
    status === 'connected' ||
    status === 'converted' ||
    status === 'call_booked' ||
    status === 'active'
  ) {
    return 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200'
  }

  if (status === 'new' || status === 'needs_setup') {
    return 'border-orange-400/30 bg-orange-500/10 text-orange-200'
  }

  if (status === 'error' || status === 'not_fit' || status === 'bounced') {
    return 'border-red-400/25 bg-red-500/10 text-red-200'
  }

  return 'border-white/15 bg-white/8 text-white/75'
}

function getMetricValue(data: DashboardData, label: string) {
  return data.metrics.find((metric) => metric.label === label)?.value ?? 0
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-orange-500/25 bg-purple-950/30 p-5 text-sm text-white/60">
      <p className="font-semibold text-white">{title}</p>
      <p className="mt-2 leading-relaxed">{text}</p>
    </div>
  )
}

function MetricCard({
  label,
  value,
  note,
  icon: Icon,
}: {
  label: string
  value: number
  note: string
  icon: typeof Activity
}) {
  return (
    <div className="rounded-2xl border border-orange-500/20 bg-background-card p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/48">
            {label}
          </p>
          <p className="mt-3 text-3xl font-bebas text-white md:text-4xl">{value}</p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/25">
          <Icon size={21} />
        </div>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-white/55">{note}</p>
    </div>
  )
}

function PeriodSelector({ currentPeriod }: { currentPeriod: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {dashboardPeriodOptions.map((period) => (
        <Link
          key={period}
          href={`/dashboard?period=${period}`}
          className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
            currentPeriod === period
              ? 'border-orange-500 bg-orange-500 text-white'
              : 'border-orange-500/20 bg-purple-950/45 text-white/68 hover:border-orange-500/50 hover:text-white'
          }`}
        >
          {period === 1 ? '1 day' : `${period} days`}
        </Link>
      ))}
    </div>
  )
}

function TrendChart({
  points,
  bucketLabel,
}: {
  points: TimeSeriesPoint[]
  bucketLabel: string
}) {
  const width = 760
  const height = 260
  const padding = 30
  const maxValue = Math.max(
    1,
    ...points.map((point) =>
      Math.max(point.pageViews, point.ctaClicks, point.downloads, point.formSubmissions)
    )
  )

  const getX = (index: number) =>
    points.length <= 1
      ? width / 2
      : padding + (index / (points.length - 1)) * (width - padding * 2)
  const getY = (value: number) =>
    height - padding - (value / maxValue) * (height - padding * 2)

  const makePath = (key: keyof TimeSeriesPoint) =>
    points
      .map((point, index) => {
        const value = typeof point[key] === 'number' ? point[key] : 0
        return `${index === 0 ? 'M' : 'L'} ${getX(index)} ${getY(value)}`
      })
      .join(' ')

  const hasData = points.some(
    (point) =>
      point.pageViews || point.ctaClicks || point.downloads || point.formSubmissions
  )

  if (!hasData) {
    return (
      <EmptyState
        title="No trend data yet"
        text="The chart will draw itself as soon as real visits, CTA clicks, downloads, or form submissions are tracked."
      />
    )
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3 text-xs text-white/55">
        {[
          ['Page views', '#ff8403'],
          ['CTA clicks', '#ffb15a'],
          ['Downloads', '#fefefe'],
          ['Forms', '#22c55e'],
        ].map(([label, color]) => (
          <span key={label} className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
            {label}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-72 w-full overflow-visible">
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1={padding}
            x2={width - padding}
            y1={padding + ratio * (height - padding * 2)}
            y2={padding + ratio * (height - padding * 2)}
            stroke="rgba(255,255,255,0.08)"
          />
        ))}
        <path d={makePath('pageViews')} fill="none" stroke="#ff8403" strokeWidth="4" strokeLinecap="round" />
        <path d={makePath('ctaClicks')} fill="none" stroke="#ffb15a" strokeWidth="3" strokeLinecap="round" />
        <path d={makePath('downloads')} fill="none" stroke="#fefefe" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <path d={makePath('formSubmissions')} fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
        {points.map((point, index) => {
          if (index !== 0 && index !== points.length - 1 && index % Math.ceil(points.length / 6) !== 0) {
            return null
          }

          return (
            <text
              key={`${point.label}-${index}`}
              x={getX(index)}
              y={height - 4}
              textAnchor="middle"
              fill="rgba(255,255,255,0.46)"
              fontSize="11"
            >
              {point.label}
            </text>
          )
        })}
      </svg>
      <p className="mt-2 text-xs text-white/45">{bucketLabel} trend buckets.</p>
    </div>
  )
}

function HorizontalBarChart({
  rows,
  emptyText,
}: {
  rows: EventGroup[]
  emptyText: string
}) {
  const maxValue = Math.max(1, ...rows.map((row) => row.count))

  if (!rows.length) {
    return <EmptyState title="No chart data yet" text={emptyText} />
  }

  return (
    <div className="space-y-4">
      {rows.slice(0, 8).map((row) => (
        <div key={row.label}>
          <div className="mb-2 flex items-center justify-between gap-3 text-xs">
            <span className="truncate font-semibold text-white">{row.label}</span>
            <span className="shrink-0 text-white/52">{row.count}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/8">
            <div
              className="h-full rounded-full bg-linear-to-r from-orange-500 to-orange-600"
              style={{ width: `${Math.max(4, (row.count / maxValue) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function FunnelChart({ data }: { data: DashboardData }) {
  const rows = [
    ['Visits', getMetricValue(data, 'Visits')],
    ['CTA clicks', getMetricValue(data, 'CTA clicks')],
    ['Audit applications', getMetricValue(data, 'Audit applications')],
    ['Checklist downloads', getMetricValue(data, 'Checklist downloads')],
  ]
  const maxValue = Math.max(1, ...rows.map(([, value]) => Number(value)))
  const hasData = rows.some(([, value]) => Number(value) > 0)

  if (!hasData) {
    return (
      <EmptyState
        title="No funnel activity yet"
        text="Visits, clicks, applications, and downloads will appear here after real interactions are recorded."
      />
    )
  }

  return (
    <div className="space-y-4">
      {rows.map(([label, value], index) => (
        <div key={label}>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-white">{label}</span>
            <span className="text-white/52">{value}</span>
          </div>
          <div className="mx-auto h-9 overflow-hidden rounded-lg border border-orange-500/15 bg-white/6">
            <div
              className="flex h-full items-center justify-center rounded-lg bg-linear-to-r from-orange-500 to-orange-600 text-xs font-bold text-white"
              style={{
                width: `${Math.max(10, (Number(value) / maxValue) * (100 - index * 8))}%`,
              }}
            >
              {Number(value) > 0 ? value : ''}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function DonutChart({ rows }: { rows: LeadStatusGroup[] }) {
  const total = rows.reduce((sum, row) => sum + row.count, 0)
  const radius = 44
  const circumference = 2 * Math.PI * radius

  if (!total) {
    return (
      <EmptyState
        title="No lead status data yet"
        text="When audit applications arrive, the status mix will show here."
      />
    )
  }

  return (
    <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
      <svg viewBox="0 0 120 120" className="h-40 w-40">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="15"
      />
        {rows
          .reduce<Array<{ row: LeadStatusGroup; index: number; length: number; offset: number }>>(
            (segments, row, index) => {
              const previousOffset =
                segments[segments.length - 1]?.offset ?? 0
              const previousLength =
                segments[segments.length - 1]?.length ?? 0

              segments.push({
                row,
                index,
                length: (row.count / total) * circumference,
                offset: previousOffset + previousLength,
              })

              return segments
            },
            []
          )
          .map(({ row, index, length, offset: segmentOffset }) => (
            <circle
              key={row.status}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={chartColors[index % chartColors.length]}
              strokeWidth="15"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-segmentOffset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
          ))}
        <text x="60" y="56" textAnchor="middle" fill="#fefefe" fontSize="24" fontWeight="700">
          {total}
        </text>
        <text x="60" y="76" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="11">
          leads
        </text>
      </svg>
      <div className="space-y-3">
        {rows.map((row, index) => (
          <div key={row.status} className="flex items-center justify-between gap-3 text-sm">
            <span className="inline-flex items-center gap-2 text-white/72">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: chartColors[index % chartColors.length] }}
              />
              {statusLabels[row.status] || row.label}
            </span>
            <span className="font-semibold text-white">{row.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DataGroupList({
  title,
  icon: Icon,
  rows,
  emptyTitle,
  emptyText,
}: {
  title: string
  icon: typeof Activity
  rows: EventGroup[]
  emptyTitle: string
  emptyText: string
}) {
  return (
    <section className="rounded-2xl border border-orange-500/20 bg-purple-950/45 p-5 backdrop-blur-md">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/25">
          <Icon size={19} />
        </div>
        <h2 className="text-xl font-bebas text-white">{title}</h2>
      </div>

      {rows.length ? (
        <div className="space-y-3">
          {rows.slice(0, 8).map((row) => (
            <div
              key={row.label}
              className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:grid-cols-[1fr_auto]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{row.label}</p>
                <p className="mt-1 text-xs text-white/45">
                  Last activity: {formatDate(row.lastSeen)}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/60">
                <span className="rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 font-semibold text-orange-200">
                  {row.count}
                </span>
                <span>{row.visitors} visitor{row.visitors === 1 ? '' : 's'}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title={emptyTitle} text={emptyText} />
      )}
    </section>
  )
}

function DeleteButton({
  label,
  onClick,
  disabled,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-lg border border-red-400/25 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 transition-colors hover:border-red-400/50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={13} />
      {label}
    </button>
  )
}

function AuditRequestCard({
  request,
  isUpdating,
  onStatusChange,
  onDelete,
}: {
  request: AuditRequest
  isUpdating: boolean
  onStatusChange: (id: string, status: string) => void
  onDelete: (request: AuditRequest) => void
}) {
  return (
    <article className="rounded-2xl border border-orange-500/18 bg-white/5 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-bebas text-white">{request.name}</h3>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass(request.status)}`}>
              {statusLabels[request.status] || request.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-white/55">{request.email}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70">
            {request.agency_service || 'No service description provided.'}
          </p>
        </div>

        <label className="text-xs font-semibold uppercase tracking-wider text-white/45">
          Lead status
          <select
            value={request.status}
            disabled={isUpdating}
            onChange={(event) => onStatusChange(request.id, event.target.value)}
            className="mt-2 w-full rounded-lg border border-orange-500/20 bg-purple-950 px-3 py-2 text-sm normal-case tracking-normal text-white outline-none focus:border-orange-500/60 lg:w-44"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {statusLabels[status]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Problem', request.main_problem],
          ['Outcome', request.desired_outcome],
          ['Timeline', request.timeline],
          ['Budget', request.implementation_budget || 'Not provided'],
          ['Client value', request.average_client_value || 'Not provided'],
          ['Lead source', request.current_lead_source || 'Not provided'],
          ['Traffic signal', request.traffic_snapshot || 'Not provided'],
          ['Website action', request.desired_website_action || 'Not provided'],
          ['Intent', request.engagement_intent || 'Not provided'],
          ['Submitted', formatFullDate(request.created_at)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-purple-950/35 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/38">
              {label}
            </p>
            <p className="mt-1 text-sm text-white/72">{value}</p>
          </div>
        ))}
      </div>

      {request.what_tried && (
        <div className="mt-4 rounded-xl border border-orange-500/15 bg-orange-500/6 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-300/75">
            Already tried
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {request.what_tried}
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={request.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-orange-500/25 bg-orange-500/8 px-3 py-2 text-xs font-semibold text-orange-200 hover:border-orange-500/50"
        >
          LinkedIn <ExternalLink size={13} />
        </a>
        <a
          href={request.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-orange-500/25 bg-orange-500/8 px-3 py-2 text-xs font-semibold text-orange-200 hover:border-orange-500/50"
        >
          Website <ExternalLink size={13} />
        </a>
        <a
          href={`mailto:${request.email}`}
          className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 hover:border-orange-500/35"
        >
          Email lead <Mail size={13} />
        </a>
        <DeleteButton
          label="Delete test lead"
          disabled={isUpdating}
          onClick={() => onDelete(request)}
        />
      </div>
    </article>
  )
}

export default function DashboardView({ data }: { data: DashboardData }) {
  const router = useRouter()
  const [auditRequests, setAuditRequests] = useState(data.auditRequests)
  const [subscribers, setSubscribers] = useState(data.newsletterSubscribers)
  const [recentEvents, setRecentEvents] = useState(data.recentEvents)
  const [updatingId, setUpdatingId] = useState('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')

  const funnelStats = useMemo(
    () => ({
      visits: getMetricValue(data, 'Visits'),
      ctaClicks: getMetricValue(data, 'CTA clicks'),
      applications: auditRequests.length,
      downloads: getMetricValue(data, 'Checklist downloads'),
    }),
    [auditRequests.length, data]
  )

  const runAction = async (
    action: () => Promise<void>,
    successMessage: string
  ) => {
    setError('')
    setNotice('')

    try {
      await action()
      setNotice(successMessage)
    } catch (actionError) {
      setError(
        actionError instanceof Error
          ? actionError.message
          : 'The dashboard action could not be completed.'
      )
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    setUpdatingId(id)
    await runAction(async () => {
      const response = await fetch(`/api/dashboard/audit-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Status could not be updated.')
      }

      setAuditRequests((current) =>
        current.map((request) =>
          request.id === id ? result.auditRequest : request
        )
      )
    }, 'Lead status updated.')
    setUpdatingId('')
  }

  const handleDeleteAuditRequest = async (request: AuditRequest) => {
    if (
      !window.confirm(
        `Delete the audit application from ${request.name}? This is permanent.`
      )
    ) {
      return
    }

    setUpdatingId(request.id)
    await runAction(async () => {
      const response = await fetch(`/api/dashboard/audit-requests/${request.id}`, {
        method: 'DELETE',
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Audit application could not be deleted.')
      }

      setAuditRequests((current) =>
        current.filter((item) => item.id !== request.id)
      )
      router.refresh()
    }, 'Audit application deleted.')
    setUpdatingId('')
  }

  const handleSubscriberStatusChange = async (id: string, status: string) => {
    setUpdatingId(id)
    await runAction(async () => {
      const response = await fetch(`/api/dashboard/newsletter-subscribers/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Subscriber status could not be updated.')
      }

      setSubscribers((current) =>
        current.map((subscriber) =>
          subscriber.id === id ? result.subscriber : subscriber
        )
      )
    }, 'Subscriber status updated.')
    setUpdatingId('')
  }

  const handleDeleteSubscriber = async (subscriber: NewsletterSubscriber) => {
    if (
      !window.confirm(
        `Delete ${subscriber.email} from newsletter subscribers? This is permanent.`
      )
    ) {
      return
    }

    setUpdatingId(subscriber.id)
    await runAction(async () => {
      const response = await fetch(
        `/api/dashboard/newsletter-subscribers/${subscriber.id}`,
        { method: 'DELETE' }
      )
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Subscriber could not be deleted.')
      }

      setSubscribers((current) =>
        current.filter((item) => item.id !== subscriber.id)
      )
      router.refresh()
    }, 'Subscriber deleted.')
    setUpdatingId('')
  }

  const handleDeleteEvent = async (event: SiteEvent) => {
    if (
      !window.confirm(
        `Delete this ${event.event_type.replace('_', ' ')} event? This is permanent.`
      )
    ) {
      return
    }

    setUpdatingId(event.id)
    await runAction(async () => {
      const response = await fetch(`/api/dashboard/site-events/${event.id}`, {
        method: 'DELETE',
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Website event could not be deleted.')
      }

      setRecentEvents((current) => current.filter((item) => item.id !== event.id))
      router.refresh()
    }, 'Website event deleted.')
    setUpdatingId('')
  }

  const handleClearPeriodEvents = async () => {
    const confirmation = window.prompt(
      `Type DELETE_EVENTS to delete all tracked site events from ${data.windowLabel}.`
    )

    if (confirmation !== 'DELETE_EVENTS') return

    setUpdatingId('bulk-events')
    await runAction(async () => {
      const response = await fetch('/api/dashboard/site-events', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          periodDays: data.periodDays,
          confirmation,
        }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Website events could not be deleted.')
      }

      setRecentEvents([])
      router.refresh()
    }, `Website events cleared for ${data.windowLabel}.`)
    setUpdatingId('')
  }

  const handleLogout = async () => {
    await fetch('/api/dashboard/logout', { method: 'POST' })
    router.refresh()
  }

  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="border-b border-orange-500/20 bg-purple-950/88 p-4 backdrop-blur-md lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:p-5">
        <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bebas text-white">
          Ghufran<span className="text-orange-500">.</span>
        </Link>
        <p className="mt-2 text-xs leading-relaxed text-white/48">
          Private website operations, analytics, and data handling.
        </p>

        <nav className="mt-6 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
          {sidebarItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="inline-flex shrink-0 items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-sm font-semibold text-white/68 transition-colors hover:border-orange-500/35 hover:bg-orange-500/10 hover:text-white"
            >
              <item.icon size={17} className="text-orange-300" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-6 hidden rounded-2xl border border-orange-500/18 bg-orange-500/8 p-4 text-xs leading-relaxed text-white/58 lg:block">
          Delete actions are permanent. Use them for test data cleanup only.
        </div>
      </aside>

      <div className="min-w-0">
        <section
          id="overview"
          className="relative overflow-hidden border-b border-orange-500/20 px-4 py-8 md:px-8 md:py-10"
        >
          <div className="hero-premium-bg" aria-hidden="true">
            <div className="hero-silk" />
            <div className="hero-vignette" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-orange-200">
                  <ShieldCheck size={15} />
                  Private Admin Dashboard
                </div>
                <h1 className="text-4xl font-bebas text-white md:text-6xl">
                  Website Intelligence Dashboard
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/62">
                  Track visits, section attention, CTA clicks, downloads,
                  subscribers, Funnel Review applications, and database status from one
                  private admin surface.
                </p>
              </div>

              <div className="space-y-4">
                <PeriodSelector currentPeriod={data.periodDays} />
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-500/25 bg-purple-950/50 px-4 py-3 text-sm font-semibold text-white hover:border-orange-500/50"
                  >
                    View site <ArrowUpRight size={16} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => router.refresh()}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-500/25 bg-purple-950/50 px-4 py-3 text-sm font-semibold text-white hover:border-orange-500/50"
                  >
                    Refresh <RefreshCw size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-bold text-white hover:shadow-glow-hover"
                  >
                    Lock <LogOut size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/48">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <Clock3 size={14} className="text-orange-300" />
                Updated {formatFullDate(data.lastUpdated)}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <Activity size={14} className="text-orange-300" />
                {data.windowLabel}
              </span>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 md:px-8">
          <div className="mx-auto max-w-7xl space-y-8">
            {(notice || error) && (
              <div
                className={`rounded-xl border px-4 py-3 text-sm ${
                  error
                    ? 'border-red-500/30 bg-red-500/10 text-red-200'
                    : 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200'
                }`}
              >
                {error || notice}
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {data.metrics.map((metric, index) => (
                <MetricCard
                  key={metric.label}
                  {...metric}
                  icon={metricIcons[index] || Activity}
                />
              ))}
            </div>

            <section id="analytics" className="scroll-mt-8 space-y-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/25">
                  <BarChart3 size={19} />
                </div>
                <div>
                  <h2 className="text-2xl font-bebas text-white">Data Visualization</h2>
                  <p className="text-sm text-white/48">
                    Graphs use real tracked events for the selected time period.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
                <section className="rounded-2xl border border-orange-500/20 bg-purple-950/45 p-5 backdrop-blur-md">
                  <div className="mb-5 flex items-center gap-3">
                    <LineChart size={20} className="text-orange-300" />
                    <h3 className="text-xl font-bebas text-white">Traffic and Action Trend</h3>
                  </div>
                  <TrendChart points={data.timeSeries} bucketLabel={data.bucketLabel} />
                </section>

                <section className="rounded-2xl border border-orange-500/20 bg-purple-950/45 p-5 backdrop-blur-md">
                  <div className="mb-5 flex items-center gap-3">
                    <PieChart size={20} className="text-orange-300" />
                    <h3 className="text-xl font-bebas text-white">Lead Status Mix</h3>
                  </div>
                  <DonutChart rows={data.leadStatuses} />
                </section>
              </div>

              <div className="grid gap-5 xl:grid-cols-2">
                <section className="rounded-2xl border border-orange-500/20 bg-purple-950/45 p-5 backdrop-blur-md">
                  <div className="mb-5 flex items-center gap-3">
                    <MousePointerClick size={20} className="text-orange-300" />
                    <h3 className="text-xl font-bebas text-white">Visitor Action Funnel</h3>
                  </div>
                  <FunnelChart data={data} />
                  <p className="mt-4 text-xs text-white/45">
                    Current period: visits {funnelStats.visits}, CTA clicks {funnelStats.ctaClicks}, applications {funnelStats.applications}, downloads {funnelStats.downloads}.
                  </p>
                </section>

                <section className="rounded-2xl border border-orange-500/20 bg-purple-950/45 p-5 backdrop-blur-md">
                  <div className="mb-5 flex items-center gap-3">
                    <BarChart3 size={20} className="text-orange-300" />
                    <h3 className="text-xl font-bebas text-white">Top Pages</h3>
                  </div>
                  <HorizontalBarChart
                    rows={data.topPages}
                    emptyText="Page popularity will appear after public visitors load your website."
                  />
                </section>
              </div>

              <div className="grid gap-5 xl:grid-cols-2">
                <DataGroupList
                  title="Section Attention"
                  icon={FileText}
                  rows={data.topSections}
                  emptyTitle="No section views tracked yet"
                  emptyText="Each visible section is recorded once per page session when it enters the viewport."
                />
                <DataGroupList
                  title="CTA Clicks"
                  icon={MousePointerClick}
                  rows={data.ctaClicks}
                  emptyTitle="No CTA clicks tracked yet"
                  emptyText="Clicks to audit, booking, email, LinkedIn, WhatsApp, and key resources will appear here."
                />
              </div>
            </section>

            <section id="leads" className="scroll-mt-8 rounded-2xl border border-orange-500/20 bg-purple-950/45 p-5 backdrop-blur-md">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/25">
                    <Inbox size={19} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bebas text-white">Funnel Review Applications</h2>
                    <p className="text-xs text-white/45">
                      Read, update, and delete test lead records.
                    </p>
                  </div>
                </div>
                <Link
                  href="/free-audit"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-300 hover:text-orange-200"
                >
                  Create via intake form <ArrowUpRight size={15} />
                </Link>
              </div>

              {auditRequests.length ? (
                <div className="space-y-4">
                  {auditRequests.map((request) => (
                    <AuditRequestCard
                      key={request.id}
                      request={request}
                      isUpdating={updatingId === request.id}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDeleteAuditRequest}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No audit applications in this period"
                  text="Use the period filter or submit a test application through the free Funnel Review form."
                />
              )}
            </section>

            <section id="subscribers" className="scroll-mt-8 rounded-2xl border border-orange-500/20 bg-purple-950/45 p-5 backdrop-blur-md">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/25">
                  <Mail size={19} />
                </div>
                <div>
                  <h2 className="text-xl font-bebas text-white">Newsletter Subscribers</h2>
                  <p className="text-xs text-white/45">
                    Read subscribers, update status, and delete test signups.
                  </p>
                </div>
              </div>

              {subscribers.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left">
                    <thead>
                      <tr className="text-xs uppercase tracking-wider text-white/42">
                        <th className="px-3">Email</th>
                        <th className="px-3">Source</th>
                        <th className="px-3">Added</th>
                        <th className="px-3">Status</th>
                        <th className="px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((subscriber) => (
                        <tr key={subscriber.id} className="bg-white/5 text-sm text-white/72">
                          <td className="rounded-l-xl border-y border-l border-white/10 px-3 py-4 font-semibold text-white">
                            {subscriber.email}
                          </td>
                          <td className="border-y border-white/10 px-3 py-4">
                            {subscriber.source || 'Unknown'}
                          </td>
                          <td className="border-y border-white/10 px-3 py-4">
                            {formatDate(subscriber.created_at)}
                          </td>
                          <td className="border-y border-white/10 px-3 py-4">
                            <select
                              value={subscriber.status}
                              disabled={updatingId === subscriber.id}
                              onChange={(event) =>
                                handleSubscriberStatusChange(subscriber.id, event.target.value)
                              }
                              className="rounded-lg border border-orange-500/20 bg-purple-950 px-3 py-2 text-sm text-white outline-none focus:border-orange-500/60"
                            >
                              {subscriberStatusOptions.map((status) => (
                                <option key={status} value={status}>
                                  {statusLabels[status]}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="rounded-r-xl border-y border-r border-white/10 px-3 py-4 text-right">
                            <DeleteButton
                              label="Delete"
                              disabled={updatingId === subscriber.id}
                              onClick={() => handleDeleteSubscriber(subscriber)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <EmptyState
                  title="No subscribers in this period"
                  text="Newsletter records saved to Supabase will appear here."
                />
              )}
            </section>

            <section id="events" className="scroll-mt-8 rounded-2xl border border-orange-500/20 bg-purple-950/45 p-5 backdrop-blur-md">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/25">
                    <ServerCrash size={19} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bebas text-white">Website Events</h2>
                    <p className="text-xs text-white/45">
                      Delete individual test events or clear the selected period.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={updatingId === 'bulk-events'}
                  onClick={handleClearPeriodEvents}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-400/25 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 hover:border-red-400/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={15} />
                  Clear events in period
                </button>
              </div>

              {recentEvents.length ? (
                <div className="space-y-3">
                  {recentEvents.map((event) => (
                    <div
                      key={event.id}
                      className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4 lg:grid-cols-[1fr_auto_auto]"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-orange-500/25 bg-orange-500/10 px-2.5 py-1 text-[11px] font-semibold text-orange-200">
                            {event.event_type.replace('_', ' ')}
                          </span>
                          <p className="truncate text-sm font-semibold text-white">
                            {event.event_name}
                          </p>
                        </div>
                        <p className="mt-2 truncate text-xs text-white/45">
                          {event.path || '/'} {event.section_id ? `- ${event.section_id}` : ''}
                        </p>
                      </div>
                      <div className="text-xs text-white/45 lg:text-right">
                        {formatDate(event.created_at)}
                      </div>
                      <DeleteButton
                        label="Delete"
                        disabled={updatingId === event.id}
                        onClick={() => handleDeleteEvent(event)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No website events in this period"
                  text="The tracker records visits, sections, CTA clicks, downloads, and form submissions from public pages."
                />
              )}
            </section>

            <section id="database" className="scroll-mt-8 rounded-2xl border border-orange-500/20 bg-purple-950/45 p-5 backdrop-blur-md">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-300 ring-1 ring-orange-500/25">
                  <Database size={19} />
                </div>
                <div>
                  <h2 className="text-xl font-bebas text-white">Database Connectivity</h2>
                  <p className="text-xs text-white/45">
                    Live checks against the tables the dashboard depends on.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {data.databaseStatus.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusClass(item.status)}`}>
                        {item.status === 'needs_setup' ? 'Setup needed' : item.status}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-white/55">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-orange-500/20 bg-orange-500/8 p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-orange-300" />
                <div>
                  <h2 className="font-bold text-white">No mock data is used</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/62">
                    Empty panels are intentional until Supabase receives real
                    events, form submissions, downloads, or newsletter signups.
                    Delete actions are available for cleaning test records only.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}
