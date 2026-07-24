'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2, Clock, Quote, Target, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import SectionBadge from '@/components/ui/SectionBadge'

const stats = [
  { value: '23K+', label: 'LinkedIn followers', icon: TrendingUp },
  { value: '1', label: 'Specialist offer', icon: Target },
  { value: '10', label: 'Day launch sprint', icon: Clock },
]

const thinkingSteps = [
  'Audit where LinkedIn attention loses clarity before it becomes a qualified action.',
  'Align the profile promise with the website headline and offer.',
  'Design one intake-first path toward a qualified audit request.',
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
            <div className="hero-portrait-stage">
              <div className="hero-portrait-sheen" aria-hidden="true" />
              <div className="hero-portrait-base" aria-hidden="true" />
              <Image
                src="/images/about-profile.png"
                alt="Ghufran Hasan"
                width={500}
                height={600}
                className="hero-portrait-cutout h-auto w-full max-w-md object-contain"
              />
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
                I am Ghufran, a website strategist and builder focused on pages that do more than look good. They clarify the offer, support authority, and help warm prospects take the next step.
              </p>
              <p>
                At this stage, my personal brand is the front face because people trust people before they trust a new agency name. The work stays focused around one specialist LinkedIn-to-website path.
              </p>
              <p>
              I combine conversion strategy, website messaging, and LinkedIn positioning for one focused offer: LinkedIn-to-Website Conversion for high-value service businesses.
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
                &quot;Do not hide behind a generic agency brand too early. Build trust as a person, then make the offer feel like a repeatable system.&quot;
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
                href="/linkedin-website-funnel"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-glow-hover transition-all group"
              >
                Explore the Specialist Offer
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
