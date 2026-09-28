'use client';

// ─── Fonts (Plus Jakarta Sans body; Syne via --font-display for headings) ─────

import { sanitizeHtml } from '@/lib/sanitize';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';

// ─── Core React / Framer Motion ───────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import katex from 'katex';

// ─── State ───────────────────────────────────────────────────────────────────

import { create } from 'zustand';

// ─── Offline cache ───────────────────────────────────────────────────────────

import offlineCache from '@/lib/offlineCache';
import { api, getAuthToken, refreshOn401 } from "@/lib/api";
import AuditTrail, { type AuditTrailData } from '@/components/audit/AuditTrail';
import AskHelpPanel from "@/components/student/AskHelpPanel";
import { useAuthStore } from '@/stores/authStore';
import { friendlyNodeTitle, subjectName } from '@/lib/nodeTitle';
import {
  diffAgainstModel, nextAnswerTip, prepareModelAnswer,
} from '@/lib/boardAnswer';
import {
  calibrationHasData, emptyCalibration, fetchRescueHint, isNodeId,
  tallyCalibration, type Calibration, type Confidence,
} from '@/lib/examReady';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

// ─── Constants ───────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

// PLUMB (C8 audit [STUDENT-C8][P2 AUTH-UX]): every authed practice call
// used to stamp the token captured at flow start — a 30+ minute session
// kept sending an EXPIRED bearer (401s mid-practice with no recovery).
// authedFetch reads the CURRENT token per attempt and, on a 401, silently
// exchanges the stored refresh token for a fresh pair (single-flight in
// lib/api) and retries once before the failure surfaces.
async function authedFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const doFetch = () => {
    const token = getAuthToken();
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return fetch(`${API_BASE}${path}`, {
      ...init,
      headers: { ...headers, ...(init.headers as Record<string, string> | undefined) },
    });
  };
  let res = await doFetch();
  if (res.status === 401) {
    const refreshed = await refreshOn401();
    if (refreshed) res = await doFetch();
  }
  return res;
}
const TOTAL_QUESTIONS = 5;
const AUTO_ADVANCE_MS = 2200;
// Free-text answers carry the model-answer coaching (compare card / rubric) —
// they need real reading time before the auto-advance fires.
const AUTO_ADVANCE_TEXT_MS = 14000;
// Two wrongs in a row open the "Stuck?" rescue card (hint → watch-it-solved →
// easier practice). Those steps need time, so the auto-advance backs off; the
// Next button still advances immediately.
const RESCUE_ADVANCE_MS = 60000;

// Atlas palette — deep dark base, gold primary accents, semantic colors kept.
const GOLD = '#f59e0b';        // gold-500

/** True when the student explicitly chose Hindi in /settings (persisted
 *  device choice). English is the platform default — Hinglish copy is only
 *  shown on that explicit choice. */
function studentPrefersHinglish(): boolean {
  try {
    const lang = (JSON.parse(localStorage.getItem('dream-settings') || '{}').language as string) || 'English';
    return /hind/i.test(lang);
  } catch { return false; }
}
const GOLD_CORE = '#fbbf24';   // gold-400 — primary accent (was indigo)
const GOLD_PALE = '#fde68a';   // gold-200 — accent text (was indigo-light)
const GOLD_LIGHT = '#fcd34d';  // gold-300
const MINT = '#34d399';        // emerald — correct
const MINT_DARK = '#059669';
const RED = '#ef4444';         // rose — wrong
const RED_LIGHT = '#fca5a5';
const TEXT_PRIMARY = '#f0f0f5';   // surface-900
const TEXT_SECONDARY = '#9a9aa8'; // surface-700
const TEXT_MUTED = '#6b6b7a';     // surface-600
const TEXT_BODY = '#c9c9d4';
const TEXT_BRIGHT = '#e4e4ec';
const DISPLAY_FONT = "var(--font-display), sans-serif"; // Syne — Atlas display font
const BODY_FONT = "'Plus Jakarta Sans', sans-serif";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Question {
  id: string;
  text: string;
  latex?: string;
  options: string[];
  // -1 = unknown (server holds the key; grading comes from /submit)
  correctIndex: number;
  inputType?: 'options' | 'text';
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  // Provenance (audit §12): real past-paper year / authored marks when the
  // served row carries them; absent → no chip (never fabricated).
  year?: string | null;
  marks?: number;
  // Backing corpus node — fetch param for the "I don't get it" hint.
  nodeId?: string | null;
}

/** A due SM-2 item spliced into the session as a "spaced repeat" card.
 *  Graded by the review scheduler (self-grade), never by practice scoring. */
interface ReviewCardItem {
  id: string;
  conceptName: string;
  question?: string | null;
  answer?: string | null;
  slug?: string | null;
  intervalDays?: number;
}

/** Authored marking-scheme readout (POST /api/practice/{id}/submit →
 *  marking_feedback): per-step rubric coverage for free-text answers. */
interface MarkingFeedback {
  marks_awarded: number;
  max_marks: number;
  steps: { text: string; hit: boolean }[];
  steps_hit: number;
  steps_total: number;
}

interface AnswerFeedback {
  questionId: string;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  explanation: string;
  pointsEarned: number;
  masteryBefore: number;
  masteryAfter: number;
  masteryDelta: number;
  misconception?: string;
  remediation?: string;
  reviewTopics?: { title: string; slug: string }[];
  // Free-text boards coaching (text-mode submits only): the student's own
  // words, the authored model answer (node ids scrubbed), and the authored
  // rubric coverage when the question carries a marking scheme.
  studentAnswer?: string;
  modelAnswer?: string;
  markingFeedback?: MarkingFeedback | null;
  // Audit trail — the honest "Why this verdict?" provenance from /submit.
  trail?: AuditTrailData | null;
}

// ─── Offline cache adapters ───────────────────────────────────────────────────
// The offlineCache module exposes an object API; these wrappers adapt it to the
// shapes used throughout this page so call-sites stay clean.

async function cacheQuestions(topic: string, questions: Question[]): Promise<void> {
  for (const q of questions) {
    await offlineCache.cacheQuestion({
      problem_type: topic,
      id: q.id,
      content: q,
      options: q.options,
      difficulty: q.difficulty,
      timestamp: Date.now(),
      access_count: 0,
    });
  }
}

async function getCachedQuestions(topic: string): Promise<Question[]> {
  const records = await offlineCache.getCachedQuestions(topic);
  return records
    .map((r) => (r.content as Question | undefined) ?? null)
    .filter((q): q is Question => q !== null);
}

async function queueAnswer(payload: {
  sessionId: string;
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timestamp: number;
}): Promise<void> {
  await offlineCache.queueAction('answer', payload);
}

async function syncQueuedAnswers(): Promise<{ synced: number; failed: number }> {
  return offlineCache.processSyncQueue();
}

interface SessionSummary {
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  accuracy: number;
  masteryBefore: number;
  masteryAfter: number;
  masteryDelta: number;
  streakBefore: number;
  streakAfter: number;
  streakDelta: number;
  topicsReviewed: string[];
  timeSpentSeconds: number;
  encouragingMessage: string;
  hint: string;
  /** §8 capability framing — topics the child got right vs still building,
   *  derived from real per-question outcomes (never a generic cheer). */
  capabilities: { solid: string[]; building: string[] };
}

// ─── Zustand Store ────────────────────────────────────────────────────────────

interface PracticeState {
  screen: 'idle' | 'loading' | 'active' | 'feedback' | 'review' | 'summary' | 'error';
  questions: Question[];
  currentIndex: number;
  answers: Map<string, number>;
  feedbacks: AnswerFeedback[];
  summary: SessionSummary | null;
  errorMessage: string;
  sessionId: string | null;
  topic: string;
  subject: string;
  isLoading: boolean;
  startTime: number | null;
  advanceTimer: number | null;
  streakDays: number;
  masteryPercent: number;
  masterySubject: string;
  queuedForSync: boolean;
  sessionTotal: number;
  // Confidence chips (EXAMREADY): a client-side self-check tapped BEFORE the
  // reveal. Used ONLY for the end-of-session calibration display — it is
  // never sent to the backend and never touches grading.
  confidence: Record<string, Confidence>;
  // SM-2 interleave (audit §4): due review items surface mid-session as
  // spaced-repeat cards — labelled honestly, self-graded through the real
  // scheduler, never counted in practice accuracy.
  reviewItems: ReviewCardItem[];
  reviewServed: number;
  reviewPendingIndex: number; // question index waiting behind the review card
  // Self-explanation (audit §5): on a wrong answer the child names the trap
  // ("misread / wrong rule / guessed") — logged to the local mix-ups journal.
  mixups: Record<string, string>;

  init: () => void;
  setTopic: (subject: string, topic: string) => void;
  startSession: (topic: string, subject: string) => Promise<void>;
  submitAnswer: (questionId: string, selectedIndex: number, textAnswer?: string) => Promise<void>;
  setConfidence: (questionId: string, c: Confidence) => void;
  tagMixup: (questionId: string, trap: string, topic: string) => void;
  submitReviewGrade: (quality: number) => Promise<void>;
  advanceToNext: () => void;
  completeSession: () => Promise<void>;
  reset: () => void;
  clearTimer: () => void;
}

