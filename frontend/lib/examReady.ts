'use client';

/**
 * examReady — shared client helpers for the exam-ready layer.
 *
 * Three small, honest pieces:
 *
 *   1. BOARD RELEVANCE — traces a corpus node to the real questions in the
 *      platform's board_questions bank (GET /api/content/nodes/{id}/questions,
 *      which matches on the node_tags column). The badge shows the marks the
 *      bank carries; when the node traces to nothing the caller shows nothing
 *      at all. No year/venue is ever claimed beyond what the data carries.
 *
 *   2. CONFIDENCE CALIBRATION — pure tallies for the "Confident / Just
 *      guessing" chips. The chips are recorded client-side only and NEVER
 *      touch grading; the tallies feed one end-of-session self-check display
 *      so the student can see whether their instincts match their results.
 *
 *   3. REVISION CARDS — the "Today I learned" keepable card library in
 *      localStorage, saved from a finished story and revisited from the
 *      dashboard. Every field comes from the node's own authored enrichment.
 *
 * Nothing here mutates backend state, and nothing displays a raw node id —
 * ids are allowed in storage keys and URLs only (the app's existing contract).
 */

import { scrubNodeIds } from '@/lib/boardAnswer';

// ─── node id shape (same contract the practice page uses for handoff) ────────

/** Corpus node ids look like c10_bio_cbse_01_001. Internal-only: never render. */
export const NODE_ID_RE = /^c\d{1,2}_[a-z0-9]+(?:_[a-z0-9]+)*_\d{1,2}_\d{1,3}$/i;

export function isNodeId(s: string | null | undefined): boolean {
  return !!s && NODE_ID_RE.test(s);
}

// ─── 1 · board relevance ─────────────────────────────────────────────────────

/** Only the fields the badge reads off GET …/questions rows. */
export interface BoardQuestionMeta {
  marks: number;
  year?: string | null;
  source_type?: string;
}

export interface BoardTrace {
  /** How many of the node's traced questions were inspected. */
  count: number;
  /** Set only when EVERY traced question carries the same marks value. */
  marks: number | null;
  /** Highest marks among the traced questions (for the honest "up to" form). */
  maxMarks: number;
}

/** Derive the badge facts from real question rows. [] / bad rows → null. */
export function boardTraceFromQuestions(questions: BoardQuestionMeta[] | null | undefined): BoardTrace | null {
  const rows = (questions || []).filter(
    q => q && Number.isFinite(Number(q.marks)) && Number(q.marks) > 0
  );
  if (!rows.length) return null;
  const marks = rows.map(q => Math.max(1, Math.round(Number(q.marks))));
  const distinct = Array.from(new Set(marks));
  return {
    count: rows.length,
    marks: distinct.length === 1 ? distinct[0] : null,
    maxMarks: Math.max(...marks),
  };
}

/**
 * Trace a node to the board bank. Any failure — network, 404, empty bank —
 * resolves null and the badge is simply not shown. Best-effort by design:
 * a relevance chip must never block or break the lesson.
 */
