'use client'

/**
 * /my-galaxy — Galaxy Home.
 *
 * The living universe IS the home experience: every one of the 9,099
 * official syllabus nodes is a star, and the stars a student has MASTERED
 * glow gold while untouched stars stay honestly dim. Tap a star and the
 * camera glides in while a topic panel slides up — read the story, or
 * practice exactly that topic.
 *
 * Honesty rules (owner directive):
 *  - mastery comes ONLY from GET /api/progress/mastery/all (server truth);
 *    a fresh account sees an all-dim sky, never fabricated stars.
 *  - if the progress fetch fails the HUD says so — the sky never pretends.
 *  - no raw node ids in visible text (friendlyNodeTitle / real titles only).
 */

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, PenLine, X, LayoutDashboard, Flame, WifiOff, Radar } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import GALAXY from '@/components/world/GALAXY.json'
import WC from '@/components/world/world_content.json'
import { api, getAuthToken } from '@/lib/api'
import { friendlyNodeTitle, subjectName } from '@/lib/nodeTitle'
import { GALAXY_LIT_THRESHOLD } from '@/components/world/WorldMap3D'

const WorldMap3D = dynamic(() => import('@/components/world/WorldMap3D').then(m => m.WorldMap3D), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-slate-950">
            <p className="text-slate-500 font-bold animate-pulse">Loading your universe…</p>
        </div>
    ),
})

type GNode = { id: string; cls: number; subj: string; chap: number; pos: [number, number, number]; sim: string | null }
const NODES = GALAXY.nodes as GNode[]
const GALAXY_IDS = new Set(NODES.map(n => n.id))
const TOTAL_STARS = NODES.length

const WC_SUBJ = WC.subjects as Record<string, { name?: string }>;
const WC_CONST = WC.constellations as Record<string, string>;
const constellationTitle = (n: { cls: number; subj: string; chap: number }) =>
    WC_CONST[`c${n.cls}_${n.subj}_ch${String(n.chap).padStart(2, '0')}`] ?? null;

/* server rows can arrive camelCase (FastAPI alias) or snake_case — accept both */
interface MasteryRow { nodeId?: string; node_id?: string; masteryProbability?: number; mastery_probability?: number }

interface Enrichment {
    title?: string | null
    definition?: string | null
    subject?: string | null
    class_level?: string | number | null
    chapter?: string | number | null
}

