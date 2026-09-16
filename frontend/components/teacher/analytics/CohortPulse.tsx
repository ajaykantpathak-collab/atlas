'use client'

/**
 * Cohort pulse — real student-practice analytics from the AI tutor's
 * persisted per-student state (GET /api/teacher-analytics/overview).
 *
 * Four stat tiles, per-class mastery, the cohort gap report (weakest
 * concepts ranked by recorded wrong answers) and the student roster.
 * When the store is empty we say so honestly — students appear here as
 * they practise. Concept titles are humanised via friendlyNodeTitle;
 * raw node ids must never reach the screen.
 */

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Activity, BookOpenCheck, FlaskConical, Radar, SearchX, TrendingDown, Trophy, Users,
} from 'lucide-react'
import { api } from '@/lib/api'
import { friendlyNodeTitle, subjectName } from '@/lib/nodeTitle'
import {
  Chip, EmptyIcon, EmptyState, ErrorState, Panel, PanelHeader, SkeletonTiles,
  TableSkeleton, fmtPct, useAnalyticsQuery,
} from './primitives'

// ── API types (mirror backend/api/teacher_analytics.py) ─────────────────

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

// ── shared mini components ───────────────────────────────────────────────

function masteryTone(v: number | null): { bar: string; text: string; chip: 'emerald' | 'gold' | 'rose' | 'neutral' } {
  if (v === null) return { bar: 'bg-white/20', text: 'text-white/50', chip: 'neutral' }
  if (v >= 0.75) return { bar: 'bg-emerald-400', text: 'text-emerald-300', chip: 'emerald' }
  if (v >= 0.5) return { bar: 'bg-gold-400', text: 'text-gold-300', chip: 'gold' }
  return { bar: 'bg-rose-400', text: 'text-rose-300', chip: 'rose' }
}

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

/** Never render a raw concept id — fall back to the sanctioned humaniser. */
function conceptTitle(c: WeakConcept): string {
  return c.title?.trim() || friendlyNodeTitle(c.concept_id)
}

// ── sections ─────────────────────────────────────────────────────────────

