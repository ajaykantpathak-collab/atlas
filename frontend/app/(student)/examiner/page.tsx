"use client";

/**
 * Examiner Mode — /examiner
 *
 * Photograph (or type) your answer → graded against the node's authored
 * MARKING_POINTS: per-point breakdown, total, grade, and the CopyWorthy
 * diff (what a board examiner wanted that the answer missed).
 * Server chain: photo → /api/vision/extract (nemotron-parse OCR) →
 * /api/examiner/grade-image → authored marking scheme.
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, FileText, Upload, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { api } from "@/lib/api";

interface Breakdown {
  criterion: string;
  max_marks: number;
  awarded: number;
  source: string;
}
interface GradeResult {
  graded: boolean;
  error?: string;
  node_id?: string;
  total?: number;
  max_total?: number;
  percentage?: number;
  grade?: string;
  breakdown?: Breakdown[];
  copyworthy_diff?: { what_was_missing: string[]; verdict: string };
  extracted_text?: string;
  extraction_source?: string;
}

export default function ExaminerPage() {
  const [nodeId, setNodeId] = useState("");
  const [typed, setTyped] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function grade() {
    setError(null);
    setResult(null);
    if (!nodeId.trim()) { setError("Enter the node ID for the answer you're submitting."); return; }
    setBusy(true);
    try {
      if (file) {
        const b64 = await new Promise<string>((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(String(r.result));
          r.onerror = () => reject(new Error("could not read the file"));
          r.readAsDataURL(file);
        });
        const res = await api.post<{ extracted_text?: string; extraction_source?: string } & GradeResult>(
          "/api/examiner/grade-image", { node_id: nodeId.trim(), image: b64 });
        setResult(res);
        if (res.extracted_text) setTyped(res.extracted_text);
      } else {
        const res = await api.post<GradeResult>("/api/examiner/grade", {
          node_id: nodeId.trim(), student_text: typed,
        });
        setResult(res);
      }
    } catch (e) {
      setError(String((e as Error)?.message || e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold flex items-center gap-3">
            <FileText className="w-8 h-8 text-gold-400" /> Examiner Mode
          </h1>
          <p className="text-slate-400 mt-1">
            Get your answer graded against the real marking scheme — point by point, like the board.
          </p>
        </div>

        {/* input */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400">Node ID (from your lesson)</label>
            <input
              value={nodeId} onChange={(e) => setNodeId(e.target.value)}
              placeholder="e.g. c10_math_cbse_04_007"
              className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-gold-500"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400">Type your answer</label>
            <textarea
              value={typed} onChange={(e) => setTyped(e.target.value)} rows={5}
              placeholder="Write or paste your answer here…"
              className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-gold-500"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400">…or upload a photo of your handwritten answer</label>
            <div className="mt-1 flex items-center gap-3">
              <button
                onClick={() => inputRef.current?.click()}
                className="flex items-center gap-2 rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm hover:border-gold-500"
              >
                <Upload className="w-4 h-4" /> {file ? file.name : "Choose photo"}
              </button>
              {file && <span className="text-xs text-slate-500">photo will be OCR-extracted server-side</span>}
            </div>
            <input
              ref={inputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
          <button
            onClick={grade} disabled={busy || (!typed && !file)}
            className="w-full rounded-lg bg-gold-500 text-slate-950 font-semibold py-2.5 disabled:opacity-40 hover:bg-gold-400"
          >
            {busy ? "Grading like an examiner…" : "Grade my answer"}
          </button>
          {error && <p className="text-red-300 text-sm">{error}</p>}
        </section>

        {/* result */}
        {result && (
          <motion.section
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4"
          >
            {result.graded ? (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    {result.grade === "A" || (result.percentage ?? 0) >= 75
                      ? <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      : <AlertTriangle className="w-6 h-6 text-amber-400" />}
                    Examiner verdict
                  </h2>
                  <span className="text-2xl font-display font-bold">
                    {result.total}/{result.max_total}
                    <span className="text-sm text-slate-400 ml-1">({result.percentage}%)</span>
                  </span>
                </div>
                <div className="space-y-2">
                  {(result.breakdown || []).map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm rounded-lg bg-slate-800/60 px-3 py-2">
                      {b.awarded === b.max_marks
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        : <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />}
                      <span>
                        {b.criterion}
                        <span className="ml-2 text-slate-400">[{b.awarded}/{b.max_marks}]</span>
                      </span>
                    </div>
                  ))}
                </div>
                {result.copyworthy_diff && (
                  <div className="rounded-xl border border-gold-500/30 bg-gold-500/5 p-4">
                    <p className="text-xs uppercase tracking-wide text-gold-300 font-semibold mb-1">
                      What the examiner wanted that you missed
                    </p>
                    <ul className="list-disc list-inside text-sm text-slate-200 space-y-1">
                      {result.copyworthy_diff.what_was_missing.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                    <p className="text-xs text-slate-400 mt-2">{result.copyworthy_diff.verdict}</p>
                  </div>
                )}
              </>
            ) : (
              <p className="text-red-300 text-sm">{result.error}</p>
            )}
          </motion.section>
        )}
      </div>
    </main>
  );
}
