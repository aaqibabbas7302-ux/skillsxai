import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const PLAN_AMOUNTS: Record<string, number> = { pro: 199, ultimate: 299 }

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, utr, name, email, phone, plan } = body

    if (!orderId || typeof orderId !== 'string') {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 })
    }
    if (!utr || typeof utr !== 'string') {
      return NextResponse.json({ error: 'UPI Reference ID is required' }, { status: 400 })
    }

    const sanitizedUtr = utr.replace(/\s/g, '')
    if (!/^\d{12}$/.test(sanitizedUtr)) {
      return NextResponse.json({ error: 'Invalid UPI Reference ID' }, { status: 400 })
    }

    const selectedPlan = plan === 'ultimate' ? 'ultimate' : 'pro'
    const amount = PLAN_AMOUNTS[selectedPlan]

    const supabase = getSupabaseClient()

    if (supabase) {
      const { data: existing } = await supabase
        .from('masterclass_payments')
        .select('id')
        .eq('utr', sanitizedUtr)
        .maybeSingle()

      if (existing) {
        return NextResponse.json({
          success: false,
          verified: false,
          status: 'DUPLICATE_UTR',
          message: 'This UPI Reference ID has already been submitted. If you believe this is an error, please contact support.',
        })
      }

      await supabase.from('masterclass_payments').insert({
        name: name || '',
        email: email || '',
        phone: phone || '',
        utr: sanitizedUtr,
        amount,
        order_id: orderId,
        plan: selectedPlan,
        paytm_status: 'PENDING_MANUAL',
        paytm_result_msg: `UPI payment (${selectedPlan} plan) — awaiting manual verification`,
        verified: false,
      })
    }

    const planLabel = selectedPlan === 'ultimate' ? 'Ultimate' : 'Pro'
    return NextResponse.json({
      success: true,
      verified: false,
      status: 'PENDING_MANUAL',
      message: `Payment submitted! Your ${planLabel} Package certificate and resources will be sent to your email once we verify your payment.`,
    })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