const usePracticeStore = create<PracticeState>((set, get) => ({
  screen: 'idle',
  questions: [],
  currentIndex: 0,
  answers: new Map(),
  feedbacks: [],
  summary: null,
  errorMessage: '',
  sessionId: null,
  topic: 'Mathematics',
  subject: 'math',
  isLoading: false,
  startTime: null,
  advanceTimer: null,
  sessionTotal: TOTAL_QUESTIONS,
  streakDays: 0,
  masteryPercent: 0,
  masterySubject: 'Mathematics',
  queuedForSync: false,
  confidence: {},
  reviewItems: [],
  reviewServed: 0,
  reviewPendingIndex: 0,
  mixups: {},

  init: () => {
    // Honest zeros first — no fabricated stats.  Then load the REAL
    // values from /api/progress (streak from the dashboard, mastery
    // from the overview); any failure just keeps the zeros.
    try {
      const saved = localStorage.getItem('practice_profile');
      if (saved) {
        const p = JSON.parse(saved);
        set({
          streakDays: p.streakDays ?? 0,
          masteryPercent: p.masteryPercent ?? 0,
          masterySubject: p.masterySubject ?? 'Mathematics',
        });
      }
    } catch { /* ignore */ }

    const loadReal = async () => {
      // Phase 5.2: /api/progress/* is authenticated (backend get_current_user).
      // An anonymous visit must keep the honest local zeros instead of firing
      // two 401s into the console on every page load.
      const token = getAuthToken();
      if (!token) return;
      // Same client the dashboard uses (api.get — relative same-origin base,
      // auth headers included) so both surfaces read the SAME streak number;
      // the old raw fetch with an absolute base was CORS-blocked on :3000.
      try {
        const data = await api.get<{ streak?: number }>('/api/progress/dashboard');
        set({ streakDays: Number(data.streak ?? 0) || 0 });
      } catch { /* honest zero stays */ }
      try {
        const data = await api.get<{ avgMastery?: number }>('/api/progress/overview?range=all');
        const avg = Number(data.avgMastery ?? 0) || 0;
        set({ masteryPercent: Math.max(0, Math.min(100, Math.round(avg))) });
      } catch { /* honest zero stays */ }
    };
    loadReal();
  },

  setTopic: (subject: string, topic: string) => set({ subject, topic }),

  startSession: async (topic: string, subject: string) => {
    set({ isLoading: true, screen: 'loading', errorMessage: '' });

    try {
      // The authenticated user's real UUID. Omitting it made the backend
      // fall back to student_id='demo' (pydantic default), which broke
      // attempt persistence into the uuid-typed students column.
      const authUserId = useAuthStore.getState().user?.id;

      // Try the proper /api/practice/start endpoint first
      let questions: Question[] = [];
      let totalFromApi: number | null = null;
      let sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

      // Galaxy handoff: when the topic IS a corpus node id, ask the selector
      // to focus questions on exactly that topic (backend StartSessionRequest
      // supports topic_ids); plain subject names keep the wide pool.
      const NODE_SHAPE = /^c\d{1,2}_[a-z0-9]+(?:_[a-z0-9]+)*_\d{1,2}_\d{1,3}$/i;
      const topicIds = NODE_SHAPE.test(topic) ? [topic] : undefined;

      try {
        const res = await authedFetch(
          '/api/practice/start',
          {
            method: 'POST',
            body: JSON.stringify({
              student_id: authUserId,
              subject,
              topic,
              topic_ids: topicIds,
              num_questions: TOTAL_QUESTIONS,
              mode: 'practice',
            }),
            signal: AbortSignal.timeout(8000),
          }
        );
        if (res.ok) {
          const session = await res.json();
          sessionId = session.id || sessionId;
          // Map API questions to local format
          totalFromApi = session.total_questions ?? null;
          questions = (session.questions || []).map((q: any) => ({
            id: q.id || q.question_id,
            text: q.text || q.question_text,
            latex: q.latex,
            options: q.options || [],
            correctIndex: q.correct_option ?? -1,
            inputType: (q.options?.length ? 'options' : 'text') as 'options' | 'text',
            subject: q.subject || subject,
            topic: q.topic || topic,
            difficulty: q.difficulty || 'medium',
            year: q.year ?? null,
            marks: q.marks ?? undefined,
            nodeId: q.node_id ?? null,
          }));
          await cacheQuestions(topic, questions);
        } else {
          throw new Error('API error');
        }
      } catch {
        // Fallback: try the simpler questions endpoint
        try {
          const res = await authedFetch(
            `/api/practice/questions?topic=${encodeURIComponent(topic)}&subject=${encodeURIComponent(subject)}&count=${TOTAL_QUESTIONS}`,
            { signal: AbortSignal.timeout(8000) }
          );
          if (!res.ok) throw new Error('API error');
          const data = await res.json();
          questions = (data.questions ?? data).map((q: any) => ({
            id: q.id || q.question_id,
            text: q.text || q.question_text,
            latex: q.latex,
            options: q.options || [],
            correctIndex: q.correct_option ?? q.correctIndex ?? -1,
            inputType: (q.options?.length ? 'options' : 'text') as 'options' | 'text',
            subject: q.subject || subject,
            topic: q.topic || topic,
            difficulty: q.difficulty || 'medium',
            year: q.year ?? null,
            marks: q.marks ?? undefined,
            nodeId: q.node_id ?? null,
          }));
          await cacheQuestions(topic, questions);
        } catch {
          // Fallback to cache (offline)
          questions = await getCachedQuestions(topic);
          if (!questions || questions.length === 0) {
            throw new Error('No cached questions available. Please connect to the internet for your first session.');
          }
          set({ queuedForSync: true });
        }
      }

      // SM-2 interleave (audit §4): pull the real due-review queue and hold
      // up to 2 items to splice mid-session. Auth-gated — anonymous play
      // (cached questions) has no schedule to interleave.
      let reviewItems: ReviewCardItem[] = [];
      if (getAuthToken()) {
        try {
          const rq = await api.get<{ items?: any[] } | any[]>('/api/progress/review/queue');
          const items = Array.isArray(rq) ? rq : (rq?.items ?? []);
          reviewItems = items.slice(0, 2).map((i: any) => ({
            id: String(i.id ?? ''),
            conceptName: String(i.conceptName ?? i.concept_name ?? 'this topic'),
            question: i.question ?? null,
            answer: i.answer ?? null,
            slug: i.slug ?? null,
            intervalDays: i.intervalDays ?? i.interval_days ?? undefined,
          })).filter((i: ReviewCardItem) => i.id);
        } catch { /* no schedule today — practice runs plain */ }
      }

      set({
        screen: 'active',
        questions: questions.slice(0, TOTAL_QUESTIONS),
        sessionTotal: totalFromApi ?? questions.length,
        currentIndex: 0,
        answers: new Map(),
        feedbacks: [],
        summary: null,
        sessionId,
        startTime: Date.now(),
        isLoading: false,
        confidence: {},
        reviewItems,
        reviewServed: 0,
        reviewPendingIndex: 0,
        mixups: {},
      });
    } catch (err) {
      set({
        screen: 'error',
        errorMessage: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        isLoading: false,
      });
    }
  },

  submitAnswer: async (questionId: string, selectedIndex: number, textAnswer?: string) => {
    const { questions, currentIndex, sessionId, startTime, queuedForSync } = get();
    const question = questions[currentIndex];
    if (!question || question.id !== questionId) return;

    // correctIndex is -1 when the server holds the key — no client guess
    const isCorrect = question.correctIndex >= 0 && selectedIndex === question.correctIndex;

    // Try submitting to the proper API endpoint for real feedback
    let apiFeedback: { isCorrect: boolean; explanation: string; pointsEarned: number; misconception?: string; remediation?: string; reviewTopics?: { title: string; slug: string }[] } | null = null;
    // Boards coaching payload for free-text answers: the authored model
    // answer (node-id scrubbed) + the authored rubric coverage when the
    // question carries a marking scheme. Both come straight from /submit.
    let modelAnswer: string | undefined;
    let markingFeedback: MarkingFeedback | null | undefined;
    let apiTrail: AuditTrailData | null = null;
    // Real per-node movement from the backend's BKT readout (mastery_change
    // is a 0-1 before/after pair for THIS node). feedback.mastery_after is a
    // raw node posterior — hard 0.0 on a first wrong answer — and splicing
    // it into the displayed corpus average produced "Mastery: 71% → 0% ↓71%".
    let bktDeltaPct: number | null = null;
    try {
      const res = await authedFetch(
        `/api/practice/${sessionId}/submit`,
        {
          method: 'POST',
          body: JSON.stringify({
            question_id: questionId,
            ...(textAnswer !== undefined
              ? { answer: textAnswer }
              : { selected_option: selectedIndex }),
            time_taken_seconds: 30,
            hints_used: 0,
          }),
          signal: AbortSignal.timeout(5000),
        }
      );
      if (res.ok) {
        const data = await res.json();
        apiFeedback = {
          isCorrect: data.feedback?.is_correct ?? isCorrect,
          explanation: data.feedback?.explanation || '',
          pointsEarned: data.feedback?.points_earned ?? (isCorrect ? 10 : 0),
          misconception: data.feedback?.misconception || data.misconception || undefined,
          remediation: data.feedback?.remediation || data.remediation || undefined,
          reviewTopics: data.feedback?.review_topics || data.review_topics || undefined,
        };
        apiTrail = data.trail ?? null;
        if (textAnswer !== undefined) {
          const ma = prepareModelAnswer(data.correct_answer || data.feedback?.correct_answer || '');
          if (ma) modelAnswer = ma;
          const mf = data.marking_feedback ?? data.feedback?.marking_feedback ?? null;
          if (mf && Array.isArray(mf.steps) && mf.steps.length > 0) markingFeedback = mf as MarkingFeedback;
        }
        const change = data.mastery_change;
        if (
          change &&
          typeof change.mastery_before === 'number' &&
          typeof change.mastery_after === 'number'
        ) {
          bktDeltaPct = (change.mastery_after - change.mastery_before) * 100;
        }
        // ADAPT: the server steered the NEXT question by this answer's real
        // correctness (up after correct, down after wrong). Splice it over
        // the pre-generated buffer so the session follows the student's
        // actual level. Dedup: never insert a question already shown or
        // queued — the buffer item stays in that case.
        const nq = data.next_question;
        if (nq && (nq.question_id || nq.id)) {
          const nqId = String(nq.question_id || nq.id);
          const cur = get();
          const qs = cur.questions;
          const ci = cur.currentIndex;
          if (!qs.some((q) => q.id === nqId) && ci + 1 < qs.length) {
            const spliced = [...qs];
            spliced[ci + 1] = {
              id: nqId,
              text: nq.text || '',
              latex: nq.latex,
              options: nq.options || [],
              correctIndex: -1, // key stays server-side; /submit grades
              inputType: (nq.options?.length ? 'options' : 'text') as 'options' | 'text',
              subject: nq.subject || question.subject,
              topic: nq.topic || question.topic,
              difficulty: nq.difficulty || 'medium',
              nodeId: nq.node_id ?? null,
            };
            set({ questions: spliced });
          }
        }
      }
    } catch { /* fall back to local computation */ }

    const masteryBefore = get().masteryPercent;
    // Show real movement only: shift the displayed average by the backend's
    // genuine per-node BKT delta. Without a genuine reading, keep the value
    // and let the delta render as hidden (no fabricated "↓71%").
    const masteryAfter = bktDeltaPct !== null
      ? Math.max(0, Math.min(100, masteryBefore + bktDeltaPct))
      : masteryBefore;
    const masteryDelta = masteryAfter - masteryBefore;

    const feedback: AnswerFeedback = {
      questionId,
      selectedIndex,
      correctIndex: question.correctIndex,
      isCorrect: apiFeedback?.isCorrect ?? isCorrect,
      explanation: apiFeedback?.explanation || (isCorrect
        ? 'Great thinking! You identified the right approach.'
        : question.correctIndex >= 0 && question.options[question.correctIndex]
          ? `The correct answer is ${question.options[question.correctIndex]}. ${question.latex ? 'Look at the formula carefully — small signs make a big difference!' : 'Review the concept and try again.'}`
          : 'Review the concept and try again — check your working carefully.'),
      pointsEarned: apiFeedback?.pointsEarned ?? (isCorrect ? 10 : 0),
      masteryBefore,
      masteryAfter,
      masteryDelta,
      misconception: apiFeedback?.misconception,
      remediation: apiFeedback?.remediation,
      reviewTopics: apiFeedback?.reviewTopics,
      studentAnswer: textAnswer,
      modelAnswer,
      markingFeedback: markingFeedback ?? null,
      trail: apiTrail,
    };

    const newAnswers = new Map(get().answers);
    newAnswers.set(questionId, selectedIndex);
    const newFeedbacks = [...get().feedbacks, feedback];

    set({
      answers: newAnswers,
      feedbacks: newFeedbacks,
    });

    // Queue answer for offline sync
    try {
      await queueAnswer({
        sessionId: sessionId ?? '',
        questionId,
        selectedIndex,
        isCorrect,
        timestamp: Date.now(),
      });
      if (queuedForSync) {
        if (navigator.onLine) syncQueuedAnswers().catch(() => {});
      }
    } catch { /* non-critical */ }

    // Schedule auto-advance — free-text answers bring the model-answer
    // coaching, which needs reading time; MCQ feedback stays snappy. After
    // two consecutive wrongs the "Stuck?" rescue card opens and the advance
    // backs off so the rescue steps are actually usable.
    let wrongStreak = 0;
    for (let i = newFeedbacks.length - 1; i >= 0 && !newFeedbacks[i].isCorrect; i--) {
      wrongStreak += 1;
    }
    const advanceDelay = wrongStreak >= 2
      ? RESCUE_ADVANCE_MS
      : textAnswer !== undefined ? AUTO_ADVANCE_TEXT_MS : AUTO_ADVANCE_MS;
    const timer = window.setTimeout(() => {
      const { currentIndex: ci, questions: qs } = get();
      if (ci < qs.length - 1) {
        get().advanceToNext();
      } else {
        get().completeSession();
      }
    }, advanceDelay);

    set({
      screen: 'feedback',
      advanceTimer: timer,
    });
  },

  advanceToNext: () => {
    const { currentIndex, questions, reviewItems, reviewServed } = get();
    const nextIdx = currentIndex + 1;
    // §4 interleave: a due review card surfaces before questions 3 and 5
    // (nextIdx 2 / 4) — two per 5-question session, labelled, self-graded.
    if (
      nextIdx < questions.length &&
      reviewServed < reviewItems.length &&
      (nextIdx === 2 || nextIdx === 4)
    ) {
      set({ screen: 'review', reviewPendingIndex: nextIdx });
      return;
    }
    if (currentIndex < questions.length - 1) {
      set({ screen: 'active', currentIndex: currentIndex + 1 });
    }
  },

  // The review card's self-grade goes to the SM-2 scheduler — the same
  // endpoint /review uses — then the waiting question takes the stage.
  submitReviewGrade: async (quality: number) => {
    const { reviewItems, reviewServed, reviewPendingIndex, questions } = get();
    const item = reviewItems[reviewServed];
    if (item) {
      try {
        await api.post('/api/progress/review/answer', {
          item_id: item.id,
          quality,
          response_time_seconds: 20,
        });
      } catch { /* scheduler unreachable — the item stays due, harmless */ }
    }
    const nextIdx = Math.min(reviewPendingIndex, questions.length - 1);
    set({ screen: 'active', currentIndex: nextIdx, reviewServed: reviewServed + 1 });
  },

  // §5 self-explanation: the child names the trap that caught them. Logged
  // to the local mix-ups journal (atlas-mixups-v1) — feeds the dashboard
  // "Your mix-ups" card; never sent anywhere, never affects scoring.
  tagMixup: (questionId: string, trap: string, topic: string) => {
    const next = { ...get().mixups };
    if (next[questionId] === trap) delete next[questionId];
    else next[questionId] = trap;
    set({ mixups: next });
    try {
      const raw = localStorage.getItem('atlas-mixups-v1');
      const log: { at: string; trap: string; topic: string }[] = raw ? JSON.parse(raw) : [];
      if (next[questionId]) {
        log.push({ at: new Date().toISOString(), trap, topic });
      } else {
        // un-tap: remove this question's tag (last matching entry)
        const li = log.map((e, i) => ({ e, i })).reverse().find((x) => x.e.topic === topic);
        if (li) log.splice(li.i, 1);
      }
      localStorage.setItem('atlas-mixups-v1', JSON.stringify(log.slice(-120)));
    } catch { /* storage full/blocked — journal is best-effort */ }
  },

  // EXAMREADY: one tap, skippable, client-side only. Tapping the same chip
  // again un-records it (an un-tap must be as easy as a tap).
  setConfidence: (questionId: string, c: Confidence) => {
    const current = get().confidence[questionId];
    const next = { ...get().confidence };
    if (current === c) delete next[questionId];
    else next[questionId] = c;
    set({ confidence: next });
  },

  completeSession: async () => {
    const { feedbacks, startTime, masteryPercent, streakDays, masterySubject } = get();
    const correctCount = feedbacks.filter(f => f.isCorrect).length;
    const timeSpent = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;

    // Streak/mastery shown to the student must be REAL.  The session
    // delta is computed locally, but the post-session streak and
    // mastery come from /api/progress — never a fabricated "+1 day".
    const accuracy = feedbacks.length > 0 ? Math.round((correctCount / feedbacks.length) * 100) : 0;
    const masteryDelta = Math.round(
      feedbacks.reduce((sum, f) => sum + (f.masteryAfter - f.masteryBefore), 0)
    );
    let newStreak = streakDays;
    let newMastery = masteryPercent;

    const encouragingMessages = [
      'Great job! Keep the momentum going!',
      "You're on fire! Sahi kaam chal raha hai! 🔥",
      'Impressive work! Practice makes perfect!',
      'Shabaash! Isi tarah practice karte raho! 💪',
      'Wow! Your effort is paying off!',
    ];
    const hints = [
      'Come back tomorrow for 2 review questions on this topic.',
      'Try the harder difficulty level next time!',
      "Review the topics you got wrong — they'll appear tomorrow.",
      'Aaj kaafi accha perform kiya! Kal milte hain! 👋',
    ];

    // Pull the REAL post-session streak/mastery from /api/progress
    // Phase 5.2: these endpoints are authenticated — when signed out, skip
    // entirely and keep the pre-session local values (never fabricate, never
    // log anonymous 401s).
    const progressToken = getAuthToken();
    if (progressToken) {
      // Same client the dashboard uses — relative base, no CORS exposure.
      try {
        const d = await api.get<{ streak?: number }>('/api/progress/dashboard');
        newStreak = Number(d.streak ?? streakDays) || 0;
      } catch { /* keep the pre-session server values — never fabricate */ }
      try {
        const o = await api.get<{ avgMastery?: number }>('/api/progress/overview?range=all');
        const avg = Number(o.avgMastery ?? masteryPercent) || 0;
        newMastery = Math.max(0, Math.min(100, Math.round(avg)));
      } catch { /* keep the pre-session server values — never fabricate */ }
    }

    // §8: name the capability, not just the count. Topics are grouped by
    // whether ANY of their questions landed — honest "getting it" vs
    // "still building" split, straight from the graded feedbacks.
    const topicOf = new Map(get().questions.map((q) => [q.id, q.topic]));
    const solidSet = new Set<string>();
    const buildingSet = new Set<string>();
    for (const f of feedbacks) {
      const t = topicOf.get(f.questionId);
      if (!t) continue;
      (f.isCorrect ? solidSet : buildingSet).add(t);
    }
    solidSet.forEach((t) => buildingSet.delete(t)); // any correct → solid

    const summary: SessionSummary = {
      totalQuestions: TOTAL_QUESTIONS,
      correctCount,
      incorrectCount: TOTAL_QUESTIONS - correctCount,
      accuracy,
      masteryBefore: masteryPercent,
      masteryAfter: newMastery,
      masteryDelta,
      streakBefore: streakDays,
      streakAfter: newStreak,
      streakDelta: newStreak - streakDays,
      topicsReviewed: Array.from(new Set(get().questions.map(q => q.topic))),
      timeSpentSeconds: timeSpent,
      encouragingMessage: encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)],
      hint: hints[Math.floor(Math.random() * hints.length)],
      capabilities: {
        solid: Array.from(solidSet),
        building: Array.from(buildingSet),
      },
    };

    // Persist profile
    try {
      localStorage.setItem(
        'practice_profile',
        JSON.stringify({ streakDays: newStreak, masteryPercent: newMastery, masterySubject })
      );
    } catch { /* ignore */ }

    // Try syncing session to server — prefer the proper session-fetch endpoint
    // Phase 5.2: server sync is only meaningful when signed out users have a
    // session to sync to; gate on the auth token so anonymous play (cached
    // questions) doesn't spray 401s into the console.
    const syncToken = getAuthToken();
    if (syncToken) {
      try {
        const sid = get().sessionId;
        // Try fetching the authoritative session summary from the backend
        await authedFetch(`/api/practice/${sid}`, {
          signal: AbortSignal.timeout(5000),
        })
          .then(async (r) => {
            if (r.ok) {
              const data = await r.json();
              // If the backend returned a richer summary, merge it
              if (data && data.summary) {
                const s = data.summary;
                summary.accuracy = s.accuracy_percent ?? summary.accuracy;
                summary.timeSpentSeconds = s.time_spent_seconds ?? summary.timeSpentSeconds;
                summary.encouragingMessage = s.recommendations?.[0] ?? summary.encouragingMessage;
              }
            }
          })
          .catch(() => {});
        // Close the session server-side so it persists as completed.
        // (The old fire-and-forget POST /api/practice/session hit a route
        // the backend never implemented → 405.)
        await authedFetch(`/api/practice/${encodeURIComponent(sid)}/end`, {
          method: 'POST',
          signal: AbortSignal.timeout(5000),
        }).catch(() => {});
      } catch { /* non-critical */ }
    }

    set({
      screen: 'summary',
      summary,
      streakDays: newStreak,
      masteryPercent: newMastery,
    });
  },

  reset: () => {
    const { advanceTimer } = get();
    if (advanceTimer) clearTimeout(advanceTimer);
    set({
      screen: 'idle',
      questions: [],
      currentIndex: 0,
      answers: new Map(),
      feedbacks: [],
      summary: null,
      errorMessage: '',
      sessionId: null,
      startTime: null,
      advanceTimer: null,
      isLoading: false,
      confidence: {},
      reviewItems: [],
      reviewServed: 0,
      reviewPendingIndex: 0,
      mixups: {},
    });
  },

  clearTimer: () => {
    const { advanceTimer } = get();
    if (advanceTimer) {
      clearTimeout(advanceTimer);
      set({ advanceTimer: null });
    }
  },
}));

