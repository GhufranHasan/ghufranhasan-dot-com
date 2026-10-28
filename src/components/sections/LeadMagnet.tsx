import Link from 'next/link'
import { ArrowRight, Check, ScanSearch } from 'lucide-react'

export default function LeadMagnet() {
  return (
    <aside
      aria-labelledby="footer-review-title"
      className="relative self-start overflow-hidden rounded-lg border border-orange-500/40 bg-purple-950/80 p-6 text-left shadow-[inset_0_3px_0_#ff8403,0_12px_36px_rgba(0,0,0,0.18)]"
    >
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-orange-300">
        <ScanSearch size={20} aria-hidden="true" />
        A clearer next step
      </div>
      <h2 id="footer-review-title" className="text-2xl font-medium leading-tight text-white">Free Funnel Review</h2>
      <p className="mt-3 text-sm leading-7 text-white/75">
        Find the first gap between LinkedIn attention and your website enquiry path.
      </p>
      <ul className="my-5 space-y-2.5 text-sm text-white/80">
        {['Your profile promise', 'Your website message', 'Your next-step clarity'].map((item) => (
          <li key={item} className="flex items-center gap-2.5"><Check size={16} className="shrink-0 text-orange-400" aria-hidden="true" />{item}</li>
        ))}
      </ul>
      <Link
        href="/free-audit#request-audit"
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-purple-950 transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
      >
        Request free review <ArrowRight size={17} aria-hidden="true" />
      </Link>
      <p className="mt-3 text-center text-xs leading-6 text-white/60">One application. No pressure.</p>
    </aside>
  )
}
