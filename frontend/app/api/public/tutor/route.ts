import { NextResponse } from 'next/server'

// Backend base for server-side route handlers: INTERNAL_API_URL is set in the
// frontend container (http://backends:8000). localhost:8001 does not exist there
// — see app/api/achievements/route.ts for the same policy. Dev fallback kept.
const API_BASE =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:8001'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, subject, class_level } = body

    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 })
    }

    const payload: Record<string, unknown> = { message }
    if (subject) payload.subject = subject
    if (class_level) payload.class_level = class_level

    const res = await fetch(`${API_BASE}/api/tutor/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }))
      return NextResponse.json({ error: err.detail || 'Tutor request failed' }, { status: res.status })
    }

    const data = await res.json()

    return NextResponse.json({
      answer: data.answer,
      node_id: data.node_id,
      node_title: data.node_title,
      subject: data.subject,
      class_level: data.class_level,
      confidence: data.confidence,
      method: data.method,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get tutor response', detail: String(error) },
      { status: 500 }
    )
  }
}
