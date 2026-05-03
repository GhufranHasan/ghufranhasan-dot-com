import Link from 'next/link'
import { Github, Linkedin, Twitter, Calendar } from 'lucide-react'

const socialLinks = [
  { icon: Github, href: 'https://github.com/ghufranhasan', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ghufranhasan', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com/ghufranhasan', label: 'Twitter' },
  { icon: Calendar, href: '/#contact', label: 'Calendar' },
]

export default function Footer() {
  return (
    <footer className="bg-purple-950/80 border-t border-orange-500/20 py-12">
      <div className="container-custom text-center">
        <Link href="#home" className="text-3xl font-bebas tracking-wider inline-block mb-4">
          Ghufran<span className="text-orange-500">.</span>
        </Link>
        <p className="text-white/70 max-w-md mx-auto mb-6 text-sm">
          Helping B2B agency founders turn LinkedIn attention into qualified demos.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-white hover:bg-orange-500 hover:translate-y-0.75 transition-all"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
<div className="text-white/60 text-sm">
          &copy; {new Date().getFullYear()} Ghufran Hasan. All rights reserved. <Link href="#faqs">FAQs</Link>
        </div>
      </div>
    </footer>
  )
}