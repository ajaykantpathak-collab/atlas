'use client'

import { motion } from 'framer-motion'
import {
  FileText, Clock, Award, ChevronRight, GraduationCap,
  BookOpen, Filter, Search, TrendingUp, Target, Zap, Play,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import {
  CustomCursor, TiltCard, GlowCard, BorderBeam,
  ScrollReveal, StaggerContainer, StaggerItem,
  Spotlight, AnimatedCounter, MagneticButton, PremiumProgress,
  PremiumLoader,
} from '@/components/premium'
import { useExams } from '@/hooks'

const difficultyColors: Record<string, { bg: string; border: string; text: string }> = {
  Easy: { bg: 'bg-mint-500/10', border: 'border-mint-500/30', text: 'text-mint-300' },
  Moderate: { bg: 'bg-brand-500/10', border: 'border-brand-500/30', text: 'text-brand-300' },
  Hard: { bg: 'bg-gold-500/10', border: 'border-gold-500/30', text: 'text-gold-300' },
  'Board-Level': { bg: 'bg-accent-500/10', border: 'border-accent-500/30', text: 'text-accent-300' },
}

export default function PremiumExamSimulatorPage() {
  const [filter, setFilter] = useState<'all' | 'CBSE' | 'CISCE'>('all')
  const [search, setSearch] = useState('')

  const { data: examsData, isLoading } = useExams()
  const exams = examsData?.exams ?? []

  const filtered = exams.filter((exam) => {
    const matchesBoard = filter === 'all' || exam.board === filter
    const matchesSearch = exam.title.toLowerCase().includes(search.toLowerCase()) ||
      exam.subject.toLowerCase().includes(search.toLowerCase())
    return matchesBoard && matchesSearch
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-0 mesh-bg flex items-center justify-center">
        <PremiumLoader />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <CustomCursor />

      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/premium/dashboard" className="btn-ghost px-2">
              <ChevronRight className="w-4 h-4 rotate-180" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Exam Simulator</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search exams..."
                className="input-field pl-9 text-xs h-9 w-40 sm:w-56"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <StaggerContainer stagger={0.1}>
          {/* Stats */}
          <StaggerItem>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: FileText, label: 'Available Exams', value: exams.length, color: 'text-brand-300', glow: 'rgba(99,102,241,0.2)' },
                { icon: Award, label: 'Completed', value: exams.filter(e => (e.attempts ?? 0) > 0).length, color: 'text-gold-300', glow: 'rgba(251,191,36,0.2)' },
                { icon: Target, label: 'Best Average', value: exams.length > 0 ? Math.round(exams.reduce((acc, e) => acc + (e.bestScore ?? 0), 0) / exams.length) : 0, suffix: '%', color: 'text-mint-300', glow: 'rgba(52,211,153,0.2)' },
                { icon: Clock, label: 'Total Hours', value: Math.round(exams.reduce((acc, e) => acc + e.duration, 0) / 60), suffix: 'h', color: 'text-accent-300', glow: 'rgba(217,70,239,0.2)' },
              ].map((stat, i) => (
                <TiltCard key={i} maxTilt={6}>
                  <GlowCard className="glass-card rounded-xl p-4" glowColor={stat.glow} glowSize={150}>
                    <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
                    <div className="font-display text-xl font-bold text-white">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} />
                    </div>
                    <div className="text-[10px] text-surface-600">{stat.label}</div>
                  </GlowCard>
                </TiltCard>
              ))}
            </div>
          </StaggerItem>

          {/* Filter tabs */}
          <StaggerItem>
            <div className="flex items-center gap-2 mb-6">
              {(['all', 'CBSE', 'CISCE'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    filter === tab
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                      : 'glass text-surface-600 hover:text-white border border-transparent'
                  }`}
                >
                  {tab === 'all' ? 'All Boards' : tab}
                </button>
              ))}
            </div>
          </StaggerItem>

          {/* Exam cards */}
          <StaggerItem>
            <div className="grid md:grid-cols-2 gap-4">
              {filtered.map((exam, i) => {
                const diff = difficultyColors[exam.difficulty]
                return (
                  <ScrollReveal key={exam.examId} direction="up" delay={i * 0.08}>
                    <TiltCard maxTilt={8}>
                      <Spotlight className="glass-card rounded-2xl p-5 cursor-pointer" size={350}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow">
                              <FileText className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium text-white text-sm">{exam.title}</h3>
                              <p className="text-xs text-surface-600">{exam.board} · Class {exam.classLevel} · {exam.subject}</p>
                            </div>
                          </div>
                          <span className={`badge ${diff.bg} ${diff.border} ${diff.text}`}>
                            {exam.difficulty}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-4">
                          <div>
                            <div className="text-[10px] text-surface-600">Duration</div>
                            <div className="text-sm text-white font-medium">{exam.duration}m</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-surface-600">Marks</div>
                            <div className="text-sm text-white font-medium">{exam.totalMarks}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-surface-600">Sections</div>
                            <div className="text-sm text-white font-medium">{exam.sections}</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {exam.topics.slice(0, 3).map((topic, ti) => (
                            <span key={ti} className="text-[10px] px-2 py-0.5 rounded-md bg-surface-200/40 text-surface-600">
                              {topic}
                            </span>
                          ))}
                          {exam.topics.length > 3 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-surface-200/40 text-surface-600">
                              +{exam.topics.length - 3} more
                            </span>
                          )}
                        </div>

                        {exam.bestScore !== null && (
                          <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-surface-600">Best Score</span>
                              <span className="text-brand-300 font-mono">{exam.bestScore}/{exam.totalMarks}</span>
                            </div>
                            <PremiumProgress progress={(exam.bestScore / exam.totalMarks) * 100} height="h-1" />
                          </div>
                        )}

                        <MagneticButton strength={0.2}>
                          <Link href={`/premium/exam/${exam.examId}`}>
                            <button className={`w-full ${exam.attempts > 0 ? 'btn-secondary' : 'btn-primary'} text-xs`}>
                              {exam.attempts > 0 ? (
                                <>
                                  <Play className="w-3 h-3" />
                                  Retry ({exam.attempts} attempts)
                                </>
                              ) : (
                                <>
                                  Start Exam
                                  <ChevronRight className="w-3 h-3" />
                                </>
                              )}
                            </button>
                          </Link>
                        </MagneticButton>
                      </Spotlight>
                    </TiltCard>
                  </ScrollReveal>
                )
              })}
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  )
}
