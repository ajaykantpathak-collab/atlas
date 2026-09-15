'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SimPlayer } from '@/components/sims_v2/engine/SimPlayer'
import { loadSimDef } from '@/components/sims_v2/lite'
import { themeFor } from '@/components/sims_v2/engine/theme'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import type { SimAnswerEvent, SimDef } from '@/components/sims_v2/engine/types'

/**
 * /sims-v2/[id] — renders a SimDef through the v3 engine.
 * Senior mode (no mascot, KaTeX) for class ≥6; junior otherwise.
 * Example: /sims-v2/v3_c6_physics_ch11
 */
export default function SimV2Page() {
    const { id } = useParams<{ id: string }>()
    const user = useAuthStore(s => s.user)
    const [def, setDef] = useState<SimDef | null | undefined>(undefined)

    // lazy: pull only this sim's class module (~1/7th the module graph)
    useEffect(() => {
        let live = true
        loadSimDef(decodeURIComponent(id ?? ''))
            .then(d => { if (live) setDef(d as SimDef | null) })
            .catch(() => { if (live) setDef(null) })   // chunk-load failure → "not found", not an infinite spinner
        return () => { live = false }
    }, [id])

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

    if (def === undefined) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <p className="text-sm text-slate-400 animate-pulse font-bold">loading your simulation…</p>
            </div>
        )
    }
    if (!def) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center gap-4">
                <p className="text-lg font-bold">Simulation not found: <code className="text-amber-400">{id}</code></p>
                <Link href="/sims-v2" className="text-sm text-indigo-300 underline">Browse all simulations</Link>
            </div>
        )
    }

    const theme = themeFor(def.subject)
    return (
        <div className={`min-h-screen bg-gradient-to-br ${theme.bg}`}>
            <div className="max-w-3xl mx-auto pt-4 px-4">
                <Link href="/sims-v2" className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white mb-2">
                    <ArrowLeft size={16} /> Back to simulations
                </Link>
            </div>
            <div className="flex justify-center pb-8">
                <SimPlayer
                    def={def}
                    mode={def.classLevel >= 6 ? 'senior' : 'junior'}
                    onEvent={logEvent}
                />
            </div>
        </div>
    )
}
