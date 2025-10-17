import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Hero } from '@/components/sections'
import { getGalleryItems, getTestimonials, getServices } from '@/lib/sanity/queries'

// Dynamic imports for code splitting
const Gallery = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.Gallery })), {
  loading: () => <div className="min-h-[400px] bg-dark-900 animate-pulse" />,
  ssr: true,
})

const Testimonials = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="min-h-[400px] bg-dark-800 animate-pulse" />,
  ssr: true,
})

const Services = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.Services })), {
  loading: () => <div className="min-h-[400px] bg-dark-900 animate-pulse" />,
  ssr: true,
})

const BehindTheBench = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.BehindTheBench })), {
  loading: () => <div className="min-h-[400px] bg-dark-800 animate-pulse" />,
  ssr: true,
})

const Booking = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.Booking })), {
  loading: () => <div className="min-h-[400px] bg-dark-900 animate-pulse" />,
  ssr: true,
})

const Footer = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="min-h-[200px] bg-dark-900 animate-pulse" />,
  ssr: true,
})

// Loading component for sections
function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div className={`min-h-[400px] bg-gradient-to-b from-dark-800 to-dark-900 animate-pulse ${className}`}>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="h-8 bg-dark-700 rounded-lg mb-4 mx-auto w-3/4"></div>
          <div className="h-4 bg-dark-700 rounded-lg mb-2 mx-auto w-1/2"></div>
          <div className="h-4 bg-dark-700 rounded-lg mx-auto w-2/3"></div>
        </div>
      </div>
    </div>
  )
}

export default async function Home() {
  // Fetch critical data first (above the fold)
  const galleryItems = await getGalleryItems()
  
  // Prefetch other data
  const [testimonials, services] = await Promise.all([
    getTestimonials(),
    getServices(),
  ])

  return (
    <main>
      {/* Critical above-the-fold content */}
      <Hero />
      
      {/* Gallery - visible immediately */}
      <Suspense fallback={<SectionSkeleton />}>
        <Gallery items={galleryItems} />
      </Suspense>
      
      {/* Non-critical content with loading states */}
      <Suspense fallback={<SectionSkeleton className="bg-dark-800" />}>
        <Testimonials items={testimonials} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Services items={services} />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton className="bg-dark-800" />}>
        <BehindTheBench />
      </Suspense>
      
      <Suspense fallback={<SectionSkeleton />}>
        <Booking />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[200px] bg-dark-900 animate-pulse" />}>
        <Footer />
      </Suspense>
    </main>
  )
}