export async function fetchBoardTrace(nodeId: string, timeoutMs = 8000): Promise<BoardTrace | null> {
  if (!isNodeId(nodeId)) return null;
  try {
    const res = await fetch(
      `/api/content/nodes/${encodeURIComponent(nodeId)}/questions?limit=20`,
      { signal: AbortSignal.timeout(timeoutMs) }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { questions?: BoardQuestionMeta[] } | null;
    return boardTraceFromQuestions(data?.questions);
  } catch {
    return null;
  }
}

// ─── 2 · confidence calibration (display-only; never grading) ────────────────

export type Confidence = 'confident' | 'guess';

export interface CalibBucket {
  total: number;
  right: number;
}

export interface Calibration {
  confident: CalibBucket;
  guess: CalibBucket;
}

export function emptyCalibration(): Calibration {
  return {
    confident: { total: 0, right: 0 },
    guess: { total: 0, right: 0 },
  };
}

/** Fold one graded answer into the tally. Answers without BOTH a recorded
 *  confidence and a real correct/incorrect outcome are ignored — the display
 *  counts only actual pairs, never projections. */
export function tallyCalibration(
  cal: Calibration,
  confidence: Confidence | null | undefined,
  correct: boolean | null | undefined
): Calibration {
  if ((confidence !== 'confident' && confidence !== 'guess') || typeof correct !== 'boolean') {
    return cal;
  }
  cal[confidence].total += 1;
  if (correct) cal[confidence].right += 1;
  return cal;
}

export function mergeCalibration(a: Calibration, b: Calibration): Calibration {
  return {
    confident: {
      total: a.confident.total + b.confident.total,
      right: a.confident.right + b.confident.right,
    },
    guess: {
      total: a.guess.total + b.guess.total,
      right: a.guess.right + b.guess.right,
    },
  };
}

export function calibrationHasData(cal: Calibration): boolean {
  return cal.confident.total + cal.guess.total > 0;
}

// ─── 3 · revision cards ("Today I learned" library) ──────────────────────────

/** One keepable revision card. Every text field is authored content copied
 *  from the node's enrichment payload — nothing generated, nothing invented. */
export interface RevisionCard {
  nodeId: string;
  title: string;
  subject: string; // display name, e.g. "Science"
  classLevel: number | string;
  /** The story hook — eli5, or the derived opening beat when eli5 is null. */
  hook: string;
  /** Up to three authored walkthrough beats. */
  steps: string[];
  /** The authored misconception ("the trap"), prefix-stripped; may be null. */
  trap: string | null;
  savedAt: number;
}

const REVISION_CARDS_KEY = 'atlas-revision-cards-v1';
const REVISION_CARDS_MAX = 60;

function readLibrary(): RevisionCard[] {
  try {
    const raw = localStorage.getItem(REVISION_CARDS_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (c): c is RevisionCard =>
        !!c && typeof c === 'object' &&
        typeof (c as RevisionCard).nodeId === 'string' &&
        typeof (c as RevisionCard).title === 'string'
    );
  } catch {
    return [];
  }
}

function writeLibrary(cards: RevisionCard[]): void {
  try {
    localStorage.setItem(REVISION_CARDS_KEY, JSON.stringify(cards.slice(0, REVISION_CARDS_MAX)));
  } catch {
    /* storage full / disabled — the library is best-effort by design */
  }
}

export function listRevisionCards(): RevisionCard[] {
  return readLibrary().sort((a, b) => b.savedAt - a.savedAt);
}

export function getRevisionCard(nodeId: string): RevisionCard | null {
  return readLibrary().find(c => c.nodeId === nodeId) ?? null;
}

/** Upsert by node; newest first; capped. Returns the updated library. */
export function saveRevisionCard(card: RevisionCard): RevisionCard[] {
  const next = readLibrary().filter(c => c.nodeId !== card.nodeId);
  next.push({ ...card, savedAt: Date.now() });
  writeLibrary(next);
  return listRevisionCards();
}

export function removeRevisionCard(nodeId: string): void {
  writeLibrary(readLibrary().filter(c => c.nodeId !== nodeId));
}

// ─── rescue hint ("Stuck?" protocol, step 1) ─────────────────────────────────

/**
 * An honest hint for a stuck student: the node's own authored idea, in the
 * same derivation the story hook uses (eli5 → first walkthrough sentence →
 * definition), with node ids scrubbed under the shared contract. Null when
 * the topic is not a node or the fetch fails — the rescue card then simply
 * offers its other steps, never a made-up hint.
 */
export async function fetchRescueHint(nodeId: string, timeoutMs = 8000): Promise<string | null> {
  if (!isNodeId(nodeId)) return null;
  try {
    const res = await fetch(
      `/api/content/nodes/${encodeURIComponent(nodeId)}/enrichment`,
      { signal: AbortSignal.timeout(timeoutMs) }
    );
    if (!res.ok) return null;
    const e = (await res.json()) as {
      eli5?: string | null;
      text_walkthrough?: string | null;
      definition?: string | null;
    } | null;
    if (!e) return null;
    const eli5 = (e.eli5 || '').replace(/^in simple words:\s*/i, '').trim();
    const firstSentence = (e.text_walkthrough || '').match(/[^.!?]+[.!?]+["')\]]*\s*/)?.[0]?.trim() || '';
    const definition = (e.definition || '').trim();
    const hint = eli5 || firstSentence || definition;
    return hint ? scrubNodeIds(hint) : null;
  } catch {
    return null;
  }
}
