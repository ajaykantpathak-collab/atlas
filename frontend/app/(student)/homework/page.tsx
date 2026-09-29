'use client'

// ═══════════════════════════════════════════════════════════════
//  Homework — real class assignments from your teachers
//
//  Data contract (all live, nothing mocked):
//    GET  /api/assignments/student            → assignment list + status
//    GET  /api/assignments/{id}/questions     → your question set (answers
//                                                stay server-side)
//    POST /api/assignments/{id}/submit        → server-side grading; writes
//                                                real activity/XP/practice rows
//    GET  /api/assignments/{id}/result        → your graded result
// ═══════════════════════════════════════════════════════════════

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock as FiClock, CheckCircle as FiCheckCircle, AlertCircle as FiAlertCircle,
  ArrowLeft as FiArrowLeft, RefreshCw as FiRefreshCw, ChevronRight as FiChevronRight,
  BookOpen, Users, Calendar, Zap, WifiOff,
} from 'lucide-react'
import Link from 'next/link'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from 'zustand'
import { getAuthToken } from '@/lib/api'

// Page shell is static; ALL data loads client-side after auth (react-query),
// so force-static serves the shell instantly instead of per-request SSR.
export const dynamic = 'force-static';

// ───────────────────────────────────────────────────────────────
//  Types
// ───────────────────────────────────────────────────────────────

interface AssignmentSummary {
  id: string
  className: string
  teacherName: string
  topicLabel: string
  subject: string
  questionCount: number
  dueDate: string | null
  note: string | null
  createdAt: string | null
  status: 'pending' | 'completed' | 'overdue'
  completedAt: string | null
  scorePct: number | null
  correctCount: number | null
}

interface Question {
  id: string
  index: number
  type: 'mcq' | 'short' | 'long'
  text: string
  options: string[] | null
  marks: number
}

interface QuestionSet {
  assignmentId: string
  topicLabel: string
  subject: string
  note: string | null
  dueDate: string | null
  questions: Question[]
}

interface GradedQuestion {
  questionId: string
  index: number
  questionText: string
  studentAnswer: string
  isCorrect: boolean
  correctAnswer: string
  explanation: string
}

interface SubmitResult {
  assignmentId: string
  topicLabel: string
  scorePct: number
  correctCount: number
  questionCount: number
  xpEarned: number
  completedAt: string
  results: GradedQuestion[]
}

// ───────────────────────────────────────────────────────────────
//  Store (UI state only)
// ───────────────────────────────────────────────────────────────

type TabFilter = 'pending' | 'completed' | 'all'

interface HomeworkUiStore {
  selectedId: string | null
  answers: Record<string, Record<string, string>>
  setAnswer: (aid: string, qid: string, value: string) => void
  select: (id: string | null) => void
  resetAnswers: (aid: string) => void
}

const useHomeworkUi = create<HomeworkUiStore>()((set) => ({
  selectedId: null,
  answers: {},
  setAnswer: (aid, qid, value) =>
    set((s) => ({
      answers: { ...s.answers, [aid]: { ...(s.answers[aid] || {}), [qid]: value } },
    })),
  select: (id) => set({ selectedId: id }),
  resetAnswers: (aid) =>
    set((s) => {
      const next = { ...s.answers }
      delete next[aid]
      return { answers: next }
    }),
}))

// ───────────────────────────────────────────────────────────────
//  API helpers
// ───────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAuthToken()
  const res = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  })
  if (res.status === 401) throw new Error('NOT_SIGNED_IN')
  const body = await res.json().catch(() => null)
  if (!res.ok) {
    const d = body?.detail
    throw new Error(
      typeof d === 'string'
        ? d
        : typeof d === 'object' && d?.message
          ? d.message
          : `Request failed (${res.status})`,
    )
  }
  return body as T
}

