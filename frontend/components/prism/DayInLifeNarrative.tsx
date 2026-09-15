'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sunrise, Coffee, BookOpen, Brain, Moon, ArrowRight } from 'lucide-react'
import Link from 'next/link'

/**
 * DayInLifeNarrative — scrolling story of a student's day with Prism.
 * Shows how Prism fits into a real student's life — not just features.
 * Randomized student name and details on each load.
 */

const STUDENTS = [
  { name: 'Aarav', class: 'Class 10', board: 'CBSE', subject: 'Physics', topic: 'Newton\'s Laws', city: 'Pune' },
  { name: 'Diya', class: 'Class 12', board: 'ISC', subject: 'Chemistry', topic: 'Chemical Bonding', city: 'Bengaluru' },
  { name: 'Kabir', class: 'Class 9', board: 'ICSE', subject: 'Mathematics', topic: 'Quadratic Equations', city: 'Delhi' },
  { name: 'Ananya', class: 'Class 11', board: 'CBSE', subject: 'Biology', topic: 'Cell Structure', city: 'Mumbai' },
  { name: 'Vihaan', class: 'Class 10', board: 'ICSE', subject: 'Physics', topic: 'Electricity', city: 'Hyderabad' },
  { name: 'Saanvi', class: 'Class 12', board: 'CBSE', subject: 'Mathematics', topic: 'Calculus', city: 'Chennai' },
  { name: 'Arjun', class: 'Class 8', board: 'CBSE', subject: 'Science', topic: 'Photosynthesis', city: 'Kolkata' },
  { name: 'Ishita', class: 'Class 11', board: 'ISC', subject: 'Computer Science', topic: 'Data Structures', city: 'Jaipur' },
]

const TIMES = [
  { time: '7:00 AM', icon: Sunrise, title: 'Morning Scan', color: '#FB923C',
    story: (s: typeof STUDENTS[0]) => `${s.name} opens Prism. A 3-minute diagnostic scan shows they're strong in Algebra but shaky in ${s.topic}. Prism suggests starting there.`,
  },
  { time: '9:15 AM', icon: Coffee, title: 'Quick Review', color: '#FBBF24',
    story: (s: typeof STUDENTS[0]) => `On the bus to school, ${s.name} flips through 5 flashcards from yesterday's ${s.subject} session. Two were due today — Prism's spaced repetition knows exactly when to bring them back.`,
  },
  { time: '4:00 PM', icon: BookOpen, title: 'After School Session', color: '#38BDF8',
    story: (s: typeof STUDENTS[0]) => `Back from school. ${s.name} opens the ${s.topic} lesson. Prism AI doesn't just give answers — it asks questions. "What do you think happens when..." ${s.name} types their guess. Prism guides them to the right answer.`,
  },
  { time: '7:30 PM', icon: Brain, title: 'Practice & XP', color: '#A78BFA',
    story: (s: typeof STUDENTS[0]) => `Dinner done. ${s.name} tackles 5 practice questions on ${s.topic}. Gets 4 right. Earns 40 XP. Streak: 12 days. Level 7. The leaderboard shows they passed their friend this week.`,
  },
  { time: '10:00 PM', icon: Moon, title: 'Wind Down', color: '#818CF8',
    story: (s: typeof STUDENTS[0]) => `Before bed, ${s.name} checks tomorrow's plan. Prism has queued: review 3 flashcards, finish ${s.topic}, start the next chapter. ${s.name} sleeps knowing exactly what to study tomorrow.`,
  },
]

export function DayInLifeNarrative() {
  const [student, setStudent] = useState(STUDENTS[0])
  const { scrollYProgress } = useScroll()
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    setStudent(STUDENTS[Math.floor(Math.random() * STUDENTS.length)])
  }, [])

  return (
    <div className="max-w-3xl mx-auto">
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="badge-brand mb-6">A Day With Prism</div>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
          Meet <span className="spectrum-text">{student.name}.</span>
        </h2>
        <p className="text-surface-600 text-lg">
          {student.class} · {student.board} · {student.city}
        </p>
        <p className="text-surface-600 text-sm mt-2 max-w-xl mx-auto">
          A typical day with Prism AI — from morning scan to bedtime plan.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-surface-300/30 -translate-x-1/2" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-spectrum-gradient -translate-x-1/2 origin-top"
        />

        {TIMES.map((t, i) => {
          const isLeft = i % 2 === 0
          const Icon = t.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6 }}
              className={`relative flex items-center mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Node */}
              <div
                className="absolute left-8 md:left-1/2 w-10 h-10 rounded-full flex items-center justify-center -translate-x-1/2 z-10 border-2 border-surface-200/40"
                style={{ background: `${t.color}20`, boxShadow: `0 0 15px ${t.color}40` }}
              >
                <Icon className="w-4 h-4" style={{ color: t.color }} />
              </div>

              {/* Card */}
              <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="glass-card rounded-2xl p-5">
                  <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ background: `${t.color}15`, color: t.color }}>
                      {t.time}
                    </span>
                    <span className="text-xs text-surface-600">{t.title}</span>
                  </div>
                  <p className="text-sm text-surface-700 leading-relaxed">
                    {t.story(student)}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="text-center mt-12"
      >
        <p className="text-surface-600 mb-6">
          This could be <span className="text-white font-medium">your</span> day.
        </p>
        <Link href="/signup" className="btn-primary inline-flex items-center gap-2">
          Start Your Story <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  )
}
