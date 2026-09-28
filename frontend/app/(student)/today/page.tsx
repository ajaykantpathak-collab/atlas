'use client';

/**
 * Today — the pedagogy assembler (one composed daily unit, not a feed dump).
 *
 * BEATS (content-layer design, SOLVER_STEP_CONTRACT.md sibling doc):
 *   1 HOOK      the lesson opens with its doodle card when one exists
 *               (hand-drawn summary = anticipation anchor; the SAME card
 *               returns in review as the retrieval cue)
 *   2 MECHANISM sandbox strip on the lesson card — the "see it move" beat,
 *               placed BETWEEN walkthrough (in the lesson) and practice
 *   3 REPAIR    only when prerequisites are unmet — shown BEFORE the
 *               lesson, never as an option (mastery gate 0.85)
 *   4 RETRIEVE  the review dose: target 10, most-overdue first; each item
 *               is a retrieval attempt, not re-reading
 *   5 CHALLENGE exactly one sandbox card — variety without decision fatigue
 *
 * CAPS: 1 lesson · 10 reviews · 1 challenge.  Everything the server didn't
 * send renders as an honest empty state — no filler, no fake counts.
 * Node ids travel as fetch/URL params only, never as display text.
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/api';
import DoodleCardImage from '@/components/doodle/DoodleCardImage';

interface LessonItem {
  node_id: string;
  title?: string | null;
  mastery?: number;
  reason?: string;
}
interface RepairItem extends LessonItem { unmet_prereqs?: string[] }
interface ReviewItem {
  node_id: string;
  title?: string | null;
  concept_name?: string | null;
  overdue_days: number;
  due_date: string;
}
interface StreakInfo {
  state?: string;
  recorded_streak?: number;
  last_activity_date?: string | null;
}
interface FeedData {
  date?: string;
  lesson?: LessonItem | null;
  repair_first?: RepairItem[];
  review?: { due_count: number; items: ReviewItem[]; target: number };
  streak?: StreakInfo;
}

const LAB_BY_PREFIX: [RegExp, string][] = [
  [/^c\d+_(phy|sci)/, 'physics'],
  [/^c\d+_chem/, 'chem'],
  [/^c\d+_bio/, 'biology'],
  [/^c\d+_(math|mat)/, 'maths'],
  [/^c\d+_(acc|com)/, 'accountancy'],
  [/^c\d+_eco/, 'econ'],
  [/^c\d+_comp/, 'code'],
  [/^c\d+_geo/, 'geo'],
  [/^c\d+_(his|civ)/, 'histciv'],
  [/^c\d+_(eng|hin)/, 'langym'],
];

function sandboxLabFor(nodeId: string): string {
  for (const [re, lab] of LAB_BY_PREFIX) if (re.test(nodeId)) return lab;
  return 'orbit';
}

function StreakChip({ streak }: { streak?: StreakInfo }) {
  const state = streak?.state ?? 'none';
  const days = streak?.recorded_streak ?? 0;
  const map: Record<string, { icon: string; label: string; cls: string }> = {
    active_today: { icon: '🔥', label: `${days}-day streak`, cls: 'border-orange-500/40 text-orange-300' },
    at_risk: { icon: '⚠️', label: `${days}-day streak — do one thing today`, cls: 'border-amber-500/40 text-amber-300' },
    lapsed: { icon: '🌱', label: 'start a new streak today', cls: 'border-emerald-500/40 text-emerald-300' },
    none: { icon: '🌱', label: 'start your streak today', cls: 'border-emerald-500/40 text-emerald-300' },
  };
  const s = map[state] ?? map.none;
  return (
    <span className={`rounded-full border bg-slate-900/70 px-3 py-1 text-xs font-semibold ${s.cls}`}>
      {s.icon} {s.label}
    </span>
  );
}

export default function TodayPage() {
  const router = useRouter();
  const [feed, setFeed] = useState<FeedData | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'anon' | 'error'>('loading');

  useEffect(() => {
    const token = getAuthToken();
    if (!token) { setState('anon'); return; }
    fetch('/api/feed/today', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(d => { setFeed(d); setState('ready'); })
      .catch(() => setState('error'));
  }, []);

  const lesson = feed?.lesson ?? null;
  const repair = feed?.repair_first ?? [];
  const review = feed?.review;
  const done = 0; // review completions counted client-side per grade action (v1)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-black">Today</h1>
          <StreakChip streak={feed?.streak} />
        </div>

        {state === 'loading' && (
          <div className="space-y-4">
            {[0, 1, 2].map(i => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-900/60" />
            ))}
          </div>
        )}
        {state === 'anon' && (
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center">
            <p className="mb-3 text-slate-300">Your day is one tap away.</p>
            <a href="/login" className="rounded-xl bg-gold-500 px-5 py-2 font-bold text-slate-950">Sign in</a>
          </div>
        )}
        {state === 'error' && (
          <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-8 text-center text-slate-400">
            Couldn&apos;t load today&apos;s plan — refresh to retry.
          </div>
        )}

        {state === 'ready' && (
          <div className="space-y-5">
            {/* BEAT 3 — REPAIR: before the lesson, never optional */}
            {repair.length > 0 && (
              <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                  Repair first — these unlock your next step
                </p>
                <div className="flex flex-wrap gap-2">
                  {repair.map(r => (
                    <button key={r.node_id}
                      onClick={() => router.push(`/learn/${r.node_id}`)}
                      className="rounded-xl border border-amber-500/30 bg-slate-900/70 px-3 py-1.5 text-sm font-semibold text-amber-200 hover:bg-slate-800">
                      {r.title || 'Repair this topic'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* BEATS 1+2 — the lesson: doodle hook, sandbox mechanism strip */}
            <div className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/60">
              {lesson ? (
                <>
                  <DoodleCardImage nodeId={lesson.node_id} />
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-gold-400">
                      Your one lesson for today
                    </p>
                    <h2 className="mt-1 text-xl font-bold">
                      {lesson.title || 'Your next lesson'}
                    </h2>
                    {lesson.reason && (
                      <p className="mt-1 text-sm text-slate-400">{lesson.reason}</p>
                    )}
                    {typeof lesson.mastery === 'number' && (
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-gold-500"
                          style={{ width: `${Math.round(lesson.mastery * 100)}%` }} />
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button onClick={() => router.push(`/learn/${lesson.node_id}`)}
                        className="rounded-xl bg-gold-500 px-5 py-2 text-sm font-bold text-slate-950 hover:bg-gold-400">
                        Start lesson
                      </button>
                      {/* BEAT 2 — mechanism: see it move before you drill it */}
                      <button onClick={() => router.push(`/sandbox?lab=${sandboxLabFor(lesson.node_id)}`)}
                        className="rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-300 hover:border-slate-400">
                        ⚗ See it move
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-6 text-sm text-slate-400">
                  No lesson pinned yet — finish a practice session and your next
                  step appears here, prerequisite-checked.
                </div>
              )}
            </div>

            {/* BEAT 4 — RETRIEVE: the review dose, target 10 */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
              <div className="mb-3 flex items-baseline justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  Recall practice
                </p>
                {review && (
                  <p className="text-xs text-slate-500">
                    {Math.min(review.due_count, review.target)} / {review.target} today
                    {review.due_count > review.target ? ` · ${review.due_count} due` : ''}
                  </p>
                )}
              </div>
              {review && review.items.length > 0 ? (
                <ul className="space-y-2">
                  {review.items.slice(0, review.target).map(it => (
                    <li key={it.node_id}>
                      <button onClick={() => router.push(`/learn/${it.node_id}`)}
                        className="flex w-full items-center justify-between rounded-xl bg-slate-950/60 px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800">
                        <span className="truncate">{it.title || it.concept_name || 'Review item'}</span>
                        {it.overdue_days > 0 && (
                          <span className="ml-3 shrink-0 rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-bold text-red-300">
                            {it.overdue_days}d overdue
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400">
                  Nothing due — clear the lesson and tomorrow&apos;s review builds itself.
                </p>
              )}
              {review && review.due_count > 0 && (
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-sky-400"
                    style={{ width: `${Math.min(100, (done / review.target) * 100)}%` }} />
                </div>
              )}
            </div>

            {/* BEAT 5 — CHALLENGE: exactly one */}
            <button onClick={() => router.push('/sandbox')}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-700 bg-gradient-to-r from-slate-900 to-slate-800 p-5 text-left hover:border-slate-500">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-violet-300">
                  Today&apos;s challenge
                </p>
                <p className="mt-1 font-bold">One sandbox experiment</p>
                <p className="text-sm text-slate-400">Break it, tune it, watch the law hold.</p>
              </div>
              <span className="text-2xl">🧪</span>
            </button>

            <p className="pt-2 text-center text-xs text-slate-600">
              One lesson · ten recalls · one challenge — that&apos;s the whole day.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
