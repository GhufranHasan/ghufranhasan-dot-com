'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronDown, MessageCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    question: 'Why do I need a website if LinkedIn is already working?',
    answer: 'LinkedIn creates discovery. Your website should create trust, explain the offer, and give warm prospects a clear next step. Without that bridge, attention leaks before it becomes a conversation.',
  },
  {
    question: 'What if my budget is tight?',
    answer: 'Start smaller. The audit gives you a clear diagnosis and immediate fixes before you invest in a full build. You can upgrade later when the path is clearer.',
  },
  {
    question: 'How long does a focused build take?',
    answer: 'A focused LinkedIn-to-website landing page can usually be mapped, written, built, and polished in about 10 days after discovery.',
  },
  {
    question: 'Do I need testimonials before this can work?',
    answer: 'Testimonials help, but they are not the only trust signal. Clear positioning, transparent process, proof of thinking, strong examples, and a specific CTA can still reduce doubt.',
  },
  {
    question: 'What makes this different from a normal developer portfolio?',
    answer: 'A normal portfolio shows work. This approach sells the visitor on one journey: who you help, what gap you fix, how the process works, and what to do next.',
  },
  {
    question: 'Can you only optimize my LinkedIn profile first?',
    answer: 'Yes. If the website is not ready yet, we can start with profile positioning and CTA clarity, then build the website path when the offer is sharper.',
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
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-sm font-semibold mb-4">
            Objections answered
          </span>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">Questions founders ask before fixing the funnel</h2>
          <p className="text-white/70">Short answers for the doubts that usually stop people from improving the conversion path.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-xl overflow-hidden border transition-all ${
                openIndex === index
                  ? 'bg-orange-500/5 border-orange-500/30'
                  : 'bg-purple-950/30 border-orange-500/20 hover:border-orange-500/40'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-orange-500 transition-transform duration-300 shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6">
                      <div className="pl-4 border-l-2 border-orange-500/30">
                        <p className="text-white/70">{faq.answer}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-linear-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20">
            <Sparkles size={24} className="text-orange-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Still unsure where the leak is?</h3>
            <p className="text-white/70 mb-6">I can review your current profile and website path and show you the first fixes.</p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-glow-hover transition-all"
            >
              <MessageCircle size={18} />
              Book Free Audit
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
