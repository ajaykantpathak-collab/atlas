'use client'

import { motion } from 'framer-motion'
import { Flame, Zap, Target, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'

/**
 * DashboardPreview — animated mockup. Randomized on each load.
 */

const CHALLENGES = [
  { topic: 'Quadratic Equations', count: '5 questions', subject: 'Maths' },
  { topic: 'Chemical Bonding', count: '4 questions', subject: 'Chemistry' },
  { topic: 'Cell Division', count: '5 questions', subject: 'Biology' },
  { topic: 'Newton\'s Laws', count: '3 questions', subject: 'Physics' },
  { topic: 'Data Structures', count: '5 questions', subject: 'CS' },
  { topic: 'Monsoon Climate', count: '4 questions', subject: 'Geography' },
]

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function DashboardPreview() {
  const [data, setData] = useState({
    xp: 3280,
    level: 14,
    streak: 12,
    mastery: [
      { label: 'Phy', percent: 78, color: '#38BDF8' },
      { label: 'Chem', percent: 65, color: '#4ADE80' },
      { label: 'Bio', percent: 82, color: '#FB7185' },
      { label: 'Math', percent: 91, color: '#A78BFA' },
    ],
    challenge: CHALLENGES[0],
  })

  useEffect(() => {
    setData({
      xp: rand(1800, 5200),
      level: rand(8, 22),
      streak: rand(3, 47),
      mastery: [
        { label: 'Phy', percent: rand(45, 95), color: '#38BDF8' },
        { label: 'Chem', percent: rand(40, 90), color: '#4ADE80' },
        { label: 'Bio', percent: rand(50, 95), color: '#FB7185' },
        { label: 'Math', percent: rand(55, 98), color: '#A78BFA' },
      ],
      challenge: CHALLENGES[rand(0, CHALLENGES.length - 1)],
    })
  }, [])

  return (
    <div className="glass-card rounded-3xl p-6 max-w-md w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-xs text-surface-600">Welcome back,</div>
          <div className="text-lg font-display font-bold text-white">Scholar</div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30">
          <Flame className="w-4 h-4 text-gold-400" />
          <span className="text-sm font-bold text-gold-300">{data.streak}</span>
          <span className="text-xs text-surface-600">day streak</span>
        </div>
      </div>

      {/* XP Bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-400" />
            <span className="text-sm font-medium text-white">{data.xp.toLocaleString('en-IN')} XP</span>
          </div>
          <span className="text-xs text-surface-600">Level {data.level}</span>
        </div>
        <div className="h-2.5 rounded-full bg-surface-200/40 overflow-hidden">
          <motion.div
            className="h-full bg-spectrum-gradient rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${rand(40, 85)}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ animation: 'spectrumShift 3s ease infinite', backgroundSize: '200% 100%' }}
          />
        </div>
      </div>

      {/* Mastery rings */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {data.mastery.map((s, i) => {
          const circumference = 2 * Math.PI * 28
          const offset = circumference - (s.percent / 100) * circumference
          return (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="relative w-16 h-16">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                  <motion.circle cx="32" cy="32" r="28" fill="none" stroke={s.color} strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: offset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-xs font-bold text-white">{s.percent}%</span>
                </div>
              </div>
              <span className="text-[10px] text-surface-600 font-medium">{s.label}</span>
            </div>
          )
        })}
      </div>

      {/* Today's challenge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ delay: 0.5 }}
        className="flex items-center gap-3 p-3 rounded-2xl bg-spectrum-gradient-soft border border-brand-500/20"
      >
        <div className="w-10 h-10 rounded-xl bg-spectrum-gradient flex items-center justify-center shadow-glow">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-white">Today's Challenge</div>
          <div className="text-xs text-surface-600">{data.challenge.topic} · {data.challenge.count}</div>
        </div>
        <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <TrendingUp className="w-4 h-4 text-brand-400" />
        </motion.div>
      </motion.div>
    </div>
  )
}
