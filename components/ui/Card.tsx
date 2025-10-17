'use client'

import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered' | 'elevated' | 'premium'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  tilt?: boolean
  depth?: 'none' | 'low' | 'medium' | 'high' | 'premium'
  glowOnHover?: boolean
  shimmer?: boolean
  gradientBorder?: boolean
  children: React.ReactNode
}

export function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  tilt = false,
  depth = 'none',
  glowOnHover = false,
  shimmer = false,
  gradientBorder = false,
  className,
  children,
  ...props
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!tilt || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }, [tilt])

  const handleMouseLeave = useCallback(() => {
    if (tilt && cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }
    setIsHovered(false)
  }, [tilt])

  const baseClasses = 'transition-all duration-300 relative rounded-2xl'

  const variantClasses = {
    default: 'bg-surface-2 border border-surface-3',
    glass: 'glass-card',
    bordered: 'bg-surface-2 border-2 border-surface-3',
    elevated: 'bg-surface-2 shadow-depth-2',
    premium: 'glass-premium'
  }

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  }

  const depthClasses = {
    none: '',
    low: 'shadow-depth-1',
    medium: 'shadow-depth-2',
    high: 'shadow-depth-3',
    premium: 'shadow-depth-4'
  }

  const hoverClasses = hover ? 'hover:scale-[1.02] hover:shadow-card-lift hover:-translate-y-1' : ''
  const tiltClasses = tilt ? 'tilt-hover' : ''
  const glowClasses = glowOnHover && isHovered ? 'shadow-glow-primary-lg' : ''
  const shimmerClasses = shimmer ? 'card-shimmer' : ''
  const gradientBorderClasses = gradientBorder ? 'before:absolute before:inset-0 before:rounded-inherit before:p-[1px] before:bg-gradient-to-r before:from-primary-500 before:to-primary-600 before:-z-10' : ''

  const cardClasses = cn(
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    depthClasses[depth],
    hoverClasses,
    tiltClasses,
    glowClasses,
    shimmerClasses,
    gradientBorderClasses,
    className
  )

  return (
    <div
      ref={cardRef}
      className={cardClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  )
}
