'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Flame, Zap, Trophy, ArrowRight, Clock, TrendingUp, Brain,
  Target, BookOpen, Award, ChevronRight, Play, Sparkles,
  Calendar, CheckCircle2, Circle, Rocket, Star, Bookmark,
} from 'lucide-react'
import {
  CustomCursor, TiltCard, GlowCard, ScrollReveal,
  AnimatedCounter, Spotlight, BorderBeam, PremiumProgress,
  StaggerContainer, StaggerItem, MagneticButton, GradientOrb,
  PremiumLoader,
} from '@/components/premium'
import { useDashboard, useReviewQueue, useExams } from '@/hooks'
import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

const subjectColors = ['#a855f7', '#34d399', '#c084fc', '#fb7185', '#38bdf8', '#fbbf24', '#d8b4fe', '#fda4af']
const lessonColors = ['from-brand-500 to-brand-700', 'from-mint-500 to-mint-700', 'from-accent-500 to-accent-700', 'from-gold-500 to-gold-700']
const lessonGlows = ['rgba(99,102,241,0.2)', 'rgba(52,211,153,0.2)', 'rgba(217,70,239,0.2)', 'rgba(251,191,36,0.2)']
const activityIcons: Record<string, typeof Target> = { quiz: Target, lesson: BookOpen, graded: Award, exam: Trophy, tutor: Brain }
const activityColors: Record<string, string> = { quiz: 'text-brand-300', lesson: 'text-mint-300', graded: 'text-gold-300', exam: 'text-accent-300', tutor: 'text-brand-300' }

