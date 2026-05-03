'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Quote, Award, Users, Target, Clock, ChevronRight, Linkedin } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Counter Component
function Counter({ value = 0, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const currentCount = Math.floor(progress * (typeof value === 'number' ? value : parseInt(value)))
        setCount(currentCount)
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="text-xl md:text-2xl font-bold text-white">
      {prefix}{count}{suffix}
    </span>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const stats = [
    { value: 5, suffix: '+', label: 'Years Experience', icon: Clock, description: 'Building conversion-focused systems' },
    { value: 100, suffix: '+', label: 'B2B Clients', icon: Users, description: 'Across various industries' },
    { value: 23, suffix: 'K+', label: 'LinkedIn Followers', icon: Linkedin, description: 'Growing authority network' },
    { value: 500, suffix: '+', label: 'Systems Built', icon: Target, description: 'For B2B founders' },
  ]

  return (
    <section ref={ref} id="about" className="relative overflow-hidden py-20 md:py-28">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,132,3,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,132,3,0.03)_1px,transparent_1px)] bg-size-40px_40px" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.9, rotate: -5 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-orange-500 to-purple-900 p-0.5">
              <div className="relative rounded-2xl overflow-hidden bg-purple-950/50 backdrop-blur-sm">
                <Image
                  src="/images/about-profile.png"
                  alt="Ghufran Hasan"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 30 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -30, y: 30 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="absolute -bottom-6 -left-6 bg-linear-to-r from-orange-500 to-orange-600 rounded-xl p-4 shadow-glow"
            >
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold"><Counter value={5} suffix="+" /></div>
                  <div className="text-xs text-white/80">Years</div>
                </div>
                <div className="w-px h-8 bg-white/30" />
                <div className="text-center">
                  <div className="text-2xl font-bold"><Counter value={100} suffix="+" /></div>
                  <div className="text-xs text-white/80">Clients</div>
                </div>
              </div>
            </motion.div>
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

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bebas leading-tight">
              Why I started helping{' '}
              <span className="text-orange-500">B2B agencies</span>
              <br />
              with LinkedIn
            </h2>

            <div className="space-y-4 text-white/70">
              <p>
                After spending <span className="text-orange-500 font-semibold">5+ years building web applications</span> and watching countless B2B agencies struggle with inconsistent, low-quality leads from LinkedIn, I decided to do something about it.
              </p>
              <p>
                I realized most agencies were spending <span className="text-orange-500 font-semibold">80% of their marketing budget on cold outreach</span> that simply doesn't work anymore. What they needed was a system that turns their LinkedIn presence into a lead generation machine.
              </p>
            </div>

            {/* Pull Quote */}
            <div className="relative p-6 bg-orange-500/5 border-l-4 border-orange-500 rounded-r-xl">
              <Quote size={32} className="text-orange-500/30 absolute top-4 right-4" />
              <p className="text-white font-medium text-lg leading-relaxed">
                "Most agencies waste 80% of their marketing budget on outreach that doesn't work. I fix that by building systems that make LinkedIn work for them."
              </p>
              <div className="mt-3 text-orange-500 font-semibold">— Ghufran Hasan</div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-4 text-center group hover:border-orange-500/50 transition-all">
                  <stat.icon size={24} className="text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xl md:text-2xl font-bold text-white">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-glow-hover transition-all hover:translate-y-0.5 group"
              >
                <span>Let's work together</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}