// ─── KaTeX renderer (safe) ────────────────────────────────────────────────────

function renderKatex(latex: string, el: HTMLElement | null, displayMode = false) {
  if (!el || !latex) return;
  try {
    katex.render(latex, el, {
      displayMode,
      throwOnError: false,
      trust: true,
      strict: false,
    });
  } catch {
    el.textContent = latex;
  }
}

/** Inline $...$ → KaTeX html for strings rendered as markup (MCQ options).
 *  The audit found raw "$y = 2x + 3$" served literally to children — options
 *  must go through the same math path as stems (§3). */
function inlineMath(text: string): string {
  // SECURITY: sanitize after KaTeX — corpus/LLM text must not carry markup.
  const html = String(text ?? '').replace(/\$([^$]+)\$/g, (_, tex) => {
    try {
      return katex.renderToString(tex, { throwOnError: false, displayMode: false });
    } catch {
      return tex;
    }
  });
  return sanitizeHtml(html);
}

// ─── Reusable Components ──────────────────────────────────────────────────────

function StreakCounter({ days }: { days: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-3 w-3" aria-hidden="true">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
          style={{ backgroundColor: GOLD }}
        />
        <span
          className="relative inline-flex h-3 w-3 rounded-full"
          style={{ backgroundColor: GOLD }}
        />
      </span>
      <span
        className="text-sm font-semibold tracking-wide"
        style={{
          fontFamily: DISPLAY_FONT,
          color: GOLD_LIGHT,
        }}
      >
        {days} Day{days !== 1 ? 's' : ''} 🔥
      </span>
    </div>
  );
}

function ProgressIndicator({ current, total }: { current: number; total: number }) {
  const pct = ((current) / total) * 100;
  return (
    <div className="w-full" role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total} aria-label={`Question ${current} of ${total}`}>
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium" style={{ color: TEXT_SECONDARY, fontFamily: BODY_FONT }}>
          Question {current} of {total}
        </span>
        <span className="text-xs font-medium" style={{ color: GOLD_PALE, fontFamily: DISPLAY_FONT }}>
          {Math.round(pct)}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.5 }}
          style={{
            background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
            boxShadow: '0 0 12px rgba(251,191,36,0.4)',
          }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full flex-1 mx-0.5 transition-all duration-300"
            style={{
              backgroundColor: i < current ? GOLD_CORE : 'rgba(255,255,255,0.06)',
              boxShadow: i < current ? '0 0 6px rgba(251,191,36,0.3)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function MasteryBar({ percent, label }: { percent: number; label?: string }) {
  return (
    <div className="flex items-center gap-2" title={`Mastery: ${label ?? 'Mathematics'} — ${percent}%`}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={GOLD} />
      </svg>
      <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ backgroundColor: GOLD }}
        />
      </div>
      <span className="text-xs font-semibold" style={{ color: GOLD_LIGHT, fontFamily: DISPLAY_FONT }}>
        {percent}%
      </span>
    </div>
  );
}

