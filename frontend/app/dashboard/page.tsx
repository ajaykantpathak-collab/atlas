"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, Brain, Target, Gamepad2, TrendingUp, CheckCircle2, XCircle,
  Loader2, Sparkles, Compass,
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";
import { PrismLogo } from "@/components/prism/PrismLogo";
import { GoldenGalaxy } from "@/components/prism/GoldenGalaxy";

interface RecentAttempt {
  node_id?: string;
  correct?: boolean;
}

interface RecentSim {
  game_id?: string;
  score?: number;
  stars?: number;
}

interface ParentDashboardData {
  mastery_summary?: {
    mastered?: number;
    in_progress?: number;
  };
  recent_attempts?: RecentAttempt[];
  recent_sims?: RecentSim[];
}

export default function DashboardPage() {
  const [data, setData] = useState<ParentDashboardData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    api
      .getParentDashboard(1)
      .then(setData)
      .catch(() => setFailed(true));
  }, []);

  const mastered = data?.mastery_summary?.mastered ?? 0;
  const inProgress = data?.mastery_summary?.in_progress ?? 0;
  const totalTracked = mastered + inProgress;
  const recentAttempts = data?.recent_attempts ?? [];
  const recentSims = data?.recent_sims ?? [];

  return (
    <div className="min-h-screen mesh-bg-animated">
      {/* Ambient backdrop — dimmed golden galaxy behind the header */}
      <div className="absolute inset-x-0 top-0 h-80 overflow-hidden pointer-events-none" aria-hidden>
        <GoldenGalaxy className="absolute inset-0 w-full h-full opacity-40" compact />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 100% at 50% 0%, transparent 40%, #0a0a0f 100%)" }}
        />
      </div>

      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/" className="btn-ghost px-2" aria-label="Back">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Atlas Dashboard</h1>
          </div>
          <div className="flex items-center gap-2 text-xs text-surface-600">
            <Compass className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline">Your learning map</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div>
          <h2 className="font-display text-3xl font-bold text-white">Mastery at a glance</h2>
          <p className="text-surface-600 text-sm mt-2">
            Every number here comes from your real practice history — nothing is estimated.
          </p>
        </div>

        {/* Loading */}
        {!data && !failed && (
          <div className="glass-card rounded-3xl p-12 text-center">
            <Loader2 className="w-8 h-8 text-gold-400 mx-auto mb-3 animate-spin" />
            <p className="text-sm text-surface-600">Loading your progress…</p>
          </div>
        )}

        {/* Load failure — honest state, no fabricated numbers */}
        {failed && (
          <div className="glass-card rounded-3xl p-12 text-center">
            <Sparkles className="w-8 h-8 text-gold-400 mx-auto mb-3" />
            <h3 className="font-display text-lg font-semibold text-white mb-2">
              Progress is offline right now
            </h3>
            <p className="text-sm text-surface-600 max-w-md mx-auto">
              We couldn&apos;t reach the server, so there&apos;s nothing to show yet. Everything you
              see here is tracked live — no placeholder stats.
            </p>
          </div>
        )}

        {data && (
          <>
            {/* Mastery summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-mint-300" />
                  <span className="text-xs text-surface-600 font-medium">Nodes Mastered</span>
                </div>
                <p className="font-display text-4xl font-bold text-white">{mastered}</p>
                <p className="text-[11px] text-surface-600 mt-2">
                  {totalTracked > 0
                    ? `${Math.round((mastered / totalTracked) * 100)}% of concepts you've started`
                    : "Answer your first question to begin tracking"}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-gold-300" />
                  <span className="text-xs text-surface-600 font-medium">In Progress</span>
                </div>
                <p className="font-display text-4xl font-bold text-white">{inProgress}</p>
                <p className="text-[11px] text-surface-600 mt-2">
                  {inProgress > 0
                    ? "Concepts you're actively building"
                    : "Start a practice session to open your first concept"}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-4 h-4 text-gold-300" />
                  <span className="text-xs text-surface-600 font-medium">Next Step</span>
                </div>
                <p className="text-sm text-white font-medium leading-relaxed mb-4">
                  {inProgress > 0
                    ? "Pick up where you left off — practice your in-progress concepts."
                    : "Take a diagnostic or start practicing to map your knowledge."}
                </p>
                <Link href="/practice" className="btn-primary w-full">
                  <Brain className="w-4 h-4" />
                  Practice Now
                </Link>
              </motion.div>
            </div>

            {/* Recent activity + games */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Recent attempts */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="font-display text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-mint-300" />
                  Recent Answers
                </h3>
                {recentAttempts.length > 0 ? (
                  <ul className="space-y-2.5">
                    {recentAttempts.slice(0, 5).map((a, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/5"
                      >
                        <span className="text-xs text-surface-700 truncate max-w-[70%]">
                          {a.node_id || "Concept"}
                        </span>
                        {a.correct ? (
                          <span className="flex items-center gap-1 text-[11px] font-medium text-mint-300">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Correct
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-medium text-rose-300">
                            <XCircle className="w-3.5 h-3.5" />
                            Review
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <Target className="w-6 h-6 text-surface-600 mx-auto mb-2" />
                    <p className="text-sm text-surface-600">
                      No answers recorded yet. Answer your first question to begin tracking.
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Recent games */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="font-display text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-gold-300" />
                  Recent Games
                </h3>
                {recentSims.length > 0 ? (
                  <ul className="space-y-2.5">
                    {recentSims.slice(0, 5).map((s, i) => (
                      <li
                        key={i}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/5"
                      >
                        <span className="text-xs text-surface-700 truncate max-w-[60%]">
                          {s.game_id || "Simulation"}
                        </span>
                        <span className="text-[11px] font-display font-bold text-gold-300">
                          {s.score ?? 0} pts
                          {typeof s.stars === "number" ? ` · ${s.stars}★` : ""}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8">
                    <Gamepad2 className="w-6 h-6 text-surface-600 mx-auto mb-2" />
                    <p className="text-sm text-surface-600">
                      No games played yet. Your simulation scores will appear here.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
