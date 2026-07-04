'use client'

import {
  ArrowRight,
  CheckCircle2,
  Code2,
  FileSearch,
  PanelsTopLeft,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import SectionBadge from '@/components/ui/SectionBadge'

const examples = [
  {
    icon: PanelsTopLeft,
    title: 'My own website rebuild',
    label: 'Live rebuild thinking',
    points: [
      'Before: portfolio-style sections without a clear buyer journey',
      'Fix: LinkedIn promise, audit CTA, offer ladder, and objection handling',
      'Proof: you can see the same conversion logic applied to this site',
    ],
  },
  {
    icon: FileSearch,
    title: 'Sample founder audit',
    label: 'Profile-to-page teardown',
    points: [
      'LinkedIn headline issue: promise is interesting but not specific enough',
      'Website issue: CTA asks visitors to decide too early',
      'Recommended fix: lead with one audit path and support it with proof',
    ],
  },
  {
    icon: Code2,
    title: 'BugXTech / project proof',
    label: 'Build credibility',
    points: [
      'Shows I can translate strategy into a working digital asset',
      'Highlights technical execution without making GitHub the main proof',
      'Connects the build to a business purpose, not only a stack',
    ],
  },
]

const auditFindings = [
  ['Profile promise', 'Does the LinkedIn headline match the website hero?'],
  ['Trust sequence', 'Is proof placed before the visitor is asked to book?'],
  ['CTA path', 'Is there one obvious next step for warm visitors?'],
]

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
          <SectionBadge icon={FileSearch} className="mb-4">Proof before pricing</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">See what the audit looks like</h2>
          <p className="text-white/75">
            Before asking you to choose a package, I want the thinking to be visible. These examples show how I diagnose the path from LinkedIn profile visits to booked conversations without inventing client numbers.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="grid gap-5"
          >
            {examples.map((example) => (
              <motion.article
                key={example.title}
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                whileHover={{ y: -4, borderColor: 'rgba(255, 132, 3, 0.38)' }}
                className="glass-card border border-orange-500/20 p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400">
                    <example.icon size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/80">
                      {example.label}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-white">{example.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {example.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-relaxed text-white/70">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-orange-400" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, x: 22 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
            className="relative overflow-hidden rounded-2xl border border-orange-500/25 bg-purple-950/55 p-6 md:p-8"
          >
            <div className="absolute inset-0 texture-grid opacity-25" aria-hidden="true" />
            <div className="relative z-10">
              <div className="mb-6 rounded-xl border border-white/10 bg-white/4 p-4">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Audit preview</p>
                    <h3 className="mt-1 text-2xl font-bebas text-white">LinkedIn - Website - Conversation</h3>
                  </div>
                  <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">
                    Sample
                  </span>
                </div>

                <div className="space-y-3">
                  {auditFindings.map(([label, text], index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                      className="rounded-xl border border-orange-500/15 bg-orange-500/5 p-4"
                    >
                      <div className="mb-2 flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                          {index + 1}
                        </span>
                        <p className="font-semibold text-white">{label}</p>
                      </div>
                      <p className="text-sm text-white/65">{text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <p className="text-sm leading-relaxed text-white/68">
                The audit is not a vague review. It is a prioritized diagnosis of where warm visitors lose clarity, trust, or momentum before they take action.
              </p>

              <div className="mt-6">
                <Button href="/free-audit" variant="primary" className="w-full">
                  Request Free Audit
                  <ArrowRight size={17} />
                </Button>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
