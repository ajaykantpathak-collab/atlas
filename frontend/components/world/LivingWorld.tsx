'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { Stage, Layer, Group, Circle, Path, Rect, Text, Line, Ellipse } from 'react-konva'
import { motion, AnimatePresence } from 'framer-motion'
import Konva from 'konva'

/* ═══════════════════════════════════════════════════════════════════════════
   LivingWorld — The student's physics world.

   The world starts DARK. As the student masters topics, regions come ALIVE:
   - Lights turn on (circuits mastered → buildings illuminate)
   - Machines animate (machines mastered → cranes move)
   - Rainbows appear (optics mastered → light bends through rain)
   - Sound waves propagate (sound mastered → visible waves)

   Dark = unknown. Alive = mastered. Knowledge illuminates darkness.

   Built with react-konva for clean React component composition.
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Types ──────────────────────────────────────────────────────────────────

export type MasteryState = 'dark' | 'dim' | 'glowing' | 'alive'

export interface TopicRegion {
  id: string
  title: string
  unit: string
  cx: number          // 0-1 normalized position
  cy: number
  radius: number      // 0-1 normalized
  mastery: number     // 0-1 BKT probability
  examMarks: number   // marks this topic is worth in exam
  questionsToMastery: number
  prerequisites: string[]
  effectType: 'lights' | 'machines' | 'rainbow' | 'waves' | 'motion' | 'heat' | 'magnetic' | 'default'
  colorRgb: [number, number, number]
}

export interface LivingWorldProps {
  regions: TopicRegion[]
  onRegionClick?: (region: TopicRegion) => void
  onRegionHover?: (region: TopicRegion | null) => void
  examPrediction?: { score: number; max: number }
  className?: string
  width?: number
  height?: number
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getMasteryState(mastery: number): MasteryState {
  if (mastery >= 0.7) return 'alive'
  if (mastery >= 0.4) return 'glowing'
  if (mastery >= 0.15) return 'dim'
  return 'dark'
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function seededRandom(seed: number) {
  let s = seed
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
}

// ─── Region Component ───────────────────────────────────────────────────────

interface RegionProps {
  region: TopicRegion
  width: number
  height: number
  time: number
  isActive: boolean
  isHovered: boolean
  onClick: () => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function WorldRegion({ region, width, height, time, isActive, isHovered, onClick, onMouseEnter, onMouseLeave }: RegionProps) {
  const cx = region.cx * width
  const cy = region.cy * height
  const baseR = region.radius * Math.min(width, height)
  const state = getMasteryState(region.mastery)
  const [r, g, b] = region.colorRgb

  // Visual properties based on mastery state
  const fillOpacity = state === 'alive' ? 0.15 : state === 'glowing' ? 0.08 : state === 'dim' ? 0.03 : 0.01
  const strokeOpacity = state === 'alive' ? 0.6 : state === 'glowing' ? 0.35 : state === 'dim' ? 0.15 : 0.06
  const strokeWidth = isHovered ? 2.5 : isActive ? 2 : 1.2
  const pulse = 1 + Math.sin(time * 0.8 + cx * 0.01) * (state === 'alive' ? 0.08 : state === 'glowing' ? 0.05 : 0.02)
  const glowR = baseR * pulse

  // Effect rendering based on effectType + mastery
  const effects: React.ReactNode[] = []

  if (state === 'alive' || state === 'glowing') {
    const effectOpacity = state === 'alive' ? 1 : 0.5

    if (region.effectType === 'lights') {
      // Small glowing dots representing lights turning on
      const rand = seededRandom(region.id.charCodeAt(0) * 100)
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time * 0.1
        const dist = baseR * (0.3 + rand() * 0.4)
        const lx = cx + Math.cos(angle) * dist
        const ly = cy + Math.sin(angle) * dist * 0.7
        const twinkle = 0.5 + Math.sin(time * 2 + i) * 0.3
        effects.push(
          <Circle
            key={`light-${i}`}
            x={lx}
            y={ly}
            radius={2 + twinkle}
            fill={`rgba(${r}, ${g}, ${b}, ${effectOpacity * twinkle})`}
            shadowColor={`rgb(${r}, ${g}, ${b})`}
            shadowBlur={8 * effectOpacity}
          />
        )
      }
    } else if (region.effectType === 'machines') {
      // Rotating gear-like elements
      const rotation = time * 20 * effectOpacity
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2 + (rotation * Math.PI) / 180
        const dist = baseR * 0.4
        const mx = cx + Math.cos(angle) * dist
        const my = cy + Math.sin(angle) * dist * 0.7
        effects.push(
          <Circle
            key={`gear-${i}`}
            x={mx}
            y={my}
            radius={4}
            stroke={`rgba(${r}, ${g}, ${b}, ${effectOpacity * 0.6})`}
            strokeWidth={1.5}
            rotation={rotation}
          />
        )
      }
    } else if (region.effectType === 'rainbow') {
      // Arcing rainbow colors
      const colors = ['255, 0, 0', '255, 165, 0', '255, 255, 0', '0, 255, 0', '0, 150, 255', '75, 0, 130', '238, 130, 238']
      for (let i = 0; i < colors.length; i++) {
        const arcR = baseR * (0.3 + i * 0.06)
        effects.push(
          <Arc
            key={`rainbow-${i}`}
            x={cx}
            y={cy + baseR * 0.2}
            innerRadius={arcR}
            outerRadius={arcR + 3}
            angle={180}
            rotation={-90}
            fill={`rgba(${colors[i]}, ${effectOpacity * 0.4})`}
          />
        )
      }
    } else if (region.effectType === 'waves') {
      // Concentric wave rings
      for (let i = 0; i < 3; i++) {
        const wavePhase = (time * 0.5 + i * 0.33) % 1
        const waveR = baseR * wavePhase
        effects.push(
          <Circle
            key={`wave-${i}`}
            x={cx}
            y={cy}
            radius={waveR}
            stroke={`rgba(${r}, ${g}, ${b}, ${effectOpacity * (1 - wavePhase) * 0.4})`}
            strokeWidth={1.5}
          />
        )
      }
    } else if (region.effectType === 'motion') {
      // Moving particles representing motion
      const rand = seededRandom(region.id.charCodeAt(0) * 200)
      for (let i = 0; i < 5; i++) {
        const t = (time * 0.3 + i * 0.2) % 1
        const px = cx - baseR * 0.5 + t * baseR
        const py = cy + Math.sin(t * Math.PI * 2 + i) * baseR * 0.2
        effects.push(
          <Circle
            key={`motion-${i}`}
            x={px}
            y={py}
            radius={2}
            fill={`rgba(${r}, ${g}, ${b}, ${effectOpacity * 0.6})`}
            shadowColor={`rgb(${r}, ${g}, ${b})`}
            shadowBlur={4}
          />
        )
      }
    } else if (region.effectType === 'heat') {
      // Rising heat particles
      const rand = seededRandom(region.id.charCodeAt(0) * 300)
      for (let i = 0; i < 6; i++) {
        const t = (time * 0.4 + i * 0.16) % 1
        const hx = cx + (rand() - 0.5) * baseR * 0.6
        const hy = cy + baseR * 0.3 - t * baseR * 0.6
        effects.push(
          <Circle
            key={`heat-${i}`}
            x={hx}
            y={hy}
            radius={1.5 + (1 - t) * 2}
            fill={`rgba(255, ${100 + t * 100}, 50, ${effectOpacity * (1 - t) * 0.5})`}
          />
        )
      }
    } else if (region.effectType === 'magnetic') {
      // Field lines
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + time * 0.2
        const len = baseR * 0.5
        effects.push(
          <Line
            key={`field-${i}`}
            points={[cx, cy, cx + Math.cos(angle) * len, cy + Math.sin(angle) * len * 0.7]}
            stroke={`rgba(${r}, ${g}, ${b}, ${effectOpacity * 0.3})`}
            strokeWidth={1}
            dash={[3, 3]}
          />
        )
      }
    } else {
      // Default: subtle particle glow
      const rand = seededRandom(region.id.charCodeAt(0) * 400)
      for (let i = 0; i < 4; i++) {
        const angle = rand() * Math.PI * 2 + time * 0.15
        const dist = baseR * (0.2 + rand() * 0.3)
        effects.push(
          <Circle
            key={`particle-${i}`}
            x={cx + Math.cos(angle) * dist}
            y={cy + Math.sin(angle) * dist * 0.7}
            radius={1.5}
            fill={`rgba(${r}, ${g}, ${b}, ${effectOpacity * 0.4})`}
          />
        )
      }
    }
  }

  return (
    <Group
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Glow fill */}
      <Circle
        x={cx}
        y={cy}
        radius={glowR}
        fill={`rgba(${r}, ${g}, ${b}, ${fillOpacity})`}
      />
      {/* Contour rings */}
      {[0, 1, 2].map((ring) => {
        const ringR = baseR * (0.4 + ring * 0.25) * pulse
        return (
          <Ellipse
            key={`ring-${ring}`}
            x={cx}
            y={cy}
            radiusX={ringR}
            radiusY={ringR * 0.7}
            stroke={`rgba(${r}, ${g}, ${b}, ${strokeOpacity * (1 - ring * 0.2)})`}
            strokeWidth={strokeWidth * (1 - ring * 0.2)}
          />
        )
      })}
      {/* Effects (only when glowing or alive) */}
      {effects}
      {/* Center marker */}
      <Circle
        x={cx}
        y={cy}
        radius={state === 'alive' ? 4 : state === 'glowing' ? 3 : 2}
        fill={`rgba(${r}, ${g}, ${b}, ${strokeOpacity + 0.2})`}
        shadowColor={`rgb(${r}, ${g}, ${b})`}
        shadowBlur={state === 'alive' ? 12 : state === 'glowing' ? 6 : 0}
      />
      {/* Label — always visible, brighter when hovered/active */}
      <Text
        x={cx - 70}
        y={cy + baseR * 0.7 + 8}
        width={140}
        text={region.title}
        fontSize={isHovered ? 13 : 12}
        fontStyle="bold"
        fontFamily="Inter, sans-serif"
        fill={`rgba(${r}, ${g}, ${b}, ${isHovered ? 0.95 : state === 'dark' ? 0.55 : strokeOpacity + 0.3})`}
        align="center"
        listening={false}
        shadowColor="rgba(0,0,0,0.8)"
        shadowBlur={4}
        shadowOffset={{ x: 0, y: 1 }}
      />
      {/* Mastery indicator (when hovered or active) */}
      {(isHovered || isActive) && (
        <Text
          x={cx - 60}
          y={cy + baseR * 0.7 + 22}
          width={120}
          text={`${Math.round(region.mastery * 100)}% mastery · ${region.examMarks} marks`}
          fontSize={9}
          fontFamily="monospace"
          fill={`rgba(255, 255, 255, 0.5)`}
          align="center"
          listening={false}
        />
      )}
    </Group>
  )
}

