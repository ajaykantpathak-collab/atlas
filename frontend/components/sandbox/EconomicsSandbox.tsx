'use client'

/**
 * EconomicsSandbox — the economics experiment bay (classes 9-12).
 *
 * Engine mix per SANDBOX_TAXONOMY: E1 Parameter Lab (primary) + E4 System
 * Simulator (market shifts) + E7-lite Data Lab. Economics visualisations
 * are 2D-NATIVE (curves, bars, grids) — the single 3D exception is the
 * national-income circular flow, lazily loaded so three.js never enters
 * the default chunk.
 *
 * Every lab computes ground truth through economicsSolvers.ts — the TS
 * mirrors of deploy/backend/its/solver/economics_families.py — and
 * impossible-economy states route to MisconceptionPanel with VERBATIM
 * authored corpus text (economicsMisconceptions.ts, closed-world: c9/c10
 * econ nodes). Where the corpus has no authored match, the panel honestly
 * omits and the lab shows a plain gate message.
 */

import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import {
  type MarketState, fmt,
  solveMarket, qdAt, qsAt, excessAt,
  pedPoint, classifyEd, totalOutlay,
  gdpExpenditure, moneyMultiplier, depositChain,
  investmentMultiplier, apcAps, budgetDeficits,
  indexNumbers, inflation, headcountRatio,
  failReason, failIs,
} from './economicsSolvers'
import { misconceptionFor, ECON_MISCONCEPTIONS, type WrongState } from './economicsMisconceptions'

const CircularFlow3D = dynamic(() => import('./CircularFlow3D'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[380px] items-center justify-center rounded-2xl border border-white/10 bg-[#070a14]">
      <div className="text-center">
        <div className="mx-auto mb-3 h-8 w-8 animate-pulse rounded-full bg-sky-400/50" />
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Loading 3D circular flow...</p>
      </div>
    </div>
  ),
})

// --------------------------------------------------------------------------- //
// class-wise topic inventory (mirror of _cisce_build/economics_book_topics.json)
// --------------------------------------------------------------------------- //

type LabKey = 'market' | 'elasticity' | 'flow' | 'money' | 'income' | 'budget' | 'data'

const ECON_TOPICS: { cls: number; chapters: { title: string; topics: string; lab?: LabKey }[] }[] = [
  {
    cls: 9,
    chapters: [
      { title: 'Building Blocks in Economics', topics: 'economic problem · scarcity · opportunity cost' },
      { title: 'The Price Puzzle', topics: 'demand · supply · price determination · surplus & shortage', lab: 'market' },
      { title: 'Introduction to Economics', topics: 'definitions of economics · micro vs macro' },
      { title: 'Types of Economies', topics: 'capitalist · socialist · mixed' },
      { title: 'Problems of an Economy', topics: 'what / how / for whom · production possibility' },
      { title: 'The Indian Economy: A Study', topics: 'agriculture · food security · industry' },
      { title: 'Major Problems of the Indian Economy', topics: 'poverty line · headcount ratio · unemployment', lab: 'income' },
      { title: 'Major Reforms and Emerging Trends', topics: 'LPG reforms · globalisation' },
    ],
  },
  {
    cls: 10,
    chapters: [
      { title: 'The Productive Mechanism', topics: 'land · labour · capital · enterprise' },
      { title: 'Theory of Demand and Supply', topics: 'equilibrium · elasticity · total-outlay method', lab: 'market' },
      { title: 'Market', topics: 'perfect competition · monopoly · oligopoly' },
      { title: 'Banking in India', topics: 'credit creation · CRR / SLR / repo', lab: 'money' },
      { title: 'Inflation', topics: 'CPI · creeping / walking / galloping', lab: 'data' },
      { title: 'Consumer Awareness', topics: 'consumer rights · consumer courts' },
    ],
  },
  {
    cls: 11,
    chapters: [
      { title: 'Indian Economic Development', topics: 'five-year plans · 1991 reforms · rural development · employment' },
      { title: 'Statistics for Economics', topics: 'index numbers: aggregative · Laspeyres · Paasche · CPI', lab: 'data' },
    ],
  },
  {
    cls: 12,
    chapters: [
      { title: 'National Income Accounting', topics: 'GDP = C+I+G+(X−M) · value added · real vs nominal', lab: 'flow' },
      { title: 'Money and Banking', topics: 'money multiplier · deposit creation', lab: 'money' },
      { title: 'Determination of Income and Employment', topics: 'C = a + bY · investment multiplier · APC/APS', lab: 'income' },
      { title: 'Government Budget and the Economy', topics: 'revenue / fiscal / primary deficit', lab: 'budget' },
      { title: 'Open Economy Macroeconomics', topics: 'exchange rate · depreciation · X and M flows', lab: 'flow' },
      { title: 'Introductory Microeconomics', topics: 'demand · elasticity · market equilibrium', lab: 'elasticity' },
    ],
  },
]

