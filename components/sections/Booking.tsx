'use client'

import { useState } from 'react'
import { Section, Card, Button, Input, Textarea, Checkbox } from '@/components/ui'
import { useIntersectionObserver } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { generateWhatsAppLink, composeBookingMessage } from '@/lib/utils'
import { WHATSAPP_NUMBER, TELEGRAM_LINK, IMESSAGE_LINK } from '@/lib/constants'
import { MessageCircle, Send } from 'lucide-react'

export function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    deviceModel: '',
    issueDescription: '',
    wantsProofVideo: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Scroll-triggered animations
  const { ref: containerRef, isIntersecting: containerVisible } = useIntersectionObserver<HTMLDivElement>({ 
    threshold: 0.1, 
    triggerOnce: true 
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.deviceModel.trim()) {
      newErrors.deviceModel = 'Device model is required'
    }

    if (!formData.issueDescription.trim()) {
      newErrors.issueDescription = 'Issue description is required'
    } else if (formData.issueDescription.trim().length < 10) {
      newErrors.issueDescription = 'Please provide more details (at least 10 characters)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Compose WhatsApp message
    const message = composeBookingMessage(formData)
    const whatsappUrl = generateWhatsAppLink(WHATSAPP_NUMBER, message)
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank')
    
    // Show success state
    setIsSubmitted(true)
    setIsSubmitting(false)
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        deviceModel: '',
        issueDescription: '',
        wantsProofVideo: false
      })
      setIsSubmitted(false)
    }, 2000)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <Section spacing="lg" background="darker">
      <div 
        ref={containerRef}
        className="max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Booking Form */}
          <div className={cn(
            "lg:col-span-2 transition-all duration-800",
            containerVisible ? "animate-fadeIn" : "opacity-0"
          )}>
            <Card variant="glass" padding="lg" className="h-full">
              <div className="mb-6">
                <h2 className="text-2xl xs:text-3xl font-bold text-light-50 mb-4">
                  Book Your Repair
                </h2>
                <p className="text-light-300 text-base">
                  Fill out the form below and we'll get back to you within minutes with a quote and appointment.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  required
                  placeholder="John Doe"
                />

                <Input
                  label="Device Model"
                  value={formData.deviceModel}
                  onChange={(e) => handleInputChange('deviceModel', e.target.value)}
                  error={errors.deviceModel}
                  required
                  placeholder="iPhone 14 Pro"
                />

                <Textarea
                  label="Issue Description"
                  value={formData.issueDescription}
                  onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                  error={errors.issueDescription}
                  required
                  placeholder="Describe what's wrong with your device..."
                  rows={4}
                />

                <Checkbox
                  label="I would like a proof video of my repair"
                  description="We'll document the before and after process for you"
                  checked={formData.wantsProofVideo}
                  onChange={(e) => handleInputChange('wantsProofVideo', e.target.checked)}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  disabled={isSubmitting || isSubmitted}
                  className="w-full"
                  magnetic
                  ripple
                  glowIntensity="high"
                >
                  {isSubmitted ? '✅ Success! Opening WhatsApp...' : '📱 Send to WhatsApp'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Options */}
          <div className={cn(
            "space-y-6 transition-all duration-800",
            containerVisible ? "animate-fadeIn animation-delay-500" : "opacity-0"
          )}>
            <div>
              <h3 className="text-xl font-semibold text-light-50 mb-4">
                Other Ways to Reach Us
              </h3>
              <p className="text-light-400 text-sm mb-6">
                Prefer a different way to get in touch? Choose what works best for you.
              </p>
            </div>

            {/* WhatsApp Chat */}
            <Card variant="bordered" padding="md" hover className="group">
              <a
                href={generateWhatsAppLink(WHATSAPP_NUMBER, "Hi! I'd like to book a repair service.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full"
              >
                <MessageCircle className="w-6 h-6 text-green-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                <div>
                  <h4 className="font-medium text-light-50">WhatsApp Chat</h4>
                  <p className="text-sm text-light-400">Instant messaging</p>
                </div>
              </a>
            </Card>

            {/* Telegram */}
            <Card variant="bordered" padding="md" hover className="group">
              <a
                href={TELEGRAM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full"
              >
                <Send className="w-6 h-6 text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                <div>
                  <h4 className="font-medium text-light-50">Telegram</h4>
                  <p className="text-sm text-light-400">Alternative messaging</p>
                </div>
              </a>
            </Card>

            {/* iMessage */}
            <Card variant="bordered" padding="md" hover className="group">
              <a
                href={IMESSAGE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full"
              >
                <MessageCircle className="w-6 h-6 text-blue-500 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                <div>
                  <h4 className="font-medium text-light-50">iMessage</h4>
                  <p className="text-sm text-light-400">Apple devices</p>
                </div>
              </a>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  )
}
