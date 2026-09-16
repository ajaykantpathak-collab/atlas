'use client'

/**
 * LLM cost table — call_type × model usage, tokens, spend and errors from
 * GET /api/analytics/llm-costs?days=N (ClickHouse llm_traces).
 * Empty array → honest "no calls recorded" state.
 */

import { useState } from 'react'
import { Coins } from 'lucide-react'
import { analyticsService, type LLMCostRow } from '@/services/analytics.service'
import {
  Chip, EmptyIcon, EmptyState, ErrorState, Panel, PanelHeader, TableSkeleton,
  fmtCompact, fmtInt, fmtUsd, humanize, useAnalyticsQuery,
} from './primitives'

const WINDOWS = [7, 30] as const

export default function LLMCosts({ refreshKey = 0 }: { refreshKey?: number }) {
  const [days, setDays] = useState<number>(7)
  const { status, data } = useAnalyticsQuery<LLMCostRow[]>(
    `llm-costs-${days}`,
    () => analyticsService.getLLMCosts(days),
    refreshKey,
  )

  const rows = [...(data ?? [])].sort((a, b) => b.total_cost - a.total_cost)
  const totals = rows.reduce(
    (acc, r) => ({
      calls: acc.calls + r.total_calls,
      tokens: acc.tokens + r.total_tokens,
      cost: acc.cost + r.total_cost,
      errors: acc.errors + r.total_errors,
    }),
    { calls: 0, tokens: 0, cost: 0, errors: 0 },
  )

  return (
    <Panel>
      <PanelHeader
        icon={<Coins className="h-4 w-4" />}
        title="LLM costs"
        hint={status === 'ready' && rows.length > 0 ? `${fmtInt(totals.calls)} calls · ${fmtUsd(totals.cost)} total` : 'AI spend by call type and model'}
        right={
          <div className="flex rounded-lg border border-white/10 bg-white/5 p-0.5" role="tablist" aria-label="Cost window">
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

      {status === 'loading' && <TableSkeleton rows={5} cols={5} />}
      {status === 'error' && <ErrorState />}

      {status === 'ready' && rows.length === 0 && (
        <EmptyState
          icon={<EmptyIcon />}
          message={`No LLM calls recorded in the last ${days} days.`}
          sub="Every tutor explanation, hint and grading call is traced here with its token usage and cost."
        />
      )}

      {status === 'ready' && rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-[0.14em] text-white/40">
                <th className="px-5 py-3 font-semibold">Call type</th>
                <th className="px-3 py-3 font-semibold">Model</th>
                <th className="px-3 py-3 text-right font-semibold">Calls</th>
                <th className="px-3 py-3 text-right font-semibold">Tokens</th>
                <th className="px-3 py-3 text-right font-semibold">Avg latency</th>
                <th className="px-3 py-3 text-right font-semibold">Errors</th>
                <th className="px-5 py-3 text-right font-semibold">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((r, i) => (
                <tr key={`${r.call_type}-${r.model}-${i}`} className="transition-colors hover:bg-white/[0.03]">
                  <td className="px-5 py-2.5"><Chip tone="gold">{humanize(r.call_type || 'unknown')}</Chip></td>
                  <td className="max-w-52 truncate px-3 py-2.5 font-mono text-xs text-white/75" title={r.model}>
                    {r.model || '—'}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-xs text-white/75">{fmtInt(r.total_calls)}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-xs text-white/75">{fmtCompact(r.total_tokens)}</td>
                  <td className="px-3 py-2.5 text-right font-mono text-xs text-white/55">
                    {r.avg_latency > 0 ? `${fmtInt(Math.round(r.avg_latency))} ms` : '—'}
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    {r.total_errors > 0 ? <Chip tone="rose">{fmtInt(r.total_errors)}</Chip> : <span className="text-xs text-white/30">0</span>}
                  </td>
                  <td className="px-5 py-2.5 text-right font-mono text-xs font-semibold text-gold-300">
                    {fmtUsd(r.total_cost)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-white/10 bg-white/[0.03] text-[11px]">
                <td className="px-5 py-2.5 font-semibold uppercase tracking-[0.12em] text-white/50" colSpan={2}>
                  Total · {days}d
                </td>
                <td className="px-3 py-2.5 text-right font-mono text-white/75">{fmtInt(totals.calls)}</td>
                <td className="px-3 py-2.5 text-right font-mono text-white/75">{fmtCompact(totals.tokens)}</td>
                <td className="px-3 py-2.5" />
                <td className="px-3 py-2.5 text-right font-mono text-rose-300/90">{totals.errors > 0 ? fmtInt(totals.errors) : '0'}</td>
                <td className="px-5 py-2.5 text-right font-mono font-semibold text-gold-300">{fmtUsd(totals.cost)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </Panel>
  )
}
