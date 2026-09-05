import { NextRequest, NextResponse } from 'next/server'
import {
  averageClientValues,
  businessTypes,
  currentLeadSources,
  desiredOutcomes,
  desiredWebsiteActions,
  engagementIntents,
  improvementTimelines,
  implementationBudgets,
  mainProblems,
  trafficSnapshots,
} from '@/data/auditOptions'
import { createAuditRequest } from '@/lib/supabase/auditRequests'
import {
  getClientIp,
  hasJsonContentType,
  isPayloadTooLarge,
  isSameOriginRequest,
} from '@/lib/security/request'

const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 3
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

type ResendResult = {
  message?: string
  error?: {
    message?: string
  }
}

const validBusinessTypes = new Set<string>(businessTypes)
const validAverageClientValues = new Set<string>(averageClientValues)
const validCurrentLeadSources = new Set<string>(currentLeadSources)
const validTrafficSnapshots = new Set<string>(trafficSnapshots)
const validDesiredWebsiteActions = new Set<string>(desiredWebsiteActions)
const validMainProblems = new Set<string>(mainProblems)
const validDesiredOutcomes = new Set<string>(desiredOutcomes)
const validTimelines = new Set<string>(improvementTimelines)
const validImplementationBudgets = new Set<string>(implementationBudgets)
const validEngagementIntents = new Set<string>(engagementIntents)

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const isRateLimited = (key: string) => {
  const now = Date.now()
  const current = rateLimitStore.get(key)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  current.count += 1
  rateLimitStore.set(key, current)
  return current.count > MAX_REQUESTS_PER_WINDOW
}

const cleanText = (value: unknown, maxLength: number) =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

const parseHttpUrl = (value: string) => {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:' ? url : null
  } catch {
    return null
  }
}

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
      })[character] ?? character
  )

async function sendEmail(payload: {
  from: string
  to: string
  subject: string
  html: string
}) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return false

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const result = (await response.json().catch(() => ({}))) as ResendResult
    console.error('Audit email delivery error:', {
      status: response.status,
      message: result.error?.message || result.message || 'Unknown Resend error',
    })
    return false
  }

  return true
}

