'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, CheckCircle2, LoaderCircle, ShieldCheck } from 'lucide-react'
import {
  businessTypes,
  desiredOutcomes,
  improvementTimelines,
  mainProblems,
} from '@/data/auditOptions'
import BrandedSelect from '@/components/ui/BrandedSelect'

const inputClasses =
  'mt-2 w-full rounded-lg border border-orange-500/20 bg-purple-950/55 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10'

export default function AuditIntakeForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    const form = event.currentTarget
    const formData = new FormData(form)
    const requiredSelections = [
      formData.get('businessType'),
      formData.get('mainProblem'),
      formData.get('desiredOutcome'),
      formData.get('timeline'),
    ]

    if (requiredSelections.some((value) => !value)) {
      setError('Please choose an option for each dropdown field.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/audit-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          linkedinUrl: formData.get('linkedinUrl'),
          websiteUrl: formData.get('websiteUrl'),
          businessType: formData.get('businessType'),
          mainProblem: formData.get('mainProblem'),
          desiredOutcome: formData.get('desiredOutcome'),
          timeline: formData.get('timeline'),
          company: formData.get('company'),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Your request could not be saved. Please try again.')
        return
      }

      router.push('/thank-you')
    } catch (submissionError) {
      console.error('Audit form submission error:', submissionError)
      setError('Your request could not be saved. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card border-orange-500/30 p-5 shadow-glow md:p-7">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-white">
          Full Name
          <input
            className={inputClasses}
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            maxLength={100}
            required
          />
        </label>

        <label className="text-sm font-semibold text-white">
          Email Address
          <input
            className={inputClasses}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Where should I send the audit?"
            maxLength={254}
            required
          />
        </label>

        <label className="text-sm font-semibold text-white sm:col-span-2">
          LinkedIn Profile URL
          <input
            className={inputClasses}
            type="url"
            name="linkedinUrl"
            inputMode="url"
            autoComplete="url"
            placeholder="https://linkedin.com/in/..."
            maxLength={500}
            required
          />
        </label>

        <label className="text-sm font-semibold text-white sm:col-span-2">
          Website URL
          <input
            className={inputClasses}
            type="url"
            name="websiteUrl"
            inputMode="url"
            placeholder="https://yourwebsite.com"
            maxLength={500}
            required
          />
        </label>

        <BrandedSelect
          label="What best describes you?"
          name="businessType"
          options={businessTypes}
          placeholder="Select one"
        />

        <BrandedSelect
          label="How soon do you want to improve this?"
          name="timeline"
          options={improvementTimelines}
          placeholder="Select a timeline"
        />

        <BrandedSelect
          label="Where do you think the main problem is?"
          name="mainProblem"
          options={mainProblems}
          placeholder="Select the closest match"
          className="sm:col-span-2"
        />

        <BrandedSelect
          label="What do you want more of?"
          name="desiredOutcome"
          options={desiredOutcomes}
          placeholder="Select your main outcome"
          className="sm:col-span-2"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Saving your request...
          </>
        ) : (
          <>
            Request My Free Audit
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <div className="mt-5 flex flex-col gap-2 border-t border-orange-500/15 pt-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck size={14} className="text-orange-400" />
          Your links are used only for the audit.
        </span>
        <span className="inline-flex items-center gap-2">
          <CheckCircle2 size={14} className="text-orange-400" />
          No generic advice. No pressure.
        </span>
      </div>
    </form>
  )
}
