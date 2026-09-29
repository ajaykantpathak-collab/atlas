'use client'

/**
 * GeoSurvey — the data lab of the E5 Geospatial Explorer (Geography 6-12,
 * classes 7-8 corpus of the survey/data chapters).
 *
 * Grounded chapters: c7_geo_icse_05 (energy — pie-chart reading, renewable
 * vs non-renewable, hydro projects), c8_geo_icse_01 (population —
 * distribution, growth, crowded-vs-empty lands), c8_geo_icse_04
 * (disasters — hazard vs disaster, information sources, mock drills).
 *
 * Same closed-world loop as GeoExplorer: datasets are code-framed as
 * approximate; every wrong identification injects the mapped corpus
 * node's authored misconception through MisconceptionPanel
 * (remediation.ts, honest degradation). Central wiring into the sandbox
 * page happens post-hoc; this file only owns its own component.
 */
import { useCallback, useEffect, useState } from 'react'
import { PieChart, Users, Siren, RotateCcw } from 'lucide-react'
import {
  ENERGY_PIE, ENERGY_SORT, POPULATION_CENSUS, DISASTER_SOURCES, POPULATION_HOTSPOTS,
} from './geoData'
import { NodeInfoCard, MisconBlock } from './GeoExplorer'

const PROGRESS_KEY = 'geo_survey_explored_v1'

function randomIn<T>(arr: T[], not?: T): T {
  if (arr.length <= 1) return arr[0]
  let v = arr[Math.floor(Math.random() * arr.length)]
  while (not && v === not) v = arr[Math.floor(Math.random() * arr.length)]
  return v
}

// --------------------------------------------------------------- energy --

/** SVG pie — the corpus teaches pie reading as "the month's bill cut like
 *  a birthday cake" (c7_geo_icse_05_011). */
function EnergyPie({ active }: { active: string | null }) {
  const cx = 110, cy = 110, r = 88
  const total = ENERGY_PIE.reduce((a, b) => a + b.pct, 0)
  let a0 = -Math.PI / 2
  const colors = ['#f59e0b', '#38bdf8', '#34d399', '#a78bfa', '#f472b6', '#eab308']
  return (
    <svg viewBox="0 0 300 220" className="w-full rounded-xl border border-slate-700 bg-[#0b1226]">
      {ENERGY_PIE.map((s, i) => {
        const a1 = a0 + (s.pct / total) * Math.PI * 2
        const big = a1 - a0 > Math.PI ? 1 : 0
        const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0)
        const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1)
        const d = `M ${cx},${cy} L ${x0},${y0} A ${r},${r} 0 ${big} 1 ${x1},${y1} Z`
        a0 = a1
        return <path key={s.label} d={d} fill={colors[i]} opacity={active === null || active === s.label ? 0.85 : 0.25}
          stroke="#0b1226" strokeWidth={1.5} />
      })}
      {ENERGY_PIE.map((s, i) => (
        <g key={s.label}>
          <rect x={206} y={26 + i * 26} width={10} height={10} rx={2} fill={colors[i]}
            opacity={active === null || active === s.label ? 1 : 0.3} />
          <text x={221} y={35 + i * 26} fontSize={11}
            fill={active === s.label ? '#fff' : '#94a3b8'} fontWeight={active === s.label ? 800 : 400}>
            {s.label} ≈{s.pct}%
          </text>
        </g>
      ))}
      <text x={cx} y={cy} fontSize={11} fill="#cbd5e1" textAnchor="middle">India&apos;s</text>
      <text x={cx} y={124} fontSize={11} fill="#cbd5e1" textAnchor="middle">electricity</text>
    </svg>
  )
}

