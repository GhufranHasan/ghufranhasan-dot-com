'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, LoaderCircle, ShieldCheck } from 'lucide-react'
import {
  averageClientValues,
  businessTypes,
  currentLeadSources,
  desiredOutcomes,
  engagementIntents,
  improvementTimelines,
  implementationBudgets,
  mainProblems,
} from '@/data/auditOptions'
import BrandedSelect from '@/components/ui/BrandedSelect'
import { trackSiteEvent } from '@/lib/siteEventClient'

const inputClasses =
  'mt-2 w-full rounded-lg border border-orange-500/20 bg-purple-950/55 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/35 focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/10'

const fieldVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

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
      formData.get('averageClientValue'),
      formData.get('currentLeadSource'),
      formData.get('mainProblem'),
      formData.get('desiredOutcome'),
      formData.get('timeline'),
      formData.get('implementationBudget'),
      formData.get('engagementIntent'),
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
          agencyService: formData.get('agencyService'),
          businessType: formData.get('businessType'),
          averageClientValue: formData.get('averageClientValue'),
          currentLeadSource: formData.get('currentLeadSource'),
          mainProblem: formData.get('mainProblem'),
          desiredOutcome: formData.get('desiredOutcome'),
          timeline: formData.get('timeline'),
          implementationBudget: formData.get('implementationBudget'),
          engagementIntent: formData.get('engagementIntent'),
          company: formData.get('company'),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Your application could not be saved. Please try again.')
        return
      }

      trackSiteEvent({
        eventType: 'form_submission',
        eventName: 'Funnel review application submitted',
        sectionId: 'request-audit',
        metadata: {
          form: 'audit_request',
        },
      })
      router.push('/thank-you')
    } catch (submissionError) {
      console.error('Audit form submission error:', submissionError)
      setError('Your application could not be saved. Please try again in a moment.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: 22 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.06 },
        },
      }}
      className="glass-card border-orange-500/30 p-5 shadow-glow md:p-7"
    >
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <motion.label variants={fieldVariants} className="text-sm font-semibold text-white">
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
        </motion.label>

        <motion.label variants={fieldVariants} className="text-sm font-semibold text-white">
          Email Address
          <input
            className={inputClasses}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Where should I send the review?"
            maxLength={254}
            required
          />
        </motion.label>

        <motion.label variants={fieldVariants} className="text-sm font-semibold text-white sm:col-span-2">
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
        </motion.label>

        <motion.label variants={fieldVariants} className="text-sm font-semibold text-white sm:col-span-2">
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
        </motion.label>

        <motion.label variants={fieldVariants} className="text-sm font-semibold text-white sm:col-span-2">
          Agency Service
          <input
            className={inputClasses}
            type="text"
            name="agencyService"
            placeholder="Example: B2B content agency, web development agency, paid media agency"
            maxLength={180}
            required
          />
        </motion.label>

        <motion.div variants={fieldVariants}>
          <BrandedSelect
            label="What best describes your business?"
            name="businessType"
            options={businessTypes}
            placeholder="Select one"
          />
        </motion.div>

        <motion.div variants={fieldVariants}>
          <BrandedSelect
            label="Average client value"
            name="averageClientValue"
            options={averageClientValues}
            placeholder="Select a range"
          />
        </motion.div>

        <motion.div variants={fieldVariants}>
          <BrandedSelect
            label="Current main lead source"
            name="currentLeadSource"
            options={currentLeadSources}
            placeholder="Select one"
          />
        </motion.div>

        <motion.div variants={fieldVariants}>
          <BrandedSelect
            label="How soon do you want to improve this?"
            name="timeline"
            options={improvementTimelines}
            placeholder="Select a timeline"
          />
        </motion.div>

        <motion.div variants={fieldVariants} className="sm:col-span-2">
          <BrandedSelect
            label="Where do you think the main problem is?"
            name="mainProblem"
            options={mainProblems}
            placeholder="Select the closest match"
          />
        </motion.div>

        <motion.div variants={fieldVariants}>
          <BrandedSelect
            label="What do you want more of?"
            name="desiredOutcome"
            options={desiredOutcomes}
            placeholder="Select your main outcome"
          />
        </motion.div>

        <motion.div variants={fieldVariants}>
          <BrandedSelect
            label="Implementation budget"
            name="implementationBudget"
            options={implementationBudgets}
            placeholder="Select one"
          />
        </motion.div>

        <motion.div variants={fieldVariants} className="sm:col-span-2">
          <BrandedSelect
            label="What do you want from this review?"
            name="engagementIntent"
            options={engagementIntents}
            placeholder="Select intent"
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={isSubmitting ? undefined : { y: -2 }}
        whileTap={isSubmitting ? undefined : { scale: 0.98 }}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Saving your application...
          </>
        ) : (
          <>
            Apply for Free Funnel Review
            <ArrowRight size={18} />
          </>
        )}
      </motion.button>

      <motion.div
        variants={fieldVariants}
        className="mt-5 flex flex-col gap-2 border-t border-orange-500/15 pt-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between"
      >
        <span className="inline-flex items-center gap-2">
          <ShieldCheck size={14} className="text-orange-400" />
          Limited reviews for established B2B service businesses.
        </span>
        <span className="inline-flex items-center gap-2">
          <CheckCircle2 size={14} className="text-orange-400" />
          No generic advice. No pressure.
        </span>
      </motion.div>
    </motion.form>
  )
}
