'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Brain, Flame, TrendingUp, Clock, ChevronRight,
  CheckCircle2, XCircle, RotateCcw, Sparkles, Calendar,
  Award, Target, Zap, BookOpen, Layers,
} from 'lucide-react'
import Link from 'next/link'
import {
  CustomCursor, TiltCard, GlowCard, BorderBeam,
  StaggerContainer, StaggerItem, Spotlight,
  PremiumProgress, AnimatedCounter, PremiumLoader,
} from '@/components/premium'
import { useReviewQueue, useSubmitReview, useReviewStats } from '@/hooks'

export default function PremiumPracticePage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [completed, setCompleted] = useState(0)

  const { data: reviewData, isLoading } = useReviewQueue()
  const submitReview = useSubmitReview()
  const { data: reviewStats } = useReviewStats()

  const queue = reviewData?.items ?? []
  const current = queue[currentIndex]

  function handleAnswer(answer: string) {
    setSelectedAnswer(answer)
    setShowResult(true)
    if (current) {
      const isCorrect = answer === current.correctOption
      submitReview.mutate({
        itemId: current.id,
        quality: isCorrect ? 5 : 2,
        responseTimeSeconds: 10,
      })
    }
  }

  function handleNext() {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setCompleted(completed + 1)
    } else {
      setCompleted(completed + 1)
    }
  }

  const isCorrect = selectedAnswer === current?.correctOption

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-0 mesh-bg flex items-center justify-center">
        <PremiumLoader />
      </div>
    )
  }

  if (queue.length === 0) {
    return (
      <div className="min-h-screen bg-surface-0 mesh-bg">
        <CustomCursor />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <Flame className="w-12 h-12 text-gold-400 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold text-white mb-2">All caught up!</h1>
          <p className="text-sm text-surface-600">No reviews due right now. Come back later or study new topics.</p>
          <Link href="/premium/dashboard" className="btn-primary inline-block mt-6">Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <CustomCursor />

      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/premium/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Spaced Repetition Practice</h1>
          </div>
          <span className="badge-brand">
            <Flame className="w-3 h-3" />
            {completed}/{queue.length} done
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <StaggerContainer stagger={0.1}>
          {/* Progress bar */}
          <StaggerItem>
            <div className="mb-6">
              <div className="flex justify-between text-xs text-surface-600 mb-2">
                <span>Review Session Progress</span>
                <span>{Math.round((currentIndex / queue.length) * 100)}%</span>
              </div>
              <PremiumProgress progress={(currentIndex / queue.length) * 100} />
            </div>
          </StaggerItem>

          {/* Stats row */}
          <StaggerItem>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Clock, label: 'Queue', value: queue.length, color: 'text-brand-300' },
                { icon: TrendingUp, label: 'Retention', value: reviewStats?.retentionRate ?? 0, suffix: '%', color: 'text-mint-300' },
                { icon: Flame, label: 'Streak', value: reviewStats?.streak ?? 0, suffix: 'd', color: 'text-gold-300' },
              ].map((stat, i) => (
                <GlowCard key={i} className="glass-card rounded-xl p-3 text-center" glowSize={100}>
                  <stat.icon className={`w-4 h-4 ${stat.color} mx-auto mb-1`} />
                  <div className="font-display text-lg font-bold text-white">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} />
                  </div>
                  <div className="text-[10px] text-surface-600">{stat.label}</div>
                </GlowCard>
              ))}
            </div>
          </StaggerItem>

          {/* Current card */}
          <StaggerItem>
            <TiltCard maxTilt={4}>
              <BorderBeam className="glass-card rounded-3xl p-6 md:p-8" duration={4}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="badge">{current.subject ?? 'General'}</span>
                  <span className="badge">
                    <Layers className="w-3 h-3" />
                    Interval: {current.intervalDays}d
                  </span>
                </div>

                <h2 className="font-display text-xl font-bold text-white mb-2">{current.conceptName}</h2>
                <p className="text-sm text-surface-600 mb-6">{current.question}</p>

                {current.options ? (
                  <div className="space-y-2.5">
                    {current.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => !showResult && handleAnswer(opt)}
                        disabled={showResult}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 border ${
                          showResult
                            ? opt === current.correctOption
                              ? 'bg-mint-500/15 border-mint-500/40 text-mint-300'
                              : opt === selectedAnswer
                                ? 'bg-red-500/15 border-red-500/40 text-red-300'
                                : 'bg-surface-200/40 border-surface-300/30 text-surface-600'
                            : 'bg-surface-200/40 border-surface-300/30 text-surface-700 hover:border-brand-500/30 hover:bg-surface-200/60 cursor-pointer'
                        }`}
                      >
                        <span className="font-mono text-xs text-surface-500 mr-3">{String.fromCharCode(65 + i)}</span>
                        {opt}
                        {showResult && opt === current.correctOption && <CheckCircle2 className="w-4 h-4 inline ml-2" />}
                        {showResult && opt === selectedAnswer && opt !== current.correctOption && <XCircle className="w-4 h-4 inline ml-2" />}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>
                    <textarea
                      className="input-field min-h-[100px] mb-4"
                      placeholder="Type your answer..."
                      disabled={showResult}
                    />
                    {!showResult && (
                      <button onClick={() => setShowResult(true)} className="btn-primary w-full">
                        Reveal Answer
                      </button>
                    )}
                  </div>
                )}

                <AnimatePresence>
                  {showResult && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-surface-300/30 overflow-hidden"
                    >
                      <div className="flex items-start gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow"><Brain className="w-5 h-5 text-white" /></div>
                        <div className="flex-1">
                          <p className="text-xs text-surface-600 mb-2">
                            <span className="text-brand-300 font-medium">Answer: </span>
                            {current.answer}
                          </p>
                        </div>
                      </div>
                      <button onClick={handleNext} className="btn-primary w-full text-xs">
                        {currentIndex < queue.length - 1 ? 'Next Card' : 'Finish Session'}
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </BorderBeam>
            </TiltCard>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  )
}
