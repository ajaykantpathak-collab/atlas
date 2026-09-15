'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sliders, RotateCcw } from 'lucide-react'

/**
 * InteractiveProjectileSim — a real physics simulation.
 * Students drag the angle slider and see the trajectory update in real-time.
 * Teaches: launch angle affects range, max height, and flight time.
 *
 * Physics: v0 = 30 m/s, g = 9.8 m/s²
 * x(t) = v0 * cos(θ) * t
 * y(t) = v0 * sin(θ) * t - 0.5 * g * t²
 * Range = v0² * sin(2θ) / g
 * Max height = (v0 * sin(θ))² / (2g)
 * Flight time = 2 * v0 * sin(θ) / g
 */

const V0 = 30 // initial velocity m/s
const G = 9.8 // gravity m/s²
const SCALE = 4 // pixels per meter

function calculateTrajectory(angleDeg: number) {
  const angle = (angleDeg * Math.PI) / 180
  const vx = V0 * Math.cos(angle)
  const vy = V0 * Math.sin(angle)
  const flightTime = (2 * vy) / G
  const range = (V0 * V0 * Math.sin(2 * angle)) / G
  const maxH = (vy * vy) / (2 * G)

  const points: { x: number; y: number; t: number }[] = []
  const steps = 60
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * flightTime
    const x = vx * t
    const y = vy * t - 0.5 * G * t * t
    points.push({ x: x * SCALE, y: Math.max(0, y) * SCALE, t })
  }

  return { points, range, maxH, flightTime }
}

export function InteractiveProjectileSim() {
  const [angle, setAngle] = useState(45)
  const [velocity, setVelocity] = useState(30)
  const [animating, setAnimating] = useState(false)
  const [ballPos, setBallPos] = useState(0) // 0 to 1 along trajectory
  const animRef = useRef<number | null>(null)

  const traj = calculateTrajectory(angle)
  const maxRange = 92 * SCALE // max possible range in pixels (45° at 30m/s)
  const maxHeight = 23 * SCALE // max possible height in pixels

  // SVG dimensions
  const svgW = 400
  const svgH = 200
  const groundY = svgH - 20
  const startX = 20

  function animate() {
    setAnimating(true)
    setBallPos(0)
    const start = performance.now()
    const duration = traj.flightTime * 500 // scale time for visibility

    function frame(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setBallPos(progress)
      if (progress < 1) {
        animRef.current = requestAnimationFrame(frame)
      } else {
        setAnimating(false)
      }
    }
    animRef.current = requestAnimationFrame(frame)
  }

  useEffect(() => {
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [])

  // Current ball position
  const ballIdx = Math.floor(ballPos * (traj.points.length - 1))
  const ball = traj.points[ballIdx] || traj.points[0]

  return (
    <div className="glass-card rounded-3xl p-6 w-full">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="w-5 h-5 text-brand-300" />
        <h3 className="font-display text-lg font-semibold text-white">Projectile Motion Lab</h3>
        <span className="text-xs text-surface-600 ml-auto">Drag sliders · Press launch</span>
      </div>

      {/* SVG simulation */}
      <div className="relative rounded-2xl overflow-hidden bg-surface-200/30 border border-surface-300/20 mb-4">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-48">
          {/* Grid lines */}
          {[0, 50, 100, 150].map((y) => (
            <line key={y} x1="0" y1={groundY - y} x2={svgW} y2={groundY - y}
              stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}
          {[0, 100, 200, 300, 400].map((x) => (
            <line key={x} x1={startX + x} y1="0" x2={startX + x} y2={groundY}
              stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}

          {/* Ground */}
          <line x1="0" y1={groundY} x2={svgW} y2={groundY}
            stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

          {/* Trajectory path */}
          <motion.path
            d={`M ${startX} ${groundY} ${traj.points.map(p => `L ${startX + p.x} ${groundY - p.y}`).join(' ')}`}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 4px #38BDF8)' }}
            animate={{ d: `M ${startX} ${groundY} ${traj.points.map(p => `L ${startX + p.x} ${groundY - p.y}`).join(' ')}` }}
            transition={{ duration: 0.2 }}
          />

          {/* Launch angle indicator */}
          <line
            x1={startX} y1={groundY}
            x2={startX + 40 * Math.cos((angle * Math.PI) / 180)}
            y2={groundY - 40 * Math.sin((angle * Math.PI) / 180)}
            stroke="#A78BFA" strokeWidth="2" strokeDasharray="4 3" opacity="0.5"
          />
          <text
            x={startX + 30 * Math.cos((angle * Math.PI) / 180)}
            y={groundY - 30 * Math.sin((angle * Math.PI) / 180) - 5}
            fill="#A78BFA" fontSize="10" opacity="0.7"
          >
            {angle}°
          </text>

          {/* Ball */}
          <circle
            cx={startX + ball.x}
            cy={groundY - ball.y}
            r="5"
            fill="#FB7185"
            style={{ filter: 'drop-shadow(0 0 6px #FB7185)' }}
          />

          {/* Stats overlay */}
          <text x={svgW - 80} y="20" fill="#38BDF8" fontSize="9" opacity="0.8">
            Range: {(traj.range).toFixed(1)}m
          </text>
          <text x={svgW - 80} y="35" fill="#4ADE80" fontSize="9" opacity="0.8">
            Height: {(traj.maxH).toFixed(1)}m
          </text>
          <text x={svgW - 80} y="50" fill="#FB7185" fontSize="9" opacity="0.8">
            Time: {traj.flightTime.toFixed(2)}s
          </text>
        </svg>
      </div>

      {/* Controls */}
      <div className="space-y-3 mb-4">
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-surface-600">Launch Angle</span>
            <span className="text-brand-300 font-medium">{angle}°</span>
          </div>
          <input
            type="range" min="10" max="80" value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-300/50
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-400
              [&::-webkit-slider-thumb]:shadow-glow [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-surface-600">Initial Velocity</span>
            <span className="text-accent-300 font-medium">{velocity} m/s</span>
          </div>
          <input
            type="range" min="10" max="50" value={velocity}
            onChange={(e) => setVelocity(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-300/50
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-400
              [&::-webkit-slider-thumb]:shadow-glow [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={animate}
          disabled={animating}
          className="flex-1 px-4 py-2.5 rounded-xl bg-spectrum-gradient text-white text-sm font-medium shadow-glow disabled:opacity-40 hover:scale-[1.02] transition-transform"
        >
          {animating ? 'Flying...' : 'Launch!'}
        </button>
        <button
          onClick={() => { setBallPos(0); setAngle(45); setVelocity(30) }}
          className="px-4 py-2.5 rounded-xl bg-surface-200/40 border border-surface-300/30 text-surface-600 hover:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Learning insight */}
      <div className="mt-4 p-3 rounded-xl bg-surface-200/20 border border-surface-300/20 text-xs text-surface-600 leading-relaxed">
        {angle === 45
          ? "45° gives maximum range! That's because sin(2×45°) = sin(90°) = 1, the maximum value."
          : angle < 45
          ? `Lower angle = flatter, faster trajectory. Range is less than max (45°). Good for hitting targets at eye level.`
          : `Higher angle = taller, slower trajectory. Range is less than max (45°). Good for clearing walls.`}
      </div>
    </div>
  )
}
