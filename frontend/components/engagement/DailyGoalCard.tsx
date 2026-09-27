"use client";

/**
 * DailyGoalCard — the student's daily target with REAL progress.
 *
 * Progress is today's recorded activity (quiz rows written by actual
 * practice/assessment submissions) — nothing client-side invents a number.
 * If no goal is set, the editor offers 10 questions as a starting point;
 * the student's choice is persisted per-student on the backend.
 */

import { useMemo, useState } from "react";
import { CheckCircle2, Pencil, Target, Trash2 } from "lucide-react";
import GoalRing from "./GoalRing";
import type {
  EngagementStatus,
  EngagementSummary,
} from "./useEngagement";

const QUESTION_PRESETS = [5, 10, 15, 20];
const MINUTE_PRESETS = [10, 15, 30, 45];

const MONO_VARS = {
  "--font-jetbrains": "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
} as React.CSSProperties;

export default function DailyGoalCard({
  data,
  status,
  saving,
  setGoal,
  clearGoal,
}: {
  data: EngagementSummary | null;
  status: EngagementStatus;
  saving: boolean;
  setGoal: (metric: "questions" | "minutes", target: number) => Promise<boolean>;
  clearGoal: () => Promise<boolean>;
}) {
  const [editing, setEditing] = useState(false);
  const [metric, setMetric] = useState<"questions" | "minutes">("questions");
  const [target, setTarget] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);

  const goal = data?.goal ?? null;
  const today = data?.today;
  const done = progressValue(data);
  const targetValue = goal?.target ?? 0;
  const completed = data?.completed ?? false;

  const unitLabel = goal?.metric === "minutes" ? "min" : "q";

  const editorPresetList = metric === "questions" ? QUESTION_PRESETS : MINUTE_PRESETS;

  const ring = useMemo(
    () => (
      <GoalRing
        value={done}
        max={Math.max(1, targetValue)}
        size={92}
        stroke={8}
        done={completed}
        label={
          <span className="font-display text-lg font-bold text-white">
            {done}
            <span className="text-xs font-semibold text-surface-600">/{targetValue || "–"}</span>
            <span className="ml-0.5 text-[10px] font-semibold uppercase text-surface-600">
              {unitLabel}
            </span>
          </span>
        }
        sub={undefined}
      />
    ),
    [done, targetValue, completed, unitLabel],
  );

  const startEditing = () => {
    if (goal) {
      setMetric(goal.metric);
      setTarget(goal.target);
    } else {
      setMetric("questions");
      setTarget(10);
    }
    setError(null);
    setEditing(true);
  };

  const save = async () => {
    if (!Number.isFinite(target) || target < 1) {
      setError("Pick a target of at least 1.");
      return;
    }
    const ok = await setGoal(metric, Math.floor(target));
    if (ok) {
      setEditing(false);
      setError(null);
    } else {
      setError("Could not save — try again in a moment.");
    }
  };

  return (
    <section
      aria-label="Daily goal"
      className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0b0a10]/80"
      style={MONO_VARS}
    >
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
      <div className="px-5 py-5 sm:px-7">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-gold-400">
            <Target className="h-3.5 w-3.5" aria-hidden />
            Daily goal
          </p>
          {!editing && status === "ready" && (
            <span className="flex items-center gap-2">
              <button
                type="button"
                onClick={startEditing}
                className="flex items-center gap-1 rounded border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-surface-600 transition-colors hover:border-gold-500/40 hover:text-gold-300"
              >
                <Pencil className="h-3 w-3" aria-hidden />
                {goal ? "Change" : "Set goal"}
              </button>
              {goal && (
                <button
                  type="button"
                  onClick={async () => {
                    const ok = await clearGoal();
                    if (!ok) setError("Could not remove the goal — try again.");
                  }}
                  className="flex items-center gap-1 rounded border border-white/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-surface-600 transition-colors hover:border-red-500/40 hover:text-red-300"
                  aria-label="Remove daily goal"
                >
                  <Trash2 className="h-3 w-3" aria-hidden />
                  Remove
                </button>
              )}
            </span>
          )}
        </div>

        {/* ---------------- Editor ---------------- */}
        {editing ? (
          <div className="mt-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex overflow-hidden rounded border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setMetric("questions");
                    setTarget(10);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                    metric === "questions"
                      ? "bg-gold-500/20 text-gold-300"
                      : "bg-white/[0.02] text-surface-600 hover:text-white"
                  }`}
                >
                  Questions
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMetric("minutes");
                    setTarget(15);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                    metric === "minutes"
                      ? "bg-gold-500/20 text-gold-300"
                      : "bg-white/[0.02] text-surface-600 hover:text-white"
                  }`}
                >
                  Minutes
                </button>
              </div>
              {editorPresetList.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setTarget(n)}
                  className={`rounded border px-2.5 py-1.5 text-xs font-bold transition-colors ${
                    target === n
                      ? "border-gold-500/60 bg-gold-500/15 text-gold-300"
                      : "border-white/10 text-surface-600 hover:text-white"
                  }`}
                >
                  {n}
                </button>
              ))}
              <label className="flex items-center gap-1.5 text-xs text-surface-600">
                Custom
                <input
                  type="number"
                  min={1}
                  max={metric === "questions" ? 200 : 480}
                  value={Number.isFinite(target) ? target : ""}
                  onChange={(e) => setTarget(parseInt(e.target.value, 10))}
                  className="w-16 rounded border border-white/10 bg-white/[0.03] px-2 py-1.5 text-white outline-none focus:border-gold-500/50"
                  aria-label="Custom daily target"
                />
              </label>
            </div>
            {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={save}
                disabled={saving}
                className="btn-primary px-4 py-2 text-xs font-bold disabled:opacity-50"
              >
                {saving ? "Saving…" : "Save goal"}
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded border border-white/10 px-4 py-2 text-xs font-bold text-surface-600 transition-colors hover:text-white"
              >
                Cancel
              </button>
            </div>
            <p className="mt-3 text-[11px] leading-snug text-surface-600">
              Progress counts today&apos;s recorded answers
              {metric === "minutes" ? " and time" : ""} — only work you actually complete moves the
              ring.
            </p>
          </div>
        ) : (
          /* ---------------- Display ---------------- */
          <div className="mt-4 flex flex-wrap items-center gap-5">
            {status === "loading" && (
              <div className="h-[92px] w-[92px] animate-pulse rounded-full bg-white/[0.06]" aria-hidden />
            )}
            {status === "error" && (
              <p className="text-sm text-surface-600">
                Goal tracking is offline right now — your work is still recorded.
              </p>
            )}
            {status === "unauthorized" && null}
            {status === "ready" && data && (
              <>
                {goal ? (
                  <>
                    {ring}
                    <div className="min-w-0">
                      {completed ? (
                        <p className="flex items-center gap-1.5 font-display text-lg font-bold text-mint-300">
                          <CheckCircle2 className="h-5 w-5" aria-hidden />
                          Goal done for today
                        </p>
                      ) : (
                        <p className="font-display text-lg font-bold leading-tight text-white">
                          {goal.target - done > 0 ? (
                            <>
                              {goal.target - done}{" "}
                              {goal.metric === "questions"
                                ? goal.target - done === 1
                                  ? "question"
                                  : "questions"
                                : "minutes"}{" "}
                              to go
                            </>
                          ) : (
                            "Goal reached"
                          )}
                        </p>
                      )}
                      <p className="mt-1 text-[11px] leading-snug text-surface-600">
                        {goal.metric === "questions"
                          ? `Today: ${today?.questions ?? 0} answered`
                          : `Today: ${today?.minutes ?? 0} min recorded`}
                        {` · target ${goal.target} ${goal.metric === "questions" ? "questions/day" : "min/day"}`}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="min-w-0">
                    <p className="font-display text-lg font-bold leading-tight text-white">
                      No goal set yet.
                    </p>
                    <p className="mt-1 max-w-md text-[11px] leading-snug text-surface-600">
                      A small daily target keeps the streak alive — 10 questions a day is a
                      standard start. Today so far: {today?.questions ?? 0} answered.
                    </p>
                    <button
                      type="button"
                      onClick={startEditing}
                      className="btn-primary mt-3 px-4 py-2 text-xs font-bold"
                    >
                      Set a daily goal
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}

/** Real progress toward the current goal (questions or whole minutes). */
export function progressValue(data: EngagementSummary | null): number {
  if (!data) return 0;
  if (data.goal?.metric === "minutes") return data.today.minutes;
  return data.today.questions;
}
