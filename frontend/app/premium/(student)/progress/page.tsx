'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft, TrendingUp, Brain, Target, Clock, Award,
  BookOpen, Zap, Flame, ChevronRight, BarChart3, PieChart,
  Activity, Calendar, Download,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import {
  CustomCursor, TiltCard, GlowCard, BorderBeam,
  ScrollReveal, StaggerContainer, StaggerItem,
  Spotlight, AnimatedCounter, PremiumProgress, PremiumLoader,
} from '@/components/premium'
import {
  useProgressOverview, useSubjectMastery, useWeeklyActivity,
  useMilestones, useStudyHeatmap,
} from '@/hooks'

const subjectColorMap: Record<string, { color: string; glow: string }> = {
  'Science': { color: 'text-brand-300', glow: 'rgba(99,102,241,0.2)' },
  'Mathematics': { color: 'text-accent-300', glow: 'rgba(217,70,239,0.2)' },
  'English': { color: 'text-gold-300', glow: 'rgba(251,191,36,0.2)' },
  'Social Science': { color: 'text-mint-300', glow: 'rgba(52,211,153,0.2)' },
  'Hindi': { color: 'text-red-300', glow: 'rgba(248,113,113,0.2)' },
}
const defaultSubjectColor = { color: 'text-brand-300', glow: 'rgba(99,102,241,0.2)' }

const milestoneIconMap: Record<string, typeof Target> = { mastery: Target, quiz: Award, streak: Flame, level: Zap, exam: Award }
const milestoneColorMap: Record<string, string> = { mastery: 'text-brand-300', quiz: 'text-accent-300', streak: 'text-gold-300', level: 'text-brand-300', exam: 'text-mint-300' }

