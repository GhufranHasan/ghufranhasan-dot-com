'use client'

import { motion } from 'framer-motion'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import SectionBadge from '@/components/ui/SectionBadge'
import { useModal } from '@/contexts/ModalContext'
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle,
  ClipboardCheck,
  Clock3,
  Compass,
  FileSearch,
  Layers3,
  Rocket,
  X,
} from 'lucide-react'

const packages = [
  {
    title: 'Free Funnel Review',
    price: 'Free',
    stage: 'Selective diagnosis',
    audience: 'For established B2B agencies with a working website',
    badge: 'Apply first',
    cta: 'Apply for Review',
    timeline: 'Limited weekly reviews',
    purpose: 'For agency founders who want one focused read on the biggest LinkedIn-to-website conversion leak before choosing a paid next step.',
    valueSummary: [
      {
        label: 'What you get',
        text: 'A short review of your LinkedIn profile, website, CTA path, and application context.',
      },
      {
        label: 'Why it matters',
        text: 'You avoid jumping into a build before knowing whether the issue is positioning, page messaging, trust, CTA, or qualification.',
      },
      {
        label: 'Outcome',
        text: 'You get one major leak, one practical recommendation, and a clear suggestion on whether a paid audit or sprint makes sense.',
      },
    ],
    bestFor: 'Best if you sell a real B2B service, already have a website, and want to know whether your current path is worth fixing.',
    features: [
      'Qualified intake review',
      'LinkedIn-to-website path check',
      'One major conversion leak',
      'One practical recommendation',
      'Best next-step suggestion',
    ],
    valueStack: [
      ['Application review', 'Filters for established businesses instead of free-advice seekers'],
      ['LinkedIn promise check', 'Shows whether the profile creates the right expectation'],
      ['Website hero check', 'Tests whether the website continues the same promise'],
      ['CTA path check', 'Looks for the first obvious conversion friction'],
      ['Fit recommendation', 'Clarifies whether the next step is audit, sprint, or no project'],
    ],
  },
  {
    title: 'Conversion Audit',
    price: '$300',
    stage: 'Paid diagnosis',
    audience: 'For founders who want a real roadmap before implementation',
    badge: 'Start here',
    cta: 'Apply for Paid Audit',
    timeline: '2-3 business days',
    purpose: 'For agency founders who know the website is underperforming but do not want to guess what to fix first.',
    valueSummary: [
      {
        label: 'What you get',
        text: 'A recorded audit of your LinkedIn-to-website path, service-page message, CTA clarity, offer positioning, trust sequence, and booking friction.',
      },
      {
        label: 'Why it matters',
        text: 'You stop guessing and get a prioritized roadmap before spending on copy, design, or development.',
      },
      {
        label: 'Outcome',
        text: 'You leave with the most important fixes, copy direction, CTA recommendation, and a practical implementation roadmap.',
      },
    ],
    bestFor: 'Best if you already have LinkedIn attention and a website, but the path is not producing enough qualified enquiries.',
    features: [
      'LinkedIn and website review',
      'Recorded Loom diagnosis',
      'Priority fix list',
      'CTA and copy recommendations',
      'Implementation roadmap',
    ],
    valueStack: [
      ['Profile-to-page journey review', 'Shows where LinkedIn attention weakens before enquiry'],
      ['Homepage or service-page audit', 'Checks whether visitors understand your offer quickly'],
      ['CTA clarity review', 'Removes confusion around what action visitors should take'],
      ['Offer positioning feedback', 'Helps your service feel specific and valuable'],
      ['Trust sequence review', 'Identifies missing proof, process, or credibility signals'],
      ['Recorded Loom breakdown', 'Gives a clear explanation, not just notes'],
      ['Prioritized action roadmap', 'Shows what to fix first, second, and third'],
      ['Sprint recommendation', 'Clarifies whether implementation is worth doing now'],
    ],
  },
  {
    title: 'LinkedIn-to-Website Conversion Sprint',
    price: 'From $1,200',
    stage: '10-day implementation',
    audience: 'For founder-led B2B agencies ready to fix the path',
    badge: 'Core offer',
    cta: 'Apply for Sprint',
    timeline: '10 business days',
    purpose: 'For agencies that need one clear journey from LinkedIn attention to qualified enquiry, built and launched without turning into a vague website project.',
    valueSummary: [
      {
        label: 'What you get',
        text: 'Positioning alignment, conversion copy, page architecture, responsive design and Next.js implementation, audit/contact flow, mobile optimization, tracking, and launch support.',
      },
      {
        label: 'Why it matters',
        text: 'Your LinkedIn profile, website, offer, CTA, trust proof, and inquiry path stop working as separate pieces and start working as one decision path.',
      },
      {
        label: 'Outcome',
        text: 'You get a focused conversion page or homepage path built to help qualified visitors understand the offer and request the next step.',
      },
    ],
    bestFor: 'Best if your agency sells a high-value service and one additional qualified client is worth more than the sprint investment.',
    features: [
      'Positioning and offer-message alignment',
      'Conversion-focused page architecture',
      'Homepage or landing-page copy',
      'Responsive design and Next.js build',
      'Audit, contact, or booking flow',
      'Analytics and CTA tracking',
      'Launch walkthrough',
    ],
    valueStack: [
      ['Profile-to-website audit', 'Identifies leaks from profile visit to enquiry'],
      ['Positioning alignment', 'Makes the message sharper and more specific'],
      ['Conversion page architecture', 'Defines the full buyer decision path'],
      ['Conversion copy', 'Explains the offer, problem, proof, and next step'],
      ['Responsive design', 'Makes the path easy to scan on mobile and desktop'],
      ['Next.js implementation', 'Delivers a fast, maintainable page'],
      ['Intake or booking flow', 'Gives qualified prospects one clear action'],
      ['Analytics and CTA tracking', 'Shows whether visitors reach important actions'],
      ['Launch checklist', 'Ensures the system is ready before publishing'],
      ['Walkthrough video', 'Explains how the path works after launch'],
    ],
  },
]

