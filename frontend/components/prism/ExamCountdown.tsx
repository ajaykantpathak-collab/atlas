'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { useEffect, useState, useMemo } from 'react'

const CHALLENGES = [
  'Quadratic Equations · 5 questions',
  'Chemical Bonding · 4 questions',
  'Cell Division · 5 questions',
  'Newton\'s Laws · 3 questions',
  'Trigonometry Basics · 5 questions',
  'Photosynthesis · 4 questions',
  'DNA Structure · 3 questions',
  'Thermodynamics · 5 questions',
]

export function ExamCountdown() {
  const [daysLeft, setDaysLeft] = useState(0)
  const [syllabusPct, setSyllabusPct] = useState(12)
  const challenge = useMemo(() => CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)], [])

  useEffect(() => {
    const now = new Date()
    const examDate = new Date(now.getFullYear() + (now.getMonth() >= 2 ? 1 : 0), 1, 27)
    if (examDate < now) examDate.setFullYear(examDate.getFullYear() + 1)
    setDaysLeft(Math.ceil((examDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    setSyllabusPct(Math.floor(Math.random() * 60) + 10)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }} transition={{ duration: 0.8 }}
      className="relative glass-strong rounded-[2rem] p-10 md:p-16 overflow-hidden text-center"
    >
      <div className="absolute inset-0 bg-spectrum-gradient-soft pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
          <Calendar className="w-4 h-4 text-gold-400" />
          <span className="text-sm text-surface-700">Board Exam Countdown</span>
        </div>

        <div className="flex items-center justify-center gap-3 mb-4">
          <Clock className="w-8 h-8 text-gold-400" />
          <motion.div
            key={daysLeft} initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }} transition={{ type: 'spring', stiffness: 200 }}
            className="font-display text-7xl md:text-8xl font-bold text-white"
          >
            {daysLeft}
          </motion.div>
        </div>

        <div className="text-2xl font-display font-bold text-white mb-3">days until your boards.</div>

        <p className="text-surface-600 text-lg max-w-xl mx-auto mb-8">
          Prism tracks your syllabus coverage in real time. Know exactly where you stand —
          and what to study next. No guessing. No wasting time.
        </p>

        {/* Progress bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-xs text-surface-600 mb-2">
            <span>Syllabus covered</span>
            <span className="text-gold-300 font-medium">{syllabusPct}%</span>
          </div>
          <div className="h-3 rounded-full bg-surface-200/40 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-accent-500 rounded-full"
              initial={{ width: 0 }} whileInView={{ width: `${syllabusPct}%` }}
              viewport={{ once: true }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="text-xs text-surface-600 mt-2">
            Today's challenge: <span className="text-white font-medium">{challenge}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
