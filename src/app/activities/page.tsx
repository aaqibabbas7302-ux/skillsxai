'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Brain, 
  Workflow, 
  Star, 
  CheckCircle2, 
  Clock, 
  Target, 
  BookOpen,
  Lightbulb,
  Code2,
  Bot,
  Shield,
  Users,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Zap
} from 'lucide-react'

const FloatingBrain3D = dynamic(() => import('@/components/3d/FloatingBrain3D'), {
  ssr: false,
  loading: () => null,
})

const curriculumData = [
  {
    day: 1,
    title: 'AI Fundamentals & Logic',
    description: 'Build a strong foundation in AI concepts and logical thinking',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    duration: '6 hours',
    topics: [
      {
        title: 'Introduction to Artificial Intelligence',
        description: 'Understand what AI is and how it differs from regular computer programs',
        icon: Sparkles,
      },
      {
        title: 'AI in Daily Life',
        description: 'Explore real-world examples of AI around us',
        icon: Target,
      },
      {
        title: 'Human Intelligence vs AI',
        description: 'Compare and contrast human thinking with machine learning',
        icon: Brain,
      },
      {
        title: 'Large Language Models (Basic Idea)',
        description: 'Introduction to how AI models like ChatGPT work',
        icon: Bot,
      },
      {
        title: 'AI Limitations and Responsibility',
        description: 'Understanding what AI cannot do and using it responsibly',
        icon: Shield,
      },
      {
        title: 'Automation Concepts',
        description: 'Learn the fundamentals of task automation',
        icon: Workflow,
      },
      {
        title: 'IF–THEN Logic',
        description: 'Master conditional thinking and logical operators',
        icon: Code2,
      },
      {
        title: 'Triggers and Actions',
        description: 'Understand event-driven automation',
        icon: Zap,
      },
      {
        title: 'Identifying Repetitive Tasks',
        description: 'Learn to spot automation opportunities',
        icon: Target,
      },
      {
        title: 'Basics of Prompt Writing',
        description: 'Introduction to communicating effectively with AI',
        icon: Lightbulb,
      },
    ],
  },
  {
    day: 2,
    title: 'Automation & AI Agents',
    description: 'Hands-on experience with automation tools and AI agents',
    icon: Workflow,
    color: 'from-purple-500 to-pink-500',
    duration: '6 hours',
    topics: [
      {
        title: 'No-Code Automation Tools',
        description: 'Introduction to visual automation platforms',
        icon: Code2,
      },
      {
        title: 'Workflows and Nodes',
        description: 'Building block approach to automation',
        icon: Workflow,
      },
      {
        title: 'Triggers, Actions, and Data Flow',
        description: 'Creating connected automation sequences',
        icon: Zap,
      },
      {
        title: 'Input and Output Handling',
        description: 'Managing data in automated workflows',
        icon: Target,
      },
      {
        title: 'Form-Based Automation',
        description: 'Automating data collection and processing',
        icon: BookOpen,
      },
      {
        title: 'Introduction to AI Agents',
        description: 'Understanding autonomous AI systems',
        icon: Bot,
      },
      {
        title: 'AI in Workflows',
        description: 'Integrating AI capabilities into automation',
        icon: Brain,
      },
      {
        title: 'Educational AI Use Cases',
        description: 'AI applications in learning and education',
        icon: Lightbulb,
      },
      {
        title: 'Memory and Context in AI',
        description: 'How AI remembers and uses context',
        icon: Sparkles,
      },
      {
        title: 'Real-Life Automation Examples',
        description: 'Case studies and practical demonstrations',
        icon: Target,
      },
    ],
  },
  {
    day: 3,
    title: 'Ethics & Career Awareness',
    description: 'Responsible AI use and future career preparation',
    icon: Star,
    color: 'from-cyan-500 to-teal-500',
    duration: '6 hours',
    topics: [
      {
        title: 'Revision of Key Concepts',
        description: 'Comprehensive review of Days 1 & 2',
        icon: BookOpen,
      },
      {
        title: 'Practical Workflow Evaluation',
        description: 'Assess and improve automated workflows',
        icon: Target,
      },
      {
        title: 'Prompt Writing Assessment',
        description: 'Test and refine prompt engineering skills',
        icon: Lightbulb,
      },
      {
        title: 'Theory Assessment',
        description: 'Knowledge check on core concepts',
        icon: CheckCircle2,
      },
      {
        title: 'Ethical Use of AI',
        description: 'Guidelines for responsible AI usage',
        icon: Shield,
      },
      {
        title: 'Academic Honesty',
        description: 'Using AI ethically in educational settings',
        icon: BookOpen,
      },
      {
        title: 'Data Privacy',
        description: 'Understanding and protecting personal data',
        icon: Shield,
      },
      {
        title: 'AI Bias and Limitations',
        description: 'Recognizing and addressing AI shortcomings',
        icon: Brain,
      },
      {
        title: 'Career Awareness',
        description: 'Future opportunities in AI and automation',
        icon: Users,
      },
      {
        title: 'Student Project Presentation',
        description: 'Showcase your automation project',
        icon: Star,
      },
    ],
  },
]

