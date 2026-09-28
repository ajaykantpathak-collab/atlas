'use client'

/**
 * GeoExplorer — the E5 Geospatial Explorer sandbox (Geography 6-12).
 *
 * Engine mix per SANDBOX_TAXONOMY.md: E5 Geospatial Explorer (primary)
 * + E1 Parameter Lab (climate graphs) + E4-lite (monsoon system
 * animation). 2D-map-native: schematic SVG maps embedded in code (no
 * network tiles, no forced 3D). Every interaction lands on the same
 * closed-world loop as the other sandboxes:
 *
 *   click / locate / read-the-layer → correct: authored corpus card
 *   (GET /api/content/nodes/{id}/enrichment) …wrong: MisconceptionPanel
 *   with that node's authored diagnostic misconception + common
 *   misconception (remediation.ts — honest degradation, never invented
 *   text).
 *
 * Tabs: India physical lab (features · rivers · power projects),
 * World continent labs (Africa / Asia / Europe from the c7/c8 corpus),
 * Contour & toposheet reader (marching-squares-generated relief),
 * Climate graph lab (the corpus's seven natural regions), Monsoon
 * system animation (advancing/retreating rains timeline).
 *
 * Central wiring into app/(student)/sandbox/page.tsx happens post-hoc
 * (that file is owned by another agent); see GEO_TAB_CONFIG in
 * ./geoTopics for the { id, label, component } hand-off.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Globe2, Map, CloudRain, Waves, Grid3X3, RotateCcw } from 'lucide-react'
import MisconceptionPanel from '@/components/learn/MisconceptionPanel'
import { fetchEnrichment, type EnrichmentData } from '@/components/learn/remediation'
import { GEO_SANDBOX_CLASSES } from './geoTopics'
import {
  INDIA_OUTLINE, INDIA_RIVERS, INDIA_FEATURES, INDIA_POWER_PROJECTS,
  INDIA_TROPIC_Y, INDIA_MERIDIAN_X,
  AFRICA_OUTLINE, AFRICA_MADAGASCAR, AFRICA_FEATURES,
  ASIA_OUTLINE, ASIA_FEATURES,
  EUROPE_OUTLINE, EUROPE_UK, EUROPE_IRELAND, EUROPE_FEATURES,
  CONTOUR_PATTERNS, CONTOUR_LEVELS, contourPath, GRID_REF_QUIZ,
  CLIMATE_PRESETS, MONTH_LABELS, classifyClimate,
  MONSOON_PHASES,
  type MapFeature,
  type ClimatePreset,
} from './geoData'

const PROGRESS_KEY = 'geo_sandbox_explored_v1'

// ------------------------------------------------------------ enrichment --

/** Authored corpus content for one node — closed-world, honest null. */
function useEnrichment(nodeId: string | null): EnrichmentData | null {
  const [data, setData] = useState<EnrichmentData | null>(null)
  useEffect(() => {
    let live = true
    setData(null)
    if (nodeId) fetchEnrichment(nodeId).then(d => { if (live) setData(d) })
    return () => { live = false }
  }, [nodeId])
  return data
}

function firstSentences(s: string | null | undefined, n = 2): string {
  if (!s) return ''
  const parts = s.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/)
  return parts.slice(0, n).join(' ')
}

/** NodeInfoCard — the authored explainer shown after a correct pick. */
export function NodeInfoCard({ nodeId, caption }: { nodeId: string; caption: string }) {
  const enr = useEnrichment(nodeId)
  const body = enr?.eli5 || enr?.definition || enr?.text_walkthrough || ''
  return (
    <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-emerald-300 font-black mb-1">{caption}</p>
      <p className="text-sm font-bold text-white">{enr?.title || caption}</p>
      {body ? (
        <p className="mt-1 text-xs text-slate-300 leading-relaxed">{firstSentences(body, 3)}</p>
      ) : (
        <p className="mt-1 text-xs text-slate-500 italic">authored corpus content loads from the platform index…</p>
      )}
    </div>
  )
}

/** MisconBlock — the authored wrong-answer teaching loop. */
export function MisconBlock({ nodeId }: { nodeId: string | null }) {
  const enr = useEnrichment(nodeId)
  if (!nodeId) return null
  return (
    <MisconceptionPanel
      misconception={enr?.diagnostic_questions?.find(d => d.misconception_if_wrong)?.misconception_if_wrong ?? null}
      commonMisconception={enr?.common_misconception ?? null} />
  )
}

// ------------------------------------------------------------ map helpers --

const distToSeg = (px: number, py: number, ax: number, ay: number, bx: number, by: number) => {
  const dx = bx - ax, dy = by - ay
  const L2 = dx * dx + dy * dy
  const t = L2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L2))
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy))
}

const distToPolyline = (px: number, py: number, pts: Array<{ x: number; y: number }>) => {
  let best = Infinity
  for (let i = 0; i < pts.length - 1; i++) {
    best = Math.min(best, distToSeg(px, py, pts[i].x, pts[i].y, pts[i + 1].x, pts[i + 1].y))
  }
  return best
}

function randomIn<T>(arr: T[], not?: T): T {
  if (arr.length <= 1) return arr[0]
  let v = arr[Math.floor(Math.random() * arr.length)]
  while (not && v === not) v = arr[Math.floor(Math.random() * arr.length)]
  return v
}

// ------------------------------------------------------------ map canvas --

interface SchematicMapProps {
  vb?: number
  outlines: Array<{ d: string; fill?: string; stroke?: string }>
  features: MapFeature[]
  rivers?: typeof INDIA_RIVERS
  /** quiz: feature key to find, and callback for each click attempt */
  targetKey?: string | null
  onAttempt?: (key: string | null, x: number, y: number) => void
  solvedKeys?: Set<string>
  showTropics?: boolean
  children?: React.ReactNode
}

const KIND_COLOR: Record<string, string> = {
  mountain: '#d97706', plateau: '#a16207', plain: '#65a30d', desert: '#eab308',
  river: '#38bdf8', water: '#38bdf8', coast: '#22d3ee', island: '#22d3ee', country: '#a78bfa',
}

