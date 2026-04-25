'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useParams, notFound } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Mail,
  Phone,
  ChevronRight,
  ChevronLeft,
  Check,
  Download,
  Award,
  Zap,
  Gift,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Smartphone,
  Play,
  ImagePlus,
  Camera,
  ArrowRight,
  Trophy,
  Star,
} from 'lucide-react'
import { getCourseBySlug } from '@/lib/certification/courses'
import type { CourseConfig } from '@/lib/certification/types'

const GOOGLE_LOGO_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" style="vertical-align:middle"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>'
const SKILLSXAI_LOGO_BIG = '<svg viewBox="0 0 320 60" width="180" height="34" style="vertical-align:middle"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3b82f6"/><stop offset="50%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs><text x="160" y="44" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-weight="900" font-size="48" fill="url(#lg)" letter-spacing="2">SkillsXAI</text></svg>'

const UPI_ID = '9910356706@pthdfc'
const UPI_NAME = 'SkillsXAI'
const AMOUNT = 99

interface UserData {
  name: string
  email: string
  phone: string
}

function generateCertificateHTML(name: string, course: CourseConfig, certIdOverride?: string, certUrlOverride?: string): string {
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const certId = certIdOverride || `SKX-${Date.now().toString(36).toUpperCase()}`
  const verifyUrl = certUrlOverride || 'https://skillsxai.com'
  const tags = course.certificateSkills.map((s, i) => {
    const cls = ['t1', 't2', 't3', 't4'][i % 4]
    return `<span class="tag ${cls}">${s}</span>`
  }).join('')
  const liUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(`${course.shortTitle} Certification — SkillsXAI`)}&organizationName=${encodeURIComponent('SkillsXAI')}&issueYear=${today.getFullYear()}&issueMonth=${today.getMonth() + 1}&certUrl=${encodeURIComponent(verifyUrl)}&certId=${encodeURIComponent(certId)}`

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Certificate — ${name} | SkillsXAI</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<style>*{box-sizing:border-box;margin:0;padding:0}html,body{width:297mm;height:210mm;background:#0a0f1a;font-family:'Inter',sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}.page{width:297mm;height:210mm;position:relative;overflow:hidden;background:linear-gradient(160deg,#0a0f1a,#0f172a 40%,#0d1528 70%,#0a0f1a);display:flex;flex-direction:column;align-items:center;justify-content:center}.strip-t{position:absolute;top:0;left:0;right:0;height:3mm;background:linear-gradient(90deg,#3b82f6,#06b6d4,#8b5cf6,#ec4899,#3b82f6)}.strip-b{position:absolute;bottom:0;left:0;right:0;height:3mm;background:linear-gradient(90deg,#8b5cf6,#ec4899,#3b82f6,#06b6d4,#8b5cf6)}.border-outer{position:absolute;inset:7mm;border:2px solid transparent;background:linear-gradient(#0f172a,#0f172a) padding-box,linear-gradient(135deg,#3b82f6,#06b6d4,#8b5cf6,#ec4899) border-box;border-radius:6px}.border-inner{position:absolute;inset:10mm;border:1px solid rgba(59,130,246,.15);border-radius:4px}.content{position:relative;z-index:10;text-align:center;padding:0 22mm;width:100%}.top-row{display:flex;flex-direction:column;align-items:center;gap:3mm;margin-bottom:3mm}.g-badge{display:inline-flex;align-items:center;gap:4px;padding:1.5mm 4mm;border-radius:20px;border:1px solid rgba(66,133,244,.25);background:rgba(66,133,244,.08);font-size:8px;color:#93bbfc;font-weight:600}.sep{width:70mm;height:1px;background:linear-gradient(90deg,transparent,#3b82f6,#8b5cf6,transparent);margin:0 auto 3mm}.cert-label{font-size:10px;font-weight:700;letter-spacing:5px;text-transform:uppercase;background:linear-gradient(90deg,#3b82f6,#06b6d4,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:2mm}.cert-heading{font-family:'Playfair Display',serif;font-size:34px;font-weight:900;color:#e2e8f0;line-height:1.15;margin-bottom:3mm}.rec-name{font-family:'Playfair Display',serif;font-size:44px;font-weight:700;background:linear-gradient(135deg,#60a5fa,#06b6d4,#a78bfa);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.1;margin-bottom:1mm}.name-line{width:80mm;height:2px;background:linear-gradient(90deg,transparent,#3b82f6,#8b5cf6,transparent);margin:0 auto 4mm}.desc{font-size:9px;color:#94a3b8;line-height:1.7;max-width:200mm;margin:0 auto 4mm}.desc strong{color:#e2e8f0}.tags{display:flex;justify-content:center;gap:4mm;margin-bottom:3mm;flex-wrap:wrap}.tag{padding:1.5mm 4mm;border-radius:4px;font-size:7px;font-weight:600;border:1px solid}.t1{color:#60a5fa;border-color:rgba(59,130,246,.3);background:rgba(59,130,246,.1)}.t2{color:#a78bfa;border-color:rgba(139,92,246,.3);background:rgba(139,92,246,.1)}.t3{color:#22d3ee;border-color:rgba(6,182,212,.3);background:rgba(6,182,212,.1)}.t4{color:#f472b6;border-color:rgba(236,72,153,.3);background:rgba(236,72,153,.1)}.cv{font-size:7.5px;color:#64748b;margin-bottom:5mm;font-style:italic}.foot{display:flex;justify-content:space-between;align-items:flex-end;padding:0 8mm;width:100%;max-width:250mm;margin:0 auto}.sig{text-align:center;width:55mm}.sig-ln{width:40mm;height:1px;background:linear-gradient(90deg,transparent,rgba(59,130,246,.4),transparent);margin:2mm auto 1mm}.sig-nm{font-size:9px;font-weight:700;color:#e2e8f0}.sig-ti{font-size:7px;color:#64748b;margin-top:.5mm}.seal{width:26mm;height:26mm;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #0f172a;box-shadow:0 0 0 2px rgba(59,130,246,.5),0 0 30px rgba(139,92,246,.3)}.seal-in{width:20mm;height:20mm;border-radius:50%;border:1px solid rgba(255,255,255,.2);display:flex;flex-direction:column;align-items:center;justify-content:center}.seal-tx{font-size:6px;font-weight:800;color:white;letter-spacing:1px;text-transform:uppercase;text-align:center;line-height:1.4}.cid{font-size:7px;color:#475569;text-align:center;margin-top:3mm}@media print{html,body{width:297mm;height:210mm;background:#0a0f1a}.no-print{display:none!important}}</style></head>
<body><div class="page"><div class="strip-t"></div><div class="strip-b"></div><div class="border-outer"></div><div class="border-inner"></div>
<div class="content"><div class="top-row">${SKILLSXAI_LOGO_BIG}<div class="g-badge">${GOOGLE_LOGO_SVG} &nbsp;Approved by Google</div></div><div class="sep"></div>
<p class="cert-label">Certificate of Achievement</p><h1 class="cert-heading">This Certificate is Proudly Presented to</h1><div class="rec-name">${name}</div><div class="name-line"></div>
<p class="desc">${course.certificateDescription}</p>
<div class="tags">${tags}</div>
<p class="cv">This certificate may be presented in resumes, CVs, and LinkedIn profiles.</p>
<div class="foot"><div class="sig"><div style="height:8mm;display:flex;align-items:flex-end;justify-content:center;padding-bottom:1mm"><span style="font-family:'Playfair Display',serif;font-size:17px;color:#60a5fa;font-style:italic">Nawab Khan</span></div><div class="sig-ln"></div><div class="sig-nm">Nawab Khan</div><div class="sig-ti">Founder & Lead Instructor, SkillsXAI</div></div>
<div class="seal"><div class="seal-in"><span class="seal-tx">SKILLS<br/>X AI<br/>CERTIFIED</span></div></div>
<div class="sig"><div style="height:8mm;display:flex;align-items:flex-end;justify-content:center;padding-bottom:1mm">${GOOGLE_LOGO_SVG}</div><div class="sig-ln"></div><div class="sig-nm">Google Approved</div><div class="sig-ti">Technology Partner</div></div></div>
<p class="cid">Certificate ID: ${certId} &middot; Issued: ${dateStr} &middot; <a href="${verifyUrl}" style="color:#60a5fa;text-decoration:none">Verify Certificate</a></p>
<div class="no-print" style="display:flex;justify-content:center;gap:4mm;margin-top:3mm"><a style="display:inline-flex;align-items:center;gap:2mm;padding:2mm 5mm;border-radius:5px;font-size:7.5px;font-weight:700;text-decoration:none;color:#fff;background:#0a66c2;border:1px solid #0a66c2" href="${liUrl}" target="_blank" rel="noopener">Add to LinkedIn</a></div>
</div></div>
<div class="no-print" style="position:fixed;bottom:20px;right:20px"><button style="padding:12px 24px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:white;border:none;border-radius:12px;font-size:14px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(59,130,246,.4)" onclick="window.print()">Print / Save as PDF</button></div></body></html>`
}

