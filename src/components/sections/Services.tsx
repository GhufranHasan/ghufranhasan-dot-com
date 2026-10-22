'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, LayoutTemplate, Map, MessageSquareText, MousePointerClick, PenLine, Route, SearchCheck } from 'lucide-react'
import Link from 'next/link'
import SectionBadge from '@/components/ui/SectionBadge'

const services = [
  {
    icon: SearchCheck,
    title: 'Positioning diagnosis',
    description: 'Find whether the gap is traffic, offer clarity, sales follow-up, or the LinkedIn-to-website handoff.',
  },
  {
    icon: MessageSquareText,
    title: 'Conversion copy',
    description: 'Continue the buyer context from LinkedIn into the hero, offer, proof, objections, and CTA.',
  },
  {
    icon: Route,
    title: 'Buyer path structure',
    description: 'Put information in the order a skeptical buyer needs before applying, booking, or requesting the next step.',
  },
  {
    icon: LayoutTemplate,
    title: 'Website implementation',
    description: 'Turn the strategy into a fast, mobile-friendly page instead of leaving you with another document waiting to be used.',
  },
  {
    icon: MousePointerClick,
    title: 'CTA and form path',
    description: 'Make the next step clear, qualified, and measurable with an application-first journey.',
  },
  {
    icon: PenLine,
    title: 'Tracking',
    description: 'Observe sample-audit views, CTA clicks, form starts, submissions, and the actions that matter.',
  },
]

export default function Services() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} id="services" className="texture-grid neon-deep relative overflow-hidden py-20 md:py-28">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mb-12 grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:border-b lg:border-white/10 lg:pb-10"
        >
          <div className="max-w-3xl">
            <SectionBadge icon={Map} className="mb-5">Specialist sprint</SectionBadge>
            <h2 className="text-3xl font-bebas md:text-5xl">What this engagement combines</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/68">
              This is not a full-service agency menu. It is one focused sprint for one primary offer, one conversion page, and one measurable next step.
            </p>
          </div>
          <Link
            href="/linkedin-website-funnel"
            className="group inline-flex items-center gap-3 text-sm font-semibold text-orange-300 transition-colors hover:text-orange-200"
          >
            Explore the specialist offer
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 transition-all group-hover:border-orange-500/60 group-hover:bg-orange-500/10">
              <ArrowRight size={17} />
            </span>
          </Link>
        </motion.div>

        <div className="grid border-b border-white/10 lg:grid-cols-2">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.08 }}
              className="group relative grid min-h-56 grid-cols-[auto_1fr] gap-5 border-t border-white/10 px-0 py-7 transition-colors hover:bg-white/[0.025] sm:p-7 lg:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:pr-10 lg:[&:nth-child(even)]:pl-10"
            >
              <div className="flex flex-col items-center gap-4">
                <span className="text-xs font-bold text-orange-400">0{index + 1}</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/8 transition-all group-hover:border-orange-500/45 group-hover:bg-orange-500/12">
                  <service.icon size={22} className="text-orange-400" />
                </div>
              </div>
              <div className="flex min-w-0 flex-col">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bebas text-white md:text-3xl">{service.title}</h3>
                  <ArrowRight size={18} className="mt-1 shrink-0 text-white/25 transition-all group-hover:translate-x-1 group-hover:text-orange-400" />
                </div>
                <p className="mt-3 max-w-xl leading-relaxed text-white/64">{service.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
