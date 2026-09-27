"use client";

/**
 * Shared presentation primitives for the student dashboards.
 * Design language: near-black + gold, glass cards, Syne display headings,
 * framer-motion entrances. Honest data only — empty states never fake numbers.
 */

import type { Variants } from "framer-motion";
import {
  Award, BookOpen, Brain, Crown, FileText, Flame, Footprints, Gamepad2,
  GraduationCap, HelpCircle, Medal, MessageCircle, RefreshCw, Sparkles,
  Star, Target, Trophy, Zap, type LucideIcon,
} from "lucide-react";
import { friendlyNodeTitle } from "@/lib/nodeTitle";

/* ------------------------------------------------------------------ */
/* Raw-id guard — raw node ids must never reach the screen.            */
/* ------------------------------------------------------------------ */

const NODE_ID_SHAPE = /^c\d{1,2}_[a-z]/i;

/** Display helper: route node-id-shaped strings through friendlyNodeTitle. */
export function safeLabel(text?: string | null): string {
  if (!text) return "";
  const trimmed = text.trim();
  if (NODE_ID_SHAPE.test(trimmed)) return friendlyNodeTitle(trimmed);
  return trimmed;
}

/* ------------------------------------------------------------------ */
/* Motion presets — staggered entrances.                               */
/* ------------------------------------------------------------------ */

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const riseItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

/* ------------------------------------------------------------------ */
/* Skeletons — one per widget shape.                                   */
/* ------------------------------------------------------------------ */

export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-white/[0.05] border border-white/[0.04] overflow-hidden relative ${className}`}
      aria-hidden
    >
      <div
        className="absolute inset-0 animate-shimmer"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    // min-w-0 + max-w-full: in a 3-col grid on a 390px phone each card is
    // ~108px wide — fixed-width skeleton bars (w-24/w-32) would force the
    // grid wider and cause device horizontal scroll.
    <div className="glass-card rounded-2xl p-6 min-w-0">
      <SkeletonBlock className="h-3 w-24 max-w-full mb-4" />
      <SkeletonBlock className="h-9 w-20 max-w-full mb-3" />
      <SkeletonBlock className="h-2.5 w-32 max-w-full" />
    </div>
  );
}

export function BarSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <SkeletonBlock className="h-3.5 w-28" />
        <SkeletonBlock className="h-3 w-10" />
      </div>
      <SkeletonBlock className="h-2 w-full rounded-full" />
    </div>
  );
}

export function CardRowSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card rounded-2xl p-5">
          <SkeletonBlock className="h-11 w-11 rounded-xl mb-4" />
          <SkeletonBlock className="h-3.5 w-3/4 mb-2" />
          <SkeletonBlock className="h-2.5 w-1/2 mb-4" />
          <SkeletonBlock className="h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="glass-card rounded-2xl p-6">
      <SkeletonBlock className="h-3.5 w-32 mb-6" />
      <div className="flex items-end gap-2 h-28">
        {Array.from({ length: 7 }).map((_, i) => (
          <SkeletonBlock key={i} className="flex-1 rounded-t-lg" />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Empty / error / signed-out states — honest, always with a CTA.      */
/* ------------------------------------------------------------------ */

export function EmptyState({
  icon: Icon = Sparkles,
  title,
  body,
  ctaHref,
  ctaLabel,
  secondaryHref,
  secondaryLabel,
}: {
  icon?: LucideIcon;
  title: string;
  body: string;
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-8 text-center">
      <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-gold-300" />
      </div>
      <h3 className="font-display text-base font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-surface-600 max-w-sm mx-auto mb-5">{body}</p>
      {(ctaHref || secondaryHref) && (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {ctaHref && ctaLabel && (
            <a href={ctaHref} className="btn-primary text-sm">
              {ctaLabel}
            </a>
          )}
          {secondaryHref && secondaryLabel && (
            <a href={secondaryHref} className="btn-secondary text-sm">
              {secondaryLabel}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export function ErrorState({ title = "This widget is offline right now" }: { title?: string }) {
  return (
    <div className="glass-card rounded-2xl p-6 text-center">
      <RefreshCw className="w-6 h-6 text-surface-500 mx-auto mb-3" />
      <h3 className="font-display text-sm font-semibold text-white mb-1.5">{title}</h3>
      <p className="text-xs text-surface-600 max-w-xs mx-auto">
        We couldn&apos;t reach the server for this section. Nothing here is estimated —
        refresh to try again.
      </p>
    </div>
  );
}

export function SignedOutState() {
  return (
    <EmptyState
      icon={GraduationCap}
      title="Sign in to open your command center"
      body="Your mastery, streak and achievements are tracked live against your account. Sign in and every number on this page becomes yours."
      ctaHref="/login"
      ctaLabel="Sign in"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Gold gradient stat number.                                          */
/* ------------------------------------------------------------------ */

export function GoldNumber({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`font-display font-bold bg-gradient-to-r from-gold-200 via-gold-400 to-gold-600 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Section heading.                                                    */
/* ------------------------------------------------------------------ */

export function SectionHeading({
  icon: Icon,
  title,
  hint,
  action,
}: {
  icon: LucideIcon;
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-3 mb-4">
      <div>
        <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
          <Icon className="w-5 h-5 text-gold-400" />
          {title}
        </h2>
        {hint && <p className="text-xs text-surface-600 mt-1">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Icon mappers (backend sends icon *names* as strings).               */
/* ------------------------------------------------------------------ */

const ACHIEVEMENT_ICONS: Record<string, LucideIcon> = {
  bookopen: BookOpen,
  flame: Flame,
  zap: Zap,
  target: Target,
  trophy: Trophy,
  brain: Brain,
  crown: Crown,
  sparkles: Sparkles,
  award: Award,
  medal: Medal,
  star: Star,
  "file-text": FileText,
  footprints: Footprints,
  "help-circle": HelpCircle,
  "message-circle": MessageCircle,
  "refresh-cw": RefreshCw,
};

export function achievementIcon(name?: string | null): LucideIcon {
  return ACHIEVEMENT_ICONS[(name ?? "").toLowerCase()] ?? Medal;
}

const ACTIVITY_ICONS: Record<string, LucideIcon> = {
  lesson: BookOpen,
  practice: Target,
  quiz: Brain,
  exam: FileText,
  test: FileText,
  diagnostic: Brain,
  sim: Gamepad2,
  simulation: Gamepad2,
  game: Gamepad2,
  review: RefreshCw,
  achievement: Trophy,
  milestone: Award,
  streak: Flame,
};

export function activityIcon(activityType?: string): LucideIcon {
  return ACTIVITY_ICONS[(activityType ?? "").toLowerCase()] ?? Sparkles;
}
