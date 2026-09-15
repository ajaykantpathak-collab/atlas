/* ═══════════════════════════════════════════════════════════════════════════
   tutorSessions.ts — In-memory store for local tutor sessions
   Shared across all API route handlers.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface TutorMessage {
  role: 'user' | 'tutor'
  content: string
  type?: string
  diagnostic_state?: any
}

export interface TutorSession {
  sessionId: string
  nodeId: string
  topic: string
  messages: TutorMessage[]
  phase: string
}

export const sessions = new Map<string, TutorSession>()

export function genSessionId(): string {
  return `s-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}
