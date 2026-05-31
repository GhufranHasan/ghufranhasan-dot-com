'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

const packages = [
  {
    title: 'Starter Audit',
    price: '$300',
    stage: 'Low-risk entry point',
    audience: 'For founders who want clarity before a build',
    badge: 'Start here',
    features: [
      'LinkedIn profile and website review',
      'Recorded Loom breakdown',
      '3 highest-priority conversion fixes',
      'CTA and hero copy recommendations',
      'Simple next-step roadmap',
    ],
    note: 'Best when you want to test the thinking before committing to implementation.',
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
              className="glass-card p-8 relative flex flex-col"
            >
              {pkg.badge && (
                <span className={`absolute -top-3 right-6 px-4 py-1 rounded-full text-xs font-bold ${
                  pkg.badge === 'Most popular'
                    ? 'bg-linear-to-r from-orange-500 to-orange-600'
                    : 'bg-linear-to-r from-purple-900 to-purple-800'
                } text-white`}>
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
                <Link href="#contact">
                  <Button variant="primary" className="w-full">
                    Book Free Audit
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