// Arc component (not in react-konva directly, we build it)
function Arc({ x, y, innerRadius, outerRadius, angle, rotation, fill }: {
  x: number; y: number; innerRadius: number; outerRadius: number; angle: number; rotation: number; fill: string
}) {
  const startAngle = (rotation * Math.PI) / 180
  const endAngle = startAngle + (angle * Math.PI) / 180
  const sx1 = x + innerRadius * Math.cos(startAngle)
  const sy1 = y + innerRadius * Math.sin(startAngle)
  const sx2 = x + outerRadius * Math.cos(startAngle)
  const sy2 = y + outerRadius * Math.sin(startAngle)
  const ex1 = x + innerRadius * Math.cos(endAngle)
  const ey1 = y + innerRadius * Math.sin(endAngle)
  const ex2 = x + outerRadius * Math.cos(endAngle)
  const ey2 = y + outerRadius * Math.sin(endAngle)
  const largeArc = angle > 180 ? 1 : 0

  const pathData = [
    `M ${sx2} ${sy2}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${ex2} ${ey2}`,
    `L ${ex1} ${ey1}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${sx1} ${sy1}`,
    'Z',
  ].join(' ')

  return <Path data={pathData} fill={fill} />
}

// ─── Background particles ───────────────────────────────────────────────────

