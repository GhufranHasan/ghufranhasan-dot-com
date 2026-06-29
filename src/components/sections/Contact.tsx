'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Route,
  Shield,
  Sparkles,
} from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'

const auditPoints = [
  {
    title: 'Profile to website clarity',
    sub: 'I check whether your LinkedIn promise matches your website headline and offer.',
  },
  {
    title: 'CTA friction',
    sub: 'I look for vague buttons, competing next steps, and unnecessary booking friction.',
  },
  {
    title: 'Trust sequence',
    sub: 'I review whether the page builds confidence before asking visitors to act.',
  },
]

const auditPath = [
  {
    title: 'Share your journey',
    text: 'Add your LinkedIn profile, website, main problem, and desired outcome.',
  },
  {
    title: 'I review the leaks',
    text: 'I compare your positioning, website clarity, trust sequence, and CTA path.',
  },
  {
    title: 'Choose the next step',
    text: 'After submission, you can optionally book a clarity call from the thank-you page.',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} id="contact" className="texture-grid neon-deep relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #ff8403 0px, #ff8403 1px, transparent 1px, transparent 20px)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            className="space-y-8"
          >
            <div>
              <SectionBadge icon={Sparkles} className="mb-4">
                One clear audit path
              </SectionBadge>
              <h2 className="mb-4 text-3xl font-bebas md:text-4xl lg:text-5xl">
                Start with the audit intake, not a sales call.
              </h2>
              <p className="text-lg leading-relaxed text-white/70">
                Share the context once. I will review where your LinkedIn-to-website
                journey is breaking before you decide whether a call or paid project
                makes sense.
              </p>
            </div>

            <div className="space-y-4">
              {auditPoints.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
                    <CheckCircle2 size={16} className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-white/60">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <Clock3 size={14} className="text-orange-500" />
                About 2 minutes
              </div>
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-orange-500" />
                No booking required
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-orange-500" />
                Clear next steps
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.1 }}
            className="glass-card border border-orange-500/25 p-6 md:p-8"
          >
            <div className="border-b border-orange-500/15 pb-6 text-center">
              <ClipboardCheck size={32} className="mx-auto text-orange-500" />
              <h3 className="mt-3 text-2xl font-bold text-white">
                Request your free audit
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Every audit and paid project starts with the same short intake, so
                you never need to choose between DM, email, or a call first.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              {auditPath.map((step, index) => (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-xl border border-orange-500/15 bg-orange-500/5 p-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{step.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/free-audit#request-audit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-4 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover"
            >
              Open the Free Audit Form
              <ArrowRight size={18} />
            </Link>

            <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-white/50">
              <Route size={15} className="text-orange-400" />
              Intake first. Optional call second.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
