/**
 * Socratic tutor service — connects to the PCR-gated Socratic pipeline.
 */

import { api } from '@/lib/api'

export interface SocraticRequest {
  query: string
  user_id: string
  node_id?: string
  mastery?: number
  subject?: string
  class_level?: number
}

export interface SocraticResponse {
  question: string
  hint: string
  feedback: string
  intent: string
  mastery_level: string  // low, medium, high
  hint_level: number     // 1-4
  retrieved_count: number
  revealed_count: number
  quality_score: number
  latency_ms: number
  errors: string[]
}

export interface SolverRequest {
  category: string
  values: Record<string, unknown>
}

export interface SolverStep {
  description: string
  formula: string
  computation: string
  answer: string
  success: boolean
}

export interface SolverResult {
  question: string
  steps: SolverStep[]
  error: string
  success: boolean
  category: string
  final_answer: string
}

export interface CategoryInfo {
  physics: string[]
  chemistry: string[]
  accounts: string[]
  applied_maths: string[]
}

export interface CompetencyQuestion {
  question: string
  question_type: string
  expected_concepts: string[]
  common_misconceptions: string[]
  difficulty: string
}

export const socraticService = {
  ask: (req: SocraticRequest) =>
    api.post<SocraticResponse>('/api/socratic/ask', req),

  getHint: (req: SocraticRequest) =>
    api.post<{ hint: string; hint_level: number; mastery_level: string }>('/api/socratic/hint', req),

  solve: (req: SolverRequest) =>
    api.post<SolverResult>('/api/solver/v2/solve', req),

  getCategories: () =>
    api.get<CategoryInfo>('/api/solver/v2/categories'),

  detectCategory: (question: string) =>
    api.post<{ category: string; confidence: number }>('/api/solver/v2/detect-category', { question }),

  getCompetencyQuestions: (category: string) =>
    api.get<CompetencyQuestion[]>(`/api/solver/v2/competency-questions?category=${category}`),
}
