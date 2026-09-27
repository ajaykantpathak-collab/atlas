'use client'

/**
 * Story Mode — visual layer (STORY-2, polished)
 *
 * Contract (imported by StoryMode):
 *   <StoryHero subject="biology" classLevel={10} title="Life Processes" />
 *   <StoryHero ... diagram={{ type: 'timeline', data: { events } }} />
 *   <StoryDiagram type="water-cycle" data={{ ... }} />
 *
 *   StoryHero    — full-bleed cinematic hero scene: per-subject themed gradients +
 *                  iconography + subtle ambient animation, with class-band styling
 *                  (classes 1–5 warmer/rounder, 6–10 balanced, 11–12 sleeker).
 *                  An optional `diagram` (the node's own walkthrough-derived
 *                  StoryDiagram, built by StoryMode) fills the hero's right half
 *                  on supported types; the ghost icon stands in otherwise.
 *   StoryDiagram — React wrapper around the platform diagram engine
 *                  (lib/game-engine/diagrams/DiagramRenderer.ts — 20 supported
 *                  types), sized for Story Mode screens inside an Atlas-styled
 *                  frame with an animated entrance. The engine runs in
 *                  stage-fit mode: every diagram's measured bounds are scaled
 *                  to fill the frame, so sparse types (timeline, venn,
 *                  generic-flow…) hold the stage instead of a small center
 *                  blob. All diagrams on a page share ONE offscreen WebGL host
 *                  (browsers cap WebGL contexts and this PixiJS build has no
 *                  Canvas renderer); each finished frame is extracted to a
 *                  standalone 2D canvas. Unknown types render an honest styled
 *                  fallback.
 *
 * Atlas design system: near-black base (#0a0a0f) + gold (#f59e0b family),
 * font-display headings. Decoration only — renders exactly the subject /
 * class / title / diagram it is given. No curriculum copy, no raw node ids.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import { MotionConfig, motion } from 'framer-motion'
import type { DiagramType } from '@/lib/game-engine/types'

/** Signature Atlas ease — one deceleration curve across every story motion. */
const EASE_OUT = [0.16, 1, 0.3, 1] as const

// ─── Subject theming ─────────────────────────────────────────────────────────
// One theme per subject family. Accents are ambient glows over the Atlas
// near-black base; gold stays the constant Atlas thread in every theme.

type SubjectFamily =
  | 'maths' | 'physics' | 'chemistry' | 'biology' | 'science' | 'english'
  | 'social' | 'economics' | 'psychology' | 'accountancy' | 'computer' | 'biostats'

interface SubjectTheme {
  label: string
  accentA: [number, number, number]
  accentB: [number, number, number]
  icon: SubjectFamily
}

const SUBJECT_THEMES: Record<SubjectFamily, SubjectTheme> = {
  maths:       { label: 'Mathematics',         accentA: [129, 140, 248], accentB: [56, 189, 248],  icon: 'maths' },
  physics:     { label: 'Physics',             accentA: [34, 211, 238],  accentB: [139, 92, 246],  icon: 'physics' },
  chemistry:   { label: 'Chemistry',           accentA: [45, 212, 191],  accentB: [14, 165, 233],  icon: 'chemistry' },
  biology:     { label: 'Biology',             accentA: [52, 211, 153],  accentB: [22, 163, 74],   icon: 'biology' },
  science:     { label: 'Science',             accentA: [251, 191, 36],  accentB: [245, 158, 11],  icon: 'science' },
  english:     { label: 'English',             accentA: [251, 113, 133], accentB: [232, 121, 249], icon: 'english' },
  social:      { label: 'Social Science',      accentA: [251, 146, 60],  accentB: [217, 119, 6],   icon: 'social' },
  economics:   { label: 'Economics',           accentA: [56, 189, 248],  accentB: [45, 212, 191],  icon: 'economics' },
  psychology:  { label: 'Psychology',          accentA: [167, 139, 250], accentB: [217, 70, 239],  icon: 'psychology' },
  accountancy: { label: 'Accountancy',         accentA: [16, 185, 129],  accentB: [251, 191, 36],  icon: 'accountancy' },
  computer:    { label: 'Computer Science',    accentA: [96, 165, 250],  accentB: [34, 211, 238],  icon: 'computer' },
  biostats:    { label: 'Biotech & Statistics', accentA: [163, 230, 53], accentB: [16, 185, 129],  icon: 'biostats' },
}

