'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, TrendingUp, Brain, Target, Clock, Award,
  BookOpen, Zap, Flame, ChevronRight, Activity,
  Atom, FlaskConical, Leaf, Calculator, Loader2,
  Calendar, CheckCircle2, Circle, Star, Trophy,
  BarChart3, Sparkles, AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useState, useEffect, useMemo } from 'react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import {
  useSubjectMastery, useStudyHeatmap, useReviewQueue, useAchievements,
} from '@/hooks'
import type { SubjectMasterySchema, ReviewItemSchema } from '@/services/progress.service'

interface EnrichmentSummary {
  total: number
  subject: string
}

interface MasteryEntry {
  subject: string
  chapter: string
  mastery: number
  lastReviewed: string | null
  dueForReview: boolean
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  progress: number
  maxProgress: number
}

interface StreakDay {
  date: string
  completed: boolean
  xp: number
}

const SUBJECTS = [
  { key: 'physics', name: 'Physics', icon: Atom, color: 'text-brand-300', bgColor: 'bg-brand-500/15', heatColor: 'bg-brand-500' },
  { key: 'chem', name: 'Chemistry', icon: FlaskConical, color: 'text-accent-300', bgColor: 'bg-accent-500/15', heatColor: 'bg-accent-500' },
  { key: 'bio', name: 'Biology', icon: Leaf, color: 'text-mint-300', bgColor: 'bg-mint-500/15', heatColor: 'bg-mint-500' },
  { key: 'maths', name: 'Mathematics', icon: Calculator, color: 'text-gold-300', bgColor: 'bg-gold-500/15', heatColor: 'bg-gold-500' },
]

function getMasteryColor(mastery: number): string {
  if (mastery >= 80) return 'bg-mint-500'
  if (mastery >= 60) return 'bg-gold-500'
  if (mastery >= 40) return 'bg-orange-500'
  if (mastery >= 20) return 'bg-red-500/60'
  return 'bg-surface-200/40'
}

function getMasteryLabel(mastery: number): string {
  if (mastery >= 80) return 'Mastered'
  if (mastery >= 60) return 'Good'
  if (mastery >= 40) return 'Developing'
  if (mastery >= 20) return 'Beginner'
  return 'Not Started'
}

