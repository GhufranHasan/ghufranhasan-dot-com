'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Code, Paintbrush, ChartLine, Smartphone } from 'lucide-react'

// 1. Define Interfaces for Props
interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const services = [
  { icon: Code, name: 'Web Development' },
  { icon: Paintbrush, name: 'Web Design' },
  // { icon: ChartLine, name: 'E-Commerce' },
  // { icon: Smartphone, name: 'Mobile Apps' },
]

const stats = [
  // { value: 500, label: 'Qualified Demos Generated', suffix: '+', prefix: '' },
  { value: 23, label: 'LinkedIn Followers', suffix: 'K+', prefix: '' },
  // { value: 100, label: 'B2B Clients Helped', suffix: '+', prefix: '' },
  { value: 87, label: 'Client Retention Rate', suffix: '%', prefix: '' },
]

// 2. Apply Types to Counter
function Counter({ value = 0, suffix = '', prefix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null) // Added Ref Type
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const currentCount = Math.floor(progress * value)
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
    <span ref={ref} className="text-2xl md:text-3xl font-bold text-orange-500 mb-1">
      {prefix}{count}{suffix}
    </span>
  )
}

export default function AuthorityBar() {
  const ref = useRef<HTMLElement>(null) // Added Ref Type
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // 3. Apply "as const" and proper Types to Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const }, // Fix: easeOut as const
    },
  }

  const logoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.7,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' as const }, // Fix: easeOut as const
    },
    hover: {
      opacity: 1,
      scale: 1.05,
      transition: { duration: 0.2 },
    },
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-purple-950/60 backdrop-blur-sm border-y border-orange-500/20 py-16 md:py-20"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </motion.div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={isInView ? { width: 60, opacity: 1 } : { width: 0, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-0.5 bg-linear-to-r from-orange-500 to-transparent mx-auto mb-8"
        />

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <p className="text-orange-500 text-sm uppercase tracking-wider font-semibold mb-3">
            Trusted by industry leaders
          </p>
          <div className="flex justify-center gap-2">
            <div className="w-8 h-0.5 bg-orange-500/50" />
            <div className="w-8 h-0.5 bg-orange-500" />
            <div className="w-8 h-0.5 bg-orange-500/50" />
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-12"
        >
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={logoVariants}
              whileHover="hover"
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-500 to-orange-600 p-px">
                <div className="w-full h-full rounded-xl bg-purple-950/80 flex items-center justify-center group-hover:bg-transparent transition-all duration-300">
                  <service.icon size={22} className="text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <span className="text-xs text-white/70 group-hover:text-orange-500 transition-colors duration-300">
                {service.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="pt-8 border-t border-orange-500/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="mb-1">
                  <Counter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    prefix={stat.prefix}
                  />
                </div>
                <p className="text-xs md:text-sm text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-center mt-8 pt-6 border-t border-orange-500/20"
          >
            <p className="text-white/80 text-sm md:text-base">
              Helped generate <span className="text-orange-500 font-bold text-lg md:text-xl">500+ qualified demos</span> for B2B clients in the past 12 months
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
