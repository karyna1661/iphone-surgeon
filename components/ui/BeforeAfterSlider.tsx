'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
  initialPosition?: number
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className,
  initialPosition = 50
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [imageError, setImageError] = useState({ before: false, after: false })
  const containerRef = useRef<HTMLDivElement>(null)

  // Fallback image for when Sanity images fail to load
  const fallbackImage = '/images/technician/technician-portrait.jpg'
  
  // Check if images are valid URLs
  const hasValidImages = beforeImage && afterImage && 
    beforeImage !== '' && afterImage !== '' &&
    !beforeImage.includes('undefined') && !afterImage.includes('undefined')

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setHasInteracted(true)
    
    // Haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(10)
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [isDragging])

  // Throttle updates for better performance
  const throttledUpdate = useCallback(
    (() => {
      let ticking = false
      return (percentage: number) => {
        if (!ticking) {
          requestAnimationFrame(() => {
            setSliderPosition(percentage)
            ticking = false
          })
          ticking = true
        }
      }
    })(),
    []
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setHasInteracted(true)
    
    // Haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(10)
    }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percentage)
  }, [isDragging])

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    setHasInteracted(true)
    
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setSliderPosition(prev => Math.max(0, prev - 5))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setSliderPosition(prev => Math.min(100, prev + 5))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setSliderPosition(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setSliderPosition(100)
    } else if (e.key === 'PageUp') {
      e.preventDefault()
      setSliderPosition(prev => Math.max(0, prev - 10))
    } else if (e.key === 'PageDown') {
      e.preventDefault()
      setSliderPosition(prev => Math.min(100, prev + 10))
    }
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

  // Remove pulse animation after first interaction
  useEffect(() => {
    if (hasInteracted) {
      const timer = setTimeout(() => {
        setHasInteracted(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [hasInteracted])

  // Handle image load errors
  const handleImageError = (imageType: 'before' | 'after') => {
    setImageError(prev => ({ ...prev, [imageType]: true }))
  }

  // If no valid images, show a placeholder
  if (!hasValidImages) {
    return (
      <div className={cn(
        'relative aspect-[3/2] overflow-hidden rounded-xl select-none bg-dark-800 flex items-center justify-center',
        className
      )}>
        <div className="text-center text-light-400">
          <div className="w-16 h-16 mx-auto mb-4 bg-dark-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm">Gallery images coming soon</p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative aspect-[3/2] overflow-hidden rounded-xl select-none',
        className
      )}
    >
      {/* After Image (Bottom Layer) */}
      <div className="absolute inset-0 gpu-accelerated">
        <Image
          src={imageError.after ? fallbackImage : afterImage}
          alt="After repair image"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          onError={() => handleImageError('after')}
        />
      </div>

      {/* Before Image (Top Layer) */}
      <div 
        className={cn(
          "absolute inset-0 gpu-accelerated",
          isDragging && "will-change-clip-path"
        )}
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          transition: isDragging ? 'none' : 'clip-path 0.4s cubic-bezier(0.45, 0, 0.55, 1)'
        }}
      >
        <Image
          src={imageError.before ? fallbackImage : beforeImage}
          alt="Before repair image"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          onError={() => handleImageError('before')}
        />
      </div>

      {/* Slider Handle */}
      <div
        className={cn(
          'absolute top-0 bottom-0 w-0.5 bg-primary-500',
          'cursor-ew-resize transition-all duration-300',
          isDragging ? 'cursor-grabbing shadow-glow-primary-lg' : 'hover:scale-110 shadow-[0_0_10px_rgba(0,217,255,0.5)]'
        )}
        style={{ 
          left: `${sliderPosition}%`,
          transition: isDragging ? 'none' : 'left 0.3s ease'
        }}
      >
        {/* Handle Button */}
        <div
          className={cn(
            'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
            'w-12 h-12 bg-primary-500 border-2 border-white rounded-full',
            'shadow-glow-primary flex items-center justify-center',
            'hover:scale-110 transition-transform duration-200 gpu-accelerated',
            isDragging && 'scale-125 shadow-glow-primary-lg',
            !hasInteracted && 'animate-pulse-slow'
          )}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onKeyDown={handleKeyDown}
          role="slider"
          aria-label="Image comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={sliderPosition}
          tabIndex={0}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none"
          >
            <path d="M8 3L4 7l4 4M16 3l4 4-4 4" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-dark-900/70 backdrop-blur-md rounded-lg text-xs text-light-50">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 px-3 py-1 bg-dark-900/70 backdrop-blur-md rounded-lg text-xs text-light-50">
        {afterLabel}
      </div>
    </div>
  )
}
