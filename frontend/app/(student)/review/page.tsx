'use client'

/**
 * /review — the focused spaced-repetition session.
 *
 * The WHY-first recall trainer: items due today (SM-2 queue from
 * GET /api/progress/review/queue) come one at a time; grading posts to
 * POST /api/progress/review/answer and the scheduler's verdict — the NEXT
 * interval — is shown instantly before the next card slides in.
 *
 * Focus contract: a session serves at most 10 due items. When more are
 * due, the finish card says so truthfully and offers the next batch —
 * nothing is hidden, nothing is inflated.
 *
 * Honesty rules: the queue is the real SM-2 table (review_items
 * next_review_date <= today). If the schedule update fails, the card says
 * so — it never pretends an item was rescheduled. Raw node ids never
 * render; the concept name is the authored/enriched title.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowLeft, Brain, CheckCircle2, ChevronRight, RotateCcw,
    BookOpen, Flame, Target, Sparkles, Radar,
} from 'lucide-react'
import Link from 'next/link'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'

/** A focused session reviews at most this many due items. */
const SESSION_CAP = 10
/** How long the scheduler's verdict stays on screen before auto-advance. */
const FEEDBACK_MS = 1900

interface ReviewItem {
    id: string
    nodeId: string
    slug?: string | null
    conceptName: string
    easinessFactor: number
    intervalDays: number
    repetitions: number
    nextReviewDate?: string | null
    question?: string | null
    answer?: string | null
}

interface ReviewStats {
    retentionRate?: number
    streak?: number
    dueToday?: number
}

/** POST /api/progress/review/answer — the scheduler's verdict for this item. */
interface ScheduleVerdict {
    updatedInterval?: number
    updatedEasiness?: number
    nextReviewDate?: string
    updatedMastery?: number
}

const GRADE_LABELS = [
    { q: 0, label: 'Blank', tone: 'text-red-300 border-red-500/30' },
    { q: 1, label: 'Wrong', tone: 'text-red-300 border-red-500/30' },
    { q: 2, label: 'Hard', tone: 'text-gold-300 border-gold-500/30' },
    { q: 3, label: 'Okay', tone: 'text-gold-300 border-gold-500/30' },
    { q: 4, label: 'Good', tone: 'text-mint-300 border-mint-500/30' },
    { q: 5, label: 'Easy', tone: 'text-mint-300 border-mint-500/30' },
]

