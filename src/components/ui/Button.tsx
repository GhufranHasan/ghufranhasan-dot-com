'use client'

import { motion, HTMLMotionProps, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import React from 'react'

type SharedButtonProps = {
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'large'
  children: React.ReactNode
  className?: string
}

type ButtonProps =
  | (SharedButtonProps & Omit<HTMLMotionProps<'a'>, 'onDrag' | 'onDragStart' | 'onDragEnd'> & { href: string })
  | (SharedButtonProps & Omit<HTMLMotionProps<'button'>, 'onDrag' | 'onDragStart' | 'onDragEnd'> & { href?: undefined })

export const Button: React.FC<ButtonProps> = (props) => {
  const shouldReduceMotion = useReducedMotion()
  const {
    variant = 'primary',
    size = 'default',
    children,
    className,
  } = props

  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg text-center font-bold transition-[color,background-color,border-color,box-shadow,transform] duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transform-none"

  const variants = {
    primary: "bg-linear-to-r from-orange-500 to-orange-600 text-white hover:-translate-y-0.5 hover:shadow-glow-hover motion-reduce:hover:translate-y-0",
    secondary: "bg-transparent border-2 border-orange-500 text-white hover:bg-orange-500/10 hover:-translate-y-0.5 hover:shadow-glow motion-reduce:hover:translate-y-0",
  }

  const sizes = {
    default: "px-6 py-3 text-base",
    large: "px-10 py-4 text-lg",
  }

  const buttonClasses = cn(baseStyles, variants[variant], sizes[size], className)

  if ('href' in props && props.href) {
    const anchorProps = { ...props } as Record<string, unknown>
    const href = anchorProps.href as string
    delete anchorProps.href
    delete anchorProps.variant
    delete anchorProps.size
    delete anchorProps.children
    delete anchorProps.className

    return (
      <motion.a
        href={href}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
        className={buttonClasses}
        {...(anchorProps as Omit<HTMLMotionProps<'a'>, 'onDrag' | 'onDragStart' | 'onDragEnd'>)}
      >
        {children}
      </motion.a>
    )
  }

  const buttonProps = { ...props } as Record<string, unknown>
  delete buttonProps.href
  delete buttonProps.variant
  delete buttonProps.size
  delete buttonProps.children
  delete buttonProps.className

  return (
    <motion.button
      whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
      className={buttonClasses}
      {...(buttonProps as Omit<HTMLMotionProps<'button'>, 'onDrag' | 'onDragStart' | 'onDragEnd'>)}
    >
      {children}
    </motion.button>
  )
}
