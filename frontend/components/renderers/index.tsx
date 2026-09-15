'use client'

import { InteractiveVideo, type Hotspot } from './InteractiveVideo'
import { ManimRenderer } from './ManimRenderer'
import { TimelineMapRenderer, type TimelineEvent } from './TimelineMapRenderer'
import { Molecular3DRenderer } from './Molecular3DRenderer'
import { AnnotatedSVGRenderer } from './AnnotatedSVGRenderer'
import { TextAnnotationRenderer, type TextAnnotationRendererProps } from './TextAnnotationRenderer'
import { FlowchartRenderer, type FlowchartRendererProps } from './FlowchartRenderer'
import { LedgerRenderer, type LedgerRendererProps } from './LedgerRenderer'
import { HyperFramePlayer, type HyperFrame } from './HyperFramePlayer'
import { DiagramRenderer, type DiagramNode, type DiagramEdge } from './DiagramRenderer'
import { VideoRenderer } from './VideoRenderer'
import { GraphSliderRenderer, type GraphSliderRendererProps } from './GraphSliderRenderer'
import { CodeEditorRenderer, type CodeEditorRendererProps } from './CodeEditorRenderer'
import { motion } from 'framer-motion'
import { useState } from 'react'

export type FrameType =
  | 'interactive_video'
  | 'manim'
  | 'timeline_map'
  | 'molecular_3d'
  | 'annotated_svg'
  | 'text_annotation'
  | 'flowchart'
  | 'ledger'
  | 'graph_slider'
  | 'code_editor'
  | 'text'
  | 'quiz'
  | 'ray_diagram'
  | 'circuit'
  | 'function_plot'

export interface Frame {
  id: string
  type: FrameType
  title?: string
  subtitle?: string
  data: {
    // Interactive video
    videoUrl?: string
    hotspots?: Hotspot[]
    // Manim
    sceneName?: string
    description?: string
    sceneData?: { objects?: { type: string; label: string; color: string }[]; steps?: string[] }
    // Timeline
    events?: TimelineEvent[]
    // Molecular
    moleculeName?: string
    formula?: string
    atoms?: { element: string; x: number; y: number; z: number; color: string; radius: number }[]
    bonds?: { from: number; to: number; type: 'single' | 'double' | 'triple' }[]
    // Annotated SVG
    imageUrl?: string
    annotations?: { id: string; x: number; y: number; label: string; description: string; color?: string }[]
    // Text annotation
    text?: string
    translation?: string
    sideNotes?: { title: string; content: string }[]
    // Flowchart
    nodes?: FlowchartRendererProps['nodes']
    edges?: FlowchartRendererProps['edges']
    // Ledger
    accountName?: string
    entries?: LedgerRendererProps['entries']
    // Graph slider
    computeFn?: (x: number, sliders: Record<string, number>) => number
    computeFn2?: (x: number, sliders: Record<string, number>) => number
    xRange?: [number, number]
    sliders?: GraphSliderRendererProps['sliders']
    xAxisLabel?: string
    yAxisLabel?: string
    curveLabel?: string
    curve2Label?: string
    // Code editor
    language?: string
    initialCode?: string
    expectedOutput?: string
    executionSteps?: CodeEditorRendererProps['executionSteps']
    explanation?: string
    // Text frame
    content?: string
    // Quiz
    question?: string
    options?: string[]
    correctIndex?: number
    // Ray diagram (optics)
    rayType?: 'convex_lens' | 'concave_lens' | 'convex_mirror' | 'concave_mirror' | 'prism'
    objectDistance?: number
    focalLength?: number
    objectHeight?: number
    // Circuit
    circuitElements?: { type: string; value?: string; position: [number, number]; rotation?: number }[]
    circuitConnections?: { from: string; to: string }[]
    // Function plot
    functions?: { expression: string; color: string; label?: string }[]
    yRange?: [number, number]
    plotTitle?: string
  }
}

