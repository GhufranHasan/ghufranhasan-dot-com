'use client'

import { motion } from 'framer-motion'

const testimonials = [
  { text: "Ghufran's breakdown of the LinkedIn → website gap was eye-opening. Booked 3 calls in the first week after implementing his suggestions.", author: "B2B SaaS Founder" },
  { text: "Finally someone who gets that engagement doesn't equal pipeline. His PATH framework is exactly what we needed.", author: "Marketing Agency Owner" },
  { text: "The audit saved me months of trial and error. Highly recommend for any founder serious about LinkedIn.", author: "Consulting Firm Partner" },
]

// Triple the items so the loop never shows a gap on any screen size
const tickerItems = [...testimonials, ...testimonials, ...testimonials]

export default function AuthorityBar() {
  return (
    <section className="relative overflow-hidden bg-purple-950/60 backdrop-blur-sm border-y border-orange-500/20 py-16 md:py-20">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Heading — inside container */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 60, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h-0.5 bg-linear-to-r from-orange-500 to-transparent mx-auto mb-10"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-orange-500 text-sm uppercase tracking-wider font-semibold mb-10"
        >
          Trusted by B2B founders & agency owners
        </motion.p>
      </div>

      {/*
        Ticker sits OUTSIDE container-custom → spans full viewport width.
        Fade masks on left/right edges hide the clipping point cleanly.
      */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="flex gap-6 w-max"
          style={{ animation: 'ticker-scroll 30s linear infinite' }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')
          }
        >
          {tickerItems.map((testimonial, index) => (
            <div
              key={index}
              className="flex-none w-80 md:w-96 px-6 py-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex flex-col justify-center"
              style={{ minHeight: '130px' }}
            >
              <p className="text-white/90 font-medium text-sm md:text-base leading-relaxed mb-3">
                "{testimonial.text}"
              </p>
              <p className="text-orange-400 text-xs font-semibold">— {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/*
        The animation translates by exactly 1/3 of total width (one full set of 3 cards),
        then snaps back to 0 — creating a seamless infinite loop.
      */}
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>

      {/* Footer note — inside container */}
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-10 pt-6 border-t border-orange-500/20"
        >
          <p className="text-white/60 text-sm">
            Real comments from LinkedIn DMs – shared with permission
          </p>
        </motion.div>
      </div>
    </section>
  )
}