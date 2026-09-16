'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GraduationCap, Layers, Search, Sparkles, X } from 'lucide-react'
import { allSimsMeta, type SimMeta } from '@/components/sims_v2/lite'
import { getNodesMastery, type NodeMastery } from '@/lib/masteryStore'
import SimCard from '@/components/sims_browser/SimCard'
import { groupColor, subjectIdentity } from '@/components/sims_browser/subjectTheme'

/**
 * /sims-v2 — the Simulation Gallery.
 *
 * 3,018 adaptive simulations across Classes VI–XII covering 9,010 official
 * topic nodes (both counts computed live from the catalog — never faked).
 * Metadata-only rendering via SIM_INDEX (lite) keeps this page light; full
 * SimDefs load lazily, one sim at a time, at play time.
 *
 * Perf: filtering is O(n) memoized; the grid renders in chunks of 48 with a
 * "show more" pager, so no filter change ever mounts 3,018 cards at once.
 */

const CLASSES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const CHUNK = 48

const nfmt = (n: number) => n.toLocaleString('en-IN')

export default function SimsGallery() {
    const all = useMemo(() => allSimsMeta(), [])
    const totalTopics = useMemo(() => {
        const seen = new Set<string>()
        for (const m of all) for (const n of m.n ?? []) seen.add(n)
        return seen.size
    }, [all])

    const [cls, setCls] = useState<number | null>(null)
    const [subject, setSubject] = useState<string | null>(null)   // canonical group
    const [q, setQ] = useState('')                                // raw input
    const [dq, setDq] = useState('')                              // debounced query
    const [visible, setVisible] = useState(CHUNK)
    const [mastery, setMastery] = useState<Record<string, NodeMastery>>({})
    const [resumable, setResumable] = useState<Set<string>>(new Set())

    // debounce search — 250ms after the last keystroke
    useEffect(() => {
        const t = setTimeout(() => setDq(q.trim().toLowerCase()), 250)
        return () => clearTimeout(t)
    }, [q])

    // any filter change resets paging back to the first chunk
    useEffect(() => { setVisible(CHUNK) }, [cls, subject, dq])

    // class chips 1–12 with honest counts (Classes 1–5 fill in as the catalog grows)
    const classCounts = useMemo(() => {
        const m: Record<number, number> = {}
        for (const s of all) m[s.c] = (m[s.c] ?? 0) + 1
        return m
    }, [all])

    const inClass = useMemo(
        () => (cls == null ? all : all.filter(s => s.c === cls)),
        [all, cls],
    )

    // subject chips derive from what's actually in scope — aliases merge
    // (phy + physics → Physics), sorted by coverage
    const subjectChips = useMemo(() => {
        const counts = new Map<string, number>()
        for (const s of inClass) {
            const g = subjectIdentity(s.s).group
            counts.set(g, (counts.get(g) ?? 0) + 1)
        }
        return Array.from(counts.entries())
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    }, [inClass])

    const filtered = useMemo(() => {
        return inClass.filter((s): s is SimMeta => {
            if (subject && subjectIdentity(s.s).group !== subject) return false
            if (!dq) return true
            return s.t.toLowerCase().includes(dq)
                || (s.d ?? '').toLowerCase().includes(dq)
                || subjectIdentity(s.s).label.toLowerCase().includes(dq)
        })
    }, [inClass, subject, dq])

    // only the rendered chunk is mounted — and only its nodes are measured
    const chunk = useMemo(() => filtered.slice(0, visible), [filtered, visible])

    useEffect(() => {
        setMastery(getNodesMastery(chunk.flatMap(s => s.n ?? [])))
        try {
            const r = new Set<string>()
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i)
                if (k?.startsWith('simchk_')) r.add(k.slice(7))
            }
            setResumable(r)
        } catch { /* private mode — progress is optional */ }
    }, [chunk])

    const progressOf = (s: SimMeta) => {
        const ids = s.n ?? []
        if (!ids.length) return 0
        let sum = 0
        for (const n of ids) sum += mastery[n]?.bestScore ?? 0
        return Math.round(sum / ids.length)
    }

    const clearFilters = () => { setCls(null); setSubject(null); setQ('') }
    const filtersActive = cls != null || subject != null || dq !== ''

    return (
        <div className="mesh-bg-animated min-h-screen text-white">
            <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">

                {/* ── header ─────────────────────────────────────────── */}
                <motion.header
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mb-8 flex flex-wrap items-end justify-between gap-4"
                >
                    <div>
                        <p className="mb-1 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-amber-400/80">
                            <Sparkles size={13} /> Adaptive · Learn by doing
                        </p>
                        <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                            <span className="spectrum-text">Simulation Gallery</span>
                        </h1>
                        <p className="mt-2 text-sm text-white/50">
                            {nfmt(all.length)} simulations · {nfmt(totalTopics)} official topic nodes · Classes VI–XII
                        </p>
                    </div>
                    <Link
                        href="/galaxy"
                        className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-black text-amber-300 transition hover:border-amber-400/60 hover:bg-amber-400/20"
                    >
                        Your universe
                    </Link>
                </motion.header>

                {/* ── stat strip ─────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mb-6 grid grid-cols-3 gap-3"
                >
                    {[
                        { icon: Layers, big: nfmt(all.length), small: 'simulations' },
                        { icon: Sparkles, big: nfmt(totalTopics), small: 'topic nodes taught' },
                        { icon: GraduationCap, big: 'VI–XII', small: 'classes covered' },
                    ].map(({ icon: Icon, big, small }) => (
                        <div key={small} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-xl">
                            <Icon size={14} className="mb-1 text-amber-400/80" />
                            <p className="font-display text-lg font-extrabold leading-none text-white sm:text-xl">{big}</p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/40">{small}</p>
                        </div>
                    ))}
                </motion.div>

                {/* 3D Lab — the Class 11 concept sims (heart, neuron, VSEPR, …) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="mb-6"
                >
                    <Link
                        href="/3d-lab"
                        className="group flex items-center gap-3 rounded-2xl border border-amber-400/25 bg-amber-400/[0.05] px-5 py-3.5 transition-all hover:border-amber-400/50 hover:bg-amber-400/[0.09]"
                    >
                        <Sparkles size={16} className="text-amber-300" />
                        <span className="text-sm font-bold text-white">
                            3D Lab
                            <span className="ml-2 font-normal text-white/50">
                                46 interactive concept sims — heart, neuron, VSEPR shapes, orbits
                            </span>
                        </span>
                        <span className="ml-auto text-xs font-bold text-amber-300/80 group-hover:text-amber-300">Open →</span>
                    </Link>
                </motion.div>

                {/* ── search ─────────────────────────────────────────── */}
                <div className="relative mb-4">
                    <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35" />
                    <input
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        placeholder="Search simulations — try “life processes” or “quadratic”…"
                        aria-label="Search simulations"
                        className="w-full rounded-2xl border border-white/10 bg-white/[0.05] py-3 pl-11 pr-11 text-sm font-semibold text-white placeholder:text-white/30 backdrop-blur-xl transition focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
                    />
                    {q && (
                        <button
                            onClick={() => setQ('')}
                            aria-label="Clear search"
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-white/40 transition hover:bg-white/10 hover:text-white"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* ── class chips 1–12 ───────────────────────────────── */}
                <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Filter by class">
                    {CLASSES.map(c => {
                        const count = classCounts[c] ?? 0
                        const active = cls === c
                        const empty = count === 0
                        return (
                            <button
                                key={c}
                                disabled={empty}
                                onClick={() => { setCls(active ? null : c); setSubject(null) }}
                                aria-pressed={active}
                                title={empty ? `Class ${c} — catalog coming soon` : undefined}
                                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-black transition-all duration-200 ${
                                    active
                                        ? 'bg-gradient-to-r from-amber-300 to-yellow-500 text-black shadow-[0_4px_20px_-4px_rgba(251,191,36,0.5)]'
                                        : empty
                                            ? 'cursor-not-allowed border border-white/5 bg-white/[0.02] text-white/25'
                                            : 'border border-white/10 bg-white/[0.04] text-white/60 hover:border-amber-400/40 hover:text-amber-200'
                                }`}
                            >
                                Class {c}
                                <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-black ${
                                    active ? 'bg-black/20 text-black' : empty ? 'bg-white/5 text-white/25' : 'bg-white/10 text-white/50'
                                }`}>{count}</span>
                            </button>
                        )
                    })}
                </div>

                {/* ── subject chips ──────────────────────────────────── */}
                <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filter by subject">
                    <button
                        onClick={() => setSubject(null)}
                        aria-pressed={subject == null}
                        className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-all duration-200 ${
                            subject == null
                                ? 'bg-gradient-to-r from-amber-300 to-yellow-500 text-black'
                                : 'border border-white/10 bg-white/[0.04] text-white/50 hover:border-amber-400/40 hover:text-amber-200'
                        }`}
                    >
                        All subjects ({nfmt(inClass.length)})
                    </button>
                    {subjectChips.map(([g, count]) => {
                        const active = subject === g
                        const color = groupColor(g)
                        return (
                            <button
                                key={g}
                                onClick={() => setSubject(active ? null : g)}
                                aria-pressed={active}
                                style={active ? { backgroundColor: `${color}26`, borderColor: `${color}80`, color } : undefined}
                                className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-bold capitalize transition-all duration-200 ${
                                    active
                                        ? ''
                                        : 'border-white/10 bg-white/[0.04] text-white/50 hover:border-amber-400/40 hover:text-amber-200'
                                }`}
                            >
                                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                                {g} <span className="opacity-60">{count}</span>
                            </button>
                        )
                    })}
                </div>

                {/* ── result meta ────────────────────────────────────── */}
                {filtersActive && (
                    <div className="mb-4 flex items-center justify-between text-xs text-white/45">
                        <p><span className="font-black text-amber-300">{nfmt(filtered.length)}</span> simulation{filtered.length === 1 ? '' : 's'} found</p>
                        <button onClick={clearFilters} className="font-bold text-white/50 underline-offset-2 transition hover:text-amber-300 hover:underline">
                            Clear filters
                        </button>
                    </div>
                )}

                {/* ── gallery grid ───────────────────────────────────── */}
                {chunk.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {chunk.map((s, i) => (
                            <SimCard
                                key={s.id}
                                sim={s}
                                index={i}
                                progress={progressOf(s)}
                                resume={resumable.has(s.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
                        <Sparkles size={28} className="text-amber-400/60" />
                        <p className="font-display text-lg font-bold text-white/80">Nothing matches that yet</p>
                        <p className="max-w-sm text-sm text-white/40">
                            Try a different class or subject, or search a shorter phrase.
                        </p>
                        {filtersActive && (
                            <button
                                onClick={clearFilters}
                                className="mt-1 rounded-xl bg-gradient-to-r from-amber-300 to-yellow-500 px-4 py-2 text-xs font-black text-black transition hover:brightness-110"
                            >
                                Show everything
                            </button>
                        )}
                    </div>
                )}

                {/* ── pager ──────────────────────────────────────────── */}
                {visible < filtered.length && (
                    <div className="mt-10 flex flex-col items-center gap-2">
                        <button
                            onClick={() => setVisible(v => v + CHUNK)}
                            className="rounded-2xl border border-amber-400/40 bg-amber-400/10 px-6 py-3 text-sm font-black text-amber-300 transition-all duration-200 hover:border-amber-400/70 hover:bg-amber-400/20 hover:shadow-[0_8px_32px_-8px_rgba(251,191,36,0.4)]"
                        >
                            Show {Math.min(CHUNK, filtered.length - visible)} more
                        </button>
                        <p className="text-[11px] font-semibold text-white/35">
                            Showing {nfmt(chunk.length)} of {nfmt(filtered.length)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
