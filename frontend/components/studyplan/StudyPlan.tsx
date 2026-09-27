"use client";

/**
 * StudyPlan — the student's personal weekly plan, on /dashboard right
 * below the Command Briefing.
 *
 * A 7-day grid (Monday-anchored) where every task is concrete, grounded
 * in the student's real data, and deep-linked:
 *
 *   due SM-2 reviews → weakest mastery topic → next unexplored chapter
 *   (official corpus, syllabus-earliest) → chapter test / stretch.
 *
 * Exam-countdown mode: when the student's class has a ready pre-board
 * paper (classes 10/12), the week re-weights toward revision — more
 * chapter tests and review, less new content — under an honest
 * "≈N days — revision mode" countdown anchored to the typical CBSE
 * mid-February start (the student's school date may differ — we say so).
 *
 * Micro-coach: one evidence-based study tip per day in the header.
 * Curated set, plain English, never gamified filler.
 *
 * Persistence: the plan snapshot + completion ticks are stored per
 * student (localStorage, namespaced by uid) so the week never reshuffles
 * mid-week and ticks survive reloads. Ticks are REAL: derived from
 * activity_log rows on the task's date, from review stats, or from an
 * explicit mark by the student. A brand-new student's plan is honestly
 * "Day 1: take your first diagnostic" — nothing is invented around it.
 *
 * Data (all pre-verified endpoints; zero backend changes):
 *   GET /api/progress/dashboard            (prop — user, class, footprint)
 *   GET /api/progress/review/queue+stats   (props — due / reviewedToday)
 *   GET /api/dashboard/student/{uid}       (weakest topics — fetched here)
 *   GET /api/progress/activity?limit=100   (real completion ticks — here)
 *   GET /api/preboard/papers?class_level=  (exam mode, classes 10/12 — here)
 *   GET /api/content/search/enrichment     (weakest topic → story node)
 *   GET /api/content/recommended via the dashboard payload (next chapters)
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpenText, Brain, CalendarDays, CheckCircle2, Circle,
  FileText, Flag, Lightbulb, PenLine, Sparkles, Stethoscope,
} from "lucide-react";
import { api } from "@/lib/api";
import type { DashboardData } from "@/components/dashboard/types";
import type { ReviewQueueResponse, ReviewStats, WidgetStatus } from "@/components/dashboard/useDashboardData";
import {
  addDays, daysToBoardSeason, deriveAutoTicks,
  generateOrLoadPlan, loadPlan, savePlan,
  tipOfDay, toLocalISO, weekStartOf,
  type PlanInputs, type PlanTask, type PlanTick, type StoredPlan,
  type WeakestTopic,
} from "./plan";

/* ------------------------------------------------------------------ */
/* Contracts for the calls this component makes itself                 */
/* ------------------------------------------------------------------ */

interface TopicMasteryRow {
  topic_id?: string;
  topic_name?: string;
  subject_name?: string | null;
  mastery_score?: number | null;
  attempts?: number | null;
  last_practiced?: string | null;
}

/** A mastery row shaped for the plan, plus its recency for the window. */
interface TopicHit extends WeakestTopic {
  lastPracticedMs?: number;
}

interface StudentDetail {
  mastery_by_topic?: TopicMasteryRow[];
}

interface ActivityRow {
  activityType?: string;
  title?: string;
  subject?: string | null;
  time?: string;
}

interface EnrichmentHit {
  node_id: string;
  title?: string | null;
  class_level?: number | null;
}

interface PreboardCatalog {
  papers?: { subject: string; label: string; ready: boolean }[];
}

const RECENT_WINDOW_MS = 21 * 24 * 60 * 60 * 1000; // "recent" = 3 weeks
const MONO_VARS = {
  "--font-jetbrains": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
} as React.CSSProperties;

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const KIND_ICON: Record<PlanTask["kind"], typeof Brain> = {
  review: Brain,
  practice: PenLine,
  story: BookOpenText,
  test: FileText,
  paper: Flag,
  diagnostic: Stethoscope,
  explore: Sparkles,
};

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Request timed out")), ms);
    p.then(
      (v) => { clearTimeout(timer); resolve(v); },
      (e) => { clearTimeout(timer); reject(e); },
    );
  });
}

