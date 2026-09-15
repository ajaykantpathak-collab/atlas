/* ═══════════════════════════════════════════════════════════════════════════
   topicGraph.ts — Builds a topic graph for the living world.
   Loads enrichment nodes from the local API and arranges them by subject
   with implicit prerequisites (earlier nodes in the same subject are prereqs).
   ═══════════════════════════════════════════════════════════════════════════ */

import type { EnrichmentNodeSummary } from './markerParser'

// ─── Types ────────────────────────────────────────────────────

export interface WorldTopic {
  nodeId: string
  title: string
  subject: string
  classLevel: number
  cognitiveLevel: string | null
  hasGame: boolean
  gameId: string | null
  prerequisites: string[]
  // Position on the world map (computed)
  cx: number      // 0-1 normalized
  cy: number      // 0-1 normalized
  color: string
  emoji: string
}

export interface SubjectZone {
  subject: string
  name: string
  emoji: string
  color: string
  topics: WorldTopic[]
  // Zone center on the map
  cx: number
  cy: number
}

// ─── Subject configuration ────────────────────────────────────

export const SUBJECT_CONFIG: Record<string, { name: string; emoji: string; color: string }> = {
  // Science — original 7
  maths:      { name: 'Maths',       emoji: '🔢', color: '#9D4EDD' },
  math:       { name: 'Maths',       emoji: '🔢', color: '#9D4EDD' },
  physics:    { name: 'Physics',     emoji: '⚡', color: '#00BFFF' },
  phy:        { name: 'Physics',     emoji: '⚡', color: '#00BFFF' },
  chem:       { name: 'Chemistry',   emoji: '⚗️', color: '#39FF14' },
  bio:        { name: 'Biology',     emoji: '🧬', color: '#FF6B9D' },
  evs:        { name: 'EVS',         emoji: '🌱', color: '#4ADE80' },
  cs:         { name: 'Computer',    emoji: '💻', color: '#60A5FA' },
  geo:        { name: 'Geography',   emoji: '🌍', color: '#FBBF24' },
  // Science electives
  biotech:    { name: 'Biotechnology', emoji: '🧪', color: '#10B981' },
  appmath:    { name: 'Applied Maths', emoji: '📐', color: '#7C3AED' },
  // Commerce
  acc:        { name: 'Accountancy',   emoji: '💰', color: '#F59E0B' },
  bs:         { name: 'Business Studies', emoji: '🏢', color: '#EF4444' },
  econ:       { name: 'Economics',     emoji: '📊', color: '#3B82F6' },
  econapp:    { name: 'Econ Applications', emoji: '📈', color: '#2563EB' },
  comm:       { name: 'Commerce',      emoji: '🏪', color: '#DC2626' },
  commapp:    { name: 'Commerce App',  emoji: '🛒', color: '#B91C1C' },
  commstud:   { name: 'Commercial Studies', emoji: '📋', color: '#9333EA' },
  // Humanities
  hist:       { name: 'History',       emoji: '📜', color: '#D97706' },
  histciv:    { name: 'History & Civics', emoji: '🏛️', color: '#B45309' },
  pol:        { name: 'Political Science', emoji: '🗳️', color: '#6366F1' },
  psy:        { name: 'Psychology',    emoji: '🧠', color: '#EC4899' },
  soc:        { name: 'Sociology',     emoji: '👥', color: '#8B5CF6' },
  home:       { name: 'Home Science',  emoji: '🏠', color: '#059669' },
  legal:      { name: 'Legal Studies', emoji: '⚖️', color: '#1E40AF' },
  massmedia:  { name: 'Mass Media',    emoji: '📡', color: '#0891B2' },
}

// ─── Layout computation ───────────────────────────────────────

/**
 * Arrange subjects in a circular layout around the world.
 * Each subject gets a zone, and topics within a subject are arranged
 * in a spiral/line within that zone.
 */