function FeatureGlyph({ f, dim }: { f: MapFeature; dim?: boolean }) {
  const c = KIND_COLOR[f.kind] ?? '#94a3b8'
  const op = dim ? 0.35 : 1
  if (f.kind === 'mountain') {
    if (f.line) {
      return <g opacity={op}>
        {f.line.map((p, i) => (
          <path key={i} d={`M ${p.x - 1.6},${p.y + 1.2} L ${p.x},${p.y - 1.4} L ${p.x + 1.6},${p.y + 1.2} Z`}
            fill="none" stroke={c} strokeWidth={0.7} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    }
    return <path d={`M ${f.x - 2},${f.y + 1.6} L ${f.x},${f.y - 2} L ${f.x + 2},${f.y + 1.6} Z`}
      fill="none" stroke={c} strokeWidth={0.9} opacity={op} vectorEffect="non-scaling-stroke" />
  }
  if (f.kind === 'river' && f.line) {
    return <path d={f.line.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ')}
      fill="none" stroke={c} strokeWidth={0.8} opacity={op} vectorEffect="non-scaling-stroke" />
  }
  if (f.kind === 'desert') {
    return <g opacity={op} fill={c}>
      <circle cx={f.x - 1.4} cy={f.y - 0.8} r={0.45} /><circle cx={f.x + 1.2} cy={f.y} r={0.45} />
      <circle cx={f.x - 0.4} cy={f.y + 1.2} r={0.45} />
    </g>
  }
  if (f.kind === 'plain') {
    return <rect x={f.x - 1.8} y={f.y - 1.8} width={3.6} height={3.6} rx={0.8}
      fill="none" stroke={c} strokeWidth={0.8} opacity={op} vectorEffect="non-scaling-stroke" />
  }
  if (f.kind === 'island') {
    return <g opacity={op} fill={c}>
      <circle cx={f.x} cy={f.y} r={0.9} /><circle cx={f.x + 1.5} cy={f.y + 2.6} r={0.55} />
    </g>
  }
  return <circle cx={f.x} cy={f.y} r={1.7} fill="none" stroke={c} strokeWidth={0.9} opacity={op}
    vectorEffect="non-scaling-stroke" />
}

function SchematicMap({
  vb = 100, outlines, features, rivers, targetKey, onAttempt, solvedKeys, showTropics, children,
}: SchematicMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  const toMap = (e: React.MouseEvent): { x: number; y: number } => {
    const rect = svgRef.current!.getBoundingClientRect()
    return {
      x: ((e.clientX - rect.left) / rect.width) * vb,
      y: ((e.clientY - rect.top) / rect.height) * vb,
    }
  }

  const click = (e: React.MouseEvent) => {
    if (!onAttempt) return
    const { x, y } = toMap(e)
    let bestKey: string | null = null
    let bestD = 7 // generous hit tolerance in map units
    for (const f of features) {
      const d = f.line ? distToPolyline(x, y, f.line) : Math.hypot(x - f.x, y - f.y)
      if (d < bestD) { bestD = d; bestKey = f.key }
    }
    if (rivers) {
      for (const r of rivers) {
        // parse the path's points for hit-testing
        const pts = [...r.pts.matchAll(/([LM])\s*(-?[\d.]+),(-?[\d.]+)/g)]
          .map(m => ({ x: Number(m[2]), y: Number(m[3]) }))
        const d = distToPolyline(x, y, pts)
        if (d < bestD) { bestD = d; bestKey = `river:${r.key}` }
      }
    }
    onAttempt(bestKey, x, y)
  }

  return (
    <div className="relative">
      <svg ref={svgRef} viewBox={`0 0 ${vb} ${vb}`} onClick={click}
        className={`w-full rounded-xl border border-slate-700 bg-[#0b1226] ${onAttempt ? 'cursor-crosshair' : ''}`}>
        {/* graticule */}
        {[20, 40, 60, 80].map(g => (
          <g key={g} stroke="#1e293b" strokeWidth={0.4} vectorEffect="non-scaling-stroke">
            <line x1={g} y1={0} x2={g} y2={vb} /><line x1={0} y1={g} x2={vb} y2={g} />
          </g>
        ))}
        {showTropics && (
          <>
            <line x1={2} y1={INDIA_TROPIC_Y} x2={95} y2={INDIA_TROPIC_Y} stroke="#f472b6"
              strokeWidth={0.6} strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
            <text x={3} y={INDIA_TROPIC_Y - 1} fontSize={2.6} fill="#f472b6">Tropic of Cancer 23½°N</text>
            <line x1={INDIA_MERIDIAN_X} y1={4} x2={INDIA_MERIDIAN_X} y2={80} stroke="#c084fc"
              strokeWidth={0.6} strokeDasharray="3 2" vectorEffect="non-scaling-stroke" />
            <text x={INDIA_MERIDIAN_X + 1} y={8} fontSize={2.6} fill="#c084fc">82½°E</text>
          </>
        )}
        {outlines.map((o, i) => (
          <path key={i} d={o.d} fill={o.fill ?? '#14532d'} fillOpacity={0.5}
            stroke={o.stroke ?? '#4ade80'} strokeWidth={0.8}
            vectorEffect="non-scaling-stroke" />
        ))}
        {rivers?.map(r => (
          <g key={r.key}>
            <path d={r.pts} fill="none" stroke="#38bdf8" strokeWidth={2.4} opacity={0.001}
              vectorEffect="non-scaling-stroke" />
            <path d={r.pts} fill="none" stroke="#38bdf8" strokeWidth={0.7}
              vectorEffect="non-scaling-stroke" />
            <text fontSize={2.4} fill="#7dd3fc" fontStyle="italic"
              x={Number(r.pts.match(/M\s*(-?[\d.]+),(-?[\d.]+)/)?.[1] ?? 0)}
              y={Number(r.pts.match(/M\s*(-?[\d.]+),(-?[\d.]+)/)?.[2] ?? 0) - 1.2}>
              {r.label.split(' (')[0]}
            </text>
          </g>
        ))}
        {features.map(f => (
          <g key={f.key} className="hover:opacity-80">
            <FeatureGlyph f={f} dim={targetKey ? f.key !== targetKey : false} />
            {(targetKey === f.key || solvedKeys?.has(f.key)) && (
              <text x={f.x + 2.6} y={f.y + 1} fontSize={2.8} fill="#fff" fontWeight={700}>
                {f.label}
              </text>
            )}
          </g>
        ))}
        {children}
      </svg>
    </div>
  )
}

// ------------------------------------------------------------ main shell --

type Tab = 'india' | 'world' | 'contours' | 'climate' | 'monsoon'

const TABS: { key: Tab; label: string; icon: any }[] = [
  { key: 'india', label: 'India physical lab', icon: Map },
  { key: 'world', label: 'Continent labs', icon: Globe2 },
  { key: 'contours', label: 'Contour & toposheet reader', icon: Grid3X3 },
  { key: 'climate', label: 'Climate graph lab', icon: CloudRain },
  { key: 'monsoon', label: 'Monsoon system', icon: Waves },
]

export default function GeoExplorer() {
  const [bandKey, setBandKey] = useState('c8')
  const [chapterKey, setChapterKey] = useState('c8_asia')
  const [topicKey, setTopicKey] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('india')
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

  const band = GEO_SANDBOX_CLASSES.find(b => b.key === bandKey) ?? GEO_SANDBOX_CLASSES[0]
  const chapter = band.chapters.find(c => c.key === chapterKey) ?? band.chapters[0]
  const totalTopics = GEO_SANDBOX_CLASSES.reduce(
    (n, b) => n + b.chapters.reduce((m, c) => m + c.topics.length, 0), 0)

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 overflow-hidden">
      {/* header: class + chapter + topic pickers, progress chip */}
      <div className="px-4 pt-4 pb-3 border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <h2 className="font-black text-lg text-white">
            🗺️ Geography Explorer
            <span className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              geospatial explorer · contour reader · climate lab
            </span>
          </h2>
          <span className="text-[10px] font-black text-emerald-300/80">
            explored {explored.size}/{totalTopics} topics
          </span>
        </div>
        <div className="flex gap-1.5 flex-wrap mb-1.5">
          {GEO_SANDBOX_CLASSES.map(b => (
            <button key={b.key} onClick={() => { setBandKey(b.key); setChapterKey(b.chapters[0].key); setTopicKey(null) }}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition ${b.key === bandKey ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200' : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
              {b.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {band.chapters.map(c => (
            <button key={c.key} onClick={() => { setChapterKey(c.key); setTopicKey(null) }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${c.key === chapterKey ? 'bg-amber-500/15 border-amber-400/50 text-amber-200' : 'bg-slate-800/40 border-slate-700/70 text-slate-400 hover:text-slate-200'}`}>
              {c.label}
            </button>
          ))}
        </div>
        {chapter && (
          <div className="flex gap-1.5 flex-wrap mt-1.5">
            {chapter.topics.map(tp => (
              <button key={tp.key} onClick={() => { setTopicKey(tp.key); markExplored(tp.key) }}
                className={`px-2 py-0.5 rounded-md text-[11px] border transition ${topicKey === tp.key ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200' : explored.has(tp.key) ? 'bg-slate-800/60 border-slate-600 text-slate-300 hover:border-slate-400' : 'bg-slate-800/30 border-slate-700/60 text-slate-400 hover:text-slate-200'}`}>
                {explored.has(tp.key) ? '✓ ' : ''}{tp.label}
              </button>
            ))}
          </div>
        )}
        {topicKey && (() => {
          const tp = chapter.topics.find(x => x.key === topicKey)
          return tp ? <div className="mt-2"><NodeInfoCard nodeId={tp.nodeId} caption={tp.label} /></div> : null
        })()}
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
        {tab === 'india' && <IndiaLab onExplored={markExplored} />}
        {tab === 'world' && <WorldLab onExplored={markExplored} />}
        {tab === 'contours' && <ContourLab onExplored={markExplored} />}
        {tab === 'climate' && <ClimateLab onExplored={markExplored} />}
        {tab === 'monsoon' && <MonsoonLab />}
      </div>
    </div>
  )
}

// ------------------------------------------------------------- INDIA LAB --

function IndiaLab({ onExplored }: { onExplored: (k: string) => void }) {
  const [mode, setMode] = useState<'explore' | 'rivers' | 'power'>('explore')
  const [sel, setSel] = useState<{ kind: 'feature' | 'river'; key: string; nodeId: string; label: string } | null>(null)

  // river locate quiz
  const [riverQ, setRiverQ] = useState<(typeof INDIA_RIVERS)[number] | null>(null)
  const [wrongNode, setWrongNode] = useState<string | null>(null)
  const [solvedRivers, setSolvedRivers] = useState<Set<string>>(new Set())
  const [riverTries, setRiverTries] = useState(0)

  // power project quiz
  const [powerQ, setPowerQ] = useState<(typeof INDIA_POWER_PROJECTS)[number] | null>(null)
  const [powerMode, setPowerMode] = useState<'site' | 'river'>('site')
  const [powerWrong, setPowerWrong] = useState<string | null>(null)
  const [solvedPower, setSolvedPower] = useState<Set<string>>(new Set())

  const nextRiver = useCallback((prev?: (typeof INDIA_RIVERS)[number]) => {
    setRiverQ(randomIn(INDIA_RIVERS, prev))
    setWrongNode(null); setRiverTries(0)
  }, [])

  const nextPower = useCallback(() => {
    setPowerQ(randomIn(INDIA_POWER_PROJECTS))
    setPowerMode(Math.random() < 0.5 ? 'site' : 'river')
    setPowerWrong(null)
  }, [])

  const attempt = (key: string | null) => {
    if (mode === 'explore') {
      if (!key) return
      if (key.startsWith('river:')) {
        const rk = key.slice(6)
        const r = INDIA_RIVERS.find(x => x.key === rk)
        if (r) { setSel({ kind: 'river', key: rk, nodeId: r.nodeId, label: r.label }); onExplored('in_riv_' + rk) }
      } else {
        const f = INDIA_FEATURES.find(x => x.key === key)
        if (f) { setSel({ kind: 'feature', key, nodeId: f.nodeId, label: f.label }); onExplored('in_ft_' + key) }
      }
      return
    }
    if (mode === 'rivers' && riverQ) {
      if (key === `river:${riverQ.key}`) {
        setSolvedRivers(prev => new Set(prev).add(riverQ.key))
        onExplored('in_rivq_' + riverQ.key)
        setSel({ kind: 'river', key: riverQ.key, nodeId: riverQ.nodeId, label: riverQ.label })
        setRiverQ(null)
        setTimeout(() => nextRiver(riverQ), 900)
      } else if (riverTries >= 1) {
        setWrongNode(riverQ.nodeId) // authored trap for the missed identification
      }
      setRiverTries(t => t + 1)
    }
  }

  /** power-mode judging (both question kinds target the dam chips) */
  const answerPowerDam = (damKey: string) => {
    if (!powerQ) return
    if (damKey === powerQ.key) {
      setSolvedPower(prev => new Set(prev).add(powerQ.key))
      onExplored('in_pow_' + powerQ.key)
      setPowerQ(null)
      setTimeout(nextPower, 900)
    } else {
      setPowerWrong(powerQ.nodeId)
    }
  }

  const answerPowerRiver = (river: string) => {
    if (!powerQ) return
    if (river === powerQ.river) {
      setSolvedPower(prev => new Set(prev).add(powerQ.key))
      onExplored('in_pow_' + powerQ.key)
      setPowerQ(null)
      setTimeout(nextPower, 900)
    } else {
      setPowerWrong(powerQ.nodeId)
    }
  }

  return (
    <div className="grid md:grid-cols-[1.5fr_1fr] gap-4">
      <div>
        <div className="flex gap-1.5 mb-2 flex-wrap">
          {([['explore', 'Explore features'], ['rivers', 'Locate the rivers'], ['power', 'Power projects']] as const).map(([k, lab]) => (
            <button key={k} onClick={() => { setMode(k); setWrongNode(null); setPowerWrong(null); if (k === 'rivers' && !riverQ) nextRiver(); if (k === 'power') nextPower() }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${mode === k ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
              {lab}
            </button>
          ))}
          <button onClick={() => { setRiverQ(null); setPowerQ(null); setSolvedRivers(new Set()); setSolvedPower(new Set()) }}
            className="ml-auto px-2 py-1 rounded-lg text-[11px] font-bold border border-slate-700 text-slate-400 hover:text-slate-200 flex items-center gap-1">
            <RotateCcw className="w-3 h-3" />reset
          </button>
        </div>

        <SchematicMap
          outlines={[{ d: INDIA_OUTLINE }]}
          features={INDIA_FEATURES}
          rivers={mode === 'power' ? undefined : INDIA_RIVERS}
          solvedKeys={mode === 'explore' && sel ? new Set([sel.key]) : new Set()}
          onAttempt={mode === 'power' ? undefined : attempt}
          showTropics />

        {mode === 'power' && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {INDIA_POWER_PROJECTS.map(p => (
              <button key={p.key} onClick={() => answerPowerDam(p.key)}
                className={`px-2 py-0.5 rounded-md text-[11px] border ${solvedPower.has(p.key) ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200' : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-sky-400'}`}>
                {solvedPower.has(p.key) ? '✓ ' : ''}{p.dam}
              </button>
            ))}
          </div>
        )}

        {mode === 'rivers' && riverQ && (
          <p className="mt-2 text-sm text-sky-200 font-bold">
            🎯 Click the <span className="underline">{riverQ.label}</span> on the map
            <span className="ml-2 text-[10px] font-normal text-slate-400">tap the blue line</span>
          </p>
        )}
      </div>

      <div className="space-y-3">
        {mode === 'power' && powerQ && powerMode === 'river' && (
          <div className="rounded-xl border border-sky-500/25 bg-sky-500/5 px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-wider text-sky-300 font-black mb-1">dam → river</p>
            <p className="text-sm font-bold text-white mb-2">{powerQ.dam} stands on which river?</p>
            <div className="flex flex-wrap gap-1.5">
              {randomOptions(powerQ.river, INDIA_POWER_PROJECTS.map(p => p.river)).map(r => (
                <button key={r} onClick={() => answerPowerRiver(r)}
                  className="px-2 py-1 rounded-md text-[11px] border bg-slate-800/60 border-slate-600 text-slate-200 hover:border-sky-400">
                  {r}
                </button>
              ))}
            </div>
          </div>
        )}
        {mode === 'power' && powerQ && powerMode === 'site' && (
          <div className="rounded-xl border border-sky-500/25 bg-sky-500/5 px-3 py-2.5">
            <p className="text-[10px] uppercase tracking-wider text-sky-300 font-black mb-1">river + state → dam</p>
            <p className="text-sm font-bold text-white">
              Which dam stands on the {powerQ.river} in {powerQ.state}?
            </p>
            <p className="mt-1 text-[10px] text-slate-500">pick from the dam chips under the map — Himalayan rivers and peninsular rivers both host power houses (corpus: c10 · minerals &amp; energy)</p>
          </div>
        )}

        {sel && <NodeInfoCard nodeId={sel.nodeId} caption={sel.label} />}

        {(wrongNode || powerWrong) && (
          <MisconBlock nodeId={(wrongNode || powerWrong) as string} />
        )}

        <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-black mb-1">legend</p>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            △ mountains &nbsp;·&nbsp; ◻ plains &nbsp;·&nbsp; ⁘ deserts &nbsp;·&nbsp; ◯ plateaus &nbsp;·&nbsp;
            <span className="text-sky-300">— rivers (italic names)</span> &nbsp;·&nbsp; <span className="text-pink-400">--- Tropic of Cancer</span>
          </p>
        </div>
      </div>
    </div>
  )
}

/** deterministic-ish MCQ options around the correct answer */
function randomOptions(correct: string, pool: string[], n = 4): string[] {
  const others = [...new Set(pool.filter(p => p !== correct))].sort(() => Math.random() - 0.5).slice(0, n - 1)
  return [correct, ...others].sort(() => Math.random() - 0.5)
}

// ------------------------------------------------------------- WORLD LAB --

const CONTINENTS = {
  africa: {
    label: 'Africa — the plateau continent',
    outlines: [{ d: AFRICA_OUTLINE }, { d: AFRICA_MADAGASCAR }],
    features: AFRICA_FEATURES,
    introNode: 'c7_geo_icse_06_002',
  },
  asia: {
    label: 'Asia — the largest continent',
    outlines: [{ d: ASIA_OUTLINE }],
    features: ASIA_FEATURES,
    introNode: 'c8_geo_icse_05_001',
  },
  europe: {
    label: 'Europe — many countries, one peninsula of Asia',
    outlines: [{ d: EUROPE_OUTLINE }, { d: EUROPE_UK }, { d: EUROPE_IRELAND }],
    features: EUROPE_FEATURES,
    introNode: 'c7_geo_icse_06_001',
  },
} as const

type ContinentKey = keyof typeof CONTINENTS

function WorldLab({ onExplored }: { onExplored: (k: string) => void }) {
  const [cont, setCont] = useState<ContinentKey>('africa')
  const pack = CONTINENTS[cont]
  const [sel, setSel] = useState<MapFeature | null>(null)
  const [quiz, setQuiz] = useState<MapFeature | null>(null)
  const [wrongNode, setWrongNode] = useState<string | null>(null)
  const [solved, setSolved] = useState<Set<string>>(new Set())
  const [tries, setTries] = useState(0)

  const nextQuiz = useCallback((prev?: MapFeature) => {
    setQuiz(randomIn([...CONTINENTS[cont].features] as MapFeature[], prev))
    setWrongNode(null); setTries(0)
  }, [cont])

  const attempt = (key: string | null) => {
    if (!key || key.startsWith('river:')) return
    const f = pack.features.find(x => x.key === key)
    if (!f) return
    if (!quiz) { // explore mode
      setSel(f); onExplored(`w_${cont}_${f.key}`)
      return
    }
    if (f.key === quiz.key) {
      setSolved(prev => new Set(prev).add(f.key))
      onExplored(`wq_${cont}_${f.key}`)
      setSel(f)
      setQuiz(null)
      setTimeout(() => nextQuiz(f), 900)
    } else if (tries >= 1) {
      setWrongNode(quiz.nodeId) // authored trap for the missed location
    }
    setTries(t => t + 1)
  }

  return (
    <div className="grid md:grid-cols-[1.5fr_1fr] gap-4">
      <div>
        <div className="flex gap-1.5 mb-2 flex-wrap items-center">
          {(Object.keys(CONTINENTS) as ContinentKey[]).map(k => (
            <button key={k} onClick={() => { setCont(k); setSel(null); setQuiz(null); setSolved(new Set()) }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border capitalize ${cont === k ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
              {k}
            </button>
          ))}
          <button onClick={() => (quiz ? setQuiz(null) : nextQuiz())}
            className={`ml-auto px-2.5 py-1 rounded-lg text-[11px] font-bold border ${quiz ? 'bg-amber-500/20 border-amber-400/60 text-amber-200' : 'border-slate-700 text-slate-400 hover:text-slate-200'}`}>
            {quiz ? 'stop quiz' : 'locate-me quiz'}
          </button>
        </div>

        <SchematicMap
          outlines={pack.outlines.map(o => ({ d: o.d, fill: cont === 'africa' ? '#78350f' : cont === 'asia' ? '#3f6212' : '#1e3a5f' }))}
          features={pack.features as MapFeature[]}
          targetKey={quiz ? quiz.key : null}
          solvedKeys={solved}
          onAttempt={attempt} />

        {quiz ? (
          <p className="mt-2 text-sm text-amber-200 font-bold">
            🎯 Locate: <span className="underline">{quiz.label}</span>
            <span className="ml-2 text-[10px] font-normal text-slate-400">click its marker on the map</span>
          </p>
        ) : (
          <p className="mt-2 text-xs text-slate-400">Click any feature to read its authored corpus entry — or start a locate-me quiz.</p>
        )}
      </div>

      <div className="space-y-3">
        <NodeInfoCard nodeId={pack.introNode} caption={pack.label} />
        {sel && <NodeInfoCard nodeId={sel.nodeId} caption={sel.label} />}
        {wrongNode && <MisconBlock nodeId={wrongNode} />}
      </div>
    </div>
  )
}

// ----------------------------------------------------------- CONTOUR LAB --

function ContourLab({ onExplored }: { onExplored: (k: string) => void }) {
  const [drill, setDrill] = useState<'identify' | 'steep' | 'grid'>('identify')

  // identify drill
  const [pat, setPat] = useState<(typeof CONTOUR_PATTERNS)[number]>(() => randomIn(CONTOUR_PATTERNS))
  const [wrongNode, setWrongNode] = useState<string | null>(null)
  const [outcome, setOutcome] = useState<'ok' | 'bad' | null>(null)

  // steep-vs-gentle drill
  const [steepLeft, setSteepLeft] = useState(() => Math.random() < 0.5)
  const [steepOut, setSteepOut] = useState<'ok' | 'bad' | null>(null)

  // grid ref drill
  const [gItem, setGItem] = useState(GRID_REF_QUIZ.items[0])
  const [gWrong, setGWrong] = useState<string | null>(null)

  const hill = (sigma: number) => (u: number, v: number) =>
    100 * Math.exp(-((u - 0.5) ** 2 + (v - 0.5) ** 2) / sigma)

  const nextPattern = () => {
    setPat(randomIn(CONTOUR_PATTERNS, pat)); setWrongNode(null); setOutcome(null)
  }

  return (
    <div>
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {([['identify', 'Identify the landform'], ['steep', 'Steep vs gentle'], ['grid', 'Grid references']] as const).map(([k, lab]) => (
          <button key={k} onClick={() => setDrill(k)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${drill === k ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
            {lab}
          </button>
        ))}
      </div>

      {drill === 'identify' && (
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-4">
          <div>
            <svg viewBox="0 0 240 240" className="w-full rounded-xl border border-slate-700 bg-[#0b1226]">
              {CONTOUR_LEVELS.map(lv => (
                <path key={lv} d={contourPath(pat.height, lv, 240)} fill="none"
                  stroke="#d97706" strokeWidth={1} opacity={0.9} />
              ))}
              <text x={6} y={14} fontSize={9} fill="#64748b">contour interval 10 m</text>
            </svg>
            <p className="mt-1.5 text-[11px] text-slate-500">
              brown lines join equal heights — their shapes and spacing are the relief
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-2">What landform does this pattern show?</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {CONTOUR_PATTERNS.map(p => (
                <button key={p.key}
                  onClick={() => {
                    if (p.key === pat.key) {
                      setOutcome('ok'); onExplored('ct_id_' + p.key)
                      setTimeout(nextPattern, 1100)
                    } else {
                      setOutcome('bad'); setWrongNode(pat.nodeId)
                    }
                  }}
                  className="px-2.5 py-1 rounded-md text-[11px] font-semibold border bg-slate-800/60 border-slate-600 text-slate-200 hover:border-sky-400">
                  {p.label}
                </button>
              ))}
            </div>
            {outcome === 'ok' && (
              <p className="text-xs text-emerald-300 font-bold mb-2">✓ correct — {pat.label}. Next sheet incoming…</p>
            )}
            <MisconBlock nodeId={wrongNode} />
            <NodeInfoCard nodeId="c7_geo_icse_07_001" caption="Reading contour lines" />
          </div>
        </div>
      )}

      {drill === 'steep' && (
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-4">
          <div className="grid grid-cols-2 gap-2">
            {([['A', steepLeft ? 0.008 : 0.045], ['B', steepLeft ? 0.045 : 0.008]] as const).map(([tag, sigma]) => (
              <button key={tag} onClick={() => {
                const pickedSteep = (tag === 'A') === steepLeft
                setSteepOut(pickedSteep ? 'ok' : 'bad')
                if (pickedSteep) {
                  onExplored('ct_steep')
                  setWrongNode(null)
                  setTimeout(() => { setSteepLeft(Math.random() < 0.5); setSteepOut(null) }, 1100)
                } else setWrongNode('c7_geo_icse_07_003')
              }}
                className="rounded-xl border border-slate-700 bg-[#0b1226] p-1 hover:border-sky-400">
                <svg viewBox="0 0 200 200" className="w-full">
                  {CONTOUR_LEVELS.map(lv => (
                    <path key={lv} d={contourPath(hill(sigma), lv, 200)} fill="none"
                      stroke="#d97706" strokeWidth={1} />
                  ))}
                  <text x={6} y={16} fontSize={14} fill="#fff" fontWeight={800}>{tag}</text>
                </svg>
                <p className="text-[10px] text-slate-500 text-center py-1">which slope is steeper?</p>
              </button>
            ))}
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-2">Hill A or Hill B — where would you climb hardest?</p>
            {steepOut === 'ok' && (
              <p className="text-xs text-emerald-300 font-bold mb-2">✓ exactly — tightly packed contours = steep; wide spacing = gentle.</p>
            )}
            <MisconBlock nodeId={wrongNode} />
            <NodeInfoCard nodeId="c7_geo_icse_07_003" caption="Spacing tells the slope" />
          </div>
        </div>
      )}

      {drill === 'grid' && (
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-4">
          <div>
            <svg viewBox="0 0 250 250" className="w-full rounded-xl border border-slate-700 bg-[#0b1226]">
              {Array.from({ length: 6 }, (_, i) => (
                <g key={i} stroke="#334155" strokeWidth={0.8}>
                  <line x1={20 + i * 44} y1={20} x2={20 + i * 44} y2={240} />
                  <line x1={20} y1={20 + i * 44} x2={240} y2={20 + i * 44} />
                </g>
              ))}
              {GRID_REF_QUIZ.eastings.map((e, i) => (
                <text key={e} x={20 + i * 44 + 22} y={14} fontSize={10} fill="#94a3b8" textAnchor="middle">{e}</text>
              ))}
              {GRID_REF_QUIZ.northings.map((nn, i) => (
                <text key={nn} x={8} y={20 + i * 44 + 26} fontSize={10} fill="#94a3b8">{nn}</text>
              ))}
              {GRID_REF_QUIZ.items.map(it => (
                <text key={it.key} x={20 + it.cell[0] * 44 + 22} y={20 + it.cell[1] * 44 + 26}
                  fontSize={11} fill="#fbbf24" textAnchor="middle">{it.sym}</text>
              ))}
              <text x={20 + gItem.cell[0] * 44 + 22} y={20 + gItem.cell[1] * 44 + 14}
                fontSize={7} fill="#f472b6" textAnchor="middle">?</text>
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-2">
              Give the 4-figure grid reference of the <span className="underline">{gItem.label.split(' (')[0]}</span>
            </p>
            <p className="text-[11px] text-slate-400 mb-3">
              rule: eastings first, then northings — the south-west corner of its square
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {randomOptions(gItem.ref, GRID_REF_QUIZ.items.map(i => i.ref).concat(['0590', '0709'])).map(ref => (
                <button key={ref} onClick={() => {
                  if (ref === gItem.ref) {
                    onExplored('ct_grid_' + gItem.key); setGWrong(null)
                    setGItem(randomIn(GRID_REF_QUIZ.items, gItem))
                  } else setGWrong('c10_geo_icse_01_001')
                }}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono border bg-slate-800/60 border-slate-600 text-slate-200 hover:border-sky-400">
                  {ref}
                </button>
              ))}
            </div>
            <MisconBlock nodeId={gWrong} />
            <NodeInfoCard nodeId="c10_geo_icse_01_001" caption="Eastings & northings" />
          </div>
        </div>
      )}
    </div>
  )
}

// ----------------------------------------------------------- CLIMATE LAB --

function ClimateGraph({ temps, rain }: { temps: number[]; rain: number[] }) {
  const W = 420, H = 240, L = 34, B = 30, T = 14
  const maxT = Math.max(40, Math.ceil(Math.max(...temps) / 10) * 10)
  const minT = Math.min(0, Math.floor(Math.min(...temps) / 10) * 10)
  const maxR = Math.max(80, Math.ceil(Math.max(...rain) / 50) * 50)
  const tx = (i: number) => L + 8 + (i * (W - L - 24)) / 12 + (W - L - 24) / 24
  const ty = (t: number) => B - ((t - minT) / (maxT - minT)) * (B - T)
  const ry = (r: number) => B - (r / maxR) * (B - T)
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-xl border border-slate-700 bg-[#0b1226]">
      {/* left axis: temp, right axis: rain */}
      <line x1={L} y1={T} x2={L} y2={B} stroke="#f59e0b" strokeWidth={1} />
      <line x1={W - 10} y1={T} x2={W - 10} y2={B} stroke="#38bdf8" strokeWidth={1} />
      <line x1={L} y1={B} x2={W - 10} y2={B} stroke="#475569" strokeWidth={1} />
      <text x={L - 4} y={ty(maxT)} fontSize={9} fill="#f59e0b" textAnchor="end">{maxT}°C</text>
      <text x={L - 4} y={ty(minT) + 6} fontSize={9} fill="#f59e0b" textAnchor="end">{minT}°C</text>
      <text x={W - 8} y={T + 8} fontSize={9} fill="#38bdf8">{maxR}mm</text>
      {MONTH_LABELS.map((m, i) => (
        <g key={i}>
          <rect x={tx(i) - 9} y={ry(rain[i])} width={18} height={B - ry(rain[i])}
            fill="#38bdf8" opacity={0.35} />
          <text x={tx(i)} y={H - 12} fontSize={9} fill="#94a3b8" textAnchor="middle">{m}</text>
        </g>
      ))}
      <polyline points={temps.map((t, i) => `${tx(i)},${ty(t)}`).join(' ')}
        fill="none" stroke="#f59e0b" strokeWidth={2} />
      {temps.map((t, i) => <circle key={i} cx={tx(i)} cy={ty(t)} r={2} fill="#fbbf24" />)}
    </svg>
  )
}

function ClimateLab({ onExplored }: { onExplored: (k: string) => void }) {
  const [mode, setMode] = useState<'identify' | 'build'>('identify')
  const [target, setTarget] = useState<ClimatePreset>(() => randomIn(CLIMATE_PRESETS))
  const [guess, setGuess] = useState<string | null>(null)
  const [wrongNode, setWrongNode] = useState<string | null>(null)

  // build mode (E1 parameter lab): morph the signature, live-classify
  const [baseT, setBaseT] = useState(27)
  const [range, setRange] = useState(9)
  const [totalR, setTotalR] = useState(1200)
  const [seasonality, setSeasonality] = useState(0.8) // 0 = even, 1 = monsoon-peaked
  const [winterWet, setWinterWet] = useState(false)

  const built = useMemo(() => {
    const temps: number[] = []
    const rain: number[] = []
    for (let i = 0; i < 12; i++) {
      // N-hemisphere seasonality: ~+1 in June (i=5), -1 in December
      const seasonal = Math.cos(((i - 5.5) / 12) * 2 * Math.PI)
      temps.push(baseT + (range / 2) * seasonal)
      const w = winterWet ? -seasonal : seasonal
      const shape = Math.max(0.05, 0.5 + (seasonality / 2) * w)
      rain.push((totalR / 12) * shape * 1.8)
    }
    return { temps, rain }
  }, [baseT, range, totalR, seasonality, winterWet])

  const ranking = useMemo(
    () => classifyClimate(mode === 'identify' ? target.temps : built.temps,
      mode === 'identify' ? target.rain : built.rain),
    [mode, target, built])

  const tooClose = ranking.length > 1 && ranking[1].score - ranking[0].score < 0.8

  return (
    <div className="grid md:grid-cols-[1.2fr_1fr] gap-4">
      <div>
        <div className="flex gap-1.5 mb-2">
          {([['identify', 'Identify the region'], ['build', 'Build a climate']] as const).map(([k, lab]) => (
            <button key={k} onClick={() => { setMode(k); setGuess(null); setWrongNode(null) }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${mode === k ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}>
              {lab}
            </button>
          ))}
        </div>
        <ClimateGraph temps={mode === 'identify' ? target.temps : built.temps}
          rain={mode === 'identify' ? target.rain : built.rain} />
        <p className="mt-1.5 text-[11px] text-slate-500">
          bars = monthly rainfall (mm, right scale) · orange line = mean monthly temperature (left scale) — the corpus&apos;s climatograph
        </p>
      </div>

      <div className="space-y-3">
        {mode === 'identify' && (
          <>
            <p className="text-sm font-bold text-white">Which natural region is this?</p>
            <div className="flex flex-wrap gap-1.5">
              {CLIMATE_PRESETS.map(p => (
                <button key={p.key} onClick={() => {
                  setGuess(p.key)
                  if (p.key === target.key) {
                    onExplored('cl_id_' + p.key); setWrongNode(null)
                    setTimeout(() => { setTarget(randomIn(CLIMATE_PRESETS, target)); setGuess(null) }, 1200)
                  } else setWrongNode(target.nodeId)
                }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${guess === p.key
                    ? p.key === target.key ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200' : 'bg-rose-500/10 border-rose-400/40 text-rose-200'
                    : 'bg-slate-800/60 border-slate-600 text-slate-200 hover:border-sky-400'}`}>
                  {p.label}
                </button>
              ))}
            </div>
            {guess === target.key && <p className="text-xs text-emerald-300 font-bold">✓ {target.hint}</p>}
          </>
        )}

        {mode === 'build' && (
          <>
            <p className="text-sm font-bold text-white">Sculpt the signature — the solver names the region</p>
            {([
              ['annual mean temp (°C)', baseT, setBaseT, -15, 32, 0.5],
              ['annual range (°C)', range, setRange, 1, 35, 0.5],
              ['annual rainfall (mm)', totalR, setTotalR, 30, 2600, 10],
              ['rain seasonality', seasonality, setSeasonality, 0, 1, 0.05],
            ] as Array<[string, number, (v: number) => void, number, number, number]>).map(([lab, v, set, min, max, st]) => (
              <label key={lab} className="flex items-center gap-2 text-xs">
                <span className="w-36 text-slate-400 font-semibold">{lab}</span>
                <input type="range" min={min} max={max} step={st} value={v}
                  onChange={e => set(Number(e.target.value))} className="flex-1 accent-sky-400" />
                <span className="w-14 text-right font-mono text-slate-200">{v}</span>
              </label>
            ))}
            <label className="flex items-center gap-2 text-xs text-slate-300">
              <input type="checkbox" checked={winterWet} onChange={e => setWinterWet(e.target.checked)}
                className="accent-sky-400" />
              winter-wet regime (Mediterranean-style)
            </label>
            <div className="rounded-xl border border-sky-500/25 bg-sky-500/5 px-3 py-2">
              <p className="text-[10px] uppercase tracking-wider text-sky-300 font-black mb-1">solver verdict</p>
              <p className="text-sm font-bold text-white">
                {ranking[0].label}
                {tooClose && <span className="text-slate-400 font-normal text-xs"> (leaning — close to {ranking[1].label})</span>}
              </p>
            </div>
            {/* the all-deserts-are-hot trap: hot but soaked → not a desert */}
            {baseT >= 24 && totalR >= 1200 && seasonality <= 0.2 && (
              <p className="text-xs text-amber-300">
                ⚠ hot AND wet all year — that is the <b>Equatorial</b> pole of the system, not a desert: deserts fail on RAIN, not heat.
              </p>
            )}
          </>
        )}

        <MisconBlock nodeId={wrongNode} />
        <NodeInfoCard nodeId={mode === 'build' ? 'c10_geo_icse_03_007' : target.nodeId}
          caption="The seven natural regions" />
      </div>
    </div>
  )
}

// ----------------------------------------------------------- MONSOON LAB --

function MonsoonLab() {
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setPhaseIdx(i => (i + 1) % MONSOON_PHASES.length)
      }, 2600)
      return () => { if (timer.current) clearInterval(timer.current) }
    }
  }, [playing])

  const phase = MONSOON_PHASES[phaseIdx]

  return (
    <div className="grid md:grid-cols-[1.2fr_1fr] gap-4">
      <div>
        <svg viewBox="0 0 100 85" className="w-full rounded-xl border border-slate-700 bg-[#0b1226]">
          <defs>
            <marker id="geo-arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="#7dd3fc" />
            </marker>
          </defs>
          <path d={INDIA_OUTLINE} fill="#14532d" fillOpacity={0.5} stroke="#4ade80"
            strokeWidth={0.8} vectorEffect="non-scaling-stroke" />
          {/* Western Ghats orographic barrier */}
          <polyline points="18,44 21,52 25,62 28,70" fill="none" stroke="#d97706"
            strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <text x={14} y={42} fontSize={2.4} fill="#fbbf24">Western Ghats</text>
          {/* rain blobs */}
          {phase.rain.map(([cx, cy, rx, ry2, o], i) => (
            <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry2} fill="#38bdf8" opacity={o} />
          ))}
          {/* wind arrows */}
          {phase.arrows.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7dd3fc" strokeWidth={1}
              markerEnd="url(#geo-arrow)" vectorEffect="non-scaling-stroke">
              <animate attributeName="stroke-dasharray" values="0 20; 12 8; 0 20" dur="2.2s" repeatCount="indefinite" />
            </line>
          ))}
          {phase.lowOverNW && (
            <>
              <circle cx={22} cy={19} r={4.5} fill="none" stroke="#f87171" strokeWidth={0.8} strokeDasharray="2 1.4" />
              <text x={22} y={20.4} fontSize={5} fill="#f87171" textAnchor="middle" fontWeight={800}>L</text>
              <text x={22} y={26} fontSize={2.4} fill="#fca5a5" textAnchor="middle">thermal low</text>
            </>
          )}
          <text x={50} y={83} fontSize={3} fill="#94a3b8" textAnchor="middle">
            {phase.months} — schematic winds, not to scale
          </text>
        </svg>

        {/* timeline scrubber */}
        <div className="flex gap-1 mt-2">
          {MONSOON_PHASES.map((p, i) => (
            <button key={p.key} onClick={() => { setPhaseIdx(i); setPlaying(false) }}
              className={`flex-1 px-1 py-1.5 rounded-lg text-[10px] font-bold border transition ${i === phaseIdx ? 'bg-sky-500/20 border-sky-400/60 text-sky-200' : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:text-slate-200'}`}>
              {p.months}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => setPlaying(pl => !pl)}
            className="px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-black">
            {playing ? '❚❚ pause' : '▶ play year'}
          </button>
          <p className="text-sm font-bold text-sky-200">{phase.label}</p>
        </div>
      </div>

      <div className="space-y-3">
        <MonsoonPhaseCard nodeId={phase.nodeId} phaseKey={phase.key} />
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/30 px-3 py-2">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-black mb-1">read the map</p>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            blue arrows = surface winds · shaded patches = rain · red <b>L</b> = the heat low over NW India ·
            the orange barrier is the Western Ghats — watch the west coast wet while the Deccan&apos;s lee stays dry
            (orographic lifting), and watch the ITCZ migrate with the overhead sun.
          </p>
        </div>
      </div>
    </div>
  )
}

/** Phase explanation — authored monsoon-mechanism node, honest null. */
const PHASE_LINES: Record<string, string> = {
  winter: 'Winter set-up: Asia cools → high pressure over the land; dry NE winds flow seaward (rain only on the Tamil Nadu coast).',
  premonsoon: 'Pre-monsoon: the subcontinent heats faster than the oceans — the thermal low builds over the Thar and the plains.',
  onset: 'Onset: the ITCZ jumps north; SE trades cross the Equator, Coriolis turns them SW — first strike over Kerala around 1 June.',
  advance: 'Advance: Somali Jet + Arabian Sea branch + Bay branch sweep the country; orographic rain on the Ghats, rain-shadow to their lee.',
  retreat: 'Retreat: the monsoon trough pulls south; rains withdraw from the northwest, clear skies return.',
  ne: 'NE monsoon: land high, sea low — dry over most of India, but the seaward wind crosses the Bay of Bengal, picks up moisture and rains on the Tamil Nadu coast.',
}

function MonsoonPhaseCard({ nodeId, phaseKey }: { nodeId: string; phaseKey: string }) {
  const enr = useEnrichment(nodeId)
  return (
    <div className="rounded-xl border border-sky-500/25 bg-sky-500/5 px-3 py-2.5">
      <p className="text-[10px] uppercase tracking-wider text-sky-300 font-black mb-1">phase brief (schematic step)</p>
      <p className="text-xs text-slate-200 leading-relaxed">{PHASE_LINES[phaseKey]}</p>
      {enr?.definition ? (
        <p className="mt-2 text-[11px] text-slate-400 leading-relaxed border-t border-slate-700/60 pt-2">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 font-black">authored mechanism · </span>
          {firstSentences(enr.definition, 3)}
        </p>
      ) : (
        <p className="mt-2 text-[11px] text-slate-500 italic">authored monsoon-mechanism text loads from the corpus…</p>
      )}
    </div>
  )
}
