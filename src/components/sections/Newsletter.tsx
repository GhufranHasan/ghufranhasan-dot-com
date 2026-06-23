'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'

export default function Newsletter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [website, setWebsite] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setError('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Newsletter signup is unavailable right now. Please try again later.')
        setIsLoading(false)
        return
      }

      setIsSubmitted(true)
      setEmail('')
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      console.error('Subscription error:', error)
      setError('Newsletter signup is unavailable right now. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section ref={ref} id="newsletter" className="texture-band neon-purple py-20 md:py-28">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Headline */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className="mb-4"
            >
              <SectionBadge icon={Mail}>Conversion notes</SectionBadge>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-5xl font-bebas mb-4"
            >
              LinkedIn-to-Website Conversion Notes
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-white/70 mb-2"
            >
              Get practical notes on turning LinkedIn profile visits into booked conversations with sharper positioning, clearer website sections, and better CTA paths.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.35 }}
              className="text-sm text-white/50"
            >
              No spam. Just actionable ideas straight to your inbox.
            </motion.p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4 }}
            className="bg-linear-to-r from-purple-950/40 to-purple-900/40 border border-orange-500/20 rounded-xl p-8 md:p-10"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <CheckCircle size={48} className="text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Welcome aboard!</h3>
                <p className="text-white/70">Check your email to confirm your subscription.</p>
              </motion.div>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="flex-1 relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500/50"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-purple-900/30 border border-orange-500/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-orange-500/50 transition-colors"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="px-8 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-glow-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isLoading ? 'Subscribing...' : 'Join Free'}
                </motion.button>
              </form>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </>
            )}

            {/* Trust signals */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 mt-6 pt-6 border-t border-orange-500/10"
            >
              <div className="flex items-center gap-2 text-sm text-white/60">
                <CheckCircle size={14} className="text-orange-500" />
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <CheckCircle size={14} className="text-orange-500" />
                <span>Unsubscribe anytime</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <CheckCircle size={14} className="text-orange-500" />
                <span>Weekly insights</span>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
