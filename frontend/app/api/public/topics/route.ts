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
    const subject = searchParams.get('subject') || 'physics'
    const classLevel = searchParams.get('class_level') || '10'
    const limit = searchParams.get('limit') || '20'

    const res = await fetch(
      `${API_BASE}/api/content/enrichment?subject=${subject}&class_level=${classLevel}&limit=${limit}`,
      { cache: 'no-store' }
    )
    const data = await res.json()

    return NextResponse.json({
      topics: (data.nodes || []).map((n: { node_id: string; title: string; subject: string; class_level: number; difficulty: string; cognitive_level: string }) => ({
        node_id: n.node_id,
        title: n.title,
        subject: n.subject,
        class_level: n.class_level,
        difficulty: n.difficulty,
        cognitive_level: n.cognitive_level,
      })),
      total: data.total || (data.nodes || []).length,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch topics', detail: String(error) },
      { status: 500 }
    )
  }
}
