"use client";

/**
 * Mastery Passport — /passport
 *
 * The student-facing transcript: per-subject mastery bars, review streak,
 * traps conquered, exam readiness, recent activity. Reads the closed-world
 * aggregation at GET /api/passport/me — presentation only, nothing invented.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen, Flame, Target, TrendingUp, Trophy, ShieldCheck,
} from "lucide-react";
import { api, getAuthToken } from "@/lib/api";

interface PassportSubject {
  subject: string;
  nodes_tracked: number;
  mastered: number;
  learning: number;
  avg_mastery: number;
  mastery_pct: number;
}

interface PassportData {
  overall: {
    nodes_tracked: number;
    mastered: number;
    mastery_pct: number;
    review_streak_days: number;
    traps_conquered: number;
    traps_total: number;
  };
  subjects: PassportSubject[];
  exam_readiness: Record<string, number>;
  recent_activity: { type: string; title: string; subject: string | null; score: string | null; when: string }[];
}

function bar(pct: number, tone: string) {
  return (
    <div className="h-2.5 w-full rounded-full bg-surface-700 overflow-hidden">
      <div className={`h-full rounded-full ${tone}`} style={{ width: `${Math.min(100, pct)}%` }} />
    </div>
  );
}

export default function PassportPage() {
  const [data, setData] = useState<PassportData | null>(null);
  /** 'anon' = not signed in (friendly CTA); 'error' = signed in but the
   *  aggregation genuinely failed (honest retry message). */
  const [state, setState] = useState<'loading' | 'ready' | 'anon' | 'error'>('loading');

  useEffect(() => {
    if (!getAuthToken()) { setState('anon'); return; }
    api.get<PassportData>("/api/passport/me")
      .then((d) => { setData(d); setState('ready'); })
      .catch((e) => {
        const msg = String(e?.message || e);
        // Unauthenticated / expired sessions get the sign-in card, not a
        // stack-trace-flavoured error (the backend can also answer 500/403
        // for a missing or stale credential).
        setState(/401|403|Unauthenticated|Not authenticated/i.test(msg) ? 'anon' : 'error');
      });
  }, []);

  if (state === 'anon') {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 p-8 flex items-center justify-center">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center max-w-sm">
          <Trophy className="w-10 h-10 text-gold-400 mx-auto mb-3" />
          <p className="text-slate-300 mb-4">Sign in to see your Mastery Passport —
            every stamp comes from your own attempts.</p>
          <Link href="/login" className="rounded-xl bg-gold-500 px-5 py-2 font-bold text-slate-950 inline-block">
            Sign in
          </Link>
        </div>
      </main>
    );
  }
  if (state === 'error') {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 p-8 flex items-center justify-center">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center max-w-sm">
          <p className="text-red-300 mb-4">Could not load your passport — refresh the page to retry.</p>
        </div>
      </main>
    );
  }
  if (!data) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 p-8 flex items-center justify-center">
        <p className="text-slate-400 animate-pulse">Stamping your passport…</p>
      </main>
    );
  }

  const o = data.overall;
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* header */}
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <Trophy className="w-8 h-8 text-gold-400" /> Mastery Passport
          </h1>
          <p className="text-slate-400 mt-1">
            {o.nodes_tracked} topics tracked · {o.mastered} mastered ·{" "}
            {o.review_streak_days}-day review streak
          </p>
        </div>

        {/* overall readiness */}
        <motion.section
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" /> Exam readiness
            </h2>
            <span className="text-3xl font-display font-bold text-emerald-300">
              {o.mastery_pct}%
            </span>
          </div>
          {bar(o.mastery_pct, "bg-emerald-500")}
          <div className="grid grid-cols-3 gap-3 mt-5 text-center">
            <div className="rounded-xl bg-slate-800 p-3">
              <p className="text-2xl font-bold text-emerald-300">{o.mastered}</p>
              <p className="text-[11px] text-slate-400 uppercase tracking-wide">Mastered</p>
            </div>
            <div className="rounded-xl bg-slate-800 p-3">
              <p className="text-2xl font-bold text-amber-300 flex items-center justify-center gap-1">
                <Flame className="w-5 h-5" />{o.review_streak_days}
              </p>
              <p className="text-[11px] text-slate-400 uppercase tracking-wide">Day streak</p>
            </div>
            <div className="rounded-xl bg-slate-800 p-3">
              <p className="text-2xl font-bold text-gold-300">
                {o.traps_conquered}/{o.traps_total}
              </p>
              <p className="text-[11px] text-slate-400 uppercase tracking-wide">Traps beaten</p>
            </div>
          </div>
        </motion.section>

        {/* per-subject bars */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gold-300" /> Subjects
          </h2>
          {data.subjects.length > 0 ? (
            data.subjects.map((s) => (
              <motion.div
                key={s.subject}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                className="rounded-xl border border-slate-800 bg-slate-900 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium capitalize">{s.subject}</span>
                  <span className="text-sm text-slate-400">
                    {s.mastered}/{s.nodes_tracked} mastered · avg {s.mastery_pct}%
                  </span>
                </div>
                {bar(s.mastery_pct, s.mastery_pct >= 85 ? "bg-emerald-500" : s.mastery_pct >= 50 ? "bg-gold-500" : "bg-amber-500")}
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-slate-400">
              No subjects tracked yet — finish a practice session and your mastery
              map starts filling in.
            </p>
          )}
        </section>

        {/* recent activity */}
        {data.recent_activity.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-gold-300" /> Recent activity
            </h2>
            <div className="space-y-2">
              {data.recent_activity.map((a, i) => (
                <div key={i} className="rounded-lg bg-slate-900 border border-slate-800 px-4 py-2.5 flex items-center justify-between text-sm">
                  <span className="capitalize">{a.title || a.type}</span>
                  <span className="text-slate-400 text-xs">{a.score || ""} {a.when.slice(0, 10)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <p className="text-xs text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          Every number here comes from your real attempts — nothing generated.
        </p>
      </div>
    </main>
  );
}