const LABS: { key: LabKey; title: string; emoji: string; engine: string; blurb: string }[] = [
  { key: 'market', title: 'Demand-Supply Market Lab', emoji: '⚖️', engine: 'E1 + E4 · 2D', blurb: 'Drag the curves, fire events, watch the equilibrium move. Shade the shortage or surplus at any price.' },
  { key: 'elasticity', title: 'Elasticity Explorer', emoji: '📈', engine: 'E1 · 2D', blurb: 'Point elasticity along a linear demand curve + the total-outlay test.' },
  { key: 'flow', title: 'National Income Circular Flow', emoji: '🔄', engine: 'E4 · 3D', blurb: 'The one 3D piece: households, firms, government and foreign sectors with live GDP identity.' },
  { key: 'money', title: 'Money Multiplier', emoji: '🏦', engine: 'E1 · 2D', blurb: 'Set the reserve ratio, watch the deposit-creation chain build.' },
  { key: 'income', title: 'Income Determination', emoji: '🧮', engine: 'E1 · 2D', blurb: 'Consumption function, investment multiplier and the APC/APS identities.' },
  { key: 'budget', title: 'Budget Lab', emoji: '🏛️', engine: 'E1 · 2D', blurb: 'Line-item sliders computing revenue, fiscal and primary deficits live.' },
  { key: 'data', title: 'Index-Number Data Lab', emoji: '📊', engine: 'E7-lite · 2D', blurb: 'Edit the dataset; aggregative, Laspeyres and Paasche indices recompute.' },
]

// --------------------------------------------------------------------------- //
// UI atoms
// --------------------------------------------------------------------------- //

function Slider({ label, value, set, min, max, step = 1, unit = '' }: {
  label: string; value: number; set: (v: number) => void
  min: number; max: number; step?: number; unit?: string
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between text-[11px] font-bold text-slate-300">
        <span>{label}</span>
        <span className="font-mono text-sky-300">{fmt(value)}{unit}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => set(parseFloat(e.target.value))}
        className="mt-1 w-full accent-sky-400" />
    </label>
  )
}

function Readout({ label, value, tone = 'sky' }: { label: string; value: string; tone?: string }) {
  const tones: Record<string, string> = {
    sky: 'border-sky-400/40 bg-sky-500/10 text-sky-200',
    green: 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200',
    amber: 'border-amber-400/40 bg-amber-500/10 text-amber-200',
    red: 'border-rose-400/40 bg-rose-500/10 text-rose-200',
    violet: 'border-violet-400/40 bg-violet-500/10 text-violet-200',
  }
  return (
    <div className={`rounded-xl border px-3 py-2 ${tones[tone] ?? tones.sky}`}>
      <p className="text-[9px] font-black uppercase tracking-widest opacity-70">{label}</p>
      <p className="font-mono text-sm font-black">{value}</p>
    </div>
  )
}

/** Inline gate message for impossible states that have no authored
 *  corpus match (honest: no invented teaching text). */
function GateNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-2 rounded-xl border border-rose-400/30 bg-rose-500/5 px-3 py-2">
      <p className="text-xs font-bold text-rose-300">{children}</p>
    </div>
  )
}

// --------------------------------------------------------------------------- //
// 2D market chart (SVG, native)
// --------------------------------------------------------------------------- //

function MarketChart({ m, probe, pStar, qStar }: {
  m: MarketState; probe: number; pStar: number | null; qStar: number | null
}) {
  const W = 560, H = 320, PAD = 38
  const pMax = Math.max(probe, pStar ?? 0, 10) * 1.25
  const qMax = Math.max(m.a, m.c + m.d * pMax, qStar ?? 0, 10) * 1.15
  const X = (q: number) => PAD + (q / qMax) * (W - PAD - 12)
  const Y = (p: number) => H - PAD - (p / pMax) * (H - PAD - 16)
  const pEnd = Math.min(pMax, m.a / m.b)
  const qdEnd = qdAt(m, pEnd)
  const supplyQ = (p: number) => qsAt(m, p)
  const ex = probe != null && probe > 0 ? excessAt(m, probe) : 0
  const qAtProbeD = probe != null && probe > 0 ? qdAt(m, probe) : 0
  const qAtProbeS = probe != null && probe > 0 ? qsAt(m, probe) : 0

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-xl border border-white/10 bg-[#070a14]">
      {/* axes */}
      <line x1={PAD} y1={H - PAD} x2={W - 8} y2={H - PAD} stroke="#334155" />
      <line x1={PAD} y1={H - PAD} x2={PAD} y2={12} stroke="#334155" />
      <text x={W - 14} y={H - PAD + 14} fill="#64748b" fontSize={10} textAnchor="end">Quantity</text>
      <text x={PAD - 6} y={18} fill="#64748b" fontSize={10} textAnchor="end">Price</text>
      {/* shortage / surplus shading at probe */}
      {probe != null && probe > 0 && probe <= pMax && Math.abs(ex) > 0.5 && (
        <rect x={X(Math.min(qAtProbeD, qAtProbeS))} y={Y(probe) - 5}
          width={Math.max(Math.abs(X(qAtProbeD) - X(qAtProbeS)), 1)}
          height={10} fill={ex > 0 ? '#f43f5e' : '#f59e0b'} opacity={0.55} />
      )}
      {/* demand curve */}
      <line x1={X(m.a)} y1={Y(0)} x2={X(qdEnd)} y2={Y(pEnd)} stroke="#38bdf8" strokeWidth={2.5} />
      <text x={X(qdEnd) - 4} y={Y(pEnd) - 6} fill="#38bdf8" fontSize={11} fontWeight="bold" textAnchor="end">D</text>
      {/* supply curve */}
      <line x1={X(m.c)} y1={Y(0)} x2={X(supplyQ(pMax * 0.92))} y2={Y(pMax * 0.92)} stroke="#34d399" strokeWidth={2.5} />
      <text x={X(supplyQ(pMax * 0.92)) + 2} y={Y(pMax * 0.92)} fill="#34d399" fontSize={11} fontWeight="bold">S</text>
      {/* equilibrium */}
      {pStar != null && qStar != null && (
        <>
          <line x1={PAD} y1={Y(pStar)} x2={X(qStar)} y2={Y(pStar)} stroke="#e2e8f0" strokeDasharray="3 4" opacity={0.5} />
          <line x1={X(qStar)} y1={H - PAD} x2={X(qStar)} y2={Y(pStar)} stroke="#e2e8f0" strokeDasharray="3 4" opacity={0.5} />
          <circle cx={X(qStar)} cy={Y(pStar)} r={5.5} fill="#fbbf24" stroke="#78350f" />
          <text x={X(qStar) + 8} y={Y(pStar) - 8} fill="#fbbf24" fontSize={11} fontWeight="black">
            P*={fmt(pStar)} Q*={fmt(qStar)}
          </text>
        </>
      )}
      {/* probe price line */}
      {probe != null && probe > 0 && probe <= pMax && (
        <>
          <line x1={PAD} y1={Y(probe)} x2={W - 12} y2={Y(probe)} stroke="#f472b6" strokeDasharray="5 4" opacity={0.75} />
          <text x={W - 14} y={Y(probe) - 4} fill="#f472b6" fontSize={10} textAnchor="end">probe P={fmt(probe)}</text>
        </>
      )}
      {probe != null && probe > 0 && probe <= pMax && Math.abs(ex) > 0.5 && (
        <text x={W / 2} y={22} fill={ex > 0 ? '#fb7185' : '#fbbf24'} fontSize={11} fontWeight="black" textAnchor="middle">
          {ex > 0 ? 'shortage' : 'surplus'} of {fmt(Math.abs(ex))} units at the probe price
        </text>
      )}
    </svg>
  )
}

