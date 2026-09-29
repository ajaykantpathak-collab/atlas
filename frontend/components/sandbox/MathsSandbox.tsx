'use client'

/**
 * MathsSandbox — the mathematics tab of /sandbox.
 *
 * Engine mix per SANDBOX_TAXONOMY.md: E1 Parameter Lab (grapher, sequence
 * visualiser, 3D mensuration manipulatives) + E2 Construction Workbench
 * (draggable-triangle geometry). Maths graphs stay 2D-native; 3D is used
 * only for solids. Every tab is wired to the same closed-world loop:
 *
 *   sliders/inputs → POST /api/sandbox/solve (deterministic maths2 /
 *   applied-maths families) → step chain  …and when the student builds an
 *   IMPOSSIBLE state (triangle-inequality violation, infinite GP with
 *   |r| ≥ 1, tan(90°), a zero-dimension solid, a pole in the domain) →
 *   MisconceptionPanel with the authored corpus content for that topic's
 *   node (remediation.ts, honest degradation — never invented text).
 *
 * The 3D stage is next/dynamic(ssr:false) so three.js stays out of the
 * page's first-load bundle.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Play, Sigma, Triangle, Shapes, LineChart, Braces } from 'lucide-react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import { fetchEnrichment, type EnrichmentData } from '@/components/learn/remediation'
import { MATHS_SANDBOX_CLASSES, type MathsTopic } from './mathsTopics'
import type { SolidKind } from './MathsSolids3D'

const MathsSolids3D = dynamic(() => import('./MathsSolids3D'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center text-xs text-slate-500">
      loading 3D stage…
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

async function askSolver(subject: string, text: string): Promise<SolveState> {
  try {
    const r = await fetch('/api/sandbox/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, text }),
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

function Slider({ label, value, min, max, step, onChange }:
  { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void }) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <span className="w-20 text-slate-400 font-semibold">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 accent-gold-400" />
      <span className="w-12 text-right font-mono text-slate-200">{fmt(value)}</span>
    </label>
  )
}

// ------------------------------------------------------------ main shell --

type Tab = 'solve' | 'graph' | 'geometry' | 'sequence' | 'solids'

const TABS: { key: Tab; label: string; icon: any }[] = [
  { key: 'solve', label: 'Solve & explain', icon: Braces },
  { key: 'graph', label: 'Grapher', icon: LineChart },
  { key: 'geometry', label: 'Geometry bench', icon: Triangle },
  { key: 'sequence', label: 'AP / GP dots', icon: Sigma },
  { key: 'solids', label: 'Solids 3D', icon: Shapes },
]

const PROGRESS_KEY = 'maths_sandbox_explored_v1'

export default function MathsSandbox() {
  const [bandKey, setBandKey] = useState('c10')
  const [chapterKey, setChapterKey] = useState('c10_trig')
  const [topic, setTopic] = useState<MathsTopic | null>(null)
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

  const band = MATHS_SANDBOX_CLASSES.find(b => b.key === bandKey)
    ?? MATHS_SANDBOX_CLASSES[0]
  const chapter = band.chapters.find(c => c.key === chapterKey)
    ?? band.chapters[0]

  const pickTopic = (tp: MathsTopic) => {
    setTopic(tp)
    setTab('solve')
    markExplored(tp.key)
  }

  const totalTopics = MATHS_SANDBOX_CLASSES.reduce(
    (n, b) => n + b.chapters.reduce((m, c) => m + c.topics.length, 0), 0)

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden">
      {/* header: class + chapter pickers, progress chip */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <h2 className="font-black text-lg text-white">
            🧮 Maths Sandbox
            <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              parameter lab · construction bench · solver
            </span>
          </h2>
          <span className="text-[10px] font-black text-emerald-300/80">
            explored {explored.size}/{totalTopics} topics
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap mb-1.5">
          {MATHS_SANDBOX_CLASSES.map(b => (
            <button key={b.key} onClick={() => { setBandKey(b.key); setChapterKey(b.chapters[0].key); setTopic(null) }}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition ${b.key === bandKey ? 'bg-gold-500/20 border-gold-400/60 text-gold-200' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
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
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold whitespace-nowrap border-b-2 transition ${tab === tb.key ? 'border-gold-400 text-white' : 'border-transparent text-slate-400 hover:text-slate-200'}`}>
            <tb.icon className="w-3.5 h-3.5" />
            {tb.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {tab === 'solve' && (
          <SolveTab topic={topic} chapterNodeId={chapter?.topics.find(t => t.nodeId)?.nodeId} />
        )}
        {tab === 'graph' && <GraphTab onMisconception={markExplored} />}
        {tab === 'geometry' && <GeometryTab nodeId={chapter?.topics.find(t => t.nodeId)?.nodeId} onMisconception={markExplored} />}
        {tab === 'sequence' && <SequenceTab nodeId={chapter?.topics.find(t => t.nodeId)?.nodeId} />}
        {tab === 'solids' && <SolidsTab nodeId={chapter?.topics.find(t => t.nodeId)?.nodeId} />}
      </div>
    </div>
  )
}

// ------------------------------------------------------------- solve tab --

function SolveTab({ topic, chapterNodeId }:
  { topic: MathsTopic | null; chapterNodeId?: string }) {
  const [text, setText] = useState(topic?.prompt ?? 'Find the value of sin 30 + cos 60')
  const [subject, setSubject] = useState(topic?.subject ?? 'maths')
  const [res, setRes] = useState<SolveState>(IDLE)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)
  const topicKey = useRef(topic?.key)

  useEffect(() => {
    if (topic && topic.key !== topicKey.current) {
      topicKey.current = topic.key
      setText(topic.prompt)
      setSubject(topic.subject ?? 'maths')
      setRes(IDLE)
      setMiscon(null)
    }
  }, [topic])

  const run = async () => {
    setRes({ ...IDLE, loading: true })
    setMiscon(null)
    const out = await askSolver(subject, text)
    setRes(out)
    if (!out.matched && chapterNodeId) {
      // not a gate — the wording failed; show the topic's authored trap
      setMiscon(await fetchEnrichment(chapterNodeId))
    }
  }

  return (
    <div>
      <div className="flex gap-2 mb-2">
        {(['maths', 'applied_maths'] as const).map(s => (
          <button key={s} onClick={() => setSubject(s)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${subject === s ? 'bg-gold-500/20 border-gold-400/60 text-gold-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
            {s === 'maths' ? 'maths 6-11' : 'applied maths 11-12'}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <textarea value={text} onChange={e => setText(e.target.value)} rows={2}
          placeholder="Type a textbook-style problem…"
          className="flex-1 rounded-xl bg-slate-800/70 border border-slate-600 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-400" />
        <button onClick={run} disabled={res.loading}
          className="self-stretch px-4 rounded-xl bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-slate-950 font-black text-sm flex items-center gap-1.5">
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
      <MisconceptionPanel
        misconception={miscon?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
        commonMisconception={miscon?.common_misconception ?? null} />
    </div>
  )
}

// ------------------------------------------------------------- graph tab --

interface GraphPreset {
  key: string
  label: string
  expr: string
  minClass: number
  pole?: 'x=b'
}

const GRAPH_PRESETS: GraphPreset[] = [
  { key: 'line', label: 'ax + b', expr: 'a*x + b', minClass: 6 },
  { key: 'quad', label: 'ax² + bx + c', expr: 'a*x^2 + b*x + c', minClass: 9 },
  { key: 'cubic', label: 'x³ − 3ax', expr: 'x^3 - 3*a*x', minClass: 10 },
  { key: 'trig', label: 'sin(ax) + cos(bx)', expr: 'sin(a*x) + cos(b*x)', minClass: 11 },
  { key: 'exp', label: 'e^(ax) − b', expr: 'exp(a*x) - b', minClass: 11 },
  { key: 'rational', label: 'a / (x − b)  ⚠ pole', expr: 'a / (x - b)', minClass: 11, pole: 'x=b' },
]

const GRAPH_MISCON_NODE = 'c11_math_cbse_12_001' // limits & derivatives

function GraphTab({ onMisconception }: { onMisconception: (k: string) => void }) {
  const [presetKey, setPresetKey] = useState('quad')
  const preset = GRAPH_PRESETS.find(p => p.key === presetKey) ?? GRAPH_PRESETS[1]
  const [expr, setExpr] = useState(preset.expr)
  const [a, setA] = useState(1)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)
  const [err, setErr] = useState<string | null>(null)
  const [poleHit, setPoleHit] = useState(false)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => { setExpr(preset.expr) }, [preset])

  const compiled = useMemo(() => {
    const safe = expr.replace(/\^/g, '**')
      .replace(/\b(sin|cos|tan|sqrt|abs|log|exp)\(/g, 'Math.$1(')
      .replace(/[^0-9xabc+\-*/().,\sMath*]/g, '')
    try {
      const fn = new Function('x', 'a', 'b', 'c', `'use strict';return (${safe})`) as
        (x: number, a: number, b: number, c: number) => number
      fn(1, 1, 0, 0) // probe
      setErr(null)
      return fn
    } catch {
      setErr('cannot parse that expression — use x, a, b, c and functions sin cos tan sqrt exp log abs')
      return null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expr])

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const W = cv.width, H = cv.height
    const scale = 30 // px per unit
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, W, H)
    // grid
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 1
    for (let gx = W / 2 % scale; gx < W; gx += scale) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke()
    }
    for (let gy = H / 2 % scale; gy < H; gy += scale) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke()
    }
    // axes
    ctx.strokeStyle = '#475569'
    ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke()
    if (!compiled) return
    // curve: 2D-native per taxonomy; the canvas is a tilted-3D stand-in
    let hitPole = false
    ctx.strokeStyle = '#38bdf8'
    ctx.lineWidth = 2
    ctx.beginPath()
    let pen = false
    for (let px = 0; px <= W; px += 1) {
      const x = (px - W / 2) / scale
      let y: number
      try { y = compiled(x, a, b, c) } catch { y = NaN }
      if (!Number.isFinite(y) || Math.abs(y) > 1e4) {
        if (preset.pole && Math.abs(x - b) < 0.01) hitPole = true
        pen = false
        continue
      }
      const py = H / 2 - y * scale
      if (pen) ctx.lineTo(px, py)
      else { ctx.moveTo(px, py); pen = true }
    }
    ctx.stroke()
    setPoleHit(hitPole)
  }, [compiled, a, b, c, preset])

  useEffect(() => {
    if (!poleHit) { setMiscon(null); return }
    onMisconception('graph_pole')
    let live = true
    fetchEnrichment(GRAPH_MISCON_NODE).then(d => { if (live) setMiscon(d) })
    return () => { live = false }
  }, [poleHit, onMisconception])

  return (
    <div className="grid md:grid-cols-[1fr_240px] gap-4">
      <div>
        <canvas ref={canvasRef} width={560} height={380}
          className="w-full rounded-xl border border-slate-700" />
        {err && <p className="text-xs text-amber-300 mt-1.5">{err}</p>}
        {poleHit && (
          <p className="text-xs text-rose-300 mt-1.5 font-semibold">
            ⚠ The curve shoots to infinity near x = {fmt(b)} — the function is
            undefined there (division by zero).
          </p>
        )}
        <MisconceptionPanel
          misconception={miscon?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
          commonMisconception={miscon?.common_misconception ?? null} />
      </div>
      <div className="space-y-2.5">
        <div className="flex flex-wrap gap-1.5">
          {GRAPH_PRESETS.map(p => (
            <button key={p.key} onClick={() => setPresetKey(p.key)}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold border ${p.key === presetKey ? 'bg-gold-500/20 border-gold-400/60 text-gold-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
              {p.label}
            </button>
          ))}
        </div>
        <label className="block text-[11px] text-slate-400 font-semibold">
          expression
          <input value={expr} onChange={e => setExpr(e.target.value)}
            className="mt-1 w-full rounded-lg bg-slate-800/70 border border-slate-600 px-2 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-gold-400" />
        </label>
        <Slider label="a" value={a} min={-5} max={5} step={0.1} onChange={setA} />
        <Slider label="b" value={b} min={-5} max={5} step={0.1} onChange={setB} />
        <Slider label="c" value={c} min={-5} max={5} step={0.1} onChange={setC} />
      </div>
    </div>
  )
}

// ---------------------------------------------------------- geometry tab --

const GEO_MISCON_NODE = 'c10_math_cbse_06_001' // triangles

interface V2 { x: number; y: number }

function GeometryTab({ nodeId, onMisconception }:
  { nodeId?: string; onMisconception: (k: string) => void }) {
  const [pts, setPts] = useState<V2[]>([
    { x: 90, y: 250 }, { x: 330, y: 250 }, { x: 200, y: 70 },
  ])
  const [drag, setDrag] = useState<number | null>(null)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)
  const [solver, setSolver] = useState<SolveState>(IDLE)
  const svgRef = useRef<SVGSVGElement>(null)

  // 30 px = 1 grid unit; sides/areas are computed in grid units so the
  // solver prompt uses the same numbers the axes show
  const sides = useMemo(() => {
    const u = pts.map(p => ({ x: p.x / 30, y: (320 - p.y) / 30 }))
    const d = (p: V2, q: V2) => Math.hypot(q.x - p.x, q.y - p.y)
    const a = d(u[1], u[2]) // side a = BC, opposite A
    const b = d(u[0], u[2])
    const c = d(u[0], u[1])
    const ang = (opp: number, s1: number, s2: number) =>
      Math.acos(Math.min(1, Math.max(-1, (s1 * s1 + s2 * s2 - opp * opp) / (2 * s1 * s2)))) * 180 / Math.PI
    const A = ang(a, b, c), B = ang(b, a, c), C = ang(c, a, b)
    const s = (a + b + c) / 2
    const area = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)))
    return { a, b, c, A, B, C, area }
  }, [pts])

  const violated = sides.area < 4 // degenerate/crossed triangle
  const rightIdx = [sides.A, sides.B, sides.C].findIndex(v => Math.abs(v - 90) < 1.2)

  useEffect(() => {
    if (!violated) { setMiscon(null); return }
    onMisconception('geometry_inequality')
    let live = true
    fetchEnrichment(nodeId ?? GEO_MISCON_NODE).then(d => { if (live) setMiscon(d) })
    return () => { live = false }
  }, [violated, nodeId, onMisconception])

  const move = (e: React.PointerEvent<SVGSVGElement>) => {
    if (drag === null || !svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = Math.min(390, Math.max(10, (e.clientX - rect.left) * 420 / rect.width))
    const y = Math.min(310, Math.max(10, (e.clientY - rect.top) * 320 / rect.height))
    setPts(prev => prev.map((p, i) => (i === drag ? { x, y } : p)))
  }

  const askHeron = async () => {
    const a = fmt(sides.a), b = fmt(sides.b), c = fmt(sides.c)
    setSolver({ ...IDLE, loading: true })
    setSolver(await askSolver('maths',
      `Find the area of a triangle with sides ${a}, ${b} and ${c}`))
  }

  return (
    <div className="grid md:grid-cols-[1fr_250px] gap-4">
      <div>
        <svg ref={svgRef} viewBox="0 0 420 320"
          className="w-full rounded-xl border border-slate-700 bg-slate-950 touch-none"
          onPointerMove={move}
          onPointerUp={() => setDrag(null)}
          onPointerLeave={() => setDrag(null)}>
          <polygon points={pts.map(p => `${p.x},${p.y}`).join(' ')}
            fill={violated ? 'rgba(244,63,94,0.15)' : 'rgba(56,189,248,0.12)'}
            stroke={violated ? '#f43f5e' : '#38bdf8'} strokeWidth={2} />
          {pts.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={11} fill={drag === i ? '#fbbf24' : '#38bdf8'}
                className="cursor-grab" style={{ touchAction: 'none' }}
                onPointerDown={() => setDrag(i)} />
              <text x={p.x + 14} y={p.y - 10} fill="#e2e8f0" fontSize={12} fontWeight="bold">
                {'ABC'[i]} ({fmt(p.x / 30)}, {fmt((320 - p.y) / 30)})
              </text>
            </g>
          ))}
          <text x={12} y={22} fill={violated ? '#f43f5e' : '#94a3b8'} fontSize={12} fontWeight="bold">
            A + B + C = {fmt(sides.A + sides.B + sides.C)}° — always, until the triangle collapses
          </text>
        </svg>
        <p className="text-[11px] text-slate-500 mt-1.5">
          Drag the vertices. A + B + C stays 180°; squash the triangle flat and
          the construction breaks.
        </p>
      </div>
      <div className="space-y-2 text-xs">
        {(['a', 'b', 'c'] as const).map((k, i) => (
          <div key={k} className="flex justify-between">
            <span className="text-slate-400">side {k} ({['BC', 'CA', 'AB'][i]}, opposite {'ABC'[i]})</span>
            <span className="font-mono text-slate-200">{fmt(sides[k])}</span>
          </div>
        ))}
        {(['A', 'B', 'C'] as const).map(k => (
          <div key={k} className="flex justify-between">
            <span className="text-slate-400">angle {k}</span>
            <span className={`font-mono ${Math.abs(sides[k] - 90) < 1.2 ? 'text-amber-300 font-bold' : 'text-slate-200'}`}>
              {fmt(sides[k])}°{Math.abs(sides[k] - 90) < 1.2 ? ' (right)' : ''}
            </span>
          </div>
        ))}
        <div className="flex justify-between border-t border-slate-700 pt-1.5">
          <span className="text-slate-400">area (Heron)</span>
          <span className="font-mono text-emerald-300">{violated ? 'undefined' : fmt(sides.area)}</span>
        </div>
        {rightIdx >= 0 && !violated && (
          <p className="rounded-lg bg-amber-500/10 border border-amber-400/30 px-2 py-1.5 text-[11px] text-amber-200">
            Right angle at {'ABC'[rightIdx]}: check
            {'abc'[(rightIdx + 1) % 3]}² + {'abc'[(rightIdx + 2) % 3]}² =
            {'abc'[rightIdx]}² — Pythagoras holds live.
          </p>
        )}
        {violated && (
          <p className="rounded-lg bg-rose-500/10 border border-rose-400/30 px-2 py-1.5 text-[11px] text-rose-200 font-semibold">
            Impossible triangle: one side is longer than the other two put
            together (triangle inequality violated).
          </p>
        )}
        <button onClick={askHeron} disabled={violated || solver.loading}
          className="w-full px-3 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 disabled:opacity-40 text-slate-950 font-black text-xs">
          Ask the solver for this area
        </button>
        <StepsList s={solver} />
        <MisconceptionPanel
          misconception={miscon?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
          commonMisconception={miscon?.common_misconception ?? null} />
      </div>
    </div>
  )
}

// --------------------------------------------------------- sequence tab --

const SEQ_MISCON_NODE = 'c11_math_cbse_08_001' // sequences & series

function SequenceTab({ nodeId }: { nodeId?: string }) {
  const [mode, setMode] = useState<'AP' | 'GP'>('AP')
  const [a, setA] = useState(1)
  const [d, setD] = useState(2)
  const [r, setR] = useState(1.5)
  const [n, setN] = useState(7)
  const [solver, setSolver] = useState<SolveState>(IDLE)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)

  const terms = useMemo(() => {
    const out: number[] = []
    for (let k = 1; k <= n; k++) {
      out.push(mode === 'AP' ? a + (k - 1) * d : a * Math.pow(r, k - 1))
    }
    return out
  }, [mode, a, d, r, n])

  const gpInfiniteBad = mode === 'GP' && Math.abs(r) >= 1

  const askInfinite = async () => {
    if (gpInfiniteBad) {
      setMiscon(await fetchEnrichment(nodeId ?? SEQ_MISCON_NODE))
      return
    }
    setMiscon(null)
    setSolver({ ...IDLE, loading: true })
    setSolver(await askSolver('maths',
      `Find the sum of the infinite GP with first term ${fmt(a)} and common ratio ${fmt(r)}`))
  }

  const askFinite = async () => {
    setMiscon(null)
    setSolver({ ...IDLE, loading: true })
    const prompt = mode === 'AP'
      ? `Find the sum of the first ${n} terms of the AP with first term ${fmt(a)} and common difference ${fmt(d)}`
      : `Find the sum of the first ${n} terms of the GP with first term ${fmt(a)} and common ratio ${fmt(r)}`
    setSolver(await askSolver('maths', prompt))
  }

  return (
    <div className="grid md:grid-cols-[1fr_250px] gap-4">
      <div>
        <div className="flex gap-1.5 mb-3">
          {(['AP', 'GP'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border ${mode === m ? 'bg-gold-500/20 border-gold-400/60 text-gold-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
              {m === 'AP' ? 'AP (add d)' : 'GP (times r)'}
            </button>
          ))}
        </div>
        <div className="space-y-1.5">
          {terms.map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-14 text-[10px] font-mono text-slate-500">t{i + 1}</span>
              <div className="flex flex-wrap gap-0.5">
                {Array.from({ length: Math.min(60, Math.max(0, Math.round(v))) }).map((_, j) => (
                  <motion.span key={j}
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: j * 0.008 }}
                    className="w-2 h-2 rounded-full bg-gold-400/80 inline-block" />
                ))}
                {Math.round(v) > 60 && (
                  <span className="text-[10px] text-slate-500 ml-1">+{Math.round(v) - 60} more</span>
                )}
              </div>
              <span className="ml-auto text-[11px] font-mono text-slate-300">{fmt(v)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2.5">
        <Slider label="first a" value={a} min={0} max={10} step={1} onChange={setA} />
        {mode === 'AP'
          ? <Slider label="diff d" value={d} min={-5} max={8} step={1} onChange={setD} />
          : <Slider label="ratio r" value={r} min={0.1} max={3} step={0.1} onChange={setR} />}
        <Slider label="terms n" value={n} min={1} max={12} step={1} onChange={setN} />
        <div className="text-xs text-slate-300">
          sum of shown terms = <span className="font-mono text-emerald-300">{fmt(terms.reduce((s, v) => s + v, 0))}</span>
        </div>
        <button onClick={askFinite}
          className="w-full px-3 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs">
          Solver: sum of first {n} terms
        </button>
        {mode === 'GP' && (
          <button onClick={askInfinite}
            className={`w-full px-3 py-2 rounded-xl font-black text-xs ${gpInfiniteBad ? 'bg-rose-500/80 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'}`}>
            {gpInfiniteBad ? `|r| = ${fmt(r)} ≥ 1 — try the infinite sum anyway` : 'Solver: infinite GP sum'}
          </button>
        )}
        <StepsList s={solver} />
        <MisconceptionPanel
          misconception={miscon?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
          commonMisconception={miscon?.common_misconception ?? null} />
      </div>
    </div>
  )
}

// ----------------------------------------------------------- solids tab --

const SOLID_LABEL: Record<SolidKind, string> = {
  cube: 'Cube', cylinder: 'Cylinder', cone: 'Cone',
  sphere: 'Sphere', hemisphere: 'Hemisphere',
}

function SolidsTab({ nodeId }: { nodeId?: string }) {
  const [solid, setSolid] = useState<SolidKind>('cylinder')
  const [s, setS] = useState(5)
  const [h, setH] = useState(10)
  const [solver, setSolver] = useState<SolveState>(IDLE)
  const [miscon, setMiscon] = useState<EnrichmentData | null>(null)
  const zero = (solid === 'cylinder' || solid === 'cone') ? (s <= 0 || h <= 0) : s <= 0

  const measures = useMemo(() => {
    const P = Math.PI
    switch (solid) {
      case 'cube':
        return { V: s ** 3, A: 6 * s * s, extra: [['CSA', 4 * s * s]] as [string, number][] }
      case 'cylinder':
        return { V: P * s * s * h, A: 2 * P * s * (s + h), extra: [['CSA', 2 * P * s * h]] as [string, number][] }
      case 'cone': {
        const L = Math.hypot(s, h)
        return { V: P * s * s * h / 3, A: P * s * (s + L), extra: [['slant l', L], ['CSA', P * s * L]] as [string, number][] }
      }
      case 'sphere':
        return { V: 4 * P * s ** 3 / 3, A: 4 * P * s * s, extra: [] as [string, number][] }
      case 'hemisphere':
        return { V: 2 * P * s ** 3 / 3, A: 3 * P * s * s, extra: [['CSA', 2 * P * s * s]] as [string, number][] }
    }
  }, [solid, s, h])

  useEffect(() => {
    if (!zero) { setMiscon(null); return }
    let live = true
    fetchEnrichment(nodeId ?? 'c10_math_cbse_12_001').then(dd => { if (live) setMiscon(dd) })
    return () => { live = false }
  }, [zero, nodeId])

  const askSolverFor = async (kind: 'volume' | 'surface area') => {
    if (zero) return
    setMiscon(null)
    setSolver({ ...IDLE, loading: true })
    const sv = fmt(s), hv = fmt(h)
    const prompts: Record<SolidKind, string> = {
      cube: `${kind === 'volume' ? 'Find the volume' : 'Find the surface area'} of a cube of edge ${sv}`,
      cylinder: kind === 'volume'
        ? `Find the volume of a cylinder of radius ${sv} and height ${hv}`
        : `Find the total surface area of a cylinder of radius ${sv} and height ${hv}`,
      cone: `Find the volume of a cone of radius ${sv} and height ${hv}`,
      sphere: kind === 'volume'
        ? `Find the volume of a sphere of radius ${sv}`
        : `Find the surface area of a sphere of radius ${sv}`,
      hemisphere: `Find the volume of a hemisphere of radius ${sv}`,
    }
    // surface area of a cone/hemisphere falls back to the volume family +
    // the live HUD already shows the authored formula — keep closed-world
    setSolver(await askSolver('maths', prompts[solid]))
  }

  return (
    <div className="grid md:grid-cols-[1fr_250px] gap-4">
      <div className="h-[380px] rounded-xl border border-slate-700 overflow-hidden">
        <MathsSolids3D solid={solid} s={zero ? 0.001 : s} h={zero ? 0.001 : h} />
      </div>
      <div className="space-y-2.5">
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(SOLID_LABEL) as SolidKind[]).map(k => (
            <button key={k} onClick={() => setSolid(k)}
              className={`px-2 py-1 rounded-md text-[11px] font-semibold border ${k === solid ? 'bg-gold-500/20 border-gold-400/60 text-gold-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
              {SOLID_LABEL[k]}
            </button>
          ))}
        </div>
        {solid === 'cube' || solid === 'sphere' || solid === 'hemisphere'
          ? <Slider label={solid === 'cube' ? 'edge s' : 'radius r'} value={s} min={0} max={10} step={0.5} onChange={setS} />
          : <>
            <Slider label="radius r" value={s} min={0} max={10} step={0.5} onChange={setS} />
            <Slider label="height h" value={h} min={0} max={14} step={0.5} onChange={setH} />
          </>}
        <div className="rounded-xl bg-slate-800/60 border border-slate-700 px-3 py-2 space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Volume (live)</span>
            <span className="font-mono text-emerald-300">{zero ? '—' : fmt(measures.V)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">{solid === 'cylinder' ? 'TSA' : 'Surface area'} (live)</span>
            <span className="font-mono text-gold-300">{zero ? '—' : fmt(measures.A)}</span>
          </div>
          {measures.extra.map(([k, v]) => (
            <div key={k} className="flex justify-between text-xs">
              <span className="text-slate-400">{k}</span>
              <span className="font-mono text-slate-300">{zero ? '—' : fmt(v)}</span>
            </div>
          ))}
        </div>
        {zero ? (
          <p className="rounded-lg bg-rose-500/10 border border-rose-400/30 px-2 py-1.5 text-[11px] text-rose-200 font-semibold">
            A solid with a zero dimension has no volume — you have broken the
            solid. Drag the slider back up.
          </p>
        ) : (
          <div className="flex gap-1.5">
            <button onClick={() => askSolverFor('volume')}
              className="flex-1 px-2 py-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-[11px]">
              Solver: volume steps
            </button>
            {(solid === 'cube' || solid === 'cylinder' || solid === 'sphere') && (
              <button onClick={() => askSolverFor('surface area')}
                className="flex-1 px-2 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[11px]">
                Solver: area steps
              </button>
            )}
          </div>
        )}
        <StepsList s={solver} />
        <MisconceptionPanel
          misconception={miscon?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
          commonMisconception={miscon?.common_misconception ?? null} />
      </div>
    </div>
  )
}
