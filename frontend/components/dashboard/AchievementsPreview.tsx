"use client";

/**
 * AchievementsPreview — earned-vs-locked strip for the dashboard.
 * Data: GET /api/achievements/?filter=all (AchievementListResponse).
 * Earned badges get gold treatment; locked ones stay dim with progress.
 * Links to /achievements for the full badge wall.
 */

import { motion } from "framer-motion";
import { ArrowRight, Lock, Trophy } from "lucide-react";
import Link from "next/link";
import type { Achievement } from "./types";
import { achievementIcon, EmptyState, ErrorState, GoldNumber, SkeletonBlock } from "./ui";

function BadgeTile({ achievement, index }: { achievement: Achievement; index: number }) {
  const Icon = achievementIcon(achievement.iconName ?? achievement.icon ?? undefined);
  const unlocked = Boolean(achievement.unlocked);
  const pct =
    achievement.progress != null && achievement.maxProgress
      ? Math.min(100, Math.round((achievement.progress / achievement.maxProgress) * 100))
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="shrink-0 w-36 text-center"
    >
      <Link href="/achievements" aria-label={achievement.title} className="block group">
        <div
          className={`relative w-20 h-20 mx-auto rounded-2xl flex items-center justify-center border transition-transform group-hover:-translate-y-0.5 ${
            unlocked
              ? "bg-gradient-to-br from-gold-400/25 via-gold-500/15 to-gold-600/25 border-gold-400/50 shadow-glow-warm"
              : "bg-white/[0.03] border-white/[0.06]"
          }`}
        >
          <Icon className={`w-9 h-9 ${unlocked ? "text-gold-300" : "text-surface-600"}`} />
          {!unlocked && (
            <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-surface-100 border border-white/10 flex items-center justify-center">
              <Lock className="w-3 h-3 text-surface-500" />
            </span>
          )}
        </div>
        <p className={`text-xs font-medium mt-2.5 truncate ${unlocked ? "text-white" : "text-surface-600"}`}>
          {achievement.title}
        </p>
        {pct !== null && !unlocked ? (
          <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden mt-1.5 mx-3">
            <div className="h-full rounded-full bg-gold-500/70" style={{ width: `${pct}%` }} />
          </div>
        ) : unlocked ? (
          <p className="text-[10px] text-gold-400/90 mt-1">+{achievement.xpReward ?? 0} XP</p>
        ) : (
          <p className="text-[10px] text-surface-600 mt-1">Locked</p>
        )}
      </Link>
    </motion.div>
  );
}

export default function AchievementsPreview({
  achievements,
  loading,
  failed,
}: {
  achievements: Achievement[] | null;
  loading: boolean;
  failed: boolean;
}) {
  const list = achievements ?? [];
  const earned = list.filter((a) => a.unlocked);
  const locked = list.filter((a) => !a.unlocked);
  // Earned first (newest unlock would need unlockedAt ordering — backend provides it when set)
  const preview = [...earned, ...locked].slice(0, 6);

  return (
    <section>
      <div className="flex items-end justify-between gap-3 mb-4">
        <div>
          <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Trophy className="w-5 h-5 text-gold-400" />
            Achievements
          </h2>
          <p className="text-xs text-surface-600 mt-1">
            {list.length > 0 ? (
              <>
                <GoldNumber className="text-xs">{earned.length}</GoldNumber>
                <span className="text-surface-600"> earned · {locked.length} locked</span>
              </>
            ) : (
              "Your badge wall"
            )}
          </p>
        </div>
        <Link href="/achievements" className="text-xs text-gold-300 hover:text-gold-200 font-medium transition-colors flex items-center gap-1">
          Full wall <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {loading && (
        <div className="flex gap-4 overflow-hidden">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="shrink-0 w-36 text-center">
              <SkeletonBlock className="w-20 h-20 rounded-2xl mx-auto mb-2.5" />
              <SkeletonBlock className="h-3 w-20 mx-auto" />
            </div>
          ))}
        </div>
      )}

      {!loading && failed && <ErrorState title="Achievements are offline right now" />}

      {!loading && !failed && list.length === 0 && (
        <EmptyState
          icon={Trophy}
          title="No badges to show yet"
          body="Badges unlock from your real practice — streaks, accuracy and milestones. Take your first diagnostic and start collecting."
          ctaHref="/diagnostic"
          ctaLabel="Take your first diagnostic"
        />
      )}

      {!loading && !failed && list.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {preview.map((a, i) => (
            <BadgeTile key={a.id} achievement={a} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
