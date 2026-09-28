'use client'

/**
 * HistTimeline.tsx — the 📜 Timeline & Civics tab of /sandbox (engine E6
 * of SANDBOX_TAXONOMY.md: Timeline & Causal-Chain Explorer, plus the civics
 * E4 sims from CivicsSim.tsx).
 *
 * Closed-world loop, same contract as the physics/maths sandboxes:
 *   - every event, date and cause→effect link comes from the authored
 *     cisce_nodes_v2 histciv corpus (histcivTopics.ts — classes 6-10);
 *   - the student drags events onto the date axis (SequenceSim) or causes
 *     onto effects (PairingSim);
 *   - a WRONG placement injects the chapter node's AUTHORED misconception
 *     content through MisconceptionPanel (remediation.ts fetchEnrichment —
 *     honest degradation, never invented text);
 *   - completed activities are marked in localStorage progress.
 *
 * NOTE: this tab is wired centrally in app/(student)/sandbox/page.tsx
 * post-hoc — do not edit that file from this component. Central wiring
 * uses the exported HISTCIV_TAB config below.
 */
import { useCallback, useEffect, useState } from 'react'
import { History, GitBranch, Landmark } from 'lucide-react'
import {
  HISTCIV_SANDBOX_CLASSES, TOTAL_HISTCIV_CHAPTERS,
  type HistCivBand, type HistCivChapter,
} from './histcivTopics'
import {
  CIVICS_SIMS, type CivicsSimKey,
  SequenceSim, PairingSim,
} from './CivicsSim'
import CivicsSim from './CivicsSim'

type Mode = 'timeline' | 'chain' | 'civics'

const MODES: { key: Mode; label: string; icon: typeof History }[] = [
  { key: 'timeline', label: 'Timeline builder', icon: History },
  { key: 'chain', label: 'Causal chains', icon: GitBranch },
  { key: 'civics', label: 'Civics sims', icon: Landmark },
]

const PROGRESS_KEY = 'histciv_sandbox_explored_v1'
const CIVICS_ACTIVITY_PREFIX = 'civics:'

/** Total gradeable activities: 2 per history chapter + the civics sims. */
const TOTAL_ACTIVITIES =
  TOTAL_HISTCIV_CHAPTERS * 2 + CIVICS_SIMS.length

