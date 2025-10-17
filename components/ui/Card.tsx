'use client'

import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  tilt?: boolean
  depth?: 'none' | 'low' | 'medium' | 'high'
  glowOnHover?: boolean
  children: React.ReactNode
}

export function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  tilt = false,
  depth = 'none',
  glowOnHover = false,
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

  const baseClasses = 'transition-all duration-300'

  const variantClasses = {
    default: 'bg-dark-800 border border-dark-700',
    glass: 'glass-card',
    bordered: 'bg-dark-800 border-2 border-dark-600',
    elevated: 'bg-dark-800 shadow-lg'
  }

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const depthClasses = {
    none: '',
    low: 'shadow-md',
    medium: 'shadow-lg',
    high: 'shadow-xl'
  }

  const hoverClasses = hover ? 'hover:scale-[1.02] hover:shadow-card-hover' : ''
  const tiltClasses = tilt ? 'tilt-hover gpu-accelerated' : ''
  const glowClasses = glowOnHover && isHovered ? 'shadow-glow-primary-lg' : ''

  const cardClasses = cn(
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    depthClasses[depth],
    hoverClasses,
    tiltClasses,
    glowClasses,
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
