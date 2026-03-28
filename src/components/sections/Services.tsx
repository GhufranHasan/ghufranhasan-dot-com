'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, useState } from 'react'
import { Target, Globe, Settings, ArrowRight, TrendingUp, LucideIcon } from 'lucide-react'
import Link from 'next/link'

// 1. Define the Service Interface
interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  gradient: string;
  stats: { leads: string; time: string; confidence: string };
  statLabels: { leads: string; time: string; confidence: string };
}

const services: Service[] = [
  {
    icon: Target,
    title: 'LinkedIn Funnel Strategy',
    description: 'Audit your current LinkedIn presence and build a system that attracts ideal clients.',
    link: '#contact',
    gradient: 'from-orange-500 to-orange-600',
    stats: { leads: '+147%', time: '7-14 days', confidence: '95%' },
    statLabels: { leads: 'Lead Increase', time: 'First Result', confidence: 'Success Rate' },
  },
  {
    icon: Globe,
    title: 'Conversion Website Design',
    description: 'Custom websites designed specifically to convert LinkedIn traffic into qualified leads.',
    link: '#contact',
    gradient: 'from-purple-600 to-pink-600',
    stats: { leads: '+87%', time: '10 days', confidence: '98%' },
    statLabels: { leads: 'Conversion Rate', time: 'Launch Time', confidence: 'Client Satisfaction' },
  },
  {
    icon: Settings,
    title: 'End-to-End Client Machine',
    description: 'Complete LinkedIn + website system that runs on autopilot. Fully automated and scalable.',
    link: '#contact',
    gradient: 'from-blue-600 to-cyan-600',
    stats: { leads: '3x', time: '90 min/week', confidence: '100%' },
    statLabels: { leads: 'Pipeline Growth', time: 'Time Required', confidence: 'Automation' },
  },
]

export default function Services() {
  const ref = useRef<HTMLElement>(null) // Added Type
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // 2. Define Variants with proper typing and "as const"
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }, // Fix: easeOut as const
    },
  }

  return (
    <section ref={ref} id="services" className="relative overflow-hidden py-20 md:py-28">
      {/* ... (Background motion divs) */}
      
      <div className="container-custom relative z-10">
        {/* ... (Header motion div) */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative cursor-pointer"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-orange-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="relative glass-card p-6 md:p-8 h-full flex flex-col border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 overflow-hidden">
                
                {/* Stats Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-linear-to-br from-purple-900/95 to-purple-950/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 z-10 pointer-events-none"
                >
                    <TrendingUp size={32} className="text-orange-500 mx-auto mb-4" />
                    <div className="space-y-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-orange-500">{service.stats.leads}</div>
                        <div className="text-xs text-white/60">{service.statLabels.leads}</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-500">{service.stats.time}</div>
                        <div className="text-xs text-white/60">{service.statLabels.time}</div>
                      </div>
                    </div>
                </motion.div>

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${service.gradient} p-px mb-6`}>
                  <div className="w-full h-full rounded-xl bg-purple-950/90 flex items-center justify-center group-hover:bg-transparent transition-all duration-300">
                    <service.icon size={28} className="text-white" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-orange-500 transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-white/70 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <Link
                  href={service.link}
                  className="mt-auto inline-flex items-center gap-2 text-orange-500 hover:gap-3 transition-all duration-300"
                >
                  <span className="font-semibold">Learn more</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12 md:mt-16"
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-glow-hover transition-all duration-300 hover:translate-y-0.5"
          >
             Let&apos;s Build Your Machine
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
