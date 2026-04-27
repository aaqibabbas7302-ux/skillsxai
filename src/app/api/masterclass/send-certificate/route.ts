import { NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { generateCertHTML, generateEmailHTML } from '@/lib/certificate'
import { saveCertToNeon } from '@/lib/neon'
import { sendMail } from '@/lib/email'
import { htmlToPdf, htmlFileToPdf } from '@/lib/pdf'

const BASE_RESOURCES = [
  { filename: 'Claude-AI-Cheat-Sheet.pdf', srcFile: 'claude-ai-cheatsheet.html', contentType: 'application/pdf' },
  { filename: 'Free-AI-APIs-NVIDIA-Guide.pdf', srcFile: 'free-ai-apis-guide.html', contentType: 'application/pdf' },
  { filename: 'AI-Career-Roadmap-2026.pdf', srcFile: 'ai-career-roadmap-2026.html', contentType: 'application/pdf' },
] as const

const ULTIMATE_RESOURCE = { filename: 'AI-Agent-Masterclass-Sheet.csv', srcFile: 'Ai Agent Masterclass Sheet - Sheet1.csv', contentType: 'text/csv' } as const

async function loadResources(plan: string) {
  const resourceList = plan === 'ultimate' ? [...BASE_RESOURCES, ULTIMATE_RESOURCE] : [...BASE_RESOURCES]
  const downloadsDir = join(process.cwd(), 'public', 'downloads')
  const attachments: { filename: string; content: Buffer; contentType: string }[] = []

  for (const res of resourceList) {
    try {
      const fileContent = await readFile(join(downloadsDir, res.srcFile))
      if (res.srcFile.endsWith('.html')) {
        const pdfContent = await htmlFileToPdf(fileContent)
        attachments.push({ filename: res.filename, content: pdfContent, contentType: 'application/pdf' })
      } else {
        attachments.push({ filename: res.filename, content: fileContent, contentType: res.contentType })
      }
    } catch {
      // Skip files that can't be processed
    }
  }

  return attachments
}

export async function POST(req: Request) {
  try {
    const { name, email, plan } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'name and email are required' }, { status: 400 })
    }

    const selectedPlan = plan === 'ultimate' ? 'ultimate' : 'pro'

    const saved = await saveCertToNeon(
      name,
      email,
      'ai-masterclass',
      ['Artificial Intelligence', 'Prompt Engineering', 'AI Agents & Automation', 'AI Tools & APIs']
    )
    const certId = saved?.certId || `SKX-MC-${Date.now().toString(36).toUpperCase()}`
    const dateStr = saved?.issuedAt || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    const certUrl = saved?.certUrl || `https://skillsxai.com/certificatedownload/${certId}`

    const certHtml = generateCertHTML(name, certId, dateStr, certUrl)
    const emailHtml = generateEmailHTML(name, certId, dateStr, certUrl)

    const certPdf = await htmlToPdf(certHtml, true)
    const resources = await loadResources(selectedPlan)
    const planLabel = selectedPlan === 'ultimate' ? 'Ultimate Package' : 'Pro Package'

    await sendMail({
      to: email,
      subject: `Your AI Masterclass ${planLabel} — Certificate + Resources | ${name}`,
      html: emailHtml,
      attachments: [
        {
          filename: `SkillsXAI-Certificate-${name.replace(/\s+/g, '-')}.pdf`,
          content: certPdf,
          contentType: 'application/pdf',
        },
        ...resources,
      ],
    })

    return NextResponse.json({ sent: true, message: `Certificate and ${planLabel} resources emailed successfully!`, certUrl })
  } catch (err) {
    console.error('send-certificate error:', err)
    return NextResponse.json({ sent: false, message: 'Failed to send email' }, { status: 500 })
  }
}
