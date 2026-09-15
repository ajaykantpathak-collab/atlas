import { NextResponse } from 'next/server'
import { getEnrichmentNode } from '@/lib/markerParser'
import { sessions, genSessionId } from '@/lib/tutorSessions'

// POST /api/local/tutor/sessions
// Create a new tutor session for a node
// Body: { node_id: string, topic?: string }

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { node_id, topic } = body

    if (!node_id) {
      return NextResponse.json({ error: 'node_id is required' }, { status: 400 })
    }

    const node = getEnrichmentNode(node_id)
    const sessionId = genSessionId()
    const sessionTopic = topic || node?.title || node_id

    const greeting = buildGreeting(node, sessionTopic)

    const session = {
      sessionId,
      nodeId: node_id,
      topic: sessionTopic,
      messages: [
        {
          role: 'tutor' as const,
          content: greeting,
          type: 'teach',
          diagnostic_state: { phase: 'teach' },
        },
      ],
      phase: 'teach',
    }

    sessions.set(sessionId, session)

    return NextResponse.json({
      session_id: sessionId,
      node_id: node_id,
      topic: sessionTopic,
      messages: session.messages,
      source: 'local',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create session', detail: String(error) },
      { status: 500 }
    )
  }
}

// GET /api/local/tutor/sessions — list all sessions
export async function GET() {
  const list = Array.from(sessions.values()).map(s => ({
    session_id: s.sessionId,
    node_id: s.nodeId,
    topic: s.topic,
    started_at: new Date().toISOString(),
    status: 'active',
    message_count: s.messages.length,
  }))
  return NextResponse.json(list)
}

function buildGreeting(node: any, topic: string): string {
  if (!node) {
    return `Hello! I'm your AI tutor. Let's learn about ${topic}. Ask me anything, or try: walkthrough, simplify, mistakes, test me.`
  }

  const intro = node.eli5 || node.definition?.slice(0, 300) || ''
  return `Welcome! Let's learn about: ${node.title} 📚\n\n${intro}\n\nWhat would you like to do next? You can:\n• Ask me a question\n• Type "walkthrough" for a step-by-step explanation\n• Type "simplify" for an ELI5 explanation\n• Type "mistakes" to see common mistakes\n• Type "test me" to check your understanding`
}
