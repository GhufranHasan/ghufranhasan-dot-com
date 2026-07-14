import 'server-only'

import { supabaseAdminRequest } from '@/lib/supabase/admin'

export type SiteEventType =
  | 'page_view'
  | 'section_view'
  | 'cta_click'
  | 'download'
  | 'form_submission'
  | 'system'

export type SiteEventRecord = {
  id: string
  event_type: SiteEventType
  event_name: string
  path: string | null
  section_id: string | null
  resource_slug: string | null
  visitor_id: string | null
  session_id: string | null
  referrer: string | null
  user_agent: string | null
  metadata: Record<string, unknown>
  created_at: string
}

export type CreateSiteEventInput = {
  eventType: SiteEventType
  eventName: string
  path?: string
  sectionId?: string
  resourceSlug?: string
  visitorId?: string
  sessionId?: string
  referrer?: string
  userAgent?: string
  metadata?: Record<string, unknown>
}

export async function createSiteEvent(input: CreateSiteEventInput) {
  const [savedEvent] = await supabaseAdminRequest<SiteEventRecord[]>('site_events', {
    method: 'POST',
    prefer: 'return=representation',
    body: {
      event_type: input.eventType,
      event_name: input.eventName,
      path: input.path || null,
      section_id: input.sectionId || null,
      resource_slug: input.resourceSlug || null,
      visitor_id: input.visitorId || null,
      session_id: input.sessionId || null,
      referrer: input.referrer || null,
      user_agent: input.userAgent || null,
      metadata: input.metadata ?? {},
    },
  })

  return savedEvent
}

export async function deleteSiteEvent(id: string) {
  const deletedEvents = await supabaseAdminRequest<SiteEventRecord[]>(
    'site_events',
    {
      method: 'DELETE',
      query: `id=eq.${id}`,
      prefer: 'return=representation',
    }
  )

  return deletedEvents[0] ?? null
}

export async function deleteSiteEventsFromDate(since: string) {
  const deletedEvents = await supabaseAdminRequest<SiteEventRecord[]>(
    'site_events',
    {
      method: 'DELETE',
      query: `created_at=gte.${since}`,
      prefer: 'return=representation',
    }
  )

  return deletedEvents
}
