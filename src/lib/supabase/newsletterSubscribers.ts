import 'server-only'

import { supabaseAdminRequest } from '@/lib/supabase/admin'
import { saveLocalNewsletterSubscriber } from '@/lib/storage/localStore'

export type NewsletterSubscriberRecord = {
  id: string
  email: string
  name: string | null
  source: string | null
  resource_slug: string | null
  status: string
  created_at: string
  updated_at: string
}

export const newsletterSubscriberStatuses = [
  'active',
  'unsubscribed',
  'bounced',
] as const

export type NewsletterSubscriberStatus =
  (typeof newsletterSubscriberStatuses)[number]

export type UpsertNewsletterSubscriberInput = {
  email: string
  name?: string
  source?: string
  resourceSlug?: string
}

export async function upsertNewsletterSubscriber(
  input: UpsertNewsletterSubscriberInput
) {
  try {
    const [subscriber] = await supabaseAdminRequest<NewsletterSubscriberRecord[]>(
      'newsletter_subscribers',
      {
        method: 'POST',
        query: 'on_conflict=email',
        prefer: 'resolution=merge-duplicates,return=representation',
        body: {
          email: input.email,
          name: input.name || null,
          source: input.source || 'newsletter_section',
          resource_slug: input.resourceSlug || null,
          status: 'active',
          updated_at: new Date().toISOString(),
        },
      }
    )

    if (subscriber?.id) {
      return subscriber
    }
  } catch (error) {
    console.warn(
      '[Newsletter] Supabase unavailable, falling back to local storage:',
      error instanceof Error ? error.message : error
    )
  }

  return saveLocalNewsletterSubscriber(input)
}

export async function updateNewsletterSubscriberStatus(
  id: string,
  status: NewsletterSubscriberStatus
) {
  const [subscriber] = await supabaseAdminRequest<NewsletterSubscriberRecord[]>(
    'newsletter_subscribers',
    {
      method: 'PATCH',
      query: `id=eq.${id}`,
      prefer: 'return=representation',
      body: {
        status,
        updated_at: new Date().toISOString(),
      },
    }
  )

  if (!subscriber?.id) {
    throw new Error('Supabase did not return the updated newsletter subscriber')
  }

  return subscriber
}

export async function deleteNewsletterSubscriber(id: string) {
  const deletedSubscribers = await supabaseAdminRequest<
    NewsletterSubscriberRecord[]
  >('newsletter_subscribers', {
    method: 'DELETE',
    query: `id=eq.${id}`,
    prefer: 'return=representation',
  })

  return deletedSubscribers[0] ?? null
}
