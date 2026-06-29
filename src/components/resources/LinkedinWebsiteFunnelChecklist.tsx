'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, Circle, Printer, RotateCcw } from 'lucide-react'
import { linkedinWebsiteFunnelChecklist } from '@/data/linkedinWebsiteFunnelChecklist'

type Status = 'yes' | 'needs-work' | 'no'

const statusOptions: Array<{
  label: string
  value: Status
  points: number
}> = [
  { label: 'Yes', value: 'yes', points: 2 },
  { label: 'Needs Work', value: 'needs-work', points: 1 },
  { label: 'No', value: 'no', points: 0 },
]

const scoreCopy = [
  {
    min: 0,
    max: 7,
    label: 'Unclear funnel',
    text: 'Your funnel is unclear. Visitors may understand parts of your offer, but the path to action is weak.',
  },
  {
    min: 8,
    max: 14,
    label: 'Leaky but fixable',
    text: 'Your funnel has potential, but there are leaks between your LinkedIn profile, website, and CTA.',
  },
  {
    min: 15,
    max: 20,
    label: 'Mostly aligned',
    text: 'Your funnel is mostly aligned. Small improvements can make the path to booked conversations stronger.',
  },
]

const getScoreValue = (status: Status | undefined) =>
  statusOptions.find((option) => option.value === status)?.points ?? 0

export default function LinkedinWebsiteFunnelChecklist() {
  const [answers, setAnswers] = useState<Record<number, Status>>({})

  const score = useMemo(
    () =>
      Object.values(answers).reduce(
        (total, status) => total + getScoreValue(status),
        0
      ),
    [answers]
  )

  const answeredCount = Object.keys(answers).length
  const interpretation =
    scoreCopy.find((item) => score >= item.min && score <= item.max) ??
    scoreCopy[0]

  const resetChecklist = () => setAnswers({})
  const printChecklist = () => window.print()

  return (
    <section id="checklist" className="texture-dots neon-purple py-20 md:py-24">
      <div className="container-custom">
        <div className="mb-8 hidden rounded-2xl border border-orange-500/25 bg-purple-950/80 p-6 shadow-glow print:block">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
            Free Resource for B2B Agency Founders
          </p>
          <h1 className="mt-3 text-4xl font-bebas text-white">
            10-Point LinkedIn-to-Website Funnel Checklist
          </h1>
          <p className="mt-3 text-white/70">
            Find where your LinkedIn profile, website, and CTA may be losing
            warm visitors before they become booked conversations.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
          <div>
            <div className="mb-8 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
                10-point self-audit
              </p>
              <h2 className="mt-3 text-3xl font-bebas text-white md:text-5xl">
                Check the full LinkedIn to website path
              </h2>
              <p className="mt-4 text-white/68">
                Mark each point honestly. The score is not the goal; the goal is
                finding the few gaps most likely to stop warm visitors from booking.
              </p>
            </div>

            <ol className="space-y-5">
              {linkedinWebsiteFunnelChecklist.map((item, index) => {
                const selectedStatus = answers[index]

                return (
                  <li
                    key={item.title}
                    className="rounded-2xl border border-orange-500/20 bg-background-card p-5 shadow-glow backdrop-blur-md md:p-6"
                  >
                    <article className="grid gap-5 md:grid-cols-[auto_1fr]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-sm font-bold text-orange-300">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-white">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-white/62">
                              <span className="font-semibold text-orange-300">
                                Why it matters:{' '}
                              </span>
                              {item.whyItMatters}
                            </p>
                          </div>
                          {selectedStatus && (
                            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-200">
                              <CheckCircle2 size={14} />
                              {statusOptions.find((option) => option.value === selectedStatus)?.label}
                            </span>
                          )}
                        </div>

                        <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.035] p-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">
                            Self-audit question
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-white/75">
                            {item.question}
                          </p>
                        </div>

                        <div
                          className="mt-5 grid gap-2 sm:grid-cols-3 print:hidden"
                          role="group"
                          aria-label={`${item.title} status`}
                        >
                          {statusOptions.map((option) => {
                            const isSelected = selectedStatus === option.value

                            return (
                              <button
                                key={option.value}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() =>
                                  setAnswers((current) => ({
                                    ...current,
                                    [index]: option.value,
                                  }))
                                }
                                className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition-all ${
                                  isSelected
                                    ? 'border-orange-500 bg-orange-500 text-white shadow-glow-hover'
                                    : 'border-orange-500/20 bg-orange-500/5 text-white/70 hover:border-orange-500/45 hover:bg-orange-500/10'
                                }`}
                              >
                                {isSelected ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                                {option.label}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ol>
          </div>

          <aside className="sticky top-24 rounded-2xl border border-orange-500/25 bg-purple-950/80 p-6 shadow-glow backdrop-blur-md print:static">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-300">
              Live score
            </p>
            <div className="mt-4 flex items-end gap-2">
              <span className="text-6xl font-bold text-white">
                {score}
              </span>
              <span className="pb-2 text-lg font-semibold text-white/55">
                / 20
              </span>
            </div>
            <p className="mt-2 text-sm text-white/55">
              {answeredCount} of {linkedinWebsiteFunnelChecklist.length} checked
            </p>

            <div className="mt-6 rounded-xl border border-orange-500/20 bg-orange-500/10 p-4">
              <p className="font-bold text-white">
                {interpretation.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/66">
                {interpretation.text}
              </p>
            </div>

            <div className="mt-6 space-y-3 text-sm text-white/65">
              <div className="flex items-center justify-between gap-4">
                <span>Yes</span>
                <span className="font-semibold text-white">2 points</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>Needs Work</span>
                <span className="font-semibold text-white">1 point</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span>No</span>
                <span className="font-semibold text-white">0 points</span>
              </div>
            </div>

            <div className="mt-7 grid gap-3 print:hidden">
              <button
                type="button"
                onClick={printChecklist}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-5 py-3 font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover"
              >
                <Printer size={17} />
                Print / Save as PDF
              </button>
              <button
                type="button"
                onClick={resetChecklist}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-500/25 bg-orange-500/5 px-5 py-3 font-semibold text-white/75 transition-all hover:border-orange-500/45 hover:bg-orange-500/10"
              >
                <RotateCcw size={16} />
                Reset checklist
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
