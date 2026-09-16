/**
 * mechanics.ts — deterministic, conservative writing-mechanics check.
 *
 * Client-side mirror of AnswerEvaluatorV3._mechanics_check (backend/
 * services/answer_evaluator_v3.py) for flows that grade without the
 * evaluator (e.g. QuickQuiz's self-check diagnostics, where no backend
 * grading call exists). KEEP THE TWO IN SYNC — same rules, same
 * thresholds, same conservative posture.
 *
 * Zero-wrong rules:
 *   - Only unambiguous mechanical signals are reported (capitalization,
 *     doubled words, obvious missing punctuation/space).
 *   - Nothing is inferred beyond them: no notes -> score stays null and
 *     the UI omits the grammar section entirely. Absence of detected
 *     errors is NOT proof of good grammar.
 *   - Answers too short to judge (< 6 words) are never scored.
 */

/** Words that may legitimately repeat ("that that", "had had"). */
const DOUBLED_OK = new Set(['that', 'had', 'very'])

/** Abbreviations after which a lowercase "sentence start" is normal. */
const SENT_ABBREV = new Set([
  'e.g', 'i.e', 'etc', 'vs', 'approx', 'fig', 'eq', 'no', 'dr', 'mr',
  'mrs', 'ms', 'st', 'vol', 'ch', 'pg', 'p', 'pp',
])

export interface MechanicsResult {
  /** 0-1 when notes exist; null when there is no signal (omit the section). */
  score: number | null
  /** Specific, kind, actionable notes (at most one per category). */
  notes: string[]
}

export function mechanicsCheck(text: string): MechanicsResult {
  const words = (text || '').trim().split(/\s+/).filter(Boolean)
  if (!text || words.length < 6) return { score: null, notes: [] }

  const notes: string[] = []
  const seen = new Set<string>()
  const add = (category: string, note: string) => {
    if (seen.has(category)) return
    seen.add(category)
    notes.push(note)
  }

  // 1. Doubled words ("the the"), minus the legitimate-doubles allowlist.
  const doubledRe = /\b([A-Za-z]{2,})\s+\1\b/g
  let doubledMatch: RegExpExecArray | null
  while ((doubledMatch = doubledRe.exec(text)) !== null) {
    if (!DOUBLED_OK.has(doubledMatch[1].toLowerCase())) {
      add('doubled_word', `Doubled word: “${doubledMatch[0]}” — remove the repeat.`)
    }
  }

  // 2. Standalone lowercase "i" (pronoun), never "i = ..." (math symbol).
  if (/(?<![A-Za-z0-9_'.])i(?![A-Za-z0-9_'=])/.test(text)) {
    add('capital_i', 'The pronoun “I” should be a capital letter.')
  }

  // 3. Sentence start not capitalised (skip abbreviations and initials).
  const sentStartRe = /(?<=[.!?])(\s+)([a-z])/g
  let sentMatch: RegExpExecArray | null
  while ((sentMatch = sentStartRe.exec(text)) !== null) {
    const before = text.slice(0, sentMatch.index).trimEnd()
    const lastWord = before.split(/[\s(“"]/).pop() ?? ''
    const stem = lastWord.toLowerCase().replace(/\.+$/, '')
    if (!stem || stem.length === 1 || SENT_ABBREV.has(stem)) continue
    add(
      'sentence_cap',
      `A sentence starts with “${sentMatch[2]}…” — begin it with a capital letter.`,
    )
    break
  }

  // 4. Missing space after comma ("word,word").
  if (/\w,\w/.test(text)) {
    add(
      'comma_space',
      'Add a space after commas (e.g. “first,second” → “first, second”).',
    )
  }

  // 5. Missing space between sentences ("end.Next").
  if (/(?<=[a-z])\.(?=[A-Z][a-z])/.test(text)) {
    add('stop_space', 'Add a space after full stops between sentences.')
  }

  // 6. Doubled commas (doubled dots are risky — ellipsis — so skipped).
  if (/,\s*,/.test(text)) {
    add('double_comma', 'Remove the repeated comma (",,").')
  }

  // 7. Punctuated prose that forgets its final full stop.
  const stripped = text.trimEnd()
  const hasSentencePunct = /[.!?]/.test(text)
  if (hasSentencePunct && stripped && !/[.!?\"'):\u201d]$/.test(stripped)) {
    add('final_stop', 'End the final sentence with a full stop.')
  }

  if (notes.length === 0) return { score: null, notes: [] }
  // Small, transparent deduction per note — same clamp as the backend.
  return { score: Math.max(0.3, 1.0 - 0.2 * notes.length), notes }
}
