'use client'

/**
 * Teacher Dashboard — the analytics suite (Atlas design system).
 *
 * Every widget is a live, self-fetching view over one honest endpoint:
 *
 *   GET /api/analytics/events?hours=24        → EventsOverview tiles
 *   GET /api/teacher-analytics/overview       → CohortPulse (tutor store)
 *   GET /api/analytics/mastery-distribution   → stacked bars (recharts)
 *   GET /api/analytics/difficulty-summary     → difficulty & pass rate
 *   GET /api/analytics/misconceptions?days=   → misconception leaderboard
 *   GET /api/analytics/socratic-stats?days=   → Socratic stats + hint funnel
 *   GET /api/analytics/weekly-engagement      → weekly engagement chart
 *   GET /api/analytics/llm-costs?days=        → LLM cost table
 *
 * When ClickHouse is down these endpoints return honest empty arrays and the
 * widgets say so — no fabricated numbers, ever. Skeleton loaders show while
 * each widget loads; a failure degrades only that widget.
 */

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CircleDot, RefreshCw } from 'lucide-react'
import AuthGuard from '@/components/AuthGuard'
import { useAuthStore } from '@/stores/authStore'
import EventsOverview from '@/components/teacher/analytics/EventsOverview'
import CohortPulse from '@/components/teacher/analytics/CohortPulse'
import MasteryDistribution from '@/components/teacher/analytics/MasteryDistribution'
import DifficultyTable from '@/components/teacher/analytics/DifficultyTable'
import Misconceptions from '@/components/teacher/analytics/Misconceptions'
import SocraticStats from '@/components/teacher/analytics/SocraticStats'
import WeeklyEngagement from '@/components/teacher/analytics/WeeklyEngagement'
import LLMCosts from '@/components/teacher/analytics/LLMCosts'

function Section({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.35), ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function TeacherDashboardContent() {
  const user = useAuthStore((s) => s.user)
  const [refreshKey, setRefreshKey] = useState(0)
  const [updatedAt, setUpdatedAt] = useState<string>('')
  const [spinning, setSpinning] = useState(false)

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1)
    setUpdatedAt(new Date().toLocaleTimeString())
    setSpinning(true)
  }, [])

  useEffect(() => {
    setUpdatedAt(new Date().toLocaleTimeString())
    if (!spinning) return
    const t = setTimeout(() => setSpinning(false), 900)
    return () => clearTimeout(t)
  }, [refreshKey, spinning])

  return (
    <div className="mx-auto max-w-7xl">
      {/* header */}
      <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-400/80">
            Teacher Suite
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">
            Analytics <span className="spectrum-text">Command Center</span>
          </h1>
          <p className="mt-1.5 text-sm text-white/45">
            {user?.name ? `${user.name} · ` : ''}Live cohort mastery, misconceptions, engagement and AI costs — every number measured, nothing simulated
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
            <CircleDot className="h-3 w-3 animate-pulse" />
            Live data
          </span>
          <div className="flex items-center gap-2">
            {updatedAt ? (
              <span className="hidden text-[11px] text-white/35 sm:block">Updated {updatedAt}</span>
            ) : null}
            {/* P5 gap 2 wiring: /paper-lab builds class tests from the same
                board_questions bank — a teacher tool that had no inbound link
                anywhere in the teacher suite. */}
            <a
              href="/paper-lab"
              className="inline-flex items-center gap-1.5 rounded-lg border border-gold-500/30 bg-gold-500/10 px-3 py-1.5 text-xs font-semibold text-gold-300 transition-colors hover:bg-gold-500/20"
            >
              Paper Lab — build a class test
            </a>
            <button
              onClick={refresh}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${spinning ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      {/* 1 — events last 24h (overview tiles) */}
      <Section index={0}>
        <EventsOverview refreshKey={refreshKey} />
      </Section>

      {/* 2 — cohort pulse from the tutor's persisted student models */}
      <Section index={1}>
        <div className="mt-6">
          <CohortPulse refreshKey={refreshKey} />
        </div>
      </Section>

      {/* 3 — mastery distribution (stacked bars per subject / class) */}
      <Section index={2}>
        <div className="mt-6">
          <MasteryDistribution refreshKey={refreshKey} />
        </div>
      </Section>

      {/* 4 — difficulty & pass rate */}
      <Section index={3}>
        <div className="mt-6">
          <DifficultyTable refreshKey={refreshKey} />
        </div>
      </Section>

      {/* 5 — misconceptions leaderboard + socratic stats */}
      <Section index={4}>
        {/* Deep view — the full Misconception Lab (trap heatmap + one-click
            remediation bundles). Without this link the lab page was only
            reachable by typing its URL. */}
        <div className="mt-4 flex justify-end">
          <a
            href="/teacher-misconceptions"
            className="text-xs font-semibold text-amber-300/90 hover:text-amber-200 transition-colors"
          >
            Open the full Misconception Lab →
          </a>
        </div>
        <div className="mt-6 grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
          <Misconceptions refreshKey={refreshKey} />
          <SocraticStats refreshKey={refreshKey} />
        </div>
      </Section>

      {/* 6 — weekly engagement */}
      <Section index={5}>
        <div className="mt-6">
          <WeeklyEngagement refreshKey={refreshKey} />
        </div>
      </Section>

      {/* 7 — LLM costs */}
      <Section index={6}>
        <div className="mt-6">
          <LLMCosts refreshKey={refreshKey} />
        </div>
      </Section>

      <p className="mt-8 pb-6 text-center text-[11px] leading-relaxed text-white/30">
        Sourced live from the platform analytics store (ClickHouse) and the AI tutor&apos;s persisted
        student models. Empty sections mean no events have been recorded yet — they fill in as
        students learn. Nothing on this page is simulated.
      </p>
    </div>
  )
}

export default function TeacherDashboardPage() {
  // Same auth pattern as the rest of the teacher suite: guard by role,
  // inherit the (teacher) route-group shell.
  return (
    <AuthGuard allowedRoles={['teacher', 'admin']}>
      <TeacherDashboardContent />
    </AuthGuard>
  )
}
