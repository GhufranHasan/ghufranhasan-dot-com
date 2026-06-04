'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2, Clock, Quote, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import SectionBadge from '@/components/ui/SectionBadge'

const stats = [
  { value: '23K+', label: 'LinkedIn followers', icon: TrendingUp },
  { value: '10', label: 'Day launch sprint', icon: Clock },
  { value: '1', label: 'Clear conversion path', icon: Target },
]

const thinkingSteps = [
  'Audit where LinkedIn attention leaks before it becomes a conversation.',
  'Align the profile promise with the website headline and offer.',
  'Design one path toward a free audit, DM, or strategy call.',
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} id="about" className="texture-dots neon-magenta relative overflow-hidden py-20 md:py-28">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="premium-frame relative rounded-2xl overflow-hidden bg-linear-to-r from-orange-500 to-purple-900 p-0.5">
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <SectionBadge icon={Quote}>My story</SectionBadge>

            <h2 className="text-3xl md:text-4xl font-bebas leading-tight">
              I am not just building websites.
              <br />
              <span className="text-orange-500">I am building the bridge between attention and action.</span>
            </h2>

            <div className="space-y-4 text-white/70">
              <p>
                I am Ghufran, a frontend developer focused on building websites that do more than look good. They clarify the offer, support the founder&apos;s authority, and help warm prospects take the next step.
              </p>
              <p>
                The pattern I kept seeing was simple: founders were getting attention on LinkedIn, but the website did not continue the conversation. That gap is where I focus.
              </p>
              <p>
                I combine frontend development, conversion strategy, and LinkedIn positioning to build pages that support the full buyer journey.
              </p>
            </div>

            <div className="bg-orange-500/5 rounded-xl p-5 border-l-4 border-orange-500">
              <p className="text-white/90 text-sm font-medium mb-3">My audit process:</p>
              <div className="space-y-3 text-sm text-white/70">
                {thinkingSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-orange-500 mt-0.5 shrink-0" />
                    <span><strong className="text-white">Step {index + 1}:</strong> {step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative p-5 bg-orange-500/5 border-l-4 border-orange-500 rounded-r-xl">
              <Quote size={24} className="text-orange-500/30 absolute top-3 right-3" />
              <p className="text-white font-medium text-base leading-relaxed">
                &quot;You do not need a prettier portfolio. You need a clearer path from LinkedIn curiosity to a qualified conversation.&quot;
              </p>
              <div className="mt-2 text-orange-500 font-semibold text-sm">- Ghufran Hasan</div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl glass-card">
                  <stat.icon size={20} className="text-orange-500 mx-auto mb-1" />
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-glow-hover transition-all group"
              >
                Review My LinkedIn-to-Website Path
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