export default function PremiumProgressPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('week')

  const { data: overview, isLoading } = useProgressOverview(timeRange)
  const { data: subjectsData } = useSubjectMastery()
  const { data: weeklyData } = useWeeklyActivity()
  const { data: milestonesData } = useMilestones()

  const subjects = (subjectsData ?? []).map((s) => {
    const colors = subjectColorMap[s.subject] ?? defaultSubjectColor
    return { ...s, ...colors }
  })

  const activityData = weeklyData ?? []
  const recentMilestones = (milestonesData ?? []).map((m) => ({
    title: m.title,
    subject: m.subject,
    time: m.time,
    icon: milestoneIconMap[m.icon] ?? Target,
    color: milestoneColorMap[m.icon] ?? 'text-brand-300',
  }))

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
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Progress Analytics</h1>
          </div>
          <div className="flex items-center gap-2">
            {(['week', 'month', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  timeRange === range ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' : 'text-surface-600 hover:text-white'
                }`}
              >
                {range === 'week' ? 'Week' : range === 'month' ? 'Month' : 'All Time'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <StaggerContainer stagger={0.1}>
          {/* Overview stats */}
          <StaggerItem>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: BookOpen, label: 'Total Nodes', value: overview?.totalNodes ?? 0, color: 'text-brand-300', glow: 'rgba(99,102,241,0.2)' },
                { icon: Target, label: 'Mastered', value: overview?.masteredNodes ?? 0, color: 'text-mint-300', glow: 'rgba(52,211,153,0.2)' },
                { icon: Clock, label: 'Study Time', value: overview?.studyTimeHours ?? 0, suffix: 'h', color: 'text-gold-300', glow: 'rgba(251,191,36,0.2)' },
                { icon: TrendingUp, label: 'Avg Mastery', value: overview?.avgMastery ?? 0, suffix: '%', color: 'text-accent-300', glow: 'rgba(217,70,239,0.2)' },
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

          {/* Activity chart */}
          <StaggerItem>
            <BorderBeam className="glass-card rounded-2xl p-6 mb-6" duration={6}>
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-brand-300" />
                <h3 className="font-display text-lg font-bold text-white">Weekly Activity</h3>
              </div>
              <div className="flex items-end justify-between gap-2 h-40">
                {activityData.map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      className="w-full rounded-t-lg bg-brand-gradient"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${day.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      style={{ minHeight: '4px' }}
                    />
                    <span className="text-xs text-surface-600">{day.day}</span>
                  </div>
                ))}
              </div>
            </BorderBeam>
          </StaggerItem>

          {/* Subject breakdown */}
          <StaggerItem>
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <BorderBeam className="glass-card rounded-2xl p-6" duration={5}>
                <div className="flex items-center gap-2 mb-6">
                  <PieChart className="w-5 h-5 text-accent-300" />
                  <h3 className="font-display text-lg font-bold text-white">Subject Mastery</h3>
                </div>
                <div className="space-y-4">
                  {subjects.map((subject, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm ${subject.color}`}>{subject.subject}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-surface-600 font-mono">{subject.masteryPercentage}%</span>
                          <span className={`text-xs ${subject.weeklyChange > 0 ? 'text-mint-300' : 'text-red-300'}`}>
                            {subject.weeklyChange > 0 ? '+' : ''}{subject.weeklyChange}%
                          </span>
                        </div>
                      </div>
                      <PremiumProgress
                        progress={subject.masteryPercentage}
                        color={`linear-gradient(90deg, ${subject.color.includes('brand') ? '#6366f1' : subject.color.includes('accent') ? '#d946ef' : subject.color.includes('gold') ? '#fbbf24' : subject.color.includes('mint') ? '#34d399' : '#f87171'}, ${subject.color.includes('brand') ? '#818cf8' : subject.color.includes('accent') ? '#e879f9' : subject.color.includes('gold') ? '#fcd34d' : subject.color.includes('mint') ? '#6ee7b7' : '#fca5a5'})`}
                      />
                    </div>
                  ))}
                </div>
              </BorderBeam>

              <BorderBeam className="glass-card rounded-2xl p-6" duration={4}>
                <div className="flex items-center gap-2 mb-6">
                  <Award className="w-5 h-5 text-gold-300" />
                  <h3 className="font-display text-lg font-bold text-white">Recent Milestones</h3>
                </div>
                <div className="space-y-3">
                  {recentMilestones.map((milestone, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-200/30 transition-colors">
                      <div className={`w-9 h-9 rounded-lg glass flex items-center justify-center ${milestone.color}`}>
                        <milestone.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white font-medium truncate">{milestone.title}</div>
                        <div className="text-xs text-surface-600">{milestone.subject} · {milestone.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </BorderBeam>
            </div>
          </StaggerItem>

          {/* Heatmap */}
          <StaggerItem>
            <BorderBeam className="glass-card rounded-2xl p-6" duration={5}>
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-mint-300" />
                <h3 className="font-display text-lg font-bold text-white">Study Heatmap</h3>
              </div>
              <div className="grid grid-cols-[repeat(12,1fr)] gap-1.5">
                {Array.from({ length: 84 }, (_, i) => {
                  const intensity = Math.random()
                  return (
                    <motion.div
                      key={i}
                      className="aspect-square rounded-sm"
                      style={{
                        backgroundColor: intensity > 0.7 ? '#6366f1' : intensity > 0.4 ? '#6366f160' : intensity > 0.2 ? '#6366f130' : '#1a1a26'
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.005 }}
                    />
                  )
                })}
              </div>
              <div className="flex items-center justify-between mt-4 text-xs text-surface-600">
                <span>12 weeks ago</span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  <div className="w-3 h-3 rounded-sm bg-surface-200/40" />
                  <div className="w-3 h-3 rounded-sm bg-brand-500/30" />
                  <div className="w-3 h-3 rounded-sm bg-brand-500/60" />
                  <div className="w-3 h-3 rounded-sm bg-brand-500" />
                  <span>More</span>
                </div>
                <span>Today</span>
              </div>
            </BorderBeam>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  )
}