const SUBJECT_ALIASES: Record<string, SubjectFamily> = {
  math: 'maths', maths: 'maths', mathematics: 'maths',
  physics: 'physics', physic: 'physics',
  chemistry: 'chemistry', chem: 'chemistry',
  biology: 'biology', bio: 'biology',
  science: 'science', 'general science': 'science', evs: 'science', 'environmental science': 'science',
  english: 'english', 'english language': 'english', 'english literature': 'english', lit: 'english',
  history: 'social', civics: 'social', geography: 'social', social: 'social',
  'social science': 'social', 'social studies': 'social', sst: 'social',
  economics: 'economics', eco: 'economics',
  psychology: 'psychology', psy: 'psychology',
  accountancy: 'accountancy', accounts: 'accountancy', accounting: 'accountancy',
  computer: 'computer', 'computer science': 'computer', coding: 'computer', it: 'computer', ict: 'computer',
  biotech: 'biostats', biotechnology: 'biostats', statistics: 'biostats', stats: 'biostats',
  'bio-statistics': 'biostats', 'biotechnology & statistics': 'biostats',
}

function resolveSubject(subject: string | undefined): SubjectTheme {
  const key = (subject ?? '').trim().toLowerCase()
  const family = SUBJECT_ALIASES[key] ?? 'science' // unknown subject → Atlas-gold science theme
  return SUBJECT_THEMES[family]
}

// ─── Class bands ─────────────────────────────────────────────────────────────
// Younger classes: warmer glows, rounder shapes, livelier motion.
// Senior classes: sleeker — tighter radii, subtler glow, slower drift.

type ClassBand = 'junior' | 'middle' | 'senior'

interface BandStyle {
  tileRadius: string
  glowAlpha: number
  floatDuration: number
  floatAmplitude: number
  sparkleCount: number
  underlineWidth: string
  underlineHeight: string
  titleSize: string
}

const BAND_STYLES: Record<ClassBand, BandStyle> = {
  junior: { tileRadius: '1.75rem', glowAlpha: 0.32, floatDuration: 5,  floatAmplitude: 10, sparkleCount: 5, underlineWidth: '7rem',  underlineHeight: '0.375rem', titleSize: 'text-[1.75rem] sm:text-5xl' },
  middle: { tileRadius: '1.25rem', glowAlpha: 0.22, floatDuration: 7,  floatAmplitude: 8,  sparkleCount: 3, underlineWidth: '5.5rem', underlineHeight: '0.25rem', titleSize: 'text-[1.65rem] sm:text-[2.5rem]' },
  senior: { tileRadius: '1rem',    glowAlpha: 0.15, floatDuration: 10, floatAmplitude: 5,  sparkleCount: 0, underlineWidth: '4rem',  underlineHeight: '1px',     titleSize: 'text-[1.65rem] sm:text-[2.5rem]' },
}

function resolveClassBand(classLevel: number | string | undefined): { band: ClassBand; level: number | null } {
  const n = typeof classLevel === 'string' ? parseInt(classLevel.trim(), 10) : classLevel
  if (typeof n !== 'number' || Number.isNaN(n) || n < 1 || n > 12) return { band: 'middle', level: null }
  if (n <= 5) return { band: 'junior', level: n }
  if (n <= 10) return { band: 'middle', level: n }
  return { band: 'senior', level: n }
}