function formatDue(iso: string | null): string {
  if (!iso) return 'No due date'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'No due date'
  const days = Math.ceil((d.getTime() - Date.now()) / 86_400_000)
  if (days < 0) return 'Overdue'
  if (days === 0) return 'Due today'
  if (days === 1) return 'Due tomorrow'
  return `Due ${d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
}

function statusBadge(status: AssignmentSummary['status']): string {
  switch (status) {
    case 'completed': return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30'
    case 'overdue': return 'text-red-300 bg-red-500/10 border-red-500/30'
    default: return 'text-amber-300 bg-amber-500/10 border-amber-500/30'
  }
}

/** Render $...$ LaTeX segments with KaTeX (falls back to raw text). */
function LatexSpan({ tex }: { tex: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    let cancelled = false
    import('katex/contrib/auto-render').then((mod) => {
      if (!cancelled && ref.current) {
        try {
          mod.default(ref.current, {
            throwOnError: false,
            delimiters: [
              { left: '$$', right: '$$', display: false },
              { left: '\\(', right: '\\)', display: false },
            ],
          })
        } catch {
          /* leave raw text */
        }
      }
    })
    return () => {
      cancelled = true
    }
  }, [tex])
  return <span ref={ref}>{tex}</span>
}

function MathText({ text, className }: { text: string; className?: string }) {
  const parts = text.split('$')
  if (parts.length === 1) return <span className={className}>{text}</span>
  return (
    <span className={className}>
      {parts.map((part, i) => (i % 2 === 0 ? <span key={i}>{part}</span> : <LatexSpan key={i} tex={part} />))}
    </span>
  )
}

// ───────────────────────────────────────────────────────────────
//  Data hooks
// ───────────────────────────────────────────────────────────────

function useAssignments(enabled: boolean) {
  return useQuery({
    queryKey: ['assignments', 'student'],
    queryFn: () => apiFetch<AssignmentSummary[]>('/api/assignments/student'),
    enabled,
    staleTime: 60 * 1000,
    retry: 1,
  })
}

function useQuestionSet(assignmentId: string | null, enabled: boolean) {
  return useQuery({
    queryKey: ['assignments', 'questions', assignmentId],
    queryFn: () => apiFetch<QuestionSet>(`/api/assignments/${assignmentId}/questions`),
    enabled: enabled && !!assignmentId,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  })
}

function useResult(assignmentId: string | null, enabled: boolean) {
  return useQuery({
    queryKey: ['assignments', 'result', assignmentId],
    queryFn: () => apiFetch<SubmitResult>(`/api/assignments/${assignmentId}/result`),
    enabled: enabled && !!assignmentId,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  })
}

function useSubmitMutation(assignmentId: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (answers: Record<string, string>) => {
      const payload = {
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      }
      return apiFetch<SubmitResult>(`/api/assignments/${assignmentId}/submit`, {
        method: 'POST',
        body: JSON.stringify(payload),
      })
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['assignments', 'student'] })
      qc.invalidateQueries({ queryKey: ['assignments', 'result', assignmentId] })
    },
  })
}

// ───────────────────────────────────────────────────────────────
//  Components
// ───────────────────────────────────────────────────────────────

function AssignmentCard({
  a,
  index,
  onOpen,
}: {
  a: AssignmentSummary
  index: number
  onOpen: () => void
}) {
  const done = a.status === 'completed'
  return (
    <motion.button
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: Math.min(index * 0.07, 0.35), type: 'spring', stiffness: 260, damping: 24 }}
      whileTap={{ scale: 0.98 }}
      onClick={onOpen}
      className="group w-full text-left"
      aria-label={`${a.topicLabel} — ${a.status}`}
    >
      <div className="glass-card rounded-2xl border border-white/50 p-5 transition-all duration-300 hover:border-gold-400/40 hover:shadow-xl hover:shadow-gold-500/10">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-gold-500/15 px-3 py-1 text-xs font-semibold text-gold-300">
            <BookOpen className="h-3 w-3" />
            {a.className || a.subject || 'Classwork'}
          </span>
          <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusBadge(a.status)}`}>
            {a.status === 'completed' ? 'Completed' : a.status === 'overdue' ? 'Overdue' : 'Pending'}
          </span>
        </div>

        <h3 className="mb-2 text-lg font-bold text-slate-100 transition-colors group-hover:text-gold-300">
          {a.topicLabel}
        </h3>

        <p className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1">
            <FiClock className="h-3.5 w-3.5" /> {formatDue(a.dueDate)}
          </span>
          <span>{a.questionCount} questions</span>
          {a.teacherName && (
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3" /> {a.teacherName}
            </span>
          )}
          {done && a.scorePct !== null && <span className="font-semibold text-emerald-400">Score {a.scorePct}%</span>}
        </p>

        <div className="flex items-center justify-end gap-1 text-gold-300">
          <span className="text-xs font-medium">
            {done ? 'View results' : a.status === 'overdue' ? 'Complete now' : 'Start'}
          </span>
          <FiChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </motion.button>
  )
}

