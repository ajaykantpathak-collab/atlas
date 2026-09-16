'use client'

/**
 * sims_browser/SimCard — one gallery tile for a simulation.
 * Black + gold glass card with a subject-colored accent bar, real counts
 * only ("Teaches N topics" = nodeIds length, chapters = distinct chapters
 * in those node ids) and a gold hover glow. Pure presentational.
 */

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Layers } from 'lucide-react'
import type { SimMeta } from '@/components/sims_v2/lite'
import { chapterCount, subjectIdentity } from './subjectTheme'

interface SimCardProps {
    sim: SimMeta
    /** mean bestScore across the sim's nodes, 0-100 (0 hides the bar) */
    progress?: number
    /** student has a saved checkpoint for this sim */
    resume?: boolean
    /** position inside the rendered chunk — drives the entrance stagger */
    index?: number
}

export default function SimCard({ sim, progress = 0, resume = false, index = 0 }: SimCardProps) {
    const subj = subjectIdentity(sim.s)
    const topics = sim.n?.length ?? 0
    const chapters = chapterCount(sim.n ?? [], sim.ch)

    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: (index % 48) * 0.012, ease: 'easeOut' }}
            className="h-full"
        >
            <Link
                href={`/sims-v2/${sim.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 pl-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/40 hover:bg-white/[0.06] hover:shadow-[0_12px_44px_-10px_rgba(251,191,36,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
            >
                {/* subject accent bar */}
                <span
                    aria-hidden
                    className="absolute bottom-3 left-0 top-3 w-[3px] rounded-full transition-all duration-300 group-hover:top-2 group-hover:bottom-2"
                    style={{ backgroundColor: subj.color, boxShadow: `0 0 10px ${subj.color}66` }}
                />

                {/* subject + class row */}
                <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/50">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: subj.color }} />
                        <span className="truncate">{subj.label}</span>
                    </span>
                    <span className="shrink-0 rounded-md border border-amber-400/25 bg-amber-400/10 px-1.5 py-0.5 text-[10px] font-black text-amber-300">
                        Class {sim.c}
                    </span>
                </div>

                {/* title + hook */}
                <h3 className="line-clamp-2 font-display text-[15px] font-bold leading-snug text-white transition-colors group-hover:text-amber-100">
                    {sim.t}
                </h3>
                {sim.d && (
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/45">{sim.d}</p>
                )}

                {/* real coverage counts */}
                <div className="mt-auto pt-3">
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-white/55">
                        <span className="flex items-center gap-1 text-amber-200/80" title="official topic nodes covered">
                            <BookOpen size={12} /> Teaches {topics} topic{topics === 1 ? '' : 's'}
                        </span>
                        <span className="flex items-center gap-1" title="chapters covered">
                            <Layers size={12} /> {chapters} chapter{chapters === 1 ? '' : 's'}
                        </span>
                        {resume && (
                            <span className="ml-auto shrink-0 rounded-full border border-amber-400/40 bg-amber-400/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-amber-300">
                                ▶ Resume
                            </span>
                        )}
                    </div>

                    {progress > 0 && (
                        <div className="mt-2 flex items-center gap-2">
                            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${progress >= 70 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className="w-7 text-right text-[10px] font-black text-white/50">{progress}%</span>
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    )
}
