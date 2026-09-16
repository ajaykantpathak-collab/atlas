"use client";

/**
 * useDashboardData — single live-data hook behind the student dashboards.
 *
 * Every widget calls ONLY these verified endpoints (see /openapi.json):
 *   GET /api/progress/dashboard
 *   GET /api/progress/mastery        (auth-derived student — no path param)
 *   GET /api/progress/overview?range=all
 *   GET /api/progress/activity?limit=8
 *   GET /api/progress/weekly-activity
 *   GET /api/progress/heatmap        (used by the progress report)
 *   GET /api/progress/review/queue   (used by the progress report)
 *   GET /api/progress/review/stats   (used by the progress report)
 *   GET /api/achievements/?filter=all
 *
 * No numbers are ever invented: each endpoint carries its own
 * loading / ready / error / unauthorized status so widgets can render
 * honest skeletons or empty states independently. A slow endpoint
 * (verified: heatmap/review can stall server-side) flips to a truthful
 * "offline" state after its timeout instead of spinning forever.
 */

import { useEffect, useState } from "react";
import { api, getAuthToken } from "@/lib/api";
import type {
  Achievement,
  AchievementListResponse,
  ActivityItem,
  DashboardData,
  ProgressOverview,
  SubjectMastery,
  WeeklyActivityDay,
} from "./types";

export type WidgetStatus = "loading" | "ready" | "error" | "unauthorized";

export interface Widget<T> {
  data: T | null;
  status: WidgetStatus;
}

function classify(err: unknown): WidgetStatus {
  const msg = err instanceof Error ? err.message : String(err);
  // api.ts throws `API error 401: ...` on auth failures
  if (/\b401\b|Not authenticated/i.test(msg)) return "unauthorized";
  return "error";
}

/** Reject after `ms` so a hung endpoint becomes an honest error, not an
 *  eternal skeleton. The underlying fetch is abandoned, never faked. */
function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Request timed out")), ms);
    p.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      },
    );
  });
}

function useEndpoint<T>(path: string, enabled: boolean, timeoutMs = 15000): Widget<T> {
  const [state, setState] = useState<Widget<T>>({ data: null, status: "loading" });

  useEffect(() => {
    if (!enabled) {
      setState({ data: null, status: "unauthorized" });
      return;
    }
    let alive = true;
    setState({ data: null, status: "loading" });
    withTimeout(api.get<T>(path), timeoutMs)
      .then((data) => alive && setState({ data, status: "ready" }))
      .catch((err) => alive && setState({ data: null, status: classify(err) }));
    return () => {
      alive = false;
    };
  }, [path, enabled, timeoutMs]);

  return state;
}

export interface DashboardDataBundle {
  signedOut: boolean;
  dashboard: Widget<DashboardData>;
  mastery: Widget<SubjectMastery[]>;
  overview: Widget<ProgressOverview>;
  activity: Widget<ActivityItem[]>;
  weekly: Widget<WeeklyActivityDay[]>;
  achievements: Widget<AchievementListResponse>;
  heatmap: Widget<HeatmapDay[]>;
  reviewQueue: Widget<ReviewQueueResponse>;
  reviewStats: Widget<ReviewStats>;
}

export function useDashboardData(): DashboardDataBundle {
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  useEffect(() => {
    // getAuthToken reads localStorage — only valid after mount
    setHasToken(Boolean(getAuthToken()));
  }, []);

  const enabled = hasToken === true;

  const dashboard = useEndpoint<DashboardData>("/api/progress/dashboard", enabled);
  const mastery = useEndpoint<SubjectMastery[]>("/api/progress/mastery", enabled);
  const overview = useEndpoint<ProgressOverview>("/api/progress/overview?range=all", enabled);
  const activity = useEndpoint<ActivityItem[]>("/api/progress/activity?limit=8", enabled);
  const weekly = useEndpoint<WeeklyActivityDay[]>("/api/progress/weekly-activity", enabled);
  const achievements = useEndpoint<AchievementListResponse>("/api/achievements/?filter=all", enabled);
  // These three can stall server-side on a cold/locked DB — short timeout,
  // graceful offline card instead of an endless spinner.
  const heatmap = useEndpoint<HeatmapDay[]>("/api/progress/heatmap", enabled, 8000);
  const reviewQueue = useEndpoint<ReviewQueueResponse>("/api/progress/review/queue", enabled, 8000);
  const reviewStats = useEndpoint<ReviewStats>("/api/progress/review/stats", enabled, 8000);

  return {
    signedOut: hasToken === false,
    dashboard,
    mastery,
    overview,
    activity,
    weekly,
    achievements,
    heatmap,
    reviewQueue,
    reviewStats,
  };
}

/** Achievement list regardless of which key the backend populated. */
export function achievementItems(res: AchievementListResponse | null): Achievement[] {
  if (!res) return [];
  return res.achievements ?? res.items ?? [];
}

/* ------------------------------------------------------------------ */
/* Live contracts for the progress-report extras                       */
/* (verified against backend schemas + live curl)                      */
/* ------------------------------------------------------------------ */

/** GET /api/progress/heatmap → [{date, completed?, activities_count?, intensity}] */
export interface HeatmapDay {
  date: string;
  intensity?: number;
  activities_count?: number;
  completed?: boolean;
}

/** GET /api/progress/review/queue → {items: ReviewItem[], total} (camelCase items) */
export interface ReviewQueueItem {
  id: string;
  nodeId?: string;
  conceptName?: string;
  subject?: string | null;
  intervalDays?: number;
  repetitions?: number;
  nextReviewDate?: string;
}

export interface ReviewQueueResponse {
  items?: ReviewQueueItem[];
  total?: number;
}

/** GET /api/progress/review/stats → ReviewStatsResponse (camelCase) */
export interface ReviewStats {
  totalItems?: number;
  dueToday?: number;
  reviewedToday?: number;
  streakDays?: number;
  accuracy?: number;
  averageInterval?: number;
  retentionRate?: number;
  streak?: number;
}
