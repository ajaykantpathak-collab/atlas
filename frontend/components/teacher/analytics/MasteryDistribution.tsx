'use client'

/**
 * Mastery distribution — stacked mastery buckets per subject (optionally
 * per class) from GET /api/analytics/mastery-distribution (ClickHouse).
 *
 * Buckets mirror the backend query: low < 40%, steady 40–75%, strong ≥ 75%.
 * Empty array → honest "no mastery events yet" state.
 */

import { useMemo, useState } from 'react'
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { Layers } from 'lucide-react'
import { motion } from 'framer-motion'
import { analyticsService, type MasteryDistribution } from '@/services/analytics.service'
import { subjectName } from '@/lib/nodeTitle'
import {
  EmptyIcon, EmptyState, ErrorState, Panel, PanelHeader, WidgetSkeleton,
  fmtInt, useAnalyticsQuery,
} from './primitives'

const BUCKET_COLORS = { low: '#fb7185', steady: '#fbbf24', strong: '#34d399' } as const

interface SubjectRow {
  key: string
  label: string
  low: number
  steady: number
  strong: number
  students: number
  avg: number
  buckets: number
}

function MasteryTooltip({ active, payload }: {
  active?: boolean
  payload?: Array<{ payload: SubjectRow }>
}) {
  if (!active || !payload?.length) return null
  const r = payload[0].payload
  const total = r.buckets || 1
  return (
    <div className="rounded-xl border border-white/15 bg-[#131118]/95 px-3.5 py-3 shadow-xl backdrop-blur-md">
      <p className="font-display text-xs font-bold uppercase tracking-[0.12em] text-white">{r.label}</p>
      <div className="mt-2 space-y-1 text-[11px]">
        <p className="flex items-center gap-2 text-rose-300">
          <span className="h-2 w-2 rounded-full" style={{ background: BUCKET_COLORS.low }} />
          Low (&lt;40%) · {fmtInt(r.low)}
        </p>
        <p className="flex items-center gap-2 text-gold-300">
          <span className="h-2 w-2 rounded-full" style={{ background: BUCKET_COLORS.steady }} />
          Steady (40–75%) · {fmtInt(r.steady)}
        </p>
        <p className="flex items-center gap-2 text-emerald-300">
          <span className="h-2 w-2 rounded-full" style={{ background: BUCKET_COLORS.strong }} />
          Strong (≥75%) · {fmtInt(r.strong)}
        </p>
        <p className="mt-1.5 border-t border-white/10 pt-1.5 text-white/55">
          {fmtInt(r.students)} student{r.students === 1 ? '' : 's'} · avg mastery {Math.round(r.avg * 100)}%
        </p>
      </div>
      <p className="mt-1 text-[10px] text-white/35">{fmtInt(total)} graded answer{total === 1 ? '' : 's'}</p>
    </div>
  )
}

export default function MasteryDistribution({ refreshKey = 0 }: { refreshKey?: number }) {
  const [classFilter, setClassFilter] = useState<string>('all')
  const { status, data } = useAnalyticsQuery<MasteryDistribution[]>(
    'mastery-distribution',
    () => analyticsService.getMasteryDistribution(),
    refreshKey,
  )

  const classLevels = useMemo(
    () => Array.from(new Set((data ?? []).map((r) => String(r.class_level)))).sort((a, b) => Number(a) - Number(b)),
    [data],
  )

  const rows = useMemo<SubjectRow[]>(() => {
    const src = data ?? []
    const filtered = classFilter === 'all' ? src : src.filter((r) => String(r.class_level) === classFilter)
    const bySubject = new Map<string, SubjectRow>()
    for (const r of filtered) {
      const key = r.subject || 'unknown'
      const cur = bySubject.get(key) ?? {
        key,
        label: key === 'unknown' ? 'Unknown' : subjectName(key),
        low: 0, steady: 0, strong: 0, students: 0, avg: 0, buckets: 0,
      }
      cur.low += r.low_mastery
      cur.steady += r.medium_mastery
      cur.strong += r.high_mastery
      cur.buckets += r.low_mastery + r.medium_mastery + r.high_mastery
      cur.students += r.total_students
      // weighted avg by students
      cur.avg = cur.students > 0
        ? (cur.avg * (cur.students - r.total_students) + r.avg_mastery * r.total_students) / Math.max(cur.students, 1)
        : r.avg_mastery
      bySubject.set(key, cur)
    }
    return Array.from(bySubject.values())
      .filter((r) => r.buckets > 0 || r.students > 0)
      .sort((a, b) => b.buckets - a.buckets)
  }, [data, classFilter])

  return (
    <Panel>
      <PanelHeader
        icon={<Layers className="h-4 w-4" />}
        title="Mastery distribution"
        hint="Graded answers per subject · low <40% · steady 40–75% · strong ≥75%"
        right={
          status === 'ready' && classLevels.length > 1 ? (
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white/75 outline-none transition-colors focus:border-gold-400/50 [&>option]:bg-[#131118]"
              aria-label="Filter by class"
            >
              <option value="all">All classes</option>
              {classLevels.map((c) => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </select>
          ) : undefined
        }
      />

      {status === 'loading' && <WidgetSkeleton rows={5} />}
      {status === 'error' && <ErrorState />}

      {status === 'ready' && rows.length === 0 && (
        <EmptyState
          icon={<EmptyIcon />}
          message="No mastery events yet — the distribution appears as students answer questions."
          sub="Every graded answer updates a student's mastery for that concept; buckets aggregate them per subject."
        />
      )}

      {status === 'ready' && rows.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="px-3 pb-4 pt-4"
        >
          <ResponsiveContainer width="100%" height={Math.max(rows.length * 52 + 24, 160)}>
            <BarChart data={rows} layout="vertical" margin={{ top: 0, right: 24, bottom: 0, left: 8 }} barCategoryGap="28%">
              <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.06)" />
              <XAxis
                type="number"
                tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="label"
                width={120}
                tick={{ fill: 'rgba(255,255,255,0.75)', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<MasteryTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
              <Bar dataKey="low" name="Low" stackId="mastery" fill={BUCKET_COLORS.low} radius={[0, 0, 0, 0]} maxBarSize={26} />
              <Bar dataKey="steady" name="Steady" stackId="mastery" fill={BUCKET_COLORS.steady} maxBarSize={26} />
              <Bar dataKey="strong" name="Strong" stackId="mastery" fill={BUCKET_COLORS.strong} radius={[0, 4, 4, 0]} maxBarSize={26} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 px-2 text-[11px] text-white/50">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: BUCKET_COLORS.low }} /> Low</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: BUCKET_COLORS.steady }} /> Steady</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: BUCKET_COLORS.strong }} /> Strong</span>
            <span className="ml-auto text-white/35">{rows.length} subject{rows.length === 1 ? '' : 's'}{classFilter !== 'all' ? ` · Class ${classFilter}` : ''}</span>
          </div>
        </motion.div>
      )}
    </Panel>
  )
}
