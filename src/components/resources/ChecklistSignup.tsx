'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, Download, Mail } from 'lucide-react'

const checklistHref = '/resources/website-funnel-checklist.html'

export default function ChecklistSignup() {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email) return

    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          website,
          source: 'free-website-audit-checklist',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'The checklist is unavailable right now. Please try again later.')
        return
      }

      setIsUnlocked(true)
    } catch (submitError) {
      console.error('Checklist signup error:', submitError)
      setError('The checklist is unavailable right now. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isUnlocked) {
    return (
      <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-5">
        <CheckCircle2 size={28} className="text-orange-400" />
        <h2 className="mt-4 text-2xl font-bebas text-white">Your checklist is unlocked</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/68">
          Download the 10-Point Website Funnel Checklist and review your website one point at a time.
        </p>
        <a
          href={checklistHref}
          download
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white transition-all hover:shadow-glow-hover"
        >
          <Download size={18} />
          Download the Checklist
        </a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="website"
        value={website}
        onChange={(event) => setWebsite(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-white">Where should I send the checklist?</span>
        <span className="relative block">
          <Mail
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-orange-400"
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email address"
            required
            className="w-full rounded-lg border border-orange-500/25 bg-purple-950/60 py-3 pl-12 pr-4 text-white outline-none transition-colors placeholder:text-white/35 focus:border-orange-500/60"
          />
        </span>
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white transition-all hover:shadow-glow-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Unlocking...' : 'Get the Free Checklist'}
        {!isLoading && <ArrowRight size={18} />}
      </button>

      {error && (
        <p className="rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <p className="text-center text-xs leading-relaxed text-white/45">
        You will also receive practical LinkedIn-to-website conversion insights. Unsubscribe anytime.
      </p>
    </form>
  )
}