export function FrameRenderer({ frame }: { frame: Frame }) {
  switch (frame.type) {
    case 'interactive_video':
      return <InteractiveVideo videoUrl={frame.data.videoUrl || ''} hotspots={frame.data.hotspots || []} />

    case 'manim':
      return (
        <ManimRenderer
          sceneName={frame.data.sceneName || ''}
          description={frame.data.description}
          sceneData={frame.data.sceneData}
        />
      )

    case 'timeline_map':
      return <TimelineMapRenderer events={frame.data.events || []} title={frame.title} />

    case 'molecular_3d':
      return (
        <Molecular3DRenderer
          moleculeName={frame.data.moleculeName || ''}
          formula={frame.data.formula || ''}
          description={frame.data.description}
          atoms={frame.data.atoms}
          bonds={frame.data.bonds}
        />
      )

    case 'annotated_svg':
      return (
        <AnnotatedSVGRenderer
          title={frame.title}
          imageUrl={frame.data.imageUrl}
          annotations={frame.data.annotations}
        />
      )

    case 'text_annotation':
      return (
        <TextAnnotationRenderer
          title={frame.title}
          text={frame.data.text || ''}
          annotations={frame.data.annotations as unknown as TextAnnotationRendererProps['annotations'] || []}
          translation={frame.data.translation}
          sideNotes={frame.data.sideNotes}
        />
      )

    case 'flowchart':
      return (
        <FlowchartRenderer
          title={frame.title}
          nodes={frame.data.nodes || []}
          edges={frame.data.edges || []}
        />
      )

    case 'ledger':
      return (
        <LedgerRenderer
          accountName={frame.data.accountName || ''}
          entries={frame.data.entries || []}
          description={frame.data.description}
        />
      )

    case 'graph_slider':
      return (
        <GraphSliderRenderer
          title={frame.title}
          description={frame.data.description}
          xAxisLabel={frame.data.xAxisLabel}
          yAxisLabel={frame.data.yAxisLabel}
          computeFn={frame.data.computeFn || (() => 0)}
          computeFn2={frame.data.computeFn2}
          xRange={frame.data.xRange}
          sliders={frame.data.sliders}
          curveLabel={frame.data.curveLabel}
          curve2Label={frame.data.curve2Label}
        />
      )

    case 'code_editor':
      return (
        <CodeEditorRenderer
          title={frame.title}
          language={frame.data.language}
          initialCode={frame.data.initialCode}
          expectedOutput={frame.data.expectedOutput}
          explanation={frame.data.explanation}
          executionSteps={frame.data.executionSteps}
        />
      )

    case 'text':
      return (
        <div className="glass-card rounded-2xl p-8">
          {frame.title && <h3 className="font-display text-2xl font-bold text-white mb-4">{frame.title}</h3>}
          {frame.subtitle && <p className="text-sm text-surface-600 mb-6">{frame.subtitle}</p>}
          <div className="prose prose-invert max-w-none">
            <p className="text-base text-surface-700 leading-relaxed">{frame.data.content}</p>
          </div>
        </div>
      )

    case 'quiz':
      return <QuizFrame frame={frame} />

    case 'ray_diagram':
      return <RayDiagramFrame frame={frame} />

    case 'circuit':
      return <CircuitFrame frame={frame} />

    case 'function_plot':
      return <FunctionPlotFrame frame={frame} />

    default:
      return (
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-surface-600">Unknown frame type: {frame.type}</p>
        </div>
      )
  }
}

function QuizFrame({ frame }: { frame: Frame }) {
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const options = frame.data.options || []
  const correct = frame.data.correctIndex ?? 0

  return (
    <div className="glass-card rounded-2xl p-8">
      <h3 className="font-display text-xl font-bold text-white mb-2">{frame.title || 'Quick Check'}</h3>
      <p className="text-base text-surface-700 mb-6">{frame.data.question}</p>

      <div className="space-y-3">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => { setSelected(i); setShowResult(true) }}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              showResult && i === correct
                ? 'bg-mint-500/15 border-mint-500/40 text-mint-300'
                : showResult && i === selected
                ? 'bg-accent-500/15 border-accent-500/40 text-accent-300'
                : selected === i
                ? 'bg-brand-500/15 border-brand-500/40 text-brand-300'
                : 'glass-card-hover text-surface-700'
            }`}
          >
            <span className="text-sm">{opt}</span>
          </button>
        ))}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-4 rounded-xl ${
            selected === correct ? 'bg-mint-500/10 border border-mint-500/20' : 'bg-accent-500/10 border border-accent-500/20'
          }`}
        >
          <p className={`text-sm font-medium ${selected === correct ? 'text-mint-300' : 'text-accent-300'}`}>
            {selected === correct ? '✓ Correct! +10 XP' : '✗ Not quite. Try reviewing the lesson.'}
          </p>
        </motion.div>
      )}
    </div>
  )
}

