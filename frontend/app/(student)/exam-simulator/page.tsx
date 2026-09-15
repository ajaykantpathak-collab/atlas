'use client'

import { motion } from 'framer-motion'
import {
  FileText, Clock, Award, ChevronRight,
  Filter, Search, TrendingUp, Target, Zap, Lock, Loader2, AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useState } from 'react'
import { useExams } from '@/hooks'
import { useAuthStore } from '@/stores/authStore'
import type { ExamSchema } from '@/services/assessment.service'

const difficultyColors: Record<string, string> = {
  'Easy': 'badge-success',
  'Moderate': 'badge-warning',
  'Medium': 'badge-warning',
  'Hard': 'bg-red-500/10 border border-red-500/30 text-red-300',
  'Board-Level': 'bg-accent-500/10 border border-accent-500/30 text-accent-300',
}

function LoginPrompt() {
  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 max-w-md w-full text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow mx-auto mb-4">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-display text-xl font-bold text-white mb-2">Login Required</h1>
        <p className="text-sm text-surface-600 mb-6">Please log in to view and take exams.</p>
        <Link href="/login" className="btn-primary w-full justify-center">
          Go to Login
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  )
}

export default function ExamListPage() {
  const { isAuthenticated } = useAuthStore()
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const { data, isLoading, isError, error } = useExams()

  if (!isAuthenticated) {
    return <LoginPrompt />
  }

  const exams: ExamSchema[] = data?.exams ?? []

  const filtered = exams.filter((e) => {
    if (filter !== 'all' && e.subject.toLowerCase() !== filter) return false
    if (
      search &&
      !e.title.toLowerCase().includes(search.toLowerCase()) &&
      !e.topics.join(' ').toLowerCase().includes(search.toLowerCase())
    )
      return false
    return true
  })

  // Compute stats from real data
  const scoredExams = exams.filter((e) => e.bestScore !== null && e.bestScore !== undefined)
  const bestExam = scoredExams.length > 0
    ? scoredExams.reduce((best, e) => ((e.bestScore as number) > ((best.bestScore as number) || 0) ? e : best), scoredExams[0])
    : null
  const avgPct =
    scoredExams.length > 0
      ? Math.round(
          scoredExams.reduce((sum, e) => sum + ((e.bestScore as number) / e.totalMarks) * 100, 0) /
            scoredExams.length
        )
      : 0

  const stats = [
    { icon: FileText, label: 'Exams Available', value: String(exams.length), color: 'text-brand-300' },
    {
      icon: Award,
      label: 'Best Score',
      value: bestExam ? `${bestExam.bestScore}/${bestExam.totalMarks}` : '—',
      color: 'text-gold-300',
    },
    { icon: TrendingUp, label: 'Avg Score', value: `${avgPct}%`, color: 'text-mint-300' },
  ]

  // Build filter list from real subjects plus 'all'
  const subjectFilters = ['all', ...Array.from(new Set(exams.map((e) => e.subject.toLowerCase())))]

  return (
    <div className="min-h-screen mesh-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </Link>
            <h1 className="font-display text-lg font-semibold text-white">Exam Simulator</h1>
          </div>
          <span className="badge-brand">
            <Zap className="w-3 h-3" />
            CBSE Class 10
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="font-display text-3xl font-bold text-white mb-2">Choose Your Exam</h2>
          <p className="text-surface-600 text-sm">Full board-style exams and chapter tests with real marking schemes</p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-4 flex items-center gap-3"
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <p className="text-xs text-surface-600">{stat.label}</p>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search exams or topics..."
              className="input-field pl-11"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-surface-600" />
            {subjectFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                  filter === f
                    ? 'bg-brand-500/15 text-brand-300 border border-brand-500/30'
                    : 'glass text-surface-600 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-surface-600">
            <Loader2 className="w-8 h-8 animate-spin mb-3" />
            <p className="text-sm">Loading exams...</p>
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div className="glass-card p-6 text-center">
            <AlertCircle className="w-8 h-8 text-red-300 mx-auto mb-3" />
            <p className="text-sm text-white font-semibold mb-1">Failed to load exams</p>
            <p className="text-xs text-surface-600">{(error as Error)?.message || 'Something went wrong.'}</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && filtered.length === 0 && (
          <div className="glass-card p-6 text-center">
            <FileText className="w-8 h-8 text-surface-600 mx-auto mb-3" />
            <p className="text-sm text-white font-semibold mb-1">No exams found</p>
            <p className="text-xs text-surface-600">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Exam cards */}
        {!isLoading && !isError && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((exam, i) => (
              <motion.div
                key={exam.examId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/exam-simulator/${exam.examId}`}>
                  <div className="glass-card-hover p-5 group cursor-pointer h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-display text-base font-semibold text-white group-hover:text-brand-300 transition-colors">
                            {exam.title}
                          </h3>
                          <p className="text-xs text-surface-600">{exam.subject} · {exam.sections} sections</p>
                        </div>
                      </div>
                      <span className={`${difficultyColors[exam.difficulty] || difficultyColors.Hard} badge text-xs`}>
                        {exam.difficulty}
                      </span>
                    </div>

                    {/* Topics */}
                    {exam.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {exam.topics.slice(0, 4).map((t, j) => (
                          <span key={j} className="badge text-[10px] py-0.5">
                            {t}
                          </span>
                        ))}
                        {exam.topics.length > 4 && (
                          <span className="badge text-[10px] py-0.5">+{exam.topics.length - 4}</span>
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-surface-300/20">
                      <div className="flex items-center gap-4 text-xs text-surface-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {exam.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {exam.totalMarks} marks
                        </span>
                      </div>
                      {exam.bestScore !== null && exam.bestScore !== undefined ? (
                        <div className="text-right">
                          <p className="text-xs text-surface-600">Best: {exam.bestScore}/{exam.totalMarks}</p>
                          <p className="text-[10px] text-surface-600">{exam.attempts} attempt{exam.attempts === 1 ? '' : 's'}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-brand-300 font-medium">New →</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
