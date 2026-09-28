"use client";

/**
 * Next Best Lesson — /next-best
 *
 * The adaptive recommendation engine: prereq graph + BKT mastery →
 * "ready to learn" vs "repair first" lists. Reads GET /api/path/next-best/me.
 */

import { useEffect, useState } from "react";
import { Wrench, ArrowRight, BookOpen } from "lucide-react";
import { api } from "@/lib/api";

interface Rec { node_id: string; mastery: number; attempts?: number; reason?: string; unmet_prereqs?: string[] }
interface Data { ready_to_learn: Rec[]; repair_first: Rec[]; graph_size: number }

export default function NextBestPage() {
  const [data, setData] = useState<Data | null>(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    api.get<Data>("/api/path/next-best/me?limit=8").then(setData).catch(() => setErr(true));
  }, []);

  if (err) return <main className="min-h-screen bg-slate-950 p-8 text-slate-400">Recommendation engine unavailable.</main>;
  if (!data) return <main className="min-h-screen bg-slate-950 p-8 text-slate-500 animate-pulse">Finding your next lesson…</main>;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <h1 className="text-3xl font-display font-bold flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-cyan-300" /> Your next best lessons
        </h1>

        {data.repair_first.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-amber-300 mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5" /> Repair first — prerequisites need work
            </h2>
            <div className="space-y-2">
              {data.repair_first.map((r) => (
                <a key={r.node_id} href={`/learn/${r.node_id}`}
                  className="block rounded-xl border border-amber-900/50 bg-amber-950/20 px-4 py-3 hover:border-amber-700">
                  <p className="font-medium">{r.node_id}</p>
                  <p className="text-xs text-amber-300/70">{r.reason} — missing: {r.unmet_prereqs?.join(", ")}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-lg font-semibold text-emerald-300 mb-3 flex items-center gap-2">
            <ArrowRight className="w-5 h-5" /> Ready to learn
          </h2>
          <div className="space-y-2">
            {data.ready_to_learn.map((r) => (
              <a key={r.node_id} href={`/learn/${r.node_id}`}
                className="block rounded-xl border border-emerald-900/50 bg-emerald-950/20 px-4 py-3 hover:border-emerald-700">
                <p className="font-medium">{r.node_id}</p>
                <p className="text-xs text-emerald-300/70">{r.reason} · mastery {Math.round((r.mastery || 0) * 100)}%</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