// ─── Ray Diagram Frame (optics) ──────────────────────────────────────
function RayDiagramFrame({ frame }: { frame: Frame }) {
  const f = frame.data.focalLength ?? 10
  const u = frame.data.objectDistance ?? 15
  const h = frame.data.objectHeight ?? 3
  const rayType = frame.data.rayType || 'convex_lens'
  const isLens = rayType.includes('lens')
  const isConvex = rayType.includes('convex')
  const v = isConvex ? (f * u) / (u - f) : (f * u) / (u + f)
  const hi = isConvex ? -(h * v) / u : (h * v) / u

  const W = 400, H = 250, cx = W / 2, cy = H / 2, scale = 8

  return (
    <div className="glass-card rounded-2xl p-6">
      {frame.title && <h3 className="font-display text-xl font-bold text-white mb-2">{frame.title}</h3>}
      <p className="text-sm text-surface-600 mb-4 capitalize">{rayType.replace('_', ' ')}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-md mx-auto">
        {/* Principal axis */}
        <line x1="20" y1={cy} x2={W - 20} y2={cy} stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4 2" />
        {/* Lens/mirror */}
        {isLens ? (
          <ellipse cx={cx} cy={cy} rx="6" ry="60" fill="rgba(99,179,237,0.15)" stroke="rgb(99,179,237)" strokeWidth="2" />
        ) : (
          <path d={isConvex ? `M ${cx - 4} ${cy - 60} Q ${cx + 12} ${cy} ${cx - 4} ${cy + 60}` : `M ${cx + 4} ${cy - 60} Q ${cx - 12} ${cy} ${cx + 4} ${cy + 60}`} fill="none" stroke="rgb(99,179,237)" strokeWidth="2" />
        )}
        {/* Focal points */}
        <circle cx={cx - f * scale} cy={cy} r="3" fill="rgb(245,158,11)" />
        <text x={cx - f * scale - 4} y={cy + 16} fill="rgb(245,158,11)" fontSize="10">F</text>
        <circle cx={cx + f * scale} cy={cy} r="3" fill="rgb(245,158,11)" />
        <text x={cx + f * scale - 2} y={cy + 16} fill="rgb(245,158,11)" fontSize="10">F'</text>
        {/* Object (arrow) */}
        <line x1={cx - u * scale} y1={cy} x2={cx - u * scale} y2={cy - h * scale} stroke="rgb(34,197,94)" strokeWidth="2" />
        <polygon points={`${cx - u * scale - 4},${cy - h * scale + 4} ${cx - u * scale + 4},${cy - h * scale + 4} ${cx - u * scale},${cy - h * scale - 4}`} fill="rgb(34,197,94)" />
        {/* Image (arrow) */}
        {Math.abs(v) > 0.1 && Math.abs(v) < 50 && (
          <>
            <line x1={cx + v * scale} y1={cy} x2={cx + v * scale} y2={cy - hi * scale} stroke="rgb(239,68,68)" strokeWidth="2" />
            <polygon points={`${cx + v * scale - 4},${cy - hi * scale + 4} ${cx + v * scale + 4},${cy - hi * scale + 4} ${cx + v * scale},${cy - hi * scale - 4}`} fill="rgb(239,68,68)" />
          </>
        )}
        {/* Ray 1: parallel then through F' */}
        <line x1={cx - u * scale} y1={cy - h * scale} x2={cx} y2={cy - h * scale} stroke="rgba(99,179,237,0.6)" strokeWidth="1" />
        <line x1={cx} y1={cy - h * scale} x2={cx + Math.min(v, 30) * scale} y2={cy - hi * scale} stroke="rgba(99,179,237,0.6)" strokeWidth="1" />
        {/* Ray 2: through center */}
        <line x1={cx - u * scale} y1={cy - h * scale} x2={cx + Math.min(v, 30) * scale} y2={cy - hi * scale} stroke="rgba(168,85,247,0.6)" strokeWidth="1" />
      </svg>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-surface-600">
        <span>u = {u}cm</span>
        <span>f = {f}cm</span>
        <span>v = {Math.round(v * 10) / 10}cm</span>
      </div>
    </div>
  )
}

