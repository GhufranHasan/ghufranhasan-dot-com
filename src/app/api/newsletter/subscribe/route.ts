import { NextRequest, NextResponse } from 'next/server'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const SUBSCRIBER_LIST_ID = process.env.RESEND_SUBSCRIBER_LIST_ID
const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 5
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

// Email validation regex
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const getClientIp = (request: NextRequest): string => {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || 'unknown'
}

const isRateLimited = (key: string): boolean => {
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

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many signup attempts. Please try again in a minute.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    const website = typeof body.website === 'string' ? body.website.trim() : ''

    if (website) {
      return NextResponse.json(
        { message: 'Successfully subscribed', email },
        { status: 200 }
      )
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Check for required environment variables
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Newsletter signup is not available yet. Please try again later or DM me on LinkedIn.' },
        { status: 503 }
      )
    }

    if (!SUBSCRIBER_LIST_ID) {
      console.error('RESEND_SUBSCRIBER_LIST_ID is not configured')
      return NextResponse.json(
        { error: 'Newsletter signup is not available yet. Please try again later or DM me on LinkedIn.' },
        { status: 503 }
      )
    }

    const response = await fetch('https://api.resend.com/audiences/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audience_id: SUBSCRIBER_LIST_ID,
        email,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Resend API error:', error)

      if (error.message?.includes('already exists')) {
        return NextResponse.json(
          { message: 'You are already subscribed', email },
          { status: 200 }
        )
      }

      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: response.status }
      )
    }

    const result = await response.json()
    return NextResponse.json(
      { message: 'Successfully subscribed', email, id: result.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
