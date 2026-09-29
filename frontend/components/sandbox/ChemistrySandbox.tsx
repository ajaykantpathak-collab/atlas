'use client'

/**
 * ChemistrySandbox — the chemistry workbench (SANDBOX_TAXONOMY engines:
 * E2 Construction Workbench + E1 Parameter Labs + 3D molecule/lattice
 * viewer).
 *
 * Ground truth is ALWAYS the deterministic solver:
 *   POST /api/sandbox/solve { subject: 'chemistry', text }
 *   → backend.its.solver.chemistry_families.model_chemistry_families
 * Nothing in this component hardcodes chemistry answers; the client-side
 * formula parser only tallies atoms for DISPLAY (conservation readout),
 * mirroring the solver's own conventions.
 *
 * Impossible/wrong states (unbalanceable equation, invalid ion pair, pH
 * outside 0-14) trigger the MisconceptionPanel fed ONLY by the authored
 * enhanced-nodes corpus via remediation.ts (closed-world — any field the
 * corpus lacks is omitted, never invented).
 */
import { useCallback, useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Atom, Equal, FlaskConical, Orbit, Scale, TestTube2, Waves, Sigma,
} from 'lucide-react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import { fetchEnrichment, type EnrichmentData } from '@/components/learn/remediation'
import {
  CHEM_SANDBOX_CLASSES, ELEMENTS, SHELL_CAPACITIES,
  type ChemTopic,
} from './chemistryTopics'

const MoleculeViewer = dynamic(() => import('./ChemMolecules3D'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center text-xs text-slate-500">
      loading 3D stage…
    </div>
  ),
})
const ReactionParticles3D = dynamic(
  () => import('./ChemMolecules3D').then(m => m.ReactionParticles3D),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full grid place-items-center text-xs text-slate-500">
        loading particles…
      </div>
    ),
  },
)

// ---------------------------------------------------------------- solver I/O --

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
      body: JSON.stringify({ subject: 'chemistry', text }),
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

// ------------------------------------------------------------- tiny helpers --

function fmt(v: number): string {
  if (!Number.isFinite(v)) return '—'
  const a = Math.abs(v)
  if (a !== 0 && (a < 1e-4 || a >= 1e7)) return v.toExponential(3)
  return String(Math.round(v * 1e6) / 1e6)
}

