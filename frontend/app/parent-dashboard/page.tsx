'use client';

/**
 * ParentDashboard — the parent's view of their child's REAL learning record.
 *
 * Every number here comes from live APIs over real recorded data:
 *  - GET /api/dashboard/parent/{parentId}   → children, practice attempts,
 *    recent attempts, insights, alerts (alerts fire only on real thresholds)
 *  - GET /api/dashboard/student/{childId}   → per-topic mastery breakdown
 *
 * Nothing is read from any local/in-memory game store; a child with no
 * recorded activity gets an honest "no data yet" state — never zeros dressed
 * up as data and never fabricated alerts.
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/stores/authStore';
import WeeklyDigest from '@/components/engagement/WeeklyDigest';

interface RecentAttempt {
  title: string;
  subject?: string | null;
  correct?: boolean | null;
  seconds?: number | null;
  at: string;
}

interface Child {
  student_id: string;
  student_name: string;
  grade: string;
  overall_mastery: number;
  total_xp: number;
  current_level: number;
  current_streak: number;
  weekly_practice_minutes: number;
  subjects_practiced: string[];
  practice_attempts: number;
  practice_correct: number;
  last_active_at: string | null;
  has_data: boolean;
  recent_attempts: RecentAttempt[];
  has_mastery_data: boolean;
}

interface Insight {
  category: string;
  title: string;
  detail: string;
  trend: string;
  value?: number | null;
}

interface Alert {
  alert_type: string;
  severity: string;
  message: string;
  created_at: string;
  action_required: boolean;
}

interface TopicMastery {
  topic_id: string;
  topic_name: string;
  subject_name: string;
  mastery_score: number;
  attempts: number;
}

function authHeaders(token: string | null): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function getJson<T>(url: string, headers: Record<string, string>): Promise<T | null> {
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function fmtWhen(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function ParentDashboardPage() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const [loading, setLoading] = useState(true);
  const [child, setChild] = useState<Child | null>(null);
  const [children, setChildren] = useState<Child[]>([]);
  const [topics, setTopics] = useState<TopicMastery[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setLoadError(null);
      const headers = authHeaders(token);
      const pd = await getJson<{
        children: Child[];
        insights: Insight[];
        alerts: Alert[];
      }>(`/api/dashboard/parent/${user.id}`, headers);
      if (cancelled) return;
      if (!pd) {
        setLoadError('Could not load your parent dashboard. Please try again.');
        setLoading(false);
        return;
      }
      setChildren(pd.children ?? []);
      setInsights(pd.insights ?? []);
      setAlerts(pd.alerts ?? []);
      const first = (pd.children ?? [])[0] ?? null;
      setChild(first);
      if (first) {
        const sd = await getJson<{ mastery_by_topic?: TopicMastery[] }>(
          `/api/dashboard/student/${first.student_id}`,
          headers,
        );
        if (cancelled) return;
        setTopics(sd?.mastery_by_topic ?? []);
      }
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [user?.id, token]);

  const selectChild = async (c: Child) => {
    setChild(c);
    setTopics([]);
    const sd = await getJson<{ mastery_by_topic?: TopicMastery[] }>(
      `/api/dashboard/student/${c.student_id}`,
      authHeaders(token),
    );
    setTopics(sd?.mastery_by_topic ?? []);
  };

  const sortedTopics = useMemo(
    () => [...topics].sort((a, b) => a.mastery_score - b.mastery_score),
    [topics],
  );
  const weakTopics = sortedTopics.filter((t) => t.mastery_score < 70).slice(0, 5);
  const strongTopics = [...sortedTopics].reverse().filter((t) => t.mastery_score >= 70).slice(0, 5);

  // ── Signed-out state ──
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">👋</div>
          <h1 className="text-2xl font-black text-white mb-2">Parent Dashboard</h1>
          <p className="text-slate-400 mb-6">Sign in with your parent account to follow your child&apos;s learning.</p>
          <Link
            href="/login"
            className="inline-block px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-sm transition-colors"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-slate-400">Loading your child&apos;s progress…</p>
        </div>
      </div>
    );
  }

  // ── Error state ──
  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-slate-300">{loadError}</p>
        </div>
      </div>
    );
  }

  // ── No child linked ──
  if (children.length === 0 || !child) {
    return (
      <div className="min-h-screen bg-slate-950 p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
          <Header name={user.name} />
          <div className="bg-slate-800 rounded-2xl p-8 text-center border border-slate-700">
            <div className="text-4xl mb-3">👶</div>
            <h2 className="text-lg font-bold text-white mb-2">No child linked yet</h2>
            <p className="text-slate-400 text-sm">
              When your account is linked to a student, their real learning progress shows up here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const accuracy =
    child.practice_attempts > 0
      ? Math.round((child.practice_correct / child.practice_attempts) * 100)
      : null;

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <Header name={user.name} />

        {/* Child selector (multi-child households) */}
        {children.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {children.map((c) => (
              <button
                key={c.student_id}
                onClick={() => selectChild(c)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  c.student_id === child.student_id
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {c.student_name}
              </button>
            ))}
          </div>
        )}

        {/* Child summary */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">
            {child.student_name}
            {child.grade ? (
              <span className="text-slate-400 font-medium text-base ml-2">Class {child.grade}</span>
            ) : null}
          </h2>
          <p className="text-slate-500 text-sm">
            {child.has_data
              ? child.last_active_at
                ? `Last recorded activity ${fmtWhen(child.last_active_at)}`
                : 'Activity recorded — details below'
              : 'No activity recorded yet'}
          </p>
        </div>

        {/* Weekly digest — real last-7-day summary (questions, accuracy,
            XP, strongest/weakest topic) from recorded practice */}
        <WeeklyDigest studentId={child.student_id} token={token} />

        {/* Overview cards — every value is a real recorded number */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Overall Mastery"
            value={child.has_mastery_data ? `${Math.round(child.overall_mastery)}%` : '—'}
            hint={child.has_mastery_data ? undefined : 'no mastery records yet'}
            color="from-blue-500 to-indigo-500"
            icon="🎯"
          />
          <StatCard
            label="Current Streak"
            value={`${child.current_streak} day${child.current_streak === 1 ? '' : 's'}`}
            color="from-orange-500 to-red-500"
            icon="🔥"
          />
          <StatCard
            label="Practice Answers"
            value={String(child.practice_attempts)}
            hint={accuracy !== null ? `${accuracy}% correct` : 'none recorded yet'}
            color="from-green-500 to-emerald-500"
            icon="📝"
          />
          <StatCard
            label="Total XP"
            value={child.total_xp.toLocaleString()}
            hint={`Level ${child.current_level}`}
            color="from-purple-500 to-pink-500"
            icon="⚡"
          />
        </div>

        {/* Insights + alerts (only ever generated from real thresholds) */}
        {(insights.length > 0 || alerts.length > 0) && (
          <div className="mb-8 space-y-3">
            {insights.map((ins, i) => (
              <div key={i} className="bg-indigo-500/10 rounded-2xl p-4 border border-indigo-500/20">
                <p className="text-indigo-300 font-bold text-sm">💡 {ins.title}</p>
                <p className="text-slate-300 text-sm mt-1">{ins.detail}</p>
              </div>
            ))}
            {alerts.map((al, i) => (
              <div
                key={i}
                className={`rounded-2xl p-4 border ${
                  al.severity === 'urgent'
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-amber-500/10 border-amber-500/30'
                }`}
              >
                <p className={`font-bold text-sm ${al.severity === 'urgent' ? 'text-red-300' : 'text-amber-300'}`}>
                  {al.severity === 'urgent' ? '⚠️ ' : '🔔 '}
                  {al.alert_type === 'streak_broken' ? 'Streak paused' : al.alert_type.replaceAll('_', ' ')}
                </p>
                <p className="text-slate-300 text-sm mt-1">{al.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Strengths & Weaknesses — from the child's real mastery records */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 rounded-2xl p-6 shadow-md border border-red-500/20">
            <h2 className="text-lg font-bold text-red-400 mb-4">⚠️ Needs Practice</h2>
            {weakTopics.length === 0 ? (
              <p className="text-slate-400 text-sm">
                {child.has_mastery_data
                  ? 'No weak areas yet. Keep practicing!'
                  : 'No mastery records yet — these appear once your child completes practice.'}
              </p>
            ) : (
              <div className="space-y-3">
                {weakTopics.map((t) => (
                  <div key={t.topic_id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-slate-200 truncate">
                        {t.topic_name}
                        <span className="text-slate-500 font-normal ml-2">{t.subject_name}</span>
                      </span>
                      <span className="text-red-400 font-bold">{Math.round(t.mastery_score)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full" style={{ width: `${t.mastery_score}%` }} />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{t.attempts} recorded {t.attempts === 1 ? 'answer' : 'answers'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 shadow-md border border-green-500/20">
            <h2 className="text-lg font-bold text-green-400 mb-4">⭐ Strengths</h2>
            {strongTopics.length === 0 ? (
              <p className="text-slate-400 text-sm">
                {child.has_mastery_data
                  ? 'Strengths appear as mastery climbs past 70%.'
                  : 'No mastery records yet — strengths show up as your child practices.'}
              </p>
            ) : (
              <div className="space-y-3">
                {strongTopics.map((t) => (
                  <div key={t.topic_id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-slate-200 truncate">
                        {t.topic_name}
                        <span className="text-slate-500 font-normal ml-2">{t.subject_name}</span>
                      </span>
                      <span className="text-green-400 font-bold">{Math.round(t.mastery_score)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: `${t.mastery_score}%` }} />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{t.attempts} recorded {t.attempts === 1 ? 'answer' : 'answers'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent activity — the child's actual recorded practice attempts */}
        <div className="bg-slate-800 rounded-2xl p-6 shadow-md mb-8">
          <h2 className="text-lg font-bold text-slate-200 mb-4">
            📝 Recent Practice (last {child.recent_attempts.length} recorded)
          </h2>
          {child.recent_attempts.length === 0 ? (
            <p className="text-slate-400 text-sm">
              No practice recorded yet. Once your child answers practice questions, they show up here.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-700">
                    <th className="pb-2 font-semibold">Practice item</th>
                    <th className="pb-2 font-semibold">Subject</th>
                    <th className="pb-2 font-semibold">Result</th>
                    <th className="pb-2 font-semibold">When</th>
                  </tr>
                </thead>
                <tbody>
                  {child.recent_attempts.map((att, i) => (
                    <tr key={i} className="border-b border-slate-700/50">
                      <td className="py-2 text-slate-300 max-w-[280px] truncate">
                        {att.title || 'Practice question'}
                      </td>
                      <td className="py-2 text-slate-400">{att.subject || '—'}</td>
                      <td className="py-2">
                        {att.correct === null || att.correct === undefined ? (
                          <span className="text-slate-500">—</span>
                        ) : att.correct ? (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/15 text-green-400">
                            ✓ Correct
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/15 text-red-400">
                            ✗ Wrong
                          </span>
                        )}
                      </td>
                      <td className="py-2 text-slate-500">{fmtWhen(att.at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function Header({ name }: { name?: string | null }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-black text-white mb-1">📊 Parent Dashboard</h1>
      <p className="text-slate-400">
        {name ? `Signed in as ${name} · ` : ''}Follow your child&apos;s learning progress
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  color,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  color: string;
  icon: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${color} rounded-2xl p-4 text-white shadow-lg`}
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-2xl font-black">{value}</div>
      <div className="text-xs opacity-90 font-semibold">{label}</div>
      {hint ? <div className="text-[11px] opacity-75 mt-0.5">{hint}</div> : null}
    </motion.div>
  );
}
