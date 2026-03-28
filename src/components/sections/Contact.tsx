'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Calendar, 
  Clock, 
  Shield, 
  Sparkles, 
  CheckCircle,
  MessageCircle,
  Linkedin,
  Twitter,
  Github,
  Mail
} from 'lucide-react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false)

  // Load Calendly widget script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => setIsCalendlyLoaded(true)
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // Typed variants to satisfy TypeScript
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/in/ghufranhasan', label: 'LinkedIn', color: 'hover:bg-[#0077B5]' },
    { icon: Twitter, href: 'https://twitter.com/ghufranhasan', label: 'Twitter', color: 'hover:bg-[#1DA1F2]' },
    { icon: Github, href: 'https://github.com/ghufranhasan', label: 'GitHub', color: 'hover:bg-[#333]' },
    { icon: Mail, href: 'mailto:hello@ghufran.com', label: 'Email', color: 'hover:bg-orange-500' },
  ]

  const guarantees = [
    { icon: Shield, text: 'No spam, ever', color: 'text-orange-500' },
    { icon: Clock, text: '30-min strategy call', color: 'text-orange-500' },
    { icon: Sparkles, text: 'Free actionable insights', color: 'text-orange-500' },
  ]

  return (
    <section
      ref={ref}
      id="contact"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Animated Background Elements */}
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
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #ff8403 0px, #ff8403 1px, transparent 1px, transparent 20px)`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Header */}
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
                Book a free audit and I'll show you exactly what's broken in your LinkedIn → website funnel and how to fix it.
              </p>
            </motion.div>

            {/* Value Props */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle size={16} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Free 30-Minute Audit</h3>
                  <p className="text-white/60 text-sm">No obligation, just clarity on what's working and what's not</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle size={16} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Actionable Strategy</h3>
                  <p className="text-white/60 text-sm">Walk away with a clear plan to fix your funnel</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle size={16} className="text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">No Pressure, No Pitch</h3>
                  <p className="text-white/60 text-sm">Just honest feedback and practical next steps</p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <h3 className="text-white font-semibold mb-4">Connect with me</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full bg-purple-950/50 border border-orange-500/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Testimonial Snippet */}
            <motion.div
              variants={itemVariants}
              className="relative p-6 rounded-xl bg-orange-500/5 border border-orange-500/20"
            >
              <MessageCircle size={24} className="text-orange-500 mb-3" />
              <p className="text-white/80 text-sm italic">
                "Ghufran built a system that consistently delivers qualified leads. Within 90 days, we had more demos than our sales team could handle."
              </p>
              <div className="mt-3 text-xs text-orange-500">— Sarah Chen, B2B SaaS Founder</div>
            </motion.div>
          </motion.div>

          {/* Right Column - Calendly Embed */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
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
                <p className="text-white/60 text-sm">Select a time that works for you • 30-min strategy call</p>
              </div>

              {/* Calendly Inline Widget */}
              <div 
                className="calendly-inline-widget rounded-xl overflow-hidden" 
                data-url="https://calendly.com/ghufranhasan/1-1-consultation-call?hide_event_type_details=1&hide_gdpr_banner=1&background_color=0a1332&text_color=fefefe&primary_color=ff8403"
                style={{ minWidth: '320px', height: '700px' }}
              />

              {/* Loading State */}
              {!isCalendlyLoaded && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-white/60">Loading calendar...</p>
                  </div>
                </div>
              )}

              {/* Guarantee Badges */}
              <div className="flex flex-wrap justify-center gap-4 pt-6 mt-6 border-t border-orange-500/20">
                {guarantees.map((guarantee) => (
                  <div key={guarantee.text} className="flex items-center gap-2 text-xs text-white/50">
                    <guarantee.icon size={14} className={guarantee.color} />
                    <span>{guarantee.text}</span>
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