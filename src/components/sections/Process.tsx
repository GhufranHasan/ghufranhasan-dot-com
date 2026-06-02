'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ClipboardList, ChartLine, Pen, Rocket } from 'lucide-react'

const steps = [
  {
    label: 'Step 1',
    title: 'Audit the current path',
    description: 'I review your profile, website, offer, and CTA to find where attention stops turning into conversations.',
    icon: ClipboardList,
    details: ['Profile review', 'Website review', 'CTA friction map'],
  },
  {
    label: 'Step 2',
    title: 'Map the conversion strategy',
    description: 'We define the ICP, promise, page flow, and next step so every touchpoint says the same thing.',
    icon: ChartLine,
    details: ['Audience clarity', 'Offer positioning', 'Page structure'],
  },
  {
    label: 'Step 3',
    title: 'Design and build',
    description: 'I turn the strategy into copy, layout, and a responsive website section flow built for trust and action.',
    icon: Pen,
    details: ['Conversion copy', 'Responsive design', 'Next.js build'],
  },
  {
    label: 'Step 4',
    title: 'Launch and refine',
    description: 'You get a launch-ready site, link flow, and walkthrough so you can drive LinkedIn traffic with confidence.',
    icon: Rocket,
    details: ['Final QA', 'Launch support', 'Walkthrough video'],
  },
]

export default function Process() {
  return (
    <section id="process" className="texture-dots neon-deep section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">How we fix the funnel</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            A simple 4-step process: diagnose the leak, align the message, build the path, and launch with one clear CTA.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-5 md:left-18 top-0 bottom-0 w-px bg-linear-to-b from-orange-500 to-transparent hidden md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-6 mb-12 relative"
            >
              <div className="md:w-24 shrink-0">
                <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-center font-bold text-sm">
                  {step.label}
                </div>
              </div>

              <div className="flex-1 glass-card p-6 hover:border-orange-500 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4">
                  <step.icon size={24} className="text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/70 mb-4">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.details.map((detail) => (
                    <span key={detail} className="text-xs bg-orange-500/5 px-3 py-1 rounded-full text-white/60">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="glass-card p-8 md:p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bebas mb-3">Ready to find the leak in your LinkedIn to website path?</h3>
            <p className="text-white/70 mb-6">Get a free audit and I will show you the first fixes I would make.</p>
            <Button href="#contact" variant="primary" size="large">Get Your Free Audit</Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
