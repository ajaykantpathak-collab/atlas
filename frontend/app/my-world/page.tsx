'use client';

/**
 * My World — the student's GOLDEN GALAXY (owner call: the galaxy replaces
 * the grassland living-world view; same gamification data, premium shell).
 *
 * Every figure here streams from the SAME live endpoints as /dashboard
 * (GET /api/progress/dashboard, /api/progress/overview,
 * /api/achievements/?filter=all) so the numbers match across pages —
 * no local, per-load-reset game-engine state. Loading / offline /
 * signed-out states are honest; nothing is estimated.
 */

import { motion } from 'framer-motion';
import { WorldMap3D } from '../../components/world/WorldMap3D';
import { useDashboardData, achievementItems } from '@/components/dashboard/useDashboardData';
import type { Achievement } from '@/components/dashboard/types';
import {
  achievementIcon,
  ErrorState,
  SignedOutState,
  SkeletonBlock,
} from '@/components/dashboard/ui';
import Link from 'next/link';
import { ArrowLeft, Flame, Award, Lock, Trophy } from 'lucide-react';

export default function MyWorldPage() {
  const { signedOut, dashboard, overview, achievements } = useDashboardData();

  const dash = dashboard.data;
  const level = dash?.level ?? dash?.user?.current_level ?? 0;
  const streak = dash?.streak ?? dash?.user?.streak_days ?? 0;
  const masteredTopics = overview.data?.masteredNodes ?? 0;

  const badgeList: Achievement[] = achievementItems(achievements.data);
  const earnedBadges = badgeList.filter((a) => Boolean(a.unlocked));
  const badgesReady = achievements.status === 'ready';

  const stats = [
    { value: level, label: 'Galaxy Level', accent: 'text-gold-400' },
    { value: masteredTopics, label: 'Topics Mastered', accent: 'text-brand-300' },
    { value: streak, label: 'Day Streak', accent: 'text-amber-400' },
    {
      value: `${earnedBadges.length}/${badgeList.length}`,
      label: 'Badges Earned',
      accent: 'text-yellow-300',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07060b] text-white">
      {/* ambient gold wash behind everything */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(1200px 500px at 50% -10%, rgba(212,175,55,0.10), transparent 60%), radial-gradient(800px 400px at 90% 110%, rgba(146,114,240,0.08), transparent 60%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gold-400 to-brand-400 bg-clip-text text-transparent">
              My Galaxy
            </h1>
            <p className="text-sm text-surface-500 mt-1">
              Your syllabus as one living galaxy — it brightens as you master topics.
            </p>
          </div>
          <Link
            href="/game-test"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-semibold text-surface-400 hover:text-white hover:border-gold-400/30 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Link>
        </div>

        {signedOut ? (
          <SignedOutState />
        ) : (
          <>
            {/* Galaxy hero — the REAL syllabus universe: all 9,099 official
                nodes as stars (owner call: WorldMap3D replaces the decorative
                GoldenGalaxy here). Mastery-lit, hover-legible, click-to-sim. */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative h-[560px] sm:h-[640px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_80px_-20px_rgba(212,175,55,0.25)] mb-8"
            >
              <WorldMap3D />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-gold-400/25 text-xs font-semibold text-gold-300 backdrop-blur">
                  <Flame className="w-3.5 h-3.5" />
                  {streak} day streak
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-semibold text-surface-400 backdrop-blur">
                  <Trophy className="w-3.5 h-3.5" />
                  {badgesReady ? `${earnedBadges.length}/${badgeList.length}` : '…'} badges
                </span>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="glass-card p-4 text-center"
                >
                  <div className={`text-3xl font-black font-display ${s.accent}`}>
                    {dashboard.status === 'loading' && i < 3 ? (
                      <SkeletonBlock className="h-9 w-12 mx-auto" />
                    ) : (
                      s.value
                    )}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-surface-500 font-semibold mt-1">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {dashboard.status === 'error' && (
              <div className="mb-8">
                <ErrorState title="Your progress stats are offline right now" />
              </div>
            )}

            {/* Badges */}
            <div className="glass-card p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-gold-400" />
                <h2 className="font-display text-lg font-semibold">Badges</h2>
              </div>
              {achievements.status === 'loading' && (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl p-3 text-center border border-white/5 bg-white/[0.02]">
                      <SkeletonBlock className="w-9 h-9 rounded-xl mx-auto mb-2" />
                      <SkeletonBlock className="h-3 w-16 mx-auto" />
                    </div>
                  ))}
                </div>
              )}
              {achievements.status === 'error' && (
                <ErrorState title="Badges are offline right now" />
              )}
              {badgesReady && badgeList.length === 0 && (
                <p className="text-sm text-surface-500">
                  No badges defined for your account yet — they appear here as soon as they exist.
                </p>
              )}
              {badgesReady && badgeList.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {badgeList.map((a, i) => {
                    const { title, description, unlocked, iconName, icon } = a;
                    const Icon = achievementIcon(iconName ?? icon ?? undefined);
                    return (
                      <div
                        key={`${a.id ?? a.achievementId ?? title}-${i}`}
                        className={`rounded-xl p-3 text-center border transition-all ${
                          unlocked
                            ? 'bg-gold-400/[0.07] border-gold-400/40 shadow-[0_0_24px_-8px_rgba(212,175,55,0.4)]'
                            : 'bg-white/[0.02] border-white/5 opacity-45'
                        }`}
                      >
                        <div className="w-9 h-9 mx-auto mb-1 flex items-center justify-center">
                          <Icon className={`w-8 h-8 ${unlocked ? 'text-gold-300' : 'text-surface-600'}`} />
                          {!unlocked && (
                            <Lock className="w-3 h-3 text-surface-600 -ml-2 mt-4" aria-label="locked" />
                          )}
                        </div>
                        <div className="text-xs font-bold text-white">{title}</div>
                        <div className="text-[11px] text-surface-500 mt-1 leading-snug">{description}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
