"use client";

/**
 * WeeklyDigest — the parent's weekly summary, rendered from REAL recorded
 * activity (quiz rows written by actual practice/assessment submissions).
 *
 * Every figure comes from GET /api/engagement/weekly-digest/{studentId}
 * (server-verified as the linked parent). A child with no recorded activity
 * this week gets an honest empty state — never zeros dressed up as data.
 */

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { useWeeklyDigest } from "./useEngagement";

function dayLabel(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso.slice(5);
  return d.toLocaleDateString(undefined, { weekday: "short" });
}

export default function WeeklyDigest({
  studentId,
  token,
}: {
  studentId: string | null;
  token: string | null;
}) {
  const { data, status } = useWeeklyDigest(studentId, token);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const maxDayQ = Math.max(1, ...(data?.by_day ?? []).map((d) => d.questions));

  return (
    <div
      data-testid="weekly-digest"
      className="rounded-2xl bg-slate-800 p-6 shadow-md border border-indigo-500/20 mb-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-lg font-bold text-slate-200">📅 Weekly Digest</h2>
        {data && (
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            Last 7 days
            {mounted &&
              ` · ${new Date(`${data.week_start}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" })} – ${new Date(`${data.week_end}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" })}`}
          </p>
        )}
      </div>

      {status === "loading" && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-700/50" />
          ))}
        </div>
      )}

      {status === "unauthorized" && (
        <p className="text-sm text-slate-400">
          This weekly summary is only available for your linked child.
        </p>
      )}

      {status === "error" && (
        <p className="text-sm text-slate-400">
          The weekly summary couldn&apos;t be loaded right now — please try again later.
        </p>
      )}

      {status === "ready" && data && !data.has_activity && (
        <p className="text-sm text-slate-400">
          No recorded practice in the last 7 days. When {data.student_name || "your child"} answers
          practice questions, the weekly summary appears here.
        </p>
      )}

      {status === "ready" && data && data.has_activity && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Questions" value={String(data.questions)} hint={`${data.correct} correct`} />
            <Stat
              label="Accuracy"
              value={data.accuracy != null ? `${Math.round(data.accuracy)}%` : "—"}
              hint={data.accuracy != null ? undefined : "not enough data"}
            />
            <Stat label="Practice XP" value={String(data.xp)} hint="10 per correct · 2 per retry" />
            <Stat
              label="Active days"
              value={`${data.active_days}/7`}
              hint={data.minutes > 0 ? `${data.minutes} min recorded` : "time not recorded"}
            />
          </div>

          {/* Per-day bars — real counts only */}
          <div className="mt-5">
            <div className="flex items-end gap-2 h-20">
              {data.by_day.map((d) => (
                <div key={d.date} className="flex flex-1 flex-col items-center justify-end gap-1">
                  <div
                    className="w-full rounded-t bg-indigo-500/70"
                    style={{ height: `${(d.questions / maxDayQ) * 100}%`, minHeight: d.questions > 0 ? 6 : 2, opacity: d.questions > 0 ? 1 : 0.25 }}
                    title={`${d.date}: ${d.questions} questions`}
                  />
                  <span className="text-[10px] text-slate-500">{dayLabel(d.date)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strongest / weakest topic of the week (real mastery rows) */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-700/40 border border-green-500/20 p-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-green-400">Strongest this week</p>
              {data.top_topic ? (
                <p className="mt-1 text-sm text-slate-200">
                  {data.top_topic.name}
                  <span className="text-slate-500"> · {data.top_topic.subject || "—"}</span>
                  <span className="ml-2 font-bold text-green-400">{Math.round(data.top_topic.mastery)}%</span>
                </p>
              ) : (
                <p className="mt-1 text-sm text-slate-400">No topic data yet this week.</p>
              )}
            </div>
            <div className="rounded-xl bg-slate-700/40 border border-amber-500/20 p-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-amber-400">Needs practice</p>
              {data.weakest_topic ? (
                <p className="mt-1 text-sm text-slate-200">
                  {data.weakest_topic.name}
                  <span className="text-slate-500"> · {data.weakest_topic.subject || "—"}</span>
                  <span className="ml-2 font-bold text-amber-400">{Math.round(data.weakest_topic.mastery)}%</span>
                </p>
              ) : (
                <p className="mt-1 text-sm text-slate-400">No topic data yet this week.</p>
              )}
            </div>
          </div>

          <p className="mt-4 text-[11px] leading-snug text-slate-500">
            Counts reflect answers recorded through Atlas practice. Accuracy and topics come from
            the same records shown on your child&apos;s progress pages.
          </p>
        </>
      )}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl bg-slate-700/40 p-3">
      <div className="text-xl font-black text-white">{value}</div>
      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</div>
      {hint ? <div className="text-[10px] text-slate-500 mt-0.5">{hint}</div> : null}
    </div>
  );
}
