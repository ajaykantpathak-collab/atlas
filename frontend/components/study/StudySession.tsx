'use client'

/**
 * StudySession v2 — adaptive staged study for one node.
 *
 * Not a linear page — a routed session:
 *
 *   PROBE  → one no-stakes diagnostic up front ("quick feeler")
 *            · right  → strong start: skip Hook, begin at Define
 *            · wrong  → full scaffold: Hook → See → Define → Try → Check
 *            · miss also surfaces the prereq detour chip
 *
 *   HOOK   → doodle visual + one-line ELI5 (visual first, text second)
 *   SEE    → the node's sim/diagram — play before formal
 *   DEFINE → dual-coded: visual left, definition as tap-to-reveal idea
 *            cards right — never a wall of text
 *   TRY    → worked-example ladder: watch → finish a partially-solved
 *            problem → the corpus's full examples
 *   CHECK  → authored diagnostics; a miss opens the authored
 *            misconception recipe inline (QuickQuiz owns that loop)
 *   MASTER → mastery criteria + competency + forward unlocks
 *
 * Struggling-student layer: ChunkedText reveal, ConfidenceGate before
 * every self-check, TTS listen, "I'm stuck" inline simplify, XP pulses,
 * per-stage coach line, a real finish moment.
 */
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ArrowLeft, ArrowRight, Sparkles, Eye, BookOpen, PenSquare,
    Target, Award, Loader2, ChevronRight, CheckCircle2,
    MessageCircleQuestion, Lightbulb, Compass, HelpCircle, Gauge, Brain,
} from 'lucide-react'
import { api } from '@/lib/api'
import { subjectName } from '@/lib/nodeTitle'
import AuthoredText from '@/components/learn/AuthoredText'
import { InlineSim } from '@/components/learn/InlineSim'
import QuickQuiz from '@/components/learn/QuickQuiz'
import { WorkedExampleFading } from '@/components/learn/WorkedExample'
import { markNodeDone, isNodeDone } from '@/components/learn/ChapterPath'
import AskBar from '@/components/ask/AskBar'
import DoodleCardImage from '@/components/doodle/DoodleCardImage'
import { ChunkedText, ConfidenceGate, CoachLine, XpPulse } from './parts'

interface EnrichmentData {
    node_id: string
    title: string
    subject: string
    class_level: number
    chapter: string | null
    definition: string | null
    text_walkthrough: string | null
    eli5: string | null
    common_misconception: string | null
    diagnostic_questions: any[] | null
    on_failure: any[] | null
    examples: string | null
    cognitive_level: string | null
    mastery_criteria: string | null
    scope_boundary: string | null
    prereq_ids: string[]
    forward_node_ids: string[]
    difficulty: string | null
}
interface SimRef { id: string; title: string; classLevel: number; generated: boolean }
interface GraphRef { node_id: string; name?: string | null }

type StageId = 'probe' | 'hook' | 'see' | 'define' | 'try' | 'check' | 'recall' | 'master'

const STAGE_META: Record<StageId, { label: string; icon: any; coach: string }> = {
    probe:  { label: 'Feeler',  icon: Gauge,      coach: 'One quick question — no marks, it just picks where you start' },
    hook:   { label: 'Hook',    icon: Sparkles,   coach: 'Just this one idea — nothing to memorize yet' },
    see:    { label: 'See it',  icon: Eye,        coach: 'Play first. Reading comes after you\'ve seen it move' },
    define: { label: 'Define',  icon: BookOpen,   coach: 'Now the exam words — tap each line when ready' },
    try:    { label: 'Try it',  icon: PenSquare,  coach: 'Watch one, then finish the next yourself' },
    check:  { label: 'Check',   icon: Target,     coach: 'Wrong answers here show exactly what to fix — that\'s the point' },
    recall: { label: 'Recall',  icon: Brain,      coach: 'No peeking — empty your head first, then check yourself' },
    master: { label: 'Master',  icon: Award,      coach: 'You\'ve got this — here\'s the proof and what\'s next' },
}

const XP_PER_STAGE = 10
const ease = [0.16, 1, 0.3, 1] as const

/** Worked-example splitter: corpus examples carry PROBLEM/STEPS/ANSWER
 *  blocks — split them so TRY can serve watch→complete→solve. */
