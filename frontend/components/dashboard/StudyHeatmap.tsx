"use client";

/**
 * StudyHeatmap — calendar of real study activity.
 * Data: GET /api/progress/heatmap → [{date, completed?, activities_count?, intensity}]
 * Sparse array of days the backend has records for. Intensity is rendered
 * exactly as reported; days with no record are empty. No invented activity.
 */

import { useMemo } from "react";
import { CalendarDays } from "lucide-react";
import type { HeatmapDay } from "./useDashboardData";
import { ErrorState, SectionHeading } from "./ui";

const DAY_MS = 24 * 60 * 60 * 1000;
const WEEKS = 18; // ~4 months of columns

/** Local-date key (toISOString would shift the day under non-UTC timezones). */
function dateKey(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function levelClass(intensity: number): string {
  if (intensity <= 0) return "bg-white/[0.05]";
  if (intensity === 1) return "bg-gold-600/50";
  if (intensity === 2) return "bg-gold-500/70";
  if (intensity <= 4) return "bg-gold-400/85";
  return "bg-gold-300";
}

export default function StudyHeatmap({
  days,
  loading,
  failed,
}: {
  days: HeatmapDay[] | null;
  loading: boolean;
  failed: boolean;
}) {
  const { columns, activeDays, totalActivities } = useMemo(() => {
    const byDate = new Map<string, number>();
    for (const d of days ?? []) {
      const raw = d.intensity ?? d.activities_count ?? (d.completed ? 1 : 0);
      byDate.set(d.date, Math.max(0, raw ?? 0));
    }
    // Align columns to weeks ending today (last column = current week)
    const today = new Date();
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // Walk back so the grid ends on today's weekday position
    const start = new Date(end.getTime() - (WEEKS * 7 - 1) * DAY_MS);
    const todayKey = dateKey(end);
    const cols: { date: string; label: number; intensity: number; isToday: boolean }[][] = [];
    let active = 0;
    let totalAct = 0;
    for (let w = 0; w < WEEKS; w++) {
      const col: { date: string; label: number; intensity: number; isToday: boolean }[] = [];
      for (let d = 0; d < 7; d++) {
        const day = new Date(start.getTime() + (w * 7 + d) * DAY_MS);
        if (day > end) break;
        const key = dateKey(day);
        const intensity = byDate.get(key) ?? 0;
        if (intensity > 0) {
          active += 1;
          totalAct += intensity;
        }
        col.push({
          date: key,
          label: day.getDate(),
          intensity,
          isToday: key === todayKey,
        });
      }
      cols.push(col);
    }
    return { columns: cols, activeDays: active, totalActivities: totalAct };
  }, [days]);

  return (
    <div className="glass-card rounded-2xl p-6">
      <SectionHeading
        icon={CalendarDays}
        title="Study Calendar"
        hint={
          failed
            ? undefined
            : totalActivities > 0
              ? `${activeDays} active days · ${totalActivities} activities in the last ${WEEKS} weeks`
              : `Your last ${WEEKS} weeks — squares light up as you study`
        }
      />

      {loading && (
        <div className="flex gap-[3px] overflow-hidden" aria-hidden>
          {Array.from({ length: WEEKS }).map((_, w) => (
            <div key={w} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, d) => (
                <div key={d} className="w-3 h-3 rounded-[3px] bg-white/[0.05] animate-pulse" />
              ))}
            </div>
          ))}
        </div>
      )}

      {!loading && failed && (
        <ErrorState title="The study calendar is offline right now" />
      )}

      {!loading && !failed && (
        <>
          <div className="flex gap-[3px] overflow-x-auto pb-1">
            {columns.map((col, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {col.map((cell) => (
                  <div
                    key={cell.date}
                    title={`${cell.date}: ${cell.intensity} ${cell.intensity === 1 ? "activity" : "activities"}`}
                    className={`w-3 h-3 rounded-[3px] ${levelClass(cell.intensity)} ${
                      cell.isToday ? "ring-1 ring-gold-300/80" : ""
                    }`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-[11px] text-surface-600">
              {totalActivities > 0
                ? "Straight from your recorded sessions — no estimates."
                : "Quiet so far — your first session lights the first square."}
            </p>
            <div className="flex items-center gap-1.5" aria-hidden>
              <span className="text-[10px] text-surface-600 mr-1">Less</span>
              {[0, 1, 2, 4, 6].map((lv) => (
                <span key={lv} className={`w-3 h-3 rounded-[3px] ${levelClass(lv)}`} />
              ))}
              <span className="text-[10px] text-surface-600 ml-1">More</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
