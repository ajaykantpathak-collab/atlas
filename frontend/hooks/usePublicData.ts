'use client'

import { useQuery } from '@tanstack/react-query'

export interface PublicStats {
  total_nodes: number
  total_edges: number
  subjects: number
  classes: number
  boards: number
  board_names: string[]
  enrichment_nodes: number
  enrichment_by_subject: Record<string, number>
  graph_nodes: number
  graph_edges: number
}

export interface PublicSubject {
  name: string
  boards: string[]
  classes: number[]
  icon_name: string
  color: string
}

export interface PublicFlashcard {
  node_id: string
  title: string
  subject: string
  class_level: number
  definition: string
  eli5: string
  text_walkthrough: string
  common_misconception: string
  diagnostic_question: string
  on_failure: string
  difficulty: string
  cognitive_level: string
}

export interface PublicTopic {
  node_id: string
  title: string
  subject: string
  class_level: number
  difficulty: string
  cognitive_level: string
}

export interface SearchResult {
  node_id: string
  topic: string
  class_level: number
  subject: string
  content_snippet: string
  board: string
  is_root: boolean
}

export function usePublicStats() {
  return useQuery<PublicStats>({
    queryKey: ['public-stats'],
    queryFn: async () => {
      const res = await fetch('/api/public/stats')
      if (!res.ok) throw new Error('Failed to fetch stats')
      return res.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  })
}

export function usePublicSubjects() {
  return useQuery<{ subjects: PublicSubject[]; total: number }>({
    queryKey: ['public-subjects'],
    queryFn: async () => {
      const res = await fetch('/api/public/subjects')
      if (!res.ok) throw new Error('Failed to fetch subjects')
      return res.json()
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  })
}

export function usePublicFlashcard(subject?: string, classLevel?: number) {
  return useQuery<PublicFlashcard>({
    queryKey: ['public-flashcard', subject, classLevel],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (subject) params.set('subject', subject)
      if (classLevel) params.set('class_level', String(classLevel))
      const res = await fetch(`/api/public/flashcard?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch flashcard')
      return res.json()
    },
    staleTime: 0, // Always refetch to get a new random card
    retry: 1,
  })
}

export function usePublicTopics(subject?: string, classLevel?: number) {
  return useQuery<{ topics: PublicTopic[]; total: number }>({
    queryKey: ['public-topics', subject, classLevel],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (subject) params.set('subject', subject)
      if (classLevel) params.set('class_level', String(classLevel))
      const res = await fetch(`/api/public/topics?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch topics')
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}

export function usePublicSearch(query: string, classLevel?: string, subject?: string) {
  return useQuery<{ nodes: SearchResult[]; count: number; query: string }>({
    queryKey: ['public-search', query, classLevel, subject],
    queryFn: async () => {
      const params = new URLSearchParams({ q: query })
      if (classLevel) params.set('class_level', classLevel)
      if (subject) params.set('subject', subject)
      const res = await fetch(`/api/public/search?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to search')
      return res.json()
    },
    enabled: query.length > 0,
    staleTime: 60 * 1000,
    retry: 1,
  })
}