function computeSubjectPositions(subjectCount: number): Array<{ cx: number; cy: number }> {
  const positions: Array<{ cx: number; cy: number }> = []
  const centerX = 0.5
  const centerY = 0.5
  const radius = 0.32  // Distance from center to subject zones

  for (let i = 0; i < subjectCount; i++) {
    const angle = (i / subjectCount) * Math.PI * 2 - Math.PI / 2  // Start from top
    const cx = centerX + Math.cos(angle) * radius
    const cy = centerY + Math.sin(angle) * radius
    positions.push({ cx, cy })
  }
  return positions
}

/**
 * Arrange topics within a subject zone in a small cluster.
 * First topic at the zone center, subsequent topics spiral outward.
 */
function computeTopicPositions(topicCount: number, zoneCx: number, zoneCy: number): Array<{ cx: number; cy: number }> {
  const positions: Array<{ cx: number; cy: number }> = []
  const clusterRadius = 0.08  // How far topics spread from zone center

  for (let i = 0; i < topicCount; i++) {
    if (i === 0) {
      positions.push({ cx: zoneCx, cy: zoneCy })
    } else {
      // Spiral outward
      const angle = (i / Math.max(topicCount - 1, 1)) * Math.PI * 2
      const r = clusterRadius * (0.5 + (i / topicCount) * 0.5)
      positions.push({
        cx: zoneCx + Math.cos(angle) * r,
        cy: zoneCy + Math.sin(angle) * r,
      })
    }
  }
  return positions
}

// ─── Graph builder ────────────────────────────────────────────

/**
 * Build the world topic graph from enrichment node summaries.
 * @param nodes Enrichment node summaries from the API
 * @param classLevel Current class level (1-5)
 * @param gameNodeIds Set of node IDs that have games (from gameRegistry)
 */
export function buildTopicGraph(
  nodes: EnrichmentNodeSummary[],
  classLevel: number,
  gameNodeIds: Set<string>,
  gameNodeMap: Map<string, string>,  // nodeId -> gameId
): SubjectZone[] {
  // Group nodes by subject
  const bySubject: Record<string, EnrichmentNodeSummary[]> = {}
  for (const node of nodes) {
    if (!bySubject[node.subject]) bySubject[node.subject] = []
    bySubject[node.subject].push(node)
  }

  // Sort subjects in a consistent order
  const subjectOrder = ['maths', 'evs', 'physics', 'chem', 'bio', 'geo', 'cs']
  const subjects = Object.keys(bySubject).sort((a, b) => {
    const ia = subjectOrder.indexOf(a)
    const ib = subjectOrder.indexOf(b)
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
  })

  const subjectPositions = computeSubjectPositions(subjects.length)
  const zones: SubjectZone[] = []

  subjects.forEach((subject, sIdx) => {
    const subjectNodes = bySubject[subject]
    const config = SUBJECT_CONFIG[subject] || { name: subject, emoji: '📚', color: '#888888' }
    const zonePos = subjectPositions[sIdx]

    // Sort nodes by node_id (which gives natural order: 001, 002, ...)
    subjectNodes.sort((a, b) => a.node_id.localeCompare(b.node_id))

    // Build topics with prerequisites (each node requires the previous one)
    const topics: WorldTopic[] = []
    const topicPositions = computeTopicPositions(subjectNodes.length, zonePos.cx, zonePos.cy)

    subjectNodes.forEach((node, nIdx) => {
      const hasGame = gameNodeIds.has(node.node_id)
      const gameId = gameNodeMap.get(node.node_id) || null

      // Prerequisite: the previous node in the same subject (if any)
      const prerequisites = nIdx > 0 ? [subjectNodes[nIdx - 1].node_id] : []

      topics.push({
        nodeId: node.node_id,
        title: node.title,
        subject,
        classLevel,
        cognitiveLevel: node.cognitive_level,
        hasGame,
        gameId,
        prerequisites,
        cx: topicPositions[nIdx].cx,
        cy: topicPositions[nIdx].cy,
        color: config.color,
        emoji: config.emoji,
      })
    })

    zones.push({
      subject,
      name: config.name,
      emoji: config.emoji,
      color: config.color,
      topics,
      cx: zonePos.cx,
      cy: zonePos.cy,
    })
  })

  return zones
}

/**
 * Flatten zones into a list of topics.
 */
export function flattenTopics(zones: SubjectZone[]): WorldTopic[] {
  return zones.flatMap(z => z.topics)
}
