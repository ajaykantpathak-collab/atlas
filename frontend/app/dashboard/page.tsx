"use client";

/**
 * Student Command Center — /dashboard
 *
 * Fully wired to the live backend (every figure is real, nothing estimated):
 *   CommandBriefing leads the page (greeting, today's ONE mission, the
 *   state-of-you strip, review radar) — see CommandBriefing.tsx for its
 *   data contracts.
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
import { Compass, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { PrismLogo } from "@/components/prism/PrismLogo";
import { AtlasGalaxy } from "@/components/atlas/AtlasGalaxy";
import { useDashboardData } from "@/components/dashboard/useDashboardData";
import CommandBriefing from "@/components/dashboard/CommandBriefing";
import StudyPlan from "@/components/studyplan/StudyPlan";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { isJunior } from "@/lib/classBands";
import MasteryOverview, {
  MasteryError, MasteryLoading,
} from "@/components/dashboard/MasteryOverview";
import ContinueLearning from "@/components/dashboard/ContinueLearning";
import AchievementsPreview from "@/components/dashboard/AchievementsPreview";
import { ActivityFeed, WeeklyPulse } from "@/components/dashboard/ActivityPulse";
import { GoldNumber, SignedOutState } from "@/components/dashboard/ui";
import { useEngagementGoal, useNotifications } from "@/components/engagement/useEngagement";
import DailyGoalCard from "@/components/engagement/DailyGoalCard";
import StreakRescueBanner from "@/components/engagement/StreakRescueBanner";
import NotificationBell from "@/components/engagement/NotificationBell";
import RevisionCards from "@/components/dashboard/RevisionCards";
import MixupsCard from "@/components/dashboard/MixupsCard";

export default function DashboardPage() {
  const {
    signedOut,
    dashboard: dash,
    mastery,
    overview,
    activity,
    weekly,
    achievements,
    reviewQueue,
    reviewStats,
  } = useDashboardData();

  // Engagement layer — daily goal + streak protection + notification bell.
  // Progress comes only from real recorded activity (backend-derived).
  const goal = useEngagementGoal();
  const notifications = useNotifications();

  // A corrupt/expired token still exists in storage, so `signedOut` alone
  // misses it — every widget 401s and the page renders a ghost. The
  // primary widget's unauthorized status means "log in again".
  const effectivelySignedOut = signedOut || dash.status === "unauthorized";

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
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <PrismLogo size={28} />
            <Link href="/" className="btn-ghost px-2" aria-label="Back">
              <motion.span whileHover={{ x: -2 }} className="block">
                <Compass className="w-4 h-4 text-gold-300" />
              </motion.span>
            </Link>
            {/* CHILD-LENS (fix 14/mobile): the title truncates instead of
                wrapping behind the notification bell on 390px screens. */}
            <h1 className="font-display text-xs sm:text-sm font-semibold text-white truncate min-w-0">
              Atlas Command Center
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0">
            {/* Notification center — real, derived notifications only.
                Gated on token presence (not dashboard readiness): a slow
                /api/progress/dashboard must not hide the bell — the bell
                manages its own honest load/error states. */}
            {!signedOut && (
              <NotificationBell
                data={notifications.data}
                status={notifications.status}
                markRead={notifications.markRead}
                markAllRead={notifications.markAllRead}
              />
            )}
            {/* EN/हिंदी chrome toggle — real translation map, authored content unaffected */}
            <LanguageSwitcher />
            {/* Galaxy Home — the living universe is the primary way in.
                Icon-only on phones so the label never clips. */}
            <Link
              href="/my-galaxy"
              aria-label="Your galaxy"
              className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl bg-gold-500/15 border border-gold-500/40 text-gold-300 font-display font-bold hover:bg-gold-500/25 transition"
            >
              <motion.span whileHover={{ rotate: 12 }} className="block">
                <Sparkles className="w-3.5 h-3.5" />
              </motion.span>
              <span className="hidden sm:inline">Your galaxy</span>
            </Link>
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
        {effectivelySignedOut ? (
          <SignedOutState />
        ) : (
          <>
            {/* Streak protection — honest, dismissible (returns next day) */}
            <StreakRescueBanner data={goal.data} />

            {/* Command Briefing — leads the home view: greeting, ONE mission,
                the real-number state strip (incl. today's goal), and (when
                truly due) the review radar. Quietly hides if the backend is
                unreachable. */}
            <CommandBriefing
              dash={dash.data}
              dashStatus={dash.status}
              overview={overview.data}
              reviewQueue={reviewQueue.data}
              queueStatus={reviewQueue.status}
              engagement={{ data: goal.data, status: goal.status }}
            />

            {/* CHILD-LENS (CHILD_EXPERIENCE_GAPS.md fix 8): /junior is the
                one surface designed FOR young children — pastel, mascot,
                big targets — but nothing ever linked to it. Only classes 1-5
                see the door (lib/classBands). This read `<= 7`, which pushed
                the elephant card at Class 6 and 7 children too. */}
            {isJunior(dash.data?.user?.class_level as number | undefined) && (
              <Link
                href="/junior"
                data-testid="junior-mode-card"
                className="group flex items-center gap-4 rounded-2xl border border-pink-400/30 bg-gradient-to-r from-pink-500/[0.12] via-purple-500/[0.08] to-transparent px-5 py-4 transition-colors hover:border-pink-400/60"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-500/15 border border-pink-400/30 text-2xl" aria-hidden>
                  🐘
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-sm font-bold text-white">
                    Junior Mode — made for your class
                  </span>
                  <span className="block text-xs text-surface-600 mt-0.5">
                    Big friendly targets, a little elephant guide, and stars for everything you learn.
                  </span>
                </span>
                <span className="hidden sm:flex shrink-0 items-center gap-1 text-xs font-semibold text-pink-300">
                  Open
                  <Compass className="w-3.5 h-3.5" aria-hidden />
                </span>
              </Link>
            )}

            {/* The week's personal plan — real tasks from real data:
                due reviews → weakest topic → next chapter → stretch.
                Completion ticks come from recorded activity or the
                student's own mark; a new student's plan honestly starts
                at "take your first diagnostic". */}
            <StudyPlan
              dash={dash.data}
              dashStatus={dash.status}
              reviewQueue={reviewQueue.data}
              queueStatus={reviewQueue.status}
              reviewStats={reviewStats.data}
              statsStatus={reviewStats.status}
            />

            {/* Daily goal — real ring, real today-progress, per-student */}
            <DailyGoalCard
              data={goal.data}
              status={goal.status}
              saving={goal.saving}
              setGoal={goal.setGoal}
              clearGoal={goal.clearGoal}
            />

            {/* EXAMREADY: "My revision cards" — the device-local library the
                "Today I learned" story card writes into. Hides when empty. */}
            <RevisionCards />

            {/* §5/§7: "Your mix-ups" — the self-named error-pattern journal
                practice writes on wrong answers. Hides when empty. */}
            <MixupsCard />

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
          Powered by the official Atlas syllabus — every figure here comes from your real practice.
        </p>
      </div>
    </div>
  );
}
