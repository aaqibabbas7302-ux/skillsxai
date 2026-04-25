'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  TrendingUp,
  Brain,
  Bot,
  MessageSquare,
  BarChart3,
  Layers,
  Award,
  FileText,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Star,
  Shield,
  Users,
  Play,
  Download,
  Briefcase,
  GraduationCap,
} from 'lucide-react'
import { courses } from '@/lib/certification/courses'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Brain,
  Bot,
  MessageSquare,
  BarChart3,
  Layers,
}

const GOOGLE_LOGO_SVG = `<svg viewBox="0 0 24 24" width="14" height="14" style="vertical-align:middle"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>`

function DemoCertificatePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative mx-auto max-w-2xl"
      style={{ perspective: '1200px' }}
    >
      {/* Glow behind cert */}
      <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl pointer-events-none" />

      {/* Certificate card */}
      <div className="relative rounded-2xl border-2 border-white/10 overflow-hidden bg-gradient-to-br from-[#0a0f1a] via-[#0f172a] to-[#0a0f1a] shadow-2xl shadow-blue-500/10">
        {/* Top gradient strip */}
        <div className="h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 via-purple-500 to-pink-500" />

        <div className="p-6 md:p-8 text-center">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <span className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 tracking-wide">
              SkillsXAI
            </span>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-[10px] text-blue-300 font-semibold">
              <span dangerouslySetInnerHTML={{ __html: GOOGLE_LOGO_SVG }} />
              Approved by Google
            </div>
          </div>

          {/* Separator */}
          <div className="w-24 h-px mx-auto bg-gradient-to-r from-transparent via-blue-500 to-transparent mb-4" />

          {/* Label */}
          <p className="text-[9px] font-bold tracking-[4px] uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mb-2">
            Certificate of Achievement
          </p>
          <h3 className="text-lg md:text-xl font-bold text-gray-300 mb-3 font-serif">
            This Certificate is Proudly Presented to
          </h3>

          {/* Name */}
          <p className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 font-serif mb-1">
            Your Name Here
          </p>
          <div className="w-32 h-0.5 mx-auto bg-gradient-to-r from-transparent via-blue-500/60 to-transparent mb-3" />

          <p className="text-xs text-gray-500 max-w-md mx-auto mb-4">
            for successfully completing the SkillsXAI Certification program and demonstrating proficiency in industry-relevant skills.
          </p>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {['AI & GenAI', 'Prompt Engineering', 'Digital Marketing', 'Data Analytics'].map((s, i) => {
              const colors = [
                'text-blue-400 border-blue-500/30 bg-blue-500/10',
                'text-purple-400 border-purple-500/30 bg-purple-500/10',
                'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
                'text-pink-400 border-pink-500/30 bg-pink-500/10',
              ]
              return (
                <span key={s} className={`px-2.5 py-0.5 rounded text-[10px] font-semibold border ${colors[i]}`}>
                  {s}
                </span>
              )
            })}
          </div>

          {/* Footer */}
          <div className="flex items-end justify-between px-4">
            <div className="text-center">
              <p className="text-sm text-blue-400 italic font-serif">Nawab Khan</p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto my-1" />
              <p className="text-[9px] text-gray-400 font-semibold">Nawab Khan</p>
              <p className="text-[8px] text-gray-600">Founder, SkillsXAI</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20 border-2 border-[#0f172a]">
              <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
                <span className="text-[5px] font-black text-white tracking-wide text-center leading-tight">SKILLS<br />X AI</span>
              </div>
            </div>
            <div className="text-center">
              <span dangerouslySetInnerHTML={{ __html: GOOGLE_LOGO_SVG }} />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto my-1" />
              <p className="text-[9px] text-gray-400 font-semibold">Google Approved</p>
              <p className="text-[8px] text-gray-600">Technology Partner</p>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 via-blue-500 to-cyan-400" />
      </div>

      {/* "Add to LinkedIn" floating badge */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="absolute -right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0a66c2] text-white text-xs font-bold shadow-xl shadow-[#0a66c2]/30 border border-[#0a66c2]/50"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        Add to LinkedIn
      </motion.div>

      {/* "Download PDF" floating badge */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute -left-3 top-1/3 hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold shadow-xl shadow-blue-500/30"
      >
        <Download className="w-3.5 h-3.5" />
        Download PDF
      </motion.div>
    </motion.div>
  )
}

export default function CertificationLandingPage() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#060a14]">
      {/* ── Background layers ── */}
      {/* Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(59,130,246,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial gradient center */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 60%)' }} />
      {/* Floating orbs */}
      <div className="fixed w-[800px] h-[800px] rounded-full pointer-events-none -top-[400px] left-1/2 -translate-x-1/2" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.06), transparent 70%)' }} />
      <div className="fixed w-[600px] h-[600px] rounded-full pointer-events-none bottom-0 -left-[200px]" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.05), transparent 70%)' }} />
      <div className="fixed w-[500px] h-[500px] rounded-full pointer-events-none bottom-0 -right-[100px]" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.04), transparent 70%)' }} />

      {/* ── Header ── */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <GraduationCap className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              SkillsXAI
            </span>
            <span className="text-[10px] text-gray-600 block -mt-0.5 font-medium tracking-wider uppercase">
              Certification Portal
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
          >
            Visit SkillsXAI <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative z-10 max-w-5xl mx-auto text-center px-4 pt-8 pb-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Industry-Recognized Certifications
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-5 leading-[1.1]">
            Get{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
              Certified
            </span>
            <br className="hidden sm:block" />
            in the Skills That Matter
          </h1>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-4">
            Watch video lessons, solve interactive challenges, pass a quiz, and earn a professional
            certificate you can add to LinkedIn & your CV.
          </p>
          <div className="flex items-center justify-center gap-6 mb-10 flex-wrap">
            {[
              { icon: Play, text: 'Video Lessons' },
              { icon: Shield, text: 'Google Approved' },
              { icon: Briefcase, text: 'Add to CV' },
              { icon: Users, text: 'Free Counselling' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <f.icon className="w-3.5 h-3.5 text-blue-400/80" />
                <span>{f.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Demo Certificate ── */}
      <section className="relative z-10 px-4 pb-16">
        <DemoCertificatePreview />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center text-xs text-gray-600 mt-6"
        >
          Your name appears on a real certificate — verified at skillsxai.com/certificatedownload/&lt;id&gt;
        </motion.p>
      </section>

      {/* ── How It Works ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-center text-2xl font-bold text-white mb-8">How It Works</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: '1', icon: GraduationCap, title: 'Register', desc: 'Enter your name, email & phone' },
            { n: '2', icon: Play, title: 'Learn', desc: 'Watch videos & create profile' },
            { n: '3', icon: Star, title: 'Quiz', desc: 'Answer 10 MCQ questions' },
            { n: '4', icon: Award, title: 'Certified', desc: 'Download & add to LinkedIn' },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="relative p-4 rounded-2xl border border-white/5 bg-white/[0.02] text-center"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-blue-500/30">
                {step.n}
              </div>
              <step.icon className="w-6 h-6 text-blue-400/60 mx-auto mb-2 mt-2" />
              <p className="text-sm font-bold text-white">{step.title}</p>
              <p className="text-[10px] text-gray-600 mt-0.5">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Course Grid ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Choose Your Certification</h2>
          <p className="text-sm text-gray-500">All certifications include video lessons, profile photo tool, quiz, cheat sheets & professional certificate.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course, i) => {
            const Icon = iconMap[course.icon] || Brain
            const isHovered = hoveredIdx === i
            return (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <Link href={`/certification/${course.slug}`} className="block group h-full">
                  <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 h-full transition-all duration-300 hover:border-white/15 hover:bg-white/[0.04] hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/5">
                    {/* Hover glow */}
                    {isHovered && (
                      <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${course.accentColor}08, transparent 70%)` }} />
                    )}

                    {/* Price */}
                    <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-bold text-gray-400">
                      &#8377;99
                    </div>

                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-blue-300 transition-colors">
                      {course.shortTitle}
                    </h3>
                    <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{course.description}</p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {course.certificateSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-[9px] text-gray-500 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Benefits */}
                    <div className="space-y-1.5 mb-5">
                      {[
                        `${course.videos.length} Video Lessons`,
                        `${course.quizQuestions.length} Quiz Questions`,
                        `${course.cheatSheets.length} Cheat Sheets`,
                      ].map((b) => (
                        <div key={b} className="flex items-center gap-2 text-[10px] text-gray-600">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500/70 flex-shrink-0" />
                          {b}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r ${course.gradient} text-white text-xs font-bold transition-all group-hover:shadow-lg`}>
                      Get Certified <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 pb-20">
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">Every Certification Includes</h2>
          <p className="text-sm text-gray-500 text-center mb-8">One price. Everything you need to prove your expertise.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Award, title: 'Professional Certificate', desc: 'Verifiable at skillsxai.com with unique credential ID' },
              { icon: FileText, title: 'Course-Specific Cheat Sheet', desc: 'Print-optimized reference guide for quick revision' },
              { icon: Download, title: 'NVIDIA API Shortcuts', desc: 'Complete guide to NVIDIA NIM models and API patterns' },
              { icon: FileText, title: 'AI Website Prompts', desc: '50+ ready-to-use prompt templates for websites' },
              { icon: Users, title: 'Free 1-on-1 Counselling', desc: 'Personalized career guidance from industry experts' },
              { icon: Play, title: 'AI Masterclass Recording', desc: 'Full AI Agents masterclass video access' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-4 h-4 text-blue-400/70" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-[10px] text-gray-600 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: '6', l: 'Certifications' },
            { n: '12', l: 'Video Lessons' },
            { n: '60+', l: 'Quiz Questions' },
            { n: '18+', l: 'Cheat Sheets' },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="text-center p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
            >
              <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {s.n}
              </div>
              <div className="text-[10px] text-gray-600 mt-1 font-medium">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 text-center pb-8 pt-4 border-t border-white/[0.04]">
        <p className="text-[10px] text-gray-700">
          &copy; 2026 SkillsXAI &middot;{' '}
          <a href="https://skillsxai.com" className="text-gray-600 hover:text-white transition-colors">
            skillsxai.com
          </a>
        </p>
      </footer>
    </div>
  )
}