const learningOutcomes = [
  {
    title: 'Understand AI Concepts',
    description: 'Grasp fundamental AI principles and how they apply to everyday life',
    icon: Brain,
  },
  {
    title: 'Build Automated Workflows',
    description: 'Create functional automation using no-code tools',
    icon: Workflow,
  },
  {
    title: 'Write Effective Prompts',
    description: 'Communicate efficiently with AI systems',
    icon: Lightbulb,
  },
  {
    title: 'Apply Ethical Thinking',
    description: 'Use AI responsibly and understand its limitations',
    icon: Shield,
  },
]

export default function ActivitiesPage() {
  const [activeDay, setActiveDay] = useState(1)
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)

  const activeData = curriculumData.find((d) => d.day === activeDay)

  return (
    <div className="relative pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* 3D Background */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-50 pointer-events-none">
          <FloatingBrain3D />
        </div>
        
        {/* Gradient Orbs */}
        <div className="hero-orb w-96 h-96 bg-primary-500/20 -top-48 -left-48" />
        <div className="hero-orb w-80 h-80 bg-accent-purple/20 top-1/2 -right-40" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <BookOpen className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-gray-300">Comprehensive Curriculum</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Curriculum </span>
              <span className="gradient-text">Content</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8">
              A 3-day intensive program designed to transform students into AI-ready learners. 
              Each day builds upon the previous, creating a comprehensive learning experience.
            </p>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">18 Hours Total</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">30+ Topics</span>
              </div>
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">Hands-on Projects</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Day Tabs */}
      <section className="py-12 border-y border-primary-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {curriculumData.map((day) => (
              <motion.button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeDay === day.day
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white glass'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeDay === day.day && (
                  <motion.div
                    layoutId="activeDayBg"
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${day.color}`}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  <day.icon className="w-5 h-5" />
                  <span>Day {day.day}</span>
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Day Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {activeData && (
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Day Header */}
                <div className="text-center mb-12">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${activeData.color} mb-6`}>
                    <activeData.icon className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Day {activeData.day}: {activeData.title}
                  </h2>
                  <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    {activeData.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4 text-primary-400">
                    <Clock className="w-5 h-5" />
                    <span>{activeData.duration}</span>
                  </div>
                </div>

                {/* Topics Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {activeData.topics.map((topic, index) => (
                    <motion.div
                      key={topic.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-card overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedTopic(expandedTopic === topic.title ? null : topic.title)}
                        className="w-full p-6 flex items-start gap-4 text-left"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeData.color} flex items-center justify-center flex-shrink-0`}>
                          <topic.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white">{topic.title}</h3>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-400 transition-transform ${
                                expandedTopic === topic.title ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                          <AnimatePresence>
                            {expandedTopic === topic.title && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="text-gray-400 mt-2"
                              >
                                {topic.description}
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-20 bg-gradient-to-b from-dark-900/50 to-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">
              <span className="text-white">Learning </span>
              <span className="gradient-text">Outcomes</span>
            </h2>
            <p className="section-subtitle">
              What students will achieve by completing this program
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningOutcomes.map((outcome, index) => (
              <motion.div
                key={outcome.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <outcome.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{outcome.title}</h3>
                <p className="text-gray-400 text-sm">{outcome.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Enroll your school or child in our comprehensive AI education program
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/about" className="btn-secondary">
                Learn More About Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
