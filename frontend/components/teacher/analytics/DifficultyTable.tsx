'use client'

/**
 * Difficulty & pass rate — per subject/class IRT difficulty (b), pass rate
 * and pace from GET /api/analytics/difficulty-summary (ClickHouse).
 * Empty array → honest empty state.
 */

import { Gauge } from 'lucide-react'
import { analyticsService, type DifficultySummary } from '@/services/analytics.service'
import { subjectName } from '@/lib/nodeTitle'
import {
  Chip, EmptyIcon, EmptyState, ErrorState, Panel, PanelHeader, TableSkeleton,
  fmtInt, useAnalyticsQuery,
} from './primitives'

function passTone(p: number): { chip: 'emerald' | 'gold' | 'rose'; bar: string } {
  if (p >= 0.7) return { chip: 'emerald', bar: 'bg-emerald-400' }
  if (p >= 0.45) return { chip: 'gold', bar: 'bg-gold-400' }
  return { chip: 'rose', bar: 'bg-rose-400' }
}

function difficultyLabel(b: number): string {
  if (b <= 0) return '—'
  if (b < -1) return 'Very easy'
  if (b < -0.3) return 'Easy'
  if (b <= 0.3) return 'Medium'
  if (b <= 1) return 'Hard'
  return 'Very hard'
}

export default function DifficultyTable({ refreshKey = 0 }: { refreshKey?: number }) {
  const { status, data } = useAnalyticsQuery<DifficultySummary[]>(
    'difficulty-summary',
    () => analyticsService.getDifficultySummary(),
    refreshKey,
  )

  const rows = (data ?? []).filter((r) => r.total_questions > 0)

  return (
    <Panel>
      <PanelHeader
        icon={<Gauge className="h-4 w-4" />}
        title="Difficulty & pass rate"
        hint="Per subject and class · IRT difficulty b"
      />

      {status === 'loading' && <TableSkeleton rows={5} cols={5} />}
      {status === 'error' && <ErrorState />}

      {status === 'ready' && rows.length === 0 && (
        <EmptyState
          icon={<EmptyIcon />}
          message="No difficulty data yet — it builds up as students answer questions."
          sub="Question difficulty (b), pass rates and pace are estimated from real graded answers in the analytics store."
        />
      )}

      {status === 'ready' && rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-[10px] uppercase tracking-[0.14em] text-white/40">
                <th className="px-5 py-3 font-semibold">Subject</th>
                <th className="px-3 py-3 font-semibold">Class</th>
                <th className="px-3 py-3 text-right font-semibold">Questions</th>
                <th className="px-3 py-3 font-semibold">Difficulty</th>
                <th className="px-3 py-3 font-semibold">Pass rate</th>
                <th className="px-5 py-3 text-right font-semibold">Avg time / question</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((r, i) => {
                const tone = passTone(r.avg_pass_rate)
                return (
                  <tr key={`${r.subject}-${r.class_level}`} className="transition-colors hover:bg-white/[0.03]">
                    <td className="px-5 py-2.5 text-white/85">{r.subject ? subjectName(r.subject) : '—'}</td>
                    <td className="px-3 py-2.5"><Chip>Class {r.class_level}</Chip></td>
                    <td className="px-3 py-2.5 text-right font-mono text-xs text-white/75">
                      {fmtInt(r.total_questions)}
                      {r.questions_with_data > 0 && r.questions_with_data < r.total_questions ? (
                        <span className="ml-1 text-[10px] text-white/35">({r.questions_with_data} irt)</span>
                      ) : null}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-xs text-white/70">{difficultyLabel(r.avg_difficulty)}</span>
                      {r.avg_difficulty !== 0 && (
                        <span className="ml-1.5 font-mono text-[10px] text-white/40">b={r.avg_difficulty.toFixed(2)}</span>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full ${tone.bar} transition-all duration-700`}
                            style={{ width: `${Math.max(3, Math.round(r.avg_pass_rate * 100))}%` }}
                          />
                        </div>
                        <Chip tone={tone.chip}>{Math.round(r.avg_pass_rate * 100)}%</Chip>
                      </div>
                    </td>
                    <td className="px-5 py-2.5 text-right font-mono text-xs text-white/60">
                      {r.avg_time_per_question > 0 ? `${Math.round(r.avg_time_per_question)}s` : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </Panel>
  )
}
