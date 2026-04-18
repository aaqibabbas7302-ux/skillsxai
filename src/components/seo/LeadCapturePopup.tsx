'use client'

import { useState, useEffect } from 'react'
import { X, Download, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface LeadCapturePopupProps {
  title?: string
  description?: string
  ctaText?: string
  leadMagnet?: string
  delayMs?: number
}

export default function LeadCapturePopup({
  title = 'Get Your Free Career Roadmap',
  description = 'Download our step-by-step guide to launching your tech career. Includes salary benchmarks, skill paths, and interview tips.',
  ctaText = 'Send Me the Guide',
  leadMagnet = 'career-roadmap',
  delayMs = 30000,
}: LeadCapturePopupProps) {
  const [showPopup, setShowPopup] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const dismissed = sessionStorage.getItem(`popup-dismissed-${leadMagnet}`)
    if (dismissed) return

    const timer = setTimeout(() => {
      setShowPopup(true)
    }, delayMs)

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowPopup(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      clearTimeout(timer)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [delayMs, leadMagnet])

  const handleDismiss = () => {
    setShowPopup(false)
    sessionStorage.setItem(`popup-dismissed-${leadMagnet}`, 'true')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    sessionStorage.setItem(`popup-dismissed-${leadMagnet}`, 'true')
    setTimeout(() => setShowPopup(false), 3000)
  }

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleDismiss}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-dark-800 border border-white/10 rounded-2xl p-8 z-10"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Check your email!</h3>
                <p className="text-gray-400">We&apos;ve sent the guide to your inbox.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm">{description}</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all flex items-center justify-center gap-2"
                  >
                    {ctaText} <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-center text-gray-600 text-xs mt-4">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
