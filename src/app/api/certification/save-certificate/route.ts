import { NextResponse } from 'next/server'
import { saveCertToNeon } from '@/lib/neon'

export async function POST(req: Request) {
  try {
    const { name, email, skills, course } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'name and email are required' }, { status: 400 })
    }

    const courseSlug = typeof course === 'string' ? course : 'ai-masterclass'
    const certSkills = Array.isArray(skills) && skills.length > 0
      ? skills
      : ['Artificial Intelligence', 'Prompt Engineering', 'AI Agents & Automation', 'AI Tools & APIs']

    const saved = await saveCertToNeon(name, email, courseSlug, certSkills)

    if (!saved) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    return NextResponse.json({
      certId: saved.certId,
      certUrl: saved.certUrl,
      issuedAt: saved.issuedAt,
    })
  } catch (err) {
    console.error('save-certificate error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
