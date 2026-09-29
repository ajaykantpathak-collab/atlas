'use client';

/**
 * Story Mode — the cinematic lesson engine for Atlas.
 *
 * Turns any enriched 6–12 node into a guided, one-idea-per-screen story:
 *
 *   1. HOOK          — the node's eli5 in big type ("In simple words")
 *   2. THE IDEA      — definition (key terms highlighted) + tappable
 *                      numbered walkthrough steps
 *   3. EXPLORE       — "feel it": the sims_v2 simulation matching the
 *                      node's class+subject+chapter, embedded in-page
 *                      (resolved via the sims index; never a cross-subject
 *                      match). No matching sim → the node's own StoryDiagram
 *                      enlarged ("Explore this visually"). Nothing invented.
 *   4. WORKED EXAMPLE— a board-style answer when the corpus supports it,
 *                      plus a "Your turn" fade: the same problem with the
 *                      reasoning hidden behind key blanks the student fills
 *                      and checks against the authored answer (honest,
 *                      exact-match grading — never faked praise)
 *   5. COMMON TRAP   — the authored misconception as a "watch out" beat
 *   6. QUICK CHECK   — the node's diagnostic questions inline; correct
 *                      answers stay hidden until the student attempts
 *   7. FINISH        — mastery movement + XP, link into /practice
 *
 * Presentation layer ONLY. Every word on screen comes from the authored
 * enrichment payload (GET /api/content/nodes/{id}/enrichment) merged with
 * the node detail endpoint; authored prose is only ever split into beats
 * deterministically (sentence/block splitting). Nothing is invented and no
 * backend call mutates state.
 *
 * Visual layer: story2's `./visuals` module (StoryHero / StoryDiagram) is
 * loaded dynamically and defended twice — a module that is absent or fails
 * to load falls back to the built-in gold-gradient hero, and a module that
 * throws while RENDERING is caught by an error boundary and falls back the
 * same way. Story Mode never blocks on the visuals file.
 */

import {
  Component, useEffect, useMemo, useRef, useState, type ReactNode,
} from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { subjectName } from '@/lib/nodeTitle';
import { buildBoardAnswerParts, nextAnswerTip, scrubNodeIds, type BoardPart } from '@/lib/boardAnswer';
import {
  fetchBoardTrace, saveRevisionCard, getRevisionCard, emptyCalibration,
  mergeCalibration, tallyCalibration, calibrationHasData, isNodeId,
  type BoardTrace, type Calibration, type Confidence, type RevisionCard,
} from '@/lib/examReady';
import { pinStory, pinStoryDocument } from '@/lib/offlineLibrary';
import { tutorStudentId, tutorUserClassLevel, type AskResponse } from '@/components/tutor/tutorShared';
import AskResponseCard from '@/components/tutor/AskResponseCard';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { api } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
// types only — the lite registry and the v3 engine load lazily at runtime
import type { SimMeta } from '@/components/sims_v2/lite';
import type { SimAnswerEvent, SimDef } from '@/components/sims_v2/engine/types';

// ─── data shapes (as served by GET /api/content/nodes/{id}/enrichment) ──────

interface Enrichment {
  node_id: string;
  title: string | null;
  subject: string;
  class_level: number | string;
  chapter: number | string | null;
  definition: string | null;
  text_walkthrough: string | null;
  eli5: string | null;
  common_misconception: string | null;
  diagnostic_questions: DiagnosticQuestion[] | null;
  on_failure: string | string[] | null;
  examples: string | null;
  cognitive_level: string | null;
  difficulty: string | null;
  mastery_criteria: string | null;
}

interface DiagnosticQuestion {
  question: string;
  answer: string;
  options?: string[] | null;
  misconception_if_wrong?: string | null;
}

/** Only the fields Story Mode reads from the node detail endpoint. */
interface NodeDetail {
  label?: string | null;
  subject?: string | null;
  class_level?: number | string | null;
}

// ─── story2 visuals contract (loaded defensively) ───────────────────────────

/** A diagram spec for the hero's right half — always derived from the node's
 *  own enrichment data (deterministic splitting only, nothing invented). */
type StoryDiagramSpec = { type: string; data: Record<string, unknown> } | null;
type StoryHeroProps = {
  subject: string;
  classLevel: number | string;
  title: string;
  diagram?: StoryDiagramSpec;
};
type StoryDiagramProps = { type: string; data: unknown };
type StoryVisualsModule = {
  StoryHero?: React.ComponentType<StoryHeroProps>;
  StoryDiagram?: React.ComponentType<StoryDiagramProps>;
};

/**
 * Dynamic loader for story2's visuals module. The specifier is a template
 * expression so the bundler treats it as a context lookup: while
 * components/story/visuals.tsx does not exist yet the import simply
 * REJECTS at runtime (caught below) instead of failing the compile, and
 * the moment story2 lands the file it resolves with no change here.
 */
function loadVisuals(): Promise<StoryVisualsModule> {
  return import(`./${'visuals'}`) as Promise<StoryVisualsModule>;
}

