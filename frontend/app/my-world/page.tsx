'use client';

/**
 * My World — the student's GOLDEN GALAXY (owner call: the galaxy replaces
 * the grassland living-world view; same gamification data, premium shell).
 *
 * The hero is the same GoldenGalaxy that anchors the Atlas landing — the
 * syllabus as one living object. Streak / badges / unlocked elements are
 * the real GamificationManager values, restyled to the black-gold system.
 * No invented numbers: every figure on this page is read from state.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { WorldMap3D } from '../../components/world/WorldMap3D';
import { LearningAnalytics } from '../../lib/game-engine/analytics/LearningAnalytics';
import { GamificationManager } from '../../lib/game-engine/gamification/GamificationManager';
import Link from 'next/link';
import { ArrowLeft, Flame, Award, Sparkles, Trophy } from 'lucide-react';

export default function MyWorldPage() {
  const [analytics] = useState(() => {
    const a = new LearningAnalytics();
    a.init('student_001', 'Student', 1);
    return a;
  });
  const [gamification] = useState(() => new GamificationManager(analytics));
  const [worldState] = useState(() => gamification.getWorldState());
  const [streakInfo] = useState(() => gamification.getStreakInfo());
  const [allBadges] = useState(() => gamification.getAllBadges());
  const [earnedBadges] = useState(() => gamification.getEarnedBadges());

  const stats = [
    { value: worldState.worldLevel, label: 'Galaxy Level', accent: 'text-gold-400' },
    { value: worldState.masteredTopics, label: 'Topics Mastered', accent: 'text-brand-300' },
    { value: streakInfo.current, label: 'Day Streak', accent: 'text-amber-400' },
    { value: earnedBadges.length, label: 'Badges Earned', accent: 'text-yellow-300' },
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

        {/* Galaxy hero — the REAL syllabus universe: all 9,010 official
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
              {streakInfo.current} day streak
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-semibold text-surface-400 backdrop-blur">
              <Trophy className="w-3.5 h-3.5" />
              {earnedBadges.length}/{allBadges.length} badges
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
              <div className={`text-3xl font-black font-display ${s.accent}`}>{s.value}</div>
              <div className="text-[11px] uppercase tracking-wider text-surface-500 font-semibold mt-1">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Badges */}
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-gold-400" />
            <h2 className="font-display text-lg font-semibold">Badges</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {allBadges.map(({ badge, earned }) => (
              <div
                key={badge.id}
                className={`rounded-xl p-3 text-center border transition-all ${
                  earned
                    ? 'bg-gold-400/[0.07] border-gold-400/40 shadow-[0_0_24px_-8px_rgba(212,175,55,0.4)]'
                    : 'bg-white/[0.02] border-white/5 opacity-45'
                }`}
              >
                <div className="text-3xl mb-1">{earned ? badge.emoji : '🔒'}</div>
                <div className="text-xs font-bold text-white">{badge.name}</div>
                <div className="text-[11px] text-surface-500 mt-1 leading-snug">{badge.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Unlocked elements */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-brand-300" />
            <h2 className="font-display text-lg font-semibold">Constellations Unlocked</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {worldState.elements.map((el, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-300 capitalize"
              >
                {el.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-surface-600 mt-3">
            Season: {worldState.season} · Time: {worldState.timeOfDay}
          </p>
        </div>
      </div>
    </div>
  );
}
