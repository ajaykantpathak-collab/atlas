import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { contentService } from '@/services/content.service'
import { progressService } from '@/services/progress.service'
import { assessmentService } from '@/services/assessment.service'
import { achievementService } from '@/services/achievement.service'
import { tutorService } from '@/services/tutor.service'
import type { TutorSessionRequest, TutorReplyRequest } from '@/services/tutor.service'
import type { QuizAnswerRequest } from '@/services/assessment.service'
import type { ReviewAnswerRequest } from '@/services/progress.service'

// ============ CONTENT HOOKS ============

export function useSubjects(board?: string, classLevel?: number) {
  return useQuery({
    queryKey: ['subjects', board, classLevel],
    queryFn: () => contentService.getSubjects(board, classLevel),
  })
}

export function useKnowledgeGraph(board?: string, classLevel?: number) {
  return useQuery({
    queryKey: ['knowledge-graph', board, classLevel],
    queryFn: () => contentService.getKnowledgeGraph(board, classLevel),
  })
}

export function useNode(nodeId: string | null) {
  return useQuery({
    queryKey: ['node', nodeId],
    queryFn: () => contentService.getNode(nodeId!),
    enabled: !!nodeId,
  })
}

export function useNodeContent(nodeId: string | null) {
  return useQuery({
    queryKey: ['node-content', nodeId],
    queryFn: () => contentService.getNodeContent(nodeId!),
    enabled: !!nodeId,
  })
}

export function useRecommendedLessons() {
  return useQuery({
    queryKey: ['recommended-lessons'],
    queryFn: () => contentService.getRecommendedLessons(),
  })
}

export function useSearchNodes(query: string) {
  return useQuery({
    queryKey: ['search-nodes', query],
    queryFn: () => contentService.searchNodes(query),
    enabled: query.length > 2,
  })
}

export function useNodesBySubject(subject: string, classLevel?: number) {
  return useQuery({
    queryKey: ['nodes-by-subject', subject, classLevel],
    queryFn: () => contentService.getNodesBySubject(subject, classLevel),
  })
}

// ============ PROGRESS HOOKS ============

export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => progressService.getDashboard(),
  })
}

export function useProgressOverview(timeRange?: 'week' | 'month' | 'all') {
  return useQuery({
    queryKey: ['progress-overview', timeRange],
    queryFn: () => progressService.getProgressOverview(timeRange),
  })
}

export function useSubjectMastery() {
  return useQuery({
    queryKey: ['subject-mastery'],
    queryFn: () => progressService.getSubjectMastery(),
  })
}

export function useRecentActivity(limit?: number) {
  return useQuery({
    queryKey: ['recent-activity', limit],
    queryFn: () => progressService.getRecentActivity(limit),
  })
}

export function useWeeklyActivity() {
  return useQuery({
    queryKey: ['weekly-activity'],
    queryFn: () => progressService.getWeeklyActivity(),
  })
}

export function useMilestones() {
  return useQuery({
    queryKey: ['milestones'],
    queryFn: () => progressService.getMilestones(),
  })
}

export function useStudyHeatmap() {
  return useQuery({
    queryKey: ['study-heatmap'],
    queryFn: () => progressService.getStudyHeatmap(),
  })
}

// ============ SPACED REPETITION HOOKS ============

export function useReviewQueue() {
  return useQuery({
    queryKey: ['review-queue'],
    queryFn: () => progressService.getReviewQueue(),
  })
}

export function useSubmitReview() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: ReviewAnswerRequest) => progressService.submitReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review-queue'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['subject-mastery'] })
    },
  })
}

export function useReviewStats() {
  return useQuery({
    queryKey: ['review-stats'],
    queryFn: () => progressService.getRetentionRate(),
  })
}

// ============ OFFLINE CONTENT HOOKS ============

export function useOfflineContent() {
  return useQuery({
    queryKey: ['offline-content'],
    queryFn: () => progressService.getOfflineContent(),
  })
}

export function useDownloadContent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (nodeId: string) => progressService.downloadContent(nodeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offline-content'] })
    },
  })
}

export function useRemoveOfflineContent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (nodeId: string) => progressService.removeOfflineContent(nodeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offline-content'] })
    },
  })
}

// ============ ASSESSMENT HOOKS ============

export function useQuizQuestions(nodeId: string | null, count?: number) {
  return useQuery({
    queryKey: ['quiz-questions', nodeId, count],
    queryFn: () => assessmentService.getQuizQuestions(nodeId!, count),
    enabled: !!nodeId,
  })
}

export function useSubmitQuizAnswer() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: QuizAnswerRequest) => assessmentService.submitQuizAnswer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
      queryClient.invalidateQueries({ queryKey: ['subject-mastery'] })
    },
  })
}

export function useExams(board?: string, classLevel?: number) {
  return useQuery({
    queryKey: ['exams', board, classLevel],
    queryFn: () => assessmentService.getExams(board, classLevel),
  })
}

export function useExam(examId: string | null) {
  return useQuery({
    queryKey: ['exam', examId],
    queryFn: () => assessmentService.getExam(examId!),
    enabled: !!examId,
  })
}

export function useSubmitExam() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { examId: string; answers: { questionId: string; answer: string; timeTakenSeconds?: number }[] }) =>
      assessmentService.submitExam(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exams'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

// ============ ACHIEVEMENT HOOKS ============

export function useAchievements(filter?: 'all' | 'unlocked' | 'locked') {
  return useQuery({
    queryKey: ['achievements', filter],
    queryFn: () => achievementService.getAchievements(filter),
  })
}

export function useAchievementStats() {
  return useQuery({
    queryKey: ['achievement-stats'],
    queryFn: () => achievementService.getStats(),
  })
}

// ============ TUTOR HOOKS ============

export function useStartTutorSession() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: TutorSessionRequest) => tutorService.startSession(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutor-sessions'] })
    },
  })
}

export function useTutorReply() {
  return useMutation({
    mutationFn: (data: TutorReplyRequest) => tutorService.reply(data),
  })
}

export function useTutorSession(sessionId: string | null) {
  return useQuery({
    queryKey: ['tutor-session', sessionId],
    queryFn: () => tutorService.getSession(sessionId!),
    enabled: !!sessionId,
  })
}

export function useTutorSessions() {
  return useQuery({
    queryKey: ['tutor-sessions'],
    queryFn: () => tutorService.getSessions(),
  })
}

export function useTutorHint() {
  return useMutation({
    mutationFn: (sessionId: string) => tutorService.getHint(sessionId),
  })
}
