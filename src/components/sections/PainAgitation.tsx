'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowDown, AlertCircle, CheckCircle, X } from 'lucide-react'

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

            {/* Desktop Flow - Horizontal */}
            <div className="hidden md:flex flex-col gap-6">
              <div className="flex items-center justify-between gap-2">
                {['LinkedIn', 'Profile', 'Website'].map((step, idx) => (
                  <div key={step} className="flex items-center flex-1 gap-2">
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center justify-center">
                        <CheckCircle size={20} className="text-green-400" />
                      </div>
                      <span className="text-xs font-semibold text-white mt-2">{step}</span>
                    </div>
                    {idx < 2 && <ArrowRight size={16} className="text-green-400 flex-shrink-0" />}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                    <AlertCircle size={20} className="text-red-400" />
                  </div>
                  <span className="text-xs font-semibold text-white mt-2">Unclear CTA</span>
                </div>
                <ArrowRight size={16} className="text-red-400 flex-shrink-0" />
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center justify-center">
                    <X size={20} className="text-red-400" />
                  </div>
                  <span className="text-xs font-semibold text-white mt-2">Lost</span>
                </div>
              </div>
            </div>

            {/* Mobile Flow - Vertical */}
            <div className="md:hidden flex flex-col gap-3">
              {[
                { label: 'LinkedIn', icon: 'check', color: 'green' },
                { label: 'Profile Visit', icon: 'check', color: 'green' },
                { label: 'Website', icon: 'check', color: 'green' },
                { label: 'Unclear CTA', icon: 'alert', color: 'red' },
                { label: 'Lost Opportunity', icon: 'x', color: 'red' },
              ].map((item, idx, arr) => (
                <div key={item.label}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 ${
                      item.color === 'green'
                        ? 'bg-green-500/20 border-green-500/50'
                        : 'bg-red-500/20 border-red-500/50'
                    }`}>
                      {item.icon === 'check' && <CheckCircle size={18} className="text-green-400" />}
                      {item.icon === 'alert' && <AlertCircle size={18} className="text-red-400" />}
                      {item.icon === 'x' && <X size={18} className="text-red-400" />}
                    </div>
                    <span className="font-semibold text-white text-sm">{item.label}</span>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="flex items-center gap-3 ml-5 py-1">
                      <ArrowDown size={14} className={item.color === 'green' ? 'text-green-400' : 'text-red-400'} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