// ─── Progress Bar ────────────────────────────────────────────────────────────
const stepsMeta = [
  { label: 'Register', icon: User },
  { label: 'Learn', icon: Play },
  { label: 'Quiz', icon: Zap },
  { label: 'Certificate', icon: Gift },
]

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between">
        {stepsMeta.map((s, i) => {
          const Icon = s.icon
          const done = i < current
          const active = i === current
          return (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="flex items-center w-full">
                {i > 0 && (
                  <div className={`flex-1 h-0.5 ${done ? 'bg-blue-500' : 'bg-white/10'} transition-colors`} />
                )}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    done
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : active
                        ? 'bg-blue-500/20 text-blue-400 ring-2 ring-blue-500/50'
                        : 'bg-white/5 text-gray-600'
                  }`}
                >
                  {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                {i < stepsMeta.length - 1 && (
                  <div className={`flex-1 h-0.5 ${done ? 'bg-blue-500' : 'bg-white/10'} transition-colors`} />
                )}
              </div>
              <span className={`text-[10px] mt-1.5 font-medium ${active ? 'text-blue-400' : done ? 'text-blue-500' : 'text-gray-600'}`}>
                {s.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Live Certificate Preview ────────────────────────────────────────────────
function LiveCertPreview({ name, course }: { name: string; course: CourseConfig }) {
  const displayName = name.trim() || 'Your Name Here'
  const TAG_COLORS = [
    'text-blue-400 border-blue-500/30 bg-blue-500/10',
    'text-purple-400 border-purple-500/30 bg-purple-500/10',
    'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    'text-pink-400 border-pink-500/30 bg-pink-500/10',
  ]
  return (
    <div className="relative rounded-xl border border-white/10 overflow-hidden bg-gradient-to-br from-[#0a0f1a] via-[#0f172a] to-[#0a0f1a] shadow-xl shadow-blue-500/5">
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 via-purple-500 to-pink-500" />
      <div className="p-4 text-center">
        <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 tracking-wide">
          SkillsXAI
        </span>
        <div className="w-16 h-px mx-auto my-2 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        <p className="text-[8px] font-bold tracking-[3px] uppercase text-blue-400/60 mb-1">Certificate of Achievement</p>
        <p className="text-xs text-gray-500 mb-1">This Certificate is Proudly Presented to</p>
        <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 font-serif transition-all duration-300">
          {displayName}
        </p>
        <div className="w-20 h-px mx-auto my-2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        <p className="text-[9px] text-gray-600 max-w-xs mx-auto mb-2">
          for completing the SkillsXAI {course.shortTitle} Certification
        </p>
        <div className="flex flex-wrap justify-center gap-1.5">
          {course.certificateSkills.map((s, i) => (
            <span key={s} className={`px-2 py-0.5 rounded text-[8px] font-semibold border ${TAG_COLORS[i % TAG_COLORS.length]}`}>
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400" />
    </div>
  )
}

// ─── Step 1: Registration ────────────────────────────────────────────────────
function RegistrationStep({
  data,
  onChange,
  onNext,
  course,
}: {
  data: UserData
  onChange: (d: UserData) => void
  onNext: () => void
  course: CourseConfig
}) {
  const phoneClean = data.phone.replace(/\D/g, '')
  const valid = data.name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) && phoneClean.length === 10

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Step 1 of 4 — Your Details
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{course.title}</h2>
          <p className="text-gray-400 text-sm">Fill in your details to start learning and earn your professional certificate.</p>
        </div>

        {/* Live Certificate Preview */}
        <div className="mb-6">
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2 text-center">Live Certificate Preview</p>
          <LiveCertPreview name={data.name} course={course} />
        </div>

        <div className="space-y-3 mb-5">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Full Name"
              value={data.name}
              onChange={(e) => onChange({ ...data, name: e.target.value })}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 outline-none transition-all text-sm"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="email"
              placeholder="Email Address"
              value={data.email}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 outline-none transition-all text-sm"
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <div className="absolute left-11 top-1/2 -translate-y-1/2 text-gray-500 text-sm">+91</div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={data.phone}
              onChange={(e) => onChange({ ...data, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              className="w-full pl-[4.5rem] pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 outline-none transition-all text-sm"
            />
          </div>
        </div>

        {/* LinkedIn teaser + Google badge */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <div className="flex items-center gap-2 p-2.5 rounded-xl border border-[#0a66c2]/15 bg-[#0a66c2]/5">
            <div className="w-7 h-7 rounded-lg bg-[#0a66c2] flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-white leading-tight">Add to LinkedIn</p>
              <p className="text-[8px] text-gray-500">One-click auto-fill</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-xl border border-blue-500/15 bg-blue-500/5">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Award className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-white leading-tight">Google Approved</p>
              <p className="text-[8px] text-gray-500">Verified certificate</p>
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          disabled={!valid}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
        >
          Start Learning <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

// ─── Step 2: Video + Profile Photo ───────────────────────────────────────────
function ProfilePhotoBooth({ course }: { course: CourseConfig }) {
  const [originalImg, setOriginalImg] = useState<string | null>(null)
  const [resultImg, setResultImg] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => { setOriginalImg(reader.result as string); setResultImg(null) }
    reader.readAsDataURL(file)
  }

  const processImage = useCallback(() => {
    if (!originalImg) return
    setProcessing(true)

    const canvas = canvasRef.current
    if (!canvas) { setProcessing(false); return }
    const ctx = canvas.getContext('2d')
    if (!ctx) { setProcessing(false); return }

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const SIZE = 800
      const PADDING = 60
      const PHOTO_SIZE = SIZE - PADDING * 2
      canvas.width = SIZE
      canvas.height = SIZE

      const bgColors = course.bgGradient.match(/#[0-9a-fA-F]{6}/g) || ['#3b82f6', '#8b5cf6']
      const grad = ctx.createLinearGradient(0, 0, SIZE, SIZE)
      bgColors.forEach((c, i) => grad.addColorStop(i / Math.max(bgColors.length - 1, 1), c))
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, SIZE, SIZE)

      ctx.fillStyle = 'rgba(255,255,255,0.04)'
      for (let x = 0; x < SIZE; x += 50) ctx.fillRect(x, 0, 1, SIZE)
      for (let y = 0; y < SIZE; y += 50) ctx.fillRect(0, y, SIZE, 1)

      ctx.fillStyle = 'rgba(255,255,255,0.04)'
      ctx.beginPath(); ctx.arc(SIZE * 0.85, SIZE * 0.15, 200, 0, Math.PI * 2); ctx.fill()
      ctx.beginPath(); ctx.arc(SIZE * 0.15, SIZE * 0.85, 160, 0, Math.PI * 2); ctx.fill()

      const cx = SIZE / 2, cy = SIZE / 2 - 20, radius = PHOTO_SIZE / 2
      ctx.save()
      ctx.beginPath()
      ctx.arc(cx, cy, radius + 6, 0, Math.PI * 2)
      const borderGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius)
      borderGrad.addColorStop(0, 'rgba(255,255,255,0.5)')
      borderGrad.addColorStop(1, 'rgba(255,255,255,0.15)')
      ctx.fillStyle = borderGrad
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.clip()

      const scale = Math.max(radius * 2 / img.width, radius * 2 / img.height)
      const sw = img.width * scale, sh = img.height * scale
      ctx.drawImage(img, cx - sw / 2, cy - sh / 2, sw, sh)
      ctx.restore()

      const bannerH = 70, bannerY = SIZE - bannerH
      ctx.fillStyle = 'rgba(0,0,0,0.55)'
      ctx.fillRect(0, bannerY, SIZE, bannerH)

      ctx.font = 'bold 22px Inter, Arial, sans-serif'
      ctx.fillStyle = '#ffffff'
      ctx.textAlign = 'center'
      ctx.fillText(course.shortTitle, SIZE / 2, bannerY + 32)

      ctx.font = '600 13px Inter, Arial, sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.fillText('Certified by SkillsXAI', SIZE / 2, bannerY + 54)

      setResultImg(canvas.toDataURL('image/png'))
      setProcessing(false)
    }
    img.onerror = () => setProcessing(false)
    img.src = originalImg
  }, [originalImg, course])

  const downloadResult = () => {
    if (!resultImg) return
    const a = document.createElement('a')
    a.href = resultImg
    a.download = `${course.slug}-profile-skillsxai.png`
    a.click()
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2">
        <Camera className="w-4 h-4 text-purple-400" /> Create Your Course Profile Photo
      </h3>
      <p className="text-xs text-gray-500">Upload your photo and get a {course.shortTitle}-themed profile picture for LinkedIn & social media.</p>

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

      {!originalImg && (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full p-8 rounded-xl border-2 border-dashed border-white/10 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all flex flex-col items-center gap-3"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <ImagePlus className="w-6 h-6 text-blue-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-white">Upload Your Photo</p>
            <p className="text-[10px] text-gray-600 mt-0.5">JPG, PNG — we create a branded profile pic</p>
          </div>
        </button>
      )}

      {originalImg && !resultImg && (
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-square max-w-[280px] mx-auto">
            <img src={originalImg} alt="Your photo" className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setOriginalImg(null); setResultImg(null) }}
              className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-xs font-medium hover:bg-white/5 transition-all"
            >
              Choose Different
            </button>
            <button
              onClick={processImage}
              disabled={processing}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              {processing ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Creating...</> : <><Camera className="w-3.5 h-3.5" /> Create Photo</>}
            </button>
          </div>
        </div>
      )}

      {resultImg && (
        <div className="space-y-3">
          <div className="relative rounded-xl overflow-hidden border-2 border-blue-500/30 aspect-square max-w-[280px] mx-auto shadow-xl shadow-blue-500/10">
            <img src={resultImg} alt="Course profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setOriginalImg(null); setResultImg(null) }}
              className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-xs font-medium hover:bg-white/5 transition-all"
            >
              Try Again
            </button>
            <button
              onClick={downloadResult}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" /> Download
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}

function VideoLearningStep({
  course,
  onNext,
  onBack,
}: {
  course: CourseConfig
  onNext: () => void
  onBack: () => void
}) {
  const [watched, setWatched] = useState<Set<number>>(new Set())

  const canProceed = watched.size >= course.videos.length

  const markWatched = (idx: number) => {
    const next = new Set(watched)
    next.add(idx)
    setWatched(next)
  }

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-4">
            <Play className="w-4 h-4" />
            Step 2 of 4 — Learn & Create
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Video Lessons & Profile Photo</h2>
          <p className="text-gray-400 text-sm">Watch both videos, then create your course-themed profile photo. Mark both videos as done to continue.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-6 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2">
            <Play className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-gray-300">Videos Watched</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 rounded-full bg-white/10">
              <div className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all" style={{ width: `${(watched.size / course.videos.length) * 100}%` }} />
            </div>
            <span className="text-xs text-gray-500">{watched.size}/{course.videos.length}</span>
          </div>
        </div>

        {/* Videos */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-bold text-gray-300 flex items-center gap-2"><Play className="w-4 h-4 text-blue-400" /> Video Lessons</h3>
          <div className="grid gap-3">
            {course.videos.map((v, i) => (
              <div key={i} className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
                {watched.has(i) ? (
                  <div className="p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-emerald-400 truncate">{v.title}</p>
                      <p className="text-[10px] text-gray-500">{v.duration} — Watched</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${v.youtubeId}?rel=0`}
                        title={v.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white truncate">{v.title}</p>
                        <p className="text-[10px] text-gray-500">{v.duration}</p>
                      </div>
                      <button
                        onClick={() => markWatched(i)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-medium hover:bg-blue-500/30 transition-all flex-shrink-0"
                      >
                        <Check className="w-3 h-3" /> Mark Done
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Profile Photo Section */}
        <div className="mb-6">
          <ProfilePhotoBooth course={course} />
        </div>

        {/* CTA */}
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 mb-3"
        >
          Continue to Quiz <ChevronRight className="w-4 h-4" />
        </button>
        {!canProceed && (
          <p className="text-center text-xs text-gray-500">Watch both videos to unlock the quiz.</p>
        )}

        <button
          onClick={onBack}
          className="w-full py-3 rounded-xl border border-white/10 text-gray-400 font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      </div>
    </motion.div>
  )
}

// ─── Step 3: Quiz ────────────────────────────────────────────────────────────
function QuizStep({
  course,
  onNext,
  onBack,
  onScoreChange,
}: {
  course: CourseConfig
  onNext: () => void
  onBack: () => void
  onScoreChange: (score: number) => void
}) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const q = course.quizQuestions[current]
  const total = course.quizQuestions.length

  const handleSelect = (idx: number) => {
    if (answered) return
    setSelected(idx)
    setAnswered(true)
    if (idx === q.correct) setScore((s) => s + 1)
  }

  const handleContinue = () => {
    if (current + 1 >= total) {
      const finalScore = score
      setFinished(true)
      onScoreChange(finalScore)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  if (finished) {
    const pct = Math.round((score / total) * 100)
    return (
      <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-2">{pct}%</p>
          <p className="text-gray-400 mb-2">{score}/{total} correct answers</p>
          <p className="text-sm text-gray-500 mb-6">
            {pct >= 80 ? 'Excellent! You earned a Certificate of Distinction.' : pct >= 50 ? 'Good job! You passed the quiz.' : 'Keep learning! You can still claim your certificate.'}
          </p>
          <button
            onClick={onNext}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            Claim Your Certificate <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-6 md:p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Step 3 of 4 — Quiz
          </div>
          <div className="flex items-center gap-2 justify-center mb-2">
            <span className="text-xs text-gray-500">Question {current + 1}/{total}</span>
            <div className="w-32 h-1.5 rounded-full bg-white/5">
              <div className="h-1.5 rounded-full bg-blue-500 transition-all" style={{ width: `${((current + 1) / total) * 100}%` }} />
            </div>
            <span className="text-xs text-emerald-400 font-bold">{score} pts</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-4">{q.q}</h3>

        <div className="space-y-2 mb-6">
          {q.options.map((opt, idx) => {
            let cls = 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'
            if (answered) {
              if (idx === q.correct) cls = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
              else if (idx === selected) cls = 'bg-red-500/20 border-red-500/50 text-red-400'
              else cls = 'bg-white/5 border-white/5 text-gray-600'
            } else if (selected === idx) {
              cls = 'bg-blue-500/20 border-blue-500/50 text-blue-300'
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={answered}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${cls}`}
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </span>
              </button>
            )
          })}
        </div>

        {answered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 mb-4">
            <p className="text-xs text-blue-300">{q.explanation}</p>
          </motion.div>
        )}

        {answered && (
          <button
            onClick={handleContinue}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
          >
            {current + 1 >= total ? 'See Results' : 'Next Question'} <ChevronRight className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={onBack}
          className="w-full py-3 mt-3 rounded-xl border border-white/10 text-gray-400 font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
      </div>
    </motion.div>
  )
}

// ─── Step 4: Rewards & Payment ────────────────────────────────────────────────
function RewardsStep({
  userData,
  score,
  course,
  onBack,
}: {
  userData: UserData
  score: number
  course: CourseConfig
  onBack: () => void
}) {
  const [payState, setPayState] = useState<'idle' | 'verify' | 'verifying' | 'success' | 'PENDING_MANUAL'>('idle')
  const [utr, setUtr] = useState('')
  const [verifyMsg, setVerifyMsg] = useState('')
  const [certUrl, setCertUrl] = useState('')
  const [savedCertId, setSavedCertId] = useState('')
  const orderId = useRef(`SKX-${course.slug.toUpperCase().slice(0, 4)}-${Date.now().toString(36).toUpperCase()}`).current

  const saveCertToDb = useCallback(async () => {
    try {
      const res = await fetch('/api/certification/save-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userData.name, email: userData.email, skills: course.certificateSkills, course: course.slug }),
      })
      const data = await res.json()
      if (data.certId) {
        setSavedCertId(data.certId)
        setCertUrl(data.certUrl || `https://skillsxai.com/certificatedownload/${data.certId}`)
      }
    } catch { /* silent */ }
  }, [userData.name, userData.email, course.certificateSkills, course.slug])

  const handleVerify = async () => {
    if (!utr.trim()) return
    setPayState('verifying')
    setVerifyMsg('')
    try {
      const res = await fetch('/api/certification/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          utr: utr.trim(),
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          course: course.slug,
          courseTitle: course.shortTitle,
          skills: course.certificateSkills,
          courseDescription: course.certificateDescription,
        }),
      })
      const data = await res.json()
      if (data.status === 'TXN_SUCCESS') {
        await saveCertToDb()
        setPayState('success')
        fetch('/api/certification/send-certificate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            course: course.slug,
            courseTitle: course.shortTitle,
            skills: course.certificateSkills,
            courseDescription: course.certificateDescription,
          }),
        }).catch(() => {})
      } else if (data.status === 'PENDING_MANUAL') {
        await saveCertToDb()
        setPayState('PENDING_MANUAL')
        setVerifyMsg(data.message)
        fetch('/api/certification/send-certificate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: userData.name,
            email: userData.email,
            course: course.slug,
            courseTitle: course.shortTitle,
            skills: course.certificateSkills,
            courseDescription: course.certificateDescription,
          }),
        }).catch(() => {})
      } else if (data.status === 'PENDING') {
        setPayState('verify')
        setVerifyMsg(data.message || 'Payment is still processing. Please wait and try again.')
      } else if (data.status === 'NO_RECORD_FOUND') {
        setPayState('verify')
        setVerifyMsg('No payment found with this Order ID. Please double-check and try again.')
      } else {
        setPayState('verify')
        setVerifyMsg(data.message || 'Verification failed. Please contact support.')
      }
    } catch {
      setPayState('verify')
      setVerifyMsg('Something went wrong. Please try again.')
    }
  }

  const handleDownloadCertificate = () => {
    const html = generateCertificateHTML(userData.name, course, savedCertId || undefined, certUrl || undefined)
    const blob = new Blob([html], { type: 'text/html' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `SkillsXAI-Certificate-${userData.name.replace(/\s+/g, '-')}.html`
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const liUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(`${course.shortTitle} Certification — SkillsXAI`)}&organizationName=${encodeURIComponent('SkillsXAI')}&issueYear=${new Date().getFullYear()}&issueMonth=${new Date().getMonth() + 1}&certUrl=${encodeURIComponent(certUrl || 'https://skillsxai.com')}&certId=${encodeURIComponent(savedCertId)}`

  const [copied, setCopied] = useState(false)

  const upiDeepLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${AMOUNT}&cu=INR&tn=${encodeURIComponent(`SkillsXAI ${course.shortTitle} ${orderId}`)}`

  const copyUpiId = () => {
    navigator.clipboard.writeText(UPI_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }} className="w-full max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 text-yellow-300 text-sm font-medium mb-4">
          <Gift className="w-4 h-4" />
          Step 4 of 4 — Unlock Your Pro Package
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Outstanding, {userData.name.split(' ')[0]}!
        </h2>
        <p className="text-gray-400">
          You scored <span className="text-purple-400 font-bold">{score}/10</span> on the quiz.
          Unlock everything below for just <span className="text-yellow-400 font-bold">&#8377;99</span>.
        </p>
      </div>

      {/* PRO PACKAGE */}
      <div className="relative rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-[#1a1200]/60 via-[#0f172a] to-[#10063a]/60 p-8 shadow-[0_0_80px_rgba(212,175,55,0.08)] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/3 via-purple-600/3 to-transparent pointer-events-none rounded-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-yellow-500/5 to-transparent rounded-3xl pointer-events-none" />

        <div className="relative">
          {/* Badge + Price */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border border-yellow-500/30 text-yellow-200 text-sm font-bold">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              COMPLETE PRO PACKAGE
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">&#8377;99</span>
              <span className="text-gray-400 text-sm line-through">&#8377;2,499</span>
              <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">96% OFF</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">
            Your Complete <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400">{course.shortTitle} Career Kit</span>
          </h3>
          <p className="text-gray-400 mb-6 text-sm">One-time payment &middot; Instant access &middot; Lifetime validity &middot; Show on your CV</p>

          {/* What's Included */}
          <div className="space-y-3 mb-8">
            <div className="p-4 rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 to-orange-500/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/20">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-white">Professional {course.shortTitle} Certificate</p>
                    <span className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-[10px] font-bold">STAR</span>
                  </div>
                  <p className="text-xs text-gray-400">Google-approved certificate personalised with your name. Add to <span className="text-blue-300">LinkedIn</span>, <span className="text-blue-300">CV</span>, and <span className="text-blue-300">Resume</span>.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              {[
                ...course.cheatSheets.map((cs) => ({ icon: Download, label: cs.title, desc: 'Print-optimized reference guide', color: 'text-orange-400', tag: null as string | null })),
                { icon: Star, label: 'Free 1-on-1 Career Counselling', desc: 'Personal guidance with our expert', color: 'text-green-400', tag: 'FREE' },
                { icon: Play, label: 'Free AI Agents Masterclass Recording', desc: 'Watch & learn anytime, anywhere', color: 'text-blue-400', tag: 'FREE' },
                { icon: Zap, label: 'Early Access to New Courses', desc: 'Beta pricing & launch discounts', color: 'text-amber-400', tag: null },
                { icon: Gift, label: '20% Discount on Full Courses', desc: 'Exclusive coupon for enrollment', color: 'text-rose-400', tag: null },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                    <div className="mt-0.5 w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white truncate">{item.label}</p>
                        {item.tag && <span className="px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 text-[10px] font-bold flex-shrink-0">{item.tag}</span>}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-center gap-6 py-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> 500+ students enrolled</span>
              <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> 4.9/5 rating</span>
              <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-blue-500" /> Google Approved</span>
            </div>
          </div>

          {/* ── UPI Payment Flow ── */}
          {payState === 'idle' && (
            <div className="space-y-5">
              {/* Certificate preview */}
              <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-yellow-300">Certificate Preview</p>
                  <p className="text-xs text-gray-400">Personalised as: <span className="text-white font-semibold">&quot;{userData.name}&quot;</span> — downloads instantly after payment.</p>
                </div>
              </div>

              {/* LinkedIn Showcase */}
              <div className="p-4 rounded-xl border border-[#0a66c2]/25 bg-[#0a66c2]/5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0a66c2] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white mb-1">Add to Your LinkedIn Profile</p>
                    <p className="text-xs text-gray-400 leading-relaxed">After payment, one-click to add this certificate to LinkedIn. Auto-fills <span className="text-blue-300">name</span>, <span className="text-blue-300">issuer</span>, <span className="text-blue-300">date</span> &amp; <span className="text-blue-300">credential ID</span>.</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500"><CheckCircle2 className="w-3 h-3 text-green-500" /> Auto-fills details</div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500"><CheckCircle2 className="w-3 h-3 text-green-500" /> Add skills</div>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500"><CheckCircle2 className="w-3 h-3 text-green-500" /> Upload PDF</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR + UPI Payment */}
              <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6 space-y-5">
                <p className="text-sm font-bold text-blue-300 flex items-center gap-2"><Smartphone className="w-4 h-4" /> Pay &#8377;99 via UPI</p>

                {/* QR Code */}
                <div className="flex justify-center">
                  <div className="p-3 bg-white rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    <img src="/upi-qr.png" alt="Scan to pay ₹99" className="w-44 h-44 object-contain" />
                  </div>
                </div>

                {/* UPI ID + Copy */}
                <div className="flex items-center justify-between bg-dark-700/60 border border-white/10 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-xs text-gray-500">UPI ID</p>
                    <p className="text-white font-mono font-semibold text-sm">{UPI_ID}</p>
                  </div>
                  <button onClick={copyUpiId} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-500/25 text-blue-300 text-xs font-semibold hover:bg-blue-500/25 transition-all">
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="flex-1 h-px bg-white/10" />
                  <span>or pay with your favourite app</span>
                  <span className="flex-1 h-px bg-white/10" />
                </div>

                {/* GPay / PhonePe / Paytm */}
                <div className="grid grid-cols-3 gap-3">
                  <a href={`gpay://upi/pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${AMOUNT}&cu=INR&tn=${encodeURIComponent(`SkillsXAI ${orderId}`)}`} className="flex flex-col items-center gap-2 py-3.5 px-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] hover:border-white/20 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">Google Pay</span>
                  </a>
                  <a href={`phonepe://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${AMOUNT}&cu=INR&tn=${encodeURIComponent(`SkillsXAI ${orderId}`)}`} className="flex flex-col items-center gap-2 py-3.5 px-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-[#5f259f]/10 hover:border-[#5f259f]/30 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-[#5f259f] flex items-center justify-center shadow-md group-hover:shadow-[0_0_16px_rgba(95,37,159,0.4)] transition-shadow">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white"><path d="M6.5 3h5.2c3.3 0 5.8 1.1 7 3.1.9 1.5 1 3.2.4 5-.9 2.6-3.3 4.2-6.2 4.2H10l-1.2 5.3c-.1.2-.3.4-.5.4H5.8c-.3 0-.5-.3-.4-.6L8.2 3.6c.1-.3.3-.5.6-.5h-2.3zm4.3 2.1l-1.5 6.5h2c2.1 0 3.6-1.1 4.1-3 .5-1.8-.5-3.5-2.7-3.5h-1.9z"/></svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-300 group-hover:text-[#5f259f] transition-colors">PhonePe</span>
                  </a>
                  <a href={`paytmmp://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${AMOUNT}&cu=INR&tn=${encodeURIComponent(`SkillsXAI ${orderId}`)}`} className="flex flex-col items-center gap-2 py-3.5 px-2 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-[#00baf2]/10 hover:border-[#00baf2]/30 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-[#00325b] flex items-center justify-center shadow-md group-hover:shadow-[0_0_16px_rgba(0,186,242,0.4)] transition-shadow">
                      <svg viewBox="0 0 48 48" className="w-5 h-5" fill="none"><path d="M11 12h5.5c4.5 0 7.2 2.2 7.2 6 0 4.3-3.2 7-7.8 7h-2.4l-1.5 6H8l3-19zm5 2.5l-1.5 8h1.8c2.8 0 4.5-1.6 4.5-4.2 0-2.3-1.5-3.8-4-3.8h-.8z" fill="#00baf2"/><path d="M29 18h3.5l-.5 2.3h.1c1-1.6 2.5-2.6 4.3-2.6 2.5 0 3.8 1.7 3.3 4.2l-2 9.1h-3.5l1.7-7.8c.2-1.2-.3-2-1.5-2-1.5 0-2.7 1.3-3.1 3.2l-1.5 6.6H26l3-13z" fill="#00baf2"/></svg>
                    </div>
                    <span className="text-xs font-semibold text-gray-300 group-hover:text-[#00baf2] transition-colors">Paytm</span>
                  </a>
                </div>

                {/* Generic UPI */}
                <a href={upiDeepLink} className="w-full py-3 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 font-medium text-sm flex items-center justify-center gap-2 hover:bg-white/[0.07] hover:border-white/20 transition-all">
                  <Smartphone className="w-4 h-4" /> Other UPI App
                </a>

                <p className="text-center text-xs text-gray-500">Amount: <span className="text-white font-bold">&#8377;99</span> &middot; Pay to: <span className="text-blue-300">{UPI_ID}</span></p>

                {/* Order ID */}
                <div className="p-3 rounded-xl border border-purple-500/15 bg-purple-500/5 flex items-center gap-3">
                  <Award className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Your Order ID (add in payment note)</p>
                    <p className="text-sm font-mono text-purple-300 truncate">{orderId}</p>
                  </div>
                  <button onClick={() => navigator.clipboard.writeText(orderId)} className="flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-500/15 border border-purple-500/25 text-purple-300 text-xs hover:bg-purple-500/25 transition-all flex-shrink-0">
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
              </div>

              <button
                onClick={() => setPayState('verify')}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg hover:from-purple-500 hover:to-blue-500 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)] flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
                I&apos;ve Paid &#8377;99 — Unlock My Certificate
              </button>
            </div>
          )}

          {/* Enter UTR */}
          {(payState === 'verify' || payState === 'verifying') && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5">
                <p className="text-sm font-bold text-purple-300 mb-1">Enter Your UPI Transaction ID</p>
                <p className="text-xs text-gray-400">Find it in your UPI app under &quot;Transaction History&quot; — it&apos;s a 12-digit number (UTR/Reference ID).</p>
              </div>

              <div className="p-3 rounded-xl border border-blue-500/15 bg-blue-500/5 flex items-center gap-3">
                <Award className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Your Order ID</p>
                  <p className="text-sm font-mono text-blue-300 truncate">{orderId}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <input
                  type="text"
                  value={utr}
                  onChange={(e) => { setUtr(e.target.value); setVerifyMsg('') }}
                  placeholder="e.g. 407812345678"
                  className={`w-full bg-dark-700/60 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-mono ${verifyMsg ? 'border-red-500/60' : 'border-white/10 focus:border-purple-500/40'}`}
                />
                {verifyMsg && (
                  <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {verifyMsg}</p>
                )}
              </div>

              <button
                onClick={handleVerify}
                disabled={payState === 'verifying' || !utr.trim()}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg hover:from-green-500 hover:to-emerald-500 transition-all shadow-[0_0_30px_rgba(34,197,94,0.25)] flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {payState === 'verifying' ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying Payment&hellip;</> : <><CheckCircle2 className="w-5 h-5" /> Verify &amp; Get My Certificate</>}
              </button>
              <button onClick={() => { setPayState('idle'); setVerifyMsg('') }} className="w-full py-2.5 text-gray-500 text-sm hover:text-gray-300 transition-colors">
                &larr; Back to payment
              </button>
            </motion.div>
          )}

          {/* Success */}
          {(payState === 'success' || payState === 'PENDING_MANUAL') && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5">
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {payState === 'success' ? 'Payment Verified!' : 'Payment Recorded!'}
                </h3>
                <p className="text-sm text-gray-400">
                  {payState === 'success' ? 'Your certificate and resources are ready!' : verifyMsg || 'We will verify shortly.'}
                </p>
              </div>

              {certUrl && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-gray-500 truncate flex-1">{certUrl}</span>
                  <button onClick={() => navigator.clipboard.writeText(certUrl)} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                    <Copy className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              )}

              <button onClick={handleDownloadCertificate} className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-3">
                <Download className="w-5 h-5" /> Download Your Certificate
              </button>

              <a href={liUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-xl bg-[#0a66c2] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 hover:bg-[#004182]">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                Add Certificate to LinkedIn
              </a>

              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-medium">Download Your Resources:</p>
                {course.cheatSheets.map((cs, i) => (
                  <a key={i} href={`/downloads/${cs.file}`} target="_blank" rel="noopener" className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs text-gray-300">{cs.title}</span>
                  </a>
                ))}
              </div>
              <p className="text-center text-xs text-gray-500">Open any HTML file in browser &rarr; Print &rarr; Save as PDF.</p>
            </motion.div>
          )}
        </div>
      </div>

      <button onClick={onBack} className="w-full py-3 rounded-xl border border-white/10 text-gray-400 font-medium hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm">
        <ChevronLeft className="w-4 h-4" /> Back to Quiz
      </button>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CertificationCoursePage() {
  const params = useParams()
  const slug = params.courseSlug as string
  const course = getCourseBySlug(slug)

  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState<UserData>({ name: '', email: '', phone: '' })
  const [quizScore, setQuizScore] = useState(0)

  if (!course) {
    notFound()
  }

  const saveRegistration = async (score: number) => {
    try {
      await fetch('/api/certification/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          quizScore: score,
          course: course.slug,
        }),
      })
    } catch { /* silent */ }
  }

  const handleQuizDone = (score: number) => {
    setQuizScore(score)
    saveRegistration(score)
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-[#060a14] py-12 px-4 relative overflow-hidden">
      {/* Grid pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,.4) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      {/* Radial glow */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 60%)' }} />
      <div className="fixed w-[600px] h-[600px] rounded-full pointer-events-none -top-[200px] left-1/2 -translate-x-1/2" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05), transparent 70%)' }} />
      <div className="fixed w-[500px] h-[500px] rounded-full pointer-events-none bottom-0 -right-[100px]" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.04), transparent 70%)' }} />

      <div className="text-center mb-8">
        <a href="/certification" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm">
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            SkillsXAI
          </span>
          <span>Certification Portal</span>
        </a>
      </div>

      <div className="max-w-3xl mx-auto">
        <ProgressBar current={step} />

        <AnimatePresence mode="wait">
          {step === 0 && (
            <RegistrationStep
              key="step0"
              data={userData}
              onChange={setUserData}
              onNext={() => setStep(1)}
              course={course}
            />
          )}
          {step === 1 && (
            <VideoLearningStep
              key="step1"
              course={course}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <QuizStep
              key="step2"
              course={course}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
              onScoreChange={handleQuizDone}
            />
          )}
          {step === 3 && (
            <RewardsStep
              key="step3"
              userData={userData}
              score={quizScore}
              course={course}
              onBack={() => setStep(2)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