const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`

// ─── Inline subject icons (stroke SVG, decorative) ───────────────────────────

function SubjectIcon({ family, className }: { family: SubjectFamily; className?: string }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className,
  }
  switch (family) {
    case 'maths':
      return (
        <svg {...common}>
          <path d="M3.5 19.5 12 4.5l8.5 15Z" />
          <circle cx="12" cy="14.5" r="1.4" />
        </svg>
      )
    case 'physics':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
        </svg>
      )
    case 'chemistry':
      return (
        <svg {...common}>
          <path d="M9.5 3h5" />
          <path d="M10 3v5.2L4.8 17a2.4 2.4 0 0 0 2.1 3.6h10.2a2.4 2.4 0 0 0 2.1-3.6L14 8.2V3" />
          <path d="M7.6 14h8.8" />
        </svg>
      )
    case 'biology':
      return (
        <svg {...common}>
          <path d="M4.5 19.5C4.5 11 11 4.5 19.5 4.5c0 8.5-6.5 15-15 15Z" />
          <path d="M4.5 19.5C8 14.5 11.5 11 16.5 7.5" />
        </svg>
      )
    case 'science':
      return (
        <svg {...common}>
          <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
          <path d="m18.6 15.4.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" />
        </svg>
      )
    case 'english':
      return (
        <svg {...common}>
          <path d="M12 6c-2-1.6-4.7-2.4-8-2.4v14.2c3.3 0 6 .8 8 2.4 2-1.6 4.7-2.4 8-2.4V3.6c-3.3 0-6 .8-8 2.4Z" />
          <path d="M12 6v14.2" />
        </svg>
      )
    case 'social':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3c2.7 2.6 4 5.6 4 9s-1.3 6.4-4 9c-2.7-2.6-4-5.6-4-9s1.3-6.4 4-9Z" />
        </svg>
      )
    case 'economics':
      return (
        <svg {...common}>
          <path d="M4 20h16" />
          <path d="M7.5 20v-6M12 20V9.5M16.5 20V5" />
        </svg>
      )
    case 'psychology':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="2.6" />
          <path d="M12 9.4V4.8M12 14.6v4.6M9.4 12H4.8M14.6 12h4.6" />
          <circle cx="12" cy="4" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="12" cy="20" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="4" cy="12" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="20" cy="12" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'accountancy':
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8.5 7h7" />
          <path d="M8.5 11.2h.01M12 11.2h.01M15.5 11.2h.01M8.5 14.6h.01M12 14.6h.01M15.5 14.6h.01M8.5 18h.01M12 18h.01M15.5 18h.01" />
        </svg>
      )
    case 'computer':
      return (
        <svg {...common}>
          <path d="M8.5 7 4 12l4.5 5M15.5 7 20 12l-4.5 5" />
          <path d="M13.2 4.8 10.8 19.2" />
        </svg>
      )
    case 'biostats':
      return (
        <svg {...common}>
          <path d="M8 3c0 4.5 8 4.5 8 9s-8 4.5-8 9" />
          <path d="M16 3c0 4.5-8 4.5-8 9s8 4.5 8 9" />
          <path d="M8.8 5.2h6.4M9.4 12h5.2M8.8 18.8h6.4" />
        </svg>
      )
  }
}

// Deterministic sparkle positions (no Math.random — SSR-safe hydration).
const SPARKLE_POSITIONS = [
  { left: '12%', top: '24%' },
  { left: '78%', top: '16%' },
  { left: '64%', top: '62%' },
  { left: '30%', top: '68%' },
  { left: '88%', top: '44%' },
]

// ═════════════════════════════════════════════════════════════════════════════
// StoryHero
// ═════════════════════════════════════════════════════════════════════════════

export interface StoryHeroProps {
  subject: string
  classLevel?: number | string
  title: string
  /**
   * Optional node-derived diagram (from the node's own enrichment/walkthrough
   * data — StoryMode builds it) rendered as a glass card in the hero's right
   * half on supported types. Absent/unsupported → the ghost subject icon.
   */
  diagram?: { type: string; data?: Record<string, unknown> } | null
}

export function StoryHero({ subject, classLevel, title, diagram }: StoryHeroProps) {
  const theme = resolveSubject(subject)
  const { band, level } = resolveClassBand(classLevel)
  const style = BAND_STYLES[band]
  const diagramType = (diagram?.type ?? '').trim().toLowerCase()
  const showDiagram = !!diagram && isKnownDiagramType(diagramType)

  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        aria-label={`${theme.label}${level ? `, Class ${level}` : ''}: ${title}`}
        className="relative isolate w-full overflow-hidden"
        style={{ background: '#0a0a0f', minHeight: 'clamp(300px, 42vh, 460px)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        {/* Subject ambient glows (slow drift) */}
        <motion.div
          aria-hidden
          className="absolute -top-1/4 right-[-12%] h-[75%] w-[70%] rounded-full blur-3xl"
          style={{ background: rgba(theme.accentA, style.glowAlpha) }}
          animate={{ x: [0, 26, 0], y: [0, style.floatAmplitude, 0] }}
          transition={{ duration: style.floatDuration * 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-[-30%] left-[-14%] h-[70%] w-[60%] rounded-full blur-3xl"
          style={{ background: rgba(theme.accentB, style.glowAlpha * 0.6) }}
          animate={{ x: [0, -22, 0], y: [0, -style.floatAmplitude, 0] }}
          transition={{ duration: style.floatDuration * 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Constant Atlas gold ember */}
        <div
          aria-hidden
          className="absolute bottom-[-40%] left-[24%] h-[55%] w-[52%] rounded-full blur-3xl"
          style={{ background: 'rgba(245, 158, 11, 0.10)' }}
        />

        {/* Right half — the node's own diagram, or the ghost subject icon */}
        {showDiagram ? (
          <div
            aria-hidden
            className="absolute right-[3.5%] top-1/2 hidden w-[36%] max-w-[400px] -translate-y-1/2 lg:right-[5%] sm:block"
          >
            <motion.div
              initial={{ opacity: 0, x: 26, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.3, ease: EASE_OUT }}
            >
              <StoryDiagram type={diagramType} data={diagram?.data} />
            </motion.div>
          </div>
        ) : (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-[2%] top-1/2 hidden opacity-[0.07] sm:block"
            style={{ transform: 'translateY(-50%)' }}
            animate={{ rotate: [-4, 4, -4], y: [-26, -26 + style.floatAmplitude, -26] }}
            transition={{ duration: style.floatDuration * 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <SubjectIcon family={theme.icon} className="h-[260px] w-[260px] text-white lg:h-[340px] lg:w-[340px]" />
          </motion.div>
        )}

        {/* Gold sparkles (younger bands only) */}
        {SPARKLE_POSITIONS.slice(0, style.sparkleCount).map((pos, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute h-1 w-1 rounded-full"
            style={{ left: pos.left, top: pos.top, background: '#fbbf24', boxShadow: '0 0 6px rgba(251,191,36,0.9)' }}
            animate={{ opacity: [0.15, 0.9, 0.15], scale: [1, 1.5, 1] }}
            transition={{ duration: 2.4 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}

        {/* Top gold hairline */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.55), transparent)' }}
        />

        {/* Content — title column narrows when the diagram owns the right half */}
        <div
          className={`relative z-10 flex min-h-[inherit] flex-col justify-end p-6 sm:p-10 ${
            showDiagram ? 'sm:max-w-[60%]' : ''
          }`}
        >
          <motion.div
            className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE_OUT }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-surface-800 backdrop-blur sm:text-xs">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: '#fbbf24', boxShadow: '0 0 8px rgba(251,191,36,0.8)' }}
              />
              {theme.label}
              {level !== null && <span className="text-surface-700">· Class {level}</span>}
            </span>
          </motion.div>

          <motion.h2
            className={`max-w-3xl font-display font-bold leading-tight text-white ${style.titleSize}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: EASE_OUT }}
          >
            {title}
          </motion.h2>

          <motion.div
            aria-hidden
            className={`mt-4 rounded-full sm:mt-5`}
            style={{
              width: style.underlineWidth,
              height: style.underlineHeight,
              background: 'linear-gradient(to right, #fde68a, #f59e0b)',
              boxShadow: '0 0 16px rgba(245,158,11,0.45)',
              transformOrigin: 'left',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.42, ease: EASE_OUT }}
          />
        </div>
      </motion.section>
    </MotionConfig>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// StoryDiagram
