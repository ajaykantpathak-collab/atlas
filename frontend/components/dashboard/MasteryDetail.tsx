"use client";

/**
 * MasteryDetail — the per-subject deep dive for the progress report.
 * Data: GET /api/progress/mastery (primary), GET /api/progress/overview
 * (fallback subjects). Every count is straight from the backend — zero
 * percentages and empty subjects are rendered honestly.
 */

import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { subjectName } from "@/lib/nodeTitle";
import type { ProgressOverview, SubjectMastery } from "./types";
import { GoldNumber, riseItem, staggerContainer } from "./ui";

function SubjectCard({ subject, index }: { subject: SubjectMastery; index: number }) {
  const total = subject.totalNodes ?? 0;
  const mastered = subject.masteredNodes ?? 0;
  const learning = subject.learningNodes ?? 0;
  const notStarted = subject.notStartedNodes ?? 0;
  const pct = Math.max(0, Math.min(100, subject.masteryPercentage ?? 0));
  const weekly = subject.weeklyChange ?? 0;
  const label = subjectName(subject.subject);

  return (
    <motion.div variants={riseItem} className="glass-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="font-display text-base font-bold text-white truncate">{label}</h3>
          <p className="text-[11px] text-surface-600 mt-0.5">
            {total > 0 ? `${total} nodes tracked` : "No nodes tracked yet"}
          </p>
        </div>
        <span className="font-display text-3xl font-bold leading-none shrink-0">
          <GoldNumber>{pct}%</GoldNumber>
        </span>
      </div>

      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay: 0.15 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600"
        />
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className="text-[10px] px-2 py-0.5 rounded-full border border-mint-500/25 bg-mint-500/10 text-mint-300 font-medium">
          {mastered} mastered
        </span>
        {learning > 0 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-gold-500/25 bg-gold-500/10 text-gold-300 font-medium">
            {learning} learning
          </span>
        )}
        {notStarted > 0 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.04] text-surface-600 font-medium">
            {notStarted} not started
          </span>
        )}
      </div>

      <p className="text-[11px] text-surface-600 flex items-center gap-1.5">
        {weekly > 0 ? (
          <>
            <TrendingUp className="w-3 h-3 text-mint-300" />
            <span className="text-mint-300 font-medium">+{weekly}</span> this week
          </>
        ) : weekly < 0 ? (
          <>
            <TrendingDown className="w-3 h-3 text-rose-300" />
            <span className="text-rose-300 font-medium">{weekly}</span> this week
          </>
        ) : (
          <>
            <Minus className="w-3 h-3" /> No change this week yet
          </>
        )}
        {" · "}
        {mastered > 0 && total > mastered
          ? `${total - mastered} to go`
          : total === 0
            ? "answer questions to populate"
            : "answer questions to fill the bar"}
      </p>
    </motion.div>
  );
}

export default function MasteryDetail({
  mastery,
  overview,
  loading,
}: {
  mastery: SubjectMastery[] | null;
  overview: ProgressOverview | null;
  loading: boolean;
}) {
  const subjects: SubjectMastery[] =
    mastery && mastery.length > 0 ? mastery : overview?.subjects ?? [];

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="glass-card rounded-2xl p-5 sm:p-6">
            <div className="h-3 w-24 bg-white/[0.05] rounded mb-4 animate-pulse" />
            <div className="h-8 w-16 bg-white/[0.05] rounded mb-4 animate-pulse" />
            <div className="h-2 w-full bg-white/[0.05] rounded-full mb-4 animate-pulse" />
            <div className="h-2.5 w-32 bg-white/[0.05] rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <h3 className="font-display text-base font-semibold text-white mb-2">No subjects measured yet</h3>
        <p className="text-sm text-surface-600 max-w-sm mx-auto">
          Your per-subject mastery is computed from your real answer history. Take your first
          diagnostic and every subject appears here with honest numbers.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {subjects.map((s, i) => (
        <SubjectCard key={s.subject} subject={s} index={i} />
      ))}
    </motion.div>
  );
}
