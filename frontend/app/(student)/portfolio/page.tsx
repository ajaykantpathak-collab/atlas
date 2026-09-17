"use client";

/**
 * Mastery Portfolio — /portfolio
 *
 * Fully wired to the live backend (same verified endpoints as /dashboard):
 *   GET /api/progress/dashboard        → user, streak, XP, level
 *   GET /api/progress/overview?range=all → avg mastery, nodes, study hours
 *   GET /api/progress/mastery          → per-subject table
 *   GET /api/progress/review/stats     → retention + accuracy
 *   GET /api/progress/activity?limit=8 → recent sessions
 *   GET /api/achievements/?filter=all  → earned badges
 *
 * Every figure is real. The previous version hardcoded a fictional student
 * ("Aarav Sharma", 142 lessons, a 16-day streak) — that is gone. Sections
 * without data render honest empty/offline states with a next action.
 * Subject grades and the recommendation lines are derived mechanically from
 * the live numbers above — nothing is invented.
 */

import { motion } from "framer-motion";
import {
  ArrowLeft, Award, BookOpen, Brain, Clock, GraduationCap,
  Sparkles, Target, TrendingUp, Trophy, Zap,
} from "lucide-react";
import Link from "next/link";
import { PrismLogo } from "@/components/prism/PrismLogo";
import {
  useDashboardData, achievementItems,
} from "@/components/dashboard/useDashboardData";
import type { SubjectMastery, Achievement } from "@/components/dashboard/types";
import {
  achievementIcon, EmptyState, ErrorState, GoldNumber,
  SignedOutState, SectionHeading, StatCardSkeleton, BarSkeleton,
  CardRowSkeleton, riseItem, staggerContainer, safeLabel,
} from "@/components/dashboard/ui";
import { ActivityFeed } from "@/components/dashboard/ActivityPulse";

/* ---------------- grade derivation (mechanical, from real mastery %) ------- */

function gradeFor(pct: number): string {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B+";
  if (pct >= 60) return "B";
  if (pct >= 40) return "C";
  return "D";
}

const gradeColors: Record<string, string> = {
  "A+": "text-mint-300 bg-mint-500/10 border-mint-500/30",
  "A": "text-mint-300 bg-mint-500/10 border-mint-500/30",
  "B+": "text-brand-300 bg-brand-500/10 border-brand-500/30",
  "B": "text-gold-300 bg-gold-500/10 border-gold-500/30",
  "C": "text-accent-300 bg-accent-500/10 border-accent-500/30",
  "D": "text-red-300 bg-red-500/10 border-red-500/30",
};

/** Review stats arrive as 0–1 or 0–100 depending on the metric — normalize. */
function pctOf(v: number | undefined): number | null {
  if (v == null || Number.isNaN(v)) return null;
  return Math.round(v <= 1 ? v * 100 : v);
}

/* ---------------- page ---------------- */

