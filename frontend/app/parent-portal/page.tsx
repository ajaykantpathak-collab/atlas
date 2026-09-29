'use client'

import { motion } from 'framer-motion'
import {
  Heart, Clock, TrendingUp, AlertCircle, BookOpen,
  Award, Calendar, ChevronRight, Brain,
} from 'lucide-react'
import Link from 'next/link'
import { useWeeklyEngagement, useMasteryDistribution } from '@/hooks/useAnalytics'
import AuthGuard from '@/components/AuthGuard'

export default function ParentDashboardPage() {
  return (
    <AuthGuard allowedRoles={['parent', 'admin']}>
      <ParentDashboardContent />
    </AuthGuard>
  )
}

function ParentDashboardContent() {
  const { data: engagement, isLoading } = useWeeklyEngagement()
  const { data: mastery } = useMasteryDistribution()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-slate-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Heart className="w-8 h-8 text-pink-400" />
            Parent Dashboard
          </h1>
          <p className="text-slate-400 mt-1">Track your child&apos;s learning progress</p>
        </div>

        {/* Alerts */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
          <div>
            <p className="text-sm text-amber-200 font-medium">Study reminder</p>
            <p className="text-xs text-amber-300/70 mt-1">
              Your child hasn&apos;t studied in 3 days. Encourage them to review pending topics.
            </p>
          </div>
        </div>

        {/* Weekly stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={<Clock className="w-5 h-5" />} label="Time this week" value="4h 30m" color="text-gold-400" />
          <StatCard icon={<BookOpen className="w-5 h-5" />} label="Questions answered" value="87" color="text-gold-400" />
          <StatCard icon={<Award className="w-5 h-5" />} label="Mastery achieved" value="3" color="text-green-400" />
          <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Accuracy" value="78%" color="text-purple-400" />
        </div>

        {/* Mastery heatmap */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-gold-400" />
            Mastery Heatmap
          </h2>
          {mastery && mastery.length > 0 ? (
            <div className="space-y-2">
              {mastery.map((row, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-28 text-xs text-slate-400">
                    {row.subject} — Cl {row.class_level}
                  </div>
                  <div className="flex-1 flex gap-1 h-5 rounded overflow-hidden bg-slate-800">
                    <div className="bg-red-500/60" style={{ width: `${(row.low_mastery / row.total_students) * 100}%` }} />
                    <div className="bg-yellow-500/60" style={{ width: `${(row.medium_mastery / row.total_students) * 100}%` }} />
                    <div className="bg-green-500/60" style={{ width: `${(row.high_mastery / row.total_students) * 100}%` }} />
                  </div>
                  <div className="w-12 text-right text-xs text-slate-500">
                    {(row.avg_mastery * 100).toFixed(0)}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">No mastery data yet</p>
          )}
          <div className="flex items-center gap-4 mt-4 text-xs text-slate-500">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500/60" /> Low (&lt;40%)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-500/60" /> Medium (40-70%)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500/60" /> High (&gt;70%)</span>
          </div>
        </div>

        {/* Weekly engagement */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-gold-400" />
            Weekly Activity
          </h2>
          {engagement && engagement.length > 0 ? (
            <div className="space-y-2">
              {engagement.slice(0, 5).map((row, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800">
                  <div className="text-sm text-slate-300">
                    Week of {row.week_start}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>{Math.floor(row.total_time_seconds / 60)}m</span>
                    <span>{row.questions_answered} Qs</span>
                    <span>{row.lessons_completed} lessons</span>
                    <span className="text-green-400">{row.correct_answers} correct</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 text-center py-4">No activity recorded yet</p>
          )}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/parent-dashboard" className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-gold-500/50 transition-colors flex items-center justify-between">
            <span className="text-sm text-slate-300">View detailed progress</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
          <Link href="/parent-dashboard" className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-gold-500/50 transition-colors flex items-center justify-between">
            <span className="text-sm text-slate-300">Upcoming reviews</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
      <div className={`flex items-center gap-2 ${color}`}>
        {icon}
        <span className="text-xs text-slate-400 uppercase">{label}</span>
      </div>
      <div className="text-xl font-bold text-white mt-2">{value}</div>
    </div>
  )
}
