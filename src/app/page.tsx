'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Workflow, 
  Lightbulb, 
  GraduationCap, 
  Zap, 
  Shield, 
  Rocket, 
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Star,
  Users,
  BookOpen,
  Target
} from 'lucide-react'

// Dynamically import 3D component to avoid SSR issues
const NeuralNetwork3D = dynamic(() => import('@/components/3d/NeuralNetwork3D'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-32 h-32 rounded-full border-4 border-primary-500/20 border-t-primary-500 animate-spin" />
    </div>
  ),
})

const features = [
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    description: 'Learn how AI works in simple and relatable terms',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description: 'Understand how tasks can run automatically step-by-step',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Lightbulb,
    title: 'Logical Thinking',
    description: 'Apply IF–THEN logic to real-world situations',
    color: 'from-cyan-500 to-teal-500',
  },
]

const benefits = [
  {
    icon: GraduationCap,
    title: 'Future Skills',
    description: 'Build strong foundations for higher studies and careers',
  },
  {
    icon: Zap,
    title: 'Smart Learning',
    description: 'Use AI to save time and learn more effectively',
  },
  {
    icon: Shield,
    title: 'Responsible Use',
    description: 'Understand ethics, safety, and data privacy',
  },
]

const stats = [
  { value: '3', label: 'Day Program' },
  { value: '500+', label: 'Students Trained' },
  { value: '95%', label: 'Satisfaction Rate' },
  { value: '50+', label: 'Schools Partnered' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <NeuralNetwork3D />
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/50 via-transparent to-dark-900 z-10" />
        <div className="hero-orb w-96 h-96 bg-primary-500/30 -top-48 -left-48" />
        <div className="hero-orb w-80 h-80 bg-accent-purple/30 top-1/3 -right-40" />
        <div className="hero-orb w-64 h-64 bg-accent-cyan/30 bottom-20 left-1/4" />
        
        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
            >
              <Rocket className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-gray-300">Prepare for the AI-Driven Future</span>
            </motion.div>
            
            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Learn </span>
              <span className="gradient-text">AI Skills</span>
              <br />
              <span className="text-white">for Tomorrow</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
              A practical learning program helping students understand how 
              <span className="text-primary-400"> Artificial Intelligence </span> 
              can perform tasks, make decisions, and work automatically.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/activities" className="btn-primary flex items-center gap-2 text-lg">
                <PlayCircle className="w-5 h-5" />
                Explore Curriculum
              </Link>
              <Link href="/contact" className="btn-secondary flex items-center gap-2 text-lg">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary-500/50 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-primary-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* What is the Course Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              <span className="text-white">What is the </span>
              <span className="gradient-text">Course?</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              Workflow Automation & AI Agents is a practical learning program that helps students 
              understand how Artificial Intelligence can perform tasks, make decisions, and work automatically.
            </motion.p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-8 text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* In Simple Words */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="w-8 h-8 text-primary-400" />
              <h3 className="text-2xl font-bold text-white">In Simple Words</h3>
            </div>
            <p className="text-xl text-gray-300">
              Students learn how to make AI work like a 
              <span className="text-primary-400 font-semibold"> smart helper </span> 
              that follows rules and logic.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why is This Course Important Section */}
      <section className="py-24 relative bg-gradient-to-b from-dark-900/50 to-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              <span className="text-white">Why is This Course </span>
              <span className="gradient-text">Important?</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              AI is becoming a part of education, careers, and daily life. 
              This course prepares students to understand, guide, and use AI responsibly.
            </motion.p>
          </motion.div>

          {/* Benefits Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-8 group"
              >
                <div className="w-14 h-14 mb-6 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                  <benefit.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Early Advantage Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-purple opacity-90" />
            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <Rocket className="w-12 h-12 text-white" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Early Advantage</h3>
                  <p className="text-white/80">
                    Students gain confidence, clarity, and readiness for the AI-driven future.
                  </p>
                </div>
              </div>
              <Link 
                href="/contact"
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Preview Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              <span className="gradient-text">3-Day</span>
              <span className="text-white"> Learning Journey</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              A comprehensive curriculum designed to build AI skills progressively
            </motion.p>
          </motion.div>

          {/* Curriculum Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                day: 'Day 1',
                title: 'AI Fundamentals & Logic',
                topics: [
                  'Introduction to Artificial Intelligence',
                  'AI in daily life & Human vs AI',
                  'Automation concepts & IF-THEN logic',
                  'Basics of prompt writing',
                ],
                icon: Brain,
                color: 'from-blue-500 to-cyan-500',
              },
              {
                day: 'Day 2',
                title: 'Automation & AI Agents',
                topics: [
                  'No-code automation tools',
                  'Workflows, triggers & actions',
                  'Introduction to AI Agents',
                  'Educational AI use cases',
                ],
                icon: Workflow,
                color: 'from-purple-500 to-pink-500',
              },
              {
                day: 'Day 3',
                title: 'Ethics & Career Awareness',
                topics: [
                  'Practical workflow evaluation',
                  'Ethical use of AI',
                  'Data privacy & AI limitations',
                  'Student project presentation',
                ],
                icon: Star,
                color: 'from-cyan-500 to-teal-500',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-8 relative group"
              >
                {/* Day Badge */}
                <div className={`absolute -top-4 left-8 px-4 py-1 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-semibold`}>
                  {item.day}
                </div>
                
                <div className="pt-4">
                  <div className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                  <ul className="space-y-3">
                    {item.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-3 text-gray-400">
                        <CheckCircle2 className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/activities" className="btn-primary inline-flex items-center gap-2">
              View Full Curriculum
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials/Trust Section */}
      <section className="py-24 relative bg-gradient-to-b from-dark-800/50 to-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              <span className="text-white">Trusted by </span>
              <span className="gradient-text">Students & Schools</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                quote: "This course opened my eyes to how AI can help with everyday tasks. The hands-on approach made learning so much fun!",
                author: "Priya S.",
                role: "Class 10 Student",
                rating: 5,
              },
              {
                quote: "Our students showed remarkable improvement in logical thinking and problem-solving after completing this program.",
                author: "Dr. Rajesh Kumar",
                role: "School Principal",
                rating: 5,
              },
              {
                quote: "The curriculum is perfectly designed for young minds. My child now understands AI concepts better than many adults!",
                author: "Sunita M.",
                role: "Parent",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Ready to Start Your </span>
              <span className="gradient-text">AI Journey?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Join thousands of students already learning AI skills with SkillsXAI
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary flex items-center gap-2 text-lg">
                <Users className="w-5 h-5" />
                Enroll Your School
              </Link>
              <Link href="/about" className="btn-secondary flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5" />
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