// ─── Circuit Frame ───────────────────────────────────────────────────
function CircuitFrame({ frame }: { frame: Frame }) {
  const elements = frame.data.circuitElements || []
  const connections = frame.data.circuitConnections || []

  return (
    <div className="glass-card rounded-2xl p-6">
      {frame.title && <h3 className="font-display text-xl font-bold text-white mb-2">{frame.title}</h3>}
      <svg viewBox="0 0 400 250" className="w-full max-w-md mx-auto">
        {/* Grid background */}
        {[0, 50, 100, 150, 200, 250, 300, 350, 400].map(x => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="250" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        ))}
        {[0, 50, 100, 150, 200, 250].map(y => (
          <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        ))}
        {/* Circuit elements */}
        {elements.map((el, i) => {
          const [x, y] = el.position
          const color = el.type === 'battery' ? 'rgb(245,158,11)' : el.type === 'resistor' ? 'rgb(99,179,237)' : 'rgb(168,85,247)'
          return (
            <g key={i} transform={`translate(${x}, ${y})`}>
              {el.type === 'battery' && (
                <>
                  <line x1="-10" y1="0" x2="-3" y2="0" stroke={color} strokeWidth="2" />
                  <line x1="-3" y1="-12" x2="-3" y2="12" stroke={color} strokeWidth="3" />
                  <line x1="3" y1="-8" x2="3" y2="8" stroke={color} strokeWidth="2" />
                  <line x1="3" y1="0" x2="10" y2="0" stroke={color} strokeWidth="2" />
                  {el.value && <text x="0" y="-18" fill={color} fontSize="10" textAnchor="middle">{el.value}</text>}
                </>
              )}
              {el.type === 'resistor' && (
                <>
                  <rect x="-15" y="-6" width="30" height="12" fill="none" stroke={color} strokeWidth="2" rx="2" />
                  {el.value && <text x="0" y="-12" fill={color} fontSize="10" textAnchor="middle">{el.value}</text>}
                </>
              )}
              {el.type === 'bulb' && (
                <>
                  <circle cx="0" cy="0" r="10" fill="none" stroke={color} strokeWidth="2" />
                  <text x="0" y="3" fill={color} fontSize="10" textAnchor="middle">💡</text>
                </>
              )}
              {el.type === 'switch' && (
                <>
                  <circle cx="-10" cy="0" r="2" fill={color} />
                  <circle cx="10" cy="0" r="2" fill={color} />
                  <line x1="-10" y1="0" x2="8" y2="-8" stroke={color} strokeWidth="2" />
                </>
              )}
            </g>
          )
        })}
        {/* Wires */}
        {connections.map((conn, i) => {
          const fromEl = elements.find((_, j) => j === parseInt(conn.from) || elements[j]?.type === conn.from)
          const toEl = elements.find((_, j) => j === parseInt(conn.to) || elements[j]?.type === conn.to)
          if (!fromEl || !toEl) return null
          return (
            <line
              key={`c${i}`}
              x1={fromEl.position[0]} y1={fromEl.position[1]}
              x2={toEl.position[0]} y2={toEl.position[1]}
              stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"
            />
          )
        })}
      </svg>
      <p className="text-xs text-surface-600 mt-2 text-center">{elements.length} elements • {connections.length} connections</p>
    </div>
  )
}

