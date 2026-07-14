'use client'

import { motion } from 'framer-motion'
import { BarChart3, ClipboardList, FileText, LayoutTemplate, PackageCheck } from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'

const deliverables = [
  {
    title: 'Friction Map',
    text: 'Where the visitor journey loses clarity',
    icon: ClipboardList,
  },
  {
    title: 'Messaging Alignment Sheet',
    text: 'LinkedIn promise, hero, offer, and CTA',
    icon: FileText,
  },
  {
    title: 'Conversion Page Preview',
    text: 'Responsive page structure and copy',
    icon: LayoutTemplate,
  },
  {
    title: 'Launch Dashboard',
    text: 'CTA tracking, checklist, and walkthrough',
    icon: BarChart3,
  },
]

export default function DeliverablesPreview() {
  return (
    <section className="texture-grid neon-deep py-16 md:py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <SectionBadge icon={PackageCheck} className="mb-4">
            What you receive
          </SectionBadge>
          <h2 className="text-3xl font-bebas text-white md:text-5xl">
            The sprint ends with usable assets, not vague advice
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            A compact preview of the practical outputs you can expect from the
            diagnosis and implementation path.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="relative mx-auto grid max-w-6xl gap-4 md:grid-cols-4"
        >
          {deliverables.map((item, index) => (
            <motion.article
              key={item.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`relative rounded-2xl border border-orange-500/20 bg-purple-950/55 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.22)] backdrop-blur-md md:min-h-52 ${
                index % 2 === 1 ? 'md:translate-y-6' : ''
              }`}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400">
                  <item.icon size={21} />
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/55">
                  0{index + 1}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/62">{item.text}</p>
              <div className="mt-5 h-2 rounded-full bg-orange-500/10">
                <div
                  className="h-full rounded-full bg-linear-to-r from-orange-500 to-orange-600"
                  style={{ width: `${44 + index * 14}%` }}
                />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
