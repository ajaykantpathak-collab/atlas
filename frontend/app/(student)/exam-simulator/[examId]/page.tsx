'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock, ChevronLeft, ChevronRight, Flag, AlertTriangle,
  CheckCircle2, Circle, BookOpen, Award, X, Menu, ArrowLeft,
  Loader2, Lock, ListChecks,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useParams } from 'next/navigation'
import { useExam, useSubmitExam } from '@/hooks'
import { useAuthStore } from '@/stores/authStore'
import type {
  ExamDetailSchema,
  ExamQuestionSchema,
  ExamSectionSchema,
  ExamResultSchema,
} from '@/services/assessment.service'

interface ExamQuestion {
  id: string
  question: string
  options?: string[]
  marks: number
  type: 'mcq' | 'short' | 'long' | 'extract' | 'competency'
  sectionId: string
}

interface ExamData {
  examId: string
  title: string
  duration: number
  totalMarks: number
  sections: {
    sectionId: string
    title: string
    marks: number
    instructions: string
    questions: ExamQuestion[]
  }[]
}

function mapExamDetail(detail: ExamDetailSchema): ExamData {
  return {
    examId: detail.examId,
    title: detail.title,
    duration: detail.duration,
    totalMarks: detail.totalMarks,
    sections: detail.sections.map((s: ExamSectionSchema) => ({
      sectionId: s.sectionId,
      title: s.title,
      marks: s.marks,
      instructions: s.instructions,
      questions: s.questions.map((q: ExamQuestionSchema) => ({
        id: q.id,
        question: q.question,
        options: q.options,
        marks: q.marks,
        type: q.type,
        sectionId: s.sectionId,
      })),
    })),
  }
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
        <p className="text-sm text-surface-600 mb-6">Please log in to take this exam.</p>
        <Link href="/login" className="btn-primary w-full justify-center">
          Go to Login
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  )
}

