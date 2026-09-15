'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, GraduationCap, Check, Sparkles } from 'lucide-react'

const BOARDS = ['CBSE', 'ICSE', 'ISC', 'State Board'] as const
const CLASSES = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`)

const SUBJECTS_BY_BOARD: Record<string, string[]> = {
  CBSE: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi', 'Sanskrit', 'Computer Science', 'Physics', 'Chemistry', 'Biology'],
  ICSE: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Computer Science', 'Economics', 'Environmental Science'],
  ISC: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science', 'Economics', 'Commerce', 'Accountancy', 'Biotechnology'],
  'State Board': ['Mathematics', 'Science', 'Social Studies', 'Language', 'English', 'Computer Science'],
}

export function BoardSelector() {
  const [board, setBoard] = useState<string | null>(null)
  const [className, setClassName] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [subjects, setSubjects] = useState<string[]>([])

  // Randomize greeting on each load
  const [greeting, setGreeting] = useState('')
  useEffect(() => {
    const greetings = [
      'Pick your board. See your path.',
      'Which board are you on?',
      'Tell us your class. We\'ll show you the way.',
      'Your board. Your class. Your Prism.',
    ]
    setGreeting(greetings[Math.floor(Math.random() * greetings.length)])
  }, [])

  function handleGo() {
    if (!board || !className) return
    const subs = SUBJECTS_BY_BOARD[board] || []
    setSubjects(subs)
    setShowResult(true)
  }

  function reset() {
    setBoard(null)
    setClassName(null)
    setShowResult(false)
    setSubjects([])
  }

  return (
    <div className="glass-card rounded-2xl p-5 max-w-md w-full">
      {!showResult ? (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-brand-300" />
            <span className="text-sm font-medium text-white">{greeting}</span>
          </div>

          {/* Board selection */}
          <div className="mb-4">
            <label className="text-xs text-surface-600 mb-2 block">Your Board</label>
            <div className="grid grid-cols-2 gap-2">
              {BOARDS.map((b) => (
                <button
                  key={b}
                  onClick={() => setBoard(b)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    board === b
                      ? 'bg-spectrum-gradient text-white shadow-glow'
                      : 'bg-surface-200/40 border border-surface-300/30 text-surface-700 hover:border-brand-500/40 hover:text-white'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Class selection */}
          <div className="mb-5">
            <label className="text-xs text-surface-600 mb-2 block">Your Class</label>
            <div className="grid grid-cols-4 gap-1.5">
              {CLASSES.map((c) => {
                const num = c.replace('Class ', '')
                return (
                  <button
                    key={c}
                    onClick={() => setClassName(c)}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                      className === c
                        ? 'bg-brand-500/30 border border-brand-500/50 text-white'
                        : 'bg-surface-200/40 border border-surface-300/20 text-surface-600 hover:text-white hover:border-surface-400/40'
                    }`}
                  >
                    {num}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            onClick={handleGo}
            disabled={!board || !className}
            className="w-full px-4 py-3 rounded-xl bg-spectrum-gradient text-white text-sm font-semibold shadow-glow disabled:opacity-40 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            See My Learning Path
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-semibold text-white">
              {board} · {className}
            </span>
            <button
              onClick={reset}
              className="ml-auto text-xs text-surface-600 hover:text-white transition-colors"
            >
              Change
            </button>
          </div>

          <p className="text-xs text-surface-600 mb-3">Your subjects in {className}:</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {subjects.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="text-xs px-2.5 py-1 rounded-full bg-surface-200/40 border border-surface-300/30 text-surface-700"
              >
                {s}
              </motion.span>
            ))}
          </div>

          <div className="text-xs text-surface-600 mb-3 p-3 rounded-xl bg-surface-200/20 border border-surface-300/20">
            <span className="text-brand-300 font-medium">Prism AI</span> will personalize your learning path, diagnostic scans, and practice questions for {board} {className}. Every topic mapped to your syllabus.
          </div>

          <a
            href="/signup"
            className="w-full px-4 py-3 rounded-xl bg-spectrum-gradient text-white text-sm font-semibold shadow-glow hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            Start Learning Free <Sparkles className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </div>
  )
}
