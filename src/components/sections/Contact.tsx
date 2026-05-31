'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  Shield,
  Sparkles,
  CheckCircle,
  Linkedin,
  Facebook,
  Instagram,
  Mail,
  AlertCircle,
  MessageCircle,
} from 'lucide-react'

// ── Custom SVG brand icons ───────────────────────────────────────────────────

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
)

const SubstackIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836ZM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46ZM22.54 0H1.46v2.836h21.08V0Z" />
  </svg>
)

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06Z" />
  </svg>
)

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.583-1.313-.877-2.379-.875h-.036c-.813 0-1.585.223-2.409.7l-1.001-1.768c1.156-.654 2.275-.985 3.424-.98 1.757-.005 3.145.466 4.128 1.402 1.019.969 1.58 2.355 1.67 4.124.278.195.538.405.779.633 1.024.98 1.713 2.266 1.965 3.648.421 2.261-.078 4.929-2.136 6.95-1.888 1.849-4.153 2.797-7.374 2.821Zm.056-8.96c-.937.052-1.708.315-2.238.76-.457.386-.684.883-.657 1.398.048.905.686 1.573 1.783 1.64.126.008.254.012.38.012 1.102 0 2.005-.37 2.604-1.092.422-.508.695-1.213.81-2.095a11.378 11.378 0 0 0-2.682-.623Z" />
  </svg>
)

const MediumIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
    <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12Zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12Z" />
  </svg>
)

// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeError, setIframeError] = useState(false)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  // Calendly URL with custom theme parameters
  const calendlyUrl = "https://calendly.com/ghufranhasan/1-1-consultation-call?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0a1332&text_color=fefefe&primary_color=ff8403"

  // Social links (ALL preserved)
  const socialLinks = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ghufranhasan', hoverBg: 'hover:bg-[#0077B5]', icon: <Linkedin size={18} /> },
    { label: 'Facebook', href: 'https://facebook.com/GhufranHasanDotCom', hoverBg: 'hover:bg-[#1877F2]', icon: <Facebook size={18} /> },
    { label: 'Instagram', href: 'https://instagram.com/ghufranhasan_com', hoverBg: 'hover:bg-[#E1306C]', icon: <Instagram size={18} /> },
    { label: 'X', href: 'https://x.com/Ghufran_Hasan', hoverBg: 'hover:bg-black', icon: <XIcon /> },
    { label: 'Substack', href: 'https://ghufranhasan.substack.com', hoverBg: 'hover:bg-[#FF6719]', icon: <SubstackIcon /> },
    { label: 'TikTok', href: 'https://tiktok.com/@ghufranhasan_com', hoverBg: 'hover:bg-black', icon: <TikTokIcon /> },
    { label: 'Threads', href: 'https://threads.net/@ghufranhasan_com', hoverBg: 'hover:bg-black', icon: <ThreadsIcon /> },
    { label: 'Medium', href: 'https://medium.com/@ghufranhasan', hoverBg: 'hover:bg-black', icon: <MediumIcon /> },
    { label: 'Email', href: 'mailto:hello@ghufranhasan.com', hoverBg: 'hover:bg-orange-500', icon: <Mail size={18} /> },
  ]

  const guarantees = [
    { icon: Shield, text: 'No spam, ever' },
    { icon: Clock, text: '90-min strategy call' },
    { icon: Sparkles, text: 'Free actionable insights' },
  ]

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden py-20 md:py-28">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5 }}
          className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #ff8403 0px, #ff8403 1px, transparent 1px, transparent 20px)`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Left Column ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-sm font-semibold mb-4">
                Let's Connect
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bebas mb-4">
                Ready to fix your
                <br />
                <span className="text-orange-500">LinkedIn lead problem?</span>
              </h2>
              <p className="text-white/70 text-lg">
                Book a free 90-min audit and I'll show you exactly what's broken in your LinkedIn → website funnel and how to fix it.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              {[
                { title: 'Free 90-Minute Audit', sub: "No obligation, just clarity on what's working and what's not" },
                { title: 'Actionable Strategy', sub: 'Walk away with a clear plan to fix your funnel' },
                { title: 'No Pressure, No Pitch', sub: 'Just honest feedback and practical next steps' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={16} className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.sub}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-white font-semibold mb-4">Connect with me</h3>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className={`w-10 h-10 rounded-full bg-purple-950/50 border border-orange-500/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 ${social.hoverBg}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Column — Calendly Iframe ── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative"
          >
            <motion.div
              variants={itemVariants}
              className="glass-card p-6 md:p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300"
            >
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar size={28} className="text-orange-500" />
                  <h3 className="text-2xl font-bold text-white">Schedule Your Free Audit</h3>
                </div>
                <p className="text-white/60 text-sm">Select a time that works for you • 90-min strategy call</p>
              </div>

              {/* Loading State */}
              {!iframeLoaded && !iframeError && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/60">Loading calendar...</p>
                  </div>
                </div>
              )}

              {/* Error Fallback */}
              {iframeError && (
                <div className="text-center py-8">
                  <AlertCircle size={48} className="text-orange-500 mx-auto mb-4" />
                  <p className="text-white/80 mb-4">Calendar is temporarily unavailable.</p>
                  <div className="space-y-3">
                    <a
                      href={calendlyUrl}
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
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-orange-500/30 text-white hover:border-orange-500 hover:bg-orange-500/10 transition-all w-full justify-center"
                    >
                      <MessageCircle size={18} />
                      Or DM me "AUDIT" on LinkedIn
                    </a>
                  </div>
                </div>
              )}

              {/* Calendly Iframe - Using standard iframe which is more reliable */}
              {!iframeError && (
                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="650"
                  frameBorder="0"
                  className="rounded-xl"
                  title="Schedule a call with Ghufran Hasan"
                  onLoad={() => setIframeLoaded(true)}
                  onError={() => {
                    setIframeError(true)
                    setIframeLoaded(true)
                  }}
                />
              )}

              {/* Guarantee Badges */}
              <div className="flex flex-wrap justify-center gap-4 pt-6 mt-6 border-t border-orange-500/20">
                {guarantees.map((g) => (
                  <div key={g.text} className="flex items-center gap-2 text-xs text-white/50">
                    <g.icon size={14} className="text-orange-500" />
                    <span>{g.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: 20 }}
              transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
              className="absolute -top-4 -right-4 md:-top-6 md:-right-6 hidden md:block"
            >
              <div className="bg-linear-to-r from-orange-500 to-orange-600 rounded-full p-2 shadow-glow">
                <Sparkles size={24} className="text-white" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 text-sm">
            No pitch, no pressure. Just a clear audit of your current LinkedIn + website setup and actionable next steps.
          </p>
        </motion.div>
      </div>
    </section>
  )
}