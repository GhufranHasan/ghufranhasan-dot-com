'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import SectionBadge from '@/components/ui/SectionBadge'
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Linkedin,
  MousePointerClick,
} from 'lucide-react'

const proofPoints = [
  'For founder-led B2B service agencies with an active offer',
  'Focused 10-day implementation sprint after diagnosis',
  'Strategy, copy, design, Next.js delivery, and CTA tracking',
]

const trustSignals = [
  { value: 'B2B', label: 'service agencies' },
  { value: '10-day', label: 'focused sprint' },
  { value: '$1.2K+', label: 'implementation path' },
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

export default function Hero() {
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
              <SectionBadge icon={Linkedin}>LinkedIn-to-website conversion for founder-led B2B agencies</SectionBadge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="hero-headline mb-6 max-w-4xl text-4xl font-bebas font-medium leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block">
                Your LinkedIn gets <span className="hero-gradient-text">attention</span>.
              </span>
              <span className="mt-1 block">
                Your website should turn it into <span className="hero-gradient-text">enquiries</span>.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/80 mb-8 max-w-2xl"
            >
              I help founder-led B2B agencies align their LinkedIn promise, website messaging, and booking path so warm visitors understand the offer and take one clear next step.
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
              <Button href="/free-audit" variant="primary" size="large" className="whitespace-nowrap">
                Apply for a Funnel Review <ArrowRight size={18} />
              </Button>
              <Button href="#audit-examples" variant="secondary" size="large" className="whitespace-nowrap">
                See a Sample Audit
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

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58 }}
              className="text-sm text-white/60 mt-4"
            >
              The free review is for established B2B service businesses with an active offer and a working website.
            </motion.p>
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
                <span>LinkedIn-to-website funnel strategist</span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-white/80 text-sm">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span>Strategy, copy, design, and implementation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
