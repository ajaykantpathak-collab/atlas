'use client'

/**
 * BiologySandbox — the biology/biotech tab of /sandbox.
 *
 * Engine mix per SANDBOX_TAXONOMY.md: biology is visualization-heavy and
 * solver-thin, and that is honest.  The tabs:
 *
 *   Solve & explain  POST /api/sandbox/solve subject="biology" ->
 *                    biology_families.py deterministic families
 *   Cell 3D          E-Organism/Cell Explorer: plant/animal/prokaryote
 *                    toggle, click any organelle -> authored function +
 *                    authored corpus content (fetchEnrichment)
 *   Punnett bench    E1-lite: parent genotypes -> solver cross grid +
 *                    ratios; the dominant-not-common trap opens the
 *                    authored Mendel misconception
 *   Food web         10% law energy chips -> solver breakdown; removing a
 *                    level and over-feeding a level teaches trophic limits
 *   Osmosis lab      concentration sliders -> live water direction; wrong
 *                    prediction opens the authored misconception
 *   Genetics         mono / dihybrid / X-linked / blood-group selector ->
 *                    solver-driven outcomes
 *
 * Every misconception string comes from the authored corpus via
 * remediation.ts (closed-world, honest degradation — never invented).
 * The 3D stage is next/dynamic(ssr:false) so three.js stays out of the
 * page's first-load bundle.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Play, Microscope, Dna, Network, Droplets, Atom } from 'lucide-react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import { fetchEnrichment, type EnrichmentData } from '@/components/learn/remediation'
import { BIOLOGY_SANDBOX_CLASSES, ORGANELLE_FACTS, type BiologyTopic } from './biologyTopics'
import type { CellType } from './BiologyCell3D'

const BiologyCell3D = dynamic(() => import('./BiologyCell3D'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center text-xs text-slate-500">
      loading 3D cell…
    </div>
  ),
})

// ---------------------------------------------------------------- widgets --

interface SolveState {
  loading: boolean
  matched: boolean
  available?: boolean
  structure: string
  final_answer: string
  numeric_answer: number | null
  steps: string[]
  note: string
}

const IDLE: SolveState = {
  loading: false, matched: false, structure: '',
  final_answer: '', numeric_answer: null, steps: [], note: '',
}

async function askSolver(text: string): Promise<SolveState> {
  try {
    const r = await fetch('/api/sandbox/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: 'biology', text }),
    })
    if (!r.ok) return { ...IDLE, note: `solver error: ${r.status}` }
    const d = await r.json()
    return {
      loading: false,
      matched: !!d.matched,
      available: d.available,
      structure: d.structure || '',
      final_answer: d.final_answer || '',
      numeric_answer: d.numeric_answer ?? null,
      steps: Array.isArray(d.steps) ? d.steps : [],
      note: d.note || '',
    }
  } catch (e: any) {
    return { ...IDLE, note: e?.message || 'solver unreachable' }
  }
}

function fmt(v: number): string {
  if (!Number.isFinite(v)) return 'undefined'
  return Number.isInteger(v) ? String(v) : String(Math.round(v * 100) / 100)
}

function StepsList({ s }: { s: SolveState }) {
  if (s.loading) return <p className="text-xs text-slate-400 py-2">computing…</p>
  if (s.note && !s.matched) {
    return <p className="text-xs text-amber-300/90 py-2">{s.note}</p>
  }
  if (!s.matched) {
    return (
      <p className="text-xs text-slate-400 py-2">
        No deterministic family matched that wording — try the topic&apos;s
        sample prompt or reword it like the textbook.
      </p>
    )
  }
  return (
    <div className="mt-2">
      <div className="flex items-baseline gap-2">
        <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-black">
          {s.structure}
        </span>
        <span className="text-sm font-bold text-white">{s.final_answer}</span>
      </div>
      <ol className="mt-1.5 space-y-1">
        {s.steps.map((st, i) => (
          <li key={i} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
            <span className="text-slate-500 font-mono flex-shrink-0">{i + 1}.</span>
            <span>{st}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Slider({ label, value, min, max, step, onChange, suffix }:
  { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; suffix?: string }) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <span className="w-24 text-slate-400 font-semibold">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 accent-emerald-400" />
      <span className="w-16 text-right font-mono text-slate-200">
        {fmt(value)}{suffix ?? ''}
      </span>
    </label>
  )
}

function MisconBlock({ data }: { data: EnrichmentData | null }) {
  return (
    <MisconceptionPanel
      misconception={data?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
      commonMisconception={data?.common_misconception ?? null} />
  )
}

// ------------------------------------------------------------ main shell --

type Tab = 'solve' | 'cell' | 'punnett' | 'foodweb' | 'osmosis' | 'genetics'

const TABS: { key: Tab; label: string; icon: any }[] = [
  { key: 'solve', label: 'Solve & explain', icon: Play },
  { key: 'cell', label: 'Cell explorer 3D', icon: Microscope },
  { key: 'punnett', label: 'Punnett bench', icon: Dna },
  { key: 'foodweb', label: 'Food web · 10% law', icon: Network },
  { key: 'osmosis', label: 'Osmosis lab', icon: Droplets },
  { key: 'genetics', label: 'Genetics cross', icon: Atom },
]

const PROGRESS_KEY = 'biology_sandbox_explored_v1'

export default function BiologySandbox() {
  const [bandKey, setBandKey] = useState('c10')
  const [chapterKey, setChapterKey] = useState('c10_heredity')
  const [topic, setTopic] = useState<BiologyTopic | null>(null)
  const [tab, setTab] = useState<Tab>('solve')
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

  const band = BIOLOGY_SANDBOX_CLASSES.find(b => b.key === bandKey)
    ?? BIOLOGY_SANDBOX_CLASSES[0]
  const chapter = band.chapters.find(c => c.key === chapterKey)
    ?? band.chapters[0]

  const pickTopic = (tp: BiologyTopic) => {
    setTopic(tp)
    setTab('solve')
    markExplored(tp.key)
  }

  const totalTopics = BIOLOGY_SANDBOX_CLASSES.reduce(
    (n, b) => n + b.chapters.reduce((m, c) => m + c.topics.length, 0), 0)

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden">
      {/* header: class + chapter pickers, progress chip */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <h2 className="font-black text-lg text-white">
            🧫 Biology Sandbox
            <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              cell explorer · punnett bench · food web · osmosis · solver
            </span>
          </h2>
          <span className="text-[10px] font-black text-emerald-300/80">
            explored {explored.size}/{totalTopics} topics
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap mb-1.5">
          {BIOLOGY_SANDBOX_CLASSES.map(b => (
            <button key={b.key} onClick={() => { setBandKey(b.key); setChapterKey(b.chapters[0].key); setTopic(null) }}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition ${b.key === bandKey ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
              {b.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {band.chapters.map(c => (
            <button key={c.key} onClick={() => { setChapterKey(c.key); setTopic(null) }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${c.key === chapterKey ? 'bg-amber-500/15 border-amber-400/50 text-amber-200' : 'bg-slate-800/40 border-slate-700/70 text-slate-400 hover:text-slate-200'}`}>
              {c.label}
            </button>
          ))}
        </div>
        {chapter && (
          <div className="flex gap-1.5 flex-wrap mt-1.5">
            {chapter.topics.map(tp => (
              <button key={tp.key} onClick={() => pickTopic(tp)}
                className={`px-2 py-0.5 rounded-md text-[11px] border transition ${topic?.key === tp.key ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200' : explored.has(tp.key) ? 'bg-slate-800/60 border-slate-600 text-slate-300 hover:border-slate-400' : 'bg-slate-800/30 border-slate-700/60 text-slate-400 hover:text-slate-200'}`}>
                {explored.has(tp.key) ? '✓ ' : ''}{tp.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* tab bar */}
      <div className="flex gap-1 px-3 pt-2.5 border-b border-slate-800 bg-slate-900/40 overflow-x-auto">
        {TABS.map(tb => (
          <button key={tb.key} onClick={() => setTab(tb.key)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold whitespace-nowrap border-b-2 transition ${tab === tb.key ? 'border-emerald-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
            <tb.icon className="w-3.5 h-3.5" />
            {tb.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {tab === 'solve' && (
          <SolveTab topic={topic} onExplored={markExplored} />
        )}
        {tab === 'cell' && <CellTab />}
        {tab === 'punnett' && <PunnettTab />}
        {tab === 'foodweb' && <FoodWebTab />}
        {tab === 'osmosis' && <OsmosisTab />}
        {tab === 'genetics' && <GeneticsTab />}
      </div>
    </div>
  )
}

// ------------------------------------------------------------- solve tab --

function SolveTab({ topic, onExplored }:
  { topic: BiologyTopic | null; onExplored: (k: string) => void }) {
  const [text, setText] = useState(topic?.prompt ?? 'In a cross Tt x Tt, what is the probability of the offspring being tt?')
  const [res, setRes] = useState<SolveState>(IDLE)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)
  const topicKey = useRef(topic?.key)

  useEffect(() => {
    if (topic && topic.key !== topicKey.current) {
      topicKey.current = topic.key
      setText(topic.prompt)
      setRes(IDLE)
      setMiscon(null)
      if (topic.nodeId) onExplored(topic.key)
    }
  }, [topic, onExplored])

  const run = async () => {
    setRes({ ...IDLE, loading: true })
    setMiscon(null)
    const out = await askSolver(text)
    setRes(out)
    const node = topic?.nodeId
    if (!out.matched && node) {
      // not a gate — the wording failed; show the topic's authored trap
      setMiscon(await fetchEnrichment(node))
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <textarea value={text} onChange={e => setText(e.target.value)} rows={2}
          placeholder="Type a textbook-style biology problem…"
          className="flex-1 rounded-xl bg-slate-800/70 border border-slate-600 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400" />
        <button onClick={run} disabled={res.loading}
          className="self-stretch px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-sm flex items-center gap-1.5">
          <Play className="w-4 h-4" />Solve
        </button>
      </div>
      <StepsList s={res} />
      {res.matched && res.numeric_answer !== null && (
        <div className="mt-3 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wider text-emerald-300 font-black mb-0.5">numeric answer</p>
          <p className="text-sm font-bold text-emerald-300 font-mono">{fmt(res.numeric_answer)}</p>
        </div>
      )}
      <MisconBlock data={miscon} />
    </div>
  )
}

// -------------------------------------------------------------- cell tab --

const CELL_NODE: Record<CellType, string> = {
  plant: 'c11_bio_cbse_11_001',   // photosynthesis in higher plants
  animal: 'c11_bio_cbse_08_001',  // the cell — unit of life
  prokaryote: 'c11_bio_cbse_08_001',
}

// which authored node deep-links per organelle (closed-world ids)
const ORGANELLE_NODE: Record<string, string> = {
  chloroplast: 'c11_bio_cbse_11_001',
  mitochondria: 'c11_bio_cbse_12_001',
  nucleus: 'c11_bio_cbse_08_001',
  nucleoid: 'c12_bio_cbse_06_001',
  membrane: 'c11_bio_cbse_08_001',
  wall: 'c11_bio_cbse_08_001',
  vacuole: 'c11_bio_cbse_08_001',
  ribosome: 'c11_bio_cbse_08_001',
  cytoplasm: 'c11_bio_cbse_08_001',
}

function CellTab() {
  const [cellType, setCellType] = useState<CellType>('plant')
  const [selected, setSelected] = useState<string | null>('chloroplast')
  const [nodeData, setNodeData] = useState<EnrichmentData | null>(null)

  const loadNode = useCallback(async (nodeId?: string) => {
    setNodeData(null)
    if (!nodeId) return
    setNodeData(await fetchEnrichment(nodeId))
  }, [])

  useEffect(() => { loadNode(ORGANELLE_NODE[selected ?? '']) },
    [selected, loadNode])

  const info = selected ? ORGANELLE_FACTS[selected] : null

  return (
    <div className="grid md:grid-cols-[1fr_280px] gap-4">
      <div className="h-[400px] rounded-xl border border-slate-700 overflow-hidden">
        <BiologyCell3D cellType={cellType} selected={selected}
          onSelect={setSelected} />
      </div>
      <div className="space-y-2.5">
        <div className="flex gap-1.5">
          {(['plant', 'animal', 'prokaryote'] as CellType[]).map(ct => (
            <button key={ct} onClick={() => setCellType(ct)}
              className={`flex-1 px-2 py-1.5 rounded-lg text-[11px] font-bold border capitalize ${cellType === ct ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
              {ct}
            </button>
          ))}
        </div>
        {info ? (
          <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2">
            <p className="text-xs font-black text-emerald-300">{info.label}</p>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">{info.fn}</p>
          </div>
        ) : (
          <p className="text-xs text-slate-500">Click any organelle in the 3D cell.</p>
        )}
        {nodeData?.eli5 && (
          <div className="rounded-xl border border-gold-500/25 bg-gold-500/5 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-gold-300 font-black mb-1">
              from the book · {nodeData.title}
            </p>
            <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-6">{nodeData.eli5}</p>
          </div>
        )}
        <p className="text-[11px] text-slate-500">
          Drag to orbit, scroll to zoom. Plant = wall + chloroplasts + big
          vacuole; animal = membrane only; prokaryote = nucleoid, no nucleus.
        </p>
      </div>
    </div>
  )
}

// ----------------------------------------------------------- punnett tab --

const GENE1 = ['TT', 'Tt', 'tt'] as const
const GENE2 = ['TT', 'Tt', 'tt'] as const

function zyg(a: string, b: string): string {
  return a
    .split('')
    .map((c, i) => [c, b[i]])
    .map(([p, q]) => [p, q].sort((x, y) => (x === y.toLowerCase() ? -1 : x.toLowerCase() === y ? 1 : x.localeCompare(y))).join(''))
    .map(p => (p[0] === p[1] ? p : (p[0] === p[0].toLowerCase() ? p[1] + p[0] : p)))
    .join('')
}

function crossGrid(p1: string, p2: string): { g1: string[]; g2: string[]; cells: string[] } {
  const gam = (g: string): string[] => {
    const pairs: string[][] = []
    for (let i = 0; i < g.length; i += 2) {
      pairs.push(Array.from(new Set([g[i], g[i + 1]])))
    }
    let out: string[] = ['']
    for (const p of pairs) {
      out = out.flatMap(prefix => p.map(a => prefix + a))
    }
    return out
  }
  const g1 = gam(p1), g2 = gam(p2)
  const cells: string[] = []
  for (const a of g1) for (const b of g2) cells.push(zyg(a, b))
  return { g1, g2, cells }
}

function isHet(z: string): boolean {
  for (let i = 0; i < z.length; i += 2) {
    if (z[i].toUpperCase() === z[i + 1].toUpperCase() &&
      z[i] !== z[i + 1]) continue
    return false
  }
  return true
}

function domFrac(cells: string[]): number {
  const dom = cells.filter(c => /[A-Z]/.test(c[0])).length
  return dom / cells.length
}

const PUNNETT_MISCON_NODE = 'c12_bio_cbse_05_001' // Mendel's laws

function PunnettTab() {
  const [p1, setP1] = useState('Tt')
  const [p2, setP2] = useState('Tt')
  const [solver, setSolver] = useState<SolveState>(IDLE)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)

  const { g1, g2, cells } = useMemo(() => crossGrid(p1, p2), [p1, p2])
  const frac = domFrac(cells)
  const hetCount = cells.filter(isHet).length
  // genotype tally, deterministic order
  const tally = useMemo(() => {
    const m = new Map<string, number>()
    for (const c of cells) m.set(c, (m.get(c) ?? 0) + 1)
    return [...m.entries()].sort((x, y) => x[0].localeCompare(y[0]))
  }, [cells])

  // the trap: dominant ≠ common.  Tt x tt gives dominant only 1/2,
  // tt x tt gives 0 — exactly the authored Mendel misconception moment.
  const trap = frac < 0.5
  useEffect(() => {
    if (!trap) { setMiscon(null); return }
    let live = true
    fetchEnrichment(PUNNETT_MISCON_NODE).then(d => { if (live) setMiscon(d) })
    return () => { live = false }
  }, [trap])

  const runSolver = async (ask: string) => {
    setMiscon(null)
    setSolver({ ...IDLE, loading: true })
    setSolver(await askSolver(`In a cross ${p1} x ${p2}, ${ask}`))
  }

  return (
    <div className="grid md:grid-cols-[1fr_260px] gap-4">
      <div>
        <div className="flex gap-2 mb-3">
          {([['parent 1', p1, setP1], ['parent 2', p2, setP2]] as const).map(([lbl, val, set]) => (
            <label key={lbl} className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-semibold">{lbl}</span>
              <select value={val} onChange={e => set(e.target.value)}
                className="rounded-lg bg-slate-800 border border-slate-600 px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-emerald-400">
                {GENE1.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </label>
          ))}
          <span className="text-xs text-slate-500 font-mono self-center">{p1} × {p2}</span>
        </div>
        <table className="border-collapse mx-auto">
          <thead>
            <tr>
              <th className="p-1.5 text-[10px] text-slate-500">↓ {p1} ∖ {p2} →</th>
              {g2.map(b => (
                <th key={b} className="p-1.5 text-xs font-mono text-amber-300 border border-slate-700">{b}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {g1.map((a, i) => (
              <tr key={a + i}>
                <td className="p-1.5 text-xs font-mono text-amber-300 border border-slate-700 text-center">{a}</td>
                {g2.map((b, j) => {
                  const z = cells[i * g2.length + j]
                  return (
                    <td key={b + j}
                      className={`p-1.5 text-xs font-mono text-center border ${isHet(z) ? 'text-gold-300' : /[A-Z]/.test(z[0]) ? 'text-emerald-300' : 'text-rose-300'} border-slate-700 bg-slate-800/40`}>
                      {z}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 grid sm:grid-cols-2 gap-2">
          <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-black mb-1">genotype ratio</p>
            <p className="text-xs font-mono text-slate-200">
              {tally.map(([g, n]) => `${n} ${g}`).join(' : ')}
            </p>
          </div>
          <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-black mb-1">phenotype</p>
            <p className="text-xs font-mono text-slate-200">
              dominant {Math.round(frac * 100)}% · recessive {Math.round((1 - frac) * 100)}%
              {p1.length === 4 ? ' (per gene)' : ''}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-2.5">
        <button onClick={() => runSolver('what is the probability of a heterozygous offspring?')}
          className="w-full px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs">
          Solver: heterozygous probability
        </button>
        <button onClick={() => runSolver('what is the probability of a recessive offspring?')}
          className="w-full px-3 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs">
          Solver: recessive probability
        </button>
        <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2 text-xs">
          <p className="text-slate-400 font-semibold mb-1">live read-out</p>
          <p className="text-slate-200">heterozygous: <span className="font-mono text-gold-300">{hetCount}/{cells.length}</span></p>
          <p className="text-slate-200">dominant phenotype: <span className="font-mono text-emerald-300">{fmt(frac)}</span></p>
        </div>
        {trap && (
          <p className="rounded-lg bg-rose-500/10 border border-rose-400/30 px-2 py-1.5 text-[11px] text-rose-200 font-semibold">
            Dominant does not mean common: this cross gives the dominant
            phenotype in fewer than half the offspring.
          </p>
        )}
        <StepsList s={solver} />
        <MisconBlock data={miscon} />
      </div>
    </div>
  )
}

// --------------------------------------------------------- food web tab --

const LEVELS = [
  { key: 'producers', label: 'Producers', emoji: '🌿' },
  { key: 'primary', label: 'Primary consumers', emoji: '🐛' },
  { key: 'secondary', label: 'Secondary consumers', emoji: '🐸' },
  { key: 'tertiary', label: 'Tertiary consumers', emoji: '🦅' },
] as const

const ECO_MISCON_NODE = 'c12_bio_cbse_13_001' // organisms & populations

function FoodWebTab() {
  const [base, setBase] = useState(10000)
  const [removed, setRemoved] = useState<string | null>(null)
  const [boosted, setBoosted] = useState(false)
  const [solver, setSolver] = useState<SolveState>(IDLE)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)

  const energies = useMemo(() => {
    let e = base
    return LEVELS.map(l => {
      if (removed === l.key) {
        const dead = { ...l, energy: 0 }
        e = 0
        return dead
      }
      const cur = e
      e = e * 0.1
      return { ...l, energy: cur }
    })
  }, [base, removed])

  const impossible = boosted && !removed
  useEffect(() => {
    if (!impossible) { setMiscon(null); return }
    let live = true
    fetchEnrichment(ECO_MISCON_NODE).then(d => { if (live) setMiscon(d) })
    return () => { live = false }
  }, [impossible])

  const askSolverEnergy = async () => {
    setSolver({ ...IDLE, loading: true })
    const q = removed ?? 'tertiary consumers'
    setSolver(await askSolver(
      `If ${base} J of energy is available to producers, how much energy is available to the ${q}?`))
  }

  return (
    <div className="grid md:grid-cols-[1fr_260px] gap-4">
      <div>
        <div className="space-y-2">
          {energies.map((l, i) => {
            const prev = i > 0 ? energies[i - 1].energy : null
            const starved = i > 0 && prev === 0
            return (
              <div key={l.key}
                className={`rounded-xl border px-3 py-2.5 flex items-center gap-3 transition ${l.energy === 0 && !starved ? 'border-rose-400/50 bg-rose-500/10' : starved ? 'border-slate-800 bg-slate-900/60 opacity-50' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
                <span className="text-2xl">{l.emoji}</span>
                <div className="flex-1">
                  <p className="text-xs font-black text-slate-200">{l.label}</p>
                  <p className="text-[10px] text-slate-500">
                    trophic level {i + 1}
                    {i > 0 && l.energy > 0 && prev ? ` · receives ${Math.round(prev * 0.1)} J (10% of level ${i})` : ''}
                  </p>
                </div>
                <span className={`font-mono text-sm font-bold ${l.energy === 0 ? 'text-rose-300' : 'text-emerald-300'}`}>
                  {l.energy === 0 ? (starved ? '0 J (starved)' : 'removed') : `${fmt(l.energy)} J`}
                </span>
              </div>
            )
          })}
        </div>
        {energies.map(l => (
          <button key={`rm-${l.key}`} onClick={() => setRemoved(removed === l.key ? null : l.key)}
            className="mt-2 mr-1.5 px-2 py-1 rounded-md text-[10px] font-bold border border-slate-700 text-slate-400 hover:text-rose-300 hover:border-rose-400/40">
            {removed === l.key ? `restore ${l.label}` : `remove ${l.label}`}
          </button>
        ))}
        {removed && (
          <p className="mt-2 rounded-lg bg-amber-500/10 border border-amber-400/30 px-2 py-1.5 text-[11px] text-amber-200 font-semibold">
            Every level above a removed one collapses to 0 — energy only flows
            up the chain, and it never comes back.
          </p>
        )}
      </div>
      <div className="space-y-2.5">
        <Slider label="producers" value={base} min={1000} max={100000}
          step={1000} onChange={setBase} suffix=" J" />
        <button onClick={askSolverEnergy}
          className="w-full px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs">
          Solver: 10% law steps
        </button>
        <button onClick={() => setBoosted(!boosted)}
          className={`w-full px-3 py-2 rounded-xl font-black text-xs border ${impossible ? 'bg-rose-500/80 border-rose-400 text-white' : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-rose-400/40'}`}>
          {impossible ? 'try to keep 5000 J at tertiary (impossible)' : 'boost tertiary to 5000 J'}
        </button>
        {impossible && (
          <p className="rounded-lg bg-rose-500/10 border border-rose-400/30 px-2 py-1.5 text-[11px] text-rose-200 font-semibold">
            Impossible: from {fmt(base)} J of producers the tertiary level can
            hold at most {fmt(base * 0.001)} J by the 10% law — 5000 J breaks
            the energy budget.
          </p>
        )}
        <StepsList s={solver} />
        <MisconBlock data={miscon} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------- osmosis tab --

function OsmosisTab() {
  const [inside, setInside] = useState(2)
  const [outside, setOutside] = useState(5)
  const [answer, setAnswer] = useState<'in' | 'out' | null>(null)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)

  // water always moves dilute -> concentrated (down its own potential grad)
  const dir: 'in' | 'out' | 'none' =
    outside > inside ? 'in' : outside < inside ? 'out' : 'none'
  const swollen = dir === 'in'
  const shrink = dir === 'out'
  const radius = dir === 'in' ? 62 : dir === 'out' ? 42 : 52

  const predict = async (guess: 'in' | 'out') => {
    setAnswer(guess)
    if (dir !== 'none' && guess !== dir) {
      setMiscon(await fetchEnrichment('c11_bio_cbse_08_001'))
    } else {
      setMiscon(null)
    }
  }

  const tone = dir === 'in'
    ? { border: '#34d399', bg: 'rgba(52,211,153,0.12)', label: 'hypotonic outside — water ENTERS the cell' }
    : dir === 'out'
      ? { border: '#fb7185', bg: 'rgba(251,113,133,0.12)', label: 'hypertonic outside — water LEAVES the cell' }
      : { border: '#94a3b8', bg: 'rgba(148,163,184,0.12)', label: 'isotonic — no net movement' }

  return (
    <div className="grid md:grid-cols-[1fr_260px] gap-4">
      <div>
        <svg viewBox="0 0 420 280" className="w-full rounded-xl border border-slate-700 bg-slate-950">
          {/* solute dots outside */}
          {Array.from({ length: outside * 6 }).map((_, i) => {
            const ang = (i * 137.5) % 360
            const rad = 95 + (i % 5) * 22
            const th = (ang * Math.PI) / 180
            const x = 210 + Math.cos(th) * rad
            const y = 140 + Math.sin(th) * rad * 0.85
            return <circle key={i} cx={x} cy={y} r={3} fill="#fbbf24" opacity={0.7} />
          })}
          {/* the cell */}
          <circle cx={210} cy={140} r={radius} fill="rgba(56,189,248,0.12)"
            stroke={tone.border} strokeWidth={3}
            style={{ transition: 'r 0.4s ease' }} />
          <text x={210} y={144} textAnchor="middle" fill="#e2e8f0" fontSize={11} fontWeight="bold">
            cell {inside}% solute
          </text>
          {/* water arrows */}
          {dir !== 'none' && (
            <text x={210} y={250} textAnchor="middle" fill={tone.border} fontSize={14} fontWeight="black">
              {dir === 'in' ? '⬇ water in — cell swells' : '⬆ water out — cell shrinks (plasmolysis)'}
            </text>
          )}
          <text x={210} y={26} textAnchor="middle" fill="#94a3b8" fontSize={11}>
            {tone.label}
          </text>
        </svg>
        <p className="text-[11px] text-slate-500 mt-1.5">
          Water moves from the DILUTER side to the MORE CONCENTRATED side
          across the membrane — osmosis. Equal concentrations: no net flow.
        </p>
      </div>
      <div className="space-y-2.5">
        <Slider label="inside %" value={inside} min={0} max={10} step={1} onChange={setInside} suffix="%" />
        <Slider label="outside %" value={outside} min={0} max={10} step={1} onChange={setOutside} suffix="%" />
        <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2 text-xs">
          <p className="text-slate-400 font-semibold mb-1">predict before you look</p>
          <div className="flex gap-1.5">
            <button onClick={() => predict('in')}
              className={`flex-1 px-2 py-1.5 rounded-lg text-[11px] font-bold border ${answer === 'in' ? (dir === 'in' ? 'bg-emerald-500/25 border-emerald-400/60 text-emerald-200' : 'bg-rose-500/20 border-rose-400/60 text-rose-200') : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
              water enters
            </button>
            <button onClick={() => predict('out')}
              className={`flex-1 px-2 py-1.5 rounded-lg text-[11px] font-bold border ${answer === 'out' ? (dir === 'out' ? 'bg-emerald-500/25 border-emerald-400/60 text-emerald-200' : 'bg-rose-500/20 border-rose-400/60 text-rose-200') : 'bg-slate-800/60 border-slate-700 text-slate-300'}`}>
              water leaves
            </button>
          </div>
          {answer && dir !== 'none' && (
            <p className={`mt-1.5 text-[11px] font-bold ${answer === dir ? 'text-emerald-300' : 'text-rose-300'}`}>
              {answer === dir ? '✓ correct' : '✗ not quite — check the panel'}
            </p>
          )}
        </div>
        <MisconBlock data={miscon} />
      </div>
    </div>
  )
}

// -------------------------------------------------------- genetics tab --

type GMode = 'mono' | 'dihybrid' | 'sexlinked' | 'blood'

const BLOOD_GENOS = ['AA', 'AO', 'BB', 'BO', 'AB', 'OO'] as const
const SL_MOTHERS = [
  { v: 'XCXC', label: 'normal (XCXC)' },
  { v: 'XCXc', label: 'carrier (XCXc)' },
  { v: 'XcXc', label: 'colour-blind (XcXc)' },
] as const
const SL_FATHERS = [
  { v: 'XCY', label: 'normal (XCY)' },
  { v: 'XcY', label: 'colour-blind (XcY)' },
] as const

function GeneticsTab() {
  const [mode, setMode] = useState<GMode>('mono')
  const [mono, setMono] = useState({ p1: 'Tt', p2: 'Tt' })
  const [di, setDi] = useState({ p1: 'TtYy', p2: 'TtYy' })
  const [sl, setSl] = useState({ m: 'XCXc', f: 'XCY' })
  const [blood, setBlood] = useState({ p1: 'AO', p2: 'BO' })
  const [solver, setSolver] = useState<SolveState>(IDLE)

  const run = async (prompt: string) => {
    setSolver({ ...IDLE, loading: true })
    setSolver(await askSolver(prompt))
  }

  const GenoSel = ({ label, value, set, opts }:
    { label: string; value: string; set: (v: string) => void; opts: readonly string[] }) => (
    <label className="flex items-center gap-1.5 text-xs">
      <span className="text-slate-400 font-semibold w-16">{label}</span>
      <select value={value} onChange={e => set(e.target.value)}
        className="rounded-lg bg-slate-800 border border-slate-600 px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-emerald-400">
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  )

  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-4">
      <div>
        <div className="flex gap-1.5 flex-wrap mb-3">
          {([['mono', 'monohybrid'], ['dihybrid', 'dihybrid'],
            ['sexlinked', 'X-linked (colour blindness)'],
            ['blood', 'blood groups']] as const).map(([k, lbl]) => (
            <button key={k} onClick={() => { setMode(k as GMode); setSolver(IDLE) }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${mode === k ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
              {lbl}
            </button>
          ))}
        </div>
        <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-3 space-y-2">
          {mode === 'mono' && (
            <div className="flex gap-4 flex-wrap">
              <GenoSel label="parent 1" value={mono.p1} set={v => setMono({ ...mono, p1: v })} opts={GENE1} />
              <GenoSel label="parent 2" value={mono.p2} set={v => setMono({ ...mono, p2: v })} opts={GENE2} />
            </div>
          )}
          {mode === 'dihybrid' && (
            <div className="flex gap-4 flex-wrap">
              <GenoSel label="parent 1" value={di.p1} set={v => setDi({ ...di, p1: v })} opts={['TtYy', 'TTYy', 'Ttyy', 'ttYy', 'ttyy', 'TTYY']} />
              <GenoSel label="parent 2" value={di.p2} set={v => setDi({ ...di, p2: v })} opts={['TtYy', 'TTYy', 'Ttyy', 'ttYy', 'ttyy', 'TTYY']} />
            </div>
          )}
          {mode === 'sexlinked' && (
            <div className="flex gap-4 flex-wrap">
              <label className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-semibold w-16">mother</span>
                <select value={sl.m} onChange={e => setSl({ ...sl, m: e.target.value })}
                  className="rounded-lg bg-slate-800 border border-slate-600 px-2 py-1 text-xs font-mono text-white">
                  {SL_MOTHERS.map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
                </select>
              </label>
              <label className="flex items-center gap-1.5 text-xs">
                <span className="text-slate-400 font-semibold w-16">father</span>
                <select value={sl.f} onChange={e => setSl({ ...sl, f: e.target.value })}
                  className="rounded-lg bg-slate-800 border border-slate-600 px-2 py-1 text-xs font-mono text-white">
                  {SL_FATHERS.map(o => <option key={o.v} value={o.v}>{o.label}</option>)}
                </select>
              </label>
            </div>
          )}
          {mode === 'blood' && (
            <div className="flex gap-4 flex-wrap">
              <GenoSel label="parent 1" value={blood.p1} set={v => setBlood({ ...blood, p1: v })} opts={BLOOD_GENOS} />
              <GenoSel label="parent 2" value={blood.p2} set={v => setBlood({ ...blood, p2: v })} opts={BLOOD_GENOS} />
            </div>
          )}
        </div>
        <p className="text-[11px] text-slate-500 mt-2">
          Outcomes are computed by the deterministic solver — the same families
          that mark the practice questions.
        </p>
      </div>
      <div className="space-y-2">
        {mode === 'mono' && (
          <>
            <button onClick={() => run(`In a cross ${mono.p1} x ${mono.p2}, what is the probability of a heterozygous offspring?`)}
              className="w-full px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs">heterozygous probability</button>
            <button onClick={() => run(`In a cross ${mono.p1} x ${mono.p2}, what is the probability of a recessive offspring?`)}
              className="w-full px-3 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs">recessive probability</button>
            <button onClick={() => run(`In a cross ${mono.p1} x ${mono.p2}, give the phenotype ratio.`)}
              className="w-full px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-black text-xs">phenotype ratio</button>
          </>
        )}
        {mode === 'dihybrid' && (
          <>
            <button onClick={() => run(`In a dihybrid cross ${di.p1} x ${di.p2}, what is the probability of offspring showing both dominant traits?`)}
              className="w-full px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs">both dominant probability</button>
            <button onClick={() => run(`In a cross ${di.p1} x ${di.p2}, give the genotype ratio.`)}
              className="w-full px-3 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs">genotype ratio</button>
          </>
        )}
        {mode === 'sexlinked' && (
          <>
            <button onClick={() => run(`A ${sl.m === 'XCXc' ? 'carrier' : sl.m === 'XcXc' ? 'colour blind' : 'normal'} mother (${sl.m}) and a ${sl.f === 'XcY' ? 'colour blind' : 'normal'} father (${sl.f}). What fraction of their sons will be colour blind?`)}
              className="w-full px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs">affected sons</button>
            <button onClick={() => run(`A ${sl.m === 'XCXc' ? 'carrier' : sl.m === 'XcXc' ? 'colour blind' : 'normal'} mother (${sl.m}) and a ${sl.f === 'XcY' ? 'colour blind' : 'normal'} father (${sl.f}). What is the probability that their child will be colour blind?`)}
              className="w-full px-3 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs">affected child (overall)</button>
          </>
        )}
        {mode === 'blood' && (
          <>
            {(['A', 'B', 'AB', 'O'] as const).map(g => (
              <button key={g}
                onClick={() => run(`A father with genotype ${blood.p1} and a mother with genotype ${blood.p2}: what is the probability that their child has blood group ${g}?`)}
                className="w-full px-3 py-2 rounded-xl bg-emerald-500/90 hover:bg-emerald-400 text-slate-950 font-black text-xs">
                P(child is group {g})
              </button>
            ))}
          </>
        )}
        <StepsList s={solver} />
      </div>
    </div>
  )
}
