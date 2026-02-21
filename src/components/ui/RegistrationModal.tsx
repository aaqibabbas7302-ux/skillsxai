'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Mail, Phone, BookOpen, CheckCircle2, Loader2, GraduationCap, Briefcase, Sparkles } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

interface RegistrationModalProps {
  portal: 'students' | 'professionals'
}

const courseOptions = {
  students: [
    'AI Fundamentals for Students',
    'School Partnership Program',
    'Parent / Guardian Inquiry',
    'Other',
  ],
  professionals: [
    'Workflow Automation with AI Agents',
    'QA Automation (Playwright & Cypress)',
    'Data Analyst Program',
    'Not sure yet — tell me more',
  ],
}

export default function RegistrationModal({ portal }: RegistrationModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState<'form' | 'success'>('form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: courseOptions[portal][0],
  })

  useEffect(() => {
    const key = `reg_shown_${portal}`
    const shown = sessionStorage.getItem(key)
    if (!shown) {
      const timer = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem(key, 'true')
      }, 1800)
      return () => clearTimeout(timer)
    }
  }, [portal])

  const validate = () => {
    const e: { name?: string; email?: string } = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Enter a valid email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey)
        await supabase.from('contacts').insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          inquiry_type: portal === 'professionals' ? 'corporate' : 'school',
          message: `Registration interest: ${formData.interest}`,
          status: 'new',
        })
      }
      setStep('success')
    } catch {
      setStep('success')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isPro = portal === 'professionals'
  const gradient = isPro ? 'from-purple-600 to-pink-600' : 'from-blue-600 to-cyan-500'
  const gradientHover = isPro ? 'hover:from-purple-500 hover:to-pink-500' : 'hover:from-blue-500 hover:to-cyan-400'
  const borderColor = isPro ? 'border-purple-500/30' : 'border-blue-500/30'
  const accentText = isPro ? 'text-purple-400' : 'text-blue-400'
  const ringFocus = isPro ? 'focus:border-purple-500/50' : 'focus:border-blue-500/50'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 30 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className={`relative w-full max-w-md rounded-3xl border ${borderColor} overflow-hidden`}
            style={{ background: 'rgba(10, 15, 26, 0.97)' }}
          >
            {/* Ambient glow */}
            <div
              className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${gradient} pointer-events-none`}
            />

            {/* Top accent bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />

            <div className="relative p-7">
              {step === 'form' ? (
                <>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white text-xs font-semibold mb-3`}
                      >
                        {isPro ? (
                          <Briefcase className="w-3 h-3" />
                        ) : (
                          <GraduationCap className="w-3 h-3" />
                        )}
                        {isPro ? 'Professional Portal' : 'Students Portal'}
                      </div>
                      <h2 className="text-2xl font-bold text-white leading-tight">
                        {isPro ? 'Reserve Your Seat' : 'Get Started Today'}
                      </h2>
                      <p className={`text-sm mt-1 ${accentText}`}>
                        {isPro
                          ? '500+ professionals already enrolled · 100% placement'
                          : 'Bring AI learning to your school — free demo available'}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-4"
                    >
                      <X className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {/* Name */}
                    <div>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        <input
                          type="text"
                          placeholder="Full Name *"
                          value={formData.name}
                          onChange={e => {
                            setFormData(p => ({ ...p, name: e.target.value }))
                            if (errors.name) setErrors(p => ({ ...p, name: '' }))
                          }}
                          className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/60' : 'border-white/10'} rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 text-sm outline-none ${ringFocus} transition-colors`}
                        />
                      </div>
                      {errors.name && <p className="text-red-400 text-xs mt-1 ml-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        <input
                          type="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={e => {
                            setFormData(p => ({ ...p, email: e.target.value }))
                            if (errors.email) setErrors(p => ({ ...p, email: '' }))
                          }}
                          className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/60' : 'border-white/10'} rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 text-sm outline-none ${ringFocus} transition-colors`}
                        />
                      </div>
                      {errors.email && <p className="text-red-400 text-xs mt-1 ml-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      <input
                        type="tel"
                        placeholder="Phone Number (optional)"
                        value={formData.phone}
                        onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                        className={`w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 text-sm outline-none ${ringFocus} transition-colors`}
                      />
                    </div>

                    {/* Interest dropdown */}
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                      <select
                        value={formData.interest}
                        onChange={e => setFormData(p => ({ ...p, interest: e.target.value }))}
                        className={`w-full bg-[#0f172a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm outline-none ${ringFocus} transition-colors appearance-none cursor-pointer`}
                      >
                        {courseOptions[portal].map(opt => (
                          <option key={opt} value={opt} className="bg-gray-900 text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 rounded-xl text-white font-semibold text-sm bg-gradient-to-r ${gradient} ${gradientHover} transition-all flex items-center justify-center gap-2 mt-1 shadow-lg disabled:opacity-70`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting…
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          {isPro ? 'Reserve My Seat' : 'Request Free Demo'}
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-600 text-center">
                      No spam. Our team will reach out within 24 hours.
                    </p>
                  </form>
                </>
              ) : (
                /* Success */
                <div className="text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-5 shadow-2xl`}
                  >
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-2">You&apos;re In! 🎉</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {isPro
                      ? 'Our placement team will contact you within 24 hours with batch details and fee structure.'
                      : "Awesome! Our team will reach out within 24 hours to discuss your school's AI program."}
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`px-8 py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r ${gradient} ${gradientHover} transition-all`}
                  >
                    Continue Exploring →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
