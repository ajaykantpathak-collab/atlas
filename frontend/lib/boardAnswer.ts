/**
 * boardAnswer — shared, deterministic helpers for presenting solutions in
 * CBSE board-answer shape.
 *
 * HONESTY CONTRACT (zero-wrong):
 *  - Every "board answer" part comes from AUTHORED content (definition /
 *    walkthrough / worked-example sections). This module only splits and
 *    labels — it never writes content and never invents a mark value.
 *  - Numeric marks ("— 1 mark") are shown ONLY where the platform has an
 *    authored marks figure (practice board_questions marking data). Story
 *    Mode's enrichment payload carries no marks, so Story Mode labels parts
 *    by ROLE (Definition / Step N / Reasoning / Final answer) and says so.
 *  - The keyword diff is a pure set difference on authored text — nothing
 *    is generated.
 *  - No Hindi anywhere in this module's output; no raw node ids (scrubbed
 *    through friendlyNodeTitle, the only sanctioned renderer).
 */

import { friendlyNodeTitle } from '@/lib/nodeTitle';

// ─── board-answer parts ──────────────────────────────────────────────────────

/** One earning part of a board-style answer. */
export interface BoardPart {
  role: 'definition' | 'working' | 'reasoning' | 'answer';
  /** 1-based number for `working` parts (authored step order). */
  stepNo?: number;
  text: string;
}

export interface BoardAnswerInput {
  definition?: string | null;
  steps?: string[];
  reasoning?: string | null;
  answer?: string | null;
}

/**
 * Split authored content into labelled board-answer parts. Returns an empty
 * array when the authored content does not support a split (fewer than 3
 * earning parts) — the caller then shows the steps plainly, which is the
 * honest fallback.
 */
export function buildBoardAnswerParts(input: BoardAnswerInput): BoardPart[] {
  const parts: BoardPart[] = [];
  const definition = (input.definition || '').trim();
  const steps = (input.steps || []).map(s => s.trim()).filter(Boolean);
  const reasoning = (input.reasoning || '').trim();
  const answer = (input.answer || '').trim();

  if (definition.length >= 40) parts.push({ role: 'definition', text: definition });
  steps.forEach((text, i) => parts.push({ role: 'working', stepNo: i + 1, text }));
  if (reasoning) parts.push({ role: 'reasoning', text: reasoning });
  if (answer) parts.push({ role: 'answer', text: answer });

  // A board answer demonstrates a SPLIT — definition + working + result.
  // With fewer than 3 authored parts there is nothing honest to label.
  return parts.length >= 3 ? parts : [];
}

// ─── keyword diff (student answer vs authored model answer) ─────────────────

const KEYWORD_STOP = new Set([
  'the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'any', 'can', 'had',
  'her', 'was', 'one', 'our', 'out', 'his', 'has', 'have', 'this', 'that',
  'with', 'from', 'they', 'will', 'would', 'there', 'their', 'what', 'about',
  'which', 'when', 'make', 'like', 'time', 'just', 'know', 'take', 'into',
  'your', 'than', 'then', 'them', 'these', 'some', 'very', 'also', 'such',
  'because', 'should', 'each', 'other', 'does', 'done', 'being', 'over',
  'more', 'most', 'must', 'both', 'same', 'well', 'only', 'much', 'many',
  'answer', 'question', 'student', 'students', 'hence', 'thus', 'therefore',
  'example', 'shown', 'shows', 'given', 'called', 'where', 'while', 'after',
  'before', 'between', 'through', 'write', 'written', 'here', 'hers',
]);

/** Light singular/plural + 3rd-person folding for MATCHING only — a token
 *  matches another when their variant sets intersect ('prepares' ~ 'prepare',
 *  'processes' ~ 'process', 'houses' ~ 'house'); the chips keep the model's
 *  own surface form. Variant sets are supersets, so no dictionary is needed
 *  and both comparison directions fold the same way. */
function foldVariants(w: string): string[] {
  if (w.length >= 5 && w.endsWith('ies')) return [w, w.slice(0, -3) + 'y'];
  if (w.length >= 4 && w.endsWith('es')) return [w, w.slice(0, -1), w.slice(0, -2)];
  if (w.length >= 4 && w.endsWith('s') && !w.endsWith('ss')) return [w, w.slice(0, -1)];
  return [w];
}

