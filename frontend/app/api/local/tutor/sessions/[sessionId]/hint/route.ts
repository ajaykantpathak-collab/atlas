import { NextResponse } from 'next/server'
import { getEnrichmentNode } from '@/lib/markerParser'
import { sessions } from '@/lib/tutorSessions'

// POST /api/local/tutor/sessions/{sessionId}/hint

export async function POST(
  _request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params
    const session = sessions.get(sessionId)
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    const node = getEnrichmentNode(session.nodeId)

    // Build a hint from the ELI5 or first paragraph of definition
    let hintContent = 'Hint: Re-read the definition carefully and try breaking the problem into smaller steps.'

    if (node?.eli5) {
      const sentences = node.eli5.split('. ')
      hintContent = `💡 **Hint:** ${sentences[0]}.${sentences[1] ? ' ' + sentences[1] + '.' : ''}\n\nThink about this and try again!`
    } else if (node?.definition) {
      const firstPara = node.definition.split('\n')[0]
      hintContent = `💡 **Hint:** ${firstPara.slice(0, 200)}...\n\nUse this to guide your thinking!`
    }

    // Store the hint message
    session.messages.push({
      role: 'tutor',
      content: hintContent,
      type: 'hint',
      diagnostic_state: { phase: session.phase || 'teach' },
    })

    return NextResponse.json({
      reply: {
        content: hintContent,
        type: 'hint',
        diagnostic_state: { phase: session.phase || 'teach' },
      },
      source: 'local',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate hint', detail: String(error) },
      { status: 500 }
    )
  }
}
