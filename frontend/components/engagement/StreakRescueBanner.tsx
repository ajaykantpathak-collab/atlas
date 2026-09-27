"use client";

/**
 * StreakRescueBanner — a dismissible, honest streak-protection banner.
 *
 * Shown ONLY when the backend's day-boundary math says the streak is
 * genuinely exposed:
 *   at_risk → "one session today keeps it"  (last activity was yesterday)
 *   lapsed  → "a session today starts fresh" (it already broke — never
 *             claim today can still save it)
 * Dismissal lasts for the server-day only; it returns tomorrow if still true.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, X } from "lucide-react";
import type { EngagementSummary } from "./useEngagement";

function dismissalKey(serverDate: string) {
  return `atlas.streakBanner.dismissed.${serverDate}`;
}

export default function StreakRescueBanner({ data }: { data: EngagementSummary | null }) {
  const [dismissed, setDismissed] = useState(true); // hidden until we can prove otherwise
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const state = data?.streak?.state;
  const current = data?.streak?.current ?? 0;
  const visible =
    mounted &&
    data != null &&
    (state === "at_risk" || state === "lapsed") &&
    !dismissed;

  useEffect(() => {
    if (!data?.server_date) return;
    try {
      setDismissed(Boolean(window.localStorage.getItem(dismissalKey(data.server_date))));
    } catch {
      setDismissed(false);
    }
  }, [data?.server_date]);

  if (!visible) return null;

  const isAtRisk = state === "at_risk";

  const dismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(dismissalKey(data!.server_date), "1");
    } catch {
      /* storage unavailable — banner just re-renders next visit */
    }
  };

  return (
    <div
      role="alert"
      data-testid="streak-rescue-banner"
      className="relative overflow-hidden rounded-lg border border-red-500/40 bg-gradient-to-r from-red-500/[0.12] via-[#160b0e]/90 to-[#0b0a10]/90"
    >
      <div className="h-px w-full bg-gradient-to-r from-red-500/70 via-red-500/30 to-transparent" />
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-5 py-4 sm:px-7">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-red-500/40 bg-red-500/10">
          <Flame className="h-5 w-5 text-red-400" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-bold text-white sm:text-base">
            {isAtRisk
              ? `Your ${current}-day streak is at risk — nothing recorded today.`
              : "Your streak has lapsed."}
          </p>
          <p className="mt-0.5 text-xs leading-snug text-surface-700">
            {isAtRisk
              ? "One session before the day ends keeps it burning."
              : "It happens. A session today starts a fresh streak — day one counts from today."}
          </p>
        </div>
        <Link
          href="/practice"
          data-testid="streak-rescue-cta"
          className="btn-primary shrink-0 px-4 py-2.5 text-xs font-bold sm:text-sm"
        >
          {isAtRisk ? "Defend the streak" : "Restart the streak"}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss streak reminder for today"
          data-testid="streak-rescue-dismiss"
          className="rounded p-1.5 text-surface-600 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
