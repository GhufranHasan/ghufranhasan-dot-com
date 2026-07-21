import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  ClipboardCheck,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  MessagesSquare,
  ShieldCheck,
} from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

export const metadata: Metadata = {
  title: 'Contact Ghufran Hasan',
  description:
    'Contact Ghufran Hasan for general questions, collaborations, or direct communication. Serious funnel check requests should use the dedicated application page.',
  alternates: {
    canonical: '/contact',
  },
}

const contactOptions = [
  {
    title: 'Apply for a Funnel Check',
    description:
      'Best for founder-led B2B agencies that want their LinkedIn profile, website, proof, and CTA path checked.',
    href: '/free-audit',
    label: 'Open application',
    icon: ClipboardCheck,
    primary: true,
  },
  {
    title: 'Email',
    description:
      'Best for collaborations, partnerships, media, support, or a question that does not need the full funnel check form.',
    href: 'mailto:hello@ghufranhasan.com',
    label: 'Send email',
    icon: Mail,
  },
  {
    title: 'LinkedIn',
    description:
      'Best for a short professional conversation before you decide whether the funnel check is the right next step.',
    href: 'https://linkedin.com/in/ghufranhasan',
    label: 'Message on LinkedIn',
    icon: Linkedin,
  },
  {
    title: 'WhatsApp',
    description:
      'Best for quick direct communication when the topic is simple and does not need detailed qualification.',
    href: 'https://wa.me/?text=Hi%20Ghufran%2C%20I%20visited%20your%20website%20and%20want%20to%20ask%20a%20quick%20question.',
    label: 'Open WhatsApp',
    icon: MessageCircle,
  },
]

export default function ContactPage() {
  return (
    <article className="pt-20">
      <section className="relative overflow-hidden border-b border-orange-500/20 py-16 md:py-24">
        <div className="hero-premium-bg" aria-hidden="true">
          <div className="hero-silk" />
          <div className="hero-scanline" />
          <div className="hero-vignette" />
        </div>

        <div className="container-custom relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Contact', href: '/contact' },
            ]}
          />

          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={MessagesSquare} emphasis="strong" className="mb-6">
              Contact
            </SectionBadge>
            <h1 className="hero-headline text-4xl font-bebas leading-tight text-white md:text-6xl">
              Choose the right way to reach me
            </h1>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/72">
              If you want a LinkedIn-to-website funnel check, use the dedicated
              application page. For general questions, collaborations, or quick
              messages, use the direct contact options below.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2">
            {contactOptions.map((option) => (
              <Link
                key={option.title}
                href={option.href}
                className={`group rounded-2xl border p-6 transition-all hover:-translate-y-1 ${
                  option.primary
                    ? 'border-orange-500/45 bg-orange-500/12 shadow-glow'
                    : 'border-orange-500/20 bg-background-card hover:border-orange-500/40'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${
                      option.primary
                        ? 'bg-orange-500 text-white ring-orange-500/50'
                        : 'bg-orange-500/10 text-orange-400 ring-orange-500/25'
                    }`}
                  >
                    <option.icon size={22} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bebas text-white">
                      {option.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/64">
                      {option.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-300 transition-colors group-hover:text-orange-200">
                      {option.label}
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="texture-dots neon-purple py-16 md:py-20">
        <div className="container-custom">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <SectionBadge icon={ShieldCheck} className="mb-5">
                Clear path
              </SectionBadge>
              <h2 className="text-3xl font-bebas text-white md:text-5xl">
                The funnel check form lives only on one page
              </h2>
            </div>
            <div className="rounded-2xl border border-orange-500/20 bg-purple-950/50 p-6">
              <p className="leading-relaxed text-white/70">
                The full qualification form is intentionally kept on{' '}
                <Link href="/free-audit" className="font-semibold text-orange-300 hover:text-orange-200">
                  Apply for Funnel Check
                </Link>
                . This Contact page stays secondary so visitors do not see the same
                form twice or wonder which path is correct.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/free-audit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-glow-hover"
                >
                  Apply for Funnel Check
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="https://github.com/ghufranhasan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-500/30 px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-orange-500/10"
                >
                  GitHub
                  <Github size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
