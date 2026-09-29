import { NextResponse } from 'next/server'

// Backend base for server-side route handlers: INTERNAL_API_URL is set in the
// frontend container (http://backends:8000). localhost:8001 does not exist there
// — see app/api/achievements/route.ts for the same policy. Dev fallback kept.
const API_BASE =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:8001'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const nodeId = searchParams.get('node_id')

    if (!nodeId) {
      return NextResponse.json({ error: 'node_id parameter is required' }, { status: 400 })
    }

    const res = await fetch(
      `${API_BASE}/api/content/nodes/${nodeId}/enrichment`,
      { cache: 'no-store' }
    )

    if (!res.ok) {
      return NextResponse.json({ error: 'Node not found' }, { status: 404 })
    }

    const data = await res.json()

    return NextResponse.json({
      node_id: data.node_id,
      title: data.title,
      subject: data.subject,
      class_level: data.class_level,
      definition: data.definition || '',
      eli5: data.eli5 || '',
      text_walkthrough: data.text_walkthrough || '',
      common_misconception: data.common_misconception || '',
      diagnostic_question: data.diagnostic_question || '',
      on_failure: data.on_failure || '',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch enrichment', detail: String(error) },
      { status: 500 }
    )
  }
}
