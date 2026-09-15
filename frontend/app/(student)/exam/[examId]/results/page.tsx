'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Award, Clock, TrendingUp,
  CheckCircle2, AlertTriangle, Target, Brain,
  Sparkles, ChevronRight, Download, Share2, RefreshCw, Loader2, AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useParams } from 'next/navigation'
import { useExam } from '@/hooks'
import { useAuthStore } from '@/stores/authStore'
import type { ExamResultSchema, ExamDetailSchema } from '@/services/assessment.service'

function LoginPrompt() {
  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 max-w-md w-full text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow mx-auto mb-4">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h1 className="font-display text-xl font-bold text-white mb-2">Login Required</h1>
        <p className="text-sm text-surface-600 mb-6">Please log in to view exam results.</p>
        <Link href="/login" className="btn-primary w-full justify-center">
          Go to Login
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  )
}

function getGrade(pct: number): string {
  if (pct >= 90) return 'A+'
  if (pct >= 80) return 'A'
  if (pct >= 70) return 'B+'
  if (pct >= 60) return 'B'
  if (pct >= 50) return 'C'
  if (pct >= 40) return 'D'
  return 'F'
}

export default function ExamResultsPage() {
  const params = useParams()
  const examId = params.examId as string
  const { isAuthenticated } = useAuthStore()
  const { data: exam, isLoading: examLoading } = useExam(examId)

  const [result, setResult] = useState<ExamResultSchema | null>(null)
  const [loadingResult, setLoadingResult] = useState(true)
  const [resultError, setResultError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(`exam-result-${examId}`)
      if (raw) {
        setResult(JSON.parse(raw) as ExamResultSchema)
      }
    } catch {
      // ignore parse errors
    }
    setLoadingResult(false)
  }, [examId])

  if (!isAuthenticated) {
    return <LoginPrompt />
  }

  if (loadingResult || examLoading) {
    return (
      <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-4 text-surface-600">
        <Loader2 className="w-8 h-8 animate-spin mb-3" />
        <p className="text-sm">Loading results...</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-4">
        <div className="glass-card p-6 max-w-md w-full text-center">
          <AlertCircle className="w-8 h-8 text-gold-300 mx-auto mb-3" />
          <p className="text-sm text-white font-semibold mb-1">No results found</p>
          <p className="text-xs text-surface-600 mb-4">
            We couldn't find results for this exam. Please submit the exam first.
          </p>
          <Link href={`/exam/${examId}`} className="btn-primary text-xs">
            Take Exam
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    )
  }

  if (resultError) {
    return (
      <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-4">
        <div className="glass-card p-6 max-w-md w-full text-center">
          <AlertCircle className="w-8 h-8 text-red-300 mx-auto mb-3" />
          <p className="text-sm text-white font-semibold mb-1">Failed to load results</p>
          <p className="text-xs text-surface-600 mb-4">{resultError}</p>
          <Link href="/exam" className="btn-secondary text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Exams
          </Link>
        </div>
      </div>
    )
  }

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'text-mint-300 bg-mint-500/15'
    if (mastery >= 60) return 'text-gold-300 bg-gold-500/15'
    if (mastery >= 40) return 'text-orange-300 bg-orange-500/15'
    return 'text-red-300 bg-red-500/15'
  }

  const getMasteryBar = (mastery: number) => {
    if (mastery >= 80) return 'bg-mint-500'
    if (mastery >= 60) return 'bg-gold-500'
    if (mastery >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const pct = result.percentage
  const grade = getGrade(pct)
  const passed = pct >= 40
  const totalCorrect = result.topicScores.reduce((a, t) => a + t.correct, 0)
  const totalQuestions = result.topicScores.reduce((a, t) => a + t.total, 0)
  const timeTakenMin = Math.round(result.timeTaken / 60)

  const sections: ExamDetailSchema['sections'] = exam?.sections ?? []
  const sectionById = new Map(sections.map((s) => [s.sectionId, s]))

  // Derive simple insights from real data
  const insights: string[] = []
  if (result.topicScores.length > 0) {
    const best = [...result.topicScores].sort((a, b) => b.correct / b.total - a.correct / a.total)[0]
    const worst = [...result.topicScores].sort((a, b) => a.correct / a.total - b.correct / b.total)[0]
    if (best) insights.push(`Your strongest topic is "${best.conceptName}" with ${Math.round((best.correct / best.total) * 100)}% accuracy.`)
    if (worst && worst.conceptName !== best?.conceptName) insights.push(`Focus on "${worst.conceptName}" — only ${Math.round((worst.correct / worst.total) * 100)}% correct.`)
  }
  if (result.weaknessAreas.length > 0) {
    insights.push(`You have ${result.weaknessAreas.length} area${result.weaknessAreas.length > 1 ? 's' : ''} to improve. Review the recommendations below.`)
  }
  if (pct >= 75) {
    insights.push('Great work! You scored above 75%.')
  } else if (pct >= 50) {
    insights.push('Decent attempt. A bit more practice will push you higher.')
  } else {
    insights.push('Keep practicing — review weak topics and retake the exam.')
  }

  return (
    <div className="min-h-screen mesh-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/exam" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Exam Results</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-xs">
              <Download className="w-3.5 h-3.5" />
              Report
            </button>
            <button className="btn-ghost text-xs">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Score hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 rounded-full bg-brand-gradient flex items-center justify-center shadow-glow mx-auto mb-4"
          >
            <Award className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="font-display text-3xl font-bold text-white">
            {result.totalScore}<span className="text-lg text-surface-600">/{result.maxScore}</span>
          </h2>
          <p className="text-sm text-surface-600 mt-1">
            {pct.toFixed(1)}% · Grade {grade}
          </p>

          <div className="flex items-center justify-center gap-2 mt-3">
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${passed ? 'text-mint-300 bg-mint-500/15' : 'text-red-300 bg-red-500/15'}`}>
              {passed ? 'Passed' : 'Failed'}
            </span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <Clock className="w-4 h-4 text-surface-600 mx-auto mb-1" />
              <p className="text-sm font-bold text-white">{timeTakenMin}m</p>
              <p className="text-[10px] text-surface-600">Time Taken</p>
            </div>
            <div className="text-center">
              <CheckCircle2 className="w-4 h-4 text-mint-300 mx-auto mb-1" />
              <p className="text-sm font-bold text-white">{totalCorrect}/{totalQuestions || '—'}</p>
              <p className="text-[10px] text-surface-600">Correct</p>
            </div>
            <div className="text-center">
              <Target className="w-4 h-4 text-brand-300 mx-auto mb-1" />
              <p className="text-sm font-bold text-white">{pct.toFixed(0)}%</p>
              <p className="text-[10px] text-surface-600">Accuracy</p>
            </div>
          </div>
        </motion.div>

        {/* Section-wise breakdown */}
        {result.sectionScores.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 mb-6"
          >
            <h3 className="text-sm font-semibold text-white mb-4">Section-wise Performance</h3>
            <div className="space-y-4">
              {result.sectionScores.map((sec, i) => {
                const sp = (sec.score / sec.maxScore) * 100
                const sectionMeta = sectionById.get(sec.sectionId)
                const title = sectionMeta?.title || `Section ${sec.sectionId}`
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-surface-700">{title}</span>
                      <span className="text-xs font-bold text-white">{sec.score}/{sec.maxScore}</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-200/30 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sp}%` }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                        className={`h-full rounded-full ${getMasteryBar(sp)}`}
                      />
                    </div>
                    <p className="text-[10px] text-surface-600 mt-1">
                      {sp.toFixed(0)}%
                    </p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Topic-wise mastery */}
        {result.topicScores.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-6 mb-6"
          >
            <h3 className="text-sm font-semibold text-white mb-4">Topic-wise Mastery</h3>
            <div className="space-y-3">
              {result.topicScores.map((topic, i) => {
                const masteryPct = topic.total > 0 ? Math.round((topic.correct / topic.total) * 100) : 0
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-surface-700">{topic.conceptName}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${getMasteryColor(masteryPct)}`}>
                          {masteryPct}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-surface-200/30 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${masteryPct}%` }}
                          transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                          className={`h-full rounded-full ${getMasteryBar(masteryPct)}`}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-surface-600 flex-shrink-0">
                      {topic.correct}/{topic.total}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Weakness areas */}
        {result.weaknessAreas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-gold-300" />
              <h3 className="text-sm font-semibold text-white">Areas to Improve</h3>
            </div>
            <div className="space-y-3">
              {result.weaknessAreas.map((w, i) => {
                const masteryPct = Math.round(w.masteryProbability * 100)
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gold-500/10 border border-gold-500/20">
                    <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                      <Brain className="w-4 h-4 text-gold-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-white">{w.conceptName}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full ${getMasteryColor(masteryPct)}`}>
                          {masteryPct}% mastery
                        </span>
                      </div>
                      <p className="text-[11px] text-surface-600">{w.recommendedAction}</p>
                    </div>
                    <Link href={`/learn/${w.nodeId}`} className="btn-ghost text-[10px] flex-shrink-0">
                      Review
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* AI insights */}
        {insights.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-brand-300" />
              <h3 className="text-sm font-semibold text-white">AI Insights</h3>
            </div>
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] text-brand-300 font-bold">{i + 1}</span>
                  </div>
                  <p className="text-xs text-surface-700">{insight}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <Link href={`/exam/${examId}`} className="btn-secondary flex-1 text-xs justify-center">
            <RefreshCw className="w-3.5 h-3.5" />
            Retake Exam
          </Link>
          <Link href="/tutor" className="btn-primary flex-1 text-xs justify-center">
            <Brain className="w-3.5 h-3.5" />
            Ask Prism AI for Help
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
