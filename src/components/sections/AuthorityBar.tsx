'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Code, Paintbrush, ChartLine, Smartphone } from 'lucide-react'

// 1. Define Interfaces for Props
interface CounterProps {
  // value: number;
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
  { value: '23K+', label: 'LinkedIn Followers', suffix: '' },
  { value: '100+', label: 'B2B Clients Helped', suffix: '' },
  { value: '10', label: 'Days to Launch', suffix: '', prefix: '<' },
]

// 2. Apply Types to Counter
function Counter({ /* value = 0,*/ suffix = '', prefix = '', duration = 2000 }: CounterProps) {
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
        // const currentCount = Math.floor(progress * value)
        // setCount(currentCount)
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, /* value, */ duration])

  return (
    <span ref={ref} className="text-2xl md:text-3xl font-bold text-orange-500 mb-1">
      {prefix}{count}{suffix}
    </span>
  )
}

const testimonials = [
  { text: "Ghufran's breakdown of the LinkedIn → website gap was eye-opening. Booked 3 calls in the first week after implementing his suggestions.", author: "B2B SaaS Founder" },
  { text: "Finally someone who gets that engagement doesn't equal pipeline. His PATH framework is exactly what we needed.", author: "Marketing Agency Owner" },
  { text: "The audit saved me months of trial and error. Highly recommend for any founder serious about LinkedIn.", author: "Consulting Firm Partner" },
]

export default function AuthorityBar() {
  return (
    <section className="relative overflow-hidden bg-purple-950/60 backdrop-blur-sm border-y border-orange-500/20 py-16 md:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 60, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h-0.5 bg-linear-to-r from-orange-500 to-transparent mx-auto mb-8"
        />

        <div className="overflow-hidden">
          <div className="flex animate-scroll-x whitespace-nowrap [animation-play-state-running] hover:[animation-play-state-paused] gap-8 md:gap-12">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-none w-80 md:w-96 px-6 py-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 min-h-25 flex flex-col justify-center"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-white/90 font-medium text-sm md:text-base leading-relaxed mb-3">"{testimonial.text}"</p>
                <p className="text-orange-400 text-xs font-semibold">— {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-8 pt-6 border-t border-orange-500/20"
        >
          <p className="text-white/80 text-sm md:text-base">
            Real comments from LinkedIn DMs – shared with permission
          </p>
        </motion.div>
      </div>
    </section>
  )
}
