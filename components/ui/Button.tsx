'use client'

import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'premium'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  href?: string
  magnetic?: boolean
  ripple?: boolean
  glowIntensity?: 'none' | 'low' | 'medium' | 'high'
  shimmer?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  href,
  magnetic = false,
  ripple = false,
  glowIntensity = 'none',
  shimmer = false,
  className,
  children,
  onClick,
  disabled,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [ripplePosition, setRipplePosition] = useState<{ x: number; y: number } | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!magnetic || !buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    // Limit the magnetic effect to 30% of the distance
    const maxDistance = Math.min(rect.width, rect.height) * 0.3
    const distance = Math.sqrt(x * x + y * y)
    
    if (distance <= maxDistance) {
      const scale = 1 - (distance / maxDistance) * 0.1
      const translateX = x * 0.3
      const translateY = y * 0.3
      
      buttonRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`
    }
  }, [magnetic])

  const handleMouseLeave = useCallback(() => {
    if (magnetic && buttonRef.current) {
      buttonRef.current.style.transform = 'translate(0px, 0px) scale(1)'
    }
    setIsHovered(false)
  }, [magnetic])

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setRipplePosition({ x, y })
      
      // Clear ripple after animation
      setTimeout(() => setRipplePosition(null), 600)
    }
    
    if (onClick) {
      onClick(e)
    }
  }, [ripple, onClick])

  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none relative overflow-hidden'

  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:scale-95 shadow-depth-2 hover:shadow-depth-3',
    secondary: 'bg-surface-2 text-light-50 hover:bg-surface-3 active:scale-95 shadow-depth-1 hover:shadow-depth-2',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white active:scale-95 shadow-depth-1 hover:shadow-depth-2',
    ghost: 'bg-transparent text-light-50 hover:bg-surface-2 active:scale-95',
    premium: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 active:scale-95 shadow-depth-3 hover:shadow-depth-4 border border-primary-400/20'
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
    xl: 'px-10 py-5 text-xl rounded-3xl'
  }

  const glowClasses = {
    none: '',
    low: 'hover:shadow-glow-primary',
    medium: 'hover:shadow-glow-primary-lg',
    high: 'hover:shadow-glow-primary-xl'
  }

  const magneticClasses = magnetic ? 'magnetic-element will-change-transform' : ''
  const rippleClasses = ripple ? 'ripple-effect' : ''
  const shimmerClasses = shimmer ? 'card-shimmer' : ''

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    glowClasses[glowIntensity],
    magneticClasses,
    rippleClasses,
    shimmerClasses,
    className
  )

  const content = (
    <>
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
      {ripple && ripplePosition && (
        <div
          className="absolute w-0 h-0 bg-white/30 rounded-full animate-ping pointer-events-none"
          style={{
            left: ripplePosition.x,
            top: ripplePosition.y,
            transform: 'translate(-50%, -50%)',
            animation: 'ripple 0.6s ease-out'
          }}
        />
      )}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={cn(buttonClasses, 'no-underline')}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...(props as any)}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef}
      className={buttonClasses}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  )
}
