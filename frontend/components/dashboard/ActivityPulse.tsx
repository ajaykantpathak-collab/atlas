"use client";

/**
 * ActivityPulse — recent activity feed + this-week study chart.
 * Data: GET /api/progress/activity?limit=8 (ActivitySchema[]) and
 * GET /api/progress/weekly-activity (WeeklyActivitySchema[]). All values
 * rendered exactly as the backend reports them — zeros included.
 */

import { motion } from "framer-motion";
import { Activity, CalendarDays, CheckCircle2, XCircle } from "lucide-react";
import { subjectName } from "@/lib/nodeTitle";
import type { ActivityItem, WeeklyActivityDay } from "./types";
import {
  EmptyState, ErrorState, SkeletonBlock, activityIcon, riseItem, safeLabel, staggerContainer,
} from "./ui";

export function ActivityFeed({
  items,
  loading,
  failed,
}: {
  items: ActivityItem[] | null;
  loading: boolean;
  failed: boolean;
}) {
  // Backend sends ISO timestamps — display format only, data untouched.
  const fmtTime = (t?: string): string => {
    if (!t) return "";
    const d = new Date(t);
    if (Number.isNaN(d.getTime())) return t;
    return d.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="font-display text-base font-bold text-white flex items-center gap-2 mb-1">
        <Activity className="w-5 h-5 text-gold-400" />
        Recent Activity
      </h2>
      <p className="text-xs text-surface-600 mb-4">Your last recorded sessions</p>

      {loading && (
        <div className="space-y-2.5">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/5">
              <SkeletonBlock className="h-8 w-8 rounded-lg shrink-0" />
              <div className="flex-1">
                <SkeletonBlock className="h-3 w-3/4 mb-1.5" />
                <SkeletonBlock className="h-2 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && failed && <ErrorState title="Activity is offline right now" />}

      {!loading && !failed && (items ?? []).length === 0 && (
        <EmptyState
          icon={Activity}
          title="No activity recorded yet"
          body="Your practice sessions, quizzes and simulations will appear here the moment you start. Take your first diagnostic to begin your story."
          ctaHref="/diagnostic"
          ctaLabel="Take your first diagnostic"
        />
      )}

      {!loading && !failed && (items ?? []).length > 0 && (
        <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="space-y-2.5">
          {(items ?? []).map((item) => {
            const Icon = activityIcon(item.activityType);
            const title = safeLabel(item.title) || "Study session";
            const subject = item.subject ? subjectName(item.subject) : null;
            return (
              <motion.li
                key={item.id}
                variants={riseItem}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/5"
              >
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-gold-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{title}</p>
                  <p className="text-[11px] text-surface-600 truncate">
                    {[subject, fmtTime(item.time)].filter(Boolean).join(" · ")}
                  </p>
                </div>
                {item.score != null && item.score !== "" && (
                  <span className="text-[11px] font-display font-bold text-gold-300 shrink-0">{item.score}</span>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
}

export function WeeklyPulse({
  days,
  loading,
  failed,
}: {
  days: WeeklyActivityDay[] | null;
  loading: boolean;
  failed: boolean;
}) {
  const data = days ?? [];
  const max = Math.max(1, ...data.map((d) => d.value ?? 0));
  const total = data.reduce((acc, d) => acc + (d.value ?? 0), 0);

  return (
    <div className="glass-card rounded-2xl p-6">
      <h2 className="font-display text-base font-bold text-white flex items-center gap-2 mb-1">
        <CalendarDays className="w-5 h-5 text-gold-400" />
        This Week
      </h2>
      <p className="text-xs text-surface-600 mb-4">
        {total > 0 ? `${total} activities in the last 7 days` : "Your last 7 days of study activity"}
      </p>

      {loading && (
        <div className="flex items-end gap-2 h-28">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonBlock key={i} className="flex-1 rounded-t-lg h-full" />
          ))}
        </div>
      )}

      {!loading && failed && <ErrorState title="Weekly activity is offline right now" />}

      {!loading && !failed && data.length > 0 && (
        <>
          <div className="flex items-end gap-2 h-28">
            {data.map((d, i) => {
              const value = d.value ?? 0;
              const height = value > 0 ? Math.max(12, Math.round((value / max) * 100)) : 4;
              return (
                <div key={`${d.day}-${i}`} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center" style={{ height: "84px" }}>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className={`w-full max-w-[28px] rounded-t-lg ${
                        value > 0
                          ? "bg-gradient-to-t from-gold-600 via-gold-500 to-gold-300"
                          : "bg-white/[0.07]"
                      }`}
                      title={`${value} activity on ${d.day}`}
                    />
                  </div>
                  <span className={`text-[10px] ${value > 0 ? "text-gold-300" : "text-surface-600"}`}>{d.day}</span>
                </div>
              );
            })}
          </div>
          {total === 0 && (
            <p className="text-[11px] text-surface-600 mt-3 text-center">
              Quiet week so far — one practice session puts you on the board.
            </p>
          )}
        </>
      )}
    </div>
  );
}

/** Small correctness chip shared by feed rows that carry a correct flag. */
export function CorrectChip({ correct }: { correct: boolean }) {
  return correct ? (
    <span className="flex items-center gap-1 text-[11px] font-medium text-mint-300">
      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
    </span>
  ) : (
    <span className="flex items-center gap-1 text-[11px] font-medium text-rose-300">
      <XCircle className="w-3.5 h-3.5" /> Review
    </span>
  );
}
