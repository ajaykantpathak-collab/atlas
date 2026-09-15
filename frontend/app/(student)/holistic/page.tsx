'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft, Heart, Brain, Users, Activity, Moon, Apple,
  Dumbbell, BookOpen, Smile, Eye, Zap, TrendingUp,
  Sparkles, ChevronRight, Calendar, CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useState } from 'react'

interface WellnessMetric {
  name: string
  score: number
  icon: typeof Heart
  color: string
  bgColor: string
  status: 'excellent' | 'good' | 'fair' | 'needs-attention'
  recommendation: string
}

const wellnessMetrics: WellnessMetric[] = [
  { name: 'Physical Health', score: 75, icon: Activity, color: 'text-mint-300', bgColor: 'bg-mint-500/15', status: 'good', recommendation: 'Increase daily outdoor activity to 45 minutes' },
  { name: 'Mental Wellbeing', score: 82, icon: Heart, color: 'text-red-300', bgColor: 'bg-red-500/15', status: 'excellent', recommendation: 'Continue mindfulness practices' },
  { name: 'Sleep Quality', score: 68, icon: Moon, color: 'text-brand-300', bgColor: 'bg-brand-500/15', status: 'fair', recommendation: 'Aim for 8-9 hours of sleep consistently' },
  { name: 'Social Skills', score: 70, icon: Users, color: 'text-accent-300', bgColor: 'bg-accent-500/15', status: 'good', recommendation: 'Participate in group study sessions' },
  { name: 'Nutrition', score: 65, icon: Apple, color: 'text-gold-300', bgColor: 'bg-gold-500/15', status: 'fair', recommendation: 'Add more protein and hydration to your diet' },
  { name: 'Focus & Energy', score: 78, icon: Zap, color: 'text-brand-300', bgColor: 'bg-brand-500/15', status: 'good', recommendation: 'Take 5-min breaks every 25 minutes (Pomodoro)' },
]

const statusColors: Record<string, string> = {
  'excellent': 'text-mint-300 bg-mint-500/10 border-mint-500/30',
  'good': 'text-brand-300 bg-brand-500/10 border-brand-500/30',
  'fair': 'text-gold-300 bg-gold-500/10 border-gold-500/30',
  'needs-attention': 'text-red-300 bg-red-500/10 border-red-500/30',
}

const dailyActivities = [
  { id: 1, title: 'Morning meditation', time: '07:00', category: 'mindfulness', duration: '10 min', done: true, icon: Heart },
  { id: 2, title: 'Outdoor walk', time: '08:00', category: 'physical', duration: '30 min', done: true, icon: Activity },
  { id: 3, title: 'Study session — Science', time: '10:00', category: 'academic', duration: '45 min', done: true, icon: BookOpen },
  { id: 4, title: 'Eye rest break', time: '10:45', category: 'wellness', duration: '5 min', done: true, icon: Eye },
  { id: 5, title: 'Lunch + hydration', time: '12:00', category: 'nutrition', duration: '30 min', done: false, icon: Apple },
  { id: 6, title: 'Group study — Math', time: '15:00', category: 'social', duration: '60 min', done: false, icon: Users },
  { id: 7, title: 'Evening exercise', time: '17:00', category: 'physical', duration: '30 min', done: false, icon: Dumbbell },
  { id: 8, title: 'Journal reflection', time: '20:00', category: 'mindfulness', duration: '10 min', done: false, icon: Smile },
]

const categoryColors: Record<string, string> = {
  mindfulness: 'text-red-300 bg-red-500/15',
  physical: 'text-mint-300 bg-mint-500/15',
  academic: 'text-brand-300 bg-brand-500/15',
  wellness: 'text-accent-300 bg-accent-500/15',
  nutrition: 'text-gold-300 bg-gold-500/15',
  social: 'text-accent-300 bg-accent-500/15',
}

const moodData = [
  { day: 'Mon', mood: 7, energy: 6 },
  { day: 'Tue', mood: 8, energy: 7 },
  { day: 'Wed', mood: 6, energy: 5 },
  { day: 'Thu', mood: 7, energy: 8 },
  { day: 'Fri', mood: 9, energy: 7 },
  { day: 'Sat', mood: 8, energy: 9 },
  { day: 'Sun', mood: 7, energy: 6 },
]