// --------------------------------------------------------------------------- //
// labs
// --------------------------------------------------------------------------- //

function MarketLab() {
  const [a, setA] = useState(120)
  const [b, setB] = useState(4)
  const [c, setC] = useState(20)
  const [d, setD] = useState(6)
  const [probe, setProbe] = useState(10)
  const m: MarketState = { a, b, c, d }
  const eq = solveMarket(m)
  const wrong = failReason(eq) as WrongState | null
  const mc = wrong ? misconceptionFor(wrong) : undefined
  const ex = excessAt(m, probe)

  const shift = (which: 'd' | 's', delta: number) => {
    if (which === 'd') setA(v => Math.max(10, v + delta))
    else setC(v => Math.max(0, v + delta))
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div>
        <MarketChart m={m} probe={probe}
          pStar={eq.ok ? eq.value.pStar : null} qStar={eq.ok ? eq.value.qStar : null} />
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Readout label="equilibrium P*" value={eq.ok ? `Rs ${fmt(eq.value.pStar)}` : '—'} />
          <Readout label="equilibrium Q*" value={eq.ok ? `${fmt(eq.value.qStar)} units` : '—'} tone="green" />
          <Readout label={`excess at P=${fmt(probe)}`} value={fmt(ex)}
            tone={ex > 0 ? 'red' : ex < 0 ? 'amber' : 'green'} />
          <Readout label="state" value={eq.ok ? (Math.abs(ex) < 0.5 ? 'clearing' : ex > 0 ? 'shortage' : 'surplus') : wrong ?? '—'}
            tone={eq.ok ? 'green' : 'red'} />
        </div>
        {/* E4: event buttons shift the curves -> solver recomputes equilibrium */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={() => shift('d', 20)} className="rounded-xl border border-sky-400/40 bg-sky-500/10 px-3 py-1.5 text-[11px] font-black text-sky-200 hover:bg-sky-500/20">📈 income rises → demand +20</button>
          <button onClick={() => shift('d', -20)} className="rounded-xl border border-sky-400/30 bg-sky-500/5 px-3 py-1.5 text-[11px] font-black text-sky-300/80 hover:bg-sky-500/15">📉 income falls → demand −20</button>
          <button onClick={() => shift('s', 20)} className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-black text-emerald-200 hover:bg-emerald-500/20">🌾 good harvest → supply +20</button>
          <button onClick={() => shift('s', -20)} className="rounded-xl border border-emerald-400/30 bg-emerald-500/5 px-3 py-1.5 text-[11px] font-black text-emerald-300/80 hover:bg-emerald-500/15">🦂 bad harvest → supply −20</button>
        </div>
        {!eq.ok && !mc && <GateNote>Cannot solve this market: {wrong}. Restore a downward-sloping demand (b &gt; 0), an upward-sloping supply (d &gt; 0) and a positive equilibrium.</GateNote>}
        {mc && <MisconceptionPanel misconception={mc.text} />}
        {!wrong && <MisconceptionPanel commonMisconception={ECON_MISCONCEPTIONS.movementVsShift.text} />}
      </div>
      <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3">
        <Slider label="Demand intercept a (Qd = a − bP)" value={a} set={setA} min={10} max={200} />
        <Slider label="Demand slope b" value={b} set={setB} min={-2} max={10} step={0.5} />
        <Slider label="Supply intercept c (Qs = c + dP)" value={c} set={setC} min={0} max={160} />
        <Slider label="Supply slope d" value={d} set={setD} min={-2} max={10} step={0.5} />
        <Slider label="Probe price" value={probe} set={setProbe} min={1} max={60} />
        <p className="text-[10px] leading-relaxed text-slate-400">
          Push <b className="text-slate-200">b</b> or <b className="text-slate-200">d</b> to 0 or negative to break
          the laws of demand/supply — the solver refuses and the corpus explains the trap.
        </p>
      </div>
    </div>
  )
}

function ElasticityLab() {
  const [a, setA] = useState(120)
  const [b, setB] = useState(4)
  const [p, setP] = useState(15)
  const [p1, setP1] = useState(10)
  const [q1, setQ1] = useState(80)
  const [p2, setP2] = useState(12)
  const [q2, setQ2] = useState(72)
  const pt = pedPoint(a, b, p)
  const outlay = totalOutlay(p1, q1, p2, q2)
  const choke = b > 0 ? a / b : Infinity
  const W = 560, H = 300, PAD = 38
  const qMax = a * 1.1, pMax = (b > 0 ? choke : 10) * 1.15
  const X = (q: number) => PAD + (q / qMax) * (W - PAD - 12)
  const Y = (pp: number) => H - PAD - (pp / pMax) * (H - PAD - 16)
  // total outlay curve TE(p) = p(a - bp): inverted U peaking at p = a/(2b)
  const tePeak = b > 0 ? a / (2 * b) : 0
  const teMax = b > 0 ? (a * a) / (4 * b) : 1
  const tePath = useMemo(() => {
    if (b <= 0) return ''
    const pts: string[] = []
    for (let t = 0; t <= 40; t++) {
      const pp = (choke * t) / 40
      const te = pp * (a - b * pp)
      pts.push(`${X((te / teMax) * qMax * 0.9)},${Y(pp)}`)
    }
    return `M ${pts.join(' L ')}`
  }, [a, b, choke, teMax, qMax]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-xl border border-white/10 bg-[#070a14]">
          <line x1={PAD} y1={H - PAD} x2={W - 8} y2={H - PAD} stroke="#334155" />
          <line x1={PAD} y1={H - PAD} x2={PAD} y2={12} stroke="#334155" />
          <text x={W - 14} y={H - PAD + 14} fill="#64748b" fontSize={10} textAnchor="end">Quantity / TE</text>
          <text x={PAD - 6} y={18} fill="#64748b" fontSize={10} textAnchor="end">Price</text>
          {/* demand line */}
          <line x1={X(a)} y1={Y(0)} x2={X(0)} y2={Y(Math.min(choke, pMax * 0.95))} stroke="#38bdf8" strokeWidth={2.5} />
          <text x={X(0) + 8} y={Y(Math.min(choke, pMax * 0.95)) + 12} fill="#38bdf8" fontSize={11} fontWeight="bold">D (slope constant)</text>
          {/* total outlay curve */}
          {tePath && <path d={tePath} fill="none" stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 4" />}
          {tePath && <text x={X((teMax / teMax) * qMax * 0.9) - 6} y={Y(tePeak)} fill="#f59e0b" fontSize={10} textAnchor="end">TE (peak = unitary)</text>}
          {/* probe point */}
          {pt.ok && (
            <>
              <circle cx={X(pt.value.q)} cy={Y(p)} r={5.5} fill="#fbbf24" stroke="#78350f" />
              <text x={X(pt.value.q) + 8} y={Y(p) - 6} fill="#fbbf24" fontSize={11} fontWeight="black">
                e = {fmt(pt.value.e)} ({classifyEd(pt.value.e)})
              </text>
            </>
          )}
        </svg>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Readout label={`point e at P=${fmt(p)}`} value={pt.ok ? fmt(pt.value.e) : '—'} />
          <Readout label="classification" value={pt.ok ? classifyEd(pt.value.e) : '—'}
            tone={pt.ok ? (classifyEd(pt.value.e) === 'elastic' ? 'red' : classifyEd(pt.value.e) === 'unitary' ? 'amber' : 'green') : 'red'} />
          <Readout label="TE at probe" value={pt.ok ? `Rs ${fmt(p * pt.value.q)}` : '—'} tone="violet" />
          <Readout label="choke price a/b" value={Number.isFinite(choke) ? fmt(choke) : '—'} />
        </div>
        {/* total-outlay test strip */}
        <div className="mt-3 rounded-xl border border-white/10 bg-slate-900/60 p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-300">total-outlay test (P1,Q1) → (P2,Q2)</p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Readout label="TE1 = P1×Q1" value={`Rs ${outlay.ok ? fmt(outlay.value.te1) : '—'}`} />
            <Readout label="TE2 = P2×Q2" value={`Rs ${outlay.ok ? fmt(outlay.value.te2) : '—'}`} />
            <Readout label="verdict" value={outlay.ok ? outlay.value.cls : '—'}
              tone={outlay.ok ? (outlay.value.cls === 'elastic' ? 'red' : outlay.value.cls === 'unitary' ? 'amber' : 'green') : 'red'} />
            <div />
          </div>
        </div>
        {!pt.ok && failIs(pt, 'beyond-choke') && (() => {
          const mc = misconceptionFor('beyond-choke')
          return (
            <div>
              <GateNote>Above the choke price (a/b = {fmt(choke)}) quantity demanded is negative — no consumer buys at all. The point elasticity exists only on the curve itself.</GateNote>
              {mc && <MisconceptionPanel misconception={mc.text} />}
            </div>
          )
        })()}
        {!pt.ok && !failIs(pt, 'beyond-choke') && <GateNote>Elasticity undefined here: {failReason(pt)}. Keep b &gt; 0 and the probe price on the demand curve.</GateNote>}
      </div>
      <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3">
        <Slider label="Demand intercept a" value={a} set={setA} min={40} max={200} />
        <Slider label="Demand slope b" value={b} set={setB} min={0.5} max={10} step={0.5} />
        <Slider label="Probe price" value={p} set={setP} min={1} max={80} />
        <div className="border-t border-white/10 pt-2" />
        <Slider label="P1" value={p1} set={setP1} min={1} max={40} />
        <Slider label="Q1" value={q1} set={setQ1} min={1} max={200} />
        <Slider label="P2" value={p2} set={setP2} min={1} max={40} />
        <Slider label="Q2" value={q2} set={setQ2} min={1} max={200} />
        <p className="text-[10px] leading-relaxed text-slate-400">
          Slope is constant along a linear demand curve — elasticity is NOT: it slides from elastic
          (upper half) through unitary (midpoint) to inelastic (lower half).
        </p>
      </div>
    </div>
  )
}

function FlowLab() {
  const [c, setC] = useState(600)
  const [i, setI] = useState(200)
  const [g, setG] = useState(150)
  const [x, setX] = useState(80)
  const [m, setM] = useState(60)
  const gdp = gdpExpenditure(c, i, g, x, m)
  const injections = i + g + x
  const netExports = x - m
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div>
        <CircularFlow3D c={c} i={i} g={g} x={x} m={m} />
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Readout label="GDP = C+I+G+(X−M)" value={gdp.ok ? `Rs ${fmt(gdp.value)}` : '—'}
            tone={gdp.ok ? 'green' : 'red'} />
          <Readout label="injections I+G+X" value={`Rs ${fmt(injections)}`} />
          <Readout label="imports M (leakage)" value={`Rs ${fmt(m)}`} tone="violet" />
          <Readout label="net exports X−M" value={`Rs ${fmt(netExports)}`}
            tone={netExports >= 0 ? 'green' : 'red'} />
        </div>
        {!gdp.ok && <GateNote>The identity breaks: C+I+G+(X−M) = {fmt(c + i + g + x - m)}. Imports larger than all spending plus exports would make output negative — no economy produces a negative GDP. (The corpus records no misconception for this state, so the panel honestly stays empty.)</GateNote>}
        <p className="mt-2 text-[10px] text-slate-400">
          Flow thickness and particle speed track each amount. Drag to orbit; every slider push
          recomputes GDP = C + I + G + (X − M) through the same closed form the backend solver uses.
        </p>
      </div>
      <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3">
        <Slider label="C — consumption" value={c} set={setC} min={0} max={1200} step={10} unit=" Rs" />
        <Slider label="I — investment" value={i} set={setI} min={0} max={600} step={10} unit=" Rs" />
        <Slider label="G — government spending" value={g} set={setG} min={0} max={600} step={10} unit=" Rs" />
        <Slider label="X — exports" value={x} set={setX} min={0} max={400} step={10} unit=" Rs" />
        <Slider label="M — imports" value={m} set={setM} min={0} max={400} step={10} unit=" Rs" />
        <div className="rounded-xl border border-white/10 bg-slate-800/60 p-2">
          <p className="text-[10px] font-bold text-slate-300">try an exchange-rate shock</p>
          <button onClick={() => { setX(v => Math.max(0, v - 40)); setM(v => v + 40) }}
            className="mt-1 w-full rounded-lg border border-rose-400/40 bg-rose-500/10 px-2 py-1.5 text-[11px] font-black text-rose-200 hover:bg-rose-500/20">
            rupee appreciates → X −40, M +40
          </button>
        </div>
      </div>
    </div>
  )
}

function MoneyLab() {
  const [rr, setRr] = useState(10)
  const [dep, setDep] = useState(1000)
  const mm = moneyMultiplier(rr)
  const chain = depositChain(rr, dep)
  const wrong = failReason(mm) as WrongState | null
  const mc = wrong ? misconceptionFor(wrong) : undefined
  const maxRound = chain.ok ? Math.max(...chain.value.rounds.map(r => r.deposit)) : 1
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Readout label="reserve ratio" value={`${fmt(rr)}%`} />
          <Readout label="multiplier 1/RRR" value={mm.ok ? fmt(mm.value) : '—'}
            tone={mm.ok ? 'green' : 'red'} />
          <Readout label="total deposits" value={chain.ok ? `Rs ${fmt(chain.value.total)}` : '—'} />
          <Readout label="credit created" value={chain.ok ? `Rs ${fmt(chain.value.credit)}` : '—'} tone="violet" />
        </div>
        {/* deposit-creation chain */}
        <div className="mt-3 rounded-xl border border-white/10 bg-slate-900/60 p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-sky-300">deposit-creation chain (each round re-lends 1 − RRR)</p>
          <div className="mt-2 space-y-1.5">
            {chain.ok ? chain.value.rounds.map(r => (
              <div key={r.round} className="flex items-center gap-2">
                <span className="w-12 text-[10px] font-bold text-slate-400">R{r.round}</span>
                <div className="h-4 flex-1 overflow-hidden rounded bg-slate-800">
                  <div className="h-full rounded bg-sky-500/70" style={{ width: `${(r.deposit / maxRound) * 100}%` }} />
                </div>
                <span className="w-28 text-right font-mono text-[10px] text-slate-300">
                  dep {fmt(r.deposit)} · loan {fmt(r.loan)}
                </span>
              </div>
            )) : (
              <p className="text-xs font-bold text-rose-300">
                {wrong === 'zero-reserve' && 'At a 0% reserve ratio the multiplier is infinite — every rupee lent comes straight back as a new deposit forever.'}
                {wrong === 'full-reserve' && 'At a 100% reserve ratio the bank lends nothing: the multiplier is 1 and no credit is ever created.'}
                {wrong !== 'zero-reserve' && wrong !== 'full-reserve' && `Cannot build the chain: ${wrong}.`}
              </p>
            )}
          </div>
        </div>
        {mc && <MisconceptionPanel misconception={mc.text} />}
        {!wrong && (
          <MisconceptionPanel commonMisconception={ECON_MISCONCEPTIONS.demonetisationVsMonetaryPolicy.text} />
        )}
      </div>
      <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3">
        <Slider label="Reserve ratio (CRR/RRR)" value={rr} set={setRr} min={0} max={100} step={0.5} unit="%" />
        <Slider label="Initial deposit" value={dep} set={setDep} min={100} max={20000} step={100} unit=" Rs" />
        <p className="text-[10px] leading-relaxed text-slate-400">
          Drag the reserve ratio to 0% or 100% to hit the impossible ends of the chain — the solver
          refuses to ship a number and the panel carries the authored RBI-instruments text.
        </p>
      </div>
    </div>
  )
}

function IncomeLab() {
  const [a, setA] = useState(40)
  const [mpc, setMpc] = useState(0.8)
  const [y, setY] = useState(500)
  const [di, setDi] = useState(100)
  const cons = a + mpc * y
  const apc = apcAps(y, cons)
  const mult = investmentMultiplier(mpc)
  const dy = mult.ok ? mult.value.k * di : null
  const hcr = headcountRatio(300, 1000)
  const wrong = failReason(mult) as WrongState | null
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Readout label="C = a + bY" value={`Rs ${fmt(cons)}`} tone={apc.ok ? 'green' : 'red'} />
          <Readout label="APC / APS" value={apc.ok ? `${fmt(apc.value.apc)} / ${fmt(apc.value.aps)}` : '—'} />
          <Readout label="multiplier k = 1/(1−MPC)" value={mult.ok ? fmt(mult.value.k) : '—'}
            tone={mult.ok ? 'green' : 'red'} />
          <Readout label="ΔY = k × ΔI" value={dy != null ? `Rs ${fmt(dy)}` : '—'} tone="violet" />
        </div>
        <div className="mt-3 rounded-xl border border-white/10 bg-slate-900/60 p-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-sky-300">identity chain</p>
          <p className="mt-1 font-mono text-xs text-slate-300">
            Y = C + S → C {`=`} Rs {fmt(cons)}, S {`=`} Rs {apc.ok ? fmt(apc.value.s) : '—'}
            {'  ·  '}APC + APS = 1{'  ·  '}MPC + MPS = {mult.ok ? fmt(mpc + mult.value.mps) : '—'}
          </p>
          <p className="mt-1 text-[10px] text-slate-400">
            Poverty link (class 9 corpus): headcount ratio of a village where 300 of 1,000 live below
            the poverty line = {hcr.ok ? `${fmt(hcr.value)}%` : '—'}.
          </p>
        </div>
        {wrong === 'mpc-range' && (
          <GateNote>
            MPC = {fmt(mpc)} is impossible: households cannot spend MORE than each extra rupee of
            income (MPC ≥ 1) and cannot spend less than nothing of it (MPC ≤ 0). The multiplier is
            defined only for 0 &lt; MPC &lt; 1.
          </GateNote>
        )}
        {wrong === 'mpc-range' && (() => {
          const mc = misconceptionFor('mpc-range')
          return mc ? <MisconceptionPanel misconception={mc.text} /> : null
        })()}
      </div>
      <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3">
        <Slider label="Autonomous consumption a" value={a} set={setA} min={0} max={200} />
        <Slider label="MPC b (deliberately draggable past 1)" value={mpc} set={setMpc} min={-0.2} max={1.4} step={0.05} />
        <Slider label="Income Y" value={y} set={setY} min={100} max={2000} step={10} unit=" Rs" />
        <Slider label="ΔI — investment change" value={di} set={setDi} min={10} max={500} step={10} unit=" Rs" />
        <p className="text-[10px] leading-relaxed text-slate-400">
          The MPC slider intentionally goes past 1: the solver gate refuses and explains why the
          multiplier would explode.
        </p>
      </div>
    </div>
  )
}

