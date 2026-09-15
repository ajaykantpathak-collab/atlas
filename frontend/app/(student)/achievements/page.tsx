'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft, Award, Flame, Zap, Star, Trophy, Target,
  BookOpen, Brain, Crown, Shield, Sparkles, TrendingUp,
  Lock, CheckCircle2, ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'

interface Achievement {
  id: string
  title: string
  description: string
  icon: typeof Award
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  category: 'streak' | 'mastery' | 'speed' | 'volume' | 'accuracy' | 'special'
  unlocked: boolean
  progress?: number
  maxProgress?: number
  xpReward: number
}

const tierColors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  bronze: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-300', icon: 'text-orange-400' },
  silver: { bg: 'bg-slate-400/10', border: 'border-slate-400/30', text: 'text-slate-300', icon: 'text-slate-400' },
  gold: { bg: 'bg-gold-500/10', border: 'border-gold-500/30', text: 'text-gold-300', icon: 'text-gold-400' },
  platinum: { bg: 'bg-accent-500/10', border: 'border-accent-500/30', text: 'text-accent-300', icon: 'text-accent-400' },
}

// Achievements are goals — computed from real user data where possible
function useAchievements(): Achievement[] {
  const { user } = useAuthStore()
  const xp = user?.total_xp || 0
  const streak = user?.streak_days || 0
  const level = user?.current_level || 1

  return [
    { id: 'a1', title: 'First Steps', description: 'Reach Level 1', icon: BookOpen, tier: 'bronze', category: 'volume', unlocked: level >= 1, xpReward: 50 },
    { id: 'a2', title: 'On Fire', description: 'Maintain a 3-day streak', icon: Flame, tier: 'bronze', category: 'streak', unlocked: streak >= 3, progress: Math.min(streak, 3), maxProgress: 3, xpReward: 100 },
    { id: 'a3', title: 'Week Warrior', description: 'Maintain a 7-day streak', icon: Flame, tier: 'silver', category: 'streak', unlocked: streak >= 7, progress: Math.min(streak, 7), maxProgress: 7, xpReward: 250 },
    { id: 'a4', title: 'Month Master', description: 'Maintain a 30-day streak', icon: Flame, tier: 'gold', category: 'streak', unlocked: streak >= 30, progress: Math.min(streak, 30), maxProgress: 30, xpReward: 500 },
    { id: 'a5', title: 'Century Club', description: 'Earn 100 XP', icon: BookOpen, tier: 'bronze', category: 'volume', unlocked: xp >= 100, progress: Math.min(xp, 100), maxProgress: 100, xpReward: 50 },
    { id: 'a6', title: 'Rising Star', description: 'Earn 500 XP', icon: BookOpen, tier: 'silver', category: 'volume', unlocked: xp >= 500, progress: Math.min(xp, 500), maxProgress: 500, xpReward: 200 },
    { id: 'a7', title: 'Knowledge Seeker', description: 'Earn 1,000 XP', icon: BookOpen, tier: 'silver', category: 'volume', unlocked: xp >= 1000, progress: Math.min(xp, 1000), maxProgress: 1000, xpReward: 300 },
    { id: 'a8', title: 'Scholar', description: 'Earn 5,000 XP', icon: BookOpen, tier: 'gold', category: 'volume', unlocked: xp >= 5000, progress: Math.min(xp, 5000), maxProgress: 5000, xpReward: 750 },
    { id: 'a9', title: 'Level Up', description: 'Reach Level 5', icon: TrendingUp, tier: 'bronze', category: 'mastery', unlocked: level >= 5, progress: Math.min(level, 5), maxProgress: 5, xpReward: 150 },
    { id: 'a10', title: 'Master Mind', description: 'Reach Level 10', icon: Brain, tier: 'silver', category: 'mastery', unlocked: level >= 10, progress: Math.min(level, 10), maxProgress: 10, xpReward: 400 },
    { id: 'a11', title: 'Socratic Scholar', description: 'Reach Level 15', icon: Sparkles, tier: 'gold', category: 'mastery', unlocked: level >= 15, progress: Math.min(level, 15), maxProgress: 15, xpReward: 600 },
    { id: 'a12', title: 'Board Boss', description: 'Reach Level 20', icon: Trophy, tier: 'platinum', category: 'special', unlocked: level >= 20, progress: Math.min(level, 20), maxProgress: 20, xpReward: 2000 },
    { id: 'a13', title: 'Unstoppable', description: 'Maintain a 100-day streak', icon: Flame, tier: 'platinum', category: 'streak', unlocked: streak >= 100, progress: Math.min(streak, 100), maxProgress: 100, xpReward: 3000 },
    { id: 'a14', title: 'Legend', description: 'Reach 10,000 XP', icon: Crown, tier: 'platinum', category: 'special', unlocked: xp >= 10000, progress: Math.min(xp, 10000), maxProgress: 10000, xpReward: 5000 },
  ]
}

