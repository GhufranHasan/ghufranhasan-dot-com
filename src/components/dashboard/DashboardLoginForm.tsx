'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, LockKeyhole, LoaderCircle, MailCheck } from 'lucide-react'

type LoginStep = 'password' | 'code'

type LoginResult = {
  error?: string
  requiresTwoFactor?: boolean
  destination?: string
  expiresInMinutes?: number
}

export default function DashboardLoginForm({ available = true }: { available?: boolean }) {
  const router = useRouter()
  const [step, setStep] = useState<LoginStep>('password')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [destination, setDestination] = useState('')
  const [expiresInMinutes, setExpiresInMinutes] = useState(10)
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
        body: JSON.stringify(step === 'password' ? { password } : { code }),
      })
      const result = (await response.json()) as LoginResult

      if (!response.ok) {
        setError(result.error || 'Dashboard could not be unlocked.')
        return
      }

      if (result.requiresTwoFactor) {
        setStep('code')
        setPassword('')
        setCode('')
        setDestination(result.destination || 'your email')
        setExpiresInMinutes(result.expiresInMinutes || 10)
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
        {!available ? 'Secure sign-in is unavailable. Only the site owner can enable dashboard access.' : step === 'password'
          ? 'Enter your private dashboard password to start secure access.'
          : `Enter the six-digit code sent to ${destination}. It expires in ${expiresInMinutes} minutes.`}
      </p>

      {step === 'password' ? (
        <label className="mt-6 block text-sm font-semibold text-white">
          Dashboard Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            maxLength={256}
            disabled={!available}
            required
            className="mt-2 w-full rounded-lg border border-orange-500/20 bg-purple-950/55 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10"
            placeholder="Enter password"
          />
        </label>
      ) : (
        <label className="mt-6 block text-sm font-semibold text-white">
          Verification Code
          <input
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
            autoComplete="one-time-code"
            inputMode="numeric"
            pattern="[0-9]{6}"
            maxLength={6}
            required
            className="mt-2 w-full rounded-lg border border-orange-500/20 bg-purple-950/55 px-4 py-3 text-center text-lg font-bold tracking-[0.45em] text-white outline-none transition-colors placeholder:text-white/35 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10"
            placeholder="000000"
          />
        </label>
      )}

      {error && (
        <p role="alert" className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !available}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            {step === 'password' ? 'Sending code...' : 'Verifying...'}
          </>
        ) : step === 'password' ? (
          <>
            Send verification code
            <MailCheck size={18} />
          </>
        ) : (
          'Verify and open dashboard'
        )}
      </button>

      {step === 'code' && (
        <button
          type="button"
          onClick={() => {
            setStep('password')
            setCode('')
            setError('')
          }}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-orange-500/25 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-orange-500/10"
        >
          <ArrowLeft size={16} />
          Start again
        </button>
      )}
    </form>
  )
}
