import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Compass } from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'

export const metadata: Metadata = {
  title: { absolute: 'Page Not Found | Ghufran Hasan' },
  description:
    'Choose the right page for services, process, proof, pricing, FAQ, resources, or the Funnel Review application.',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
      'max-snippet': -1,
    },
  },
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Proof', href: '/proof' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Resources', href: '/resources' },
  { label: 'Free Funnel Review', href: '/free-audit' },
]

export default function NotFound() {
  return (
    <article className="pt-20">
      <section className="texture-grid neon-deep min-h-[calc(100svh-5rem)] py-16 md:py-24">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <SectionBadge icon={Compass} className="mb-6">
              Page not found
            </SectionBadge>
            <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
              This page could not be found
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              The link may be outdated or the address may be incorrect.
              Choose a page below to continue, or return to the homepage.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-orange-500/20 bg-purple-950/45 p-5 text-white transition-all hover:-translate-y-1 hover:border-orange-500/45"
              >
                <span className="font-bold">{link.label}</span>
                <span className="mt-3 flex items-center gap-2 text-sm text-orange-300">
                  Open page
                  <ArrowRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