export default function HolisticPage() {
  const [activities, setActivities] = useState(dailyActivities)

  const toggleActivity = (id: number) => {
    setActivities((prev) => prev.map((a) => a.id === id ? { ...a, done: !a.done } : a))
  }

  const completedCount = activities.filter((a) => a.done).length
  const overallScore = Math.round(wellnessMetrics.reduce((sum, m) => sum + m.score, 0) / wellnessMetrics.length)

  return (
    <div className="min-h-screen mesh-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-lg font-semibold text-white">Holistic Development</h1>
          </div>
          <span className="badge-success">
            <Sparkles className="w-3 h-3" />
            Wellness Score: {overallScore}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overall wellness gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-300/30" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#wellness-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 50 * (1 - overallScore / 100) }}
                  transition={{ duration: 1.2 }}
                />
                <defs>
                  <linearGradient id="wellness-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{overallScore}</span>
                <span className="text-[10px] text-surface-600">out of 100</span>
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-display text-xl font-bold text-white mb-2">Your Wellness Profile</h2>
              <p className="text-sm text-surface-600 mb-3">
                Holistic development tracks your physical, mental, social, and academic wellbeing — because a healthy student learns better.
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="badge-success">Mental: Excellent</span>
                <span className="badge-warning">Sleep: Needs work</span>
                <span className="badge-brand">Physical: Good</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Wellness metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {wellnessMetrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${statusColors[metric.status]}`}>
                  {metric.status.replace('-', ' ')}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white mb-1">{metric.name}</h4>
              <div className="flex items-end gap-1 mb-2">
                <span className="text-2xl font-bold text-white">{metric.score}</span>
                <span className="text-xs text-surface-600 mb-1">/100</span>
              </div>
              <div className="h-2 rounded-full bg-surface-300/40 overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.score}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className={`h-full rounded-full ${metric.bgColor.replace('/15', '/60')}`}
                />
              </div>
              <p className="text-[10px] text-surface-600 italic">{metric.recommendation}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Mood & energy tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="font-display text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Smile className="w-4 h-4 text-gold-300" />
              Mood & Energy This Week
            </h3>
            <div className="space-y-3">
              {moodData.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-surface-600 w-8">{d.day}</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-red-300 w-12">Mood</span>
                      <div className="flex-1 h-3 rounded-full bg-surface-300/30 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${d.mood * 10}%` }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="h-full rounded-full bg-red-500/50"
                        />
                      </div>
                      <span className="text-[10px] text-white w-4">{d.mood}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-brand-300 w-12">Energy</span>
                      <div className="flex-1 h-3 rounded-full bg-surface-300/30 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${d.energy * 10}%` }}
                          transition={{ duration: 0.6, delay: i * 0.1 + 0.05 }}
                          className="h-full rounded-full bg-brand-500/50"
                        />
                      </div>
                      <span className="text-[10px] text-white w-4">{d.energy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Daily routine checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-sm font-semibold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-300" />
                Today's Routine
              </h3>
              <span className="text-xs text-surface-600">{completedCount}/{activities.length} done</span>
            </div>
            <div className="space-y-2">
              {activities.map((act) => (
                <button
                  key={act.id}
                  onClick={() => toggleActivity(act.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                    act.done ? 'bg-mint-500/10 border border-mint-500/20' : 'bg-surface-200/30 hover:bg-surface-200/50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${
                    act.done ? 'bg-mint-500/30 border-mint-500/50' : 'border-surface-300/40'
                  }`}>
                    {act.done && <CheckCircle2 className="w-3 h-3 text-mint-300" />}
                  </div>
                  <div className={`w-8 h-8 rounded-lg ${categoryColors[act.category]} flex items-center justify-center flex-shrink-0`}>
                    <act.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${act.done ? 'text-surface-600 line-through' : 'text-white'}`}>
                      {act.title}
                    </p>
                    <p className="text-[10px] text-surface-600">{act.time} · {act.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* AI wellness coach */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="font-display text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-300" />
            AI Wellness Coach Recommendations
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: 'Improve Sleep Schedule', desc: 'You\'re sleeping 6.5h on average. Try sleeping by 10:30 PM for better retention.', priority: 'High', color: 'text-red-300' },
              { title: 'Add Hydration Reminders', desc: 'Your water intake is below recommended. Aim for 2-3 liters daily.', priority: 'Medium', color: 'text-gold-300' },
              { title: 'Practice Eye Rest', desc: 'Follow the 20-20-20 rule: every 20 min, look 20 ft away for 20 seconds.', priority: 'Medium', color: 'text-brand-300' },
              { title: 'Social Learning Boost', desc: 'Join a group study session to improve social skills and collaborative learning.', priority: 'Low', color: 'text-mint-300' },
            ].map((rec, i) => (
              <div key={i} className="p-4 rounded-xl bg-surface-200/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white">{rec.title}</h4>
                  <span className={`text-[10px] ${rec.color}`}>{rec.priority}</span>
                </div>
                <p className="text-xs text-surface-600">{rec.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