function BudgetLab() {
  const [re, setRe] = useState(500)
  const [rr, setRr] = useState(350)
  const [ce, setCe] = useState(200)
  const [cr, setCr] = useState(150)
  const [ip, setIp] = useState(100)
  const def = budgetDeficits({ re, rr, ce, cr, ip })
  const label = (v: number) => (v > 0 ? `Rs ${fmt(v)} deficit` : v < 0 ? `Rs ${fmt(-v)} surplus` : 'balanced')
  const tone = (v: number) => (v > 0 ? 'red' : 'green')
  const fmtBar = (v: number, max: number) => `${Math.min(Math.abs(v) / max, 1) * 100}%`
  const max = Math.max(Math.abs(def.revenue), Math.abs(def.fiscal), Math.abs(def.primary), 1)
  const bars = [
    { k: 'Revenue deficit = RE − RR', v: def.revenue },
    { k: 'Fiscal deficit = TE − receipts (excl. borrowings)', v: def.fiscal },
    { k: 'Primary deficit = FD − interest payments', v: def.primary },
  ]
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
      <div>
        <div className="space-y-2 rounded-xl border border-white/10 bg-slate-900/60 p-3">
          {bars.map(b => (
            <div key={b.k}>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-bold text-slate-300">{b.k}</span>
                <span className={`font-mono text-xs font-black ${b.v > 0 ? 'text-rose-300' : 'text-emerald-300'}`}>{label(b.v)}</span>
              </div>
              <div className="mt-1 h-3 overflow-hidden rounded bg-slate-800">
                <div className={`h-full rounded ${b.v > 0 ? 'bg-rose-500/70' : 'bg-emerald-500/70'}`}
                  style={{ width: fmtBar(b.v, max) }} />
              </div>
            </div>
          ))}
        </div>
        <MisconceptionPanel commonMisconception={ECON_MISCONCEPTIONS.taxesDirectIndirect.text} />
      </div>
      <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3">
        <Slider label="Revenue expenditure (RE)" value={re} set={setRe} min={0} max={1200} step={10} unit=" cr" />
        <Slider label="Revenue receipts (RR)" value={rr} set={setRr} min={0} max={1200} step={10} unit=" cr" />
        <Slider label="Capital expenditure (CE)" value={ce} set={setCe} min={0} max={800} step={10} unit=" cr" />
        <Slider label="Capital receipts excl. borrowings (CR)" value={cr} set={setCr} min={0} max={800} step={10} unit=" cr" />
        <Slider label="Interest payments (IP)" value={ip} set={setIp} min={0} max={400} step={5} unit=" cr" />
        <p className="text-[10px] leading-relaxed text-slate-400">
          All three deficits recompute through the backend identities: RD = RE − RR;
          FD = (RE + CE) − (RR + CR); PD = FD − IP. A negative value is a surplus, not an error.
        </p>
      </div>
    </div>
  )
}