// ═════════════════════════════════════════════════════════════════════════════

/** The 20 diagram types supported by lib/game-engine/diagrams/DiagramRenderer.ts */
const KNOWN_DIAGRAM_TYPES: ReadonlySet<string> = new Set<string>([
  'place-value-chart', 'factor-tree', 'fraction-bar', 'fraction-pizza', 'number-line',
  'body-diagram', 'plant-parts', 'water-cycle', 'food-chain', 'circuit',
  'solar-system', 'balance-scale', 'shape-sorter', 'pattern-builder', 'counting-objects',
  'bar-chart', 'venn-diagram', 'timeline', 'map-india', 'generic-flow',
])

/** True when StoryDiagram can render this type (public: the hero checks it
 *  before promising a diagram slot, so no fallback box ever lands there). */
export function isKnownDiagramType(type: string): boolean {
  return KNOWN_DIAGRAM_TYPES.has((type ?? '').trim().toLowerCase())
}

// Logical canvas size — PixiJS renders at this fixed coordinate space; CSS
// scales it to the Story Mode screen (canvas w/h 100% of the aspect box).
const DIAGRAM_W = 640
const DIAGRAM_H = 400
// The engine runs in stage-fit mode (fitToStage: true): after each build step
// the diagram's measured bounds are scaled to fill the stage minus a 44px
// breathing pad, centered at the exact stage center — so sparse types (a
// 240px timeline, a 110x70 venn, a 3-step generic-flow) hold the frame
// instead of floating as a small center blob. No layer offset is needed:
// fit mode anchors content at (w/2, h/2), not the engine's legacy h/2 - 50.

