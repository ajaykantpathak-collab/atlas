import { api } from '@/lib/api'
import type { User } from '@/types'
import type { RecommendedLessonSchema } from './content.service'

export interface MasteryRecordSchema {
  nodeId: string
  masteryProbability: number
  pKnown: number
  attempts: number
  lastAttemptAt?: string
}

export interface SubjectMasterySchema {
  subject: string
  totalNodes: number
  masteredNodes: number
  learningNodes: number
  notStartedNodes: number
  masteryPercentage: number
  weeklyChange: number
}

export interface ProgressOverviewSchema {
  totalNodes: number
  masteredNodes: number
  studyTimeHours: number
  avgMastery: number
  subjects: SubjectMasterySchema[]
}

export interface ActivitySchema {
  id: string
  activityType: string
  title: string
  subject?: string
  score?: string
  time: string
}

export interface ReviewItemSchema {
  id: string
  nodeId: string
  conceptName: string
  subject?: string
  easinessFactor: number
  intervalDays: number
  interval?: number
  repetitions: number
  nextReviewDate: string
  question: string
  answer: string
  options?: string[]
  correctOption?: string
}

export interface ReviewQueueResponse {
  items: ReviewItemSchema[]
  total: number
}

export interface ReviewAnswerRequest {
  itemId: string
  quality: number
  responseTimeSeconds?: number
}

export interface ReviewAnswerResponse {
  updatedInterval: number
  updatedEasiness: number
  nextReviewDate: string
  updatedMastery: number
}

export interface DashboardSchema {
  user: User
  totalXp: number
  level: number
  levelXp: number
  levelMax: number
  streak: number
  recommendedLessons: RecommendedLessonSchema[]
  masterySubjects: SubjectMasterySchema[]
  recentActivity: ActivitySchema[]
}

export interface WeeklyActivitySchema {
  day: string
  value: number
}

export interface MilestoneSchema {
  title: string
  subject: string
  time: string
  icon: string
}

export const progressService = {
  getDashboard: () =>
    api.get<DashboardSchema>('/api/progress/dashboard'),

  getProgressOverview: (timeRange?: 'week' | 'month' | 'all') =>
    api.get<ProgressOverviewSchema>(
      `/api/progress/overview${timeRange ? `?range=${timeRange}` : ''}`
    ),

  getSubjectMastery: () =>
    api.get<SubjectMasterySchema[]>('/api/progress/mastery'),

  getRecentActivity: (limit?: number) =>
    api.get<ActivitySchema[]>(
      `/api/progress/activity${limit ? `?limit=${limit}` : ''}`
    ),

  getWeeklyActivity: () =>
    api.get<WeeklyActivitySchema[]>('/api/progress/weekly-activity'),

  getMilestones: () =>
    api.get<MilestoneSchema[]>('/api/progress/milestones'),

  getStudyHeatmap: () =>
    api.get<{ date: string; intensity: number }[]>('/api/progress/heatmap'),

  getMasteryRecord: (nodeId: string) =>
    api.get<MasteryRecordSchema>(`/api/progress/mastery/${nodeId}`),

  // Spaced Repetition
  getReviewQueue: () =>
    api.get<ReviewQueueResponse>('/api/progress/review/queue'),

  submitReview: (data: ReviewAnswerRequest) =>
    api.post<ReviewAnswerResponse>('/api/progress/review/answer', data),

  getRetentionRate: () =>
    api.get<{ retentionRate: number; streak: number }>('/api/progress/review/stats'),

  // Offline content
  getOfflineContent: () =>
    api.get<OfflineContentItem[]>('/api/progress/offline'),

  downloadContent: (nodeId: string) =>
    api.post<{ success: boolean }>(`/api/progress/offline/${nodeId}/download`),

  removeOfflineContent: (nodeId: string) =>
    api.delete<{ success: boolean }>(`/api/progress/offline/${nodeId}`),
}

export interface OfflineContentItem {
  id: string
  nodeId: string
  title: string
  subject: string
  type: 'video' | 'document' | 'audio' | 'interactive'
  size: string
  sizeBytes: number
  status: 'downloaded' | 'downloading' | 'queued' | 'update-available' | 'not-downloaded'
  progress?: number
  lastUpdated: string
  chapter: string
}
