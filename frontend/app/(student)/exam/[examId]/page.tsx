'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock, ChevronLeft, ChevronRight, Flag, AlertCircle,
  CheckCircle2, Circle, ArrowLeft, ListChecks, Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useParams, useRouter } from 'next/navigation'
import { useExam, useSubmitExam } from '@/hooks'
import { useAuthStore } from '@/stores/authStore'
import type { ExamDetailSchema, ExamQuestionSchema, ExamSectionSchema } from '@/services/assessment.service'

function LoginPrompt() {
  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 max-w-md w-full text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow mx-auto mb-4">
          <ListChecks className="w-8 h-8 text-white" />
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
  const router = useRouter()
  const examId = params.examId as string
  const { isAuthenticated } = useAuthStore()
  const { data: exam, isLoading, isError, error } = useExam(examId)
  const submitExam = useSubmitExam()

  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [flagged, setFlagged] = useState<Set<string>>(new Set())
  const [timeLeft, setTimeLeft] = useState(0)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const sections: ExamSectionSchema[] = exam?.sections ?? []
  const allQuestions: ExamQuestionSchema[] = sections.flatMap((s) => s.questions)
  const totalQuestions = allQuestions.length

  // Initialise timer once exam data loads
  useEffect(() => {
    if (exam && timeLeft === 0) {
      setTimeLeft(exam.duration * 60)
    }
  }, [exam, timeLeft])

  useEffect(() => {
    if (showInstructions || !exam) return
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showInstructions, exam])

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const sec = s % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const question = allQuestions[currentQ]
  const section = question ? sections.find((s) => s.questions.some((q) => q.id === question.id)) : undefined

  const answeredCount = Object.keys(answers).filter((k) => answers[k]?.trim()).length
  const flaggedCount = flagged.size

  const handleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev)
      if (next.has(question.id)) next.delete(question.id)
      else next.add(question.id)
      return next
    })
  }

  const goNext = () => {
    if (currentQ < totalQuestions - 1) setCurrentQ(currentQ + 1)
  }

  const goPrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1)
  }

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (!exam) return
    const payload = {
      examId,
      answers: Object.entries(answers).map(([questionId, answer]) => ({ questionId, answer })),
    }
    setSubmitError(null)
    submitExam.mutate(payload, {
      onSuccess: (result) => {
        try {
          sessionStorage.setItem(`exam-result-${examId}`, JSON.stringify(result))
        } catch {
          // ignore storage errors
        }
        router.push(`/exam/${examId}/results`)
      },
      onError: (err) => {
        setSubmitError(err instanceof Error ? err.message : 'Failed to submit exam')
        setShowSubmitModal(false)
      },
    })
  }

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
          <AlertCircle className="w-8 h-8 text-red-300 mx-auto mb-3" />
          <p className="text-sm text-white font-semibold mb-1">Failed to load exam</p>
          <p className="text-xs text-surface-600 mb-4">{(error as Error)?.message || 'Something went wrong.'}</p>
          <Link href="/exam" className="btn-secondary text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Exams
          </Link>
        </div>
      </div>
    )
  }

  if (totalQuestions === 0) {
    return (
      <div className="min-h-screen mesh-bg flex flex-col items-center justify-center p-4">
        <div className="glass-card p-6 max-w-md w-full text-center">
          <ListChecks className="w-8 h-8 text-surface-600 mx-auto mb-3" />
          <p className="text-sm text-white font-semibold mb-1">No questions available</p>
          <p className="text-xs text-surface-600 mb-4">This exam does not have any questions yet.</p>
          <Link href="/exam" className="btn-secondary text-xs">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Exams
          </Link>
        </div>
      </div>
    )
  }

  if (showInstructions) {
    const totalMarks = exam.totalMarks
    const hours = Math.floor(exam.duration / 60)
    const mins = exam.duration % 60
    const durationLabel = `${hours > 0 ? `${hours}h ` : ''}${mins > 0 ? `${mins}m` : ''}`.trim() || `${exam.duration}m`
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 max-w-2xl w-full"
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow mx-auto mb-4">
              <ListChecks className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-white">{exam.title}</h1>
            <p className="text-sm text-surface-600 mt-2">{exam.board} Class {exam.classLevel} · {totalMarks} Marks · {durationLabel}</p>
          </div>

          <div className="space-y-4 mb-6">
            <h2 className="text-sm font-semibold text-white">Instructions</h2>
            {[
              `Total duration: ${durationLabel} (${exam.duration} minutes). Timer starts when you click "Start Exam".`,
              `The question paper contains ${sections.length} section${sections.length > 1 ? 's' : ''}. All sections are compulsory.`,
              ...sections.map(
                (s) =>
                  `${s.title}: ${s.questionCount} question${s.questionCount > 1 ? 's' : ''} of ${s.marks} marks total. ${s.instructions}`
              ),
              'Attempt all questions. Use the flag button to mark questions for review.',
              'You can navigate between questions using the panel on the right.',
              'The exam will auto-submit when the timer reaches zero.',
              'Do not refresh or close the browser during the exam.',
            ].map((inst, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[10px] text-brand-300 font-bold">{i + 1}</span>
                </div>
                <p className="text-xs text-surface-700">{inst}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/exam" className="btn-secondary flex-1 text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Link>
            <button onClick={() => setShowInstructions(false)} className="btn-primary flex-1 text-xs">
              Start Exam
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col mesh-bg">
      {/* Top bar */}
      <div className="glass-strong border-b border-surface-300/30 z-30">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PrismLogo size={28} />
            <h1 className="font-display text-sm font-semibold text-white hidden sm:block">{exam.title}</h1>
            <span className="badge text-[10px] hidden sm:block">{exam.board} Class {exam.classLevel}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
              timeLeft < 300 ? 'bg-red-500/20 text-red-300' : 'bg-surface-200/40 text-white'
            }`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono text-sm font-semibold">{formatTime(timeLeft)}</span>
            </div>
            <button
              onClick={() => setShowSubmitModal(true)}
              className="btn-primary text-xs"
              disabled={submitExam.isPending}
            >
              {submitExam.isPending ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>

      {submitError && (
        <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 text-xs text-red-300 text-center">
          {submitError}
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
            {/* Section header */}
            {section && (
              <div className="glass-card p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold text-white">{section.title}</h2>
                    <p className="text-[10px] text-surface-600 mt-0.5">{section.instructions}</p>
                  </div>
                  <span className="badge-brand text-[10px]">{section.marks} marks</span>
                </div>
              </div>
            )}

            {/* Question */}
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-surface-600">
                    Question {currentQ + 1} of {totalQuestions}
                  </span>
                  <span className="badge text-[10px]">{question.marks} mark{question.marks > 1 ? 's' : ''}</span>
                  {question.type === 'mcq' && <span className="badge-accent text-[10px]">MCQ</span>}
                  {question.type === 'short' && <span className="badge-warning text-[10px]">Short Answer</span>}
                  {question.type === 'long' && <span className="badge-brand text-[10px]">Long Answer</span>}
                  {question.type === 'extract' && <span className="badge-accent text-[10px]">Extract</span>}
                  {question.type === 'competency' && <span className="badge-brand text-[10px]">Competency</span>}
                </div>
                <button
                  onClick={toggleFlag}
                  className={`p-1.5 rounded-lg transition-all ${
                    flagged.has(question.id) ? 'bg-gold-500/20 text-gold-300' : 'text-surface-600 hover:text-white hover:bg-surface-200/30'
                  }`}
                >
                  <Flag className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm text-white leading-relaxed mb-6">{question.question}</p>

              {/* MCQ options */}
              {question.options && question.options.length > 0 && (
                <div className="space-y-3">
                  {question.options.map((opt, i) => {
                    const letter = String.fromCharCode(65 + i)
                    const isSelected = answers[question.id] === letter
                    return (
                      <button
                        key={i}
                        onClick={() => handleAnswer(letter)}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-brand-500/15 border-brand-500/40 text-white'
                            : 'bg-surface-200/20 border-surface-300/20 text-surface-700 hover:border-surface-300/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            isSelected ? 'bg-brand-500 text-white' : 'bg-surface-300/40 text-surface-600'
                          }`}>
                            {letter}
                          </div>
                          <span className="text-sm">{opt}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Text answer */}
              {(!question.options || question.options.length === 0) && (
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder={`Write your answer here... (${question.marks} marks)`}
                  rows={question.type === 'long' ? 10 : 6}
                  className="input-field resize-none"
                />
              )}
            </motion.div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={goPrev}
                disabled={currentQ === 0}
                className="btn-secondary text-xs disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Previous
              </button>
              <span className="text-[10px] text-surface-600">
                {answeredCount}/{totalQuestions} answered · {flaggedCount} flagged
              </span>
              {currentQ === totalQuestions - 1 ? (
                <button onClick={() => setShowSubmitModal(true)} className="btn-primary text-xs">
                  Finish & Submit
                </button>
              ) : (
                <button onClick={goNext} className="btn-primary text-xs">
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Question palette */}
        <div className="hidden lg:block w-72 glass-strong border-l border-surface-300/30 overflow-y-auto p-4">
          <h3 className="text-xs font-semibold text-white mb-4">Question Palette</h3>
          {sections.map((sec, si) => {
            const sectionQuestionIndices = allQuestions
              .map((q, idx) => ({ q, idx }))
              .filter(({ q }) => sec.questions.some((sq) => sq.id === q.id))
            return (
              <div key={si} className="mb-6">
                <p className="text-[10px] text-surface-600 mb-2">{sec.title}</p>
                <div className="grid grid-cols-5 gap-2">
                  {sectionQuestionIndices.map(({ q, idx }) => {
                    const isAnswered = !!answers[q.id]?.trim()
                    const isFlagged = flagged.has(q.id)
                    const isCurrent = idx === currentQ
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQ(idx)}
                        className={`relative w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                          isCurrent
                            ? 'ring-2 ring-brand-500'
                            : ''
                        } ${
                          isAnswered
                            ? 'bg-mint-500/20 text-mint-300'
                            : 'bg-surface-200/30 text-surface-600'
                        }`}
                      >
                        {idx + 1}
                        {isFlagged && (
                          <Flag className="absolute -top-1 -right-1 w-2.5 h-2.5 text-gold-300 fill-current" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Legend */}
          <div className="space-y-2 mt-6 pt-4 border-t border-surface-300/20">
            <div className="flex items-center gap-2 text-[10px] text-surface-600">
              <div className="w-4 h-4 rounded bg-mint-500/20" /> Answered
            </div>
            <div className="flex items-center gap-2 text-[10px] text-surface-600">
              <div className="w-4 h-4 rounded bg-surface-200/30" /> Not Answered
            </div>
            <div className="flex items-center gap-2 text-[10px] text-surface-600">
              <Flag className="w-3 h-3 text-gold-300" /> Flagged for Review
            </div>
          </div>
        </div>
      </div>

      {/* Submit modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowSubmitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-6 max-w-md w-full"
            >
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/15 flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-7 h-7 text-gold-300" />
                </div>
                <h2 className="font-display text-lg font-bold text-white">Submit Exam?</h2>
                <p className="text-sm text-surface-600 mt-2">
                  You have answered {answeredCount} out of {totalQuestions} questions.
                  {answeredCount < totalQuestions && (
                    <span className="block text-gold-300 mt-1">
                      {totalQuestions - answeredCount} questions are unanswered.
                    </span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="glass-card p-3 text-center">
                  <CheckCircle2 className="w-4 h-4 text-mint-300 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">{answeredCount}</p>
                  <p className="text-[9px] text-surface-600">Answered</p>
                </div>
                <div className="glass-card p-3 text-center">
                  <Circle className="w-4 h-4 text-surface-600 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">{totalQuestions - answeredCount}</p>
                  <p className="text-[9px] text-surface-600">Unanswered</p>
                </div>
                <div className="glass-card p-3 text-center">
                  <Flag className="w-4 h-4 text-gold-300 mx-auto mb-1" />
                  <p className="text-xs font-bold text-white">{flaggedCount}</p>
                  <p className="text-[9px] text-surface-600">Flagged</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="btn-secondary flex-1 text-xs"
                  disabled={submitExam.isPending}
                >
                  Keep Going
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn-primary flex-1 text-xs"
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
