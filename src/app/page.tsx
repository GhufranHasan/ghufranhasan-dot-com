'use client'

import Hero from '@/components/sections/Hero'
import AuthorityBar from '@/components/sections/AuthorityBar'
import PainAgitation from '@/components/sections/PainAgitation'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import CaseStudies from '@/components/sections/CaseStudies'
import WhyChooseMe from '@/components/sections/WhyChooseMe'
import DifferentView from '@/components/sections/DifferentView'
import Packages from '@/components/sections/Packages'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <AuthorityBar />
      <PainAgitation />
      <Services />
      <About />
      <CaseStudies />
      <WhyChooseMe />
      <Packages />
      <Process />
      <DifferentView />
      <FAQ />
      <Contact />
    </>
  )
}
