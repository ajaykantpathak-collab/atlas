/**
 * Analytics service for admin/parent/teacher dashboards.
 * Connects to the platform backend analytics API.
 */

import { api } from '@/lib/api'

// ── Types ────────────────────────────────────────────────────── //

export interface EventCounts {
  [eventType: string]: number
}

export interface MasteryDistribution {
  subject: string
  class_level: number
  low_mastery: number
  medium_mastery: number
  high_mastery: number
  total_students: number
  avg_mastery: number
}

export interface DifficultySummary {
  subject: string
  class_level: number
  total_questions: number
  questions_with_data: number
  avg_difficulty: number
  avg_pass_rate: number
  avg_time_per_question: number
}

export interface LLMCostRow {
  call_type: string
  model: string
  total_calls: number
  total_tokens: number
  total_cost: number
  avg_latency: number
  total_errors: number
}

export interface MisconceptionRow {
  subject: string
  node_id: string
  total_count: number
  unique_students: number
}

export interface SocraticStatRow {
  pcr_level: string
  total_interactions: number
  avg_mastery_before: number
  avg_mastery_after: number
  hint_1_count: number
  hint_2_count: number
  hint_3_count: number
  hint_4_count: number
}

export interface WeeklyEngagementRow {
  week_start: string
  user_id: string
  total_time_seconds: number
  questions_answered: number
  lessons_completed: number
  reviews_completed: number
  exams_submitted: number
  hints_requested: number
  socratic_interactions: number
  mastery_achievements: number
  correct_answers: number
}

export interface DashboardOverview {
  event_counts_24h: EventCounts
  mastery_distribution: MasteryDistribution[]
  difficulty_summary: DifficultySummary[]
  llm_costs_7d: LLMCostRow[]
  common_misconceptions_7d: MisconceptionRow[]
  socratic_stats_7d: SocraticStatRow[]
}

// ── Service ──────────────────────────────────────────────────── //

export const analyticsService = {
  getOverview: () => api.get<DashboardOverview>('/api/analytics/overview'),

  getEventCounts: (hours = 24) =>
    api.get<EventCounts>(`/api/analytics/events?hours=${hours}`),

  getMasteryDistribution: () =>
    api.get<MasteryDistribution[]>('/api/analytics/mastery-distribution'),

  getDifficultySummary: () =>
    api.get<DifficultySummary[]>('/api/analytics/difficulty-summary'),

  getLLMCosts: (days = 7) =>
    api.get<LLMCostRow[]>(`/api/analytics/llm-costs?days=${days}`),

  getCommonMisconceptions: (days = 7) =>
    api.get<MisconceptionRow[]>(`/api/analytics/misconceptions?days=${days}`),

  getSocraticStats: (days = 7) =>
    api.get<SocraticStatRow[]>(`/api/analytics/socratic-stats?days=${days}`),

  getWeeklyEngagement: () =>
    api.get<WeeklyEngagementRow[]>('/api/analytics/weekly-engagement'),
}
