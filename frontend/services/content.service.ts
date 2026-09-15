import { api } from '@/lib/api'
import type { KnowledgeNode, KnowledgeLink } from '@/types'

export interface SubjectSchema {
  id: string
  name: string
  board: string
  classLevel: number
  iconName: string
  color: string
  topicsCount: number
  masteryPercentage: number
}

export interface SubjectListResponse {
  subjects: SubjectSchema[]
}

export interface KnowledgeNodeSchema {
  id: string
  nodeId: string
  label: string
  description: string
  subject: string
  classLevel: number
  chapter: string
  nodeType: string
  simplifiedContent?: string
  prerequisites: string[]
  forwardNodes: string[]
  masteryProbability: number
  difficulty: string
  estimatedTime: number
}

export interface KnowledgeGraphResponse {
  nodes: KnowledgeNodeSchema[]
  links: { source: string; target: string; type: string }[]
}

export interface RecommendedLessonSchema {
  nodeId: string
  subject: string
  topic: string
  chapter: string
  progress: number
  difficulty: string
  estimatedTime: number
  icon: string
}

export interface ContentBundleSchema {
  id: string
  nodeId: string
  contentType: string
  contentData: Record<string, unknown>
  isOfflineAvailable: boolean
  fileSizeMb?: number
}

export const contentService = {
  getSubjects: (board?: string, classLevel?: number) =>
    api.get<SubjectListResponse>(
      `/api/content/subjects${board ? `?board=${board}` : ''}${classLevel ? `${board ? '&' : '?'}classLevel=${classLevel}` : ''}`
    ),

  getKnowledgeGraph: (board?: string, classLevel?: number) =>
    api.get<KnowledgeGraphResponse>(
      `/api/content/graph${board ? `?board=${board}` : ''}${classLevel ? `${board ? '&' : '?'}classLevel=${classLevel}` : ''}`
    ),

  getNode: (nodeId: string) =>
    api.get<KnowledgeNodeSchema>(`/api/content/nodes/${nodeId}`),

  getNodeContent: (nodeId: string) =>
    api.get<ContentBundleSchema[]>(`/api/content/nodes/${nodeId}/content`),

  getRecommendedLessons: () =>
    api.get<RecommendedLessonSchema[]>('/api/content/recommended'),

  searchNodes: (query: string) =>
    api.get<KnowledgeNodeSchema[]>(`/api/content/search?q=${encodeURIComponent(query)}`),

  getNodesBySubject: (subject: string, classLevel?: number) =>
    api.get<KnowledgeNodeSchema[]>(
      `/api/content/subject/${encodeURIComponent(subject)}${classLevel ? `?classLevel=${classLevel}` : ''}`
    ),
}
