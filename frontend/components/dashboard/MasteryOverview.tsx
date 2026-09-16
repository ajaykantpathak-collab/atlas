"use client";

/**
 * MasteryOverview — per-subject mastery bars.
 * Data: GET /api/progress/mastery (primary), GET /api/progress/overview (fallback
 * for the subjects array). Zero-percentage bars are rendered honestly — the
 * official node counts come straight from the backend.
 */

import { motion } from "framer-motion";
import { Map, RefreshCw } from "lucide-react";
import Link from "next/link";
import { subjectName } from "@/lib/nodeTitle";
import type { ProgressOverview, SubjectMastery } from "./types";
import { BarSkeleton, EmptyState, ErrorState, SectionHeading, riseItem, staggerContainer } from "./ui";

function MasteryBar({ subject, index }: { subject: SubjectMastery; index: number }) {
  const total = subject.totalNodes ?? 0;
  const mastered = subject.masteredNodes ?? 0;
  const learning = subject.learningNodes ?? 0;
  const pct = Math.max(0, Math.min(100, subject.masteryPercentage ?? 0));
  const label = subjectName(subject.subject);

  return (
    <motion.div variants={riseItem} custom={index} className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between gap-2 mb-1">
        <h3 className="text-sm font-semibold text-white truncate">{label}</h3>
        <span className="text-xs font-display font-bold text-gold-300 shrink-0">{pct}%</span>
      </div>
      <p className="text-[11px] text-surface-600 mb-3">
        {mastered} mastered · {learning} learning · {total} nodes tracked
      </p>
      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, delay: 0.2 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600"
        />
      </div>
      {total === 0 ? (
        <p className="text-[11px] text-surface-600 mt-3">No nodes tracked in this subject yet.</p>
      ) : (
        <p className="text-[11px] text-surface-600 mt-3">
          {mastered > 0
            ? `${total - mastered} nodes left to master in ${label}`
            : `Answer questions in ${label} to fill this bar`}
        </p>
      )}
    </motion.div>
  );
}

export default function MasteryOverview({
  mastery,
  overview,
}: {
  mastery: SubjectMastery[] | null;
  overview: ProgressOverview | null;
}) {
  const subjects: SubjectMastery[] =
    mastery && mastery.length > 0 ? mastery : overview?.subjects ?? [];

  const totalNodes = subjects.reduce((acc, s) => acc + (s.totalNodes ?? 0), 0);
  const masteredNodes = subjects.reduce((acc, s) => acc + (s.masteredNodes ?? 0), 0);

  return (
    <section>
      <SectionHeading
        icon={Map}
        title="Mastery Map"
        hint={
          totalNodes > 0
            ? `${masteredNodes} of ${totalNodes} tracked nodes mastered — straight from your answer history`
            : "Live from your answer history"
        }
      />
      {subjects.length > 0 ? (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {subjects.map((s, i) => (
            <MasteryBar key={s.subject} subject={s} index={i} />
          ))}
        </motion.div>
      ) : (
        <EmptyState
          icon={Map}
          title="No mastery recorded yet"
          body="Your mastery map fills in as you answer questions. Take your first diagnostic and we'll measure every subject against the official syllabus."
          ctaHref="/diagnostic"
          ctaLabel="Take your first diagnostic"
          secondaryHref="/explore"
          secondaryLabel="Explore subjects"
        />
      )}
    </section>
  );
}

export function MasteryLoading() {
  return (
    <section>
      <SectionHeading icon={Map} title="Mastery Map" hint="Loading your subjects…" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <BarSkeleton />
        <BarSkeleton />
        <BarSkeleton />
      </div>
    </section>
  );
}

export function MasteryError() {
  return (
    <section>
      <SectionHeading icon={RefreshCw} title="Mastery Map" hint="Couldn't reach the server." />
      <ErrorState title="Mastery data is offline right now" />
    </section>
  );
}

export function MasteryLocked() {
  return (
    <section>
      <SectionHeading icon={Map} title="Mastery Map" />
      <EmptyState
        icon={Map}
        title="Sign in to see your mastery"
        body="Your mastery map is built from your real practice history."
        ctaHref="/login"
        ctaLabel="Sign in"
      />
    </section>
  );
}

export function MasterySeeAll() {
  return (
    <Link href="/progress" className="text-xs text-gold-300 hover:text-gold-200 font-medium transition-colors">
      Full report →
    </Link>
  );
}
