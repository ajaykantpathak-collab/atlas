'use client'

/**
 * WorkedExampleFading — the classic scaffolded-example sequence:
 *
 *   Stage 1 "Guided"     — problem + every step + reasoning (fully worked)
 *   Stage 2 "Fading"     — early steps shown, later steps hidden; the
 *                          student must finish the solution, revealing
 *                          steps one at a time if stuck
 *   Stage 3 "On your own" — bare problem; solution available behind a
 *                          deliberate "peek" disclosure
 *
 * Every corpus node carries exactly 3 authored worked problems, which
 * map naturally onto the three fading stages. Data comes from
 * GET /api/content/nodes/{id}/scaffold — all content is authored
 * corpus text; nothing is generated.
 */
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Eye, EyeOff, Lightbulb, ChevronRight } from 'lucide-react'
import { api } from '@/lib/api'

interface ScaffoldedExample {
  problem: string
  steps: string[]
  reasoning: string
}

type Stage = 'guided' | 'fading' | 'independent'

const STAGES: { id: Stage; label: string; hint: string }[] = [
  { id: 'guided', label: 'Watch it solved', hint: 'Follow every step' },
  { id: 'fading', label: 'Finish it yourself', hint: 'Steps fade — complete the rest' },
  { id: 'independent', label: 'On your own', hint: 'Just the problem' },
]

export function WorkedExampleFading({ nodeId, rawText }: { nodeId: string; rawText?: string | null }) {
  const [examples, setExamples] = useState<ScaffoldedExample[]>([])
  const [state, setState] = useState<'loading' | 'ready' | 'empty'>('loading')
  const [stage, setStage] = useState<Stage>('guided')
  const [revealed, setRevealed] = useState(0)
  const [peeked, setPeeked] = useState(false)

  useEffect(() => {
    setState('loading')
    setStage('guided')
    setRevealed(0)
    setPeeked(false)
    api.get<{ examples: ScaffoldedExample[] }>(
      `/api/content/nodes/${encodeURIComponent(nodeId)}/scaffold`
    )
      .then((d) => {
        setExamples(Array.isArray(d?.examples) ? d.examples : [])
        setState('ready')
      })
      .catch(() => setState('empty'))
  }, [nodeId])

  if (state === 'empty' || (state === 'ready' && !examples.length)) {
    // Parse failure / no scaffold — keep the authored text visible.
    if (!rawText) return null
    return (
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-gold-300" />
          <h3 className="font-display text-lg font-semibold text-white">Examples</h3>
        </div>
        <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">{rawText}</p>
      </div>
    )
  }
  if (state === 'loading') {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="h-5 w-40 rounded bg-surface-200/40 mb-4" />
        <div className="h-4 w-full rounded bg-surface-200/40 mb-2" />
        <div className="h-4 w-2/3 rounded bg-surface-200/40" />
      </div>
    )
  }

  const stageIndex = STAGES.findIndex((s) => s.id === stage)
  const ex = examples[Math.min(stageIndex, examples.length - 1)]
  const guidedCount = ex.steps.length
  const fadedVisible = Math.max(1, Math.ceil(guidedCount / 2)) + revealed
  const visibleSteps =
    stage === 'guided' ? guidedCount : stage === 'fading' ? fadedVisible : 0
  const hiddenCount = guidedCount - visibleSteps

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-gold-300" />
        <h3 className="font-display text-lg font-semibold text-white">
          Worked Examples
        </h3>
      </div>

      {/* Stage picker */}
      <div className="grid grid-cols-3 gap-2 mb-5" role="tablist" aria-label="Example stages">
        {STAGES.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={stage === s.id}
            onClick={() => { setStage(s.id); setRevealed(0); setPeeked(false) }}
            className={`rounded-xl px-3 py-2.5 text-left transition-all border ${
              stage === s.id
                ? 'border-gold-500/50 bg-gold-500/10'
                : 'border-surface-300/30 bg-surface-100/40 hover:border-surface-300/60'
            }`}
          >
            <p className={`text-xs font-semibold ${stage === s.id ? 'text-gold-300' : 'text-white'}`}>
              {s.label}
            </p>
            <p className="text-[10px] text-surface-600 mt-0.5">{s.hint}</p>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {/* Problem — always visible */}
          <div className="rounded-xl border border-brand-500/25 bg-brand-500/5 p-4 mb-4">
            <p className="text-[10px] uppercase tracking-wider text-brand-300 mb-1.5">Problem</p>
            <p className="text-sm text-surface-800 leading-relaxed whitespace-pre-wrap">
              {ex.problem}
            </p>
          </div>

          {/* Steps */}
          {visibleSteps > 0 && (
            <ol className="space-y-2 mb-4" aria-label="Solution steps">
              {ex.steps.slice(0, visibleSteps).map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex gap-3 text-sm"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-surface-200/60 border border-surface-300/40 flex items-center justify-center text-[11px] font-semibold text-brand-300">
                    {i + 1}
                  </span>
                  <span className="text-surface-800 leading-relaxed pt-0.5 whitespace-pre-wrap">
                    {step}
                  </span>
                </motion.li>
              ))}
            </ol>
          )}

          {/* Faded steps — student reveals them */}
          {stage === 'fading' && hiddenCount > 0 && (
            <div className="space-y-2 mb-4">
              {Array.from({ length: hiddenCount }).map((_, i) => {
                const stepNo = visibleSteps + i + 1
                return (
                  <button
                    key={stepNo}
                    onClick={() => setRevealed((r) => r + 1)}
                    className="w-full flex items-center gap-3 rounded-lg border border-dashed border-surface-300/50 bg-surface-100/30 px-3 py-2.5 text-left hover:border-gold-500/40 transition-colors"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-surface-200/40 border border-surface-300/30 flex items-center justify-center text-[11px] font-semibold text-surface-600">
                      {stepNo}
                    </span>
                    <span className="text-xs text-surface-600 italic flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" /> Stuck? Reveal this step
                    </span>
                  </button>
                )
              })}
            </div>
          )}

          {/* Independent stage — peek disclosure */}
          {stage === 'independent' && (
            <div className="mb-4">
              <button
                onClick={() => setPeeked((p) => !p)}
                className="flex items-center gap-2 text-xs text-surface-600 hover:text-gold-300 transition-colors"
                aria-expanded={peeked}
              >
                {peeked ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {peeked ? 'Hide the solution' : 'Peek at the solution'}
                <ChevronRight className={`w-3 h-3 transition-transform ${peeked ? 'rotate-90' : ''}`} />
              </button>
              {peeked && (
                <ol className="space-y-2 mt-3">
                  {ex.steps.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-surface-200/60 border border-surface-300/40 flex items-center justify-center text-[11px] font-semibold text-brand-300">
                        {i + 1}
                      </span>
                      <span className="text-surface-800 leading-relaxed pt-0.5 whitespace-pre-wrap">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}

          {/* Reasoning — visible in guided + once peeked/finished */}
          {ex.reasoning && (stage === 'guided' || peeked || (stage === 'fading' && hiddenCount === 0)) && (
            <div className="rounded-xl border border-surface-300/30 bg-surface-100/30 p-4">
              <p className="text-[10px] uppercase tracking-wider text-surface-600 mb-1.5 flex items-center gap-1.5">
                <Lightbulb className="w-3 h-3" /> Why this works
              </p>
              <p className="text-sm text-surface-700 leading-relaxed whitespace-pre-wrap">
                {ex.reasoning}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
