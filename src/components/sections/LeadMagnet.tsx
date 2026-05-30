'use client'

import { useState } from 'react'
import { Download, CheckCircle } from 'lucide-react'

export default function LeadMagnet() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Integrate with your email service
    console.log('Lead email:', email)
    setSubmitted(true)
    // You'd typically send to ConvertKit/Mailchimp here
    window.open('https://your-free-audit-checklist.pdf', '_blank')
  }

  if (submitted) {
    return (
      <div className="glass-card p-6 text-center">
        <CheckCircle size={40} className="text-orange-500 mx-auto mb-3" />
        <p className="text-white font-semibold">Check your inbox!</p>
        <p className="text-white/60 text-sm">Your audit checklist is on its way.</p>
      </div>
    )
  }

  return (
    <div className="glass-card p-6 border border-orange-500/20">
      <h3 className="text-lg font-bold text-white mb-2">Free: LinkedIn → Website Audit Checklist</h3>
      <p className="text-white/60 text-sm mb-4">10-point checklist to find leaks in your funnel. Get it instantly.</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-3 py-2 rounded-lg bg-purple-950/50 border border-orange-500/20 text-white text-sm focus:outline-none focus:border-orange-500"
        />
        <button type="submit" className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors">
          <Download size={16} />
        </button>
      </form>
    </div>
  )
}