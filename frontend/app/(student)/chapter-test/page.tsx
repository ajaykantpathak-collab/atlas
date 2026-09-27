'use client';

/**
 * Chapter Test — a proper chapter-spanning assessment.
 *
 * 15-25 real questions pulled across a chapter's nodes from the
 * board_questions bank, optional timer, and a score report with a
 * per-node breakdown and direct Story links for weak nodes.
 * Thin chapters are refused honestly (never padded, never invented).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, BookOpenCheck, CheckCircle2, ChevronRight, Clock,
  FileText, Play, RefreshCw, Timer, XCircle, Library, Sparkles,
} from 'lucide-react';
import { getAuthToken } from '@/lib/api';

// Relative fetches (no baked absolute base): same-origin on :80 nginx and
// on the :3001 Next server — immune to the NEXT_PUBLIC_API_URL CORS gap.
async function apiGet<T>(path: string): Promise<T> {
  const token = getAuthToken();
  const res = await fetch(path, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const token = getAuthToken();
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

const api = { get: apiGet, post: apiPost };
import { useAuthStore } from '@/stores/authStore';

interface ChapterInfo {
  chapter: string;
  title: string;
  questionCount: number;
  testReady: boolean;
  // TESTCOV: thin chapters (3-7 bank questions) start an honest SHORT test
  // instead of being dead cards — clearly labelled, never padded.
  short?: boolean;
  shortNote?: string | null;
  maxQuestions: number;
}

interface Catalog {
  subject: string;
  subjectLabel: string;
  classLevel: number;
  chapters: ChapterInfo[];
}

interface TestQuestion {
  question_id: string;
  index: number;
  text: string;
  options: string[];
  marks: number;
  question_type: string;
}

interface TestSession {
  session_id: string;
  subject_label: string;
  class_level: number;
  chapter_title: string;
  timed_minutes: number | null;
  short_test?: boolean;
  short_note?: string | null;
  questions: TestQuestion[];
  answered: number;
}

interface NodeRow {
  nodeId: string;
  title: string;
  storyUrl: string | null;
  correct: number;
  total: number;
  pct: number;
  weak: boolean;
}

interface TestReport {
  sessionId: string;
  subject: string;
  chapter: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  shortTest?: boolean;
  shortNote?: string | null;
  questionsTotal: number;
  questionsAnswered: number;
  correctCount: number;
  timeTakenSeconds: number;
  nodeBreakdown: NodeRow[];
  weakNodes: { title: string; storyUrl: string | null; pct: number; correct: number; total: number }[];
  review: {
    questionId: string; question: string; studentAnswer: string;
    expectedAnswer: string; isCorrect: boolean; skipped: boolean; explanation: string;
  }[];
}

interface SubjectOption { key: string; name: string; minClass?: number }

const SUBJECTS: SubjectOption[] = [
  { key: 'mathematics', name: 'Mathematics' },
  { key: 'science', name: 'Science' },
  { key: 'social_science', name: 'Social Science' },
  { key: 'english', name: 'English' },
  { key: 'physics', name: 'Physics' },
  { key: 'chemistry', name: 'Chemistry' },
  { key: 'biology', name: 'Biology' },
  { key: 'history', name: 'History' },
  { key: 'geography', name: 'Geography' },
  { key: 'economics', name: 'Economics' },
  { key: 'grammar', name: 'Grammar' },
  // TESTCOV: senior-stream subjects with real chapter-test banks
  // (classes 11-12). Chips only render for those classes so a junior
  // picker stays uncluttered; empty catalogs stay honest either way.
  { key: 'accountancy', name: 'Accountancy', minClass: 11 },
  { key: 'business_studies', name: 'Business Studies', minClass: 11 },
  { key: 'computer_science', name: 'Computer Science', minClass: 11 },
  { key: 'informatics_practices', name: 'Informatics Practices', minClass: 11 },
  { key: 'political_science', name: 'Political Science', minClass: 11 },
  { key: 'psychology', name: 'Psychology', minClass: 11 },
  { key: 'sociology', name: 'Sociology', minClass: 11 },
  { key: 'hindi', name: 'Hindi', minClass: 11 },
  { key: 'biotechnology', name: 'Biotechnology', minClass: 11 },
  { key: 'home_science', name: 'Home Science', minClass: 11 },
];

const visibleSubjects = (cls: number) =>
  SUBJECTS.filter((s) => !s.minClass || cls >= s.minClass);

type Phase = 'select' | 'test' | 'report';

export default function ChapterTestPage() {
  const user = useAuthStore((s) => s.user);
  const myClass = Number((user as { class_level?: number } | null)?.class_level) || 10;

  const [phase, setPhase] = useState<Phase>('select');
  const [subject, setSubject] = useState('mathematics');
  // GRADE-MAP P1 hydration fix: `useState(myClass)` read the auth store
  // BEFORE zustand rehydrated (user still null -> defaulted to 10) and
  // never re-synced, so a logged-in Class 6 child saw Class 10 chapters.
  // classLevel now starts on the student's class once hydration lands,
  // and never overrides an explicit user choice or a ?class= deep link.
  const [classLevel, setClassLevel] = useState(myClass);
  const classTouchedRef = useRef(false);
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [chaptersLoading, setChaptersLoading] = useState(false);
  const [numQuestions, setNumQuestions] = useState(20);
  const [timed, setTimed] = useState(false);
  const [startError, setStartError] = useState('');
  const [starting, setStarting] = useState(false);

  const [session, setSession] = useState<TestSession | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [finishing, setFinishing] = useState(false);

  const [report, setReport] = useState<TestReport | null>(null);

  const loadChapters = useCallback((sub: string, cls: number) => {
    setChaptersLoading(true);
    api.get<Catalog>(`/api/chapter-tests/chapters?subject=${encodeURIComponent(sub)}&class_level=${cls}`)
      .then(setCatalog)
      .catch(() => setCatalog(null))
      .finally(() => setChaptersLoading(false));
  }, []);

  useEffect(() => { loadChapters(subject, classLevel); }, [subject, classLevel, loadChapters]);

  // Auth hydration sync: once the signed-in user's own class_level lands
  // in the store, adopt it unless the child (or a deep link) already
  // picked a class explicitly. This is what stops the page serving
  // Class 10 chapter lists to a Class 6 student.
  useEffect(() => {
    if (classTouchedRef.current) return;
    const own = Number((user as { class_level?: number } | null)?.class_level);
    if (own >= 1 && own <= 12) {
      setClassLevel((prev) => (prev === own ? prev : own));
    }
  }, [user]);

  // Deep-link support: /chapter-test?subject=science&class=10 (from the
  // learn page) preselects subject and class. Read from location.search
  // (not useSearchParams) so the page stays static-render safe.
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      const qSub = sp.get('subject');
      const qCls = Number(sp.get('class'));
      if (qSub && SUBJECTS.some((s) => s.key === qSub)) setSubject(qSub);
      if (qCls >= 1 && qCls <= 12) {
        classTouchedRef.current = true;
        setClassLevel(qCls);
      }
    } catch { /* no deep link */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTest = useCallback(async (chap: ChapterInfo) => {
    setStartError('');
    setStarting(true);
    try {
      const want = Math.max(3, Math.min(numQuestions, chap.maxQuestions || 25));
      const sess = await api.post<TestSession>('/api/chapter-tests/start', {
        subject,
        classLevel,
        chapter: chap.chapter,
        numQuestions: want,
        timedMinutes: timed ? 45 : null,
      });
      setSession(sess);
      setAnswers({});
      setCurrent(0);
      setSecondsLeft(sess.timed_minutes ? sess.timed_minutes * 60 : null);
      setReport(null);
      setPhase('test');
    } catch (e) {
      setStartError(e instanceof Error ? e.message : 'Could not start the test.');
    } finally {
      setStarting(false);
    }
  }, [subject, classLevel, numQuestions, timed]);

  const recordAnswer = useCallback((qid: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: answer }));
    if (session) {
      api.post(`/api/chapter-tests/${session.session_id}/answer`, {
        questionId: qid,
        answer,
        timeTakenSeconds: 20,
      }).catch(() => { /* re-recorded at finish via local answers */ });
    }
  }, [session]);

  const finish = useCallback(async () => {
    if (!session || finishing) return;
    setFinishing(true);
    try {
      // make sure every local answer is on the server before grading
      await Promise.all(Object.entries(answers).map(([qid, answer]) =>
        api.post(`/api/chapter-tests/${session.session_id}/answer`, {
          questionId: qid, answer, timeTakenSeconds: 20,
        }).catch(() => undefined)));
      const rep = await api.post<TestReport>(`/api/chapter-tests/${session.session_id}/finish`);
      setReport(rep);
      setPhase('report');
    } catch (e) {
      setStartError(e instanceof Error ? e.message : 'Could not finish the test.');
    } finally {
      setFinishing(false);
    }
  }, [session, answers, finishing]);

  // countdown
  useEffect(() => {
    if (phase !== 'test' || secondsLeft === null) return;
    if (secondsLeft <= 0) { finish(); return; }
    const t = setTimeout(() => setSecondsLeft((s) => (s === null ? s : s - 1)), 1000);
    return () => clearTimeout(t);
  }, [phase, secondsLeft, finish]);

  const q = session?.questions[current] ?? null;
  const answeredCount = Object.keys(answers).length;
  const progressPct = useMemo(
    () => (session && session.questions.length ? (answeredCount / session.questions.length) * 100 : 0),
    [session, answeredCount]);

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="min-h-screen mesh-bg-animated">
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/dashboard" className="btn-ghost px-2" aria-label="Go back">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white truncate flex items-center gap-2">
              <BookOpenCheck className="w-4 h-4 text-brand-300" aria-hidden="true" />
              Chapter Test
              {session && phase !== 'select' && (
                <span className="text-white/50 font-normal hidden sm:inline">· {session.chapter_title}</span>
              )}
            </h1>
          </div>
          {phase === 'test' && secondsLeft !== null && (
            <span className={`text-sm font-mono flex items-center gap-1 ${secondsLeft < 300 ? 'text-rose-300' : 'text-white/70'}`}>
              <Timer className="w-4 h-4" aria-hidden="true" /> {fmtTime(secondsLeft)}
            </span>
          )}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {phase === 'select' && (
          <div className="space-y-6">
            <p className="text-white/60 text-sm">
              A timed-style test spanning a full chapter — questions drawn from every
              topic in the chapter, with a per-topic score report and Story links for anything weak.
              Thin chapters run an honest short test instead of being refused.
            </p>

            <div>
              <label className="text-xs uppercase tracking-wide text-white/40 mb-2 block">Subject</label>
              <div className="flex flex-wrap gap-2">
                {visibleSubjects(classLevel).map((s) => (
                  <button key={s.key}
                    onClick={() => { setSubject(s.key); setCatalog(null); }}
                    className={`px-3 py-1.5 rounded-full text-sm border transition ${
                      subject === s.key
                        ? 'bg-brand-500/20 border-brand-400 text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}>
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wide text-white/40 mb-2 block">Class</label>
              <div className="flex gap-2">
                {[6, 7, 8, 9, 10, 11, 12].map((c) => (
                  <button key={c}
                    onClick={() => { classTouchedRef.current = true; setClassLevel(c); setCatalog(null); }}
                    className={`w-10 h-9 rounded-lg text-sm border transition ${
                      classLevel === c
                        ? 'bg-brand-500/20 border-brand-400 text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div>
                <label className="text-xs uppercase tracking-wide text-white/40 mb-2 block">Questions</label>
                <div className="flex gap-2">
                  {[15, 20, 25].map((n) => (
                    <button key={n} onClick={() => setNumQuestions(n)}
                      className={`px-4 h-9 rounded-lg text-sm border transition ${
                        numQuestions === n
                          ? 'bg-brand-500/20 border-brand-400 text-white'
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                      }`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide text-white/40 mb-2 block">Timer</label>
                <button onClick={() => setTimed((t) => !t)}
                  className={`px-4 h-9 rounded-lg text-sm border inline-flex items-center gap-2 transition ${
                    timed ? 'bg-brand-500/20 border-brand-400 text-white' : 'bg-white/5 border-white/10 text-white/60'
                  }`}>
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  {timed ? 'Timed · 45 min' : 'Untimed'}
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Library className="w-4 h-4 text-brand-300" aria-hidden="true" />
                {catalog?.subjectLabel ?? ''} chapters
              </h2>
              {chaptersLoading && (
                <div className="flex items-center gap-2 text-white/50 text-sm py-8 justify-center">
                  <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" /> Loading chapters…
                </div>
              )}
              {!chaptersLoading && !catalog && (
                <p className="text-white/50 text-sm py-6 text-center">
                  Chapters could not be loaded. Try another subject or class.
                </p>
              )}
              {!chaptersLoading && catalog && catalog.chapters.length === 0 && (
                <p className="text-white/50 text-sm py-6 text-center">
                  No chapter tests for this subject and class yet — more are on the way.
                </p>
              )}
              <div className="grid sm:grid-cols-2 gap-3">
                {(catalog?.chapters ?? []).map((c) => {
                  const startable = c.testReady || c.short;
                  return (
                  <button key={c.chapter}
                    disabled={!startable || starting}
                    onClick={() => startTest(c)}
                    className={`text-left rounded-xl border p-4 transition ${
                      startable
                        ? 'bg-white/5 border-white/10 hover:border-brand-400/60 hover:bg-brand-500/10'
                        : 'bg-white/[0.02] border-white/5 opacity-60 cursor-not-allowed'
                    }`}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-white text-sm font-medium">{c.title}</span>
                      {c.testReady ? (
                        <Play className="w-4 h-4 text-brand-300 shrink-0" aria-hidden="true" />
                      ) : c.short ? (
                        <span className="text-[11px] text-amber-200/90 shrink-0">short test</span>
                      ) : (
                        <span className="text-[11px] text-white/40 shrink-0">too short</span>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-white/50">
                      {/* CHILD-LENS [P3 CHAPTER-TEST-MACHINE-TITLES]: "in the
                          bank" is pipeline-speak; children get ready-words.
                          (Machine-generated chapter TITLES are a backend seed
                          issue — renaming them client-side would fabricate
                          names the syllabus doesn't have. Deferred.) */}
                      {c.questionCount} questions ready
                      {c.short && ' — short chapter test, more questions coming'}
                      {!c.testReady && !c.short && ' — not enough for a chapter test yet'}
                    </div>
                  </button>
                  );
                })}
              </div>
            </div>

            {startError && (
              <p className="text-rose-300 text-sm bg-rose-500/10 border border-rose-400/30 rounded-lg p-3">
                {startError}
              </p>
            )}
          </div>
        )}

        {phase === 'test' && session && q && (
          <div className="space-y-4">
            {session.short_test && session.short_note && (
              <p className="text-amber-200 text-xs bg-amber-500/10 border border-amber-400/30 rounded-lg px-3 py-2">
                {session.short_note}
              </p>
            )}
            <div>
              <div className="flex items-center justify-between text-xs text-white/50 mb-1">
                <span>Question {current + 1} of {session.questions.length}</span>
                <span>{answeredCount} answered</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-brand-400 transition-all" style={{ width: `${progressPct}%` }} />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-white leading-relaxed whitespace-pre-wrap">{q.text}</p>
              {q.options.length > 0 ? (
                <div className="mt-5 space-y-2">
                  {q.options.map((opt, i) => (
                    <button key={i}
                      onClick={() => recordAnswer(q.question_id, opt)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition ${
                        answers[q.question_id] === opt
                          ? 'bg-brand-500/20 border-brand-400 text-white'
                          : 'bg-white/5 border-white/10 text-white/80 hover:border-white/30'
                      }`}>
                      <span className="inline-flex w-6 h-6 rounded-full border border-white/20 items-center justify-center text-xs mr-3">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <textarea
                  value={answers[q.question_id] ?? ''}
                  onChange={(e) => recordAnswer(q.question_id, e.target.value)}
                  placeholder="Type your answer…"
                  rows={3}
                  className="mt-5 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-400"
                />
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrent((i) => Math.max(0, i - 1))}
                disabled={current === 0}
                className="px-4 py-2 rounded-lg border border-white/10 text-white/70 text-sm disabled:opacity-40">
                Previous
              </button>
              {current < session.questions.length - 1 ? (
                <button
                  onClick={() => setCurrent((i) => Math.min(session.questions.length - 1, i + 1))}
                  className="px-5 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium inline-flex items-center gap-1">
                  Next <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : (
                <button onClick={finish} disabled={finishing}
                  className="px-5 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium disabled:opacity-50">
                  {finishing ? 'Scoring…' : 'Finish & See Score'}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {session.questions.map((qq, i) => (
                <button key={qq.question_id} onClick={() => setCurrent(i)}
                  className={`w-7 h-7 rounded-md text-[11px] border transition ${
                    i === current ? 'border-brand-400 text-white bg-brand-500/20'
                      : answers[qq.question_id] !== undefined
                        ? 'border-emerald-400/40 text-emerald-200 bg-emerald-500/10'
                        : 'border-white/10 text-white/40'
                  }`}>
                  {i + 1}
                </button>
              ))}
            </div>

            {startError && (
              <p className="text-rose-300 text-sm bg-rose-500/10 border border-rose-400/30 rounded-lg p-3">{startError}</p>
            )}
          </div>
        )}

        {phase === 'report' && report && (
          <div className="space-y-6">
            {report.shortTest && report.shortNote && (
              <p className="text-amber-200 text-xs bg-amber-500/10 border border-amber-400/30 rounded-lg px-3 py-2">
                {report.shortNote}
              </p>
            )}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-white/50 text-sm">{report.chapter}</p>
                  <p className="text-3xl font-display font-bold text-white mt-1">
                    {report.totalScore} <span className="text-lg text-white/50">/ {report.maxScore}</span>
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    {report.percentage}% · {report.passed ? 'Passed' : 'Below pass mark (33%)'} ·
                    {' '}{report.correctCount}/{report.questionsTotal} correct
                  </p>
                </div>
                <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center text-xl font-bold ${
                  report.passed ? 'border-emerald-400 text-emerald-300' : 'border-rose-400 text-rose-300'
                }`}>
                  {report.percentage}%
                </div>
              </div>
            </div>

            {report.weakNodes.length > 0 && (
              <div className="rounded-2xl border border-amber-400/30 bg-amber-500/5 p-5">
                <h3 className="text-amber-200 font-semibold text-sm flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  Topics to revisit — read the Story for each
                </h3>
                <div className="space-y-2">
                  {report.weakNodes.map((n, i) => (
                    <div key={i} className="flex items-center justify-between gap-3 rounded-lg bg-white/5 px-4 py-2.5">
                      <span className="text-white/90 text-sm">{n.title}</span>
                      <span className="text-amber-200/80 text-xs shrink-0">{n.correct}/{n.total} · {n.pct}%</span>
                      {n.storyUrl && (
                        <Link href={n.storyUrl}
                          className="shrink-0 px-3 py-1.5 rounded-full bg-brand-500 text-white text-xs font-medium inline-flex items-center gap-1">
                          <BookOpenCheck className="w-3 h-3" aria-hidden="true" /> Story
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-white font-semibold text-sm mb-3">Topic breakdown</h3>
              <div className="space-y-2">
                {report.nodeBreakdown.map((n, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <span className="text-white/90 text-sm truncate">{n.title}</span>
                      <span className="text-white/50 text-xs shrink-0">{n.correct}/{n.total} · {n.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className={`h-full ${n.weak ? 'bg-rose-400' : 'bg-emerald-400'}`}
                        style={{ width: `${Math.min(100, n.pct)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-300" aria-hidden="true" /> Answer review
              </h3>
              <div className="space-y-2">
                {report.review.map((r) => (
                  <details key={r.questionId} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <summary className="flex items-start gap-2 cursor-pointer text-sm">
                      {r.skipped ? (
                        <span className="text-white/30 mt-0.5"><Clock className="w-4 h-4" aria-hidden="true" /></span>
                      ) : r.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" aria-hidden="true" />
                      )}
                      <span className="text-white/80 line-clamp-2">{r.question}</span>
                    </summary>
                    <div className="mt-3 text-sm space-y-1.5 pl-6">
                      <p className="text-white/60">Your answer: <span className={r.isCorrect ? 'text-emerald-300' : 'text-rose-300'}>{r.studentAnswer || '(skipped)'}</span></p>
                      {!r.isCorrect && <p className="text-white/60">Expected: <span className="text-emerald-300">{r.expectedAnswer}</span></p>}
                      {r.explanation && <p className="text-white/50 text-xs mt-1">{r.explanation}</p>}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setPhase('select'); setSession(null); setReport(null); }}
                className="px-5 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium">
                Take another test
              </button>
              <Link href="/practice"
                className="px-5 py-2.5 rounded-lg border border-white/15 text-white/80 text-sm">
                Practice instead
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