function ClassBreakdown({ classes }: { classes: ClassRow[] }) {
  if (classes.length === 0) {
    return (
      <EmptyState
        compact
        icon={<SearchX className="h-6 w-6" />}
        message="No class-level data yet"
        sub="Class rows appear once students practise — each learner is grouped by the class level of the concepts they attempted."
      />
    )
  }
  return (
    <div className="divide-y divide-white/5">
      {classes.map((c, i) => {
        const tone = masteryTone(c.avg_mastery)
        return (
          <motion.div
            key={c.class_level}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="flex items-center gap-4 px-5 py-3"
          >
            <span className="w-16 shrink-0 font-display text-sm font-bold text-white">
              Class {c.class_level}
            </span>
            <div className="flex-1">
              <MasteryBar value={c.avg_mastery} />
            </div>
            <span className={`w-12 text-right font-mono text-xs ${tone.text}`}>{fmtPct(c.avg_mastery)}</span>
            <span className="hidden w-32 text-right text-[11px] text-white/40 sm:block">
              {c.students} student{c.students === 1 ? '' : 's'} · {c.attempts} attempts
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

function GapReport({ concepts }: { concepts: WeakConcept[] }) {
  if (concepts.length === 0) {
    return (
      <EmptyState
        compact
        icon={<Radar className="h-6 w-6" />}
        message="No gaps recorded yet"
        sub="Concepts are ranked by wrong answers actually recorded in student mistake books — nothing to rank until students practise and miss questions."
      />
    )
  }
  const maxMistakes = Math.max(...concepts.map((c) => c.mistake_count), 1)
  return (
    <ol className="divide-y divide-white/5">
      {concepts.map((c, i) => {
        const tone = masteryTone(c.avg_mastery)
        const sim = c.sims[0]
        return (
          <motion.li
            key={c.concept_id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="px-5 py-3.5"
          >
            <div className="flex items-start gap-3">
              <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-display text-[11px] font-bold ${
                i < 3 ? 'bg-gold-400/15 text-gold-300' : 'bg-white/5 text-white/40'
              }`}>
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white" title={conceptTitle(c)}>
                  {conceptTitle(c)}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  {c.subject ? <Chip>{subjectName(c.subject)}</Chip> : null}
                  {c.class !== null && c.class !== undefined ? <Chip>Class {c.class}</Chip> : null}
                  <Chip tone={tone.chip}>{fmtPct(c.avg_mastery)} avg mastery</Chip>
                  <Chip tone="rose">{c.mistake_count} wrong answer{c.mistake_count === 1 ? '' : 's'}</Chip>
                </div>
                <div className="mt-2 h-1 w-full max-w-56 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-rose-400/80 transition-all duration-700"
                    style={{ width: `${Math.max(4, Math.round((c.mistake_count / maxMistakes) * 100))}%` }}
                  />
                </div>
              </div>
              <div className="shrink-0 text-right">
                {sim ? (
                  <Link
                    href={sim.sim_url}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gold-400/30 bg-gold-400/10 px-3 py-1.5 text-xs font-semibold text-gold-300 transition-colors hover:bg-gold-400/20"
                  >
                    <FlaskConical className="h-3.5 w-3.5" />
                    Sim covers this
                  </Link>
                ) : (
                  <span className="inline-block max-w-32 text-[11px] leading-tight text-white/35">
                    No simulation maps to this chapter yet
                  </span>
                )}
              </div>
            </div>
          </motion.li>
        )
      })}
    </ol>
  )
}

function Roster({ rows }: { rows: RosterRow[] }) {
  if (rows.length === 0) {
    return (
      <EmptyState
        compact
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
                <td className="px-5 py-2.5">
                  <p className="font-mono text-xs text-white/85">{r.student_id}</p>
                  {r.class_level ? (
                    <span className="mt-1 inline-block rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/50">
                      Class {r.class_level}
                    </span>
                  ) : null}
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-xs text-white/75">{r.attempts}</td>
                <td className="px-3 py-2.5 text-right font-mono text-xs text-white/75">{r.concepts_touched}</td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-28"><MasteryBar value={r.avg_mastery} /></div>
                    <span className={`w-10 font-mono text-xs ${tone.text}`}>{fmtPct(r.avg_mastery)}</span>
                  </div>
                </td>
                <td className="px-3 py-2.5 text-right">
                  {r.mastered > 0
                    ? <Chip tone="emerald"><Trophy className="h-3 w-3" />{r.mastered}</Chip>
                    : <span className="text-xs text-white/30">—</span>}
                </td>
                <td className="px-5 py-2.5 text-right">
                  {r.open_mistakes > 0
                    ? <Chip tone="rose">{r.open_mistakes}</Chip>
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

// ── widget ───────────────────────────────────────────────────────────────

export default function CohortPulse({ refreshKey = 0 }: { refreshKey?: number }) {
  const { status, data } = useAnalyticsQuery<AnalyticsOverview>(
    'cohort-overview',
    () => api.get<AnalyticsOverview>('/api/teacher-analytics/overview?roster_limit=60&weak_limit=8'),
    refreshKey,
  )

  if (status === 'loading') {
    return (
      <div className="space-y-6">
        <SkeletonTiles count={4} />
        <Panel><TableSkeleton rows={5} cols={3} /></Panel>
      </div>
    )
  }
  if (status === 'error' || !data) {
    return (
      <Panel>
        <ErrorState />
      </Panel>
    )
  }

  // Backend answered but the tutor store holds no active students — honest empty.
  if (!data.has_data) {
    return (
      <Panel>
        <EmptyState
          icon={<EmptyIcon />}
          message="No student data yet — students appear here as they practise."
          sub={`The analytics store (${data.source}) currently holds no active student records. As soon as learners attempt questions in the AI tutor, their mastery, attempts and mistake books aggregate into this dashboard automatically.`}
        />
      </Panel>
    )
  }

  const { students, cohort } = data
  return (
    <div className="space-y-6">
      {/* cohort tiles */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <CohortTile
          index={0}
          icon={<Users className="h-4 w-4" />}
          label="Students practising"
          value={`${students.active}`}
          sub={`${students.tracked} tracked in total`}
        />
        <CohortTile
          index={1}
          icon={<Activity className="h-4 w-4" />}
          label="Attempts recorded"
          value={`${cohort.total_attempts}`}
          sub="Graded tutor attempts"
        />
        <CohortTile
          index={2}
          icon={<BookOpenCheck className="h-4 w-4" />}
          label="Open mistakes"
          value={`${cohort.open_mistakes}`}
          sub="In student mistake books"
          tone={cohort.open_mistakes > 0 ? 'text-rose-300' : 'text-emerald-300'}
        />
        <CohortTile
          index={3}
          icon={<Radar className="h-4 w-4" />}
          label="Cohort avg mastery"
          value={fmtPct(cohort.avg_mastery)}
          sub="Across all tracked concepts"
          tone={masteryTone(cohort.avg_mastery).text}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Panel>
          <PanelHeader
            icon={<Radar className="h-4 w-4" />}
            title="Class mastery by level"
            hint={`${students.tracked} tracked · ${data.source}`}
          />
          <ClassBreakdown classes={data.classes} />
        </Panel>
        <Panel>
          <PanelHeader
            icon={<TrendingDown className="h-4 w-4" />}
            title="Cohort gap report"
            hint="Ranked by recorded wrong answers"
          />
          <GapReport concepts={data.weakest_concepts} />
        </Panel>
      </div>

      <Panel>
        <PanelHeader
          icon={<Users className="h-4 w-4" />}
          title="Student mastery"
          hint="Sorted by open mistakes, then attempts"
        />
        <Roster rows={data.roster} />
      </Panel>
    </div>
  )
}

function CohortTile({ icon, label, value, sub, tone = 'text-white', index = 0 }: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  tone?: string
  index?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      className="glass-card-hover px-4 py-4"
    >
      <div className="flex items-center gap-2 text-white/40">
        <span className="text-gold-400">{icon}</span>
        <span className="truncate text-[10px] font-semibold uppercase tracking-[0.16em]">{label}</span>
      </div>
      <p className={`mt-2 font-display text-2xl font-bold leading-none ${tone}`}>{value}</p>
      {sub ? <p className="mt-1.5 truncate text-[11px] text-white/35">{sub}</p> : null}
    </motion.div>
  )
}
