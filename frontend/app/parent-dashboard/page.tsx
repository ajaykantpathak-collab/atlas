'use client';

/**
 * ParentDashboard — shows student progress for parents/teachers.
 *
 * Displays:
 * - Overall mastery and streak
 * - Strengths and weaknesses by topic
 * - Time spent learning
 * - Recent attempts
 * - Recommendations for what to practice
 */

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LearningAnalytics } from '../../lib/game-engine/analytics/LearningAnalytics';
import { GamificationManager } from '../../lib/game-engine/gamification/GamificationManager';
import type { StudentProfile, AttemptRecord } from '../../lib/game-engine/analytics/types';

export default function ParentDashboardPage() {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [masteryScore, setMasteryScore] = useState(0);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [streakInfo, setStreakInfo] = useState<{ current: number; best: number; daily: number; onFire: boolean } | null>(null);
  const [badges, setBadges] = useState<any[]>([]);
  const [topicStats, setTopicStats] = useState<Map<string, { correct: number; total: number; mastery: number }>>(new Map());

  useEffect(() => {
    const analytics = new LearningAnalytics();
    analytics.init('student_001', 'Student', 1);
    const p = analytics.getProfile();
    setProfile(p);
    const masteryScore = analytics.getTotalMasteryScore();
    setMasteryScore(masteryScore);

    const allAttempts = p?.attempts || [];
    setAttempts(allAttempts.slice(-20).reverse()); // Last 20 attempts

    const gamification = new GamificationManager(analytics);
    setStreakInfo(gamification.getStreakInfo());
    const allBadges = gamification.getAllBadges().filter(b => b.earned).map(b => b.badge);
    setBadges(allBadges);

    // Compute topic stats
    const stats = new Map<string, { correct: number; total: number; mastery: number }>();
    for (const att of allAttempts) {
      const key = `${att.subject}/${att.topic}`;
      const existing = stats.get(key) || { correct: 0, total: 0, mastery: 0 };
      existing.total++;
      if (att.correct) existing.correct++;
      existing.mastery = (existing.correct / existing.total) * 100;
      stats.set(key, existing);
    }
    setTopicStats(stats);
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Sort topics by mastery (weakest first)
  const sortedTopics = Array.from(topicStats.entries())
    .sort((a, b) => a[1].mastery - b[1].mastery);

  const weakestTopics = sortedTopics.filter(([, s]) => s.mastery < 70).slice(0, 5);
  const strongestTopics = sortedTopics.filter(([, s]) => s.mastery >= 70).slice(-5).reverse();

  const totalAttemptsCount = attempts.length;
  const totalTime = attempts.reduce((sum, a) => sum + (a.timeTaken || 0), 0);
  const avgTime = totalAttemptsCount > 0 ? (totalTime / totalAttemptsCount).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-indigo-50 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-800 mb-1">📊 Parent Dashboard</h1>
          <p className="text-gray-500">Track your child's learning progress</p>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard label="Overall Mastery" value={`${Math.round(masteryScore)}%`} color="from-blue-500 to-indigo-500" icon="🎯" />
          <StatCard label="Current Streak" value={`${streakInfo?.daily || 0} days`} color="from-orange-500 to-red-500" icon="🔥" />
          <StatCard label="Total Attempts" value={String(profile.totalCorrect + profile.totalWrong)} color="from-green-500 to-emerald-500" icon="📝" />
          <StatCard label="Badges Earned" value={String(badges.length)} color="from-purple-500 to-pink-500" icon="🏆" />
        </div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Weaknesses */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-red-100">
            <h2 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
              ⚠️ Needs Practice
            </h2>
            {weakestTopics.length === 0 ? (
              <p className="text-gray-400 text-sm">No weak areas yet. Keep practicing!</p>
            ) : (
              <div className="space-y-3">
                {weakestTopics.map(([topic, stats]) => (
                  <div key={topic}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-gray-700">{topic}</span>
                      <span className="text-red-500 font-bold">{Math.round(stats.mastery)}%</span>
                    </div>
                    <div className="w-full h-2 bg-red-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full" style={{ width: `${stats.mastery}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {stats.correct}/{stats.total} correct
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Strengths */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-green-100">
            <h2 className="text-lg font-bold text-green-600 mb-4 flex items-center gap-2">
              ⭐ Strengths
            </h2>
            {strongestTopics.length === 0 ? (
              <p className="text-gray-400 text-sm">Complete more challenges to see strengths!</p>
            ) : (
              <div className="space-y-3">
                {strongestTopics.map(([topic, stats]) => (
                  <div key={topic}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-gray-700">{topic}</span>
                      <span className="text-green-500 font-bold">{Math.round(stats.mastery)}%</span>
                    </div>
                    <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: `${stats.mastery}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {stats.correct}/{stats.total} correct
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recommendations */}
        {weakestTopics.length > 0 && (
          <div className="bg-indigo-50 rounded-2xl p-6 shadow-md mb-8 border border-indigo-100">
            <h2 className="text-lg font-bold text-indigo-600 mb-3 flex items-center gap-2">
              💡 Recommendations
            </h2>
            <ul className="space-y-2">
              {weakestTopics.slice(0, 3).map(([topic]) => (
                <li key={topic} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-indigo-500 font-bold">→</span>
                  <span>Practice <strong>{topic}</strong> more — try the related game to build confidence!</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recent activity */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
            📝 Recent Activity (Last 20 Attempts)
          </h2>
          {attempts.length === 0 ? (
            <p className="text-gray-400 text-sm">No attempts yet. Start a game to see activity here!</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b">
                    <th className="pb-2 font-semibold">Subject</th>
                    <th className="pb-2 font-semibold">Topic</th>
                    <th className="pb-2 font-semibold">Result</th>
                    <th className="pb-2 font-semibold">Time</th>
                    <th className="pb-2 font-semibold">Error Type</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((att, i) => (
                    <tr key={i} className="border-b border-gray-50">
                      <td className="py-2 text-gray-600">{att.subject}</td>
                      <td className="py-2 text-gray-600">{att.topic}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          att.correct ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {att.correct ? '✓ Correct' : '✗ Wrong'}
                        </span>
                      </td>
                      <td className="py-2 text-gray-500">{att.timeTaken?.toFixed(1)}s</td>
                      <td className="py-2 text-gray-500">{att.errorType || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
            🏆 Badges Earned
          </h2>
          {badges.length === 0 ? (
            <p className="text-gray-400 text-sm">No badges yet. Complete games to earn badges!</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center p-3 bg-gradient-to-b from-yellow-50 to-orange-50 rounded-xl border border-yellow-200"
                >
                  <div className="text-3xl mb-1">{badge.emoji || '🏅'}</div>
                  <div className="text-sm font-bold text-gray-700">{badge.name}</div>
                  <div className="text-xs text-gray-400">{badge.description}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <a href="/" className="text-indigo-500 hover:text-indigo-600 font-semibold text-sm">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, icon }: { label: string; value: string; color: string; icon: string }) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-4 text-white shadow-lg`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-black">{value}</div>
      <div className="text-xs opacity-90 font-semibold">{label}</div>
    </div>
  );
}
