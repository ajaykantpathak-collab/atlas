'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft, Award, Flame, Zap, Star, Trophy, Target,
  BookOpen, Brain, Crown, Shield, Sparkles, TrendingUp,
  Lock, CheckCircle2, ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import {
  CustomCursor, TiltCard, GlowCard, BorderBeam,
  ScrollReveal, StaggerContainer, StaggerItem,
  Spotlight, AnimatedCounter, PremiumProgress, PremiumLoader,
} from '@/components/premium'
import { useAchievements, useAchievementStats } from '@/hooks'

const tierColors: Record<string, { bg: string; border: string; text: string; icon: string; glow: string }> = {
  bronze: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-300', icon: 'text-orange-400', glow: 'rgba(249,115,22,0.2)' },
  silver: { bg: 'bg-slate-400/10', border: 'border-slate-400/30', text: 'text-slate-300', icon: 'text-slate-400', glow: 'rgba(148,163,184,0.2)' },
  gold: { bg: 'bg-gold-500/10', border: 'border-gold-500/30', text: 'text-gold-300', icon: 'text-gold-400', glow: 'rgba(251,191,36,0.2)' },
  platinum: { bg: 'bg-accent-500/10', border: 'border-accent-500/30', text: 'text-accent-300', icon: 'text-accent-400', glow: 'rgba(217,70,239,0.2)' },
}

const iconMap: Record<string, typeof BookOpen> = {
  BookOpen, Flame, Zap, Target, Brain, Crown, Trophy, Sparkles, Star, Award, Shield, Lock,
}

export default function PremiumAchievementsPage() {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')

  const { data: achievementsData, isLoading } = useAchievements(filter)
  const { data: statsData } = useAchievementStats()

  const achievements = (achievementsData?.achievements ?? []).map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    icon: iconMap[a.iconName] ?? Award,
    tier: a.tier as 'bronze' | 'silver' | 'gold' | 'platinum',
    unlocked: a.unlocked,
    dateUnlocked: a.unlockedAt,
    xpReward: a.xpReward,
    progress: a.progress,
    maxProgress: a.maxProgress,
  }))

  const filtered = achievements
  const unlockedCount = achievementsData?.unlockedCount ?? 0
  const totalXP = achievementsData?.totalXp ?? 0
  const totalCount = achievements.length

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
            <h1 className="font-display text-sm font-semibold text-white">Achievements</h1>
          </div>
          <div className="flex items-center gap-2">
            {(['all', 'unlocked', 'locked'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === tab ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' : 'text-surface-600 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All' : tab === 'unlocked' ? 'Unlocked' : 'Locked'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <StaggerContainer stagger={0.1}>
          {/* Stats */}
          <StaggerItem>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { icon: Trophy, label: 'Unlocked', value: unlockedCount, suffix: `/${totalCount}`, color: 'text-gold-300', glow: 'rgba(251,191,36,0.2)' },
                { icon: Zap, label: 'XP Earned', value: totalXP, color: 'text-brand-300', glow: 'rgba(99,102,241,0.2)' },
                { icon: Star, label: 'Completion', value: totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0, suffix: '%', color: 'text-accent-300', glow: 'rgba(217,70,239,0.2)' },
              ].map((stat, i) => (
                <TiltCard key={i} maxTilt={6}>
                  <GlowCard className="glass-card rounded-xl p-4 text-center" glowColor={stat.glow} glowSize={150}>
                    <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                    <div className="font-display text-xl font-bold text-white">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix || ''} />
                    </div>
                    <div className="text-[10px] text-surface-600">{stat.label}</div>
                  </GlowCard>
                </TiltCard>
              ))}
            </div>
          </StaggerItem>

          {/* Achievement grid */}
          <StaggerItem>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((achievement, i) => {
                const tier = tierColors[achievement.tier]
                return (
                  <ScrollReveal key={achievement.id} direction="up" delay={i * 0.05}>
                    <TiltCard maxTilt={8}>
                      <GlowCard className={`glass-card rounded-2xl p-5 ${achievement.unlocked ? '' : 'opacity-60'}`} glowColor={achievement.unlocked ? tier.glow : 'rgba(100,100,100,0.1)'} glowSize={200}>
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-12 h-12 rounded-xl ${tier.bg} border ${tier.border} flex items-center justify-center relative`}>
                            {achievement.unlocked ? (
                              <achievement.icon className={`w-6 h-6 ${tier.icon}`} />
                            ) : (
                              <Lock className="w-5 h-5 text-surface-600" />
                            )}
                            {achievement.unlocked && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-mint-500 flex items-center justify-center">
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-white text-sm">{achievement.title}</h3>
                            <span className={`text-[10px] ${tier.text} uppercase tracking-wider`}>{achievement.tier}</span>
                          </div>
                          <span className="text-xs font-mono text-brand-300">+{achievement.xpReward} XP</span>
                        </div>

                        <p className="text-xs text-surface-600 mb-3">{achievement.description}</p>

                        {!achievement.unlocked && achievement.progress && achievement.maxProgress && (
                          <div>
                            <div className="flex justify-between text-[10px] text-surface-600 mb-1">
                              <span>{achievement.progress}/{achievement.maxProgress}</span>
                              <span>{Math.round((achievement.progress / achievement.maxProgress) * 100)}%</span>
                            </div>
                            <PremiumProgress progress={(achievement.progress / achievement.maxProgress) * 100} height="h-1" />
                          </div>
                        )}

                        {achievement.unlocked && achievement.dateUnlocked && (
                          <div className="text-[10px] text-surface-600">
                            Unlocked on {achievement.dateUnlocked}
                          </div>
                        )}
                      </GlowCard>
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
