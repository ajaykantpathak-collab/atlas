"use client";

/**
 * Achievements — the premium badge wall.
 *
 * Fully wired to the live backend:
 *   GET /api/achievements/?filter=all → AchievementListResponse (achievements[], unlockedCount, totalXp)
 *
 * The per-id detail endpoint (/api/achievements/{id}) returns the exact same
 * fields as the list (verified via curl), so the wall renders everything from
 * the list and opens an in-page detail modal — no duplicate fetch needed.
 *
 * Earned badges get the gold treatment; locked badges show real progress
 * toward unlock. If the backend has nothing yet, the page says so honestly.
 */

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, CheckCircle2, Flame, Lock, RefreshCw, Sparkles, Target, Trophy, X, Zap,
} from "lucide-react";
import Link from "next/link";
import { PrismLogo } from "@/components/prism/PrismLogo";
import { api, getAuthToken } from "@/lib/api";
import type { Achievement, AchievementListResponse } from "@/components/dashboard/types";
import {
  EmptyState, ErrorState, GoldNumber, achievementIcon, riseItem, staggerContainer,
} from "@/components/dashboard/ui";

/* ---------------- tier styling ---------------- */

const TIERS: Record<string, { label: string; chip: string; ring: string; glow: string; icon: string }> = {
  bronze: { label: "Bronze", chip: "bg-orange-500/15 text-orange-300 border-orange-500/30", ring: "border-orange-500/40", glow: "", icon: "text-orange-300" },
  silver: { label: "Silver", chip: "bg-slate-400/15 text-slate-200 border-slate-400/30", ring: "border-slate-300/40", glow: "", icon: "text-slate-200" },
  gold: { label: "Gold", chip: "bg-gold-500/15 text-gold-300 border-gold-500/35", ring: "border-gold-400/50", glow: "shadow-glow-warm", icon: "text-gold-300" },
  platinum: { label: "Platinum", chip: "bg-brand-500/15 text-brand-300 border-brand-500/30", ring: "border-brand-400/50", glow: "shadow-glow", icon: "text-brand-300" },
};

function tierStyle(tier?: string) {
  return TIERS[(tier ?? "bronze").toLowerCase()] ?? TIERS.bronze;
}

type Status = "loading" | "ready" | "error" | "unauthorized";

type FilterKey = "all" | "earned" | "locked";

const FILTERS: { id: FilterKey; label: string }[] = [
  { id: "all", label: "All" },
  { id: "earned", label: "Earned" },
  { id: "locked", label: "Locked" },
];

/* ---------------- badge card ---------------- */

function BadgeCard({ a, index, onOpen }: { a: Achievement; index: number; onOpen: (a: Achievement) => void }) {
  const Icon = achievementIcon(a.iconName ?? a.icon ?? undefined);
  const unlocked = Boolean(a.unlocked);
  const tier = tierStyle(a.tier);
  const pct =
    a.progress != null && a.maxProgress ? Math.min(100, Math.round((a.progress / a.maxProgress) * 100)) : null;

  return (
    <motion.button
      variants={riseItem}
      onClick={() => onOpen(a)}
      className={`glass-card rounded-2xl p-5 text-left transition-transform will-change-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold-400/40 ${
        unlocked ? `${tier.ring} ${tier.glow}` : "opacity-75 hover:opacity-100"
      }`}
      aria-label={`${a.title} — ${unlocked ? "earned" : "locked"}. View details`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
            unlocked
              ? "bg-gradient-to-br from-gold-400/30 via-gold-500/20 to-gold-600/30 border-gold-400/50"
              : "bg-white/[0.03] border-white/[0.06]"
          }`}
        >
          <Icon className={`w-6 h-6 ${unlocked ? "text-gold-300" : "text-surface-600"}`} />
        </div>
        {unlocked ? (
          <span className="flex items-center gap-1 text-[10px] font-medium text-mint-300">
            <CheckCircle2 className="w-3.5 h-3.5" /> Earned
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[10px] font-medium text-surface-600">
            <Lock className="w-3.5 h-3.5" /> Locked
          </span>
        )}
      </div>

      <h3 className={`text-sm font-semibold mb-1 ${unlocked ? "text-white" : "text-surface-700"}`}>{a.title}</h3>
      <p className="text-xs text-surface-600 leading-relaxed mb-4 line-clamp-2">{a.description}</p>

      {pct !== null && !unlocked && (
        <div className="mb-3">
          <div className="flex justify-between text-[10px] text-surface-600 mb-1">
            <span>
              {a.progress ?? 0} / {a.maxProgress}
            </span>
            <span>{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium uppercase ${tier.chip}`}>
          {tier.label}
        </span>
        <span className="text-[10px] font-medium text-gold-300">+{a.xpReward ?? 0} XP</span>
      </div>
    </motion.button>
  );
}

/* ---------------- detail modal ---------------- */

