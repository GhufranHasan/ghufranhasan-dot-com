import 'server-only'

import { supabaseAdminRequest } from '@/lib/supabase/admin'

export type AuditRequestRecord = {
  id: string
  name: string
  email: string
  linkedin_url: string
  website_url: string
  business_type: string
  main_problem: string
  desired_outcome: string
  timeline: string
  status: string
  created_at: string
}

export type CreateAuditRequestInput = {
  name: string
  email: string
  linkedinUrl: string
  websiteUrl: string
  businessType: string
  mainProblem: string
  desiredOutcome: string
  timeline: string
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
        business_type: input.businessType,
        main_problem: input.mainProblem,
        desired_outcome: input.desiredOutcome,
        timeline: input.timeline,
        status: 'new',
      },
    }
  )

  if (!savedRequest?.id) {
    throw new Error('Supabase did not return the saved audit request')
  }

  return savedRequest
}