function EnergyLab({ onExplored }: { onExplored: (k: string) => void }) {
  const [active, setActive] = useState<string | null>(null)
  const [sortIdx, setSortIdx] = useState(0)
  const [sortOut, setSortOut] = useState<'ok' | 'bad' | null>(null)
  const [wrongNode, setWrongNode] = useState<string | null>(null)
  const item = ENERGY_SORT[sortIdx]

  const answer = (renewable: boolean) => {
    if (renewable === item.renewable) {
      setSortOut('ok'); setWrongNode(null)
      onExplored('sv_en_' + item.item)
      setTimeout(() => {
        setSortIdx(i => (i + 1) % ENERGY_SORT.length); setSortOut(null)
      }, 800)
    } else {
      setSortOut('bad'); setWrongNode(item.nodeId)
    }
  }

  return (
    <div className="grid md:grid-cols-[1.2fr_1fr] gap-4">
      <div>
        <EnergyPie active={active} />
        <p className="mt-1.5 text-[11px] text-slate-500">
          approximate generation shares — click a slice to open the authored energy node
        </p>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {ENERGY_PIE.map(s => (
            <button key={s.label} onMouseEnter={() => setActive(s.label)} onMouseLeave={() => setActive(null)}
              onClick={() => { setActive(s.label); onExplored('sv_enp_' + s.label) }}
              className={`px-2 py-0.5 rounded-md text-[11px] border ${active === s.label ? 'bg-gold-500/20 border-gold-400/60 text-gold-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
              {s.renewable ? '♻' : '⛏'} {s.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-gold-500/25 bg-gold-500/5 px-3 py-2.5">
          <p className="text-[10px] uppercase tracking-wider text-gold-300 font-black mb-1">renewable or not?</p>
          <p className="text-sm font-bold text-white mb-2">{item.item}</p>
          <div className="flex gap-1.5">
            <button onClick={() => answer(true)}
              className="px-3 py-1 rounded-md text-[11px] font-bold border bg-emerald-500/10 border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/20">
              ♻ renewable
            </button>
            <button onClick={() => answer(false)}
              className="px-3 py-1 rounded-md text-[11px] font-bold border bg-rose-500/10 border-rose-400/40 text-rose-200 hover:bg-rose-500/20">
              ⛏ non-renewable
            </button>
          </div>
          {sortOut === 'ok' && <p className="mt-1.5 text-xs text-emerald-300 font-bold">✓ nature refills that one (or she never will again, as the case is).</p>}
        </div>
        <MisconBlock nodeId={wrongNode} />
        <NodeInfoCard nodeId={ENERGY_SORT[0].nodeId} caption="Renewable vs non-renewable" />
        <NodeInfoCard nodeId="c7_geo_icse_05_005" caption="Hydroelectric projects" />
      </div>
    </div>
  )
}

// ------------------------------------------------------------ population --

function PopulationGraph() {
  const W = 420, H = 230, L = 40, B = 28, T = 14
  const maxX = 2015, maxY = 1400
  const px = (y: number) => L + ((y - 1945) / (maxX - 1945)) * (W - L - 16)
  const py = (m: number) => B - (m / maxY) * (B - T)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-xl border border-slate-700 bg-[#0b1226]">
      {[0, 400, 800, 1200].map(g => (
        <g key={g}>
          <line x1={L} y1={py(g)} x2={W - 16} y2={py(g)} stroke="#1e293b" strokeWidth={0.7} />
          <text x={L - 5} y={py(g) + 3} fontSize={9} fill="#94a3b8" textAnchor="end">{g}</text>
        </g>
      ))}
      {[1951, 1971, 1991, 2011].map(y => (
        <text key={y} x={px(y)} y={H - 10} fontSize={9} fill="#94a3b8" textAnchor="middle">{y}</text>
      ))}
      <polyline points={POPULATION_CENSUS.map(c => `${px(c.year)},${py(c.millions)}`).join(' ')}
        fill="none" stroke="#34d399" strokeWidth={2.2} />
      {POPULATION_CENSUS.map(c => (
        <circle key={c.year} cx={px(c.year)} cy={py(c.millions)} r={3} fill="#6ee7b7">
          <title>{c.year}: {c.millions} million</title>
        </circle>
      ))}
      <text x={W / 2} y={H - 1} fontSize={8} fill="#64748b" textAnchor="middle">
        Census of India decadal totals (millions) — the J-curve of growth
      </text>
    </svg>
  )
}

function PopulationLab({ onExplored }: { onExplored: (k: string) => void }) {
  const [hsIdx, setHsIdx] = useState(() => randomIn(POPULATION_HOTSPOTS))
  const [wrongNode, setWrongNode] = useState<string | null>(null)
  const [out, setOut] = useState<'ok' | 'bad' | null>(null)

  const answer = (crowded: boolean) => {
    if (crowded === hsIdx.crowded) {
      setOut('ok'); setWrongNode(null)
      onExplored('sv_pop_' + hsIdx.label)
      setTimeout(() => { setHsIdx(randomIn(POPULATION_HOTSPOTS, hsIdx)); setOut(null) }, 1100)
    } else {
      setOut('bad'); setWrongNode(hsIdx.nodeId)
    }
  }

  return (
    <div className="grid md:grid-cols-[1.2fr_1fr] gap-4">
      <div>
        <PopulationGraph />
        <p className="mt-1.5 text-[11px] text-slate-500">
          the tap (births) pours faster than the drain (deaths) — that is the growth engine the corpus describes
        </p>
      </div>
      <div className="space-y-3">
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2.5">
          <p className="text-[10px] uppercase tracking-wider text-emerald-300 font-black mb-1">crowded or near-empty?</p>
          <p className="text-sm font-bold text-white mb-2">{hsIdx.label}</p>
          <div className="flex gap-1.5">
            <button onClick={() => answer(true)}
              className="px-3 py-1 rounded-md text-[11px] font-bold border bg-emerald-500/10 border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/20">
              👥 crowded
            </button>
            <button onClick={() => answer(false)}
              className="px-3 py-1 rounded-md text-[11px] font-bold border bg-rose-500/10 border-rose-400/40 text-rose-200 hover:bg-rose-500/20">
              ∅ near-empty
            </button>
          </div>
          {out === 'ok' && (
            <p className="mt-1.5 text-xs text-emerald-300 font-bold">✓ because it is {hsIdx.why}.</p>
          )}
        </div>
        <MisconBlock nodeId={wrongNode} />
        <NodeInfoCard nodeId="c8_geo_icse_01_001" caption="Distribution & density" />
        <NodeInfoCard nodeId="c8_geo_icse_01_004" caption="Birth rate, death rate, growth" />
      </div>
    </div>
  )
}

// -------------------------------------------------------------- disasters --

function DisasterLab({ onExplored }: { onExplored: (k: string) => void }) {
  const [q, setQ] = useState(() => randomIn(DISASTER_SOURCES))
  const [wrongNode, setWrongNode] = useState<string | null>(null)
  const [picked, setPicked] = useState<string | null>(null)

  const options = useCallback(() =>
    [q.answer, ...q.distractors].sort(() => Math.random() - 0.5), [q])

  const answer = (src: string) => {
    if (src === q.answer) {
      setWrongNode(null); setPicked(src)
      onExplored('sv_dis_' + q.answer)
      setTimeout(() => { setQ(randomIn(DISASTER_SOURCES, q)); setPicked(null) }, 1100)
    } else {
      setWrongNode(q.nodeId)
    }
  }

  return (
    <div className="grid md:grid-cols-[1.2fr_1fr] gap-4">
      <div>
        <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-amber-300 font-black mb-1">which information source fits?</p>
          <p className="text-sm font-bold text-white leading-relaxed">{q.scenario}</p>
        </div>
        <div className="grid grid-cols-2 gap-1.5 mt-3">
          {options().map(src => (
            <button key={src} onClick={() => answer(src)}
              className={`px-3 py-2 rounded-lg text-[11px] font-bold border transition ${picked === src
                ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200'
                : 'bg-slate-800/60 border-slate-600 text-slate-200 hover:border-amber-400/60'}`}>
              {src}
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-1.5">
          <button onClick={() => { setQ(randomIn(DISASTER_SOURCES, q)); setWrongNode(null); setPicked(null) }}
            className="px-2 py-1 rounded-lg text-[11px] font-bold border border-slate-700 text-slate-400 hover:text-slate-200 flex items-center gap-1">
            <RotateCcw className="w-3 h-3" />skip
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <MisconBlock nodeId={wrongNode} />
        <NodeInfoCard nodeId="c8_geo_icse_04_001" caption="Hazard vs disaster" />
        <NodeInfoCard nodeId="c8_geo_icse_04_002" caption="Disaster management cycle" />
        <NodeInfoCard nodeId="c8_geo_icse_04_012" caption="Mock drills" />
      </div>
    </div>
  )
}

// -------------------------------------------------------------- shell --

type Tab = 'energy' | 'population' | 'disasters'

const TABS: { key: Tab; label: string; icon: any }[] = [
  { key: 'energy', label: 'Energy data lab', icon: PieChart },
  { key: 'population', label: 'Population lab', icon: Users },
  { key: 'disasters', label: 'Disaster info drills', icon: Siren },
]

export default function GeoSurvey() {
  const [tab, setTab] = useState<Tab>('energy')
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

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden">
      <div className="px-4 pt-4 pb-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h2 className="font-black text-lg text-white">
            📊 Geo Data Lab
            <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              energy pies · population curves · disaster sources
            </span>
          </h2>
          <span className="text-[10px] font-black text-emerald-300/80">
            drilled {explored.size} facts
          </span>
        </div>
      </div>

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
        {tab === 'energy' && <EnergyLab onExplored={markExplored} />}
        {tab === 'population' && <PopulationLab onExplored={markExplored} />}
        {tab === 'disasters' && <DisasterLab onExplored={markExplored} />}
      </div>
    </div>
  )
}