function shortDate(iso?: string | null): string {
    if (!iso) return ''
    const d = new Date(`${iso}T00:00:00`)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export default function ReviewPage() {
    const { user } = useAuthStore()
    const [queue, setQueue] = useState<ReviewItem[]>([])
    const [stats, setStats] = useState<ReviewStats | null>(null)
    const [idx, setIdx] = useState(0)
    /** Absolute index where the current 10-item window ends. */
    const [windowEnd, setWindowEnd] = useState(0)
    const [revealed, setRevealed] = useState(false)
    const [startedAt, setStartedAt] = useState<number>(Date.now())
    const [loading, setLoading] = useState(true)
    const [done, setDone] = useState(0)
    /** Instant feedback for the item just graded: the scheduler's verdict. */
    const [verdict, setVerdict] = useState<
        | { kind: 'ok'; quality: number; interval: number; next: string }
        | { kind: 'failed' }
        | null
    >(null)
    const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    /** Guards the brief async window between grade-click and verdict render. */
    const gradingRef = useRef(false)

    const load = async () => {
        setLoading(true)
        gradingRef.current = false
        try {
            const [q, s] = await Promise.all([
                api.get<{ items?: ReviewItem[] } | ReviewItem[]>('/api/progress/review/queue'),
                api.get<ReviewStats>('/api/progress/review/stats').catch(() => null),
            ])
            const items = Array.isArray(q) ? q : (q?.items ?? [])
            setQueue(items)
            setStats(s)
            setIdx(0)
            setWindowEnd(Math.min(items.length, SESSION_CAP))
            setDone(0)
            setRevealed(false)
            setVerdict(null)
            setStartedAt(Date.now())
        } catch {
            setQueue([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load()
        return () => {
            if (advanceTimer.current) clearTimeout(advanceTimer.current)
        }
    }, [])

    const totalDue = queue.length

    const advance = (fromIdx: number) => {
        gradingRef.current = false
        setVerdict(null)
        setRevealed(false)
        setStartedAt(Date.now())
        if (fromIdx + 1 < windowEnd) {
            setIdx(fromIdx + 1)
        } else {
            setIdx(windowEnd) // window complete → the finish card takes over
        }
    }

    const grade = (quality: number) => {
        const item = queue[idx]
        if (!item || verdict || gradingRef.current) return
        gradingRef.current = true
        const elapsed = Math.round((Date.now() - startedAt) / 1000)
        // Instant feedback comes from the REAL scheduler response; the card
        // only claims a reschedule that the backend actually confirmed.
        api
            .post<ScheduleVerdict>('/api/progress/review/answer', {
                item_id: item.id,
                quality,
                response_time_seconds: elapsed,
            })
            .then((res) => {
                const interval = Number(res?.updatedInterval ?? 0)
                const next = String(res?.nextReviewDate ?? '')
                if (!res || interval <= 0 || !next) throw new Error('no verdict')
                setVerdict({ kind: 'ok', quality, interval, next })
            })
            .catch(() => setVerdict({ kind: 'failed' }))
        setDone((d) => d + 1)
        if (advanceTimer.current) clearTimeout(advanceTimer.current)
        advanceTimer.current = setTimeout(() => advance(idx), FEEDBACK_MS)
    }

    /** "Review 10 more" — continue with the rest of the REAL due list
     *  fetched at session start (untouched items are still due). */
    const continueNextBatch = () => {
        const nextStart = windowEnd
        const nextEnd = Math.min(queue.length, nextStart + SESSION_CAP)
        if (nextStart >= nextEnd) return
        setWindowEnd(nextEnd)
        setIdx(nextStart)
        setRevealed(false)
        setVerdict(null)
        setStartedAt(Date.now())
    }

    const item = idx < windowEnd ? queue[idx] : undefined
    const remainingInWindow = Math.max(0, windowEnd - idx)
    const moreAfterWindow = queue.length > windowEnd

    return (
        <div className="min-h-screen mesh-bg">
            <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
                <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
                    <Link href="/dashboard" className="btn-ghost px-2 py-1.5 -ml-2">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <h1 className="font-display font-semibold text-white">Review Queue</h1>
                    {remainingInWindow > 0 && (
                        <span className="badge-brand text-[10px] ml-auto">
                            {remainingInWindow} due
                        </span>
                    )}
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
                {/* Stats strip */}
                {stats && (
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { icon: Target, label: 'Retention', value: `${stats.retentionRate ?? 0}%` },
                            { icon: Flame, label: 'Streak', value: `${stats.streak ?? 0}d` },
                            { icon: CheckCircle2, label: 'Done now', value: `${done}` },
                        ].map(({ icon: Icon, label, value }) => (
                            <div key={label} className="glass-card p-4 text-center">
                                <Icon className="w-4 h-4 mx-auto mb-1.5 text-gold-300" />
                                <p className="font-display font-bold text-white">{value}</p>
                                <p className="text-[10px] uppercase tracking-wider text-surface-500">{label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {loading ? (
                    <div className="glass-card p-12 animate-pulse h-64" />
                ) : !item ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-10 text-center"
                    >
                        <Sparkles className="w-10 h-10 mx-auto mb-4 text-gold-300" />
                        <h2 className="font-display text-xl font-semibold text-white mb-2">
                            {done > 0 ? 'Queue cleared.' : 'Nothing due right now.'}
                        </h2>
                        <p className="text-sm text-surface-600 mb-6" data-testid="review-empty-note">
                            {done > 0
                                ? `${done} topic${done === 1 ? '' : 's'} rescheduled on the forgetting curve.`
                                : 'Spaced-repetition items appear here when practice misses need revisiting.'}
                        </p>
                        {moreAfterWindow ? (
                            <button
                                onClick={continueNextBatch}
                                data-testid="review-continue"
                                className="btn-primary px-6 py-2.5 inline-flex items-center gap-2"
                            >
                                <Radar className="w-4 h-4" />
                                Review {Math.min(SESSION_CAP, queue.length - windowEnd)} more
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <Link href="/learn" className="btn-primary px-6 py-2.5 inline-flex items-center gap-2">
                                Keep learning <ChevronRight className="w-4 h-4" />
                            </Link>
                        )}
                    </motion.div>
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={item.id}
                            data-testid="review-card"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            className="glass-card p-8"
                        >
                            {/* the WHY — one honest line, owned by the session */}
                            <p
                                data-testid="review-why"
                                className="flex items-start gap-2 rounded-xl border border-gold-500/25 bg-gold-500/[0.06] px-3.5 py-2.5 text-xs font-semibold text-gold-200 mb-5"
                            >
                                <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gold-300" aria-hidden />
                                Reviewing today = remembering forever.
                            </p>

                            <div className="flex items-center gap-2 mb-4">
                                <Brain className="w-4 h-4 text-brand-300" />
                                <span className="text-xs uppercase tracking-wider text-surface-500">
                                    Review {idx + 1} of {windowEnd}
                                </span>
                                {totalDue > windowEnd && (
                                    <span className="text-[10px] text-surface-600 ml-auto">
                                        {totalDue - windowEnd} more in queue
                                    </span>
                                )}
                            </div>

                            <h2 className="font-display text-lg font-semibold text-white mb-4">
                                {item.conceptName}
                            </h2>

                            {item.question ? (
                                <div className="border-l-2 border-brand-500/40 pl-4 mb-4">
                                    <p className="text-sm text-surface-700 whitespace-pre-wrap">{item.question}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-surface-600 mb-4">
                                    Recall this topic before revealing — what do you remember about it?
                                </p>
                            )}

                            {!verdict ? (
                                !revealed ? (
                                    <button
                                        onClick={() => { setRevealed(true); setStartedAt(Date.now()) }}
                                        className="btn-secondary w-full py-2.5"
                                    >
                                        Reveal &amp; self-grade
                                    </button>
                                ) : (
                                    <>
                                        {item.answer && (
                                            <div className="bg-surface-800/50 rounded-xl p-4 mb-4 border border-surface-300/20">
                                                <p className="text-xs uppercase tracking-wider text-mint-300 mb-1.5">Answer</p>
                                                <p className="text-sm text-surface-700 whitespace-pre-wrap">{item.answer}</p>
                                            </div>
                                        )}
                                        {item.slug && (
                                            <Link
                                                href={`/learn/${item.slug}`}
                                                className="flex items-center gap-2 text-sm text-brand-300 hover:text-brand-200 mb-4"
                                            >
                                                <BookOpen className="w-4 h-4" /> Re-open the full lesson
                                            </Link>
                                        )}
                                        <p className="text-xs uppercase tracking-wider text-surface-500 mb-2">
                                            How well did you recall it?
                                        </p>
                                        <div className="grid grid-cols-6 gap-2">
                                            {GRADE_LABELS.map(({ q, label, tone }) => (
                                                <button
                                                    key={q}
                                                    onClick={() => grade(q)}
                                                    data-testid={`review-grade-${q}`}
                                                    className={`rounded-xl border py-2 text-xs font-semibold transition-all hover:scale-105 ${tone} bg-white/[0.02]`}
                                                >
                                                    {q}<br />{label}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )
                            ) : (
                                /* ── instant feedback: the scheduler's real verdict ── */
                                <div
                                    data-testid="review-feedback"
                                    role="status"
                                    className={`rounded-xl border px-4 py-3.5 ${
                                        verdict.kind === 'ok'
                                            ? verdict.quality >= 3
                                                ? 'border-mint-500/40 bg-mint-500/[0.08]'
                                                : 'border-gold-500/40 bg-gold-500/[0.08]'
                                            : 'border-red-500/40 bg-red-500/[0.08]'
                                    }`}
                                >
                                    <p className="flex items-center gap-2 text-sm font-semibold text-white">
                                        <RotateCcw className="w-4 h-4 shrink-0 text-gold-300" aria-hidden />
                                        {verdict.kind === 'ok' ? (
                                            verdict.quality >= 3 ? (
                                                <>Locked in — next review {shortDate(verdict.next)} ({verdict.interval} day{verdict.interval === 1 ? '' : 's'}).</>
                                            ) : (
                                                <>Back tomorrow ({shortDate(verdict.next)}) — one more look and it sticks.</>
                                            )
                                        ) : (
                                            <>Couldn&apos;t reach the scheduler — this one stays due.</>
                                        )}
                                    </p>
                                    {verdict.kind === 'ok' && verdict.quality >= 4 && (
                                        <p className="mt-1 text-xs text-mint-300">Strong recall. The interval grows — that is the curve bending your way.</p>
                                    )}
                                </div>
                            )}

                            {!verdict && (
                                <div className="mt-5 flex items-center gap-2 text-xs text-surface-600">
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    SM-2 spacing — honest grading keeps the schedule true.
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    )
}
