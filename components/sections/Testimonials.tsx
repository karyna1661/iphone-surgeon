'use client'

import { useState, useEffect } from 'react'
import { Section, Card, AnimatedText } from '@/components/ui'
import { TestimonialItem } from '@/lib/sanity/types'
import { useIntersectionObserver } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { User, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TestimonialsProps {
  items: TestimonialItem[]
}

export function Testimonials({ items }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  
  // Scroll-triggered animations
  const { ref: headerRef, isIntersecting: headerVisible } = useIntersectionObserver<HTMLDivElement>({ 
    threshold: 0.2, 
    triggerOnce: true 
  })
  
  const { ref: carouselRef, isIntersecting: carouselVisible } = useIntersectionObserver<HTMLDivElement>({ 
    threshold: 0.1, 
    triggerOnce: true 
  })

  // Auto-rotate carousel every 20 seconds
  useEffect(() => {
    if (isPaused || items.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      )
    }, 20000)

    return () => clearInterval(interval)
  }, [isPaused, items.length])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    )
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  // Get testimonials to display (3 on desktop, 1 on mobile)
  const getDisplayTestimonials = () => {
    if (!items || items.length === 0) return []
    const testimonials = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % items.length
      if (items[index]) {
        testimonials.push(items[index])
      }
    }
    return testimonials
  }

  // Early return if no testimonials
  if (!items || items.length === 0) {
    return (
      <Section spacing="lg" background="default">
        <div className="text-center py-20">
          <h2 className="text-display-md xs:text-display-lg sm:text-display-lg font-bold text-light-50 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg xs:text-xl sm:text-2xl text-light-300 max-w-4xl mx-auto mb-8">
            Real feedback from real customers who trusted us with their devices.
          </p>
          <div className="text-light-400 text-lg">
            Testimonials coming soon...
          </div>
        </div>
      </Section>
    )
  }

  return (
    <Section spacing="lg" background="default">
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-16">
        <h2 className={cn(
          "text-display-md xs:text-display-lg sm:text-display-lg font-bold text-light-50 mb-6 transition-all duration-1000",
          headerVisible ? "animate-blurFadeIn" : "opacity-0 blur-sm"
        )}>
          <AnimatedText 
            text="What Our Clients Say"
            type="word"
            delay={200}
            duration={0.6}
          />
        </h2>
        <div className={cn(
          "text-lg xs:text-xl sm:text-2xl text-light-300 text-center max-w-4xl mx-auto mb-12 transition-all duration-1000",
          headerVisible ? "animate-slideUp animation-delay-400" : "opacity-0 translate-y-8"
        )}>
          <AnimatedText 
            text="Real feedback from real customers who trusted us with their devices."
            type="character"
            delay={800}
            duration={1.0}
          />
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div 
        ref={carouselRef}
        className={cn(
          "relative transition-all duration-1000",
          carouselVisible && "will-change-transform"
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Desktop: Show 3 testimonials */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8 mb-12">
          <AnimatePresence mode="wait">
            {getDisplayTestimonials().map((item, index) => (
              <motion.div
                key={`${item.id}-${currentIndex}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  variant="premium"
                  padding="xl"
                  hover={true}
                  tilt
                  depth="premium"
                  glowOnHover
                  shimmer
                  gradientBorder
                  className="h-full group"
                >
                  {/* Quote */}
                  <blockquote className="text-light-200 mb-8 text-lg leading-relaxed group-hover:text-light-100 transition-colors duration-300">
                    "{item.quote}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {item.avatar ? (
                        <img 
                          src={item.avatar} 
                          alt={item.name}
                          className="w-full h-full rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <User className="w-8 h-8 text-primary-400 mx-auto mb-1" />
                          <div className="text-xs text-light-600 bg-surface-2 px-2 py-1 rounded-full">
                            Photo Coming Soon
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Author Details */}
                    <div className="flex-1">
                      <h4 className="font-semibold text-light-50 text-lg group-hover:text-primary-300 transition-colors duration-300">
                        {item.name}
                      </h4>
                      <p className="text-light-400 text-base mb-1">
                        {item.role}
                      </p>
                      {item.handle && (
                        <p className="text-primary-400 text-sm font-medium">
                          {item.handle}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile: Show 1 testimonial */}
        <div className="lg:hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                variant="premium"
                padding="xl"
                hover={true}
                tilt
                depth="premium"
                glowOnHover
                shimmer
                gradientBorder
                className="group"
              >
                {/* Quote */}
                <blockquote className="text-light-200 mb-8 text-lg leading-relaxed group-hover:text-light-100 transition-colors duration-300">
                  "{items[currentIndex]?.quote || 'No testimonial available'}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {items[currentIndex]?.avatar ? (
                      <img 
                        src={items[currentIndex].avatar} 
                        alt={items[currentIndex].name}
                        className="w-full h-full rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <User className="w-8 h-8 text-primary-400 mx-auto mb-1" />
                        <div className="text-xs text-light-600 bg-surface-2 px-2 py-1 rounded-full">
                          Photo Coming Soon
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Author Details */}
                  <div className="flex-1">
                    <h4 className="font-semibold text-light-50 text-lg group-hover:text-primary-300 transition-colors duration-300">
                      {items[currentIndex]?.name}
                    </h4>
                    <p className="text-light-400 text-base mb-1">
                      {items[currentIndex]?.role}
                    </p>
                    {items[currentIndex]?.handle && (
                      <p className="text-primary-400 text-sm font-medium">
                        {items[currentIndex].handle}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-light-400 hover:text-primary-400 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex 
                    ? "bg-primary-400 scale-125" 
                    : "bg-surface-3 hover:bg-surface-2"
                )}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full bg-surface-2 hover:bg-surface-3 flex items-center justify-center text-light-400 hover:text-primary-400 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Trust Badge */}
      <div className={cn(
        "text-center transition-all duration-1000",
        carouselVisible ? "animate-fadeIn animation-delay-800" : "opacity-0"
      )}>
        <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500/10 to-primary-600/5 border border-primary-500/20 rounded-2xl backdrop-blur-sm">
          <Star className="w-6 h-6 text-primary-400" />
          <span className="text-light-200 text-lg font-medium">
            Trusted by 500+ customers in Lagos
          </span>
        </div>
      </div>
    </Section>
  )
}
