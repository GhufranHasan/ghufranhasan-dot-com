'use client'

import { useEffect, useState } from 'react'

const audiences = ['B2B agency founders', 'consultants', 'coaches', 'fractional leaders']

export default function HeroAudience() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let interval: ReturnType<typeof setInterval> | undefined
    const update = () => {
      clearInterval(interval)
      if (!reducedMotion.matches && document.visibilityState === 'visible') {
        interval = setInterval(() => setIndex((current) => (current + 1) % audiences.length), 2200)
      }
    }
    update()
    reducedMotion.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    return () => {
      clearInterval(interval)
      reducedMotion.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return (
    <span className="relative inline-flex h-5 min-w-40 items-center overflow-hidden text-left font-semibold text-orange-300 sm:min-w-46" aria-hidden="true">
      <span key={index} className="absolute left-0 whitespace-nowrap">{audiences[index]}</span>
    </span>
  )
}
