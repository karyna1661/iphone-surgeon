'use client'

import { Section, Container } from '@/components/ui'
import { generateWhatsAppLink } from '@/lib/utils'
import { useIntersectionObserver } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { 
  BUSINESS_NAME, 
  BUSINESS_LOCATION, 
  WORKING_HOURS, 
  WHATSAPP_NUMBER, 
  INSTAGRAM_HANDLE, 
  TWITTER_HANDLE,
  TELEGRAM_LINK, 
  IMESSAGE_LINK 
} from '@/lib/constants'
import { 
  MapPin, 
  Clock, 
  Instagram, 
  Twitter,
  MessageCircle, 
  Send, 
  QrCode, 
  ExternalLink 
} from 'lucide-react'

export function Footer() {
  const WHATSAPP_DEFAULT_MESSAGE = "Hi! I'd like to book a repair service."

  // Scroll-triggered animations
  const { ref: gridRef, isIntersecting: gridVisible } = useIntersectionObserver({ 
    threshold: 0.1, 
    triggerOnce: true 
  })

  return (
    <Section spacing="lg" background="darker" id="footer">
      <Container>
        <div 
          ref={gridRef}
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12 transition-all duration-800",
            gridVisible ? "animate-fadeIn" : "opacity-0 translate-y-8"
          )}
        >
          
          {/* Column 1: Business Information */}
          <div>
            {/* Brand/Logo Section */}
            <h3 className="text-2xl font-bold text-light-50 mb-4">
              {BUSINESS_NAME}
            </h3>
            <p className="text-sm text-light-400 mb-6">
              Proof You Can See. Precision You Can Feel.
            </p>

            {/* Location */}
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="w-5 h-5 text-primary-400 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs text-light-500 uppercase tracking-wide mb-1">
                  Location
                </p>
                <p className="text-base text-light-200">
                  {BUSINESS_LOCATION}
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary-400 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs text-light-500 uppercase tracking-wide mb-1">
                  Working Hours
                </p>
                <p className="text-base text-light-200">
                  {WORKING_HOURS}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links / Contact */}
          <div>
            <h4 className="text-lg font-semibold text-light-50 mb-4">
              Get in Touch
            </h4>
            
            <div className="space-y-3">
              {/* WhatsApp Link */}
              <a
                href={generateWhatsAppLink(WHATSAPP_NUMBER, WHATSAPP_DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-light-300 hover:text-primary-400 hover:scale-105 hover:text-shadow-[0_0_10px_rgba(0,217,255,0.5)] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 hover:scale-110 hover:rotate-6 transition-all duration-300" aria-hidden="true" />
                <span className="text-sm">WhatsApp Chat</span>
                <ExternalLink className="w-4 h-4 opacity-50" aria-hidden="true" />
              </a>

              {/* Instagram Link */}
              <a
                href={`https://instagram.com/${INSTAGRAM_HANDLE.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-light-300 hover:text-primary-400 hover:scale-105 hover:text-shadow-[0_0_10px_rgba(0,217,255,0.5)] transition-all duration-300"
              >
                <Instagram className="w-5 h-5 hover:scale-110 hover:rotate-6 transition-all duration-300" aria-hidden="true" />
                <span className="text-sm">{INSTAGRAM_HANDLE}</span>
                <ExternalLink className="w-4 h-4 opacity-50" aria-hidden="true" />
              </a>

              {/* Twitter Link */}
              <a
                href={TWITTER_HANDLE}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-light-300 hover:text-primary-400 hover:scale-105 hover:text-shadow-[0_0_10px_rgba(0,217,255,0.5)] transition-all duration-300"
              >
                <Twitter className="w-5 h-5 hover:scale-110 hover:rotate-6 transition-all duration-300" aria-hidden="true" />
                <span className="text-sm">@OpayemiPau9330</span>
                <ExternalLink className="w-4 h-4 opacity-50" aria-hidden="true" />
              </a>

              {/* Telegram Link */}
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-light-300 hover:text-primary-400 hover:scale-105 hover:text-shadow-[0_0_10px_rgba(0,217,255,0.5)] transition-all duration-300"
              >
                <Send className="w-5 h-5 hover:scale-110 hover:rotate-6 transition-all duration-300" aria-hidden="true" />
                <span className="text-sm">Telegram</span>
                <ExternalLink className="w-4 h-4 opacity-50" aria-hidden="true" />
              </a>

              {/* iMessage Link */}
              <a
                href={IMESSAGE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-light-300 hover:text-primary-400 hover:scale-105 hover:text-shadow-[0_0_10px_rgba(0,217,255,0.5)] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 hover:scale-110 hover:rotate-6 transition-all duration-300" aria-hidden="true" />
                <span className="text-sm">iMessage</span>
                <ExternalLink className="w-4 h-4 opacity-50" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 3: QR Code Section */}
          <div>
            <h4 className="text-lg font-semibold text-light-50 mb-4">
              Quick Access
            </h4>
            
            <div className="bg-light-50 rounded-xl p-6 flex flex-col items-center justify-center hover:scale-105 hover:shadow-lg transition-all duration-300">
              {/* QR Code Icon/Placeholder */}
              <QrCode className="w-24 h-24 text-dark-800 mb-3 animate-pulse-slow" aria-hidden="true" />
              
              {/* QR Code Text */}
              <p className="text-sm text-dark-800 font-medium text-center mb-1">
                Scan to revisit
              </p>
              <p className="text-xs text-dark-600 text-center">
                Save this page for quick access
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Credits */}
        <div className="border-t border-dark-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-light-500">
            {/* Copyright Text */}
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
            </p>
            
            {/* Credits/Links */}
            <div className="flex gap-6">
              <a
                href="#"
                className="hover:text-primary-400 hover:scale-105 transition-all duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-primary-400 hover:scale-105 transition-all duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
