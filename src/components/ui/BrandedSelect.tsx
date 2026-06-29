'use client'

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

type BrandedSelectProps = {
  label: string
  name: string
  options: readonly string[]
  placeholder: string
  className?: string
}

export default function BrandedSelect({
  label,
  name,
  options,
  placeholder,
  className,
}: BrandedSelectProps) {
  const selectId = useId()
  const labelId = `${selectId}-label`
  const listboxId = `${selectId}-listbox`
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [menuPlacement, setMenuPlacement] = useState<'up' | 'down'>('down')
  const [menuMaxHeight, setMenuMaxHeight] = useState(288)

  const updateMenuPlacement = useCallback(() => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const viewportPadding = 16
    const preferredHeight = Math.min(288, options.length * 48 + 16)
    const footerTop = document.querySelector('footer')?.getBoundingClientRect().top
    const lowerBoundary =
      footerTop !== undefined && footerTop > rect.bottom
        ? Math.min(window.innerHeight, footerTop)
        : window.innerHeight
    const spaceBelow = lowerBoundary - rect.bottom - viewportPadding
    const spaceAbove = rect.top - viewportPadding
    const shouldOpenUp =
      spaceBelow < preferredHeight && spaceAbove > spaceBelow
    const availableSpace = shouldOpenUp ? spaceAbove : spaceBelow

    setMenuPlacement(shouldOpenUp ? 'up' : 'down')
    setMenuMaxHeight(
      Math.max(96, Math.min(preferredHeight, availableSpace - 8))
    )
  }, [options.length])

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('resize', updateMenuPlacement)
    window.addEventListener('scroll', updateMenuPlacement, true)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('resize', updateMenuPlacement)
      window.removeEventListener('scroll', updateMenuPlacement, true)
    }
  }, [isOpen, updateMenuPlacement])

  const openMenu = () => {
    const selectedIndex = options.indexOf(value)
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
    updateMenuPlacement()
    setIsOpen(true)
  }

  const chooseOption = (option: string) => {
    setValue(option)
    setActiveIndex(options.indexOf(option))
    setIsOpen(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()

      if (!isOpen) {
        openMenu()
        return
      }

      const direction = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((current) => {
        const next = current + direction
        if (next < 0) return options.length - 1
        if (next >= options.length) return 0
        return next
      })
      return
    }

    if (event.key === 'Home' && isOpen) {
      event.preventDefault()
      setActiveIndex(0)
      return
    }

    if (event.key === 'End' && isOpen) {
      event.preventDefault()
      setActiveIndex(options.length - 1)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()

      if (isOpen) {
        chooseOption(options[activeIndex])
      } else {
        openMenu()
      }
    }
  }

  return (
    <div
      ref={rootRef}
      className={cn('relative', isOpen && 'z-50', className)}
    >
      <span id={labelId} className="block text-sm font-semibold text-white">
        {label}
      </span>
      <input type="hidden" name={name} value={value} />

      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-labelledby={labelId}
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-required="true"
        aria-activedescendant={
          isOpen ? `${selectId}-option-${activeIndex}` : undefined
        }
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
        className={cn(
          'mt-2 flex min-h-12 w-full items-center justify-between gap-3 rounded-lg border bg-purple-950/60 px-4 py-3 text-left text-sm outline-none transition-all',
          isOpen
            ? 'border-orange-500/65 bg-purple-950 shadow-[0_0_0_3px_rgba(255,132,3,0.1)]'
            : 'border-orange-500/20 hover:border-orange-500/40 hover:bg-purple-950/80'
        )}
      >
        <span
          className={cn(
            'min-w-0 flex-1 leading-snug',
            value ? 'font-medium text-white' : 'text-white/38'
          )}
        >
          {value || placeholder}
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-orange-500/10 text-orange-400">
          <ChevronDown
            size={16}
            className={cn('transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </span>
      </button>

      {isOpen && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          style={{ maxHeight: menuMaxHeight }}
          className={cn(
            'absolute left-0 right-0 z-70 overflow-y-auto rounded-xl border border-orange-500/35 bg-[#0a1332] p-2 shadow-[0_22px_60px_rgba(0,0,0,0.55),0_0_24px_rgba(255,132,3,0.12)]',
            menuPlacement === 'up'
              ? 'bottom-full mb-2'
              : 'top-full mt-2'
          )}
        >
          {options.map((option, index) => {
            const isSelected = option === value
            const isActive = index === activeIndex

            return (
              <li
                id={`${selectId}-option-${index}`}
                key={option}
                role="option"
                aria-selected={isSelected}
                onPointerDown={(event) => {
                  event.preventDefault()
                  chooseOption(option)
                }}
                onPointerMove={() => setActiveIndex(index)}
                className={cn(
                  'flex cursor-pointer items-start justify-between gap-3 rounded-lg px-3 py-3 text-sm leading-snug transition-colors',
                  isActive
                    ? 'bg-orange-500/15 text-white'
                    : 'text-white/72 hover:bg-white/5 hover:text-white',
                  isSelected && 'font-semibold text-orange-200'
                )}
              >
                <span>{option}</span>
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                    isSelected
                      ? 'border-orange-500 bg-orange-500 text-white'
                      : 'border-white/10 text-transparent'
                  )}
                >
                  <Check size={12} />
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
