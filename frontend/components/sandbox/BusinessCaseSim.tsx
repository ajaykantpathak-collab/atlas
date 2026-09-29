'use client'

/**
 * BusinessCaseSim — the Business Studies tab of /sandbox (classes 11-12):
 * the E4 case simulator from HUMANITIES_COMMERCE_PLAN.md §C.
 *
 * One case = one corpus-grounded scenario → 3 sequential decision points.
 * Each option maps to a DETERMINISTIC outcome plus the management principle
 * obeyed/violated (all stored in businessCaseTopics.ts with a per-case
 * corpus grounding map — no content is invented at runtime).
 *
 * A wrong pick opens the MisconceptionPanel with the AUTHORED corpus
 * diagnostics of the decision's node, fetched through the closed-world
 * remediation loop (components/learn/remediation.ts) — exactly the
 * AccountancySandbox pattern. Nodes without authored diagnostics honestly
 * render nothing extra; the per-option teaching always stands alone.
 *
 * Golden-black brand only: slate + amber/gold, emerald for success.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { CheckCircle2, ChevronRight, RotateCcw, Scale } from 'lucide-react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import {
  fetchNodeRemediation, nodeRefLabel, type NodeRemediation,
} from '@/components/learn/remediation'
import {
  BUSINESS_CASES, BUSINESS_CASE_DECISION_TOTAL, type BusinessCase,
  type BusinessDecision,
} from './businessCaseTopics'

const PROGRESS_KEY = 'bs_case_sim_picks_v1'

/** picks: { [caseKey]: { [decisionId]: optionId } } */
type PickMap = Record<string, Record<string, string>>

function loadPicks(): PickMap {
  try {
    const d = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '{}')
    return d && typeof d === 'object' ? d as PickMap : {}
  } catch { return {} }
}