// ── Shared PixiJS host ───────────────────────────────────────────────────────
// Browsers cap active WebGL contexts (~16) and silently drop the rest, so N
// live per-diagram canvases go blank. This PixiJS build is WebGL-only (no
// @pixi/canvas-renderer), so instead ONE offscreen WebGL Application is shared
// per page: each diagram is built on it by the engine, then the finished frame
// is extracted as a standalone 2D canvas — the shared context is freed for the
// next card. One WebGL context per page, regardless of diagram count.

type PixiModule = typeof import('pixi.js')
type EngineModule = typeof import('@/lib/game-engine/diagrams/DiagramRenderer')

interface SharedHost {
  PIXI: PixiModule
  DiagramRenderer: EngineModule['DiagramRenderer']
  app: import('pixi.js').Application
  rendererOptions: { fitToStage: true; textDpr: number }
}

let sharedHostPromise: Promise<SharedHost> | null = null

function getSharedHost(): Promise<SharedHost> {
  if (!sharedHostPromise) {
    sharedHostPromise = (async () => {
      // Dynamic import keeps PixiJS out of SSR and the initial bundle.
      const [PIXI, engineMod] = await Promise.all([
        import('pixi.js'),
        import('@/lib/game-engine/diagrams/DiagramRenderer'),
      ])
      const app = new PIXI.Application({
        width: DIAGRAM_W,
        height: DIAGRAM_H,
        backgroundAlpha: 0,
        antialias: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        autoDensity: false,
      })
      app.ticker.stop() // started only while a diagram is building
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      return {
        PIXI,
        DiagramRenderer: engineMod.DiagramRenderer,
        app,
        rendererOptions: { fitToStage: true, textDpr: dpr } as const,
      }
    })()
    sharedHostPromise.catch(() => {
      sharedHostPromise = null // allow retry after a failed init
    })
  }
  return sharedHostPromise
}

// Sequential render queue: builds each requested diagram on the shared host,
// extracts the finished frame, frees the stage for the next card.
const renderQueue: Array<() => Promise<void>> = []
let queueRunning = false

function enqueueDiagramRender(task: () => Promise<void>): void {
  renderQueue.push(task)
  void runRenderQueue()
}

async function runRenderQueue(): Promise<void> {
  if (queueRunning) return
  queueRunning = true
  try {
    while (renderQueue.length > 0) {
      await renderQueue.shift()!()
    }
  } finally {
    queueRunning = false
    if (sharedHostPromise) {
      void sharedHostPromise
        .then((host) => host.app.ticker.stop()) // idle page costs nothing
        .catch(() => { /* noop */ })
    }
  }
}

// How long the engine's one-pass build animation runs before extraction
// (DiagramRenderer steps progress 0 → 1 at 0.5s).
const BUILD_SETTLE_MS = 900
// Safety valve if the ticker stalls (background tab).
const BUILD_TIMEOUT_MS = 8000

export interface StoryDiagramProps {
  /** One of the 20 engine types; anything else gets the honest fallback. */
  type: string
  /** Type-specific data (engine provides sensible defaults when omitted). */
  data?: Record<string, unknown>
}

