import { NextResponse } from 'next/server'
import { sessions } from '@/lib/tutorSessions'

// GET /api/local/tutor/sessions/{sessionId}
// Returns session details including all messages (for resume)

export async function GET(
  _request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params
    const session = sessions.get(sessionId)
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    return NextResponse.json({
      session_id: session.sessionId,
      node_id: session.nodeId,
      topic: session.topic,
      messages: session.messages,
      source: 'local',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get session', detail: String(error) },
      { status: 500 }
    )
  }
}
