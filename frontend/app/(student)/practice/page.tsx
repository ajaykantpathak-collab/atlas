'use client';

// ─── Fonts (Plus Jakarta Sans body; Syne via --font-display for headings) ─────

import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';

// ─── Core React / Framer Motion ───────────────────────────────────────────────

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import katex from 'katex';

// ─── State ───────────────────────────────────────────────────────────────────

import { create } from 'zustand';

// ─── Offline cache ───────────────────────────────────────────────────────────

import offlineCache from '@/lib/offlineCache';
import { getAuthToken } from "@/lib/api";

// ─── Constants ───────────────────────────────────────────────────────────────

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8001';
const TOTAL_QUESTIONS = 5;
const AUTO_ADVANCE_MS = 2200;

// Atlas palette — deep dark base, gold primary accents, semantic colors kept.
const GOLD = '#f59e0b';        // gold-500
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
  correctIndex: number;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
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
}

// ─── Zustand Store ────────────────────────────────────────────────────────────

interface PracticeState {
  screen: 'idle' | 'loading' | 'active' | 'feedback' | 'summary' | 'error';
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

  init: () => void;
  setTopic: (subject: string, topic: string) => void;
  startSession: (topic: string, subject: string) => Promise<void>;
  submitAnswer: (questionId: string, selectedIndex: number) => Promise<void>;
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
  streakDays: 0,
  masteryPercent: 0,
  masterySubject: 'Mathematics',
  queuedForSync: false,

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
      const token = getAuthToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      try {
        const res = await fetch(`${API_BASE}/api/progress/dashboard`, {
          headers,
          signal: AbortSignal.timeout(6000),
        });
        if (res.ok) {
          const data = await res.json();
          set({ streakDays: Number(data.streak ?? 0) || 0 });
        }
      } catch { /* honest zero stays */ }
      try {
        const res = await fetch(`${API_BASE}/api/progress/overview`, {
          headers,
          signal: AbortSignal.timeout(6000),
        });
        if (res.ok) {
          const data = await res.json();
          const avg = Number(data.avgMastery ?? 0) || 0;
          set({ masteryPercent: Math.max(0, Math.min(100, Math.round(avg))) });
        }
      } catch { /* honest zero stays */ }
    };
    loadReal();
  },

  setTopic: (subject: string, topic: string) => set({ subject, topic }),

  startSession: async (topic: string, subject: string) => {
    set({ isLoading: true, screen: 'loading', errorMessage: '' });

    try {
      const token = getAuthToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      // Try the proper /api/practice/start endpoint first
      let questions: Question[] = [];
      let sessionId = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

      try {
        const res = await fetch(
          `${API_BASE}/api/practice/start`,
          {
            method: 'POST',
            headers,
            body: JSON.stringify({
              subject,
              topic,
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
          questions = (session.questions || []).map((q: any) => ({
            id: q.id,
            text: q.text,
            latex: q.latex,
            options: q.options || [],
            correctIndex: q.correct_option ?? 0,
            subject: q.subject || subject,
            topic: q.topic || topic,
            difficulty: q.difficulty || 'medium',
          }));
          await cacheQuestions(topic, questions);
        } else {
          throw new Error('API error');
        }
      } catch {
        // Fallback: try the simpler questions endpoint
        try {
          const res = await fetch(
            `${API_BASE}/api/practice/questions?topic=${encodeURIComponent(topic)}&subject=${encodeURIComponent(subject)}&count=${TOTAL_QUESTIONS}`,
            { headers, signal: AbortSignal.timeout(8000) }
          );
          if (!res.ok) throw new Error('API error');
          const data = await res.json();
          questions = (data.questions ?? data).map((q: any) => ({
            id: q.id,
            text: q.text,
            latex: q.latex,
            options: q.options || [],
            correctIndex: q.correct_option ?? q.correctIndex ?? 0,
            subject: q.subject || subject,
            topic: q.topic || topic,
            difficulty: q.difficulty || 'medium',
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

      set({
        screen: 'active',
        questions: questions.slice(0, TOTAL_QUESTIONS),
        currentIndex: 0,
        answers: new Map(),
        feedbacks: [],
        summary: null,
        sessionId,
        startTime: Date.now(),
        isLoading: false,
      });
    } catch (err) {
      set({
        screen: 'error',
        errorMessage: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        isLoading: false,
      });
    }
  },

  submitAnswer: async (questionId: string, selectedIndex: number) => {
    const { questions, currentIndex, sessionId, startTime, queuedForSync } = get();
    const question = questions[currentIndex];
    if (!question || question.id !== questionId) return;

    const isCorrect = selectedIndex === question.correctIndex;

    // Try submitting to the proper API endpoint for real feedback
    let apiFeedback: { isCorrect: boolean; explanation: string; pointsEarned: number; masteryAfter: number } | null = null;
    try {
      const token = getAuthToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch(
        `${API_BASE}/api/practice/${sessionId}/submit`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            question_id: questionId,
            selected_option: selectedIndex,
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
          masteryAfter: data.feedback?.mastery_after ?? (isCorrect ? 75 : 60),
        };
      }
    } catch { /* fall back to local computation */ }

    const masteryBefore = get().masteryPercent;
    const masteryAfter = apiFeedback
      ? apiFeedback.masteryAfter
      : isCorrect
        ? Math.min(100, masteryBefore + 8)
        : Math.max(0, masteryBefore - 3);

    const feedback: AnswerFeedback = {
      questionId,
      selectedIndex,
      correctIndex: question.correctIndex,
      isCorrect: apiFeedback?.isCorrect ?? isCorrect,
      explanation: apiFeedback?.explanation || (isCorrect
        ? 'Great thinking! You identified the right approach.'
        : `The correct answer is ${question.options[question.correctIndex]}. ${question.latex ? 'Look at the formula carefully — small signs make a big difference!' : 'Review the concept and try again.'}`),
      pointsEarned: apiFeedback?.pointsEarned ?? (isCorrect ? 10 : 0),
      masteryBefore,
      masteryAfter,
      masteryDelta: masteryAfter - masteryBefore,
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

    // Schedule auto-advance
    const timer = window.setTimeout(() => {
      const { currentIndex: ci, questions: qs } = get();
      if (ci < qs.length - 1) {
        get().advanceToNext();
      } else {
        get().completeSession();
      }
    }, AUTO_ADVANCE_MS);

    set({
      screen: 'feedback',
      advanceTimer: timer,
    });
  },

  advanceToNext: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      set({ screen: 'active', currentIndex: currentIndex + 1 });
    }
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
      'Baat bat ja! 5 din aur aise hi karte raho! 💪',
      'Wow! Your effort is paying off!',
    ];
    const hints = [
      'Come back tomorrow for 2 review questions on this topic.',
      'Try the harder difficulty level next time!',
      "Review the topics you got wrong — they'll appear tomorrow.",
      'Aaj kaafi accha perform kiya! Kal milte hain! 👋',
    ];

    // Pull the REAL post-session streak/mastery from /api/progress
    try {
      const token = getAuthToken();
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const dash = await fetch(`${API_BASE}/api/progress/dashboard`, {
        headers,
        signal: AbortSignal.timeout(5000),
      });
      if (dash.ok) {
        const d = await dash.json();
        newStreak = Number(d.streak ?? streakDays) || 0;
      }
      const ov = await fetch(`${API_BASE}/api/progress/overview`, {
        headers,
        signal: AbortSignal.timeout(5000),
      });
      if (ov.ok) {
        const o = await ov.json();
        const avg = Number(o.avgMastery ?? masteryPercent) || 0;
        newMastery = Math.max(0, Math.min(100, Math.round(avg)));
      }
    } catch { /* keep the pre-session server values — never fabricate */ }

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
    };

    // Persist profile
    try {
      localStorage.setItem(
        'practice_profile',
        JSON.stringify({ streakDays: newStreak, masteryPercent: newMastery, masterySubject })
      );
    } catch { /* ignore */ }

    // Try syncing session to server — prefer the proper session-fetch endpoint
    try {
      const token = getAuthToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const sid = get().sessionId;
      // Try fetching the authoritative session summary from the backend
      await fetch(`${API_BASE}/api/practice/${sid}`, {
        headers,
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
      // Also fire-and-forget the legacy session POST so existing backend code stays compatible
      await fetch(`${API_BASE}/api/practice/session`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ sessionId: sid, summary, answers: feedbacks }),
        signal: AbortSignal.timeout(5000),
      }).catch(() => {});
    } catch { /* non-critical */ }

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
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold" style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}>
            Practice
          </h1>
          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(251,191,36,0.15)', color: GOLD_PALE, border: '1px solid rgba(251,191,36,0.2)' }}>
            {topic}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <MasteryBar percent={masteryPercent} label={masterySubject} />
          <StreakCounter days={streakDays} />
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
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
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
          {topic} — {subject}
        </p>
        <p className="text-xs" style={{ color: TEXT_MUTED, fontFamily: BODY_FONT }}>
          5 questions • 15 min session • Instant feedback
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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-3 rounded-full mb-6"
        style={{
          borderWidth: '3px',
          borderColor: 'rgba(251,191,36,0.2)',
          borderTopColor: GOLD_CORE,
        }}
        aria-hidden="true"
        role="status"
      />
      <p
        className="text-sm animate-pulse"
        style={{ color: TEXT_SECONDARY, fontFamily: BODY_FONT }}
        aria-live="polite"
      >
        {msg}
      </p>
      <p className="text-xs mt-1" style={{ color: TEXT_MUTED }}>
        {topic}
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
}: {
  question: Question;
  index: number;
  total: number;
  onAnswer: (qid: string, idx: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const latexRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setSelected(null);
    setSubmitted(false);
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

  const handleSubmit = () => {
    if (selected === null || submitted) return;
    setSubmitted(true);
    onAnswer(question.id, selected);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && selected !== null && !submitted) {
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
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{ backgroundColor: 'rgba(251,191,36,0.1)', color: GOLD_PALE, border: '1px solid rgba(251,191,36,0.15)' }}
        >
          {question.topic}
        </span>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{ backgroundColor: dc.bg, color: dc.text, border: `1px solid ${dc.border}` }}
        >
          {question.difficulty === 'easy' ? 'आसान' : question.difficulty === 'medium' ? 'मध्यम' : 'कठिन'}
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
        >
          {question.text}
        </p>
        {question.latex && (
          <div
            ref={latexRef}
            className="py-3 px-4 rounded-xl text-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
          />
        )}
      </div>

      {/* Options */}
      <div className="space-y-2.5 flex-1" role="radiogroup" aria-label="Answer options">
        {question.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isSubmittedState = submitted && idx === question.correctIndex;
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
              <span className="flex-1 text-sm">{opt}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Submit button */}
      <motion.button
        whileHover={{ scale: selected !== null && !submitted ? 1.02 : 1 }}
        whileTap={{ scale: selected !== null && !submitted ? 0.97 : 1 }}
        onClick={handleSubmit}
        disabled={selected === null || submitted}
        className="w-full mt-5 py-3.5 rounded-xl font-semibold text-sm transition-all"
        style={{
          fontFamily: DISPLAY_FONT,
          background: selected !== null && !submitted
            ? 'linear-gradient(135deg, #fbbf24, #f59e0b)'
            : 'rgba(255,255,255,0.04)',
          color: selected !== null && !submitted ? '#131118' : TEXT_MUTED,
          border: selected !== null && !submitted ? 'none' : '1px solid rgba(255,255,255,0.08)',
          cursor: selected !== null && !submitted ? 'pointer' : 'not-allowed',
          boxShadow: selected !== null && !submitted ? '0 4px 20px rgba(251,191,36,0.3)' : 'none',
        }}
        aria-label="Submit answer"
      >
        Submit Answer
      </motion.button>
    </motion.div>
  );
}

// ─── Screen: Feedback ────────────────────────────────────────────────────────

function FeedbackScreen({
  feedback,
  onAdvance,
  hasMore,
}: {
  feedback: AnswerFeedback;
  onAdvance: () => void;
  hasMore: boolean;
}) {
  const [countdown, setCountdown] = useState(Math.ceil(AUTO_ADVANCE_MS / 1000));
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

  // Hinglish explanations
  const hinglishExplanations: Record<string, string> = {
    correct: 'Bilkul sahi! Perfect understanding.',
    incorrect: 'Galat answer. Chalo, seekhte hain!',
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
            <strong style={{ color: MINT }}>Sahi jawab! </strong>
            {feedback.explanation}
          </>
        ) : (
          <>
            <strong style={{ color: RED_LIGHT }}>Sahi jawab: </strong>
            {feedback.explanation}
          </>
        )}
      </motion.div>

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
        Auto-advancing in {countdown}s • Ya phir button dabao
      </p>
    </motion.div>
  );
}

