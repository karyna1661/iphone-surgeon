'use client'

import { Section, Card, BeforeAfterSlider, Button } from '@/components/ui'
import { GalleryItem } from '@/lib/sanity/types'
import { useIntersectionObserver } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface GalleryProps {
  items: GalleryItem[]
}

export function Gallery({ items }: GalleryProps) {
  // Scroll-triggered animations
  const { ref: headerRef, isIntersecting: headerVisible } = useIntersectionObserver<HTMLDivElement>({ 
    threshold: 0.2, 
    triggerOnce: true 
  })
  
  const { ref: gridRef, isIntersecting: gridVisible } = useIntersectionObserver<HTMLDivElement>({ 
    threshold: 0.1, 
    triggerOnce: true 
  })

  return (
    <Section
      id="gallery"
      spacing="lg"
      background="darker"
      containerSize="xl"
    >
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-12">
        <h2 className={cn(
          "text-display xs:text-display-sm sm:text-display-md font-bold text-light-50 mb-4 transition-all duration-800",
          headerVisible ? "animate-fadeIn" : "opacity-0"
        )}>
          Don't Take Our Word For It. See the Proof.
        </h2>
        <p className={cn(
          "text-base xs:text-lg sm:text-xl text-light-300 text-center max-w-3xl mx-auto mb-8 xs:mb-10 sm:mb-12 transition-all duration-800 px-4",
          headerVisible ? "animate-slideUp animation-delay-200" : "opacity-0 translate-y-8"
        )}>
          Every repair we complete comes with before-and-after visuals — because we believe transparency builds trust faster than words ever could.
        </p>
      </div>

      {/* Gallery Grid */}
      <div 
        ref={gridRef}
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-6 sm:gap-8 mb-8 xs:mb-10 sm:mb-12 px-4",
          gridVisible && "will-change-transform"
        )}
      >
        {items.map((item, index) => (
          <Card
            key={item.id}
            variant="glass"
            padding="none"
            hover={true}
            tilt
            depth="high"
            glowOnHover
            className={cn(
              "transition-all duration-800 stagger-item",
              gridVisible ? "animate-scaleIn" : "opacity-0 translate-y-8"
            )}
            style={{ 
              animationDelay: gridVisible ? `${index * 100}ms` : '0ms' 
            }}
          >
            {/* BeforeAfterSlider */}
            <BeforeAfterSlider
              beforeImage={item.beforeImage}
              afterImage={item.afterImage}
              initialPosition={50}
            />

            {/* Caption Section */}
            <div className="p-4 xs:p-5 flex flex-col gap-2">
              <h3 className="text-base xs:text-lg font-semibold text-light-50">
                {item.deviceModel}
              </h3>
              <p className="text-xs xs:text-sm text-primary-400">
                {item.repairType}
              </p>
              <p className="text-xs text-light-400 flex items-center gap-1">
                <span>⏱️</span>
                <span>{item.turnaroundTime} turnaround</span>
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Optional CTA */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="lg"
          href="/repairs"
          magnetic
          glowIntensity="medium"
          className={cn(
            "transition-all duration-800",
            gridVisible ? "animate-fadeIn animation-delay-800" : "opacity-0"
          )}
        >
          Explore All Repairs
        </Button>
      </div>
    </Section>
  )
}