export default function PremiumDashboard() {
  const { data: dashboard, isLoading } = useDashboard()
  const { data: reviewQueue } = useReviewQueue()
  const { data: examsData } = useExams()

  const user = dashboard?.user
  const studentData = {
    name: user?.name ?? 'Student',
    class: user?.classLevel ? `Class ${user.classLevel}` : 'Class 10',
    board: user?.board ?? 'CBSE',
    level: dashboard?.level ?? 1,
    title: 'Scholar',
    totalXP: dashboard?.totalXp ?? 0,
    levelXP: dashboard?.levelXp ?? 0,
    levelMax: dashboard?.levelMax ?? 100,
    streak: dashboard?.streak ?? 0,
  }

  const recommendedLessons = (dashboard?.recommendedLessons ?? []).map((l, i) => ({
    id: i + 1,
    subject: l.subject,
    topic: l.topic,
    chapter: l.chapter,
    progress: l.progress,
    difficulty: l.difficulty,
    time: `${l.estimatedTime} min`,
    icon: '',
    color: lessonColors[i % lessonColors.length],
    glow: lessonGlows[i % lessonGlows.length],
  }))

  const masterySubjects = (dashboard?.masterySubjects ?? []).map((s, i) => ({
    subject: s.subject,
    percent: s.masteryPercentage,
    color: subjectColors[i % subjectColors.length],
  }))

  const recentActivity = (dashboard?.recentActivity ?? []).map((a) => ({
    id: a.id,
    type: a.activityType,
    title: a.title,
    score: a.score ?? '',
    time: a.time,
    icon: activityIcons[a.activityType] ?? Target,
    color: activityColors[a.activityType] ?? 'text-brand-300',
  }))

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-0 mesh-bg flex items-center justify-center">
        <PremiumLoader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-0 mesh-bg overflow-x-hidden">
      <CustomCursor />
      <GradientOrb className="top-0 right-0" size={400} speed={15} />
      <GradientOrb className="bottom-40 left-0" size={300} colors={['#d946ef', '#38bdf8', '#6366f1']} speed={12} />

      <div className="relative" style={{ zIndex: 1 }}>
        {/* Top bar */}
        <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-sm font-bold text-white">Prism</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg glass">
                <Flame className="w-4 h-4 text-gold-400" />
                <span className="text-xs text-white font-medium">{studentData.streak} day streak</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center text-sm shadow-glow">
                {studentData.name[0]}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StaggerContainer stagger={0.08}>
            {/* Greeting + XP */}
            <StaggerItem>
              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                <TiltCard maxTilt={5} className="lg:col-span-2">
                  <GlowCard className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden" glowColor="rgba(99,102,241,0.2)" glowSize={300}>
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-brand-300" />
                      <span className="text-xs text-surface-600 font-medium uppercase tracking-wider">Welcome back</span>
                    </div>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-1">
                      Hi, {studentData.name}!
                    </h1>
                    <p className="text-sm text-surface-600 mb-6">{studentData.board} · {studentData.class} · Level {studentData.level} {studentData.title}</p>

                    <div className="flex items-center gap-6">
                      <div>
                        <div className="font-display text-2xl font-bold text-white">
                          <AnimatedCounter value={studentData.totalXP} suffix=" XP" />
                        </div>
                        <div className="text-xs text-surface-600">Total XP</div>
                      </div>
                      <div className="flex-1 max-w-xs">
                        <div className="flex justify-between text-xs text-surface-600 mb-1.5">
                          <span>Level {studentData.level}</span>
                          <span>{studentData.levelXP} / {studentData.levelMax} XP</span>
                        </div>
                        <PremiumProgress progress={(studentData.levelXP / studentData.levelMax) * 100} />
                      </div>
                    </div>

                    <div className="absolute -top-10 -right-10 opacity-20">
                      <div className="w-16 h-16 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow"><Brain className="w-8 h-8 text-white" /></div>
                    </div>
                  </GlowCard>
                </TiltCard>

                <TiltCard maxTilt={5}>
                  <GlowCard className="glass-card rounded-3xl p-6 h-full" glowColor="rgba(251,191,36,0.2)" glowSize={250}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500 to-accent-600 flex items-center justify-center shadow-glow">
                        <Flame className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-display text-2xl font-bold text-white">{studentData.streak} days</div>
                        <div className="text-xs text-surface-600">Current streak</div>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <div key={i} className={`flex-1 h-9 rounded-lg flex items-center justify-center text-xs font-medium ${
                          i < studentData.streak ? 'bg-gradient-to-b from-gold-500/30 to-accent-600/20 border border-gold-500/40 text-gold-300'
                          : 'bg-surface-200/40 border border-surface-300/20 text-surface-600'
                        }`}>{d}</div>
                      ))}
                    </div>
                  </GlowCard>
                </TiltCard>
              </div>
            </StaggerItem>

            {/* ─── Study Today Widget ─── */}
            <StaggerItem>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Rocket className="w-5 h-5 text-brand-300" />
                  <h2 className="font-display text-xl font-bold text-white">Study Today</h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Review Queue */}
                  <Link href="/progress" className="group">
                    <GlowCard className="glass-card rounded-2xl p-5 h-full" glowColor="rgba(251,191,36,0.15)" glowSize={200}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-accent-600 flex items-center justify-center shadow-glow">
                          <AlertCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-display text-2xl font-bold text-white">
                            <AnimatedCounter value={reviewQueue?.total ?? 0} />
                          </div>
                          <div className="text-xs text-surface-600">Due for review</div>
                        </div>
                      </div>
                      <p className="text-xs text-surface-600 mb-3">
                        {reviewQueue && reviewQueue.total > 0
                          ? `${reviewQueue.total} spaced-repetition items waiting. Review now to boost retention.`
                          : 'All caught up! No items due for review right now.'}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gold-300 group-hover:text-gold-200 transition-colors">
                        Start review <ChevronRight className="w-3 h-3" />
                      </div>
                    </GlowCard>
                  </Link>

                  {/* Recommended lessons count */}
                  <Link href="/learn" className="group">
                    <GlowCard className="glass-card rounded-2xl p-5 h-full" glowColor="rgba(99,102,241,0.15)" glowSize={200}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow">
                          <BookOpen className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-display text-2xl font-bold text-white">
                            <AnimatedCounter value={recommendedLessons.length} />
                          </div>
                          <div className="text-xs text-surface-600">New lessons</div>
                        </div>
                      </div>
                      <p className="text-xs text-surface-600 mb-3">
                        {recommendedLessons.length > 0
                          ? `${recommendedLessons[0].topic} — ${recommendedLessons[0].time}. Start where you left off.`
                          : 'No new recommendations yet. Complete a diagnostic to get personalized suggestions.'}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-brand-300 group-hover:text-brand-200 transition-colors">
                        Continue learning <ChevronRight className="w-3 h-3" />
                      </div>
                    </GlowCard>
                  </Link>

                  {/* Upcoming exams */}
                  <Link href="/exam" className="group">
                    <GlowCard className="glass-card rounded-2xl p-5 h-full" glowColor="rgba(217,70,239,0.15)" glowSize={200}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center shadow-glow">
                          <Trophy className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-display text-2xl font-bold text-white">
                            <AnimatedCounter value={examsData?.exams?.length ?? 0} />
                          </div>
                          <div className="text-xs text-surface-600">Exams available</div>
                        </div>
                      </div>
                      <p className="text-xs text-surface-600 mb-3">
                        {examsData && examsData.exams?.length > 0
                          ? `${examsData.exams[0].title} — ${examsData.exams[0].duration} min. Practice with real exam conditions.`
                          : 'No exams available yet. Check back soon!'}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-accent-300 group-hover:text-accent-200 transition-colors">
                        Try an exam <ChevronRight className="w-3 h-3" />
                      </div>
                    </GlowCard>
                  </Link>
                </div>
              </div>
            </StaggerItem>

            {/* Recommended lessons */}
            <StaggerItem>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-bold text-white">Recommended Next</h2>
                  <button className="text-xs text-brand-300 hover:text-brand-200 transition-colors flex items-center gap-1">
                    View all <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {recommendedLessons.map((lesson, i) => (
                    <TiltCard key={lesson.id} maxTilt={8}>
                      <Spotlight className="glass-card rounded-2xl p-5 cursor-pointer" size={300}>
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${lesson.color} flex items-center justify-center text-xl shadow-glow flex-shrink-0`}>
                            {lesson.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-surface-600 mb-1">{lesson.subject} · {lesson.chapter}</div>
                            <h3 className="font-medium text-white text-sm mb-2 truncate">{lesson.topic}</h3>
                            <div className="flex items-center gap-3 text-xs text-surface-600">
                              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{lesson.time}</span>
                              <span className={`badge ${lesson.difficulty === 'Hard' ? 'badge-warning' : lesson.difficulty === 'Medium' ? 'badge-brand' : 'badge-success'}`}>
                                {lesson.difficulty}
                              </span>
                            </div>
                            {lesson.progress > 0 && (
                              <div className="mt-3">
                                <div className="flex justify-between text-xs text-surface-600 mb-1">
                                  <span>Progress</span>
                                  <span>{lesson.progress}%</span>
                                </div>
                                <PremiumProgress progress={lesson.progress} height="h-1" />
                              </div>
                            )}
                          </div>
                          <ArrowRight className="w-4 h-4 text-surface-600 flex-shrink-0 mt-1" />
                        </div>
                      </Spotlight>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </StaggerItem>

            {/* Mastery + Activity */}
            <StaggerItem>
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Mastery */}
                <BorderBeam className="glass-card rounded-2xl p-6" duration={6}>
                  <div className="flex items-center gap-2 mb-6">
                    <Brain className="w-5 h-5 text-brand-300" />
                    <h3 className="font-display text-lg font-bold text-white">Subject Mastery</h3>
                  </div>
                  <div className="space-y-3">
                    {masterySubjects.map((subject, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-surface-700">{subject.subject}</span>
                          <span className="font-mono text-surface-600">{subject.percent}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-surface-200/40 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: subject.color }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${subject.percent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </BorderBeam>

                {/* Activity */}
                <BorderBeam className="glass-card rounded-2xl p-6" duration={5}>
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="w-5 h-5 text-accent-300" />
                    <h3 className="font-display text-lg font-bold text-white">Recent Activity</h3>
                  </div>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-200/30 transition-colors">
                        <div className={`w-9 h-9 rounded-lg glass flex items-center justify-center ${activity.color}`}>
                          <activity.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white font-medium truncate">{activity.title}</div>
                          <div className="text-xs text-surface-600">{activity.time}</div>
                        </div>
                        <span className={`text-xs font-mono ${activity.color}`}>{activity.score}</span>
                      </div>
                    ))}
                  </div>
                </BorderBeam>
              </div>
            </StaggerItem>

            {/* Quick actions */}
            <StaggerItem>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Brain, label: 'AI Tutor', href: '/tutor', color: 'from-brand-500 to-brand-700', glow: 'rgba(99,102,241,0.2)' },
                  { icon: Target, label: 'Practice', href: '/practice', color: 'from-accent-500 to-accent-700', glow: 'rgba(217,70,239,0.2)' },
                  { icon: Trophy, label: 'Exam Sim', href: '/exam-simulator', color: 'from-gold-500 to-gold-700', glow: 'rgba(251,191,36,0.2)' },
                  { icon: BookOpen, label: 'Learn', href: '/learn', color: 'from-mint-500 to-mint-700', glow: 'rgba(52,211,153,0.2)' },
                ].map((action, i) => (
                  <MagneticButton key={i} strength={0.2}>
                    <a href={action.href} className="block w-full">
                      <GlowCard className="glass-card rounded-2xl p-5 text-center" glowColor={action.glow} glowSize={200}>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-glow mx-auto mb-2`}>
                          <action.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-surface-700 font-medium">{action.label}</span>
                      </GlowCard>
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </div>
  )
}
