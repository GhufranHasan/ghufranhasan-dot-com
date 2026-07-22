'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  ClipboardCheck,
  MailCheck,
  MessageSquareText,
  MousePointerClick,
  Route,
} from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'

const pathCards = [
  {
    title: 'Profile Promise',
    text: 'Your LinkedIn headline and Featured section create the expectation before the visitor clicks.',
    icon: MessageSquareText,
  },
  {
    title: 'Website Message',
    text: 'Your homepage continues the same promise without changing the language or diluting the offer.',
    icon: MousePointerClick,
  },
  {
    title: 'Lead Capture',
    text: 'Your audit form, checklist, or booking path captures interest at the right stage.',
    icon: ClipboardCheck,
  },
  {
    title: 'Follow-Up Path',
    text: 'Your confirmation page or email helps the prospect understand what happens next.',
    icon: MailCheck,
  },
]

export default function AfterClickPath() {
  return (
    <section id="lead-path" className="texture-band neon-deep relative overflow-hidden py-20 md:py-28">
      <div className="container-custom">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <SectionBadge icon={Route} className="mb-5">
              After the click
            </SectionBadge>
            <h2 className="text-3xl font-bebas leading-tight text-white md:text-5xl">
              The journey should not stop after a LinkedIn visitor clicks.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/72">
              A warm LinkedIn visitor should not land on a generic website and disappear.
              They should enter a clear path: understand the offer, trust the proof,
              choose the next step, and receive a relevant follow-up.
            </p>
            <div className="mt-7 rounded-2xl border border-orange-500/20 bg-orange-500/8 p-5">
              <p className="text-sm font-semibold text-white">
                This keeps the offer focused:
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                LinkedIn-to-website conversion first. Lead magnets, forms, and
                follow-up become optional layers when the core path is clear.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {pathCards.map((card, index) => (
              <motion.article
                key={card.title}
                variants={{
                  hidden: { opacity: 0, y: 22 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="group rounded-2xl border border-orange-500/20 bg-purple-950/50 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-1 hover:border-orange-500/45 hover:bg-orange-500/8"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400">
                    <card.icon size={22} />
                  </div>
                  <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/55">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/64">{card.text}</p>
                <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-300">
                  part of the handoff
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
