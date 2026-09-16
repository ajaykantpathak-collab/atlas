'use client'

/**
 * Weekly engagement — per-week learning activity aggregated across students
 * from GET /api/analytics/weekly-engagement (ClickHouse rollup per user).
 *
 * Bars: questions answered · Lines: active learners and mastery achievements.
 * Weeks are displayed chronologically; empty array → honest empty state.
 */

import { useMemo } from 'react'
import {
  Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { CalendarRange } from 'lucide-react'
import { motion } from 'framer-motion'
import { analyticsService, type WeeklyEngagementRow } from '@/services/analytics.service'
import {
  EmptyIcon, EmptyState, ErrorState, Panel, PanelHeader, WidgetSkeleton,
  fmtCompact, fmtDuration, fmtInt, fmtWeekLabel, useAnalyticsQuery,
} from './primitives'

interface WeekPoint {
  week: string
  label: string
  questions: number
  correct: number
  learners: number
  seconds: number
  masteries: number
  hints: number
}

function EngagementTooltip({ active, payload }: {
  active?: boolean
  payload?: Array<{ payload: WeekPoint }>
}) {
  if (!active || !payload?.length) return null
  const w = payload[0].payload
  return (
    <div className="rounded-xl border border-white/15 bg-[#131118]/95 px-3.5 py-3 shadow-xl backdrop-blur-md">
      <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-white">
        Week of {w.label}
      </p>
      <div className="mt-2 space-y-1 text-[11px] text-white/70">
        <p><span className="text-gold-300">{fmtInt(w.questions)}</span> questions answered</p>
        <p><span className="text-sky-300">{fmtInt(w.learners)}</span> active learner{w.learners === 1 ? '' : 's'}</p>
        <p><span className="text-emerald-300">{fmtInt(w.masteries)}</span> masteries achieved</p>
        <p className="text-white/55">{fmtDuration(w.seconds)} of learning time</p>
        {w.questions > 0 && (
          <p className="text-white/55">{Math.round((w.correct / w.questions) * 100)}% correct rate</p>
        )}
      </div>
    </div>
  )
}

export default function WeeklyEngagement({ refreshKey = 0 }: { refreshKey?: number }) {
  const { status, data } = useAnalyticsQuery<WeeklyEngagementRow[]>(
    'weekly-engagement',
    () => analyticsService.getWeeklyEngagement(),
    refreshKey,
  )

  const weeks = useMemo<WeekPoint[]>(() => {
    const byWeek = new Map<string, WeekPoint & { users: Set<string> }>()
    for (const r of data ?? []) {
      const wk = (r.week_start || '').slice(0, 10)
      if (!wk) continue
      const cur = byWeek.get(wk) ?? {
        week: wk,
        label: fmtWeekLabel(wk),
        questions: 0, correct: 0, learners: 0, seconds: 0, masteries: 0, hints: 0,
        users: new Set<string>(),
      }
      cur.questions += r.questions_answered
      cur.correct += r.correct_answers
      cur.seconds += r.total_time_seconds
      cur.masteries += r.mastery_achievements
      cur.hints += r.hints_requested
      if (r.user_id) cur.users.add(r.user_id)
      byWeek.set(wk, cur)
    }
    return Array.from(byWeek.values())
      .map(({ users, ...w }) => ({ ...w, learners: users.size }))
      .sort((a, b) => a.week.localeCompare(b.week))
      .slice(-12) // most recent 12 weeks
  }, [data])

  const totals = weeks.reduce(
    (acc, w) => ({
      questions: acc.questions + w.questions,
      seconds: acc.seconds + w.seconds,
      learners: acc.learners + w.learners,
    }),
    { questions: 0, seconds: 0, learners: 0 },
  )

  return (
    <Panel>
      <PanelHeader
        icon={<CalendarRange className="h-4 w-4" />}
        title="Weekly engagement"
        hint={weeks.length > 0 ? `Last ${weeks.length} week${weeks.length === 1 ? '' : 's'} · ${fmtCompact(totals.questions)} questions` : 'Learning activity per week'}
      />

      {status === 'loading' && <WidgetSkeleton rows={4} />}
      {status === 'error' && <ErrorState />}

      {status === 'ready' && weeks.length === 0 && (
        <EmptyState
          icon={<EmptyIcon />}
          message="No engagement data yet — weeks appear here as students learn."
          sub="Questions answered, learning time and active learners are rolled up per week from the analytics event store."
        />
      )}

      {status === 'ready' && weeks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="px-3 pb-3 pt-4"
        >
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={weeks} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="label"
                tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                width={44}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: 'rgba(56,189,248,0.55)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                width={36}
              />
              <Tooltip content={<EngagementTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar
                yAxisId="left"
                dataKey="questions"
                name="Questions"
                fill="url(#engGold)"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="learners"
                name="Active learners"
                stroke="#38bdf8"
                strokeWidth={2}
                dot={{ r: 3, fill: '#38bdf8', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="masteries"
                name="Masteries"
                stroke="#34d399"
                strokeWidth={2}
                strokeDasharray="5 3"
                dot={{ r: 2.5, fill: '#34d399', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              <defs>
                <linearGradient id="engGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fcd34d" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.35} />
                </linearGradient>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>

          <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-1.5 px-2 text-[11px] text-white/50">
            <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm" style={{ background: 'linear-gradient(to bottom, #fcd34d, #f59e0b)' }} /> Questions answered</span>
            <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded-full bg-sky-400" /> Active learners</span>
            <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded-full bg-emerald-400" /> Masteries achieved</span>
            <span className="ml-auto text-white/35">{fmtDuration(totals.seconds)} total learning time</span>
          </div>
        </motion.div>
      )}
    </Panel>
  )
}
