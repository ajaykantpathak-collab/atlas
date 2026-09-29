"use client";

/**
 * Paper Lab — /paper-lab
 *
 * Pick class / subject / chapters / difficulty / total marks → a board-
 * pattern practice paper assembled from the real board_questions corpus
 * (233k+ tagged questions), with a complete answer key. Serves student
 * mock exams and teacher class tests from the same engine.
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Key, Loader2, Printer } from "lucide-react";
import { api } from "@/lib/api";

interface Section {
  section_id: string;
  label: string;
  marks: number;
  questions: {
    qn: number; marks: number; chapter: string; question_type: string;
    question_text: string; options: string[] | null;
  }[];
}
interface Paper {
  paper_title: string;
  total_marks: number;
  duration_minutes: number;
  sections: Section[];
  answer_key: { qn: number; correct_answer: string; model_answer: string; marking_scheme: string }[];
  questions_used: number;
  shortfall: number;
  note?: string;
}
interface Coverage {
  total: number;
  chapters: { chapter: string; count: number }[];
  difficulties: Record<string, number>;
}

const SUBJECTS = [
  { id: "maths", label: "Mathematics" }, { id: "physics", label: "Physics" },
  { id: "chemistry", label: "Chemistry" }, { id: "biology", label: "Biology" },
  { id: "english", label: "English" }, { id: "hindi", label: "Hindi" },
  { id: "history", label: "History & Civics" }, { id: "geography", label: "Geography" },
  { id: "economics", label: "Economics" },
];

export default function PaperLabPage() {
  const [classLevel, setClassLevel] = useState(10);
  const [subject, setSubject] = useState("maths");
  const [coverage, setCoverage] = useState<Coverage | null>(null);
  const [chapters, setChapters] = useState<string[]>([]);
  const [showKey, setShowKey] = useState(false);
  const [paper, setPaper] = useState<Paper | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    setCoverage(null);
    api.get<Coverage>(`/api/paper-generator/coverage?class_level=${classLevel}&subject=${subject}`)
      .then(setCoverage)
      .catch(() => setCoverage(null));
  }, [classLevel, subject]);

  async function generate() {
    setBusy(true); setErr(null); setPaper(null); setShowKey(false);
    try {
      const p = await api.post<Paper>("/api/paper-generator/generate", {
        class_level: classLevel, subject,
        chapters: chapters.length ? chapters : undefined,
        total_marks: 80, duration_minutes: 180,
      });
      setPaper(p);
    } catch (e) {
      setErr(String((e as Error)?.message || e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold flex items-center gap-3">
              <FileText className="w-8 h-8 text-gold-400" /> Paper Lab
            </h1>
            <p className="text-slate-400 mt-1">
              Board-pattern practice papers assembled from the real question corpus — with the marking scheme.
            </p>
          </div>
          {paper && (
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-sm hover:border-gold-500"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
          )}
        </div>

        {/* builder */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-400">Class</label>
              <select
                value={classLevel} onChange={(e) => setClassLevel(Number(e.target.value))}
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
              >
                {[6, 7, 8, 9, 10, 11, 12].map((c) => <option key={c} value={c}>Class {c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-slate-400">Subject</label>
              <select
                value={subject} onChange={(e) => setSubject(e.target.value)}
                className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm"
              >
                {SUBJECTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>
          {coverage && (
            <p className="text-xs text-slate-500">
              {coverage.total} questions available in the corpus for this class + subject.
            </p>
          )}
          <button
            onClick={generate} disabled={busy}
            className="w-full rounded-lg bg-gold-500 text-slate-950 font-semibold py-2.5 disabled:opacity-40 hover:bg-gold-400 flex items-center justify-center gap-2"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
            {busy ? "Assembling from the corpus…" : "Generate paper"}
          </button>
          {err && <p className="text-red-300 text-sm">{err}</p>}
        </section>

        {/* paper */}
        {paper && (
          <motion.section
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">{paper.paper_title}</h2>
              <button
                onClick={() => setShowKey(!showKey)}
                className="flex items-center gap-2 rounded-lg bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs hover:border-gold-500"
              >
                <Key className="w-3.5 h-3.5" /> {showKey ? "Hide" : "Show"} answer key
              </button>
            </div>

            {paper.note && <p className="text-amber-300 text-sm">{paper.note}</p>}
            {paper.shortfall > 0 && (
              <p className="text-xs text-amber-400">
                Corpus could only fill {paper.total_marks} of the requested marks.
              </p>
            )}

            {paper.sections.map((sec) => (
              <div key={sec.section_id} className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                  <h3 className="font-semibold text-gold-300">Section {sec.section_id} — {sec.label}</h3>
                  <span className="text-xs text-slate-500">{sec.marks} marks</span>
                </div>
                {sec.questions.map((q) => (
                  <div key={q.qn} className="text-sm space-y-1">
                    <p>
                      <span className="font-semibold text-slate-300">Q{q.qn}.</span>{" "}
                      {q.question_text}{" "}
                      <span className="text-slate-500">[{q.marks}]{q.chapter ? ` (${q.chapter})` : ""}</span>
                    </p>
                    {q.options && (
                      <ul className="list-none text-slate-300 pl-4 grid grid-cols-2 gap-1">
                        {q.options.map((o, i) => <li key={i}>{"ABCD"[i] || i}. {o}</li>)}
                      </ul>
                    )}
                    {showKey && (
                      <div className="pl-4 border-l-2 border-emerald-700/50 text-emerald-200/90">
                        {(() => {
                          const k = paper.answer_key.find((a) => a.qn === q.qn);
                          if (!k) return null;
                          return (
                            <div className="space-y-0.5">
                              <p className="font-medium">{k.correct_answer}</p>
                              {k.marking_scheme && <p className="text-xs text-slate-400">Scheme: {k.marking_scheme}</p>}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {showKey && paper.answer_key.length > 0 && (
              <p className="text-xs text-slate-500">Full answer key shown inline above (per-question).</p>
            )}
          </motion.section>
        )}
      </div>
    </main>
  );
}