export function StoryDiagram({ type, data }: StoryDiagramProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [mountFailed, setMountFailed] = useState(false)
  const normalizedType = (type ?? '').trim().toLowerCase()
  const known = KNOWN_DIAGRAM_TYPES.has(normalizedType)
  const dataKey = useMemo(() => {
    try {
      return JSON.stringify(data ?? {})
    } catch {
      return ''
    }
  }, [data])

  useEffect(() => {
    if (!known) return
    let disposed = false

    enqueueDiagramRender(async () => {
      let layer: import('pixi.js').Container | null = null
      let engine: InstanceType<EngineModule['DiagramRenderer']> | null = null
      let renderTexture: import('pixi.js').RenderTexture | null = null
      try {
        const host = hostRef.current
        if (disposed || !host) return

        const { PIXI, DiagramRenderer, app, rendererOptions } = await getSharedHost()
        if (disposed || !host) return

        // Build the diagram on the shared stage.
        layer = new PIXI.Container()
        app.stage.addChild(layer)

        engine = new DiagramRenderer(layer, DIAGRAM_W, DIAGRAM_H, rendererOptions)
        engine.render({
          type: normalizedType as DiagramType,
          data: data ?? {},
        })

        // Drive the engine's build animation, then wait for it to settle.
        await new Promise<void>((resolve) => {
          let elapsed = 0
          let done = false
          const finish = () => {
            if (done) return
            done = true
            try { app.ticker.remove(onTick) } catch { /* noop */ }
            window.clearTimeout(timeout)
            resolve()
          }
          const onTick = (delta: number) => {
            if (engine) engine.update(delta)
            elapsed += app.ticker.deltaMS
            if (elapsed >= BUILD_SETTLE_MS) finish()
          }
          const timeout = window.setTimeout(finish, BUILD_TIMEOUT_MS)
          app.ticker.add(onTick)
          app.ticker.start()
        })
        if (disposed) return

        // Extract the finished frame as a standalone 2D canvas (the shared
        // WebGL context is then free for the next diagram).
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        renderTexture = app.renderer.generateTexture(layer, {
          resolution: dpr,
          region: new PIXI.Rectangle(0, 0, DIAGRAM_W, DIAGRAM_H),
        })
        const frame = app.renderer.extract.canvas(renderTexture) as unknown as HTMLCanvasElement
        if (disposed) return

        frame.style.width = '100%'
        frame.style.height = '100%'
        frame.style.display = 'block'
        frame.style.position = 'absolute'
        frame.style.inset = '0'
        host.innerHTML = ''
        host.appendChild(frame)
      } catch (err) {
        console.warn('[StoryDiagram] engine render failed, showing fallback:', err)
        if (!disposed) setMountFailed(true)
      } finally {
        try { engine?.destroy() } catch { /* noop */ }
        try { layer?.destroy({ children: true }) } catch { /* noop */ }
        try { renderTexture?.destroy(true) } catch { /* noop */ }
      }
    })

    return () => {
      disposed = true
    }
    // `data` is intentionally serialized to dataKey so inline object literals
    // from the parent do not re-render the diagram every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedType, dataKey, known])

  const showFallback = !known || mountFailed

  return (
    <MotionConfig reducedMotion="user">
      <motion.figure
        className="relative m-0 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 shadow-[0_8px_40px_rgba(0,0,0,0.4)] backdrop-blur sm:p-3"
        initial={{ opacity: 0, y: 16, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
      >
        {/* Frame top gold hairline */}
        <div
          aria-hidden
          className="absolute inset-x-6 top-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(251,191,36,0.4), transparent)' }}
        />

        {showFallback ? (
          // Honest empty state — quiet, dense, unclickable decoration
          <div
            className="flex aspect-[640/280] flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed border-white/[0.07] bg-[#0d0d13] px-6 text-center"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-surface-600"
              aria-hidden
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4.5M12 16h.01" />
              </svg>
            </span>
            <p className="text-[13px] leading-snug text-surface-700">This diagram visual isn&apos;t available yet.</p>
            <p className="text-xs leading-snug text-surface-600">It will appear here once the visual joins the library.</p>
          </div>
        ) : (
          <div
            ref={hostRef}
            role="img"
            aria-label="Lesson diagram"
            className="relative w-full rounded-xl bg-[#0d0d13]"
            style={{ aspectRatio: `${DIAGRAM_W} / ${DIAGRAM_H}` }}
          />
        )}
      </motion.figure>
    </MotionConfig>
  )
}