export default function ExamShellPage() {
  const params = useParams()
  const examId = params.examId as string
  const { isAuthenticated } = useAuthStore()
  const { data: examDetail, isLoading, isError, error } = useExam(examId)
  const submitExam = useSubmitExam()

  const exam: ExamData | null = examDetail ? mapExamDetail(examDetail) : null
  const allQuestions: ExamQuestion[] = exam?.sections.flatMap((s) => s.questions) ?? []

  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [timeLeft, setTimeLeft] = useState(0)
  const [showSubmit, setShowSubmit] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<ExamResultSchema | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Initialise timer once exam data loads
  useEffect(() => {
    if (exam && timeLeft === 0) {
      setTimeLeft(exam.duration * 60)
    }
  }, [exam, timeLeft])

  const question = allQuestions[currentQ]
  const section = question ? exam?.sections.find((s) => s.sectionId === question.sectionId) : undefined

  useEffect(() => {
    if (submitted || !exam) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, exam])

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const handleSubmit = () => {
    if (!exam) return
    const payload = {
      examId,
      answers: Object.entries(answers).map(([questionId, answer]) => ({ questionId, answer })),
    }
    setSubmitError(null)
    submitExam.mutate(payload, {
      onSuccess: (res) => {
        setResult(res)
        setSubmitted(true)
        setShowSubmit(false)
      },
      onError: (err) => {
        setSubmitError(err instanceof Error ? err.message : 'Failed to submit exam')
        setShowSubmit(false)
      },
    })
  }

  const toggleFlag = (qid: string) => {
    setFlagged((prev) => {
      const next = new Set(prev)
      if (next.has(qid)) next.delete(qid)
      else next.add(qid)
      return next
    })
  }

  const answeredCount = Object.keys(answers).filter((k) => answers[k]).length
  const progress = allQuestions.length > 0 ? (answeredCount / allQuestions.length) * 100 : 0

  if (!isAuthenticated) {
    return <LoginPrompt />
  }

  if (isLoading) {
    return (
      <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-4 text-surface-600">
        <Loader2 className="w-8 h-8 animate-spin mb-3" />
        <p className="text-sm">Loading exam...</p>
      </div>
    )
  }

  if (isError || !exam) {
    return (
      <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-4">
        <div className="glass-card p-6 max-w-md w-full text-center">
          <AlertTriangle className="w-8 h-8 text-red-300 mx-auto mb-3" />
          <p className="text-sm text-white font-semibold mb-1">Failed to load exam</p>
          <p className="text-xs text-surface-600 mb-4">{(error as Error)?.message || 'Something went wrong.'}</p>
          <Link href="/exam-simulator" className="btn-secondary text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Exams
          </Link>
        </div>
      </div>
    )
  }

  if (allQuestions.length === 0) {
    return (
      <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-4">
        <div className="glass-card p-6 max-w-md w-full text-center">
          <ListChecks className="w-8 h-8 text-surface-600 mx-auto mb-3" />
          <p className="text-sm text-white font-semibold mb-1">No questions available</p>
          <p className="text-xs text-surface-600 mb-4">This exam does not have any questions yet.</p>
          <Link href="/exam-simulator" className="btn-secondary text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Exams
          </Link>
        </div>
      </div>
    )
  }

  if (submitted && result) {
    return <ExamResults exam={exam} result={result} />
  }

  if (submitted && !result) {
    return (
      <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-4 text-surface-600">
        <Loader2 className="w-8 h-8 animate-spin mb-3" />
        <p className="text-sm">Calculating results...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen mesh-bg flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PrismLogo size={28} />
            <button onClick={() => setShowNav(true)} className="btn-ghost px-2 lg:hidden">
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <h1 className="font-display text-sm font-semibold text-white">{exam.title}</h1>
              <p className="text-xs text-surface-600">{exam.totalMarks} marks · {exam.sections.length} sections</p>
            </div>
          </div>

          {/* Timer */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
            timeLeft < 600
              ? 'bg-red-500/10 border-red-500/30 text-red-300 animate-pulse'
              : 'glass border-surface-300/40 text-white'
          }`}>
            <Clock className="w-4 h-4" />
            <span className="font-mono text-sm font-semibold">{formatTime(timeLeft)}</span>
          </div>

          <button
            onClick={() => setShowSubmit(true)}
            className="btn-primary text-xs px-4 py-2"
            disabled={submitExam.isPending}
          >
            {submitExam.isPending ? 'Submitting...' : 'Submit Exam'}
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-surface-300/30">
          <motion.div
            className="h-full bg-brand-gradient"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {submitError && (
        <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 text-xs text-red-300 text-center">
          {submitError}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Question navigator sidebar */}
        <div className="hidden lg:flex w-64 border-r border-surface-300/30 glass flex-col">
          <ExamNavigator
            exam={exam}
            allQuestions={allQuestions}
            currentQ={currentQ}
            answers={answers}
            flagged={flagged}
            onSelect={setCurrentQ}
          />
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {showNav && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowNav(false)}
                className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              />
              <motion.div
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                className="fixed left-0 top-0 bottom-0 w-72 glass-strong border-r border-surface-300/30 z-50 lg:hidden overflow-y-auto"
              >
                <div className="p-4 flex items-center justify-between border-b border-surface-300/30">
                  <span className="text-sm font-semibold text-white">Questions</span>
                  <button onClick={() => setShowNav(false)} className="btn-ghost px-2">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <ExamNavigator
                  exam={exam}
                  allQuestions={allQuestions}
                  currentQ={currentQ}
                  answers={answers}
                  flagged={flagged}
                  onSelect={(i) => {
                    setCurrentQ(i)
                    setShowNav(false)
                  }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main question area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
            {/* Section header */}
            {section && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge-brand">{section.title}</span>
                  <span className="badge">{question.marks} mark{question.marks > 1 ? 's' : ''}</span>
                  <span className="badge capitalize">{question.type}</span>
                </div>
                <p className="text-xs text-surface-600">{section.instructions}</p>
              </div>
            )}

            {/* Question */}
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 mb-6"
            >
              <div className="flex items-start justify-between mb-4">
                <p className="text-lg text-white leading-relaxed flex-1">
                  <span className="text-brand-300 font-semibold mr-2">Q{currentQ + 1}.</span>
                  {question.question}
                </p>
                <button
                  onClick={() => toggleFlag(question.id)}
                  className="ml-3 flex-shrink-0"
                >
                  {flagged.has(question.id) ? (
                    <Flag className="w-5 h-5 text-gold-300 fill-gold-300/30" />
                  ) : (
                    <Flag className="w-5 h-5 text-surface-600" />
                  )}
                </button>
              </div>

              {/* Answer area */}
              {question.type === 'mcq' && question.options ? (
                <div className="space-y-2">
                  {question.options.map((opt, i) => {
                    const letter = String.fromCharCode(65 + i)
                    const selected = answers[question.id] === letter
                    return (
                      <button
                        key={i}
                        onClick={() => setAnswers({ ...answers, [question.id]: letter })}
                        className={`quiz-option ${selected ? 'border-brand-500/50 bg-brand-500/15 text-white' : ''}`}
                      >
                        <span className="font-semibold mr-3">{letter}.</span>
                        {opt}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                  placeholder={`Write your answer here (${question.type === 'short' ? '30-50' : '80-120'} words)...`}
                  rows={question.type === 'short' ? 5 : 10}
                  className="input-field resize-none font-sans"
                />
              )}
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
                className="btn-secondary disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <span className="text-xs text-surface-600">
                {currentQ + 1} of {allQuestions.length}
              </span>

              {currentQ === allQuestions.length - 1 ? (
                <button onClick={() => setShowSubmit(true)} className="btn-primary">
                  Finish & Submit
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQ(Math.min(allQuestions.length - 1, currentQ + 1))}
                  className="btn-primary"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit confirmation modal */}
      <AnimatePresence>
        {showSubmit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setShowSubmit(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-8 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gold-500/15 border border-gold-500/30 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-gold-300" />
                </div>
                <h2 className="font-display text-xl font-bold text-white mb-2">Submit Exam?</h2>
                <p className="text-sm text-surface-600">
                  You answered {answeredCount} of {allQuestions.length} questions.
                  {answeredCount < allQuestions.length && (
                    <span className="block mt-1 text-gold-300">
                      {allQuestions.length - answeredCount} questions left unanswered.
                    </span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 rounded-xl bg-surface-200/30">
                  <CheckCircle2 className="w-4 h-4 text-mint-300 mx-auto mb-1" />
                  <p className="text-xs text-surface-600">Answered</p>
                  <p className="text-sm font-bold text-white">{answeredCount}</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-surface-200/30">
                  <Circle className="w-4 h-4 text-surface-600 mx-auto mb-1" />
                  <p className="text-xs text-surface-600">Unanswered</p>
                  <p className="text-sm font-bold text-white">{allQuestions.length - answeredCount}</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-surface-200/30">
                  <Flag className="w-4 h-4 text-gold-300 mx-auto mb-1" />
                  <p className="text-xs text-surface-600">Flagged</p>
                  <p className="text-sm font-bold text-white">{flagged.size}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowSubmit(false)}
                  className="btn-secondary flex-1"
                  disabled={submitExam.isPending}
                >
                  Keep Working
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn-primary flex-1"
                  disabled={submitExam.isPending}
                >
                  {submitExam.isPending ? 'Submitting...' : 'Submit Now'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ExamNavigator({
  exam,
  allQuestions,
  currentQ,
  answers,
  flagged,
  onSelect,
}: {
  exam: ExamData
  allQuestions: ExamQuestion[]
  currentQ: number
  answers: Record<string, string>
  flagged: Set<string>
  onSelect: (i: number) => void
}) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {exam.sections.map((section) => (
        <div key={section.sectionId} className="mb-6">
          <p className="text-xs font-semibold text-surface-600 uppercase tracking-wide mb-3">
            {section.title}
          </p>
          <div className="grid grid-cols-5 gap-2">
            {section.questions.map((q) => {
              const globalIdx = allQuestions.findIndex((aq) => aq.id === q.id)
              const isAnswered = !!answers[q.id]
              const isFlagged = flagged.has(q.id)
              const isCurrent = globalIdx === currentQ

              return (
                <button
                  key={q.id}
                  onClick={() => onSelect(globalIdx)}
                  className={`relative aspect-square rounded-lg text-xs font-medium transition-all ${
                    isCurrent
                      ? 'bg-brand-500/25 border border-brand-500/50 text-white'
                      : isAnswered
                      ? 'bg-mint-500/15 border border-mint-500/30 text-mint-300'
                      : 'glass border-surface-300/30 text-surface-600 hover:text-white'
                  }`}
                >
                  {globalIdx + 1}
                  {isFlagged && (
                    <Flag className="absolute -top-1 -right-1 w-2.5 h-2.5 text-gold-300 fill-gold-300/40" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="border-t border-surface-300/20 pt-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-surface-600">
          <div className="w-3 h-3 rounded bg-mint-500/30 border border-mint-500/40" />
          Answered
        </div>
        <div className="flex items-center gap-2 text-xs text-surface-600">
          <div className="w-3 h-3 rounded glass border border-surface-300/30" />
          Not answered
        </div>
        <div className="flex items-center gap-2 text-xs text-surface-600">
          <Flag className="w-3 h-3 text-gold-300" />
          Flagged for review
        </div>
      </div>
    </div>
  )
}

function ExamResults({ exam, result }: { exam: ExamData; result: ExamResultSchema }) {
  const allQuestions = exam.sections.flatMap((s) => s.questions)

  const pct = result.percentage
  const timeTakenMin = Math.round(result.timeTaken / 60)

  return (
    <div className="min-h-screen mesh-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="w-20 h-20 rounded-full bg-brand-gradient flex items-center justify-center shadow-glow-lg mx-auto mb-4"
          >
            <Award className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Exam Complete!</h1>
          <p className="text-surface-600 text-sm">{exam.title}</p>
        </motion.div>

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-6"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-xs text-surface-600 mb-1">Total Score</p>
              <p className="font-display text-3xl font-bold gradient-text">
                {result.totalScore}/{result.maxScore}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-surface-600 mb-1">Percentage</p>
              <p className="font-display text-3xl font-bold text-white">{pct.toFixed(1)}%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-surface-600 mb-1">Time Taken</p>
              <p className="font-display text-3xl font-bold text-white">{timeTakenMin}m</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-surface-600 mb-1">Questions</p>
              <p className="font-display text-3xl font-bold text-white">{allQuestions.length}</p>
            </div>
          </div>
        </motion.div>

        {/* Section-wise breakdown */}
        {result.sectionScores.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 mb-6"
          >
            <h3 className="font-display text-lg font-semibold text-white mb-4">Section-wise Performance</h3>
            <div className="space-y-4">
              {result.sectionScores.map((sw) => {
                const section = exam.sections.find((s) => s.sectionId === sw.sectionId)
                const sp = (sw.score / sw.maxScore) * 100
                return (
                  <div key={sw.sectionId}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-surface-700">{section?.title || `Section ${sw.sectionId}`}</span>
                      <span className="text-sm font-medium text-white">{sw.score}/{sw.maxScore}</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-300/40 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${sp}%` }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className={`h-full rounded-full ${
                          sp >= 75 ? 'bg-mint-500/60' : sp >= 50 ? 'bg-gold-500/60' : 'bg-red-500/60'
                        }`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Weakness breakdown */}
        {result.weaknessAreas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 mb-6"
          >
            <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-gold-300" />
              Weakness Breakdown
            </h3>
            <div className="space-y-3">
              {result.weaknessAreas.map((w, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-surface-200/30">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{w.conceptName}</p>
                    <p className="text-xs text-surface-600 mt-1">{w.recommendedAction}</p>
                  </div>
                  <div className="text-right">
                    <div className="w-20 h-2 rounded-full bg-surface-300/40 overflow-hidden mb-1">
                      <div
                        className="h-full rounded-full bg-red-500/60"
                        style={{ width: `${w.masteryProbability * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-surface-600">{Math.round(w.masteryProbability * 100)}% mastery</p>
                  </div>
                  <Link
                    href={`/learn/${w.nodeId}`}
                    className="btn-secondary text-xs px-3 py-1.5"
                  >
                    Review
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/exam-simulator" className="btn-secondary flex-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Exams
          </Link>
          <Link href="/tutor" className="btn-primary flex-1">
            <BookOpen className="w-4 h-4" />
            Get AI Tutor Help
          </Link>
        </div>
      </div>
    </div>
  )
}
