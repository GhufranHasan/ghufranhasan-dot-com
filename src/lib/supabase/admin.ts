type SupabaseAdminRequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
  query?: string
  prefer?: string
}

export async function supabaseAdminRequest<T>(
  table: string,
  options: SupabaseAdminRequestOptions = {}
): Promise<T> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase admin environment variables are not configured')
  }

  const query = options.query ? `?${options.query}` : ''
  const response = await fetch(
    `${supabaseUrl.replace(/\/$/, '')}/rest/v1/${table}${query}`,
    {
      method: options.method ?? 'GET',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        ...(options.prefer ? { Prefer: options.prefer } : {}),
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Supabase request failed (${response.status}): ${details}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