function BackgroundParticles({ width, height, time }: { width: number; height: number; time: number }) {
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number; color: string }[]>([])
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const rand = seededRandom(777)
    particlesRef.current = Array.from({ length: 30 }, () => ({
      x: rand() * width,
      y: rand() * height,
      vx: (rand() - 0.5) * 0.15,
      vy: (rand() - 0.5) * 0.08,
      size: 1 + rand() * 1.5,
      color: rand() > 0.5 ? '251, 191, 36' : '99, 102, 241',
    }))
  }, [width, height])

  // Update particles each frame
  useEffect(() => {
    const interval = setInterval(() => forceUpdate(v => v + 1), 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {particlesRef.current.map((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
        return (
          <Circle
            key={`bg-particle-${i}`}
            x={p.x}
            y={p.y}
            radius={p.size}
            fill={`rgba(${p.color}, 0.2)`}
            listening={false}
          />
        )
      })}
    </>
  )
}

// ─── Prerequisite paths ─────────────────────────────────────────────────────

function PrerequisitePaths({ regions, width, height }: { regions: TopicRegion[]; width: number; height: number }) {
  const regionMap = new Map(regions.map(r => [r.id, r]))
  const paths: React.ReactNode[] = []

  regions.forEach((region, i) => {
    region.prerequisites.forEach((prereqId, j) => {
      const prereq = regionMap.get(prereqId)
      if (!prereq) return
      const x1 = prereq.cx * width
      const y1 = prereq.cy * height
      const x2 = region.cx * width
      const y2 = region.cy * height
      const bothAlive = region.mastery >= 0.7 && prereq.mastery >= 0.7
      const opacity = bothAlive ? 0.25 : 0.08
      paths.push(
        <Line
          key={`path-${i}-${j}`}
          points={[x1, y1, x2, y2]}
          stroke={`rgba(255, 255, 255, ${opacity})`}
          strokeWidth={1}
          dash={[4, 6]}
          listening={false}
        />
      )
    })
  })

  return <>{paths}</>
}

// ─── Main LivingWorld Component ─────────────────────────────────────────────

export function LivingWorld({
  regions,
  onRegionClick,
  onRegionHover,
  examPrediction,
  className = '',
  width = 1200,
  height = 700,
}: LivingWorldProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [stageSize, setStageSize] = useState({ width, height })
  const [time, setTime] = useState(0)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Responsive sizing
  useEffect(() => {
    setMounted(true)
    function updateSize() {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setStageSize({ width: rect.width, height: rect.height })
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!mounted) return
    let raf: number
    let lastTime = performance.now()
    function loop(now: number) {
      const dt = (now - lastTime) / 1000
      lastTime = now
      setTime(t => t + dt)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [mounted])

  const handleClick = useCallback((region: TopicRegion) => {
    setActiveId(region.id)
    onRegionClick?.(region)
  }, [onRegionClick])

  const handleHover = useCallback((region: TopicRegion | null) => {
    setHoveredId(region?.id || null)
    onRegionHover?.(region)
  }, [onRegionHover])

  if (!mounted) {
    return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }} />
  }

  const { width: w, height: h } = stageSize

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Stage width={w} height={h}>
        {/* Background layer */}
        <Layer listening={false}>
          {/* Dark gradient background */}
          <Rect
            x={0}
            y={0}
            width={w}
            height={h}
            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
            fillLinearGradientEndPoint={{ x: 0, y: h }}
            fillLinearGradientColorStops={[
              0, 'rgba(14, 12, 24, 1)',
              0.5, 'rgba(18, 16, 32, 1)',
              1, 'rgba(12, 10, 20, 1)',
            ]}
          />
          {/* Warm glow top-right */}
          <Rect
            x={0}
            y={0}
            width={w}
            height={h}
            fillRadialGradientStartPoint={{ x: w * 0.85, y: h * 0.15 }}
            fillRadialGradientStartRadius={0}
            fillRadialGradientEndPoint={{ x: w * 0.85, y: h * 0.15 }}
            fillRadialGradientEndRadius={Math.max(50, w * 0.4)}
            fillRadialGradientColorStops={[
              0, 'rgba(251, 191, 36, 0.04)',
              1, 'rgba(251, 191, 36, 0)',
            ]}
          />
          {/* Cool glow bottom-left */}
          <Rect
            x={0}
            y={0}
            width={w}
            height={h}
            fillRadialGradientStartPoint={{ x: w * 0.15, y: h * 0.85 }}
            fillRadialGradientStartRadius={0}
            fillRadialGradientEndPoint={{ x: w * 0.15, y: h * 0.85 }}
            fillRadialGradientEndRadius={Math.max(50, w * 0.4)}
            fillRadialGradientColorStops={[
              0, 'rgba(99, 102, 241, 0.05)',
              1, 'rgba(99, 102, 241, 0)',
            ]}
          />
          {/* Background particles */}
          <BackgroundParticles width={w} height={h} time={time} />
        </Layer>

        {/* Prerequisite paths layer */}
        <Layer listening={false}>
          <PrerequisitePaths regions={regions} width={w} height={h} />
        </Layer>

        {/* Regions layer */}
        <Layer>
          {regions.map((region) => (
            <WorldRegion
              key={region.id}
              region={region}
              width={w}
              height={h}
              time={time}
              isActive={activeId === region.id}
              isHovered={hoveredId === region.id}
              onClick={() => handleClick(region)}
              onMouseEnter={() => handleHover(region)}
              onMouseLeave={() => handleHover(null)}
            />
          ))}
        </Layer>
      </Stage>

      {/* Exam prediction overlay (HTML, not canvas) */}
      {examPrediction && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            <span className="text-sm font-mono text-white/80">
              If you took the exam today: <span className="text-amber-400 font-bold">{examPrediction.score}/{examPrediction.max}</span>
            </span>
          </div>
        </motion.div>
      )}

      {/* Permanent HTML labels for all regions — always visible */}
      <div className="absolute inset-0 pointer-events-none">
        {regions.map((region) => {
          const [r, g, b] = region.colorRgb
          const state = getMasteryState(region.mastery)
          const isHovered = hoveredId === region.id
          const isActive = activeId === region.id
          const labelOpacity = isHovered ? 1 : state === 'alive' ? 0.9 : state === 'glowing' ? 0.8 : 0.65
          return (
            <div
              key={`label-${region.id}`}
              className="absolute font-bold transition-all duration-200"
              style={{
                left: `${region.cx * 100}%`,
                top: `${(region.cy + region.radius * 0.8) * 100}%`,
                transform: 'translate(-50%, 0)',
                color: `rgba(${r}, ${g}, ${b}, ${labelOpacity})`,
                fontSize: isHovered ? '14px' : '12px',
                textShadow: '0 1px 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.6)',
                whiteSpace: 'nowrap',
              }}
            >
              {region.title}
            </div>
          )
        })}
      </div>

      {/* Hovered region tooltip (HTML) */}
      <AnimatePresence>
        {hoveredId && (() => {
          const region = regions.find(r => r.id === hoveredId)
          if (!region) return null
          const state = getMasteryState(region.mastery)
          const stateLabel = state === 'alive' ? 'Mastered' : state === 'glowing' ? 'In Progress' : state === 'dim' ? 'Started' : 'Not Started'
          const stateColor = state === 'alive' ? '#4ade80' : state === 'glowing' ? '#fbbf24' : state === 'dim' ? '#f87171' : '#6b7280'
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
            >
              <div className="px-4 py-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 min-w-[200px]">
                <div className="text-sm font-bold text-white">{region.title}</div>
                <div className="text-xs mt-1" style={{ color: stateColor }}>{stateLabel} · {Math.round(region.mastery * 100)}%</div>
                <div className="text-xs text-white/50 mt-0.5">{region.examMarks} marks · {region.questionsToMastery} questions to mastery</div>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
