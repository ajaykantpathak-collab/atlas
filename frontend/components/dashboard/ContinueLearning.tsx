"use client";

/**
 * ContinueLearning — "pick up where you left off" row.
 * Nodes come from DashboardSchema.recommendedLessons (GET /api/progress/dashboard).
 * Each card links to /learn/{nodeId}; display titles prefer the backend's real
 * topic name and fall back to friendlyNodeTitle(nodeId). Raw ids never render.
 */

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import { friendlyNodeTitle, subjectName } from "@/lib/nodeTitle";
import type { RecommendedLesson } from "./types";
import { EmptyState, riseItem, safeLabel, SkeletonBlock, staggerContainer } from "./ui";

const DIFFICULTY_STYLES: Record<string, string> = {
  easy: "text-mint-300 bg-mint-500/10 border-mint-500/25",
  medium: "text-gold-300 bg-gold-500/10 border-gold-500/25",
  hard: "text-accent-300 bg-accent-500/10 border-accent-500/25",
};

function LessonCard({ lesson, index }: { lesson: RecommendedLesson; index: number }) {
  const href = `/learn/${encodeURIComponent(lesson.node_id)}`;
  // Backend provides real topic names (e.g. "Polynomials"). If absent (or
  // id-shaped), friendlyNodeTitle turns it human — the raw id never renders.
  const title = safeLabel(lesson.topic) || friendlyNodeTitle(lesson.node_id);
  const subject = lesson.subject ? subjectName(lesson.subject) : "";
  const pct = Math.max(0, Math.min(100, lesson.progress ?? 0));
  const difficulty = (lesson.difficulty ?? "").toLowerCase();

  return (
    <motion.div variants={riseItem} className="w-[270px] shrink-0">
      <Link
        href={href}
        className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col h-full group transition-transform will-change-transform hover:-translate-y-0.5"
        aria-label={`Continue learning ${title}`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="w-9 h-9 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-gold-300" />
          </div>
          {difficulty && DIFFICULTY_STYLES[difficulty] && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase ${DIFFICULTY_STYLES[difficulty]}`}>
              {difficulty}
            </span>
          )}
        </div>

        {subject && <p className="text-[11px] text-gold-300/90 font-medium mb-1">{subject}</p>}
        <h3 className="text-sm font-semibold text-white leading-snug mb-1 line-clamp-2">{title}</h3>
        {lesson.chapter && <p className="text-[11px] text-surface-600 mb-3">{lesson.chapter}</p>}

        <div className="mt-auto">
          {pct > 0 && (
            <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-3">
              <div className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600" style={{ width: `${pct}%` }} />
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-[11px] text-surface-600">
              <Clock className="w-3 h-3" />
              {lesson.estimated_time ? `~${lesson.estimated_time} min` : "Self-paced"}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-medium text-gold-300">
              <Play className="w-3 h-3" />
              {pct > 0 ? "Resume" : "Start"}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ContinueLearning({
  lessons,
  loading,
  failed,
}: {
  lessons: RecommendedLesson[] | null;
  loading: boolean;
  failed: boolean;
}) {
  return (
    <section>
      <div className="flex items-end justify-between gap-3 mb-4">
        <div>
          <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gold-400" />
            Continue Learning
          </h2>
          <p className="text-xs text-surface-600 mt-1">Recommended next nodes from your live progress</p>
        </div>
        <Link href="/explore" className="text-xs text-gold-300 hover:text-gold-200 font-medium transition-colors flex items-center gap-1">
          Browse all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {loading && (
        <div className="flex gap-4 overflow-hidden">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-[270px] shrink-0 glass-card rounded-2xl p-5">
              <SkeletonBlock className="h-9 w-9 rounded-xl mb-3" />
              <SkeletonBlock className="h-3.5 w-3/4 mb-2" />
              <SkeletonBlock className="h-2.5 w-1/2 mb-4" />
              <SkeletonBlock className="h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      )}

      {!loading && failed && (
        <EmptyState
          icon={BookOpen}
          title="Recommendations are offline right now"
          body="We couldn't reach the server for this section. Nothing here is estimated — refresh to try again."
        />
      )}

      {!loading && !failed && (lessons ?? []).length === 0 && (
        <EmptyState
          icon={BookOpen}
          title="Your learning path starts here"
          body="Once you take a diagnostic, we'll recommend the exact nodes to learn next. Take your first diagnostic to build your path."
          ctaHref="/diagnostic"
          ctaLabel="Take your first diagnostic"
          secondaryHref="/explore"
          secondaryLabel="Explore subjects"
        />
      )}

      {!loading && !failed && (lessons ?? []).length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory"
        >
          {(lessons ?? []).map((lesson) => (
            <div key={lesson.node_id} className="snap-start">
              <LessonCard lesson={lesson} index={0} />
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
