'use client'

import { useState, useEffect } from 'react'
import { QRCodeGenerator } from './QRCodeGenerator'

export function MobileTestingPanel() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    setCurrentUrl(window.location.href)
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'q') {
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (process.env.NODE_ENV !== 'development' || !isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-dark-800/95 backdrop-blur-sm border border-dark-600 rounded-lg p-4 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-light-50">Mobile Testing</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-light-400 hover:text-light-50 text-sm"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-xs text-light-400 mb-2">Scan QR code to test on mobile:</p>
          <QRCodeGenerator url={currentUrl} size={120} />
        </div>
        
        <div className="text-xs text-light-500">
          <p>Press Ctrl+Q to toggle this panel</p>
          <p>Current URL: {currentUrl}</p>
        </div>
      </div>
    </div>
  )
}
