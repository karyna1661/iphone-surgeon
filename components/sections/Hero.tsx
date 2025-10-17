'use client'

import { Button, AnimatedText } from '@/components/ui'
import { useIntersectionObserver } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { generateWhatsAppLink } from '@/lib/utils'
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants'
import { ChevronDown, Calendar, Eye } from 'lucide-react'

export function Hero() {
  // Scroll-triggered animations
  const { ref: containerRef, isIntersecting: containerVisible } = useIntersectionObserver<HTMLDivElement>({ 
    threshold: 0.1, 
    triggerOnce: true 
  })

  const handleWatchProof = () => {
    const gallerySection = document.getElementById('gallery')
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 gradient-animated">
        {/* Floating Particles */}
        <div className="floating-particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
                animationDelay: `${(i * 0.3)}s`,
                animationDuration: `${4 + (i % 3)}s`
              }}
            />
          ))}
        </div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 113, 227, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 113, 227, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div 
        ref={containerRef}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        {/* Main Headline */}
        <h1 className={cn(
          "text-5xl xs:text-6xl sm:text-7xl lg:text-display-lg font-bold text-light-50 mb-8 leading-tight transition-all duration-1000",
          containerVisible ? "animate-blurFadeIn" : "opacity-0 blur-sm"
        )}>
          <AnimatedText 
            text="Precision You Can See."
            type="word"
            delay={200}
            duration={0.6}
            className="block mb-2"
          />
          <AnimatedText 
            text="Trust You Can Feel."
            type="word"
            delay={800}
            duration={0.6}
            className="block text-primary-400"
          />
        </h1>

        {/* Subheadline */}
        <div className={cn(
          "text-2xl xs:text-3xl sm:text-4xl lg:text-3xl text-light-300 mb-12 xs:mb-16 sm:mb-20 max-w-4xl mx-auto transition-all duration-1000",
          containerVisible ? "animate-slideUp animation-delay-400" : "opacity-0 translate-y-8"
        )}>
          <AnimatedText 
            text="Every iPhone repair comes with documented before-and-after proof. Because trust isn't built on promises, it's built on results."
            type="character"
            delay={1200}
            duration={1.2}
          />
        </div>

        {/* CTAs */}
        <div className={cn(
          "flex flex-col lg:flex-row gap-6 lg:gap-8 justify-center items-center transition-all duration-1000",
          containerVisible ? "animate-scaleIn animation-delay-600" : "opacity-0 scale-95"
        )}>
          <Button
            variant="premium"
            size="xl"
            href={generateWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE)}
            magnetic
            ripple
            glowIntensity="high"
            shimmer
            className="w-full lg:w-auto"
          >
            <Calendar className="w-5 h-5" />
            Book a Repair
          </Button>
          
          <Button
            variant="outline"
            size="xl"
            onClick={handleWatchProof}
            magnetic
            glowIntensity="medium"
            className="w-full lg:w-auto"
          >
            <Eye className="w-5 h-5" />
            Watch the Proof
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className={cn(
          "mt-16 xs:mt-20 sm:mt-24 flex flex-col xs:flex-row items-center justify-center gap-8 xs:gap-12 text-base text-light-400 transition-all duration-1000",
          containerVisible ? "animate-fadeIn animation-delay-800" : "opacity-0"
        )}>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            <span>Same-Day Service</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            <span>Before/After Documentation</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            <span>Professional Warranty</span>
          </div>
        </div>
      </div>

    </section>
  )
}
