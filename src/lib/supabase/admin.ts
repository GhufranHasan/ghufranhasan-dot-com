import 'server-only'

type SupabaseAdminRequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
  query?: string
  prefer?: string
}

function normalizeEnvValue(value: string) {
  return value.trim().replace(/^['"]|['"]$/g, '')
}

function getSupabaseRestUrl(table: string, query?: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase admin environment variables are not configured')
  }

  const cleanSupabaseUrl = normalizeEnvValue(supabaseUrl)
  const cleanServiceRoleKey = normalizeEnvValue(serviceRoleKey)

  let parsedUrl: URL

  try {
    parsedUrl = new URL(cleanSupabaseUrl)
  } catch {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL must be a valid https://...supabase.co URL')
  }

  if (parsedUrl.protocol !== 'https:' || !parsedUrl.hostname.endsWith('.supabase.co')) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL must use the https://PROJECT_REF.supabase.co format')
  }

  const requestUrl = new URL(`/rest/v1/${table}`, parsedUrl)

  if (query) {
    requestUrl.search = query
  }

  return {
    requestUrl,
    serviceRoleKey: cleanServiceRoleKey,
  }
}

export async function supabaseAdminRequest<T>(
  table: string,
  options: SupabaseAdminRequestOptions = {}
): Promise<T> {
  const { requestUrl, serviceRoleKey } = getSupabaseRestUrl(table, options.query)

  let response: Response

  try {
    response = await fetch(requestUrl, {
      method: options.method ?? 'GET',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        ...(options.prefer ? { Prefer: options.prefer } : {}),
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      cache: 'no-store',
    })
  } catch (error) {
    throw new Error(
      `Supabase is not reachable at ${requestUrl.hostname}. Check NEXT_PUBLIC_SUPABASE_URL, your internet/DNS connection, and whether the Supabase project ref is correct.`,
      { cause: error }
    )
  }

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Supabase request failed (${response.status}): ${details}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}