function splitWorkedExamples(raw: string): { problem: string; steps: string[]; answer: string }[] {
    const blocks = raw.split(/WORKED_EXAMPLE_\d+/i).map(s => s.trim()).filter(Boolean)
    return blocks.map(b => {
        const p = b.match(/PROBLEM[:\s]+([\s\S]*?)(?=STEPS?|ANSWER|$)/i)
        const st = b.match(/STEPS?[:\s]+([\s\S]*?)(?=ANSWER|$)/i)
        const a = b.match(/ANSWER[:\s]+([\s\S]*?)$/i)
        const steps = (st?.[1] || '')
            .split(/\n+|(?:^|\s)(?:Step\s*\d+|\d+[.)]|[-*])\s*/i)
            .map(s => s.trim()).filter(s => s.length > 3)
        return { problem: p?.[1]?.trim() || '', steps, answer: a?.[1]?.trim() || '' }
    }).filter(e => e.problem)
}

export default function StudySession({ nodeId }: { nodeId: string }) {
    const router = useRouter()
    const [topic, setTopic] = useState<EnrichmentData | null>(null)
    const [sims, setSims] = useState<SimRef[]>([])
    const [forward, setForward] = useState<GraphRef[]>([])
    const [prereqs, setPrereqs] = useState<GraphRef[]>([])
    // RESUME: persist the stage index per node so a refresh or an
    // accidental navigate-away reopens mid-session, not at the start.
    const stageKey = `atlas_stage_${nodeId}`
    const [stageIdx, setStageIdx] = useState(() => {
        try {
            const saved = Number(localStorage.getItem(stageKey))
            return Number.isFinite(saved) && saved > 0 ? saved : 0
        } catch { return 0 }
    })
    const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading')
    const [askOpen, setAskOpen] = useState(false)
    const [askSent, setAskSent] = useState(false)
    const [stuckOpen, setStuckOpen] = useState(false)
    const [xpPulse, setXpPulse] = useState(0)
    const [done, setDone] = useState(false)

    // probe state — one authored diagnostic as the entry feeler
    const [probeAnswered, setProbeAnswered] = useState<'right' | 'wrong' | null>(null)
    const [probeShowAns, setProbeShowAns] = useState(false)
    // try ladder state — which rung of watch→complete→solve
    const [tryRung, setTryRung] = useState(0)
    // interleave warmup — one question from a DONE prereq node (retrieval
    // practice: the previous topic comes back before the new one starts)
    const [warmup, setWarmup] = useState<{ q: string; a: string; from: string } | null>(null)
    const [warmupShow, setWarmupShow] = useState(false)

    useEffect(() => {
        let alive = true
        setState('loading')
        api.get<EnrichmentData>(`/api/content/nodes/${nodeId}/enrichment`)
            .then(t => { if (alive) { setTopic(t); setState('ready') } })
            .catch(() => alive && setState('error'))
        api.get<SimRef[]>(`/api/nodes/${encodeURIComponent(nodeId)}/sims`)
            .then(s => alive && setSims(Array.isArray(s) ? s : []))
            .catch(() => {})
        api.get<{ unlocks: GraphRef[] }>(`/api/graph/unlocks/${encodeURIComponent(nodeId)}`)
            .then(u => alive && setForward(u?.unlocks || []))
            .catch(() => {})
        api.get<{ prerequisites: GraphRef[] }>(`/api/graph/prerequisites/${encodeURIComponent(nodeId)}`)
            .then(p => alive && setPrereqs(p?.prerequisites || []))
            .catch(() => {})
        // breadcrumb for the hub's "continue where you left off" card
        try { localStorage.setItem('atlas_last_node', nodeId) } catch {}
        return () => { alive = false }
    }, [nodeId])

    // position-in-path — "3 of 8 in this chapter" so the student always
    // knows where they are. One sibling-list call, chapter-filtered.
    const [position, setPosition] = useState<{ idx: number; total: number; done: number } | null>(null)
    useEffect(() => {
        if (!topic?.chapter) { setPosition(null); return }
        let alive = true
        api.get<{ nodes: { node_id: string; chapter: string | null }[] }>(
            `/api/content/enrichment?subject=${encodeURIComponent(topic.subject)}&class_level=${topic.class_level}&limit=500`)
            .then(d => {
                if (!alive) return
                const sibs = (d?.nodes || []).filter(n => n.chapter === topic.chapter)
                const idx = sibs.findIndex(n => n.node_id === nodeId)
                if (idx >= 0) setPosition({ idx: idx + 1, total: sibs.length, done: sibs.filter(n => isNodeDone(n.node_id)).length })
            })
            .catch(() => {})
        return () => { alive = false }
    }, [topic, nodeId])

    // warmup: if a prereq node was already cleared, pull its first
    // diagnostic as the retrieval opener (spaced, interleaved practice)
    useEffect(() => {
        const donePrereq = prereqs.find(p => isNodeDone(p.node_id))
        if (!donePrereq) return
        let alive = true
        api.get<EnrichmentData>(`/api/content/nodes/${donePrereq.node_id}/enrichment`)
            .then(t => {
                const d = (t?.diagnostic_questions || []).find((q: any) => q && String(q.question || '').trim())
                if (alive && d) setWarmup({ q: d.question, a: d.answer, from: t.title || 'earlier topic' })
            })
            .catch(() => {})
        return () => { alive = false }
    }, [prereqs])

    const probeQ = useMemo(() => {
        const d = (topic?.diagnostic_questions || []).find(q => q && String(q.question || '').trim())
        return d ? { q: d.question, a: d.answer, mis: d.misconception } : null
    }, [topic])

    const examples = useMemo(() => splitWorkedExamples(topic?.examples || ''), [topic])

    /** probe routes the stage list — a strong entry skips Hook and
     *  starts at Define (dual-coded); a miss gets the full scaffold. */
    const stages = useMemo<StageId[]>(() => {
        if (!topic) return []
        const s: StageId[] = []
        if (probeQ) s.push('probe')
        const strong = probeAnswered === 'right'
        if (!strong && topic.eli5) s.push('hook')
        if (sims.length) s.push('see')
        if (topic.definition || topic.text_walkthrough) s.push('define')
        if (examples.length) s.push('try')
        if ((topic.diagnostic_questions || []).length > 1) s.push('check')
        // free recall before mastery — only when there are criteria to
        // self-check against (otherwise the stage would be an empty box)
        if (topic.mastery_criteria) s.push('recall')
        s.push('master')
        return s
    }, [topic, sims, probeQ, probeAnswered, examples])

    const stage = stages[Math.min(stageIdx, stages.length - 1)]
    const last = stageIdx >= stages.length - 1
    const progress = stages.length ? (stageIdx + 1) / stages.length : 0

    const goTo = (i: number) => {
        setStageIdx(i); setStuckOpen(false)
        try { localStorage.setItem(stageKey, String(i)) } catch {}
    }
    const next = () => {
        setXpPulse(p => p + 1)
        if (!last) goTo(stageIdx + 1)
        else { markNodeDone(nodeId); setDone(true) }
    }
    const back = () => stageIdx > 0 && goTo(stageIdx - 1)
    const onAsk = (text: string) => {
        setAskSent(true)
        api.post('/api/tutor-graph/ask', { node_id: nodeId, question: text }).catch(() => {})
        setTimeout(() => setAskSent(false), 4000)
    }

    if (state === 'loading') {
        return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-indigo-400" /></div>
    }
    if (state === 'error' || !topic) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-surface-400">
                <p>Couldn't load this lesson.</p>
                <button onClick={() => router.back()} className="text-indigo-400 text-sm">← go back</button>
            </div>
        )
    }

    const M = STAGE_META[stage]

    return (
        <div className="min-h-screen bg-gradient-to-b from-surface-950 via-surface-900 to-surface-950 pb-36">
            <XpPulse n={xpPulse} amount={XP_PER_STAGE} />

            {/* ── progress rail ── */}
            <div className="sticky top-0 z-20 backdrop-blur-xl bg-surface-950/80 border-b border-white/5">
                <div className="h-0.5 bg-white/5">
                    <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                        animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.4, ease }} />
                </div>
                <div className="max-w-3xl mx-auto px-4 py-2.5 flex items-center gap-1">
                    <button onClick={() => router.back()} className="mr-2 p-2 -ml-2 text-surface-400 hover:text-surface-200">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    {stages.map((s, i) => {
                        const Sm = STAGE_META[s]
                        const active = i === stageIdx, doneS = i < stageIdx
                        return (
                            <button key={s} onClick={() => goTo(i)} title={Sm.label}
                                className="flex-1 flex flex-col items-center gap-0.5 py-1 group">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all
                                    ${active ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/40 scale-110'
                                        : doneS ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-white/5 text-surface-500 group-hover:bg-white/10'}`}>
                                    {doneS ? <CheckCircle2 className="w-4 h-4" /> : <Sm.icon className="w-3.5 h-3.5" />}
                                </div>
                                <span className={`text-[9px] font-medium tracking-wide ${active ? 'text-indigo-300' : 'text-surface-600'}`}>{Sm.label}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* ── stage body ── */}
            <div className="max-w-3xl mx-auto px-4 pt-7">
                {/* position chip — "3 of 8 · 2 done" so the student always
                    knows where they are on the path */}
                {position && (
                    <div className="mb-2 flex items-center gap-2 text-[11px] text-surface-500">
                        <Compass className="w-3.5 h-3.5 text-surface-400" />
                        <span>Topic {position.idx} of {position.total} in this chapter · {position.done} done</span>
                    </div>
                )}
                <CoachLine icon={M.icon}>{M.coach}</CoachLine>

                <AnimatePresence mode="wait">
                    <motion.div key={stage + String(done)}
                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35, ease }}>

                        {/* ══ PROBE — the entry feeler ══ */}
                        {stage === 'probe' && !done && (
                            <div className="space-y-5">
                                <div className="flex flex-wrap gap-2">
                                    {topic.chapter && <Chip>{topic.chapter}</Chip>}
                                    <Chip accent>{subjectName(topic.subject)} · Class {topic.class_level}</Chip>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-display font-bold text-surface-50 leading-tight">{topic.title}</h1>

                                {/* interleave warmup — a question from a topic you already cleared */}
                                {warmup && (
                                    <Card label={`Warmup — from "${warmup.from}"`} tone="emerald">
                                        <AuthoredText text={warmup.q} />
                                        {!warmupShow ? (
                                            <button onClick={() => setWarmupShow(true)}
                                                className="mt-3 px-4 py-2 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-medium">
                                                Reveal answer
                                            </button>
                                        ) : (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm">
                                                <AuthoredText text={warmup.a} />
                                            </motion.div>
                                        )}
                                    </Card>
                                )}

                                <Card label="Quick feeler — no marks" tone="indigo">
                                    <AuthoredText text={probeQ!.q} />
                                    {!probeShowAns ? (
                                        <div className="mt-4">
                                            <ConfidenceGate onRate={() => setProbeShowAns(true)}>
                                                <div />
                                            </ConfidenceGate>
                                        </div>
                                    ) : (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-3">
                                            <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 mb-1">The answer</p>
                                                <AuthoredText text={probeQ!.a} />
                                            </div>
                                            {probeQ!.mis && (
                                                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/15 text-sm text-amber-200/80">
                                                    <span className="font-semibold text-amber-300">The trap: </span>
                                                    <AuthoredText text={probeQ!.mis} />
                                                </div>
                                            )}
                                            <div className="flex gap-2 pt-1">
                                                <button onClick={() => setProbeAnswered('right')}
                                                    className="flex-1 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-medium">
                                                    I knew that ✓
                                                </button>
                                                <button onClick={() => setProbeAnswered('wrong')}
                                                    className="flex-1 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-sm font-medium">
                                                    Needed that
                                                </button>
                                            </div>
                                            {probeAnswered === 'wrong' && prereqs.length > 0 && (
                                                <button onClick={() => router.push(`/learn/${prereqs[0].node_id}`)}
                                                    className="w-full mt-1 p-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm text-surface-300 hover:border-indigo-500/40 flex items-center justify-between">
                                                    <span>60-sec detour: {prereqs[0].name || 'the foundation this needs'}</span>
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            )}
                                            {probeAnswered === 'right' && (
                                                <p className="text-xs text-emerald-300/80 pt-1">Strong start — skipping the intro, straight to the good stuff.</p>
                                            )}
                                        </motion.div>
                                    )}
                                </Card>
                            </div>
                        )}

                        {/* ══ HOOK — visual first ══ */}
                        {stage === 'hook' && !done && (
                            <div className="space-y-5">
                                <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]">
                                    <DoodleCardImage nodeId={nodeId} />
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-display font-bold text-surface-50 leading-tight">{topic.title}</h1>
                                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 overflow-hidden">
                                    <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                                    <div className="flex items-start gap-3">
                                        <Sparkles className="w-6 h-6 text-indigo-300 shrink-0 mt-1" />
                                        <AuthoredText text={topic.eli5!} className="text-lg text-surface-100 leading-relaxed" />
                                    </div>
                                </div>
                                {topic.common_misconception && (
                                    <div className="flex items-start gap-2.5 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15">
                                        <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                        <p className="text-sm text-amber-200/80">
                                            <span className="font-semibold text-amber-300">Almost everyone slips here: </span>
                                            <AuthoredText text={topic.common_misconception} />
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ══ SEE ══ */}
                        {stage === 'see' && !done && (
                            <div className="space-y-5">
                                {sims.length > 1 && <p className="text-xs text-surface-500">{sims.length} visuals — try them all</p>}
                                <div className="space-y-3">
                                    {sims.map(s => <InlineSim key={s.id} simId={s.id} title={s.title} />)}
                                </div>
                            </div>
                        )}

                        {/* ══ DEFINE — dual-coded: visual left, chunked text right ══ */}
                        {stage === 'define' && !done && (
                            <div className="space-y-5">
                                <div className={sims.length ? 'grid lg:grid-cols-2 gap-4 items-start' : ''}>
                                    {sims.length > 0 && (
                                        <div className="lg:sticky lg:top-24">
                                            <InlineSim simId={sims[0].id} title={sims[0].title} />
                                        </div>
                                    )}
                                    <div className="space-y-4">
                                        {topic.definition && (
                                            <Card label="Definition — tap each line" tone="indigo">
                                                <ChunkedText text={topic.definition} />
                                            </Card>
                                        )}
                                    </div>
                                </div>
                                {topic.text_walkthrough && (
                                    <Card label="How it works — one idea at a time" tone="violet">
                                        <ChunkedText text={topic.text_walkthrough} groupSize={2} />
                                    </Card>
                                )}
                                {topic.scope_boundary && (
                                    <div className="flex items-start gap-2.5 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                                        <Compass className="w-4 h-4 text-surface-400 shrink-0 mt-0.5" />
                                        <p className="text-xs text-surface-400">
                                            <span className="font-semibold text-surface-300">In scope: </span>
                                            <AuthoredText text={topic.scope_boundary} />
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ══ TRY — watch → complete → solve ══ */}
                        {stage === 'try' && !done && (
                            <div className="space-y-5">
                                <div className="flex gap-1.5">
                                    {['Watch', 'Finish it', 'Full examples'].map((l, i) => (
                                        <button key={l} onClick={() => setTryRung(i)}
                                            className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${tryRung === i ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300' : 'bg-white/5 border-white/10 text-surface-500'}`}>
                                            {l}
                                        </button>
                                    ))}
                                </div>

                                {tryRung === 0 && examples[0] && (
                                    <Card label="Watch — the whole thing solved" tone="emerald">
                                        <p className="font-medium mb-2"><AuthoredText text={examples[0].problem} /></p>
                                        <ChunkedText text={examples[0].steps.join(' ') || examples[0].answer} groupSize={1} />
                                        {examples[0].answer && (
                                            <div className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm">
                                                <AuthoredText text={examples[0].answer} />
                                            </div>
                                        )}
                                    </Card>
                                )}

                                {tryRung === 1 && examples.length > 1 && (() => {
                                    const ex = examples[1]
                                    const half = Math.max(1, Math.floor(ex.steps.length / 2))
                                    const shown = ex.steps.slice(0, half)
                                    const hidden = ex.steps.slice(half)
                                    return (
                                        <Card label="Finish it — I've started, you take over" tone="amber">
                                            <p className="font-medium mb-2"><AuthoredText text={ex.problem} /></p>
                                            {shown.map((s, i) => (
                                                <div key={i} className="py-1.5 border-b border-white/5 text-surface-200 text-sm">
                                                    <AuthoredText text={s} />
                                                </div>
                                            ))}
                                            <div className="mt-3">
                                                <ConfidenceGate onRate={() => {}}>
                                                    <div className="space-y-1.5">
                                                        {hidden.map((s, i) => (
                                                            <div key={i} className="py-1.5 border-b border-emerald-500/20 text-emerald-100 text-sm">
                                                                <AuthoredText text={s} />
                                                            </div>
                                                        ))}
                                                        {ex.answer && (
                                                            <div className="mt-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm">
                                                                <AuthoredText text={ex.answer} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </ConfidenceGate>
                                            </div>
                                        </Card>
                                    )
                                })()}

                                {tryRung === 1 && examples.length <= 1 && (
                                    <Card label="Finish it" tone="amber">
                                        <p className="text-sm text-surface-400">Only one worked example here — it's the full set below.</p>
                                    </Card>
                                )}

                                {tryRung === 2 && (
                                    <Card label="All worked examples" tone="emerald">
                                        <WorkedExampleFading nodeId={nodeId} rawText={topic.examples!} />
                                    </Card>
                                )}
                            </div>
                        )}

                        {/* ══ CHECK — authored diagnostics, miss → inline fix ══ */}
                        {stage === 'check' && !done && (
                            <div className="space-y-5">
                                <QuickQuiz nodeId={nodeId} subject={topic.subject} />
                            </div>
                        )}

                        {/* ══ RECALL — free retrieval before mastery.
                            The strongest single study technique: blank-page
                            recall forces the brain to rebuild the concept,
                            THEN self-score against the authored criteria. ══ */}
                        {stage === 'recall' && !done && (
                            <RecallStage
                                title={topic.title}
                                criteria={topic.mastery_criteria!}
                                onDone={next}
                            />
                        )}

                        {/* ══ MASTER ══ */}
                        {stage === 'master' && !done && (
                            <div className="space-y-5">
                                {topic.mastery_criteria && (
                                    <Card label="You own this when you can" tone="amber">
                                        <ChunkedText text={topic.mastery_criteria} />
                                    </Card>
                                )}
                                {topic.cognitive_level && <Chip dim>Board level: {topic.cognitive_level}</Chip>}
                                {forward.length > 0 && (
                                    <div className="space-y-2">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-surface-500">Unlocks next</p>
                                        {forward.slice(0, 4).map(f => (
                                            <button key={f.node_id} onClick={() => router.push(`/learn/${f.node_id}`)}
                                                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all group">
                                                <span className="text-sm text-surface-200">{f.name || 'Next topic'}</span>
                                                <ChevronRight className="w-4 h-4 text-surface-500 group-hover:text-indigo-400" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ══ DONE ══ */}
                        {done && (
                            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="text-center py-10 space-y-5">
                                <motion.div initial={{ rotate: -10, scale: 0 }} animate={{ rotate: 0, scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                                    className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
                                    <Award className="w-10 h-10 text-white" />
                                </motion.div>
                                <div>
                                    <h2 className="text-3xl font-display font-bold text-surface-50">Node cleared.</h2>
                                    <p className="text-surface-400 mt-1">+{XP_PER_STAGE * stages.length} XP · {topic.title} is yours now.</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                                    {forward[0] && (
                                        <button onClick={() => router.push(`/learn/${forward[0].node_id}`)}
                                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25">
                                            Keep going →
                                        </button>
                                    )}
                                    <button onClick={() => router.push('/learn')}
                                        className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-surface-300">
                                        Back to topics
                                    </button>
                                </div>
                                {/* Did this help? — one-tap signal feeding the content-quality view.
                                    Raw signal, no judgement; aggregated across students it flags thin
                                    nodes that need a rewrite. */}
                                <HelpfulVote nodeId={nodeId} />
                                {/* READ-AHEAD: pin the next node's lesson so it opens instantly —
                                    and survives offline. */}
                                {forward[0] && <PrefetchNext nodeId={forward[0].node_id} />}
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── stuck panel — inline simplify, never re-reads ── */}
            <AnimatePresence>
                {stuckOpen && !done && (
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
                        className="fixed bottom-[120px] inset-x-0 z-30 px-4">
                        <div className="max-w-3xl mx-auto p-4 rounded-2xl glass-strong border border-white/10 shadow-2xl space-y-3">
                            <p className="text-sm font-semibold text-surface-200 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-amber-300" /> Stuck? Pick your way in:
                            </p>
                            <div className="grid sm:grid-cols-3 gap-2">
                                {topic.eli5 && stages.includes('hook') && stage !== 'hook' && (
                                    <StuckBtn label="Explain it simpler" onClick={() => { goTo(stages.indexOf('hook')); setStuckOpen(false) }} />
                                )}
                                {sims.length > 0 && stages.includes('see') && stage !== 'see' && (
                                    <StuckBtn label="Show me the visual" onClick={() => { goTo(stages.indexOf('see')); setStuckOpen(false) }} />
                                )}
                                {prereqs.length > 0 && (
                                    <StuckBtn label={`The piece before this`} onClick={() => router.push(`/learn/${prereqs[0].node_id}`)} />
                                )}
                            </div>
                            <p className="text-[11px] text-surface-500">Or ask a specific doubt below — type, math, or photo.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── footer ── */}
            <div className="fixed bottom-0 inset-x-0 z-20 backdrop-blur-xl bg-surface-950/85 border-t border-white/5">
                <div className="max-w-3xl mx-auto px-4 py-3 space-y-2">
                    <AnimatePresence>
                        {(askOpen || askSent) && !done && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                {askSent
                                    ? <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">Doubt sent — keep going, the tutor will pick it up.</div>
                                    : <AskBar onAsk={onAsk} placeholder="Doubt? Type it, tap Σ for math, or snap a photo…" />}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="flex items-center gap-2">
                        <button onClick={back} disabled={stageIdx === 0}
                            className="h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-surface-300 text-sm disabled:opacity-30">
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button onClick={() => { setStuckOpen(o => !o); setAskOpen(false) }}
                            className={`h-11 px-4 rounded-xl border text-sm flex items-center gap-1.5 transition-colors ${stuckOpen ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' : 'bg-white/5 border-white/10 text-surface-300'}`}>
                            <HelpCircle className="w-4 h-4" /> Stuck
                        </button>
                        <button onClick={() => { setAskOpen(o => !o); setStuckOpen(false) }}
                            className={`h-11 px-4 rounded-xl border text-sm flex items-center gap-1.5 transition-colors ${askOpen ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' : 'bg-white/5 border-white/10 text-surface-300'}`}>
                            <MessageCircleQuestion className="w-4 h-4" /> Ask
                        </button>
                        <motion.button whileTap={{ scale: 0.97 }} onClick={next} disabled={(stage === 'probe' && !probeAnswered) || done}
                            className="flex-1 h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-40">
                            {done ? 'Done' : last ? 'Finish node' : 'Continue'}
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
}

/** Free recall: write what you remember, then honestly self-check the
 *  mastery criteria. Honest "not yet" flags the topic as a gap rather
 *  than silently passing — better a self-reported gap than false mastery. */
function RecallStage({ title, criteria, onDone }: { title: string; criteria: string; onDone: () => void }) {
    const [brain, setBrain] = useState('')
    const [revealed, setRevealed] = useState(false)
    const [checks, setChecks] = useState<boolean[]>([])
    // TEACH-A-FRIEND: after recall, "explain it to a 5-year-old" — the
    // Feynman-technique check; if you can't simplify it, you don't own it.
    const [teachMode, setTeachMode] = useState(false)
    const [teachText, setTeachText] = useState('')
    // split criteria into checklist lines (bullets, sentences)
    const items = useMemo(
        () => criteria.split(/\n|(?<=[.!?])\s+/).map(s => s.trim().replace(/^[-*•]\s*/, '')).filter(s => s.length > 8),
        [criteria]
    )
    const claimed = checks.filter(Boolean).length
    const allGood = items.length === 0 || claimed === items.length
    return (
        <div className="space-y-5">
            <Card label="Empty your head — don't scroll back" tone="violet">
                <p className="text-sm text-surface-400 mb-3">
                    Without looking, write everything you remember about <span className="text-surface-200 font-medium">{title}</span>.
                    Missing pieces are fine — that's the whole point.
                </p>
                <textarea value={brain} onChange={e => setBrain(e.target.value)}
                    placeholder="I remember that…"
                    className="w-full h-32 rounded-xl bg-white/[0.04] border border-white/10 p-3 text-sm text-surface-100 placeholder:text-surface-600 focus:border-violet-500/50 focus:outline-none resize-none" />
                <button onClick={() => { setRevealed(true); setChecks(new Array(items.length).fill(false)) }}
                    disabled={brain.trim().length < 10}
                    className="mt-3 w-full py-2.5 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-300 text-sm font-medium disabled:opacity-40">
                    I wrote what I remember — show the checklist
                </button>
            </Card>
            {revealed && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                    <Card label="Now check yourself — did you actually say each one?" tone="amber">
                        <div className="space-y-2">
                            {items.map((it, i) => (
                                <button key={i} onClick={() => setChecks(c => c.map((v, j) => j === i ? !v : v))}
                                    className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left text-sm transition-all ${checks[i] ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-100' : 'bg-white/[0.03] border-white/10 text-surface-300'}`}>
                                    <span className={`mt-0.5 w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 ${checks[i] ? 'bg-emerald-500 border-emerald-500' : 'border-white/30'}`}>
                                        {checks[i] && <CheckCircle2 className="w-3 h-3 text-white" />}
                                    </span>
                                    {it}
                                </button>
                            ))}
                        </div>
                        <button onClick={() => { if (!teachMode) { setTeachMode(true) } else { onDone() } }} disabled={!allGood || (teachMode && teachText.trim().length < 20)}
                            className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white text-sm font-semibold disabled:opacity-40">
                            {!allGood
                                ? `Check every item you honestly recalled (${claimed}/${items.length})`
                                : teachMode
                                ? 'I taught it back →'
                                : 'I recalled it — now teach it to a friend →'}
                        </button>
                        {teachMode && (
                            <div className="mt-3 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                                <p className="text-xs font-semibold text-indigo-300 mb-2">Explain it like you&apos;re teaching a younger student — small words, no jargon:</p>
                                <textarea value={teachText} onChange={e => setTeachText(e.target.value)}
                                    placeholder="Imagine a friend who never heard of this. Tell them what it is in 3 sentences…"
                                    className="w-full h-24 rounded-xl bg-white/[0.04] border border-white/10 p-3 text-sm text-surface-100 placeholder:text-surface-600 focus:border-indigo-500/50 focus:outline-none resize-none" />
                                <p className="mt-1 text-[10px] text-surface-600">If you can&apos;t explain it simply, the concept isn&apos;t yours yet — that&apos;s the test.</p>
                            </div>
                        )}
                        {!allGood && checks.some(Boolean) && (
                            <p className="mt-2 text-xs text-amber-300/80">Honest gaps are fine — go back a stage and fill them before finishing.</p>
                        )}
                    </Card>
                </motion.div>
            )}
        </div>
    )
}

function StuckBtn({ label, onClick }: { label: string; onClick: () => void }) {
    return (
        <button onClick={onClick}
            className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-sm text-left hover:bg-amber-500/15 transition-colors">
            {label}
        </button>
    )
}

function Card({ label, tone, children }: { label: string; tone: 'indigo' | 'violet' | 'emerald' | 'amber'; children: React.ReactNode }) {
    const tones = {
        indigo: 'border-indigo-500/20 bg-indigo-500/[0.06] text-indigo-300',
        violet: 'border-violet-500/20 bg-violet-500/[0.06] text-violet-300',
        emerald: 'border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300',
        amber: 'border-amber-500/20 bg-amber-500/[0.06] text-amber-300',
    }[tone]
    return (
        <div className={`p-5 rounded-2xl border ${tones.split(' ').slice(0, 2).join(' ')}`}>
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${tones.split(' ')[2]}`}>{label}</p>
            <div className="text-surface-100 text-[15px] leading-relaxed">{children}</div>
        </div>
    )
}

function Chip({ children, accent, dim }: { children: React.ReactNode; accent?: boolean; dim?: boolean }) {
    return (
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${accent ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300' : dim ? 'bg-white/[0.03] border-white/10 text-surface-500' : 'bg-white/5 border-white/10 text-surface-300'}`}>
            {children}
        </span>
    )
}

/** One-tap content-quality signal — POSTs /api/progress/helpful. */
function HelpfulVote({ nodeId }: { nodeId: string }) {
    const [voted, setVoted] = useState<null | boolean>(null)
    const vote = (helpful: boolean) => {
        setVoted(helpful)
        api.post('/api/progress/helpful', { nodeId, helpful }).catch(() => {})
    }
    if (voted !== null) {
        return <p className="text-xs text-surface-500">{voted ? 'Thanks — glad it landed.' : 'Noted — we\'ll improve this node.'}</p>
    }
    return (
        <div className="flex items-center justify-center gap-2 text-xs text-surface-500">
            <span>Did this topic help?</span>
            <button onClick={() => vote(true)} className="px-2 py-1 rounded-lg bg-white/5 hover:bg-mint-500/20 hover:text-mint-300 transition-colors">👍 Yes</button>
            <button onClick={() => vote(false)} className="px-2 py-1 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-300 transition-colors">👎 No</button>
        </div>
    )
}

/** Prefetch the next node's lesson so it opens instantly (and offline). */
function PrefetchNext({ nodeId }: { nodeId: string }) {
    useEffect(() => {
        // Warm the fetch cache for the node payload; cheap, fire-and-forget.
        fetch(`/api/content/nodes/${encodeURIComponent(nodeId)}`).catch(() => {})
    }, [nodeId])
    return null
}
