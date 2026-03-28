'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ClipboardList, ChartLine, Pen, Rocket } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    days: 'Days 1-2',
    title: 'Easy Onboarding & Discovery',
    description: 'You fill a simple form so I understand your goals, audience, and current LinkedIn presence. No endless back-and-forth.',
    icon: ClipboardList,
    details: ['Onboarding questionnaire', 'Discovery call', 'LinkedIn profile audit'],
  },
  {
    days: 'Days 3-4',
    title: 'Research & Strategy',
    description: 'I dig into your audience pain points and plan a layout that guides visitors from "who is this?" to "how do I book a call?"',
    icon: ChartLine,
    details: ['Audience insight analysis', 'Message alignment strategy', 'Wireframes & structure'],
  },
  {
    days: 'Days 5-8',
    title: 'Copywriting, Design & Feedback',
    description: 'I craft persuasive copy and design a page built to convert. You provide feedback along the way.',
    icon: Pen,
    details: ['Compelling copywriting', 'Premium design implementation', 'Daily progress updates'],
  },
  {
    days: 'Days 9-10',
    title: 'Build, Polish & Launch',
    description: 'I develop, refine, and launch your page so it\'s ready to sell 24/7. You get a video guide to manage updates yourself.',
    icon: Rocket,
    details: ['Full development & testing', 'Final polish & optimization', 'Live launch + video guide'],
  },
]

export default function Process() {
  return (
    <section id="process" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">My LaunchCore Framework</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Design, copy, and development – done in 10 days, so you can start attracting clients faster.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-5 md:left-18 top-0 bottom-0 w-px bg-linear-to-b from-orange-500 to-transparent hidden md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={step.days}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col md:flex-row gap-6 mb-12 relative"
            >
              <div className="md:w-24 shrink-0">
                <div className="bg-linear-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-center font-bold text-sm">
                  {step.days}
                </div>
              </div>

              <div className="flex-1 glass-card p-6 hover:border-orange-500 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4">
                  <step.icon size={24} className="text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-white/70 mb-4">{step.description}</p>
                <div className="flex flex-wrap gap-2">
                  {step.details.map((detail) => (
                    <span key={detail} className="text-xs bg-orange-500/5 px-3 py-1 rounded-full text-white/60">
                      ✓ {detail}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="glass-card p-8 md:p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bebas mb-3">Ready to fix your LinkedIn → Website funnel in 10 days?</h3>
            <p className="text-white/70 mb-6">Stop losing qualified leads. Let's build a system that actually converts.</p>
            <Link href="#contact">
              <Button variant="primary" size="large">Book Your Free Audit →</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}