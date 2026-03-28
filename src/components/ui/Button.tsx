'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'
import React from 'react'

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "onDrag" | "onDragStart" | "onDragEnd"> {
  variant?: 'primary' | 'secondary'
  size?: 'default' | 'large'
  children: React.ReactNode
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'default',
  children,
  className,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-300 cursor-pointer"
  
  const variants = {
    primary: "bg-linear-to-r from-orange-500 to-orange-600 text-white hover:translate-y-[-3px] hover:shadow-glow-hover",
    secondary: "bg-transparent border-2 border-orange-500 text-white hover:bg-orange-500/10 hover:translate-y-[-3px] hover:shadow-glow",
  }
  
  const sizes = {
    default: "px-6 py-3 text-base",
    large: "px-10 py-4 text-lg",
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  )
}