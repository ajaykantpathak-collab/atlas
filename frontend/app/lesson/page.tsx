"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, Search, Target } from "lucide-react";
import { AtlasMark } from "@/components/atlas/AtlasMark";

const SUBJECTS = [
  { key: "phy", name: "Physics" },
  { key: "chem", name: "Chemistry" },
  { key: "bio", name: "Biology" },
  { key: "math", name: "Maths" },
  { key: "eng", name: "English" },
];

interface NodeSummary { node_id: string; title: string; chapter: number | string }
interface NodeDetail {
  node_id: string; title?: string; definition: string; walkthrough: string;
  mastery_criteria?: string; common_misconception?: string;
  diagnostics?: { q: string; a: string }[];
}

export default function LessonPage() {
  const [subject, setSubject] = useState("phy");
  const [cls, setCls] = useState(10);
  const [nodes, setNodes] = useState<NodeSummary[]>([]);
  const [search, setSearch] = useState("");
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [content, setContent] = useState<NodeDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [openDiag, setOpenDiag] = useState<Set<number>>(new Set());

  useEffect(() => {
    setLoading(true);
    fetch(`/api/nodes/by-class-subject?class=${cls}&subject=${subject}&limit=500`)
      .then((r) => (r.ok ? r.json() : { nodes: [] }))
      .then((d) => setNodes(d.nodes ?? []))
      .catch(() => setNodes([]))
      .finally(() => setLoading(false));
  }, [subject, cls]);

  useEffect(() => {
    if (!selectedNode) return;
    setContent(null);
    setOpenDiag(new Set());
    fetch(`/api/nodes/node?node_id=${encodeURIComponent(selectedNode)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(setContent)
      .catch(() => setContent(null));
  }, [selectedNode]);

  const filtered = nodes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.node_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen mesh-bg-animated">
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">
          <AtlasMark size={28} />
          <Link href="/dashboard" className="btn-ghost px-2" aria-label="Back">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-sm font-semibold text-white">Lesson Reader</h1>
          <div className="ml-auto flex items-center gap-2">
            {SUBJECTS.map((s) => (
              <button
                key={s.key}
                onClick={() => setSubject(s.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  subject === s.key
                    ? "bg-brand-500/20 text-brand-200 border border-brand-400/40"
                    : "text-surface-500 hover:text-surface-300"
                }`}
              >
                {s.name}
              </button>
            ))}
            <select
              value={cls}
              onChange={(e) => setCls(Number(e.target.value))}
              className="input-field text-xs h-8 w-24"
            >
              {Array.from({ length: 7 }, (_, i) => i + 6).map((c) => (
                <option key={c} value={c}>Class {c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Node picker */}
        <div className="space-y-2">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-600" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics…"
              className="input-field pl-9 text-xs h-9 w-full"
            />
          </div>
          {loading && <p className="text-xs text-surface-500 animate-pulse px-1">Loading topics…</p>}
          {!loading && filtered.length === 0 && (
            <p className="text-xs text-surface-500 px-1">No topics for this filter.</p>
          )}
          <div className="max-h-[70vh] overflow-y-auto space-y-1.5 pr-1">
            {filtered.map((n) => (
              <button
                key={n.node_id}
                onClick={() => setSelectedNode(n.node_id)}
                className={`block w-full text-left p-3 rounded-xl border transition text-sm ${
                  selectedNode === n.node_id
                    ? "border-brand-400/50 bg-brand-500/10 text-white"
                    : "border-surface-300/30 text-surface-300 hover:border-surface-400/50 hover:bg-surface-800/40"
                }`}
              >
                {n.title}
              </button>
            ))}
          </div>
        </div>

        {/* Lesson content */}
        <div className="md:col-span-2">
          {selectedNode && content ? (
            <article className="glass-strong rounded-2xl border border-surface-300/30 p-6 sm:p-8 space-y-6">
              <header>
                <p className="text-[10px] uppercase tracking-widest text-brand-300 mb-1">
                  {content.node_id}
                </p>
                <h2 className="font-display text-2xl font-bold text-white">
                  {content.title || selectedNode}
                </h2>
              </header>

              <section>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-gold-300 mb-2">
                  <BookOpen className="w-4 h-4" /> Definition
                </h3>
                <p className="text-sm leading-relaxed text-surface-200 whitespace-pre-line">
                  {content.definition}
                </p>
              </section>

              {content.walkthrough && (
                <section>
                  <h3 className="text-sm font-semibold text-brand-300 mb-2">Walkthrough</h3>
                  <p className="text-sm leading-relaxed text-surface-300 whitespace-pre-line">
                    {content.walkthrough}
                  </p>
                </section>
              )}

              {content.mastery_criteria && (
                <section className="rounded-xl border border-mint-400/20 bg-mint-500/5 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-mint-300 mb-1">
                    <Target className="w-4 h-4" /> You'll know you've mastered this when…
                  </h3>
                  <p className="text-sm text-surface-300">{content.mastery_criteria}</p>
                </section>
              )}

              {content.common_misconception && (
                <section className="rounded-xl border border-amber-400/20 bg-amber-500/5 p-4">
                  <h3 className="text-sm font-semibold text-amber-300 mb-1">Watch out</h3>
                  <p className="text-sm text-surface-300">{content.common_misconception}</p>
                </section>
              )}

              {(content.diagnostics?.length ?? 0) > 0 && (
                <section>
                  <h3 className="text-sm font-semibold text-accent-300 mb-2">Check yourself</h3>
                  <div className="space-y-2">
                    {content.diagnostics!.map((d, i) => {
                      const open = openDiag.has(i);
                      return (
                        <div key={i} className="rounded-xl border border-surface-300/30 overflow-hidden">
                          <button
                            onClick={() => {
                              const s = new Set(openDiag);
                              open ? s.delete(i) : s.add(i);
                              setOpenDiag(s);
                            }}
                            className="w-full flex items-start justify-between gap-3 p-4 text-left"
                          >
                            <span className="text-sm text-white">{d.q}</span>
                            {open ? <ChevronUp className="w-4 h-4 shrink-0 text-surface-500" />
                                  : <ChevronDown className="w-4 h-4 shrink-0 text-surface-500" />}
                          </button>
                          {open && (
                            <p className="px-4 pb-4 text-sm leading-relaxed text-surface-300 whitespace-pre-line">
                              {d.a}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}
            </article>
          ) : (
            <div className="glass-strong rounded-2xl border border-surface-300/30 p-10 text-center">
              <AtlasMark size={56} className="mx-auto mb-4" />
              <p className="text-sm text-surface-400">
                {selectedNode ? "Loading lesson…" : "Pick a topic on the left to read the full lesson."}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
