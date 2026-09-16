/**
 * derive.ts — runtime derivation of review criteria from authored model
 * answers. NO content is authored here: every criterion description is a
 * verbatim fragment (sentence / point) of the model answer it was derived
 * from, and met/missed comes from a transparent keyword-overlap check —
 * the same philosophy as the backend's keyword fallback grader
 * (LLMGrader._keyword_fallback) and RubricGenerator's sentence splitter.
 *
 * Honest posture: when the model answer yields only one usable fragment,
 * no criteria are derived (a one-line answer makes no useful checklist)
 * and the UI omits the section.
 */

import { mechanicsCheck } from './mechanics'

/** A review criterion derived from a model answer at runtime. */
export interface DerivedCriterion {
  id: string
  /** Verbatim fragment of the model answer — never paraphrased. */
  description: string
  /** true = covered, false = missed. null only when there is no answer to check. */
  met: boolean | null
}

/** Everything the review UI needs for one self-graded subjective answer. */
export interface SubjectiveReview {
  criteria: DerivedCriterion[]
  grammarScore: number | null
  grammarNotes: string[]
}

/** Small stopword set — mirrors the backend fallback's filler-word filter. */
const STOPWORDS = new Set([
  'that', 'this', 'with', 'from', 'have', 'they', 'will', 'been', 'their',
  'which', 'would', 'there', 'could', 'should', 'the', 'and', 'for', 'are',
  'but', 'not', 'you', 'all', 'any', 'can', 'was', 'into', 'than', 'then',
  'only', 'also', 'very', 'just', 'each', 'such', 'because', 'about',
  'when', 'what', 'where', 'while', 'after', 'before', 'between', 'both',
  'does', 'did', 'its', 'his', 'her', 'him', 'has', 'had', 'how', 'why',
])

function contentWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w))
}

/**
 * Split a model answer into candidate criteria: numbered/bulleted points
 * when the answer is structured, otherwise sentences. Single-fragment
 * answers derive no criteria ([] — the UI omits the checklist).
 */
export function deriveCriteria(
  modelAnswer: string,
  studentAnswer: string,
): DerivedCriterion[] {
  const answer = (modelAnswer || '').trim()
  if (!answer) return []

  // Numbered ("1. ", "(1) ") or bulleted ("• ", "- ") lines first.
  let fragments: string[] = []
  const lines = answer
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
  const isListLike = lines.filter((l) => /^(?:\d+[.)]\s*|\(\d+\)\s*|[•\-*]\s*)/.test(l)).length
  if (lines.length > 1 && isListLike >= Math.ceil(lines.length / 2)) {
    fragments = lines.map((l) => l.replace(/^(?:\d+[.)]\s*|\(\d+\)\s*|[•\-*]\s*)/, '').trim())
  } else {
    fragments = answer
      .split(/(?<=[.!?])\s+|\n+/)
      .map((s) => s.trim())
      .filter(Boolean)
  }

  // Need at least two meaningful fragments for a checklist to say anything.
  const usable = fragments.filter((f) => contentWords(f).length >= 1)
  if (usable.length < 2) return []

  const studentWords = new Set(contentWords(studentAnswer))

  return usable.slice(0, 8).map((description, i) => {
    if (!studentAnswer || !studentAnswer.trim()) {
      return { id: `c${i + 1}`, description, met: false }
    }
    const words = contentWords(description)
    const hits = words.filter((w) => studentWords.has(w)).length
    // Same 30% content-word overlap the backend fallback uses.
    const met = words.length === 0 ? null : hits / words.length >= 0.3
    return { id: `c${i + 1}`, description, met }
  })
}

/**
 * One-call review bundle for self-graded subjective answers (QuickQuiz):
 * criteria derived from the authored answer + mechanics notes from the
 * student's own text. Nothing here can fabricate content — both parts
 * are runtime derivations of existing text.
 */
export function buildSubjectiveReview(
  modelAnswer: string,
  studentAnswer: string,
): SubjectiveReview {
  const mechanics = mechanicsCheck(studentAnswer || '')
  return {
    criteria: deriveCriteria(modelAnswer, studentAnswer),
    grammarScore: mechanics.score,
    grammarNotes: mechanics.notes,
  }
}
