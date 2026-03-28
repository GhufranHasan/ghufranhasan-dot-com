'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/2 w-[200%] h-[200%] bg-radial from-orange-500/10 via-transparent to-transparent animate-rotate-slow" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-orange-500/20 text-orange-500 px-4 py-2 rounded-full text-sm font-bebas tracking-wider mb-6"
            >
              B2B LinkedIn Funnel Specialist
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bebas leading-tight mb-6"
            >
              I help B2B agency founders fix inconsistent, low‑quality LinkedIn leads
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/80 mb-8"
            >
              Book more qualified demos using a clear LinkedIn → website client machine. Stop wasting budget on cold outreach that doesn't convert.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="#contact">
                <Button variant="primary" size="large">
                  DM NOW START <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="#case-studies">
                <Button variant="secondary" size="large">
                  See Case Studies
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-orange-500 to-purple-900 p-0.5 animate-float">
              <img
                src="/images/profile.png"
                alt="Ghufran Hasan"
                className="w-full rounded-2xl"
              />
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span>Web Developer & LinkedIn Funnel Strategist</span>
              </div>
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span>23,000+ followers on LinkedIn</span>
              </div>
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span>Trusted by B2B agencies and SaaS founders</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}