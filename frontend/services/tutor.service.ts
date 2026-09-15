import { api } from '@/lib/api'
import type { SocraticTurn } from '@/types'

export interface TutorSessionRequest {
  nodeId: string
  topic?: string
}

export interface TutorMessage {
  role: 'tutor' | 'student'
  content: string
  type?: 'question' | 'hint' | 'confirmation' | 'redirect' | 'answer'
  misconceptionDetected?: string
  prerequisiteGap?: string
}

export interface TutorReplyRequest {
  sessionId: string
  message: string
}

export interface TutorReplyResponse {
  sessionId: string
  reply: TutorMessage
  updatedMastery?: number
}

export interface TutorSession {
  sessionId: string
  nodeId: string
  topic: string
  messages: TutorMessage[]
  socraticLevel: number
  startedAt: string
  firstQuestion?: string
}

export const tutorService = {
  startSession: (data: TutorSessionRequest) =>
    api.post<TutorSession>('/api/tutor/sessions', data),

  reply: (data: TutorReplyRequest) =>
    api.post<TutorReplyResponse>(`/api/tutor/sessions/${data.sessionId}/reply`, data),

  getSession: (sessionId: string) =>
    api.get<TutorSession>(`/api/tutor/sessions/${sessionId}`),

  getSessions: () =>
    api.get<TutorSession[]>('/api/tutor/sessions'),

  endSession: (sessionId: string) =>
    api.post<{ success: boolean }>(`/api/tutor/sessions/${sessionId}/end`),

  getHint: (sessionId: string) =>
    api.post<TutorMessage>(`/api/tutor/sessions/${sessionId}/hint`),
}
