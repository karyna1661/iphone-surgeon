'use client'

import { useState } from 'react'
import { Section, Card, Button, Input, Textarea, Checkbox, AnimatedText } from '@/components/ui'
import { useIntersectionObserver } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import { generateWhatsAppLink, composeBookingMessage } from '@/lib/utils'
import { WHATSAPP_NUMBER, TELEGRAM_LINK, IMESSAGE_LINK } from '@/lib/constants'
import { MessageCircle, Send, Calendar, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

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
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Booking Form */}
          <div className={cn(
            "lg:col-span-2 transition-all duration-1000",
            containerVisible ? "animate-fadeIn" : "opacity-0"
          )}>
            <motion.div
              whileHover={{ 
                scale: 1.02,
                rotateX: 5,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <Card variant="glass" padding="xl" className="h-full relative overflow-hidden group backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-400/20" shimmer>
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Magnetic Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 mb-8">
                  <h2 className="text-3xl xs:text-4xl font-bold text-light-50 mb-6">
                    <AnimatedText 
                      text="Book Your Repair"
                      type="word"
                      delay={200}
                      duration={0.6}
                    />
                  </h2>
                  <div className="text-light-300 text-lg leading-relaxed">
                    <AnimatedText 
                      text="Fill out the form below and we'll get back to you within minutes with a quote and appointment."
                      type="character"
                      delay={800}
                      duration={1.0}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        error={errors.name}
                        required
                        placeholder="John Doe"
                        className="transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Input
                        label="Device Model"
                        value={formData.deviceModel}
                        onChange={(e) => handleInputChange('deviceModel', e.target.value)}
                        error={errors.deviceModel}
                        required
                        placeholder="iPhone 14 Pro"
                        className="transition-all duration-300"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Textarea
                      label="Issue Description"
                      value={formData.issueDescription}
                      onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                      error={errors.issueDescription}
                      required
                      placeholder="Describe what's wrong with your device..."
                      rows={5}
                      className="transition-all duration-300"
                    />
                  </motion.div>

                  <Checkbox
                    label="I would like a proof video of my repair"
                    description="We'll document the before and after process for you"
                    checked={formData.wantsProofVideo}
                    onChange={(e) => handleInputChange('wantsProofVideo', e.target.checked)}
                  />

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Button
                      type="submit"
                      variant="premium"
                      size="xl"
                      loading={isSubmitting}
                      disabled={isSubmitting || isSubmitted}
                      className="w-full"
                      magnetic
                      ripple
                      glowIntensity="high"
                      shimmer
                    >
                      {isSubmitted ? (
                        <>
                          <CheckCircle className="w-6 h-6" />
                          Success! Opening WhatsApp...
                        </>
                      ) : (
                        <>
                          <Calendar className="w-6 h-6" />
                          Send to WhatsApp
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Card>
            </motion.div>
          </div>

          {/* Contact Options */}
          <div className={cn(
            "space-y-8 transition-all duration-1000",
            containerVisible ? "animate-fadeIn animation-delay-500" : "opacity-0"
          )}>
            <div>
              <h3 className="text-2xl font-semibold text-light-50 mb-6">
                <AnimatedText 
                  text="Other Ways to Reach Us"
                  type="word"
                  delay={1000}
                  duration={0.6}
                />
              </h3>
              <div className="text-light-400 text-base leading-relaxed">
                <AnimatedText 
                  text="Prefer a different way to get in touch? Choose what works best for you."
                  type="character"
                  delay={1400}
                  duration={0.8}
                />
              </div>
            </div>

            {/* WhatsApp Chat */}
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Card variant="premium" padding="lg" hover className="group relative overflow-hidden" shimmer>
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <a
                  href={generateWhatsAppLink(WHATSAPP_NUMBER, "Hi! I'd like to book a repair service.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full relative z-10"
                >
                  <motion.div 
                    className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:bg-green-500/30 transition-colors duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <MessageCircle className="w-6 h-6 text-green-400 group-hover:scale-110 transition-all duration-300" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-light-50 text-lg group-hover:text-green-400 transition-colors duration-300">WhatsApp Chat</h4>
                    <p className="text-light-400 group-hover:text-light-300 transition-colors duration-300">Instant messaging</p>
                  </div>
                </a>
              </Card>
            </motion.div>

            {/* Telegram */}
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Card variant="premium" padding="lg" hover className="group relative overflow-hidden" shimmer>
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <a
                  href={TELEGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full relative z-10"
                >
                  <motion.div 
                    className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Send className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-all duration-300" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-light-50 text-lg group-hover:text-blue-400 transition-colors duration-300">Telegram</h4>
                    <p className="text-light-400 group-hover:text-light-300 transition-colors duration-300">Alternative messaging</p>
                  </div>
                </a>
              </Card>
            </motion.div>

            {/* iMessage */}
            <motion.div
              whileHover={{ 
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Card variant="premium" padding="lg" hover className="group relative overflow-hidden" shimmer>
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-600/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <a
                  href={IMESSAGE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full relative z-10"
                >
                  <motion.div 
                    className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center group-hover:bg-blue-600/30 transition-colors duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <MessageCircle className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-all duration-300" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-light-50 text-lg group-hover:text-blue-500 transition-colors duration-300">iMessage</h4>
                    <p className="text-light-400 group-hover:text-light-300 transition-colors duration-300">Apple devices</p>
                  </div>
                </a>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  )
}
