"use client";

/**
 * HeroStats — the command-center stat strip.
 * Every figure is read straight from GET /api/progress/dashboard and
 * GET /api/progress/overview. Nothing defaults to a fake value: when the
 * backend hasn't sent a field yet, the card says so.
 */

import { motion } from "framer-motion";
import { Flame, Gauge, Target, Zap } from "lucide-react";
import type { DashboardData, ProgressOverview } from "./types";
import { GoldNumber, riseItem, SkeletonBlock, staggerContainer } from "./ui";

function StatCard({
  icon: Icon,
  label,
  children,
  foot,
  delay,
}: {
  icon: typeof Zap;
  label: string;
  children: React.ReactNode;
  foot: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      variants={riseItem}
      transition={{ delay }}
      className="glass-card rounded-2xl p-5 sm:p-6 relative overflow-hidden group"
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center">
          <Icon className="w-4 h-4 text-gold-300" />
        </div>
        <span className="text-xs text-surface-600 font-medium">{label}</span>
      </div>
      <div className="font-display text-3xl sm:text-4xl font-bold leading-none">{children}</div>
      <div className="text-[11px] text-surface-600 mt-3">{foot}</div>
    </motion.div>
  );
}

function LoadingCards() {
  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="glass-card rounded-2xl p-5 sm:p-6">
          <SkeletonBlock className="h-8 w-8 rounded-xl mb-3" />
          <SkeletonBlock className="h-9 w-16 mb-3" />
          <SkeletonBlock className="h-2.5 w-24" />
        </div>
      ))}
    </motion.div>
  );
}

export default function HeroStats({
  dashboard,
  overview,
}: {
  dashboard: DashboardData | null;
  overview: ProgressOverview | null;
}) {
  if (!dashboard) return <LoadingCards />;

  const totalXp = dashboard.totalXp ?? dashboard.user?.total_xp ?? 0;
  const level = dashboard.level ?? dashboard.user?.current_level ?? 1;
  const levelXp = dashboard.levelXp ?? 0;
  const levelMax = dashboard.levelMax && dashboard.levelMax > 0 ? dashboard.levelMax : 100;
  const levelPct = Math.min(100, Math.round((levelXp / levelMax) * 100));
  const streak = dashboard.streak ?? dashboard.user?.streak_days ?? 0;
  const avgMastery = Math.round(overview?.avgMastery ?? 0);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={Zap} label="Total XP" delay={0} foot={totalXp > 0 ? "Earned across all activities" : "Earn XP with your first activity"}>
        <GoldNumber>{totalXp.toLocaleString("en-IN")}</GoldNumber>
      </StatCard>

      <StatCard
        icon={Gauge}
        label="Level"
        delay={0.05}
        foot={
          <div>
            <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-1.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${levelPct}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
              />
            </div>
            {levelXp.toLocaleString("en-IN")} / {levelMax.toLocaleString("en-IN")} XP to Level {level + 1}
          </div>
        }
      >
        {level}
      </StatCard>

      <StatCard
        icon={Flame}
        label="Day Streak"
        delay={0.1}
        foot={streak > 0 ? "Keep it alive — practice today" : "Start today to light the flame"}
      >
        {streak > 0 ? <GoldNumber>{streak}</GoldNumber> : <span className="text-white">{streak}</span>}
      </StatCard>

      <StatCard
        icon={Target}
        label="Avg Mastery"
        delay={0.15}
        foot={avgMastery > 0 ? "Across every subject you track" : "Take your first diagnostic to measure it"}
      >
        {avgMastery}
        <span className="text-lg text-surface-500 font-semibold">%</span>
      </StatCard>
    </motion.div>
  );
}
