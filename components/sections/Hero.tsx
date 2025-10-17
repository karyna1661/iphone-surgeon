'use client'

import { Button } from '@/components/ui'
import { useIntersectionObserver } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { generateWhatsAppLink } from '@/lib/utils'
import { WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE } from '@/lib/constants'

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
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
          poster="/images/hero-poster.webp"
        >
          <source src="/videos/hero-repair-process.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img 
            src="/images/hero-poster.webp" 
            alt="iPhone repair process" 
            className="w-full h-full object-cover"
          />
        </video>
        
        {/* Parallax overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      {/* Content */}
      <div 
        ref={containerRef}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Main Headline */}
        <h1 className={cn(
          "text-hero xs:text-display sm:text-display-md font-bold text-light-50 mb-6 leading-tight transition-all duration-800",
          containerVisible ? "animate-fadeIn" : "opacity-0"
        )}>
          Proof You Can See.
          <br />
          <span className="text-primary-400">Precision You Can Feel.</span>
        </h1>

        {/* Subheadline */}
        <p className={cn(
          "text-lg xs:text-xl sm:text-2xl text-light-300 mb-8 xs:mb-10 sm:mb-12 max-w-3xl mx-auto transition-all duration-800",
          containerVisible ? "animate-slideUp animation-delay-200" : "opacity-0 translate-y-8"
        )}>
          Every iPhone repair comes with documented before-and-after proof. 
          Because trust isn't built on promises—it's built on results.
        </p>

        {/* CTAs */}
        <div className={cn(
          "flex flex-col xs:flex-row gap-4 xs:gap-6 justify-center items-center transition-all duration-800",
          containerVisible ? "animate-slideUp animation-delay-400" : "opacity-0 translate-y-8"
        )}>
          <Button
            variant="primary"
            size="lg"
            href={generateWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE)}
            magnetic
            ripple
            glowIntensity="high"
            className="w-full xs:w-auto"
          >
            📱 Book a Repair
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={handleWatchProof}
            magnetic
            glowIntensity="medium"
            className="w-full xs:w-auto"
          >
            👁️ Watch the Proof
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className={cn(
          "mt-12 xs:mt-16 sm:mt-20 flex flex-col xs:flex-row items-center justify-center gap-6 xs:gap-8 text-sm text-light-400 transition-all duration-800",
          containerVisible ? "animate-fadeIn animation-delay-600" : "opacity-0"
        )}>
          <div className="flex items-center gap-2">
            <span className="text-primary-400">✓</span>
            <span>Same-Day Service</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary-400">✓</span>
            <span>Before/After Documentation</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary-400">✓</span>
            <span>Professional Warranty</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={cn(
        "absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-800",
        containerVisible ? "animate-floatUp animation-delay-800" : "opacity-0"
      )}>
        <div className="w-6 h-10 border-2 border-light-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-light-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
