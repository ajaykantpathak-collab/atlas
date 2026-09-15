'use client'

import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { TrendingUp, Sliders } from 'lucide-react'

export interface GraphSliderRendererProps {
  title?: string
  description?: string
  xAxisLabel?: string
  yAxisLabel?: string
  // Function to compute y from x given slider values
  computeFn: (x: number, sliders: Record<string, number>) => number
  xRange?: [number, number]
  sliders?: {
    id: string
    label: string
    min: number
    max: number
    step: number
    default: number
    unit?: string
  }[]
  // Optional second curve for comparison
  computeFn2?: (x: number, sliders: Record<string, number>) => number
  curveLabel?: string
  curve2Label?: string
}

export function GraphSliderRenderer({
  title,
  description,
  xAxisLabel = 'X',
  yAxisLabel = 'Y',
  computeFn,
  xRange = [-10, 10],
  sliders = [],
  computeFn2,
  curveLabel = 'Curve 1',
  curve2Label,
}: GraphSliderRendererProps) {
  const [sliderValues, setSliderValues] = useState<Record<string, number>>(
    Object.fromEntries(sliders.map(s => [s.id, s.default]))
  )

  const points = useMemo(() => {
    const pts: { x: number; y: number }[] = []
    const pts2: { x: number; y: number }[] = []
    const steps = 80
    for (let i = 0; i <= steps; i++) {
      const x = xRange[0] + ((xRange[1] - xRange[0]) * i) / steps
      pts.push({ x, y: computeFn(x, sliderValues) })
      if (computeFn2) pts2.push({ x, y: computeFn2(x, sliderValues) })
    }
    return { pts, pts2 }
  }, [sliderValues, computeFn, computeFn2, xRange])

  const allY = [...points.pts.map(p => p.y), ...points.pts2.map(p => p.y)].filter(isFinite)
  const yMin = Math.min(...allY, -5)
  const yMax = Math.max(...allY, 5)

  const toScreenX = (x: number) => ((x - xRange[0]) / (xRange[1] - xRange[0])) * 700 + 50
  const toScreenY = (y: number) => 300 - ((y - yMin) / (yMax - yMin)) * 250 + 25

  const pathD = points.pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toScreenX(p.x)} ${toScreenY(p.y)}`).join(' ')
  const pathD2 = points.pts2.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toScreenX(p.x)} ${toScreenY(p.y)}`).join(' ')

  return (
    <div className="w-full">
      <div className="glass-card rounded-2xl p-6">
        {title && (
          <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-300" />
            {title}
          </h3>
        )}
        {description && <p className="text-sm text-surface-600 mb-4">{description}</p>}

        <div className="grid lg:grid-cols-4 gap-4">
          {/* Graph */}
          <div className="lg:col-span-3 rounded-xl overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, #1a1530 0%, #131118 100%)' }}>
            <svg className="w-full h-auto" viewBox="0 0 800 350">
              {/* Grid */}
              {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                <line key={`v${i}`} x1={50 + i * 100} y1="25" x2={50 + i * 100} y2="325" stroke="#a855f7" strokeWidth="0.5" opacity="0.15" />
              ))}
              {[0, 1, 2, 3, 4, 5].map(i => (
                <line key={`h${i}`} x1="50" y1={25 + i * 60} x2="750" y2={25 + i * 60} stroke="#a855f7" strokeWidth="0.5" opacity="0.15" />
              ))}
              {/* Axes */}
              <line x1="50" y1="175" x2="750" y2="175" stroke="#a855f7" strokeWidth="1.5" opacity="0.4" />
              <line x1="400" y1="25" x2="400" y2="325" stroke="#a855f7" strokeWidth="1.5" opacity="0.4" />
              {/* Axis labels */}
              <text x="740" y="170" fill="#a855f7" fontSize="11" opacity="0.6">{xAxisLabel}</text>
              <text x="405" y="35" fill="#a855f7" fontSize="11" opacity="0.6">{yAxisLabel}</text>
              {/* Curve 1 */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
                animate={{ d: pathD }}
                transition={{ duration: 0.3 }}
              />
              {/* Curve 2 */}
              {computeFn2 && (
                <motion.path
                  d={pathD2}
                  fill="none"
                  stroke="#fb7185"
                  strokeWidth="2.5"
                  strokeDasharray="5 3"
                  animate={{ d: pathD2 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </svg>
          </div>

          {/* Sliders */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2 text-xs text-surface-600 uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              Controls
            </div>
            {sliders.map(slider => (
              <div key={slider.id}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-surface-600">{slider.label}</span>
                  <span className="font-mono font-bold text-brand-300">
                    {sliderValues[slider.id]}{slider.unit || ''}
                  </span>
                </div>
                <input
                  type="range"
                  min={slider.min}
                  max={slider.max}
                  step={slider.step}
                  value={sliderValues[slider.id]}
                  onChange={(e) => setSliderValues(prev => ({ ...prev, [slider.id]: parseFloat(e.target.value) }))}
                  className="w-full h-2 rounded-full bg-surface-200/40 appearance-none cursor-pointer accent-brand-500"
                />
              </div>
            ))}

            {/* Legend */}
            <div className="pt-2 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-surface-600">
                <div className="w-4 h-0.5 bg-brand-400" />
                {curveLabel}
              </div>
              {computeFn2 && curve2Label && (
                <div className="flex items-center gap-2 text-xs text-surface-600">
                  <div className="w-4 h-0.5 border-t-2 border-dashed border-accent-400" />
                  {curve2Label}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
