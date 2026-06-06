'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  ArrowRight,
  ChevronDown,
  Clock3,
  HelpCircle,
  MessageCircle,
  Route,
  ShieldCheck,
  Sparkles,
  WalletCards,
  Wrench,
} from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'
import { faqs } from '@/data/faqs'

const decisionPoints = [
  {
    icon: WalletCards,
    label: 'Budget',
    text: 'Start free, then choose a paid audit or build only if it makes sense.',
  },
  {
    icon: Clock3,
    label: 'Timeline',
    text: 'Know what a focused 7-10 day build actually depends on.',
  },
  {
    icon: ShieldCheck,
    label: 'Guarantees',
    text: 'Clear expectations without fake promises or inflated lead claims.',
  },
  {
    icon: Wrench,
    label: 'Scope',
    text: 'Understand whether you need copy fixes, redesign, or a full funnel.',
  },
]

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section ref={ref} id="faqs" className="texture-dots neon-purple py-20 md:py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <SectionBadge icon={MessageCircle} className="mb-4">Objections answered</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">Questions founders ask before fixing the funnel</h2>
          <p className="text-white/70">
            The goal is not to overwhelm you with details. It is to remove the doubts that usually stop a good-fit founder from taking the next step.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ delay: 0.08 }}
            className="rounded-2xl border border-orange-500/20 bg-purple-950/45 p-6 md:p-7"
          >
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                <HelpCircle size={22} />
              </div>
              <div>
                <h3 className="text-2xl font-bebas text-white">What this clears up</h3>
                <p className="mt-2 text-sm text-white/62">
                  Pricing, fit, guarantees, timeline, and what happens after you request the audit.
                </p>
              </div>
            </div>

            <div className="divide-y divide-orange-500/15 border-y border-orange-500/15">
              {decisionPoints.map((point) => (
                <div key={point.label} className="flex gap-3 py-4">
                  <point.icon size={18} className="mt-0.5 shrink-0 text-orange-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">{point.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">{point.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:shadow-glow-hover"
            >
              Ask for the audit path
              <ArrowRight size={16} />
            </a>
          </motion.aside>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index

              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.04 }}
                  className={`overflow-hidden rounded-2xl border transition-all ${
                    isOpen
                      ? 'border-orange-500/40 bg-orange-500/10 shadow-[0_0_34px_rgba(255,132,3,0.12)]'
                      : 'border-orange-500/20 bg-purple-950/35 hover:border-orange-500/35'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left md:px-6"
                  >
                    <span className="flex min-w-0 items-start gap-4">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-bold ${
                        isOpen
                          ? 'border-orange-500/40 bg-orange-500/15 text-orange-300'
                          : 'border-white/10 bg-white/4 text-white/60'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>
                        <span className="mb-2 inline-flex rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">
                          {faq.category}
                        </span>
                        <span className="block font-semibold leading-snug text-white">{faq.question}</span>
                      </span>
                    </span>
                    <ChevronDown
                      size={20}
                      className={`mt-1 shrink-0 text-orange-500 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <motion.div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-hidden={!isOpen}
                    initial={false}
                    animate={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.28 }}
                    className="grid"
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="px-5 pb-5 md:px-6">
                        <div className="ml-0 rounded-xl border border-orange-500/20 bg-purple-950/45 p-4 md:ml-13">
                          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-300">
                            <Route size={14} />
                            Direct answer
                          </div>
                          <div className="space-y-3 text-sm leading-relaxed text-white/72">
                            {faq.answer.map((block, blockIndex) => (
                              block.kind === 'paragraph' ? (
                                <p key={`${faq.question}-${blockIndex}`}>{block.text}</p>
                              ) : (
                                <ul key={`${faq.question}-${blockIndex}`} className="space-y-2 pl-4">
                                  {block.items.map((item) => (
                                    <li key={item} className="list-disc marker:text-orange-400">
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              )
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl border border-orange-500/20 bg-linear-to-r from-orange-500/10 to-purple-500/10 p-8">
            <Sparkles size={24} className="text-orange-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Still unsure where the leak is?</h3>
            <p className="text-white/70 mb-6">I can review your current profile and website path and show you the first fixes.</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-glow-hover"
            >
              <MessageCircle size={18} />
              Show Me My Biggest Conversion Gap
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
