/**
 * remediation.ts — closed-world data layer for the misconception
 * remediation loop.
 *
 * EVERY string rendered from this module is authored corpus content:
 *   - GET /api/content/nodes/{id}/enrichment  → common_misconception,
 *     diagnostic_questions[].misconception_if_wrong, prereq_ids
 *   - GET /api/nodes/node?node_id={id}        → the same enhanced-nodes
 *     corpus record with servable diagnostics (q / a / misconception)
 *   - GET /api/nodes/{id}/sims                → sims authored for a node
 *
 * Nothing here generates, paraphrases or synthesizes content. Fields the
 * corpus lacks for a node are returned as null/[] and the UI must omit
 * the corresponding section (honest degradation — never invent a recipe).
 */

import { api } from '@/lib/api'
import { friendlyNodeTitle, subjectName } from '@/lib/nodeTitle'

/**
 * nodeRefLabel — friendly label for ANY corpus node id, used everywhere a
 * node reference is rendered (links, chips, inline mentions in authored
 * prose). lib/nodeTitle's friendlyNodeTitle is the sanctioned renderer but
 * its pattern misses the CBSE id shape (c10_bio_cbse_01_002), so this
 * parses that shape first and defers everything else to the sanctioned
 * helper. Deterministic id parsing — never a generated string.
 */
export function nodeRefLabel(nodeId: string): string {
  const cbse = nodeId.match(/^c(\d{1,2})_([a-z]+?)_cbse_(\d{1,2})_(\d{1,3})$/i)
  if (cbse) {
    const [, cls, subj, ch, nn] = cbse
    return [
      `Class ${Number(cls)}`,
      subjectName(subj),
      `Chapter ${Number(ch)}`,
      `Topic ${Number(nn)}`,
    ].join(' · ')
  }
  return friendlyNodeTitle(nodeId)
}

/** Enrichment contract (GET /api/content/nodes/{id}/enrichment). */
export interface EnrichmentData {
  node_id: string
  title: string
  subject: string
  class_level: number
  chapter: string | null
  definition: string | null
  text_walkthrough: string | null
  eli5: string | null
  common_misconception: string | null
  diagnostic_questions: EnrichmentDiagnostic[] | null
  on_failure: OnFailureStep[] | null
  examples: string | null
  cognitive_level: string | null
  mastery_criteria: string | null
  scope_boundary: string | null
  prereq_ids: string[]
  depth_prereq_ids: string[]
  forward_node_ids: string[]
  difficulty: string | null
  board: string | null
}

/** One authored diagnostic as served by the enrichment endpoint. */
export interface EnrichmentDiagnostic {
  question: string | null
  answer: string | null
  options: string[]
  misconception_if_wrong: string | null
}

/** Authored remediation step (enrichment on_failure — when present). */
export interface OnFailureStep {
  question_number?: number
  remediation_text?: string
  review_node_ids?: string[]
}

/** One servable diagnostic question — fully authored. */
export interface DiagnosticQuestion {
  question: string
  answer: string
  /** MCQ choices when the corpus authored them (≥2 → render as options). */
  options: string[]
  /** Authored misconception analysis for a wrong answer (may be absent). */
  misconception: string | null
}

/** Sims served for a node (GET /api/nodes/{id}/sims). */
export interface SimRef {
  id: string
  title: string
  classLevel: number
  generated: boolean
}

/** Everything the remediation loop needs for one node. */
export interface NodeRemediation {
  /** Authored common misconception for the node (null → omit section). */
  commonMisconception: string | null
  /** Authored prerequisite node ids ([] → omit the Fix-it block). */
  prereqIds: string[]
  /** Servable authored diagnostics ([] → quiz falls back to practice). */
  diagnostics: DiagnosticQuestion[]
  /** Authored on_failure remediation steps (null → omit). */
  onFailure: OnFailureStep[] | null
}

/** GET /api/nodes/{id}/sims — sims authored for this node. */
export async function fetchNodeSims(nodeId: string): Promise<SimRef[]> {
  try {
    const sims = await api.get<SimRef[]>(
      `/api/nodes/${encodeURIComponent(nodeId)}/sims`,
    )
    return Array.isArray(sims) ? sims : []
  } catch {
    return [] // sims are additive — absence degrades to no chips
  }
}

/** GET /api/content/nodes/{id}/enrichment — null when the node is absent. */
export async function fetchEnrichment(nodeId: string): Promise<EnrichmentData | null> {
  try {
    return await api.get<EnrichmentData>(
      `/api/content/nodes/${encodeURIComponent(nodeId)}/enrichment`,
    )
  } catch {
    return null
  }
}

/**
 * Load the closed-world remediation recipe for one node.
 *
 * Quiz-able diagnostics are sourced from the node's authored corpus in
 * two places, merged without duplication:
 *   1. enrichment.diagnostic_questions entries that carry BOTH a question
 *      and an answer (the fully-served shape, incl. MCQ options);
 *   2. the raw enhanced-nodes record (GET /api/nodes/node), whose
 *      diagnostics expose the authored q / a / misconception trio.
 * Only entries with a real question AND answer are servable — anything
 * less is dropped, never filled in.
 */
export async function fetchNodeRemediation(nodeId: string): Promise<NodeRemediation> {
  const [enrichment, rawNode] = await Promise.all([
    fetchEnrichment(nodeId),
    fetchRawNode(nodeId),
  ])

  const diagnostics: DiagnosticQuestion[] = []
  const seenQuestions = new Set<string>()

  const push = (q: string, a: string, options: string[], misconception: string | null) => {
    const question = q.trim()
    const answer = a.trim()
    if (!question || !answer) return
    const key = question.toLowerCase()
    if (seenQuestions.has(key)) return
    seenQuestions.add(key)
    diagnostics.push({
      question,
      answer,
      options: (options || []).map((o) => String(o).trim()).filter(Boolean),
      misconception: misconception?.trim() || null,
    })
  }

  for (const dq of enrichment?.diagnostic_questions || []) {
    if (!dq || typeof dq !== 'object') continue
    push(
      String(dq.question || ''),
      String(dq.answer || ''),
      Array.isArray(dq.options) ? dq.options : [],
      dq.misconception_if_wrong,
    )
  }
  // The raw record is the same authored corpus; it fills in diagnostics
  // the enrichment route serves with a null question/answer today.
  for (const d of rawNode?.diagnostics || []) {
    if (!d || typeof d !== 'object') continue
    push(String(d.q || ''), String(d.a || ''), [], d.misconception ?? null)
  }

  return {
    commonMisconception: enrichment?.common_misconception?.trim() || null,
    prereqIds: (enrichment?.prereq_ids || []).filter(Boolean),
    diagnostics,
    onFailure: enrichment?.on_failure || null,
  }
}

/** Raw enhanced-nodes record (diagnostics use the corpus q/a keys). */
interface RawEnhancedNode {
  node_id: string
  diagnostics?: Array<{
    q?: string | null
    a?: string | null
    misconception?: string | null
  }> | null
}

async function fetchRawNode(nodeId: string): Promise<RawEnhancedNode | null> {
  try {
    return await api.get<RawEnhancedNode>(
      `/api/nodes/node?node_id=${encodeURIComponent(nodeId)}`,
    )
  } catch {
    return null
  }
}
