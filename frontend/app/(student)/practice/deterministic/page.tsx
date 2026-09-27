'use client';

// ─────────────────────────────────────────────────────────────
// Verified Practice — deterministic engine, truth tiers
// Every visible answer is computed and verified server-side.
// Routes: /api/practice/deterministic/*  +  /api/tutor/solve
// Design: Atlas near-black + gold, glass cards, motion entrances.
// ─────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { subjectName } from '@/lib/nodeTitle';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || '';

// ─── Atlas palette (matches /practice) ───────────────────────────

const GOLD = '#f59e0b';
const GOLD_CORE = '#fbbf24';
const GOLD_PALE = '#fde68a';
const GOLD_LIGHT = '#fcd34d';
const MINT = '#34d399';
const TEXT_PRIMARY = '#f0f0f5';
const TEXT_SECONDARY = '#9a9aa8';
const TEXT_MUTED = '#6b6b7a';
const TEXT_BODY = '#c9c9d4';
const TEXT_BRIGHT = '#e4e4ec';
const DISPLAY_FONT = 'var(--font-display), sans-serif';
const BODY_FONT = "'Plus Jakarta Sans', sans-serif";

// ─── Types ───────────────────────────────────────────────────────

type PracticeStep = {
  n: number;
  name: string;
  expression: string;
  value: string | null;
};

type Item = {
  book: string;
  example_id: string;
  index: number;
  seed: number;
  tier: string;
  license: string;
  question: string;
  question_source: string;
  target: string;
  givens: string[];
  steps: PracticeStep[];
};

type CheckResult = {
  correct: boolean;
  verdict: string;
  expected: number | null;
  student: number | null;
  steps: PracticeStep[] | null;
  target?: string;
};

type LibraryBook = {
  book: string;
  n_examples: number;
  n_verified: number;
  license: string;
  shippable: boolean;
};

type CfqItem = {
  doc_id: number;
  qno: number;
  filename: string;
  subject: string;
  chapter: string | null;
  stem: string;
  options: Record<string, string>;
  tier_available: string;
  source: string;
};

type CfqCheck = {
  tier: string;
  correct: boolean;
  expected_letter: string;
  official_answer_text: string;
  marks: number;
};

type BindResult = {
  tier: string;
  answer: string | null;
  numeric: number | null;
  steps: string[];
  assumptions: string[];
  refusal_reason: string | null;
};

type SolveResult = {
  tier: string;
  solved: boolean;
  stage: string;
  answer: string | null;
  steps: string[];
  refusal_reason: string | null;
  elapsed_ms: number;
};

// ─── Friendly display helpers ────────────────────────────────────
// Raw slugs, tier codes and file names must never reach the screen.

function titleCase(s: string): string {
  return s.replace(/\b\w/g, (c) => c.toUpperCase());
}

function friendlyBook(raw: string): string {
  return titleCase(raw.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim());
}

function friendlyTier(tier: string): string {
  const t = tier.toUpperCase();
  if (t.startsWith('VERIFIED_OFFICIAL')) return 'Official answer';
  if (t.startsWith('VERIFIED')) return 'Verified answer';
  if (t.includes('METHOD')) return 'Method shown';
  return titleCase(tier.replace(/[_-]+/g, ' ').trim());
}

function friendlyExample(id: string): string {
  const digits = id.match(/\d+/);
  if (digits) return `Example ${Number(digits[0])}`;
  return friendlyBook(id);
}

function friendlyLabel(raw: string): string {
  return titleCase(raw.replace(/_/g, ' ').trim());
}

function isVerified(tier: string): boolean {
  return tier.toUpperCase().startsWith('VERIFIED');
}

