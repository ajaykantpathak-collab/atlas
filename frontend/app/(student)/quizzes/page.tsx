'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Clock, CheckCircle2, XCircle, ChevronRight,
  Trophy, Flame, Target, Brain, Sparkles, RotateCcw,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useState } from 'react'

interface Quiz {
  id: string
  title: string
  subject: string
  questions: number
  duration: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  bestScore?: number
}

const quizzes: Quiz[] = [
  { id: 'q1', title: 'Real Numbers Quick Quiz', subject: 'Mathematics', questions: 10, duration: '10 min', difficulty: 'Easy', bestScore: 90 },
  { id: 'q2', title: 'Polynomials Challenge', subject: 'Mathematics', questions: 15, duration: '15 min', difficulty: 'Medium', bestScore: 73 },
  { id: 'q3', title: 'Life Processes', subject: 'Science', questions: 20, duration: '20 min', difficulty: 'Medium' },
  { id: 'q4', title: 'French Revolution', subject: 'Social Studies', questions: 12, duration: '12 min', difficulty: 'Easy', bestScore: 85 },
  { id: 'q5', title: 'Grammar Mastery', subject: 'English', questions: 25, duration: '25 min', difficulty: 'Hard', bestScore: 68 },
  { id: 'q6', title: 'Chemical Reactions', subject: 'Science', questions: 15, duration: '15 min', difficulty: 'Hard' },
]

export default function QuizzesPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)

  return (
    <div className="min-h-screen mesh-bg">
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Quizzes</h1>
          </div>
          <span className="badge-brand text-[10px]">6 Available</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 text-center">
            <Trophy className="w-5 h-5 text-gold-300 mx-auto mb-1" />
            <p className="text-lg font-bold text-white">4</p>
            <p className="text-[10px] text-surface-600">Completed</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card p-4 text-center">
            <Target className="w-5 h-5 text-brand-300 mx-auto mb-1" />
            <p className="text-lg font-bold text-white">79%</p>
            <p className="text-[10px] text-surface-600">Avg Score</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4 text-center">
            <Flame className="w-5 h-5 text-orange-300 mx-auto mb-1" />
            <p className="text-lg font-bold text-white">3</p>
            <p className="text-[10px] text-surface-600">Day Streak</p>
          </motion.div>
        </div>

        {/* Quiz list */}
        <div className="space-y-3">
          {quizzes.map((quiz, i) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="glass-card-hover p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-brand-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">{quiz.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-surface-600">
                    <span>{quiz.subject}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {quiz.duration}</span>
                    <span>{quiz.questions} Qs</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] ${
                      quiz.difficulty === 'Easy' ? 'bg-mint-500/15 text-mint-300' :
                      quiz.difficulty === 'Medium' ? 'bg-gold-500/15 text-gold-300' :
                      'bg-red-500/15 text-red-300'
                    }`}>{quiz.difficulty}</span>
                  </div>
                </div>
                {quiz.bestScore !== undefined && (
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-white">{quiz.bestScore}%</p>
                    <p className="text-[9px] text-surface-600">Best</p>
                  </div>
                )}
                <button
                  onClick={() => setSelectedQuiz(quiz)}
                  className="btn-primary text-xs flex-shrink-0"
                >
                  Start
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Start quiz modal */}
      <AnimatePresence>
        {selectedQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedQuiz(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-6 max-w-sm w-full"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-brand-300" />
              </div>
              <h3 className="font-display text-lg font-bold text-white text-center mb-1">{selectedQuiz.title}</h3>
              <p className="text-xs text-surface-600 text-center mb-6">{selectedQuiz.subject}</p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center">
                  <Brain className="w-4 h-4 text-surface-600 mx-auto mb-1" />
                  <p className="text-sm font-bold text-white">{selectedQuiz.questions}</p>
                  <p className="text-[9px] text-surface-600">Questions</p>
                </div>
                <div className="text-center">
                  <Clock className="w-4 h-4 text-surface-600 mx-auto mb-1" />
                  <p className="text-sm font-bold text-white">{selectedQuiz.duration}</p>
                  <p className="text-[9px] text-surface-600">Duration</p>
                </div>
                <div className="text-center">
                  <Target className="w-4 h-4 text-surface-600 mx-auto mb-1" />
                  <p className="text-sm font-bold text-white">{selectedQuiz.difficulty}</p>
                  <p className="text-[9px] text-surface-600">Level</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setSelectedQuiz(null)} className="btn-secondary flex-1 text-xs">
                  Cancel
                </button>
                <button className="btn-primary flex-1 text-xs">
                  Start Quiz
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
