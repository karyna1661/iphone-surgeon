'use client'

import { Section, Card } from '@/components/ui'
import { TestimonialItem } from '@/lib/sanity/types'
import { useIntersectionObserver } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface TestimonialsProps {
  items: TestimonialItem[]
}

export function Testimonials({ items }: TestimonialsProps) {
  // Scroll-triggered animations
  const { ref: headerRef, isIntersecting: headerVisible } = useIntersectionObserver<HTMLDivElement>({ 
    threshold: 0.2, 
    triggerOnce: true 
  })
  
  const { ref: gridRef, isIntersecting: gridVisible } = useIntersectionObserver<HTMLDivElement>({ 
    threshold: 0.1, 
    triggerOnce: true 
  })

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Section spacing="lg" background="default">
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-12">
        <h2 className={cn(
          "text-display xs:text-display-sm sm:text-display-md font-bold text-light-50 mb-4 transition-all duration-800",
          headerVisible ? "animate-fadeIn" : "opacity-0"
        )}>
          What Our Clients Say
        </h2>
        <p className={cn(
          "text-base xs:text-lg sm:text-xl text-light-300 text-center max-w-3xl mx-auto mb-8 xs:mb-10 sm:mb-12 transition-all duration-800 px-4",
          headerVisible ? "animate-slideUp animation-delay-200" : "opacity-0 translate-y-8"
        )}>
          Real feedback from real customers who trusted us with their devices.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div 
        ref={gridRef}
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 mb-8 xs:mb-10 sm:mb-12 px-4",
          gridVisible && "will-change-transform"
        )}
      >
        {items.map((item, index) => (
          <Card
            key={item.id}
            variant="glass"
            padding="lg"
            hover={true}
            tilt
            depth="medium"
            glowOnHover
            className={cn(
              "transition-all duration-800 stagger-item",
              gridVisible ? "animate-scaleIn" : "opacity-0 translate-y-8"
            )}
            style={{ 
              animationDelay: gridVisible ? `${index * 100}ms` : '0ms' 
            }}
          >
            {/* Quote */}
            <blockquote className="text-light-200 mb-6 text-base xs:text-lg leading-relaxed">
              "{item.quote}"
            </blockquote>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-semibold text-lg">
                {item.avatar ? (
                  <img 
                    src={item.avatar} 
                    alt={item.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(item.name)
                )}
              </div>

              {/* Author Details */}
              <div className="flex-1">
                <h4 className="font-semibold text-light-50 text-sm xs:text-base">
                  {item.name}
                </h4>
                <p className="text-light-400 text-xs xs:text-sm">
                  {item.role}
                </p>
                {item.handle && (
                  <p className="text-primary-400 text-xs xs:text-sm">
                    {item.handle}
                  </p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Trust Badge */}
      <div className={cn(
        "text-center transition-all duration-800",
        gridVisible ? "animate-fadeIn animation-delay-800" : "opacity-0"
      )}>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500/10 border border-primary-500/20 rounded-full">
          <span className="text-primary-400 text-2xl">⭐</span>
          <span className="text-light-200 text-sm font-medium">
            Trusted by 500+ customers in Lagos
          </span>
        </div>
      </div>
    </Section>
  )
}
