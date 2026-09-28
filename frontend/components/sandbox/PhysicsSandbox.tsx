'use client'

/**
 * PhysicsSandbox — the physics tab of /sandbox.
 *
 * Engine mix per SANDBOX_TAXONOMY.md: E1 Parameter Lab (projectile,
 * circuits, waves, gravitation sliders) + E3 Virtual Lab (optics bench,
 * incline plane) + E4 System Simulator (two-body field). Every scene is
 * wired to the same closed-world loop as the maths sandbox:
 *
 *   sliders → POST /api/sandbox/solve (subject 'physics': the chained
 *   physics_families / physics2 / physics3 dispatcher) → step chain
 *   …and when the student builds an IMPOSSIBLE state (v^2 = u^2 + 2as
 *   with a negative discriminant, R ≤ 0, object at the focal point) →
 *   MisconceptionPanel with the authored corpus content for the topic's
 *   node (remediation.ts, honest degradation — never invented text).
 *
 * The 3D stages are next/dynamic(ssr:false) so three.js stays out of the
 * page's first-load bundle (no Lighthouse regression).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Play, Braces, Rocket, Triangle, Zap, Eye, Waves, Orbit } from 'lucide-react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import { fetchEnrichment, type EnrichmentData } from '@/components/learn/remediation'
import { PHYSICS_SANDBOX_CLASSES, TOTAL_PHYSICS_TOPICS, type PhysicsTopic } from './physicsTopics'

const loading3D = () => (
  <div className="h-full w-full grid place-items-center text-xs text-slate-500">
    loading 3D stage…
  </div>
)

const Projectile3D = dynamic(
  () => import('./PhysicsScene3D').then(m => m.default), { ssr: false, loading: loading3D })
const Wave3D = dynamic(
  () => import('./PhysicsScene3D').then(m => m.Wave3D), { ssr: false, loading: loading3D })
const TwoBody3D = dynamic(
  () => import('./PhysicsScene3D').then(m => m.TwoBody3D), { ssr: false, loading: loading3D })

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

async function askPhysics(text: string): Promise<SolveState> {
  try {
    const r = await fetch('/api/sandbox/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject: 'physics', text }),
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
  } catch (e: unknown) {
    return { ...IDLE, note: e instanceof Error ? e.message : 'solver unreachable' }
  }
}

function fmt(v: number): string {
  if (!Number.isFinite(v)) return 'undefined'
  if (v !== 0 && Math.abs(v) < 0.01) return v.toExponential(3)
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

function Slider({ label, value, min, max, step, onChange, unit }:
  { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; unit?: string }) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <span className="w-24 text-slate-400 font-semibold">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 accent-sky-400" />
      <span className="w-16 text-right font-mono text-slate-200">
        {fmt(value)}{unit ? ` ${unit}` : ''}
      </span>
    </label>
  )
}

/** Authored misconception content for one corpus node (or honest null). */
function useMisconception(nodeId: string | undefined, trigger: boolean) {
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)
  useEffect(() => {
    if (!trigger || !nodeId) { setMiscon(null); return }
    let live = true
    fetchEnrichment(nodeId).then(d => { if (live) setMiscon(d) })
    return () => { live = false }
  }, [nodeId, trigger])
  return miscon
}

const Panel = ({ misconception, commonMisconception }: { misconception?: string | null; commonMisconception?: string | null }) => (
  <MisconceptionPanel misconception={misconception} commonMisconception={commonMisconception} />
)

const misconOf = (m: EnrichmentData | null) => ({
  misconception: m?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null,
  commonMisconception: m?.common_misconception ?? null,
})

// ------------------------------------------------------------ main shell --

type Tab = 'solve' | 'projectile' | 'incline' | 'circuit' | 'optics' | 'waves' | 'gravity'

const TABS: { key: Tab; label: string; icon: typeof Braces }[] = [
  { key: 'solve', label: 'Solve & explain', icon: Braces },
  { key: 'projectile', label: 'Projectile lab', icon: Rocket },
  { key: 'incline', label: 'Incline plane', icon: Triangle },
  { key: 'circuit', label: 'Circuits', icon: Zap },
  { key: 'optics', label: 'Optics bench', icon: Eye },
  { key: 'waves', label: 'Waves', icon: Waves },
  { key: 'gravity', label: 'Gravitation', icon: Orbit },
]

