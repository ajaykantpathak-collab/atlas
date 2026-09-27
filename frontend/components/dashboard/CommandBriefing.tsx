"use client";

/**
 * CommandBriefing — the commanding panel that LEADS the student's home view.
 *
 * Design language: mission-command. Syne display, near-black + gold, sharp
 * lines, numbered sections, generous negative space. It owns the top of
 * /dashboard because it carries the student's day:
 *
 *   01 / TODAY'S MISSION — ONE primary action grounded in real data
 *   THE STATE OF YOU     — streak (at-risk aware), XP, stars lit, mastery trend
 *   02 / REVIEW RADAR    — one supporting action, only when reviews are due
 *
 * Data (all real, nothing estimated):
 *   GET /api/progress/dashboard       → passed in by the page (already fetched)
 *   GET /api/progress/overview        → passed in by the page
 *   GET /api/progress/review/queue    → passed in by the page
 *   GET /api/dashboard/student/{uid}  → fetched here (streak last-active,
 *                                       per-topic mastery history)
 *   GET /api/content/search/enrichment→ fetched here (resolves the weakest
 *                                       topic's title to a real corpus node
 *                                       so the Story deep link lands)
 *
 * Honesty rules: zeros are stated, never inflated. If the student-detail or
 * search call fails, the briefing degrades to the data it truly has — it
 * never invents a struggle, a streak, or a celebration. Raw node ids never
 * reach the screen.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight, BookOpenText, ChevronRight, Crosshair, Flame, Radar,
  Sparkles, Star, Target, TrendingDown, TrendingUp, Zap,
} from "lucide-react";
import { api } from "@/lib/api";
import type { DashboardData, ProgressOverview } from "./types";
import type { ReviewQueueResponse } from "./useDashboardData";
import type { EngagementStatus, EngagementSummary } from "@/components/engagement/useEngagement";
import GoalRing from "@/components/engagement/GoalRing";
import { GoldNumber } from "./ui";

/* ------------------------------------------------------------------ */
/* Live contracts for the two calls this component makes itself        */
/* ------------------------------------------------------------------ */

/** GET /api/dashboard/student/{uid} (subset the briefing reads). */
interface StudentDetail {
  streak?: {
    current_streak?: number;
    /** null when the backend cannot honestly report a personal best. */
    longest_streak?: number | null;
    last_active_date?: string | null;
  };
  xp?: { total_xp?: number; level?: number };
  mastery_overall?: number | null;
  mastery_by_topic?: TopicMasteryRow[];
}
interface TopicMasteryRow {
  topic_id?: string;
  topic_name?: string;
  subject_name?: string | null;
  mastery_score?: number | null;
  attempts?: number | null;
  last_practiced?: string | null;
}

/** GET /api/content/search/enrichment (subset). */
interface EnrichmentHit {
  node_id: string;
  title?: string | null;
  class_level?: number | null;
}

/** GET /api/content/nodes/{id} (subset — used to verify a candidate node
 *  really is about the weakest topic when its label is generic). */
interface NodeDetail {
  node_id?: string;
  label?: string | null;
  description?: string | null;
  class_level?: number | null;
}

type DetailState = "waiting" | "loading" | "ready" | "error";

/* ------------------------------------------------------------------ */
/* Small pure helpers                                                  */
/* ------------------------------------------------------------------ */

type BriefingT = ReturnType<typeof useTranslations>;

function timeOfDayGreeting(t: BriefingT, h: number): string {
  if (h < 5) return t("greetingNight");
  if (h < 12) return t("greetingMorning");
  if (h < 17) return t("greetingAfternoon");
  return t("greetingEvening");
}

/** Local-date comparison: has the student logged anything today? */
function lastActiveIsToday(lastActiveDate?: string | null): boolean | null {
  if (!lastActiveDate) return null;
  const parts = lastActiveDate.slice(0, 10).split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
  const [y, m, d] = parts;
  const last = new Date(y, m - 1, d);
  const now = new Date();
  return (
    last.getFullYear() === now.getFullYear() &&
    last.getMonth() === now.getMonth() &&
    last.getDate() === now.getDate()
  );
}

