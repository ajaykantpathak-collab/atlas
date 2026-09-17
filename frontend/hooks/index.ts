import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { contentService } from '@/services/content.service'
import { progressService } from '@/services/progress.service'
import { assessmentService } from '@/services/assessment.service'
import { achievementService } from '@/services/achievement.service'
import { tutorService } from '@/services/tutor.service'
import { useAuthStore } from '@/stores/authStore'
import type { TutorSessionRequest, TutorReplyRequest } from '@/services/tutor.service'
import type { QuizAnswerRequest } from '@/services/assessment.service'
import type { ReviewAnswerRequest } from '@/services/progress.service'

// Phase 5.2: every hook below that calls an AUTHED backend route
// (get_current_user: /api/progress/*, /api/achievements/*, /api/tutor/sessions*,
// /api/assessment/*, /api/content/recommended) must gate its query on
// authentication so anonymous visits render honest empty states instead of
// spraying 401s into the console.
function useIsAuthenticated() {
  return useAuthStore((s) => s.isAuthenticated)
}

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
  // /api/content/recommended requires auth (get_current_user) — Phase 5.2.
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['recommended-lessons'],
    queryFn: () => contentService.getRecommendedLessons(),
    enabled: isAuthenticated,
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
// All /api/progress/* routes require auth (get_current_user) — gate each on
// authentication so anonymous visits don't log 401s (Phase 5.2).

export function useDashboard() {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: () => progressService.getDashboard(),
    enabled: isAuthenticated,
  })
}

export function useProgressOverview(timeRange?: 'week' | 'month' | 'all') {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['progress-overview', timeRange],
    queryFn: () => progressService.getProgressOverview(timeRange),
    enabled: isAuthenticated,
  })
}

export function useSubjectMastery() {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['subject-mastery'],
    queryFn: () => progressService.getSubjectMastery(),
    enabled: isAuthenticated,
  })
}

export function useRecentActivity(limit?: number) {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['recent-activity', limit],
    queryFn: () => progressService.getRecentActivity(limit),
    enabled: isAuthenticated,
  })
}

export function useWeeklyActivity() {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['weekly-activity'],
    queryFn: () => progressService.getWeeklyActivity(),
    enabled: isAuthenticated,
  })
}

export function useMilestones() {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['milestones'],
    queryFn: () => progressService.getMilestones(),
    enabled: isAuthenticated,
  })
}

export function useStudyHeatmap() {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['study-heatmap'],
    queryFn: () => progressService.getStudyHeatmap(),
    enabled: isAuthenticated,
  })
}

// ============ SPACED REPETITION HOOKS ============

export function useReviewQueue() {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['review-queue'],
    queryFn: () => progressService.getReviewQueue(),
    enabled: isAuthenticated,
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
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['review-stats'],
    queryFn: () => progressService.getRetentionRate(),
    enabled: isAuthenticated,
  })
}

// ============ OFFLINE CONTENT HOOKS ============

export function useOfflineContent() {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['offline-content'],
    queryFn: () => progressService.getOfflineContent(),
    enabled: isAuthenticated,
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
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['quiz-questions', nodeId, count],
    queryFn: () => assessmentService.getQuizQuestions(nodeId!, count),
    enabled: !!nodeId && isAuthenticated,
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
  // /api/assessment/exams requires auth (backend get_current_user) — do not
  // fire it for anonymous visitors (Phase 5.2: kills the 401 console noise
  // on every exam-list load; pages already render their signed-out state).
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['exams', board, classLevel],
    queryFn: () => assessmentService.getExams(board, classLevel),
    enabled: isAuthenticated,
  })
}

export function useExam(examId: string | null) {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['exam', examId],
    queryFn: () => assessmentService.getExam(examId!),
    enabled: !!examId && isAuthenticated,
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
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['achievements', filter],
    queryFn: () => achievementService.getAchievements(filter),
    enabled: isAuthenticated,
  })
}

export function useAchievementStats() {
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['achievement-stats'],
    queryFn: () => achievementService.getStats(),
    enabled: isAuthenticated,
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
  // GET /api/tutor/sessions requires auth (get_current_user) — Phase 5.2.
  const isAuthenticated = useIsAuthenticated()
  return useQuery({
    queryKey: ['tutor-sessions'],
    queryFn: () => tutorService.getSessions(),
    enabled: isAuthenticated,
  })
}

export function useTutorHint() {
  return useMutation({
    mutationFn: (sessionId: string) => tutorService.getHint(sessionId),
  })
}
