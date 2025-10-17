// import { NextStudio } from 'next-sanity/studio'
// import config from '@/sanity/sanity.config'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-light-50 mb-4">
          Sanity Studio
        </h1>
        <p className="text-light-400">
          Studio is disabled in demo mode. Configure Sanity CMS to enable.
        </p>
      </div>
    </div>
  )
}