const PROGRESS_KEY = 'physics_sandbox_explored_v1'
const G = 9.8

export default function PhysicsSandbox() {
  const [bandKey, setBandKey] = useState('c11')
  const [chapterKey, setChapterKey] = useState('c11_kin')
  const [topic, setTopic] = useState<PhysicsTopic | null>(null)
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

  const band = PHYSICS_SANDBOX_CLASSES.find(b => b.key === bandKey)
    ?? PHYSICS_SANDBOX_CLASSES[0]
  const chapter = band.chapters.find(c => c.key === chapterKey)
    ?? band.chapters[0]

  const pickTopic = (tp: PhysicsTopic) => {
    setTopic(tp)
    setTab('solve')
    markExplored(tp.key)
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden">
      {/* header: class + chapter pickers, progress chip */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <h2 className="font-black text-lg text-white">
            ⚛️ Physics Sandbox
            <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              projectile · incline · circuits · optics · waves · gravitation · solver
            </span>
          </h2>
          <span className="text-[10px] font-black text-emerald-300/80">
            explored {explored.size}/{TOTAL_PHYSICS_TOPICS} topics
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap mb-1.5">
          {PHYSICS_SANDBOX_CLASSES.map(b => (
            <button key={b.key} onClick={() => { setBandKey(b.key); setChapterKey(b.chapters[0].key); setTopic(null) }}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition ${b.key === bandKey ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
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
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold whitespace-nowrap border-b-2 transition ${tab === tb.key ? 'border-sky-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
            <tb.icon className="w-3.5 h-3.5" />
            {tb.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {tab === 'solve' && (
          <SolveTab topic={topic} markExplored={markExplored} />
        )}
        {tab === 'projectile' && <ProjectileTab />}
        {tab === 'incline' && <InclineTab />}
        {tab === 'circuit' && <CircuitTab markExplored={markExplored} />}
        {tab === 'optics' && <OpticsTab />}
        {tab === 'waves' && <WavesTab />}
        {tab === 'gravity' && <GravityTab />}
      </div>
    </div>
  )
}

// ------------------------------------------------------------- solve tab --

function SolveTab({ topic, markExplored }:
  { topic: PhysicsTopic | null; markExplored: (k: string) => void }) {
  const [text, setText] = useState(
    topic?.prompt ?? 'A car starts with a velocity of 5 m/s and accelerates uniformly at 2 m/s^2 for 10 s. Find its final velocity')
  const [res, setRes] = useState<SolveState>(IDLE)
  const topicKey = useRef(topic?.key)

  useEffect(() => {
    if (topic && topic.key !== topicKey.current) {
      topicKey.current = topic.key
      setText(topic.prompt)
      setRes(IDLE)
    }
  }, [topic])

  const run = async () => {
    setRes({ ...IDLE, loading: true })
    const out = await askPhysics(text)
    setRes(out)
    if (out.matched && topic) markExplored(topic.key)
  }

  return (
    <div>
      <div className="flex gap-2">
        <textarea value={text} onChange={e => setText(e.target.value)} rows={2}
          placeholder="Type a textbook-style problem…"
          className="flex-1 rounded-xl bg-slate-800/70 border border-slate-600 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-400" />
        <button onClick={run} disabled={res.loading}
          className="self-stretch px-4 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-50 text-slate-950 font-black text-sm flex items-center gap-1.5">
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
      <p className="text-[11px] text-slate-500 mt-2">
        Deterministic families only: kinematics, Newton&apos;s laws, work-energy-power,
        gravitation, fluids, heat, oscillations, waves, electricity, Coulomb, optics —
        classes 6 to 12.
      </p>
    </div>
  )
}

// -------------------------------------------------------- projectile tab --

function ProjectileTab() {
  const [u, setU] = useState(20)
  const [angle, setAngle] = useState(40)
  const [solver, setSolver] = useState<SolveState>(IDLE)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)

  const th = (angle * Math.PI) / 180
  const uy = u * Math.sin(th)
  const H = (uy * uy) / (2 * G)
  const T = (2 * uy) / G
  const R = u * Math.cos(th) * T

  return (
    <div className="grid md:grid-cols-[1fr_270px] gap-4">
      <div className="h-[380px] rounded-xl border border-slate-700 overflow-hidden">
        <Projectile3D u={u} angle={angle} />
      </div>
      <div className="space-y-2.5">
        <Slider label="speed u" value={u} min={5} max={40} step={1} onChange={setU} unit="m/s" />
        <Slider label="angle" value={angle} min={10} max={80} step={1} onChange={setAngle} unit="°" />
        <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2 space-y-1">
          <Row k="vertical speed u·sinθ" v={`${fmt(uy)} m/s`} />
          <Row k="max height (v² = u²+2as)" v={`${fmt(H)} m`} />
          <Row k="flight time (v = u + at)" v={`${fmt(T)} s`} />
          <Row k="range (u·cosθ × t)" v={`${fmt(R)} m`} accent />
        </div>
        <p className="text-[11px] text-slate-500">
          45° maximises the range. The solver derives the height and time from
          the same kinematics equations you study — drag and watch them move.
        </p>
        <button onClick={() => askPhysicsThen(`A ball is thrown vertically upward with a velocity of ${fmt(uy)} m/s (g = 9.8 m/s^2). Find the maximum height reached`, setSolver, setMiscon)}
          className="w-full px-2 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px]">
          Solver: max height steps
        </button>
        <button onClick={() => askPhysicsThen(`A ball is thrown vertically upward with a velocity of ${fmt(uy)} m/s. How long will it take to reach the maximum height (g = 9.8)?`, setSolver, setMiscon)}
          className="w-full px-2 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[11px]">
          Solver: rise time steps
        </button>
        <StepsList s={solver} />
        <Panel {...misconOf(miscon)} />
      </div>
    </div>
  )
}

async function askPhysicsThen(
  prompt: string,
  setSolver: (s: SolveState) => void,
  setMiscon: (m: EnrichmentData | null) => void,
) {
  setMiscon(null)
  setSolver({ ...IDLE, loading: true })
  const out = await askPhysics(prompt)
  setSolver(out)
  if (!out.matched) {
    fetchEnrichment('c11_phy_cbse_02_001').then(setMiscon)
  }
}

function Row({ k, v, accent }:
  { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-slate-400">{k}</span>
      <span className={`font-mono ${accent ? 'text-emerald-300' : 'text-slate-200'}`}>{v}</span>
    </div>
  )
}

// ----------------------------------------------------------- incline tab --

function InclineTab() {
  const [m, setM] = useState(5)
  const [angle, setAngle] = useState(25)
  const [mu, setMu] = useState(0.3)
  const [solver, setSolver] = useState<SolveState>(IDLE)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)

  const th = (angle * Math.PI) / 180
  const downhill = m * G * Math.sin(th)
  const nForce = m * G * Math.cos(th)
  const fMax = mu * nForce
  const slides = downhill > fMax && mu > 0
  const aSliding = slides ? G * (Math.sin(th) - mu * Math.cos(th)) : 0

  const askFriction = async () => {
    setMiscon(null)
    setSolver({ ...IDLE, loading: true })
    const out = await askPhysics(
      `A block of mass ${fmt(m)} kg rests on a table. The coefficient of friction is ${fmt(mu)}. Find the force of friction (g = 9.8 m/s^2)`)
    setSolver(out)
    if (!out.matched) fetchEnrichment('c11_phy_cbse_04_001').then(setMiscon)
  }

  const askAccel = async () => {
    setMiscon(null)
    setSolver({ ...IDLE, loading: true })
    const out = await askPhysics(
      `A force of ${fmt(downhill)} N acts on a mass of ${fmt(m)} kg. Find the acceleration`)
    setSolver(out)
    if (!out.matched) fetchEnrichment('c11_phy_cbse_04_001').then(setMiscon)
  }

  return (
    <div className="grid md:grid-cols-[1fr_270px] gap-4">
      <div>
        <svg viewBox="0 0 420 300" className="w-full rounded-xl border border-slate-700 bg-slate-950">
          {/* incline */}
          <polygon points={`40,260 ${40 + 300 * Math.cos(th)},260 40,${260 - 300 * Math.sin(th)}`}
            fill="rgba(56,189,248,0.10)" stroke="#38bdf8" strokeWidth={2} />
          {/* block on the slope */}
          {(() => {
            const bx = 40 + 110 * Math.cos(th)
            const by = 260 - 110 * Math.sin(th)
            return (
              <g transform={`translate(${bx},${by}) rotate(${-angle})`}>
                <rect x={-16} y={-14} width={32} height={14} rx={2}
                  fill={slides ? '#f59e0b' : '#64748b'} />
              </g>
            )
          })()}
          {/* downhill force arrow */}
          <line
            x1={40 + 170 * Math.cos(th)} y1={260 - 170 * Math.sin(th)}
            x2={40 + 230 * Math.cos(th)} y2={260 - 230 * Math.sin(th)}
            stroke={slides ? '#f43f5e' : '#475569'} strokeWidth={3}
            markerEnd="url(#arrow)" />
          <text x={12} y={22} fill="#94a3b8" fontSize={12} fontWeight="bold">
            θ = {fmt(angle)}° · mg·sinθ = {fmt(downhill)} N · μmg·cosθ = {fmt(fMax)} N
          </text>
          <text x={12} y={40} fill={slides ? '#f59e0b' : '#64748b'} fontSize={12} fontWeight="bold">
            {slides
              ? `slides: a = g(sinθ − μcosθ) = ${fmt(aSliding)} m/s²`
              : `static: friction holds (μ ${mu === 0 ? '≥' : '≥'} tanθ = ${fmt(Math.tan(th))})`}
          </text>
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 z" fill="#f43f5e" />
            </marker>
          </defs>
        </svg>
        <p className="text-[11px] text-slate-500 mt-1.5">
          Raise the ramp or the grip. μ ≥ tanθ is the boundary: below it the
          block slides, at it the block just holds.
        </p>
      </div>
      <div className="space-y-2.5">
        <Slider label="mass m" value={m} min={1} max={20} step={0.5} onChange={setM} unit="kg" />
        <Slider label="angle θ" value={angle} min={0} max={60} step={1} onChange={setAngle} unit="°" />
        <Slider label="grip μ" value={mu} min={0} max={1} step={0.05} onChange={setMu} />
        <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2 space-y-1">
          <Row k="normal N = mg·cosθ" v={`${fmt(nForce)} N`} />
          <Row k="max friction μN" v={`${fmt(fMax)} N`} />
          <Row k="downhill mg·sinθ" v={`${fmt(downhill)} N`} accent />
        </div>
        <button onClick={askFriction}
          className="w-full px-2 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px]">
          Solver: friction steps (f = μN)
        </button>
        <button onClick={askAccel}
          className="w-full px-2 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[11px]">
          Solver: downhill a = F/m
        </button>
        <StepsList s={solver} />
        <Panel {...misconOf(miscon)} />
      </div>
    </div>
  )
}

// ----------------------------------------------------------- circuit tab --

function CircuitTab({ markExplored }: { markExplored: (k: string) => void }) {
  const [series, setSeries] = useState(true)
  const [v, setV] = useState(12)
  const [r1, setR1] = useState(4)
  const [r2, setR2] = useState(6)
  const [custom, setCustom] = useState<string>('6')
  const [solver, setSolver] = useState<SolveState>(IDLE)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)

  const r1Eff = custom !== '' && Number(custom) !== r1 ? Number(custom) : r1
  const bad = !Number.isFinite(r1Eff) || r1Eff <= 0 || r2 <= 0
  const rtot = series ? r1Eff + r2 : (r1Eff * r2) / (r1Eff + r2)
  const current = !bad && rtot > 0 ? v / rtot : null

  useEffect(() => {
    if (!bad) { setMiscon(null); return }
    let live = true
    fetchEnrichment('c10_phy_cbse_01_001').then(d => { if (live) setMiscon(d) })
    return () => { live = false }
  }, [bad])

  const askRtot = async () => {
    if (bad) return
    setMiscon(null)
    setSolver({ ...IDLE, loading: true })
    const prompt = series
      ? `Find the total resistance of ${fmt(r1Eff)} ohm and ${fmt(r2)} ohm in series`
      : `Find the total resistance of ${fmt(r1Eff)} ohm and ${fmt(r2)} ohm in parallel`
    const out = await askPhysics(prompt)
    setSolver(out)
    if (out.matched) markExplored(series ? 'c10_series' : 'c10_par')
  }

  const askCurrent = async () => {
    if (bad || rtot <= 0) return
    setMiscon(null)
    setSolver({ ...IDLE, loading: true })
    const out = await askPhysics(
      `A voltage of ${fmt(v)} V is applied across a resistance of ${fmt(rtot)} ohm. Find the current`)
    setSolver(out)
    if (out.matched) markExplored('c10_ohm')
  }

  return (
    <div className="grid md:grid-cols-[1fr_270px] gap-4">
      <div>
        <svg viewBox="0 0 420 260" className="w-full rounded-xl border border-slate-700 bg-slate-950">
          {/* battery */}
          <line x1={60} y1={200} x2={60} y2={160} stroke="#fbbf24" strokeWidth={3} />
          <line x1={48} y1={160} x2={72} y2={160} stroke="#fbbf24" strokeWidth={3} />
          <line x1={54} y1={150} x2={66} y2={150} stroke="#fbbf24" strokeWidth={3} />
          <line x1={60} y1={150} x2={60} y2={110} stroke="#94a3b8" strokeWidth={2} />
          <text x={20} y={185} fill="#fbbf24" fontSize={12} fontWeight="bold">{fmt(v)} V</text>
          {/* top wire */}
          <line x1={60} y1={110} x2={150} y2={110} stroke="#94a3b8" strokeWidth={2} />
          {/* R1 box */}
          <rect x={150} y={92} width={80} height={36} rx={6} fill={bad ? '#7f1d1d' : '#1e293b'} stroke={bad ? '#f43f5e' : '#38bdf8'} strokeWidth={2} />
          <text x={190} y={115} fill="#e2e8f0" fontSize={13} fontWeight="bold" textAnchor="middle">R₁ {fmt(r1Eff)}Ω</text>
          <line x1={230} y1={110} x2={310} y2={110} stroke="#94a3b8" strokeWidth={2} />
          {series ? (
            <>
              <rect x={310} y={92} width={80} height={36} rx={6} fill="#1e293b" stroke="#a78bfa" strokeWidth={2} />
              <text x={350} y={115} fill="#e2e8f0" fontSize={13} fontWeight="bold" textAnchor="middle">R₂ {fmt(r2)}Ω</text>
              <line x1={390} y1={110} x2={396} y2={110} stroke="#94a3b8" strokeWidth={2} />
              <line x1={396} y1={110} x2={396} y2={200} stroke="#94a3b8" strokeWidth={2} />
            </>
          ) : (
            <>
              {/* parallel branch */}
              <line x1={310} y1={110} x2={310} y2={60} stroke="#94a3b8" strokeWidth={2} />
              <line x1={310} y1={60} x2={350} y2={60} stroke="#94a3b8" strokeWidth={2} />
              <line x1={310} y1={160} x2={350} y2={160} stroke="#94a3b8" strokeWidth={2} />
              <line x1={310} y1={110} x2={310} y2={160} stroke="#94a3b8" strokeWidth={2} />
              <rect x={350} y={44} width={46} height={32} rx={6} fill="#1e293b" stroke="#a78bfa" strokeWidth={2} />
              <text x={373} y={65} fill="#e2e8f0" fontSize={11} fontWeight="bold" textAnchor="middle">R₂</text>
              <rect x={350} y={144} width={46} height={32} rx={6} fill="#1e293b" stroke="#a78bfa" strokeWidth={2} />
              <text x={373} y={165} fill="#e2e8f0" fontSize={11} fontWeight="bold" textAnchor="middle">R₂</text>
              <line x1={396} y1={60} x2={410} y2={60} stroke="#94a3b8" strokeWidth={2} />
              <line x1={410} y1={60} x2={410} y2={200} stroke="#94a3b8" strokeWidth={2} />
              <line x1={396} y1={160} x2={410} y2={160} stroke="#94a3b8" strokeWidth={2} />
            </>
          )}
          <line x1={60} y1={200} x2={series ? 396 : 410} y2={200} stroke="#94a3b8" strokeWidth={2} />
          <text x={12} y={30} fill="#94a3b8" fontSize={12} fontWeight="bold">
            {series ? 'series: R = R₁ + R₂' : 'parallel: R = R₁R₂ / (R₁+R₂)'} · I = V/R
          </text>
        </svg>
        {bad ? (
          <p className="rounded-lg bg-rose-500/10 border border-rose-400/30 px-2 py-1.5 text-[11px] text-rose-200 font-semibold mt-1.5">
            Impossible circuit: a resistance of {fmt(r1Eff)} Ω breaks Ohm&apos;s law —
            resistance is a property of the material and can never be zero or
            negative. Type a positive value.
          </p>
        ) : (
          <p className="text-[11px] text-slate-500 mt-1.5">
            Type a negative value into the custom R₁ box to see why the laws
            refuse it — then ask the solver for the honest numbers.
          </p>
        )}
      </div>
      <div className="space-y-2.5">
        <div className="flex gap-1.5">
          {([true, false] as const).map(s => (
            <button key={String(s)} onClick={() => setSeries(s)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border ${series === s ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
              {s ? 'series' : 'parallel'}
            </button>
          ))}
        </div>
        <Slider label="battery V" value={v} min={1} max={24} step={1} onChange={setV} unit="V" />
        <Slider label="R₂" value={r2} min={1} max={100} step={1} onChange={setR2} unit="Ω" />
        <label className="flex items-center gap-2 text-xs">
          <span className="w-24 text-slate-400 font-semibold">R₁ (type)</span>
          <input value={custom} onChange={e => setCustom(e.target.value)}
            inputMode="decimal"
            className="w-24 rounded-lg bg-slate-800/70 border border-slate-600 px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-sky-400" />
        </label>
        <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2 space-y-1">
          <Row k={`R total (${series ? 'series' : 'parallel'})`} v={bad ? '—' : `${fmt(rtot)} Ω`} />
          <Row k="current I = V/R" v={current === null ? '—' : `${fmt(current)} A`} accent />
        </div>
        <button onClick={askRtot} disabled={bad}
          className="w-full px-2 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-slate-950 font-black text-[11px]">
          Solver: total resistance steps
        </button>
        <button onClick={askCurrent} disabled={bad}
          className="w-full px-2 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-black text-[11px]">
          Solver: current steps (V = I R)
        </button>
        <StepsList s={solver} />
        <Panel {...misconOf(miscon)} />
      </div>
    </div>
  )
}

// ------------------------------------------------------------- optics tab --

type OpticKind = 'lens-convex' | 'lens-concave' | 'mirror-concave' | 'mirror-convex'

function OpticsTab() {
  const [kind, setKind] = useState<OpticKind>('lens-convex')
  const [f, setF] = useState(20)
  const [u, setU] = useState(30)
  const [solver, setSolver] = useState<SolveState>(IDLE)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)

  const isLens = kind.startsWith('lens')
  const kindWord = kind.endsWith('convex') ? 'convex' : 'concave'
  // real-is-positive convention, same as the solver families state in
  // their assumption notes: lens v = fu/(u+f); mirror v = fu/(u−f)
  const vImg = useMemo(() => {
    if (isLens) {
      if (u + f === 0) return null
      return (f * u) / (u + f)
    }
    if (u - f === 0) return null
    return (f * u) / (u - f)
  }, [isLens, f, u])
  const atFocal = Math.abs(u - f) < 0.01

  useEffect(() => {
    if (!atFocal) { setMiscon(null); return }
    let live = true
    fetchEnrichment('c12_phy_cbse_09_001').then(d => { if (live) setMiscon(d) })
    return () => { live = false }
  }, [atFocal])

  const askImage = async () => {
    setMiscon(null)
    setSolver({ ...IDLE, loading: true })
    const noun = isLens ? 'lens' : 'mirror'
    const prompt = `Find the image distance for a ${kindWord} ${noun} of focal length ${fmt(f)} cm with the object placed ${fmt(u)} cm from the ${noun}`
    const out = await askPhysics(prompt)
    setSolver(out)
    if (!out.matched) fetchEnrichment('c12_phy_cbse_09_001').then(setMiscon)
  }

  // scene geometry (px)
  const cx = 210, axisY = 140
  const pxPerCm = Math.min(6, 160 / Math.max(u, f, 1))
  const objX = cx - u * pxPerCm
  const imgX = vImg === null ? null : cx + vImg * pxPerCm * (isLens ? 1 : 1)

  return (
    <div className="grid md:grid-cols-[1fr_270px] gap-4">
      <div>
        <svg viewBox="0 0 420 280" className="w-full rounded-xl border border-slate-700 bg-slate-950">
          {/* principal axis */}
          <line x1={10} y1={axisY} x2={410} y2={axisY} stroke="#334155" strokeWidth={1} strokeDasharray="4 3" />
          {/* lens / mirror symbol */}
          {isLens ? (
            <ellipse cx={cx} cy={axisY} rx={10} ry={70} fill="rgba(56,189,248,0.15)"
              stroke={kind === 'lens-convex' ? '#38bdf8' : '#a78bfa'} strokeWidth={2} />
          ) : (
            <path d={`M ${cx} ${axisY - 70} Q ${cx + (kind === 'mirror-concave' ? 26 : -26)} ${axisY} ${cx} ${axisY + 70}`}
              fill="none" stroke="#f59e0b" strokeWidth={3} />
          )}
          {/* focal marks */}
          <circle cx={cx - f * pxPerCm} cy={axisY} r={3} fill="#f59e0b" />
          <circle cx={cx + f * pxPerCm} cy={axisY} r={3} fill="#f59e0b" />
          <text x={cx - f * pxPerCm - 6} y={axisY + 16} fill="#f59e0b" fontSize={10}>F</text>
          <text x={cx + f * pxPerCm - 6} y={axisY + 16} fill="#f59e0b" fontSize={10}>F</text>
          {/* object arrow */}
          <line x1={objX} y1={axisY} x2={objX} y2={axisY - 44} stroke="#38bdf8" strokeWidth={3} />
          <polygon points={`${objX - 5},${axisY - 44} ${objX + 5},${axisY - 44} ${objX},${axisY - 54}`} fill="#38bdf8" />
          <text x={objX - 10} y={axisY + 32} fill="#38bdf8" fontSize={11} fontWeight="bold">u={fmt(u)}cm</text>
          {/* image arrow */}
          {imgX !== null && Number.isFinite(imgX) && (
            <>
              <line x1={imgX} y1={axisY} x2={imgX} y2={axisY - Math.max(8, 44 * Math.abs(vImg ?? 0) / u)}
                stroke={vImg && vImg > 0 ? '#34d399' : '#f472b6'} strokeWidth={3} />
              <text x={imgX - 10} y={axisY + 32} fill={vImg && vImg > 0 ? '#34d399' : '#f472b6'} fontSize={11} fontWeight="bold">
                v={fmt(Math.abs(vImg ?? 0))}cm{vImg && vImg < 0 ? ' (virtual)' : ' (real)'}
              </text>
            </>
          )}
          {atFocal && (
            <text x={120} y={30} fill="#f43f5e" fontSize={13} fontWeight="bold">
              u = f → refracted rays parallel → image at infinity
            </text>
          )}
        </svg>
        <p className="text-[11px] text-slate-500 mt-1.5">
          {isLens
            ? 'Lens formula 1/v − 1/u = 1/f (real-is-positive): v = fu/(u+f). Green = real image, pink = virtual.'
            : 'Mirror formula 1/v + 1/u = 1/f (real-is-positive): v = fu/(u−f). Slide the object onto F and the image escapes to infinity.'}
        </p>
      </div>
      <div className="space-y-2.5">
        <div className="flex flex-wrap gap-1.5">
          {(['lens-convex', 'lens-concave', 'mirror-concave', 'mirror-convex'] as OpticKind[]).map(k => (
            <button key={k} onClick={() => setKind(k)}
              className={`px-2 py-1 rounded-md text-[10px] font-semibold border ${k === kind ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
              {k.replace('-', ' ')}
            </button>
          ))}
        </div>
        <Slider label="focal f" value={f} min={5} max={40} step={1} onChange={setF} unit="cm" />
        <Slider label="object u" value={u} min={2} max={60} step={1} onChange={setU} unit="cm" />
        <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2 space-y-1">
          <Row k="image distance v" v={vImg === null ? '∞ (at infinity)' : `${fmt(Math.abs(vImg))} cm`} />
          <Row k="nature" v={atFocal ? 'undefined (parallel rays)' : vImg && vImg > 0 ? 'real' : 'virtual'} accent />
        </div>
        <button onClick={askImage}
          className="w-full px-2 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px]">
          Solver: image distance steps
        </button>
        <StepsList s={solver} />
        <Panel {...misconOf(miscon)} />
      </div>
    </div>
  )
}

// -------------------------------------------------------------- waves tab --

function WavesTab() {
  const [f, setF] = useState(1.2)
  const [lam, setLam] = useState(3)
  const [amp, setAmp] = useState(0.6)
  const [solver, setSolver] = useState<SolveState>(IDLE)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)

  const v = f * lam

  const askSpeed = async () => {
    setMiscon(null)
    setSolver({ ...IDLE, loading: true })
    const out = await askPhysics(
      `A wave has a frequency of ${fmt(f)} Hz and a wavelength of ${fmt(lam)} m. Find its speed`)
    setSolver(out)
    if (!out.matched) fetchEnrichment('c11_phy_cbse_14_001').then(setMiscon)
  }

  return (
    <div className="grid md:grid-cols-[1fr_270px] gap-4">
      <div className="h-[380px] rounded-xl border border-slate-700 overflow-hidden">
        <Wave3D f={f} lam={lam} amp={amp} />
      </div>
      <div className="space-y-2.5">
        <Slider label="frequency f" value={f} min={0.2} max={3} step={0.1} onChange={setF} unit="Hz" />
        <Slider label="wavelength λ" value={lam} min={0.5} max={6} step={0.1} onChange={setLam} unit="m" />
        <Slider label="amplitude A" value={amp} min={0.1} max={1.4} step={0.05} onChange={setAmp} unit="m" />
        <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2 space-y-1">
          <Row k="wave speed v = f λ" v={`${fmt(v)} m/s`} accent />
          <Row k="crests per second" v={`${fmt(f)}`} />
        </div>
        <p className="text-[11px] text-slate-500">
          The medium sets v; f and λ adjust to fit it. Amplitude changes the
          energy, never the speed.
        </p>
        <button onClick={askSpeed}
          className="w-full px-2 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px]">
          Solver: wave speed steps (v = f λ)
        </button>
        <StepsList s={solver} />
        <Panel {...misconOf(miscon)} />
      </div>
    </div>
  )
}

// ----------------------------------------------------------- gravity tab --

function GravityTab() {
  const [m1, setM1] = useState(1000)
  const [m2, setM2] = useState(2000)
  const [r, setR] = useState(10)
  const [solver, setSolver] = useState<SolveState>(IDLE)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)

  const F = (6.67e-11 * m1 * m2) / (r * r)

  const askForce = async () => {
    setMiscon(null)
    setSolver({ ...IDLE, loading: true })
    const out = await askPhysics(
      `Find the gravitational force between two masses of ${fmt(m1)} kg and ${fmt(m2)} kg with a distance of ${fmt(r)} m`)
    setSolver(out)
    if (!out.matched) fetchEnrichment('c11_phy_cbse_07_001').then(setMiscon)
  }

  return (
    <div className="grid md:grid-cols-[1fr_270px] gap-4">
      <div className="h-[380px] rounded-xl border border-slate-700 overflow-hidden">
        <TwoBody3D m1={m1} m2={m2} r={r} />
      </div>
      <div className="space-y-2.5">
        <Slider label="mass m₁" value={m1} min={1} max={5000} step={10} onChange={setM1} unit="kg" />
        <Slider label="mass m₂" value={m2} min={1} max={5000} step={10} onChange={setM2} unit="kg" />
        <Slider label="distance r" value={r} min={0.2} max={50} step={0.2} onChange={setR} unit="m" />
        <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2 space-y-1">
          <Row k="force F = G m₁m₂/r²" v={`${F.toExponential(3)} N`} accent />
          <Row k="if r doubles" v={`${((F) / 4).toExponential(3)} N (¼ F)`} />
        </div>
        <p className="text-[11px] text-slate-500">
          Halve the distance and the force quadruples — the inverse-square law
          is why orbits are stable and why r = 0 is not a physical state.
        </p>
        <button onClick={askForce}
          className="w-full px-2 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-[11px]">
          Solver: gravitational force steps
        </button>
        <StepsList s={solver} />
        <Panel {...misconOf(miscon)} />
      </div>
    </div>
  )
}
