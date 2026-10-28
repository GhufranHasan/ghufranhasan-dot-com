import Image from 'next/image'

import heroPortrait from '../../../public/images/ghufran-portrait.png'

import SectionBadge from '@/components/ui/SectionBadge'

import HeroJourneyScene from '@/components/visuals/HeroJourneyScene'
import HeroAudience from './HeroAudience'

import {

  ArrowRight,

  CheckCircle2,

  ClipboardCheck,

  Linkedin,

  MousePointerClick,

} from 'lucide-react'

const proofPoints = [

  'Offer, website message, proof, CTA, and follow-up reviewed together',

  'One focused buyer path from profile visit to qualified enquiry',

  'Tracking for the actions that matter before and after launch',

]

const journeySteps = [

  {

    title: 'LinkedIn',

    text: 'Warm profile interest',

    icon: Linkedin,

  },

  {

    title: 'Website',

    text: 'Same promise, clearer proof',

    icon: MousePointerClick,

  },

  {

    title: 'Application',

    text: 'Useful context before a call',

    icon: ClipboardCheck,

  },

]

export default function Hero() {
  return (

    <section id="home" className="hero-editorial relative flex min-h-screen items-center overflow-hidden border-b border-white/[0.06] pb-10 pt-24 sm:pb-14 lg:pb-10 lg:pt-28">

      <div className="hero-premium-bg" aria-hidden="true">

        <div className="hero-silk" />

        <div className="hero-scanline" />

        <div className="hero-vignette" />

      </div>

      <HeroJourneyScene />

      <div className="hero-prism hero-prism-one" aria-hidden="true" />

      <div className="hero-prism hero-prism-two" aria-hidden="true" />

      <div className="container-custom relative z-10 w-full">

        <div className="grid items-center gap-7 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr] xl:gap-16">

          <div

            className="relative z-20"

          >

            <div

              className="mb-4"

            >

              <SectionBadge icon={Linkedin}>

                <span className="sm:hidden">LinkedIn-to-website conversion</span>

                <span className="hidden sm:inline">LinkedIn-to-website conversion for founder-led B2B agencies</span>

              </SectionBadge>

            </div>

            <h1

              className="hero-headline mb-4 max-w-4xl text-4xl font-bebas font-medium leading-[1.04] text-white sm:text-5xl lg:text-5xl xl:text-6xl"

            >

              <span className="block">Your LinkedIn gets attention.</span>

              <span className="hero-gradient-text block">Your website should turn it into enquiries.</span>

            </h1>

            <p

              className="mb-4 max-w-2xl text-base leading-relaxed text-white/78 xl:text-lg"

            >

              I help LinkedIn-active service businesses turn warm profile visits into clearer website trust, stronger CTA paths, and qualified enquiries.

            </p>

            <div

              className="mb-5 inline-flex max-w-full flex-wrap items-center gap-2 border-l border-orange-500/55 py-1 pl-4 text-sm text-white/68"

            >

              <span>Best for LinkedIn-active</span>

              <span className="sr-only">B2B agency founders, consultants, coaches, and fractional leaders.</span>

              <HeroAudience />

            </div>

            <div

              className="flex flex-col gap-4 sm:flex-row"

            >

              <a href="/free-audit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-orange-500 to-orange-600 px-6 py-3 text-center text-base font-bold whitespace-nowrap text-white transition-shadow hover:shadow-glow-hover focus-visible:outline-2 focus-visible:outline-orange-400 sm:px-10 sm:py-4 sm:text-lg">

                Request Free Review

              </a>

              <a href="#audit-examples" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-orange-500 px-6 py-3 text-center text-base font-bold whitespace-nowrap text-white transition-colors hover:bg-orange-500/10 focus-visible:outline-2 focus-visible:outline-orange-400 sm:px-10 sm:py-4 sm:text-lg">

                See a Sample Audit <ArrowRight size={18} />

              </a>

            </div>

            <p

              className="mt-5 max-w-2xl text-sm leading-relaxed text-white/62"

            >

              One aligned message, one focused conversion page, one clear buyer path, and tracking for the actions that matter.

            </p>

          </div>

          <div

            className="relative mx-auto w-full max-w-sm sm:max-w-2xl lg:mx-0"

          >

            <div className="hero-dark-canvas-card group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-purple-950/40 via-[#0d031a]/85 to-[#07010f]/98 p-2 pb-0 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-orange-500/25 motion-reduce:hover:translate-y-0 sm:p-3 sm:pb-0">

              <div

                className="pointer-events-none absolute inset-x-10 top-0 h-48 bg-linear-to-b from-orange-500/10 via-purple-600/8 to-transparent blur-2xl"

                aria-hidden="true"

              />

              <div className="relative flex items-end justify-center pt-2">

                <Image

                  src={heroPortrait}

                  alt="Ghufran Hasan"

                  priority

                  sizes="(max-width: 639px) 72vw, 432px"

                  className="relative z-10 h-auto max-h-[23rem] w-auto max-w-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] sm:max-h-[36rem]"

                />

              </div>

            </div>

            <div

              className="hero-journey-dock relative z-20 -mt-8 ml-auto w-full rounded-xl border border-orange-500/25 bg-purple-950/88 p-3 shadow-[0_22px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:-mt-12 sm:w-[94%] sm:p-4"

            >

              <div className="mb-3 flex items-center justify-between gap-3">

                <p className="text-sm font-semibold text-white">Visitor path</p>

                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">

                  One journey

                </span>

              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">

                {journeySteps.map((step, index) => (

                  <div key={step.title} className="relative min-w-0 rounded-lg border border-white/10 bg-white/4 p-2.5 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-orange-500/30 hover:bg-orange-500/[0.06] motion-reduce:hover:translate-y-0 sm:rounded-xl sm:p-3">

                    {index < journeySteps.length - 1 && (

                      <ArrowRight className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-orange-400 sm:block" size={18} />

                    )}

                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 sm:h-9 sm:w-9">

                      <step.icon size={17} />

                    </div>

                    <p className="text-xs font-bold text-white sm:text-sm">{step.title}</p>

                    <p className="mt-1 text-[10px] leading-snug text-white/66 sm:text-xs">{step.text}</p>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

        <div

          className="mt-8 grid border-y border-white/10 sm:grid-cols-3 lg:mt-8"

        >

          {proofPoints.map((point, index) => (

            <div

              key={point}

              className="flex items-start gap-3 border-b border-white/10 py-4 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"

            >

              <span className="mt-0.5 text-xs font-bold text-orange-400">0{index + 1}</span>

              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-orange-500" />

              <span className="text-sm leading-relaxed text-white/72">{point}</span>

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}

