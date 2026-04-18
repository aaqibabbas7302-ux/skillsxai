'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, ArrowRight } from 'lucide-react'

interface StickyCourseCTAProps {
  courseName: string
  ctaText?: string
  ctaHref?: string
  gradientFrom?: string
  gradientTo?: string
}

export default function StickyCourseCTA({
  courseName,
  ctaText = 'Enroll Now',
  ctaHref = '/contact',
  gradientFrom = 'from-blue-600',
  gradientTo = 'to-cyan-600',
}: StickyCourseCTAProps) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (dismissed || !visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} px-4 py-3 flex items-center justify-between gap-3`}>
        <div className="min-w-0">
          <p className="text-white text-sm font-semibold truncate">{courseName}</p>
          <p className="text-white/70 text-xs">Next batch starting soon</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
          >
            {ctaText} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1 text-white/60 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
