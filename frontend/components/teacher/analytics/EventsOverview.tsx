'use client'

/**
 * Overview tiles — live learning-event counts for the last 24 hours.
 * Source: GET /api/analytics/events?hours=24 → { eventType: count }.
 * Empty ClickHouse → `{}` → honest "no events yet" state, never zeros
 * presented as activity.
 */

import {
  Activity, Award, BookOpenCheck, CheckCircle2, GraduationCap, Lightbulb,
  MessageSquare, MoreHorizontal, PenLine, Target,
} from 'lucide-react'
import { analyticsService, type EventCounts } from '@/services/analytics.service'
import {
  EmptyIcon, EmptyState, ErrorState, SkeletonTiles, StatTile, fmtInt, useAnalyticsQuery,
} from './primitives'

/** Known event types → premium tile metadata (icon + tone). */
const EVENT_META: Record<string, { label: string; icon: React.ReactNode; tone: string }> = {
  question_answered: { label: 'Questions answered', icon: <PenLine className="h-4 w-4" />, tone: 'text-gold-300' },
  mastery_achieved: { label: 'Masteries achieved', icon: <Award className="h-4 w-4" />, tone: 'text-emerald-300' },
  hint_requested: { label: 'Hints requested', icon: <Lightbulb className="h-4 w-4" />, tone: 'text-sky-300' },
  socratic_interaction: { label: 'Socratic dialogues', icon: <MessageSquare className="h-4 w-4" />, tone: 'text-violet-300' },
  misconception_diagnosed: { label: 'Misconceptions caught', icon: <Target className="h-4 w-4" />, tone: 'text-rose-300' },
  lesson_completed: { label: 'Lessons completed', icon: <BookOpenCheck className="h-4 w-4" />, tone: 'text-emerald-300' },
  review_completed: { label: 'Reviews completed', icon: <CheckCircle2 className="h-4 w-4" />, tone: 'text-sky-300' },
  exam_submitted: { label: 'Exams submitted', icon: <GraduationCap className="h-4 w-4" />, tone: 'text-gold-300' },
}

export default function EventsOverview({ refreshKey = 0 }: { refreshKey?: number }) {
  const { status, data } = useAnalyticsQuery<EventCounts>(
    'events-24h',
    () => analyticsService.getEventCounts(24),
    refreshKey,
  )

  if (status === 'loading') return <SkeletonTiles count={6} />
  if (status === 'error') {
    return (
      <div className="glass-card">
        <ErrorState />
      </div>
    )
  }

  const counts = data ?? {}
  const entries = Object.entries(counts).filter(([, n]) => n > 0)
  const total = entries.reduce((sum, [, n]) => sum + n, 0)

  if (entries.length === 0) {
    return (
      <div className="glass-card">
        <EmptyState
          icon={<EmptyIcon />}
          message="No analytics events in the last 24 hours — they appear as students learn."
          sub="Every question answered, hint requested and mastery achieved across the platform lands here in real time."
        />
      </div>
    )
  }

  const known = entries
    .filter(([k]) => k in EVENT_META)
    .sort((a, b) => b[1] - a[1])
  const other = entries
    .filter(([k]) => !(k in EVENT_META))
    .reduce((sum, [, n]) => sum + n, 0)

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      <StatTile
        emphasis
        index={0}
        icon={<Activity className="h-4 w-4" />}
        label="Events · 24h"
        value={fmtInt(total)}
        sub="All tracked activity"
        tone="text-gold-300"
      />
      {known.slice(0, 5).map(([type, n], i) => {
        const meta = EVENT_META[type]
        return (
          <StatTile
            key={type}
            index={i + 1}
            icon={meta.icon}
            label={meta.label}
            value={fmtInt(n)}
            sub={total > 0 ? `${Math.round((n / total) * 100)}% of activity` : undefined}
            tone={meta.tone}
          />
        )
      })}
      {(other > 0 || known.length > 5) && (
        <StatTile
          index={6}
          icon={<MoreHorizontal className="h-4 w-4" />}
          label={known.length > 5 ? 'Other activity' : 'Other event types'}
          value={fmtInt(other + known.slice(5).reduce((s, [, n]) => s + n, 0))}
          sub={`${entries.length - Math.min(known.length, 5)} more type${entries.length - Math.min(known.length, 5) === 1 ? '' : 's'}`}
        />
      )}
    </div>
  )
}
