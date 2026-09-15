'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { allSimsMeta } from '@/components/sims_v2/lite'
import { getNodesMastery, type NodeMastery } from '@/lib/masteryStore'

/**
 * /sims-v2 — catalog. Browse every adaptive simulation by class + subject,
 * with per-sim progress (mean node mastery) and resume links.
 */
const CLASSES = [6, 7, 8, 9, 10, 11, 12]

export default function SimsCatalog() {
    const [cls, setCls] = useState(10)
    const [subject, setSubject] = useState<string | null>(null)
    const [q, setQ] = useState('')
    const [mastery, setMastery] = useState<Record<string, NodeMastery>>({})
    const [resumable, setResumable] = useState<Set<string>>(new Set())

    const all = useMemo(() => allSimsMeta(), [])
    const classSims = useMemo(() => all.filter(s => s.c === cls), [all, cls])
    const subjects = useMemo(() => Array.from(new Set(classSims.map(s => s.s))).sort(), [classSims])
    const visible = useMemo(() => classSims
        .filter(s => !subject || s.s === subject)
        .filter(s => !q || s.t.toLowerCase().includes(q.toLowerCase()) || s.id.includes(q)),
        [classSims, subject, q])

    // per-sim progress = mean of its nodeIds' bestScore
    useEffect(() => {
        const ids = visible.flatMap(s => s.n ?? []);
        setMastery(getNodesMastery(ids));
        const r = new Set<string>();
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k?.startsWith('simchk_')) r.add(k.slice(7));
            }
        } catch { }
        setResumable(r);
    }, [visible]);

    const progress = (id: string, nodeIds: string[]) => {
        const vals = nodeIds.map(n => mastery[n]?.bestScore ?? 0);
        return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex items-start justify-between mb-1">
                    <h1 className="text-3xl font-black">Simulations</h1>
                    <Link href="/galaxy" className="px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-400/40 text-xs font-black text-indigo-200 hover:bg-indigo-500/30 transition">
                        🌌 Your universe
                    </Link>
                </div>
                <p className="text-sm text-slate-400 mb-6">Adaptive teaching-through-simulations — pick a class, pick a chapter, learn by doing.</p>

                {/* class tabs */}
                <div className="flex gap-2 mb-4 flex-wrap">
                    {CLASSES.map(c => (
                        <button key={c} onClick={() => { setCls(c); setSubject(null); }}
                            className={`px-4 py-2 rounded-xl font-black text-sm transition ${cls === c ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                            Class {c}
                        </button>
                    ))}
                </div>

                {/* subject chips */}
                <div className="flex gap-2 mb-4 flex-wrap">
                    <button onClick={() => setSubject(null)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold ${!subject ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                        all ({classSims.length})
                    </button>
                    {subjects.map(s => (
                        <button key={s} onClick={() => setSubject(s === subject ? null : s)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize ${subject === s ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                            {s.replace(/_/g, ' ')}
                        </button>
                    ))}
                </div>

                <input value={q} onChange={e => setQ(e.target.value)} placeholder="search simulations…"
                    className="w-full mb-6 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm font-bold placeholder:text-slate-500 focus:outline-none focus:border-indigo-500" />

                {/* sim grid */}
                <div className="grid gap-3 sm:grid-cols-2">
                    {visible.slice(0, 80).map(s => {
                        const p = progress(s.id, s.n ?? []);
                        const resume = resumable.has(s.id);
                        const wrapped = s.id.startsWith('v3w_');
                        return (
                            <Link key={s.id} href={`/sims-v2/${s.id}`}
                                className="group rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-indigo-500/60 p-4 transition hover:shadow-lg hover:shadow-indigo-500/10">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-black text-sm text-white group-hover:text-indigo-300 leading-snug">{s.t}</h3>
                                    {resume && <span className="text-[10px] font-black text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full px-2 py-0.5 shrink-0">▶ resume</span>}
                                </div>
                                <p className="text-xs text-slate-400 line-clamp-2 mb-3">{s.d}</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                                        <div className={`h-full rounded-full ${p >= 70 ? 'bg-emerald-400' : p >= 30 ? 'bg-amber-400' : 'bg-indigo-400'}`}
                                            style={{ width: `${p}%` }} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 w-8 text-right">{p}%</span>
                                    {wrapped && <span className="text-[9px] font-black text-violet-300 bg-violet-400/10 rounded-full px-1.5 py-0.5">rich</span>}
                                </div>
                            </Link>
                        );
                    })}
                </div>
                {visible.length > 80 && (
                    <p className="text-center text-xs text-slate-500 mt-6">showing 80 of {visible.length} — refine by subject or search</p>
                )}
                {visible.length === 0 && (
                    <p className="text-center text-slate-500 py-12">No simulations match. Try another class or subject.</p>
                )}
            </div>
        </div>
    );
}
