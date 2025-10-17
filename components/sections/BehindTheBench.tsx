'use client'

import { Section, Card } from '@/components/ui'
import { useIntersectionObserver } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import Image from 'next/image'

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
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className={cn(
            "relative transition-all duration-800",
            containerVisible ? "animate-fadeIn" : "opacity-0"
          )}>
            <Card
              variant="glass"
              padding="none"
              className="overflow-hidden"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/technician/technician-portrait.jpg"
                  alt="Paul Smith, Founder working with precision repair equipment and stereo microscope in professional lab setting"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className={cn(
            "space-y-6 transition-all duration-800",
            containerVisible ? "animate-slideUp animation-delay-300" : "opacity-0 translate-y-8"
          )}>
            <div>
              <h2 className="text-display xs:text-display-sm sm:text-display-md font-bold text-light-50 mb-4">
                Behind the Bench
              </h2>
              <p className="text-primary-400 text-lg font-medium mb-6">
                Meet the craftsman behind every repair
              </p>
            </div>

            <div className="space-y-4 text-light-300 text-base leading-relaxed">
              <p>
                Hi, I'm <span className="text-primary-400 font-semibold">Paul Smith</span>, and I've been fixing iPhones for over 8 years. What started as a hobby in my garage has grown into Lagos' most trusted repair service.
              </p>
              
              <p>
                Every device that comes through my door gets the same level of care I'd give my own phone. I use <span className="text-primary-400 font-semibold">professional-grade tools</span>, genuine parts, and a stereo microscope to ensure precision in every repair.
              </p>
              
              <p>
                But here's what sets me apart: <span className="text-primary-400 font-semibold">I document everything</span>. Every before-and-after photo, every step of the process, every component replaced. Because I believe you deserve to see exactly what you're paying for.
              </p>
              
              <p>
                When you choose iPhone Surgeon, you're not just getting a repair—you're getting <span className="text-primary-400 font-semibold">transparency, quality, and peace of mind</span>.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-dark-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">500+</div>
                <div className="text-sm text-light-400">Repairs Done</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">8+</div>
                <div className="text-sm text-light-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-400">99%</div>
                <div className="text-sm text-light-400">Success Rate</div>
              </div>
            </div>

            {/* Signature */}
            <div className="pt-4">
              <div className="text-light-200 font-medium">Paul Smith</div>
              <div className="text-light-400 text-sm">Founder & Lead Technician</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
