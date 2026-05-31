'use client'

import { motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'

const pains = [
  'People like your LinkedIn posts, but the conversation stops there.',
  'Your profile and website use different language, so prospects lose the thread.',
  'Your website explains what you do, but does not guide visitors to one next step.',
  'Your CTA feels vague: contact, learn more, book a call, view work, and hope.',
]

export default function PainAgitation() {
  return (
    <section className="texture-dots neon-purple py-20 md:py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-xl uppercase text-orange-500 font-bold tracking-wider mb-4">
            The real leak
          </h2>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bebas mb-5">
            You do not need more traffic. You need a clearer path from attention to action.
          </p>
          <p className="text-white/70">
            LinkedIn creates curiosity. Your website should turn that curiosity into trust, clarity, and a reason to book.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-8 max-w-5xl mx-auto items-stretch">
          <div className="grid sm:grid-cols-2 gap-5">
            {pains.map((pain, index) => (
              <motion.div
                key={pain}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="glass-card p-6 border-l-4 border-orange-500"
              >
                <div className="flex items-start gap-3">
                  <X size={22} className="text-orange-500 mt-0.5 shrink-0" />
                  <span className="text-white/85 font-semibold">{pain}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-7 md:p-8 flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bebas mb-6">The broken journey</h3>
            <div className="space-y-4">
              {['LinkedIn post', 'Profile visit', 'Website click', 'Unclear next step', 'Lost opportunity'].map((step, index, arr) => (
                <div key={step}>
                  <div className="flex items-center justify-between gap-4 rounded-xl border border-orange-500/20 bg-orange-500/5 px-4 py-3">
                    <span className="font-semibold text-white">{step}</span>
                    {index < arr.length - 1 && <ArrowRight size={18} className="text-orange-500" />}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