function TopBar({ streakDays, masteryPercent, masterySubject, topic }: {
  streakDays: number;
  masteryPercent: number;
  masterySubject: string;
  topic: string;
}) {
  return (
    <header
      className="sticky top-0 z-50 px-4 py-3"
      style={{
        backgroundColor: 'rgba(10,10,15,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
      role="banner"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 max-w-lg mx-auto">
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="text-lg font-bold" style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}>
            Practice
          </h1>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(251,191,36,0.15)', color: GOLD_PALE, border: '1px solid rgba(251,191,36,0.2)' }}>
            {friendlyNodeTitle(topic)}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <MasteryBar percent={masteryPercent} label={masterySubject} />
          <StreakCounter days={streakDays} />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

// ─── Screen: Ready ───────────────────────────────────────────────────────────

function ReadyScreen({ topic, subject, onStart }: {
  topic: string;
  subject: string;
  onStart: () => void;
}) {
  const streak = usePracticeStore(s => s.streakDays);
  const mastery = usePracticeStore(s => s.masteryPercent);
  const [isOnline, setIsOnline] = useState(true); // SSR-safe; corrected by effect below

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const onOn = () => setIsOnline(true);
    const onOff = () => setIsOnline(false);
    window.addEventListener('online', onOn);
    window.addEventListener('offline', onOff);
    return () => {
      window.removeEventListener('online', onOn);
      window.removeEventListener('offline', onOff);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="text-center mb-8"
      >
        {/* Animated brain/lightbulb icon */}
        <motion.div
          className="text-6xl mb-4"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          💡
        </motion.div>

        <h2
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}
        >
          Ready to practice?
        </h2>
        <p className="text-sm mb-1" style={{ color: TEXT_SECONDARY, fontFamily: BODY_FONT }}>
          {friendlyNodeTitle(topic) === subjectName(subject)
            ? subjectName(subject)
            : `${friendlyNodeTitle(topic)} — ${subjectName(subject)}`}
        </p>
        <p className="text-xs" style={{ color: TEXT_MUTED, fontFamily: BODY_FONT }}>
          5 questions • Instant feedback • Adaptive difficulty
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="flex gap-4 mb-10 w-full max-w-xs"
      >
        <div className="flex-1 rounded-2xl p-3 text-center" style={{
          background: 'rgba(245,158,11,0.08)',
          border: '1px solid rgba(245,158,11,0.15)',
        }}>
          <div className="text-xl font-bold" style={{ fontFamily: DISPLAY_FONT, color: GOLD_LIGHT }}>
            {streak}
          </div>
          <div className="text-xs" style={{ color: GOLD, fontFamily: BODY_FONT }}>
            Day Streak 🔥
          </div>
        </div>
        <div className="flex-1 rounded-2xl p-3 text-center" style={{
          background: 'rgba(251,191,36,0.08)',
          border: '1px solid rgba(251,191,36,0.15)',
        }}>
          <div className="text-xl font-bold" style={{ fontFamily: DISPLAY_FONT, color: GOLD_PALE }}>
            {mastery}%
          </div>
          <div className="text-xs" style={{ color: GOLD_PALE, fontFamily: BODY_FONT }}>
            Mastery ⭐
          </div>
        </div>
      </motion.div>

      {/* Network status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 flex items-center gap-1.5 text-xs"
        style={{ color: isOnline ? MINT : '#f59e0b', fontFamily: BODY_FONT }}
        aria-live="polite"
      >
        <span className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: isOnline ? MINT : GOLD }}
        />
        {isOnline ? 'Online — Live questions' : 'Offline — Cached questions'}
      </motion.div>

      {/* Start button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="relative w-full max-w-xs py-4 rounded-2xl font-bold text-lg overflow-hidden"
        style={{
          fontFamily: DISPLAY_FONT,
          color: '#131118',
          background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
          boxShadow: '0 8px 32px rgba(251,191,36,0.35)',
        }}
        aria-label="Start practice session"
      >
        <span className="relative z-10">Start Practice →</span>
        <motion.div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' }}
          initial={{ x: '100%' }}
          whileHover={{ x: '0%' }}
          transition={{ type: 'tween', duration: 0.3 }}
        />
      </motion.button>
    </div>
  );
}

// ─── Screen: Loading ─────────────────────────────────────────────────────────

function LoadingScreen({ topic }: { topic: string }) {
  const loadingMessages = [
    'Questions load ho rahe hain…',
    'Thoda intazaar karo, best questions la rahe hain! 📚',
    'Adaptive difficulty check kar rahe hain…',
  ];
  const msg = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-6 w-full">
      {/* Skeleton question card */}
      <div
        className="w-full max-w-sm rounded-2xl p-5 mb-6"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
        aria-hidden="true"
      >
        <div className="flex justify-between mb-4">
          <motion.div
            className="h-6 w-24 rounded-full"
            style={{ backgroundColor: 'rgba(251,191,36,0.12)' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="h-6 w-16 rounded-full"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          />
        </div>
        {[100, 88, 64].map((w, i) => (
          <motion.div
            key={i}
            className="h-3.5 rounded-full mb-2.5"
            style={{ width: `${w}%`, backgroundColor: 'rgba(255,255,255,0.07)' }}
            animate={{ opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 + i * 0.15 }}
          />
        ))}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`opt-${i}`}
            className="h-12 rounded-xl mb-2.5"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }}
            animate={{ opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: 0.6 + i * 0.15 }}
          />
        ))}
      </div>

      <motion.div
        className="w-12 h-12 rounded-full mb-6"
        style={{
          borderWidth: '3px',
          borderStyle: 'solid',
          borderColor: 'rgba(251,191,36,0.2)',
          borderTopColor: GOLD_CORE,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />
      <p
        className="text-sm animate-pulse"
        style={{ color: TEXT_SECONDARY, fontFamily: BODY_FONT }}
        aria-live="polite"
        role="status"
      >
        {msg}
      </p>
      <p className="text-xs mt-1" style={{ color: TEXT_MUTED, fontFamily: BODY_FONT }}>
        {friendlyNodeTitle(topic)}
      </p>
    </div>
  );
}

// ─── Screen: Question ────────────────────────────────────────────────────────

function QuestionScreen({
  question,
  index,
  total,
  onAnswer,
  confidence,
  onConfidence,
  hintNode,
}: {
  question: Question;
  index: number;
  total: number;
  onAnswer: (qid: string, idx: number, text?: string) => void;
  confidence: Confidence | null;
  onConfidence: (qid: string, c: Confidence) => void;
  /** authored node backing the "I don't get it" hint when the question
   *  itself carries no node_id (matched by topic label). */
  hintNode?: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  // "I don't get it" — the node's own authored idea in simple words.
  const [hint, setHint] = useState<string | null>(null);
  const [hintState, setHintState] = useState<'idle' | 'loading' | 'none'>('idle');
  const latexRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isTextMode = (question.inputType ?? (question.options.length ? 'options' : 'text')) === 'text';

  useEffect(() => {
    setSelected(null);
    setTextAnswer('');
    setSubmitted(false);
    setHint(null);
    setHintState('idle');
    if (latexRef.current && question.latex) {
      renderKatex(question.latex, latexRef.current, true);
    }
  }, [question.id, question.latex]);

  useEffect(() => {
    optionRefs.current[0]?.focus();
  }, []);

  const handleSelect = (idx: number) => {
    if (submitted) return;
    setSelected(idx);
  };

  const canSubmit = isTextMode ? textAnswer.trim().length > 0 : selected !== null;

  const handleSubmit = () => {
    if (!canSubmit || submitted) return;
    setSubmitted(true);
    onAnswer(question.id, selected ?? -1, isTextMode ? textAnswer.trim() : undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canSubmit && !submitted) {
      handleSubmit();
    }
  };

  const difficultyColors = {
    easy: { bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.25)', text: MINT },
    medium: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', text: GOLD },
    hard: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.25)', text: RED },
  };
  const dc = difficultyColors[question.difficulty];

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
      className="flex flex-col h-full"
      onKeyDown={handleKeyDown}
    >
      {/* Question header */}
      <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
        {(() => {
          const raw = String(question.topic || '');
          // raw chapter codes ("ch03") → "Chapter 3"; real titles pass through
          const label = /^ch(\d+)$/i.test(raw)
            ? `Chapter ${parseInt(raw.slice(2), 10)}`
            : friendlyNodeTitle(raw);
          return (
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium max-w-full truncate"
              style={{ backgroundColor: 'rgba(251,191,36,0.1)', color: GOLD_PALE, border: '1px solid rgba(251,191,36,0.15)' }}
            >
              {label}
            </span>
          );
        })()}
        <span className="flex items-center gap-2">
          {/* §12 provenance — only when the row carries real past-paper
              provenance (year) or a multi-mark scheme; never invented. */}
          {(question.year || (question.marks ?? 0) > 1) && (
            <span
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ backgroundColor: 'rgba(99,102,241,0.12)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.25)' }}
              data-testid="provenance-chip"
            >
              {question.year ? `CBSE ${question.year}` : 'Board-style'}{(question.marks ?? 0) > 1 ? ` · ${question.marks} marks` : ''}
            </span>
          )}
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ backgroundColor: dc.bg, color: dc.text, border: `1px solid ${dc.border}` }}
          >
            {question.difficulty === 'easy' ? 'Easy' : question.difficulty === 'medium' ? 'Medium' : 'Hard'}
          </span>
        </span>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <ProgressIndicator current={index + 1} total={total} />
      </div>

      {/* Question card */}
      <div
        className="rounded-2xl p-5 mb-5"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <p
          className="text-base leading-relaxed mb-3"
          style={{ color: TEXT_BRIGHT, fontFamily: BODY_FONT }}
          dangerouslySetInnerHTML={{ __html: inlineMath(question.text) }}
        />
        {question.latex && (
          <div
            ref={latexRef}
            className="py-3 px-4 rounded-xl text-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
          />
        )}
      </div>

      {/* "I don't get it" — decompose before answering. The node's own
          authored idea in simple words (eli5 → walkthrough → definition);
          never the answer, and hidden when no node backs the question. */}
      {/* Live rescue lane — always available (even without a node): the ask
          is corpus-anchored by the tutor and accepts Hindi/Hinglish. */}
      {!submitted && (
        <div className="mb-4">
          <AskHelpPanel
            seed={`${question.topic}: ${String(question.text || '').replace(/\s+/g, ' ').replace(/\[math\]/g, '').replace(/\$/g, '').slice(0, 220)}`}
          />
        </div>
      )}
      {!submitted && isNodeId(hintNode || question.nodeId) && (
        <div className="mb-4 -mt-2">
          {hintState === 'idle' && (
            <button
              onClick={() => {
                setHintState('loading');
                fetchRescueHint((hintNode || question.nodeId)!).then((h) => {
                  if (h) { setHint(h); setHintState('idle'); }
                  else setHintState('none');
                });
              }}
              className="text-xs underline underline-offset-2 transition-colors"
              style={{ color: 'rgba(196,181,253,0.9)', fontFamily: BODY_FONT }}
              data-testid="idontgetit"
            >
              I don&apos;t get it — explain the idea first
            </button>
          )}
          {hintState === 'loading' && (
            <p className="text-xs" style={{ color: TEXT_MUTED }} role="status">Finding the simple version…</p>
          )}
          {hint && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl px-3.5 py-2.5"
              style={{ backgroundColor: 'rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.30)' }}
              data-testid="idontgetit-hint"
            >
              <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: '#c4b5fd' }}>
                The idea, simply
              </p>
              <p className="text-sm leading-relaxed" style={{ color: TEXT_BODY, fontFamily: BODY_FONT }}>
                {hint}
              </p>
            </motion.div>
          )}
        </div>
      )}

      {/* Answer input — free text for corpus questions, options for MCQ */}
      {isTextMode ? (
        <div className="flex-1">
          <textarea
            value={textAnswer}
            onChange={(e) => setTextAnswer(e.target.value)}
            disabled={submitted}
            placeholder="Type your answer…"
            rows={3}
            autoFocus
            className="w-full px-4 py-3.5 rounded-xl text-sm resize-none"
            style={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              border: `1.5px solid ${textAnswer.trim() ? GOLD_CORE : 'rgba(255,255,255,0.10)'}`,
              color: TEXT_BRIGHT,
              fontFamily: BODY_FONT,
              outline: 'none',
            }}
            aria-label="Your answer"
          />
        </div>
      ) : (
      <div className="space-y-2.5 flex-1" role="radiogroup" aria-label="Answer options">
        {question.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isSubmittedState = submitted && question.correctIndex >= 0 && idx === question.correctIndex;
          const isWrong = submitted && isSelected && idx !== question.correctIndex;

          let bgColor = 'rgba(255,255,255,0.03)';
          let borderColor = 'rgba(255,255,255,0.08)';
          let textColor = TEXT_BODY;

          if (isSubmittedState) {
            bgColor = 'rgba(52,211,153,0.1)';
            borderColor = 'rgba(52,211,153,0.4)';
            textColor = MINT;
          } else if (isWrong) {
            bgColor = 'rgba(239,68,68,0.1)';
            borderColor = 'rgba(239,68,68,0.4)';
            textColor = RED_LIGHT;
          } else if (isSelected) {
            bgColor = 'rgba(251,191,36,0.12)';
            borderColor = GOLD_CORE;
            textColor = GOLD_PALE;
          }

          return (
            <motion.button
              key={idx}
              ref={el => { optionRefs.current[idx] = el; }}
              whileHover={!submitted ? { scale: 1.01 } : {}}
              whileTap={!submitted ? { scale: 0.99 } : {}}
              onClick={() => handleSelect(idx)}
              disabled={submitted}
              className="w-full text-left px-4 py-3.5 rounded-xl flex items-center gap-3 transition-all"
              style={{
                backgroundColor: bgColor,
                border: `1.5px solid ${borderColor}`,
                color: textColor,
                fontFamily: BODY_FONT,
                cursor: submitted ? 'default' : 'pointer',
              }}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
            >
              {/* Option label circle */}
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: isSubmittedState ? MINT_DARK : isWrong ? '#dc2626' : isSelected ? GOLD_CORE : 'rgba(255,255,255,0.06)',
                  color: isSelected && !submitted ? '#131118' : '#fff',
                }}
                aria-hidden="true"
              >
                {isSubmittedState ? '✓' : isWrong ? '✗' : String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1 text-sm" dangerouslySetInnerHTML={{ __html: inlineMath(opt) }} />
            </motion.button>
          );
        })}
      </div>
      )}

      {/* Confidence chips (EXAMREADY) — a one-tap self-check recorded
          BEFORE the reveal. Skippable by design (submit works either way)
          and display-only: it never changes grading, points or mastery. */}
      {canSubmit && !submitted && (
        <div className="mt-4" data-testid="confidence-row">
          <p className="text-xs mb-2" style={{ color: TEXT_MUTED, fontFamily: BODY_FONT }}>
            How did that feel? (optional)
          </p>
          <div className="flex gap-2">
            {([
              { c: 'confident' as Confidence, label: 'Confident', testid: 'chip-confident' },
              { c: 'guess' as Confidence, label: 'Just guessing', testid: 'chip-guess' },
            ]).map(({ c, label, testid }) => {
              const active = confidence === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => onConfidence(question.id, c)}
                  aria-pressed={active}
                  data-testid={testid}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    fontFamily: BODY_FONT,
                    backgroundColor: active ? 'rgba(251,191,36,0.16)' : 'rgba(255,255,255,0.03)',
                    border: `1.5px solid ${active ? GOLD_CORE : 'rgba(255,255,255,0.08)'}`,
                    color: active ? GOLD_PALE : TEXT_SECONDARY,
                    cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] mt-1.5" style={{ color: TEXT_MUTED, fontFamily: BODY_FONT }}>
            Self-check only — it never changes your score.
          </p>
        </div>
      )}

      {/* Submit button */}
      <motion.button
        whileHover={{ scale: canSubmit && !submitted ? 1.02 : 1 }}
        whileTap={{ scale: canSubmit && !submitted ? 0.97 : 1 }}
        onClick={handleSubmit}
        disabled={!canSubmit || submitted}
        className="w-full mt-5 py-3.5 rounded-xl font-semibold text-sm transition-all"
        style={{
          fontFamily: DISPLAY_FONT,
          background: canSubmit && !submitted
            ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
            : 'rgba(255,255,255,0.04)',
          color: canSubmit && !submitted ? '#131118' : TEXT_MUTED,
          border: canSubmit && !submitted ? 'none' : '1px solid rgba(255,255,255,0.08)',
          cursor: canSubmit && !submitted ? 'pointer' : 'not-allowed',
          boxShadow: canSubmit && !submitted ? '0 4px 20px rgba(251,191,36,0.3)' : 'none',
        }}
        aria-label="Submit answer"
      >
        Submit Answer
      </motion.button>
    </motion.div>
  );
}

