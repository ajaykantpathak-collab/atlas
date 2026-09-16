'use client'

/**
 * QuickQuiz — in-page practice card for the learn page.
 *
 * TWO modes, both closed-world (every string shown exists in authored data):
 *
 * 1. DIAGNOSTICS MODE (default when a nodeId is given and the node's
 *    authored corpus has servable diagnostic questions). The quiz serves
 *    the node's OWN diagnostic questions; a missed answer maps to that
 *    question's authored misconception analysis and opens the Fix-it
 *    recipe: authored prereq lessons (→ /learn/{prereq}) each with the
 *    sims authored for the prereq. That is the remediation loop:
 *      missed question → misconception → prereq lesson → prereq sim.
 *    MCQ diagnostics (when the corpus authored options) grade by pick;
 *    free-text diagnostics grade by honest self-check against the
 *    authored answer — the app never generates or paraphrases content.
 *
 * 2. PRACTICE MODE (fallback: no nodeId, or no servable diagnostics).
 *    The deterministic practice engine (backend: /api/practice/deterministic).
 *    A graded wrong answer shows the node's authored common misconception
 *    + the same Fix-it recipe when the corpus provides them.
 *
 * STATELESS ANSWER ESCROW (practice mode), mirrored from the backend contract —
 *   GET  /api/practice/deterministic/library           → shippable books
 *   GET  /api/practice/deterministic/item?book=&index=&seed=
 *   POST /api/practice/deterministic/check             → grades attempt
 * The item response physically cannot leak the answer (the final step
 * value is null); grading happens server-side against the escrowed
 * solution. IMPORTANT: /item walks forward to the first servable
 * example, so POST /check must echo the *returned* item.index, not the
 * requested one.
 *
 * Honest degradation: no authored recipe for the node → the misconception
 * and Fix-it sections are omitted entirely (never invented). If the corpus
 * has no practice book for this subject, or any fetch fails, the card says
 * so and links to the full /practice page.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  PenSquare, Loader2, CheckCircle2, XCircle, RotateCcw,
  ArrowRight, Lightbulb, Coins, BookOpen, Target, Eye,
} from 'lucide-react'
import Link from 'next/link'
import { api } from '@/lib/api'
import MisconceptionPanel from './MisconceptionPanel'
import PrereqFixList from './PrereqFixList'
import AuthoredText from './AuthoredText'
import { fetchNodeRemediation, type DiagnosticQuestion, type NodeRemediation } from './remediation'
import AnswerReview from '@/components/answers/AnswerReview'
import { buildSubjectiveReview } from '@/components/answers/derive'

interface PracticeBook {
  book: string
  n_examples: number
  n_verified: number
  license: string
  shippable: boolean
}

interface PracticeStep {
  n: number
  name: string
  expression: string
  value: string | null
}

interface PracticeItem {
  book: string
  index: number
  seed: number
  question: string
  target: string
  givens: string[]
  steps: PracticeStep[]
  n_steps: number
}

interface CheckResult {
  correct: boolean
  verdict: string
  expected: number | null
  student: number | null
  steps: PracticeStep[] | null
  target: string | null
}

/** Subject → corpus book-name hints (library only lists shippable books). */
const SUBJECT_BOOK_HINTS: Record<string, RegExp[]> = {
  physics: [/physics/i],
  chem: [/chem/i],
  maths: [/algebra|statistic|calculus|prealgebra|geometry/i],
}

function normalizeSubject(raw: string): string {
  const s = (raw || '').toLowerCase()
  if (s.includes('bio')) return 'bio'
  if (s.includes('chem')) return 'chem'
  if (s.includes('phy')) return 'physics'
  if (s.includes('math')) return 'maths'
  return s
}

