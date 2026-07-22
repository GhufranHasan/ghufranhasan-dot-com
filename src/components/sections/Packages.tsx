'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle,
  ClipboardCheck,
  FileSearch,
  MailCheck,
  Rocket,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import SectionBadge from '@/components/ui/SectionBadge'

const pricingOffers = [
  {
    title: 'Free Funnel Review',
    price: 'Free',
    style: 'Qualification first',
    description:
      'For LinkedIn-active agencies, consultants, and coaches who want to find the biggest visible leak between attention and website enquiries.',
    cta: 'Request Free Review',
    icon: FileSearch,
    href: '/free-audit#request-audit',
    points: ['Short intake', 'One visible leak', 'Best next step'],
  },
  {
    title: 'Conversion Audit',
    price: '$300',
    style: 'Paid diagnosis',
    description:
      'A deeper diagnosis of your LinkedIn promise, website messaging, CTA flow, and trust gaps before implementation.',
    cta: 'Start With Paid Audit',
    icon: ClipboardCheck,
    href: '/free-audit#request-audit',
    points: ['Recorded diagnosis', 'Priority fixes', 'Implementation direction'],
  },
  {
    title: 'LinkedIn-to-Website Conversion Sprint',
    price: 'Starts from $1,200',
    style: 'Focused implementation',
    description:
      'A focused 10-day sprint to align your LinkedIn promise, website message, CTA path, and enquiry flow.',
    cta: 'Plan My Sprint',
    icon: Rocket,
    href: '/free-audit#request-audit',
    points: ['Clearer buyer path', 'Website implementation', 'CTA tracking'],
    featured: true,
  },
  {
    title: 'Optional Add-ons',
    price: 'Custom',
    style: 'Lead path layers',
    description:
      'Lead magnet setup, audit form, email capture, confirmation page, and follow-up flow when the core path needs more support.',
    cta: 'Discuss Add-ons',
    icon: MailCheck,
    href: '/free-audit#request-audit',
    points: ['Checklist or assessment', 'Email capture', 'Follow-up flow'],
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
          <SectionBadge icon={BadgeDollarSign} className="mb-4">
            Pricing clarity
          </SectionBadge>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">
            Visible starting prices, flexible scope
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Enough pricing clarity to filter low-budget leads, without locking
            the sprint into a task list before the real scope is diagnosed.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-4">
          {pricingOffers.map((offer, index) => (
            <motion.article
              key={offer.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className={`relative flex min-h-full flex-col rounded-2xl border p-6 transition-all ${
                offer.featured
                  ? 'border-orange-500/45 bg-orange-500/10 shadow-[0_0_40px_rgba(255,132,3,0.22)]'
                  : 'border-orange-500/20 bg-purple-950/42 hover:border-orange-500/40'
              }`}
            >
              {offer.featured && (
                <span className="absolute -top-3 left-6 rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                  Core Offer
                </span>
              )}

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400">
                <offer.icon size={23} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">
                {offer.style}
              </p>
              <h3 className="mt-3 text-2xl font-bebas text-white">{offer.title}</h3>
              <p className="mt-3 text-3xl font-bold text-orange-400">{offer.price}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/66">
                {offer.description}
              </p>

              <ul className="mt-6 space-y-2 border-t border-orange-500/15 pt-5">
                {offer.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-white/72">
                    <CheckCircle size={15} className="mt-0.5 shrink-0 text-orange-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <Button href={offer.href} variant={offer.featured ? 'primary' : 'secondary'} className="mt-6 w-full whitespace-nowrap">
                {offer.cta}
                <ArrowRight size={16} />
              </Button>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-12 max-w-4xl rounded-2xl border border-orange-500/25 bg-purple-950/48 p-6 text-center md:p-8"
        >
          <p className="text-sm leading-relaxed text-white/70 md:text-base">
            The sprint starts from $1,200 because scope can grow when lead magnets,
            custom forms, confirmation pages, or follow-up emails are added. The
            free review and $300 audit help decide what is actually worth building.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
