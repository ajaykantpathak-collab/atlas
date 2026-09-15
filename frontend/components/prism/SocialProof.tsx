'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import { Activity, TrendingUp } from 'lucide-react'

/**
 * LiveCounter — fluctuates to feel "live"
 */
function LiveCounter({ base, label }: { base: number; label: string }) {
  const [count, setCount] = useState(base)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(base + Math.floor(Math.random() * 50) + 10)
    }, 3000)
    return () => clearInterval(interval)
  }, [base])
  return (
    <div className="text-center">
      <motion.div key={count} initial={{ scale: 0.95, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }} className="font-display text-3xl md:text-4xl font-bold text-white">
        {count.toLocaleString('en-IN')}
      </motion.div>
      <div className="text-sm text-surface-600 mt-1">{label}</div>
    </div>
  )
}

const ALL_TESTIMONIALS = [
  { name: 'Aarav', class: 'Class 10, ICSE', text: 'The Socratic tutoring is different from anything I\'ve used. It doesn\'t just give answers — it makes me think. My physics grade went from 62 to 89 in one term.', color: '#38BDF8' },
  { name: 'Priya', class: 'Class 12, ISC', text: 'The streak system got me. 47 days and counting. I open Prism every morning before school. It\'s the first habit I\'ve actually kept.', color: '#FB7185' },
  { name: 'Kabir', class: 'Class 9, ICSE', text: 'I used to hate chemistry. The way Prism breaks down reactions step by step — it just clicks now. I actually look forward to studying.', color: '#4ADE80' },
  { name: 'Ananya', class: 'Class 10, ICSE', text: 'The diagnostic scan told me exactly what I didn\'t know. No more random studying. I focus on my gaps and my scores are proof it works.', color: '#A78BFA' },
  { name: 'Rohan', class: 'Class 11, CBSE', text: 'I was failing maths. Prism\'s learning path showed me I was missing basics from Class 9. Fixed those first, now I\'m scoring 75+.', color: '#22D3EE' },
  { name: 'Diya', class: 'Class 8, ICSE', text: 'The flashcards are addictive. I review them on the bus, during lunch, before bed. My biology teacher asked what changed. Prism changed.', color: '#FB923C' },
  { name: 'Vivaan', class: 'Class 12, ISC', text: 'Board exams in 3 months. Prism\'s countdown reminds me every day. The syllabus tracker shows I\'m at 68%. I know exactly what\'s left.', color: '#FFD700' },
  { name: 'Sara', class: 'Class 10, CBSE', text: 'I tried 5 other apps. None of them teach — they just test. Prism actually explains WHY, not just WHAT. That\'s the difference.', color: '#84CC16' },
]

const ACTIVITIES = [
  { name: 'Aarav', action: 'mastered', topic: 'Quadratic Equations', city: 'Mumbai', color: '#A78BFA' },
  { name: 'Priya', action: 'completed', topic: 'Photosynthesis', city: 'Delhi', color: '#FB7185' },
  { name: 'Kabir', action: 'scored 95% on', topic: 'Chemical Bonding', city: 'Bengaluru', color: '#4ADE80' },
  { name: 'Ananya', action: 'started', topic: 'Newton\'s Laws', city: 'Kolkata', color: '#38BDF8' },
  { name: 'Rohan', action: 'mastered', topic: 'DNA Replication', city: 'Chennai', color: '#FB7185' },
  { name: 'Diya', action: 'completed', topic: 'Trigonometry Basics', city: 'Pune', color: '#A78BFA' },
  { name: 'Vivaan', action: 'earned XP in', topic: 'Organic Chemistry', city: 'Hyderabad', color: '#4ADE80' },
  { name: 'Sara', action: 'mastered', topic: 'Water Cycle', city: 'Jaipur', color: '#22D3EE' },
  { name: 'Ishaan', action: 'started', topic: 'Calculus Limits', city: 'Lucknow', color: '#A78BFA' },
  { name: 'Myra', action: 'scored 90% on', topic: 'Cell Division', city: 'Ahmedabad', color: '#FB7185' },
]

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function SocialProof() {
  const [testimonials, setTestimonials] = useState(ALL_TESTIMONIALS)
  const [visibleIndex, setVisibleIndex] = useState(0)
  const [activities, setActivities] = useState(ACTIVITIES)
  const [currentActivity, setCurrentActivity] = useState(0)

  // Shuffle on mount
  useEffect(() => {
    setTestimonials(shuffle(ALL_TESTIMONIALS))
    setActivities(shuffle(ACTIVITIES))
  }, [])

  // Rotate testimonials every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  // Rotate activity ticker every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentActivity((i) => (i + 1) % activities.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [activities.length])

  const visibleTestimonials = useMemo(() => {
    const result = []
    for (let i = 0; i < 4; i++) {
      result.push(testimonials[(visibleIndex + i) % testimonials.length])
    }
    return result
  }, [testimonials, visibleIndex])

  const activity = activities[currentActivity]

  return (
    <div className="space-y-10">
      {/* Live counters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="glass-card rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        <LiveCounter base={2847} label="Studying now" />
        <LiveCounter base={15420} label="Total learners" />
        <LiveCounter base={1234} label="Mastered this week" />
        <LiveCounter base={89} label="Avg. score increase %" />
      </motion.div>

      {/* Live activity ticker */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="flex items-center gap-3 px-5 py-3 rounded-2xl glass-card overflow-hidden"
      >
        <div className="flex items-center gap-2 flex-shrink-0">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-400"
          />
          <Activity className="w-4 h-4 text-emerald-400" />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentActivity}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="text-sm text-surface-600 whitespace-nowrap"
          >
            <span className="text-white font-medium">{activity.name}</span> from {activity.city}{' '}
            <span style={{ color: activity.color }}>{activity.action}</span>{' '}
            <span className="text-white">{activity.topic}</span>
          </motion.div>
        </AnimatePresence>
        <TrendingUp className="w-4 h-4 text-brand-400 ml-auto flex-shrink-0" />
      </motion.div>

      {/* Rotating testimonials */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="wait">
          {visibleTestimonials.map((t, i) => (
            <motion.div
              key={`${visibleIndex}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: `${t.color}30`, border: `1px solid ${t.color}50`, color: t.color }}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-xs text-surface-600">{t.class}</div>
                </div>
              </div>
              <p className="text-sm text-surface-600 leading-relaxed flex-1">{t.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
