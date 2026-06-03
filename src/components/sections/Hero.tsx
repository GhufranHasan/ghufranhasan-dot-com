'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import SocialLinksModal from '@/components/layout/SocialLinksModal'
import { ArrowRight, CheckCircle2, Github, Linkedin, Mail, MessageCircle } from 'lucide-react'

const proofPoints = [
  'LinkedIn profile and website message alignment',
  'Clear audit CTA instead of vague contact buttons',
  'Built with React and Next.js for fast launches',
]

const primarySocials = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ghufranhasan',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/ghufranhasan',
    icon: Github,
  },
  {
    label: 'Email',
    href: 'mailto:hello@ghufranhasan.com',
    icon: Mail,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/?text=Hi%20Ghufran%2C%20I%20want%20to%20talk%20about%20my%20LinkedIn%20to%20website%20funnel.',
    icon: MessageCircle,
  },
]

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 pb-16">
      <div className="hero-premium-bg" aria-hidden="true">
        <div className="hero-silk" />
        <div className="hero-scanline" />
        <div className="hero-vignette" />
      </div>
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
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
              LinkedIn to website conversion strategist
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bebas leading-tight mb-6"

            >
              <span>I </span>
              <span className="gradient">Help B2B Founders</span>,
              <span className="gradient"> Coaches</span>, And
              <span className="gradient"> Creators </span>Turn
              <span> </span>
              <span className="gradient">LinkedIn Traffic </span>Into
              <span className="gradient"> Qualified Leads</span>
              <span> Through </span>
              <span className="gradient">Conversion-Focused Websites</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-white/80 mb-8 max-w-135"
            >
              Stop losing warm prospects between your profile and your booking page. I build websites that turn curiosity into conversations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="space-y-3 mb-8"
            >
              {proofPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 text-white/75 text-sm">
                  <CheckCircle2 size={17} className="text-orange-500 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button href="#contact" variant="primary" size="large">
                Get Your Free Audit <ArrowRight size={18} />
              </Button>
              <Button href="#case-studies" variant="secondary" size="large">
                View Real Case Results
              </Button>

            </motion.div>
            <div className="mt-6 p-4 bg-background-card border border-orange-500/20 rounded-xl">
              <p className="text-white text-sm font-semibold mb-2">📋 Free: Website Audit Checklist</p>
              <p className="text-white/60 text-xs mb-3">10-point checklist to find leaks in your funnel</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 bg-[#0f0f1a] border border-orange-500/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                />
                <button className="px-4 py-2 bg-linear-to-r from-orange-500 to-orange-600 rounded-lg text-white text-sm font-semibold hover:shadow-glow-hover transition-all">
                  Send
                </button>
              </div>
            </div>



            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="text-sm text-white/60 mt-4"
            >
              ✓ Deep funnel diagnostic • ✓ Identify your biggest conversion opportunity • ✓ No obligation
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58 }}
              className="mt-6 flex flex-wrap items-center gap-3"
              aria-label="Primary social links"
            >
              {primarySocials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={social.label}
                  title={social.label}
                  className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-white hover:border-orange-500 hover:bg-orange-500/20 transition-all"
                >
                  <social.icon size={17} />
                  <span>{social.label}</span>
                </a>
              ))}
              <SocialLinksModal />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="premium-frame relative rounded-2xl overflow-hidden bg-linear-to-r from-orange-500 to-purple-900 p-0.5 animate-float">
              <Image
                src="/images/profile.png"
                alt="Ghufran Hasan"
                width={620}
                height={720}
                priority
                className="w-full h-auto rounded-2xl"
              />
            </div>
            <div className="mt-6 space-y-3">
              <a href="https://linkedin.com/in/ghufranhasan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 text-sm hover:text-orange-500 transition-colors">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span>23,000+ followers on LinkedIn</span>
              </a>
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span>Frontend developer and LinkedIn funnel strategist</span>
              </div>
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                <span>Building in public with no fake client numbers</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