export default function PortfolioPage() {
  const {
    signedOut,
    dashboard: dash,
    mastery,
    overview,
    activity,
    achievements,
    reviewStats,
  } = useDashboardData();

  const user = dash.data?.user;
  const displayName = user?.name?.trim() || "Scholar";
  const classLine = [
    user?.class_level ? `Class ${user.class_level}` : null,
    user?.board ?? null,
  ].filter(Boolean).join(" · ");

  const avgMastery = Math.round(overview.data?.avgMastery ?? 0);
  const subjects: SubjectMastery[] = mastery.data ?? [];
  const earned: Achievement[] = achievementItems(achievements.data)
    .filter((a) => a.unlocked)
    .sort((a, b) => (b.unlockedAt ?? "").localeCompare(a.unlockedAt ?? ""));

  const statsLoading = dash.status === "loading" || overview.status === "loading";

  const stats = [
    { label: "Nodes Mastered", value: overview.data?.masteredNodes ?? 0, icon: BookOpen, color: "text-brand-300" },
    { label: "Study Hours", value: overview.data?.studyTimeHours ?? 0, icon: Clock, color: "text-accent-300" },
    { label: "Day Streak", value: dash.data?.streak ?? 0, icon: Zap, color: "text-gold-300" },
    { label: "Achievements", value: achievements.data?.unlockedCount ?? earned.length, icon: Trophy, color: "text-accent-300" },
    { label: "Total XP", value: dash.data?.totalXp ?? user?.total_xp ?? 0, icon: Sparkles, color: "text-brand-300" },
    { label: "Level", value: dash.data?.level ?? user?.current_level ?? 1, icon: TrendingUp, color: "text-mint-300" },
  ];

  // Data-derived pointers: weakest subject, streak nudge, nearest badge.
  const weakest = [...subjects]
    .filter((s) => (s.totalNodes ?? 0) > 0)
    .sort((a, b) => (a.masteryPercentage ?? 0) - (b.masteryPercentage ?? 0))[0];
  const streak = dash.data?.streak ?? 0;
  const nextBadge = achievementItems(achievements.data)
    .filter((a) => !a.unlocked && a.maxProgress)
    .sort((a, b) => (b.progress ?? 0) / (b.maxProgress ?? 1) - (a.progress ?? 0) / (a.maxProgress ?? 1))[0];

  const recommendations: { text: string; href: string; cta: string }[] = [];
  if (overview.status === "ready" && mastery.status === "ready") {
    if (weakest && (weakest.masteryPercentage ?? 0) < 60) {
      recommendations.push({
        text: `${safeLabel(weakest.subject)} is your weakest subject at ${Math.round(weakest.masteryPercentage ?? 0)}% mastery — a 15-minute practice session would lift it.`,
        href: "/practice",
        cta: "Practice",
      });
    }
    recommendations.push(
      streak > 0
        ? { text: `You're on a ${streak}-day streak — one session today keeps it alive.`, href: "/learn", cta: "Learn" }
        : { text: "No active streak — complete one activity today to start one.", href: "/learn", cta: "Learn" },
    );
    if (nextBadge) {
      const p = nextBadge.maxProgress ? Math.round(((nextBadge.progress ?? 0) / nextBadge.maxProgress) * 100) : 0;
      recommendations.push({
        text: `"${nextBadge.title}" is ${p}% unlocked — closest badge to earning.`,
        href: "/achievements",
        cta: "View",
      });
    } else {
      recommendations.push({
        text: "All visible badges are earned — more unlock as you master new nodes.",
        href: "/achievements",
        cta: "View",
      });
    }
  }

  return (
    <div className="min-h-screen mesh-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2" aria-label="Back to dashboard">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-lg font-semibold text-white">Mastery Portfolio</h1>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-surface-600">
            <Brain className="w-3.5 h-3.5 text-mint-300" />
            Live data
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {signedOut ? (
          <SignedOutState />
        ) : (
          <>
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
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-2xl font-bold text-white">
                    {dash.status === "loading" ? (
                      <span className="text-surface-600">Loading…</span>
                    ) : (
                      <GoldNumber>{displayName}</GoldNumber>
                    )}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {classLine && <span className="badge-brand">{classLine}</span>}
                    <span className="badge">Tracked across 9,010 syllabus nodes</span>
                  </div>
                </div>
                <div className="text-center">
                  {overview.status === "loading" ? (
                    <BarSkeleton />
                  ) : overview.status === "error" ? (
                    <p className="text-sm text-surface-600">—</p>
                  ) : (
                    <>
                      <p className="text-4xl font-bold gradient-text">{avgMastery}%</p>
                      <p className="text-xs text-surface-600">Overall Mastery</p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Summary stats — all live */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
            >
              {statsLoading
                ? Array.from({ length: 6 }, (_, i) => <StatCardSkeleton key={i} />)
                : stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={riseItem}
                    className="glass-card p-4 flex items-center gap-3"
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    <div>
                      <p className="text-xs text-surface-600">{stat.label}</p>
                      <p className="text-lg font-bold text-white">
                        {stat.label === "Study Hours"
                          ? (Math.round((overview.data?.studyTimeHours ?? 0) * 10) / 10)
                          : stat.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </motion.div>

            {/* Subject mastery table */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="glass-card p-6 mb-6">
              <SectionHeading
                icon={Brain}
                title="Subject Mastery"
                hint="Live from the Atlas syllabus graph"
              />
              {mastery.status === "loading" ? (
                <CardRowSkeleton count={4} />
              ) : mastery.status === "error" && overview.status === "error" ? (
                <ErrorState title="Mastery data is offline right now" />
              ) : subjects.length === 0 ? (
                <EmptyState
                  icon={BookOpen}
                  title="No mastery recorded yet"
                  body="Complete a lesson or a practice session and your per-subject mastery will appear here, tracked node by node."
                  ctaHref="/learn"
                  ctaLabel="Start learning"
                  secondaryHref="/diagnostic"
                  secondaryLabel="Take a diagnostic"
                />
              ) : (
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
                      {subjects.map((s, i) => {
                        const pct = Math.round(s.masteryPercentage ?? 0);
                        return (
                          <tr key={`${s.subject}-${i}`} className="border-b border-surface-300/10">
                            <td className="py-3 text-sm text-white">{safeLabel(s.subject)}</td>
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 rounded-full bg-surface-300/40 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="h-full rounded-full bg-brand-gradient"
                                  />
                                </div>
                                <span className="text-xs text-white">{pct}%</span>
                              </div>
                            </td>
                            <td className="py-3 text-xs text-surface-600 hidden sm:table-cell">
                              {s.masteredNodes ?? 0}/{s.totalNodes ?? 0}
                            </td>
                            <td className="py-3 text-right">
                              <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold border ${gradeColors[gradeFor(pct)]}`}>
                                {gradeFor(pct)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              {/* Retention & accuracy — real SM-2 stats, replaces the old fabricated "skills" */}
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="glass-card p-6">
                <SectionHeading
                  icon={Target}
                  title="Retention & Accuracy"
                  hint="Spaced-repetition performance (SM-2)"
                />
                {reviewStats.status === "loading" ? (
                  <CardRowSkeleton count={3} />
                ) : reviewStats.status === "error" ? (
                  <ErrorState title="Review stats are offline right now" />
                ) : (reviewStats.data?.totalItems ?? 0) === 0 ? (
                  <EmptyState
                    icon={Target}
                    title="Nothing to review yet"
                    body="Once you practice, Atlas schedules each concept for spaced review so it sticks. Your retention and accuracy will show up here."
                    ctaHref="/practice"
                    ctaLabel="Start practicing"
                  />
                ) : (
                  <div className="space-y-4">
                    {[
                      { name: "Retention Rate", value: pctOf(reviewStats.data?.retentionRate), icon: Brain },
                      { name: "Accuracy", value: pctOf(reviewStats.data?.accuracy), icon: Target },
                      { name: "Reviewed Today", value: reviewStats.data?.reviewedToday ?? 0, icon: TrendingUp, raw: true },
                    ].map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <skill.icon className="w-4 h-4 text-brand-300" />
                            <span className="text-xs text-surface-700">{skill.name}</span>
                          </div>
                          <span className="text-xs font-medium text-white">
                            {skill.raw ? skill.value : skill.value == null ? "—" : `${skill.value}%`}
                          </span>
                        </div>
                        {!skill.raw && (
                          <div className="h-2 rounded-full bg-surface-300/40 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.value ?? 0}%` }}
                              transition={{ duration: 0.8 }}
                              className="h-full rounded-full bg-accent-gradient"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                    <p className="text-[11px] text-surface-600">
                      {reviewStats.data?.dueToday
                        ? `${reviewStats.data.dueToday} concept${reviewStats.data.dueToday === 1 ? "" : "s"} due for review today.`
                        : "Nothing due for review right now."}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Achievements */}
              <motion.div variants={staggerContainer} initial="hidden" animate="show" className="glass-card p-6">
                <SectionHeading
                  icon={Award}
                  title="Earned Achievements"
                  hint={achievements.data?.unlockedCount != null ? `${achievements.data.unlockedCount} unlocked` : undefined}
                />
                {achievements.status === "loading" ? (
                  <CardRowSkeleton count={3} />
                ) : achievements.status === "error" ? (
                  <ErrorState title="Achievements are offline right now" />
                ) : earned.length === 0 ? (
                  <EmptyState
                    icon={Trophy}
                    title="No badges earned yet"
                    body="Your first badge — First Steps — unlocks the moment you complete your first lesson."
                    ctaHref="/learn"
                    ctaLabel="Earn your first badge"
                  />
                ) : (
                  <div className="space-y-3">
                    {earned.slice(0, 5).map((a) => {
                      const Icon = achievementIcon(a.iconName ?? a.icon ?? undefined);
                      return (
                        <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-200/30">
                          <div className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-500/30 flex items-center justify-center">
                            <Icon className="w-4 h-4 text-gold-300" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-white truncate">{a.title}</p>
                            <p className="text-[10px] text-surface-600">
                              {a.unlockedAt ? new Date(a.unlockedAt).toLocaleDateString() : "Earned"}
                            </p>
                          </div>
                          <span className="text-[10px] uppercase text-gold-300">{a.tier ?? "bronze"}</span>
                        </div>
                      );
                    })}
                    {earned.length > 5 && (
                      <Link href="/achievements" className="btn-secondary w-full justify-center text-xs">
                        View all {earned.length}
                      </Link>
                    )}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Recent sessions */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="glass-card p-6 mb-6">
              <SectionHeading icon={BookOpen} title="Recent Activity" hint="Your latest sessions, live" />
              <ActivityFeed
                items={activity.data}
                loading={activity.status === "loading"}
                failed={activity.status === "error"}
              />
            </motion.div>

            {/* Next moves — derived from the live numbers above */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="glass-card p-6">
              <SectionHeading icon={Sparkles} title="Suggested Next Moves" hint="Derived from your live mastery data" />
              {recommendations.length === 0 ? (
                <p className="text-sm text-surface-600">Loading suggestions from your live data…</p>
              ) : (
                <div className="space-y-2">
                  {recommendations.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-surface-200/30">
                      <Sparkles className="w-4 h-4 text-brand-300 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-surface-700 flex-1">{rec.text}</p>
                      <Link href={rec.href} className="btn-ghost text-[11px] text-brand-300 flex-shrink-0">
                        {rec.cta} →
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
