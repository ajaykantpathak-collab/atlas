'use client'

/**
 * Misconceptions leaderboard — most-diagnosed misconceptions per subject
 * and node from GET /api/analytics/misconceptions?days=N (ClickHouse).
 *
 * Node references are ALWAYS humanised via friendlyNodeTitle
 * (lib/nodeTitle.ts) — raw node ids must never reach the screen.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert } from 'lucide-react'
import { analyticsService, type MisconceptionRow } from '@/services/analytics.service'
import { friendlyNodeTitle, subjectName } from '@/lib/nodeTitle'
import {
  Chip, EmptyIcon, EmptyState, ErrorState, Panel, PanelHeader, WidgetSkeleton,
  fmtInt, useAnalyticsQuery,
} from './primitives'

const WINDOWS = [7, 30] as const

export default function Misconceptions({ refreshKey = 0 }: { refreshKey?: number }) {
  const [days, setDays] = useState<number>(7)
  const { status, data } = useAnalyticsQuery<MisconceptionRow[]>(
    `misconceptions-${days}`,
    () => analyticsService.getCommonMisconceptions(days),
    refreshKey,
  )

  const rows = (data ?? []).slice(0, 12)
  const max = Math.max(...rows.map((r) => r.total_count), 1)

  return (
    <Panel className="h-full">
      <PanelHeader
        icon={<ShieldAlert className="h-4 w-4" />}
        title="Misconception leaderboard"
        hint="Most-diagnosed misunderstandings"
        right={
          <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5" role="tablist" aria-label="Misconception window">
            {WINDOWS.map((d) => (
              <button
                key={d}
                role="tab"
                aria-selected={days === d}
                onClick={() => setDays(d)}
                className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                  days === d ? 'bg-gold-400/15 text-gold-300' : 'text-white/45 hover:text-white/75'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
        }
      />

      {status === 'loading' && <WidgetSkeleton rows={5} />}
      {status === 'error' && <ErrorState />}

      {status === 'ready' && rows.length === 0 && (
        <EmptyState
          icon={<EmptyIcon />}
          message={`No misconceptions diagnosed in the last ${days} days.`}
          sub="When the AI tutor diagnoses a misunderstanding during practice, it is logged here with the concept and subject it belongs to."
        />
      )}

      {status === 'ready' && rows.length > 0 && (
        <ol className="divide-y divide-white/5">
          {rows.map((r, i) => {
            const title = friendlyNodeTitle(r.node_id)
            return (
              <motion.li
                key={`${r.subject}-${r.node_id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.04, 0.4) }}
                className="flex items-center gap-3 px-5 py-3"
              >
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-display text-[11px] font-bold ${
                  i < 3 ? 'bg-rose-400/15 text-rose-300' : 'bg-white/5 text-white/40'
                }`}>
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white" title={title}>{title}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    {r.subject ? <Chip tone="sky">{subjectName(r.subject)}</Chip> : null}
                    <Chip>{fmtInt(r.unique_students)} student{r.unique_students === 1 ? '' : 's'}</Chip>
                  </div>
                </div>
                <div className="w-24 shrink-0 text-right">
                  <p className="font-mono text-xs font-semibold text-rose-300">{fmtInt(r.total_count)}×</p>
                  <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-rose-400/80 transition-all duration-700"
                      style={{ width: `${Math.max(4, Math.round((r.total_count / max) * 100))}%` }}
                    />
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ol>
      )}
    </Panel>
  )
}
