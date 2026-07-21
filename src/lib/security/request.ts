import 'server-only'

import type { NextRequest } from 'next/server'

export function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'

  return request.headers.get('x-real-ip') || 'unknown'
}

export function hasJsonContentType(request: NextRequest) {
  const contentType = request.headers.get('content-type')
  return Boolean(contentType?.toLowerCase().includes('application/json'))
}

export function isPayloadTooLarge(request: NextRequest, maxBytes: number) {
  const contentLength = request.headers.get('content-length')
  if (!contentLength) return false

  const parsedLength = Number(contentLength)
  return Number.isFinite(parsedLength) && parsedLength > maxBytes
}

export function isSameOriginRequest(request: NextRequest) {
  const host = request.headers.get('host') || request.nextUrl.host
  const expectedOrigin = `${request.nextUrl.protocol}//${host}`
  const origin = request.headers.get('origin')

  if (origin) return origin === expectedOrigin

  const referer = request.headers.get('referer')
  if (referer) {
    try {
      return new URL(referer).origin === expectedOrigin
    } catch {
      return false
    }
  }

  return process.env.NODE_ENV !== 'production'
}