// ─── Screen: Summary ─────────────────────────────────────────────────────────

function SummaryScreen({
  summary,
  streakDays,
  masteryPercent,
  onRestart,
}: {
  summary: SessionSummary;
  streakDays: number;
  masteryPercent: number;
  onRestart: () => void;
}) {
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
        <div className="text-sm" style={{ color: TEXT_SECONDARY, fontFamily: BODY_FONT }}>
          {summary.accuracy}% accuracy
        </div>
      </motion.div>

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
          onClick={() => window.history.back()}
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

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function PracticePage() {
  const store = usePracticeStore();
  const {
    screen, questions, currentIndex, feedbacks, summary, errorMessage,
    topic, subject, isLoading, streakDays, masteryPercent, masterySubject,
    startSession, submitAnswer, advanceToNext, completeSession, reset,
  } = store;

  const initialized = useRef(false);
  const handleAdvanceRef = useRef(advanceToNext);
  const handleCompleteRef = useRef(completeSession);

  handleAdvanceRef.current = advanceToNext;
  handleCompleteRef.current = completeSession;

  // Init profile on mount
  useEffect(() => {
    if (!initialized.current) {
      store.init();
      initialized.current = true;
    }
  }, [store]);

  // Network listener for offline sync
  useEffect(() => {
    const handleOnline = async () => {
      if (navigator.onLine) {
        try { await syncQueuedAnswers(); } catch { /* non-critical */ }
      }
    };
    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, []);

  // Handle answer from question screen
  const handleAnswer = useCallback(async (questionId: string, selectedIndex: number) => {
    await submitAnswer(questionId, selectedIndex);
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
      {screen === 'active' && !navigator.onLine && (
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
                total={questions.length}
                onAnswer={handleAnswer}
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
