"use client";

/**
 * useEngagement — live-data hooks for the engagement layer.
 *
 * Endpoints (all auth-derived — no ids in payloads):
 *   GET    /api/engagement/goal                → today's goal + REAL progress
 *   PUT    /api/engagement/goal                → set/update the daily goal
 *   DELETE /api/engagement/goal                → clear the goal
 *   GET    /api/engagement/notifications       → derived, real notifications
 *   POST   /api/engagement/notifications/read  → persist mark-as-read
 *
 * Honesty rules: every widget status is tracked independently; an error or
 * timeout renders an honest state — numbers are never invented client-side.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { api, getAuthToken } from "@/lib/api";

/* ------------------------------------------------------------------ */
/* Live contracts (verified against backend/api/engagement.py)         */
/* ------------------------------------------------------------------ */

export interface EngagementGoal {
  metric: "questions" | "minutes";
  target: number;
  updated_at?: string | null;
}

export interface EngagementToday {
  date: string;
  questions: number;
  minutes: number;
  seconds: number;
}

export type StreakState = "active_today" | "at_risk" | "lapsed" | "none";

export interface EngagementStreak {
  current: number;
  last_activity_date: string | null;
  state: StreakState;
}

export interface EngagementSummary {
  goal: EngagementGoal | null;
  today: EngagementToday;
  completed: boolean;
  streak: EngagementStreak;
  server_date: string;
}

export interface EngagementNotification {
  id: string;
  type:
    | "streak_at_risk"
    | "streak_lapsed"
    | "goal_completed"
    | "achievement_unlocked"
    | "review_due"
    | string;
  title: string;
  body: string;
  created_at: string;
  read: boolean;
  href: string;
}

export interface NotificationsResponse {
  notifications: EngagementNotification[];
  unread: number;
  server_date: string;
}

export type EngagementStatus = "loading" | "ready" | "error" | "unauthorized";

function classify(err: unknown): EngagementStatus {
  const msg = err instanceof Error ? err.message : String(err);
  if (/\b401\b|Not authenticated/i.test(msg)) return "unauthorized";
  return "error";
}

/** Reject after `ms` so a hung request becomes an honest error state, not
 *  an eternal skeleton (same pattern as useDashboardData.withTimeout).
 *  The underlying fetch is abandoned, never faked. */
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

/* ------------------------------------------------------------------ */
/* Daily goal                                                          */
/* ------------------------------------------------------------------ */

export function useEngagementGoal() {
  const [data, setData] = useState<EngagementSummary | null>(null);
  const [status, setStatus] = useState<EngagementStatus>("loading");
  const [saving, setSaving] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    setStatus("loading");
    try {
      const d = await withTimeout(
        api.get<EngagementSummary>("/api/engagement/goal"),
        12000,
      );
      if (!mounted.current) return;
      setData(d);
      setStatus("ready");
    } catch (err) {
      // One automatic retry: a burst of dashboard calls can momentarily
      // queue on the backend. A second failure is an honest error state.
      try {
        await new Promise((r) => setTimeout(r, 3000));
        const d = await withTimeout(
          api.get<EngagementSummary>("/api/engagement/goal"),
          12000,
        );
        if (!mounted.current) return;
        setData(d);
        setStatus("ready");
      } catch {
        if (!mounted.current) return;
        setStatus(classify(err));
      }
    }
  }, []);

  useEffect(() => {
    // getAuthToken reads localStorage — only valid after mount
    if (getAuthToken()) void refresh();
    else setStatus("unauthorized");
  }, [refresh]);

  const setGoal = useCallback(
    async (metric: "questions" | "minutes", target: number) => {
      setSaving(true);
      try {
        const d = await api.put<EngagementSummary>("/api/engagement/goal", {
          metric,
          target,
        });
        if (!mounted.current) return;
        setData(d);
        setStatus("ready");
        return true;
      } catch {
        return false;
      } finally {
        if (mounted.current) setSaving(false);
      }
    },
    [],
  );

  const clearGoal = useCallback(async () => {
    setSaving(true);
    try {
      const d = await api.delete<EngagementSummary>("/api/engagement/goal");
      if (!mounted.current) return;
      setData(d);
      setStatus("ready");
      return true;
    } catch {
      return false;
    } finally {
      if (mounted.current) setSaving(false);
    }
  }, []);

  return { data, status, saving, refresh, setGoal, clearGoal };
}

