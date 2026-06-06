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
    title: 'Starter Audit',
    price: '$300',
    stage: 'Start with clarity',
    audience: 'For founders who want clarity before a build',
    badge: 'Start here',
    cta: 'Start With Paid Audit',
    timeline: '2-3 business days',
    purpose: 'For founders who know their website is not converting, but do not know what to fix first.',
    valueSummary: [
      {
        label: 'What you get',
        text: 'A recorded audit of your LinkedIn-to-website path, homepage message, CTA clarity, offer positioning, and trust sequence.',
      },
      {
        label: 'Why it matters',
        text: 'You stop guessing what is broken and get a clear view of the exact conversion leaks stopping visitors from taking action.',
      },
      {
        label: 'Outcome',
        text: 'You leave with 3 highest-priority fixes, copy direction, and a simple roadmap before investing in a redesign or build.',
      },
    ],
    bestFor: 'Best if you already have a website but you are unsure why LinkedIn attention is not turning into inquiries.',
    features: [
      'LinkedIn profile and website review',
      'Recorded Loom breakdown',
      '3 highest-priority conversion fixes',
      'CTA and hero copy recommendations',
      'Simple next-step roadmap',
    ],
    valueStack: [
      ['LinkedIn-to-website journey review', 'Shows where attention is dropping before inquiry'],
      ['Homepage headline audit', 'Clarifies whether visitors understand your offer quickly'],
      ['CTA clarity review', 'Removes confusion around what action visitors should take'],
      ['Offer positioning feedback', 'Helps your service feel more specific and valuable'],
      ['Trust section review', 'Identifies missing proof, testimonials, or authority signals'],
      ['Loom video breakdown', 'Gives you a clear explanation, not just written notes'],
      ['Prioritized action roadmap', 'Shows what to fix first, second, and third'],
      ['Copy improvement suggestions', 'Helps you improve messaging without guessing'],
    ],
  },
  {
    title: 'LinkedIn + Landing Page',
    price: '$500',
    stage: 'Core conversion system',
    audience: 'For founders with LinkedIn traction but weak conversion',
    badge: 'Most popular',
    cta: 'Discuss Landing Page',
    timeline: '7-10 days',
    purpose: 'For founders who need one focused page that turns warm LinkedIn visitors into qualified inquiries.',
    valueSummary: [
      {
        label: 'What you get',
        text: 'A focused landing page strategy, conversion copy structure, lead capture path, booking flow, and responsive Next.js implementation.',
      },
      {
        label: 'Why it matters',
        text: 'Your LinkedIn visitors land on a page that continues the same promise instead of sending them to a generic website.',
      },
      {
        label: 'Outcome',
        text: 'You get one clear page built to move warm visitors from profile curiosity to audit request, DM, or booked conversation.',
      },
    ],
    bestFor: 'Best if you already have LinkedIn traction and need one clear page to convert profile visitors.',
    features: [
      'LinkedIn positioning refinement',
      'Conversion-focused landing page structure',
      'Hero, offer, proof, and CTA copy',
      'Lead capture and booking flow',
      'Responsive Next.js implementation',
    ],
    valueStack: [
      ['Landing page strategy', 'Creates a clear path from attention to action'],
      ['Hero section copy', 'Makes the offer understandable within seconds'],
      ['Problem section', 'Helps visitors feel understood'],
      ['Offer section', 'Explains what you do and why it matters'],
      ['Trust-building sections', 'Adds credibility before the CTA'],
      ['CTA flow', 'Guides visitors toward one clear next step'],
      ['Responsive Next.js build', 'Gives you a fast, modern, mobile-friendly website'],
      ['Basic SEO setup', 'Helps search engines understand your page'],
      ['Contact / audit form integration', 'Makes it easy for leads to reach you'],
      ['Launch support', 'Helps you publish with confidence'],
    ],
  },
  {
    title: 'Full Funnel System',
    price: '$1,200',
    stage: 'Premium strategy and build',
    audience: 'For founders ready to align the full journey',
    badge: 'Full system',
    cta: 'Plan Full Funnel',
    timeline: '2-3 weeks',
    purpose: 'For founders who want a complete LinkedIn-to-website conversion path, not just a single page.',
    valueSummary: [
      {
        label: 'What you get',
        text: 'Full profile-to-website audit, offer architecture, messaging structure, multi-section website, FAQ, lead capture, launch support, and walkthrough video.',
      },
      {
        label: 'Why it matters',
        text: 'Your LinkedIn profile, website, offer, CTA, trust proof, and follow-up path stop working as separate pieces and start working as one system.',
      },
      {
        label: 'Outcome',
        text: 'You get a complete LinkedIn-to-website conversion path that supports qualified conversations, not just website visits.',
      },
    ],
    bestFor: 'Best if your profile, offer, website, and CTA all need to be aligned into one buyer journey.',
    features: [
      'Full profile-to-website funnel audit',
      'Offer and messaging architecture',
      'Multi-section website build',
      'FAQ and objection handling',
      'Launch support and walkthrough video',
    ],
    valueStack: [
      ['Full funnel audit', 'Identifies leaks from profile to website to inquiry'],
      ['Positioning refinement', 'Makes your message sharper and more specific'],
      ['Website structure strategy', 'Defines the full buyer journey'],
      ['Landing page or multi-section build', 'Gives your offer a complete conversion home'],
      ['Lead magnet / audit CTA planning', 'Creates a low-friction entry point'],
      ['Trust proof section planning', 'Helps visitors believe before they book'],
      ['FAQ and objection handling', 'Reduces doubts before the call'],
      ['Newsletter or email capture setup', 'Helps you capture visitors who are not ready yet'],
      ['Form and inquiry flow', 'Makes lead collection easier'],
      ['Launch checklist', 'Ensures the system is ready before publishing'],
      ['Post-launch refinement', 'Allows improvements after real feedback'],
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
              href="#contact"
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
    title: 'Free Funnel Audit',
    price: 'Free',
    bestFor: 'You want a quick read on the biggest leak before spending money.',
    includes: ['15-minute review', 'Biggest conversion opportunity', 'Clear next step'],
    cta: 'Request Free Audit',
    href: '#contact',
    tone: 'soft',
  },
  {
    icon: ClipboardCheck,
    eyebrow: 'Need a real diagnosis',
    title: 'Starter Audit',
    price: '$300',
    bestFor: 'You want the exact fixes, copy direction, and roadmap before building.',
    includes: ['Recorded Loom', 'Priority fix list', 'Implementation roadmap'],
    cta: 'Start with audit',
    href: '#contact',
    tone: 'warm',
  },
  {
    icon: Rocket,
    eyebrow: 'Ready to launch the path',
    title: 'Build Sprint',
    price: '$500+',
    bestFor: 'You already know the gap and want the LinkedIn-to-website path built.',
    includes: ['Messaging structure', 'Landing page build', 'Booking flow'],
    cta: 'Discuss the build',
    href: '#contact',
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
            <SectionBadge icon={BadgeDollarSign} className="mb-4">Offer ladder</SectionBadge>
            <h2 className="text-3xl md:text-5xl font-bebas mb-4">Start where you are</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              A clear ladder from audit to full build, so you do not have to jump straight into a large project.
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
                pkg.badge === 'Most popular'
                  ? 'border-orange-500/40 md:scale-105 shadow-[0_0_40px_rgba(255,132,3,0.25)] ring-1 ring-orange-500/20'
                  : 'border-orange-500/20'
              }`}
              style={pkg.badge === 'Most popular' ? { background: 'linear-gradient(135deg, rgba(10,19,50,0.65) 0%, rgba(51,13,62,0.55) 100%)' } : undefined}
            >
              {pkg.badge === 'Most popular' ? (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-orange-500 to-orange-600 text-white px-5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-lg">
                  Most Popular
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
                <Button href="#contact" variant="primary" className="w-full">
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
                  Pick based on your current uncertainty. If you do not know the leak yet, start free. If you know the leak and want it fixed, move into the paid audit or build.
                </p>

                <div className="mt-7 space-y-4">
                  <div className="flex items-start gap-3 rounded-xl border border-orange-500/15 bg-orange-500/5 p-4">
                    <BadgeDollarSign size={19} className="mt-0.5 text-orange-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Best default path</p>
                      <p className="text-sm text-white/60">Free Audit - Starter Audit - Build Sprint</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/3 p-4">
                    <ArrowRight size={19} className="mt-0.5 text-orange-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">No pressure</p>
                      <p className="text-sm text-white/60">The first call is for clarity, not a forced package decision.</p>
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