/** Catches a visuals component that throws during render → built-in fallback. */
class VisualBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; resetKey: string },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidUpdate(prev: { resetKey: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.failed) {
      this.setState({ failed: false });
    }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

// ─── scenes ─────────────────────────────────────────────────────────────────

interface ParsedExample {
  problem: string;
  steps: string[];
  reasoning: string;
  answer: string;
}

type Scene =
  | { kind: 'hook'; text: string }
  | { kind: 'idea'; definition: string; steps: string[] }
  | { kind: 'explore' }
  | { kind: 'example'; n: number; total: number; example: ParsedExample }
  | { kind: 'trap'; text: string; guidance: string | null }
  | { kind: 'check'; questions: PreparedQuestion[] }
  // FINISH carries the authored pieces the "Today I learned" card keeps —
  // the same hook text, up to three walkthrough beats and the trap — so the
  // revision card derives from exactly what the story taught.
  | { kind: 'finish'; cardHook: string; cardSteps: string[]; cardTrap: string | null };

interface PreparedQuestion {
  question: string;
  options: string[];
  /** Authored model answer, trimmed of the trailing "A wrong answer…" tail. */
  modelAnswer: string;
  /** Why wrong answers happen (authored misconception note, if any). */
  wrongNote: string | null;
}

const SCENE_KICKER: Record<Scene['kind'], { key: 'kickerHook' | 'kickerIdea' | 'kickerExplore' | 'kickerExample' | 'kickerTrap' | 'kickerCheck' | 'kickerFinish'; cls: string }> = {
  hook: { key: 'kickerHook', cls: 'text-gold-300' },
  idea: { key: 'kickerIdea', cls: 'text-brand-300' },
  explore: { key: 'kickerExplore', cls: 'text-sky-400' },
  example: { key: 'kickerExample', cls: 'text-mint-300' },
  trap: { key: 'kickerTrap', cls: 'text-red-300' },
  check: { key: 'kickerCheck', cls: 'text-gold-300' },
  finish: { key: 'kickerFinish', cls: 'text-mint-300' },
};

// ─── deterministic text helpers (splitting only — never inventing) ──────────

function splitSentences(text: string): string[] {
  return (text.match(/[^.!?]+[.!?]+["')\]]*\s*/g) || [text]).map(s => s.trim()).filter(Boolean);
}

/** Chunk walkthrough sentences into 2-sentence beats, capped at 4 steps. */
function chunkWalkthrough(text: string): string[] {
  const sentences = splitSentences(text);
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    chunks.push(sentences.slice(i, i + 2).join(' '));
    if (chunks.length === 4) break;
  }
  if (!chunks.length && text.trim()) chunks.push(text.trim());
  return chunks;
}

function parseExamples(raw: string): ParsedExample[] {
  if (!raw?.trim()) return [];
  return raw
    .split(/\n(?=PROBLEM:)/g)
    .map(block => {
      const problem = (block.match(/PROBLEM:\s*([\s\S]*?)(?:\nSTEPS:|$)/)?.[1] || '').trim();
      // corpus lines look like "- Step 1: …" — case-insensitive on purpose
      const steps = Array.from(block.matchAll(/^\s*-\s*step\s*\d*:\s*(.+)$/gim)).map(m => m[1].trim());
      const reasoning = (block.match(/REASONING:\s*([\s\S]*?)(?:\nANSWER:|$)/)?.[1] || '').trim();
      const answer = (block.match(/ANSWER:\s*([\s\S]*?)\s*$/)?.[1] || '').trim();
      return { problem, steps, reasoning, answer };
    })
    .filter(e => e.problem);
}

function stripMisconceptionPrefix(s: string): string {
  return s.replace(/^\s*\*{0,2}\s*misconception:?\s*\*{0,2}\s*/i, '').trim();
}

/** on_failure can arrive as a string or a JSON list — normalise to prose. */
function failureText(v: string | string[] | null | undefined): string | null {
  if (!v) return null;
  if (Array.isArray(v)) {
    const joined = v.filter(Boolean).map(s => String(s).replace(/^\s*Q?\d*\s*fails?[^:]*:\s*/i, '').trim()).filter(Boolean).join(' ');
    return joined || null;
  }
  const s = String(v).trim();
  return s || null;
}

/** Split "…correct part. A wrong answer … reveals …" into model answer + note. */
function prepareAnswer(q: DiagnosticQuestion): PreparedQuestion {
  const answer = (q.answer || '').trim();
  const m = answer.match(/\n?\s*(A wrong answer\b[\s\S]*)$/i);
  const head = (m ? answer.slice(0, m.index) : answer).trim();
  const tail = m ? m[1].trim() : '';
  const wrong = (q.misconception_if_wrong || '').trim() || tail;
  return {
    question: q.question,
    options: (q.options || []).filter(Boolean),
    modelAnswer: head || answer,
    wrongNote: wrong || null,
  };
}

/** The label on some corpus nodes is a generic "Phy · Ch 02" — derive the
 *  story title from the node's own authored definition in that case. */
function deriveTitle(label: string, definition: string): string {
  if (label && !/·\s*ch\s*\d+/i.test(label)) return label;
  const firstClause = (definition.split(/(?: is | are |,|\.)/)[0] || '').trim();
  const t = firstClause.charAt(0).toUpperCase() + firstClause.slice(1);
  return t.length > 3 ? t.slice(0, 64) : label || 'Story';
}

const STOP_TERMS = new Set(['the', 'and', 'with', 'from', 'that', 'this', 'into', 'your', 'their', 'when', 'what', 'which', 'through', 'between', 'other']);

/** Key terms worth highlighting in the definition — derived from the node's
 *  own title words (deterministic, nothing added). */
function keyTerms(title: string): string[] {
  const words = title
    .split(/[^A-Za-z]+/)
    .filter(w => w.length >= 4 && !STOP_TERMS.has(w.toLowerCase()))
    .map(w => w.toLowerCase());
  return Array.from(new Set(words)).slice(0, 3);
}

/** Short labels for the generic-flow diagram canvas — the first words of
 *  each authored step, trimmed to what the flow boxes can hold. */
function shortFlowLabel(s: string): string {
  const words = s.split(/\s+/).slice(0, 3).join(' ');
  return words.length > 18 ? words.slice(0, 15).trimEnd() + '…' : words;
}

function flowLabels(steps: string[]): string[] {
  return steps.slice(0, 5).map(shortFlowLabel).filter(Boolean);
}

/**
 * The hero's own diagram, derived deterministically from the node's authored
 * walkthrough: its 2-sentence beats become a timeline of the story's beats
 * (numbered dot + short label — labels are the same first-words truncation
 * the flow canvas uses). Needs ≥2 beats; otherwise null → the hero keeps its
 * ghost icon. Nothing is invented — labels are authored text, split only.
 */
function heroTimelineFrom(walkthrough: string): StoryDiagramSpec {
  const beats = chunkWalkthrough(walkthrough).filter(Boolean);
  if (beats.length < 2) return null;
  return {
    type: 'timeline',
    data: {
      events: beats.map((beat, i) => ({
        time: String(i + 1).padStart(2, '0'),
        label: shortFlowLabel(beat),
      })),
    },
  };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─── "Your turn": deterministic blanking of the authored example ────────────

/**
 * Worked-example fading. The authored steps are re-served with their key
 * values hidden, derived purely client-side from the node's own payload:
 *   1. numbers first (7:30-style times, 3.14 decimals, 1/2 fractions) —
 *      the values carry the reasoning — up to two per step;
 *   2. otherwise the longest word of the step that also appears in the
 *      node's own definition/title (the chapter's real vocabulary);
 *   3. a step with neither stays a tap-to-reveal reasoning row.
 * Nothing is invented — every blank's expected answer is authored text.
 */
const BLANKABLE_NUMBER_RE = /\d+(?::\d{2})?(?:\.\d+)?(?:\/\d{1,3})?/g;

/** Generic words that must never become a blank even when the definition
 *  uses them — blanking "process" teaches nothing. */
const BLANK_STOP = new Set(Array.from(STOP_TERMS).concat([
  'life', 'process', 'processes', 'system', 'systems', 'using', 'given',
  'value', 'values', 'number', 'term', 'terms', 'example', 'examples',
  'problem', 'answer', 'reasoning', 'student', 'students', 'class',
  'different', 'called', 'known', 'level', 'type', 'types', 'kind',
  'following', 'shows', 'shown', 'used', 'must', 'also', 'each',
  'every', 'they', 'them', 'their', 'have', 'has', 'are', 'was', 'were',
  'will', 'would', 'could', 'should', 'into', 'onto', 'about', 'above',
  'below', 'between', 'through', 'during', 'before', 'after', 'other',
  'such', 'these', 'those', 'this', 'that', 'with', 'from', 'which',
  'what', 'when', 'where', 'while', 'than', 'then', 'more', 'most',
  'some', 'only', 'over', 'under', 'again', 'words', 'word',
]));

/** Content words worth blanking — from the node's own definition + title. */
function blankVocab(title: string, definition: string): string[] {
  const words = `${title} ${definition}`.match(/[A-Za-z][A-Za-z'-]{3,}/g) || [];
  return Array.from(new Set(words.map(w => w.toLowerCase()).filter(w => !BLANK_STOP.has(w))));
}

interface YourTurnBlank { id: number; n: number; token: string }
interface YourTurnPart { text: string; blank: YourTurnBlank | null }
interface YourTurnStep { parts: YourTurnPart[]; revealOnly: boolean }

function buildYourTurnSteps(steps: string[], vocab: string[]): YourTurnStep[] {
  let nextId = 0;
  return steps.map(step => {
    let ranges: { start: number; end: number; token: string }[] =
      Array.from(step.matchAll(BLANKABLE_NUMBER_RE))
        .slice(0, 2)
        .map(m => ({ start: m.index ?? 0, end: (m.index ?? 0) + m[0].length, token: m[0] }));
    if (!ranges.length) {
      // longest chapter word that occurs in this step (case-insensitive)
      const hit = vocab
        .slice()
        .sort((a, b) => b.length - a.length)
        .map(w => new RegExp(`\\b${escapeRegExp(w)}\\b`, 'i').exec(step))
        .find(m => !!m);
      if (hit) ranges = [{ start: hit.index ?? 0, end: (hit.index ?? 0) + hit[0].length, token: hit[0] }];
    }
    const parts: YourTurnPart[] = [];
    let blankN = 0;
    let cursor = 0;
    for (const r of ranges) {
      if (r.start > cursor) parts.push({ text: step.slice(cursor, r.start), blank: null });
      blankN += 1;
      parts.push({ text: '', blank: { id: nextId++, n: blankN, token: r.token } });
      cursor = r.end;
    }
    if (cursor < step.length) parts.push({ text: step.slice(cursor), blank: null });
    return { parts, revealOnly: ranges.length === 0 };
  });
}

/** Forgiving-but-honest blank comparison: case/space/comma-insensitive,
 *  numeric equality for numbers (1/2 equals 0.5), otherwise exact. */
function asNumber(v: string): number | null {
  const f = v.match(/^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/);
  if (f) return Number(f[1]) / Number(f[2]);
  if (/^-?\d+(?:\.\d+)?$/.test(v)) return Number(v);
  return null;
}

function blankMatches(got: string, want: string): boolean {
  const norm = (s: string) => s.toLowerCase().replace(/[\s,]+/g, '');
  const a = norm(got);
  const b = norm(want);
  if (!a || !b) return false;
  if (a === b) return true;
  const na = asNumber(a);
  const nb = asNumber(b);
  return na !== null && nb !== null && Math.abs(na - nb) < 1e-9;
}

// ─── corpus hygiene ─────────────────────────────────────────────────────────

/**
 * Authored corpus prose sometimes embeds internal node references like
 * "(c6_physics_ch03_012)". Raw node ids must never reach the screen:
 *   1. a parenthesised bare id is dropped outright (the surrounding prose
 *      already names the class/chapter);
 *   2. any remaining bare id becomes its sanctioned friendly label
 *      ("Class 6 · Physics · Chapter 3 · Topic 12").
 * Deterministic transformations of authored text — nothing is invented.
 * (The regex + friendly-label rules live in lib/boardAnswer so the practice
 * page scrubs authored text with the exact same contract.)
 */
function cleanCorpusText(s: string | null | undefined): string {
  return scrubNodeIds(s);
}

/** Apply the id scrub to every authored string of an enrichment payload. */
function cleanEnrichment(e: Enrichment): Enrichment {
  return {
    ...e,
    title: cleanCorpusText(e.title) || null,
    definition: cleanCorpusText(e.definition),
    text_walkthrough: cleanCorpusText(e.text_walkthrough),
    eli5: cleanCorpusText(e.eli5) || null,
    common_misconception: cleanCorpusText(e.common_misconception),
    on_failure: Array.isArray(e.on_failure) ? e.on_failure.map(cleanCorpusText) : cleanCorpusText(e.on_failure),
    examples: cleanCorpusText(e.examples),
    mastery_criteria: cleanCorpusText(e.mastery_criteria),
    diagnostic_questions: (e.diagnostic_questions || []).map(q => ({
      question: cleanCorpusText(q.question),
      answer: cleanCorpusText(q.answer),
      options: (q.options || []).map(cleanCorpusText),
      misconception_if_wrong: cleanCorpusText(q.misconception_if_wrong),
    })),
  };
}

// ─── rich text rendering ────────────────────────────────────────────────────

/** Render inline \( latex \) / \[ latex \] segments with KaTeX. */
function renderTex(seg: string, displayMode: boolean): string {
  try {
    return katex.renderToString(seg, { throwOnError: false, displayMode });
  } catch {
    return seg;
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

/**
 * Text renderer that (a) typesets inline LaTeX and (b) gold-highlights the
 * node's key terms inside the plain segments. Purely presentational.
 */
function RichText({ text, terms = [], className }: { text: string; terms?: string[]; className?: string }) {
  const html = useMemo(() => {
    const latexSplit = text.split(/(\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])/g);
    return latexSplit.map((chunk, i) => {
      if (chunk.startsWith('\\(') || chunk.startsWith('\\[')) {
        return renderTex(chunk.slice(2, -2), chunk.startsWith('\\['));
      }
      let plain = escapeHtml(chunk);
      if (terms.length) {
        const re = new RegExp(`\\b(${terms.map(escapeRegExp).join('|')})\\b`, 'gi');
        plain = plain.replace(re, '<span class="text-gold-300 font-semibold">$1</span>');
      }
      return plain;
    }).join('');
  }, [text, terms]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** Minimal **bold** renderer for authored markdown snippets. */
function MdText({ text, className }: { text: string; className?: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span className={className}>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <strong key={i} className="text-white font-semibold">{p.slice(2, -2)}</strong>
          : <span key={i}>{p}</span>
      )}
    </span>
  );
}

// ─── built-in fallback visuals (used whenever story2's module is absent) ────

function GoldHero({ subject, classLevel, title }: StoryHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl border border-gold-500/25 mb-8
                 bg-gradient-to-br from-gold-500/[0.16] via-gold-500/[0.05] to-transparent"
      aria-hidden="true"
    >
      {/* concentric gold arcs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full border border-gold-500/20" />
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full border border-gold-500/30" />
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gold-500/10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
      <div className="p-6 sm:p-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold-400/90 mb-3">
          {subject} · Class {classLevel}
        </p>
        <h1 className="font-display text-3xl sm:text-5xl font-black leading-tight bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
    </motion.div>
  );
}

// ─── scene builder ──────────────────────────────────────────────────────────

function buildScenes(raw: Enrichment): Scene[] {
  const e = cleanEnrichment(raw);
  const scenes: Scene[] = [];
  // HOOK: eli5 is the ideal hook, but the corpus loader currently serves it
  // null for every node — fall back to the authored walkthrough's opening
  // beat, then the definition. Never show the raw node id.
  const hookText =
    (e.eli5 || '').replace(/^in simple words:\s*/i, '').trim() ||
    splitSentences(e.text_walkthrough || '')[0] ||
    (e.definition || '').trim() ||
    deriveTitle(e.title || '', e.definition || '');
  scenes.push({ kind: 'hook', text: hookText });

  scenes.push({
    kind: 'idea',
    definition: (e.definition || '').trim(),
    steps: chunkWalkthrough(e.text_walkthrough || ''),
  });

  // EXPLORE — always present. Whether it embeds the matching sims_v2 sim
  // or falls back to the node's own diagram is resolved in the stage
  // (findSimForNode over the sims index; null → honest fallback).
  scenes.push({ kind: 'explore' });

  const examples = parseExamples(e.examples || '').slice(0, 2);
  examples.forEach((example, i) => scenes.push({ kind: 'example', n: i + 1, total: examples.length, example }));

  if ((e.common_misconception || '').trim()) {
    scenes.push({
      kind: 'trap',
      text: stripMisconceptionPrefix(e.common_misconception as string),
      guidance: failureText(e.on_failure),
    });
  }

  const questions = (e.diagnostic_questions || []).slice(0, 6).map(prepareAnswer);
  if (questions.length) scenes.push({ kind: 'check', questions });

  // "Today I learned" card — the exact authored beats this story taught:
  // the hook text, up to three walkthrough steps, and the trap (when the
  // node's pedagogy covers one). Nothing is written for the card here that
  // the story didn't already show.
  scenes.push({
    kind: 'finish',
    cardHook: hookText,
    cardSteps: chunkWalkthrough(e.text_walkthrough || '').slice(0, 3),
    cardTrap: (e.common_misconception || '').trim()
      ? stripMisconceptionPrefix(e.common_misconception as string)
      : null,
  });
  return scenes;
}

// ─── animation ──────────────────────────────────────────────────────────────

const sceneVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.22 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const riseItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

// ─── engine ─────────────────────────────────────────────────────────────────

export default function StoryMode({ topicId: topicIdProp }: { topicId?: string } = {}) {
  const params = useParams();
  const rawTopicId =
    topicIdProp ||
    (typeof params?.topicId === 'string' ? params.topicId : Array.isArray(params?.topicId) ? params.topicId[0] : '');

  // Slug URLs resolve to internal node ids — /learn/{slug}/story used to 404
  // ("Story unavailable") because the enrichment endpoints are node-id only.
  const [topicId, setTopicId] = useState<string>(
    isNodeId(rawTopicId) ? rawTopicId : '');
  useEffect(() => {
    if (!rawTopicId) return;
    if (isNodeId(rawTopicId)) { setTopicId(rawTopicId); return; }
    let alive = true;
    api.get(`/api/content/resolve/${encodeURIComponent(rawTopicId)}`)
      .then((d: any) => { if (alive) setTopicId(d?.node_id || ''); })
      .catch(() => { if (alive) setTopicId(''); });
    return () => { alive = false; };
  }, [rawTopicId]);

  const [enrichment, setEnrichment] = useState<Enrichment | null>(null);
  const [detail, setDetail] = useState<NodeDetail | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [idx, setIdx] = useState(0);
  const [visuals, setVisuals] = useState<StoryVisualsModule | null>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  // story2's visuals: try to load; absent/broken module → built-in hero.
  useEffect(() => {
    let alive = true;
    loadVisuals()
      .then(m => { if (alive) setVisuals(m); })
      .catch(() => { /* visuals.tsx not present — GoldHero fallback stands in */ });
    return () => { alive = false; };
  }, []);

  // ── EXPLORE scene: the sims_v2 sim matching this node. Resolved from the
  // sims index (metadata-only chunk, loaded lazily so the story route never
  // pays for it up front). undefined = still resolving; null = honestly no
  // same-subject, same-chapter sim exists → the fallback diagram renders.
  const [simMeta, setSimMeta] = useState<SimMeta | null | undefined>(undefined);
  useEffect(() => {
    if (!topicId) return undefined;
    let alive = true;
    setSimMeta(undefined);
    import('@/components/sims_v2/lite')
      .then(m => { if (alive) setSimMeta(m.findSimForNode(topicId)); })
      .catch(() => { if (alive) setSimMeta(null); });
    return () => { alive = false; };
  }, [topicId]);

  const [retryNonce, setRetryNonce] = useState(0);
  useEffect(() => {
    if (!topicId) return;
    let alive = true;
    // STORY-01: a single transient 502 during a backend reload must not
    // dead-end the lesson — auto-retry twice with backoff, then show the
    // manual retry card (not a dead end).
    const ATTEMPTS = 3;
    const load = (attempt: number) => {
      Promise.all([
        fetch(`/api/content/nodes/${topicId}/enrichment`)
          .then(r => (r.ok ? r.json() : Promise.reject(new Error(`enrichment ${r.status}`)))),
        fetch(`/api/content/nodes/${topicId}`).then(r => (r.ok ? r.json() : null)).catch(() => null),
      ])
        .then(([enr, det]) => {
          if (!alive) return;
          setEnrichment(enr);
          setDetail(det);
        // Offline library: pin this story while we know we're online, so
        // /premium/offline lists it and the story reopens without a network —
        // including hard navigations (the page document is pinned too).
        // Best-effort — a failed pin never blocks the story itself.
            pinStory(topicId, enr, det)
              .then((pinned) => (pinned ? pinStoryDocument(`/learn/${topicId}/story`) : false))
              .catch(() => {});
          })
          .catch(err => {
            if (!alive) return;
            if (attempt < ATTEMPTS) {
              setTimeout(() => alive && load(attempt + 1), attempt * 1500);
            } else {
              setLoadError(String(err?.message || err));
            }
          });
    };
    load(1);
    return () => { alive = false; };
  }, [topicId, retryNonce]);

  // keyboard navigation
  const scenes = useMemo(() => (enrichment ? buildScenes(enrichment) : []), [enrichment]);

  // EXAMREADY board-relevance badge: trace this node to the real questions in
  // the platform's board bank. Null (no trace / fetch failed) → no badge at
  // all — the hook never claims board relevance the data doesn't carry.
  const [boardTrace, setBoardTrace] = useState<BoardTrace | null>(null);
  useEffect(() => {
    if (!topicId) return undefined;
    let alive = true;
    fetchBoardTrace(topicId)
      .then(trace => { if (alive) setBoardTrace(trace); })
      .catch(() => { if (alive) setBoardTrace(null); });
    return () => { alive = false; };
  }, [topicId]);

  const goRef = useRef((_: number) => {});
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      // typing in the doubt panel must never flip story scenes
      const t = ev.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      if (ev.key === 'ArrowRight') goRef.current(idx + 1);
      if (ev.key === 'ArrowLeft') goRef.current(idx - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, scenes.length]);

  const go = (next: number) => {
    setIdx(Math.max(0, Math.min(next, scenes.length - 1)));
    storyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  goRef.current = go;

  // per-screen attempt bookkeeping (client-side only — nothing is persisted)
  // Each check scene reports how many of its questions were attempted and
  // how many came out strong; totals below are per-QUESTION counts.
  const [attempted, setAttempted] = useState<Record<number, number>>({});
  const [strong, setStrong] = useState<Record<number, number>>({});
  // EXAMREADY: per-scene confidence tallies (display-only) for the finish
  // screen's self-check line.
  const [calibByScene, setCalibByScene] = useState<Record<number, Calibration>>({});
  const checkSceneIdx = useMemo(() => scenes.map((s, i) => (s.kind === 'check' ? i : -1)).filter(i => i >= 0), [scenes]);
  const totalQuestions = checkSceneIdx.reduce((n, i) => n + ((scenes[i] as Extract<Scene, { kind: 'check' }>).questions.length), 0);
  const attemptedCount = checkSceneIdx.reduce((n, i) => n + (attempted[i] || 0), 0);
  const strongCount = checkSceneIdx.reduce((n, i) => n + (strong[i] || 0), 0);
  const totalCalib = useMemo(
    () => checkSceneIdx.reduce((acc, i) => mergeCalibration(acc, calibByScene[i] ?? emptyCalibration()), emptyCalibration()),
    [checkSceneIdx, calibByScene]
  );
  const masteryPct = totalQuestions ? Math.round((strongCount / totalQuestions) * 100) : 0;
  const xp = strongCount * 10;

  if (loadError) {
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center p-6">
        <div className="glass-card rounded-2xl p-8 max-w-md text-center">
          <h1 className="font-display text-lg font-bold text-white mb-2">Story unavailable</h1>
          <p className="text-sm text-surface-600 mb-6">We couldn&apos;t load the lesson for this topic — it may be restarting. Give it a moment and retry.</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button onClick={() => { setLoadError(null); setRetryNonce(n => n + 1); }}
              className="btn-primary text-sm">Try again</button>
            <Link href={`/learn/${topicId}`} className="btn-ghost text-sm">Back to the lesson</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!enrichment || !scenes.length) {
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center">
        <motion.div
          className="w-10 h-10 rounded-full border-4 border-gold-500/30 border-t-gold-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          aria-label="Loading story"
        />
      </div>
    );
  }

  return (
    <StoryStage
      topicId={topicId}
      enrichment={enrichment}
      detail={detail}
      scenes={scenes}
      idx={Math.min(idx, scenes.length - 1)}
      go={go}
      storyRef={storyRef}
      visuals={visuals}
      simMeta={simMeta}
      boardTrace={boardTrace}
      totalQuestions={totalQuestions}
      attemptedCount={attemptedCount}
      strongCount={strongCount}
      masteryPct={masteryPct}
      xp={xp}
      totalCalib={totalCalib}
      onCheckScene={(sceneIdx, state) => {
        setAttempted(a => ({ ...a, [sceneIdx]: state.attemptedCount }));
        setStrong(s => ({ ...s, [sceneIdx]: state.strongCount }));
        setCalibByScene(c => ({ ...c, [sceneIdx]: state.calib }));
      }}
    />
  );
}

// ─── stage (owns per-scene rendering once data is loaded) ───────────────────

function StoryStage({
  topicId, enrichment, detail, scenes, idx, go, storyRef, visuals, simMeta,
  boardTrace, totalQuestions, attemptedCount, strongCount, masteryPct, xp,
  totalCalib, onCheckScene,
}: {
  topicId: string;
  enrichment: Enrichment;
  detail: NodeDetail | null;
  scenes: Scene[];
  idx: number;
  go: (n: number) => void;
  storyRef: React.RefObject<HTMLDivElement>;
  visuals: StoryVisualsModule | null;
  simMeta: SimMeta | null | undefined;
  boardTrace: BoardTrace | null;
  totalQuestions: number;
  attemptedCount: number;
  strongCount: number;
  masteryPct: number;
  xp: number;
  totalCalib: Calibration;
  onCheckScene: (sceneIdx: number, state: { attemptedCount: number; strongCount: number; calib: Calibration }) => void;
}) {
  const scene = scenes[idx];
  const isLast = idx === scenes.length - 1;
  const t = useTranslations('story');
  // LISTEN MODE: 🔊 toggles read-aloud; on scene change, speak the
  // scene's text — audio-only path for weak devices / reluctant readers.
  const [listenMode, setListenMode] = useState(false);
  const sceneText = useMemo(() => {
    if (scene.kind === 'hook') return scene.text;
    if (scene.kind === 'idea') return `${scene.definition} ${scene.steps.join(' ')}`;
    if (scene.kind === 'trap') return `${scene.text} ${scene.guidance ?? ''}`;
    if (scene.kind === 'finish') return scene.cardHook;
    return '';
  }, [scene]);
  useEffect(() => {
    if (listenMode && sceneText) {
      import('../../lib/sim-engine/speech')
        .then(m => m.speechManager.speak(sceneText.slice(0, 400)))
        .catch(() => {});
    }
  }, [listenMode, sceneText, idx]);

  const title = deriveTitle(detail?.label || enrichment.title || '', enrichment.definition || '');
  const terms = useMemo(() => keyTerms(title), [title]);
  const kicker = SCENE_KICKER[scene.kind];
  // The node's own walkthrough beats, as a hero timeline (null → ghost icon).
  const cleanedWalkthrough = useMemo(() => cleanCorpusText(enrichment.text_walkthrough), [enrichment.text_walkthrough]);
  const heroDiagram = useMemo(() => heroTimelineFrom(cleanedWalkthrough), [cleanedWalkthrough]);
  // EXPLORE fallback + WORKED EXAMPLE "Your turn" derive from the same
  // authored payload — deterministic splits only.
  const exploreBeats = useMemo(() => chunkWalkthrough(cleanedWalkthrough), [cleanedWalkthrough]);
  const yourTurnVocab = useMemo(
    () => blankVocab(title, cleanCorpusText(enrichment.definition)),
    [title, enrichment.definition]
  );

  // ── Doubt→Story loop: "Got a doubt?" opens the ask UI pre-seeded with
  // this story's topic, so the tutor's answer anchors to what the student
  // is looking at (the question text carries the topic's own terms).
  const [doubtOpen, setDoubtOpen] = useState(false);

  // Answer-writing tip: resolved after mount so SSR and the first client
  // render agree (no hydration mismatch) and the rotation advances per visit.
  const [answerTip, setAnswerTip] = useState('');
  useEffect(() => { setAnswerTip(nextAnswerTip()); }, []);

  const Hero = visuals?.StoryHero;
  const Diagram = visuals?.StoryDiagram;

  return (
    <div className="min-h-screen mesh-bg" ref={storyRef}>
      {/* ── top bar: exit + progress dots + doubt action ── */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link href={`/learn/${topicId}`} className="btn-ghost px-2 shrink-0" aria-label={t('exitAria')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
          </Link>
          <div className="flex-1 flex items-center justify-center gap-1.5 min-w-0" role="progressbar" aria-valuemin={1} aria-valuemax={scenes.length} aria-valuenow={idx + 1} aria-label={t('progressAria')}>
            {scenes.map((s, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={t('goToScreen', { n: i + 1 })}
                aria-current={i === idx}
                className="p-1 -m-0.5 group"
              >
                <motion.span
                  className={`block rounded-full ${i === idx ? 'bg-gold-400' : i < idx ? 'bg-gold-500/50 group-hover:bg-gold-400/70' : 'bg-white/10 group-hover:bg-white/25'}`}
                  animate={{ width: i === idx ? 26 : 10, height: 6 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>
          <button
            onClick={() => setDoubtOpen(true)}
            data-testid="got-a-doubt"
            className="btn-ghost shrink-0 px-2.5 py-1.5 text-xs font-medium text-gold-300 hover:text-gold-200 border border-gold-500/30 rounded-lg"
            aria-label={t('askDoubtAria')}
          >
            <svg className="inline mr-1 -mt-0.5" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            {t('gotADoubt')}
          </button>
          <span className="hidden sm:inline-flex shrink-0"><LanguageSwitcher /></span>
          <span className="text-[11px] text-surface-600 font-mono shrink-0 hidden sm:inline">{idx + 1}/{scenes.length}</span>
        </div>
      </div>

      {/* ── scene stage ── */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            variants={sceneVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {scene.kind !== 'hook' && (
              <p className={`text-[11px] font-semibold uppercase tracking-[0.22em] mb-4 ${kicker.cls}`}>
                {scene.kind === 'example' ? t('exampleN', { n: scene.n, total: scene.total }) : t(kicker.key)}
              </p>
            )}

            {/* ── 1 · HOOK — eli5 in big type over the hero ── */}
            {scene.kind === 'hook' && (
              <motion.div variants={stagger} initial="hidden" animate="show">
                {/* ── 0 · FEED-UP — the objective BEFORE anything else
                    (BATCH_PLAN 3.1). Zero-wrong: renders only when the
                    corpus carries MASTERY_CRITERIA; the corpus has no
                    why-matters section, so no why line is ever invented. */}
                {enrichment.mastery_criteria && (
                  <motion.div
                    variants={riseItem}
                    className="mb-5 rounded-2xl border border-sky-500/25 bg-sky-500/[0.05] p-4 sm:p-5"
                    data-testid="feedup-header"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300 mb-1.5">
                      Your objective
                    </p>
                    <p className="text-sm sm:text-[15px] leading-relaxed text-slate-200">
                      {enrichment.mastery_criteria}
                    </p>
                    {boardTrace && (
                      <p className="mt-2 text-[11px] font-semibold text-gold-300">
                        Board proof: {boardTrace.marks !== null ? boardTrace.marks : `up to ${boardTrace.maxMarks}`} real board questions on this exact topic
                      </p>
                    )}
                  </motion.div>
                )}
                <motion.div variants={riseItem}>
                  <VisualBoundary resetKey="hero" fallback={<GoldHero subject={subjectName(enrichment.subject)} classLevel={enrichment.class_level} title={title} />}>
                    {Hero
                      ? <Hero subject={subjectName(enrichment.subject)} classLevel={enrichment.class_level} title={title} diagram={heroDiagram} />
                      : <GoldHero subject={subjectName(enrichment.subject)} classLevel={enrichment.class_level} title={title} />}
                  </VisualBoundary>
                </motion.div>
                <motion.p variants={riseItem} className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300 mb-4">
                  {t('kickerHook')}
                </motion.p>
                <motion.blockquote
                  variants={riseItem}
                  className="glass-card rounded-2xl p-6 sm:p-8 border-l-4 border-gold-400"
                >
                  <p className="font-display text-xl sm:text-3xl font-semibold text-gold-100 leading-snug">
                    {scene.text}
                  </p>
                </motion.blockquote>
                {/* EXAMREADY board-relevance badge — shown ONLY when this
                    node traces to real questions in the board bank. No trace,
                    no claim: the badge simply doesn't render. */}
                {boardTrace && (
                  <motion.div variants={riseItem} className="mt-4 flex">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-500/[0.08] px-3 py-1 text-[11px] font-semibold text-gold-300"
                      data-testid="board-badge"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 0 1 .665 6.479A11.952 11.952 0 0 0 12 20.055a11.952 11.952 0 0 0-6.824-2.998 12.078 12.078 0 0 1 .665-6.479L12 14z" />
                      </svg>
                      {boardTrace.marks !== null
                        ? (boardTrace.marks === 1 ? t('boardBadgeOne') : t('boardBadgeMany', { n: boardTrace.marks }))
                        : t('boardBadgeUpTo', { n: boardTrace.maxMarks })}
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ── 2 · THE IDEA — definition + tappable walkthrough steps ── */}
            {scene.kind === 'idea' && (
              <IdeaScene scene={scene} terms={terms} Diagram={Diagram} diagramKey={`idea-${idx}`} />
            )}

            {/* ── 3 · EXPLORE — feel it: matching sim embedded, or the
                   node's own diagram enlarged (never a cross-subject sim) ── */}
            {scene.kind === 'explore' && (
              <ExploreScene
                simMeta={simMeta}
                diagram={heroDiagram}
                beats={exploreBeats}
                definition={(enrichment.definition || '').trim()}
                Diagram={Diagram}
              />
            )}

            {/* ── 4 · WORKED EXAMPLE (board answer + "Your turn" fading) ── */}
            {scene.kind === 'example' && (
              <ExampleScene
                scene={scene}
                definition={enrichment.definition}
                Diagram={Diagram}
                diagramKey={`example-${idx}`}
                vocabTerms={yourTurnVocab}
              />
            )}

            {/* ── 5 · COMMON TRAP ── */}
            {scene.kind === 'trap' && (
              <motion.div variants={stagger} initial="hidden" animate="show">
                <motion.div
                  variants={riseItem}
                  className="rounded-2xl p-6 sm:p-8 bg-red-500/[0.07] border border-red-500/30 relative overflow-hidden"
                >
                  <span className="absolute top-4 right-5 text-3xl opacity-40" aria-hidden="true">⚠️</span>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-red-300 font-semibold mb-3">{t('trapTitle')}</p>
                  <MdText text={scene.text} className="text-base sm:text-xl text-slate-100 leading-relaxed" />
                </motion.div>
                {scene.guidance && (
                  <motion.div variants={riseItem} className="glass-card rounded-xl p-4 mt-4">
                    <p className="text-[11px] uppercase tracking-widest text-surface-600 font-semibold mb-1">{t('trapCaught')}</p>
                    <MdText text={scene.guidance} className="text-sm text-slate-300 leading-relaxed" />
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ── 6 · QUICK CHECK — answers hidden until attempted ── */}
            {scene.kind === 'check' && (
              <CheckScene
                scene={scene}
                onState={s => onCheckScene(idx, s)}
              />
            )}

            {/* ── 7 · FINISH — mastery movement + XP ── */}
            {scene.kind === 'finish' && (
              <motion.div variants={stagger} initial="hidden" animate="show" className="text-center py-6">
                <motion.div
                  variants={riseItem}
                  className="text-6xl mb-6"
                  animate={{ scale: [1, 1.08, 1], rotate: [0, -4, 4, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2.4 }}
                  aria-hidden="true"
                >
                  🏆
                </motion.div>
                <motion.h2 variants={riseItem} className="font-display text-3xl sm:text-4xl font-black text-white mb-2">
                  {t('completeTitle')}
                </motion.h2>
                <motion.p variants={riseItem} className="text-sm text-surface-600 mb-8">
                  {t('walkedBeat', { title })}
                </motion.p>

                <motion.div variants={riseItem} className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
                  <div className="glass-card rounded-2xl p-5">
                    <p className="font-display text-3xl font-black text-gold-400">+{xp}</p>
                    <p className="text-[11px] text-surface-600 mt-1 uppercase tracking-widest">{t('xpEarned')}</p>
                  </div>
                  <div className="glass-card rounded-2xl p-5">
                    <p className="font-display text-3xl font-black text-mint-300">{strongCount}<span className="text-lg text-surface-600">/{totalQuestions}</span></p>
                    <p className="text-[11px] text-surface-600 mt-1 uppercase tracking-widest">{t('checksStrong')}</p>
                  </div>
                </motion.div>

                <motion.div variants={riseItem} className="glass-card rounded-2xl p-5 max-w-sm mx-auto mb-8 text-left">
                  <div className="flex justify-between items-baseline text-xs mb-2">
                    <span className="text-surface-600 uppercase tracking-widest">{t('masteryMovement')}</span>
                    <span className="text-gold-300 font-mono">0% → {masteryPct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${masteryPct}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                    />
                  </div>
                  <p className="text-[11px] text-surface-600 mt-2 leading-relaxed">
                    {attemptedCount === 0
                      ? t('finishZero')
                      : strongCount === totalQuestions && totalQuestions > 0
                      ? t('finishPerfect')
                      : t('finishMixed')}
                  </p>
                </motion.div>

                {/* EXAMREADY: confidence calibration — the honest arithmetic
                    over the chips the student actually tapped, nothing more. */}
                {calibrationHasData(totalCalib) && (
                  <motion.div
                    variants={riseItem}
                    className="glass-card rounded-2xl p-5 max-w-sm mx-auto mb-8 text-left"
                    data-testid="calibration-summary"
                  >
                    <p className="text-[11px] uppercase tracking-widest text-surface-600 font-semibold mb-1.5">
                      {t('calibTitle')}
                    </p>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {[
                        totalCalib.confident.total > 0
                          ? t('calibConfident', { right: totalCalib.confident.right, total: totalCalib.confident.total })
                          : null,
                        totalCalib.guess.total > 0
                          ? t('calibGuess', { right: totalCalib.guess.right, total: totalCalib.guess.total })
                          : null,
                      ].filter(Boolean).join(' · ')}
                    </p>
                  </motion.div>
                )}

                {/* Answer-writing tip — one curated board tip per visit */}
                {answerTip && (
                  <motion.div
                    variants={riseItem}
                    className="rounded-2xl p-5 max-w-sm mx-auto mb-8 text-left border border-gold-500/25 bg-gold-500/[0.06]"
                    data-testid="answer-tip"
                  >
                    <p className="text-[11px] uppercase tracking-widest text-gold-300 font-semibold mb-1.5">
                      {t('tipTitle')}
                    </p>
                    <p className="text-sm text-slate-200 leading-relaxed">{answerTip}</p>
                  </motion.div>
                )}

                {/* EXAMREADY: "Today I learned" — a keepable revision card
                    built only from the beats this story taught. Saved to the
                    device's library; revisited from the dashboard. */}
                <TodayILearnedCard
                  topicId={topicId}
                  enrichment={enrichment}
                  title={title}
                  hook={scene.cardHook}
                  steps={scene.cardSteps}
                  trap={scene.cardTrap}
                />

                {/* §10 transfer — the deepest retention move the audit found
                    missing: explain it to someone else, then quiz them with
                    the node's own authored questions. "Marked as taught"
                    posts a real activity row, not a vanity flag. */}
                <TeachItCard
                  topicId={topicId}
                  enrichment={enrichment}
                  title={title}
                  hook={scene.cardHook}
                />

                <motion.div variants={riseItem} className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/practice" className="btn-primary text-sm px-6 py-3">
                    {t('practiceThis')}
                  </Link>
                  <button
                    onClick={() => setDoubtOpen(true)}
                    className="btn-ghost text-sm px-6 py-3"
                  >
                    {t('stillDoubt')}
                  </button>
                  <Link href={`/learn/${topicId}`} className="btn-ghost text-sm px-6 py-3">
                    {t('backLesson')}
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── navigation ── */}
        {!isLast && (
          <div className="flex items-center justify-between mt-10 pb-16">
            <button
              onClick={() => go(idx - 1)}
              disabled={idx === 0}
              className="btn-ghost text-sm px-4 py-2.5 disabled:opacity-30"
            >
              {t('back')}
            </button>
            <button
              onClick={() => setListenMode(m => !m)}
              aria-pressed={listenMode}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${listenMode ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/40' : 'bg-white/5 border border-white/10 text-surface-400'}`}
            >
              {listenMode ? '🔊 listening' : '🔊 listen'}
            </button>
            <button onClick={() => go(idx + 1)} className="btn-primary text-sm px-8 py-3">
              {scene.kind === 'hook' ? t('begin') : scenes[idx + 1]?.kind === 'finish' ? t('seeResults') : t('next')}
              <svg className="inline ml-2 -mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        )}
      </main>

      {/* ── Doubt→Story loop: the ask UI, anchored to this story ── */}
      <AnimatePresence>
        {doubtOpen && (
          <DoubtPanel topicId={topicId} title={title} onClose={() => setDoubtOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── "Got a doubt?" panel — the ask UI pre-seeded with the story's topic ────

/**
 * Story→doubt bridge. The input is pre-seeded with the story's own title
 * (never the raw node id), so the question the student sends carries the
 * topic's distinctive terms and the tutor's subject-anchored teach lane
 * resolves it to the node the student is actually looking at. The answer
 * renders through AskResponseCard — the same honest lanes as every other
 * ask surface (teach / verified / guided refusal; no invented content).
 */
function DoubtPanel({
  topicId, title, onClose,
}: {
  topicId: string;
  title: string;
  onClose: () => void;
}) {
  const t = useTranslations('story');
  const [question, setQuestion] = useState(`${title} `);
  const [asking, setAsking] = useState(false);
  const [res, setRes] = useState<AskResponse | null>(null);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // focus + put the caret after the pre-seeded topic context
  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    }
  }, []);

  const ask = () => {
    const q = question.trim();
    if (!q || asking) return;
    setAsking(true);
    setFailed(false);
    setRes(null);
    fetch('/api/tutor-graph/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // class_level (GRADE-MAP fix): scope the tutor's teach lane to the
      // signed-in student's OWN class — a Class 6 doubt is never taught
      // from a Class 10-12 node.
      body: JSON.stringify({
        student_id: tutorStudentId(),
        question: q,
        class_level: tutorUserClassLevel(),
      }),
      signal: AbortSignal.timeout(90000),
    })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: AskResponse) => setRes(d))
      .catch(() => setFailed(true))
      .finally(() => setAsking(false));
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-label={t('askDoubtAria')}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full sm:max-w-xl max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl glass-card border border-gold-500/25 p-6 sm:p-7"
        data-testid="doubt-panel"
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-300 mb-1">
              {t('panelTitle')}
            </p>
            <p className="font-display text-lg font-bold text-white truncate">{title}</p>
          </div>
          <button
            onClick={onClose}
            aria-label={t('closeAria')}
            className="btn-ghost px-2 py-1 shrink-0 text-surface-600 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <textarea
          ref={inputRef}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              ask();
            }
          }}
          rows={3}
          data-testid="doubt-input"
          placeholder={t('placeholder')}
          className="w-full rounded-xl bg-white/[0.04] border border-white/10 focus:border-gold-500/50 outline-none px-4 py-3 text-sm text-white placeholder:text-surface-600 resize-none"
        />
        <p className="text-[11px] text-surface-600 mt-2 mb-3 leading-relaxed">
          Your question carries the topic&apos;s name, so the answer stays anchored to this
          story — answered from the same verified lesson, never invented.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={ask}
            disabled={asking || !question.trim()}
            data-testid="doubt-ask"
            className="btn-primary text-sm px-6 py-2.5 disabled:opacity-40"
          >
            {asking ? t('thinking') : t('askTutor')}
          </button>
          {asking && (
            <motion.span
              className="w-5 h-5 rounded-full border-2 border-gold-500/30 border-t-gold-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              aria-label={t('askingAria')}
            />
          )}
        </div>

        {(res || failed) && (
          <div className="mt-5" data-testid="doubt-answer">
            {res ? (
              <AskResponseCard res={res} />
            ) : (
              <div className="rounded-3xl border border-amber-500/25 bg-amber-500/[0.06] px-5 py-4">
                <p className="text-sm leading-relaxed text-white/85">
                  I couldn&apos;t reach the tutor just now — please try again in a moment.
                  I&apos;d rather admit that than guess.
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── THE IDEA: definition with key terms + tappable numbered steps ──────────

function IdeaScene({
  scene, terms, Diagram, diagramKey,
}: {
  scene: Extract<Scene, { kind: 'idea' }>;
  terms: string[];
  Diagram?: React.ComponentType<StoryDiagramProps>;
  diagramKey: string;
}) {
  const [active, setActive] = useState(0);
  const step = scene.steps[active] ?? '';

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.div variants={riseItem} className="glass-card rounded-2xl p-6 sm:p-8 border-l-4 border-brand-400">
        <p className="text-[11px] uppercase tracking-widest text-brand-300 font-semibold mb-3">Definition</p>
        <RichText text={scene.definition} terms={terms} className="font-display text-lg sm:text-2xl font-semibold text-white leading-relaxed" />
      </motion.div>

      {scene.steps.length > 1 && (
        <motion.div variants={riseItem}>
          {Diagram && (
            <VisualBoundary resetKey={diagramKey} fallback={null}>
              <div className="mb-4">
                <Diagram type="generic-flow" data={{ steps: flowLabels(scene.steps) }} />
              </div>
            </VisualBoundary>
          )}
          <p className="text-[11px] uppercase tracking-widest text-surface-600 font-semibold mb-3">
            Walk through it — tap a step
          </p>
          <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Walkthrough steps">
            {scene.steps.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`w-9 h-9 rounded-xl font-display text-sm font-bold border transition-all ${
                  i === active
                    ? 'bg-gold-500/15 border-gold-400/60 text-gold-300 shadow-glow-warm'
                    : 'bg-white/[0.03] border-white/[0.08] text-surface-600 hover:text-slate-200 hover:border-white/20'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="glass-card rounded-2xl p-5 sm:p-6 min-h-[7rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="text-base sm:text-lg text-slate-100 leading-relaxed"
              >
                <span className="font-display text-gold-400/70 font-bold mr-2">{String(active + 1).padStart(2, '0')}</span>
                {step}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── WORKED EXAMPLE: a board-style answer, one labelled part at a time,
//     then "Your turn" — the same problem with the reasoning faded into
//     key blanks the student fills and checks against the authored answer ──

/**
 * The authored example (PROBLEM / STEPS / REASONING / ANSWER) plus the
 * node's own authored definition are exactly the sections a CBSE board
 * answer earns with: Definition → working steps → reasoning → final answer.
 * When the authored content supports that split (≥3 earning parts), every
 * revealed part carries a chip naming what it earns. When it doesn't, the
 * example is shown plainly — no labels, no invented marks (Story Mode has
 * no authored marks figure; numeric per-step marks appear only in practice,
 * where the platform carries the authored marking data).
 */
function ExampleScene({
  scene, definition, Diagram, diagramKey, vocabTerms,
}: {
  scene: Extract<Scene, { kind: 'example' }>;
  definition: string | null;
  Diagram?: React.ComponentType<StoryDiagramProps>;
  diagramKey: string;
  vocabTerms: string[];
}) {
  const { example: ex } = scene;
  const t = useTranslations('story');
  const [revealed, setRevealed] = useState(0);
  const done = revealed >= ex.steps.length;

  // Split derived ONLY from authored sections; [] → plain presentation.
  const parts = useMemo(
    () => buildBoardAnswerParts({
      definition,
      steps: ex.steps,
      reasoning: ex.reasoning,
      answer: ex.answer,
    }),
    [definition, ex.steps, ex.reasoning, ex.answer]
  );
  const boardMode = parts.length > 0;
  const partRole = (role: BoardPart['role'], stepNo?: number): string => {
    switch (role) {
      case 'definition': return t('roleDefinition');
      case 'working': return t('roleStep', { n: stepNo ?? 0 });
      case 'reasoning': return t('roleReasoning');
      case 'answer': return t('roleAnswer');
    }
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
      <motion.div variants={riseItem} className="glass-card rounded-2xl p-6 sm:p-8 border-l-4 border-mint-400">
        <p className="text-[11px] uppercase tracking-widest text-mint-300 font-semibold mb-2">Problem</p>
        <RichText text={ex.problem} className="text-base sm:text-lg text-white leading-relaxed" />
      </motion.div>

      {boardMode && (
        <motion.div variants={riseItem} className="rounded-2xl p-5 sm:p-6 border border-mint-500/25 bg-mint-500/[0.04]">
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <p className="text-[11px] uppercase tracking-widest text-mint-300 font-semibold">{t('boardTitle')}</p>
            {done && (
              <span className="text-[11px] font-mono text-mint-300/80 shrink-0" data-testid="board-parts-count">
                {parts.length} {t('boardPartsUnit')}
              </span>
            )}
          </div>
          <p className="text-xs text-surface-600 leading-relaxed mb-4">{t('boardNote')}</p>

          <div className="space-y-3" data-testid="board-answer-parts">
            {/* Definition — the authored definition is part one of the answer */}
            {parts.filter(p => p.role === 'definition').map((p, i) => (
              <BoardPartRow key={`def-${i}`} chip={partRole('definition')} tone="brand">
                <RichText text={p.text} className="text-sm text-slate-100 leading-relaxed" />
              </BoardPartRow>
            ))}

            {/* Working — authored example steps, revealed one at a time */}
            {parts.filter(p => p.role === 'working').slice(0, revealed).map(p => (
              <BoardPartRow
                key={`step-${p.stepNo}`}
                chip={partRole('working', p.stepNo)}
                tone="mint"
              >
                <RichText text={p.text} className="text-sm text-slate-100 leading-relaxed" />
              </BoardPartRow>
            ))}

            {/* Reasoning + final answer — land once every step is on paper */}
            {done && parts.filter(p => p.role === 'reasoning' || p.role === 'answer').map((p, i) => (
              p.role === 'reasoning' ? (
                <BoardPartRow key={`rea-${i}`} chip={partRole('reasoning')} tone="plain">
                  <RichText text={p.text} className="text-sm text-slate-200 leading-relaxed" />
                </BoardPartRow>
              ) : (
                <BoardPartRow key={`ans-${i}`} chip={partRole('answer')} tone="mintSolid">
                  <RichText text={p.text} className="font-display text-base font-bold text-white" />
                </BoardPartRow>
              )
            ))}
          </div>

          {!done && (
            <button
              onClick={() => setRevealed(r => r + 1)}
              className="w-full mt-4 py-3 rounded-xl border border-dashed border-mint-500/30 text-mint-300/80 text-sm font-medium hover:bg-mint-500/5 transition"
            >
              {t('revealSteps', { n: revealed + 1, total: ex.steps.length })}
            </button>
          )}
        </motion.div>
      )}

      {/* Plain presentation — the honest fallback when the authored content
          does not split into a board answer */}
      {!boardMode && (
        <>
          {ex.steps.length > 0 && (
            <motion.div variants={riseItem} className="space-y-2.5">
              {ex.steps.slice(0, revealed).map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3 px-1"
                >
                  <span className="shrink-0 w-6 h-6 rounded-full bg-mint-500/15 border border-mint-500/30 text-mint-300 text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <RichText text={step} className="text-sm text-slate-100 leading-relaxed" />
                </motion.div>
              ))}
              {!done && (
                <button
                  onClick={() => setRevealed(r => r + 1)}
                  className="w-full py-3 rounded-xl border border-dashed border-mint-500/30 text-mint-300/80 text-sm font-medium hover:bg-mint-500/5 transition"
                >
                  {t('revealSteps', { n: revealed + 1, total: ex.steps.length })}
                </button>
              )}
            </motion.div>
          )}

          {done && (
            <motion.div variants={riseItem} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              {Diagram && ex.steps.length > 1 && (
                <VisualBoundary resetKey={diagramKey} fallback={null}>
                  <div className="mb-1">
                    <Diagram type="generic-flow" data={{ steps: flowLabels(ex.steps) }} />
                  </div>
                </VisualBoundary>
              )}
              {ex.reasoning && (
                <div className="glass-card rounded-xl p-4">
                  <p className="text-[11px] uppercase tracking-widest text-surface-600 font-semibold mb-1">Why it works</p>
                  <RichText text={ex.reasoning} className="text-sm text-slate-200 leading-relaxed" />
                </div>
              )}
              {ex.answer && (
                <div className="rounded-xl p-4 bg-mint-500/10 border border-mint-500/30">
                  <p className="text-[11px] uppercase tracking-widest text-mint-300 font-semibold mb-1">Answer</p>
                  <RichText text={ex.answer} className="font-display text-lg font-bold text-white" />
                </div>
              )}
            </motion.div>
          )}
        </>
      )}

      {/* "Your turn" — once the full solution is on the table (either the
          board-answer layout or the plain one), and only when the authored
          steps give us something honest to fade into blanks. */}
      {done && ex.steps.length > 0 && (
        <YourTurnSection example={ex} vocabTerms={vocabTerms} />
      )}
    </motion.div>
  );
}

/** One labelled part of a board-style answer. */
function BoardPartRow({
  chip, tone, children,
}: {
  chip: string;
  tone: 'brand' | 'mint' | 'plain' | 'mintSolid';
  children: ReactNode;
}) {
  const toneCls: Record<typeof tone, string> = {
    brand: 'bg-brand-500/10 border-brand-400/40 text-brand-300',
    mint: 'bg-mint-500/10 border-mint-500/40 text-mint-300',
    plain: 'bg-white/[0.04] border-white/10 text-surface-600',
    mintSolid: 'bg-mint-500/15 border-mint-500/50 text-mint-200',
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="flex items-start gap-3"
    >
      <span
        className={`shrink-0 min-w-[4.5rem] text-center px-2 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${toneCls[tone]}`}
        data-testid="board-part-chip"
      >
        {chip}
      </span>
      <div className="flex-1 pt-0.5">{children}</div>
    </motion.div>
  );
}

// ─── EXPLORE: "feel it" — matching sims_v2 sim embedded, honest fallback ────

/**
 * The v3 engine loads as its own chunk, and only when an explore scene
 * actually has a sim to embed — the story route never pays for it otherwise.
 */
const SimPlayer = dynamic(
  () => import('@/components/sims_v2/engine/SimPlayer').then(m => m.SimPlayer),
  { ssr: false }
);

function ExploreScene({
  simMeta, diagram, beats, definition, Diagram,
}: {
  simMeta: SimMeta | null | undefined;
  diagram: StoryDiagramSpec;
  beats: string[];
  definition: string;
  Diagram?: React.ComponentType<StoryDiagramProps>;
}) {
  const t = useTranslations('story');

  return (
    <motion.div variants={stagger} initial="hidden" animate="show">
      <motion.div variants={riseItem}>
        {simMeta === undefined && (
          <div className="glass-card rounded-2xl p-6" data-testid="story-explore-loading" role="status">
            <div className="flex items-center gap-3">
              <motion.span
                className="w-5 h-5 rounded-full border-2 border-sky-400/30 border-t-sky-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              />
              <p className="text-sm text-surface-600">{t('exploreLoading')}</p>
            </div>
          </div>
        )}

        {simMeta && <SimEmbedCard meta={simMeta} />}

        {simMeta === null && (
          <div className="glass-card rounded-2xl p-5 sm:p-8 border-l-4 border-sky-400/70" data-testid="story-explore-fallback">
            <p className="font-display text-xl sm:text-2xl font-bold text-white mb-1">
              {t('exploreFallbackTitle')}
            </p>
            <p className="text-xs sm:text-sm text-surface-600 mb-5 leading-relaxed">{t('exploreNoSim')}</p>
            {Diagram && diagram ? (
              <VisualBoundary resetKey="explore" fallback={<BeatCards beats={beats} />}>
                <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-4 sm:p-6">
                  <Diagram type={diagram.type} data={diagram.data} />
                </div>
              </VisualBoundary>
            ) : beats.length ? (
              <BeatCards beats={beats} />
            ) : definition ? (
              <RichText text={definition} className="text-base sm:text-lg text-slate-100 leading-relaxed" />
            ) : null}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/** Honest fallback body: the node's own authored beats as large cards. */
function BeatCards({ beats }: { beats: string[] }) {
  if (!beats.length) return null;
  return (
    <ol className="space-y-3" aria-label="Walkthrough">
      {beats.map((b, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl border border-sky-400/20 bg-sky-400/[0.04] px-4 py-3"
        >
          <span className="shrink-0 w-7 h-7 rounded-lg bg-sky-400/15 border border-sky-400/30 text-sky-300 text-xs font-bold flex items-center justify-center font-display">
            {i + 1}
          </span>
          <RichText text={b} className="text-sm sm:text-base text-slate-100 leading-relaxed" />
        </li>
      ))}
    </ol>
  );
}

/**
 * In-page sim player for the explore scene. The full Def is fetched from
 * /sims/ (the same static packs the /sims-v2 route uses); a failed fetch
 * degrades to a rich card linking to the sim's own page — never a dead
 * frame, never a wrong-subject guess. Width tracks the card via
 * ResizeObserver so the embed is flawless from 390px to desktop.
 */
function SimEmbedCard({ meta }: { meta: SimMeta }) {
  const t = useTranslations('story');
  const [def, setDef] = useState<SimDef | null | undefined>(undefined);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(680);
  const user = useAuthStore(s => s.user);

  useEffect(() => {
    let alive = true;
    import('@/components/sims_v2/lite')
      .then(m => m.loadSimDef(meta.id))
      .then(d => { if (alive) setDef((d as SimDef) ?? null); })
      .catch(() => { if (alive) setDef(null); });
    return () => { alive = false; };
  }, [meta.id]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const w = Math.floor(e.contentRect.width);
        if (w > 120) setWidth(w);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // SimAnswerEvent → AttemptLog, exactly like the /sims-v2 route — the
  // story embed feeds the same interaction trail (best-effort only).
  const logEvent = (ev: SimAnswerEvent) => {
    api.post('/api/intelligence/interaction', {
      student_id: (user as { id?: string | number } | null)?.id ?? 'anon',
      node_id: ev.nodeId ?? ev.simId,
      question: `${ev.simId}#${ev.challengeId ?? ev.challengeIndex}`,
      response: ev.confidence ? `confidence:${ev.confidence}` : ev.challengeType,
      is_correct: ev.correct,
      time_spent_ms: ev.responseMs ?? 0,
      hints_used: ev.attempts ?? 0,
      action_taken: ev.challengeType,
      mastery_before: ev.masteryBefore ?? 0,
      mastery_after: ev.masteryAfter ?? 0,
      session_id: ev.sessionId,
    }).catch(() => { /* telemetry must never break the sim */ });
  };

  return (
    <div
      className="rounded-2xl border border-sky-400/25 bg-sky-400/[0.05] overflow-hidden"
      data-testid="story-sim-embed"
    >
      <div className="flex items-start justify-between gap-3 px-4 sm:px-5 pt-4">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-widest text-sky-400 font-semibold mb-1">
            {t('exploreBadge')}
          </p>
          <p className="font-display text-base sm:text-lg font-bold text-white leading-snug">{meta.t}</p>
          <p className="text-xs text-surface-600 mt-1 leading-relaxed">{meta.d}</p>
        </div>
        <Link
          href={`/sims-v2/${meta.id}`}
          className="btn-ghost shrink-0 text-[11px] px-2.5 py-1.5 text-sky-300 hover:text-sky-200 border border-sky-400/30 rounded-lg"
        >
          {t('exploreOpen')} <span aria-hidden="true">↗</span>
        </Link>
      </div>

      <div ref={wrapRef} className="p-3 sm:p-4">
        {def === undefined && (
          <div className="flex items-center justify-center gap-3 py-14" role="status">
            <motion.span
              className="w-5 h-5 rounded-full border-2 border-sky-400/30 border-t-sky-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              aria-hidden="true"
            />
            <p className="text-sm text-surface-600">{t('exploreLoading')}</p>
          </div>
        )}

        {def && (
          <SimPlayer
            def={def}
            mode={meta.c >= 6 ? 'senior' : 'junior'}
            width={width}
            height={560}
            onEvent={logEvent}
          />
        )}

        {def === null && (
          <div className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] px-4 py-3">
            <p className="text-xs text-white/85 leading-relaxed mb-2">{t('exploreInlineFail')}</p>
            <Link href={`/sims-v2/${meta.id}`} className="text-xs font-semibold text-sky-300 hover:text-sky-200 underline underline-offset-2">
              {t('exploreOpen')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── "YOUR TURN": the authored steps, faded into key blanks ─────────────────

/**
 * Worked-example fading. The solved example above stays intact; below it,
 * the same authored steps come back with their key values hidden. The
 * student fills them from memory, taps check, and every blank is compared
 * against the authored token (exact-match, numbers compared numerically so
 * 1/2 equals 0.5). Mismatches are shown with the worked answer right next
 * to them — honest grading, nothing faked, nothing persisted, no XP claimed.
 */
function YourTurnSection({
  example, vocabTerms,
}: {
  example: ParsedExample;
  vocabTerms: string[];
}) {
  const t = useTranslations('story');
  const steps = useMemo(
    () => buildYourTurnSteps(example.steps, vocabTerms),
    [example.steps, vocabTerms]
  );
  const blankCount = useMemo(
    () => steps.reduce((n, s) => n + s.parts.filter(p => p.blank).length, 0),
    [steps]
  );
  const [vals, setVals] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const results = useMemo(() => {
    if (!checked) return null;
    const r: Record<number, boolean> = {};
    let good = 0;
    for (const st of steps) {
      for (const p of st.parts) {
        if (!p.blank) continue;
        const ok = blankMatches(vals[p.blank.id] || '', p.blank.token);
        r[p.blank.id] = ok;
        if (ok) good += 1;
      }
    }
    return { r, good, total: blankCount };
  }, [checked, steps, vals, blankCount]);

  if (!steps.length || blankCount === 0) return null;

  return (
    <motion.div
      variants={riseItem}
      className="rounded-2xl border border-gold-500/25 bg-gold-500/[0.05] p-5 sm:p-6"
      data-testid="your-turn"
    >
      <p className="text-[11px] uppercase tracking-widest text-gold-300 font-semibold mb-1">
        ✍️ {t('yourTurnTitle')}
      </p>
      <p className="text-xs text-surface-600 mb-4 leading-relaxed">{t('yourTurnIntro')}</p>

      <ol className="space-y-2.5">
        {steps.map((st, i) => st.revealOnly ? (
          <li key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            {revealed[i] ? (
              <div className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 text-surface-600 text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <RichText text={example.steps[i]} className="text-sm text-slate-100 leading-relaxed" />
              </div>
            ) : (
              <button
                onClick={() => setRevealed(r => ({ ...r, [i]: true }))}
                className="w-full py-2 rounded-lg border border-dashed border-gold-500/30 text-gold-300/80 text-xs font-medium hover:bg-gold-500/5 transition"
              >
                {t('yourTurnRevealStep', { n: i + 1 })}
              </button>
            )}
          </li>
        ) : (
          <li key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-slate-100 leading-[2.1] min-w-0">
                {st.parts.map((p, pi) => {
                  const blank = p.blank;
                  if (!blank) return <RichText key={pi} text={p.text} className="text-sm text-slate-100" />;
                  return (
                    <span key={pi} className="inline-flex items-center gap-1 mx-0.5 whitespace-nowrap align-baseline">
                      <input
                        value={vals[blank.id] || ''}
                        onChange={e => setVals(v => ({ ...v, [blank.id]: e.target.value }))}
                        disabled={checked}
                        aria-label={t('yourTurnBlankAria', { step: i + 1, n: blank.n })}
                        data-testid="your-turn-blank"
                        autoComplete="off"
                        className={`inline-block rounded-md border px-2 py-0.5 text-sm outline-none bg-black/30 disabled:opacity-90 ${
                          checked
                            ? results?.r[blank.id]
                              ? 'border-mint-500/50 text-mint-200'
                              : 'border-red-500/50 text-red-200'
                            : 'border-gold-500/40 focus:border-gold-400 text-white'
                        }`}
                        style={{ width: `${Math.max(4.5, blank.token.length + 1.5)}ch` }}
                      />
                      {checked && (
                        results?.r[blank.id] ? (
                          <span className="text-mint-300 text-xs font-bold" aria-label="matches">✓</span>
                        ) : (
                          <span className="text-red-300 text-[11px] font-semibold" data-testid="your-turn-expected">
                            {t('yourTurnExpect', { ans: blank.token })}
                          </span>
                        )
                      )}
                    </span>
                  );
                })}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-4">
        {!checked ? (
          <button
            onClick={() => setChecked(true)}
            disabled={Object.values(vals).every(v => !v.trim())}
            data-testid="your-turn-check"
            className="btn-primary text-sm px-6 py-2.5 disabled:opacity-40"
          >
            {t('yourTurnCheck')}
          </button>
        ) : (
          <button
            onClick={() => { setVals({}); setChecked(false); setRevealed({}); }}
            data-testid="your-turn-reset"
            className="btn-ghost text-sm px-5 py-2.5"
          >
            {t('yourTurnReset')}
          </button>
        )}
      </div>

      {results && (
        <div
          data-testid="your-turn-result"
          className={`mt-3 rounded-xl px-4 py-3 border text-sm leading-relaxed ${
            results.good === results.total
              ? 'bg-mint-500/10 border-mint-500/30 text-mint-200'
              : 'bg-white/[0.02] border-white/[0.08] text-slate-300'
          }`}
        >
          {results.good === results.total ? t('yourTurnAllGood') : t('yourTurnSomeOff')}
        </div>
      )}

      <p className="text-[11px] text-surface-600 mt-3 leading-relaxed">{t('yourTurnExactNote')}</p>
    </motion.div>
  );
}

// ─── QUICK CHECK: inline diagnostics, answers hidden until attempted ────────

/**
 * One scene holds every diagnostic question for the node, collapsed to its
 * question. Options (when the corpus serves them) grade on resolve; free-text
 * questions use a commit-first reveal plus honest self-assessment.
 *
 * EXAMREADY confidence chips: after committing an answer and BEFORE the
 * correct answer is revealed, the student may tap "Confident" / "Just
 * guessing" (or skip). The tap is recorded client-side only — it feeds the
 * finish screen's calibration line and NEVER changes what counts as strong.
 */
function CheckScene({
  scene, onState,
}: {
  scene: Extract<Scene, { kind: 'check' }>;
  onState: (s: { attemptedCount: number; strongCount: number; calib: Calibration }) => void;
}) {
  const [state, setState] = useState<{
    picked: (number | null)[];
    revealed: boolean[];
    strong: (boolean | null)[];
    /** answer committed; waiting for the (skippable) confidence tap */
    pending: boolean[];
    confidence: (Confidence | null)[];
  }>({
    picked: scene.questions.map(() => null),
    revealed: scene.questions.map(() => false),
    strong: scene.questions.map(() => null),
    pending: scene.questions.map(() => false),
    confidence: scene.questions.map(() => null),
  });

  // Compute the next state first, then notify the parent from the event
  // handler — a parent setState must never run inside our state updater
  // (React forbids updating another component while rendering this one).
  const update = (patch: Partial<typeof state>) => {
    const next = { ...state, ...patch };
    setState(next);
    const cal = emptyCalibration();
    next.confidence.forEach((c, i) => { tallyCalibration(cal, c, next.strong[i]); });
    onState({
      attemptedCount: next.revealed.filter(Boolean).length,
      strongCount: next.strong.filter(s => s === true).length,
      calib: cal,
    });
  };

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
      {scene.questions.map((q, qi) => (
        <CheckCard
          key={qi}
          q={q}
          index={qi}
          picked={state.picked[qi]}
          revealed={state.revealed[qi]}
          strong={state.strong[qi]}
          pending={state.pending[qi]}
          onPick={optIdx => {
            const picked = [...state.picked];
            picked[qi] = optIdx;
            const pending = [...state.pending];
            pending[qi] = true;
            update({ picked, pending });
          }}
          onCommit={() => {
            const pending = [...state.pending];
            pending[qi] = true;
            update({ pending });
          }}
          onResolve={conf => {
            const revealed = [...state.revealed];
            revealed[qi] = true;
            const pending = [...state.pending];
            pending[qi] = false;
            const confidence = [...state.confidence];
            confidence[qi] = conf;
            const strong = [...state.strong];
            // Grade the MCQ pick at resolve time (the reveal moment) — the
            // confidence tap never influences what counts as correct.
            if (q.options.length) strong[qi] = state.picked[qi] === correctOption(q);
            update({ revealed, pending, confidence, strong });
          }}
          onSelfAssess={v => {
            const strong = [...state.strong];
            strong[qi] = v;
            update({ strong });
          }}
        />
      ))}
    </motion.div>
  );
}

/** Match the authored answer's leading text against the served options. */
function correctOption(q: PreparedQuestion): number {
  if (!q.options.length) return -1;
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const head = norm(q.modelAnswer.split(/[.!(]/)[0] || q.modelAnswer);
  return q.options.findIndex(o => {
    const n = norm(o);
    return (n && (n.startsWith(head.slice(0, 24)) || head.startsWith(n.slice(0, 24)))) || n === head;
  });
}

function CheckCard({
  q, index, picked, revealed, strong, pending, onPick, onCommit, onResolve, onSelfAssess,
}: {
  q: PreparedQuestion;
  index: number;
  picked: number | null;
  revealed: boolean;
  strong: boolean | null;
  /** Answer committed — the (skippable) confidence chips are up. */
  pending: boolean;
  onPick: (optIdx: number) => void;
  onCommit: () => void;
  onResolve: (c: Confidence | null) => void;
  onSelfAssess: (v: boolean) => void;
}) {
  const t = useTranslations('story');
  const hasOptions = q.options.length > 0;
  const correctIdx = hasOptions ? correctOption(q) : -1;

  return (
    <motion.div variants={riseItem} className="glass-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-start gap-3 mb-3">
        <span className={`shrink-0 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center font-display ${
          strong === true
            ? 'bg-mint-500/15 border border-mint-500/30 text-mint-300'
            : revealed
            ? 'bg-red-500/10 border border-red-500/30 text-red-300'
            : 'bg-gold-500/15 border border-gold-500/30 text-gold-300'
        }`}>
          {index + 1}
        </span>
        <RichText text={q.question} className="font-display text-base sm:text-lg font-semibold text-white leading-relaxed" />
      </div>

      {!revealed ? (
        hasOptions ? (
          picked === null ? (
            <div className="mt-3 space-y-2" role="radiogroup" aria-label={t('questionOptionsAria', { n: index + 1 })}>
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  role="radio"
                  aria-checked={picked === oi}
                  onClick={() => onPick(oi)}
                  className="w-full text-left px-4 py-3 rounded-xl border text-sm bg-white/[0.03] border-white/[0.08] text-slate-100 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all"
                >
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-bold mr-3">
                    {String.fromCharCode(65 + oi)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            /* picked — confidence chips BEFORE the reveal */
            <ConfidenceChips onResolve={onResolve} />
          )
        ) : !pending ? (
          <div className="mt-3">
            <button
              onClick={onCommit}
              className="w-full py-3 rounded-xl border border-dashed border-gold-500/40 text-gold-300 font-medium text-sm hover:bg-gold-500/5 transition"
            >
              {t('commitBtn')}
            </button>
            <p className="text-[11px] text-surface-600 mt-2 text-center">{t('commitNote')}</p>
          </div>
        ) : (
          <ConfidenceChips onResolve={onResolve} />
        )
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3 space-y-3">
          {hasOptions && (
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const isCorrect = oi === correctIdx;
                const isPicked = picked === oi;
                return (
                  <div
                    key={oi}
                    aria-hidden="true"
                    className={`w-full text-left px-4 py-3 rounded-xl border text-sm ${
                      isCorrect
                        ? 'bg-mint-500/10 border-mint-500/40 text-mint-300'
                        : isPicked
                        ? 'bg-red-500/10 border-red-500/40 text-red-300'
                        : 'bg-white/[0.02] border-white/[0.06] text-surface-600'
                    }`}
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-bold mr-3">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    {opt}
                    {isCorrect && <span className="ml-2">{t('optCorrect')}</span>}
                    {isPicked && !isCorrect && <span className="ml-2">{t('optYourPick')}</span>}
                  </div>
                );
              })}
            </div>
          )}

          <div className="rounded-xl p-4 bg-gold-500/[0.08] border border-gold-500/25">
            <p className="text-[11px] uppercase tracking-widest text-gold-300 font-semibold mb-1">{t('modelAnswer')}</p>
            <RichText text={q.modelAnswer} className="text-sm text-slate-100 leading-relaxed" />
          </div>

          {q.wrongNote && (
            <div className="rounded-xl p-4 bg-white/[0.02] border border-white/[0.06]">
              <p className="text-[11px] uppercase tracking-widest text-surface-600 font-semibold mb-1">{t('ifYoursOff')}</p>
              <MdText text={q.wrongNote.replace(/^A wrong answer[^:]*:\s*/i, '')} className="text-sm text-slate-400 leading-relaxed" />
            </div>
          )}

          {!hasOptions && strong === null && (
            <div className="flex gap-3">
              <button onClick={() => onSelfAssess(true)} className="flex-1 py-2.5 rounded-xl bg-mint-500/10 border border-mint-500/30 text-mint-300 text-sm font-medium hover:bg-mint-500/20 transition">
                {t('hadIt')}
              </button>
              <button onClick={() => onSelfAssess(false)} className="flex-1 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-surface-600 text-sm font-medium hover:text-white transition">
                {t('notYet')}
              </button>
            </div>
          )}
          {strong === true && <p className="text-sm font-medium text-mint-300">{t('strongCounted')}</p>}
          {strong === false && <p className="text-sm font-medium text-gold-300">{t('notedReplay')}</p>}
        </motion.div>
      )}
    </motion.div>
  );
}

// ─── EXAMREADY confidence chips — the skippable pre-reveal self-check ───────

/**
 * "Confident / Just guessing", one tap, or skip. Rendered between committing
 * an answer and the reveal, in Quick Check. Display-only: the tap feeds the
 * finish screen's calibration line and never the grading (which runs on the
 * pick / self-assess exactly as before).
 */
function ConfidenceChips({ onResolve }: { onResolve: (c: Confidence | null) => void }) {
  const t = useTranslations('story');
  return (
    <div className="mt-3" data-testid="story-confidence-row">
      <p className="text-xs text-surface-600 mb-2">{t('confTitle')}</p>
      <div className="flex gap-2">
        <button
          onClick={() => onResolve('confident')}
          data-testid="story-chip-confident"
          className="flex-1 py-2.5 rounded-xl bg-mint-500/10 border border-mint-500/30 text-mint-300 text-sm font-medium hover:bg-mint-500/20 transition"
        >
          {t('confChipConfident')}
        </button>
        <button
          onClick={() => onResolve('guess')}
          data-testid="story-chip-guess"
          className="flex-1 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-surface-600 text-sm font-medium hover:text-white transition"
        >
          {t('confChipGuess')}
        </button>
        <button
          onClick={() => onResolve(null)}
          data-testid="story-chip-skip"
          aria-label={t('confSkipAria')}
          className="px-4 py-2.5 rounded-xl text-surface-600 text-xs font-medium hover:text-slate-300 transition"
        >
          {t('confChipSkip')}
        </button>
      </div>
      <p className="text-[11px] text-surface-600 mt-1.5">{t('confNote')}</p>
    </div>
  );
}

// ─── EXAMREADY "Today I learned" — the keepable revision card ────────────────

/**
 * The story, compressed onto one card: the hook (in simple words), up to
 * three authored walkthrough steps, and the misconception trap. Every line
 * is copied from the beats this same story already showed — nothing written
 * fresh. "Keep it" stores the card in the device's localStorage library;
 * the dashboard lists the library under "My revision cards".
 */
function TodayILearnedCard({
  topicId, enrichment, title, hook, steps, trap,
}: {
  topicId: string;
  enrichment: Enrichment;
  title: string;
  hook: string;
  steps: string[];
  trap: string | null;
}) {
  const t = useTranslations('story');
  // Resolved after mount so SSR and the first client render agree.
  const [saved, setSaved] = useState(false);
  useEffect(() => { setSaved(!!getRevisionCard(topicId)); }, [topicId]);

  const keep = () => {
    saveRevisionCard({
      nodeId: topicId,
      title,
      subject: subjectName(enrichment.subject),
      classLevel: enrichment.class_level,
      hook,
      steps,
      trap,
      savedAt: Date.now(),
    });
    setSaved(true);
  };

  if (!hook && !steps.length && !trap) return null;

  return (
    <motion.div
      variants={riseItem}
      className="rounded-2xl p-5 sm:p-6 max-w-sm mx-auto mb-8 text-left border border-brand-400/30 bg-brand-500/[0.05]"
      data-testid="til-card"
    >
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <p className="text-[11px] uppercase tracking-widest text-brand-300 font-semibold">
          {t('tilTitle')}
        </p>
        <span className="text-[10px] text-surface-600 shrink-0">
          {subjectName(enrichment.subject)} · Class {enrichment.class_level}
        </span>
      </div>

      {hook && (
        <div className="mb-3" data-testid="til-hook">
          <p className="text-[10px] uppercase tracking-widest text-surface-600 font-semibold mb-1">{t('tilEli5')}</p>
          <MdText text={hook} className="text-sm text-slate-100 leading-relaxed" />
        </div>
      )}

      {steps.length > 0 && (
        <div className="mb-3">
          <p className="text-[10px] uppercase tracking-widest text-surface-600 font-semibold mb-1">{t('tilSteps')}</p>
          <ol className="space-y-1.5">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-200 leading-relaxed">
                <span className="shrink-0 font-display text-gold-400/70 font-bold">{i + 1}.</span>
                <MdText text={s} />
              </li>
            ))}
          </ol>
        </div>
      )}

      {trap && (
        <div className="rounded-xl px-3.5 py-2.5 bg-red-500/[0.07] border border-red-500/25 mb-3" data-testid="til-trap">
          <p className="text-[10px] uppercase tracking-widest text-red-300 font-semibold mb-1">{t('tilTrap')}</p>
          <MdText text={trap} className="text-xs text-slate-200 leading-relaxed" />
        </div>
      )}

      <div className="flex items-center gap-3">
        {!saved ? (
          <button
            onClick={keep}
            data-testid="til-save"
            className="btn-primary text-xs px-4 py-2.5"
          >
            {t('tilSave')}
          </button>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-mint-300" data-testid="til-saved">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
            {t('tilSaved')}
          </span>
        )}
        <Link
          href="/dashboard"
          data-testid="til-library-link"
          className="text-xs font-medium text-surface-600 hover:text-slate-300 transition"
        >
          {t('tilLibraryLink')}
        </Link>
      </div>
    </motion.div>
  );
}

// ─── §10 "Teach it" — the transfer card ──────────────────────────────────────

/**
 * Learning-by-teaching: explain the topic to a real person (parent, friend,
 * sibling) using the story's simple-words hook as the script, then quiz them
 * with the node's own authored diagnostic questions. "I taught it" posts a
 * real ActivityLog row (POST /api/progress/teach-it) so it lands in the
 * child's feed — a failed/absent login shows an honest "sign in to save".
 */
function TeachItCard({
  topicId, enrichment, title, hook,
}: {
  topicId: string;
  enrichment: Enrichment;
  title: string;
  hook: string;
}) {
  const user = useAuthStore((s) => s.user);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'anon' | 'failed'>('idle');

  // Up to three authored diagnostic questions become the "quiz them" prompts.
  const teachQs = (enrichment.diagnostic_questions || [])
    .map((q) => (q?.question || '').trim())
    .filter(Boolean)
    .slice(0, 3)
    .map(scrubNodeIds);

  const mark = async () => {
    if (!user) { setState('anon'); return; }
    setState('saving');
    try {
      await api.post('/api/progress/teach-it', {
        node_id: topicId,
        title,
        subject: enrichment.subject ? subjectName(enrichment.subject) : undefined,
      });
      setState('done');
    } catch {
      setState('failed');
    }
  };

  return (
    <motion.div
      variants={riseItem}
      className="rounded-2xl p-5 sm:p-6 max-w-sm mx-auto mb-8 text-left border border-violet-400/30 bg-violet-500/[0.05]"
      data-testid="teach-card"
    >
      <p className="text-[11px] uppercase tracking-widest text-violet-300 font-semibold mb-2">
        Make it stick — teach it
      </p>
      <p className="text-sm text-slate-200 leading-relaxed mb-3">
        The strongest way to know you understand {title}? Explain it to
        someone — a parent, a friend, even out loud to yourself.
      </p>

      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="btn-secondary w-full text-sm py-2.5"
          data-testid="teach-open"
        >
          Show me how
        </button>
      ) : (
        <>
          {hook && (
            <div className="rounded-xl px-3.5 py-2.5 bg-white/[0.04] border border-white/10 mb-3">
              <p className="text-[10px] uppercase tracking-widest text-surface-600 font-semibold mb-1">
                Start like this
              </p>
              <MdText text={hook} className="text-sm text-slate-100 leading-relaxed" />
            </div>
          )}
          {teachQs.length > 0 && (
            <div className="mb-3">
              <p className="text-[10px] uppercase tracking-widest text-surface-600 font-semibold mb-1.5">
                Then check — could they answer these?
              </p>
              <ul className="space-y-1.5">
                {teachQs.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                    <span className="shrink-0 font-bold text-violet-300">{i + 1}.</span>
                    <MdText text={q} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {state === 'done' ? (
            <p className="text-xs font-medium text-mint-300" data-testid="teach-done">
              ✓ Logged — teaching it counts as real learning.
            </p>
          ) : state === 'anon' ? (
            <p className="text-xs text-surface-600" data-testid="teach-anon">
              Sign in to log it — but the teaching still works, promise.
            </p>
          ) : (
            <button
              onClick={mark}
              disabled={state === 'saving'}
              className="btn-primary w-full text-sm py-2.5 disabled:opacity-50"
              data-testid="teach-mark"
            >
              {state === 'saving' ? 'Saving…' : state === 'failed' ? 'Couldn’t save — try again' : 'I taught it ✓'}
            </button>
          )}
        </>
      )}
    </motion.div>
  );
}
