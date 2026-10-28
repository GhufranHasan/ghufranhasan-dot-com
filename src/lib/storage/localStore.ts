import 'server-only'

import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import type {
  AuditRequestRecord,
  CreateAuditRequestInput,
  AuditRequestStatus,
} from '@/lib/supabase/auditRequests'
import type {
  NewsletterSubscriberRecord,
  UpsertNewsletterSubscriberInput,
} from '@/lib/supabase/newsletterSubscribers'

const DATA_DIR = path.join(process.cwd(), 'data')
const AUDIT_FILE = path.join(DATA_DIR, 'audit_requests.json')
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'newsletter_subscribers.json')

export function canUseLocalStorage() {
  return process.env.NODE_ENV !== 'production' && !process.env.VERCEL
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function readJsonFile<T>(filePath: string): T[] {
  if (!canUseLocalStorage()) return []
  ensureDataDir()
  if (!fs.existsSync(filePath)) {
    return []
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as T[]
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return []
  }
}

function writeJsonFile<T>(filePath: string, data: T[]): void {
  if (!canUseLocalStorage()) {
    throw new Error('Durable database storage is required in production.')
  }
  ensureDataDir()
  const tempPath = `${filePath}.tmp.${Date.now()}`
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8')
  fs.renameSync(tempPath, filePath)
}

// ==================== Audit Requests ====================

export function getLocalAuditRequests(): AuditRequestRecord[] {
  return readJsonFile<AuditRequestRecord>(AUDIT_FILE)
}

export function saveLocalAuditRequest(
  input: CreateAuditRequestInput
): AuditRequestRecord {
  const records = getLocalAuditRequests()
  const now = new Date().toISOString()
  const newRecord: AuditRequestRecord = {
    id: crypto.randomUUID(),
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
    created_at: now,
    updated_at: now,
  }

  records.unshift(newRecord)
  writeJsonFile(AUDIT_FILE, records)
  return newRecord
}

export function updateLocalAuditRequestStatus(
  id: string,
  status: AuditRequestStatus
): AuditRequestRecord | null {
  const records = getLocalAuditRequests()
  const index = records.findIndex((r) => r.id === id)
  if (index === -1) return null

  records[index] = {
    ...records[index],
    status,
    updated_at: new Date().toISOString(),
  }
  writeJsonFile(AUDIT_FILE, records)
  return records[index]
}

export function deleteLocalAuditRequest(id: string): AuditRequestRecord | null {
  const records = getLocalAuditRequests()
  const index = records.findIndex((r) => r.id === id)
  if (index === -1) return null

  const [removed] = records.splice(index, 1)
  writeJsonFile(AUDIT_FILE, records)
  return removed
}

// ==================== Newsletter Subscribers ====================

export function getLocalNewsletterSubscribers(): NewsletterSubscriberRecord[] {
  return readJsonFile<NewsletterSubscriberRecord>(SUBSCRIBERS_FILE)
}

export function saveLocalNewsletterSubscriber(
  input: UpsertNewsletterSubscriberInput
): NewsletterSubscriberRecord {
  const records = getLocalNewsletterSubscribers()
  const now = new Date().toISOString()
  const existingIndex = records.findIndex(
    (s) => s.email.toLowerCase() === input.email.toLowerCase()
  )

  if (existingIndex >= 0) {
    records[existingIndex] = {
      ...records[existingIndex],
      name: input.name || records[existingIndex].name,
      source: input.source || records[existingIndex].source,
      resource_slug: input.resourceSlug || records[existingIndex].resource_slug,
      status: 'active',
      updated_at: now,
    }
    writeJsonFile(SUBSCRIBERS_FILE, records)
    return records[existingIndex]
  }

  const newRecord: NewsletterSubscriberRecord = {
    id: crypto.randomUUID(),
    email: input.email.toLowerCase(),
    name: input.name || null,
    source: input.source || 'newsletter_section',
    resource_slug: input.resourceSlug || null,
    status: 'active',
    created_at: now,
    updated_at: now,
  }

  records.unshift(newRecord)
  writeJsonFile(SUBSCRIBERS_FILE, records)
  return newRecord
}
