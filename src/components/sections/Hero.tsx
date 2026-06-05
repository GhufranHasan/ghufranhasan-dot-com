'use client'

import Image from 'next/image'
import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import SectionBadge from '@/components/ui/SectionBadge'
import SocialLinksModal from '@/components/layout/SocialLinksModal'
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  MousePointerClick,
} from 'lucide-react'

const proofPoints = [
  'LinkedIn profile and website message alignment',
  'Clear audit CTA instead of vague contact buttons',
  'Built with React and Next.js for fast launches',
]

const trustSignals = [
  { value: '23K+', label: 'LinkedIn audience' },
  { value: 'Next.js', label: 'fast website builds' },
  { value: 'Honest', label: 'no fake client numbers' },
]

const journeySteps = [
  {
    title: 'LinkedIn',
    text: 'Profile curiosity',
    icon: Linkedin,
  },
  {
    title: 'Website',
    text: 'Trust and offer clarity',
    icon: MousePointerClick,
  },
  {
    title: 'Booked Call',
    text: 'One clear next step',
    icon: CalendarCheck,
  },
]

const checklistHref = '/resources/website-funnel-checklist.html'

const primarySocials = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ghufranhasan',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/ghufranhasan',
    icon: Github,
  },
  {
    label: 'Email',
    href: 'mailto:hello@ghufranhasan.com',
    icon: Mail,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/?text=Hi%20Ghufran%2C%20I%20want%20to%20talk%20about%20my%20LinkedIn%20to%20website%20funnel.',
    icon: MessageCircle,
  },
]

