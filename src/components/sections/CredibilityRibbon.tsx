'use client'

import { motion } from 'framer-motion'
import { ClipboardCheck, Linkedin, Route, TimerReset } from 'lucide-react'

const proofSignals = [
  {
    value: '23K+',
    label: 'LinkedIn audience',
    icon: Linkedin,
  },
  {
    value: 'End-to-end',
    label: 'Strategy to live path',
    icon: ClipboardCheck,
  },
  {
    value: '10 days',
    label: 'Focused sprint',
    icon: TimerReset,
  },
  {
    value: 'One path',
    label: 'Profile to qualified enquiry',
    icon: Route,
  },
]

export default function CredibilityRibbon() {
  return (
    <section className="texture-band neon-deep border-y border-orange-500/20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4"
        >
          {proofSignals.map((signal, index) => (
            <div
              key={signal.label}
              className="group flex min-h-32 items-center gap-4 border-b border-orange-500/15 py-5 transition-colors duration-300 hover:bg-white/[0.02] last:border-b-0 sm:px-5 sm:[&:nth-child(3)]:border-b-0 sm:[&:nth-child(4)]:border-b-0 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-orange-500/25 text-orange-400 transition-colors group-hover:bg-orange-500/10">
                <signal.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bebas text-white">{signal.value}</p>
                <p className="mt-1 text-xs leading-snug text-white/64">{signal.label}</p>
              </div>
              <span className="sr-only">Proof signal {index + 1}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
