import { NextResponse } from 'next/server'
import {
  dashboardCookieName,
  getDashboardCookieOptions,
} from '@/lib/dashboard/auth'

export async function POST() {
  const response = NextResponse.json({ message: 'Dashboard locked.' })
  response.cookies.set(dashboardCookieName, '', getDashboardCookieOptions(0))

  return response
}
