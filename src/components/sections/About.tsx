'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote, CheckCircle2, Target, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Real stats (update with actual numbers)
  const stats = [
    { value: '23K+', label: 'LinkedIn Followers', icon: TrendingUp },
    { value: '10', label: 'Days to Launch', icon: Clock, suffix: 'days' },
    { value: '100%', label: 'Frameworks > Templates', icon: Target },
  ]

  return (
    <section ref={ref} id="about" className="relative overflow-hidden py-20 md:py-28">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-orange-500 to-purple-900 p-0.5">
              <div className="relative rounded-2xl overflow-hidden bg-purple-950/50">
                <Image
                  src="/images/about-profile.png"
                  alt="Ghufran Hasan"
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-sm font-semibold">
              My Story
            </span>

            <h2 className="text-3xl md:text-4xl font-bebas leading-tight">
              I noticed most founders struggle not with visibility,
              <br />
              <span className="text-orange-500">but with converting attention into clients</span>
            </h2>

            <div className="space-y-4 text-white/70">
              <p>
                After spending <span className="text-orange-500 font-semibold">5+ years building web applications</span>, I watched countless B2B agencies pour time into LinkedIn — posting daily, chasing engagement — only to hear crickets when it came to actual demos.
              </p>
              <p>
                The problem wasn't their content. It was <span className="text-orange-500 font-semibold">what happened AFTER someone clicked</span>. No clear path. No conversion flow. Just a generic website and crossed fingers.
              </p>
            </div>

            {/* Process Proof - My Thinking */}
            <div className="bg-orange-500/5 rounded-xl p-5 border-l-4 border-orange-500">
              <p className="text-white/90 text-sm font-medium mb-2">🧠 My thinking process:</p>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-orange-500 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Step 1:</strong> Audit where your LinkedIn traffic leaks</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-orange-500 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Step 2:</strong> Rebuild the bridge between profile → website</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-orange-500 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Step 3:</strong> Turn on the system that converts attention into demos</span>
                </div>
              </div>
            </div>

            {/* Pull Quote */}
            <div className="relative p-5 bg-orange-500/5 border-l-4 border-orange-500 rounded-r-xl">
              <Quote size={24} className="text-orange-500/30 absolute top-3 right-3" />
              <p className="text-white font-medium text-base leading-relaxed">
                "Most agencies waste 80% of their marketing budget on outreach that doesn't work. I fix that by building systems that make LinkedIn work for them."
              </p>
              <div className="mt-2 text-orange-500 font-semibold text-sm">— Ghufran Hasan</div>
            </div>

            {/* Stats - Removed "0+" values */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl glass-card">
                  <stat.icon size={20} className="text-orange-500 mx-auto mb-1" />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-glow-hover transition-all group"
              >
                <span>Book a Free Audit →</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}