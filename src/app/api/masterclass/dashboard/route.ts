import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { getNeonPool, saveCertToNeon } from '@/lib/neon'
import { generateCertHTML, generateEmailHTML } from '@/lib/certificate'

const ADMIN_KEY = process.env.ADMIN_DASHBOARD_KEY || 'skillsxai2026'
const RESEND_API_KEY = process.env.RESEND_API_KEY

const BASE_RESOURCES = [
  { filename: 'Claude-AI-Cheat-Sheet.html', srcFile: 'claude-ai-cheatsheet.html', contentType: 'text/html' },
  { filename: 'Free-AI-APIs-NVIDIA-Guide.html', srcFile: 'free-ai-apis-guide.html', contentType: 'text/html' },
  { filename: 'AI-Career-Roadmap-2026.html', srcFile: 'ai-career-roadmap-2026.html', contentType: 'text/html' },
] as const

const ULTIMATE_RESOURCE = { filename: 'AI-Agent-Masterclass-Sheet.csv', srcFile: 'Ai Agent Masterclass Sheet - Sheet1.csv', contentType: 'text/csv' } as const

const MC_SKILLS = ['Artificial Intelligence', 'Prompt Engineering', 'AI Agents & Automation', 'AI Tools & APIs']

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json()

    if (!key || typeof key !== 'string' || key !== ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getSupabaseClient()
    const neonPool = getNeonPool()

    const [registrations, payments, certificates] = await Promise.all([
      supabase
        ? supabase
            .from('masterclass_registrations')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(500)
        : Promise.resolve({ data: [], error: null }),

      supabase
        ? supabase
            .from('masterclass_payments')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(500)
        : Promise.resolve({ data: [], error: null }),

      neonPool
        ? neonPool.query(
            'SELECT id, name, email, issued_at, skills, course, cert_url FROM certificates ORDER BY issued_at DESC LIMIT 500'
          )
        : Promise.resolve({ rows: [] }),
    ])

    return NextResponse.json({
      registrations: registrations.data || [],
      payments: payments.data || [],
      certificates: 'rows' in certificates ? certificates.rows : [],
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { key, paymentId, action } = await req.json()

    if (!key || typeof key !== 'string' || key !== ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!paymentId || typeof paymentId !== 'string') {
      return NextResponse.json({ error: 'paymentId is required' }, { status: 400 })
    }

    if (action !== 'verify' && action !== 'reject') {
      return NextResponse.json({ error: 'action must be "verify" or "reject"' }, { status: 400 })
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const isVerify = action === 'verify'

    const { error: updateError } = await supabase
      .from('masterclass_payments')
      .update({
        verified: isVerify,
        verified_at: isVerify ? new Date().toISOString() : null,
        paytm_status: isVerify ? 'VERIFIED' : 'REJECTED',
        paytm_result_msg: isVerify
          ? 'Manually verified by admin'
          : 'Rejected by admin',
      })
      .eq('id', paymentId)

    if (updateError) {
      return NextResponse.json({ error: 'Failed to update payment' }, { status: 500 })
    }

    if (isVerify) {
      const { data: payment } = await supabase
        .from('masterclass_payments')
        .select('name, email, plan')
        .eq('id', paymentId)
        .single()

      if (payment?.email) {
        await supabase
          .from('masterclass_registrations')
          .update({ payment_status: 'verified' })
          .eq('email', payment.email)

        const plan = payment.plan || 'pro'
        sendCertificateFromAdmin(payment.name || '', payment.email, plan).catch(() => {})
      }
    }

    return NextResponse.json({
      success: true,
      message: isVerify
        ? 'Payment verified — certificate and resources sent to the user'
        : 'Payment rejected',
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function sendCertificateFromAdmin(name: string, email: string, plan: string) {
  if (!RESEND_API_KEY || !name || !email) return
  const { Resend } = await import('resend')
  const resend = new Resend(RESEND_API_KEY)

  const saved = await saveCertToNeon(name, email, 'ai-masterclass', MC_SKILLS)
  const certId = saved?.certId || `SKX-MC-${Date.now().toString(36).toUpperCase()}`
  const dateStr = saved?.issuedAt || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const certUrl = saved?.certUrl || `https://skillsxai.com/certificatedownload/${certId}`

  const isUltimate = plan === 'ultimate'
  const certHtml = generateCertHTML(name, certId, dateStr)
  const emailHtml = generateEmailHTML(name, certId, dateStr, certUrl)

  const resourceList = isUltimate ? [...BASE_RESOURCES, ULTIMATE_RESOURCE] : [...BASE_RESOURCES]
  const downloadsDir = join(process.cwd(), 'public', 'downloads')
  const resourceAttachments: { filename: string; content: Buffer; contentType: string }[] = []
  for (const res of resourceList) {
    try {
      const content = await readFile(join(downloadsDir, res.srcFile))
      resourceAttachments.push({ filename: res.filename, content, contentType: res.contentType })
    } catch {
      // Skip missing files
    }
  }

  const planLabel = isUltimate ? 'Ultimate Package' : 'Pro Package'
  await resend.emails.send({
    from: 'SkillsXAI <certificates@team.skillsxai.com>',
    to: email,
    subject: `Your AI Masterclass ${planLabel} — Certificate + Resources | ${name}`,
    html: emailHtml,
    attachments: [
      { filename: `SkillsXAI-Certificate-${name.replace(/\s+/g, '-')}.html`, content: Buffer.from(certHtml, 'utf-8'), contentType: 'text/html' },
      ...resourceAttachments,
    ],
  })
}
