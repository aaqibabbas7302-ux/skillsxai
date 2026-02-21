'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import {
  GraduationCap,
  Briefcase,
  ArrowRight,
  Brain,
  CheckCircle2,
  Rocket,
  Users,
  Star,
  Zap,
  Target,
  Bot,
  TestTube2,
  BarChart3,
} from 'lucide-react'

export default function GatewayPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 px-4">
      {/* Ambient gradient orbs */}
      <div className="hero-orb w-[600px] h-[600px] bg-blue-500/10 -top-60 -left-60" />
      <div className="hero-orb w-[600px] h-[600px] bg-purple-600/10 -bottom-60 -right-60" />
      <div className="hero-orb w-[300px] h-[300px] bg-cyan-500/10 top-1/3 left-1/2 -translate-x-1/2" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Zap className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-gray-300">India&apos;s Leading AI Learning Platform</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Choose Your </span>
            <span className="gradient-text">Learning Path</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            World-class AI education for schools and career-transforming courses for
            professionals — all under one platform.
          </p>
        </motion.div>

        {/* Two Portal Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* ── Schools Portal ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group"
          >
            <Link href="/schools">
              <div className="relative h-full overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-[#020b18] to-[#041525] p-8 lg:p-10 cursor-pointer transition-all duration-500 hover:border-blue-400/50 hover:shadow-[0_0_80px_rgba(59,130,246,0.18)] hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-3xl pointer-events-none" />

                <div className="relative">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-6">
                    <GraduationCap className="w-3.5 h-3.5" /> For Schools · Classes 9–12
                  </span>

                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    AI for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                      Schools
                    </span>
                  </h2>

                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    India&apos;s most loved AI literacy program for school students. Our
                    3-day intensive workshop builds foundational AI skills, logical
                    thinking, and responsible AI awareness.
                  </p>

                  <ul className="space-y-3 mb-10">
                    {[
                      '3-Day AI intensive workshop',
                      '500+ students trained across India',
                      'No prior coding knowledge required',
                      'Complete curriculum & facilitator support',
                      'Certificate of completion for every student',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-blue-500/10">
                    {[
                      { value: '500+', label: 'Students' },
                      { value: '50+', label: 'Schools' },
                      { value: '95%', label: 'Satisfaction' },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                          {s.value}
                        </div>
                        <div className="text-gray-500 text-sm">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-lg font-semibold text-blue-400 group-hover:gap-5 transition-all duration-300">
                    Partner With Us <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* ── Professionals Portal ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="group"
          >
            <Link href="/professionals">
              <div className="relative h-full overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-[#0d0318] to-[#130428] p-8 lg:p-10 cursor-pointer transition-all duration-500 hover:border-purple-400/50 hover:shadow-[0_0_80px_rgba(139,92,246,0.18)] hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-3xl pointer-events-none" />

                {/* Pulsing badge */}
                <div className="absolute top-6 right-6">
                  <motion.span
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg"
                  >
                    🔥 100% PLACEMENT
                  </motion.span>
                </div>

                <div className="relative">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-6">
                    <Rocket className="w-3.5 h-3.5" /> For Working Professionals
                  </span>

                  <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    Upskill for <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      Professionals
                    </span>
                  </h2>

                  <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                    Job-ready courses in the most in-demand tech skills. Learn from
                    industry experts, build real projects, and get placed with our
                    100% placement assistance.
                  </p>

                  <div className="space-y-3 mb-10">
                    {[
                      { name: 'Workflow Automation with AI Agents', icon: Bot, color: 'border-purple-500/30 bg-purple-500/5' },
                      { name: 'QA Automation with Playwright & Cypress', icon: TestTube2, color: 'border-blue-500/30 bg-blue-500/5' },
                      { name: 'Data Analyst with Python & Power BI', icon: BarChart3, color: 'border-cyan-500/30 bg-cyan-500/5' },
                    ].map((course, i) => (
                      <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${course.color}`}>
                        <course.icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        <span className="text-gray-200 font-medium text-sm">{course.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-purple-500/10">
                    {[
                      { value: '100%', label: 'Placement' },
                      { value: '8–10w', label: 'Duration' },
                      { value: '1:1', label: 'Mentorship' },
                    ].map((s, i) => (
                      <div key={i} className="text-center">
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                          {s.value}
                        </div>
                        <div className="text-gray-500 text-sm">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-lg font-semibold text-purple-400 group-hover:gap-5 transition-all duration-300">
                    Explore Courses <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 text-xs mb-6 uppercase tracking-widest">
            Trusted across India
          </p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { icon: Users, value: '500+ Students' },
              { icon: GraduationCap, value: '50+ Partner Schools' },
              { icon: Star, value: '95% Satisfaction' },
              { icon: Target, value: '10+ Cities' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-500">
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
