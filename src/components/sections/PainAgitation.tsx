'use client'

import { motion } from 'framer-motion'
import SectionBadge from '@/components/ui/SectionBadge'
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  CircleDashed,
  FileQuestion,
  Flame,
  Link2Off,
  MessageSquareX,
  Route,
  Sparkles,
  X,
} from 'lucide-react'

const pains = [
  {
    title: 'Attention stalls',
    text: 'People like your LinkedIn posts, but the conversation stops there.',
    icon: MessageSquareX,
  },
  {
    title: 'Message mismatch',
    text: 'Your profile and website use different language, so prospects lose the thread.',
    icon: Link2Off,
  },
  {
    title: 'Website drifts',
    text: 'Your website explains what you do, but does not guide visitors to one next step.',
    icon: FileQuestion,
  },
  {
    title: 'CTA confusion',
    text: 'Contact, learn more, book a call, view work, and hope. Too many choices means no action.',
    icon: CircleDashed,
  },
]

const journeySteps = [
  {
    title: 'LinkedIn attention',
    text: 'A founder sees your content and gets curious.',
    state: 'working',
  },
  {
    title: 'Profile visit',
    text: 'They check your promise, proof, and positioning.',
    state: 'working',
  },
  {
    title: 'Website click',
    text: 'They leave the feed and enter your conversion path.',
    state: 'working',
  },
  {
    title: 'Friction point',
    text: 'The message changes, the offer blurs, or the CTA feels vague.',
    state: 'broken',
  },
  {
    title: 'Lost opportunity',
    text: 'They leave before becoming a qualified conversation.',
    state: 'broken',
  },
]

const fixes = [
  'Same promise across LinkedIn and website',
  'One focused audit CTA',
  'Proof before the booking ask',
]

export default function PainAgitation() {
  return (
    <section className="texture-dots neon-purple relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-orange-500/60 to-transparent" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <SectionBadge icon={Flame} emphasis="strong" className="mb-5">
            The real leak
          </SectionBadge>
          <p className="text-3xl md:text-4xl lg:text-5xl font-bebas mb-5">
            You do not need more traffic. You need a clearer path from attention to action.
          </p>
          <p className="text-white/70">
            LinkedIn creates curiosity. Your website should turn that curiosity into trust, clarity, and a reason to book.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-8 max-w-6xl mx-auto items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="self-start overflow-hidden rounded-3xl border border-orange-500/25 bg-purple-950/55 p-5 shadow-glow backdrop-blur-md md:p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-4 border-b border-orange-500/15 pb-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                  What visitors experience
                </p>
                <h3 className="mt-2 text-2xl font-bebas text-white">
                  The symptoms are small. The leak is expensive.
                </h3>
              </div>
              <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/25 sm:flex">
                <Flame size={21} />
              </div>
            </div>

            <div className="space-y-3">
            {pains.map((pain, index) => (
              <motion.div
                key={pain.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-all hover:border-orange-500/40 hover:bg-orange-500/[0.07]"
              >
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 ring-1 ring-orange-500/20 transition-all group-hover:bg-orange-500/15">
                  <pain.icon size={21} className="text-orange-400" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-950 text-[10px] font-bold text-orange-300 ring-1 ring-orange-500/30">
                    {index + 1}
                  </span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-white">{pain.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/62">{pain.text}</p>
                </div>
              </motion.div>
            ))}

            <div className="mt-5 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-4">
              <p className="text-sm font-semibold text-white">
                The pattern:
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/66">
                Interest is not the problem. The handoff from profile to website is where the path usually breaks.
              </p>
            </div>
          </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-orange-500/25 bg-background-card p-6 shadow-glow backdrop-blur-xl md:p-8"
          >
            <div className="absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-orange-500/10" />
            <div className="relative z-10">
              <div className="mb-7 flex items-start justify-between gap-5">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
                    <Route size={17} />
                    Leak diagnosis
                  </div>
                  <h3 className="text-3xl font-bebas">The broken journey</h3>
                </div>
                <div className="hidden rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300 sm:block">
                  profile to website
                </div>
              </div>

              <div className="space-y-3">
                {journeySteps.map((step, index) => {
                  const isBroken = step.state === 'broken'
                  return (
                    <div key={step.title}>
                      <div className={`grid grid-cols-[auto_1fr] gap-4 rounded-2xl border p-4 ${
                        isBroken
                          ? 'border-red-400/30 bg-red-500/10'
                          : 'border-orange-500/20 bg-orange-500/5'
                      }`}>
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                          isBroken ? 'bg-red-500/15' : 'bg-orange-500/10'
                        }`}>
                          {isBroken ? (
                            <X size={20} className="text-red-300" />
                          ) : (
                            <CheckCircle2 size={20} className="text-orange-400" />
                          )}
                        </div>
                        <div>
                          <div className="mb-1 flex items-center gap-2">
                            <h4 className="font-bold text-white">{step.title}</h4>
                            {index === 3 && (
                              <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-200">
                                Most websites lose leads here
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-white/62">{step.text}</p>
                        </div>
                      </div>
                      {index < journeySteps.length - 1 && (
                        <div className="flex justify-center py-1.5">
                          {index < 2 ? (
                            <ArrowDown size={18} className="text-orange-400/70" />
                          ) : (
                            <ArrowDown size={18} className="text-red-300/70" />
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-7 rounded-2xl border border-orange-500/25 bg-orange-500/10 p-5">
                <div className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-orange-400">
                  <Sparkles size={16} />
                  What fixes it
                </div>
                <div className="grid gap-3">
                  {fixes.map((fix) => (
                    <div key={fix} className="flex items-start gap-3 text-sm text-white/75">
                      <ArrowRight size={16} className="mt-0.5 shrink-0 text-orange-500" />
                      <span>{fix}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mx-auto mt-10 max-w-4xl rounded-2xl border border-orange-500/25 bg-purple-950/45 p-5 text-center backdrop-blur-md"
        >
          <p className="text-sm text-white/65 md:text-base">
            The fix is not a louder website. It is a tighter path: <span className="font-semibold text-white">attention</span>
            <ArrowRight size={15} className="mx-2 inline text-orange-500" />
            <span className="font-semibold text-white">trust</span>
            <ArrowRight size={15} className="mx-2 inline text-orange-500" />
            <span className="font-semibold text-white">one clear action.</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
