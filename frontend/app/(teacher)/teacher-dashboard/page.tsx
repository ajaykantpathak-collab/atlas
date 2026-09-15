'use client'

/**
 * Teacher Dashboard — Class Analytics (Atlas design system)
 *
 * Every number on this page is computed server-side from real student
 * practice records (GET /api/teacher-analytics/overview, which aggregates
 * the tutor's persisted per-student state). When a metric has no data
 * source we render an honest empty state — never a placeholder number.
 */

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Activity, AlertTriangle, BookOpenCheck, FlaskConical, RefreshCw,
  Users, TrendingDown, Radar, CircleDot, SearchX,
} from 'lucide-react'
import AuthGuard from '@/components/AuthGuard'
import { useAuthStore } from '@/stores/authStore'

// ── API types (mirror backend/api/teacher_analytics.py) ────────────────

interface SimLink {
  sim_id: string
  match_strength: string
  subject: string | null
  sim_url: string
}

interface WeakConcept {
  concept_id: string
  title: string
  class: number | string | null
  subject: string | null
  chapter: number | string | null
  students_count: number
  avg_mastery: number | null
  attempts: number
  mistake_count: number
  sims: SimLink[]
}

interface RosterRow {
  student_id: string
  class_level: string | null
  attempts: number
  concepts_touched: number
  avg_mastery: number | null
  mastered: number
  weak_concepts: number
  open_mistakes: number
}

interface ClassRow {
  class_level: string
  students: number
  avg_mastery: number | null
  attempts: number
}

interface AnalyticsOverview {
  generated_at: string
  source: string
  has_data: boolean
  reason: string | null
  students: { tracked: number; active: number }
  cohort: { avg_mastery: number | null; total_attempts: number; open_mistakes: number }
  classes: ClassRow[]
  roster: RosterRow[]
  weakest_concepts: WeakConcept[]
}

// ── data fetch ──────────────────────────────────────────────────────────

