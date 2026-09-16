'use client'

import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { SimPlayer } from '@/components/sims_v2/engine/SimPlayer'
import { allSimsMeta, getSimMeta, loadSimDef, type SimMeta } from '@/components/sims_v2/lite'
import { themeFor } from '@/components/sims_v2/engine/theme'
import { subjectIdentity } from '@/components/sims_browser/subjectTheme'
import { friendlyNodeTitle } from '@/lib/nodeTitle'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import type { SimAnswerEvent, SimDef } from '@/components/sims_v2/engine/types'

/**
 * /sims-v2/[id] — renders a SimDef through the v3 engine.
 * Senior mode (no mascot, KaTeX) for class ≥6; junior otherwise.
 * Chrome: sticky header (back, title, class/subject/chapter badges) and a
 * prev/next rail that walks the sim's class in subject → chapter order.
 * Example: /sims-v2/v3_c10_phy_ch01_p1
 */
export default function SimV2Page() {
    const { id } = useParams<{ id: string }>()
    const user = useAuthStore(s => s.user)
    const [def, setDef] = useState<SimDef | null | undefined>(undefined)

    const simId = decodeURIComponent(id ?? '')

    // lazy: pull only this sim's class module (~1/7th the module graph)
    useEffect(() => {
        let live = true
        loadSimDef(simId)
            .then(d => { if (live) setDef(d as SimDef | null) })
            .catch(() => { if (live) setDef(null) })   // chunk-load failure → "not found", not an infinite spinner
        return () => { live = false }
    }, [simId])

    // catalog metadata — instant title/badges before (or without) the full def
    const meta = useMemo(() => getSimMeta(simId), [simId])

    // prev/next within the same class, ordered subject → chapter → title
    const neighbors = useMemo(() => {
        if (!meta) return { prev: null as SimMeta | null, next: null as SimMeta | null, pos: 0, total: 0 }
        const list = allSimsMeta()
            .filter(s => s.c === meta.c)
            .sort((a, b) =>
                a.s === b.s
                    ? (a.ch === b.ch ? a.t.localeCompare(b.t) : a.ch.localeCompare(b.ch))
                    : a.s.localeCompare(b.s))
        const i = list.findIndex(s => s.id === meta.id)
        return {
            prev: i > 0 ? list[i - 1]! : null,
            next: i >= 0 && i < list.length - 1 ? list[i + 1]! : null,
            pos: i + 1,
            total: list.length,
        }
    }, [meta])

    const subj = subjectIdentity(meta?.s ?? def?.subject ?? '')
    const topics = meta?.n?.length ?? def?.nodeIds?.length ?? 0
    // friendly chapter label via the sanctioned nodeTitle helper — never a raw id
    const chapterLabel = meta?.ch ? friendlyNodeTitle(meta.ch).split('·').pop()?.trim() : ''
    const theme = themeFor(meta?.s ?? def?.subject ?? '')

    // SimAnswerEvent → AttemptLog: every challenge + every teaching-beat
    // signal lands as an interaction row feeding the adaptive backend.
    const logEvent = (ev: SimAnswerEvent) => {
        api.post('/api/intelligence/interaction', {
            student_id: (user as any)?.id ?? 'anon',
            node_id: ev.nodeId ?? ev.simId,
            question: `${ev.simId}#${ev.challengeId ?? ev.challengeIndex}`,
            response: ev.confidence ? `confidence:${ev.confidence}` : ev.challengeType,
            is_correct: ev.correct,
            time_spent_ms: ev.responseMs ?? 0,
            hints_used: ev.attempts ?? 0,
            action_taken: ev.challengeType,
            mastery_before: ev.masteryBefore ?? 0,
            mastery_after: ev.masteryAfter ?? 0,
            session_id: ev.sessionId,
        }).catch(() => { /* telemetry must never break the sim */ })
    }

    // header renders instantly from registry metadata — even while the
    // full SimDef chunk is still streaming in
    const header = meta || def ? (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-3">
                <Link
                    href="/sims-v2"
                    aria-label="Back to the Simulation Gallery"
                    className="shrink-0 rounded-lg border border-white/10 bg-white/[0.05] p-2 text-white/70 transition hover:border-amber-400/40 hover:text-amber-300"
                >
                    <ArrowLeft size={16} />
                </Link>
                <div className="min-w-0 flex-1">
                    <h1 className="truncate font-display text-sm font-bold text-white sm:text-base">
                        {def?.title ?? meta?.t ?? 'Simulation'}
                    </h1>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                        <span className="rounded-md border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-amber-300">
                            Class {def?.classLevel ?? meta?.c}
                        </span>
                        <span
                            className="rounded-md border px-1.5 py-0.5 capitalize"
                            style={{ borderColor: `${subj.color}55`, backgroundColor: `${subj.color}14`, color: subj.color }}
                        >
                            {subj.label}
                        </span>
                        {chapterLabel && <span className="text-white/45">{chapterLabel}</span>}
                        {topics > 0 && (
                            <span className="flex items-center gap-1 text-white/45">
                                <BookOpen size={10} /> Teaches {topics} topic{topics === 1 ? '' : 's'}
                            </span>
                        )}
                        {neighbors.total > 0 && (
                            <span className="ml-auto hidden text-white/35 sm:block">
                                {neighbors.pos} / {neighbors.total} in class
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </header>
    ) : null

    if (def === undefined) {
        return (
            <div className={`flex min-h-screen flex-col bg-gradient-to-br ${theme.bg} text-white`}>
                {header}
                <div className="flex flex-1 items-center justify-center">
                    <p className="text-sm font-bold text-white/50 animate-pulse">loading your simulation…</p>
                </div>
            </div>
        )
    }
    if (!def) {
        return (
            <div className={`flex min-h-screen flex-col bg-gradient-to-br ${theme.bg} text-white`}>
                {header}
                <div className="mesh-bg-animated flex flex-1 flex-col items-center justify-center gap-4 px-4">
                    <span className="text-4xl" aria-hidden>🧭</span>
                    <p className="font-display text-lg font-bold text-white/90">This simulation seems to have wandered off</p>
                    <p className="max-w-sm text-center text-sm text-white/45">
                        It may have been renamed or retired. Head back to the gallery — there are 3,000+ more to explore.
                    </p>
                    <Link
                        href="/sims-v2"
                        className="rounded-xl bg-gradient-to-r from-amber-300 to-yellow-500 px-5 py-2.5 text-xs font-black text-black transition hover:brightness-110"
                    >
                        Browse all simulations
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className={`flex min-h-screen flex-col bg-gradient-to-br ${theme.bg}`}>
            {header}

            <div className="flex flex-1 justify-center px-4 py-8">
                <SimPlayer
                    def={def}
                    mode={def.classLevel >= 6 ? 'senior' : 'junior'}
                    onEvent={logEvent}
                />
            </div>

            {/* ── prev / next within the same class ─────────────────── */}
            {(neighbors.prev || neighbors.next) && (
                <nav className="sticky bottom-0 z-40 mt-auto border-t border-white/10 bg-black/70 backdrop-blur-xl" aria-label="More simulations in this class">
                    <div className="mx-auto flex max-w-4xl items-stretch gap-2 px-4 py-3">
                        {neighbors.prev ? (
                            <Link
                                href={`/sims-v2/${neighbors.prev.id}`}
                                className="group flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 transition hover:border-amber-400/40 hover:bg-white/[0.08]"
                            >
                                <ChevronLeft size={16} className="shrink-0 text-amber-300" />
                                <span className="min-w-0">
                                    <span className="block text-[9px] font-black uppercase tracking-widest text-white/40">Previous</span>
                                    <span className="block truncate text-xs font-bold text-white/80 transition group-hover:text-amber-100">{neighbors.prev.t}</span>
                                </span>
                            </Link>
                        ) : <div className="flex-1" />}
                        {neighbors.next ? (
                            <Link
                                href={`/sims-v2/${neighbors.next.id}`}
                                className="group flex min-w-0 flex-1 items-center justify-end gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 text-right transition hover:border-amber-400/40 hover:bg-white/[0.08]"
                            >
                                <span className="min-w-0">
                                    <span className="block text-[9px] font-black uppercase tracking-widest text-white/40">Next</span>
                                    <span className="block truncate text-xs font-bold text-white/80 transition group-hover:text-amber-100">{neighbors.next.t}</span>
                                </span>
                                <ChevronRight size={16} className="shrink-0 text-amber-300" />
                            </Link>
                        ) : <div className="flex-1" />}
                    </div>
                </nav>
            )}
        </div>
    )
}