type Package = (typeof packages)[number]

function PackageValueModal({
  pkg,
  onClose,
}: {
  pkg: Package | null
  onClose: () => void
}) {
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const lastActiveElementRef = useRef<HTMLElement | null>(null)
  const restoreFocusRef = useRef(true)
  const { openModal, closeModal } = useModal()

  useEffect(() => {
    if (!pkg) return

    lastActiveElementRef.current = document.activeElement as HTMLElement | null
    restoreFocusRef.current = true
    openModal()
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )

      if (!focusableElements?.length) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      closeModal()

      if (restoreFocusRef.current) {
        lastActiveElementRef.current?.focus()
      }
    }
  }, [pkg, onClose, openModal, closeModal])

  if (!pkg) return null

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <button
        type="button"
        aria-label={`Close ${pkg.title} value stack`}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        ref={dialogRef}
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22 }}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-orange-500/35 bg-purple-950 shadow-[0_0_55px_rgba(255,132,3,0.2)]"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-orange-500/20 bg-purple-950/95 p-5 backdrop-blur-md md:p-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">{pkg.stage}</p>
            <h2 id={titleId} className="mt-2 text-3xl font-bebas text-white md:text-4xl">
              {pkg.title} - Full Value Stack
            </h2>
            <p id={descriptionId} className="mt-2 max-w-xl text-sm leading-relaxed text-white/65">
              See the value, intended outcome, and exact deliverables before deciding whether this is the right starting point.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-orange-500/25 text-white/70 transition-colors hover:bg-orange-500/10 hover:text-white"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 md:p-7">
          <div className="flex flex-wrap items-center gap-3 border-b border-orange-500/20 pb-6">
            <span className="text-3xl font-bold text-orange-400">{pkg.price}</span>
            <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-200">
              {pkg.audience}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1 text-xs font-semibold text-white/70">
              <Clock3 size={14} className="text-orange-400" />
              {pkg.timeline}
            </span>
          </div>

          <div className="divide-y divide-orange-500/15">
            {pkg.valueSummary.map((item) => (
              <section key={item.label} className="py-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{item.text}</p>
              </section>
            ))}
          </div>

          <div className="border-y border-orange-500/20 py-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Best for</p>
            <p className="mt-2 text-sm leading-relaxed text-white/75">{pkg.bestFor}</p>
          </div>

          <div className="pt-6">
            <div className="mb-4 flex items-center gap-2">
              <Layers3 size={18} className="text-orange-400" />
              <h3 className="font-semibold text-white">Detailed deliverables and impact</h3>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {pkg.valueStack.map(([item, reason]) => (
                <div key={item} className="rounded-xl border border-orange-500/15 bg-orange-500/5 p-4">
                  <p className="text-sm font-semibold text-white">{item}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 border-t border-orange-500/20 pt-6">
            <Button
              href="/free-audit#request-audit"
              variant="primary"
              className="w-full whitespace-nowrap"
              onClick={() => {
                restoreFocusRef.current = false
                onClose()
              }}
            >
              {pkg.cta}
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const startOptions = [
  {
    icon: FileSearch,
    eyebrow: 'Not sure what is broken',
    title: 'Free Funnel Review',
    price: 'Free',
    bestFor: 'You want a quick read on whether your LinkedIn-to-website path is worth fixing.',
    includes: ['Qualified intake', 'Biggest leak', 'Best next step'],
    cta: 'Apply for review',
    href: '/free-audit',
    tone: 'soft',
  },
  {
    icon: ClipboardCheck,
    eyebrow: 'Need a real diagnosis',
    title: 'Conversion Audit',
    price: '$300',
    bestFor: 'You want exact fixes, copy direction, and a roadmap before implementation.',
    includes: ['Recorded Loom', 'Priority fixes', 'Sprint roadmap'],
    cta: 'Apply for audit',
    href: '/free-audit#request-audit',
    tone: 'warm',
  },
  {
    icon: Rocket,
    eyebrow: 'Ready to launch the path',
    title: 'Conversion Sprint',
    price: '$1.2K+',
    bestFor: 'You want the strategy, copy, design, build, tracking, and launch handled.',
    includes: ['Conversion copy', 'Next.js build', 'CTA tracking'],
    cta: 'Apply for sprint',
    href: '/free-audit#request-audit',
    tone: 'bright',
  },
]

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const closePackageModal = useCallback(() => setSelectedPackage(null), [])

  return (
    <>
      <section id="packages" className="texture-band neon-magenta section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <SectionBadge icon={BadgeDollarSign} className="mb-4">Simplified offer ladder</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-bebas mb-4">Start where you are</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              A cleaner path from qualified review to paid diagnosis to implementation sprint, without a confusing low-priced build in the middle.
            </p>
          </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`glass-card p-8 relative flex flex-col transition-all duration-300 hover:border-orange-500/40 ${
                pkg.badge === 'Core offer'
                  ? 'border-orange-500/40 md:scale-105 shadow-[0_0_40px_rgba(255,132,3,0.25)] ring-1 ring-orange-500/20'
                  : 'border-orange-500/20'
              }`}
              style={pkg.badge === 'Core offer' ? { background: 'linear-gradient(135deg, rgba(10,19,50,0.65) 0%, rgba(51,13,62,0.55) 100%)' } : undefined}
            >
              {pkg.badge === 'Core offer' ? (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-orange-500 to-orange-600 text-white px-5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-lg">
                  Core Offer
                </div>
              ) : (
                <span className="absolute -top-3 right-6 px-4 py-1 rounded-full text-xs font-bold bg-linear-to-r from-purple-900 to-purple-800 text-white">
                  {pkg.badge}
                </span>
              )}

              <div className="text-center pb-6 mb-6 border-b border-orange-500/20">
                <h3 className="text-2xl font-bebas mb-2">{pkg.title}</h3>
                <span className="text-xs uppercase text-orange-400 font-semibold bg-orange-500/10 px-3 py-1 rounded-full block mb-2">
                  {pkg.stage}
                </span>
                <div className="text-3xl font-bold text-orange-500">{pkg.price}</div>
                <div className="text-xs bg-orange-500/10 inline-block px-3 py-1 rounded-full mt-2">
                  {pkg.audience}
                </div>
                <p className="mt-4 text-sm text-white/68">{pkg.purpose}</p>
              </div>

              <div className="flex-1 mb-6">
                <h4 className="text-orange-500 text-sm uppercase tracking-wider mb-4">What is included:</h4>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3 text-center">
                <Button href="/free-audit#request-audit" variant="primary" className="w-full">
                  {pkg.cta}
                </Button>
                <button
                  type="button"
                  onClick={() => setSelectedPackage(pkg)}
                  aria-haspopup="dialog"
                  aria-expanded={selectedPackage?.title === pkg.title}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-orange-500/25 bg-orange-500/5 px-5 py-3 text-sm font-semibold text-orange-200 transition-all hover:border-orange-500/50 hover:bg-orange-500/10"
                >
                  <Layers3 size={16} />
                  View full value stack
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-8 items-stretch">
            <div className="relative overflow-hidden rounded-2xl border border-orange-500/25 bg-purple-950/45 p-7 md:p-8">
              <div className="absolute inset-0 opacity-25 texture-grid" aria-hidden="true" />
              <div className="relative z-10">
                <SectionBadge icon={Compass}>Decision guide</SectionBadge>
                <h3 className="mt-5 text-3xl md:text-4xl font-bebas">Choosing where to start</h3>
                <p className="mt-4 text-white/70">
                  Pick based on certainty and urgency. If you do not know the leak yet, apply for the review. If the issue is real, the paid audit or sprint becomes the next logical step.
                </p>

                <div className="mt-7 space-y-4">
                  <div className="flex items-start gap-3 rounded-xl border border-orange-500/15 bg-orange-500/5 p-4">
                    <BadgeDollarSign size={19} className="mt-0.5 text-orange-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Best default path</p>
                      <p className="text-sm text-white/60">Free Review - Conversion Audit - Conversion Sprint</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/3 p-4">
                    <ArrowRight size={19} className="mt-0.5 text-orange-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">No pressure</p>
                      <p className="text-sm text-white/60">The intake creates clarity before any optional call or package decision.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {startOptions.map((option, index) => (
                <motion.a
                  key={option.title}
                  href={option.href}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  className={`group relative flex min-h-full flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-glow ${
                    option.tone === 'bright'
                      ? 'border-orange-500/35 bg-orange-500/10'
                      : option.tone === 'warm'
                        ? 'border-orange-500/45 bg-linear-to-b from-orange-500/14 to-purple-950/35 shadow-[0_0_34px_rgba(255,132,3,0.14)]'
                        : 'border-white/10 bg-purple-950/35'
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400">
                      <option.icon size={22} />
                    </div>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                      {option.price}
                    </span>
                  </div>

                  <p className="text-xs uppercase tracking-wider text-orange-300/80">{option.eyebrow}</p>
                  <h4 className="mt-2 text-xl font-bold text-white">{option.title}</h4>
                  <p className="mt-3 text-sm text-white/68">{option.bestFor}</p>

                  <ul className="mt-5 flex-1 space-y-2">
                    {option.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                        <CheckCircle size={15} className="mt-0.5 shrink-0 text-orange-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 group-hover:text-orange-200">
                    {option.cta}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
        </div>
      </section>

      <PackageValueModal pkg={selectedPackage} onClose={closePackageModal} />
    </>
  )
}