const categories = [
  { id: 'all', label: 'All', icon: Trophy },
  { id: 'streak', label: 'Streaks', icon: Flame },
  { id: 'mastery', label: 'Levels', icon: Brain },
  { id: 'volume', label: 'XP', icon: BookOpen },
  { id: 'special', label: 'Special', icon: Sparkles },
]

export default function AchievementsPage() {
  const { user } = useAuthStore()
  const achievements = useAchievements()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? achievements : achievements.filter((a) => a.category === filter)
  const unlocked = filtered.filter((a) => a.unlocked)
  const locked = filtered.filter((a) => !a.unlocked)

  const totalXP = user?.total_xp || 0
  const level = user?.current_level || 1
  const streak = user?.streak_days || 0

  return (
    <div className="min-h-screen mesh-bg-animated">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Achievements</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-6 md:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center mx-auto mb-3 shadow-glow">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <p className="font-display text-2xl font-bold text-white">{unlocked.length}</p>
              <p className="text-xs text-surface-600">Unlocked</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-7 h-7 text-gold-300" />
              </div>
              <p className="font-display text-2xl font-bold text-white">{totalXP.toLocaleString('en-IN')}</p>
              <p className="text-xs text-surface-600">Total XP</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-accent-500/15 border border-accent-500/30 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-7 h-7 text-accent-300" />
              </div>
              <p className="font-display text-2xl font-bold text-white">{level}</p>
              <p className="text-xs text-surface-600">Level</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mx-auto mb-3">
                <Flame className="w-7 h-7 text-orange-300" />
              </div>
              <p className="font-display text-2xl font-bold text-white">{streak}</p>
              <p className="text-xs text-surface-600">Day Streak</p>
            </div>
          </div>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all ${
                  filter === cat.id
                    ? 'glass-strong border border-brand-500/40 text-white'
                    : 'glass-card text-surface-600 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.label}
              </button>
            )
          })}
        </div>

        {/* Unlocked */}
        {unlocked.length > 0 && (
          <section>
            <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-mint-300" />
              Unlocked ({unlocked.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unlocked.map((a, i) => {
                const tier = tierColors[a.tier]
                const Icon = a.icon
                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={`glass-card p-5 ${tier.border} border`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl ${tier.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${tier.icon}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-white">{a.title}</h3>
                        <p className="text-xs text-surface-600 mt-1">{a.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${tier.bg} ${tier.text} font-medium uppercase`}>
                            {a.tier}
                          </span>
                          <span className="text-[10px] text-gold-300 font-medium">+{a.xpReward} XP</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>
        )}

        {/* Locked */}
        {locked.length > 0 && (
          <section>
            <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-surface-600" />
              In Progress ({locked.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {locked.map((a, i) => {
                const tier = tierColors[a.tier]
                const Icon = a.icon
                const pct = a.progress && a.maxProgress ? Math.round((a.progress / a.maxProgress) * 100) : 0
                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="glass-card p-5 opacity-70"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-200/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-surface-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-surface-700">{a.title}</h3>
                        <p className="text-xs text-surface-600 mt-1">{a.description}</p>
                      </div>
                    </div>
                    {a.progress !== undefined && a.maxProgress && (
                      <div>
                        <div className="flex justify-between text-[10px] text-surface-600 mb-1">
                          <span>{a.progress}/{a.maxProgress}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-surface-200/40 overflow-hidden">
                          <div className={`h-full rounded-full ${tier.bg.replace('/10', '/60')}`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${tier.bg} ${tier.text} font-medium uppercase`}>
                        {a.tier}
                      </span>
                      <span className="text-[10px] text-gold-300 font-medium">+{a.xpReward} XP</span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="glass-card rounded-2xl p-6 text-center">
          <Brain className="w-8 h-8 text-brand-300 mx-auto mb-3" />
          <h3 className="font-display text-lg font-semibold text-white mb-2">Earn more XP!</h3>
          <p className="text-sm text-surface-600 mb-4">Ask questions, practice, and study topics to unlock more achievements.</p>
          <div className="flex gap-2 justify-center">
            <Link href="/tutor" className="btn-primary">
              <Brain className="w-4 h-4" />
              Ask the AI Tutor
            </Link>
            <Link href="/practice" className="btn-secondary">
              <Target className="w-4 h-4" />
              Practice
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