export default function Hero() {
  const [checklistEmail, setChecklistEmail] = useState('')
  const [checklistWebsite, setChecklistWebsite] = useState('')
  const [checklistError, setChecklistError] = useState('')
  const [isChecklistLoading, setIsChecklistLoading] = useState(false)
  const [isChecklistUnlocked, setIsChecklistUnlocked] = useState(false)

  const handleChecklistSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!checklistEmail) return

    setChecklistError('')
    setIsChecklistLoading(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: checklistEmail,
          website: checklistWebsite,
          source: 'hero-checklist',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setChecklistError(data.error || 'The checklist is unavailable right now. Please try again later.')
        return
      }

      setIsChecklistUnlocked(true)
    } catch (error) {
      console.error('Checklist signup error:', error)
      setChecklistError('The checklist is unavailable right now. Please try again later.')
    } finally {
      setIsChecklistLoading(false)
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16">
      <div className="hero-premium-bg" aria-hidden="true">
        <div className="hero-silk" />
        <div className="hero-scanline" />
        <div className="hero-vignette" />
      </div>
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <SectionBadge icon={Linkedin}>LinkedIn to website conversion strategist</SectionBadge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hero-headline text-5xl md:text-6xl lg:text-7xl font-bebas font-semibold leading-[1.03] mb-6 text-white max-w-4xl"
            >
              <span className="block">Turn LinkedIn Attention</span>
              <span className="hero-gradient-text block">Into Qualified Leads</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/80 mb-8 max-w-2xl"
            >
              I help B2B founders, coaches, and creators align their LinkedIn profile, website, and CTA so warm visitors become booked conversations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="space-y-3 mb-8"
            >
              {proofPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 text-white/75 text-sm">
                  <CheckCircle2 size={17} className="text-orange-500 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-4 sm:flex-row md:flex-col xl:flex-row"
            >
              <Button href="#contact" variant="primary" size="large" className="whitespace-nowrap">
                Find My Website Leak <ArrowRight size={18} />
              </Button>
              <Button href="#case-studies" variant="secondary" size="large" className="whitespace-nowrap">
                View Funnel Patterns
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.53 }}
              className="mt-6 grid grid-cols-3 overflow-hidden rounded-xl border border-orange-500/20 bg-purple-950/35"
            >
              {trustSignals.map((signal) => (
                <div key={signal.label} className="border-r border-orange-500/15 px-4 py-3 last:border-r-0">
                  <div className="text-lg font-bold text-orange-400">{signal.value}</div>
                  <div className="mt-1 text-xs leading-snug text-white/60">{signal.label}</div>
                </div>
              ))}
            </motion.div>

            <div className="mt-6 rounded-xl border border-orange-500/20 bg-background-card p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                  <ClipboardCheck size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white text-sm font-semibold">Free checklist: 10-point website funnel check</p>
                  <p className="text-white/60 text-xs mt-1">
                    Use it to find whether your website has a positioning leak, trust leak, CTA leak, or offer clarity leak.
                  </p>

                  {isChecklistUnlocked ? (
                    <div className="mt-4 rounded-lg border border-orange-500/25 bg-orange-500/10 p-3">
                      <p className="text-sm font-semibold text-white">Checklist unlocked.</p>
                      <a
                        href={checklistHref}
                        download
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-glow-hover"
                      >
                        <Download size={16} />
                        Download checklist
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={handleChecklistSubmit} className="mt-4 space-y-3">
                      <input
                        type="text"
                        name="website"
                        value={checklistWebsite}
                        onChange={(event) => setChecklistWebsite(event.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                        aria-hidden="true"
                      />
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                          type="email"
                          value={checklistEmail}
                          onChange={(event) => setChecklistEmail(event.target.value)}
                          placeholder="Your email"
                          required
                          className="min-w-0 flex-1 rounded-lg border border-orange-500/20 bg-purple-950/50 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-orange-500/50"
                        />
                        <button
                          type="submit"
                          disabled={isChecklistLoading}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:shadow-glow-hover disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {isChecklistLoading ? 'Sending...' : 'Get checklist'}
                          {!isChecklistLoading && <ArrowRight size={15} />}
                        </button>
                      </div>
                      {checklistError && (
                        <p className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                          {checklistError}
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58 }}
              className="text-sm text-white/60 mt-4"
            >
              Deep funnel diagnostic - biggest conversion opportunity - no obligation
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62 }}
              className="mt-6 flex flex-wrap items-center gap-3"
              aria-label="Primary social links"
            >
              {primarySocials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-white hover:border-orange-500 hover:bg-orange-500/20 transition-all"
                >
                  <social.icon size={17} />
                  <span>{social.label}</span>
                </a>
              ))}
              <SocialLinksModal />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="premium-frame relative rounded-2xl overflow-hidden bg-linear-to-r from-orange-500 to-purple-900 p-0.5 animate-float">
              <Image
                src="/images/profile.png"
                alt="Ghufran Hasan"
                width={620}
                height={720}
                priority
                className="w-full h-auto rounded-2xl"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="relative z-20 -mt-8 mx-auto w-[92%] rounded-2xl border border-orange-500/25 bg-purple-950/85 p-4 shadow-[0_22px_60px_rgba(0,0,0,0.38)] backdrop-blur-md"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">Visitor path</p>
                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">
                  One journey
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {journeySteps.map((step, index) => (
                  <div key={step.title} className="relative rounded-xl border border-white/10 bg-white/4 p-3">
                    {index < journeySteps.length - 1 && (
                      <ArrowRight className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-orange-400 sm:block" size={18} />
                    )}
                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                      <step.icon size={17} />
                    </div>
                    <p className="text-sm font-bold text-white">{step.title}</p>
                    <p className="mt-1 text-xs leading-snug text-white/60">{step.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="mt-5 rounded-2xl border border-orange-500/20 bg-purple-950/45 p-5">
              <a href="https://linkedin.com/in/ghufranhasan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 text-sm hover:text-orange-500 transition-colors">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span>23,000+ followers on LinkedIn</span>
              </a>
              <div className="mt-3 flex items-center gap-3 text-white/80 text-sm">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span>Frontend developer and LinkedIn funnel strategist</span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-white/80 text-sm">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span>Building in public with no fake client numbers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
