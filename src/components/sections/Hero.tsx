'use client'



import Image from 'next/image'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button'

import SectionBadge from '@/components/ui/SectionBadge'

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



const audiencePills = [

  'B2B agency founders',

  'consultants',

  'coaches',

  'fractional leaders',

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

  const [audienceIndex, setAudienceIndex] = useState(0)

  const shouldReduceMotion = useReducedMotion()



  useEffect(() => {

    if (shouldReduceMotion) return



    const interval = window.setInterval(() => {

      setAudienceIndex((current) => (current + 1) % audiencePills.length)

    }, 2200)



    return () => window.clearInterval(interval)

  }, [shouldReduceMotion])



  return (

    <section id="home" className="hero-editorial relative flex min-h-screen items-center overflow-hidden pb-14 pt-24 lg:pb-10 lg:pt-28">

      <div className="hero-premium-bg" aria-hidden="true">

        <div className="hero-silk" />

        <div className="hero-scanline" />

        <div className="hero-vignette" />

      </div>

      <div className="hero-prism hero-prism-one" aria-hidden="true" />

      <div className="hero-prism hero-prism-two" aria-hidden="true" />



      <div className="container-custom relative z-10 w-full">

        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] xl:gap-16">

          <motion.div

            initial={{ opacity: 0, x: -30 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.6 }}

            className="relative z-20"

          >

            <motion.div

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.2 }}

              className="mb-4"

            >

              <SectionBadge icon={Linkedin}>LinkedIn-to-website conversion for founder-led B2B agencies</SectionBadge>

            </motion.div>

            <motion.h1

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.3 }}

              className="hero-headline mb-4 max-w-4xl text-4xl font-bebas font-medium leading-[1.04] text-white sm:text-5xl lg:text-5xl xl:text-6xl"

            >

              <span className="block">Your LinkedIn gets attention.</span>

              <span className="hero-gradient-text block">Your website should turn it into enquiries.</span>

            </motion.h1>



            <motion.p

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.4 }}

              className="mb-4 max-w-2xl text-base leading-relaxed text-white/72 xl:text-lg"

            >

              I help LinkedIn-active service businesses turn warm profile visits into clearer website trust, stronger CTA paths, and qualified enquiries.

            </motion.p>



            <motion.div

              initial={{ opacity: 0, y: 18 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.43 }}

              className="mb-5 inline-flex max-w-full flex-wrap items-center gap-2 border-l border-orange-500/55 py-1 pl-4 text-sm text-white/62"

            >

              <span>Best for LinkedIn-active</span>

              <span className="sr-only">B2B agency founders, consultants, coaches, and fractional leaders.</span>

              <span className="relative inline-flex h-5 min-w-46 items-center overflow-hidden text-left font-semibold text-orange-300" aria-hidden="true">

                <AnimatePresence mode="wait" initial={false}>

                  <motion.span

                    key={audiencePills[audienceIndex]}

                    className="absolute left-0 whitespace-nowrap"

                    initial={{ opacity: 0, y: 8 }}

                    animate={{ opacity: 1, y: 0 }}

                    exit={{ opacity: 0, y: -8 }}

                    transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: 'easeOut' }}

                  >

                    {audiencePills[audienceIndex]}

                  </motion.span>

                </AnimatePresence>

              </span>

            </motion.div>



            <motion.div

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.5 }}

              className="flex flex-col gap-4 sm:flex-row"

            >

              <Button href="#audit-examples" variant="primary" size="large" className="whitespace-nowrap">

                See a Sample Audit <ArrowRight size={18} />

              </Button>

              <Button href="/free-audit" variant="secondary" size="large" className="whitespace-nowrap">

                Request Free Review

              </Button>

            </motion.div>



            <motion.p

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.53 }}

              className="mt-5 max-w-2xl text-sm leading-relaxed text-white/52"

            >

              One aligned message, one focused conversion page, one clear buyer path, and tracking for the actions that matter.

            </motion.p>

          </motion.div>



          <motion.div

            initial={{ opacity: 0, x: 30 }}

            animate={{ opacity: 1, x: 0 }}

            transition={{ duration: 0.6, delay: 0.2 }}

            className="relative mx-auto w-full max-w-2xl lg:mx-0"

          >

            <div className="hero-dark-canvas-card group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-purple-950/40 via-[#0d031a]/85 to-[#07010f]/98 p-3 pb-0 shadow-[0_24px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-all duration-500 hover:border-orange-500/25">

              <div

                className="pointer-events-none absolute -top-12 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-br from-orange-500/15 via-purple-600/20 to-transparent blur-3xl"

                aria-hidden="true"

              />

              <div className="relative flex items-end justify-center pt-2">

                <Image

                  src="/images/ghufran-portrait.png"

                  alt="Ghufran Hasan"

                  width={620}

                  height={740}

                  priority

                  className="relative z-10 h-auto w-full max-w-125 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)]"

                />

              </div>

            </div>

            <motion.div

              initial={{ opacity: 0, y: 24 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.55, duration: 0.5 }}

              className="hero-journey-dock relative z-20 -mt-12 ml-auto w-[94%] rounded-2xl border border-orange-500/25 bg-purple-950/88 p-4 shadow-[0_22px_60px_rgba(0,0,0,0.38)] backdrop-blur-xl"

            >

              <div className="mb-3 flex items-center justify-between gap-3">

                <p className="text-sm font-semibold text-white">Visitor path</p>

                <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-300">

                  One journey

                </span>

              </div>

              <div className="grid gap-3 sm:grid-cols-3">

                {journeySteps.map((step, index) => (

                  <div key={step.title} className="relative rounded-xl border border-white/10 bg-white/4 p-3">

                    {index < journeySteps.length - 1 && (

                      <ArrowRight className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-orange-400 sm:block" size={18} />

                    )}

                    <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">

                      <step.icon size={17} />

                    </div>

                    <p className="text-sm font-bold text-white">{step.title}</p>

                    <p className="mt-1 text-xs leading-snug text-white/60">{step.text}</p>

                  </div>

                ))}

              </div>

            </motion.div>

          </motion.div>

        </div>



        <motion.div

          initial={{ opacity: 0, y: 20 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ delay: 0.65, duration: 0.5 }}

          className="mt-10 grid border-y border-white/10 sm:grid-cols-3 lg:mt-8"

        >

          {proofPoints.map((point, index) => (

            <div

              key={point}

              className="flex items-start gap-3 border-b border-white/10 py-4 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"

            >

              <span className="mt-0.5 text-xs font-bold text-orange-400">0{index + 1}</span>

              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-orange-500" />

              <span className="text-sm leading-relaxed text-white/66">{point}</span>

            </div>

          ))}

        </motion.div>

      </div>

    </section>

  )

}

