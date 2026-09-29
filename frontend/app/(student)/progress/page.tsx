"use client";

/**
 * Progress — the student's full report (/progress).
 *
 * Premium companion to the /dashboard command center, wired to the same
 * verified live endpoints (see /openapi.json):
 *   GET /api/progress/dashboard        → hero stats (XP / level / streak)
 *   GET /api/progress/overview?range=all → avg mastery + node totals
 *   GET /api/progress/mastery          → per-subject deep dive
 *   GET /api/progress/weekly-activity  → 7-day pulse
 *   GET /api/progress/activity?limit=8 → recent sessions
 *   GET /api/progress/heatmap          → study calendar (slow-tolerant)
 *   GET /api/progress/review/queue     → SM-2 due list (slow-tolerant)
 *   GET /api/progress/review/stats     → retention (slow-tolerant)
 *   GET /api/achievements/?filter=all  → badge strip
 *
 * Every number is real. Slow or failing widgets degrade to honest
 * offline/empty cards — placeholder figures are never shown.
 */

import { motion } from "framer-motion";
import {
  Activity as ActivityIcon, ArrowLeft, BarChart3, ShieldCheck, Target, Trophy,
} from "lucide-react";
import Link from "next/link";
import { PrismLogo } from "@/components/prism/PrismLogo";
import HeroStats from "@/components/dashboard/HeroStats";
import MasteryDetail from "@/components/dashboard/MasteryDetail";
import StudyHeatmap from "@/components/dashboard/StudyHeatmap";
import ReviewQueueCard from "@/components/dashboard/ReviewQueueCard";
import AchievementsPreview from "@/components/dashboard/AchievementsPreview";
import { ActivityFeed, WeeklyPulse } from "@/components/dashboard/ActivityPulse";
import {
  EmptyState, ErrorState, GoldNumber, SectionHeading, SignedOutState, riseItem, staggerContainer,
} from "@/components/dashboard/ui";
import { useDashboardData } from "@/components/dashboard/useDashboardData";

