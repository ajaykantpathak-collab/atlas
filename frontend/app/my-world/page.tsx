'use client';

/**
 * My World page — shows the student's Living World.
 *
 * The world evolves as the student masters topics:
 * - Empty grassland → flowers → animals → buildings → weather
 * - Day/night cycle and seasons based on mastery
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LivingWorldView } from '../../components/gamification/LivingWorldView';
import { LearningAnalytics } from '../../lib/game-engine/analytics/LearningAnalytics';
import { GamificationManager } from '../../lib/game-engine/gamification/GamificationManager';
import Link from 'next/link';

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-black text-indigo-700">🌍 My Living World</h1>
            <p className="text-sm text-gray-500 mt-1">
              Your world grows as you learn. Keep mastering topics to unlock more!
            </p>
          </div>
          <Link
            href="/game-test"
            className="px-4 py-2 rounded-xl bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-600 transition-all"
          >
            ← Back to Games
          </Link>
        </div>

        {/* World Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6"
        >
          <LivingWorldView width={720} height={400} />
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="text-2xl font-black text-indigo-600">{worldState.worldLevel}</div>
            <div className="text-xs text-gray-500 font-semibold">World Level</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="text-2xl font-black text-green-600">{worldState.masteredTopics}</div>
            <div className="text-xs text-gray-500 font-semibold">Topics Mastered</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="text-2xl font-black text-orange-600">{streakInfo.current}</div>
            <div className="text-xs text-gray-500 font-semibold">Current Streak</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md text-center">
            <div className="text-2xl font-black text-purple-600">{earnedBadges.length}</div>
            <div className="text-xs text-gray-500 font-semibold">Badges Earned</div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-lg font-black text-gray-700 mb-4">🏆 Badges</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {allBadges.map(({ badge, earned }) => (
              <div
                key={badge.id}
                className={`rounded-xl p-3 text-center transition-all ${
                  earned
                    ? 'bg-yellow-50 border-2 border-yellow-300 shadow-sm'
                    : 'bg-gray-50 border-2 border-gray-200 opacity-50'
                }`}
              >
                <div className="text-3xl mb-1">{earned ? badge.emoji : '🔒'}</div>
                <div className="text-xs font-bold text-gray-700">{badge.name}</div>
                <div className="text-xs text-gray-400 mt-1">{badge.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* World Elements Unlocked */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-lg font-black text-gray-700 mb-4">🌱 World Elements</h2>
          <div className="flex flex-wrap gap-2">
            {worldState.elements.map((el, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-xs font-semibold text-green-700"
              >
                {el.replace(/_/g, ' ')}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Season: {worldState.season} • Time: {worldState.timeOfDay}
          </p>
        </div>
      </div>
    </div>
  );
}
