'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { LockKeyhole, LoaderCircle } from 'lucide-react'

export default function DashboardLoginForm() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/dashboard/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Dashboard could not be unlocked.')
        return
      }

      router.refresh()
    } catch {
      setError('Dashboard could not be unlocked right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md rounded-2xl border border-orange-500/25 bg-purple-950/70 p-6 shadow-glow backdrop-blur-md md:p-8"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/25">
        <LockKeyhole size={23} />
      </div>
      <h1 className="text-3xl font-bebas text-white">Dashboard Access</h1>
      <p className="mt-3 text-sm leading-relaxed text-white/65">
        Enter your private dashboard password to review visits, applications,
        subscribers, downloads, and database health.
      </p>

      <label className="mt-6 block text-sm font-semibold text-white">
        Dashboard Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          className="mt-2 w-full rounded-lg border border-orange-500/20 bg-purple-950/55 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10"
          placeholder="Enter password"
        />
      </label>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Unlocking...
          </>
        ) : (
          'Open Dashboard'
        )}
      </button>
    </form>
  )
}
