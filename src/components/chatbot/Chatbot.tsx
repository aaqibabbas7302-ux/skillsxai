'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Loader2,
  MinusCircle,
  Maximize2
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Pre-defined responses for common questions
const knowledgeBase: Record<string, string> = {
  'hello': "Hello! 👋 Welcome to SkillsXAI! I'm your AI assistant. How can I help you today? Feel free to ask about our courses, curriculum, or enrollment process!",
  'hi': "Hi there! 👋 Welcome to SkillsXAI! I'm here to help you learn about our AI education programs. What would you like to know?",
  'course': "Our main offering is the **Workflow Automation & AI Agents** program - a 3-day intensive course designed for school students. It covers:\n\n🤖 **Day 1:** AI Fundamentals & Logic\n🔁 **Day 2:** Automation & AI Agents\n🛡️ **Day 3:** Ethics & Career Awareness\n\nWould you like to know more about any specific day?",
  'curriculum': "Our curriculum is carefully designed for students aged 12-18. Here's what we cover:\n\n**Day 1:** Introduction to AI, IF-THEN logic, prompt writing basics\n**Day 2:** No-code automation tools, AI agents, workflows\n**Day 3:** Ethics, data privacy, career awareness, project presentation\n\nNo prior coding experience needed! Would you like more details?",
  'price': "For pricing information and customized packages for your school, please contact us directly:\n\n📧 Email: hello@skillsxai.com\n📞 Phone: +1 (234) 567-890\n\nWe offer flexible pricing based on the number of students and program customization needs.",
  'enroll': "Great interest in enrolling! 🎉 Here's how to get started:\n\n1. Fill out our contact form on the Contact page\n2. Select 'School Partnership' or 'Parent Inquiry'\n3. Our team will reach out within 24 hours\n\nYou can also email us directly at hello@skillsxai.com",
  'age': "Our program is designed for students aged **12-18 years** (typically grades 7-12). The content is adapted based on the grade level to ensure it's engaging and appropriate for each age group.",
  'duration': "The core program is **3 days** (approximately 6 hours per day, totaling 18 hours). We also offer:\n\n• Extended 5-day programs\n• Weekend workshops\n• After-school sessions\n\nContact us to discuss the best format for your school!",
  'coding': "**No coding experience required!** 🎉\n\nOur program uses no-code automation tools and focuses on concepts like logical thinking, workflow design, and responsible AI use. Students learn to work WITH AI, not necessarily to build it from scratch.",
  'certificate': "Yes! Upon successful completion of the program, students receive:\n\n🏆 **Certificate of Completion** from SkillsXAI\n📊 **Skills Assessment Report**\n💡 **Project Portfolio** featuring their automation project\n\nThese can be great additions to college applications!",
  'contact': "You can reach us through:\n\n📧 **Email:** hello@skillsxai.com\n📞 **Phone:** +1 (234) 567-890\n🌐 **Contact Form:** Visit our Contact page\n\nWe typically respond within 24 hours!",
  'ai': "Artificial Intelligence (AI) refers to computer systems that can perform tasks that typically require human intelligence. This includes:\n\n• Understanding language\n• Making decisions\n• Recognizing patterns\n• Learning from experience\n\nOur course helps students understand these concepts in a fun, practical way!",
  'automation': "Workflow automation is about making repetitive tasks run automatically. For example:\n\n• Automatically organizing files\n• Sending scheduled emails\n• Processing form responses\n\nStudents learn to identify these opportunities and build simple automated workflows using no-code tools!",
  'default': "Thanks for your question! I'm here to help you learn about SkillsXAI. Here are some things I can help with:\n\n• 📚 **Course information** - What we teach\n• 🎯 **Curriculum details** - Day-by-day breakdown\n• 💰 **Pricing & enrollment** - How to join\n• 👥 **Age requirements** - Who can participate\n• 📞 **Contact information** - Get in touch\n\nWhat would you like to know more about?"
}

function getAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()
  
  // Check for keywords in the message
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return knowledgeBase['hello']
  }
  if (lowerMessage.includes('course') || lowerMessage.includes('program') || lowerMessage.includes('what do you teach')) {
    return knowledgeBase['course']
  }
  if (lowerMessage.includes('curriculum') || lowerMessage.includes('syllabus') || lowerMessage.includes('topics') || lowerMessage.includes('learn')) {
    return knowledgeBase['curriculum']
  }
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('how much')) {
    return knowledgeBase['price']
  }
  if (lowerMessage.includes('enroll') || lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('join')) {
    return knowledgeBase['enroll']
  }
  if (lowerMessage.includes('age') || lowerMessage.includes('grade') || lowerMessage.includes('years old') || lowerMessage.includes('class')) {
    return knowledgeBase['age']
  }
  if (lowerMessage.includes('duration') || lowerMessage.includes('how long') || lowerMessage.includes('days') || lowerMessage.includes('hours')) {
    return knowledgeBase['duration']
  }
  if (lowerMessage.includes('coding') || lowerMessage.includes('programming') || lowerMessage.includes('code') || lowerMessage.includes('experience')) {
    return knowledgeBase['coding']
  }
  if (lowerMessage.includes('certificate') || lowerMessage.includes('certification') || lowerMessage.includes('credential')) {
    return knowledgeBase['certificate']
  }
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
    return knowledgeBase['contact']
  }
  if (lowerMessage.includes('what is ai') || lowerMessage.includes('artificial intelligence') || lowerMessage.includes('explain ai')) {
    return knowledgeBase['ai']
  }
  if (lowerMessage.includes('automation') || lowerMessage.includes('automate') || lowerMessage.includes('workflow')) {
    return knowledgeBase['automation']
  }
  if (lowerMessage.includes('thank')) {
    return "You're welcome! 😊 If you have any more questions about SkillsXAI, feel free to ask. We're here to help you start your AI learning journey!"
  }
  if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
    return "Goodbye! 👋 Thanks for chatting with us. Feel free to come back anytime you have questions. Good luck with your AI learning journey! 🚀"
  }
  
  return knowledgeBase['default']
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi there! 👋 I'm the SkillsXAI assistant. I can help answer your questions about our AI education programs, curriculum, enrollment, and more. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const aiResponse = getAIResponse(userMessage.content)
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    }

    setIsTyping(false)
    setMessages(prev => [...prev, assistantMessage])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan shadow-lg flex items-center justify-center group hover:scale-110 transition-transform"
            style={{ boxShadow: '0 4px 30px rgba(59, 130, 246, 0.5)' }}
          >
            <MessageCircle className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-dark-900" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 'auto' : '600px',
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] glass rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ boxShadow: '0 8px 60px rgba(59, 130, 246, 0.3)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary-500/20 bg-gradient-to-r from-primary-600/20 to-accent-purple/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">SkillsXAI Assistant</h3>
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <MinusCircle className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-accent-purple/30' 
                          : 'bg-primary-500/30'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="w-4 h-4 text-accent-purple" />
                        ) : (
                          <Sparkles className="w-4 h-4 text-primary-400" />
                        )}
                      </div>
                      <div className={`max-w-[75%] p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-accent-purple/20 text-white rounded-tr-sm'
                          : 'bg-dark-700 text-gray-200 rounded-tl-sm'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-[10px] text-gray-500 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary-500/30 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-primary-400" />
                      </div>
                      <div className="bg-dark-700 p-3 rounded-2xl rounded-tl-sm">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-primary-500/20">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything..."
                      className="flex-1 px-4 py-3 rounded-xl bg-dark-700 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors text-sm"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping}
                      className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-accent-cyan flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                    >
                      {isTyping ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 text-center mt-2">
                    Powered by SkillsXAI 🤖
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
