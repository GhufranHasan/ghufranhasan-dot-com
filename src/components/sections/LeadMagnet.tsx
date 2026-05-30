'use client'

import { useState } from 'react'
import { Download, CheckCircle, FileText, ArrowRight } from 'lucide-react'

export default function LeadMagnet() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call - Replace with your actual email service
    await new Promise(resolve => setTimeout(resolve, 500))
    
    console.log('Lead email:', email)
    setIsLoading(false)
    setSubmitted(true)
    
    // Open the PDF or resource
    window.open('/free-audit-checklist.pdf', '_blank')
    
    // Reset after 5 seconds
    setTimeout(() => {
      setSubmitted(false)
      setEmail('')
    }, 5000)
  }

  if (submitted) {
    return (
      <div className="glass-card p-5 text-center border border-green-500/30">
        <CheckCircle size={36} className="text-green-500 mx-auto mb-2" />
        <p className="text-white font-semibold text-sm">Check your inbox!</p>
        <p className="text-white/50 text-xs">Your audit checklist is on its way.</p>
      </div>
    )
  }

  return (
    <div className="glass-card p-5 border border-orange-500/20 hover:border-orange-500/40 transition-all">
      <div className="flex items-center gap-2 mb-2">
        <FileText size={18} className="text-orange-500" />
        <h3 className="font-bold text-white text-sm">Free: LinkedIn → Website Audit</h3>
      </div>
      <p className="text-white/60 text-xs mb-3">
        10-point checklist to find leaks in your funnel. Get it instantly.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-3 py-2 rounded-lg bg-purple-950/50 border border-orange-500/20 text-white text-xs focus:outline-none focus:border-orange-500 placeholder:text-white/30"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="px-3 py-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold hover:shadow-glow transition-all disabled:opacity-50"
        >
          {isLoading ? '...' : <Download size={14} />}
        </button>
      </form>
      <p className="text-white/30 text-[10px] mt-2">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  )
}