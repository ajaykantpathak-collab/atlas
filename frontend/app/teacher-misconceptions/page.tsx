"use client";

/**
 * Misconception Lab — /teacher-misconceptions (teacher-facing)
 *
 * The trap heatmap: which authored misconceptions burned the most students
 * this window, plus one-click remediation bundles for a cohort.
 * Reads GET /api/analytics/misconceptions/heatmap and the bundle endpoint.
 *
 * "Tomorrow" panel (top): the ONE misconception to address next lesson for a
 * chosen class — the last-7-days trap leader with its authored question
 * pattern, the 3 students who need it most, and the corpus's ready 5-minute
 * remediation opener. Reads GET /api/guidance/teacher/tomorrow?class_id=…
 * (server-scoped to classes the caller owns). No data → it says so.
 */

import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, Users, Sunrise, BookOpen, Ear } from "lucide-react";
import { api } from "@/lib/api";

interface Trap { misconception_id: string; hits: number; students_burned: number; wrong_share: number }
interface Bundle { misconception_id: string; students_affected: number; total_hits: number; suggested_action: string }

interface TeacherClass { id: string; name: string; subject: string; studentCount: number }
interface FocusStudent { student_id: string; name: string; wrong_count: number; last_seen_at: string }
interface TomorrowFocus {
  misconception_id: string;
  node_title: string | null;
  hits_7d: number;
  wrong_7d: number;
  students_burned: number;
  question_pattern: string | null;
  wrong_pattern: string | null;
  remediation_opener: string | null;
  top_students: FocusStudent[];
}
interface TomorrowDigest {
  class_id: string;
  class_name: string;
  window_days: number;
  roster_size: number;
  has_data: boolean;
  message?: string;
  focus: TomorrowFocus | null;
}

export default function TeacherMisconceptionsPage() {
  const [days, setDays] = useState(30);
  const [traps, setTraps] = useState<Trap[] | null>(null);
  const [idsText, setIdsText] = useState("");
  const [bundles, setBundles] = useState<Bundle[] | null>(null);
  const [busy, setBusy] = useState(false);

  // ── "Tomorrow" panel state ──
  const [classes, setClasses] = useState<TeacherClass[]>([]);
  const [classId, setClassId] = useState<string>("");
  const [tomorrow, setTomorrow] = useState<TomorrowDigest | null>(null);
  const [tomorrowLoading, setTomorrowLoading] = useState(false);

  useEffect(() => {
    api.get<{ traps: Trap[] }>(`/api/analytics/misconceptions/heatmap?days=${days}`)
      .then((r) => setTraps(r.traps || []))
      .catch(() => setTraps([]));
  }, [days]);

  useEffect(() => {
    api.get<{ data: TeacherClass[] }>("/api/teacher/classes?teacherId=me")
      .then((r) => {
        const list = r.data || [];
        setClasses(list);
        if (list.length) setClassId((prev) => prev || list[0].id);
      })
      .catch(() => setClasses([]));
  }, []);

  const loadTomorrow = useCallback((cid: string) => {
    if (!cid) return;
    setTomorrowLoading(true);
    api.get<TomorrowDigest>(`/api/guidance/teacher/tomorrow?class_id=${cid}`)
      .then(setTomorrow)
      .catch(() => setTomorrow(null))
      .finally(() => setTomorrowLoading(false));
  }, []);

  useEffect(() => {
    loadTomorrow(classId);
  }, [classId, loadTomorrow]);

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

        {/* ── Tomorrow panel — the one thing to address next lesson ── */}
        <TomorrowPanel
          classes={classes}
          classId={classId}
          onClassChange={setClassId}
          digest={tomorrow}
          loading={tomorrowLoading}
        />

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

/**
 * TomorrowPanel — golden-black action card above the analytics: which
 * misconception to address tomorrow, the question pattern that triggers it,
 * the 3 students who need it most, and a ready 5-minute remediation opener
 * lifted verbatim from the corpus's authored ON_FAILURE steps.
 */
function TomorrowPanel({
  classes, classId, onClassChange, digest, loading,
}: {
  classes: TeacherClass[];
  classId: string;
  onClassChange: (id: string) => void;
  digest: TomorrowDigest | null;
  loading: boolean;
}) {
  const focus = digest?.focus ?? null;
  return (
    <section className="rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-500/10 via-slate-900/60 to-slate-950 p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sunrise className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-amber-200">Tomorrow</h2>
          {digest?.has_data && digest.focus && (
            <span className="text-xs text-slate-400">
              {digest.focus.wrong_7d} wrong answer{digest.focus.wrong_7d === 1 ? "" : "s"} in {digest.window_days} days · {digest.focus.students_burned} student{digest.focus.students_burned === 1 ? "" : "s"} burned
            </span>
          )}
        </div>
        {classes.length > 0 && (
          <select
            value={classId}
            onChange={(e) => onClassChange(e.target.value)}
            className="rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-sm"
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}{c.subject ? ` — ${c.subject}` : ""}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading && <p className="text-slate-500 animate-pulse text-sm">Loading tomorrow&apos;s focus…</p>}

      {!loading && digest && !digest.has_data && (
        <p className="text-slate-500 text-sm">{digest.message || "No tagged attempts in this window yet."}</p>
      )}
      {!loading && !digest && (
        <p className="text-slate-500 text-sm">
          No class data available — pick a class you teach once your classes are set up.
        </p>
      )}

      {!loading && focus && (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30 p-2">
              <AlertTriangle className="w-4 h-4 text-amber-300" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-100">
                Address first: {focus.node_title || focus.misconception_id}
              </p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{focus.misconception_id} · {focus.students_burned} student(s) burned</p>
              {focus.question_pattern && (
                <p className="text-xs text-slate-400 mt-1.5">
                  <span className="text-amber-300 font-semibold">Trigger question pattern: </span>
                  {focus.question_pattern}
                </p>
              )}
              {focus.wrong_pattern && (
                <p className="text-xs text-slate-400 mt-1">
                  <span className="text-amber-300 font-semibold inline-flex items-center gap-1"><Ear className="w-3 h-3" /> Listen for: </span>
                  {focus.wrong_pattern}
                </p>
              )}
            </div>
          </div>

          {focus.top_students.length > 0 && (
            <div className="flex items-start gap-3">
              <span className="mt-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30 p-2">
                <Users className="w-4 h-4 text-amber-300" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-100">Needs it most</p>
                <ul className="text-xs text-slate-400 mt-1 space-y-0.5">
                  {focus.top_students.map((s) => (
                    <li key={s.student_id}>
                      {s.name} — {s.wrong_count} wrong answer{s.wrong_count === 1 ? "" : "s"} on this trap
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {focus.remediation_opener && (
            <div className="flex items-start gap-3">
              <span className="mt-0.5 rounded-lg bg-amber-500/15 border border-amber-500/30 p-2">
                <BookOpen className="w-4 h-4 text-amber-300" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-100">5-minute opener (ready to run)</p>
                <p className="text-xs text-slate-300 mt-1 whitespace-pre-line leading-relaxed">
                  {focus.remediation_opener}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