export default function ProgressPage() {
  const { user } = useAuthStore()
  const classLevel = user?.class_level || 10
  const [view, setView] = useState<'overview' | 'subjects' | 'mastery' | 'calendar' | 'achievements'>('overview')
  const [subjectCounts, setSubjectCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  // Real API hooks
  const { data: subjectMastery } = useSubjectMastery()
  const { data: heatmapData } = useStudyHeatmap()
  const { data: reviewQueueData } = useReviewQueue()
  const { data: achievementsData } = useAchievements()

  // Real streak from the auth store — honest zero when there's no streak yet
  const streakDays = user?.streak_days ?? 0

  // Build streak calendar from real heatmap data (fallback to empty)
  const streakData: StreakDay[] = useMemo(() => {
    if (!heatmapData || heatmapData.length === 0) {
      // Fallback: empty 28-day grid
      const days: StreakDay[] = []
      const today = new Date()
      for (let i = 27; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        days.push({ date: date.toISOString().split('T')[0], completed: false, xp: 0 })
      }
      return days
    }
    // Map heatmap data to last 28 days
    const today = new Date()
    const days: StreakDay[] = []
    const heatMap = new Map<string, number>(heatmapData.map((h: { date: string; intensity: number }) => [h.date, h.intensity]))
    for (let i = 27; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const intensity = heatMap.get(dateStr) || 0
      days.push({
        date: dateStr,
        completed: intensity > 0,
        xp: intensity, // raw activity intensity from the heatmap — no invented XP conversion
      })
    }
    return days
  }, [heatmapData])

  // Build mastery entries from real subject mastery data
  const masteryEntries: MasteryEntry[] = useMemo(() => {
    if (!subjectMastery || subjectMastery.length === 0) return []
    // Map SubjectMasterySchema to MasteryEntry per subject
    // Each subject becomes one entry with its mastery percentage
    return subjectMastery.map((sm: SubjectMasterySchema) => ({
      subject: sm.subject,
      chapter: `${sm.subject.charAt(0).toUpperCase() + sm.subject.slice(1)} Overall`,
      mastery: Math.round(sm.masteryPercentage),
      lastReviewed: null,
      dueForReview: sm.learningNodes > 0,
    }))
  }, [subjectMastery])

  // Review queue from real API
  const reviewItems: ReviewItemSchema[] = reviewQueueData?.items || []

  const dueForReview = masteryEntries.filter(m => m.dueForReview)
  const masteredCount = masteryEntries.filter(m => m.mastery >= 80).length
  const totalTopics = masteryEntries.length || 1
  const avgMastery = masteryEntries.length > 0
    ? Math.round(masteryEntries.reduce((a, m) => a + m.mastery, 0) / masteryEntries.length)
    : 0

  // Map achievements from real API
  const achievements: Achievement[] = useMemo(() => {
    if (!achievementsData) return []
    // Handle both array and {items:[]} shapes
    const items = Array.isArray(achievementsData) ? achievementsData : (achievementsData as any)?.items || []
    return items.map((a: any) => ({
      id: a.id || a.slug || String(a.name),
      name: a.name || a.title,
      description: a.description || '',
      icon: a.icon || '🏆',
      unlocked: !!a.unlocked || !!a.isUnlocked,
      progress: a.progress || a.currentProgress || 0,
      maxProgress: a.maxProgress || a.target || 1,
    }))
  }, [achievementsData])

  useEffect(() => {
    setLoading(true)
    Promise.all(
      SUBJECTS.map((s) =>
        api.get<{ total: number; nodes: any[] }>(
          `/api/content/enrichment?subject=${s.key}&class_level=${classLevel}&limit=1`
        ).then((data) => ({ key: s.key, total: data.total }))
      )
    )
      .then((results) => {
        const counts: Record<string, number> = {}
        results.forEach((r) => { counts[r.key] = r.total })
        setSubjectCounts(counts)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [classLevel])

  const totalNodes = Object.values(subjectCounts).reduce((a, b) => a + b, 0)

  const stats = [
    { label: 'Total XP', value: (user?.total_xp || 0).toLocaleString('en-IN'), sub: 'All time', icon: Zap, color: 'text-brand-300' },
    { label: 'Current Level', value: `Level ${user?.current_level || 1}`, sub: 'Earn XP to level up', icon: TrendingUp, color: 'text-accent-300' },
    { label: 'Day Streak', value: `${streakDays} days`, sub: streakDays > 0 ? 'Keep it up!' : 'Practice daily to start one', icon: Flame, color: 'text-gold-300' },
    { label: 'Avg Mastery', value: `${avgMastery}%`, sub: `${masteredCount}/${totalTopics} mastered`, icon: Target, color: 'text-mint-300' },
  ]

  return (
    <div className="min-h-screen mesh-bg-animated">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Your Progress</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs text-surface-600 font-medium">{stat.label}</span>
                </div>
                <p className="font-display text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-surface-600 mt-1">{stat.sub}</p>
              </motion.div>
            )
          })}
        </div>

        {/* View toggle */}
        <div className="flex gap-1 p-1 glass rounded-xl w-fit flex-wrap">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'subjects', label: 'Subjects' },
            { key: 'mastery', label: 'Mastery Heatmap' },
            { key: 'calendar', label: 'Review Calendar' },
            { key: 'achievements', label: 'Achievements' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setView(tab.key as typeof view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === tab.key ? 'bg-brand-500/15 text-brand-300' : 'text-surface-600 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="glass-card p-12 text-center">
            <Loader2 className="w-8 h-8 text-brand-300 mx-auto mb-3 animate-spin" />
            <p className="text-sm text-surface-600">Loading progress...</p>
          </div>
        )}

        {/* Overview */}
        {!loading && view === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-6 md:p-8"
          >
            <h2 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-300" />
              Subject Distribution
            </h2>
            <div className="space-y-4">
              {SUBJECTS.map((s) => {
                const count = subjectCounts[s.key] || 0
                const pct = totalNodes > 0 ? Math.round((count / totalNodes) * 100) : 0
                const Icon = s.icon
                return (
                  <div key={s.key}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${s.color}`} />
                        <span className="text-sm text-white font-medium">{s.name}</span>
                      </div>
                      <span className="text-xs text-surface-600">{count} topics · {pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-200/40 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full rounded-full ${s.bgColor.replace('/15', '/60')}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Subjects */}
        {!loading && view === 'subjects' && (
          <div className="grid sm:grid-cols-2 gap-4">
            {SUBJECTS.map((s, i) => {
              const count = subjectCounts[s.key] || 0
              const Icon = s.icon
              return (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/learn?subject=${s.key}`}>
                    <div className="glass-card-hover p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-xl ${s.bgColor} flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${s.color}`} />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-white">{s.name}</h3>
                          <p className="text-xs text-surface-600">Class {classLevel}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-surface-600">Topics available</span>
                        <span className="font-display text-lg font-bold text-white">{count}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-brand-300">
                        Start learning <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* CTA */}
        <div className="glass-card rounded-2xl p-6 text-center">
          <Brain className="w-8 h-8 text-brand-300 mx-auto mb-3" />
          <h3 className="font-display text-lg font-semibold text-white mb-2">Want to improve faster?</h3>
          <p className="text-sm text-surface-600 mb-4">Ask the AI tutor any question and get instant answers from verified content.</p>
          <Link href="/tutor" className="btn-primary">
            <Brain className="w-4 h-4" />
            Ask the AI Tutor
          </Link>
        </div>

        {/* ─── Mastery Heatmap View ─── */}
        {!loading && view === 'mastery' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-6 md:p-8"
          >
            <h2 className="font-display text-xl font-bold text-white mb-2 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-brand-300" />
              Mastery Heatmap
            </h2>
            <p className="text-xs text-surface-600 mb-6">
              Topic-by-topic mastery across all subjects. Green = mastered, Red = needs work.
            </p>

            {/* Legend */}
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              {[
                { label: 'Mastered (80%+)', color: 'bg-mint-500' },
                { label: 'Good (60%+)', color: 'bg-gold-500' },
                { label: 'Developing (40%+)', color: 'bg-orange-500' },
                { label: 'Beginner (20%+)', color: 'bg-red-500/60' },
                { label: 'Not Started', color: 'bg-surface-200/40' },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <span className={`w-3 h-3 rounded ${l.color}`} />
                  <span className="text-[10px] text-surface-600">{l.label}</span>
                </div>
              ))}
            </div>

            {/* Heatmap grid per subject */}
            <div className="space-y-6">
              {SUBJECTS.map((s) => {
                const entries = masteryEntries.filter(m => m.subject === s.key)
                const Icon = s.icon
                return (
                  <div key={s.key}>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className={`w-4 h-4 ${s.color}`} />
                      <span className="text-sm font-medium text-white">{s.name}</span>
                      <span className="text-[10px] text-surface-600">
                        ({entries.filter(e => e.mastery >= 80).length}/{entries.length} mastered)
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                      {entries.map((entry) => (
                        <motion.div
                          key={entry.chapter}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          className={`p-3 rounded-xl border border-surface-200/20 ${entry.dueForReview ? 'ring-1 ring-gold-500/40' : ''}`}
                        >
                          <div className={`w-full h-1.5 rounded-full mb-2 ${getMasteryColor(entry.mastery)}`} />
                          <p className="text-[11px] font-medium text-white leading-tight mb-1">{entry.chapter}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-surface-600">{getMasteryLabel(entry.mastery)}</span>
                            <span className="text-[10px] font-bold text-white">{entry.mastery}%</span>
                          </div>
                          {entry.dueForReview && (
                            <div className="flex items-center gap-1 mt-1.5 text-[9px] text-gold-300">
                              <Clock className="w-2.5 h-2.5" />
                              Due for review
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Review queue */}
            {reviewItems.length > 0 && (
              <div className="mt-6 p-4 rounded-2xl bg-gold-500/10 border border-gold-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-gold-300" />
                  <span className="text-sm font-medium text-white">Review Queue ({reviewItems.length} items due)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {reviewItems.slice(0, 12).map((item) => (
                    <Link
                      key={item.id}
                      href={`/practice?subject=${item.subject || 'general'}&topic=${encodeURIComponent(item.conceptName)}`}
                      className="px-3 py-1.5 rounded-lg bg-surface-200/30 text-[11px] text-white hover:bg-gold-500/20 transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-surface-600">{item.subject}</span>
                      {item.conceptName}
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ─── Review Calendar View ─── */}
        {!loading && view === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-6 md:p-8"
          >
            <h2 className="font-display text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-300" />
              Study Calendar & Streak Tracker
            </h2>
            <p className="text-xs text-surface-600 mb-6">
              Last 28 days. Each square is a day. Filled = you studied. Keep the chain alive!
            </p>

            {/* Streak stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="glass-card p-4 rounded-xl text-center">
                <Flame className="w-6 h-6 text-gold-300 mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-white">{streakDays}</p>
                <p className="text-[10px] text-surface-600">Current Streak</p>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <CheckCircle2 className="w-6 h-6 text-mint-300 mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-white">
                  {streakData.filter(d => d.completed).length}
                </p>
                <p className="text-[10px] text-surface-600">Active Days (28d)</p>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <Zap className="w-6 h-6 text-brand-300 mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-white">
                  {streakData.reduce((a, d) => a + d.xp, 0)}
                </p>
                <p className="text-[10px] text-surface-600">Study Activity (28d)</p>
              </div>
            </div>

            {/* Calendar grid - 4 weeks x 7 days */}
            <div className="space-y-2">
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-center text-[10px] text-surface-600 font-medium">
                    {day}
                  </div>
                ))}
              </div>
              {Array.from({ length: 4 }, (_, weekIdx) => (
                <div key={weekIdx} className="grid grid-cols-7 gap-2">
                  {streakData.slice(weekIdx * 7, (weekIdx + 1) * 7).map((day) => {
                    const date = new Date(day.date)
                    const isToday = day.date === new Date().toISOString().split('T')[0]
                    return (
                      <motion.div
                        key={day.date}
                        whileHover={{ scale: 1.1 }}
                        className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-all ${
                          day.completed
                            ? 'bg-gradient-to-br from-brand-500/40 to-brand-600/30 border border-brand-400/30'
                            : 'bg-surface-200/20 border border-surface-200/10'
                        } ${isToday ? 'ring-2 ring-gold-500/50' : ''}`}
                        title={`${day.date}: ${day.completed ? 'Studied' : 'No activity'}`}
                      >
                        <span className={`text-[10px] ${day.completed ? 'text-white font-bold' : 'text-surface-600'}`}>
                          {date.getDate()}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* SRS schedule */}
            <div className="mt-6 p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-brand-300" />
                <span className="text-sm font-medium text-white">Spaced Repetition Schedule</span>
              </div>
              <p className="text-[11px] text-surface-600 mb-3">
                Topics you've studied are scheduled for review at optimal intervals to maximize retention.
              </p>
              <div className="space-y-2">
                {reviewItems.slice(0, 5).map((item) => {
                  const subjectMeta = SUBJECTS.find(s => s.key === item.subject)
                  return (
                    <div key={item.id} className="flex items-center justify-between p-2.5 rounded-lg bg-surface-200/20">
                      <div className="flex items-center gap-2">
                        {subjectMeta && <subjectMeta.icon className={`w-3.5 h-3.5 ${subjectMeta.color}`} />}
                        <span className="text-[11px] text-white">{item.conceptName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gold-300">Due now</span>
                        <Link
                          href={`/practice?subject=${item.subject || 'general'}&topic=${encodeURIComponent(item.conceptName)}`}
                          className="px-2.5 py-1 rounded-lg bg-brand-500/20 text-[10px] text-brand-200 hover:bg-brand-500/30 transition-colors"
                        >
                          Review
                        </Link>
                      </div>
                    </div>
                  )
                })}
                {reviewItems.length === 0 && (
                  <div className="text-center py-4 text-[11px] text-surface-600">
                    No items due for review. Keep learning to build your schedule!
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── Achievements View ─── */}
        {!loading && view === 'achievements' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-3xl p-6 md:p-8"
          >
            <h2 className="font-display text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-gold-300" />
              Achievements
            </h2>
            <p className="text-xs text-surface-600 mb-6">
              Unlock badges by mastering topics, maintaining streaks, and completing challenges.
            </p>

            {/* Achievement stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="glass-card p-4 rounded-xl text-center">
                <Trophy className="w-6 h-6 text-gold-300 mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-white">
                  {achievements.filter(a => a.unlocked).length}
                </p>
                <p className="text-[10px] text-surface-600">Unlocked</p>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <Star className="w-6 h-6 text-brand-300 mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-white">
                  {achievements.filter(a => !a.unlocked && a.progress > 0).length}
                </p>
                <p className="text-[10px] text-surface-600">In Progress</p>
              </div>
              <div className="glass-card p-4 rounded-xl text-center">
                <Circle className="w-6 h-6 text-surface-600 mx-auto mb-2" />
                <p className="font-display text-2xl font-bold text-white">
                  {achievements.filter(a => !a.unlocked && a.progress === 0).length}
                </p>
                <p className="text-[10px] text-surface-600">Locked</p>
              </div>
            </div>

            {/* Achievement grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.length === 0 && (
                <div className="col-span-2 text-center py-8 text-surface-600 text-sm">
                  No achievements data yet. Start learning to unlock badges!
                </div>
              )}
              {achievements.map((ach, i) => (
                <motion.div
                  key={ach.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`p-4 rounded-2xl border transition-all ${
                    ach.unlocked
                      ? 'bg-gradient-to-br from-gold-500/15 to-gold-600/5 border-gold-500/30'
                      : 'bg-surface-200/20 border-surface-200/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-3xl ${ach.unlocked ? '' : 'grayscale opacity-50'}`}>
                      {ach.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-semibold ${ach.unlocked ? 'text-white' : 'text-surface-600'}`}>
                        {ach.name}
                      </h3>
                      <p className="text-[11px] text-surface-600 mt-0.5">{ach.description}</p>
                      {!ach.unlocked && ach.progress > 0 && (
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-[10px] text-surface-600 mb-1">
                            <span>{ach.progress}/{ach.maxProgress}</span>
                            <span>{Math.round((ach.progress / ach.maxProgress) * 100)}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-surface-200/40 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(ach.progress / ach.maxProgress) * 100}%` }}
                              transition={{ duration: 0.8, delay: i * 0.05 }}
                              className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-500"
                            />
                          </div>
                        </div>
                      )}
                      {ach.unlocked && (
                        <div className="flex items-center gap-1 mt-2 text-[10px] text-gold-300">
                          <CheckCircle2 className="w-3 h-3" />
                          Unlocked
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
