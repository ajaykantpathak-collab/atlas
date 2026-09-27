'use client'

/**
 * InlineSim — embeds a simulation directly inside the teach step
 * ("see it happen") instead of sending the student to /sims-v2.
 *
 * The SimDef chunk loads lazily on first expand so the learn page
 * doesn't pay the sim-engine cost until the student asks for it.
 * Telemetry mirrors the /sims-v2/[id] page — answer events feed the
 * same /api/intelligence/interaction stream.
 */
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FlaskConical, Loader2, Minimize2 } from 'lucide-react'
import { SimPlayer } from '@/components/sims_v2/engine/SimPlayer'
import { loadSimDef } from '@/components/sims_v2/lite'
import type { SimDef } from '@/components/sims_v2/engine/types'
import type { SimAnswerEvent } from '@/components/sims_v2/engine/types'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'

export function InlineSim({ simId, title }: { simId: string; title: string }) {
  const user = useAuthStore((s) => s.user)
  const [open, setOpen] = useState(false)
  const [def, setDef] = useState<SimDef | null>(null)
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')

  const expand = async () => {
    setOpen(true)
    if (def || state === 'loading') return
    setState('loading')
    try {
      const d = await loadSimDef(simId)
      setDef((d as SimDef | null) ?? null)
      setState(d ? 'ready' : 'error')
    } catch {
      setState('error')
    }
  }

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

  return (
    <div className="rounded-xl border border-brand-500/25 bg-brand-500/5 overflow-hidden">
      <button
        onClick={() => (open ? setOpen(false) : expand())}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-brand-500/10 transition-colors"
        aria-expanded={open}
      >
        <FlaskConical className="w-4 h-4 text-brand-300 flex-shrink-0" />
        <span className="flex-1 min-w-0">
          <span className="block text-sm font-semibold text-white">See it happen — {title}</span>
          <span className="block text-[11px] text-surface-600">
            Interactive simulation, right here on this page
          </span>
        </span>
        {open ? (
          <Minimize2 className="w-4 h-4 text-surface-600 flex-shrink-0" />
        ) : (
          <span className="text-xs font-semibold text-brand-300 flex-shrink-0">Open</span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3">
              {state === 'loading' && (
                <div className="flex items-center justify-center gap-2 py-10 text-surface-600 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading simulation…
                </div>
              )}
              {state === 'error' && (
                <p className="py-8 text-center text-xs text-surface-600">
                  This simulation couldn't load inline — open it from the launcher below instead.
                </p>
              )}
              {state === 'ready' && def && (
                <div className="rounded-lg overflow-hidden bg-black/20">
                  <SimPlayer
                    def={def}
                    mode={def.classLevel >= 6 ? 'senior' : 'junior'}
                    onEvent={logEvent}
                  />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
