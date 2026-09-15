"use client";

import { BookOpenCheck, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { subjectLabel, type Progress } from "./tutorShared";

/**
 * ProgressPanel — REAL mastery from GET /progress.  Honest by design:
 * with no attempts yet it shows a truthful empty state and renders no
 * invented percentages anywhere.
 */

export default function ProgressPanel({
  progress,
  loading = false,
}: {
  progress: Progress | null;
  loading?: boolean;
}) {
  const subjects = progress ? Object.entries(progress.per_subject) : [];
  const hasData = subjects.length > 0;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
      <h2 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-white/50">
        <BookOpenCheck className="h-4 w-4 text-gold-400" /> Real mastery
      </h2>

      {loading && !progress && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 animate-pulse rounded-xl bg-white/[0.05]" />
          ))}
        </div>
      )}

      {!loading && !progress && (
        <p className="text-sm leading-relaxed text-white/45">
          Progress couldn&apos;t be loaded just now. Your work still counts —
          it will show up here as soon as the tutor backend answers.
        </p>
      )}

      {progress && !hasData && (
        <p className="text-sm leading-relaxed text-white/45">
          Nothing here yet — and we won&apos;t fake it. Answer your first
          question and your real mastery starts filling in, subject by subject.
        </p>
      )}

      {hasData && (
        <>
          <div className="mb-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
              <div className="font-display text-lg font-semibold text-white">
                {progress!.total_attempts}
              </div>
              <div className="text-[11px] uppercase tracking-wide text-white/40">
                attempts
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] px-3.5 py-2.5">
              <div className="flex items-center gap-1.5 font-display text-lg font-semibold text-white">
                {progress!.open_mistakes}
                {progress!.open_mistakes > 0 && (
                  <RotateCcw className="h-3.5 w-3.5 text-gold-400" />
                )}
              </div>
              <div className="text-[11px] uppercase tracking-wide text-white/40">
                to revisit
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            {subjects.map(([s, d]) => (
              <div key={s}>
                <div className="mb-1 flex items-baseline justify-between text-xs">
                  <span className="font-medium text-white/75">
                    {subjectLabel(s)}
                  </span>
                  <span className="text-white/40">
                    {Math.round(d.avg_mastery * 100)}%
                    <span className="ml-1.5 text-white/25">
                      ({d.mastered}/{d.concepts} solid)
                    </span>
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(2, d.avg_mastery * 100)}%` }}
                    transition={{ type: "spring", stiffness: 60, damping: 18 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
