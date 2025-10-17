'use client'

import { Section, Card, Button, AnimatedText, NumberCounter } from '@/components/ui'
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
  Wrench,
  ArrowRight,
  Calendar
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
      <div ref={headerRef} className="text-center mb-16">
        <h2 className={cn(
          "text-display-md xs:text-display-lg sm:text-display-lg font-bold text-light-50 mb-6 transition-all duration-1000",
          headerVisible ? "animate-blurFadeIn" : "opacity-0 blur-sm"
        )}>
          <AnimatedText 
            text="Expert Repair Services"
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
            text="From cracked screens to water damage, we handle all iPhone repairs with precision and care."
            type="character"
            delay={800}
            duration={1.0}
          />
        </div>
      </div>

      {/* Services Grid */}
      <div 
        ref={gridRef}
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xs:gap-10 mb-16 xs:mb-20 px-4",
          gridVisible && "will-change-transform"
        )}
      >
        {items.map((item, index) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Wrench
          
          return (
            <Card
              key={item.id}
              variant="premium"
              padding="xl"
              hover={true}
              tilt
              depth="premium"
              glowOnHover
              shimmer
              gradientBorder
              className={cn(
                "text-center transition-all duration-1000 stagger-item group",
                gridVisible ? "animate-scaleIn" : "opacity-0 translate-y-8"
              )}
              style={{ 
                animationDelay: gridVisible ? `${index * 150}ms` : '0ms' 
              }}
            >
              {/* Service Number */}
              <div className="absolute top-6 left-6 text-2xl font-bold text-primary-400/30 group-hover:text-primary-400/60 transition-colors duration-300">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-primary-500/20 to-primary-600/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <IconComponent className="w-10 h-10 text-primary-400 group-hover:text-primary-300 transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-light-50 mb-6 group-hover:text-primary-300 transition-colors duration-300">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-light-300 text-lg leading-relaxed mb-8 group-hover:text-light-200 transition-colors duration-300">
                {item.description}
              </p>

              {/* CTA */}
              <Button
                variant="outline"
                size="lg"
                href={generateWhatsAppLink(WHATSAPP_NUMBER, `Hi! I need ${item.title} service. Can you help?`)}
                className="w-full group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all duration-300"
                magnetic
                glowIntensity="medium"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Card>
          )
        })}
      </div>

      {/* Main CTA */}
      <div className={cn(
        "text-center transition-all duration-1000",
        gridVisible ? "animate-fadeIn animation-delay-800" : "opacity-0"
      )}>
        <Button
          variant="premium"
          size="xl"
          href={generateWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE)}
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
          <p>Same-day service available • Free diagnostic • Professional warranty</p>
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
              <span>500+ Repairs Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
              <span>99% Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
