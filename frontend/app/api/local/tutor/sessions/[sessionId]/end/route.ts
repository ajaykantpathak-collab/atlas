import { NextResponse } from 'next/server'
import { sessions } from '@/lib/tutorSessions'

// POST /api/local/tutor/sessions/{sessionId}/end

export async function POST(
  _request: Request,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { sessionId } = params
    const session = sessions.get(sessionId)
    if (session) {
      session.phase = 'ended'
    }
    return NextResponse.json({ status: 'ended', source: 'local' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to end session', detail: String(error) },
      { status: 500 }
    )
  }
}
