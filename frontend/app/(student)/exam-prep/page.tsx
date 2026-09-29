'use client';

/**
 * Pre-Board Simulator — full CBSE-pattern papers (sections, internal
 * choice, marking scheme) for classes 10/12 major subjects, assembled
 * from the real board_questions bank only.  Thin banks degrade honestly:
 * the paper shrinks with an explicit note, never padded with invented
 * content.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, CheckCircle2, ChevronRight, ClipboardList, Clock,
  FileText, GraduationCap, Play, RefreshCw, XCircle, AlertTriangle,
} from 'lucide-react';
import { getAuthToken } from '@/lib/api';

// Relative fetches (no baked absolute base): same-origin on :80 nginx and
// on the :3001 Next server — immune to the NEXT_PUBLIC_API_URL CORS gap.
async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAuthToken();
  const res = await fetch(path, {
    ...init,
    headers: { ...(init?.headers ?? {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) },
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

interface PaperMeta {
  subject: string;
  label: string;
  classLevel: number;
  durationMinutes: number;
  totalMarks: number;
  questionCount: number;
  bankQuestions: number;
  ready: boolean;
  depthNote: string;
  sections: {
    sectionId: string; title: string; note: string;
    questions: number; marksEach: number; marks: number;
  }[];
}

interface PaperQuestion {
  questionId: string;
  number: number;
  text: string;
  options: string[];
  marks: number;
  questionType: string;
  chapter: string;
  choiceGroup: string | null;
  alternativeOf: string | null;
  hasAlternative?: boolean;
  markingScheme: string;
}

interface PaperSession {
  session_id: string;
  paperTitle: string;
  label: string;
  classLevel: number;
  durationMinutes: number;
  totalMarks: number;
  sections: {
    sectionId: string; title: string; note: string; marksEach: number;
    attemptQuestions: number; marks: number; questions: PaperQuestion[];
  }[];
  shortfalls: string[];
  questionCount: number;
}

interface PaperReport {
  sessionId: string;
  paperTitle: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  grade: string;
  passed: boolean;
  timeTakenSeconds: number;
  sections: { sectionId: string; title: string; score: number; max: number; pct: number }[];
  chapterBreakdown: { chapter: string; score: number; max: number; pct: number }[];
  weakChapters: { chapter: string; pct: number }[];
  review: {
    questionId: string; number: number; section: string; question: string;
    studentAnswer: string; expectedAnswer: string; modelAnswer: string;
    explanation: string; isCorrect: boolean; attempted: boolean;
    marks: number; maxMarks: number; countedForScore: boolean;
    choiceGroup: string | null;
  }[];
  shortfalls: string[];
}

type Phase = 'select' | 'paper' | 'report';

export default function ExamPrepPage() {
  const user = useAuthStore((s) => s.user);
  const myClass = Number((user as { class_level?: number } | null)?.class_level) || 10;

  const [phase, setPhase] = useState<Phase>('select');
  const [classLevel, setClassLevel] = useState(myClass === 11 ? 12 : myClass < 10 ? 10 : myClass);
  // HYDRATION fix (same family as chapter-test P1): myClass above read the
  // auth store BEFORE rehydration — adopt the real class once it lands.
  useEffect(() => {
    const own = Number((user as { class_level?: number } | null)?.class_level);
    if (own >= 1 && own <= 12) {
      setClassLevel(own === 11 ? 12 : own < 10 ? 10 : own);
    }
  }, [user]);
  const [papers, setPapers] = useState<PaperMeta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [starting, setStarting] = useState(false);
  // P5 gap 3: /api/preboard/papers could hang far past any reasonable wait,
  // leaving this surface silently blank (spinner forever, no papers, no
  // message). The list fetch now hard-times-out at 10s and the page says so
  // honestly, with a manual retry.
  const [papersTimedOut, setPapersTimedOut] = useState(false);
  const papersAbortRef = useRef<AbortController | null>(null);

  const [session, setSession] = useState<PaperSession | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [report, setReport] = useState<PaperReport | null>(null);

  const PAPERS_TIMEOUT_MS = 10_000;

  const loadPapers = useCallback((cls: number) => {
    // Cancel any in-flight list request before starting a new one.
    papersAbortRef.current?.abort();
    const ctrl = new AbortController();
    papersAbortRef.current = ctrl;
    const timer = setTimeout(() => ctrl.abort(), PAPERS_TIMEOUT_MS);
    setLoading(true);
    setPapersTimedOut(false);
    api.get<{ papers: PaperMeta[] }>(`/api/preboard/papers?class_level=${cls}`, {
      signal: ctrl.signal,
    })
      .then((d) => {
        if (papersAbortRef.current !== ctrl) return; // superseded by a newer load
        setPapers(d.papers ?? []);
      })
      .catch((e: unknown) => {
        if (papersAbortRef.current !== ctrl) return;
        if (e instanceof DOMException && e.name === 'AbortError') {
          setPapersTimedOut(true);
        }
        setPapers([]);
      })
      .finally(() => {
        clearTimeout(timer);
        if (papersAbortRef.current === ctrl) setLoading(false);
      });
  }, []);

  useEffect(() => { if (phase === 'select') loadPapers(classLevel); }, [phase, classLevel, loadPapers]);

  const startPaper = useCallback(async (subject: string) => {
    setError('');
    setStarting(true);
    try {
      const sess = await api.post<PaperSession>(
        `/api/preboard/${subject}/start?class_level=${classLevel}`);
      setSession(sess);
      setAnswers({});
      setActiveSection(0);
      setSecondsLeft(sess.durationMinutes * 60);
      setReport(null);
      setPhase('paper');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not assemble the paper.');
    } finally {
      setStarting(false);
    }
  }, [classLevel]);

  const submitPaper = useCallback(async () => {
    if (!session || submitting) return;
    setSubmitting(true);
    try {
      const rep = await api.post<PaperReport>(`/api/preboard/${session.session_id}/submit`, {
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId, answer, timeTakenSeconds: 20,
        })),
      });
      setReport(rep);
      setPhase('report');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not submit the paper.');
    } finally {
      setSubmitting(false);
    }
  }, [session, answers, submitting]);

  useEffect(() => {
    if (phase !== 'paper' || secondsLeft === null) return;
    if (secondsLeft <= 0) { submitPaper(); return; }
    const t = setTimeout(() => setSecondsLeft((s) => (s === null ? s : s - 1)), 1000);
    return () => clearTimeout(t);
  }, [phase, secondsLeft, submitPaper]);

  const allQuestions = useMemo(
    () => (session?.sections ?? []).flatMap((s) => s.questions),
    [session]);
  const answeredCount = Object.values(answers).filter((a) => a.trim()).length;
  const fmtTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}` : `${m}:${String(s % 60).padStart(2, '0')}`;
  };

  // group each section's questions into choice sets (primary + OR-alternative)
  const choiceSets = useCallback((qs: PaperQuestion[]) => {
    const sets: { primary: PaperQuestion; alt: PaperQuestion | null }[] = [];
    const byGroup: Record<string, PaperQuestion[]> = {};
    for (const q of qs) {
      if (q.choiceGroup) {
        (byGroup[q.choiceGroup] ??= []).push(q);
      }
    }
    const consumed = new Set(Object.values(byGroup).flat().map((q) => q.questionId));
    for (const q of qs) {
      if (consumed.has(q.questionId)) continue;
      sets.push({ primary: q, alt: null });
    }
    for (const group of Object.values(byGroup)) {
      if (group.length === 0) continue;
      const primary = group.find((q) => !q.alternativeOf) ?? group[0];
      const alt = group.find((q) => q.questionId !== primary.questionId) ?? null;
      sets.push({ primary, alt });
    }
    return sets;
  }, []);

  return (
    <div className="min-h-screen mesh-bg-animated">
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/dashboard" className="btn-ghost px-2" aria-label="Go back">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white truncate flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-brand-300" aria-hidden="true" />
              Pre-Board Simulator
            </h1>
          </div>
          {phase === 'paper' && secondsLeft !== null && (
            <span className={`text-sm font-mono flex items-center gap-1 ${secondsLeft < 600 ? 'text-rose-300' : 'text-white/70'}`}>
              <Clock className="w-4 h-4" aria-hidden="true" /> {fmtTime(secondsLeft)}
            </span>
          )}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {phase === 'select' && (
          <div className="space-y-6">
            <p className="text-white/60 text-sm">
              Full CBSE-pattern board papers for classes 10 and 12 — sections with the official
              marks distribution, real board-exam questions, and a scorecard by section and
              chapter. Board-exam style, so you know exactly what the real thing feels like.
            </p>

            {/* CHILD-LENS (CHILD_EXPERIENCE_GAPS.md fix 10): a Class 9 child
                staring at "3h · 80 marks" papers must never believe that is
                THEIR exam. One honest line when the paper class differs from
                the child's own. */}
            {myClass !== classLevel && (
              <p className="rounded-xl border border-gold-500/30 bg-gold-500/10 px-4 py-3 text-amber-200 text-sm" role="note">
                {myClass < 10
                  ? `These are Class ${classLevel} board papers — early practice. Your own Class ${myClass} school exams are shorter; this is a preview of what's ahead.`
                  : `These are Class ${classLevel} board papers — early practice for your boards next year.`}
              </p>
            )}

            <div>
              <label className="text-xs uppercase tracking-wide text-white/40 mb-2 block">Class</label>
              <div className="flex gap-2">
                {[10, 12].map((c) => (
                  <button key={c} onClick={() => setClassLevel(c)}
                    className={`px-5 h-9 rounded-lg text-sm border transition ${
                      classLevel === c
                        ? 'bg-brand-500/20 border-brand-400 text-white'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}>
                    Class {c}
                  </button>
                ))}
              </div>
            </div>

            {loading && (
              <div className="flex items-center gap-2 text-white/50 text-sm py-10 justify-center">
                <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" /> Loading papers…
              </div>
            )}

            {/* P5 gap 3: the honest "taking long" state. When the paper bank
                does not answer within 10s the surface says so and offers a
                manual retry — never a silently blank page. */}
            {papersTimedOut && !loading && (
              <div className="rounded-xl border border-amber-400/30 bg-amber-500/5 px-4 py-4 text-center space-y-3" role="status">
                <p className="text-amber-200 text-sm">
                  The paper bank is taking unusually long to answer (over 10 seconds).
                  It may still be assembling papers on the server.
                </p>
                <button
                  onClick={() => loadPapers(classLevel)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium"
                >
                  <RefreshCw className="w-4 h-4" aria-hidden="true" /> Try again
                </button>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              {papers.map((p) => (
                <div key={p.subject} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">{p.label}</h3>
                    <span className="text-xs text-white/40 flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" /> {p.durationMinutes / 60}h
                    </span>
                  </div>
                  <p className="text-white/50 text-xs mt-1">
                    {p.totalMarks} marks · {p.questionCount} questions
                  </p>
                  <div className="mt-3 space-y-1">
                    {p.sections.map((s) => (
                      <div key={s.sectionId} className="flex justify-between text-xs text-white/60">
                        <span className="truncate pr-2">{s.title.split('—')[1]?.trim() ?? s.title}</span>
                        <span className="shrink-0">{s.questions} × {s.marksEach}m</span>
                      </div>
                    ))}
                  </div>
                  {p.depthNote && (
                    <p className="text-amber-200/70 text-[11px] mt-2">{p.depthNote}</p>
                  )}
                  <button onClick={() => startPaper(p.subject)} disabled={starting || !p.ready}
                    className="mt-4 w-full px-4 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium inline-flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed">
                    <Play className="w-4 h-4" aria-hidden="true" />
                    {starting ? 'Assembling…' : p.ready ? 'Start paper' : 'Bank too thin'}
                  </button>
                </div>
              ))}
            </div>
            {!loading && papers.length === 0 && !papersTimedOut && (
              <p className="text-white/50 text-sm py-6 text-center">
                No pre-board papers available for this class yet.
              </p>
            )}

            {/* P5 gap 2 wiring: /paper-lab (custom paper generator over the
                same board_questions bank) had no inbound link anywhere. */}
            <Link
              href="/paper-lab"
              data-testid="paper-lab-link"
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition-colors hover:border-gold-500/40"
            >
              <span>
                <span className="block font-display text-sm font-bold text-white">
                  Paper Lab — build your own paper
                </span>
                <span className="block text-xs text-white/50 mt-0.5">
                  Pick class, subject, chapters and marks — a board-pattern paper with an answer key.
                </span>
              </span>
              <span className="shrink-0 text-xs font-semibold text-gold-300">Open →</span>
            </Link>

            {error && (
              <p className="text-rose-300 text-sm bg-rose-500/10 border border-rose-400/30 rounded-lg p-3">{error}</p>
            )}
          </div>
        )}

        {phase === 'paper' && session && (
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-white text-sm font-semibold">{session.paperTitle}</p>
                <p className="text-white/50 text-xs">{session.totalMarks} marks · {allQuestions.length} questions</p>
              </div>
              <span className="text-xs text-white/50">{answeredCount} answered</span>
            </div>

            {session.shortfalls.length > 0 && (
              <div className="rounded-xl border border-amber-400/30 bg-amber-500/5 px-4 py-3 text-amber-200/90 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-medium">Honest paper notes</p>
                  <ul className="list-disc list-inside mt-1 space-y-0.5">
                    {session.shortfalls.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {session.sections.map((s, i) => (
                <button key={s.sectionId} onClick={() => setActiveSection(i)}
                  className={`px-4 h-9 rounded-lg text-xs border transition ${
                    activeSection === i
                      ? 'bg-brand-500/20 border-brand-400 text-white'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                  }`}>
                  Section {s.sectionId} · {s.attemptQuestions}Q · {s.marks}m
                </button>
              ))}
            </div>

            {(() => {
              const sec = session.sections[activeSection];
              if (!sec) return null;
              return (
                <div className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-white text-sm font-medium">{sec.title}</p>
                    <p className="text-white/50 text-xs mt-0.5">
                      {sec.note} Marks: {sec.marks} ({sec.attemptQuestions} × {sec.marksEach})
                    </p>
                  </div>
                  {choiceSets(sec.questions).map(({ primary, alt }) => (
                    <div key={primary.questionId} className="space-y-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <span className="text-brand-300 text-xs font-mono">Q{primary.number}</span>
                          <span className="text-white/40 text-xs shrink-0">{primary.marks} mark{primary.marks > 1 ? 's' : ''}</span>
                        </div>
                        <p className="text-white leading-relaxed whitespace-pre-wrap text-sm">{primary.text}</p>
                        {primary.options.length > 0 ? (
                          <div className="mt-4 space-y-2">
                            {primary.options.map((opt, i) => (
                              <button key={i}
                                onClick={() => setAnswers((a) => ({ ...a, [primary.questionId]: opt }))}
                                className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition ${
                                  answers[primary.questionId] === opt
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
                            value={answers[primary.questionId] ?? ''}
                            onChange={(e) => setAnswers((a) => ({ ...a, [primary.questionId]: e.target.value }))}
                            placeholder="Write your answer…"
                            rows={primary.marks >= 4 ? 6 : 3}
                            className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-400"
                          />
                        )}
                      </div>
                      {alt && (
                        <>
                          <div className="flex items-center gap-3" aria-hidden="true">
                            <div className="h-px flex-1 bg-white/15" />
                            <span className="text-white/50 text-xs font-semibold tracking-widest">OR</span>
                            <div className="h-px flex-1 bg-white/15" />
                          </div>
                          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <span className="text-brand-300 text-xs font-mono">Q{alt.number} <span className="text-white/40">(alternative)</span></span>
                              <span className="text-white/40 text-xs shrink-0">{alt.marks} mark{alt.marks > 1 ? 's' : ''}</span>
                            </div>
                            <p className="text-white leading-relaxed whitespace-pre-wrap text-sm">{alt.text}</p>
                            {alt.options.length > 0 ? (
                              <div className="mt-4 space-y-2">
                                {alt.options.map((opt, i) => (
                                  <button key={i}
                                    onClick={() => setAnswers((a) => ({ ...a, [alt.questionId]: opt }))}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition ${
                                      answers[alt.questionId] === opt
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
                                value={answers[alt.questionId] ?? ''}
                                onChange={(e) => setAnswers((a) => ({ ...a, [alt.questionId]: e.target.value }))}
                                placeholder="Write your answer…"
                                rows={alt.marks >= 4 ? 6 : 3}
                                className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-400"
                              />
                            )}
                            <p className="text-white/35 text-[11px] mt-2">Attempt either Q{primary.number} or Q{alt.number} — the better one scores.</p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setActiveSection((i) => Math.max(0, i - 1))}
                disabled={activeSection === 0}
                className="px-4 py-2 rounded-lg border border-white/10 text-white/70 text-sm disabled:opacity-40">
                Previous section
              </button>
              {activeSection < session.sections.length - 1 ? (
                <button onClick={() => setActiveSection((i) => i + 1)}
                  className="px-5 py-2 rounded-lg bg-brand-500 text-white text-sm font-medium inline-flex items-center gap-1">
                  Next section <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : (
                <button onClick={submitPaper} disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium disabled:opacity-50">
                  {submitting ? 'Scoring…' : 'Submit paper'}
                </button>
              )}
            </div>

            {error && (
              <p className="text-rose-300 text-sm bg-rose-500/10 border border-rose-400/30 rounded-lg p-3">{error}</p>
            )}
          </div>
        )}

        {phase === 'report' && report && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-white/50 text-sm">{report.paperTitle}</p>
                  <p className="text-3xl font-display font-bold text-white mt-1">
                    {report.totalScore} <span className="text-lg text-white/50">/ {report.maxScore}</span>
                  </p>
                  <p className="text-white/60 text-sm mt-1">
                    Grade {report.grade} · {report.passed ? 'Passed' : 'Below pass mark (33%)'} ·
                    {' '}{Math.round(report.timeTakenSeconds / 60)} min
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl font-display font-bold text-white">{report.percentage}%</div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-brand-300" aria-hidden="true" /> Section scores
                </h3>
                <div className="space-y-2">
                  {report.sections.map((s) => (
                    <div key={s.sectionId}>
                      <div className="flex justify-between text-xs text-white/70 mb-1">
                        <span className="truncate">{s.title}</span>
                        <span className="shrink-0">{s.score}/{s.max} · {s.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className={`h-full ${s.pct >= 60 ? 'bg-emerald-400' : s.pct >= 33 ? 'bg-amber-400' : 'bg-rose-400'}`}
                          style={{ width: `${Math.min(100, s.pct)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-white font-semibold text-sm mb-3">Chapter breakdown</h3>
                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                  {report.chapterBreakdown.map((c, i) => (
                    <div key={i} className="flex justify-between text-xs text-white/70">
                      <span className="truncate pr-2">Chapter {c.chapter.replace(/^ch/i, '').replace(/^0+/, '')}</span>
                      <span className={`shrink-0 ${c.pct < 40 ? 'text-rose-300' : c.pct >= 60 ? 'text-emerald-300' : 'text-amber-300'}`}>
                        {c.score}/{c.max} · {c.pct}%
                      </span>
                    </div>
                  ))}
                </div>
                {report.weakChapters.length > 0 && (
                  <p className="text-amber-200/70 text-[11px] mt-3">
                    Weak chapters: {report.weakChapters.map((c) => `Ch ${c.chapter.replace(/^ch/i, '').replace(/^0+/, '')}`).join(', ')}
                  </p>
                )}
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
                      {!r.attempted ? (
                        <span className="text-white/30 mt-0.5"><Clock className="w-4 h-4" aria-hidden="true" /></span>
                      ) : r.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" aria-hidden="true" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" aria-hidden="true" />
                      )}
                      <span className="text-white/80 line-clamp-2">
                        Q{r.number}. {r.question}
                        {!r.countedForScore && <span className="text-white/40"> (partner leg scored)</span>}
                      </span>
                    </summary>
                    <div className="mt-3 text-sm space-y-1.5 pl-6">
                      <p className="text-white/60">Your answer: <span className={r.isCorrect ? 'text-emerald-300' : 'text-rose-300'}>{r.studentAnswer || '(not attempted)'}</span></p>
                      {!r.isCorrect && <p className="text-white/60">Expected: <span className="text-emerald-300">{r.expectedAnswer}</span></p>}
                      {r.modelAnswer && r.modelAnswer !== r.expectedAnswer && (
                        <p className="text-white/50 text-xs">Model answer: {r.modelAnswer}</p>
                      )}
                      {r.explanation && <p className="text-white/50 text-xs mt-1">{r.explanation}</p>}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => { setPhase('select'); setSession(null); setReport(null); }}
                className="px-5 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium">
                Take another paper
              </button>
              <Link href="/exam"
                className="px-5 py-2.5 rounded-lg border border-white/15 text-white/80 text-sm">
                Back to exam list
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
