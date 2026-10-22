'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import SectionBadge from '@/components/ui/SectionBadge'
import { ArrowRight, ClipboardList, ChartLine, Pen, Rocket, Route } from 'lucide-react'

const steps = [
  {
    label: 'Step 1',
    title: 'Audit the current path',
    description: 'I review your profile, website, offer, proof, and CTA to find where attention stops moving toward a qualified action.',
    icon: ClipboardList,
    timeline: '1 day',
    details: ['Profile review', 'Website review', 'CTA friction map'],
    deliverable: 'Friction map with the biggest observable risk and first fixes',
  },
  {
    label: 'Step 2',
    title: 'Map the conversion strategy',
    description: 'We define the ICP, promise, page flow, and next step so every touchpoint says the same thing.',
    icon: ChartLine,
    timeline: '1-2 days',
    details: ['Audience clarity', 'Offer positioning', 'Page structure'],
    deliverable: 'Messaging alignment sheet and page-flow doc for the LinkedIn-to-website path',
  },
  {
    label: 'Step 3',
    title: 'Design and build',
    description: 'I turn the strategy into copy, layout, and a responsive website section flow built for trust and action.',
    icon: Pen,
    timeline: '5-7 days',
    details: ['Conversion copy', 'Mobile-friendly design', 'Website build'],
    deliverable: 'Wireframe, copy structure, and responsive website build',
  },
  {
    label: 'Step 4',
    title: 'Launch and refine',
    description: 'You get a launch-ready site, link flow, and walkthrough so you can drive LinkedIn traffic with confidence.',
    icon: Rocket,
    timeline: '1-2 days',
    details: ['Final QA', 'Launch support', 'Walkthrough video'],
    deliverable: 'Live website, launch checklist, and walkthrough video',
  },
]

export default function Process() {
  return (
    <section id="process" className="texture-dots neon-deep section-padding">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-fit lg:sticky lg:top-28"
          >
            <SectionBadge icon={Route} className="mb-5">From diagnosis to launch</SectionBadge>
            <h2 className="text-3xl font-bebas md:text-5xl">How I fix the funnel</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/68">
              A focused four-step process: diagnose the leak, align the message, build the path, and launch with one clear CTA.
            </p>
            <div className="mt-8 hidden items-center gap-3 text-sm text-white/48 lg:flex">
              <span className="h-px w-12 bg-orange-500/60" />
              10-day focused implementation
            </div>
          </motion.div>

          <div className="border-b border-white/10">
            {steps.map((step, index) => (
              <motion.article
                key={step.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group grid gap-5 border-t border-white/10 py-8 sm:grid-cols-[5rem_1fr] md:py-10"
              >
                <div className="flex items-start justify-between sm:block">
                  <span className="text-4xl font-bebas text-orange-400/85">0{index + 1}</span>
                  <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/8 text-orange-400 transition-all group-hover:border-orange-500/45 group-hover:bg-orange-500/12">
                    <step.icon size={20} />
                  </div>
                </div>

                <div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">{step.label}</p>
                      <h3 className="mt-2 text-2xl font-bebas text-white md:text-3xl">{step.title}</h3>
                    </div>
                    <span className="w-fit rounded-full border border-orange-500/25 bg-orange-500/8 px-3 py-1 text-xs font-semibold text-orange-300">
                      {step.timeline}
                    </span>
                  </div>
                  <p className="mt-4 leading-relaxed text-white/66">{step.description}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {step.details.map((detail) => (
                      <span key={detail} className="inline-flex items-center gap-2 text-sm text-white/55">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        {detail}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 border-l border-orange-500/40 pl-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Deliverable</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/68">{step.deliverable}</p>
                  </div>
                </div>
              </motion.article>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-6 border-t border-white/10 py-9 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div>
                <h3 className="text-2xl font-bebas">Ready to find the risk in your current path?</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/62">
                  Request a short review and I will show whether audit, implementation, or no project makes sense.
                </p>
              </div>
              <Button href="/free-audit" variant="primary" className="w-full whitespace-nowrap sm:w-auto">
                Request Free Review <ArrowRight size={17} />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
