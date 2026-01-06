'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Target, 
  Lightbulb, 
  Heart, 
  Users, 
  Award, 
  Rocket,
  BookOpen,
  Shield,
  Sparkles,
  ArrowRight,
  Linkedin,
  Twitter,
  Mail,
  GraduationCap,
  Globe,
  Zap
} from 'lucide-react'

const FloatingBrain3D = dynamic(() => import('@/components/3d/FloatingBrain3D'), {
  ssr: false,
  loading: () => null,
})

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We embrace cutting-edge technology to create engaging learning experiences.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Heart,
    title: 'Student-Centric',
    description: 'Every decision we make puts students\' growth and success first.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Shield,
    title: 'Responsibility',
    description: 'We teach ethical AI use and digital citizenship from day one.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Users,
    title: 'Inclusivity',
    description: 'Making AI education accessible to all students regardless of background.',
    color: 'from-blue-500 to-cyan-500',
  },
]

const team = [
  {
    name: 'Dr. Anika Sharma',
    role: 'Founder & CEO',
    bio: 'Former AI researcher with 15+ years in education technology. Passionate about democratizing AI education.',
    image: null,
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Rahul Verma',
    role: 'Head of Curriculum',
    bio: 'EdTech specialist with experience designing programs for 50+ schools across the country.',
    image: null,
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Priya Patel',
    role: 'Lead AI Trainer',
    bio: 'Machine learning engineer turned educator. Makes complex AI concepts simple and fun.',
    image: null,
    linkedin: '#',
    twitter: '#',
  },
  {
    name: 'Vikram Singh',
    role: 'Technology Director',
    bio: 'Full-stack developer building the platforms that power our interactive learning experiences.',
    image: null,
    linkedin: '#',
    twitter: '#',
  },
]

const milestones = [
  {
    year: '2024',
    title: 'Founded',
    description: 'SkillsXAI was born with a mission to prepare students for the AI era',
    icon: Rocket,
  },
  {
    year: '2024',
    title: 'First Program',
    description: 'Launched our 3-day AI fundamentals program in 10 pilot schools',
    icon: BookOpen,
  },
  {
    year: '2025',
    title: 'Rapid Growth',
    description: 'Expanded to 50+ schools and trained over 500 students',
    icon: GraduationCap,
  },
  {
    year: '2026',
    title: 'National Reach',
    description: 'Partnering with schools across the country to scale AI education',
    icon: Globe,
  },
]

export default function AboutPage() {
  return (
    <div className="relative pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* 3D Background */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-40 pointer-events-none">
          <FloatingBrain3D />
        </div>
        
        {/* Gradient Orbs */}
        <div className="hero-orb w-96 h-96 bg-accent-purple/20 -top-48 -left-48" />
        <div className="hero-orb w-80 h-80 bg-primary-500/20 bottom-0 -right-40" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-gray-300">Our Story</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">About </span>
              <span className="gradient-text">SkillsXAI</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-8">
              We&apos;re on a mission to prepare the next generation for an AI-powered world. 
              Through innovative education programs, we empower students to understand, 
              use, and shape artificial intelligence responsibly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-b from-dark-900/50 to-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-12"
            >
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400 text-lg">
                To equip every student with the knowledge and skills to thrive in an AI-driven world. 
                We believe that understanding AI is no longer optional—it&apos;s essential for future success.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-12"
            >
              <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-accent-purple to-pink-500 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-400 text-lg">
                A world where every young person can confidently navigate, contribute to, and shape 
                the future of artificial intelligence with creativity, ethics, and purpose.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              <span className="text-white">Our </span>
              <span className="gradient-text">Values</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="glass-card p-6 text-center group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-gradient-to-b from-dark-800/50 to-dark-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              <span className="text-white">Our </span>
              <span className="gradient-text">Journey</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              From a vision to a movement
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-purple to-accent-cyan hidden md:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`glass-card p-6 inline-block ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                      <span className="text-primary-400 font-mono text-sm">{milestone.year}</span>
                      <h3 className="text-xl font-semibold text-white mt-1 mb-2">{milestone.title}</h3>
                      <p className="text-gray-400">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-cyan flex items-center justify-center shadow-lg glow-blue flex-shrink-0 hidden md:flex">
                    <milestone.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="section-title">
              <span className="text-white">Meet Our </span>
              <span className="gradient-text">Team</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              Passionate educators and technologists dedicated to your success
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="glass-card p-6 text-center group"
              >
                {/* Avatar */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-3xl font-bold text-white">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-primary-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                
                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <a
                    href={member.linkedin}
                    className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400 hover:bg-primary-500/30 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={member.twitter}
                    className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400 hover:bg-primary-500/30 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@skillsxai.com`}
                    className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center text-primary-400 hover:bg-primary-500/30 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-dark-900/50 to-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '500+', label: 'Students Trained' },
              { value: '50+', label: 'Partner Schools' },
              { value: '95%', label: 'Satisfaction Rate' },
              { value: '10+', label: 'Cities Reached' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-purple opacity-90" />
            <div className="relative p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join Our Mission
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Partner with us to bring AI education to your school or organization
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/activities"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
                >
                  View Curriculum
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
