'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

const packages = [
  {
    title: 'Complete Funnel Build',
    price: '$2,500',
    audience: 'For: LinkedIn + Website (Both from scratch)',
    badge: 'Most Popular',
    features: [
      'Full LinkedIn Profile Rebrand & Optimization',
      'Authority Positioning Strategy',
      'Custom Conversion Website Design',
      'Compelling Copywriting for Both',
      'LinkedIn → Website CTA Architecture',
      '10-Day Launch Timeline',
      'Unlimited Revisions Until Launch',
    ],
    note: 'Perfect for founders starting from zero who want a complete LinkedIn + website system.',
  },
  {
    title: 'Funnel Alignment',
    price: '$1,800',
    audience: 'For: LinkedIn + Website (Data Not Consistent)',
    badge: 'Strategic Fix',
    features: [
      'Full Audit of Both Channels',
      'Message Alignment Strategy',
      'LinkedIn Profile Optimization',
      'Website Copy Overhaul',
      'CTA Architecture Redesign',
      'Funnel Flow Optimization',
      '7-Day Completion Timeline',
    ],
    note: 'Perfect if you have both channels but they\'re sending mixed signals—prospects are confused.',
  },
  {
    title: 'Website Conversion Build',
    price: '$1,500',
    audience: 'For: Only Website (Needs to Align with LinkedIn)',
    features: [
      'LinkedIn Profile Analysis',
      'Custom Conversion Website Design',
      'Compelling Copywriting',
      'LinkedIn → Website CTA Flow',
      'Development in Next.js / WordPress',
      '10-Day Launch Timeline',
    ],
    note: 'Perfect if you have a strong LinkedIn presence but your website is losing the leads you\'ve earned.',
  },
]

export default function Packages() {
  return (
    <section id="packages" className="section-padding bg-purple-950/40">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">Packages For You</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Select the package that suits your current situation, and let's fix your LinkedIn + Website funnel.
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
                  pkg.badge === 'Most Popular' 
                    ? 'bg-linear-to-r from-orange-500 to-orange-600' 
                    : 'bg-linear-to-r from-purple-900 to-purple-800'
                } text-white`}>
                  {pkg.badge}
                </span>
              )}

              <div className="text-center pb-6 mb-6 border-b border-orange-500/20">
                <h3 className="text-2xl font-bebas mb-2">{pkg.title}</h3>
                <div className="text-3xl font-bold text-orange-500">{pkg.price}</div>
                <div className="text-xs bg-orange-500/10 inline-block px-3 py-1 rounded-full mt-2">
                  {pkg.audience}
                </div>
              </div>

              <div className="flex-1 mb-6">
                <h4 className="text-orange-500 text-sm uppercase tracking-wider mb-4">What's Included:</h4>
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
                    Book a Call →
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