'use client'

/**
 * Socratic stats — tutoring interactions per PCR (Prompt-Collapse-Repair)
 * level from GET /api/analytics/socratic-stats?days=N (ClickHouse), with
 * the hint funnel (hint 1 → 4) and mastery lift per level.
 * Empty array → honest "no interactions yet" state.
 */

import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, MessageSquare, Minus } from 'lucide-react'
import { analyticsService, type SocraticStatRow } from '@/services/analytics.service'
import {
  Chip, EmptyIcon, EmptyState, ErrorState, Panel, PanelHeader, TableSkeleton,
  fmtInt, fmtPct, humanize, useAnalyticsQuery,
} from './primitives'

const WINDOWS = [7, 30] as const

const HINT_COLORS = ['#fcd34d', '#fbbf24', '#f59e0b', '#d97706'] as const

function MasteryDelta({ before, after }: { before: number; after: number }) {
  const delta = after - before
  const icon =
    delta > 0.005 ? <ArrowUpRight className="h-3.5 w-3.5 text-emerald-300" />
    : delta < -0.005 ? <ArrowDownRight className="h-3.5 w-3.5 text-rose-300" />
    : <Minus className="h-3.5 w-3.5 text-white/35" />
  return (
    <div className="flex items-center justify-end gap-1.5">
      <span className="font-mono text-xs text-white/55">{fmtPct(before)}</span>
      <span className="text-white/30">→</span>
      <span className="font-mono text-xs font-semibold text-white/85">{fmtPct(after)}</span>
      {icon}
      {Math.abs(delta) > 0.005 ? (
        <span className={`font-mono text-[10px] ${delta > 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
          {delta > 0 ? '+' : ''}{Math.round(delta * 100)}pt
        </span>
      ) : null}
    </div>
  )
}

function HintFunnel({ row }: { row: SocraticStatRow }) {
  const hints = [row.hint_1_count, row.hint_2_count, row.hint_3_count, row.hint_4_count]
  const total = hints.reduce((s, n) => s + n, 0)
  if (total === 0) return <span className="text-[11px] text-white/30">No hints</span>
  const max = Math.max(...hints, 1)
  return (
    <div className="flex items-end gap-1" title={`Hints 1–4: ${hints.map((h) => fmtInt(h)).join(' / ')}`}>
      {hints.map((h, i) => (
        <div key={i} className="flex w-7 flex-col items-center gap-0.5">
          <span className="font-mono text-[9px] text-white/45">{h}</span>
          <div
            className="w-full rounded-t-sm transition-all duration-700"
            style={{
              height: `${Math.max(3, Math.round((h / max) * 22))}px`,
              background: HINT_COLORS[i],
              opacity: h > 0 ? 0.9 : 0.15,
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default function SocraticStats({ refreshKey = 0 }: { refreshKey?: number }) {
  const [days, setDays] = useState<number>(7)
  const { status, data } = useAnalyticsQuery<SocraticStatRow[]>(
    `socratic-stats-${days}`,
    () => analyticsService.getSocraticStats(days),
    refreshKey,
  )

  const rows = [...(data ?? [])].sort((a, b) => b.total_interactions - a.total_interactions)
  const totalInteractions = rows.reduce((s, r) => s + r.total_interactions, 0)

  return (
    <Panel className="h-full">
      <PanelHeader
        icon={<MessageSquare className="h-4 w-4" />}
        title="Socratic tutoring"
        hint={totalInteractions > 0 ? `${fmtInt(totalInteractions)} interactions` : 'Dialogue depth and mastery lift'}
        right={
          <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5" role="tablist" aria-label="Socratic window">
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

      {status === 'loading' && <TableSkeleton rows={4} cols={4} />}
      {status === 'error' && <ErrorState />}

      {status === 'ready' && rows.length === 0 && (
        <EmptyState
          icon={<EmptyIcon />}
          message={`No Socratic interactions in the last ${days} days.`}
          sub="Every guided dialogue is logged with the student's mastery before and after, and how deep into the hint ladder they went."
        />
      )}

      {status === 'ready' && rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-[0.14em] text-white/40">
                <th className="px-5 py-3 font-semibold">PCR level</th>
                <th className="px-3 py-3 text-right font-semibold">Interactions</th>
                <th className="px-3 py-3 text-right font-semibold">Mastery before → after</th>
                <th className="px-5 py-3 text-right font-semibold">Hint funnel (1→4)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((r) => (
                <tr key={r.pcr_level} className="transition-colors hover:bg-white/[0.03]">
                  <td className="px-5 py-3">
                    <Chip tone="violet">{humanize(r.pcr_level)}</Chip>
                  </td>
                  <td className="px-3 py-3 text-right font-mono text-xs text-white/75">{fmtInt(r.total_interactions)}</td>
                  <td className="px-3 py-3"><MasteryDelta before={r.avg_mastery_before} after={r.avg_mastery_after} /></td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end"><HintFunnel row={r} /></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  )
}
