'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Calendar, Shield, Clock, Sparkles, CheckCircle, MessageCircle, Linkedin, Mail, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [calendlyError, setCalendlyError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load Calendly widget
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => setIsLoading(false)
    script.onerror = () => {
      setCalendlyError(true)
      setIsLoading(false)
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const guarantees = [
    { icon: Shield, text: 'No spam, ever' },
    { icon: Clock, text: '90-min strategy call' },
    { icon: Sparkles, text: 'Free actionable insights' },
  ]

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden py-20 md:py-28">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
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
                <span className="text-sm text-white/70">Free 90-minute strategy call</span>
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

            {/* Social Links */}
            <div className="flex gap-3 pt-4">
              <a href="https://linkedin.com/in/ghufranhasan" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-purple-950/50 border border-orange-500/20 flex items-center justify-center text-white/70 hover:bg-[#0077B5] hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
              <a href="mailto:hello@ghufran.com" className="w-10 h-10 rounded-full bg-purple-950/50 border border-orange-500/20 flex items-center justify-center text-white/70 hover:bg-orange-500 hover:text-white transition-all">
                <Mail size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right Column - Calendly with Fallback */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 md:p-8 border border-orange-500/20"
          >
            <div className="text-center mb-6">
              <Calendar size={32} className="text-orange-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">Schedule Your Free Audit</h3>
              <p className="text-white/60 text-sm">Select a time that works for you • 90-min call</p>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-white/60">Loading calendar...</p>
                </div>
              </div>
            )}

            {/* Error State with Fallback */}
            {calendlyError && (
              <div className="text-center py-8">
                <AlertCircle size={48} className="text-orange-500 mx-auto mb-4" />
                <p className="text-white/80 mb-4">Calendar is temporarily unavailable.</p>
                <div className="space-y-3">
                  <a
                    href="https://calendly.com/ghufranhasan/1-1-consultation-call"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-glow-hover transition-all w-full justify-center"
                  >
                    <Calendar size={18} />
                    Open Calendly in New Tab
                  </a>
                  <a
                    href="https://linkedin.com/in/ghufranhasan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/30 text-white hover:border-orange-500 transition-all w-full justify-center"
                  >
                    <MessageCircle size={18} />
                    Or DM me "AUDIT" on LinkedIn
                  </a>
                </div>
              </div>
            )}

            {/* Calendly Iframe */}
            {!calendlyError && !isLoading && (
              <iframe
                src="https://calendly.com/ghufranhasan/1-1-consultation-call?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0a1332&text_color=fefefe&primary_color=ff8403"
                width="100%"
                height="600"
                frameBorder="0"
                className="rounded-xl"
                title="Schedule a call with Ghufran Hasan"
              />
            )}

            {/* Guarantee Badges */}
            <div className="flex flex-wrap justify-center gap-4 pt-6 mt-6 border-t border-orange-500/20">
              {guarantees.map((guarantee) => (
                <div key={guarantee.text} className="flex items-center gap-2 text-xs text-white/50">
                  <guarantee.icon size={14} className="text-orange-500" />
                  <span>{guarantee.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8">
          <p className="text-white/40 text-xs">
            No pitch, no pressure. Just a clear audit of your current LinkedIn + website setup.
          </p>
        </div>
      </div>
    </section>
  )
}