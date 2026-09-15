/**
 * React Query hooks for analytics and Socratic services.
 */

import { useQuery, useMutation } from '@tanstack/react-query'
import { analyticsService } from '@/services/analytics.service'
import { socraticService, SocraticRequest, SolverRequest } from '@/services/socratic.service'

// ── Analytics hooks ──────────────────────────────────────────── //

export function useDashboardOverview() {
  return useQuery({
    queryKey: ['analytics', 'overview'],
    queryFn: analyticsService.getOverview,
    refetchInterval: 30000, // Refresh every 30s
  })
}

export function useEventCounts(hours = 24) {
  return useQuery({
    queryKey: ['analytics', 'events', hours],
    queryFn: () => analyticsService.getEventCounts(hours),
    refetchInterval: 60000,
  })
}

export function useMasteryDistribution() {
  return useQuery({
    queryKey: ['analytics', 'mastery-distribution'],
    queryFn: analyticsService.getMasteryDistribution,
  })
}

export function useDifficultySummary() {
  return useQuery({
    queryKey: ['analytics', 'difficulty-summary'],
    queryFn: analyticsService.getDifficultySummary,
  })
}

export function useLLMCosts(days = 7) {
  return useQuery({
    queryKey: ['analytics', 'llm-costs', days],
    queryFn: () => analyticsService.getLLMCosts(days),
  })
}

export function useCommonMisconceptions(days = 7) {
  return useQuery({
    queryKey: ['analytics', 'misconceptions', days],
    queryFn: () => analyticsService.getCommonMisconceptions(days),
  })
}

export function useSocraticStats(days = 7) {
  return useQuery({
    queryKey: ['analytics', 'socratic-stats', days],
    queryFn: () => analyticsService.getSocraticStats(days),
  })
}

export function useWeeklyEngagement() {
  return useQuery({
    queryKey: ['analytics', 'weekly-engagement'],
    queryFn: analyticsService.getWeeklyEngagement,
  })
}

// ── Socratic hooks ───────────────────────────────────────────── //

export function useSocraticAsk() {
  return useMutation({
    mutationFn: (req: SocraticRequest) => socraticService.ask(req),
  })
}

export function useSocraticHint() {
  return useMutation({
    mutationFn: (req: SocraticRequest) => socraticService.getHint(req),
  })
}

export function useSolverSolve() {
  return useMutation({
    mutationFn: (req: SolverRequest) => socraticService.solve(req),
  })
}

export function useSolverCategories() {
  return useQuery({
    queryKey: ['solver', 'categories'],
    queryFn: socraticService.getCategories,
  })
}

export function useCompetencyQuestions(category: string | null) {
  return useQuery({
    queryKey: ['solver', 'competency', category],
    queryFn: () => socraticService.getCompetencyQuestions(category!),
    enabled: !!category,
  })
}