// ─── Function Plot Frame ─────────────────────────────────────────────
function FunctionPlotFrame({ frame }: { frame: Frame }) {
  const functions = frame.data.functions || []
  const xRange = frame.data.xRange || [-10, 10]
  const yRange = frame.data.yRange || [-10, 10]
  const W = 400, H = 300
  const padding = 30
  const plotW = W - 2 * padding, plotH = H - 2 * padding
  const xScale = plotW / (xRange[1] - xRange[0])
  const yScale = plotH / (yRange[1] - yRange[0])
  const xToPx = (x: number) => padding + (x - xRange[0]) * xScale
  const yToPx = (y: number) => H - padding - (y - yRange[0]) * yScale

  // Simple expression evaluator for basic functions
  const evalExpr = (expr: string, x: number): number => {
    try {
      const s = expr
        .replace(/\bsin\b/g, 'Math.sin')
        .replace(/\bcos\b/g, 'Math.cos')
        .replace(/\btan\b/g, 'Math.tan')
        .replace(/\bsqrt\b/g, 'Math.sqrt')
        .replace(/\bexp\b/g, 'Math.exp')
        .replace(/\blog\b/g, 'Math.log')
        .replace(/\babs\b/g, 'Math.abs')
        .replace(/\^/g, '**')
        .replace(/\bpi\b/g, 'Math.PI')
        .replace(/\be\b/g, 'Math.E')
      // eslint-disable-next-line no-new-func
      return Function('x', `return ${s}`)(x)
    } catch {
      return NaN
    }
  }

  const samples = 200
  const paths = functions.map((fn, fi) => {
    const points: string[] = []
    for (let i = 0; i <= samples; i++) {
      const x = xRange[0] + (i / samples) * (xRange[1] - xRange[0])
      const y = evalExpr(fn.expression, x)
      if (!isNaN(y) && isFinite(y) && y >= yRange[0] && y <= yRange[1]) {
        points.push(`${i === 0 ? 'M' : 'L'} ${xToPx(x).toFixed(1)} ${yToPx(y).toFixed(1)}`)
      }
    }
    return { d: points.join(' '), color: fn.color, label: fn.label }
  })

  return (
    <div className="glass-card rounded-2xl p-6">
      {frame.title && <h3 className="font-display text-xl font-bold text-white mb-2">{frame.title}</h3>}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-lg mx-auto">
        {/* Grid */}
        {Array.from({ length: 11 }, (_, i) => {
          const x = xRange[0] + (i / 10) * (xRange[1] - xRange[0])
          return <line key={`gx${i}`} x1={xToPx(x)} y1={padding} x2={xToPx(x)} y2={H - padding} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        })}
        {Array.from({ length: 11 }, (_, i) => {
          const y = yRange[0] + (i / 10) * (yRange[1] - yRange[0])
          return <line key={`gy${i}`} x1={padding} y1={yToPx(y)} x2={W - padding} y2={yToPx(y)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        })}
        {/* Axes */}
        <line x1={padding} y1={yToPx(0)} x2={W - padding} y2={yToPx(0)} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <line x1={xToPx(0)} y1={padding} x2={xToPx(0)} y2={H - padding} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        {/* Axis labels */}
        <text x={W - padding + 5} y={yToPx(0) + 4} fill="rgba(255,255,255,0.5)" fontSize="10">x</text>
        <text x={xToPx(0) - 12} y={padding - 5} fill="rgba(255,255,255,0.5)" fontSize="10">y</text>
        {/* Function curves */}
        {paths.map((p, i) => (
          <path key={i} d={p.d} fill="none" stroke={p.color} strokeWidth="2" strokeLinejoin="round" />
        ))}
      </svg>
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-3">
        {paths.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-surface-600">
            <div className="w-4 h-0.5 rounded" style={{ background: p.color }} />
            <span>{p.label || functions[i]?.expression}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export { HyperFramePlayer, type HyperFrame }
export { DiagramRenderer, type DiagramNode, type DiagramEdge }
export { VideoRenderer }
export { InteractiveVideo, type Hotspot }
export { ManimRenderer }
export { TimelineMapRenderer, type TimelineEvent }
export { Molecular3DRenderer }
export { AnnotatedSVGRenderer }
export { TextAnnotationRenderer, type TextAnnotationRendererProps }
export { FlowchartRenderer, type FlowchartRendererProps }
export { LedgerRenderer, type LedgerRendererProps }
export { GraphSliderRenderer, type GraphSliderRendererProps }
export { CodeEditorRenderer, type CodeEditorRendererProps }