/** Streak exposure: active streak, detail loaded, nothing logged today. */
function streakAtRiskOf(
  streak: number,
  detail: StudentDetail | null,
  detailState: DetailState,
): boolean {
  if (streak <= 0 || detailState !== "ready") return false;
  return lastActiveIsToday(detail?.streak?.last_active_date ?? null) === false;
}

/** Normalize a topic title for matching ("Laws of Reflection" → "laws of reflection"). */
function normTitle(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

const SYLLABUS_SIZE = 9099; // official Atlas syllabus graph (9,099 nodes)
const RECENT_WINDOW_MS = 21 * 24 * 60 * 60 * 1000; // "recent" = 3 weeks
const XP_SNAPSHOT_KEY = "atlas.briefing.xp";

/** tailwind's `font-mono` resolves `var(--font-jetbrains)`, which no layout
 *  defines — an undefined var invalidates the whole font-family declaration
 *  and the label would inherit the SERIF default (same trap as --font-inter
 *  in app/layout.tsx). Define the var at the briefing root so `font-mono`
 *  resolves to a real stack. */
const MONO_VARS = {
  "--font-jetbrains": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
} as React.CSSProperties;

/* ------------------------------------------------------------------ */
/* Mission model — exactly ONE primary action                          */
/* ------------------------------------------------------------------ */

interface Mission {
  kind: "first-star" | "weakest-topic" | "streak" | "explore";
  title: string;
  sub: string;
  cta: string;
  href: string;
}

export default function CommandBriefing({
  dash,
  dashStatus,
  overview,
  reviewQueue,
  queueStatus,
  engagement,
}: {
  dash: DashboardData | null;
  dashStatus: "loading" | "ready" | "error" | "unauthorized";
  overview: ProgressOverview | null;
  reviewQueue: ReviewQueueResponse | null;
  queueStatus: "loading" | "ready" | "error" | "unauthorized";
  /** Live daily-goal + streak data (backend day-math). Optional: the
   *  briefing degrades to its own data if the engagement endpoint is down. */
  engagement?: { data: EngagementSummary | null; status: EngagementStatus } | null;
}) {
  const t = useTranslations("briefing");
  const [mounted, setMounted] = useState(false);
  const [detail, setDetail] = useState<StudentDetail | null>(null);
  const [detailState, setDetailState] = useState<DetailState>("waiting");
  const [storyNodeId, setStoryNodeId] = useState<string | null>(null);
  const [xpDelta, setXpDelta] = useState<number | null>(null);
  // CHILD-LENS (CHILD_EXPERIENCE_GAPS.md fix 3): the day-one mission points
  // at a REAL class-correct Story lesson — never the then-empty /explore.
  const [firstLessonHref, setFirstLessonHref] = useState<string | null>(null);
  // CHILD-LENS (fix 13): "0 of 9,099 stars" makes a Class 6 child's day one
  // feel infinite when only a few hundred topics belong to their year. The
  // star total is scoped to the child's own class from real corpus stats.
  const [classTopicTotal, setClassTopicTotal] = useState<number | null>(null);

  // Client-only rendering: dates, localStorage and the greeting must never
  // run during SSR or they would hydrate-mismatch.
  useEffect(() => setMounted(true), []);

  const uid = dash?.user?.id ?? null;
  const classLevel = dash?.user?.class_level ?? null;

  // CHILD-LENS (fix 13): scope the star total to the child's own class from
  // real corpus stats. Lives after `classLevel`'s declaration — the deps
  // array is evaluated during render and a forward reference would be a
  // render-crashing TDZ error.
  useEffect(() => {
    if (!classLevel) return;
    let alive = true;
    api
      .get<{ per_class_subject?: Record<string, Record<string, number>> }>("/api/nodes/stats")
      .then((stats) => {
        if (!alive) return;
        const row = stats?.per_class_subject?.[String(classLevel)];
        const total = row
          ? Object.values(row).reduce((a, b) => a + (Number(b) || 0), 0)
          : null;
        setClassTopicTotal(total && total > 0 ? total : null);
      })
      .catch(() => {
        /* keep the whole-syllabus total, honestly labelled */
      });
    return () => {
      alive = false;
    };
  }, [classLevel]);

  // RECALL-2 tsc fix: the dashboard payload never carries `subject` (the
  // users table has no such column and UserInfo doesn't expose one), so
  // read it through an explicit unknown-shape narrow instead of widening
  // the shared DashboardUser type with a phantom field. Runtime behavior
  // is unchanged: absent → "maths". Lives at component scope so the
  // effect's deps array can reference it.
  const prefRaw = (dash?.user as { subject?: unknown } | null)?.subject;

  // First lesson for this child's own class — resolved from the real
  // enrichment corpus (first servable node, preferred subject first).
  useEffect(() => {
    if (dashStatus !== "ready" || !classLevel || firstLessonHref) return;
    let alive = true;
    const prefSubject =
      typeof prefRaw === "string" && prefRaw.trim()
        ? prefRaw.trim().toLowerCase()
        : "maths";
    const candidates = [prefSubject, "maths"];
    (async () => {
      for (const key of candidates) {
        try {
          const rows = await api.get<
            { node_id: string; slug?: string | null; has_definition?: boolean; has_eli5?: boolean; has_walkthrough?: boolean }[]
          >(
            `/api/content/enrichment?subject=${encodeURIComponent(key)}&class_level=${classLevel}&limit=500`,
          );
          const servable = (rows ?? []).filter(
            (r) => r?.node_id && (r.has_definition || r.has_eli5 || r.has_walkthrough),
          );
          if (servable.length > 0) {
            if (!alive) return;
            setFirstLessonHref(
              `/learn/${encodeURIComponent(servable[0].slug || servable[0].node_id)}/story`,
            );
            return;
          }
        } catch {
          /* try the next subject — never invent a lesson */
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [dashStatus, classLevel, prefRaw, firstLessonHref]);

  // Student detail — streak last-active + per-topic mastery history.
  useEffect(() => {
    if (!uid) {
      setDetail(null);
      setDetailState("waiting");
      return;
    }
    let alive = true;
    setDetailState("loading");
    const timer = setTimeout(() => alive && setDetailState("error"), 9000);
    api
      .get<StudentDetail>(`/api/dashboard/student/${uid}`)
      .then((d) => {
        if (!alive) return;
        clearTimeout(timer);
        setDetail(d ?? {});
        setDetailState("ready");
      })
      .catch(() => {
        if (!alive) return;
        clearTimeout(timer);
        setDetailState("error");
      });
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [uid]);

  /* Visit-to-visit XP delta — real number from real snapshots, never
     fabricated. First visit records the baseline and celebrates nothing. */
  const totalXp = dash ? (dash.totalXp ?? dash.user?.total_xp ?? 0) : 0;
  useEffect(() => {
    if (dashStatus !== "ready" || !mounted) return;
    try {
      const raw = window.localStorage.getItem(XP_SNAPSHOT_KEY);
      const prev = raw ? (JSON.parse(raw) as { xp?: number }) : null;
      if (prev && typeof prev.xp === "number" && totalXp > prev.xp) {
        setXpDelta(totalXp - prev.xp);
      } else {
        setXpDelta(null);
      }
      window.localStorage.setItem(XP_SNAPSHOT_KEY, JSON.stringify({ xp: totalXp }));
    } catch {
      /* storage unavailable — skip silently, never fabricate */
    }
  }, [dashStatus, mounted, totalXp]);

  /* Weakest recent topic — lowest mastery among topics actually practiced
     in the last 3 weeks. No recent data → no "revenge" mission, ever. */
  const weakestTopic = useMemo<TopicMasteryRow | null>(() => {
    const rows = (detail?.mastery_by_topic ?? []).filter(
      (t) => (t.attempts ?? 0) > 0 && !!t.topic_name,
    );
    if (!rows.length) return null;
    const cutoff = Date.now() - RECENT_WINDOW_MS;
    const recent = rows.filter(
      (t) => t.last_practiced && new Date(t.last_practiced).getTime() >= cutoff,
    );
    const pool = recent.length ? recent : [];
    if (!pool.length) return null;
    return pool.reduce((a, b) =>
      (a.mastery_score ?? 100) <= (b.mastery_score ?? 100) ? a : b,
    );
  }, [detail]);

  /* Resolve the weakest topic's title to a REAL corpus node so the Story
     link lands. Pass 1 matches enrichment titles; pass 2 (only when titles
     are generic, e.g. "Math · Ch 04") verifies class-mates against the
     node's own description text. Falls back to /practice?topic= when
     nothing genuinely matches — a wrong guess is worse than no link. */
  useEffect(() => {
    if (!weakestTopic?.topic_name) {
      setStoryNodeId(null);
      return;
    }
    let alive = true;
    const timer = setTimeout(() => {
      if (alive) setStoryNodeId(null);
    }, 12000);

    const target = normTitle(weakestTopic.topic_name);
    const keyWords = normTitle(weakestTopic.topic_name)
      .split(" ")
      .filter((w) => w.length > 3);
    const classOk = (cl: unknown) =>
      cl == null || dash?.user?.class_level == null || Number(cl) === Number(dash.user.class_level);

    api
      .get<EnrichmentHit[]>(
        `/api/content/search/enrichment?q=${encodeURIComponent(weakestTopic.topic_name)}&limit=20`,
      )
      .then(async (rows) => {
        if (!alive) return null;
        const pool = (rows ?? []).filter(
          (r) => typeof r?.node_id === "string" && r.node_id.length > 0 && classOk(r.class_level),
        );
        // Pass 1 — enrichment title genuinely names the topic.
        const byTitle =
          pool.find((r) => normTitle(r.title ?? "") === target) ??
          pool.find((r) => {
            const t = normTitle(r.title ?? "");
            return t.length > 0 && (t.includes(target) || target.includes(t));
          }) ??
          null;
        if (byTitle) return byTitle.node_id;
        // Pass 2 — generic titles: read the node itself and match its text.
        const candidates = pool.slice(0, 3);
        for (const cand of candidates) {
          if (!alive) return null;
          try {
            const node = await api.get<NodeDetail>(
              `/api/content/nodes/${encodeURIComponent(cand.node_id)}`,
            );
            const text = normTitle(
              `${node?.label ?? ""} ${node?.description ?? ""}`,
            );
            const matches =
              keyWords.length > 0 && keyWords.every((w) => text.includes(w));
            if (matches) return cand.node_id;
          } catch {
            /* candidate unreadable — try the next, never guess */
          }
        }
        return null;
      })
      .then((nodeId) => {
        if (!alive) return;
        clearTimeout(timer);
        setStoryNodeId(nodeId);
      })
      .catch(() => {
        if (!alive) return;
        clearTimeout(timer);
        setStoryNodeId(null);
      });

    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [weakestTopic, dash?.user?.class_level]);

  /* ---------------- Mission selection (exactly one) ---------------- */
  const mission = useMemo<Mission | null>(() => {
    if (dashStatus !== "ready" || !dash) return null;

    const streak = dash.streak ?? dash.user?.streak_days ?? 0;
    const mastered = overview?.masteredNodes ?? null;
    const hasFootprint =
      totalXp > 0 ||
      streak > 0 ||
      (mastered != null && mastered > 0) ||
      (detail?.mastery_by_topic ?? []).length > 0;
    // CHILD-LENS (CHILD_EXPERIENCE_GAPS.md fix 4): week one is decided by
    // real accumulated effort, never by session count alone. A child in
    // their first week never sees deficit framing ("trailing at 0%") —
    // their missions lead with what they've done and what's next.
    const firstWeek = totalXp < 100;

    // Backend day-math is authoritative when available: only "at_risk"
    // (last activity was yesterday) can truthfully claim today keeps the
    // streak — a "lapsed" streak already broke and is never promised a save.
    const engState = engagement?.data?.streak?.state ?? null;
    const streakNote =
      streak > 0 &&
      (engState ? engState === "at_risk" : streakAtRiskOf(streak, detail, detailState))
        ? t("streakNote", { streak })
        : "";

    // 1. New sky — honest zeros get an honest opener, never fake nostalgia.
    //    The one CTA lands in the child's OWN class: their first Story
    //    lesson when resolved, the class-synced topic browser otherwise —
    //    never the graph explorer a fresh account can't use yet.
    if (!hasFootprint) {
      return {
        kind: "first-star",
        title: t("firstStarTitle"),
        sub: t("firstStarSub"),
        cta: firstLessonHref ? t("firstLessonCta") : t("exploreCta"),
        href: firstLessonHref ?? "/learn",
      };
    }

    // 2. Weakest recent topic. Week one hears growth, never "softest spot
    //    at 12%": the child has ONE data point — effort is the story.
    if (weakestTopic) {
      const name = (weakestTopic.topic_name as string).trim();
      const pct = Math.round(weakestTopic.mastery_score ?? 0);
      const attempts = weakestTopic.attempts ?? 0;
      const href =
        storyNodeId
          ? `/learn/${encodeURIComponent(storyNodeId)}/story`
          : `/practice?topic=${encodeURIComponent(name)}`;
      if (firstWeek) {
        return {
          kind: "weakest-topic",
          title: t("startedTopicTitle", { name }),
          sub: t("startedTopicSub", {
            pct,
            streak: streakNote,
          }),
          cta: storyNodeId ? t("enterStoryCta") : t("practiceNowCta"),
          href,
        };
      }
      return {
        kind: "weakest-topic",
        title: t("softestSpotTitle", { name }),
        sub: t("softestSpotSub", {
          pct,
          attempts: attempts > 0 ? t("attemptsAcross", { attempts }) : "",
          streak: streakNote,
        }),
        cta: storyNodeId ? t("enterStoryCta") : t("practiceNowCta"),
        href,
      };
    }

    // 3. Degradation tier — per-topic history unavailable, but subject mastery
    //    is real and in hand. Week one gets momentum framing; afterwards the
    //    honest "trailing subject" mission returns.
    const subjects = (overview?.subjects ?? []).filter(
      (s) => (s.totalNodes ?? 0) > 0 && typeof s.masteryPercentage === "number",
    );
    if (subjects.length) {
      const softest = subjects.reduce((a, b) =>
        (a.masteryPercentage ?? 0) <= (b.masteryPercentage ?? 0) ? a : b,
      );
      const pct = Math.round(softest.masteryPercentage ?? 0);
      if (pct < 100) {
        const name = softest.subject?.trim() || t("softestSubject");
        if (firstWeek) {
          return {
            kind: "weakest-topic",
            title: t("firstWeekTitle"),
            sub: t("firstWeekSub", {
              name,
              streak: streakNote,
            }),
            cta: t("practiceNowCta"),
            href: `/practice?subject=${encodeURIComponent(name)}`,
          };
        }
        return {
          kind: "weakest-topic",
          title: t("trailingTitle", { name, pct }),
          sub: t("trailingSub", { streak: streakNote }),
          cta: t("practiceNowCta"),
          href: `/practice?subject=${encodeURIComponent(name)}`,
        };
      }
    }

    // 4. Streak exposure with no mastery signal — defend the flame.
    if (streak > 0 && streakAtRiskOf(streak, detail, detailState)) {
      return {
        kind: "streak",
        title: t("streakExposedTitle", { streak }),
        sub: t("streakExposedSub"),
        cta: t("defendStreakCta"),
        href: "/practice",
      };
    }

    // 5. Warm, active, nothing urgent — push the frontier.
    return {
      kind: "explore",
      title: t("exploreTitle"),
      sub: t("exploreSub"),
      cta: t("exploreCta"),
      href: "/explore",
    };
  }, [t, dash, dashStatus, overview, totalXp, detail, detailState, weakestTopic, storyNodeId, firstLessonHref, engagement]);

  /* ---------------- The state of you — real numbers ---------------- */
  const state = useMemo(() => {
    if (dashStatus !== "ready" || !dash) return null;
    const streak = dash.streak ?? dash.user?.streak_days ?? 0;
    const mastered = overview?.masteredNodes;
    const avg = overview?.avgMastery;
    const weekly = (overview?.subjects ?? [])
      .map((s) => s.weeklyChange ?? 0)
      .filter((n) => Number.isFinite(n));
    const trendPts = weekly.length ? Math.round(weekly.reduce((a, b) => a + b, 0) / weekly.length) : null;
    const activeToday =
      detailState === "ready" ? lastActiveIsToday(detail?.streak?.last_active_date ?? null) : null;
    // Real signal that the child has already been answering — the mastery
    // cell uses it to speak growth instead of a frozen 0%.
    const hasAnswers = (detail?.mastery_by_topic ?? []).some((t) => (t.attempts ?? 0) > 0);
    return {
      streak,
      streakAtRisk: streak > 0 && activeToday === false,
      activeToday,
      xp: totalXp,
      stars: typeof mastered === "number" ? mastered : null,
      mastery: typeof avg === "number" ? Math.round(avg) : null,
      trendPts,
      hasAnswers,
    };
  }, [dash, dashStatus, overview, totalXp, detail, detailState]);

  const dueCount =
    queueStatus === "ready" ? (reviewQueue?.total ?? reviewQueue?.items?.length ?? 0) : 0;

  /* ---------------- Engagement-derived goal numbers ---------------- */
  const engData = engagement?.data ?? null;
  const engGoal = engData?.goal ?? null;
  const engDone =
    engGoal?.metric === "minutes" ? engData?.today.minutes ?? 0 : engData?.today.questions ?? 0;
  const engUnit = engGoal?.metric === "minutes" ? "min" : "q";
  const engRemaining = engGoal ? Math.max(0, engGoal.target - engDone) : 0;
  const engStreakState = engData?.streak?.state ?? null;

  /* ---------------- Render gates ---------------- */
  if (!mounted) return null; // SSR pass renders nothing — no hydration drift
  if (dashStatus === "error" || dashStatus === "unauthorized") return null; // quiet hide
  if (dashStatus === "loading" || !mission || !state) {
    return (
      <section
        aria-label="Loading your briefing"
        className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0b0a10]/80"
        style={MONO_VARS}
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
        <div className="px-5 py-8 sm:px-8">
          <div className="h-2.5 w-40 max-w-full animate-pulse rounded bg-white/[0.06]" />
          <div className="mt-4 h-8 w-64 max-w-full animate-pulse rounded bg-white/[0.06]" />
          <div className="mt-6 h-24 w-full animate-pulse rounded bg-white/[0.04]" />
        </div>
      </section>
    );
  }

  const firstName = (dash?.user?.name ?? "").trim().split(/\s+/)[0] || "Scholar";
  const classLine = [
    dash?.user?.class_level ? t("classLabel", { n: dash.user.class_level }) : null,
    dash?.user?.board ? String(dash.user.board).toUpperCase() : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const dateLine = new Date().toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const level = dash?.level ?? dash?.user?.current_level ?? 1;

  const MissionIcon =
    mission.kind === "first-star" ? Star
    : mission.kind === "weakest-topic" ? Crosshair
    : mission.kind === "streak" ? Flame
    : Sparkles;

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Today's briefing"
      className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0b0a10]/80"
      style={MONO_VARS}
    >
      {/* gold hairlines — the cockpit frame */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(700px 220px at 85% -10%, rgba(251,191,36,0.10), transparent 65%)",
        }}
      />

      <div className="relative px-5 py-6 sm:px-8 sm:py-8">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-400">
            {t("kicker")}
          </p>
          <span aria-hidden className="hidden h-3 w-px bg-white/15 sm:block" />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-surface-600">
            {dateLine}{classLine ? ` · ${classLine}` : ""}
          </p>
          <span className="ml-auto hidden items-center gap-1.5 rounded border border-gold-500/30 bg-gold-500/10 px-2 py-0.5 font-display text-[11px] font-bold text-gold-300 sm:flex">
            LV {level}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="font-display text-2xl font-bold leading-tight text-white sm:text-4xl">
            {timeOfDayGreeting(t, new Date().getHours())},{" "}
            <GoldNumber>{firstName}</GoldNumber>
          </h1>
          {xpDelta != null && xpDelta > 0 && (
            <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-mint-300">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden />
              {t("xpMomentum", { xp: xpDelta.toLocaleString("en-IN") })}
            </p>
          )}
        </div>

        {/* ── STREAK PROTECTION — unmissable, only when truly exposed ── */}
        {engagement?.status === "ready" && engData &&
          (engStreakState === "at_risk" || engStreakState === "lapsed") && (
          <Link
            href="/practice"
            data-testid="briefing-streak-strip"
            className="group mt-5 flex items-center justify-between gap-3 rounded border border-red-500/40 bg-gradient-to-r from-red-500/[0.14] via-red-500/[0.06] to-transparent px-4 py-3 transition-colors hover:border-red-500/70 sm:px-5"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <Flame className="h-4 w-4 shrink-0 text-red-400" aria-hidden />
              <span className="min-w-0 text-sm">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-400">
                  {t("streakLabel")}
                </span>
                <span className="mx-2 hidden text-surface-600 sm:inline">·</span>
                <span className="block sm:inline truncate">
                  {engStreakState === "at_risk"
                    ? `${engData.streak.current}-day streak at risk — nothing recorded today.`
                    : "Streak lapsed — a session today starts a fresh one."}
                </span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-red-300">
              {engStreakState === "at_risk" ? t("defendStreakCta") : "Restart"}
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        )}

        {/* ── 01 / TODAY'S MISSION ──────────────────────────────── */}
        <div className="relative mt-6 border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          {/* corner brackets */}
          <span aria-hidden className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-gold-500/70" />
          <span aria-hidden className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-gold-500/70" />
          <span aria-hidden className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-gold-500/70" />
          <span aria-hidden className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-gold-500/70" />

          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-gold-400">
            <MissionIcon className="h-3.5 w-3.5" aria-hidden />
            {t("missionKicker")}
          </p>

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h2 className="font-display text-lg font-bold leading-snug text-white sm:text-2xl">
                {mission.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-surface-700">
                {mission.sub}
              </p>
            </div>
            <Link
              href={mission.href}
              className="btn-primary w-full shrink-0 justify-center px-6 py-3.5 text-sm font-bold sm:text-base lg:w-auto"
            >
              {mission.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        {/* ── THE STATE OF YOU ───────────────────────────────────── */}
        <div className="mt-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-surface-600">
            {t("stateKicker")}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded border border-white/10 bg-white/10 lg:grid-cols-5">
            {/* Streak */}
            <div className="min-w-0 bg-[#0b0a10] p-4 sm:p-5">
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-surface-600">
                <Flame className="h-3.5 w-3.5 text-gold-400" aria-hidden /> {t("streakLabel")}
              </p>
              <p className="mt-2 font-display text-2xl font-bold leading-none text-white sm:text-3xl">
                {state.streak > 0 ? <GoldNumber>{state.streak}</GoldNumber> : state.streak}
                <span className="ml-1 text-xs font-semibold text-surface-600">
                  {state.streak === 1 ? t("day") : t("days")}
                </span>
              </p>
              <p className="mt-2 text-[11px] leading-snug">
                {state.streak === 0 ? (
                  <span className="text-surface-600">{t("noStreak")}</span>
                ) : state.activeToday == null ? (
                  <span className="text-surface-600">{t("noReadingYet")}</span>
                ) : state.streakAtRisk ? (
                  <span className="font-medium text-accent-500">{t("atRisk")}</span>
                ) : (
                  <span className="text-mint-400">{t("aliveToday")}</span>
                )}
              </p>
            </div>

            {/* XP */}
            <div className="min-w-0 bg-[#0b0a10] p-4 sm:p-5">
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-surface-600">
                <Zap className="h-3.5 w-3.5 text-gold-400" aria-hidden /> {t("xpLabel")}
              </p>
              <p className="mt-2 font-display text-2xl font-bold leading-none sm:text-3xl">
                <GoldNumber>{state.xp.toLocaleString("en-IN")}</GoldNumber>
              </p>
              <p className="mt-2 text-[11px] leading-snug text-surface-600">
                {state.xp > 0 ? t("xpEarnedNote") : t("xpFirstNote")}
              </p>
            </div>

            {/* Stars lit */}
            <div className="min-w-0 bg-[#0b0a10] p-4 sm:p-5">
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-surface-600">
                <Star className="h-3.5 w-3.5 text-gold-400" aria-hidden /> {t("starsLit")}
              </p>
              <p className="mt-2 font-display text-2xl font-bold leading-none sm:text-3xl">
                {state.stars == null ? (
                  <span className="text-surface-500">—</span>
                ) : state.stars > 0 ? (
                  <GoldNumber>{state.stars.toLocaleString("en-IN")}</GoldNumber>
                ) : (
                  <span className="text-white">0</span>
                )}
                <span className="ml-1.5 text-xs font-semibold text-surface-600">
                  {classTopicTotal != null
                    ? t("ofClassTopics", { total: classTopicTotal.toLocaleString("en-IN") })
                    : t("ofTotal", { total: SYLLABUS_SIZE.toLocaleString("en-IN") })}
                </span>
              </p>
              <p className="mt-2 text-[11px] leading-snug text-surface-600">
                {state.stars == null
                  ? t("mapLoading")
                  : state.stars > 0
                    ? t("topicsMastered")
                    : t("allSkyNoStars")}
              </p>
            </div>

            {/* Mastery trend */}
            <div className="min-w-0 bg-[#0b0a10] p-4 sm:p-5">
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-surface-600">
                <Target className="h-3.5 w-3.5 text-gold-400" aria-hidden /> {t("masteryLabel")}
              </p>
              <p className="mt-2 font-display text-2xl font-bold leading-none sm:text-3xl">
                {state.mastery == null ? (
                  <span className="text-surface-500">—</span>
                ) : (
                  <>
                    <GoldNumber>{state.mastery}</GoldNumber>
                    <span className="text-base text-surface-500 font-semibold">%</span>
                  </>
                )}
              </p>
              <p className="mt-2 flex items-center gap-1 text-[11px] leading-snug">
                {state.mastery == null ? (
                  <span className="text-surface-600">{t("takeDiagnostic")}</span>
                ) : state.mastery === 0 && state.hasAnswers ? (
                  <span className="text-surface-600">{t("masteryStarting")}</span>
                ) : state.mastery === 0 ? (
                  <span className="text-surface-600">{t("diagnosticBaseline")}</span>
                ) : state.trendPts == null || state.trendPts === 0 ? (
                  <span className="text-surface-600">{t("holdingSteady")}</span>
                ) : state.trendPts > 0 ? (
                  <span className="flex items-center gap-1 text-mint-400">
                    <TrendingUp className="h-3 w-3" aria-hidden /> {t("ptsUp", { pts: state.trendPts })}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-accent-500">
                    <TrendingDown className="h-3 w-3" aria-hidden /> {t("ptsDown", { pts: state.trendPts })}
                  </span>
                )}
              </p>
            </div>

            {/* Today's goal — real progress, backend day-math */}
            <div className="min-w-0 bg-[#0b0a10] p-4 sm:p-5" data-testid="briefing-goal-cell">
              <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-surface-600">
                <Target className="h-3.5 w-3.5 text-gold-400" aria-hidden /> Daily goal
              </p>
              <div className="mt-2 flex items-center gap-3">
                {engagement?.status === "ready" && engData ? (
                  engGoal ? (
                    <>
                      <GoalRing
                        value={engDone}
                        max={engGoal.target}
                        size={56}
                        stroke={5}
                        done={engData.completed}
                      />
                      <p className="min-w-0 text-[11px] leading-snug">
                        {engData.completed ? (
                          <span className="font-medium text-mint-400">Done for today</span>
                        ) : (
                          <>
                            <span className="font-semibold text-white">
                              {engRemaining} {engUnit === "min" ? "min" : engRemaining === 1 ? "question" : "questions"} to go
                            </span>
                            <span className="block text-surface-600">
                              {engDone}/{engGoal.target} {engUnit} today
                            </span>
                          </>
                        )}
                      </p>
                    </>
                  ) : (
                    <p className="text-[11px] leading-snug text-surface-600">
                      No goal yet — set one below
                    </p>
                  )
                ) : engagement?.status === "error" ? (
                  <p className="text-[11px] text-surface-600">Goal tracking offline</p>
                ) : (
                  <div className="h-14 w-14 animate-pulse rounded-full bg-white/[0.06]" aria-hidden />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── 02 / SECONDARY — review radar, only when truly due ──
            Links straight into the focused /review session (≤10 due items,
            one at a time, SM-2 reschedule on every answer) — not a report
            page. Honest hide when the SM-2 queue is empty. */}
        {dueCount > 0 && (
          <Link
            href="/review"
            data-testid="briefing-review-radar"
            className="group mt-5 flex items-center justify-between gap-3 border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-gold-500/40 sm:px-5"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <Radar className="h-4 w-4 shrink-0 text-gold-400" aria-hidden />
              <span className="truncate text-sm text-surface-800">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-400">
                  {t("radarKicker")}
                </span>
                <span className="mx-2 hidden text-surface-600 sm:inline">·</span>
                <span className="block sm:inline">
                  {dueCount === 1
                    ? t("oneTopicDue")
                    : t("topicsDue", { count: dueCount })}
                  <span className="text-surface-600">{t("clearThem")}</span>
                </span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-gold-300">
              <BookOpenText className="hidden h-3.5 w-3.5 sm:block" aria-hidden />
              {t("radarCta")}
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
        )}
      </div>

      {/* bottom frame */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </motion.section>
  );
}
