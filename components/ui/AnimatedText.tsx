'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  text: string
  type?: 'word' | 'character' | 'line'
  delay?: number
  duration?: number
  className?: string
  children?: React.ReactNode
}

export function AnimatedText({
  text,
  type = 'word',
  delay = 0,
  duration = 0.8,
  className,
  children
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedText, setAnimatedText] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    if (type === 'word') {
      const words = text.split(' ')
      let currentIndex = 0

      const interval = setInterval(() => {
        if (currentIndex < words.length) {
          setAnimatedText(words.slice(0, currentIndex + 1).join(' '))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, duration * 100)

      return () => clearInterval(interval)
    } else if (type === 'character') {
      let currentIndex = 0

      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setAnimatedText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, duration * 20)

      return () => clearInterval(interval)
    } else {
      setAnimatedText(text)
    }
  }, [isVisible, text, type, duration])

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      {children ? (
        <span className={cn(
          'inline-block transition-all duration-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          {children}
        </span>
      ) : (
        <span className={cn(
          'inline-block transition-all duration-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        )}>
          {animatedText}
          {type === 'character' && isVisible && animatedText.length < text.length && (
            <span className="animate-pulse">|</span>
          )}
        </span>
      )}
    </div>
  )
}

interface NumberCounterProps {
  value: number
  duration?: number
  delay?: number
  className?: string
  suffix?: string
}

export function NumberCounter({
  value,
  duration = 2,
  delay = 0,
  className,
  suffix = ''
}: NumberCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(value * easeOutCubic))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isVisible, value, duration])

  return (
    <div ref={ref} className={cn('font-bold', className)}>
      {count}{suffix}
    </div>
  )
}