function DetailModal({ a, onClose }: { a: Achievement | null; onClose: () => void }) {
  const Icon = achievementIcon(a?.iconName ?? a?.icon ?? undefined);
  const unlocked = Boolean(a?.unlocked);
  const tier = tierStyle(a?.tier);
  const pct =
    a?.progress != null && a?.maxProgress ? Math.min(100, Math.round((a.progress / a.maxProgress) * 100)) : null;

  return (
    <AnimatePresence>
      {a && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={a.title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong rounded-3xl p-6 sm:p-8 max-w-md w-full relative border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 btn-ghost p-2" aria-label="Close">
              <X className="w-4 h-4" />
            </button>

            <div
              className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5 border ${
                unlocked
                  ? "bg-gradient-to-br from-gold-400/30 via-gold-500/20 to-gold-600/30 border-gold-400/50 shadow-glow-warm"
                  : "bg-white/[0.03] border-white/[0.08]"
              }`}
            >
              <Icon className={`w-10 h-10 ${unlocked ? "text-gold-300" : "text-surface-600"}`} />
            </div>

            <h3 className="font-display text-xl font-bold text-white text-center">{a.title}</h3>
            <p className="text-sm text-surface-600 text-center mt-2 leading-relaxed">{a.description}</p>

            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="text-center rounded-xl bg-white/[0.04] border border-white/5 p-3">
                <p className={`text-[10px] uppercase tracking-wide mb-1 ${unlocked ? "text-gold-300" : "text-surface-600"}`}>
                  Tier
                </p>
                <p className="text-xs font-semibold text-white">{tier.label}</p>
              </div>
              <div className="text-center rounded-xl bg-white/[0.04] border border-white/5 p-3">
                <p className="text-[10px] uppercase tracking-wide text-surface-600 mb-1">Reward</p>
                <p className="text-xs font-semibold text-gold-300">+{a.xpReward ?? 0} XP</p>
              </div>
              <div className="text-center rounded-xl bg-white/[0.04] border border-white/5 p-3">
                <p className="text-[10px] uppercase tracking-wide text-surface-600 mb-1">Status</p>
                <p className={`text-xs font-semibold ${unlocked ? "text-mint-300" : "text-surface-500"}`}>
                  {unlocked ? "Earned" : "Locked"}
                </p>
              </div>
            </div>

            {pct !== null && !unlocked && (
              <div className="mt-5">
                <div className="flex justify-between text-[11px] text-surface-600 mb-1.5">
                  <span>
                    Progress: {a.progress ?? 0} / {a.maxProgress}
                  </span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600" style={{ width: `${pct}%` }} />
                </div>
              </div>
            )}

            {unlocked && a.unlockedAt && (
              <p className="text-[11px] text-surface-600 text-center mt-5">
                Unlocked {new Date(a.unlockedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </p>
            )}

            {!unlocked && (
              <Link href="/diagnostic" className="btn-primary w-full mt-6">
                <Target className="w-4 h-4" />
                Take your first diagnostic
              </Link>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- page ---------------- */

export default function AchievementsPage() {
  const [status, setStatus] = useState<Status>("loading");
  const [list, setList] = useState<Achievement[]>([]);
  const [signedOut, setSignedOut] = useState(false);
  const [filter, setFilter] = useState<FilterKey>("all");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Achievement | null>(null);

  useEffect(() => {
    if (!getAuthToken()) {
      setSignedOut(true);
      setStatus("unauthorized");
      return;
    }
    let alive = true;
    api
      .get<AchievementListResponse>("/api/achievements/?filter=all")
      .then((res) => {
        if (!alive) return;
        setList(res.achievements ?? res.items ?? []);
        setStatus("ready");
      })
      .catch((err) => {
        if (!alive) return;
        const msg = err instanceof Error ? err.message : String(err);
        if (/\b401\b|Not authenticated/i.test(msg)) {
          setSignedOut(true);
          setStatus("unauthorized");
        } else {
          setStatus("error");
        }
      });
    return () => {
      alive = false;
    };
  }, []);

  const earned = useMemo(() => list.filter((a) => a.unlocked), [list]);
  const locked = useMemo(() => list.filter((a) => !a.unlocked), [list]);
  const xpEarned = useMemo(() => earned.reduce((acc, a) => acc + (a.xpReward ?? 0), 0), [earned]);
  const completion = list.length > 0 ? Math.round((earned.length / list.length) * 100) : 0;

  const tiers = useMemo(() => {
    const present = new Set(list.map((a) => (a.tier ?? "bronze").toLowerCase()));
    return ["all", ...Array.from(present)];
  }, [list]);

  const filtered = useMemo(() => {
    let out = list;
    if (filter === "earned") out = out.filter((a) => a.unlocked);
    if (filter === "locked") out = out.filter((a) => !a.unlocked);
    if (tierFilter !== "all") out = out.filter((a) => (a.tier ?? "bronze").toLowerCase() === tierFilter);
    return out;
  }, [list, filter, tierFilter]);

  const loading = status === "loading";

  return (
    <div className="min-h-screen mesh-bg-animated">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2" aria-label="Back to dashboard">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Achievements</h1>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-surface-600">
            <Flame className="w-3.5 h-3.5 text-gold-400" />
            Badge wall
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats strip — all computed from the live list */}
        {!loading && status === "ready" && list.length > 0 && (
          <motion.div
            variants={riseItem}
            initial="hidden"
            animate="show"
            className="glass-card rounded-3xl p-6 md:p-8"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400/30 via-gold-500/20 to-gold-600/30 border border-gold-400/50 flex items-center justify-center mx-auto mb-3 shadow-glow-warm">
                  <Trophy className="w-7 h-7 text-gold-300" />
                </div>
                <p className="font-display text-2xl font-bold">
                  <GoldNumber>{earned.length}</GoldNumber>
                </p>
                <p className="text-xs text-surface-600">Earned</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-7 h-7 text-surface-500" />
                </div>
                <p className="font-display text-2xl font-bold text-white">{locked.length}</p>
                <p className="text-xs text-surface-600">Locked</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-7 h-7 text-gold-300" />
                </div>
                <p className="font-display text-2xl font-bold">
                  <GoldNumber>{xpEarned.toLocaleString("en-IN")}</GoldNumber>
                </p>
                <p className="text-xs text-surface-600">Badge XP earned</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-7 h-7 text-gold-300" />
                </div>
                <p className="font-display text-2xl font-bold text-white">{completion}%</p>
                <p className="text-xs text-surface-600">Wall complete</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading skeletons */}
        {loading && (
          <>
            <div className="glass-card rounded-3xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.05] mx-auto mb-3 animate-pulse" />
                  <div className="h-6 w-12 bg-white/[0.05] rounded mx-auto mb-2 animate-pulse" />
                  <div className="h-2.5 w-16 bg-white/[0.05] rounded mx-auto animate-pulse" />
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="glass-card rounded-2xl p-5">
                  <div className="h-12 w-12 rounded-2xl bg-white/[0.05] mb-4 animate-pulse" />
                  <div className="h-3.5 w-3/4 bg-white/[0.05] rounded mb-2 animate-pulse" />
                  <div className="h-2.5 w-full bg-white/[0.05] rounded mb-4 animate-pulse" />
                  <div className="h-2 w-full bg-white/[0.05] rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Signed out */}
        {signedOut && (
          <EmptyState
            icon={Trophy}
            title="Sign in to open your badge wall"
            body="Every badge you can earn — and every step of progress toward it — lives on your account."
            ctaHref="/login"
            ctaLabel="Sign in"
          />
        )}

        {/* Offline */}
        {status === "error" && <ErrorState title="The badge wall is offline right now" />}

        {/* Empty wall */}
        {status === "ready" && list.length === 0 && (
          <EmptyState
            icon={Trophy}
            title="No achievements defined yet"
            body="The badge wall is connected and live — there simply aren't any badges to display right now. Take your first diagnostic to start your streak and check back."
            ctaHref="/diagnostic"
            ctaLabel="Take your first diagnostic"
          />
        )}

        {/* The wall */}
        {status === "ready" && list.length > 0 && (
          <>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    filter === f.id
                      ? "glass-strong border-gold-500/40 text-white"
                      : "glass-card border-transparent text-surface-600 hover:text-white"
                  }`}
                >
                  {f.label}
                  {f.id === "earned" && earned.length > 0 && ` (${earned.length})`}
                </button>
              ))}
              <span className="w-px h-4 bg-white/10 mx-1" aria-hidden />
              {tiers.map((t) => (
                <button
                  key={t}
                  onClick={() => setTierFilter(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all border ${
                    tierFilter === t
                      ? "glass-strong border-gold-500/40 text-white"
                      : "glass-card border-transparent text-surface-600 hover:text-white"
                  }`}
                >
                  {t === "all" ? "Any tier" : tierStyle(t).label}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <EmptyState
                icon={Trophy}
                title="Nothing matches this filter"
                body="Try a different tier or switch back to All — your badges are waiting."
              />
            ) : (
              <motion.div
                key={`${filter}-${tierFilter}`}
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {filtered.map((a, i) => (
                  <BadgeCard key={a.id} a={a} index={i} onOpen={setSelected} />
                ))}
              </motion.div>
            )}

            {/* CTA */}
            <div className="glass-card rounded-2xl p-6 text-center">
              <Flame className="w-8 h-8 text-gold-400 mx-auto mb-3" />
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                {earned.length > 0 ? "Keep the streak alive" : "Every badge starts at zero"}
              </h3>
              <p className="text-sm text-surface-600 mb-4 max-w-md mx-auto">
                Badges unlock from real practice — streaks, accuracy and milestones. Nothing here is
                given away.
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/practice" className="btn-primary">
                  <Target className="w-4 h-4" />
                  Practice now
                </Link>
                <Link href="/diagnostic" className="btn-secondary">
                  <RefreshCw className="w-4 h-4" />
                  Take a diagnostic
                </Link>
              </div>
            </div>
          </>
        )}

        <p className="text-center text-[11px] text-surface-600 pt-2">
          Live from your Atlas account — badges reflect real practice only.
        </p>
      </div>

      <DetailModal a={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
