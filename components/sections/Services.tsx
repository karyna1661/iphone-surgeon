'use client'

import { Section, Card, Button } from '@/components/ui'
import { ServiceItem } from '@/lib/sanity/types'
import { useIntersectionObserver } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { generateWhatsAppLink } from '@/lib/utils'
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants'
import { 
  Cpu, 
  Monitor, 
  Battery, 
  Camera, 
  Droplet, 
  Wrench 
} from 'lucide-react'

interface ServicesProps {
  items: ServiceItem[]
}

const iconMap = {
  Cpu,
  Monitor,
  Battery,
  Camera,
  Droplet,
  Wrench
}

export function Services({ items }: ServicesProps) {
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
    <Section spacing="lg" background="darker">
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-12">
        <h2 className={cn(
          "text-display xs:text-display-sm sm:text-display-md font-bold text-light-50 mb-4 transition-all duration-800",
          headerVisible ? "animate-fadeIn" : "opacity-0"
        )}>
          Expert Repair Services
        </h2>
        <p className={cn(
          "text-base xs:text-lg sm:text-xl text-light-300 text-center max-w-3xl mx-auto mb-8 xs:mb-10 sm:mb-12 transition-all duration-800 px-4",
          headerVisible ? "animate-slideUp animation-delay-200" : "opacity-0 translate-y-8"
        )}>
          From cracked screens to water damage, we handle all iPhone repairs with precision and care.
        </p>
      </div>

      {/* Services Grid */}
      <div 
        ref={gridRef}
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 mb-8 xs:mb-10 sm:mb-12 px-4",
          gridVisible && "will-change-transform"
        )}
      >
        {items.map((item, index) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Wrench
          
          return (
            <Card
              key={item.id}
              variant="bordered"
              padding="lg"
              hover={true}
              tilt
              depth="medium"
              glowOnHover
              className={cn(
                "text-center transition-all duration-800 stagger-item",
                gridVisible ? "animate-scaleIn" : "opacity-0 translate-y-8"
              )}
              style={{ 
                animationDelay: gridVisible ? `${index * 100}ms` : '0ms' 
              }}
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-6 bg-primary-500/10 rounded-full flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-primary-400" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-light-50 mb-4">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-light-300 text-base leading-relaxed mb-6">
                {item.description}
              </p>

              {/* CTA */}
              <Button
                variant="outline"
                size="sm"
                href={generateWhatsAppLink(WHATSAPP_NUMBER, `Hi! I need ${item.title} service. Can you help?`)}
                className="w-full"
              >
                Get Quote
              </Button>
            </Card>
          )
        })}
      </div>

      {/* Main CTA */}
      <div className={cn(
        "text-center transition-all duration-800",
        gridVisible ? "animate-fadeIn animation-delay-800" : "opacity-0"
      )}>
        <Button
          variant="primary"
          size="lg"
          href={generateWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE)}
          magnetic
          ripple
          glowIntensity="high"
          className="mb-4"
        >
          📱 Book Your Repair Now
        </Button>
        <p className="text-light-400 text-sm">
          Same-day service available • Free diagnostic • Professional warranty
        </p>
      </div>
    </Section>
  )
}
