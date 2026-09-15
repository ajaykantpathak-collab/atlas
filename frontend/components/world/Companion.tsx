'use client'

/**
 * Companion — the guide that knows the student. Reads their own telemetry
 * (mastery, checkpoints, streak) and speaks it back warmly. The point is
 * relatedness: something in this world remembers them.
 */
import { useMemo, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import GALAXY from './GALAXY.json'
import LINES from './companion_lines.json'
import { getNodesMastery } from '@/lib/masteryStore'

type GNode = { id: string; cls: number; subj: string; sim: string | null }

/* dialogue bank — pick by state, interpolate {name} {topic} {stars} */
const pick = (arr: string[], vars: Record<string, string | number>) => {
    const s = arr[Math.floor(Math.random() * arr.length)] ?? '';
    return s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}
const greet = (name: string | null) => {
    const h = new Date().getHours()
    const t = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'
    return pick(LINES.greetings[t as keyof typeof LINES.greetings], { name: name ?? 'explorer' })
}

export function Companion({ studentName }: { studentName?: string | null }) {
    const [line, setLine] = useState<{ text: string; cta?: { label: string; href: string } } | null>(null)

    useEffect(() => {
        const nodes = GALAXY.nodes as GNode[]
        const m = getNodesMastery(nodes.map(n => n.id))
        // find their weakest explored node → "revenge" suggestion
        const explored = nodes.filter(n => (m[n.id]?.bestScore ?? 0) > 0)
        const weakest = explored.sort((a, b) => (m[a.id]?.bestScore ?? 0) - (m[b.id]?.bestScore ?? 0))[0]
        // resumable checkpoint?
        let resume: string | null = null
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i)
                if (k?.startsWith('simchk_')) { resume = k.slice(7); break }
            }
        } catch { }
        const mastered = explored.filter(n => (m[n.id]?.bestScore ?? 0) >= 70).length
        const v = { name: studentName ?? 'explorer', stars: mastered, topic: weakest?.id.replace(/_/g, ' ') ?? '' }

        if (resume) {
            setLine({ text: `You left a simulation mid-mission last time. Want to pick it back up?`,
                cta: { label: '▶ Resume', href: `/sims-v2/${resume}` } })
        } else if (weakest && (m[weakest.id]?.bestScore ?? 0) < 50) {
            setLine({ text: pick(LINES.struggle_recall, v),
                cta: weakest.sim ? { label: '⚔️ Revenge run', href: `/sims-v2/${weakest.sim}` } : undefined })
        } else if (mastered === 0) {
            setLine({ text: pick(explored.length ? LINES.nudge : LINES.first_visit, v),
                cta: { label: '🚀 Start exploring', href: '/sims-v2' } })
        } else {
            setLine({ text: pick(LINES.celebration, v) })
        }
    }, [])

    if (!line) return null
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 right-6 max-w-xs pointer-events-auto">
                <div className="flex items-end gap-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(129,140,248,0.5)] shrink-0">
                        🦉
                    </div>
                    <div className="bg-slate-900/95 border border-indigo-400/40 rounded-2xl rounded-bl-sm px-4 py-3 shadow-2xl backdrop-blur">
                        <p className="text-[10px] font-black text-indigo-300 uppercase tracking-widest mb-1">{greet(studentName ?? null)}</p>
                        <p className="text-sm font-bold text-white leading-snug">{line.text}</p>
                        {line.cta && (
                            <Link href={line.cta.href}
                                className="inline-block mt-2 px-3 py-1.5 rounded-xl bg-indigo-500 text-white text-xs font-black hover:bg-indigo-400 transition">
                                {line.cta.label}
                            </Link>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
