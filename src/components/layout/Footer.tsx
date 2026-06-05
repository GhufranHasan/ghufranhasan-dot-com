import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Github, Linkedin, Mail, MessageCircle } from 'lucide-react'
import LeadMagnet from '@/components/sections/LeadMagnet'
import SocialLinksModal from '@/components/layout/SocialLinksModal'

const services = [
  { label: 'Services', href: '#services' },
  { label: 'Funnel Patterns', href: '#case-studies' },
  { label: 'Pricing', href: '#packages' },
  { label: 'Process', href: '#process' },
  { label: 'Fit Check', href: '#fit-check' },
  { label: 'FAQ', href: '#faqs' },
]

const resources = [
  { label: 'About', href: '#about' },
  { label: 'Different View', href: '#different-view' },
  { label: 'Checklist', href: '#home' },
  { label: 'Newsletter', href: '#newsletter' },
  { label: 'Free Audit', href: '#contact' },
]

const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/in/ghufranhasan', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/ghufranhasan', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@ghufranhasan.com', label: 'Email' },
  { icon: MessageCircle, href: 'https://wa.me/?text=Hi%20Ghufran%2C%20I%20want%20to%20talk%20about%20my%20LinkedIn%20to%20website%20funnel.', label: 'WhatsApp' },
  { icon: Calendar, href: '/#contact', label: 'Book Audit' },
]

export default function Footer() {
  return (
    <footer className="texture-band neon-deep border-t border-orange-500/20 py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr] gap-8 mb-10">
          <div>
            <Link href="#home" className="mb-4 inline-flex items-center gap-3 text-3xl font-bebas tracking-wider">
              <Image
                src="/images/brand-logo.png"
                alt="Ghufran Hasan logo"
                width={46}
                height={46}
                className="h-11 w-11 rounded-full border border-orange-500/40 object-cover"
              />
              <span>Ghufran<span className="text-orange-500">.</span></span>
            </Link>
            <p className="text-white/70 max-w-sm text-sm">
              I don&apos;t just build websites. I build paths that turn attention into clients.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-white hover:bg-orange-500 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
              <SocialLinksModal
                label="All Links"
                iconOnly
                className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-white hover:bg-orange-500 transition-all"
              />
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Site</h3>
            <div className="space-y-3">
              {services.map((item) => (
                <Link key={item.label} href={item.href} className="block text-white/60 hover:text-orange-500 text-sm">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <div className="space-y-3">
              {resources.map((item) => (
                <Link key={item.label} href={item.href} className="block text-white/60 hover:text-orange-500 text-sm">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <LeadMagnet />
        </div>

        <div className="pt-6 border-t border-orange-500/20 text-white/50 text-sm flex flex-col md:flex-row gap-3 justify-between">
          <span>&copy; {new Date().getFullYear()} Ghufran Hasan. All rights reserved.</span>
          <span>LinkedIn to website conversion strategy for B2B agency founders.</span>
        </div>
      </div>
    </footer>
  )
}
