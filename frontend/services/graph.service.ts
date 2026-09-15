import { api } from '@/lib/api'

// ------------------------------------------------------------------ //
// Types
// ------------------------------------------------------------------ //
export interface GraphNode {
  node_id: string
  topic: string
  subject: string
  class_level: number
  chapter_name: string
  is_root: boolean
  difficulty?: string
  content_snippet?: string
  concept_tags?: string
  scope_constraints?: string
  board?: string
}

export interface GraphEdge {
  source: string
  target: string
  reason?: string
}

export interface GraphVisualization {
  nodes: GraphNode[]
  links: GraphEdge[]
}

export interface PrerequisiteNode {
  node_id: string
  topic: string
  subject: string
  class_level: number
  chapter_name: string
  is_root: boolean
  depth: number
  reasons: string[]
}

export interface GapAnalysisResult {
  target_node_id: string
  gaps: PrerequisiteNode[]
  gap_count: number
  root_gaps: PrerequisiteNode[]
  root_gap_count: number
}

export interface LearningPathResult {
  target_node_id: string
  path: PrerequisiteNode[]
  steps: number
}

export interface GraphStats {
  total_nodes: number
  total_edges: number
  boards: number
  subjects: number
  class_levels: number
}

// ------------------------------------------------------------------ //
// API calls
// ------------------------------------------------------------------ //
export class GraphApi {
  static async getStats(): Promise<GraphStats> {
    return api.get<GraphStats>('/api/graph/stats')
  }

  static async getNode(nodeId: string): Promise<GraphNode> {
    return api.get<GraphNode>(`/api/graph/node/${nodeId}`)
  }

  static async getNodesByClass(
    classLevel: number,
    board: string = 'CBSE',
    subject?: string
  ): Promise<{ nodes: GraphNode[]; count: number }> {
    let endpoint = `/api/graph/class/${classLevel}?board=${encodeURIComponent(board)}`
    if (subject) endpoint += `&subject=${encodeURIComponent(subject)}`
    return api.get(endpoint)
  }

  static async searchNodes(
    query: string,
    limit: number = 20
  ): Promise<{ nodes: GraphNode[]; count: number; query: string }> {
    return api.get(`/api/graph/search?q=${encodeURIComponent(query)}&limit=${limit}`)
  }

  static async getPrerequisites(
    nodeId: string,
    maxDepth: number = 10
  ): Promise<{ node_id: string; prerequisites: PrerequisiteNode[]; count: number }> {
    return api.get(`/api/graph/prerequisites/${nodeId}?max_depth=${maxDepth}`)
  }

  static async getUnlocks(
    nodeId: string,
    maxDepth: number = 10
  ): Promise<{ node_id: string; unlocks: PrerequisiteNode[]; count: number }> {
    return api.get(`/api/graph/unlocks/${nodeId}?max_depth=${maxDepth}`)
  }

  static async getRelated(
    nodeId: string
  ): Promise<{ node_id: string; related: PrerequisiteNode[]; count: number }> {
    return api.get(`/api/graph/related/${nodeId}`)
  }

  static async findGaps(
    targetNodeId: string,
    masteredNodeIds: string[] = [],
    maxDepth: number = 10
  ): Promise<GapAnalysisResult> {
    return api.post<GapAnalysisResult>('/api/graph/gaps', {
      target_node_id: targetNodeId,
      mastered_node_ids: masteredNodeIds,
      max_depth: maxDepth,
    })
  }

  static async getLearningPath(
    targetNodeId: string,
    masteredNodeIds: string[] = [],
    maxDepth: number = 10
  ): Promise<LearningPathResult> {
    return api.post<LearningPathResult>('/api/graph/path', {
      target_node_id: targetNodeId,
      mastered_node_ids: masteredNodeIds,
      max_depth: maxDepth,
    })
  }

  static async getGraphForVisualization(
    classLevel: number,
    board: string = 'CBSE',
    subject?: string
  ): Promise<GraphVisualization> {
    let endpoint = `/api/graph/visualize?class_level=${classLevel}&board=${encodeURIComponent(board)}`
    if (subject) endpoint += `&subject=${encodeURIComponent(subject)}`
    return api.get(endpoint)
  }
}