export default function BusinessCaseSim() {
  const [picks, setPicks] = useState<PickMap>({})
  const [caseKey, setCaseKey] = useState<string>(BUSINESS_CASES[0].key)
  const [step, setStep] = useState(0)
  // ---- closed-world misconception state (same loop as AccountancySandbox)
  const [remediation, setRemediation] = useState<NodeRemediation | null>(null)
  const [misconception, setMisconception] = useState<string | null>(null)
  const remediationCache = useRef<Map<string, NodeRemediation | null>>(new Map())

  useEffect(() => { setPicks(loadPicks()) }, [])

  const persist = useCallback((next: PickMap) => {
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(next)) } catch { /* private mode */ }
  }, [])

  const recordPick = useCallback((c: string, d: string, o: string) => {
    setPicks(prev => {
      const next = { ...prev, [c]: { ...(prev[c] ?? {}), [d]: o } }
      persist(next)
      return next
    })
  }, [persist])

  const showMisconceptionFor = useCallback(async (
    nodeId: string | undefined, hint?: string,
  ) => {
    setMisconception(null)
    setRemediation(null)
    if (!nodeId) return
    let rm = remediationCache.current.get(nodeId) ?? null
    if (rm === null && !remediationCache.current.has(nodeId)) {
      try { rm = await fetchNodeRemediation(nodeId) } catch { rm = null }
      remediationCache.current.set(nodeId, rm)
    }
    setRemediation(rm)
    // pick the authored diagnostic whose question matches the decision hint;
    // else the first one carrying a misconception (honest when none do)
    let picked: string | null = null
    const h = hint?.toLowerCase()
    for (const d of rm?.diagnostics || []) {
      if (!d.misconception) continue
      if (h && d.question.toLowerCase().includes(h)) { picked = d.misconception; break }
      if (!picked) picked = d.misconception
    }
    setMisconception(picked)
  }, [remediationCache])

  const dismissMisconception = useCallback(() => {
    setMisconception(null)
    setRemediation(null)
  }, [])

  const chooseCase = (c: BusinessCase) => {
    setCaseKey(c.key)
    setStep(0)
    dismissMisconception()
  }

  const resetProgress = () => {
    try { localStorage.removeItem(PROGRESS_KEY) } catch { /* ignore */ }
    setPicks({})
    setStep(0)
    dismissMisconception()
  }

  const kase = BUSINESS_CASES.find(c => c.key === caseKey) ?? BUSINESS_CASES[0]
  const casePicks = picks[kase.key] ?? {}
  const answeredCount = Object.keys(casePicks).length
  const bestCount = kase.decisions.filter(
    d => casePicks[d.id] === d.options.find(o => o.verdict === 'best')?.id).length
  const allDone = answeredCount === kase.decisions.length

  // current decision: first unanswered, else the last answered (review mode)
  const stepIdx = Math.min(step, kase.decisions.length - 1)
  const decision: BusinessDecision = kase.decisions[stepIdx]
  const pickedId = casePicks[decision.id]
  const picked = decision.options.find(o => o.id === pickedId)
  const bestOption = decision.options.find(o => o.verdict === 'best')

  const pickOption = (optId: string) => {
    if (pickedId) return // deterministic: once answered, stay answered
    recordPick(kase.key, decision.id, optId)
    const opt = decision.options.find(o => o.id === optId)
    if (opt?.verdict === 'wrong') {
      showMisconceptionFor(decision.nodeId, decision.hint)
    } else {
      dismissMisconception()
    }
  }

  const totalResolved = Object.values(picks).reduce(
    (n, m) => n + Object.keys(m).length, 0)

  return (
    <div className="space-y-6">
      {/* header stats */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="text-xs text-slate-400">
          <span className="text-amber-300 font-bold">{totalResolved}</span>
          {' '}of {BUSINESS_CASE_DECISION_TOTAL} management calls taken ·{' '}
          {BUSINESS_CASES.length} cases · every outcome deterministic, every
          principle traceable to its corpus node.
        </div>
        <button onClick={resetProgress}
          data-testid="bs-case-reset"
          className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-[10px] font-bold text-slate-300 hover:border-slate-500">
          <RotateCcw className="w-3 h-3" /> reset progress
        </button>
      </div>

      {/* case picker */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {BUSINESS_CASES.map(c => {
          const done = Object.keys(picks[c.key] ?? {}).length === c.decisions.length
          const best = c.decisions.filter(
            d => (picks[c.key]?.[d.id]) ===
              d.options.find(o => o.verdict === 'best')?.id
          ).length
          return (
            <button key={c.key} data-testid={`bs-case-${c.key}`}
              onClick={() => chooseCase(c)}
              className={`rounded-2xl p-3 text-left border transition ${caseKey === c.key
                ? 'bg-amber-500/15 border-amber-400/60'
                : 'bg-slate-900/60 border-slate-700 hover:border-slate-500'}`}>
              <p className="text-[11px] font-black text-amber-200">
                {c.emoji} {c.title}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">{c.chapter}</p>
              {done && (
                <p className="text-[10px] font-bold text-emerald-300 mt-1">
                  ✓ complete — {best}/{c.decisions.length} corpus-obeying calls
                </p>
              )}
            </button>
          )
        })}
      </div>

      {/* misconception panel (closed-world, authored-only) */}
      <MisconceptionPanel
        misconception={misconception}
        commonMisconception={remediation?.commonMisconception ?? null}
      >
        <button onClick={dismissMisconception}
          className="text-[11px] font-bold text-amber-200 hover:text-amber-100">
          got it — back to the case
        </button>
      </MisconceptionPanel>

      {/* scenario */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
        <div className="flex items-baseline justify-between flex-wrap gap-2">
          <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest">
            {kase.emoji} {kase.title}
          </p>
          <p className="text-[10px] font-bold text-slate-400">{kase.chapter}</p>
        </div>
        <div className="mt-2 space-y-2">
          {kase.scenario.map((p, i) => (
            <p key={i} className="text-sm text-slate-200 leading-relaxed">{p}</p>
          ))}
        </div>
      </div>

      {/* decision stepper */}
      <div className="grid md:grid-cols-[240px_1fr] gap-4">
        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-3">
          <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2">
            decision points
          </p>
          <ol className="space-y-1.5">
            {kase.decisions.map((d, i) => {
              const p = casePicks[d.id]
              const opt = d.options.find(o => o.id === p)
              return (
                <li key={d.id}>
                  <button
                    onClick={() => { setStep(i); dismissMisconception() }}
                    data-testid={`bs-step-${i}`}
                    className={`w-full text-left rounded-xl px-3 py-2 border transition text-[11px] font-bold ${i === stepIdx
                      ? 'bg-slate-700 border-slate-500 text-white'
                      : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-500'}`}>
                    <span className="text-slate-500 mr-1.5">{i + 1}.</span>
                    {d.kind}
                    {opt && (
                      <span className={`block mt-1 text-[10px] font-black ${opt.verdict === 'best' ? 'text-emerald-300' : 'text-gold-300'}`}>
                        {opt.verdict === 'best' ? '✓ principle obeyed' : '✗ principle violated'}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ol>
          {allDone && (
            <div className="mt-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3" data-testid="bs-case-debrief">
              <p className="text-xs font-black text-emerald-300">case closed</p>
              <p className="text-[11px] text-slate-300 mt-1">
                {bestCount}/{kase.decisions.length} corpus-obeying calls. The
                wrong paths stay on the record — each one taught its principle.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
          <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-1">
            call {stepIdx + 1} of {kase.decisions.length} · {decision.kind}
          </p>
          <p className="text-sm font-bold text-white mb-3">{decision.ask}</p>
          <div className="space-y-2">
            {decision.options.map(o => {
              const isPicked = pickedId === o.id
              const revealed = !!pickedId
              const isBest = o.verdict === 'best'
              return (
                <button key={o.id} data-testid={`bs-opt-${decision.id}-${o.id}`}
                  onClick={() => pickOption(o.id)}
                  disabled={revealed}
                  className={`w-full text-left rounded-xl px-3 py-2.5 border transition text-xs font-bold ${revealed
                    ? isPicked
                      ? isBest
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                        : 'bg-gold-500/10 border-gold-500/40 text-amber-200'
                      : isBest
                        ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-200/80'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400'
                    : 'bg-slate-800/60 border-slate-700 text-slate-200 hover:border-amber-500/50'}`}>
                  <span className="flex items-start gap-2">
                    {revealed && (isBest
                      ? <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                      : <Scale className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold-400" />)}
                    <span>{o.label}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* deterministic outcome + principle (corpus-traceable) */}
          {picked && (
            <div className={`mt-3 rounded-xl border p-3 ${picked.verdict === 'best'
              ? 'border-emerald-500/40 bg-emerald-500/10'
              : 'border-gold-500/40 bg-gold-500/10'}`}
              data-testid={`bs-outcome-${decision.id}`}>
              <p className={`text-xs font-black ${picked.verdict === 'best' ? 'text-emerald-300' : 'text-gold-300'}`}>
                {picked.verdict === 'best' ? 'the principled call' : 'the principle bends — here is what happens'}
              </p>
              <p className="text-xs text-slate-200 mt-1.5 leading-relaxed">{picked.outcome}</p>
              <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                <span className="font-black text-slate-300">principle: </span>
                {picked.principle}
              </p>
            </div>
          )}

          {/* next decision */}
          {pickedId && stepIdx < kase.decisions.length - 1 && (
            <button
              onClick={() => { setStep(stepIdx + 1); dismissMisconception() }}
              data-testid="bs-next"
              className="mt-3 flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 transition">
              next decision <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* corpus grounding map in the debrief */}
          {allDone && (
            <div className="mt-3 rounded-xl border border-slate-700 bg-slate-800/40 p-3">
              <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest">
                corpus grounding — everything above traces to these nodes
              </p>
              <ul className="mt-1.5 space-y-1">
                {kase.nodeIds.map(id => (
                  <li key={id} className="text-[11px] text-slate-400 font-mono">
                    {id} <span className="font-sans text-slate-500">({nodeRefLabel(id)})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
