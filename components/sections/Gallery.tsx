'use client'

import { useState } from 'react'
import { Section, Card, BeforeAfterSlider, Button, AnimatedText } from '@/components/ui'
import { GalleryItem } from '@/lib/sanity/types'
import { useIntersectionObserver } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { generateWhatsAppLink } from '@/lib/utils'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { 
  Camera, 
  Play, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Calendar,
  Clock
} from 'lucide-react'

interface GalleryProps {
  items: GalleryItem[]
}

export function Gallery({ items }: GalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  
  // Scroll-triggered animations
  const { ref: headerRef, isIntersecting: headerVisible } = useIntersectionObserver<HTMLDivElement>({ 
    threshold: 0.2, 
    triggerOnce: true 
  })
  
  const { ref: gridRef, isIntersecting: gridVisible } = useIntersectionObserver<HTMLDivElement>({ 
    threshold: 0.1, 
    triggerOnce: true 
  })

  // Create bento grid layout with different sizes
  const getBentoSize = (index: number) => {
    const sizes = [
      'col-span-1 row-span-1', // Normal
      'col-span-1 row-span-2', // Tall
      'col-span-2 row-span-1', // Wide
      'col-span-1 row-span-1', // Normal
      'col-span-1 row-span-1', // Normal
      'col-span-2 row-span-2', // Large
    ]
    return sizes[index % sizes.length]
  }

  return (
    <Section
      id="gallery"
      spacing="lg"
      background="darker"
      containerSize="xl"
    >
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-16">
        <h2 className={cn(
          "text-display-md xs:text-display-lg sm:text-display-lg font-bold text-light-50 mb-6 transition-all duration-1000",
          headerVisible ? "animate-blurFadeIn" : "opacity-0 blur-sm"
        )}>
          <AnimatedText 
            text="Don't Take Our Word For It. See the Proof."
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
            text="Every repair we complete comes with before-and-after visuals because we believe transparency builds trust faster than words ever could."
            type="character"
            delay={800}
            duration={1.0}
          />
        </div>
      </div>

      {/* Gallery Grid - Bento Layout */}
      <div 
        ref={gridRef}
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xs:gap-8 mb-16 xs:mb-20 px-4",
          gridVisible && "will-change-transform"
        )}
        style={{
          gridTemplateRows: 'repeat(auto-fit, minmax(200px, 1fr))'
        }}
      >
        {items.map((item, index) => (
          <Card
            key={item.id}
            variant="premium"
            padding="none"
            hover={true}
            tilt
            depth="premium"
            glowOnHover
            shimmer
            gradientBorder
            className={cn(
              "transition-all duration-1000 stagger-item group cursor-pointer",
              getBentoSize(index),
              gridVisible ? "animate-scaleIn" : "opacity-0 translate-y-8"
            )}
            style={{ 
              animationDelay: gridVisible ? `${index * 150}ms` : '0ms' 
            }}
            onClick={() => setSelectedItem(item)}
          >
            {/* BeforeAfterSlider */}
            <div className="relative overflow-hidden rounded-t-2xl">
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                initialPosition={50}
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex items-center gap-2 text-white">
                  <Maximize2 className="w-6 h-6" />
                  <span className="text-sm font-medium">View Full Size</span>
                </div>
              </div>
            </div>

            {/* Caption Section */}
            <div className="p-6 flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-light-50 group-hover:text-primary-300 transition-colors duration-300">
                {item.deviceModel}
              </h3>
              <p className="text-sm text-primary-400 font-medium">
                {item.repairType}
              </p>
              <p className="text-sm text-light-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{item.turnaroundTime} turnaround</span>
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Premium CTA */}
      <div className={cn(
        "text-center transition-all duration-1000",
        gridVisible ? "animate-fadeIn animation-delay-800" : "opacity-0"
      )}>
        <Button
          variant="premium"
          size="xl"
          href={generateWhatsAppLink(WHATSAPP_NUMBER, "Hi! I'd like to book a repair service.")}
          magnetic
          ripple
          glowIntensity="high"
          shimmer
          className="mb-6"
        >
          <Calendar className="w-6 h-6" />
          Book Your Repair Now
        </Button>
        <div className="text-light-400 text-base space-y-2">
          <p>Ready to see your device transformed? Book now and get your own before/after documentation.</p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
              <span>Same-Day Service</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
              <span>Documented Process</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-6xl max-h-[90vh] mx-4">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => {
                const currentIndex = items.findIndex(item => item.id === selectedItem.id)
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1
                setSelectedItem(items[prevIndex])
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => {
                const currentIndex = items.findIndex(item => item.id === selectedItem.id)
                const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0
                setSelectedItem(items[nextIndex])
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Content */}
            <div className="bg-surface-1 rounded-2xl overflow-hidden">
              <div className="aspect-video">
                <BeforeAfterSlider
                  beforeImage={selectedItem.beforeImage}
                  afterImage={selectedItem.afterImage}
                  initialPosition={50}
                />
              </div>
              
              {/* Caption */}
              <div className="p-6 bg-surface-2">
                <h3 className="text-2xl font-semibold text-light-50 mb-2">
                  {selectedItem.deviceModel}
                </h3>
                <p className="text-primary-400 text-lg font-medium mb-3">
                  {selectedItem.repairType}
                </p>
                <p className="text-light-400 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{selectedItem.turnaroundTime} turnaround</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