/** Display-only atom tally — mirrors the solver's parse conventions. */
function countAtoms(formula: string): Record<string, number> | null {
  const s = formula.replace(/[^A-Za-z0-9().]/g, '')
  if (!s) return null
  const parts = s.split(/\.(?=\d*[A-Za-z(])/)
  const total: Record<string, number> = {}
  const parseSeg = (seg: string, mult: number): boolean => {
    const stack: Array<Record<string, number>> = [{}]
    const counts: Array<number> = [1]
    let i = 0
    while (i < seg.length) {
      const c = seg[i]
      if (c === '(') {
        stack.push({})
        counts.push(0)
        i++
      } else if (c === ')') {
        i++
        let num = ''
        while (i < seg.length && /\d/.test(seg[i])) num += seg[i++]
        const inner = stack.pop()
        const m = counts.pop() as number
        const mult2 = num ? parseInt(num, 10) : 1
        if (!inner) return false
        const top = stack[stack.length - 1]
        for (const [el, n] of Object.entries(inner)) {
          top[el] = (top[el] || 0) + n * m * mult2
        }
        counts.pop()
      } else if (/[A-Z]/.test(c)) {
        let el = c
        i++
        while (i < seg.length && /[a-z]/.test(seg[i])) el += seg[i++]
        let num = ''
        while (i < seg.length && /\d/.test(seg[i])) num += seg[i++]
        const top = stack[stack.length - 1]
        top[el] = (top[el] || 0) + (num ? parseInt(num, 10) : 1) * counts[counts.length - 1]
      } else if (/\d/.test(c)) {
        // leading multiplier on a hydrate part is handled by the caller
        i++
      } else {
        return false
      }
    }
    if (stack.length !== 1) return false
    for (const [el, n] of Object.entries(stack[0])) {
      total[el] = (total[el] || 0) + n * mult
    }
    return true
  }
  for (let idx = 0; idx < parts.length; idx++) {
    const part = parts[idx]
    const m = part.match(/^(\d+)(?=[A-Z(])/)
    if (m && idx === 0) return null // reaction coefficient, not a formula
    const mult = m ? parseInt(m[1], 10) : 1
    const seg = m ? part.slice(m[1].length) : part
    if (!parseSeg(seg, mult)) return null
  }
  return Object.keys(total).length ? total : null
}

/** "2 H2 + O2" -> species coefficient pairs (display parsing of solver output). */
function parseSide(side: string): Array<{ coef: number; f: string }> | null {
  const out: Array<{ coef: number; f: string }> = []
  for (const tok of side.split('+')) {
    const m = tok.trim().match(/^(\d+)\s*(.+)$/)
    const coef = m ? parseInt(m[1], 10) : 1
    const f = (m ? m[2] : tok).trim()
    if (!f || !countAtoms(f)) return null
    out.push({ coef, f })
  }
  return out.length ? out : null
}

function tally(side: string): Record<string, number> | null {
  const species = parseSide(side)
  if (!species) return null
  const t: Record<string, number> = {}
  for (const { coef, f } of species) {
    const c = countAtoms(f)
    if (!c) return null
    for (const [el, n] of Object.entries(c)) t[el] = (t[el] || 0) + n * coef
  }
  return t
}

function tallyEq(t: Record<string, number> | null): number {
  if (!t) return 0
  return Object.values(t).reduce((a, b) => a + b, 0)
}

const SCIENTIFIC = /^(?:[A-Z][a-z]?\d*|\(|\.)+$/

function looksLikeFormula(f: string): boolean {
  const c = countAtoms(f)
  return !!c && SCIENTIFIC.test(f)
}

// --------------------------------------------------------------- widgets --

function StepsList({ s }: { s: SolveState }) {
  if (s.loading) return <p className="text-xs text-slate-400 py-2">computing…</p>
  if (s.note && !s.matched) {
    return <p className="text-xs text-amber-300/90 py-2">{s.note}</p>
  }
  if (!s.matched) {
    return (
      <p className="text-xs text-slate-400 py-2">
        No deterministic family matched — try the topic&apos;s sample prompt
        or phrase it like the textbook.
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

function Num({ label, value, min, max, step, onChange }: {
  label: string; value: number; min: number; max: number
  step: number; onChange: (v: number) => void
}) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <span className="w-24 text-slate-400 font-semibold">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 accent-gold-400" />
      <input type="number" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-20 px-2 py-1 rounded-lg bg-slate-900 border border-slate-600 text-right font-mono text-slate-100 focus:outline-none focus:border-gold-400" />
    </label>
  )
}

function AskButton({ onClick, disabled, label = 'Ask the solver' }: {
  onClick: () => void; disabled?: boolean; label?: string
}) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="px-4 py-2 rounded-xl bg-gold-500 text-slate-950 text-xs font-black hover:bg-gold-400 disabled:opacity-40 transition">
      {label}
    </button>
  )
}

// ------------------------------------------------------------------- tabs --

type Tab = 'solve' | 'equations' | 'formulas' | 'mole' | 'ph' | 'gas' | 'atoms' | 'molecules'

const TABS: { key: Tab; label: string; icon: any }[] = [
  { key: 'solve', label: 'Solve & explain', icon: Sigma },
  { key: 'equations', label: 'Equation balancer', icon: Equal },
  { key: 'formulas', label: 'Formula bench', icon: FlaskConical },
  { key: 'mole', label: 'Mole workbench', icon: Scale },
  { key: 'ph', label: 'pH bench', icon: TestTube2 },
  { key: 'gas', label: 'Gas piston', icon: Waves },
  { key: 'atoms', label: 'Atom builder', icon: Atom },
  { key: 'molecules', label: 'Molecules 3D', icon: Orbit },
]

const PROGRESS_KEY = 'chem_sandbox_explored_v1'

// =========================================================== main shell ==

export default function ChemistrySandbox() {
  const [tab, setTab] = useState<Tab>('solve')
  const [bandKey, setBandKey] = useState('c9')
  const [prompt, setPrompt] = useState(
    'Calculate the number of moles in 36 g of H2O')
  const [explored, setExplored] = useState<string[]>([])
  const [misconCache, setMisconCache] = useState<Record<string, EnrichmentData | null>>({})

  useEffect(() => {
    try {
      setExplored(JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '[]') ?? [])
    } catch { /* fresh */ }
  }, [])

  const visit = useCallback((tt: Tab) => {
    setTab(tt)
    setExplored(prev => {
      if (prev.includes(tt)) return prev
      const next = [...prev, tt]
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(next)) } catch { }
      return next
    })
  }, [])

  const miscon = useCallback(async (nodeId?: string) => {
    if (!nodeId || misconCache[nodeId] !== undefined) return
    const d = await fetchEnrichment(nodeId)
    setMisconCache(prev => ({ ...prev, [nodeId]: d }))
  }, [misconCache])

  const pickTopic = (topic: ChemTopic) => {
    setPrompt(topic.prompt)
    if (topic.nodeId) miscon(topic.nodeId)
    visit(topic.bench === 'atoms' ? 'atoms' : topic.bench)
  }

  const band = CHEM_SANDBOX_CLASSES.find(b => b.key === bandKey) ?? CHEM_SANDBOX_CLASSES[2]

  return (
    <div className="w-full">
      {/* class/topic picker — from the book inventory */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {CHEM_SANDBOX_CLASSES.map(b => (
          <button key={b.key} onClick={() => setBandKey(b.key)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-black border transition ${bandKey === b.key ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
            {b.label}
          </button>
        ))}
        <span className="ml-auto text-[10px] font-bold text-slate-500 self-center">
          benches explored {explored.length}/{TABS.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {band.chapters.flatMap(ch => ch.topics.map(tp => (
          <button key={tp.key} onClick={() => pickTopic(tp)}
            title={tp.prompt}
            className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-slate-800/50 border border-slate-700 text-slate-300 hover:border-emerald-400/50 hover:text-emerald-200 transition">
            {tp.label}
          </button>
        )))}
      </div>

      {/* bench tabs */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {TABS.map(t => (
          <button key={t.key} onClick={() => visit(t.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black border transition ${tab === t.key ? 'bg-gold-500/15 border-gold-400/60 text-gold-200' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
            <t.icon className="w-3.5 h-3.5" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'solve' && <SolveBench prompt={prompt} setPrompt={setPrompt} />}
      {tab === 'equations' && <EquationsBench miscon={miscon} />}
      {tab === 'formulas' && <FormulasBench miscon={miscon} />}
      {tab === 'mole' && <MoleBench miscon={miscon} />}
      {tab === 'ph' && <PhBench miscon={miscon} />}
      {tab === 'gas' && <GasBench />}
      {tab === 'atoms' && <AtomBench miscon={miscon} />}
      {tab === 'molecules' && <MoleculesBench />}
    </div>
  )
}

// ------------------------------------------------------------ solve bench --

function SolveBench({ prompt, setPrompt }: { prompt: string; setPrompt: (s: string) => void }) {
  const [state, setState] = useState<SolveState>(IDLE)
  const ask = async () => {
    setState({ ...IDLE, loading: true })
    setState(await askSolver(prompt))
  }
  return (
    <div className="space-y-3">
      <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
          textbook-style question — deterministic families, no LLM
        </p>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={2}
          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-600 text-sm font-bold text-white focus:outline-none focus:border-gold-400" />
        <div className="flex items-center gap-2 mt-2">
          <AskButton onClick={ask} disabled={state.loading} />
          <span className="text-[10px] text-slate-500">
            balancing · valency · mole concept · molecular mass · percent · gas laws · pH · hardness
          </span>
        </div>
        <StepsList s={state} />
      </div>
    </div>
  )
}

// -------------------------------------------------------- equations bench --

const EQ_BANK: { label: string; lhs: string; rhs: string }[] = [
  { label: 'water formation', lhs: 'H2 + O2', rhs: 'H2O' },
  { label: 'rusting', lhs: 'Fe + O2', rhs: 'Fe2O3' },
  { label: 'zinc + acid', lhs: 'Zn + HCl', rhs: 'ZnCl2 + H2' },
  { label: 'neutralisation', lhs: 'NaOH + HCl', rhs: 'NaCl + H2O' },
  { label: 'methane combustion', lhs: 'CH4 + O2', rhs: 'CO2 + H2O' },
  { label: 'limestone decomposition', lhs: 'CaCO3', rhs: 'CaO + CO2' },
  { label: 'displacement', lhs: 'Al + CuCl2', rhs: 'AlCl3 + Cu' },
  { label: 'ammonia burning', lhs: 'NH3 + O2', rhs: 'N2 + H2O' },
  { label: 'impossible: wrong elements', lhs: 'H2 + O2', rhs: 'CO2' },
]

const EQ_MISCON_NODE = 'c10_chem_cbse_01_001'

function EquationsBench({ miscon }: { miscon: (id?: string) => Promise<void> }) {
  const [lhs, setLhs] = useState('H2 + O2')
  const [rhs, setRhs] = useState('H2O')
  const [state, setState] = useState<SolveState>(IDLE)
  const [misconData, setMisconData] = useState<EnrichmentData | null>(null)

  useEffect(() => { miscon(EQ_MISCON_NODE) }, [miscon])
  useEffect(() => {
    // enrichment cache lives in the parent's closure; fetch directly for state
    let live = true
    fetchEnrichment(EQ_MISCON_NODE).then(d => { if (live) setMisconData(d) })
    return () => { live = false }
  }, [])

  const skeleton = `${lhs} -> ${rhs}`
  const beforeT = tally(lhs)
  const balancedAnswer = state.matched
    ? (state.final_answer.match(/->\s*(.+)$/)?.[1] ?? '')
    : ''
  const balancedLhs = state.matched
    ? state.final_answer.replace(/^.*?:\s*/, '').split('->')[0]?.trim() ?? ''
    : ''
  const afterL = tally(balancedLhs)
  const afterR = tally(balancedAnswer)
  const conserved = afterL && afterR && JSON.stringify(
    Object.fromEntries(Object.entries(afterL).sort())) ===
    JSON.stringify(Object.fromEntries(Object.entries(afterR).sort()))
  const unbalanceable = !state.matched && !state.loading

  const ask = async () => {
    setState({ ...IDLE, loading: true })
    setState(await askSolver(`Balance the chemical equation: ${skeleton}`))
  }

  return (
    <div className="space-y-3">
      <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
          construction workbench — assemble a skeleton, the solver balances it
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {EQ_BANK.map(b => (
            <button key={b.label} onClick={() => { setLhs(b.lhs); setRhs(b.rhs); setState(IDLE) }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${b.label.startsWith('impossible') ? 'border-rose-500/40 text-rose-300 hover:bg-rose-500/10' : 'border-slate-600 text-slate-300 hover:border-gold-400/50'}`}>
              {b.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <input value={lhs} onChange={e => setLhs(e.target.value)}
            className="flex-1 min-w-[140px] px-3 py-2 rounded-xl bg-slate-900 border border-slate-600 text-sm font-bold font-mono text-white focus:outline-none focus:border-gold-400" />
          <span className="text-slate-500 font-black">→</span>
          <input value={rhs} onChange={e => setRhs(e.target.value)}
            className="flex-1 min-w-[140px] px-3 py-2 rounded-xl bg-slate-900 border border-slate-600 text-sm font-bold font-mono text-white focus:outline-none focus:border-gold-400" />
          <AskButton onClick={ask} disabled={state.loading} label="Balance it" />
        </div>
        <StepsList s={state} />
        {/* conservation readout */}
        {state.matched && afterL && afterR && (
          <div className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-3 py-2">
            <p className="text-[11px] font-bold text-emerald-200">
              {conserved ? '⚖️ mass conserved: ' : '⚠️ atom tally: '}
              before {Object.entries(beforeT ?? {}).map(([e, n]) => `${e}=${n}`).join(', ') || '—'}
              {' · balanced LHS '}
              {Object.entries(afterL).map(([e, n]) => `${e}=${n}`).join(', ')}
              {' · RHS '}
              {Object.entries(afterR).map(([e, n]) => `${e}=${n}`).join(', ')}
              {' · total '}
              {tallyEq(afterL)} = {tallyEq(afterR)}
            </p>
          </div>
        )}
        {state.matched && afterL && afterR && (
          <div className="mt-3 h-56 rounded-xl overflow-hidden border border-slate-700">
            <ReactionParticles3D before={afterL} after={afterR} />
          </div>
        )}
        {/* wrong-combination teaching: solver refused (unbalanceable) */}
        {unbalanceable && (
          <MisconceptionPanel
            misconception={misconData?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
            commonMisconception={misconData?.common_misconception ?? null}
          >
            <p className="text-[11px] text-slate-300">
              An equation can only balance when the SAME elements appear on
              both sides — new atoms cannot appear from nowhere. Pick
              species that share elements across the arrow.
            </p>
          </MisconceptionPanel>
        )}
      </div>
    </div>
  )
}

// --------------------------------------------------------- formulas bench --

const CATIONS = ['sodium', 'potassium', 'silver', 'ammonium', 'hydrogen',
  'magnesium', 'calcium', 'barium', 'zinc', 'ferrous', 'cupric', 'ferric',
  'lead', 'tin', 'manganese', 'nickel', 'chromium', 'aluminium']
const ANIONS = ['hydride', 'chloride', 'bromide', 'iodide', 'fluoride',
  'hydroxide', 'nitrate', 'nitrite', 'bicarbonate', 'oxide', 'sulphide',
  'carbonate', 'sulphate', 'sulphite', 'phosphate', 'nitride', 'chromate',
  'dichromate', 'oxalate', 'permanganate', 'cyanide', 'acetate']

const FORMULA_MISCON_NODE = 'c11_chem_cbse_04_001'

function FormulasBench({ miscon }: { miscon: (id?: string) => Promise<void> }) {
  const [cat, setCat] = useState('aluminium')
  const [an, setAn] = useState('sulphate')
  const [custom, setCustom] = useState('')
  const [state, setState] = useState<SolveState>(IDLE)
  const [misconData, setMisconData] = useState<EnrichmentData | null>(null)

  useEffect(() => { miscon(FORMULA_MISCON_NODE) }, [miscon])
  useEffect(() => {
    let live = true
    fetchEnrichment(FORMULA_MISCON_NODE).then(d => { if (live) setMisconData(d) })
    return () => { live = false }
  }, [])

  const pair = custom.trim() || `${cat} ${an}`
  const ask = async () => {
    setState({ ...IDLE, loading: true })
    setState(await askSolver(`Write the chemical formula of ${pair}`))
  }
  const invalid = !state.matched && !state.loading

  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 space-y-3">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
        cross-over rule — valencies swap as subscripts, reduced to lowest terms
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <select value={cat} onChange={e => setCat(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-600 text-sm font-bold text-white focus:outline-none focus:border-gold-400">
          {CATIONS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span className="text-slate-500 font-black">+</span>
        <select value={an} onChange={e => setAn(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-600 text-sm font-bold text-white focus:outline-none focus:border-gold-400">
          {ANIONS.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <AskButton onClick={ask} disabled={state.loading} label="Write formula" />
      </div>
      <input value={custom} onChange={e => setCustom(e.target.value)}
        placeholder='…or type any pair, e.g. "iron (III) oxide" — an invalid pair teaches too'
        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-600 text-sm font-bold text-white placeholder:text-slate-500 placeholder:font-normal focus:outline-none focus:border-gold-400" />
      <StepsList s={state} />
      {invalid && (
        <MisconceptionPanel
          misconception={misconData?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
          commonMisconception={misconData?.common_misconception ?? null}
        >
          <p className="text-[11px] text-slate-300">
            A compound needs one CATION (metal / ammonium / hydrogen) and one
            ANION (non-metal or radical). &quot;{pair}&quot; is not a pair the
            cross-over rule can combine — check the name, or swap in a real
            cation–anion pair.
          </p>
        </MisconceptionPanel>
      )}
    </div>
  )
}

// -------------------------------------------------------------- mole bench --

type MoleMode = 'mass_to_moles' | 'moles_to_mass' | 'molecules' | 'moles_from_particles' | 'molarity' | 'prep' | 'stp'

const MOLE_MODES: { key: MoleMode; label: string }[] = [
  { key: 'mass_to_moles', label: 'mass → moles' },
  { key: 'moles_to_mass', label: 'moles → mass' },
  { key: 'molecules', label: 'moles → molecules' },
  { key: 'moles_from_particles', label: 'molecules → moles' },
  { key: 'molarity', label: 'molarity' },
  { key: 'prep', label: 'solution prep mass' },
  { key: 'stp', label: 'STP volume' },
]

const COMPOUNDS = ['H2O', 'CO2', 'CaCO3', 'H2SO4', 'NaOH', 'NaCl', 'O2', 'CuSO4.5H2O']
const MOLE_MISCON_NODE = 'c11_chem_cbse_01_001'

function MoleBench({ miscon }: { miscon: (id?: string) => Promise<void> }) {
  const [mode, setMode] = useState<MoleMode>('mass_to_moles')
  const [f, setF] = useState('H2O')
  const [m, setM] = useState(36)
  const [n, setN] = useState(2)
  const [np, setNp] = useState(6.022)
  const [v, setV] = useState(500)
  const [conc, setConc] = useState(0.1)
  const [state, setState] = useState<SolveState>(IDLE)
  const [misconData, setMisconData] = useState<EnrichmentData | null>(null)
  const [attempted, setAttempted] = useState(false)

  useEffect(() => { miscon(MOLE_MISCON_NODE) }, [miscon])
  useEffect(() => {
    let live = true
    fetchEnrichment(MOLE_MISCON_NODE).then(d => { if (live) setMisconData(d) })
    return () => { live = false }
  }, [])

  const text = useMemo(() => {
    switch (mode) {
      case 'mass_to_moles': return `Calculate the number of moles in ${m} g of ${f}`
      case 'moles_to_mass': return `What is the mass of ${n} moles of ${f}?`
      case 'molecules': return `Calculate the number of molecules in ${n} moles of ${f}`
      case 'moles_from_particles': return `Calculate the number of moles in ${np} x 10^23 molecules of ${f}`
      case 'molarity': return `Find the molarity of a solution containing ${n} moles of ${f} dissolved in ${v} mL of solution`
      case 'prep': return `Calculate the mass of ${f} required to prepare ${v} mL of ${conc} M solution`
      case 'stp': return `What volume will ${m} g of ${f} occupy at STP?`
    }
  }, [mode, f, m, n, np, v, conc])

  const ask = async () => {
    setState({ ...IDLE, loading: true })
    setAttempted(true)
    setState(await askSolver(text))
  }

  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 space-y-3">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
        mole workbench — n = m/M, N = n·N_A, M = n/V, V = n·22.4 L at STP
      </p>
      <div className="flex flex-wrap gap-1.5">
        {MOLE_MODES.map(mm => (
          <button key={mm.key} onClick={() => { setMode(mm.key); setState(IDLE) }}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${mode === mm.key ? 'bg-gold-500/15 border-gold-400/60 text-gold-200' : 'border-slate-600 text-slate-300 hover:border-gold-400/50'}`}>
            {mm.label}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {['mass_to_moles', 'stp'].includes(mode) && (
          <Num label="mass (g)" value={m} min={1} max={500} step={1} onChange={setM} />
        )}
        {['moles_to_mass', 'molecules', 'molarity'].includes(mode) && (
          <Num label="moles" value={n} min={0.05} max={10} step={0.05} onChange={setN} />
        )}
        {mode === 'moles_from_particles' && (
          <Num label="× 10^23 particles" value={np} min={0.5} max={120} step={0.022} onChange={setNp} />
        )}
        {['molarity', 'prep'].includes(mode) && (
          <Num label="volume (mL)" value={v} min={10} max={2000} step={10} onChange={setV} />
        )}
        {mode === 'prep' && (
          <Num label="molarity (M)" value={conc} min={0.05} max={5} step={0.05} onChange={setConc} />
        )}
        <label className="flex items-center gap-2 text-xs">
          <span className="w-24 text-slate-400 font-semibold">compound</span>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {COMPOUNDS.map(c => (
              <button key={c} onClick={() => setF(c)}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold font-mono border transition ${f === c ? 'bg-emerald-500/15 border-emerald-400/60 text-emerald-200' : 'border-slate-600 text-slate-300 hover:border-emerald-400/40'}`}>
                {c}
              </button>
            ))}
            <input value={f} onChange={e => setF(e.target.value)}
              className="w-28 px-2 py-1 rounded-lg bg-slate-900 border border-slate-600 font-mono text-xs text-white focus:outline-none focus:border-emerald-400" />
          </div>
        </label>
      </div>
      <div className="flex items-center gap-2">
        <AskButton onClick={ask} disabled={state.loading} />
        <code className="text-[10px] text-slate-500">{text}</code>
      </div>
      <StepsList s={state} />
      {attempted && !state.matched && !state.loading && (
        <MisconceptionPanel
          misconception={misconData?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
          commonMisconception={misconData?.common_misconception ?? null}
        >
          <p className="text-[11px] text-slate-300">
            The solver only recognises real chemical formulas (atoms it has
            table masses for). &quot;{f}&quot; is not one — pick a chip or type
            a formula like Fe2O3, Ca(OH)2 or CuSO4.5H2O.
          </p>
        </MisconceptionPanel>
      )}
    </div>
  )
}

// ---------------------------------------------------------------- pH bench --

const PH_MISCON_NODE = 'c10_chem_cbse_02_001'

function PhBench({ miscon }: { miscon: (id?: string) => Promise<void> }) {
  const [ph, setPh] = useState(5)
  const [typed, setTyped] = useState('5')
  const [state, setState] = useState<SolveState>(IDLE)
  const [misconData, setMisconData] = useState<EnrichmentData | null>(null)

  useEffect(() => { miscon(PH_MISCON_NODE) }, [miscon])
  useEffect(() => {
    let live = true
    fetchEnrichment(PH_MISCON_NODE).then(d => { if (live) setMisconData(d) })
    return () => { live = false }
  }, [])

  const impossible = ph < 0 || ph > 14 || !Number.isFinite(ph)
  const h = Math.pow(10, -ph)
  const poh = 14 - ph
  const oh = Math.pow(10, -poh)
  const band = ph < 7 ? 'acidic' : ph === 7 ? 'neutral' : 'basic'

  const commit = (raw: string) => {
    setTyped(raw)
    const v = parseFloat(raw)
    if (Number.isFinite(v)) setPh(v)
  }

  const ask = async () => {
    setState({ ...IDLE, loading: true })
    setState(await askSolver(
      `The pH of a solution is ${fmt(ph)}. Find the hydroxide ion concentration.`))
  }

  return (
    <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 space-y-3">
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
        pH bench — pH = -log10[H+], pH + pOH = 14, [H+][OH-] = 10^-14
      </p>
      <Num label="pH" value={ph} min={-2} max={16} step={0.1} onChange={v => { setPh(v); setTyped(String(v)) }} />
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2">
          <p className="text-[10px] text-slate-500 font-black uppercase">[H+]</p>
          <p className="text-sm font-mono font-bold text-rose-300">{impossible ? '—' : fmt(h)} M</p>
        </div>
        <div className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2">
          <p className="text-[10px] text-slate-500 font-black uppercase">pOH</p>
          <p className="text-sm font-mono font-bold text-gold-300">{impossible ? '—' : fmt(poh)}</p>
        </div>
        <div className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2">
          <p className="text-[10px] text-slate-500 font-black uppercase">[OH-]</p>
          <p className="text-sm font-mono font-bold text-gold-300">{impossible ? '—' : fmt(oh)} M</p>
        </div>
      </div>
      <div className="h-3 rounded-full bg-gradient-to-r from-rose-500 via-slate-200 to-gold-500 relative">
        {!impossible && (
          <span className="absolute -top-1 h-5 w-1.5 rounded bg-white shadow"
            style={{ left: `${Math.min(100, Math.max(0, (ph + 2) / 18 * 100))}%` }} />
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-400">pH =</span>
        <input value={typed} onChange={e => commit(e.target.value)}
          className="w-20 px-2 py-1 rounded-lg bg-slate-900 border border-slate-600 font-mono text-xs text-white focus:outline-none focus:border-gold-400" />
        <span className={`text-[11px] font-black ${band === 'acidic' ? 'text-rose-300' : band === 'neutral' ? 'text-slate-200' : 'text-gold-300'}`}>
          {band} solution
        </span>
        <AskButton onClick={ask} disabled={state.loading || impossible}
          label="Verify with solver" />
      </div>
      <StepsList s={state} />
      {impossible && (
        <MisconceptionPanel
          misconception={misconData?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
          commonMisconception={misconData?.common_misconception ?? null}
        >
          <p className="text-[11px] text-slate-300">
            pH = {fmt(ph)} is impossible for an aqueous solution at 25 °C:
            pH + pOH = 14 pins BOTH values between 0 and 14. The pH scale is
            logarithmic — [H+] = 10^-pH, so it can never go negative.
          </p>
        </MisconceptionPanel>
      )}
    </div>
  )
}

// --------------------------------------------------------------- gas bench --

type GasLaw = 'boyle_v' | 'boyle_p' | 'charles_v' | 'charles_t' | 'gaylussac' | 'combined_p' | 'combined_v'

const GAS_LAWS: { key: GasLaw; label: string }[] = [
  { key: 'boyle_v', label: 'Boyle → V2' },
  { key: 'boyle_p', label: 'Boyle → P2' },
  { key: 'charles_v', label: 'Charles → V2' },
  { key: 'charles_t', label: 'Charles → T2' },
  { key: 'gaylussac', label: 'Gay-Lussac → P2' },
  { key: 'combined_p', label: 'Combined → P2' },
  { key: 'combined_v', label: 'Combined → V2' },
]

function GasBench() {
  const [law, setLaw] = useState<GasLaw>('boyle_v')
  const [p1, setP1] = useState(1)
  const [v1, setV1] = useState(500)
  const [t1, setT1] = useState(300)
  const [p2, setP2] = useState(2)
  const [v2, setV2] = useState(600)
  const [t2, setT2] = useState(450)
  const [state, setState] = useState<SolveState>(IDLE)

  const { text, asked } = useMemo(() => {
    switch (law) {
      case 'boyle_v': return {
        text: `A gas occupies ${v1} mL at ${p1} atm. If the pressure is changed to ${p2} atm at constant temperature, find the new volume.`,
        asked: 'V2',
      }
      case 'boyle_p': return {
        text: `A gas at constant temperature has a volume of ${v1} mL at a pressure of ${p1} atm. The volume is changed to ${v2} mL. Find the new pressure.`,
        asked: 'P2',
      }
      case 'charles_v': return {
        text: `A gas has a volume of ${v1} mL at constant pressure when its temperature is ${t1 - 273} C. If the temperature rises to ${t2 - 273} C, find the new volume.`,
        asked: 'V2',
      }
      case 'charles_t': return {
        text: `A gas at constant pressure has a volume of ${v1} mL at ${t1} K. The volume is changed to ${v2} mL. Find the new temperature.`,
        asked: 'T2',
      }
      case 'gaylussac': return {
        text: `At constant volume, a gas at ${t1} K has a pressure of ${p1} atm. The temperature rises to ${t2} K. Find the new pressure.`,
        asked: 'P2',
      }
      case 'combined_p': return {
        text: `Using the combined gas law: a gas at P1 = ${p1} atm, V1 = ${v1 / 1000} L, T1 = ${t1} K is taken to V2 = ${v2 / 1000} L and T2 = ${t2} K. Find P2.`,
        asked: 'P2',
      }
      case 'combined_v': return {
        text: `Using the combined gas law: a gas at P1 = ${p1} atm, V1 = ${v1 / 1000} L, T1 = ${t1} K is taken to P2 = ${p2} atm and T2 = ${t2} K. Find V2.`,
        asked: 'V2',
      }
    }
  }, [law, p1, v1, t1, p2, v2, t2])

  const ask = async () => {
    setState({ ...IDLE, loading: true })
    setState(await askSolver(text))
  }

  const result = state.matched ? state.numeric_answer : null
  const volNow = result !== null && (asked === 'V2' ? result : v2) // mL
  const tNow = asked === 'T2' && result !== null ? result : t2

  return (
    <div className="space-y-3">
      <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 space-y-3">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
          gas piston — drag the state, the solver computes the new one
        </p>
        <div className="flex flex-wrap gap-1.5">
          {GAS_LAWS.map(l => (
            <button key={l.key} onClick={() => { setLaw(l.key); setState(IDLE) }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${law === l.key ? 'bg-gold-500/15 border-gold-400/60 text-gold-200' : 'border-slate-600 text-slate-300 hover:border-gold-400/50'}`}>
              {l.label}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          <Num label="P1 (atm)" value={p1} min={0.2} max={10} step={0.1} onChange={setP1} />
          <Num label="P2 (atm)" value={p2} min={0.2} max={10} step={0.1} onChange={setP2} />
          <Num label="V1 (mL)" value={v1} min={100} max={2000} step={10} onChange={setV1} />
          <Num label="V2 (mL)" value={v2} min={100} max={2000} step={10} onChange={setV2} />
          <Num label="T1 (K)" value={t1} min={150} max={900} step={5} onChange={setT1} />
          <Num label="T2 (K)" value={t2} min={150} max={900} step={5} onChange={setT2} />
        </div>
        <div className="flex items-center gap-2">
          <AskButton onClick={ask} disabled={state.loading} label={`Solve for ${asked}`} />
          <code className="text-[10px] text-slate-500 break-all">{text}</code>
        </div>
        <StepsList s={state} />
      </div>
      {/* piston visual — position mirrors the solver's answer */}
      <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
          piston (V {"∝"} cylinder height; gas colour tracks temperature)
        </p>
        <svg viewBox="0 0 220 150" className="w-full max-w-xs mx-auto">
          <rect x="60" y="20" width="100" height="110" fill="none" stroke="#475569" strokeWidth="3" rx="4" />
          <rect x="63" y={volNow ? 130 - Math.max(14, Math.min(100, (volNow / 2000) * 110)) : 90}
            width="94" height={volNow ? Math.max(14, Math.min(100, (volNow / 2000) * 110)) : 40}
            fill={tNow > 500 ? '#f97316' : tNow < 250 ? '#38bdf8' : '#22c55e'} opacity="0.55" rx="2" />
          <rect x="56" y={volNow ? 130 - Math.max(14, Math.min(100, (volNow / 2000) * 110)) - 8 : 82}
            width="108" height="8" fill="#94a3b8" rx="2" />
          <text x="10" y="80" fill="#64748b" fontSize="9" fontWeight="bold">P {fmt(asked === 'P2' && result !== null ? result : p2)} atm</text>
          <text x="168" y="80" fill="#64748b" fontSize="9" fontWeight="bold">T {fmt(tNow)} K</text>
          <text x="10" y="140" fill="#64748b" fontSize="9" fontWeight="bold">V {volNow ? fmt(volNow) : '—'} mL</text>
        </svg>
      </div>
    </div>
  )
}

// -------------------------------------------------------------- atom bench --

const ATOM_MISCON_NODE = 'c11_chem_cbse_02_001'

function AtomBench({ miscon }: { miscon: (id?: string) => Promise<void> }) {
  const [z, setZ] = useState(6)
  const [n, setN] = useState(6)
  const [e, setE] = useState(6)
  const [misconData, setMisconData] = useState<EnrichmentData | null>(null)

  useEffect(() => { miscon(ATOM_MISCON_NODE) }, [miscon])
  useEffect(() => {
    let live = true
    fetchEnrichment(ATOM_MISCON_NODE).then(d => { if (live) setMisconData(d) })
    return () => { live = false }
  }, [])

  const el = ELEMENTS.find(x => x.z === z) ?? ELEMENTS[0]
  const a = z + n
  const charge = z - e
  const isIon = charge !== 0
  const isIsotope = a !== Math.round(el.mass)
  const shells: number[] = []
  let left = e
  for (const cap of SHELL_CAPACITIES) {
    if (left <= 0) break
    const put = Math.min(cap, left)
    shells.push(put)
    left -= put
  }
  const ionName = charge > 0 ? `cation (${charge}+)` : `anion (${Math.abs(charge)}-)`

  return (
    <div className="grid md:grid-cols-2 gap-3">
      <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 space-y-3">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
          atom builder — protons name the element, neutrons the isotope,
          electrons the ion
        </p>
        <Num label="protons (Z)" value={z} min={1} max={20} step={1} onChange={v => { setZ(v); setE(v) }} />
        <Num label="neutrons" value={n} min={0} max={28} step={1} onChange={setN} />
        <Num label="electrons" value={e} min={0} max={22} step={1} onChange={setE} />
        <div className="rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 space-y-0.5">
          <p className="text-sm font-black text-white">
            {el.name} · <span className="font-mono">{el.symbol}</span>
            <span className="text-slate-500 font-mono text-xs"> Z={z}, A={a}</span>
          </p>
          <p className="text-[11px] text-slate-300 font-mono">
            shells {shells.join(', ') || '0'} · config {shells.join('-') || 'empty'}
          </p>
          <p className="text-[11px]">
            {isIon ? (
              <span className={charge > 0 ? 'text-rose-300 font-bold' : 'text-gold-300 font-bold'}>
                ION — {ionName}, charge {charge > 0 ? `+${charge}` : charge}
              </span>
            ) : (
              <span className="text-emerald-300 font-bold">neutral atom (protons = electrons)</span>
            )}
            {isIsotope && (
              <span className="text-amber-300 font-bold"> · isotope ({el.symbol}-{a})</span>
            )}
          </p>
        </div>
        {isIon && (
          <MisconceptionPanel
            misconception={misconData?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
            commonMisconception={misconData?.common_misconception ?? null}
          >
            <p className="text-[11px] text-slate-300">
              You built {el.symbol} with {e} electrons vs {z} protons — that
              is an ion, not the element&apos;s atom. The ELEMENT is decided by
              protons alone; electrons only set the charge.
            </p>
          </MisconceptionPanel>
        )}
      </div>
      {/* 2n^2 shell diagram */}
      <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4 flex items-center justify-center">
        <svg viewBox="0 0 260 260" className="w-full max-w-[260px]">
          <circle cx="130" cy="130" r="26" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <text x="130" y="128" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold">{el.symbol}</text>
          <text x="130" y="142" textAnchor="middle" fill="#64748b" fontSize="8">{z}p {n}n</text>
          {shells.map((cnt, i) => {
            const r = 48 + i * 26
            const cap = SHELL_CAPACITIES[i]
            return (
              <g key={i}>
                <circle cx="130" cy="130" r={r} fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
                {Array.from({ length: cnt }).map((_, k) => {
                  const ang = (2 * Math.PI * k) / Math.max(cnt, 1)
                  const x = 130 + r * Math.cos(ang)
                  const y = 130 + r * Math.sin(ang)
                  return <circle key={k} cx={x} cy={y} r="4.5" fill="#38bdf8" />
                })}
                <text x={130 + r + 2} y="16" fill="#475569" fontSize="8" textAnchor="middle">
                  {cap === 2 ? '2' : `2×${i + 1}²=${cap}`}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

// --------------------------------------------------------- molecules bench --

type MolKey = 'H2O' | 'CO2' | 'CH4' | 'NH3' | 'NaCl'
const MOL_KEYS: { key: MolKey; label: string }[] = [
  { key: 'H2O', label: 'Water' },
  { key: 'CO2', label: 'Carbon dioxide' },
  { key: 'CH4', label: 'Methane' },
  { key: 'NH3', label: 'Ammonia' },
  { key: 'NaCl', label: 'Salt lattice' },
]

function MoleculesBench() {
  const [mol, setMol] = useState<MolKey>('H2O')
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {MOL_KEYS.map(m => (
          <button key={m.key} onClick={() => setMol(m.key)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-black border transition ${mol === m.key ? 'bg-gold-500/15 border-gold-400/60 text-gold-200' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
            {m.label}
          </button>
        ))}
      </div>
      <div className="h-80 rounded-2xl overflow-hidden border border-slate-700">
        <MoleculeViewer molecule={mol} />
      </div>
    </div>
  )
}
