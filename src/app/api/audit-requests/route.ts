import { NextRequest, NextResponse } from 'next/server'
import {
  businessTypes,
  desiredOutcomes,
  improvementTimelines,
  mainProblems,
} from '@/data/auditOptions'
import { createAuditRequest } from '@/lib/supabase/auditRequests'

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
const validMainProblems = new Set<string>(mainProblems)
const validDesiredOutcomes = new Set<string>(desiredOutcomes)
const validTimelines = new Set<string>(improvementTimelines)

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const getClientIp = (request: NextRequest) => {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

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
    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many audit requests. Please wait a minute and try again.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const honeypot = cleanText(body.company, 200)

    if (honeypot) {
      return NextResponse.json(
        { message: 'Your audit request has been received.' },
        { status: 201 }
      )
    }

    const name = cleanText(body.name, 100)
    const email = cleanText(body.email, 254).toLowerCase()
    const linkedinUrl = cleanText(body.linkedinUrl, 500)
    const websiteUrl = cleanText(body.websiteUrl, 500)
    const businessType = cleanText(body.businessType, 80)
    const mainProblem = cleanText(body.mainProblem, 160)
    const desiredOutcome = cleanText(body.desiredOutcome, 160)
    const timeline = cleanText(body.timeline, 80)

    if (
      !name ||
      !isValidEmail(email) ||
      !linkedinUrl ||
      !websiteUrl ||
      !validBusinessTypes.has(businessType) ||
      !validMainProblems.has(mainProblem) ||
      !validDesiredOutcomes.has(desiredOutcome) ||
      !validTimelines.has(timeline)
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
      businessType,
      mainProblem,
      desiredOutcome,
      timeline,
    })

    const fromEmail = process.env.RESEND_FROM_EMAIL
    let emailsSent = false

    if (fromEmail) {
      const safeName = escapeHtml(name)
      const safeEmail = escapeHtml(email)
      const safeLinkedinUrl = escapeHtml(parsedLinkedinUrl.toString())
      const safeWebsiteUrl = escapeHtml(parsedWebsiteUrl.toString())
      const safeBusinessType = escapeHtml(businessType)
      const safeMainProblem = escapeHtml(mainProblem)
      const safeDesiredOutcome = escapeHtml(desiredOutcome)
      const safeTimeline = escapeHtml(timeline)
      const notificationEmail =
        process.env.AUDIT_NOTIFICATION_EMAIL || 'hello@ghufranhasan.com'

      const [notificationSent, confirmationSent] = await Promise.all([
        sendEmail({
          from: fromEmail,
          to: notificationEmail,
          subject: `New free audit request from ${name}`,
          html: `
            <h1>New LinkedIn-to-Website Audit Request</h1>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p><strong>LinkedIn:</strong> <a href="${safeLinkedinUrl}">${safeLinkedinUrl}</a></p>
            <p><strong>Website:</strong> <a href="${safeWebsiteUrl}">${safeWebsiteUrl}</a></p>
            <p><strong>Business type:</strong> ${safeBusinessType}</p>
            <p><strong>Main problem:</strong> ${safeMainProblem}</p>
            <p><strong>Desired outcome:</strong> ${safeDesiredOutcome}</p>
            <p><strong>Timeline:</strong> ${safeTimeline}</p>
            <p><strong>Request ID:</strong> ${escapeHtml(savedRequest.id)}</p>
          `,
        }),
        sendEmail({
          from: fromEmail,
          to: email,
          subject: 'Your free audit request has been received',
          html: `
            <h1>Your audit request is in, ${safeName}.</h1>
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
        message: 'Your audit request has been received.',
        id: savedRequest.id,
        emailsSent,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Audit request submission error:', error)
    return NextResponse.json(
      {
        error:
          'The audit request could not be saved right now. Please try again in a moment.',
      },
      { status: 500 }
    )
  }
}
