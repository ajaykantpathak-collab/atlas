"use client";

/**
 * NotificationBell — the in-app notification center.
 *
 * Real notifications only: every item is DERIVED server-side from recorded
 * data (streak day-math, today's goal, achievement unlocks, the SM-2 review
 * queue). Zero fabricated events. Mark-as-read is persisted per student on
 * the backend, so read state survives devices and sessions.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Bell,
  BookOpenText,
  CheckCheck,
  Flame,
  PartyPopper,
  Target,
} from "lucide-react";
import type {
  EngagementNotification,
  NotificationsResponse,
} from "./useEngagement";

const TYPE_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  streak_at_risk: Flame,
  streak_lapsed: Flame,
  goal_completed: Target,
  achievement_unlocked: PartyPopper,
  review_due: BookOpenText,
};

function shortWhen(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const diff = Date.now() - d.getTime();
  if (diff < 0) return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function NotificationBell({
  data,
  status,
  markRead,
  markAllRead,
}: {
  data: NotificationsResponse | null;
  status: "loading" | "ready" | "error" | "unauthorized";
  markRead: (ids: string[]) => Promise<void>;
  markAllRead: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const unread = data?.unread ?? 0;
  const items = data?.notifications ?? [];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        data-testid="notification-bell"
        aria-label={unread > 0 ? `Notifications — ${unread} unread` : "Notifications"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-surface-600 transition-colors hover:border-gold-500/40 hover:text-gold-300"
      >
        <Bell className="h-4 w-4" aria-hidden />
        {unread > 0 && (
          <span
            data-testid="notification-badge"
            className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white"
          >
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          data-testid="notification-panel"
          className="absolute right-0 z-50 mt-2 w-[min(92vw,360px)] overflow-hidden rounded-xl border border-white/10 bg-[#0b0a10] shadow-2xl shadow-black/60"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-400"
              style={{ fontFamily: "var(--font-jetbrains, monospace)" }}
            >
              Notifications
            </p>
            {unread > 0 && (
              <button
                type="button"
                data-testid="mark-all-read"
                onClick={() => void markAllRead()}
                className="flex items-center gap-1 text-[11px] font-semibold text-gold-300 transition-colors hover:text-gold-200"
              >
                <CheckCheck className="h-3.5 w-3.5" aria-hidden />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[360px] overflow-y-auto">
            {status === "loading" && (
              <div className="space-y-2 p-4">
                <div className="h-10 animate-pulse rounded bg-white/[0.05]" />
                <div className="h-10 animate-pulse rounded bg-white/[0.05]" />
              </div>
            )}
            {status === "error" && (
              <p className="px-4 py-6 text-center text-xs text-surface-600">
                Couldn&apos;t load notifications right now.
              </p>
            )}
            {status === "ready" && items.length === 0 && (
              <p className="px-4 py-8 text-center text-xs leading-relaxed text-surface-600">
                All quiet — nothing needs your attention.
                <br />
                Real alerts (streaks, goals, badges, reviews) appear here.
              </p>
            )}
            {status === "ready" &&
              items.map((n: EngagementNotification) => {
                const Icon = TYPE_ICON[n.type] ?? Bell;
                return (
                  <Link
                    key={n.id}
                    href={n.href || "/dashboard"}
                    data-testid="notification-item"
                    onClick={() => {
                      if (!n.read) void markRead([n.id]);
                      setOpen(false);
                    }}
                    className={`flex gap-3 border-b border-white/[0.06] px-4 py-3 transition-colors last:border-0 hover:bg-white/[0.04] ${
                      n.read ? "opacity-60" : ""
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                        n.read
                          ? "border-white/10 bg-white/[0.03] text-surface-600"
                          : "border-gold-500/40 bg-gold-500/10 text-gold-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="truncate text-[13px] font-semibold text-white">
                          {n.title}
                        </span>
                        <span className="shrink-0 text-[10px] text-surface-600">
                          {shortWhen(n.created_at)}
                        </span>
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-surface-700">
                        {n.body}
                      </span>
                    </span>
                    {!n.read && (
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-400" aria-label="Unread" />
                    )}
                  </Link>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
