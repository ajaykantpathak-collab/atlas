'use client'

/**
 * Shared primitives for the teacher analytics suite (Atlas design system:
 * near-black glass panels, gold accents, font-display headings).
 *
 * Contract for every widget on the dashboard:
 *  - fetches its own endpoint via useAnalyticsQuery, so a partial backend
 *    failure degrades exactly one widget — the rest keep working;
 *  - renders a skeleton while loading, an honest empty state when the
 *    array is empty, and an honest error state when the call fails;
 *  - never fabricates a number. No data → no number.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Inbox, RefreshCw } from 'lucide-react'

// ── data fetching ────────────────────────────────────────────────────────

export type WidgetStatus = 'loading' | 'ready' | 'error'

export interface QueryState<T> {
  status: WidgetStatus
  data: T | null
  reload: () => void
}

/**
 * Fetch one analytics endpoint through a service fetcher
 * (`analyticsService.*` or `api.get`). Re-runs when `key` or `refreshKey`
 * (the dashboard-wide Refresh button) changes; `reload()` retries a single
 * failed widget without disturbing the rest.
 *
 * `key` must change whenever the request itself changes (e.g. a days-window
 * toggle) — the fetcher is read from a ref so its identity doesn't matter.
 */
export function useAnalyticsQuery<T>(key: string, fetcher: () => Promise<T>, refreshKey: number): QueryState<T> {
  const [status, setStatus] = useState<WidgetStatus>('loading')
  const [data, setData] = useState<T | null>(null)
  const [tick, setTick] = useState(0)
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  useEffect(() => {
    const ctrl = new AbortController()
    setStatus('loading')
    let alive = true
    ;(async () => {
      try {
        const json = await fetcherRef.current()
        if (!alive) return
        setData(json)
        setStatus('ready')
      } catch (e) {
        if (!alive || (e as Error)?.name === 'AbortError') return
        setStatus('error') // honest failure — show error state, never zeros
      }
    })()
    return () => {
      alive = false
      ctrl.abort()
    }
  }, [key, refreshKey, tick])

  const reload = useCallback(() => setTick((t) => t + 1), [])
  return { status, data, reload }
}

// ── formatting helpers ───────────────────────────────────────────────────

export function fmtInt(n: number): string {
  return n.toLocaleString('en-US')
}

export function fmtCompact(n: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
}

export function fmtUsd(n: number): string {
  if (n === 0) return '$0.00'
  return n >= 100 ? `$${n.toFixed(2)}` : `$${n.toFixed(n >= 1 ? 3 : 4)}`
}

export function fmtPct(v: number | null | undefined): string {
  return typeof v === 'number' ? `${Math.round(v * 100)}%` : '—'
}

/** "hint_requested" → "Hint requested"; "pcr_high" → "Pcr high". */
export function humanize(s: string): string {
  if (!s) return '—'
  const cleaned = s.replace(/_/g, ' ').trim()
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

export function fmtDuration(seconds: number): string {
  if (!seconds) return '—'
  if (seconds < 60) return `${Math.round(seconds)}s`
  const h = Math.floor(seconds / 3600)
  const m = Math.round((seconds % 3600) / 60)
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

/** "2026-09-08" → "Sep 8" */
export function fmtWeekLabel(weekStart: string): string {
  const d = new Date(`${weekStart}T00:00:00`)
  if (Number.isNaN(d.getTime())) return weekStart
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ── layout primitives ────────────────────────────────────────────────────

export function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`glass-card overflow-hidden ${className}`}>{children}</section>
  )
}

export function PanelHeader({ icon, title, hint, right }: {
  icon: React.ReactNode
  title: string
  hint?: string
  right?: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
      <div className="flex items-baseline gap-3">
        <h2 className="flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-[0.14em] text-white">
          <span className="text-gold-400">{icon}</span>
          {title}
        </h2>
        {hint ? <p className="text-[11px] text-white/40">{hint}</p> : null}
      </div>
      {right ? <div className="flex items-center gap-2">{right}</div> : null}
    </div>
  )
}

// ── states ───────────────────────────────────────────────────────────────

