'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Calendar, Clock, Shield, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

  const timeSlots = [
    { day: 'Monday', slots: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM'] },
    { day: 'Tuesday', slots: ['10:00 AM', '1:00 PM', '3:00 PM'] },
    { day: 'Wednesday', slots: ['9:30 AM', '12:00 PM', '2:30 PM'] },
  ]

  return (
    <section ref={ref} id="contact" className="py-20 md:py-28">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-sm font-semibold">
              Let's Connect
            </span>
            <h2 className="text-3xl md:text-4xl font-bebas">
              Ready to fix your
              <br />
              <span className="text-orange-500">LinkedIn lead problem?</span>
            </h2>
            <p className="text-white/70">
              Book a free audit and I'll show you exactly what's broken in your LinkedIn → website funnel and how to fix it.
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-orange-500" />
                <span className="text-sm text-white/70">Free 30-minute strategy call</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-orange-500" />
                <span className="text-sm text-white/70">No pitch, just actionable insights</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle size={18} className="text-orange-500" />
                <span className="text-sm text-white/70">Walk away with a clear plan</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 border border-orange-500/20"
          >
            <div className="text-center mb-6">
              <Calendar size={32} className="text-orange-500 mx-auto mb-2" />
              <h3 className="text-xl font-bold">Select a Time Slot</h3>
              <p className="text-white/60 text-sm">All calls are 30 minutes via Zoom</p>
            </div>

            <div className="space-y-4">
              {timeSlots.map((day) => (
                <div key={day.day}>
                  <h4 className="text-orange-500 font-semibold mb-2">{day.day}</h4>
                  <div className="flex flex-wrap gap-2">
                    {day.slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedSlot === slot
                            ? 'bg-orange-500 text-white'
                            : 'bg-purple-950/50 border border-orange-500/20 text-white/70 hover:border-orange-500'
                        }`}
                      >
                        <Clock size={12} className="inline mr-1" />
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="#"
              className={`mt-6 w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold transition-all ${
                selectedSlot
                  ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white hover:shadow-glow-hover'
                  : 'bg-purple-950/50 text-white/40 cursor-not-allowed border border-orange-500/20'
              }`}
              onClick={(e) => !selectedSlot && e.preventDefault()}
            >
              <Calendar size={18} />
              Confirm Call
              <ArrowRight size={16} />
            </Link>

            <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-orange-500/20">
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Shield size={12} /> No spam
              </span>
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Clock size={12} /> 30-min call
              </span>
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Sparkles size={12} /> Free insights
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}