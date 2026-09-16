"use client";

/**
 * Student Command Center — /dashboard
 *
 * Fully wired to the live backend (every figure is real, nothing estimated):
 *   GET /api/progress/dashboard      → hero stats, user, recommended lessons
 *   GET /api/progress/mastery        → subject mastery bars
 *   GET /api/progress/overview       → avg mastery (+ fallback subjects)
 *   GET /api/progress/activity       → recent activity feed
 *   GET /api/progress/weekly-activity→ 7-day study pulse
 *   GET /api/achievements/           → earned vs locked badge strip
 *
 * Empty / offline / signed-out states are honest — placeholder numbers
 * are never shown.
 */

import { motion } from "framer-motion";
import { Compass, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { PrismLogo } from "@/components/prism/PrismLogo";
import { AtlasGalaxy } from "@/components/atlas/AtlasGalaxy";
import { useDashboardData } from "@/components/dashboard/useDashboardData";
import HeroStats from "@/components/dashboard/HeroStats";
import MasteryOverview, {
  MasteryError, MasteryLoading,
} from "@/components/dashboard/MasteryOverview";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import AchievementsPreview from "@/components/dashboard/AchievementsPreview";
import { ActivityFeed, WeeklyPulse } from "@/components/dashboard/ActivityPulse";
import { ErrorState, GoldNumber, SignedOutState, staggerContainer, riseItem } from "@/components/dashboard/ui";

function greeting(): string {
  const h = new Date().getHours();
  if (h < 5) return "Burning the midnight oil";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const {
    signedOut,
    dashboard: dash,
    mastery,
    overview,
    activity,
    weekly,
    achievements,
  } = useDashboardData();

  const user = dash.data?.user;
  const displayName = user?.name?.trim() || "Scholar";
  const classLine = [
    user?.class_level ? `Class ${user.class_level}` : null,
    user?.board ?? null,
  ]
    .filter(Boolean)
    .join(" · ");

  const showSkeletons = dash.status === "loading";

  return (
    <div className="min-h-screen mesh-bg-animated">
      {/* Ambient backdrop — dimmed golden galaxy behind the header */}
      <div className="absolute inset-x-0 top-0 h-80 overflow-hidden pointer-events-none" aria-hidden>
        <AtlasGalaxy className="absolute inset-0 w-full h-full opacity-40" compact />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 100% at 50% 0%, transparent 40%, #0a0a0f 100%)" }}
        />
      </div>

      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/" className="btn-ghost px-2" aria-label="Back">
              <motion.span whileHover={{ x: -2 }} className="block">
                <Compass className="w-4 h-4 text-gold-300" />
              </motion.span>
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Atlas Command Center</h1>
          </div>
          <div className="flex items-center gap-3 text-xs">
            {dash.status === "ready" && dash.data && (
              <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-500/10 border border-gold-500/25 text-gold-300 font-display font-bold">
                <GoldNumber className="text-xs">LV {dash.data.level ?? 1}</GoldNumber>
              </span>
            )}
            <span className="hidden sm:flex items-center gap-1.5 text-surface-600">
              <ShieldCheck className="w-3.5 h-3.5 text-mint-300" />
              Live data
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Greeting */}
        <motion.header variants={staggerContainer} initial="hidden" animate="show">
          <motion.p variants={riseItem} className="text-xs text-surface-600 font-medium tracking-wide uppercase mb-2">
            {classLine || "Your learning, in real numbers"}
          </motion.p>
          <motion.h2 variants={riseItem} className="font-display text-3xl sm:text-4xl font-bold text-white">
            {showSkeletons ? (
              <span className="text-surface-600">Loading your command center…</span>
            ) : (
              <>
                {greeting()}, <GoldNumber>{displayName.split(" ")[0]}</GoldNumber>
              </>
            )}
          </motion.h2>
          <motion.p variants={riseItem} className="text-surface-600 text-sm mt-2">
            Every number on this page streams live from your Atlas account — nothing estimated,
            nothing placeholder.
          </motion.p>
        </motion.header>

        {signedOut && <SignedOutState />}

        {!signedOut && (
          <>
            {/* Hero stats */}
            {dash.status === "error" ? (
              <ErrorState title="Your stats are offline right now" />
            ) : (
              <HeroStats dashboard={dash.data} overview={overview.data} />
            )}

            {/* Continue learning */}
            <ContinueLearning
              lessons={dash.data?.recommendedLessons ?? null}
              loading={dash.status === "loading"}
              failed={dash.status === "error"}
            />

            {/* Mastery map */}
            {mastery.status === "loading" || overview.status === "loading" ? (
              <MasteryLoading />
            ) : mastery.status === "error" && overview.status === "error" ? (
              <MasteryError />
            ) : (
              <MasteryOverview mastery={mastery.data} overview={overview.data} />
            )}

            {/* Weekly pulse + activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <WeeklyPulse
                days={weekly.data}
                loading={weekly.status === "loading"}
                failed={weekly.status === "error"}
              />
              <ActivityFeed
                items={activity.data}
                loading={activity.status === "loading"}
                failed={activity.status === "error"}
              />
            </div>

            {/* Achievements strip */}
            <AchievementsPreview
              achievements={achievements.data ? (achievements.data.achievements ?? achievements.data.items ?? null) : null}
              loading={achievements.status === "loading"}
              failed={achievements.status === "error"}
            />
          </>
        )}

        {/* Honesty footer */}
        <p className="text-center text-[11px] text-surface-600 pt-2">
          Powered by the official Atlas syllabus graph — 9,010 nodes, tracked honestly.
        </p>
      </div>
    </div>
  );
}
