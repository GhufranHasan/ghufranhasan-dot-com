'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Globe2,
  Linkedin,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'
import { Button } from '@/components/ui/Button'

const comparisons = [
  {
    area: 'Authority',
    linkedinOnly: 'Your visibility and authority depend heavily on one platform.',
    websiteSupported: 'Your core positioning and expertise live under your own brand.',
  },
  {
    area: 'Proof',
    linkedinOnly: 'Useful proof can become scattered across posts, comments, and DMs.',
    websiteSupported: 'Your strongest trust signals stay organized around your offer.',
  },
  {
    area: 'Offer clarity',
    linkedinOnly: 'Visitors piece together what you do from profile sections and content.',
    websiteSupported: 'Visitors see one clear offer, process, and next step.',
  },
  {
    area: 'Lead path',
    linkedinOnly: 'Inquiries depend mainly on profile visits and social DMs.',
    websiteSupported: 'Prospects can use forms, audits, email capture, and booking links.',
  },
  {
    area: 'Continuity',
    linkedinOnly: 'Platform access or reach changes can interrupt the buyer journey.',
    websiteSupported: 'Your website keeps the core conversion path available.',
  },
]

const ownedAssetBenefits = [
  'A branded home for your offer and positioning',
  'A direct path to your audit, email list, and booking flow',
  'A conversion asset that supports LinkedIn without replacing it',
]

export default function PlatformDependency() {
  return (
    <section id="owned-asset" className="texture-grid neon-deep relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-orange-500/55 to-transparent" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-4xl text-center"
        >
          <SectionBadge icon={ShieldCheck} className="mb-5">Platform dependency risk</SectionBadge>
          <h2 className="text-3xl font-bebas leading-tight text-white md:text-5xl">
            LinkedIn creates attention. Your website protects and converts it.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-white/70">
            LinkedIn is discovery. Your website is the decision room: the owned place where your offer, proof, CTA, and email capture turn profile curiosity into a clearer next step.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-[0.76fr_1.24fr] lg:items-start">
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-orange-500/25 bg-purple-950/50 p-6 shadow-glow md:p-7"
          >
            <div className="absolute inset-0 texture-dots opacity-25" aria-hidden="true" />
            <div className="relative z-10">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400">
                  <Globe2 size={22} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">Owned conversion asset</p>
                  <h3 className="mt-1 text-2xl font-bebas text-white">Support the platform. Own the path.</h3>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-white/67">
                The goal is not to leave LinkedIn. It is to make sure your business journey does not end there.
              </p>

              <div className="my-6 space-y-3 border-y border-orange-500/15 py-6">
                {ownedAssetBenefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-orange-400" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <Button href="/free-audit" variant="primary" className="w-full text-sm">
                Audit My LinkedIn-to-Website Path
                <ArrowRight size={17} />
              </Button>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:overflow-hidden md:rounded-2xl md:border md:border-orange-500/20"
          >
            <table className="block w-full table-fixed border-separate border-spacing-0 md:table">
              <caption className="sr-only">
                Comparison of relying only on LinkedIn with using a website to support LinkedIn
              </caption>
              <colgroup>
                <col className="md:w-[18%]" />
                <col className="md:w-[41%]" />
                <col className="md:w-[41%]" />
              </colgroup>
              <thead className="sr-only md:not-sr-only md:table-header-group">
                <tr className="bg-linear-to-r from-purple-900/80 to-orange-500/15">
                  <th scope="col" className="p-5 text-left text-sm font-bold text-white">Business area</th>
                  <th scope="col" className="p-5 text-left text-sm font-bold text-white/75">
                    <span className="inline-flex items-center gap-2">
                      <Linkedin size={16} />
                      If everything stays on LinkedIn
                    </span>
                  </th>
                  <th scope="col" className="p-5 text-left text-sm font-bold text-orange-300">
                    <span className="inline-flex items-center gap-2">
                      <Globe2 size={16} />
                      If your website supports LinkedIn
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="grid gap-4 md:table-row-group">
                {comparisons.map((item, index) => (
                  <tr
                    key={item.area}
                    className="glass-card block overflow-hidden border-orange-500/20 md:table-row md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:shadow-none md:backdrop-blur-none"
                  >
                    <th
                      scope="row"
                      className="block border-b border-orange-500/15 bg-orange-500/10 px-5 py-4 text-left md:table-cell md:border-t md:border-b-0 md:border-orange-500/10 md:bg-transparent md:p-5 md:align-top"
                    >
                      <span className="block text-xs font-semibold uppercase tracking-wider text-orange-300/80 md:hidden">
                        Business area {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="mt-1 block font-bold text-white md:mt-0">{item.area}</span>
                    </th>
                    <td
                      data-label="If everything stays on LinkedIn"
                      className="block p-5 before:mb-2 before:block before:text-xs before:font-semibold before:uppercase before:tracking-wider before:text-white/55 before:content-[attr(data-label)] md:table-cell md:border-t md:border-orange-500/10 md:p-5 md:align-top md:before:hidden"
                    >
                      <div className="flex gap-3 text-sm leading-relaxed text-white/62">
                        <TriangleAlert size={16} className="mt-0.5 shrink-0 text-white/40" />
                        <span>{item.linkedinOnly}</span>
                      </div>
                    </td>
                    <td
                      data-label="If your website supports LinkedIn"
                      className="block border-t border-orange-500/15 bg-orange-500/[0.08] p-5 before:mb-2 before:block before:text-xs before:font-semibold before:uppercase before:tracking-wider before:text-orange-300 before:content-[attr(data-label)] md:table-cell md:border-t md:border-l-2 md:border-orange-500 md:bg-orange-500/5 md:p-5 md:align-top md:before:hidden"
                    >
                      <div className="flex gap-3 text-sm leading-relaxed text-white/80">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-orange-400" />
                        <span>{item.websiteSupported}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-9 max-w-3xl text-center text-sm leading-relaxed text-white/62"
        >
          LinkedIn should create attention. Your website should capture, organize, and convert it.
        </motion.p>
      </div>
    </section>
  )
}