async function fetchOverview(signal: AbortSignal): Promise<AnalyticsOverview> {
  const res = await fetch('/api/teacher-analytics/overview?roster_limit=60&weak_limit=8', {
    signal,
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error(`analytics responded ${res.status}`)
  return (await res.json()) as AnalyticsOverview
}

// ── small presentational helpers ────────────────────────────────────────

function pct(v: number | null | undefined): string {
  return typeof v === 'number' ? `${Math.round(v * 100)}%` : '—'
}

function masteryTone(v: number | null): { bar: string; text: string; chip: string } {
  if (v === null) return { bar: 'bg-white/20', text: 'text-white/50', chip: 'border-white/10 bg-white/5 text-white/50' }
  if (v >= 0.75) return { bar: 'bg-emerald-400', text: 'text-emerald-300', chip: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' }
  if (v >= 0.5) return { bar: 'bg-gold-400', text: 'text-gold-300', chip: 'border-gold-400/30 bg-gold-400/10 text-gold-300' }
  return { bar: 'bg-rose-400', text: 'text-rose-300', chip: 'border-rose-400/30 bg-rose-400/10 text-rose-300' }
}

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm ${className}`}>
      {children}
    </section>
  )
}

function PanelHeader({ icon, title, hint }: { icon: React.ReactNode; title: string; hint?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 px-5 py-4">
      <h2 className="flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
        <span className="text-gold-400">{icon}</span>
        {title}
      </h2>
      {hint ? <p className="text-[11px] text-white/40">{hint}</p> : null}
    </div>
  )
}

function EmptyState({ icon, message, sub }: { icon: React.ReactNode; message: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
      <span className="text-white/25">{icon}</span>
      <p className="text-sm text-white/60">{message}</p>
      {sub ? <p className="max-w-md text-xs leading-relaxed text-white/35">{sub}</p> : null}
    </div>
  )
}

function StatCard({ icon, label, value, tone = 'text-white' }: {
  icon: React.ReactNode; label: string; value: string; tone?: string
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
      <div className="flex items-center gap-2 text-white/40">
        <span className="text-gold-400">{icon}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">{label}</span>
      </div>
      <p className={`mt-2 font-display text-2xl font-bold ${tone}`}>{value}</p>
    </div>
  )
}

// ── sections ────────────────────────────────────────────────────────────

function MasteryBar({ value }: { value: number | null }) {
  const tone = masteryTone(value)
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10" role="presentation">
      <div
        className={`h-full rounded-full ${tone.bar} transition-all duration-700`}
        style={{ width: value === null ? '0%' : `${Math.max(2, Math.round(value * 100))}%` }}
      />
    </div>
  )
}

function ClassBreakdown({ classes }: { classes: ClassRow[] }) {
  if (classes.length === 0) {
    return (
      <EmptyState
        icon={<SearchX className="h-6 w-6" />}
        message="No class-level data yet"
        sub="Class rows appear once students practise — each student is grouped by the class level of the concepts they attempted."
      />
    )
  }
  return (
    <div className="divide-y divide-white/5">
      {classes.map((c) => {
        const tone = masteryTone(c.avg_mastery)
        return (
          <div key={c.class_level} className="flex items-center gap-4 px-5 py-3">
            <span className="w-20 shrink-0 font-display text-sm font-bold text-white">
              Class {c.class_level}
            </span>
            <div className="flex-1">
              <MasteryBar value={c.avg_mastery} />
            </div>
            <span className={`w-12 text-right font-mono text-xs ${tone.text}`}>{pct(c.avg_mastery)}</span>
            <span className="w-28 text-right text-[11px] text-white/40">
              {c.students} student{c.students === 1 ? '' : 's'} · {c.attempts} attempts
            </span>
          </div>
        )
      })}
    </div>
  )
}

function Roster({ rows }: { rows: RosterRow[] }) {
  if (rows.length === 0) {
    return (
      <EmptyState
        icon={<Users className="h-6 w-6" />}
        message="No student data yet — students appear here as they practise."
        sub="Each row is a real learner record from the AI tutor: attempts graded, concepts touched and mistakes still open."
      />
    )
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-[0.14em] text-white/40">
            <th className="px-5 py-3 font-semibold">Student</th>
            <th className="px-3 py-3 text-right font-semibold">Attempts</th>
            <th className="px-3 py-3 text-right font-semibold">Concepts</th>
            <th className="px-3 py-3 font-semibold">Avg mastery</th>
            <th className="px-3 py-3 text-right font-semibold">Mastered</th>
            <th className="px-5 py-3 text-right font-semibold">Open mistakes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((r) => {
            const tone = masteryTone(r.avg_mastery)
            return (
              <tr key={r.student_id} className="transition-colors hover:bg-white/[0.03]">
                <td className="px-5 py-3">
                  <p className="font-mono text-xs text-white/85">{r.student_id}</p>
                  {r.class_level ? (
                    <span className="mt-1 inline-block rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
                      Class {r.class_level}
                    </span>
                  ) : null}
                </td>
                <td className="px-3 py-3 text-right font-mono text-xs text-white/75">{r.attempts}</td>
                <td className="px-3 py-3 text-right font-mono text-xs text-white/75">{r.concepts_touched}</td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-28"><MasteryBar value={r.avg_mastery} /></div>
                    <span className={`w-10 font-mono text-xs ${tone.text}`}>{pct(r.avg_mastery)}</span>
                  </div>
                </td>
                <td className="px-3 py-3 text-right">
                  {r.mastered > 0
                    ? <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] text-emerald-300">{r.mastered}</span>
                    : <span className="text-xs text-white/30">—</span>}
                </td>
                <td className="px-5 py-3 text-right">
                  {r.open_mistakes > 0
                    ? <span className="inline-flex items-center gap-1 rounded-full border border-rose-400/30 bg-rose-400/10 px-2 py-0.5 text-[10px] text-rose-300">{r.open_mistakes}</span>
                    : <span className="text-xs text-white/30">0</span>}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function GapReport({ concepts }: { concepts: WeakConcept[] }) {
  if (concepts.length === 0) {
    return (
      <EmptyState
        icon={<Radar className="h-6 w-6" />}
        message="No gaps recorded yet"
        sub="Concepts are ranked by wrong answers actually recorded in student mistake books — nothing to rank until students practise and miss questions."
      />
    )
  }
  const topNames = concepts.slice(0, 3).map((c) => c.title).filter(Boolean)
  return (
    <div>
      {topNames.length > 0 && (
        <p className="border-b border-white/10 px-5 py-4 text-sm leading-relaxed text-white/70">
          Your class struggles most with{' '}
          {topNames.map((name, i) => (
            <span key={name}>
              <span className="font-semibold text-rose-300">{name}</span>
              {i < topNames.length - 1 ? ', ' : ''}
            </span>
          ))}
          .
        </p>
      )}
      <ul className="divide-y divide-white/5">
        {concepts.map((c) => {
          const tone = masteryTone(c.avg_mastery)
          const sim = c.sims[0]
          return (
            <li key={c.concept_id} className="px-5 py-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{c.title}</p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[10px]">
                    {c.subject ? (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 capitalize text-white/50">{c.subject}</span>
                    ) : null}
                    {c.class !== null && c.class !== undefined ? (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-white/50">Class {c.class}</span>
                    ) : null}
                    <span className={`rounded-full border px-2 py-0.5 ${tone.chip}`}>
                      {pct(c.avg_mastery)} avg mastery
                    </span>
                    <span className="rounded-full border border-rose-400/30 bg-rose-400/10 px-2 py-0.5 text-rose-300">
                      {c.mistake_count} wrong answer{c.mistake_count === 1 ? '' : 's'}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-white/50">
                      {c.students_count} student{c.students_count === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  {sim ? (
                    <>
                      <Link
                        href={sim.sim_url}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-gold-400/30 bg-gold-400/10 px-3 py-1.5 text-xs font-semibold text-gold-300 transition-colors hover:bg-gold-400/20"
                      >
                        <FlaskConical className="h-3.5 w-3.5" />
                        Sim covers this
                      </Link>
                      {c.sims.length > 1 ? (
                        <p className="mt-1 text-[10px] text-white/35">+{c.sims.length - 1} more mapped</p>
                      ) : null}
                    </>
                  ) : (
                    <span className="inline-block text-[11px] text-white/35">No simulation maps to this chapter yet</span>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

// ── page ────────────────────────────────────────────────────────────────

function TeacherDashboardContent() {
  const user = useAuthStore((s) => s.user)
  const [data, setData] = useState<AnalyticsOverview | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  const load = useCallback(async (signal?: AbortSignal) => {
    setStatus('loading')
    try {
      const d = await fetchOverview(signal ?? new AbortController().signal)
      setData(d)
      setStatus('ready')
    } catch (e) {
      if ((e as Error)?.name === 'AbortError') return
      setStatus('error')          // honest failure — no fabricated numbers
    }
  }, [])

  useEffect(() => {
    const ctrl = new AbortController()
    load(ctrl.signal)
    return () => ctrl.abort()
  }, [load])

  return (
    <div className="mx-auto max-w-6xl">
      {/* header */}
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-400/80">
            Teacher Dashboard
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-white">
            Class <span className="spectrum-text">Analytics</span>
          </h1>
          <p className="mt-1.5 text-sm text-white/45">
            {user?.name ? `${user.name} · ` : ''}Live mastery, cohort gaps and sim links from real practice records
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
            <CircleDot className="h-3 w-3" />
            No simulated numbers
          </span>
          <button
            onClick={() => load()}
            disabled={status === 'loading'}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${status === 'loading' ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </header>

      {/* loading */}
      {status === 'loading' && (
        <Panel className="mb-6">
          <div className="flex flex-col items-center gap-3 px-6 py-16">
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-gold-400" />
            <p className="text-sm text-white/50">Reading student practice records…</p>
          </div>
        </Panel>
      )}

      {/* backend unreachable — honest error state */}
      {status === 'error' && (
        <Panel className="mb-6 border-rose-400/20 bg-rose-400/[0.04]">
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <AlertTriangle className="h-8 w-8 text-rose-300" />
            <p className="font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
              Live data unavailable
            </p>
            <p className="max-w-md text-xs leading-relaxed text-white/50">
              The analytics service isn&apos;t responding, so this page has nothing honest to
              show. No placeholder numbers are ever displayed. Check that the backend on
              port 8001 is running, then retry.
            </p>
            <button
              onClick={() => load()}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-gold-400/30 bg-gold-400/10 px-4 py-2 text-xs font-semibold text-gold-300 transition-colors hover:bg-gold-400/20"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        </Panel>
      )}

      {/* data */}
      {status === 'ready' && data && (
        data.has_data ? (
          <div className="space-y-6">
            {/* cohort stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              <StatCard
                icon={<Users className="h-4 w-4" />}
                label="Students practising"
                value={`${data.students.active}`}
                tone="text-white"
              />
              <StatCard
                icon={<Activity className="h-4 w-4" />}
                label="Attempts recorded"
                value={`${data.cohort.total_attempts}`}
                tone="text-white"
              />
              <StatCard
                icon={<BookOpenCheck className="h-4 w-4" />}
                label="Open mistakes"
                value={`${data.cohort.open_mistakes}`}
                tone={data.cohort.open_mistakes > 0 ? 'text-rose-300' : 'text-emerald-300'}
              />
              <StatCard
                icon={<Radar className="h-4 w-4" />}
                label="Cohort avg mastery"
                value={pct(data.cohort.avg_mastery)}
                tone={masteryTone(data.cohort.avg_mastery).text}
              />
            </div>

            {/* per-class mastery */}
            <Panel>
              <PanelHeader
                icon={<Radar className="h-4 w-4" />}
                title="Class mastery by level"
                hint={`${data.students.tracked} tracked · source: ${data.source}`}
              />
              <ClassBreakdown classes={data.classes} />
            </Panel>

            {/* cohort gap report */}
            <Panel>
              <PanelHeader
                icon={<TrendingDown className="h-4 w-4" />}
                title="Cohort gap report"
                hint="Ranked by recorded wrong answers in student mistake books"
              />
              <GapReport concepts={data.weakest_concepts} />
            </Panel>

            {/* student roster */}
            <Panel>
              <PanelHeader
                icon={<Users className="h-4 w-4" />}
                title="Student mastery"
                hint="Sorted by open mistakes, then attempts"
              />
              <Roster rows={data.roster} />
            </Panel>

            <p className="pb-4 text-center text-[11px] text-white/30">
              Computed {new Date(data.generated_at).toLocaleString()} from {data.source} — the AI tutor&apos;s persisted student models. Nothing on this page is simulated.
            </p>
          </div>
        ) : (
          /* backend answered but the store is empty — honest empty state */
          <Panel>
            <EmptyState
              icon={<Users className="h-8 w-8" />}
              message="No student data yet — students appear here as they practise."
              sub={`The analytics store (${data.source}) currently holds no active student records. As soon as learners attempt questions in the AI tutor, their mastery, attempts and mistake books aggregate into this dashboard automatically.`}
            />
          </Panel>
        )
      )}
    </div>
  )
}

export default function TeacherDashboardPage() {
  // Same auth pattern as /teacher-portal: guard by role, inherit the
  // (teacher) route-group shell.
  return (
    <AuthGuard allowedRoles={['teacher', 'admin']}>
      <TeacherDashboardContent />
    </AuthGuard>
  )
}
