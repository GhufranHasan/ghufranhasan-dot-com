'use client'

import { ArrowDown, ArrowRight, FileSearch, Linkedin, MousePointerClick, PanelsTopLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import SectionBadge from '@/components/ui/SectionBadge'

const comparisonRows = [
  {
    touchpoint: 'LinkedIn headline',
    before: 'Broad promise covering several services',
    after: 'One buyer, one expensive problem, one outcome',
  },
  {
    touchpoint: 'Website hero',
    before: 'Different language from the profile',
    after: 'Continue the same promise visitors already saw',
  },
  {
    touchpoint: 'CTA',
    before: 'Learn more, Contact us, and Book a call',
    after: 'One relevant next step based on buyer readiness',
  },
]

const beforeFlow = [
  {
    label: 'LinkedIn',
    text: 'We help businesses grow through strategy, branding, content, and websites.',
    icon: Linkedin,
  },
  {
    label: 'Website',
    text: 'Creative solutions for ambitious businesses.',
    icon: PanelsTopLeft,
  },
  {
    label: 'Buttons',
    text: 'Our Services / Learn More / Contact Us / Book a Call',
    icon: MousePointerClick,
  },
]

const afterFlow = [
  {
    label: 'LinkedIn',
    text: 'Helping founder-led B2B agencies turn LinkedIn attention into qualified enquiries.',
    icon: Linkedin,
  },
  {
    label: 'Website',
    text: 'Your LinkedIn gets attention. Your website should turn it into enquiries.',
    icon: PanelsTopLeft,
  },
  {
    label: 'CTA',
    text: 'Apply for a Funnel Review',
    icon: MousePointerClick,
  },
]

function FlowPanel({
  title,
  tone,
  steps,
}: {
  title: string
  tone: 'before' | 'after'
  steps: typeof beforeFlow
}) {
  const isAfter = tone === 'after'

  return (
    <div
      className={`rounded-3xl border p-5 md:p-6 ${
        isAfter
          ? 'border-orange-500/35 bg-orange-500/10 shadow-[0_0_38px_rgba(255,132,3,0.16)]'
          : 'border-white/10 bg-purple-950/45'
      }`}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-2xl font-bebas text-white">{title}</h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isAfter ? 'bg-orange-500 text-white' : 'bg-white/6 text-white/60'
          }`}
        >
          {isAfter ? 'Recommended' : 'Leaking clarity'}
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.label}>
            <div className="rounded-2xl border border-orange-500/15 bg-purple-950/45 p-4">
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    isAfter ? 'bg-orange-500/15 text-orange-300' : 'bg-white/5 text-white/55'
                  }`}
                >
                  <step.icon size={18} />
                </div>
                <p className="font-semibold text-white">{step.label}</p>
              </div>
              <p className="text-sm leading-relaxed text-white/68">{step.text}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowDown
                  size={18}
                  className={isAfter ? 'text-orange-300/75' : 'text-white/30'}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AuditExamples() {
  return (
    <section id="audit-examples" className="texture-dots neon-deep section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <SectionBadge icon={FileSearch} className="mb-4">
            Visible audit transformation
          </SectionBadge>
          <h2 className="mb-4 text-3xl font-bebas md:text-5xl">
            See What a Conversion Leak Looks Like
          </h2>
          <p className="text-white/75">
            A practical example of how I compare a founder&apos;s LinkedIn promise,
            website message, and next step.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-10 overflow-hidden rounded-3xl border border-orange-500/25 bg-purple-950/50 shadow-glow"
        >
          <div className="grid border-b border-orange-500/20 bg-orange-500/10 text-xs font-semibold uppercase tracking-wider text-orange-200 md:grid-cols-[0.8fr_1.1fr_1.1fr]">
            <div className="border-b border-orange-500/15 px-5 py-4 md:border-b-0 md:border-r">
              Touchpoint
            </div>
            <div className="border-b border-orange-500/15 px-5 py-4 md:border-b-0 md:border-r">
              Before
            </div>
            <div className="px-5 py-4">Recommended direction</div>
          </div>
          {comparisonRows.map((row) => (
            <div
              key={row.touchpoint}
              className="grid border-b border-orange-500/12 last:border-b-0 md:grid-cols-[0.8fr_1.1fr_1.1fr]"
            >
              <div className="border-b border-orange-500/12 px-5 py-4 font-semibold text-white md:border-b-0 md:border-r">
                {row.touchpoint}
              </div>
              <div className="border-b border-orange-500/12 px-5 py-4 text-sm text-white/62 md:border-b-0 md:border-r">
                {row.before}
              </div>
              <div className="px-5 py-4 text-sm font-semibold text-orange-200">
                {row.after}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <FlowPanel title="Before" tone="before" steps={beforeFlow} />
          </motion.div>

          <div className="flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/35 bg-orange-500/10 text-orange-300 shadow-glow lg:h-14 lg:w-14">
              <ArrowRight size={22} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
          >
            <FlowPanel title="After" tone="after" steps={afterFlow} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto mt-10 max-w-3xl rounded-2xl border border-orange-500/20 bg-purple-950/45 p-5 text-center"
        >
          <p className="text-sm leading-relaxed text-white/66">
            This is the kind of visible diagnosis the review looks for: not a new
            funnel theory, but a clearer match between promise, page, and action.
          </p>
          <div className="mt-5">
            <Button href="/free-audit" variant="primary" className="whitespace-nowrap">
              Apply for Review
              <ArrowRight size={17} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
