'use client'

import { Section, Card, AnimatedText, NumberCounter } from '@/components/ui'
import { useIntersectionObserver } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { User, Award, Clock } from 'lucide-react'

export function BehindTheBench() {
  // Scroll-triggered animations
  const { ref: containerRef, isIntersecting: containerVisible } = useIntersectionObserver<HTMLDivElement>({ 
    threshold: 0.1, 
    triggerOnce: true 
  })

  return (
    <Section spacing="lg" background="default">
      <div 
        ref={containerRef}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className={cn(
            "lg:col-span-2 relative transition-all duration-1000",
            containerVisible ? "animate-fadeIn" : "opacity-0"
          )}>
            <Card
              variant="premium"
              padding="none"
              className="overflow-hidden group"
              shimmer
              gradientBorder
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary-500/20 to-primary-600/10 flex items-center justify-center">
                {/* Placeholder for missing image */}
                <div className="text-center p-8">
                  <User className="w-24 h-24 text-primary-400/50 mx-auto mb-4" />
                  <p className="text-light-400 text-lg font-medium">Paul Smith</p>
                  <p className="text-light-500 text-sm">Professional Technician</p>
                  <div className="mt-4 text-xs text-light-600 bg-surface-2 px-3 py-1 rounded-full inline-block">
                    Photo Coming Soon
                  </div>
                </div>
                
                {/* Ken Burns Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className={cn(
            "lg:col-span-3 space-y-8 transition-all duration-1000",
            containerVisible ? "animate-slideUp animation-delay-300" : "opacity-0 translate-y-8"
          )}>
            <div>
              <h2 className="text-display-md xs:text-display-lg sm:text-display-lg font-bold text-light-50 mb-6">
                <AnimatedText 
                  text="Behind the Bench"
                  type="word"
                  delay={600}
                  duration={0.6}
                />
              </h2>
              <div className="text-primary-400 text-xl font-medium mb-8">
                <AnimatedText 
                  text="Meet the craftsman behind every repair"
                  type="character"
                  delay={1000}
                  duration={0.8}
                />
              </div>
            </div>

            <div className="space-y-6 text-light-300 text-lg leading-relaxed">
              <p className={cn(
                "transition-all duration-1000",
                containerVisible ? "animate-fadeIn animation-delay-1200" : "opacity-0"
              )}>
                Hi, I'm Paul Smith, and I've been fixing iPhones for over 8 years. What started as a hobby in my garage has grown into Lagos' most trusted repair service.
              </p>
              
              <p className={cn(
                "transition-all duration-1000",
                containerVisible ? "animate-fadeIn animation-delay-1400" : "opacity-0"
              )}>
                Every device that comes through my door gets the same level of care I'd give my own phone. I use professional-grade tools, genuine parts, and a stereo microscope to ensure precision in every repair.
              </p>
              
              <p className={cn(
                "transition-all duration-1000",
                containerVisible ? "animate-fadeIn animation-delay-1600" : "opacity-0"
              )}>
                But here's what sets me apart: I document everything. Every before-and-after photo, every step of the process, every component replaced. Because I believe you deserve to see exactly what you're paying for.
              </p>
              
              <p className={cn(
                "transition-all duration-1000",
                containerVisible ? "animate-fadeIn animation-delay-1800" : "opacity-0"
              )}>
                When you choose iPhone Surgeon, you're not just getting a repair, you're getting transparency, quality, and peace of mind.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-surface-3">
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-500/10 rounded-2xl flex items-center justify-center group-hover:bg-primary-500/20 transition-colors duration-300">
                  <Award className="w-8 h-8 text-primary-400" />
                </div>
                <NumberCounter 
                  value={500} 
                  suffix="+" 
                  className="text-3xl font-bold text-primary-400 mb-2"
                  delay={3600}
                />
                <div className="text-sm text-light-400">Repairs Done</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-500/10 rounded-2xl flex items-center justify-center group-hover:bg-primary-500/20 transition-colors duration-300">
                  <Clock className="w-8 h-8 text-primary-400" />
                </div>
                <NumberCounter 
                  value={8} 
                  suffix="+" 
                  className="text-3xl font-bold text-primary-400 mb-2"
                  delay={3800}
                />
                <div className="text-sm text-light-400">Years Experience</div>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-500/10 rounded-2xl flex items-center justify-center group-hover:bg-primary-500/20 transition-colors duration-300">
                  <Award className="w-8 h-8 text-primary-400" />
                </div>
                <NumberCounter 
                  value={99} 
                  suffix="%" 
                  className="text-3xl font-bold text-primary-400 mb-2"
                  delay={4000}
                />
                <div className="text-sm text-light-400">Success Rate</div>
              </div>
            </div>

            {/* Signature */}
            <div className="pt-6">
              <div className="text-light-200 font-medium text-lg">Paul Smith</div>
              <div className="text-light-400 text-base">Founder & Lead Technician</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