export default function HistCivSandbox() {
  const [bandKey, setBandKey] = useState('c10')
  const [chapterKey, setChapterKey] = useState('c10_mass')
  const [chapter, setChapter] = useState<HistCivChapter | null>(null)
  const [mode, setMode] = useState<Mode>('timeline')
  const [civSim, setCivSim] = useState<CivicsSimKey>('preamble')
  const [explored, setExplored] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const arr = JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '[]')
      if (Array.isArray(arr)) setExplored(new Set(arr))
    } catch { /* fresh start */ }
  }, [])

  const markExplored = useCallback((k: string) => {
    setExplored(prev => {
      if (prev.has(k)) return prev
      const next = new Set(prev).add(k)
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify([...next])) } catch { }
      return next
    })
  }, [])

  const band: HistCivBand = HISTCIV_SANDBOX_CLASSES.find(b => b.key === bandKey)
    ?? HISTCIV_SANDBOX_CLASSES[0]
  const activeChapter: HistCivChapter = band.chapters.find(c => c.key === chapterKey)
    ?? band.chapters[0]

  // keep the resolved chapter in state so completed-activity callbacks can
  // key progress to the chapter the student is actually playing
  useEffect(() => { setChapter(activeChapter) }, [activeChapter])

  const pickChapter = (c: HistCivChapter) => {
    setChapterKey(c.key)
    setChapter(c)
  }

  const tlKey = `${activeChapter.key}:tl`
  const chainKey = `${activeChapter.key}:chain`
  const civicsDone = (sim: CivicsSimKey) => markExplored(`${CIVICS_ACTIVITY_PREFIX}${sim}`)

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden">
      {/* header: class + chapter pickers, progress chip */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <h2 className="font-black text-lg text-white">
            📜 Timeline &amp; Civics Sandbox
            <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              date axis · causal chains · constitution · elections
            </span>
          </h2>
          <span className="text-[10px] font-black text-emerald-300/80">
            explored {explored.size}/{TOTAL_ACTIVITIES} activities
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap mb-1.5">
          {HISTCIV_SANDBOX_CLASSES.map(b => (
            <button key={b.key}
              onClick={() => { setBandKey(b.key); setChapterKey(b.chapters[0].key); setChapter(b.chapters[0]) }}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition ${b.key === bandKey ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
              {b.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {band.chapters.map(c => (
            <button key={c.key} onClick={() => pickChapter(c)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${c.key === activeChapter.key ? 'bg-amber-500/15 border-amber-400/50 text-amber-200' : explored.has(`${c.key}:tl`) || explored.has(`${c.key}:chain`) ? 'bg-slate-800/60 border-slate-600 text-slate-300 hover:border-slate-400' : 'bg-slate-800/30 border-slate-700/60 text-slate-400 hover:text-slate-200'}`}>
              {explored.has(`${c.key}:tl`) || explored.has(`${c.key}:chain`) ? '✓ ' : ''}{c.label}
            </button>
          ))}
        </div>
      </div>

      {/* mode bar */}
      <div className="flex gap-1 px-3 pt-2.5 border-b border-slate-800 bg-slate-900/40 overflow-x-auto">
        {MODES.map(m => (
          <button key={m.key} onClick={() => setMode(m.key)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold whitespace-nowrap border-b-2 transition ${mode === m.key ? 'border-sky-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
            <m.icon className="w-3.5 h-3.5" />
            {m.label}
          </button>
        ))}
        {mode === 'civics' && (
          <div className="ml-auto flex gap-1 pb-1.5">
            {CIVICS_SIMS.map(s => (
              <button key={s.key} onClick={() => setCivSim(s.key)}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold border transition ${civSim === s.key ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200' : explored.has(`${CIVICS_ACTIVITY_PREFIX}${s.key}`) ? 'bg-slate-800/60 border-slate-600 text-slate-300' : 'bg-slate-800/40 border-slate-700/70 text-slate-400 hover:text-slate-200'}`}>
                <s.icon className="w-3 h-3" />
                {explored.has(`${CIVICS_ACTIVITY_PREFIX}${s.key}`) ? '✓ ' : ''}{s.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
          <span className="font-black text-amber-300">{activeChapter.label}</span>
          {' — '}{activeChapter.blurb}
        </p>
        {mode === 'timeline' && (
          <SequenceSim
            key={`${activeChapter.key}-tl`}
            items={activeChapter.events.map(e => ({ key: e.key, label: e.label, marker: e.date }))}
            nodeId={activeChapter.nodeId}
            title="Build the timeline — drag each event onto its date"
            hint="The axis shows the authored dates; the cards are the events. Wrong slot = the chapter node's own misconception opens below."
            doneText={`${activeChapter.label} chronology locked in.`}
            onDone={() => markExplored(tlKey)}
          />
        )}
        {mode === 'chain' && (
          <PairingSim
            key={`${activeChapter.key}-chain`}
            pairs={activeChapter.chain}
            nodeId={activeChapter.nodeId}
            title="Causal chains — drag each cause onto its effect"
            hint="Order is not the game here: CAUSE → EFFECT is. Correct pairs reveal the corpus's own causal link."
            doneText={`${activeChapter.label}: the chain now runs cause-first.`}
            causeLabel="CAUSE — what happened first"
            effectLabel="EFFECT — what it produced"
            onDone={() => markExplored(chainKey)}
          />
        )}
        {mode === 'civics' && (
          <CivicsSim key={civSim} sim={civSim} onDone={() => civicsDone(civSim)} />
        )}
      </div>
    </div>
  )
}

/**
 * Central-wiring config: app/(student)/sandbox/page.tsx adds this tab
 * post-hoc (concurrent agents own that file right now). Shape matches the
 * agreed tab contract: { id, label, component }.
 */
export const HISTCIV_TAB = {
  id: 'histciv',
  label: '📜 Timeline & Civics',
  component: HistCivSandbox,
} as const
