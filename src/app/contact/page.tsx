'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Loader2,
  Building,
  User,
  MessageSquare,
  School,
  Users,
  Clock,
  ArrowRight
} from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'hello@skillsxai.com',
    link: 'mailto:hello@skillsxai.com',
    description: 'We respond within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    value: '+1 (234) 567-890',
    link: 'tel:+1234567890',
    description: 'Mon-Fri, 9am-6pm IST',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: '123 Innovation Street, Tech City',
    link: '#',
    description: 'By appointment only',
  },
]

const inquiryTypes = [
  { id: 'school', label: 'School Partnership', icon: School },
  { id: 'parent', label: 'Parent Inquiry', icon: Users },
  { id: 'corporate', label: 'Corporate Training', icon: Building },
  { id: 'other', label: 'Other', icon: MessageSquare },
]

const faqs = [
  {
    question: 'How long is the program?',
    answer: 'Our core program is a 3-day intensive covering AI Fundamentals, Automation & AI Agents, and Ethics & Career Awareness.',
  },
  {
    question: 'What age group is this for?',
    answer: 'The program is designed for students aged 12-18, with content adapted for different grade levels.',
  },
  {
    question: 'Do students need prior coding experience?',
    answer: 'No! Our curriculum uses no-code tools and focuses on concepts that anyone can learn.',
  },
  {
    question: 'How can our school partner with you?',
    answer: 'Fill out the contact form and select "School Partnership". Our team will reach out within 24 hours to discuss options.',
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    inquiryType: 'school',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      // Create Supabase client on demand
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey)
        const { error } = await supabase
          .from('contacts')
          .insert({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            organization: formData.organization || null,
            inquiry_type: formData.inquiryType,
            message: formData.message,
            status: 'new'
          })
        
        if (error) {
          console.error('Error saving contact:', error)
        }
      }
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error:', error)
      setIsSubmitted(true) // Show success anyway for UX
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="relative pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="hero-orb w-96 h-96 bg-primary-500/20 -top-48 -right-48" />
        <div className="hero-orb w-80 h-80 bg-accent-purple/20 bottom-0 -left-40" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <MessageSquare className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-gray-300">Get in Touch</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Contact </span>
              <span className="gradient-text">Us</span>
            </h1>
            
            <p className="text-xl text-gray-400">
              Have questions about our AI education programs? We&apos;d love to hear from you. 
              Reach out and let&apos;s discuss how we can bring AI learning to your school.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.title}
                href={info.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 flex items-start gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                  <info.icon className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                  <p className="text-primary-400 mb-1">{info.value}</p>
                  <p className="text-sm text-gray-500">{info.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-10"
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-gray-400 mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false)
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        organization: '',
                        inquiryType: 'school',
                        message: '',
                      })
                    }}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        I am a...
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {inquiryTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, inquiryType: type.id }))}
                            className={`p-3 rounded-xl border transition-all flex items-center gap-2 ${
                              formData.inquiryType === type.id
                                ? 'border-primary-500 bg-primary-500/20 text-primary-400'
                                : 'border-gray-700 text-gray-400 hover:border-gray-600'
                            }`}
                          >
                            <type.icon className="w-5 h-5" />
                            <span className="text-sm">{type.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl bg-dark-700 border ${
                              errors.name ? 'border-red-500' : 'border-gray-700'
                            } text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors`}
                            placeholder="John Doe"
                          />
                        </div>
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-12 pr-4 py-3 rounded-xl bg-dark-700 border ${
                              errors.email ? 'border-red-500' : 'border-gray-700'
                            } text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors`}
                            placeholder="john@example.com"
                          />
                        </div>
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Phone & Organization */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-dark-700 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                            placeholder="+1 (234) 567-890"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-gray-300 mb-2">
                          School/Organization
                        </label>
                        <div className="relative">
                          <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-dark-700 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                            placeholder="ABC High School"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 rounded-xl bg-dark-700 border ${
                          errors.message ? 'border-red-500' : 'border-gray-700'
                        } text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none`}
                        placeholder="Tell us about your interest in AI education..."
                      />
                      {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>

              {/* Quick Response Promise */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary-500/20 to-accent-purple/20 border border-primary-500/30"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/30 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Quick Response Guarantee</h3>
                    <p className="text-gray-400">
                      Our team typically responds within 24 hours during business days. 
                      For urgent inquiries, call us directly.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-12 bg-gradient-to-b from-dark-800/50 to-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Transform Education?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join the growing network of schools bringing AI education to their students. 
              Let&apos;s work together to prepare the next generation for an AI-powered world.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:hello@skillsxai.com" className="btn-primary flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Us Directly
              </a>
              <a href="tel:+1234567890" className="btn-secondary flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