// ─── Board-answer coaching cards (free-text feedback) ────────────────────────

/**
 * Copy-worthy answer card — shown after a CORRECT free-text answer. The
 * authored model answer sits side-by-side with the student's own words, and
 * the chips name what the model had that the student's lacked (keyword diff
 * when the question carries no rubric; the authored marking points when it
 * does). Nothing is generated: both texts and the rubric come from the
 * platform's authored data via /submit.
 */
function CopyWorthyCard({ feedback }: { feedback: AnswerFeedback }) {
  const mf = feedback.markingFeedback;
  const diff = diffAgainstModel(feedback.modelAnswer || '', feedback.studentAnswer || '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="w-full max-w-lg rounded-xl p-4 mt-2 text-left"
      style={{
        backgroundColor: 'rgba(251,191,36,0.05)',
        border: '1px solid rgba(251,191,36,0.25)',
      }}
      role="note"
      aria-label="Copy-worthy answer"
      data-testid="copy-worthy-card"
    >
      <div className="flex items-center justify-between gap-2 mb-1">
        <p className="text-sm font-bold" style={{ fontFamily: DISPLAY_FONT, color: GOLD_PALE }}>
          ✍ Copy-worthy answer
        </p>
        {mf && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
            style={{ backgroundColor: 'rgba(52,211,153,0.12)', color: MINT }}
            data-testid="rubric-score"
          >
            {mf.steps_hit}/{mf.steps_total} marking points
          </span>
        )}
      </div>
      <p className="text-xs mb-3" style={{ color: TEXT_SECONDARY }}>
        What the model answer had that yours didn&apos;t — that&apos;s what examiners reward.
      </p>

      {/* side-by-side: student's words vs the model */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div
          className="rounded-lg p-3"
          style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: TEXT_MUTED }}>
            Your answer
          </p>
          <p className="text-sm leading-relaxed" style={{ color: TEXT_BODY }}>{feedback.studentAnswer}</p>
        </div>
        <div
          className="rounded-lg p-3"
          style={{ backgroundColor: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.3)' }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: GOLD }}>
            Model answer
          </p>
          <p className="text-sm leading-relaxed" style={{ color: TEXT_BRIGHT }}>{feedback.modelAnswer}</p>
        </div>
      </div>

      {/* what the model had, keyword-level (only when no authored rubric) */}
      {!mf && diff.missing.length > 0 && (
        <div className="mt-3">
          <p className="text-xs mb-1.5" style={{ color: TEXT_SECONDARY }}>
            In the model answer, not yours — work these into the next one:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {diff.missing.map((kw) => (
              <span
                key={kw}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', color: GOLD_PALE }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}
      {!mf && diff.shared.length > 0 && (
        <div className="mt-2.5">
          <p className="text-xs mb-1.5" style={{ color: TEXT_MUTED }}>You already had:</p>
          <div className="flex flex-wrap gap-1.5">
            {diff.shared.map((kw) => (
              <span
                key={kw}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', color: MINT }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* authored rubric: which marking points the model spelled out and the
          student's answer covered — numeric marks only from authored data */}
      {mf && mf.steps.some(s => !s.hit) && (
        <div className="mt-3">
          <p className="text-xs mb-1.5" style={{ color: TEXT_SECONDARY }}>
            Marking points the model spelled out{mf.max_marks === mf.steps_total ? ' — 1 mark each' : ''}:
          </p>
          <ul className="space-y-1">
            {mf.steps.filter(s => !s.hit).slice(0, 4).map((s, i) => (
              <li key={i} className="text-xs flex items-start gap-1.5" style={{ color: TEXT_BODY }}>
                <span aria-hidden="true" style={{ color: RED_LIGHT }}>✗</span>
                <span>{s.text}{mf.max_marks === mf.steps_total ? ' (1 mark)' : ''}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

/**
 * Board-style model answer for a WRONG free-text answer. When the question
 * carries an authored marking scheme, the rubric renders as numbered steps —
 * each labelled "1 mark" only when the authored marks equal the authored
 * step count (zero-wrong: numbers come from the platform's data, never
 * invented). Without a scheme, the model answer is shown plainly.
 */
function ModelAnswerBoard({ feedback }: { feedback: AnswerFeedback }) {
  const mf = feedback.markingFeedback;
  const marksLabel = mf && mf.max_marks === mf.steps_total;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="w-full max-w-lg rounded-xl p-4 mt-2 text-left"
      style={{
        backgroundColor: 'rgba(52,211,153,0.04)',
        border: '1px solid rgba(52,211,153,0.22)',
      }}
      role="note"
      aria-label="Board-style model answer"
      data-testid="model-answer-board"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <p className="text-sm font-bold" style={{ fontFamily: DISPLAY_FONT, color: MINT }}>
          The board-style answer
        </p>
        {mf && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: TEXT_BODY }}
            data-testid="rubric-score"
          >
            {mf.marks_awarded}/{mf.max_marks} marks
          </span>
        )}
      </div>
      <p className="text-xs mb-3" style={{ color: TEXT_SECONDARY }}>
        {mf
          ? 'Each numbered point earns its own credit — write them all, in order.'
          : 'Read how a full-credit answer says it.'}
      </p>

      {mf ? (
        <ol className="space-y-2" data-testid="rubric-steps">
          {mf.steps.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                style={{
                  backgroundColor: s.hit ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${s.hit ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.12)'}`,
                  color: s.hit ? MINT : TEXT_MUTED,
                }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: s.hit ? TEXT_BODY : TEXT_SECONDARY }}>
                {s.text}
                <span
                  className="ml-2 text-xs font-semibold whitespace-nowrap"
                  style={{ color: s.hit ? MINT : RED_LIGHT }}
                >
                  {s.hit ? '✓ covered' : '✗ missed'}{marksLabel ? ' · 1 mark' : ''}
                </span>
              </p>
            </li>
          ))}
        </ol>
      ) : (
        feedback.modelAnswer && (
          <p className="text-sm leading-relaxed" style={{ color: TEXT_BRIGHT }}>
            {feedback.modelAnswer}
          </p>
        )
      )}
    </motion.div>
  );
}

// ─── Screen: Feedback ────────────────────────────────────────────────────────

function FeedbackScreen({
  feedback,
  onAdvance,
  hasMore,
  showRescue,
  rescueTopic,
  onEasierPractice,
  mixupTag,
  onTagMixup,
}: {
  feedback: AnswerFeedback;
  onAdvance: () => void;
  hasMore: boolean;
  /** Two consecutive wrongs opened the "Stuck?" rescue protocol. */
  showRescue: boolean;
  /** The current question's topic (a corpus node id when handoff/scoped). */
  rescueTopic: string;
  onEasierPractice: () => void;
  /** §5 self-explanation: which trap the child tapped (un-tap = same chip). */
  mixupTag?: string;
  onTagMixup?: (trap: string) => void;
}) {
  // Free-text answers show the model-answer coaching — give it reading time,
  // mirroring the store's auto-advance scheduling. The rescue card backs the
  // advance off further (same constant the store schedules with).
  const advanceDelay = showRescue
    ? RESCUE_ADVANCE_MS
    : feedback.studentAnswer !== undefined ? AUTO_ADVANCE_TEXT_MS : AUTO_ADVANCE_MS;
  const [countdown, setCountdown] = useState(Math.ceil(advanceDelay / 1000));
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    countdownRef.current = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(countdownRef.current!);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => { if (countdownRef.current) clearInterval(countdownRef.current); };
  }, []);

  const advanceText = hasMore ? 'Next question' : 'See your results';

  // Wrong-answer/correct feedback copy — English by default (English-medium
  // CBSE platform). Hinglish is shown only when the student explicitly chose
  // Hindi in /settings (persisted device choice); other languages keep
  // English until real translations exist.
  const hinglishFeedback = studentPrefersHinglish();
  const hinglishExplanations: Record<string, string> = hinglishFeedback
    ? {
        correct: 'Bilkul sahi! Perfect understanding.',
        incorrect: 'Galat answer. Chalo, seekhte hain!',
      }
    : {
        correct: 'Exactly right — perfect understanding.',
        incorrect: "Not quite — let's learn this together!",
      };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6"
    >
      {/* Animated icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-7xl mb-5"
        aria-hidden="true"
      >
        {feedback.isCorrect ? '🎉' : '💪'}
      </motion.div>

      {/* Status badge */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-6"
      >
        <div
          className="text-3xl font-bold mb-1"
          style={{
            fontFamily: DISPLAY_FONT,
            color: feedback.isCorrect ? MINT : RED_LIGHT,
          }}
        >
          {feedback.isCorrect ? 'Correct! ✓' : 'Not quite ✗'}
        </div>
        <p
          className="text-sm"
          style={{ color: TEXT_SECONDARY, fontFamily: BODY_FONT }}
        >
          {feedback.isCorrect ? hinglishExplanations.correct : hinglishExplanations.incorrect}
        </p>
      </motion.div>

      {/* Points animation */}
      {feedback.isCorrect && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-5 px-4 py-2 rounded-full"
          style={{
            backgroundColor: 'rgba(52,211,153,0.1)',
            border: '1px solid rgba(52,211,153,0.2)',
          }}
        >
          <span className="text-sm font-semibold" style={{ color: MINT, fontFamily: DISPLAY_FONT }}>
            +{feedback.pointsEarned} points
          </span>
        </motion.div>
      )}

      {/* Mastery change */}
      {feedback.masteryDelta !== 0 && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.25, type: 'spring' }}
          className="flex items-center gap-2 mb-5"
          style={{ color: feedback.masteryDelta > 0 ? MINT : RED_LIGHT }}
          aria-live="polite"
        >
          <span className="text-xs" style={{ fontFamily: BODY_FONT }}>
            Mastery: {feedback.masteryBefore}% → {feedback.masteryAfter}%
          </span>
          <span className="text-sm font-bold">
            {feedback.masteryDelta > 0 ? '↑' : '↓'}{Math.abs(feedback.masteryDelta)}%
          </span>
        </motion.div>
      )}

      {/* Explanation */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm mb-8 p-4 rounded-xl text-sm leading-relaxed"
        style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          color: TEXT_BODY,
          fontFamily: BODY_FONT,
        }}
        role="note"
        aria-label="Explanation"
      >
        {feedback.isCorrect && feedback.correctIndex !== feedback.selectedIndex ? (
          <>
            <strong style={{ color: MINT }}>{hinglishFeedback ? 'Sahi jawab! ' : 'Correct! '}</strong>
            {feedback.explanation}
          </>
        ) : (
          <>
            <strong style={{ color: RED_LIGHT }}>{hinglishFeedback ? 'Sahi jawab: ' : 'Correct answer: '}</strong>
            {feedback.modelAnswer || feedback.explanation}
          </>
        )}
      </motion.div>

      {/* Copy-worthy answer — after a CORRECT free-text answer, the model
          version side-by-side with the student's, showing what the model had
          that the student's lacked (the thing examiners reward) */}
      {feedback.isCorrect && feedback.studentAnswer && feedback.modelAnswer && (
        <CopyWorthyCard feedback={feedback} />
      )}

      {/* Board-style model answer on wrong free-text answers — numbered,
          marked from the authored rubric when the question carries one */}
      {!feedback.isCorrect && feedback.studentAnswer !== undefined && (feedback.modelAnswer || feedback.markingFeedback) && (
        <ModelAnswerBoard feedback={feedback} />
      )}

      {/* Audit trail — collapsed provenance: mode, source, check rule,
          coaching. Renders nothing when the server sent no trail. */}
      <AuditTrail trail={feedback.trail} />

      {/* §5 self-explanation — the child names the trap, not just receives
          the correction. One tap, un-tap on re-tap, logged to the local
          mix-ups journal; never graded, never sent. */}
      {!feedback.isCorrect && onTagMixup && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="w-full max-w-sm mb-2"
          data-testid="mixup-row"
        >
          <p className="text-xs mb-2 text-center" style={{ color: TEXT_MUTED, fontFamily: BODY_FONT }}>
            What happened? (optional — helps you spot your own pattern)
          </p>
          <div className="flex gap-2 justify-center">
            {([
              { trap: 'misread', label: 'I misread it' },
              { trap: 'wrong_rule', label: 'Wrong rule' },
              { trap: 'guessed', label: 'I guessed' },
            ]).map(({ trap, label }) => {
              const active = mixupTag === trap;
              return (
                <button
                  key={trap}
                  onClick={() => onTagMixup(trap)}
                  aria-pressed={active}
                  data-testid={`mixup-${trap}`}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                  style={{
                    backgroundColor: active ? 'rgba(251,191,36,0.18)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? GOLD_CORE : 'rgba(255,255,255,0.12)'}`,
                    color: active ? GOLD_PALE : TEXT_SECONDARY,
                    fontFamily: BODY_FONT,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Misconception-aware remediation — authored corpus guidance shown
          only on wrong answers, when the node's pedagogy covers it */}
      {!feedback.isCorrect && (feedback.misconception || feedback.remediation || (feedback.reviewTopics && feedback.reviewTopics.length > 0)) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg rounded-xl p-4 mt-2 text-sm text-left"
          style={{
            backgroundColor: 'rgba(251,191,36,0.06)',
            border: '1px solid rgba(251,191,36,0.2)',
            color: TEXT_BODY,
            fontFamily: BODY_FONT,
          }}
          role="note"
          aria-label="Why this went wrong"
        >
          {feedback.misconception && (
            <p>
              <strong style={{ color: '#fbbf24' }}>Common mix-up: </strong>
              {feedback.misconception}
            </p>
          )}
          {feedback.remediation && (
            <p className="mt-2">
              <strong style={{ color: '#fbbf24' }}>How to fix it: </strong>
              {feedback.remediation}
            </p>
          )}
          {feedback.reviewTopics && feedback.reviewTopics.length > 0 && (
            <div className="mt-2.5 flex flex-wrap gap-2">
              <span style={{ color: TEXT_MUTED }} className="text-xs self-center">Revisit:</span>
              {feedback.reviewTopics.map((t) => (
                <a
                  key={t.slug}
                  href={`/learn/${t.slug}`}
                  className="text-xs px-2.5 py-1 rounded-full transition-transform hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(251,191,36,0.12)',
                    border: '1px solid rgba(251,191,36,0.3)',
                    color: '#fbbf24',
                  }}
                >
                  {t.title}
                </a>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* EXAMREADY "Stuck?" rescue protocol — after two consecutive wrong
          answers. Three honest ways through, in rising order of support:
          an authored hint, the story's worked walkthrough, easier practice. */}
      {showRescue && (
        <RescueCard topic={rescueTopic} onEasierPractice={onEasierPractice} />
      )}

      {/* Advance button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onAdvance}
        className="w-full max-w-sm py-3.5 rounded-xl font-semibold text-sm relative overflow-hidden"
        style={{
          fontFamily: DISPLAY_FONT,
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          color: '#131118',
          boxShadow: '0 4px 20px rgba(251,191,36,0.3)',
        }}
        aria-label={`${advanceText} (${countdown}s)`}
      >
        {advanceText} ({countdown}s)
      </motion.button>

      {/* Auto-advance indicator */}
      <p className="text-xs mt-3" style={{ color: TEXT_MUTED, fontFamily: BODY_FONT }}>
        {hinglishFeedback
          ? `Auto-advancing in ${countdown}s • Ya phir button dabao`
          : `Auto-advancing in ${countdown}s • or press the button`}
      </p>
    </motion.div>
  );
}

// ─── "Stuck?" rescue protocol (EXAMREADY) ────────────────────────────────────

/**
 * Opens after two consecutive wrong answers. Three steps, each optional and
 * each honest:
 *   hint            — the node's own authored idea (eli5 → walkthrough opener
 *                     → definition, node-id scrubbed); hidden when the topic
 *                     is not a corpus node or the fetch fails;
 *   watch-it-solved — the story walkthrough's worked example (same node);
 *   easier practice — a fresh session on the same topic; the platform's
 *                     selector already steers easier questions after wrong
 *                     answers (its EASIER_THRESHOLD is 2, matching this card).
 * Nothing invented: every text comes from the authored corpus or the copy
 * below.
 */
function RescueCard({ topic, onEasierPractice }: { topic: string; onEasierPractice: () => void }) {
  const [hint, setHint] = useState<string | null>(null);
  const [hintShown, setHintShown] = useState(false);
  const [hintUnavailable, setHintUnavailable] = useState(false);
  const nodeTopic = isNodeId(topic);

  const loadHint = () => {
    if (hintShown) return;
    setHintShown(true);
    fetchRescueHint(topic)
      .then(h => {
        if (h) setHint(h);
        else setHintUnavailable(true);
      })
      .catch(() => setHintUnavailable(true));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg rounded-2xl p-4 mt-2 text-left"
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.10)',
        fontFamily: BODY_FONT,
      }}
      role="region"
      aria-label="Stuck? rescue steps"
      data-testid="rescue-card"
    >
      <p className="text-sm font-semibold mb-3" style={{ color: GOLD_PALE, fontFamily: DISPLAY_FONT }}>
        Stuck? That&apos;s normal — here&apos;s the way through.
      </p>

      <div className="space-y-2">
        {/* 1 · hint */}
        {nodeTopic && !hintUnavailable && (
          <div data-testid="rescue-hint">
            {!hintShown ? (
              <button
                type="button"
                onClick={loadHint}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
                style={{
                  backgroundColor: 'rgba(251,191,36,0.08)',
                  border: '1px solid rgba(251,191,36,0.25)',
                  color: GOLD_LIGHT,
                  cursor: 'pointer',
                }}
                data-testid="rescue-hint-btn"
              >
                Show me a hint
              </button>
            ) : hint ? (
              <div
                className="px-3.5 py-2.5 rounded-xl text-sm leading-relaxed"
                style={{
                  backgroundColor: 'rgba(251,191,36,0.06)',
                  border: '1px solid rgba(251,191,36,0.2)',
                  color: TEXT_BODY,
                }}
                data-testid="rescue-hint-text"
              >
                <strong style={{ color: GOLD_LIGHT }}>The idea, in simple words: </strong>
                {hint}
              </div>
            ) : null}
          </div>
        )}

        {/* 2 · watch it solved — the story walkthrough */}
        {nodeTopic && (
          <a
            href={`/learn/${topic}/story`}
            data-testid="rescue-watch"
            className="flex items-center justify-between gap-3 w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              backgroundColor: 'rgba(52,211,153,0.07)',
              border: '1px solid rgba(52,211,153,0.25)',
              color: MINT,
            }}
          >
            <span>
              Watch it solved
              <span className="block text-[11px] font-normal mt-0.5" style={{ color: TEXT_SECONDARY }}>
                The story walkthrough solves a problem step by step.
              </span>
            </span>
            <span aria-hidden="true">→</span>
          </a>
        )}

        {/* 3 · easier practice — a fresh, selector-eased round */}
        <button
          type="button"
          onClick={onEasierPractice}
          data-testid="rescue-easier"
          className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.10)',
            color: TEXT_BODY,
            cursor: 'pointer',
          }}
        >
          Practice easier questions
          <span className="block text-[11px] font-normal mt-0.5" style={{ color: TEXT_MUTED }}>
            A fresh, gentler round on this topic.
          </span>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Screen: Summary ─────────────────────────────────────────────────────────

function SummaryScreen({
  summary,
  streakDays,
  masteryPercent,
  onRestart,
  calibration,
}: {
  summary: SessionSummary;
  streakDays: number;
  masteryPercent: number;
  onRestart: () => void;
  /** EXAMREADY self-check tallies — only the chips actually tapped. */
  calibration: Calibration;
}) {
  const router = useRouter();
  // Rotating answer-writing tip — resolved after mount so SSR and the first
  // client render agree; the rotation advances on every results screen.
  const [answerTip, setAnswerTip] = useState('');
  useEffect(() => { setAnswerTip(nextAnswerTip()); }, []);

  if (!summary) return null;

  const accuracyColor = summary.accuracy >= 80
    ? MINT
    : summary.accuracy >= 50
      ? GOLD
      : RED;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      className="flex flex-col items-center px-5 py-8 min-h-[calc(100vh-100px)]"
    >
      {/* Celebration emoji */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 150, damping: 12 }}
        className="text-7xl mb-4"
        aria-hidden="true"
      >
        {summary.accuracy >= 80 ? '🏆' : summary.accuracy >= 50 ? '💪' : '📚'}
      </motion.div>

      <h2
        className="text-2xl font-bold text-center mb-1"
        style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}
      >
        {summary.encouragingMessage}
      </h2>

      {/* Score */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="text-center my-6"
      >
        <div className="text-5xl font-bold mb-1" style={{ fontFamily: DISPLAY_FONT, color: accuracyColor }}>
          {summary.correctCount}/{summary.totalQuestions}
        </div>
        <p className="text-sm" style={{ color: TEXT_SECONDARY, fontFamily: BODY_FONT }}>
          questions right · {summary.accuracy}% accuracy
        </p>
      </motion.div>

      {/* §8 capability lead — what the child can now DO, before points.
          Real topics from real graded answers; honest "still building"
          names the rest without shame. */}
      {(summary.capabilities.solid.length > 0 || summary.capabilities.building.length > 0) && (
        <div
          className="w-full max-w-sm rounded-xl p-4 mb-6 text-left"
          style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          data-testid="capability-card"
        >
          {summary.capabilities.solid.length > 0 && (
            <p className="text-sm mb-2" style={{ color: TEXT_BODY, fontFamily: BODY_FONT }}>
              <strong style={{ color: MINT }}>You&apos;re getting it: </strong>
              {summary.capabilities.solid.map(friendlyNodeTitle).join(' · ')}
            </p>
          )}
          {summary.capabilities.building.length > 0 && (
            <p className="text-sm" style={{ color: TEXT_SECONDARY, fontFamily: BODY_FONT }}>
              <strong style={{ color: GOLD_PALE }}>Still building: </strong>
              {summary.capabilities.building.map(friendlyNodeTitle).join(' · ')}
            </p>
          )}
        </div>
      )}

      {/* EXAMREADY calibration self-check — shown only when at least one
          confidence chip was actually tapped this session. Pure client-side
          arithmetic over the student's own taps; never affects grading. */}
      {calibrationHasData(calibration) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
          className="w-full max-w-sm mb-6 p-4 rounded-xl text-left"
          style={{
            backgroundColor: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          role="note"
          aria-label="Confidence self-check"
          data-testid="calibration-panel"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: GOLD }}>
            Your self-check
          </p>
          <div className="space-y-1.5 text-sm" style={{ color: TEXT_BODY, fontFamily: BODY_FONT }}>
            {calibration.confident.total > 0 && (
              <p data-testid="calib-confident">
                <span className="font-semibold" style={{ color: GOLD_LIGHT }}>Confident:</span>{' '}
                {calibration.confident.right} of {calibration.confident.total} were right
              </p>
            )}
            {calibration.guess.total > 0 && (
              <p data-testid="calib-guess">
                <span className="font-semibold" style={{ color: GOLD_LIGHT }}>Just guessing:</span>{' '}
                {calibration.guess.right} of {calibration.guess.total} were right
              </p>
            )}
          </div>
          <p className="text-[11px] mt-2 leading-relaxed" style={{ color: TEXT_MUTED, fontFamily: BODY_FONT }}>
            From the chips you tapped before each reveal. When your confident answers beat your
            guesses, you know what you know.
          </p>
        </motion.div>
      )}

      {/* Stats grid */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-6">
        {/* Mastery */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-4"
          style={{
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.15)',
          }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill={GOLD} aria-hidden="true">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-xs" style={{ color: GOLD, fontFamily: BODY_FONT }}>Mastery</span>
          </div>
          <div className="text-2xl font-bold" style={{ fontFamily: DISPLAY_FONT, color: GOLD_LIGHT }}>
            {summary.masteryBefore}% → {summary.masteryAfter}%
          </div>
          <div className="text-xs mt-0.5" style={{ color: summary.masteryDelta > 0 ? MINT : RED_LIGHT }}>
            {summary.masteryDelta > 0 ? '+' : ''}{summary.masteryDelta}%
          </div>
        </motion.div>

        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl p-4"
          style={{
            background: 'rgba(245,158,11,0.08)',
            border: '1px solid rgba(245,158,11,0.15)',
          }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <span aria-hidden="true">🔥</span>
            <span className="text-xs" style={{ color: GOLD, fontFamily: BODY_FONT }}>Streak</span>
          </div>
          <div className="text-2xl font-bold" style={{ fontFamily: DISPLAY_FONT, color: GOLD_LIGHT }}>
            {summary.streakBefore} → {summary.streakAfter}
          </div>
          <div className="text-xs mt-0.5" style={{ color: MINT }}>
            days 🔥
          </div>
        </motion.div>
      </div>

      {/* Mastery bar visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm mb-6"
      >
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs" style={{ color: TEXT_SECONDARY, fontFamily: BODY_FONT }}>
            Overall Mastery
          </span>
          <span className="text-sm font-bold" style={{ fontFamily: DISPLAY_FONT, color: GOLD_LIGHT }}>
            {masteryPercent}%
          </span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${masteryPercent}%` }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.7 }}
            style={{
              background: 'linear-gradient(90deg, #f59e0b, #fcd34d)',
              boxShadow: '0 0 16px rgba(245,158,11,0.4)',
            }}
          />
        </div>
      </motion.div>

      {/* Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="w-full max-w-sm mb-8 p-4 rounded-xl"
        style={{
          backgroundColor: 'rgba(251,191,36,0.06)',
          border: '1px solid rgba(251,191,36,0.12)',
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: TEXT_SECONDARY, fontFamily: BODY_FONT }}>
          💡 <span style={{ color: GOLD_PALE }}>{summary.hint}</span>
        </p>
      </motion.div>

      {/* Answer-writing tip — one curated board tip per results screen */}
      {answerTip && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="w-full max-w-sm mb-8 p-4 rounded-xl text-left"
          style={{
            backgroundColor: 'rgba(52,211,153,0.05)',
            border: '1px solid rgba(52,211,153,0.22)',
          }}
          role="note"
          aria-label="Answer-writing tip"
          data-testid="answer-tip"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: MINT }}>
            Answer-writing tip
          </p>
          <p className="text-sm leading-relaxed" style={{ color: TEXT_BODY, fontFamily: BODY_FONT }}>
            {answerTip}
          </p>
        </motion.div>
      )}

      {/* Action buttons */}
      <div className="w-full max-w-sm space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRestart}
          className="w-full py-4 rounded-2xl font-bold text-base relative overflow-hidden"
          style={{
            fontFamily: DISPLAY_FONT,
            color: '#131118',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            boxShadow: '0 8px 32px rgba(251,191,36,0.3)',
          }}
          aria-label="Practice Again"
        >
          Practice Again 🔄
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (typeof window !== 'undefined' && window.history.length > 1) {
              window.history.back();
            } else {
              router.push('/dashboard');
            }
          }}
          className="w-full py-3 rounded-2xl font-medium text-sm"
          style={{
            fontFamily: DISPLAY_FONT,
            color: TEXT_MUTED,
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(255,255,255,0.03)',
          }}
          aria-label="Go back to topics"
        >
          ← Back to Topics
        </motion.button>
      </div>
    </motion.div>
  );
}

// ─── Screen: Error ───────────────────────────────────────────────────────────

function ErrorScreen({ message, onRetry, onBack }: {
  message: string;
  onRetry: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-6xl mb-4"
        aria-hidden="true"
      >
        😕
      </motion.div>
      <h3
        className="text-lg font-bold mb-2 text-center"
        style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}
      >
        Kuch gadbad ho gayi
      </h3>
      <p
        className="text-sm text-center mb-6 max-w-xs leading-relaxed"
        style={{ color: TEXT_SECONDARY, fontFamily: BODY_FONT }}
        role="alert"
      >
        {message}
      </p>
      <div className="flex gap-3 w-full max-w-xs">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRetry}
          className="flex-1 py-3 rounded-xl font-semibold text-sm"
          style={{
            fontFamily: DISPLAY_FONT,
            background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            color: '#131118',
          }}
        >
          Try Again
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className="flex-1 py-3 rounded-xl font-medium text-sm"
          style={{
            fontFamily: DISPLAY_FONT,
            color: TEXT_SECONDARY,
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.03)',
          }}
        >
          Go Back
        </motion.button>
      </div>
    </div>
  );
}