function tokenize(text: string): string[] {
  const matches = text.toLowerCase().match(/[a-z][a-z'-]{2,}|\d+(?:\.\d+)?/g);
  return (matches || []).filter(t => !KEYWORD_STOP.has(t));
}

export interface KeywordDiff {
  /** Content words present in the model answer, absent from the student's. */
  missing: string[];
  /** Content words the student's answer already had. */
  shared: string[];
}

/**
 * Pure set difference between the authored model answer and the student's
 * free-text answer. Caps keep the chips readable; ordering follows the
 * model answer's own word order (first occurrence).
 */
export function diffAgainstModel(
  modelAnswer: string,
  studentAnswer: string,
  maxMissing = 6,
  maxShared = 4,
): KeywordDiff {
  const student = new Set<string>();
  for (const t of tokenize(studentAnswer)) for (const v of foldVariants(t)) student.add(v);
  const seen = new Set<string>();
  const missing: string[] = [];
  const shared: string[] = [];
  for (const raw of tokenize(modelAnswer)) {
    const keys = foldVariants(raw);
    if (keys.some(k => seen.has(k))) continue;
    keys.forEach(k => seen.add(k));
    if (keys.some(k => student.has(k))) {
      if (shared.length < maxShared) shared.push(raw);
    } else if (missing.length < maxMissing) {
      missing.push(raw);
    }
    if (missing.length >= maxMissing && shared.length >= maxShared) break;
  }
  return { missing, shared };
}

// ─── corpus hygiene (same contract as Story Mode's cleaner) ─────────────────

const NODE_ID_RE = /\bc\d{1,2}(?:_[a-z0-9]+){2,}\b/g;

/** Authored prose sometimes embeds internal node ids — they must never
 *  reach the screen. A parenthesised bare id is dropped; a bare one becomes
 *  its sanctioned friendly label. */
export function scrubNodeIds(s: string | null | undefined): string {
  if (!s) return '';
  return s
    .replace(new RegExp(`\\s*\\((${NODE_ID_RE.source})\\)`, 'g'), '')
    .replace(new RegExp(NODE_ID_RE.source, 'g'), m => friendlyNodeTitle(m));
}

/**
 * Model-answer display prep: scrub node ids and split off the authored
 * "A wrong answer …" misconception tail (that note has its own home in the
 * UI and is not part of the answer worth copying).
 */
export function prepareModelAnswer(raw: string | null | undefined): string {
  const cleaned = scrubNodeIds(raw || '').trim();
  const m = cleaned.match(/\n?\s*(A wrong answer\b[\s\S]*)$/i);
  return (m ? cleaned.slice(0, m.index) : cleaned).trim();
}

// ─── rotating answer-writing tips (small curated set) ───────────────────────

/** Curated, English-only board answer-writing tips. One rotates per view so
 *  returning students meet a new one instead of a repeated slogan. */
export const ANSWER_TIPS: string[] = [
  'Boards reward steps, not just answers — write the formula line even if you cannot finish the sum.',
  'Start a long answer with the definition in one clean sentence, then bring in the example.',
  'A labelled diagram earns marks even when words run out — draw it big and label every part.',
  'Match the question\u2019s marks to your answer: aim for one scoring point per mark.',
  'Never leave a numerical answer without its unit — the unit itself can carry a mark.',
  'Underline the keywords an examiner scans for — the definition, the law, the final result.',
];

const TIP_STORAGE_KEY = 'atlas_answer_tip_idx';

/**
 * One tip per view, rotating across the curated set. The counter persists in
 * localStorage so each finish/results screen advances the rotation; SSR and
 * storage failures fall back to a deterministic index (never throws, never
 * blocks rendering).
 */
export function nextAnswerTip(): string {
  let idx = 0;
  if (typeof window !== 'undefined') {
    try {
      const prev = Number(window.localStorage.getItem(TIP_STORAGE_KEY) || '0');
      idx = Number.isFinite(prev) ? Math.abs(Math.trunc(prev)) + 1 : 0;
      window.localStorage.setItem(TIP_STORAGE_KEY, String(idx % ANSWER_TIPS.length));
    } catch {
      idx = Math.floor(Date.now() / 60000) % ANSWER_TIPS.length;
    }
  }
  return ANSWER_TIPS[idx % ANSWER_TIPS.length];
}