/* ─── topic panel — slides in for the selected star ─────────────────────── */
function TopicPanel({ node, masteryPct, onClose }: { node: GNode; masteryPct: number; onClose: () => void }) {
    const [enrich, setEnrich] = useState<Enrichment | null>(null)
    const [status, setStatus] = useState<'loading' | 'ready' | 'none'>('loading')

    const constellation = constellationTitle(node)
    const metaLine = [
        `Class ${node.cls}`,
        WC_SUBJ[node.subj]?.name ?? subjectName(node.subj),
        constellation ?? `Chapter ${node.chap}`,
    ].join(' · ')

    useEffect(() => {
        let dead = false
        setEnrich(null)
        setStatus('loading')
        void (async () => {
            try {
                const data = await api.get<Enrichment>(`/api/content/nodes/${encodeURIComponent(node.id)}/enrichment`)
                if (dead) return
                setEnrich(data ?? null)
                setStatus('ready')
            } catch {
                if (!dead) setStatus('none')   // no enrichment — friendly fallback below
            }
        })()
        return () => { dead = true }
    }, [node.id])

    // Some corpus rows (Hindi-medium nodes) carry generic slug labels like
    // "Hin_Ar · Ch 02" as their title — those are labels, not titles; the
    // authored constellation name reads better and stays truthful.
    const enrichTitle = status === 'ready' && enrich?.title ? String(enrich.title).trim() : ''
    const genericTitle = !enrichTitle || enrichTitle === node.id || / · ch\s*\d+/i.test(enrichTitle)
    const title = (!genericTitle ? enrichTitle : null) ?? constellation ?? friendlyNodeTitle(node.id)

    return (
        <motion.aside
            key={node.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            aria-label={`Topic panel: ${title}`}
            className="absolute z-20
                inset-x-3 bottom-3 max-h-[46vh] overflow-y-auto
                sm:inset-x-auto sm:right-5 sm:top-24 sm:bottom-auto sm:max-h-none sm:w-[350px] sm:overflow-visible
                bg-slate-900/85 border border-slate-600/80 rounded-3xl p-5 backdrop-blur-xl shadow-2xl"
        >
            <button onClick={onClose} aria-label="Close topic panel"
                className="absolute top-3 right-3 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-700/60 transition">
                <X className="w-4 h-4" />
            </button>

            <p className="text-[10px] font-black uppercase tracking-widest text-sky-300/90 pr-8">{metaLine}</p>

            {status === 'loading' ? (
                <div className="h-7 w-3/4 mt-1 rounded-lg bg-slate-700/60 animate-pulse" aria-label="Loading title" />
            ) : (
                <h2 className="font-display text-xl font-bold text-white mt-1 pr-6 leading-snug">{title}</h2>
            )}

            {status === 'ready' && enrich?.definition ? (
                <p className="text-xs text-slate-300 font-medium mt-2 leading-relaxed line-clamp-3">
                    {String(enrich.definition).replace(/\*\*|`/g, '')}
                </p>
            ) : null}

            {/* mastery — the real number, or an honest "still dim" */}
            <div className="mt-3">
                {masteryPct >= GALAXY_LIT_THRESHOLD ? (
                    <p className="text-xs font-black text-amber-300">✦ Mastered — {masteryPct}% <span className="text-slate-400 font-bold">· this star is lit</span></p>
                ) : masteryPct > 0 ? (
                    <>
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>In progress</span><span className="text-slate-200">{masteryPct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-700 mt-1 overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-amber-400" style={{ width: `${masteryPct}%` }} />
                        </div>
                    </>
                ) : (
                    <p className="text-xs font-bold text-slate-400">Not explored yet — this star stays dim until you master it.</p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                <Link href={`/learn/${encodeURIComponent(node.id)}/story`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-900 text-xs font-black hover:bg-amber-400 transition">
                    <BookOpen className="w-4 h-4" /> Read the Story
                </Link>
                <Link href={`/practice?node=${encodeURIComponent(node.id)}&subject=${encodeURIComponent(node.subj)}`}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-600 text-slate-100 text-xs font-black hover:bg-slate-700 hover:border-slate-400 transition">
                    <PenLine className="w-4 h-4" /> Practice
                </Link>
            </div>
        </motion.aside>
    )
}

/* ─── HUD — sky progress, streak, review radar, legend, dashboard link ──── */
function GalaxyHud({ lit, streak, progressState, signedOut, dueReview, classFilter, classTotal }: {
    lit: number; streak: number | null
    progressState: 'loading' | 'ready' | 'unavailable'
    signedOut: boolean
    /** Real count of SM-2 review items due today (null = unknown → hidden). */
    dueReview: number | null
    /** CHILD-LENS (fix 13): the sky opens on the child's OWN class year —
        "0 of 9,099" day-one infinity becomes "0 of your class's topics". */
    classFilter: number | null
    /** Star count inside the class filter (null = whole sky). */
    classTotal: number | null
}) {
    return (
        <div className="absolute z-10
                top-24 left-3 right-3 sm:top-5 sm:left-5 sm:right-auto sm:max-w-[270px]
                bg-slate-900/80 border border-slate-700 rounded-2xl px-4 py-3 backdrop-blur">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Your galaxy</p>
            {signedOut ? (
                <p className="text-sm font-bold text-slate-300 mt-1">Sign in and your mastered topics light up here.</p>
            ) : progressState === 'unavailable' ? (
                <p className="text-sm font-bold text-slate-300 mt-1 flex items-start gap-1.5">
                    <WifiOff className="w-4 h-4 mt-0.5 shrink-0 text-slate-500" />
                    Progress couldn’t load — showing every star unlit. Nothing is faked.
                </p>
            ) : progressState === 'loading' ? (
                <>
                    <div className="h-6 w-36 rounded-lg bg-slate-700/60 animate-pulse mt-1" aria-label="Loading sky progress" />
                    <p className="text-[10px] text-slate-500 font-bold mt-1">counting your lit stars…</p>
                </>
            ) : (
                <p className="text-xl font-black text-white leading-tight">
                    {lit.toLocaleString()}
                    <span className="text-sm text-slate-400 font-bold">
                        {' '}of {(classTotal ?? TOTAL_STARS).toLocaleString()} stars lit
                        {classFilter != null ? ` · your Class ${classFilter} sky` : ''}
                    </span>
                </p>
            )}

            {/* legend — child words for what lit and dim mean */}
            <p className="text-[10px] text-slate-400 font-bold mt-1.5 leading-relaxed">
                <span className="text-amber-300">◆ bright</span> = you&apos;ve got it ·
                <span className="text-slate-500"> ◆ dim</span> = not yet
            </p>

            {streak != null && streak > 0 && (
                <p className="text-[11px] font-black text-amber-300 mt-1.5 inline-flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> {streak}-day streak
                </p>
            )}

            {/* review radar — real due count from the SM-2 queue; honest hide
                when nothing is due or the count is unknown */}
            {!signedOut && progressState === 'ready' && dueReview != null && dueReview > 0 && (
                <Link href="/review" data-testid="galaxy-review-radar"
                    className="mt-2 flex items-center justify-between gap-2 rounded-xl border border-amber-500/40 bg-amber-500/[0.08] px-3 py-2 hover:border-amber-400 hover:bg-amber-500/[0.14] transition">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-amber-300">
                        <Radar className="w-3.5 h-3.5 shrink-0" aria-hidden />
                        {dueReview} star{dueReview === 1 ? '' : 's'} due for review
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-200">
                        Review now
                    </span>
                </Link>
            )}

            <Link href="/dashboard"
                className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-600 text-[10px] font-black text-slate-200 hover:bg-slate-700 hover:border-slate-400 transition">
                <LayoutDashboard className="w-3.5 h-3.5" /> Open Dashboard
            </Link>
        </div>
    )
}

/* ─── page ──────────────────────────────────────────────────────────────── */
export default function MyGalaxyPage() {
    const [progressState, setProgressState] = useState<'loading' | 'ready' | 'unavailable'>('loading')
    const [mastery, setMastery] = useState<Record<string, number> | null>(null)
    const [streak, setStreak] = useState<number | null>(null)
    /** SM-2 items due today — real count, hidden unless > 0. */
    const [dueReview, setDueReview] = useState<number | null>(null)
    const [selectedId, setSelectedId] = useState<string | null>(null)
    const [signedOut, setSignedOut] = useState(false)
    // CHILD-LENS (fix 13): the signed-in child's own class — the sky opens
    // scoped to their year instead of all 12 classes at once.
    const authUser = useAuthStore((s) => s.user)
    const myClass = useMemo(() => {
        const n = Number((authUser as { class_level?: number } | null)?.class_level)
        return n >= 1 && n <= 12 ? n : null
    }, [authUser])
    const classTotal = useMemo(
        () => (myClass ? NODES.filter((n) => n.cls === myClass).length : null),
        [myClass])

    useEffect(() => {
        let dead = false
        void (async () => {
            // Anonymous visitors get the honest door, not a 401 in the console.
            if (!getAuthToken()) {
                if (!dead) { setSignedOut(true); setProgressState('unavailable'); setMastery({}) }
                return
            }
            try {
                const rows = await api.get<MasteryRow[]>('/api/progress/mastery/all')
                if (dead) return
                const out: Record<string, number> = {}
                for (const r of rows ?? []) {
                    const id = r.nodeId ?? r.node_id
                    if (!id || !GALAXY_IDS.has(id)) continue
                    const p = r.masteryProbability ?? r.mastery_probability ?? 0
                    out[id] = Math.round(Math.max(0, Math.min(1, p)) * 100)
                }
                setMastery(out)
                setProgressState('ready')
            } catch {
                if (!dead) { setMastery({}); setProgressState('unavailable') }
            }
            // streak — best-effort; the HUD simply hides it when absent
            try {
                const d = await api.get<{ streak?: number }>('/api/progress/dashboard')
                if (!dead) setStreak(Number(d.streak ?? 0) || null)
            } catch { /* honest: no streak shown */ }
            // review radar — real SM-2 due count; hidden entirely on failure
            try {
                const q = await api.get<{ total?: number }>('/api/progress/review/queue')
                if (!dead) setDueReview(Math.max(0, Number(q?.total ?? 0) || 0))
            } catch { /* honest: unknown → no radar line */ }
        })()
        return () => { dead = true }
    }, [])

    /* stars lit = server mastery at the same bar /api/progress/overview uses,
       scoped to the child's class when the sky is scoped */
    const lit = useMemo(() => {
        if (!mastery) return 0
        let n = 0
        for (const [id, v] of Object.entries(mastery)) {
            if (v < GALAXY_LIT_THRESHOLD) continue
            if (myClass && NODES.find((nd) => nd.id === id)?.cls !== myClass) continue
            n++
        }
        return n
    }, [mastery, myClass])

    const selectedNode = useMemo(
        () => (selectedId ? NODES.find(n => n.id === selectedId) ?? null : null),
        [selectedId])

    return (
        <div className="fixed inset-0 bg-slate-950 overflow-hidden">
            <WorldMap3D
                classLevel={myClass}
                serverMastery={mastery}
                selectedId={selectedId}
                onSelect={(n) => setSelectedId(n ? n.id : null)}
                showHud={false}
            />

            <GalaxyHud
                lit={lit}
                streak={streak}
                progressState={progressState}
                signedOut={signedOut}
                dueReview={dueReview}
                classFilter={myClass}
                classTotal={classTotal}
            />

            <AnimatePresence>
                {selectedNode && (
                    <TopicPanel
                        node={selectedNode}
                        masteryPct={mastery?.[selectedNode.id] ?? 0}
                        onClose={() => setSelectedId(null)}
                    />
                )}
            </AnimatePresence>

            {/* honest door for signed-out visitors */}
            {signedOut && (
                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-auto bg-slate-900/90 border border-slate-600 rounded-3xl px-8 py-7 backdrop-blur-xl shadow-2xl max-w-sm mx-4 text-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-amber-300">Your galaxy is waiting</p>
                        <h1 className="font-display text-2xl font-bold text-white mt-1">9,099 stars. One is yours.</h1>
                        <p className="text-sm text-slate-300 font-medium mt-2 leading-relaxed">
                            Sign in and the syllabus becomes a living sky — every topic you master lights another star.
                        </p>
                        <Link href="/login"
                            className="mt-4 inline-flex items-center justify-center w-full px-4 py-2.5 rounded-xl bg-amber-500 text-slate-900 text-sm font-black hover:bg-amber-400 transition">
                            Sign in to enter
                        </Link>
                        <Link href="/dashboard" className="mt-2 inline-block text-[11px] font-bold text-slate-400 hover:text-slate-200">
                            Explore the dashboard first
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