function pickBook(books: PracticeBook[], subject: string): string | null {
  const usable = books.filter((b) => b.n_verified > 0)
  if (!usable.length) return null
  const hints = SUBJECT_BOOK_HINTS[subject]
  if (hints) {
    for (const hint of hints) {
      const matches = usable.filter((b) => hint.test(b.book))
      if (matches.length) {
        matches.sort((a, b) => b.n_verified - a.n_verified)
        return matches[0].book
      }
    }
  }
  return null
}

/** Fisher-Yates over a copy — question serving order only, no content. */
function shuffled<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

type DiagPhase = 'answering' | 'revealed' | 'correct' | 'missed'

export default function QuickQuiz({
  subject,
  nodeId,
  onClose,
  startDiagnostic,
}: {
  subject: string
  /** Learn-page node — enables the authored-diagnostics remediation loop. */
  nodeId?: string
  onClose?: () => void
  /** Diagnostic index to re-serve first (retry CTA from the Remediation tab). */
  startDiagnostic?: number | null
}) {
  const [mode, setMode] = useState<'loading' | 'diagnostics' | 'practice'>(
    nodeId ? 'loading' : 'practice',
  )
  const [remediation, setRemediation] = useState<NodeRemediation | null>(null)

  // ── diagnostics mode state ──────────────────────────────────────────
  const [queue, setQueue] = useState<number[]>([]) // indices into diagnostics
  const [qPos, setQPos] = useState(0)
  const [phase, setPhase] = useState<DiagPhase>('answering')
  const [attempt, setAttempt] = useState('')
  const [picked, setPicked] = useState<number | null>(null)
  const [revealAnswer, setRevealAnswer] = useState(false)

  // ── practice mode state ─────────────────────────────────────────────
  const [booting, setBooting] = useState(true)
  const [failed, setFailed] = useState<'subject' | 'network' | null>(null)
  const [item, setItem] = useState<PracticeItem | null>(null)
  const [result, setResult] = useState<CheckResult | null>(null)
  const [grading, setGrading] = useState(false)
  const [answer, setAnswer] = useState('')
  const bookRef = useRef<string | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const current: DiagnosticQuestion | null = useMemo(() => {
    if (!remediation || mode !== 'diagnostics') return null
    const idx = queue[qPos]
    return idx === undefined ? null : remediation.diagnostics[idx] ?? null
  }, [mode, remediation, queue, qPos])

  /** Serve `first` (retry CTA) ahead of the shuffled rest. */
  const buildQueue = useCallback(
    (r: NodeRemediation, first: number | null | undefined) => {
      const n = r.diagnostics.length
      const rest = shuffled(Array.from({ length: n }, (_, i) => i)).filter(
        (i) => i !== first,
      )
      const head = first !== null && first !== undefined && first >= 0 && first < n ? [first] : []
      setQueue([...head, ...rest])
      setQPos(0)
      setPhase('answering')
      setAttempt('')
      setPicked(null)
      setRevealAnswer(false)
    },
    [],
  )

  // Decide the mode from the node's authored corpus.
  useEffect(() => {
    if (!nodeId) return
    let alive = true
    setMode('loading')
    fetchNodeRemediation(nodeId)
      .then((r) => {
        if (!alive) return
        setRemediation(r)
        if (r.diagnostics.length > 0) {
          buildQueue(r, startDiagnostic)
          setMode('diagnostics')
        } else {
          setMode('practice') // honest fallback — no authored diagnostics
        }
      })
      .catch(() => {
        if (alive) setMode('practice')
      })
    return () => {
      alive = false
    }
  }, [nodeId, startDiagnostic, buildQueue])

  // ── practice engine (unchanged deterministic flow) ──────────────────

  const loadItem = useCallback((book: string) => {
    setBooting(true)
    setResult(null)
    setAnswer('')
    const index = Math.floor(Math.random() * 1000)
    const seed = Math.floor(Math.random() * 1_000_000)
    api
      .get<PracticeItem>(
        `/api/practice/deterministic/item?book=${encodeURIComponent(book)}&index=${index}&seed=${seed}`,
      )
      .then((it) => {
        setItem(it)
        setBooting(false)
        // focus the answer box once the question lands
        requestAnimationFrame(() => inputRef.current?.focus())
      })
      .catch(() => setFailed('network'))
  }, [])

  const boot = useCallback(() => {
    setFailed(null)
    setBooting(true)
    api
      .get<{ books: PracticeBook[] }>('/api/practice/deterministic/library')
      .then((lib) => {
        const book = pickBook(lib?.books || [], normalizeSubject(subject))
        if (!book) {
          setFailed('subject')
          return
        }
        bookRef.current = book
        loadItem(book)
      })
      .catch(() => setFailed('network'))
  }, [loadItem, subject])

  useEffect(() => {
    if (mode === 'practice') boot()
  }, [mode, boot])

  const submit = () => {
    if (!item || grading || !answer.trim()) return
    setGrading(true)
    api
      .post<CheckResult>('/api/practice/deterministic/check', {
        book: item.book,
        index: item.index, // returned (walked-forward) index — NOT the requested one
        seed: item.seed,
        answer: answer.trim(),
      })
      .then((r) => {
        setResult(r)
        setGrading(false)
      })
      .catch(() => {
        setFailed('network')
        setGrading(false)
      })
  }

  const next = () => {
    if (bookRef.current) loadItem(bookRef.current)
  }

  // ── diagnostics mode actions ────────────────────────────────────────

  const nextDiagnostic = () => {
    if (qPos + 1 >= queue.length) {
      setPhase('answering') // sentinel: qPos beyond queue → done state
      setQPos(queue.length)
      return
    }
    setQPos(qPos + 1)
    setPhase('answering')
    setAttempt('')
    setPicked(null)
    setRevealAnswer(false)
  }

  const retryDiagnostic = () => {
    setPhase('answering')
    setAttempt('')
    setPicked(null)
    setRevealAnswer(false)
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  /** Compare with the authored answer → honest self-check (free-text).
      This is the transition that opens the verdict + remediation loop. */
  const revealDiagnostic = () => {
    if (phase !== 'answering' || !attempt.trim()) return
    setRevealAnswer(true)
    setPhase('revealed')
  }

  const restartDiagnostics = () => {
    if (remediation) buildQueue(remediation, null)
  }

  /** MCQ pick — wrong pick lands in the remediation loop immediately. */
  const pickOption = (i: number) => {
    if (!current || phase !== 'answering') return
    setPicked(i)
    const chosen = current.options[i]?.trim()
    setPhase(chosen && chosen === current.answer.trim() ? 'correct' : 'missed')
  }

  const selfCheck = (gotIt: boolean) => {
    setPhase(gotIt ? 'correct' : 'missed')
  }

  const fixIt = remediation && remediation.prereqIds.length > 0 ? (
    <PrereqFixList prereqIds={remediation.prereqIds} />
  ) : null

  /* ── degraded practice states (mode already resolved) ─────────────── */

  if (mode === 'practice' && failed === 'subject') {
    return (
      <div className="glass-card p-6">
        <Header />
        <p className="text-sm text-surface-600 mb-4">
          Instant practice questions for this subject aren&apos;t part of the
          in-page quiz yet — the full practice page has more ways to test
          yourself.
        </p>
        <Link href="/practice" className="btn-secondary text-sm inline-flex items-center gap-2">
          <ArrowRight className="w-4 h-4" />
          Go to Practice
        </Link>
      </div>
    )
  }

  if (mode === 'practice' && failed === 'network') {
    return (
      <div className="glass-card p-6">
        <Header />
        <p className="text-sm text-surface-600 mb-4">
          The practice engine isn&apos;t responding right now. You can try
          again from the full practice page.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={boot}
            className="btn-secondary text-sm inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Retry
          </button>
          <Link href="/practice" className="btn-secondary text-sm inline-flex items-center gap-2">
            <ArrowRight className="w-4 h-4" />
            Go to Practice
          </Link>
        </div>
      </div>
    )
  }

  /* ── card shell ───────────────────────────────────────────────────── */

  return (
    <div className="glass-card p-6">
      {mode === 'diagnostics' ? <DiagHeader n={remediation?.diagnostics.length ?? 0} /> : <Header />}

      {mode === 'loading' && (
        <div className="space-y-3 py-2">
          <div className="flex items-center gap-2 text-sm text-surface-600">
            <Loader2 className="w-4 h-4 animate-spin text-gold-300" />
            Loading this topic&apos;s diagnostic questions…
          </div>
          <div className="h-4 w-3/4 rounded bg-surface-200/50 animate-pulse" />
          <div className="h-4 w-1/2 rounded bg-surface-200/50 animate-pulse" />
          <div className="h-10 w-full rounded-lg bg-surface-200/30 animate-pulse mt-3" />
        </div>
      )}

      {mode === 'practice' && (booting || !item ? (
        <div className="space-y-3 py-2">
          <div className="flex items-center gap-2 text-sm text-surface-600">
            <Loader2 className="w-4 h-4 animate-spin text-gold-300" />
            Picking a verified question…
          </div>
          <div className="h-4 w-3/4 rounded bg-surface-200/50 animate-pulse" />
          <div className="h-4 w-1/2 rounded bg-surface-200/50 animate-pulse" />
          <div className="h-10 w-full rounded-lg bg-surface-200/30 animate-pulse mt-3" />
        </div>
      ) : (
        <>
          {/* Question */}
          <motion.div
            key={`${item.book}-${item.index}-${item.seed}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[11px] uppercase tracking-wider text-gold-300 font-semibold mb-2">
              Question
            </p>
            <p className="text-white leading-relaxed mb-3">{item.question}</p>

            {item.givens && item.givens.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="flex items-center gap-1 text-xs text-surface-600">
                  <Coins className="w-3.5 h-3.5" />
                  Known values:
                </span>
                {item.givens.map((g, i) => (
                  <span
                    key={i}
                    className="badge text-xs"
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            {item.target && (
              <p className="flex items-center gap-1.5 text-xs text-surface-600 mb-4">
                <Lightbulb className="w-3.5 h-3.5 text-gold-300" />
                Find: <span className="text-surface-800 font-medium">{item.target}</span>
              </p>
            )}
          </motion.div>

          {/* Answer input */}
          {!result || result.verdict === 'unparseable' ? (
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                inputMode="decimal"
                placeholder="Your answer — e.g. 42 or 7/2"
                className="flex-1 rounded-lg bg-surface-100/60 border border-surface-300/50 px-3 py-2.5 text-sm text-white placeholder:text-surface-600 focus:outline-none focus:border-gold-400/60"
                disabled={grading}
              />
              <button
                onClick={submit}
                disabled={grading || !answer.trim()}
                className="btn-primary text-sm px-4 inline-flex items-center gap-2"
              >
                {grading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                Check
              </button>
            </div>
          ) : (
            <PracticeFeedback
              result={result}
              commonMisconception={remediation?.commonMisconception ?? null}
              prereqIds={remediation?.prereqIds ?? []}
              onNext={next}
              onClose={onClose}
            />
          )}

          {result?.verdict === 'unparseable' && (
            <p className="mt-2 text-xs text-gold-300">
              Couldn&apos;t read that as a number — try something like 42 or 7/2.
            </p>
          )}
        </>
      ))}

      {mode === 'diagnostics' && current && (
        <DiagnosticCard
          key={queue[qPos]}
          index={queue[qPos]}
          total={queue.length}
          diagnostic={current}
          phase={phase}
          attempt={attempt}
          picked={picked}
          revealAnswer={revealAnswer}
          onAttempt={setAttempt}
          onReveal={revealDiagnostic}
          onPick={pickOption}
          onSelfCheck={selfCheck}
          onRetry={retryDiagnostic}
          onNext={nextDiagnostic}
          onClose={onClose}
          commonMisconception={remediation?.commonMisconception ?? null}
          prereqIds={remediation?.prereqIds ?? []}
          fixIt={fixIt}
        />
      )}

      {mode === 'diagnostics' && !current && remediation && remediation.diagnostics.length > 0 && (
        /* queue exhausted */
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-mint-500/30 bg-mint-500/10 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-mint-300" />
            <p className="font-display text-sm font-semibold text-mint-300">
              You&apos;ve been through every diagnostic for this topic.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <button onClick={restartDiagnostics} className="btn-secondary text-xs inline-flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5" />
              Start over
            </button>
            {onClose && (
              <button onClick={onClose} className="btn-ghost text-xs text-surface-600">
                Close
              </button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

/* ── diagnostics mode ─────────────────────────────────────────────────── */

function DiagHeader({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-lg bg-gold-400/15 flex items-center justify-center">
        <Target className="w-4 h-4 text-gold-300" />
      </div>
      <div>
        <h3 className="font-display text-base font-semibold text-white leading-tight">
          Misconception Check
        </h3>
        <p className="text-[11px] text-surface-600">
          {n} authored diagnostic{n === 1 ? '' : 's'} for this topic · miss one and the fix-it recipe appears
        </p>
      </div>
    </div>
  )
}

function DiagnosticCard({
  index,
  total,
  diagnostic,
  phase,
  attempt,
  picked,
  revealAnswer,
  onAttempt,
  onReveal,
  onPick,
  onSelfCheck,
  onRetry,
  onNext,
  onClose,
  commonMisconception,
  prereqIds,
  fixIt,
}: {
  index: number
  total: number
  diagnostic: DiagnosticQuestion
  phase: DiagPhase
  attempt: string
  picked: number | null
  revealAnswer: boolean
  onAttempt: (v: string) => void
  onReveal: () => void
  onPick: (i: number) => void
  onSelfCheck: (gotIt: boolean) => void
  onRetry: () => void
  onNext: () => void
  onClose?: () => void
  commonMisconception: string | null
  prereqIds: string[]
  fixIt: React.ReactNode
}) {
  const isMcq = diagnostic.options.length >= 2
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Exam-prep review for graded free-text answers: criteria derived at
  // runtime from the authored answer + a conservative mechanics check on
  // the student's own text. Nothing authored — derivations only, and the
  // review renders nothing when both derivations come up empty.
  const subjectiveReview =
    !isMcq && (phase === 'correct' || phase === 'missed') && attempt.trim()
      ? buildSubjectiveReview(diagnostic.answer, attempt)
      : null

  useEffect(() => {
    if (phase === 'answering' && !isMcq) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [phase, isMcq])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      data-testid="diagnostic-question"
    >
      <p className="text-[11px] uppercase tracking-wider text-gold-300 font-semibold mb-2">
        Diagnostic {index + 1} / {total}
      </p>
            <p className="text-white leading-relaxed mb-3">
              <AuthoredText text={diagnostic.question} />
            </p>

      {/* ── MCQ: classification among the authored options ── */}
      {isMcq && phase === 'answering' && (
        <div className="space-y-2">
          {diagnostic.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onPick(i)}
              className="w-full text-left rounded-lg border border-surface-300/50 bg-surface-100/60 px-3 py-2.5 text-sm text-white hover:border-gold-400/60 hover:bg-surface-200/40 transition-colors"
            >
              <span className="text-gold-300 font-semibold mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              <AuthoredText text={opt} />
            </button>
          ))}
        </div>
      )}

      {isMcq && phase !== 'answering' && picked !== null && (
        <div className="space-y-2 mb-1">
          {diagnostic.options.map((opt, i) => {
            const isAnswer = opt.trim() === diagnostic.answer.trim()
            const wasPicked = i === picked
            return (
              <div
                key={i}
                className={`rounded-lg border px-3 py-2.5 text-sm ${
                  isAnswer
                    ? 'border-mint-500/40 bg-mint-500/10 text-mint-200'
                    : wasPicked
                      ? 'border-gold-500/40 bg-gold-500/10 text-gold-200'
                      : 'border-surface-300/40 bg-surface-100/40 text-surface-600'
                }`}
              >
                <span className="font-semibold mr-2">{String.fromCharCode(65 + i)}.</span>
                <AuthoredText text={opt} />
                {isAnswer && (
                  <span className="ml-2 text-[10px] uppercase tracking-wider text-mint-300 font-semibold">
                    authored answer
                  </span>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* ── free-text: attempt → authored answer → honest self-check ── */}
      {!isMcq && (phase === 'answering' || phase === 'revealed') && (
        <>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={attempt}
              onChange={(e) => onAttempt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && attempt.trim() && onReveal()}
              placeholder="Write your answer, then compare"
              className="flex-1 rounded-lg bg-surface-100/60 border border-surface-300/50 px-3 py-2.5 text-sm text-white placeholder:text-surface-600 focus:outline-none focus:border-gold-400/60"
              disabled={phase !== 'answering'}
            />
            <button
              onClick={onReveal}
              disabled={phase !== 'answering' || !attempt.trim()}
              className="btn-primary text-sm px-4 inline-flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Compare
            </button>
          </div>
          <p className="mt-2 text-[11px] text-surface-600">
            Graded against the authored answer — be honest with yourself.
          </p>
        </>
      )}

      {/* Authored answer + self-check (stays visible through the verdict) */}
      {(!isMcq && (phase === 'revealed' || phase === 'correct' || phase === 'missed')) && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 rounded-xl border border-brand-500/30 bg-brand-500/5 p-4"
        >
          <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-brand-300 font-semibold mb-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Authored answer
          </p>
          <p className="text-sm text-surface-800 leading-relaxed whitespace-pre-wrap mb-3">
            <AuthoredText text={diagnostic.answer} />
          </p>
          {phase === 'revealed' && (
            <>
              <p className="text-xs text-surface-600 mb-2">How did your answer hold up?</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSelfCheck(true)}
                  className="btn-secondary text-xs inline-flex items-center gap-1.5 !border-mint-500/40 !text-mint-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  I had it right
                </button>
                <button
                  onClick={() => onSelfCheck(false)}
                  className="btn-secondary text-xs inline-flex items-center gap-1.5 !border-gold-500/40 !text-gold-300"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  I missed it
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* Correct */}
      {phase === 'correct' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-mint-500/30 bg-mint-500/10 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-mint-300" />
            <p className="font-display text-sm font-semibold text-mint-300">
              Correct — well done.
            </p>
          </div>
          <ActionRow onNext={onNext} onClose={onClose} nextLabel="Next diagnostic" />
        </motion.div>
      )}

      {/* Missed → the remediation loop */}
      {phase === 'missed' && (diagnostic.misconception?.trim() || commonMisconception?.trim() || prereqIds.length > 0 ? (
        <>
          <MisconceptionPanel
            misconception={diagnostic.misconception}
            commonMisconception={commonMisconception}
          >
            {fixIt}
          </MisconceptionPanel>
          <div className="flex flex-wrap gap-2 mt-3">
            <button onClick={onRetry} className="btn-secondary text-xs inline-flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5" />
              Try this question again
            </button>
            <button onClick={onNext} className="btn-ghost text-xs text-surface-600">
              Next diagnostic
            </button>
          </div>
        </>
      ) : (
        /* Corpus authors no remediation for this question — say so, never invent. */
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 rounded-xl border border-gold-500/30 bg-gold-500/5 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-5 h-5 text-gold-300" />
            <p className="font-display text-sm font-semibold text-gold-300">Not quite.</p>
          </div>
          <p className="text-xs text-surface-600 mb-1">
            The authored answer is shown above — no remediation recipe exists
            for this question yet.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <button onClick={onRetry} className="btn-secondary text-xs inline-flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5" />
              Try this question again
            </button>
            <button onClick={onNext} className="btn-ghost text-xs text-surface-600">
              Next diagnostic
            </button>
          </div>
        </motion.div>
      ))}

      {/* Graded free-text answer → exam-prep review (your answer vs the
          authored answer's derived checklist + writing mechanics). The
          authored answer panel above stays the source of truth — the
          review only ever shows runtime derivations of it. */}
      {subjectiveReview && (
        <AnswerReview
          studentAnswer={attempt}
          criteria={subjectiveReview.criteria}
          grammarScore={subjectiveReview.grammarScore}
          grammarNotes={subjectiveReview.grammarNotes}
        />
      )}
    </motion.div>
  )
}

function ActionRow({
  onNext,
  onClose,
  nextLabel,
}: {
  onNext: () => void
  onClose?: () => void
  nextLabel: string
}) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      <button onClick={onNext} className="btn-secondary text-xs inline-flex items-center gap-2">
        <RotateCcw className="w-3.5 h-3.5" />
        {nextLabel}
      </button>
      {onClose && (
        <button onClick={onClose} className="btn-ghost text-xs text-surface-600">
          Close
        </button>
      )}
    </div>
  )
}

/* ── practice mode ────────────────────────────────────────────────────── */

function Header() {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-lg bg-gold-400/15 flex items-center justify-center">
        <PenSquare className="w-4 h-4 text-gold-300" />
      </div>
      <div>
        <h3 className="font-display text-base font-semibold text-white leading-tight">
          Quick Practice
        </h3>
        <p className="text-[11px] text-surface-600">
          One question at a time · graded against the verified solution
        </p>
      </div>
    </div>
  )
}

function PracticeFeedback({
  result,
  commonMisconception,
  prereqIds,
  onNext,
  onClose,
}: {
  result: CheckResult
  commonMisconception: string | null
  prereqIds: string[]
  onNext: () => void
  onClose?: () => void
}) {
  const correct = result.correct
  const fixIt = prereqIds.length > 0 ? <PrereqFixList prereqIds={prereqIds} /> : null
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-4 ${
        correct
          ? 'border-mint-500/30 bg-mint-500/10'
          : 'border-gold-500/30 bg-gold-500/10'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        {correct ? (
          <CheckCircle2 className="w-5 h-5 text-mint-300" />
        ) : (
          <XCircle className="w-5 h-5 text-gold-300" />
        )}
        <p className={`font-display text-sm font-semibold ${correct ? 'text-mint-300' : 'text-gold-300'}`}>
          {correct ? 'Correct — well done.' : 'Not quite.'}
        </p>
      </div>

      {!correct && result.expected !== null && (
        <p className="text-xs text-surface-700 mb-3">
          Expected answer: <span className="text-white font-medium">{result.expected}</span>
        </p>
      )}

      {/* Wrong answer → authored misconception + Fix-it (omitted when the
          corpus authors neither — never invented). */}
      {!correct && (
        <MisconceptionPanel commonMisconception={commonMisconception}>
          {fixIt}
        </MisconceptionPanel>
      )}

      {/* Solution steps — revealed by the server only after an attempt */}
      {result.steps && result.steps.length > 0 && (
        <div className="mt-2 border-t border-surface-300/30 pt-3">
          <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-surface-600 font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Solution
          </p>
          <ol className="space-y-1.5">
            {result.steps.map((s) => (
              <li key={s.n} className="text-xs text-surface-700">
                <span className="text-surface-600">Step {s.n}:</span>{' '}
                <span className="text-surface-800">{s.expression}</span>
                {s.value !== null && (
                  <span className="text-white"> = {s.value}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      <ActionRow onNext={onNext} onClose={onClose} nextLabel="Next question" />
    </motion.div>
  )
}
