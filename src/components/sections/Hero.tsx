'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import SectionBadge from '@/components/ui/SectionBadge'
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Linkedin,
  MousePointerClick,
} from 'lucide-react'

const proofPoints = [
  'Offer, website message, proof, CTA, and follow-up reviewed together',
  'One focused buyer path from profile visit to qualified enquiry',
  'Tracking for the actions that matter before and after launch',
]

const audiencePills = [
  'B2B agency founders',
  'consultants',
  'coaches',
  'fractional leaders',
]

const journeySteps = [
  {
    title: 'LinkedIn',
    text: 'Warm profile interest',
    icon: Linkedin,
  },
  {
    title: 'Website',
    text: 'Same promise, clearer proof',
    icon: MousePointerClick,
  },
  {
    title: 'Application',
    text: 'Useful context before a call',
    icon: ClipboardCheck,
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
              <span className="block">Your LinkedIn gets attention.</span>
              <span className="hero-gradient-text block">Your website should turn it into enquiries.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/80 mb-8 max-w-2xl"
            >
              I help LinkedIn-active service businesses turn warm profile visits into clearer website trust, stronger CTA paths, and qualified enquiries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.43 }}
              className="mb-8 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-orange-500/25 bg-white/[0.055] px-4 py-2 text-sm text-white/70 shadow-[0_16px_48px_rgba(0,0,0,0.24)] backdrop-blur-md"
            >
              <span>Best for LinkedIn-active</span>
              <span className="sr-only">B2B agency founders, consultants, coaches, and fractional leaders.</span>
              <span className="relative inline-flex h-5 min-w-[11.5rem] items-center overflow-hidden text-left font-semibold text-orange-300" aria-hidden="true">
                {audiencePills.map((audience, index) => (
                  <motion.span
                    key={audience}
                    className="absolute left-0 whitespace-nowrap"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: [0, 1, 1, 0], y: [8, 0, 0, -8] }}
                    transition={{
                      delay: index * 2.1,
                      duration: 8.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      times: [0, 0.08, 0.23, 0.32],
                    }}
                  >
                    {audience}
                  </motion.span>
                ))}
              </span>
            </motion.div>

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
              <Button href="#audit-examples" variant="primary" size="large" className="whitespace-nowrap">
                See a Sample Audit <ArrowRight size={18} />
              </Button>
              <Button href="/free-audit" variant="secondary" size="large" className="whitespace-nowrap">
                Request Free Review
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.53 }}
              className="mt-5 text-sm text-white/60"
            >
              One aligned message, one focused conversion page, one clear buyer path, and tracking for the actions that matter.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="hero-portrait-stage animate-float">
              <div className="hero-portrait-sheen" aria-hidden="true" />
              <div className="hero-portrait-base" aria-hidden="true" />
              <Image
                src="/images/profile.png"
                alt="Ghufran Hasan"
                width={620}
                height={720}
                priority
                className="hero-portrait-cutout h-auto w-full max-w-[31rem]"
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
