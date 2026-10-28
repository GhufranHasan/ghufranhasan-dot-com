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

export async function readJsonObject(
  request: NextRequest,
  maxBytes: number,
): Promise<Record<string, unknown> | null> {
  if (!hasJsonContentType(request) || isPayloadTooLarge(request, maxBytes)) return null

  const reader = request.body?.getReader()
  if (!reader) return null

  try {
    const decoder = new TextDecoder('utf-8', { fatal: true })
    let text = ''
    let size = 0

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      size += value.byteLength
      if (size > maxBytes) {
        await reader.cancel()
        return null
      }
      text += decoder.decode(value, { stream: true })
    }

    const body: unknown = JSON.parse(text + decoder.decode())
    return body !== null && typeof body === 'object' && !Array.isArray(body)
      ? body as Record<string, unknown>
      : null
  } catch {
    return null
  } finally {
    reader.releaseLock()
  }
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
