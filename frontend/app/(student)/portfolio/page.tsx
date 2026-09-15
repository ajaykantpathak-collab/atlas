'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft, Download, Share2, Award, Brain, BookOpen,
  Target, TrendingUp, Star, FileText, CheckCircle2, Clock,
  Sparkles, GraduationCap, Trophy, Zap,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useState } from 'react'

const portfolioData = {
  student: {
    name: 'Aarav Sharma',
    board: 'CBSE',
    classLevel: 10,
    school: 'Delhi Public School',
    enrollmentDate: '2025-06-15',
  },
  summary: {
    totalLessons: 142,
    totalHours: 127,
    masteryScore: 45,
    examAverage: 78,
    streakDays: 16,
    achievementsUnlocked: 12,
  },
  subjects: [
    { name: 'Science', mastery: 56, mastered: 180, total: 320, grade: 'A' },
    { name: 'Mathematics', mastery: 43, mastered: 120, total: 280, grade: 'B+' },
    { name: 'English', mastery: 63, mastered: 95, total: 150, grade: 'A' },
    { name: 'Social Science', mastery: 30, mastered: 60, total: 200, grade: 'B' },
    { name: 'Hindi', mastery: 33, mastered: 40, total: 120, grade: 'B' },
  ],
  topAchievements: [
    { title: 'Chapter Champion', tier: 'silver', date: '2025-07-25' },
    { title: 'Century Club', tier: 'silver', date: '2025-07-20' },
    { title: 'Socratic Scholar', tier: 'silver', date: '2025-07-28' },
    { title: 'Sharp Shooter', tier: 'silver', date: '2025-07-19' },
  ],
  examHistory: [
    { title: 'Science Pre-Board 2025', score: 68, max: 80, date: '2025-07-28', grade: 'A' },
    { title: 'Math Pre-Board 2025', score: 54, max: 80, date: '2025-07-26', grade: 'B+' },
    { title: 'Light — Chapter Test', score: 26, max: 30, date: '2025-07-22', grade: 'A' },
    { title: 'Electricity — Chapter Test', score: 18, max: 30, date: '2025-07-20', grade: 'B' },
  ],
  skills: [
    { name: 'Critical Thinking', level: 82, icon: Brain },
    { name: 'Problem Solving', level: 75, icon: Target },
    { name: 'Reading Comprehension', level: 88, icon: BookOpen },
    { name: 'Time Management', level: 65, icon: Clock },
    { name: 'Analytical Reasoning', level: 70, icon: TrendingUp },
  ],
  recommendations: [
    'Focus on Social Science — mastery is below 35%',
    'Practice more Mathematics problems to improve from 43%',
    'Maintain your 16-day streak — you\'re on track for the Month Master achievement',
    'Consider taking the English Pre-Board to maintain your strong performance',
  ],
}

const gradeColors: Record<string, string> = {
  'A': 'text-mint-300 bg-mint-500/10 border-mint-500/30',
  'A+': 'text-mint-300 bg-mint-500/10 border-mint-500/30',
  'B+': 'text-brand-300 bg-brand-500/10 border-brand-500/30',
  'B': 'text-gold-300 bg-gold-500/10 border-gold-500/30',
  'C': 'text-red-300 bg-red-500/10 border-red-500/30',
}

export default function PortfolioPage() {
  const [showExport, setShowExport] = useState(false)

  return (
    <div className="min-h-screen mesh-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-lg font-semibold text-white">Mastery Portfolio</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowExport(!showExport)} className="btn-ghost text-xs">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
            <button className="btn-primary text-xs">
              <Download className="w-3.5 h-3.5" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow flex-shrink-0">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-2xl font-bold text-white">{portfolioData.student.name}</h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="badge-brand">{portfolioData.student.board} Class {portfolioData.student.classLevel}</span>
                <span className="badge">{portfolioData.student.school}</span>
                <span className="badge">Since {portfolioData.student.enrollmentDate}</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold gradient-text">{portfolioData.summary.masteryScore}%</p>
              <p className="text-xs text-surface-600">Overall Mastery</p>
            </div>
          </div>
        </motion.div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Lessons Completed', value: portfolioData.summary.totalLessons, icon: BookOpen, color: 'text-brand-300' },
            { label: 'Study Hours', value: portfolioData.summary.totalHours, icon: Clock, color: 'text-accent-300' },
            { label: 'Exam Average', value: `${portfolioData.summary.examAverage}%`, icon: Target, color: 'text-mint-300' },
            { label: 'Day Streak', value: portfolioData.summary.streakDays, icon: Zap, color: 'text-gold-300' },
            { label: 'Achievements', value: portfolioData.summary.achievementsUnlocked, icon: Trophy, color: 'text-accent-300' },
            { label: 'Mastery Score', value: `${portfolioData.summary.masteryScore}%`, icon: Brain, color: 'text-brand-300' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-4 flex items-center gap-3"
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <p className="text-xs text-surface-600">{stat.label}</p>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subject mastery table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <h3 className="font-display text-sm font-semibold text-white mb-4">Subject Mastery</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-300/20">
                  <th className="text-left text-xs text-surface-600 font-medium py-3">Subject</th>
                  <th className="text-left text-xs text-surface-600 font-medium py-3">Mastery</th>
                  <th className="text-left text-xs text-surface-600 font-medium py-3 hidden sm:table-cell">Nodes</th>
                  <th className="text-right text-xs text-surface-600 font-medium py-3">Grade</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.subjects.map((s, i) => (
                  <tr key={i} className="border-b border-surface-300/10">
                    <td className="py-3 text-sm text-white">{s.name}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-surface-300/40 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${s.mastery}%` }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="h-full rounded-full bg-brand-gradient"
                          />
                        </div>
                        <span className="text-xs text-white">{s.mastery}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-xs text-surface-600 hidden sm:table-cell">{s.mastered}/{s.total}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold border ${gradeColors[s.grade]}`}>
                        {s.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="font-display text-sm font-semibold text-white mb-4">Skill Development</h3>
            <div className="space-y-4">
              {portfolioData.skills.map((skill, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <skill.icon className="w-4 h-4 text-brand-300" />
                      <span className="text-xs text-surface-700">{skill.name}</span>
                    </div>
                    <span className="text-xs font-medium text-white">{skill.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-300/40 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full rounded-full bg-accent-gradient"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="font-display text-sm font-semibold text-white mb-4">Top Achievements</h3>
            <div className="space-y-3">
              {portfolioData.topAchievements.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-200/30">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
                    <Award className="w-4 h-4 text-gold-300" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-white">{a.title}</p>
                    <p className="text-[10px] text-surface-600">{a.date}</p>
                  </div>
                  <span className="text-[10px] uppercase text-gold-300">{a.tier}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Exam history */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <h3 className="font-display text-sm font-semibold text-white mb-4">Exam History</h3>
          <div className="space-y-3">
            {portfolioData.examHistory.map((exam, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-surface-200/30">
                <div className="w-10 h-10 rounded-lg bg-brand-500/15 border border-brand-500/30 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-brand-300" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{exam.title}</p>
                  <p className="text-[10px] text-surface-600">{exam.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{exam.score}/{exam.max}</p>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${gradeColors[exam.grade]}`}>
                    {exam.grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="font-display text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-300" />
            AI Recommendations
          </h3>
          <div className="space-y-2">
            {portfolioData.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-surface-200/30">
                <CheckCircle2 className="w-4 h-4 text-mint-300 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-surface-700">{rec}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