// ─── Spaced-repeat card (§4 interleave) ──────────────────────────────────────

/**
 * A due SM-2 item surfaced inside a practice session. Retrieval is the
 * point: the child recalls first, reveals the authored answer, then
 * self-grades — the same honest protocol the /review queue runs. The grade
 * goes to the real scheduler (POST /api/progress/review/answer), never into
 * practice scoring.
 */
function ReviewCard({ item, onGrade }: { item: ReviewCardItem; onGrade: (q: number) => void }) {
  const [revealed, setRevealed] = useState(false);
  const [graded, setGraded] = useState<number | null>(null);
  const startedRef = useRef(Date.now());

  const pick = (q: number) => {
    if (graded !== null) return;
    setGraded(q);
    void onGrade(q);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto px-4 py-6"
      data-testid="review-card"
    >
      {/* Honest label — the schedule is legible, not hidden */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <span
          className="text-xs px-3 py-1 rounded-full font-semibold"
          style={{ backgroundColor: 'rgba(139,92,246,0.15)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.3)', fontFamily: BODY_FONT }}
        >
          🔁 Spaced repeat{typeof item.intervalDays === 'number' ? ` — you saw this ${item.intervalDays === 0 ? 'today' : `${item.intervalDays} day${item.intervalDays === 1 ? '' : 's'} ago`}` : ''}
        </span>
      </div>

      <div
        className="rounded-2xl p-5"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(139,92,246,0.25)' }}
      >
        <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#c4b5fd', fontFamily: BODY_FONT }}>
          {item.conceptName}
        </p>
        <p className="text-base leading-relaxed mb-4" style={{ color: TEXT_BRIGHT, fontFamily: BODY_FONT }}>
          {item.question || 'Before you peek — what do you remember about this?'}
        </p>

        {!revealed ? (
          <button
            onClick={() => { setRevealed(true); startedRef.current = Date.now(); }}
            className="w-full py-3 rounded-xl font-semibold text-sm"
            style={{ background: 'rgba(139,92,246,0.18)', color: '#ddd6fe', border: '1px solid rgba(139,92,246,0.35)', fontFamily: DISPLAY_FONT }}
            data-testid="review-reveal"
          >
            I&apos;ve tried to recall — show the answer
          </button>
        ) : (
          <>
            {item.answer && (
              <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <p className="text-sm whitespace-pre-wrap" style={{ color: TEXT_BODY, fontFamily: BODY_FONT }}>{item.answer}</p>
              </div>
            )}
            {item.slug && (
              <a href={`/learn/${item.slug}`} className="block text-xs mb-4" style={{ color: '#c4b5fd' }}>
                Re-open the full lesson →
              </a>
            )}
            <p className="text-xs mb-2" style={{ color: TEXT_MUTED, fontFamily: BODY_FONT }}>
              How well did you remember it? (be honest — it sets your next review)
            </p>
            <div className="grid grid-cols-3 gap-2">
              {([
                { q: 0, label: 'Blank', tone: { bg: 'rgba(239,68,68,0.12)', bd: 'rgba(239,68,68,0.35)', tx: '#fca5a5' } },
                { q: 3, label: 'Almost', tone: { bg: 'rgba(245,158,11,0.12)', bd: 'rgba(245,158,11,0.35)', tx: GOLD_PALE } },
                { q: 5, label: 'Got it', tone: { bg: 'rgba(52,211,153,0.12)', bd: 'rgba(52,211,153,0.35)', tx: MINT } },
              ]).map(({ q, label, tone }) => (
                <button
                  key={q}
                  onClick={() => pick(q)}
                  disabled={graded !== null}
                  data-testid={`review-grade-${q}`}
                  className="py-2.5 rounded-xl text-xs font-bold transition-all"
                  style={{
                    backgroundColor: graded === q ? tone.bd : tone.bg,
                    border: `1px solid ${tone.bd}`,
                    color: tone.tx,
                    fontFamily: BODY_FONT,
                    opacity: graded !== null && graded !== q ? 0.4 : 1,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function PracticePage() {
  const store = usePracticeStore();
  const {
    screen, questions, currentIndex, feedbacks, summary, errorMessage, sessionTotal,
    topic, subject, isLoading, streakDays, masteryPercent, masterySubject, confidence,
    startSession, submitAnswer, advanceToNext, completeSession, reset, setConfidence,
    reviewItems, reviewServed, submitReviewGrade, mixups, tagMixup,
  } = store;

  const initialized = useRef(false);
  const [isOffline, setIsOffline] = useState(false); // SSR-safe; corrected by effect
  const authUser = useAuthStore((s) => s.user);
  // Node title → node_id for the session's subject/class: backs the
  // "I don't get it" hint on questions that arrive with no node_id.
  const [topicNodes, setTopicNodes] = useState<Record<string, string>>({});
  useEffect(() => {
    if (!subject || !authUser?.class_level) return;
    let cancelled = false;
    api.get<{ nodes?: { node_id?: string; title?: string; has_eli5?: boolean; has_walkthrough?: boolean }[] }>(
      `/api/content/enrichment?subject=${encodeURIComponent(subject)}&class_level=${authUser.class_level}&limit=500`
    ).then((d) => {
      if (cancelled) return;
      const m: Record<string, string> = {};
      for (const n of d?.nodes || []) {
        if (n?.title && n?.node_id && (n.has_eli5 || n.has_walkthrough)) {
          m[String(n.title).toLowerCase()] = n.node_id;
        }
      }
      setTopicNodes(m);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [subject, authUser?.class_level]);
  const handleAdvanceRef = useRef(advanceToNext);
  const handleCompleteRef = useRef(completeSession);
  const startSessionRef = useRef(startSession);

  handleAdvanceRef.current = advanceToNext;
  handleCompleteRef.current = completeSession;
  startSessionRef.current = startSession;

  // Init profile on mount
  useEffect(() => {
    if (!initialized.current) {
      store.init();
      initialized.current = true;
    }
  }, [store]);

  // Galaxy Home handoff: /practice?node=<corpus node id>&subject=<slug>
  // focuses the session on exactly that star's topic and starts it once.
  const handoffStarted = useRef(false);
  useEffect(() => {
    if (handoffStarted.current) return;
    let node: string | null = null;
    let subj: string | null = null;
    try {
      const q = new URLSearchParams(window.location.search);
      node = q.get('node');
      subj = q.get('subject');
    } catch { /* SSR guard — param handoff is browser-only */ }
    if (!node) return;
    handoffStarted.current = true;
    const subject = subj || 'general';
    store.setTopic(subject, node);
    void startSessionRef.current(node, subject);
  }, [store]);

  // Network listener for offline sync + offline banner
  useEffect(() => {
    const sync = () => setIsOffline(!navigator.onLine);
    sync();
    window.addEventListener('online', sync);
    window.addEventListener('offline', sync);
    const handleOnline = async () => {
      if (navigator.onLine) {
        try { await syncQueuedAnswers(); } catch { /* non-critical */ }
      }
    };
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('online', sync);
      window.removeEventListener('offline', sync);
    };
  }, []);

  // Handle answer from question screen
  const handleAnswer = useCallback(async (questionId: string, selectedIndex: number, textAnswer?: string) => {
    await submitAnswer(questionId, selectedIndex, textAnswer);
  }, [submitAnswer]);

  // Advance: go to next question or complete session
  const handleAdvance = useCallback(() => {
    store.clearTimer();
    const { currentIndex: ci, questions: qs } = store;
    if (ci < qs.length - 1) {
      handleAdvanceRef.current();
    } else {
      handleCompleteRef.current();
    }
  }, [store]);

  // Start a new session
  const handleStart = useCallback(async () => {
    await startSession(topic, subject);
  }, [startSession, topic, subject]);

  // Reset and go back to ready screen
  const handleRestart = useCallback(() => {
    reset();
  }, [reset]);

  // Derived: current question
  const currentQuestion = useMemo(
    () => questions[currentIndex] ?? null,
    [questions, currentIndex]
  );

  // Derived: latest feedback
  const latestFeedback = useMemo(
    () => feedbacks[feedbacks.length - 1] ?? null,
    [feedbacks]
  );

  // Derived: is this the last question?
  const isLastQuestion = currentIndex === questions.length - 1;

  // EXAMREADY: trailing wrong-answer streak — two in a row open the
  // "Stuck?" rescue card on the feedback screen.
  const wrongStreak = useMemo(() => {
    let n = 0;
    for (let i = feedbacks.length - 1; i >= 0 && !feedbacks[i].isCorrect; i--) {
      n += 1;
    }
    return n;
  }, [feedbacks]);

  // EXAMREADY: confidence calibration tallies — client-side only, pairing the
  // pre-reveal chips with the real graded outcomes for the summary display.
  const calibration = useMemo(() => {
    const cal = emptyCalibration();
    for (const f of feedbacks) {
      tallyCalibration(cal, confidence[f.questionId], f.isCorrect);
    }
    return cal;
  }, [feedbacks, confidence]);

  // Rescue step 3: a fresh session on the same topic. The platform's selector
  // genuinely eases the pool after recorded wrong answers, so "easier" here
  // is the backend's own adaptation, not a local promise.
  const handleEasierPractice = useCallback(() => {
    store.clearTimer();
    void startSessionRef.current(topic, subject);
  }, [store, topic, subject]);

  return (
    <div className="min-h-screen" style={{
      background: 'radial-gradient(ellipse at top, rgba(251,191,36,0.06) 0%, #0a0a0f 45%, #060609 100%)',
      color: TEXT_PRIMARY,
      fontFamily: BODY_FONT,
    }}>
      {/* Global TopBar — always visible during active session */}
      {(screen === 'active' || screen === 'feedback') && (
        <TopBar
          streakDays={streakDays}
          masteryPercent={masteryPercent}
          masterySubject={masterySubject}
          topic={topic}
        />
      )}

      {/* Offline banner */}
      {screen === 'active' && isOffline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="px-4 py-2 text-center text-xs font-medium"
          style={{
            backgroundColor: 'rgba(245,158,11,0.1)',
            borderBottom: '1px solid rgba(245,158,11,0.15)',
            color: GOLD_LIGHT,
            fontFamily: BODY_FONT,
          }}
          role="status"
          aria-live="polite"
        >
          📴 Offline mode — answers will sync when you reconnect
        </motion.div>
      )}

      {/* Main content with AnimatePresence */}
      <main className="max-w-lg mx-auto" role="main">
        <AnimatePresence mode="wait">

          {/* IDLE: Ready screen */}
          {screen === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TopBar
                streakDays={streakDays}
                masteryPercent={masteryPercent}
                masterySubject={masterySubject}
                topic={topic}
              />
              <ReadyScreen
                topic={topic}
                subject={subject}
                onStart={handleStart}
              />
            </motion.div>
          )}

          {/* LOADING */}
          {screen === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TopBar
                streakDays={streakDays}
                masteryPercent={masteryPercent}
                masterySubject={masterySubject}
                topic={topic}
              />
              <LoadingScreen topic={topic} />
            </motion.div>
          )}

          {/* ACTIVE: Question */}
          {screen === 'active' && currentQuestion && (
            <motion.div
              key={`q-${currentQuestion.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 pt-4 pb-8"
            >
              <QuestionScreen
                question={currentQuestion}
                index={currentIndex}
                total={sessionTotal}
                onAnswer={handleAnswer}
                confidence={confidence[currentQuestion.id] ?? null}
                onConfidence={setConfidence}
                hintNode={(() => {
                  const key = (currentQuestion.topic || '').trim().toLowerCase();
                  if (!key || key.length < 3) return undefined;
                  if (topicNodes[key]) return topicNodes[key];
                  let best: string | undefined;
                  for (const [t] of Object.entries(topicNodes)) {
                    if (t.includes(key) || key.includes(t)) {
                      if (!best || t.length < best.length) best = t;
                    }
                  }
                  return best ? topicNodes[best] : undefined;
                })()}
              />
            </motion.div>
          )}

          {/* REVIEW: a due SM-2 item interleaved mid-session (§4) */}
          {screen === 'review' && reviewItems[reviewServed] && (
            <motion.div
              key={`review-${reviewItems[reviewServed].id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 pt-4"
            >
              <ReviewCard
                item={reviewItems[reviewServed]}
                onGrade={submitReviewGrade}
              />
            </motion.div>
          )}

          {/* FEEDBACK */}
          {screen === 'feedback' && latestFeedback && (
            <motion.div
              key={`feedback-${latestFeedback.questionId}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 pt-4"
            >
              <FeedbackScreen
                feedback={latestFeedback}
                onAdvance={handleAdvance}
                hasMore={!isLastQuestion}
                showRescue={wrongStreak >= 2}
                rescueTopic={currentQuestion?.topic ?? ''}
                onEasierPractice={handleEasierPractice}
                mixupTag={mixups[latestFeedback.questionId]}
                onTagMixup={(trap) => tagMixup(latestFeedback.questionId, trap, currentQuestion?.topic ?? topic)}
              />
            </motion.div>
          )}

          {/* SUMMARY */}
          {screen === 'summary' && summary && (
            <motion.div
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SummaryScreen
                summary={summary}
                streakDays={streakDays}
                masteryPercent={masteryPercent}
                onRestart={handleRestart}
                calibration={calibration}
              />
            </motion.div>
          )}

          {/* ERROR */}
          {screen === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-8"
            >
              <TopBar
                streakDays={streakDays}
                masteryPercent={masteryPercent}
                masterySubject={masterySubject}
                topic={topic}
              />
              <ErrorScreen
                message={errorMessage}
                onRetry={handleStart}
                onBack={handleRestart}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
