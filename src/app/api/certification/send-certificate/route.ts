import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { generateCertHTML, generateEmailHTML } from '@/lib/certificate'
import { saveCertToNeon } from '@/lib/neon'

const resendKey = process.env.RESEND_API_KEY

export async function POST(req: Request) {
  try {
    const { name, email, course, courseTitle, skills, courseDescription } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'name and email are required' }, { status: 400 })
    }

    if (!resendKey) {
      return NextResponse.json(
        { sent: false, message: 'Email service not configured — certificate can still be downloaded.' },
        { status: 200 },
      )
    }

    const courseSlug = typeof course === 'string' ? course : 'ai-masterclass'
    const certSkills = Array.isArray(skills) ? skills : ['Artificial Intelligence', 'Prompt Engineering', 'AI Agents & Automation', 'AI Tools & APIs']
    const title = typeof courseTitle === 'string' ? courseTitle : 'AI Masterclass'

    const saved = await saveCertToNeon(name, email, courseSlug, certSkills)
    const certId = saved?.certId || `SKX-MC-${Date.now().toString(36).toUpperCase()}`
    const dateStr = saved?.issuedAt || new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    const certUrl = saved?.certUrl || `https://skillsxai.com/certificatedownload/${certId}`

    const certOpts = { courseTitle: title, skills: certSkills, courseDescription: typeof courseDescription === 'string' ? courseDescription : undefined }
    const resend = new Resend(resendKey)
    const certHtml = generateCertHTML(name, certId, dateStr, certUrl, certOpts)
    const emailHtml = generateEmailHTML(name, certId, dateStr, certUrl, certOpts)

    const { error } = await resend.emails.send({
      from: 'SkillsXAI <certificates@team.skillsxai.com>',
      to: email,
      subject: `Your ${title} Certificate — ${name} | SkillsXAI`,
      html: emailHtml,
      attachments: [
        {
          filename: `SkillsXAI-Certificate-${name.replace(/\s+/g, '-')}.html`,
          content: Buffer.from(certHtml, 'utf-8'),
          contentType: 'text/html',
        },
      ],
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ sent: false, message: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ sent: true, message: 'Certificate emailed successfully!', certUrl })
  } catch (err) {
    console.error('send-certificate error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
