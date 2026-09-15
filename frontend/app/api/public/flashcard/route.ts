import { NextResponse } from 'next/server'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const subject = searchParams.get('subject') || 'physics'
    const classLevel = searchParams.get('class_level') || '10'

    // Fetch enrichment nodes for the given subject/class
    const res = await fetch(
      `${API_BASE}/api/content/enrichment?subject=${subject}&class_level=${classLevel}&limit=100`,
      { cache: 'no-store' }
    )
    const data = await res.json()
    const nodes = data.nodes || []

    if (nodes.length === 0) {
      return NextResponse.json({ error: 'No enrichment nodes found' }, { status: 404 })
    }

    // Pick a random node
    const randomNode = nodes[Math.floor(Math.random() * nodes.length)]

    // Fetch full enrichment content for that node
    const enrichRes = await fetch(
      `${API_BASE}/api/content/nodes/${randomNode.node_id}/enrichment`,
      { cache: 'no-store' }
    )
    const enrichData = await enrichRes.json()

    return NextResponse.json({
      node_id: randomNode.node_id,
      title: enrichData.title || randomNode.title,
      subject: enrichData.subject || subject,
      class_level: enrichData.class_level || parseInt(classLevel),
      definition: enrichData.definition || '',
      eli5: enrichData.eli5 || '',
      text_walkthrough: enrichData.text_walkthrough || '',
      common_misconception: enrichData.common_misconception || '',
      diagnostic_question: enrichData.diagnostic_question || '',
      on_failure: enrichData.on_failure || '',
      difficulty: randomNode.difficulty || 'medium',
      cognitive_level: randomNode.cognitive_level || 'understand',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch flashcard', detail: String(error) },
      { status: 500 }
    )
  }
}
