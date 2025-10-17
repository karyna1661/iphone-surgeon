'use client'

import { useState, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  href?: string
  magnetic?: boolean
  ripple?: boolean
  glowIntensity?: 'none' | 'low' | 'medium' | 'high'
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

  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none'

  const variantClasses = {
    primary: 'bg-primary-500 text-dark-800 hover:bg-primary-600 active:scale-95',
    secondary: 'bg-dark-700 text-light-50 hover:bg-dark-600 active:scale-95',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-dark-800 active:scale-95',
    ghost: 'bg-transparent text-light-50 hover:bg-dark-800 active:scale-95'
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  }

  const glowClasses = {
    none: '',
    low: 'hover:shadow-glow-primary',
    medium: 'hover:shadow-glow-primary-lg',
    high: 'hover:shadow-glow-primary-xl'
  }

  const magneticClasses = magnetic ? 'magnetic-hover will-change-transform' : ''
  const rippleClasses = ripple ? 'ripple-effect overflow-hidden' : ''

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    glowClasses[glowIntensity],
    magneticClasses,
    rippleClasses,
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