const DEFAULT_DATA = {
  goods: ['Wheat', 'Milk', 'Cloth'],
  p0: [4, 6, 10],
  p1: [5, 8, 12],
  q0: [10, 5, 8],
  q1: [12, 6, 9],
}

function DataLab() {
  const [goods, setGoods] = useState<string[]>(DEFAULT_DATA.goods)
  const [p0, setP0] = useState<number[]>(DEFAULT_DATA.p0)
  const [p1, setP1] = useState<number[]>(DEFAULT_DATA.p1)
  const [q0, setQ0] = useState<number[]>(DEFAULT_DATA.q0)
  const [q1, setQ1] = useState<number[]>(DEFAULT_DATA.q1)
  const [singleGoodTrap, setSingleGoodTrap] = useState(false)
  const idx = indexNumbers(p0, p1, q0, q1)
  const cpi = inflation(p0[0] * 100, p1[0] * 100) // wheat-only price move
  const setCell = (arr: number[], set: (v: number[]) => void, j: number, v: number) => {
    const next = [...arr]
    next[j] = v
    set(next)
  }
  const maxIdx = idx.ok
    ? Math.max(idx.value.aggregative, idx.value.laspeyres ?? 0, idx.value.paasche ?? 0, 100) * 1.1
    : 100
  const rows: { k: string; v: number | null; color: string }[] = idx.ok
    ? [
      { k: 'Simple aggregative', v: idx.value.aggregative, color: 'bg-sky-500/70' },
      { k: 'Laspeyres (base Q)', v: idx.value.laspeyres, color: 'bg-emerald-500/70' },
      { k: 'Paasche (current Q)', v: idx.value.paasche, color: 'bg-violet-500/70' },
    ]
    : []
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
      <div>
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/60 p-3">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-slate-400">
                <th className="py-1 text-left">Good</th>
                <th className="py-1">base P0</th>
                <th className="py-1">current P1</th>
                <th className="py-1">base Q0</th>
                <th className="py-1">current Q1</th>
              </tr>
            </thead>
            <tbody>
              {goods.map((g, j) => (
                <tr key={j}>
                  <td className="py-1 font-bold text-slate-200">{g}</td>
                  {[p0, p1, q0, q1].map((arr, k) => (
                    <td key={k} className="py-1 text-center">
                      <input type="number" min={0} value={arr[j]}
                        onChange={e => {
                          const v = Math.max(0, parseFloat(e.target.value) || 0)
                          setCell([p0, p1, q0, q1][k], [setP0, setP1, setQ0, setQ1][k], j, v)
                        }}
                        className="w-16 rounded-md border border-white/15 bg-slate-800 px-1.5 py-0.5 text-center font-mono text-sky-200" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* indices */}
        <div className="mt-3 space-y-2 rounded-xl border border-white/10 bg-slate-900/60 p-3">
          {rows.map(r => (
            <div key={r.k}>
              <div className="flex items-baseline justify-between">
                <span className="text-[11px] font-bold text-slate-300">{r.k}</span>
                <span className="font-mono text-xs font-black text-slate-100">
                  {r.v != null ? fmt(r.v) : '— (needs quantities)'}
                </span>
              </div>
              <div className="mt-1 h-3 overflow-hidden rounded bg-slate-800">
                {r.v != null && (
                  <div className={`h-full rounded ${r.color}`} style={{ width: `${(r.v / maxIdx) * 100}%` }} />
                )}
              </div>
            </div>
          ))}
          {idx.ok && (
            <p className="text-[10px] text-slate-400">
              Index {fmt(idx.value.aggregative)} → prices are {idx.value.aggregative >= 100
                ? `${fmt(idx.value.aggregative - 100)}% higher` : `${fmt(100 - idx.value.aggregative)}% lower`}
              than the base year. Laspeyres weights base-year quantities; Paasche weights current-year
              quantities (same solver as INDEX_LASPEYRES / INDEX_PAASCHES on the backend).
            </p>
          )}
          {!idx.ok && <GateNote>Fix the dataset: {failReason(idx)}. Base and current price lists must match in length with positive prices.</GateNote>}
        </div>
        {/* authored trap: one good's price rise is not inflation */}
        <div className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2">
          <p className="text-[11px] font-bold text-slate-300">
            Wheat alone rose {cpi.ok ? `${fmt(cpi.value)}%` : ''}. Does that alone mean inflation is {cpi.ok ? `${fmt(cpi.value)}%` : ''}?
          </p>
          <button onClick={() => setSingleGoodTrap(t => !t)}
            className="rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-1.5 text-[11px] font-black text-amber-200 hover:bg-amber-500/20">
            {singleGoodTrap ? 'hide' : 'check my answer'}
          </button>
        </div>
        {singleGoodTrap && (
          <MisconceptionPanel misconception={ECON_MISCONCEPTIONS.anyPriceIncreaseIsInflation.text} />
        )}
      </div>
      <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-900/60 p-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">the three formulas</p>
        <div className="rounded-lg border border-white/10 bg-slate-800/60 p-2 font-mono text-[10px] leading-relaxed text-slate-300">
          aggregative = ΣP1 / ΣP0 × 100<br />
          Laspeyres = ΣP1Q0 / ΣP0Q0 × 100<br />
          Paasche = ΣP1Q1 / ΣP0Q1 × 100
        </div>
        <button onClick={() => { setGoods([...DEFAULT_DATA.goods]); setP0([...DEFAULT_DATA.p0]); setP1([...DEFAULT_DATA.p1]); setQ0([...DEFAULT_DATA.q0]); setQ1([...DEFAULT_DATA.q1]) }}
          className="w-full rounded-lg border border-white/15 bg-slate-800 px-2 py-1.5 text-[11px] font-black text-slate-200 hover:bg-slate-700">
          reset dataset
        </button>
        <p className="text-[10px] leading-relaxed text-slate-400">
          Edit any cell — every index recomputes instantly. The Laspeyres row stays empty until the
          base-quantity column is filled; the Paasche row needs the current-quantity column.
        </p>
      </div>
    </div>
  )
}

// --------------------------------------------------------------------------- //
// main component
// --------------------------------------------------------------------------- //

export default function EconomicsSandbox() {
  const [lab, setLab] = useState<LabKey>('market')
  const [cls, setCls] = useState<number>(12)

  const chapters = useMemo(
    () => ECON_TOPICS.find(t => t.cls === cls)?.chapters ?? [],
    [cls])

  return (
    <div className="w-full">
      {/* header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-sky-300">economics · parameter lab + market sim + data bench</p>
          <h2 className="text-2xl font-black text-white">💰 Economics Lab</h2>
        </div>
        {/* class picker */}
        <div className="flex gap-1">
          {[9, 10, 11, 12].map(c => (
            <button key={c} onClick={() => setCls(c)}
              className={`rounded-lg px-3 py-1.5 text-xs font-black transition ${cls === c ? 'bg-sky-500/20 text-sky-200 ring-1 ring-sky-400/60' : 'bg-slate-800 text-slate-400 hover:text-slate-200'}`}>
              Cl {c}
            </button>
          ))}
        </div>
      </div>

      {/* lab picker */}
      <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {LABS.map(l => (
          <button key={l.key} onClick={() => setLab(l.key)}
            className={`rounded-xl border p-2 text-left transition ${lab === l.key
              ? 'border-sky-400/60 bg-sky-500/15 shadow-[0_0_18px_rgba(56,189,248,0.12)]'
              : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'}`}>
            <span className="text-lg">{l.emoji}</span>
            <p className="text-[10px] font-black leading-tight text-slate-200">{l.title}</p>
            <p className="text-[9px] font-bold text-slate-500">{l.engine}</p>
          </button>
        ))}
      </div>

      {/* chapter/topic strip for the chosen class (from the book inventory) */}
      <details className="mb-4 rounded-xl border border-white/10 bg-slate-900/40 px-3 py-2">
        <summary className="cursor-pointer text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-200">
          class {cls} syllabus — {chapters.length} chapters · tap one to jump to its lab
        </summary>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {chapters.map((ch, j) => (
            <button key={j} disabled={!ch.lab} onClick={() => ch.lab && setLab(ch.lab)}
              className={`rounded-lg border px-2.5 py-1.5 text-left ${ch.lab
                ? 'border-sky-400/30 bg-sky-500/5 hover:border-sky-400/60'
                : 'border-white/5 bg-slate-800/30 opacity-60'}`}>
              <p className="text-[11px] font-black text-slate-200">{ch.title}</p>
              <p className="text-[9px] text-slate-400">{ch.topics}{ch.lab ? ' → open lab' : ''}</p>
            </button>
          ))}
        </div>
      </details>

      {/* active lab */}
      <div>
        <p className="mb-3 text-xs text-slate-400">
          {LABS.find(l => l.key === lab)?.blurb}
        </p>
        {lab === 'market' && <MarketLab />}
        {lab === 'elasticity' && <ElasticityLab />}
        {lab === 'flow' && <FlowLab />}
        {lab === 'money' && <MoneyLab />}
        {lab === 'income' && <IncomeLab />}
        {lab === 'budget' && <BudgetLab />}
        {lab === 'data' && <DataLab />}
      </div>
    </div>
  )
}
