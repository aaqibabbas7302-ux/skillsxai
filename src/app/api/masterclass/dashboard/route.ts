import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { getNeonPool, saveCertToNeon } from '@/lib/neon'
import { generateCertHTML, generateEmailHTML } from '@/lib/certificate'
import { sendMail } from '@/lib/email'
import { htmlToPdf, htmlFileToPdf } from '@/lib/pdf'

const ADMIN_KEY = process.env.ADMIN_DASHBOARD_KEY || 'skillsxai2026'

const BASE_RESOURCES = [
  { filename: 'Claude-AI-Cheat-Sheet.pdf', srcFile: 'claude-ai-cheatsheet.html', contentType: 'application/pdf' },
  { filename: 'Free-AI-APIs-NVIDIA-Guide.pdf', srcFile: 'free-ai-apis-guide.html', contentType: 'application/pdf' },
  { filename: 'AI-Career-Roadmap-2026.pdf', srcFile: 'ai-career-roadmap-2026.html', contentType: 'application/pdf' },
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

export async function DELETE(req: NextRequest) {
  try {
    const { key, table, id, ids } = await req.json()

    if (!key || typeof key !== 'string' || key !== ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const deleteIds: string[] = ids && Array.isArray(ids) ? ids : id ? [id] : []
    if (deleteIds.length === 0) {
      return NextResponse.json({ error: 'id or ids is required' }, { status: 400 })
    }

    const allowed = ['registrations', 'payments', 'certificates'] as const
    if (!allowed.includes(table)) {
      return NextResponse.json({ error: 'Invalid table' }, { status: 400 })
    }

    if (table === 'certificates') {
      const neonPool = getNeonPool()
      if (!neonPool) return NextResponse.json({ error: 'Neon DB not configured' }, { status: 500 })
      const placeholders = deleteIds.map((_, i) => `$${i + 1}`).join(', ')
      await neonPool.query(`DELETE FROM certificates WHERE id IN (${placeholders})`, deleteIds)
    } else {
      const supabase = getSupabaseClient()
      if (!supabase) return NextResponse.json({ error: 'Database not configured' }, { status: 500 })

      const supabaseTable = table === 'registrations' ? 'masterclass_registrations' : 'masterclass_payments'
      const { error } = await supabase.from(supabaseTable).delete().in('id', deleteIds)
      if (error) {
        console.error('Delete error:', error)
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, message: `Deleted ${deleteIds.length} from ${table}`, count: deleteIds.length })
  } catch (err) {
    console.error('DELETE error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { key, name, email, plan } = await req.json()

    if (!key || typeof key !== 'string' || key !== ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!name || !email) {
      return NextResponse.json({ error: 'name and email are required' }, { status: 400 })
    }

    await sendCertificateFromAdmin(name, email, plan || 'pro')

    return NextResponse.json({
      success: true,
      message: `Certificate and resources sent to ${email}`,
    })
  } catch (err) {
    console.error('PUT /api/masterclass/dashboard error:', err)
    const msg = err instanceof Error ? err.message : 'Failed to send email'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

async function sendCertificateFromAdmin(name: string, email: string, plan: string) {
  if (!name || !email) throw new Error('name and email are required')

  const saved = await saveCertToNeon(name, email, 'ai-masterclass', MC_SKILLS)
  const certId = saved?.certId || `SKX-MC-${Date.now().toString(36).toUpperCase()}`
  const dateStr = saved?.issuedAt || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const certUrl = saved?.certUrl || `https://skillsxai.com/certificatedownload/${certId}`

  const isUltimate = plan === 'ultimate'
  const certHtml = generateCertHTML(name, certId, dateStr)
  const emailHtml = generateEmailHTML(name, certId, dateStr, certUrl)

  const certPdf = await htmlToPdf(certHtml, true)

  const resourceList = isUltimate ? [...BASE_RESOURCES, ULTIMATE_RESOURCE] : [...BASE_RESOURCES]
  const downloadsDir = join(process.cwd(), 'public', 'downloads')
  const attachments: { filename: string; content: Buffer; contentType: string }[] = [
    { filename: `SkillsXAI-Certificate-${name.replace(/\s+/g, '-')}.pdf`, content: certPdf, contentType: 'application/pdf' },
  ]
  for (const res of resourceList) {
    try {
      const fileContent = await readFile(join(downloadsDir, res.srcFile))
      if (res.srcFile.endsWith('.html')) {
        const pdfContent = await htmlFileToPdf(fileContent)
        attachments.push({ filename: res.filename, content: pdfContent, contentType: 'application/pdf' })
      } else {
        attachments.push({ filename: res.filename, content: fileContent, contentType: res.contentType })
      }
    } catch (e) {
      console.error(`Failed to process resource ${res.srcFile}:`, e)
    }
  }

  const planLabel = isUltimate ? 'Ultimate Package' : 'Pro Package'
  const result = await sendMail({
    to: email,
    subject: `Your AI Masterclass ${planLabel} — Certificate + Resources | ${name}`,
    html: emailHtml,
    attachments,
  })

  console.log('Email sent successfully to', email, 'messageId:', result.messageId)
}
