'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Each testimonial appears ONCE (no duplication)
const testimonials = [
  { 
    text: "Ghufran's breakdown of the LinkedIn → website gap was eye-opening. Booked 3 calls in the first week after implementing his suggestions.", 
    author: "B2B SaaS Founder",
    initial: "SF"
  },
  { 
    text: "Finally someone who gets that engagement doesn't equal pipeline. His PATH framework is exactly what we needed.", 
    author: "Marketing Agency Owner",
    initial: "MA"
  },
  { 
    text: "The audit saved me months of trial and error. Highly recommend for any founder serious about LinkedIn.", 
    author: "Consulting Firm Partner",
    initial: "CP"
  },
]

export default function AuthorityBar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="relative overflow-hidden bg-purple-950/60 backdrop-blur-sm border-y border-orange-500/20 py-12 md:py-16">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center mb-8"
        >
          <p className="text-orange-500 text-sm uppercase tracking-wider font-semibold">
            What B2B founders say
          </p>
          <div className="w-12 h-0.5 bg-orange-500 mx-auto mt-2" />
        </motion.div>

        {/* Testimonials Grid - Each shown ONCE */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-xl glass-card border border-orange-500/20 hover:border-orange-500/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                  {item.initial}
                </div>
                <div className="text-orange-400 text-2xl">"</div>
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-3">
                {item.text}
              </p>
              <p className="text-orange-500 text-xs font-medium">— {item.author}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-6 text-white/40 text-xs">
          Real feedback from LinkedIn DMs and client calls – shared with permission
        </div>
      </div>
    </section>
  )
}