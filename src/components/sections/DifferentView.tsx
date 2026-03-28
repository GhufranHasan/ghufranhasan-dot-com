'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { useRef, useState } from 'react'
import { X, Check, Lightbulb, Sparkles, Zap, Shield, TrendingUp, Users, Clock, Target, LucideIcon, Quote } from 'lucide-react'

// 1. Define Interfaces
interface Myth {
  myth: string;
  truth: string;
  icon: LucideIcon;
  color: string;
}

interface Belief {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export default function DifferentView() {
  const ref = useRef<HTMLElement>(null) // Added Type
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeTab, setActiveTab] = useState<'industry' | 'belief'>('industry')

  const industryMyths: Myth[] = [
    {
      myth: "You need to post every day to grow on LinkedIn.",
      truth: "Daily posting without positioning amplifies mediocrity. Three strategically engineered posts per week outperform daily generic output.",
      icon: Clock,
      color: "from-red-500/20 to-orange-500/20",
    },
    {
      myth: "Personal branding is about being authentic and sharing your story.",
      truth: "For high-ticket B2B, personal branding IS market positioning. Buyers don't care about your morning routine—they care if you can solve their $50k problem.",
      icon: Users,
      color: "from-orange-500/20 to-yellow-500/20",
    },
    {
      myth: "More engagement means more revenue.",
      truth: "Engagement without pipeline is theater. Qualified conversations > vanity metrics. Likes don't close deals.",
      icon: TrendingUp,
      color: "from-yellow-500/20 to-green-500/20",
    },
    {
      myth: "You need to build a big audience first.",
      truth: "You don't need a big audience. You need the RIGHT audience seeing the RIGHT message. 1,000 perfect prospects beat 100,000 tire-kickers.",
      icon: Users,
      color: "from-green-500/20 to-teal-500/20",
    },
    {
      myth: "Content is the strategy.",
      truth: "Content is the vehicle. Positioning + conversion architecture is the strategy. Without the latter, content is just noise.",
      icon: Lightbulb,
      color: "from-teal-500/20 to-blue-500/20",
    },
    {
      myth: "Outbound is dead.",
      truth: "Cold outreach without positioning gets ignored. Warm outbound with authority converts. The approach matters more than the channel.",
      icon: Zap,
      color: "from-blue-500/20 to-purple-500/20",
    },
  ]

  const myBeliefs: Belief[] = [
    {
      title: "Quality Over Quantity",
      description: "Three high-impact posts per week beat daily generic content. Every piece should serve a strategic purpose in your funnel.",
      icon: Sparkles,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Positioning Is Everything",
      description: "Your LinkedIn profile isn't a resume—it's a conversion asset. Every element should qualify the right buyers and disqualify the wrong ones.",
      icon: Target,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Pipeline Over Vanity",
      description: "I don't track likes. I track conversations started, calls booked, and revenue influenced. Results > engagement.",
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Systems Over Hustle",
      description: "You shouldn't be chained to LinkedIn. Build systems that work while you run your business—not another task on your to-do list.",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
    },
  ]

  // 2. Add Variants type and "as const" for ease
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const },
    },
  }

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  }

  return (
    <section
      ref={ref}
      id="different-view"
      className="relative overflow-hidden py-20 md:py-28"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 left-1/3 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-20 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        
        {/* Diagonal Lines Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(45deg, rgba(255,132,3,0.1) 0px, rgba(255,132,3,0.1) 1px, transparent 1px, transparent 20px)`,
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-block px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-sm font-semibold mb-4"
          >
            A Different View
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl md:text-5xl font-bebas mb-4"
          >
            What I Believe.
            <br />
            <span className="text-orange-500">What Actually Works.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-white/70 text-lg"
          >
            After building systems for 100+ B2B founders, here's what I've learned about what actually moves the needle.
          </motion.p>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-full bg-purple-950/50 border border-orange-500/20 p-1">
            <button
              onClick={() => setActiveTab('industry')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === 'industry'
                  ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-glow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <X size={16} className="inline mr-2" />
              Industry Gets Wrong
            </button>
            <button
              onClick={() => setActiveTab('belief')}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === 'belief'
                  ? 'bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-glow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Check size={16} className="inline mr-2" />
              What I Believe
            </button>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'industry' ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 gap-6"
            >
              {industryMyths.map((item, index) => (
                <motion.div
                  key={item.myth}
                  variants={cardVariants}
                  whileHover="hover"
                  className={`relative overflow-hidden rounded-2xl p-6 bg-linear-to-br ${item.color} border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group`}
                >
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <X size={48} className="text-orange-500" />
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                        <item.icon size={20} className="text-orange-500" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <X size={16} className="text-red-500" />
                        {item.myth}
                      </h3>
                      <div className="relative">
                        <div className="absolute -left-3 top-0 h-full w-px bg-orange-500/30" />
                        <p className="text-white/70 text-sm leading-relaxed pl-4">
                          {item.truth}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 gap-6"
            >
              {myBeliefs.map((belief, index) => (
                <motion.div
                  key={belief.title}
                  variants={cardVariants}
                  whileHover="hover"
                  className="relative overflow-hidden rounded-2xl p-6 glass-card border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 group"
                >
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Check size={48} className="text-orange-500" />
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${belief.color} p-px`}>
                        <div className="w-full h-full rounded-xl bg-purple-950/90 flex items-center justify-center group-hover:bg-transparent transition-all">
                          <belief.icon size={22} className="text-orange-500" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{belief.title}</h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {belief.description}
                      </p>
                    </div>
                  </div>

                  {/* Animated Border on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-orange-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Founder's Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 md:mt-16"
        >
          <div className="relative max-w-3xl mx-auto p-6 md:p-8 rounded-2xl bg-linear-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20">
            <Quote size={40} className="text-orange-500/20 absolute top-4 right-4" />
            <div className="relative z-10">
              <p className="text-white text-lg md:text-xl leading-relaxed mb-4">
                "I've built systems that turned LinkedIn from a time-drain into a predictable revenue channel. Not by chasing algorithms, but by engineering authority and building conversion infrastructure that works while you run your business."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                  <span className="text-white font-bold">GH</span>
                </div>
                <div>
                  <div className="font-bold text-white">Ghufran Hasan</div>
                  <div className="text-sm text-orange-500">LinkedIn Funnel Strategist</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-glow-hover transition-all duration-300 hover:translate-y-0.5 group"
          >
            <span>Ready to build a system that actually works?</span>
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}