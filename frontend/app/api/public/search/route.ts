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
    const q = searchParams.get('q') || ''
    const classLevel = searchParams.get('class_level')
    const subject = searchParams.get('subject')

    if (!q) {
      return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 })
    }

    const params = new URLSearchParams({ q })
    if (classLevel) params.set('class_level', classLevel)
    if (subject) params.set('subject', subject)

    const res = await fetch(
      `${API_BASE}/api/graph/search?${params.toString()}`,
      { cache: 'no-store' }
    )
    const data = await res.json()

    return NextResponse.json({
      nodes: (data.nodes || []).map((n: { props: { node_id: string; topic: string; class_level: number; subject: string; content_snippet: string; board: string; is_root: boolean } }) => ({
        node_id: n.props.node_id,
        topic: n.props.topic,
        class_level: n.props.class_level,
        subject: n.props.subject,
        content_snippet: n.props.content_snippet,
        board: n.props.board,
        is_root: n.props.is_root,
      })),
      count: data.count || 0,
      query: data.query || q,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to search', detail: String(error) },
      { status: 500 }
    )
  }
}