/* ------------------------------------------------------------------ */
/* Notification center                                                 */
/* ------------------------------------------------------------------ */

export function useNotifications(pollMs = 60000) {
  const [data, setData] = useState<NotificationsResponse | null>(null);
  const [status, setStatus] = useState<EngagementStatus>("loading");
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    const load = () =>
      withTimeout(
        api.get<NotificationsResponse>("/api/engagement/notifications"),
        12000,
      );
    try {
      let d: NotificationsResponse;
      try {
        d = await load();
      } catch {
        // One automatic retry: the burst of dashboard calls can momentarily
        // queue on the backend. A second failure is an honest error state.
        await new Promise((r) => setTimeout(r, 3000));
        d = await load();
      }
      if (!mounted.current) return;
      setData(d);
      setStatus("ready");
    } catch (err) {
      if (!mounted.current) return;
      setStatus(classify(err));
    }
  }, []);

  useEffect(() => {
    if (!getAuthToken()) {
      setStatus("unauthorized");
      return;
    }
    void refresh();
    if (!pollMs) return;
    const t = setInterval(() => void refresh(), pollMs);
    return () => clearInterval(t);
  }, [refresh, pollMs]);

  const markRead = useCallback(
    async (ids: string[]) => {
      if (!ids.length) return;
      try {
        await api.post("/api/engagement/notifications/read", { ids });
        // Re-derive from the server so the UI never lies about read state.
        await refresh();
      } catch {
        /* read-state persistence failed — leave items unread, honest */
      }
    },
    [refresh],
  );

  const markAllRead = useCallback(async () => {
    const unreadIds = (data?.notifications ?? [])
      .filter((n) => !n.read)
      .map((n) => n.id);
    await markRead(unreadIds);
  }, [data, markRead]);

  return { data, status, refresh, markRead, markAllRead };
}

/* ------------------------------------------------------------------ */
/* Weekly parent digest                                                */
/* ------------------------------------------------------------------ */

export interface DigestTopic {
  name: string;
  subject: string | null;
  mastery: number;
  attempts: number;
}

export interface DigestDay {
  date: string;
  questions: number;
  correct: number;
  minutes: number;
}

export interface WeeklyDigestData {
  student_id: string;
  student_name: string | null;
  class_level: number | null;
  week_start: string;
  week_end: string;
  has_activity: boolean;
  questions: number;
  correct: number;
  accuracy: number | null;
  minutes: number;
  xp: number;
  active_days: number;
  streak: EngagementStreak;
  top_topic: DigestTopic | null;
  weakest_topic: DigestTopic | null;
  by_day: DigestDay[];
  generated_at: string;
}

export type DigestStatus = "loading" | "ready" | "error" | "unauthorized";

export function useWeeklyDigest(studentId: string | null, token: string | null) {
  const [data, setData] = useState<WeeklyDigestData | null>(null);
  const [status, setStatus] = useState<DigestStatus>("loading");

  useEffect(() => {
    let alive = true;
    if (!studentId || !token) {
      setStatus("error");
      setData(null);
      return;
    }
    setStatus("loading");
    setData(null);
    fetch(`/api/engagement/weekly-digest/${encodeURIComponent(studentId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json() as Promise<WeeklyDigestData>;
      })
      .then((d) => {
        if (!alive) return;
        setData(d);
        setStatus("ready");
      })
      .catch((err) => {
        if (!alive) return;
        setStatus(/401|403/.test(String(err?.message)) ? "unauthorized" : "error");
      });
    return () => {
      alive = false;
    };
  }, [studentId, token]);

  return { data, status };
}
