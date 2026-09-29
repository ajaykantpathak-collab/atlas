'use client'

import { useState, useCallback, useEffect } from 'react'
import { Stage, Layer, Rect, Circle, Line, Text, Group } from 'react-konva'
import { motion } from 'framer-motion'
import { RotateCcw, Info } from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════════════
   PulleySimulation — Interactive block and tackle.

   The student can:
   - Change the number of pulleys (1, 2, 3, 4)
   - Adjust the load weight
   - Pull the effort rope (drag or slider)
   - See the load rise and the effort rope move
   - Read VR, MA (ideal), and efficiency

   Physics:
   - VR = n (number of rope segments supporting the load)
   - For ideal: MA = VR = n, Effort = Load / n
   - For real: friction reduces MA. We simulate 10% friction loss per pulley.
   - Efficiency = MA / VR × 100%
   - dE = n × dL (effort pulls n times further than load rises)
   ═══════════════════════════════════════════════════════════════════════════ */

interface PulleySimulationProps {
  onComplete?: () => void
  className?: string
}

const STAGE_W = 400
const STAGE_H = 300

export function PulleySimulation({ onComplete, className }: PulleySimulationProps) {
  const [numPulleys, setNumPulleys] = useState(2)
  const [load, setLoad] = useState(8)
  const [pullDistance, setPullDistance] = useState(0) // 0 to 1, how far the student has pulled
  const [hasInteracted, setHasInteracted] = useState(false)

  // VR = n
  const vr = numPulleys
  // Friction: 10% loss per pulley beyond the first
  const frictionLoss = 0.1 * (numPulleys - 1)
  const efficiency = Math.max(0, 1 - frictionLoss)
  const ma = vr * efficiency
  const effortNeeded = load / ma
  const idealEffort = load / vr

  // Load rises: dL = pullDistance × maxRise (in px)
  const maxRise = 80
  const loadRise = pullDistance * maxRise
  // Effort rope moves: dE = n × dL
  const effortRopeMove = pullDistance * maxRise * vr

  // Positions
  const ceilingY = 40
  const loadStartY = 240
  const loadY = loadStartY - loadRise
  const pulleyRadius = 14

  // Fixed pulley at top
  const fixedPulleyX = STAGE_W / 2
  const fixedPulleyY = ceilingY + pulleyRadius

  // Movable pulley block (moves up with load)
  const movableBlockY = loadY - 50
  const movableBlockX = STAGE_W / 2

  const handlePull = useCallback((val: number) => {
    setPullDistance(val)
    setHasInteracted(true)
  }, [])

  const handleReset = useCallback(() => {
    setPullDistance(0)
    setNumPulleys(2)
    setLoad(8)
  }, [])

  useEffect(() => {
    if (pullDistance >= 0.95 && hasInteracted && onComplete) {
      onComplete()
    }
  }, [pullDistance, hasInteracted, onComplete])

  // Generate rope segments for n pulleys
  const ropeSegments: { points: number[]; key: string }[] = []
  // For simplicity, draw a schematic: rope from effort → over fixed pulley → down to movable block → up to fixed → ... n times
  const ropeStartX = fixedPulleyX + 80 + effortRopeMove
  const ropeStartY = fixedPulleyY

  // Main rope: from effort hand, over the fixed pulley, down to movable block
  ropeSegments.push({
    points: [ropeStartX, ropeStartY + 40, ropeStartX, ropeStartY, fixedPulleyX + pulleyRadius, fixedPulleyY],
    key: 'rope-1',
  })

  // Rope down from fixed pulley to movable block
  for (let i = 0; i < numPulleys; i++) {
    const offset = (i - (numPulleys - 1) / 2) * 16
    ropeSegments.push({
      points: [fixedPulleyX + offset, fixedPulleyY + pulleyRadius, movableBlockX + offset, movableBlockY - pulleyRadius],
      key: `rope-down-${i}`,
    })
  }

  return (
    <div className={`rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/10 overflow-hidden ${className || ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-xs font-mono text-white/60 uppercase tracking-wider">Interactive: Pulley System</span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-white/40 hover:text-white/80 transition-colors"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      {/* Canvas */}
      <div className="flex justify-center bg-black/20">
        <Stage width={STAGE_W} height={STAGE_H}>
          <Layer>
            {/* Ceiling */}
            <Rect x={0} y={ceilingY - 10} width={STAGE_W} height={10} fill="rgba(255,255,255,0.1)" />
            <Line points={[0, ceilingY, STAGE_W, ceilingY]} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />

            {/* Fixed pulley(s) */}
            <Group x={fixedPulleyX} y={fixedPulleyY}>
              <Circle radius={pulleyRadius} fill="rgba(56, 189, 248, 0.15)" stroke="rgb(56, 189, 248)" strokeWidth={2} />
              <Circle radius={3} fill="rgb(56, 189, 248)" />
              {/* Support bracket */}
              <Line points={[0, -pulleyRadius, 0, -(ceilingY - 10)]} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
            </Group>

            {/* Movable pulley block */}
            <Group x={movableBlockX} y={movableBlockY}>
              {Array.from({ length: Math.max(1, numPulleys - 1) }).map((_, i) => {
                const offset = (i - (Math.max(0, numPulleys - 2)) / 2) * 20
                return (
                  <Group key={i} x={offset}>
                    <Circle radius={pulleyRadius - 2} fill="rgba(251, 191, 36, 0.15)" stroke="rgb(251, 191, 36)" strokeWidth={2} />
                    <Circle radius={2} fill="rgb(251, 191, 36)" />
                  </Group>
                )
              })}
              {/* Hook to load */}
              <Line points={[0, pulleyRadius, 0, 50]} stroke="rgba(255,255,255,0.4)" strokeWidth={2} />
            </Group>

            {/* Ropes */}
            {ropeSegments.map((r) => (
              <Line
                key={r.key}
                points={r.points}
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={1.5}
                lineCap="round"
              />
            ))}

            {/* Load */}
            <Group x={movableBlockX} y={loadY}>
              <Rect
                x={-25}
                y={0}
                width={50}
                height={35}
                fill="rgba(244, 114, 182, 0.2)"
                stroke="rgb(244, 114, 182)"
                strokeWidth={2}
                cornerRadius={4}
              />
              <Text
                x={-25}
                y={10}
                text={`${load}N`}
                fontSize={14}
                fontFamily="monospace"
                fill="rgb(244, 114, 182)"
                width={50}
                align="center"
                fontWeight="bold"
              />
              <Text
                x={-35}
                y={-14}
                text="LOAD"
                fontSize={9}
                fontFamily="monospace"
                fill="rgba(244, 114, 182, 0.7)"
                width={70}
                align="center"
              />
            </Group>

            {/* Effort arrow */}
            <Group x={ropeStartX} y={ropeStartY + 50}>
              <Line points={[0, 0, 0, -40]} stroke="rgb(56, 189, 248)" strokeWidth={3} lineCap="round" />
              <Line points={[-6, -32, 0, -40, 6, -32]} fill="rgb(56, 189, 248)" closed stroke="rgb(56, 189, 248)" strokeWidth={2} />
              <Text
                x={-20}
                y={5}
                text={`${effortNeeded.toFixed(1)}N`}
                fontSize={12}
                fontFamily="monospace"
                fill="rgb(56, 189, 248)"
                width={40}
                align="center"
                fontWeight="bold"
              />
              <Text
                x={-30}
                y={20}
                text="EFFORT"
                fontSize={9}
                fontFamily="monospace"
                fill="rgba(56, 189, 248, 0.7)"
                width={60}
                align="center"
              />
            </Group>

            {/* Distance indicators */}
            {pullDistance > 0.05 && (
              <Group>
                <Text
                  x={10}
                  y={loadY - 20}
                  text={`dL = ${(loadRise / 100).toFixed(2)}m`}
                  fontSize={10}
                  fontFamily="monospace"
                  fill="rgba(244, 114, 182, 0.7)"
                />
                <Text
                  x={STAGE_W - 90}
                  y={ropeStartY + 60}
                  text={`dE = ${(effortRopeMove / 100).toFixed(2)}m`}
                  fontSize={10}
                  fontFamily="monospace"
                  fill="rgba(56, 189, 248, 0.7)"
                />
              </Group>
            )}
          </Layer>
        </Stage>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 space-y-3 border-t border-white/10">
        {/* Pulley count */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-mono text-amber-400 w-16">Pulleys</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => { setNumPulleys(n); setHasInteracted(true) }}
                className={`w-8 h-8 rounded-lg text-xs font-mono transition-all ${
                  numPulleys === n
                    ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                    : 'bg-white/5 border border-white/10 text-white/40 hover:text-white/70'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <span className="text-xs font-mono text-white/40 ml-auto">VR = {vr}</span>
        </div>

        {/* Load slider */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-mono text-pink-400 w-16">Load</label>
          <input
            type="range"
            min={2}
            max={20}
            step={1}
            value={load}
            onChange={(e) => { setLoad(Number(e.target.value)); setHasInteracted(true) }}
            className="flex-1 accent-pink-400"
          />
          <span className="text-xs font-mono text-white/60 w-12 text-right">{load} N</span>
        </div>

        {/* Pull slider */}
        <div className="flex items-center gap-3">
          <label className="text-xs font-mono text-gold-400 w-16">Pull</label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={pullDistance}
            onChange={(e) => handlePull(Number(e.target.value))}
            className="flex-1 accent-gold-400"
          />
          <span className="text-xs font-mono text-white/60 w-12 text-right">{Math.round(pullDistance * 100)}%</span>
        </div>
      </div>

      {/* Live readings */}
      <div className="px-4 pb-3 grid grid-cols-4 gap-2">
        <Reading label="VR" value={vr.toString()} color="rgb(251, 191, 36)" />
        <Reading label="MA" value={ma.toFixed(2)} color="rgb(74, 222, 128)" />
        <Reading label="Effort" value={`${effortNeeded.toFixed(1)}N`} color="rgb(56, 189, 248)" />
        <Reading label="η" value={`${(efficiency * 100).toFixed(0)}%`} color="rgb(167, 139, 250)" />
      </div>

      {/* Observation */}
      <div className="px-4 pb-4">
        <div className="flex items-start gap-2 rounded-xl bg-amber-500/5 border border-amber-500/10 px-3 py-2">
          <Info size={14} className="text-amber-400/60 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white/50 leading-relaxed">
            {numPulleys === 1
              ? `Single fixed pulley: VR = 1. It only changes the direction of effort — no mechanical advantage. Effort = Load = ${load}N.`
              : `${numPulleys} pulleys: VR = ${vr}. Ideal effort = ${idealEffort.toFixed(1)}N. Real effort = ${effortNeeded.toFixed(1)}N (friction adds ${((effortNeeded - idealEffort)).toFixed(1)}N). You pull ${vr}× more rope, but use ${vr}× less force. Efficiency = ${(efficiency * 100).toFixed(0)}%.`}
          </p>
        </div>
      </div>
    </div>
  )
}

function Reading({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-2 py-2 text-center">
      <div className="text-[10px] font-mono uppercase tracking-wider text-white/40">{label}</div>
      <div className="text-sm font-mono font-bold mt-0.5" style={{ color }}>{value}</div>
    </div>
  )
}
