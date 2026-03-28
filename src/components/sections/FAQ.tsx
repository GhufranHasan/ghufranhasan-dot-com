'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useMemo } from 'react'
import { ChevronDown, HelpCircle, Search, Sparkles, MessageCircle, Filter } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    question: "Will this actually generate leads or is it just about getting visible?",
    answer: "Visibility without pipeline is vanity. My focus is on qualified leads and booked calls. I track what matters: conversations started, calls booked, and revenue influenced.",
    category: "Results",
    tags: ["leads", "pipeline", "roi"]
  },
  {
    question: "How much of my time does this take?",
    answer: "Once the system is live, you'll invest less than 90 minutes per week. Most clients spend 30-45 minutes reviewing content and engaging with key prospects.",
    category: "Process",
    tags: ["time", "commitment", "effort"]
  },
  {
    question: "How quickly will I see results?",
    answer: "Most clients see their first qualified inbound lead within 7-14 days. Pipeline acceleration typically shows within 30-60 days.",
    category: "Timeline",
    tags: ["timeline", "results", "speed"]
  },
  {
    question: "Who is this NOT right for?",
    answer: "This isn't for you if you're looking for vanity metrics over pipeline, don't have a clear offer, or aren't ready to show up as an authority.",
    category: "Eligibility",
    tags: ["fit", "qualification", "criteria"]
  },
  {
    question: "What platforms do you build websites on?",
    answer: "I build on both Next.js (for performance) and WordPress (for easy content management). I'll recommend the best option for your needs.",
    category: "Technical",
    tags: ["website", "platform", "technology"]
  }
]

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      if (searchQuery === "") return true
      const query = searchQuery.toLowerCase()
      return faq.question.toLowerCase().includes(query) ||
             faq.answer.toLowerCase().includes(query) ||
             faq.tags.some(tag => tag.includes(query))
    })
  }, [searchQuery])

  return (
    <section ref={ref} id="faqs" className="py-20 md:py-28 bg-purple-950/40">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 text-orange-500 text-sm font-semibold mb-4">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-bebas mb-4">Frequently Asked Questions</h2>
          <p className="text-white/70">If your question remains unanswered, feel free to book a call with me directly.</p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-purple-950/50 border border-orange-500/20 text-white placeholder-white/40 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle size={48} className="text-white/30 mx-auto mb-4" />
              <p className="text-white/60">No questions found. Try a different search term.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl overflow-hidden border transition-all ${
                  openIndex === index
                    ? 'bg-orange-500/5 border-orange-500/30'
                    : 'bg-purple-950/30 border-orange-500/20 hover:border-orange-500/40'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="text-white font-medium pr-4">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`text-orange-500 transition-transform duration-300 shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6">
                        <div className="pl-4 border-l-2 border-orange-500/30">
                          <p className="text-white/70">{faq.answer}</p>
                          <div className="flex gap-2 mt-3">
                            {faq.tags.map(tag => (
                              <span key={tag} className="text-xs px-2 py-1 rounded-full bg-orange-500/10 text-orange-400">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-linear-to-r from-orange-500/10 to-purple-500/10 border border-orange-500/20">
            <Sparkles size={24} className="text-orange-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-white/70 mb-6">I'm happy to answer any questions about how we can work together.</p>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-glow-hover transition-all"
            >
              <MessageCircle size={18} />
              Book a Free Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}