export default function ProgressPage() {
  const {
    signedOut,
    dashboard: dash,
    mastery,
    overview,
    activity,
    weekly,
    achievements,
    heatmap,
    reviewQueue,
    reviewStats,
  } = useDashboardData();

  const user = dash.data?.user;
  const displayName = user?.name?.trim() || "Scholar";
  const masteryLoading = mastery.status === "loading" && overview.status === "loading";
  const masteryFailed = mastery.status === "error" && overview.status === "error";

  const totalNodes = overview.data?.totalNodes ?? 0;
  const masteredNodes = overview.data?.masteredNodes ?? 0;
  const studyHours = overview.data?.studyTimeHours ?? 0;

  return (
    <div className="min-h-screen mesh-bg-animated">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2" aria-label="Back to dashboard">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Your Progress</h1>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-surface-600">
            <ShieldCheck className="w-3.5 h-3.5 text-mint-300" />
            Live data
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {/* Header */}
        <motion.header variants={staggerContainer} initial="hidden" animate="show">
          <motion.p variants={riseItem} className="text-xs text-surface-600 font-medium tracking-wide uppercase mb-2">
            The full report
          </motion.p>
          <motion.h2 variants={riseItem} className="font-display text-3xl sm:text-4xl font-bold text-white">
            {dash.status === "loading" ? (
              <span className="text-surface-600">Loading your report…</span>
            ) : (
              <>
                Every number, <GoldNumber>{displayName.split(" ")[0]}</GoldNumber>
              </>
            )}
          </motion.h2>
          <motion.p variants={riseItem} className="text-surface-600 text-sm mt-2">
            Mastery, activity and how much you remember — measured from your real answer history
            against the official syllabus. Nothing estimated.
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

            {/* Overview summary strip — real totals from the overview endpoint */}
            {overview.status === "ready" && overview.data && (
              <motion.div
                variants={riseItem}
                initial="hidden"
                animate="show"
                className="glass-card rounded-2xl p-5 flex flex-wrap items-center gap-x-8 gap-y-3"
              >
                <div className="flex items-center gap-2.5">
                  <Target className="w-4 h-4 text-gold-300" />
                  <p className="text-xs text-surface-600">
                    <span className="text-white font-semibold">{masteredNodes.toLocaleString("en-IN")}</span>{" "}
                    of{" "}
                    <span className="text-white font-semibold">{totalNodes.toLocaleString("en-IN")}</span>{" "}
                    topics mastered
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <ActivityIcon className="w-4 h-4 text-gold-300" />
                  <p className="text-xs text-surface-600">
                    <span className="text-white font-semibold">{studyHours.toLocaleString("en-IN")}</span>{" "}
                    {studyHours === 1 ? "hour" : "hours"} of tracked study
                  </p>
                </div>
                {/* CHILD-LENS (CHILD_EXPERIENCE_GAPS.md fix 6): the one
                    sentence that answers "how is this helping me?" — what the
                    child can now do. Shown only when the mastery is real. */}
                {masteredNodes > 0 && (
                  <p className="text-xs text-mint-300 flex items-center gap-1.5" data-testid="you-can-now">
                    <Trophy className="w-3.5 h-3.5 shrink-0" />
                    You can now walk into a test with {masteredNodes} mastered{" "}
                    {masteredNodes === 1 ? "topic" : "topics"} — that&apos;s yours, from real practice.
                  </p>
                )}
                {totalNodes === 0 && (
                  <Link href="/diagnostic" className="text-xs text-gold-300 hover:text-gold-200 font-medium">
                    Take your first diagnostic →
                  </Link>
                )}
              </motion.div>
            )}

            {/* Mastery Passport — the transcript surface. Without this link
                the passport was reachable only by typing its URL. */}
            <motion.div variants={riseItem} initial="hidden" animate="show">
              <Link
                href="/passport"
                data-testid="passport-link"
                className="glass-card rounded-2xl p-5 flex items-center justify-between gap-4 transition-colors hover:border-gold-500/40"
              >
                <span className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-gold-300 shrink-0" />
                  <span>
                    <span className="block text-sm font-semibold text-white font-display">
                      Mastery Passport
                    </span>
                    <span className="block text-xs text-surface-600">
                      Your subject-by-subject transcript — stamps from real attempts only
                    </span>
                  </span>
                </span>
                <span className="text-xs font-medium text-gold-300 shrink-0">Open →</span>
              </Link>
            </motion.div>

            {/* P5 gap 2 wiring: /portfolio (the longer-form mastery
                portfolio with badges) had no inbound link anywhere. */}
            <motion.div variants={riseItem} initial="hidden" animate="show">
              <Link
                href="/portfolio"
                data-testid="portfolio-link"
                className="glass-card rounded-2xl p-5 flex items-center justify-between gap-4 transition-colors hover:border-gold-500/40"
              >
                <span className="flex items-center gap-3">
                  <ActivityIcon className="w-5 h-5 text-gold-300 shrink-0" />
                  <span>
                    <span className="block text-sm font-semibold text-white font-display">
                      Mastery Portfolio
                    </span>
                    <span className="block text-xs text-surface-600">
                      The full portfolio — sessions, retention and earned badges alongside the transcript
                    </span>
                  </span>
                </span>
                <span className="text-xs font-medium text-gold-300 shrink-0">Open →</span>
              </Link>
            </motion.div>

            {/* Per-subject deep dive */}
            <section>
              <SectionHeading
                icon={BarChart3}
                title="Mastery by Subject"
                hint="Live from your answer history — counts include every tracked node"
              />
              {masteryFailed ? (
                <ErrorState title="Mastery data is offline right now" />
              ) : (
                <MasteryDetail
                  mastery={mastery.data}
                  overview={overview.data}
                  loading={masteryLoading}
                />
              )}
            </section>

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

            {/* Study calendar + review queue */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-3">
                <StudyHeatmap
                  days={heatmap.data}
                  loading={heatmap.status === "loading"}
                  failed={heatmap.status === "error"}
                />
              </div>
              <div className="lg:col-span-2">
                <ReviewQueueCard
                  queue={reviewQueue.data}
                  stats={reviewStats.data}
                  loading={reviewQueue.status === "loading"}
                />
              </div>
            </div>

            {/* Achievements strip */}
            <AchievementsPreview
              achievements={
                achievements.data
                  ? achievements.data.achievements ?? achievements.data.items ?? null
                  : null
              }
              loading={achievements.status === "loading"}
              failed={achievements.status === "error"}
            />

            {/* Bottom CTA */}
            {dash.status === "ready" && (dash.data?.user?.total_xp ?? 0) === 0 && (
              <EmptyState
                icon={Trophy}
                title="Your story starts with one session"
                body="Every figure on this page fills in from real practice. Take your first diagnostic and watch the report come alive."
                ctaHref="/diagnostic"
                ctaLabel="Take your first diagnostic"
                secondaryHref="/explore"
                secondaryLabel="Explore subjects"
              />
            )}
          </>
        )}

        <p className="text-center text-[11px] text-surface-600 pt-2">
          Powered by the official Atlas syllabus — every figure here comes from your real practice.
        </p>
      </div>
    </div>
  );
}
