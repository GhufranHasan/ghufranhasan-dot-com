import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpenText, FileSearch, ListChecks, Route } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SectionBadge from '@/components/ui/SectionBadge'

export const metadata: Metadata = {
  title: 'Blog | LinkedIn-to-Website Conversion Resources',
  description:
    'Resource hub for LinkedIn-to-website conversion strategy, checklist pages, website comparison studies, and CTA clarity.',
  alternates: {
    canonical: '/blog',
  },
}

const posts = [
  {
    icon: ListChecks,
    title: 'LinkedIn-to-Website Funnel Checklist',
    text: 'Score your profile, website, and CTA path with a public 10-point checklist.',
    href: '/resources/linkedin-website-funnel-checklist',
  },
  {
    icon: FileSearch,
    title: 'LinkedIn Personal Brand Website Examples',
    text: 'Study how public websites handle positioning, proof, pricing, and CTA clarity.',
    href: '/linkedin-website-examples',
  },
  {
    icon: Route,
    title: 'Website Conversion Strategy',
    text: 'Understand why the website should become the decision room after LinkedIn creates attention.',
    href: '/website-conversion-strategy',
  },
]

export default function BlogPage() {
  return (
    <article className="pt-20">
      <header className="texture-grid neon-deep border-b border-orange-500/20 py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/#home' },
              { label: 'Blog', href: '/blog' },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge icon={BookOpenText} className="mb-6">
              Blog and resources
            </SectionBadge>
            <h1 className="text-4xl font-bebas leading-tight text-white md:text-6xl">
              Practical Notes on Turning LinkedIn Attention Into Enquiries
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70">
              This page gives the blog URL a real home while the resource library grows.
            </p>
          </div>
        </div>
      </header>

      <section className="texture-dots neon-purple py-16 md:py-24">
        <div className="container-custom">
          <div className="grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.title} href={post.href} className="glass-card block border-orange-500/20 p-6 transition-all hover:-translate-y-1 hover:border-orange-500/45">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <post.icon size={24} />
                </div>
                <h2 className="mt-5 text-2xl font-bebas text-white">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/68">{post.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-300">
                  Read more
                  <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