/** subjectName, but always display-capitalized (handles keys like social_science). */
function subjectLabel(subj: string): string {
  return titleCase(subjectName(subj));
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

// ─── Shared state primitives ─────────────────────────────────────

type ErrorState = { message: string; retry?: () => void } | null;

function GlassCard({ children, className = '', delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 20, delay }}
      className={`glass-card rounded-2xl p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Shimmer({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={`rounded-full ${className}`}
      style={{ backgroundColor: 'rgba(255,255,255,0.07)' }}
      animate={{ opacity: [0.35, 0.9, 0.35] }}
      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay }}
      aria-hidden="true"
    />
  );
}

function TierBadge({ tier }: { tier: string }) {
  const verified = isVerified(tier);
  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-semibold"
      style={{
        backgroundColor: verified ? 'rgba(52,211,153,0.12)' : 'rgba(245,158,11,0.12)',
        color: verified ? MINT : GOLD_PALE,
        border: `1px solid ${verified ? 'rgba(52,211,153,0.3)' : 'rgba(245,158,11,0.3)'}`,
      }}
    >
      {verified ? '✓ ' : ''}{friendlyTier(tier)}
    </span>
  );
}

function ErrorCard({ error, onDismiss }: { error: NonNullable<ErrorState>; onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5"
      style={{
        background: 'rgba(239,68,68,0.07)',
        border: '1px solid rgba(239,68,68,0.25)',
      }}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl" aria-hidden="true">😕</span>
        <div className="flex-1">
          <p className="font-semibold mb-1" style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}>
            Something interrupted us
          </p>
          <p className="text-sm mb-3" style={{ color: TEXT_SECONDARY, fontFamily: BODY_FONT }}>
            {error.message}
          </p>
          <div className="flex gap-2">
            {error.retry && (
              <button
                onClick={error.retry}
                className="rounded-xl px-4 py-2 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95"
                style={{
                  fontFamily: DISPLAY_FONT,
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  color: '#131118',
                }}
              >
                Try again
              </button>
            )}
            <button
              onClick={onDismiss}
              className="rounded-xl px-4 py-2 text-sm font-medium transition-colors"
              style={{
                fontFamily: DISPLAY_FONT,
                color: TEXT_SECONDARY,
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: 'rgba(255,255,255,0.03)',
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function VerifiedPracticePage() {
  const [library, setLibrary] = useState<LibraryBook[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(true);
  const [book, setBook] = useState<string>('');
  const [item, setItem] = useState<Item | null>(null);
  const [itemLoading, setItemLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<CheckResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<ErrorState>(null);
  const [score, setScore] = useState({ done: 0, right: 0 });

  // free-form solver
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState<SolveResult | null>(null);

  // board (official competency) mode
  const [mode, setMode] = useState<'corpus' | 'board'>('corpus');
  const [boardSubject, setBoardSubject] = useState('physics');
  const [cfqItem, setCfqItem] = useState<CfqItem | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [cfqResult, setCfqResult] = useState<CfqCheck | null>(null);
  const [boardScore, setBoardScore] = useState({ done: 0, right: 0 });

  // binding mode (Lane C): student assigns roles to numbers
  const [bindMode, setBindMode] = useState(false);
  const [numInputs, setNumInputs] = useState([
    { value: '', role: 'count' }, { value: '', role: 'unit_price' }]);
  const [bindTarget, setBindTarget] = useState('total');
  const [bindResult, setBindResult] = useState<BindResult | null>(null);

  const roleOptions = [
    'count', 'unit_price', 'principal', 'rate_percent', 'time_years',
    'part', 'whole', 'percent', 'base', 'height', 'side', 'length',
    'breadth', 'radius', 'speed', 'time', 'distance',
    'first_quantity', 'second_quantity'];
  const targetOptions = [
    'total', 'percent', 'part', 'base', 'simple_interest',
    'compound_interest', 'amount', 'area_triangle',
    'area_parallelogram', 'area_square', 'perimeter_square',
    'area_rectangle', 'perimeter_rectangle', 'area_circle',
    'circumference', 'distance', 'speed', 'time', 'difference', 'sum'];

  const runBinding = useCallback(async () => {
    const bindings = numInputs
      .filter((n) => n.value !== '')
      .map((n) => ({ value: Number(n.value), role: n.role }));
    if (!bindings.length) return;
    setBusy(true);
    setBindResult(null);
    setError(null);
    try {
      const r = await api<BindResult>('/api/practice/deterministic/bind', {
        method: 'POST',
        body: JSON.stringify({ question: 'binding', target_role: bindTarget, bindings }),
      });
      setBindResult(r);
    } catch {
      setError({
        message: 'We could not verify that combination right now. Check the numbers and try again.',
        retry: runBinding,
      });
    } finally {
      setBusy(false);
    }
  }, [numInputs, bindTarget]);

  const loadLibrary = useCallback(async () => {
    setLibraryLoading(true);
    setError(null);
    try {
      const lib = await api<{ books: LibraryBook[] }>(
        '/api/practice/deterministic/library');
      setLibrary(lib.books);
      const usable = lib.books.filter(
        (b) => b.shippable && b.n_verified > 50);
      const preferred =
        usable.find((b) => /algebra/i.test(b.book) &&
                       !/college|trig/i.test(b.book)) ||
        usable.find((b) => /algebra/i.test(b.book)) ||
        usable[0] || lib.books[0];
      const first = preferred;
      if (first) setBook(first.book);
    } catch {
      setError({
        message: 'The practice engine is not reachable right now. Please try again in a moment.',
        retry: loadLibrary,
      });
    } finally {
      setLibraryLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  const nextItem = useCallback(
    async (seed?: number) => {
      if (!book) return;
      setBusy(true);
      setItemLoading(true);
      setResult(null);
      setAnswer('');
      setError(null);
      try {
        const params = new URLSearchParams({
          book,
          index: String(Math.floor(Math.random() * 500)),
          seed: String(seed ?? Math.floor(Math.random() * 100000)),
        });
        const it = await api<Item>(
          `/api/practice/deterministic/item?${params}`);
        setItem(it);
      } catch {
        setError({
          message: 'We could not load the next question. Your progress is safe — try again.',
          retry: () => nextItem(seed),
        });
      } finally {
        setBusy(false);
        setItemLoading(false);
      }
    },
    [book],
  );

  useEffect(() => {
    if (book && !item) nextItem();
  }, [book, item, nextItem]);

  const check = useCallback(async () => {
    if (!item || !answer.trim()) return;
    setBusy(true);
    try {
      const r = await api<CheckResult>(
        '/api/practice/deterministic/check',
        {
          method: 'POST',
          body: JSON.stringify({
            book: item.book,
            index: item.index,
            seed: item.seed,
            answer,
          }),
        },
      );
      setResult(r);
      if (r.verdict === 'correct') {
        setScore((s) => ({ done: s.done + 1, right: s.right + 1 }));
      } else if (r.verdict !== 'unparseable') {
        setScore((s) => ({ done: s.done + 1, right: s.right }));
      }
    } catch {
      setError({
        message: 'We could not check that answer. Please try once more.',
        retry: check,
      });
    } finally {
      setBusy(false);
    }
  }, [item, answer]);

  const solve = useCallback(async () => {
    if (!problem.trim()) return;
    setBusy(true);
    setError(null);
    try {
      const r = await api<SolveResult>('/api/practice/deterministic/solve', {
        method: 'POST',
        body: JSON.stringify({ text: problem }),
      });
      setSolution(r);
    } catch {
      setError({
        message: 'The solver is unavailable right now. Please try again shortly.',
        retry: solve,
      });
    } finally {
      setBusy(false);
    }
  }, [problem]);

  const nextBoardItem = useCallback(async () => {
    setBusy(true);
    setCfqItem(null);
    setCfqResult(null);
    setPicked(null);
    setError(null);
    try {
      const it = await api<CfqItem>(
        `/api/practice/deterministic/cfq/item?subject=${boardSubject}`);
      setCfqItem(it);
    } catch {
      setError({
        message: `No official board questions for ${subjectLabel(boardSubject)} yet. Try another subject.`,
        retry: nextBoardItem,
      });
    } finally {
      setBusy(false);
    }
  }, [boardSubject]);

  const answerBoard = useCallback(async (letter: string) => {
    if (!cfqItem || picked || cfqResult) return;
    setPicked(letter);
    setBusy(true);
    try {
      const r = await api<CfqCheck>(
        '/api/practice/deterministic/cfq/check',
        {
          method: 'POST',
          body: JSON.stringify({
            doc_id: cfqItem.doc_id,
            qno: cfqItem.qno,
            answer: letter,
          }),
        },
      );
      setCfqResult(r);
      setBoardScore((s) => ({
        done: s.done + 1,
        right: s.right + (r.correct ? 1 : 0),
      }));
    } catch {
      setError({
        message: 'We could not check that answer. Please try once more.',
        retry: () => answerBoard(letter),
      });
    } finally {
      setBusy(false);
    }
  }, [cfqItem, picked, cfqResult]);

  useEffect(() => {
    if (mode === 'board' && !cfqItem) nextBoardItem();
  }, [mode, cfqItem, nextBoardItem]);

  // Student-facing books only — internal sets never appear in the picker.
  const studentBooks = library.filter((b) => b.shippable);

  return (
    <main
      className="min-h-screen"
      style={{
        background: 'radial-gradient(ellipse at top, rgba(251,191,36,0.06) 0%, #0a0a0f 45%, #060609 100%)',
        color: TEXT_PRIMARY,
        fontFamily: BODY_FONT,
      }}
    >
      <div className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        {/* header */}
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link
              href="/practice"
              className="text-xs font-medium mb-2 inline-flex items-center gap-1 transition-colors hover:text-white"
              style={{ color: GOLD_PALE, fontFamily: BODY_FONT }}
            >
              ← All practice
            </Link>
            <h1 className="text-2xl font-bold" style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}>
              Verified Practice
            </h1>
            <p className="text-sm mt-1" style={{ color: TEXT_SECONDARY }}>
              Every answer here has been computed and verified. Answers open only after you try.
            </p>
          </div>
          <div
            className="rounded-xl px-4 py-2 text-sm"
            style={{
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.2)',
            }}
          >
            <span className="font-semibold" style={{ fontFamily: DISPLAY_FONT, color: GOLD_LIGHT }}>
              {mode === 'corpus' ? score.right : boardScore.right}
            </span>
            <span style={{ color: TEXT_MUTED }}>
              {' '}/ {mode === 'corpus' ? score.done : boardScore.done}{' '}
              correct
            </span>
          </div>
        </header>

        {/* mode tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setMode('corpus')}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-all"
            style={{
              fontFamily: DISPLAY_FONT,
              background: mode === 'corpus' ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : 'rgba(255,255,255,0.04)',
              color: mode === 'corpus' ? '#131118' : TEXT_SECONDARY,
              border: mode === 'corpus' ? 'none' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            Verified practice
          </button>
          <button
            onClick={() => setMode('board')}
            className="rounded-lg px-4 py-2 text-sm font-medium transition-all"
            style={{
              fontFamily: DISPLAY_FONT,
              background: mode === 'board' ? 'linear-gradient(135deg, #fbbf24, #f59e0b)' : 'rgba(255,255,255,0.04)',
              color: mode === 'board' ? '#131118' : TEXT_SECONDARY,
              border: mode === 'board' ? 'none' : '1px solid rgba(255,255,255,0.08)',
            }}
          >
            Board practice (official)
          </button>
        </div>

        {/* book picker */}
        <div className={`flex flex-wrap items-center gap-2 ${mode === 'corpus' ? '' : 'hidden'}`}>
          {libraryLoading ? (
            <Shimmer className="h-10 w-64 rounded-lg" />
          ) : (
            <select
              value={book}
              onChange={(e) => {
                setBook(e.target.value);
                setItem(null);
              }}
              className="rounded-lg px-3 py-2 text-sm outline-none"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                color: TEXT_PRIMARY,
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {studentBooks.map((b) => (
                <option key={b.book} value={b.book} style={{ color: '#131118' }}>
                  {friendlyBook(b.book)} · {b.n_verified} verified questions
                </option>
              ))}
            </select>
          )}
          <button
            onClick={() => nextItem()}
            disabled={busy || !book}
            className="rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50 transition-transform hover:scale-[1.02] active:scale-95"
            style={{
              fontFamily: DISPLAY_FONT,
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              color: '#131118',
            }}
          >
            Next question
          </button>
          <button
            onClick={() => nextItem(item ? item.seed + 1 : 1)}
            disabled={busy || !book}
            className="rounded-lg px-4 py-2 text-sm disabled:opacity-50 transition-colors"
            style={{
              color: TEXT_SECONDARY,
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
            title="Same structure, fresh numbers"
          >
            One more like this
          </button>
        </div>

        {error && (
          <ErrorCard error={error} onDismiss={() => setError(null)} />
        )}

        {/* board practice: official competency MCQs */}
        {mode === 'board' && (
          <GlassCard className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={boardSubject}
                onChange={(e) => {
                  setBoardSubject(e.target.value);
                  setCfqItem(null);
                  setCfqResult(null);
                  setPicked(null);
                }}
                className="rounded-lg px-3 py-2 text-sm outline-none"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: TEXT_PRIMARY,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {['physics', 'chemistry', 'biology', 'maths', 'english',
                  'history', 'social_science'].map((s) => (
                  <option key={s} value={s} style={{ color: '#131118' }}>
                    {subjectLabel(s)}
                  </option>
                ))}
              </select>
              <button
                onClick={nextBoardItem}
                disabled={busy}
                className="rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50 transition-transform hover:scale-[1.02] active:scale-95"
                style={{
                  fontFamily: DISPLAY_FONT,
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  color: '#131118',
                }}
              >
                Next question
              </button>
              <span className="text-xs" style={{ color: TEXT_MUTED }}>
                Official CBSE competency bank — answers are the Board&apos;s
                own keys, escrowed until you answer.
              </span>
            </div>

            {cfqItem && (
              <motion.div
                key={`${cfqItem.doc_id}-${cfqItem.qno}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span
                    className="rounded-full px-3 py-1 font-semibold"
                    style={{
                      backgroundColor: 'rgba(245,158,11,0.12)',
                      color: GOLD_PALE,
                      border: '1px solid rgba(245,158,11,0.3)',
                    }}
                  >
                    ✓ Official board question
                  </span>
                    <span style={{ color: TEXT_MUTED }}>
                      {cfqItem.chapter
                        ? (cfqItem.chapter.includes('_') ? friendlyBook(cfqItem.chapter) : cfqItem.chapter)
                        : subjectLabel(cfqItem.subject || boardSubject)}
                    </span>
                </div>
                <p className="text-lg leading-relaxed" style={{ color: TEXT_BRIGHT }}>{cfqItem.stem}</p>
                <div className="grid gap-2">
                  {Object.entries(cfqItem.options).map(([letter, text]) => {
                    const isPicked = picked === letter;
                    const isRight = cfqResult &&
                      letter === cfqResult.expected_letter;
                    return (
                      <button
                        key={letter}
                        onClick={() => answerBoard(letter)}
                        disabled={busy || !!picked}
                        className="rounded-xl px-4 py-3 text-left text-sm transition-all"
                        style={{
                          border: `1px solid ${
                            cfqResult
                              ? isRight
                                ? 'rgba(52,211,153,0.5)'
                                : isPicked
                                  ? 'rgba(239,68,68,0.5)'
                                  : 'rgba(255,255,255,0.06)'
                              : 'rgba(255,255,255,0.12)'
                          }`,
                          background: cfqResult
                            ? isRight
                              ? 'rgba(52,211,153,0.08)'
                              : isPicked
                                ? 'rgba(239,68,68,0.07)'
                                : 'rgba(255,255,255,0.02)'
                            : 'rgba(255,255,255,0.03)',
                          color: TEXT_BODY,
                          opacity: cfqResult && !isRight && !isPicked ? 0.55 : 1,
                        }}
                      >
                        <span className="font-semibold" style={{ color: GOLD_PALE }}>
                          ({letter}){' '}
                        </span>
                        {text}
                      </button>
                    );
                  })}
                </div>
                {cfqResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl p-4 text-sm"
                    style={{
                      border: `1px solid ${cfqResult.correct ? 'rgba(52,211,153,0.4)' : 'rgba(245,158,11,0.4)'}`,
                      background: cfqResult.correct ? 'rgba(52,211,153,0.08)' : 'rgba(245,158,11,0.07)',
                    }}
                  >
                    <p className="font-semibold" style={{ color: cfqResult.correct ? MINT : GOLD_PALE }}>
                      {cfqResult.correct
                        ? 'Correct — matches the official key.'
                        : `Not this one. The official answer is (${cfqResult.expected_letter}).`}
                    </p>
                    {cfqResult.official_answer_text && (
                      <p className="mt-2" style={{ color: TEXT_BODY }}>
                        Board marking: {cfqResult.official_answer_text}
                      </p>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}

            {!cfqItem && busy && (
              <div className="space-y-3" aria-hidden="true">
                <Shimmer className="h-5 w-3/4 rounded-full" delay={0.1} />
                <Shimmer className="h-5 w-1/2 rounded-full" delay={0.2} />
                {[0, 1, 2, 3].map((i) => (
                  <Shimmer key={i} className="h-12 w-full rounded-xl" delay={0.3 + i * 0.1} />
                ))}
              </div>
            )}

            {!cfqItem && !busy && !error && (
              <div className="text-center py-8">
                <div className="text-4xl mb-3" aria-hidden="true">📖</div>
                <p className="text-sm mb-4" style={{ color: TEXT_SECONDARY }}>
                  No board question loaded yet.
                </p>
                <button
                  onClick={nextBoardItem}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-95"
                  style={{
                    fontFamily: DISPLAY_FONT,
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: '#131118',
                  }}
                >
                  Load a question
                </button>
              </div>
            )}
          </GlassCard>
        )}

        {/* the question */}
        {mode === 'corpus' && item && (
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <TierBadge tier={item.tier} />
              <span style={{ color: TEXT_MUTED }}>
                {item.question_source === 'original-cc-by'
                  ? 'OpenStax (CC BY 4.0) · '
                  : ''}
                {friendlyBook(item.book)} · {friendlyExample(item.example_id)}
              </span>
            </div>

            <p className="text-lg leading-relaxed" style={{ color: TEXT_BRIGHT }}>{item.question}</p>

            {item.steps.length > 1 && !result && (
              <details className="text-sm" style={{ color: TEXT_SECONDARY }}>
                <summary className="cursor-pointer" style={{ color: GOLD_PALE }}>
                  Show the method scaffold
                </summary>
                <ol className="mt-2 space-y-1 list-decimal list-inside">
                  {item.steps.map((s) => (
                    <li key={s.n}>
                      <span style={{ color: TEXT_BODY }}>{friendlyLabel(s.name)}</span>:{' '}
                      <code style={{ color: TEXT_MUTED }}>
                        {s.value !== null
                          ? s.expression
                          : '(you compute this)'}
                      </code>
                    </li>
                  ))}
                </ol>
              </details>
            )}

            <div className="flex gap-2">
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && check()}
                placeholder="Your answer (e.g. 15 or 30/2)"
                className="flex-1 rounded-lg px-3 py-2 outline-none transition-colors focus:border-yellow-500"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: TEXT_PRIMARY,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
              <button
                onClick={check}
                disabled={busy || !answer.trim()}
                className="rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50 transition-transform hover:scale-[1.02] active:scale-95"
                style={{
                  fontFamily: DISPLAY_FONT,
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  color: '#131118',
                }}
              >
                Check
              </button>
            </div>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-4 space-y-3"
                style={{
                  border: `1px solid ${result.correct ? 'rgba(52,211,153,0.4)' : 'rgba(245,158,11,0.4)'}`,
                  background: result.correct ? 'rgba(52,211,153,0.08)' : 'rgba(245,158,11,0.07)',
                }}
              >
                <p className="font-semibold" style={{ color: result.correct ? MINT : GOLD_PALE }}>
                  {result.correct
                    ? 'Correct — verified.'
                    : result.verdict === 'unparseable'
                      ? 'Could not read that answer. Try a number or fraction like 15 or 3/4.'
                      : `Not yet. The verified answer is ${result.expected}.`}
                </p>
                {result.steps && (
                  <details className="text-sm" open={result.correct}>
                    <summary className="cursor-pointer" style={{ color: GOLD_PALE }}>
                      Full verified solution
                    </summary>
                    <ol className="mt-2 space-y-1 list-decimal list-inside">
                      {result.steps.map((s) => (
                        <li key={s.n}>
                          <span style={{ color: TEXT_BODY }}>{friendlyLabel(s.name)}</span> ={' '}
                          <code>{s.expression}</code>
                          {s.value !== null && (
                            <span style={{ color: MINT }}>
                              {' '}
                              = {s.value}
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </details>
                )}
              </motion.div>
            )}
          </GlassCard>
        )}

        {/* corpus skeleton while the first item loads */}
        {mode === 'corpus' && !item && itemLoading && (
          <GlassCard className="space-y-4" aria-hidden="true">
            <div className="flex justify-between">
              <Shimmer className="h-6 w-28 rounded-full" delay={0.05} />
              <Shimmer className="h-6 w-36 rounded-full" delay={0.15} />
            </div>
            <Shimmer className="h-5 w-full rounded-full" delay={0.25} />
            <Shimmer className="h-5 w-4/5 rounded-full" delay={0.35} />
            <Shimmer className="h-10 w-full rounded-lg" delay={0.45} />
          </GlassCard>
        )}

        {/* Lane C: solve with me (variable binding) */}
        <GlassCard className="space-y-3" delay={0.05}>
          <button
            onClick={() => setBindMode(!bindMode)}
            className="flex w-full items-center justify-between"
          >
            <h2 className="font-semibold" style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}>
              Solve with me
            </h2>
            <span className="text-xs" style={{ color: TEXT_MUTED }}>
              {bindMode ? 'hide' : 'show'}
            </span>
          </button>
          {bindMode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-3 overflow-hidden"
            >
              <p className="text-sm" style={{ color: TEXT_SECONDARY }}>
                Enter the numbers from your question and tell me what each
                one means. I compute and verify — you show you understood
                the question.
              </p>
              {numInputs.map((n, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="number"
                    value={n.value}
                    onChange={(e) => {
                      const next = [...numInputs];
                      next[i] = { ...next[i], value: e.target.value };
                      setNumInputs(next);
                    }}
                    placeholder="number"
                    className="w-24 rounded-lg px-3 py-2 outline-none focus:border-yellow-500"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      color: TEXT_PRIMARY,
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  />
                  <select
                    value={n.role}
                    onChange={(e) => {
                      const next = [...numInputs];
                      next[i] = { ...next[i], role: e.target.value };
                      setNumInputs(next);
                    }}
                    className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.3)',
                      color: TEXT_PRIMARY,
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {roleOptions.map((r) => (
                      <option key={r} value={r} style={{ color: '#131118' }}>
                        {friendlyLabel(r)}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <button
                onClick={() => setNumInputs([...numInputs, { value: '', role: 'first_quantity' }])}
                className="text-xs font-medium transition-colors hover:text-yellow-300"
                style={{ color: GOLD_PALE }}
              >
                + another number
              </button>
              <div className="flex gap-2">
                <span className="text-sm self-center" style={{ color: TEXT_SECONDARY }}>Find the</span>
                <select
                  value={bindTarget}
                  onChange={(e) => setBindTarget(e.target.value)}
                  className="flex-1 rounded-lg px-3 py-2 text-sm outline-none"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    color: TEXT_PRIMARY,
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {targetOptions.map((t) => (
                    <option key={t} value={t} style={{ color: '#131118' }}>
                      {friendlyLabel(t)}
                    </option>
                  ))}
                </select>
                <button
                  onClick={runBinding}
                  disabled={busy}
                  className="rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50 transition-transform hover:scale-[1.02] active:scale-95"
                  style={{
                    fontFamily: DISPLAY_FONT,
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    color: '#131118',
                  }}
                >
                  Solve
                </button>
              </div>
              {bindResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl p-4 text-sm"
                  style={{
                    border: `1px solid ${isVerified(bindResult.tier) ? 'rgba(52,211,153,0.4)' : 'rgba(245,158,11,0.4)'}`,
                    background: isVerified(bindResult.tier) ? 'rgba(52,211,153,0.08)' : 'rgba(245,158,11,0.07)',
                  }}
                >
                  <div className="mb-2">
                    <TierBadge tier={bindResult.tier} />
                  </div>
                  {bindResult.answer !== null ? (
                    <p className="text-lg font-semibold" style={{ color: MINT }}>
                      {bindResult.answer}
                    </p>
                  ) : (
                    <p style={{ color: TEXT_SECONDARY }}>
                      {bindResult.refusal_reason}
                    </p>
                  )}
                  {bindResult.assumptions.length > 0 && (
                    <p className="mt-2 text-xs" style={{ color: GOLD_LIGHT }}>
                      Assumptions: {bindResult.assumptions.join('; ')}
                    </p>
                  )}
                  {bindResult.steps.length > 0 && (
                    <ol className="mt-2 space-y-1 list-decimal list-inside" style={{ color: TEXT_BODY }}>
                      {bindResult.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </GlassCard>

        {/* free-form deterministic solver */}
        <GlassCard className="space-y-3" delay={0.1}>
          <h2 className="font-semibold" style={{ fontFamily: DISPLAY_FONT, color: TEXT_PRIMARY }}>
            Ask the solver
          </h2>
          <p className="text-sm" style={{ color: TEXT_SECONDARY }}>
            Type any problem. Verified answers are computed, never
            generated; anything else gets the method, not a guess.
          </p>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows={3}
            placeholder="e.g. Solve for x: 2x + 6 = 20"
            className="w-full rounded-lg px-3 py-2 outline-none focus:border-yellow-500"
            style={{
              backgroundColor: 'rgba(0,0,0,0.3)',
              color: TEXT_PRIMARY,
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
          <button
            onClick={solve}
            disabled={busy || !problem.trim()}
            className="rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-50 transition-transform hover:scale-[1.02] active:scale-95"
            style={{
              fontFamily: DISPLAY_FONT,
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              color: '#131118',
            }}
          >
            Solve
          </button>

          {solution && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-4 space-y-2 text-sm"
              style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <TierBadge tier={solution.tier} />
              {solution.answer !== null ? (
                <p className="text-lg font-semibold" style={{ color: MINT }}>
                  {solution.answer}
                </p>
              ) : (
                <p style={{ color: TEXT_SECONDARY }}>
                  {solution.solved
                    ? 'Method only — the final answer is yours to compute.'
                    : solution.refusal_reason ||
                      'No verified path for this problem yet.'}
                </p>
              )}
              {solution.steps.length > 0 && (
                <ol className="space-y-1 list-decimal list-inside" style={{ color: TEXT_BODY }}>
                  {solution.steps.slice(0, 8).map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
              )}
            </motion.div>
          )}
        </GlassCard>

        <footer className="text-xs pb-8" style={{ color: TEXT_MUTED }}>
          Content adapted from OpenStax (CC BY 4.0) and platform-verified
          structures. Licensed renditions are rendered, never copied.
        </footer>
      </div>
    </main>
  );
}
