'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import SectionBadge from '@/components/ui/SectionBadge'
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle,
  ClipboardCheck,
  Compass,
  FileSearch,
  Rocket,
} from 'lucide-react'

const packages = [
  {
    title: 'Starter Audit',
    price: '$300',
    stage: 'Start with clarity',
    audience: 'For founders who want clarity before a build',
    badge: 'Start here',
    features: [
      'LinkedIn profile and website review',
      'Recorded Loom breakdown',
      '3 highest-priority conversion fixes',
      'CTA and hero copy recommendations',
      'Simple next-step roadmap',
    ],
    note: 'A complete conversion-focused review with Loom breakdown, copy recommendations, and implementation roadmap.',
  },
  {
    title: 'LinkedIn + Landing Page',
    price: '$500',
    stage: 'Core conversion system',
    audience: 'For founders with LinkedIn traction but weak conversion',
    badge: 'Most popular',
    features: [
      'LinkedIn positioning refinement',
      'Conversion-focused landing page structure',
      'Hero, offer, proof, and CTA copy',
      'Lead capture and booking flow',
      'Responsive Next.js implementation',
    ],
    note: 'Best when you need one clear path from profile visit to booked conversation.',
  },
  {
    title: 'Full Funnel System',
    price: '$1,200',
    stage: 'Premium strategy and build',
    audience: 'For founders ready to align the full journey',
    badge: 'Full system',
    features: [
      'Full profile-to-website funnel audit',
      'Offer and messaging architecture',
      'Multi-section website build',
      'FAQ and objection handling',
      'Launch support and walkthrough video',
    ],
    note: 'Best when your profile, offer, website, and CTA all need to work as one system.',
  },
]

const startOptions = [
  {
    icon: FileSearch,
    eyebrow: 'Not sure what is broken',
    title: 'Free Funnel Audit',
    price: 'Free',
    bestFor: 'You want a quick read on the biggest leak before spending money.',
    includes: ['15-minute review', 'Biggest conversion opportunity', 'Clear next step'],
    cta: 'Request free audit',
    href: '#contact',
    tone: 'soft',
  },
  {
    icon: ClipboardCheck,
    eyebrow: 'Need a real diagnosis',
    title: 'Starter Audit',
    price: '$300',
    bestFor: 'You want the exact fixes, copy direction, and roadmap before building.',
    includes: ['Recorded Loom', 'Priority fix list', 'Implementation roadmap'],
    cta: 'Start with audit',
    href: '#contact',
    tone: 'warm',
  },
  {
    icon: Rocket,
    eyebrow: 'Ready to launch the path',
    title: 'Build Sprint',
    price: '$500+',
    bestFor: 'You already know the gap and want the LinkedIn-to-website path built.',
    includes: ['Messaging structure', 'Landing page build', 'Booking flow'],
    cta: 'Discuss the build',
    href: '#contact',
    tone: 'bright',
  },
]

export default function Packages() {
  return (
    <section id="packages" className="texture-band neon-magenta section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <SectionBadge icon={BadgeDollarSign} className="mb-4">Offer ladder</SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">Start where you are</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            A clear ladder from audit to full build, so you do not have to jump straight into a large project.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`glass-card p-8 relative flex flex-col transition-all duration-300 hover:border-orange-500/40 ${
                pkg.badge === 'Most popular'
                  ? 'border-orange-500/40 md:scale-105 shadow-[0_0_40px_rgba(255,132,3,0.25)] ring-1 ring-orange-500/20'
                  : 'border-orange-500/20'
              }`}
              style={pkg.badge === 'Most popular' ? { background: 'linear-gradient(135deg, rgba(10,19,50,0.65) 0%, rgba(51,13,62,0.55) 100%)' } : undefined}
            >
              {pkg.badge === 'Most popular' ? (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linear-to-r from-orange-500 to-orange-600 text-white px-5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-lg">
                  Most Popular
                </div>
              ) : (
                <span className="absolute -top-3 right-6 px-4 py-1 rounded-full text-xs font-bold bg-linear-to-r from-purple-900 to-purple-800 text-white">
                  {pkg.badge}
                </span>
              )}

              <div className="text-center pb-6 mb-6 border-b border-orange-500/20">
                <h3 className="text-2xl font-bebas mb-2">{pkg.title}</h3>
                <span className="text-xs uppercase text-orange-400 font-semibold bg-orange-500/10 px-3 py-1 rounded-full block mb-2">
                  {pkg.stage}
                </span>
                <div className="text-3xl font-bold text-orange-500">{pkg.price}</div>
                <div className="text-xs bg-orange-500/10 inline-block px-3 py-1 rounded-full mt-2">
                  {pkg.audience}
                </div>
              </div>

              <div className="flex-1 mb-6">
                <h4 className="text-orange-500 text-sm uppercase tracking-wider mb-4">What is included:</h4>
                <ul className="space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-white/80">
                      <CheckCircle size={16} className="text-orange-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <p className="text-xs text-white/60 italic mb-4">{pkg.note}</p>
                <Button href="#contact" variant="primary" className="w-full">
                  Get Your Free Audit
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-8 items-stretch">
            <div className="relative overflow-hidden rounded-2xl border border-orange-500/25 bg-purple-950/45 p-7 md:p-8">
              <div className="absolute inset-0 opacity-25 texture-grid" aria-hidden="true" />
              <div className="relative z-10">
                <SectionBadge icon={Compass}>Decision guide</SectionBadge>
                <h3 className="mt-5 text-3xl md:text-4xl font-bebas">Choosing where to start</h3>
                <p className="mt-4 text-white/70">
                  Pick based on your current uncertainty. If you do not know the leak yet, start free. If you know the leak and want it fixed, move into the paid audit or build.
                </p>

                <div className="mt-7 space-y-4">
                  <div className="flex items-start gap-3 rounded-xl border border-orange-500/15 bg-orange-500/5 p-4">
                    <BadgeDollarSign size={19} className="mt-0.5 text-orange-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">Best default path</p>
                      <p className="text-sm text-white/60">Free Audit - Starter Audit - Build Sprint</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/3 p-4">
                    <ArrowRight size={19} className="mt-0.5 text-orange-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-white">No pressure</p>
                      <p className="text-sm text-white/60">The first call is for clarity, not a forced package decision.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {startOptions.map((option, index) => (
                <motion.a
                  key={option.title}
                  href={option.href}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  className={`group relative flex min-h-full flex-col rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-glow ${
                    option.tone === 'bright'
                      ? 'border-orange-500/35 bg-orange-500/10'
                      : option.tone === 'warm'
                        ? 'border-orange-500/45 bg-linear-to-b from-orange-500/14 to-purple-950/35 shadow-[0_0_34px_rgba(255,132,3,0.14)]'
                        : 'border-white/10 bg-purple-950/35'
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400">
                      <option.icon size={22} />
                    </div>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/70">
                      {option.price}
                    </span>
                  </div>

                  <p className="text-xs uppercase tracking-wider text-orange-300/80">{option.eyebrow}</p>
                  <h4 className="mt-2 text-xl font-bold text-white">{option.title}</h4>
                  <p className="mt-3 text-sm text-white/68">{option.bestFor}</p>

                  <ul className="mt-5 flex-1 space-y-2">
                    {option.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-white/75">
                        <CheckCircle size={15} className="mt-0.5 shrink-0 text-orange-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-300 group-hover:text-orange-200">
                    {option.cta}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
