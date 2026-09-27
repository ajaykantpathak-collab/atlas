"use client";

/**
 * Quizzes — /quizzes
 *
 * A launcher into the real quiz engines + your live quiz history:
 *   GET /api/progress/dashboard        → streak
 *   GET /api/progress/activity         → real quiz/exam sessions
 *
 * The previous version rendered six hardcoded quizzes with fabricated best
 * scores and a dead "Start Quiz" button. Every action here now leads to a
 * real, working engine (diagnostic, practice, exam), and every number on the
 * page is live — empty history says so honestly.
 */

import { motion } from "framer-motion";
import {
  ArrowLeft, BookOpenCheck, Brain, ChevronRight, ClipboardList, Flame,
  GraduationCap, ScanLine, Target, Trophy,
} from "lucide-react";
import Link from "next/link";
import { PrismLogo } from "@/components/prism/PrismLogo";
import {
  useDashboardData,
} from "@/components/dashboard/useDashboardData";
import type { ActivityItem } from "@/components/dashboard/types";
import {
  EmptyState, ErrorState, GoldNumber,
  SignedOutState, StatCardSkeleton, staggerContainer, riseItem,
} from "@/components/dashboard/ui";
import { ActivityFeed } from "@/components/dashboard/ActivityPulse";

/** Percent from an activity score string like "85%" or "7/10" — null if absent. */
function scorePct(score?: string | null): number | null {
  if (!score) return null;
  const pct = score.match(/(\d+(?:\.\d+)?)\s*%/);
  if (pct) return Number(pct[1]);
  const frac = score.match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
  if (frac && Number(frac[2]) > 0) return Math.round((Number(frac[1]) / Number(frac[2])) * 100);
  return null;
}

const QUIZ_TYPES = new Set(["quiz", "exam", "practice", "diagnostic"]);

const ENGINES = [
  {
    href: "/diagnostic",
    icon: ScanLine,
    title: "Diagnostic Quiz",
    body: "Adaptive scan that finds exactly what you know — and what to fix next.",
    accent: "text-brand-300",
    bg: "bg-brand-500/10 border-brand-500/20",
  },
  {
    href: "/practice",
    icon: Target,
    title: "Practice Quiz",
    body: "Auto-generated questions on your class syllabus, graded instantly.",
    accent: "text-mint-300",
    bg: "bg-mint-500/10 border-mint-500/20",
  },
  {
    href: "/exam",
    icon: ClipboardList,
    title: "Exam Simulation",
    body: "Full timed paper with sections, strategy and real grading.",
    accent: "text-gold-300",
    bg: "bg-gold-500/10 border-gold-500/20",
  },
  {
    href: "/chapter-test",
    icon: BookOpenCheck,
    title: "Chapter Test",
    body: "15-25 questions spanning a whole chapter, with a per-topic report and Story links for weak topics.",
    accent: "text-sky-300",
    bg: "bg-sky-500/10 border-sky-500/20",
  },
  {
    href: "/exam-prep",
    icon: GraduationCap,
    title: "Pre-Board Simulator",
    body: "Full CBSE-pattern papers for classes 10/12 — sections, internal choice, official marking scheme.",
    accent: "text-gold-300",
    bg: "bg-gold-500/10 border-gold-500/20",
  },
];

export default function QuizzesPage() {
  const { signedOut, dashboard: dash, activity } = useDashboardData();

  const items: ActivityItem[] = activity.data ?? [];
  const quizItems = items.filter((a) => QUIZ_TYPES.has((a.activityType ?? "").toLowerCase()));
  const scores = quizItems.map((a) => scorePct(a.score)).filter((v): v is number => v != null);
  const avgScore = scores.length
    ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length)
    : null;
  const streak = dash.data?.streak ?? 0;

  const stats = [
    { label: "Quiz Sessions (recent)", value: quizItems.length || "—", icon: Trophy, color: "text-gold-300" },
    { label: "Avg Recent Score", value: avgScore == null ? "—" : `${avgScore}%`, icon: Target, color: "text-brand-300" },
    { label: "Day Streak", value: streak || "—", icon: Flame, color: "text-orange-300" },
  ];

  return (
    <div className="min-h-screen mesh-bg">
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2" aria-label="Back to dashboard">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Quizzes</h1>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-surface-600">
            <Brain className="w-3.5 h-3.5 text-mint-300" />
            Live data
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {signedOut ? (
          <div className="mb-8">
            <SignedOutState />
          </div>
        ) : (
          /* Stats — live */
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="grid grid-cols-3 gap-4 mb-8"
          >
            {dash.status === "loading" || activity.status === "loading"
              ? Array.from({ length: 3 }, (_, i) => <StatCardSkeleton key={i} />)
              : stats.map((s) => (
                  <motion.div key={s.label} variants={riseItem} className="glass-card p-4 text-center">
                    <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-1`} />
                    <p className="text-lg font-bold text-white">
                      <GoldNumber>{s.value}</GoldNumber>
                    </p>
                    <p className="text-[10px] text-surface-600">{s.label}</p>
                  </motion.div>
                ))}
          </motion.div>
        )}

        {/* Real quiz engines */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-3">
          {ENGINES.map((e) => (
            <motion.div key={e.href} variants={riseItem}>
              <Link href={e.href} className="glass-card-hover p-5 flex items-center gap-4 group">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 ${e.bg}`}>
                  <e.icon className={`w-6 h-6 ${e.accent}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">{e.title}</h3>
                  <p className="text-[11px] text-surface-600 mt-1">{e.body}</p>
                </div>
                <span className="btn-primary text-xs flex-shrink-0">
                  Start
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Live quiz history */}
        <div className="mt-10">
          <h2 className="font-display text-lg font-bold text-white flex items-center gap-2 mb-4">
            <ClipboardList className="w-5 h-5 text-gold-400" />
            Recent Quiz &amp; Exam Sessions
          </h2>
          {signedOut ? null : activity.status === "error" ? (
            <ErrorState title="Quiz history is offline right now" />
          ) : activity.status !== "loading" && quizItems.length === 0 ? (
            <EmptyState
              icon={Trophy}
              title="No quiz sessions yet"
              body="Take a diagnostic or a practice quiz and every attempt — score, subject and time — will be tracked here."
              ctaHref="/diagnostic"
              ctaLabel="Take a diagnostic"
              secondaryHref="/practice"
              secondaryLabel="Practice instead"
            />
          ) : (
            <ActivityFeed
              items={quizItems}
              loading={activity.status === "loading"}
              failed={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
