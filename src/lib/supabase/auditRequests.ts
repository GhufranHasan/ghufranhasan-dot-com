import 'server-only'

import { supabaseAdminRequest } from '@/lib/supabase/admin'

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
  main_problem: string
  desired_outcome: string
  timeline: string
  implementation_budget: string
  engagement_intent: string
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
  mainProblem: string
  desiredOutcome: string
  timeline: string
  implementationBudget: string
  engagementIntent: string
}

export async function createAuditRequest(
  input: CreateAuditRequestInput
): Promise<AuditRequestRecord> {
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
        main_problem: input.mainProblem,
        desired_outcome: input.desiredOutcome,
        timeline: input.timeline,
        implementation_budget: input.implementationBudget,
        engagement_intent: input.engagementIntent,
        status: 'new',
      },
    }
  )

  if (!savedRequest?.id) {
    throw new Error('Supabase did not return the saved review application')
  }

  return savedRequest
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

  if (!updatedRequest?.id) {
    throw new Error('Supabase did not return the updated review application')
  }

  return updatedRequest
}

export async function deleteAuditRequest(id: string) {
  const deletedRequests = await supabaseAdminRequest<AuditRequestRecord[]>(
    'audit_requests',
    {
      method: 'DELETE',
      query: `id=eq.${id}`,
      prefer: 'return=representation',
    }
  )

  return deletedRequests[0] ?? null
}