export function WidgetSkeleton({ rows = 4, className = '' }: { rows?: number; className?: string }) {
  return (
    <div className={`space-y-3 px-5 py-5 ${className}`} aria-busy="true" aria-label="Loading data">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="h-8 w-8 shrink-0 animate-pulse rounded-lg bg-white/[0.07]" />
          <div className="h-3 animate-pulse rounded-full bg-white/[0.07]" style={{ width: `${58 - ((i * 13) % 34)}%` }} />
          <div className="ml-auto h-3 w-10 animate-pulse rounded-full bg-white/[0.05]" />
        </div>
      ))}
    </div>
  )
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-2.5 px-5 py-5" aria-busy="true" aria-label="Loading table">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex items-center gap-3">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className={`h-3 animate-pulse rounded-full ${c === 0 ? 'bg-white/[0.08]' : 'bg-white/[0.05]'}`}
              style={{ width: c === 0 ? '26%' : `${10 + ((r + c) * 7) % 14}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export function EmptyState({ icon, message, sub, compact = false }: {
  icon: React.ReactNode
  message: string
  sub?: string
  compact?: boolean
}) {
  return (
    <div className={`flex flex-col items-center gap-2 px-6 text-center ${compact ? 'py-8' : 'py-12'}`}>
      <span className="text-white/25">{icon}</span>
      <p className="text-sm text-white/60">{message}</p>
      {sub ? <p className="max-w-md text-xs leading-relaxed text-white/35">{sub}</p> : null}
    </div>
  )
}

export function ErrorState({ onRetry, compact = false }: { onRetry?: () => void; compact?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-2.5 px-6 text-center ${compact ? 'py-8' : 'py-12'}`}>
      <AlertTriangle className="h-6 w-6 text-rose-300/80" />
      <p className="text-sm text-white/60">Live data unavailable for this widget</p>
      <p className="max-w-md text-xs leading-relaxed text-white/35">
        The analytics service didn&apos;t respond, so there is nothing honest to show here.
        No placeholder numbers are displayed.
      </p>
      {onRetry ? (
        <button
          onClick={onRetry}
          className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-gold-400/30 bg-gold-400/10 px-3 py-1.5 text-xs font-semibold text-gold-300 transition-colors hover:bg-gold-400/20"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Retry
        </button>
      ) : null}
    </div>
  )
}

// ── tiles ────────────────────────────────────────────────────────────────

export function StatTile({ icon, label, value, sub, tone = 'text-white', index = 0, emphasis = false }: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  tone?: string
  index?: number
  emphasis?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4), ease: 'easeOut' }}
      className={`glass-card-hover px-4 py-4 ${emphasis ? 'border-gold-400/25 bg-gold-400/[0.05]' : ''}`}
    >
      <div className="flex items-center gap-2 text-white/40">
        <span className={emphasis ? 'text-gold-300' : 'text-gold-400'}>{icon}</span>
        <span className="truncate text-[10px] font-semibold uppercase tracking-[0.16em]">{label}</span>
      </div>
      <p className={`mt-2 font-display text-2xl font-bold leading-none ${tone}`}>{value}</p>
      {sub ? <p className="mt-1.5 truncate text-[11px] text-white/35">{sub}</p> : null}
    </motion.div>
  )
}

export function SkeletonTiles({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card px-4 py-4" aria-busy="true">
          <div className="h-3 w-20 animate-pulse rounded-full bg-white/[0.07]" />
          <div className="mt-3 h-6 w-14 animate-pulse rounded bg-white/[0.07]" />
          <div className="mt-2 h-2.5 w-16 animate-pulse rounded-full bg-white/[0.05]" />
        </div>
      ))}
    </div>
  )
}

// ── chips ────────────────────────────────────────────────────────────────

export function Chip({ children, tone = 'neutral' }: {
  children: React.ReactNode
  tone?: 'neutral' | 'gold' | 'emerald' | 'rose' | 'sky' | 'violet'
}) {
  const tones: Record<string, string> = {
    neutral: 'border-white/10 bg-white/5 text-white/55',
    gold: 'border-gold-400/30 bg-gold-400/10 text-gold-300',
    emerald: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    rose: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
    sky: 'border-gold-400/30 bg-gold-400/10 text-gold-300',
    violet: 'border-gold-400/30 bg-gold-400/10 text-gold-300',
  }
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function EmptyIcon() {
  return <Inbox className="h-6 w-6" />
}