/** Normalize a topic title for matching ("Laws of Reflection" → "laws of reflection"). */
function normTitle(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/* ------------------------------------------------------------------ */

export default function StudyPlan({
  dash,
  dashStatus,
  reviewQueue,
  queueStatus,
  reviewStats,
  statsStatus,
}: {
  dash: DashboardData | null;
  dashStatus: WidgetStatus;
  reviewQueue: ReviewQueueResponse | null;
  queueStatus: WidgetStatus;
  reviewStats: ReviewStats | null;
  statsStatus: WidgetStatus;
}) {
  const [mounted, setMounted] = useState(false);
  const [detail, setDetail] = useState<StudentDetail | null>(null);
  const [detailFailed, setDetailFailed] = useState(false);
  const [activity, setActivity] = useState<ActivityRow[] | null>(null);
  const [activityFailed, setActivityFailed] = useState(false);
  const [exam, setExam] = useState<PlanInputs["exam"]>({
    active: false, daysToBoards: null, papers: [],
  });
  const [storyNodeId, setStoryNodeId] = useState<string | null>(null);
  const [storyResolved, setStoryResolved] = useState(false);
  const [plan, setPlan] = useState<StoredPlan | null>(null);
  /** Guards plan (re)generation against the ticking effects. */
  const generatedForRef = useRef<string>("");

  useEffect(() => setMounted(true), []);

  const uid = dash?.user?.id ?? null;
  const classLevel = dash?.user?.class_level ?? null;
  const totalXp = dash ? (dash.totalXp ?? dash.user?.total_xp ?? 0) : 0;
  const streakDays = dash?.streak ?? dash?.user?.streak_days ?? 0;

  /* Client-only clock — dates never run during SSR. */
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  /* Per-topic mastery history (weakest topic + attempted titles). */
  useEffect(() => {
    if (!uid) return;
    let alive = true;
    const timer = setTimeout(() => alive && setDetailFailed(true), 12000);
    api
      .get<StudentDetail>(`/api/dashboard/student/${uid}`)
      .then((d) => {
        if (!alive) return;
        clearTimeout(timer);
        setDetail(d ?? {});
        setDetailFailed(false);
      })
      .catch(() => {
        if (!alive) return;
        clearTimeout(timer);
        setDetail(null);
        setDetailFailed(true);
      });
    return () => { alive = false; clearTimeout(timer); };
  }, [uid]);

  /* Real activity — powers honest completion ticks. */
  useEffect(() => {
    if (!uid) return;
    let alive = true;
    const timer = setTimeout(() => alive && setActivityFailed(true), 12000);
    api
      .get<ActivityRow[]>("/api/progress/activity?limit=100")
      .then((rows) => {
        if (!alive) return;
        clearTimeout(timer);
        setActivity(Array.isArray(rows) ? rows : []);
        setActivityFailed(false);
      })
      .catch(() => {
        if (!alive) return;
        clearTimeout(timer);
        setActivity(null);
        setActivityFailed(true);
      });
    return () => { alive = false; clearTimeout(timer); };
  }, [uid]);

  /* Exam mode — only when this class actually has board papers (10/12). */
  useEffect(() => {
    if (classLevel !== 10 && classLevel !== 12) {
      setExam({ active: false, daysToBoards: null, papers: [] });
      return;
    }
    let alive = true;
    const timer = setTimeout(() => alive && setExam({ active: false, daysToBoards: null, papers: [] }), 15000);
    api
      .get<PreboardCatalog>(`/api/preboard/papers?class_level=${classLevel}`)
      .then((cat) => {
        if (!alive) return;
        clearTimeout(timer);
        const ready = (cat?.papers ?? []).filter((p) => p.ready);
        setExam({
          active: ready.length > 0,
          daysToBoards: ready.length > 0 ? daysToBoardSeason(new Date()) : null,
          papers: ready.map((p) => p.label),
        });
      })
      .catch(() => {
        if (!alive) return;
        clearTimeout(timer);
        setExam({ active: false, daysToBoards: null, papers: [] });
      });
    return () => { alive = false; clearTimeout(timer); };
  }, [classLevel]);

  const usableTopics = useMemo<TopicHit[]>(
    () =>
      (detail?.mastery_by_topic ?? [])
        .filter((t) => (t.attempts ?? 0) > 0 && !!t.topic_name && !!t.topic_id)
        .map((t) => ({
          topicId: String(t.topic_id),
          topicName: String(t.topic_name),
          subjectName: t.subject_name ?? null,
          masteryPct: t.mastery_score == null ? 100 : Number(t.mastery_score),
          attempts: Number(t.attempts ?? 0),
          lastPracticedMs: t.last_practiced ? new Date(t.last_practiced).getTime() : undefined,
        })),
    [detail],
  );

  /** Weakest topic the student actually practiced — recent window first. */
  const weakest = useMemo<TopicHit | null>(() => {
    if (!usableTopics.length) return null;
    const cutoff = Date.now() - RECENT_WINDOW_MS;
    const recent = usableTopics.filter((t) => (t.lastPracticedMs ?? 0) >= cutoff);
    const pool = recent.length ? recent : usableTopics;
    return pool.reduce((a, b) => (a.masteryPct <= b.masteryPct ? a : b));
  }, [usableTopics]);

  const secondTopic = useMemo<TopicHit | null>(() => {
    if (usableTopics.length < 2 || !weakest) return null;
    const rest = usableTopics.filter((t) => t.topicId !== weakest.topicId);
    return rest.reduce((a, b) => (a.masteryPct <= b.masteryPct ? a : b));
  }, [usableTopics, weakest]);

  /* Resolve the weakest topic's title to a REAL corpus node so the
     story deep link lands (same discipline as the Command Briefing:
     a wrong guess is worse than no link). */
  useEffect(() => {
    if (!mounted) return;
    // No weakest topic (new student / history unreachable) — nothing to
    // resolve; unblock plan generation honestly.
    if (!weakest?.topicName) {
      setStoryNodeId(null);
      setStoryResolved(true);
      return;
    }
    setStoryNodeId(null);
    setStoryResolved(false);
    let alive = true;
    const target = normTitle(weakest.topicName);
    const classOk = (cl: unknown) =>
      cl == null || classLevel == null || Number(cl) === Number(classLevel);
    const timer = setTimeout(() => {
      if (!alive) return;
      setStoryNodeId(null);
      setStoryResolved(true);
    }, 12000);

    api
      .get<EnrichmentHit[]>(
        `/api/content/search/enrichment?q=${encodeURIComponent(weakest.topicName)}&limit=20`,
      )
      .then((rows) => {
        if (!alive) return null;
        const pool = (rows ?? []).filter(
          (r) => typeof r?.node_id === "string" && r.node_id.length > 0 && classOk(r.class_level),
        );
        const byTitle =
          pool.find((r) => normTitle(r.title ?? "") === target) ??
          pool.find((r) => {
            const t = normTitle(r.title ?? "");
            return t.length > 0 && (t.includes(target) || target.includes(t));
          }) ??
          null;
        return byTitle?.node_id ?? null;
      })
      .then((nodeId) => {
        if (!alive) return;
        clearTimeout(timer);
        setStoryNodeId(nodeId);
        setStoryResolved(true);
      })
      .catch(() => {
        if (!alive) return;
        clearTimeout(timer);
        setStoryNodeId(null);
        setStoryResolved(true);
      });
    return () => { alive = false; clearTimeout(timer); };
  }, [weakest?.topicName, classLevel, mounted]);

  const reviewsDue =
    queueStatus === "ready" ? (reviewQueue?.total ?? reviewQueue?.items?.length ?? 0) : 0;
  const reviewedToday =
    statsStatus === "ready" ? (reviewStats?.reviewedToday ?? 0) : 0;

  const hasFootprint =
    totalXp > 0 || streakDays > 0 || usableTopics.length > 0;

  /* ---------------- Plan generation (once per week, persisted) ------- */
  useEffect(() => {
    if (!mounted || !today || !uid) return;
    if (!storyResolved) return; // wait for the weakest-topic link truth
    const genKey = `${uid}|${toLocalISO(weekStartOf(today))}|${storyNodeId ?? "-"}`;
    if (generatedForRef.current === genKey) return;
    generatedForRef.current = genKey;

    const inp: PlanInputs = {
      uid,
      classLevel,
      today,
      reviewsDue,
      reviewedToday,
      weakest,
      secondTopic,
      recommended: dash?.recommendedLessons ?? [],
      attemptedTitles: new Set(usableTopics.map((t) => normTitle(t.topicName))),
      weakestStoryNodeId: storyNodeId,
      hasFootprint,
      exam,
    };
    const { plan: p } = generateOrLoadPlan(
      inp,
      () => loadPlan(uid),
      (np) => savePlan(np),
    );
    setPlan(p);
  }, [mounted, today, uid, classLevel, storyResolved, storyNodeId, reviewsDue, reviewedToday, weakest, secondTopic, dash, usableTopics, hasFootprint, exam]);

  /* Late-arriving review queue: if the week's plan was generated before
     the queue widget resolved and it has no review task, add one today —
     honestly derived, not reshuffling the rest. */
  useEffect(() => {
    if (!mounted || !today || !uid || !plan) return;
    if (queueStatus !== "ready" || reviewsDue <= 0) return;
    const todayISO = toLocalISO(today);
    const weekStart = toLocalISO(weekStartOf(today));
    if (plan.weekStart !== weekStart) return;
    const todayIdx = Math.max(0, Math.min(6, Math.round((today.getTime() - new Date(weekStart + "T00:00:00").getTime()) / 86_400_000)));
    const hasReviewToday = plan.tasks.some((t) => t.kind === "review" && t.day === todayIdx);
    if (hasReviewToday) return;
    const reviewTask: PlanTask = {
      id: `review:/review#d${todayIdx}-late`,
      kind: "review",
      day: todayIdx,
      title: reviewsDue === 1 ? "Clear 1 due review" : `Clear ${reviewsDue} due reviews`,
      detail: "Spaced repetition — items you have not revisited in days are fading first.",
      href: "/review",
      tickBy: "reviewedToday",
      liveCount: true,
      count: reviewsDue,
    };
    const updated: StoredPlan = {
      ...plan,
      tasks: [reviewTask, ...plan.tasks.filter((t) => t.day !== todayIdx || !t.id.startsWith("review:"))],
    };
    // Keep today at most 3 tasks — priority to the review.
    const todays = updated.tasks.filter((t) => t.day === todayIdx).slice(0, 3);
    const others = updated.tasks.filter((t) => t.day !== todayIdx);
    setPlan({ ...updated, tasks: [...todays, ...others] });
    savePlan({ ...updated, tasks: [...todays, ...others] });
  }, [mounted, today, uid, plan, queueStatus, reviewsDue]);

  /* ---------------- Auto-ticks from real data ------------------------ */
  const mergeTicks = useCallback((newTicks: Record<string, PlanTick>) => {
    setPlan((prev) => {
      if (!prev || !Object.keys(newTicks).length) return prev;
      const updated: StoredPlan = { ...prev, ticks: { ...prev.ticks, ...newTicks } };
      savePlan(updated);
      return updated;
    });
  }, []);

  useEffect(() => {
    if (!mounted || !today || !plan || !uid) return;
    if (activity === null && !activityFailed) return;
    const fresh = deriveAutoTicks(
      plan.tasks,
      activity ?? [],
      reviewedToday,
      today,
      plan.ticks,
    );
    mergeTicks(fresh);
  }, [mounted, today, plan, uid, activity, activityFailed, reviewedToday, mergeTicks]);

  /* ---------------- Manual mark (today's tasks only) ----------------- */
  const markDone = useCallback(
    (task: PlanTask) => {
      if (!plan || !today) return;
      const key = `${task.id}|${toLocalISO(today)}`;
      const updated: StoredPlan = {
        ...plan,
        ticks: { ...plan.ticks, [key]: { t: "manual", at: new Date().toISOString() } },
      };
      setPlan(updated);
      savePlan(updated);
    },
    [plan, today],
  );

  /* ---------------- Render gates ------------------------------------- */
  if (!mounted || !today) return null; // SSR renders nothing — no drift
  if (dashStatus === "unauthorized" || dashStatus === "error") return null; // quiet hide
  if (dashStatus === "loading") {
    return (
      <section aria-label="Loading your study plan" className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0b0a10]/80" style={MONO_VARS}>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
        <div className="px-5 py-8 sm:px-8">
          <div className="h-2.5 w-36 max-w-full animate-pulse rounded bg-white/[0.06]" />
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded border border-white/[0.06] bg-white/[0.03]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const weekStart = weekStartOf(today);
  const todayIdx = Math.max(0, Math.min(6, Math.round((today.getTime() - new Date(toLocalISO(weekStart) + "T00:00:00").getTime()) / 86_400_000)));
  const todayISO = toLocalISO(today);
  const dueNow = queueStatus === "ready" ? reviewsDue : 0;

  const rangeLabel = `${weekStart.toLocaleDateString("en-IN", { month: "short", day: "numeric" })} – ${addDays(weekStart, 6).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}`;

  const days = Array.from({ length: 7 }, (_, d) => {
    const date = addDays(weekStart, d);
    const tasks = (plan?.tasks ?? []).filter((t) => t.day === d);
    return { d, date, tasks };
  });

  const scheduledCount = days.reduce((n, x) => n + x.tasks.length, 0);
  const doneCount = days.reduce(
    (n, x) => n + x.tasks.filter((t) => plan?.ticks[`${t.id}|${toLocalISO(x.date)}`]).length,
    0,
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Your study plan for the week"
      className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0b0a10]/80"
      style={MONO_VARS}
      data-testid="studyplan"
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/70 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.30]"
        style={{ background: "radial-gradient(700px 200px at 12% -10%, rgba(251,191,36,0.10), transparent 65%)" }}
      />

      <div className="relative px-5 py-6 sm:px-8 sm:py-8">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-gold-400">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            Your study plan
          </p>
          <span aria-hidden className="hidden h-3 w-px bg-white/15 sm:block" />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-surface-600">{rangeLabel}</p>
          {exam.active && exam.daysToBoards != null && (
            <span
              data-testid="studyplan-exam-chip"
              title="CBSE board papers typically begin mid-February — your school's date may differ."
              className="ml-auto flex items-center gap-1.5 rounded border border-gold-500/40 bg-gold-500/10 px-2.5 py-0.5 font-display text-[11px] font-bold text-gold-300"
            >
              <Flag className="h-3 w-3" aria-hidden />
              ≈{exam.daysToBoards} days — revision mode
            </span>
          )}
          {scheduledCount > 0 && (
            <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${exam.active ? "text-surface-600" : "ml-auto"}`}>
              {doneCount}/{scheduledCount} done
            </span>
          )}
        </div>

        {exam.active && (
          <p className="mt-2 max-w-3xl text-[11px] leading-snug text-surface-600">
            Revision mode: more chapter tests and review, less new content. CBSE board papers
            typically begin mid-February — your school&apos;s date may differ.
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="font-display text-lg font-bold leading-snug text-white sm:text-2xl">
            {hasFootprint ? "What to study this week" : "Start here — the plan builds itself"}
          </h2>
        </div>

        {/* ── Micro-coach — one honest, evidence-based tip per day ── */}
        <p className="mt-3 flex max-w-3xl items-start gap-2 text-[12px] leading-relaxed text-surface-700" data-testid="studyplan-tip">
          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-400" aria-hidden />
          <span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-surface-600">How to study today · </span>
            {tipOfDay(today)}
          </span>
        </p>

        {detailFailed && !weakest && (
          <p className="mt-2 text-[11px] leading-snug text-surface-600" data-testid="studyplan-degraded">
            Your mastery history is unreachable right now — this week is planned from due reviews
            and the syllabus sequence until it returns.
          </p>
        )}

        {/* ── 7-day grid ─────────────────────────────────────────── */}
        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-7">
          {days.map(({ d, date, tasks }) => {
            const isToday = d === todayIdx;
            const isPast = d < todayIdx;
            const dayISO = toLocalISO(date);
            return (
              <div
                key={d}
                data-testid={`studyplan-day-${d}`}
                className={`flex min-h-[150px] flex-col rounded border p-3 ${
                  isToday
                    ? "border-gold-500/50 bg-gold-500/[0.06]"
                    : "border-white/[0.07] bg-white/[0.02]"
                }`}
              >
                <div className="flex items-baseline justify-between gap-1">
                  <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${isToday ? "text-gold-400" : "text-surface-600"}`}>
                    {DAY_LABELS[d]} <span className="text-surface-500">{date.getDate()}</span>
                  </p>
                  {isToday && (
                    <span className="rounded-sm bg-gold-500/20 px-1.5 py-px font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-gold-300">
                      Today
                    </span>
                  )}
                </div>

                {tasks.length === 0 ? (
                  <p className="mt-3 text-[11px] leading-snug text-surface-600">
                    {isPast || !plan
                      ? "—"
                      : hasFootprint
                        ? "Catch up, or explore freely."
                        : "Your plan fills in after your first session."}
                  </p>
                ) : (
                  <div className="mt-2 flex flex-1 flex-col gap-2">
                    {tasks.map((task) => {
                      const tick = plan?.ticks[`${task.id}|${dayISO}`];
                      const Icon = KIND_ICON[task.kind] ?? PenLine;
                      const title =
                        task.liveCount && isToday && dueNow > 0
                          ? dueNow === 1
                            ? "Clear 1 due review"
                            : `Clear ${dueNow} due reviews`
                          : task.title;
                      const canMark = isToday && !tick;
                      return (
                        <div
                          key={task.id}
                          data-testid={`studyplan-task-${d}`}
                          className={`group relative flex-1 rounded border p-2 transition-colors ${
                            tick
                              ? "border-mint-500/30 bg-mint-500/[0.05]"
                              : "border-white/10 bg-white/[0.03] hover:border-gold-500/40"
                          }`}
                        >
                          <Link href={task.href} className="block" data-testid={`studyplan-task-link-${d}`}>
                            <span className="flex items-center gap-1.5">
                              <Icon className={`h-3.5 w-3.5 shrink-0 ${tick ? "text-mint-400" : "text-gold-400"}`} aria-hidden />
                              <span className={`text-[12px] font-semibold leading-tight ${tick ? "text-mint-200" : "text-white"}`}>
                                {title}
                              </span>
                              <ArrowRight className="ml-auto h-3 w-3 shrink-0 text-surface-500 transition-transform group-hover:translate-x-0.5 group-hover:text-gold-300" aria-hidden />
                            </span>
                            {task.detail && (
                              <span className="mt-1 block text-[10px] leading-snug text-surface-600">
                                {task.detail}
                              </span>
                            )}
                          </Link>
                          {tick ? (
                            <p className="mt-1.5 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-mint-400">
                              <CheckCircle2 className="h-3 w-3" aria-hidden />
                              {tick.t === "auto" ? "Done" : "Marked done"}
                            </p>
                          ) : canMark ? (
                            <button
                              type="button"
                              onClick={() => markDone(task)}
                              className="mt-1.5 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-surface-500 transition-colors hover:text-gold-300"
                              aria-label={`Mark "${title}" done`}
                            >
                              <Circle className="h-3 w-3" aria-hidden />
                              Mark done
                            </button>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Honesty footer ─────────────────────────────────────── */}
        <p className="mt-4 text-[11px] leading-snug text-surface-600">
          Built from your real reviews, mastery scores and the official syllabus graph — re-planned
          at the start of each week. Ticks come from recorded activity or your own mark, never from
          wishful thinking.
          {!activityFailed && activity !== null && activity.length === 0 && !hasFootprint && " "}
          {!activityFailed && activity !== null && activity.length === 0 && !hasFootprint && (
            <span className="text-surface-500">No recorded activity yet — everything here starts today.</span>
          )}
        </p>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </motion.section>
  );
}
