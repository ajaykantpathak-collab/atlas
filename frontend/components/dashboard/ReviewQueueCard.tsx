"use client";

/**
 * ReviewQueueCard — spaced-repetition (SM-2) items due right now.
 * Data: GET /api/progress/review/queue → {items, total} and
 * GET /api/progress/review/stats → retention/streak figures. Both can be
 * slow on a cold DB, so the hook times them out into honest offline states.
 */

import { motion } from "framer-motion";
import { AlarmClock, Brain, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { subjectName } from "@/lib/nodeTitle";
import type { ReviewQueueResponse, ReviewStats } from "./useDashboardData";
import { EmptyState, GoldNumber, riseItem, safeLabel, staggerContainer } from "./ui";

export default function ReviewQueueCard({
  queue,
  stats,
  loading,
}: {
  queue: ReviewQueueResponse | null;
  stats: ReviewStats | null;
  loading: boolean;
}) {
  const items = queue?.items ?? [];
  const retention = stats?.retentionRate;

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-end justify-between gap-3 mb-1">
        <h2 className="font-display text-base font-bold text-white flex items-center gap-2">
          <AlarmClock className="w-5 h-5 text-gold-400" />
          Review Queue
        </h2>
        {retention != null && retention > 0 && (
          <span className="text-[11px] text-surface-600">
            Retention <GoldNumber className="text-[11px]">{Math.round(retention)}%</GoldNumber>
          </span>
        )}
      </div>
      <p className="text-xs text-surface-600 mb-4">
        {items.length > 0
          ? `${items.length} ${items.length === 1 ? "topic" : "topics"} due — spaced repetition picks up where memory fades`
          : "Topics you have studied return here when it is time to review them"}
      </p>

      {loading && (
        <div className="space-y-2.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-11 rounded-xl bg-white/[0.05] animate-pulse" />
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <EmptyState
          icon={Brain}
          title="Nothing due for review"
          body="Learn a topic and smart scheduling will bring it back right before you would forget it."
          ctaHref="/explore"
          ctaLabel="Explore topics"
        />
      )}

      {!loading && items.length > 0 && (
        <motion.ul variants={staggerContainer} initial="hidden" animate="show" className="space-y-2.5">
          {items.slice(0, 6).map((item) => {
            const concept = safeLabel(item.conceptName) || "Review item";
            const subject = item.subject ? subjectName(item.subject) : null;
            const query = [
              item.subject ? `subject=${encodeURIComponent(item.subject)}` : null,
              `topic=${encodeURIComponent(concept)}`,
            ]
              .filter(Boolean)
              .join("&");
            return (
              <motion.li key={item.id} variants={riseItem}>
                <Link
                  href={`/practice?${query}`}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/5 hover:border-gold-500/30 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-gold-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">{concept}</p>
                    <p className="text-[11px] text-surface-600">
                      {[subject, item.repetitions ? `reviewed ${item.repetitions}×` : "first review"].join(" · ")}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-gold-300 flex items-center gap-1 shrink-0">
                    Review
                    <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
}
