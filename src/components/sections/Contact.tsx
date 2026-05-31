'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Calendar,
  CheckCircle,
  ExternalLink,
  Linkedin,
  Mail,
  MessageCircle,
  Shield,
  Sparkles,
} from 'lucide-react'

const calendlyUrl = 'https://calendly.com/ghufranhasan/1-1-consultation-call'
const linkedinUrl = 'https://linkedin.com/in/ghufranhasan'

const auditPoints = [
  {
    title: 'Profile to website clarity',
    sub: 'I check whether your LinkedIn promise matches your website headline and offer.',
  },
  {
    title: 'CTA friction',
    sub: 'I look for vague buttons, competing next steps, and missing audit paths.',
  },
  {
    title: 'Trust sequence',
    sub: 'I review whether the page builds confidence before asking visitors to book.',
  },
]

const contactOptions = [
  {
    label: 'Book on Calendly',
    href: calendlyUrl,
    icon: Calendar,
    primary: true,
  },
  {
    label: 'Email me',
    href: 'mailto:hello@ghufranhasan.com?subject=Free%20Funnel%20Audit',
    icon: Mail,
    primary: false,
  },
  {
    label: 'DM AUDIT on LinkedIn',
    href: linkedinUrl,
    icon: Linkedin,
    primary: false,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} id="contact" className="texture-grid neon-deep relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #ff8403 0px, #ff8403 1px, transparent 1px, transparent 20px)`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            className="space-y-8"
          >
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-sm font-semibold mb-4">
                Free funnel audit
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bebas mb-4">
                If LinkedIn attention is not turning into demos, your website may be the gap.
              </h2>
              <p className="text-white/70 text-lg">
                Book a free audit and I will show you where the journey from profile visit to booked conversation is breaking.
              </p>
            </div>

            <div className="space-y-4">
              {auditPoints.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={16} className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-white/50">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-orange-500" />
                No pressure
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={14} className="text-orange-500" />
                Clear next steps
              </div>
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-orange-500" />
                Practical fixes
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 md:p-8 border border-orange-500/20"
          >
            <div className="text-center mb-8">
              <Calendar size={32} className="text-orange-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-white">Choose the easiest next step</h3>
              <p className="text-white/60 text-sm mt-2">Calendly, email, and LinkedIn all work. No embedded calendar dead ends.</p>
            </div>

            <div className="space-y-4">
              {contactOptions.map((option) => (
                <a
                  key={option.label}
                  href={option.href}
                  target={option.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={option.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className={`flex items-center justify-between gap-4 rounded-xl px-5 py-4 font-semibold transition-all ${
                    option.primary
                      ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white hover:shadow-glow-hover'
                      : 'border border-orange-500/30 text-white hover:border-orange-500 hover:bg-orange-500/10'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <option.icon size={18} />
                    {option.label}
                  </span>
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>

            <p className="text-center text-white/50 text-sm mt-6">
              Prefer LinkedIn? Send the word AUDIT and include your website link.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
