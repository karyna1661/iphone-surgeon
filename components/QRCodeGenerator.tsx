'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface QRCodeGeneratorProps {
  url: string
  size?: number
  className?: string
}

export function QRCodeGenerator({ url, size = 200, className }: QRCodeGeneratorProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        setIsLoading(true)
        setError('')
        
        // Using a QR code API service
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`
        setQrCodeUrl(qrApiUrl)
      } catch (err) {
        setError('Failed to generate QR code')
        console.error('QR Code generation error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    generateQRCode()
  }, [url, size])

  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center bg-white rounded-lg", className)} style={{ width: size, height: size }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={cn("flex items-center justify-center bg-red-50 border border-red-200 rounded-lg p-4", className)} style={{ width: size, height: size }}>
        <p className="text-red-600 text-sm text-center">{error}</p>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <img
        src={qrCodeUrl}
        alt={`QR Code for ${url}`}
        className="rounded-lg shadow-lg"
        style={{ width: size, height: size }}
        onLoad={() => setIsLoading(false)}
        onError={() => setError('Failed to load QR code')}
      />
      <p className="text-xs text-light-400 text-center max-w-[200px]">
        Scan with your phone to test mobile experience
      </p>
    </div>
  )
}
