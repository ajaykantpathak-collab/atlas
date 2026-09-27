'use client'

/**
 * StudySession parts — the feel-layer primitives.
 *
 *   ChunkedText    — long authored text split into tap-to-reveal idea cards
 *                    (struggling students get one idea at a time, never a wall)
 *   ConfidenceGate — "how sure are you?" before the answer reveals
 *   CoachLine      — one orienting sentence per stage
 *   XpPulse        — the floating +XP micro-reward
 *   StuckPanel     — inline "I'm lost" help (simplify / visual / mistake)
 */
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Eye, ChevronDown, ChevronUp } from 'lucide-react'
import AuthoredText from '@/components/learn/AuthoredText'
import { speechManager } from '@/lib/sim-engine'

const ease = [0.16, 1, 0.3, 1] as const

/* ── ChunkedText ────────────────────────────────────────────────
   Splits authored prose into sentence groups; each card starts
   collapsed to a faint blur line — tap to reveal. Turns a wall of
   definition into a sequence of wins. */
export function ChunkedText({ text, groupSize = 1 }: { text: string; groupSize?: number }) {
    const chunks = useMemo(() => {
        // split on sentence ends but keep abbreviations safe-ish
        const sents = text.replace(/\s+/g, ' ').split(/(?<=[.;:])\s+(?=[A-Z(0-9"'])/)
        const groups: string[] = []
        for (let i = 0; i < sents.length; i += groupSize) {
            groups.push(sents.slice(i, i + groupSize).join(' '))
        }
        return groups.filter(Boolean)
    }, [text, groupSize])
    const [open, setOpen] = useState(0) // reveal progressively, in order
    const [allOpen, setAllOpen] = useState(false)

    if (chunks.length <= 2) {
        return <AuthoredText text={text} />
    }

    return (
        <div className="space-y-2">
            {chunks.map((c, i) => {
                const revealed = allOpen || i <= open
                return (
                    <div key={i} className="relative">
                        <motion.div
                            initial={false}
                            animate={{ filter: revealed ? 'blur(0px)' : 'blur(4px)', opacity: revealed ? 1 : 0.35 }}
                            transition={{ duration: 0.3 }}
                            className="select-none"
                        >
                            <AuthoredText text={c} />
                        </motion.div>
                        {!revealed && (
                            <button
                                onClick={() => setOpen(i)}
                                className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-indigo-300/80 hover:text-indigo-200"
                            >
                                tap to reveal · {i + 1}/{chunks.length}
                            </button>
                        )}
                        {revealed && (
                            <button
                                onClick={() => speechManager.speak(c.replace(/[*_`#|]/g, ''))}
                                className="absolute -right-1 top-0 p-1.5 text-surface-500 hover:text-indigo-300 opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity"
                                aria-label="Listen" title="Listen"
                            >
                                <Volume2 className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </div>
                )
            })}
            {!allOpen && open < chunks.length - 1 && (
                <button onClick={() => setAllOpen(true)}
                    className="text-[11px] text-surface-500 hover:text-surface-300 flex items-center gap-1">
                    <ChevronDown className="w-3 h-3" /> show all
                </button>
            )}
            {allOpen && chunks.length > 3 && (
                <button onClick={() => { setAllOpen(false); setOpen(0) }}
                    className="text-[11px] text-surface-500 hover:text-surface-300 flex items-center gap-1">
                    <ChevronUp className="w-3 h-3" /> re-chunk
                </button>
            )}
        </div>
    )
}

/* ── ConfidenceGate ─────────────────────────────────────────────
   Before revealing an answer: "how sure?" — the calibration habit
   that separates recognizing from knowing. */
export function ConfidenceGate({ onRate, children }: { onRate: (c: 'unsure' | 'half' | 'sure') => void; children: React.ReactNode }) {
    const [rated, setRated] = useState<'unsure' | 'half' | 'sure' | null>(null)
    if (!rated) {
        return (
            <div className="space-y-2">
                <p className="text-xs font-semibold text-surface-400">Before you peek — how sure are you?</p>
                <div className="flex gap-2">
                    {([['unsure', 'Not sure', 'bg-red-500/10 border-red-500/25 text-red-300'],
                    ['half', 'Kind of', 'bg-amber-500/10 border-amber-500/25 text-amber-300'],
                    ['sure', 'Got it', 'bg-emerald-500/10 border-emerald-500/25 text-emerald-300']] as const).map(([k, l, cls]) => (
                        <button key={k}
                            onClick={() => { setRated(k); onRate(k) }}
                            className={`flex-1 py-2.5 rounded-xl border text-sm font-medium ${cls} hover:brightness-125 transition-all`}>
                            {l}
                        </button>
                    ))}
                </div>
            </div>
        )
    }
    return <>{children}</>
}

/* ── CoachLine ── one orienting sentence per stage */
export function CoachLine({ icon: Icon, children }: { icon: any; children: React.ReactNode }) {
    return (
        <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-5 text-indigo-300/90 text-sm">
            <Icon className="w-4 h-4 shrink-0" />
            <span>{children}</span>
        </motion.div>
    )
}

/* ── XpPulse ── floating reward */
export function XpPulse({ n, amount }: { n: number; amount: number }) {
    return (
        <AnimatePresence>
            {n > 0 && (
                <motion.div key={n}
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{ opacity: 1, y: -40, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease }}
                    className="fixed bottom-40 right-6 z-40 flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-sm"
                >
                    ⚡ +{amount} XP
                </motion.div>
            )}
        </AnimatePresence>
    )
}
