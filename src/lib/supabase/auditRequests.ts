import 'server-only'

import { supabaseAdminRequest } from '@/lib/supabase/admin'
import {
  saveLocalAuditRequest,
  updateLocalAuditRequestStatus,
  deleteLocalAuditRequest,
} from '@/lib/storage/localStore'

export type AuditRequestRecord = {
  id: string
  name: string
  email: string
  linkedin_url: string
  website_url: string
  agency_service: string
  business_type: string
  average_client_value: string
  current_lead_source: string
  traffic_snapshot?: string
  desired_website_action?: string
  main_problem: string
  desired_outcome: string
  timeline: string
  implementation_budget: string
  engagement_intent: string
  what_tried?: string
  status: string
  created_at: string
  updated_at?: string
}

export type CreateAuditRequestInput = {
  name: string
  email: string
  linkedinUrl: string
  websiteUrl: string
  agencyService: string
  businessType: string
  averageClientValue: string
  currentLeadSource: string
  trafficSnapshot: string
  desiredWebsiteAction: string
  mainProblem: string
  desiredOutcome: string
  timeline: string
  implementationBudget: string
  engagementIntent: string
  whatTried: string
}

export async function createAuditRequest(
  input: CreateAuditRequestInput
): Promise<AuditRequestRecord> {
  try {
    const [savedRequest] = await supabaseAdminRequest<AuditRequestRecord[]>(
      'audit_requests',
      {
        method: 'POST',
        prefer: 'return=representation',
        body: {
          name: input.name,
          email: input.email,
          linkedin_url: input.linkedinUrl,
          website_url: input.websiteUrl,
          agency_service: input.agencyService,
          business_type: input.businessType,
          average_client_value: input.averageClientValue,
          current_lead_source: input.currentLeadSource,
          traffic_snapshot: input.trafficSnapshot,
          desired_website_action: input.desiredWebsiteAction,
          main_problem: input.mainProblem,
          desired_outcome: input.desiredOutcome,
          timeline: input.timeline,
          implementation_budget: input.implementationBudget,
          engagement_intent: input.engagementIntent,
          what_tried: input.whatTried,
          status: 'new',
        },
      }
    )

    if (savedRequest?.id) {
      return savedRequest
    }
  } catch (error) {
    console.warn(
      '[Audit Requests] Full Supabase insert failed:',
      error instanceof Error ? error.message : error
    )

    // If Supabase table is missing newer diagnostic columns (error 42703), retry with base schema
    if (
      error instanceof Error &&
      (error.message.includes('42703') || error.message.includes('traffic_snapshot'))
    ) {
      try {
        const [savedBase] = await supabaseAdminRequest<AuditRequestRecord[]>(
          'audit_requests',
          {
            method: 'POST',
            prefer: 'return=representation',
            body: {
              name: input.name,
              email: input.email,
              linkedin_url: input.linkedinUrl,
              website_url: input.websiteUrl,
              agency_service: input.agencyService,
              business_type: input.businessType,
              average_client_value: input.averageClientValue,
              current_lead_source: input.currentLeadSource,
              main_problem: input.mainProblem,
              desired_outcome: input.desiredOutcome,
              timeline: input.timeline,
              implementation_budget: input.implementationBudget,
              engagement_intent: input.engagementIntent,
              status: 'new',
            },
          }
        )

        if (savedBase?.id) {
          // Preserve full diagnostic fields in local storage
          saveLocalAuditRequest(input)
          return {
            ...savedBase,
            traffic_snapshot: input.trafficSnapshot,
            desired_website_action: input.desiredWebsiteAction,
            what_tried: input.whatTried,
          }
        }
      } catch (retryError) {
        console.warn('[Audit Requests] Retry with base columns failed:', retryError)
      }
    }
  }

  // Fallback to resilient local storage so leads are never lost
  return saveLocalAuditRequest(input)
}

export const auditRequestStatuses = [
  'new',
  'reviewed',
  'audit_sent',
  'call_booked',
  'converted',
  'not_fit',
] as const

export type AuditRequestStatus = (typeof auditRequestStatuses)[number]

export async function updateAuditRequestStatus(
  id: string,
  status: AuditRequestStatus
) {
  try {
    const [updatedRequest] = await supabaseAdminRequest<AuditRequestRecord[]>(
      'audit_requests',
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

    if (updatedRequest?.id) {
      return updatedRequest
    }
  } catch (error) {
    console.warn(
      '[Audit Requests] Supabase update failed, attempting local update:',
      error instanceof Error ? error.message : error
    )
  }

  const localUpdated = updateLocalAuditRequestStatus(id, status)
  if (localUpdated) return localUpdated

  throw new Error('Could not find or update the Funnel Review application')
}

export async function deleteAuditRequest(id: string) {
  try {
    const deletedRequests = await supabaseAdminRequest<AuditRequestRecord[]>(
      'audit_requests',
      {
        method: 'DELETE',
        query: `id=eq.${id}`,
        prefer: 'return=representation',
      }
    )

    if (deletedRequests?.[0]) return deletedRequests[0]
  } catch (error) {
    console.warn(
      '[Audit Requests] Supabase delete failed, attempting local delete:',
      error instanceof Error ? error.message : error
    )
  }

  return deleteLocalAuditRequest(id)
}
