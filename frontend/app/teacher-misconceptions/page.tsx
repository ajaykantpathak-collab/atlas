"use client";

/**
 * Misconception Lab — /teacher-misconceptions (teacher-facing)
 *
 * The trap heatmap: which authored misconceptions burned the most students
 * this window, plus one-click remediation bundles for a cohort.
 * Reads GET /api/analytics/misconceptions/heatmap and the bundle endpoint.
 */

import { useEffect, useState } from "react";
import { AlertTriangle, Users } from "lucide-react";
import { api } from "@/lib/api";

interface Trap { misconception_id: string; hits: number; students_burned: number; wrong_share: number }
interface Bundle { misconception_id: string; students_affected: number; total_hits: number; suggested_action: string }

export default function TeacherMisconceptionsPage() {
  const [days, setDays] = useState(30);
  const [traps, setTraps] = useState<Trap[] | null>(null);
  const [idsText, setIdsText] = useState("");
  const [bundles, setBundles] = useState<Bundle[] | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.get<{ traps: Trap[] }>(`/api/analytics/misconceptions/heatmap?days=${days}`)
      .then((r) => setTraps(r.traps || []))
      .catch(() => setTraps([]));
  }, [days]);

  async function loadBundles() {
    const ids = idsText.split(/[\s,]+/).filter(Boolean);
    if (!ids.length) return;
    setBusy(true);
    try {
      const r = await api.post<{ bundles: Bundle[] }>(
        "/api/analytics/misconceptions/remediation-bundle", { student_ids: ids, min_students: 2 });
      setBundles(r.bundles || []);
    } finally { setBusy(false); }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-amber-400" /> Misconception Lab
            </h1>
            <p className="text-slate-400 mt-1">
              Which authored traps are burning students right now — aggregated from every graded attempt.
            </p>
          </div>
          <select
            value={days} onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
          >
            {[7, 30, 90].map((d) => <option key={d} value={d}>Last {d} days</option>)}
          </select>
        </div>

        {/* heatmap */}
        <section className="space-y-2">
          {traps === null && <p className="text-slate-500 animate-pulse">Loading traps…</p>}
          {traps && traps.length === 0 && (
            <p className="text-slate-500">No misconception-tagged attempts in this window — either no wrong answers, or students haven&rsquo;t used the tagged diagnostics yet.</p>
          )}
          {traps?.map((t, i) => (
            <div key={i} className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 flex items-center justify-between">
              <div className="min-w-0">
                <p className="font-mono text-sm text-slate-200 truncate">{t.misconception_id}</p>
                <p className="text-xs text-slate-500">{t.students_burned} student(s) affected</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-amber-300">{t.hits}</p>
                <p className="text-[11px] text-slate-500 uppercase">hits</p>
              </div>
            </div>
          ))}
        </section>

        {/* remediation bundles */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Remediation bundles for a cohort</h2>
          <p className="text-xs text-slate-500">Paste student IDs (comma/space separated) — traps hit by 2+ of them become a one-click assignment.</p>
          <textarea
            value={idsText} onChange={(e) => setIdsText(e.target.value)} rows={3}
            placeholder="student-id-1, student-id-2, …"
            className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm font-mono"
          />
          <button
            onClick={loadBundles} disabled={busy || !idsText.trim()}
            className="rounded-lg bg-gold-500 text-slate-950 font-semibold px-4 py-2 disabled:opacity-40"
          >
            {busy ? "Building…" : "Build bundles"}
          </button>
          {bundles?.map((b, i) => (
            <div key={i} className="rounded-xl border border-amber-900/50 bg-amber-950/20 px-4 py-3">
              <p className="font-mono text-sm text-amber-200">{b.misconception_id}</p>
              <p className="text-xs text-slate-400">{b.students_affected} students · {b.total_hits} hits</p>
              <p className="text-xs text-slate-500">{b.suggested_action}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