export async function POST(request: NextRequest) {
  try {
    if (!isSameOriginRequest(request)) {
      return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 })
    }

    if (!hasJsonContentType(request) || isPayloadTooLarge(request, 16_384)) {
      return NextResponse.json({ error: 'Invalid Funnel Review request.' }, { status: 400 })
    }

    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many Funnel Review applications. Please wait a minute and try again.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const honeypot = cleanText(body.company, 200)

    if (honeypot) {
      return NextResponse.json(
        { message: 'Your Funnel Review application has been received.' },
        { status: 201 }
      )
    }

    const name = cleanText(body.name, 100)
    const email = cleanText(body.email, 254).toLowerCase()
    const linkedinUrl = cleanText(body.linkedinUrl, 500)
    const websiteUrl = cleanText(body.websiteUrl, 500)
    const agencyService = cleanText(body.agencyService, 180)
    const businessType = cleanText(body.businessType, 80)
    const averageClientValue = cleanText(body.averageClientValue, 80)
    const currentLeadSource = cleanText(body.currentLeadSource, 120)
    const trafficSnapshot = cleanText(body.trafficSnapshot, 120)
    const desiredWebsiteAction = cleanText(body.desiredWebsiteAction, 120)
    const mainProblem = cleanText(body.mainProblem, 160)
    const desiredOutcome = cleanText(body.desiredOutcome, 160)
    const timeline = cleanText(body.timeline, 80)
    const implementationBudget = cleanText(body.implementationBudget, 80)
    const engagementIntent = cleanText(body.engagementIntent, 120)
    const whatTried = cleanText(body.whatTried, 700)

    if (
      !name ||
      !isValidEmail(email) ||
      !linkedinUrl ||
      !websiteUrl ||
      !agencyService ||
      !validBusinessTypes.has(businessType) ||
      !validAverageClientValues.has(averageClientValue) ||
      !validCurrentLeadSources.has(currentLeadSource) ||
      !validTrafficSnapshots.has(trafficSnapshot) ||
      !validDesiredWebsiteActions.has(desiredWebsiteAction) ||
      !validMainProblems.has(mainProblem) ||
      !validDesiredOutcomes.has(desiredOutcome) ||
      !validTimelines.has(timeline) ||
      !validImplementationBudgets.has(implementationBudget) ||
      !validEngagementIntents.has(engagementIntent) ||
      !whatTried
    ) {
      return NextResponse.json(
        { error: 'Please complete every field with valid information.' },
        { status: 400 }
      )
    }

    const parsedLinkedinUrl = parseHttpUrl(linkedinUrl)
    const parsedWebsiteUrl = parseHttpUrl(websiteUrl)
    const linkedinHostname = parsedLinkedinUrl?.hostname.replace(/^www\./, '')

    if (
      !parsedLinkedinUrl ||
      !linkedinHostname ||
      !(
        linkedinHostname === 'linkedin.com' ||
        linkedinHostname.endsWith('.linkedin.com')
      )
    ) {
      return NextResponse.json(
        { error: 'Please provide a valid LinkedIn profile URL.' },
        { status: 400 }
      )
    }

    if (!parsedWebsiteUrl) {
      return NextResponse.json(
        { error: 'Please provide a valid website URL, including https://.' },
        { status: 400 }
      )
    }

    const savedRequest = await createAuditRequest({
      name,
      email,
      linkedinUrl: parsedLinkedinUrl.toString(),
      websiteUrl: parsedWebsiteUrl.toString(),
      agencyService,
      businessType,
      averageClientValue,
      currentLeadSource,
      trafficSnapshot,
      desiredWebsiteAction,
      mainProblem,
      desiredOutcome,
      timeline,
      implementationBudget,
      engagementIntent,
      whatTried,
    })

    const fromEmail = process.env.RESEND_FROM_EMAIL
    let emailsSent = false

    if (fromEmail) {
      const safeName = escapeHtml(name)
      const safeEmail = escapeHtml(email)
      const safeLinkedinUrl = escapeHtml(parsedLinkedinUrl.toString())
      const safeWebsiteUrl = escapeHtml(parsedWebsiteUrl.toString())
      const safeAgencyService = escapeHtml(agencyService)
      const safeBusinessType = escapeHtml(businessType)
      const safeAverageClientValue = escapeHtml(averageClientValue)
      const safeCurrentLeadSource = escapeHtml(currentLeadSource)
      const safeTrafficSnapshot = escapeHtml(trafficSnapshot)
      const safeDesiredWebsiteAction = escapeHtml(desiredWebsiteAction)
      const safeMainProblem = escapeHtml(mainProblem)
      const safeDesiredOutcome = escapeHtml(desiredOutcome)
      const safeTimeline = escapeHtml(timeline)
      const safeImplementationBudget = escapeHtml(implementationBudget)
      const safeEngagementIntent = escapeHtml(engagementIntent)
      const safeWhatTried = escapeHtml(whatTried)
      const notificationEmail =
        process.env.AUDIT_NOTIFICATION_EMAIL || 'ghufran@ghufranhasan.com'

      const [notificationSent, confirmationSent] = await Promise.all([
        sendEmail({
          from: fromEmail,
          to: notificationEmail,
          subject: `New Funnel Review application from ${name}`,
          html: `
            <h1>New LinkedIn-to-Website Funnel Review Application</h1>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p><strong>LinkedIn:</strong> <a href="${safeLinkedinUrl}">${safeLinkedinUrl}</a></p>
            <p><strong>Website:</strong> <a href="${safeWebsiteUrl}">${safeWebsiteUrl}</a></p>
            <p><strong>Agency service:</strong> ${safeAgencyService}</p>
            <p><strong>Business type:</strong> ${safeBusinessType}</p>
            <p><strong>Average client value:</strong> ${safeAverageClientValue}</p>
            <p><strong>Current lead source:</strong> ${safeCurrentLeadSource}</p>
            <p><strong>Traffic/profile-view signal:</strong> ${safeTrafficSnapshot}</p>
            <p><strong>Desired website action:</strong> ${safeDesiredWebsiteAction}</p>
            <p><strong>Main problem:</strong> ${safeMainProblem}</p>
            <p><strong>Desired outcome:</strong> ${safeDesiredOutcome}</p>
            <p><strong>Timeline:</strong> ${safeTimeline}</p>
            <p><strong>Implementation budget:</strong> ${safeImplementationBudget}</p>
            <p><strong>Intent:</strong> ${safeEngagementIntent}</p>
            <p><strong>Already tried:</strong> ${safeWhatTried}</p>
            <p><strong>Request ID:</strong> ${escapeHtml(savedRequest.id)}</p>
          `,
        }),
        sendEmail({
          from: fromEmail,
          to: email,
          subject: 'Your Funnel Review application has been received',
          html: `
            <h1>Your Funnel Review application is in, ${safeName}.</h1>
            <p>Thank you for sharing your LinkedIn profile and website.</p>
            <p>I will review your profile, website, and CTA flow, then identify the most important clarity and conversion fixes.</p>
            <p>No generic advice. No pressure. Just clear conversion feedback.</p>
            <p><a href="https://calendly.com/ghufranhasan/1-1-consultation-call">Book a free clarity call</a> if you would like to discuss the audit live.</p>
            <p>Ghufran Hasan<br><a href="https://ghufranhasan.com">ghufranhasan.com</a></p>
          `,
        }),
      ])

      emailsSent = notificationSent && confirmationSent
    } else {
      console.error('RESEND_FROM_EMAIL is not configured')
    }

    return NextResponse.json(
      {
        message: 'Your Funnel Review application has been received.',
        id: savedRequest.id,
        emailsSent,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Funnel Review application submission error:', error)
    const isDevelopment = process.env.NODE_ENV !== 'production'
    return NextResponse.json(
      {
        error: isDevelopment && error instanceof Error
          ? error.message
          : 'The Funnel Review application could not be saved right now. Please try again in a moment.',
      },
      { status: 500 }
    )
  }
}