function QuestionCard({
  q,
  idx,
  total,
  answer,
  onChange,
  disabled,
}: {
  q: Question
  idx: number
  total: number
  answer: string
  onChange: (v: string) => void
  disabled: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-700 bg-slate-800/80 p-5 shadow-sm"
      role="group"
      aria-label={`Question ${idx + 1} of ${total}`}
    >
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gold-500/20 text-sm font-bold text-gold-300">
          {idx + 1}
        </span>
        <div className="min-w-0 flex-1">
          <MathText text={q.text} className="block font-medium leading-relaxed text-slate-100" />
          <span className="mt-1 block text-xs text-slate-400">
            {q.marks} mark{q.marks === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {q.type === 'mcq' && q.options ? (
        <div className="ml-11 space-y-2" role="radiogroup" aria-label={`Question ${idx + 1} options`}>
          {q.options.map((opt, oi) => (
            <label
              key={oi}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${
                answer === opt
                  ? 'border-gold-400 bg-gold-500/15 shadow-sm'
                  : 'border-slate-700 bg-slate-800/60 hover:border-gold-400/40'
              }`}
            >
              <input
                type="radio"
                name={`q-${q.id}`}
                checked={answer === opt}
                onChange={() => onChange(opt)}
                className="sr-only"
                disabled={disabled}
              />
              <span
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  answer === opt ? 'border-gold-500 bg-gold-500' : 'border-slate-500'
                }`}
                aria-hidden="true"
              >
                {answer === opt && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>
              <MathText text={opt} className="text-sm text-slate-200" />
            </label>
          ))}
        </div>
      ) : q.type === 'long' ? (
        <textarea
          value={answer}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          rows={4}
          placeholder="Write your answer — show your working…"
          className="ml-11 w-[calc(100%-2.75rem)] resize-y rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gold-500/50 disabled:opacity-60"
          aria-label="Long answer"
        />
      ) : (
        <input
          type="text"
          value={answer}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Type your answer…"
          className="ml-11 w-[calc(100%-2.75rem)] rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gold-500/50 disabled:opacity-60"
          aria-label="Answer"
        />
      )}
    </motion.div>
  )
}

function ResultView({ result }: { result: SubmitResult }) {
  const pct = result.scorePct
  const msg =
    pct >= 90
      ? 'Outstanding work!'
      : pct >= 70
        ? 'Great job — nearly there.'
        : pct >= 50
          ? 'Good effort — review the misses below.'
          : 'Keep practicing — check the correct answers below.'
  return (
    <div className="space-y-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gold-500 via-gold-600 to-purple-600 p-6 text-white shadow-xl"
      >
        <div className="relative">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-2xl backdrop-blur-sm">🎯</div>
            <div>
              <h3 className="text-2xl font-bold">
                {result.correctCount}/{result.questionCount}
              </h3>
              <p className="text-sm text-gold-100">
                {pct}% · {msg}
              </p>
            </div>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-emerald-100"
            />
          </div>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-gold-100">
            <Zap className="h-4 w-4" /> +{result.xpEarned} XP earned
          </p>
        </div>
      </motion.div>

      <div className="space-y-3" role="list" aria-label="Question results">
        {result.results.map((r, i) => (
          <motion.div
            key={r.questionId}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(i * 0.06, 0.5) }}
            role="listitem"
            className={`rounded-xl border p-4 ${
              r.isCorrect ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-red-500/30 bg-red-500/10'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                  r.isCorrect ? 'bg-emerald-500' : 'bg-red-500'
                }`}
              >
                {r.isCorrect ? (
                  <FiCheckCircle className="h-4 w-4 text-white" />
                ) : (
                  <FiAlertCircle className="h-4 w-4 text-white" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-200">Q{i + 1}: {r.isCorrect ? 'Correct' : 'Incorrect'}</p>
                <MathText text={r.questionText} className="mt-1 block text-xs text-slate-300" />
                <p className="mt-1.5 text-xs text-slate-400">
                  Your answer: <span className="font-mono">{r.studentAnswer || '(not answered)'}</span>
                </p>
                {!r.isCorrect && r.correctAnswer && (
                  <p className="mt-0.5 text-xs text-slate-400">
                    Correct answer: <span className="font-mono text-emerald-600">{r.correctAnswer}</span>
                  </p>
                )}
                {r.explanation && (
                  <p className="mt-2 border-t border-slate-700/60 pt-2 text-xs italic text-slate-400">{r.explanation}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SignInPrompt() {
  return (
    <div className="glass-card mx-auto max-w-md rounded-2xl border border-white/10 p-10 text-center">
      <h2 className="font-display text-lg font-bold text-white">Sign in to see your homework</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/45">
        Assignments your teachers set for your class appear here the moment you sign in.
      </p>
      <Link
        href="/login"
        className="mt-5 inline-block rounded-lg bg-gold-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold-400"
      >
        Sign in
      </Link>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────
//  Main page
// ───────────────────────────────────────────────────────────────

export default function HomeworkPage() {
  const signedIn = useQuery({
    queryKey: ['auth-token-check'],
    queryFn: async () => Boolean(getAuthToken()),
    staleTime: Infinity,
    enabled: typeof window !== 'undefined',
  })
  const enabled = signedIn.data === true

  const { data: assignments, isLoading, error, refetch } = useAssignments(enabled)
  const selectedId = useHomeworkUi((s) => s.selectedId)
  const select = useHomeworkUi((s) => s.select)
  const answersByAssignment = useHomeworkUi((s) => s.answers)
  const setAnswer = useHomeworkUi((s) => s.setAnswer)
  const resetAnswers = useHomeworkUi((s) => s.resetAnswers)

  const [tab, setTab] = useState<TabFilter>('pending')
  const [toast, setToast] = useState<{ message: string; tone: 'ok' | 'err' } | null>(null)
  const [submittedResult, setSubmittedResult] = useState<SubmitResult | null>(null)

  const selectedAssignment = useMemo(
    () => assignments?.find((a) => a.id === selectedId) || null,
    [assignments, selectedId],
  )
  const isCompletedView = selectedAssignment?.status === 'completed'

  const questionSet = useQuestionSet(selectedId, enabled && !!selectedId && !isCompletedView)
  const priorResult = useResult(selectedId, enabled && !!selectedId && isCompletedView)
  const submitMutation = useSubmitMutation(selectedId || '')

  const answers = selectedId ? answersByAssignment[selectedId] || {} : {}

  useEffect(() => {
    setSubmittedResult(null)
  }, [selectedId])

  const showToast = useCallback((message: string, tone: 'ok' | 'err') => {
    setToast({ message, tone })
    setTimeout(() => setToast(null), 3500)
  }, [])

  const filtered = useMemo(() => {
    if (!assignments) return []
    if (tab === 'all') return assignments
    if (tab === 'completed') return assignments.filter((a) => a.status === 'completed')
    return assignments.filter((a) => a.status !== 'completed')
  }, [assignments, tab])

  const counts = useMemo(() => {
    const list = assignments || []
    return {
      pending: list.filter((a) => a.status !== 'completed').length,
      completed: list.filter((a) => a.status === 'completed').length,
      all: list.length,
    }
  }, [assignments])

  const handleSubmit = useCallback(async () => {
    if (!selectedAssignment || !questionSet.data) return
    const qs = questionSet.data.questions
    const unanswered = qs.filter((q) => !(answers[q.id] || '').trim())
    if (unanswered.length > 0) {
      showToast(`Answer every question first — ${unanswered.length} left.`, 'err')
      return
    }
    try {
      const result = await submitMutation.mutateAsync(answers)
      setSubmittedResult(result)
      resetAnswers(selectedAssignment.id)
      showToast(`Scored ${result.correctCount}/${result.questionCount} · +${result.xpEarned} XP`, 'ok')
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Submission failed — try again.', 'err')
    }
  }, [selectedAssignment, questionSet.data, answers, submitMutation, resetAnswers, showToast])

  // ── Detail view ──
  if (selectedId) {
    const loadingDetail =
      (!isCompletedView && questionSet.isLoading) || (isCompletedView && priorResult.isLoading)
    const detailError = !isCompletedView ? questionSet.error : priorResult.error
    const shownResult = submittedResult || (isCompletedView ? priorResult.data : null)

    return (
      <div className="min-h-screen bg-slate-950 pb-16">
        <header className="sticky top-0 z-40 border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-4">
            <button
              onClick={() => select(null)}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              aria-label="Back to homework list"
            >
              <FiArrowLeft className="h-4 w-4" /> Back
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-2xl space-y-5 px-4 pt-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">
              {selectedAssignment?.className}
            </p>
            <h1 className="mt-1 font-display text-2xl font-bold text-white">
              {selectedAssignment?.topicLabel || questionSet.data?.topicLabel || 'Assignment'}
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
              <span>{questionSet.data?.questions.length || selectedAssignment?.questionCount || 0} questions</span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3 w-3" /> {formatDue(selectedAssignment?.dueDate || null)}
              </span>
            </p>
            {(selectedAssignment?.note || questionSet.data?.note) && (
              <p className="mt-3 rounded-xl border border-gold-500/20 bg-gold-500/10 px-4 py-3 text-sm text-gold-200">
                {selectedAssignment?.note || questionSet.data?.note}
              </p>
            )}
          </div>

          {loadingDetail && (
            <div className="glass-card rounded-2xl border border-white/10 p-10 text-center text-sm text-white/40">
              Loading your questions…
            </div>
          )}

          {!loadingDetail && detailError && (
            <div className="glass-card rounded-2xl border border-red-400/20 p-10 text-center">
              <WifiOff className="mx-auto mb-2 h-6 w-6 text-red-300" />
              <p className="text-sm text-red-200">
                Could not load this assignment.{' '}
                {detailError instanceof Error && detailError.message !== 'NOT_SIGNED_IN'
                  ? detailError.message
                  : ''}
              </p>
              <button
                onClick={() => (isCompletedView ? priorResult.refetch() : questionSet.refetch())}
                className="mt-3 rounded-lg bg-white/10 px-4 py-2 text-xs text-white/80 hover:bg-white/15"
              >
                Retry
              </button>
            </div>
          )}

          {shownResult && <ResultView result={shownResult} />}

          {!loadingDetail && !detailError && !shownResult && questionSet.data && (
            <>
              <div className="space-y-4">
                {questionSet.data.questions.map((q, i) => (
                  <QuestionCard
                    key={q.id}
                    q={q}
                    idx={i}
                    total={questionSet.data!.questions.length}
                    answer={answers[q.id] || ''}
                    onChange={(v) => selectedId && setAnswer(selectedId, q.id, v)}
                    disabled={submitMutation.isPending}
                  />
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitMutation.isPending}
                className="w-full rounded-2xl bg-gradient-to-r from-gold-500 to-purple-600 py-4 font-display text-base font-bold text-white shadow-lg shadow-gold-500/25 transition-all hover:shadow-gold-500/40 disabled:opacity-60"
              >
                {submitMutation.isPending ? 'Submitting…' : 'Submit answers'}
              </button>
              <p className="text-center text-[11px] text-white/30">
                Graded on the server against the verified answer bank. Your completion is recorded
                for your teacher the moment you submit.
              </p>
            </>
          )}
        </main>
      </div>
    )
  }

  // ── List view ──
  return (
    <div className="min-h-screen bg-slate-950 pb-16">
      <header className="sticky top-0 z-40 border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-xl">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="font-display text-2xl font-bold tracking-tight text-white">Homework</h1>
              <p className="mt-0.5 text-sm text-slate-400">Assignments from your teachers — complete them here</p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => refetch()}
              className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-2 text-xs text-slate-300 transition-colors hover:bg-slate-700"
              aria-label="Refresh homework"
            >
              <FiRefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
          </div>

          {signedIn.data && (
            <div className="mt-4 flex gap-2" role="tablist" aria-label="Filter homework">
              {(['pending', 'completed', 'all'] as TabFilter[]).map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    tab === key
                      ? 'bg-gold-500/20 text-gold-200 shadow-sm ring-1 ring-gold-400/40'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {key === 'pending' ? 'Pending' : key === 'completed' ? 'Completed' : 'All'} ({counts[key]})
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-4 px-4 pt-6">
        {!signedIn.data && <SignInPrompt />}

        {signedIn.data && isLoading && (
          <div className="glass-card rounded-2xl border border-white/10 p-10 text-center text-sm text-white/40">
            Loading your homework…
          </div>
        )}

        {signedIn.data && !isLoading && error && (
          <div className="glass-card rounded-2xl border border-red-400/20 p-10 text-center">
            <WifiOff className="mx-auto mb-2 h-6 w-6 text-red-300" />
            <p className="text-sm text-red-200">
              {error instanceof Error && error.message === 'NOT_SIGNED_IN'
                ? 'Your session expired — sign in again to see your homework.'
                : 'Could not reach the homework service. Try again in a moment.'}
            </p>
            {error instanceof Error && error.message === 'NOT_SIGNED_IN' ? (
              <Link
                href="/login"
                className="mt-4 inline-block rounded-lg bg-gold-500 px-5 py-2 text-xs font-semibold text-white hover:bg-gold-400"
              >
                Sign in
              </Link>
            ) : (
              <button
                onClick={() => refetch()}
                className="mt-3 rounded-lg bg-white/10 px-4 py-2 text-xs text-white/80 hover:bg-white/15"
              >
                Retry
              </button>
            )}
          </div>
        )}

        {signedIn.data && !isLoading && !error && filtered.length === 0 && (
          <div className="glass-card rounded-2xl border border-white/10 p-10 text-center">
            <BookOpen className="mx-auto mb-3 h-8 w-8 text-white/20" />
            <p className="font-display text-sm font-bold text-white/70">
              {tab === 'completed' ? 'Nothing completed yet' : 'No homework right now'}
            </p>
            <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-white/40">
              {tab === 'completed'
                ? 'Assignments you submit will show up here with your scores.'
                : counts.all > 0
                  ? 'Everything assigned to you is done — nice work.'
                  : 'When your teacher sets an assignment for your class, it appears here automatically.'}
            </p>
          </div>
        )}

        {signedIn.data &&
          !isLoading &&
          !error &&
          filtered.map((a, i) => <AssignmentCard key={a.id} a={a} index={i} onOpen={() => select(a.id)} />)}
      </main>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl px-5 py-3 text-sm font-medium shadow-lg ${
              toast.tone === 'ok' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
            }`}
            role="status"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
