import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, quizScore, course } = body

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }
    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 })
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }

    const emailNorm = email.trim().toLowerCase()
    const courseSlug = typeof course === 'string' ? course : 'ai-masterclass'

    const rowData = {
      name: name.trim(),
      email: emailNorm,
      phone: phone.trim(),
      quiz_score: typeof quizScore === 'number' ? quizScore : null,
      payment_status: 'pending',
      course: courseSlug,
    }

    const { data: existing } = await supabase
      .from('masterclass_registrations')
      .select('id')
      .eq('email', emailNorm)
      .eq('course', courseSlug)
      .limit(1)
      .single()

    if (existing) {
      const { error } = await supabase
        .from('masterclass_registrations')
        .update({
          name: rowData.name,
          phone: rowData.phone,
          quiz_score: rowData.quiz_score,
        })
        .eq('id', existing.id)

      if (error) {
        console.error('Registration update error:', error)
        return NextResponse.json({ error: 'Failed to update registration' }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        registrationId: existing.id,
        message: 'Registration updated successfully',
      })
    }

    const { data, error } = await supabase
      .from('masterclass_registrations')
      .insert(rowData)
      .select('id')
      .single()

    if (error) {
      console.error('Registration insert error:', error)
      return NextResponse.json({ error: 'Failed to save registration' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      registrationId: data?.id,
      message: 'Registration saved successfully',
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
