'use client'

import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { RotateCcw, ZoomIn, ZoomOut, Atom } from 'lucide-react'

export interface Molecular3DRendererProps {
  moleculeName: string
  formula: string
  description?: string
  atoms?: { element: string; x: number; y: number; z: number; color: string; radius: number }[]
  bonds?: { from: number; to: number; type: 'single' | 'double' | 'triple' }[]
}

const defaultAtoms = [
  { element: 'C', x: 0, y: 0, z: 0, color: '#38bdf8', radius: 20 },
  { element: 'H', x: 40, y: -30, z: 0, color: '#fbbf24', radius: 12 },
  { element: 'H', x: -40, y: -30, z: 0, color: '#fbbf24', radius: 12 },
  { element: 'H', x: 0, y: 40, z: 20, color: '#fbbf24', radius: 12 },
  { element: 'H', x: 0, y: 40, z: -20, color: '#fbbf24', radius: 12 },
]

const defaultBonds = [
  { from: 0, to: 1, type: 'single' as const },
  { from: 0, to: 2, type: 'single' as const },
  { from: 0, to: 3, type: 'single' as const },
  { from: 0, to: 4, type: 'single' as const },
]

export function Molecular3DRenderer({
  moleculeName,
  formula,
  description,
  atoms = defaultAtoms,
  bonds = defaultBonds,
}: Molecular3DRendererProps) {
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 })
  const [rotX, setRotX] = useState(-15)

  // Project 3D to 2D (simplified)
  const project = (x: number, y: number, z: number) => {
    const rad = (rotation * Math.PI) / 180
    const radX = (rotX * Math.PI) / 180
    const cos = Math.cos(rad), sin = Math.sin(rad)
    const cosX = Math.cos(radX), sinX = Math.sin(radX)
    const y1 = y * cosX - z * sinX
    const z1 = y * sinX + z * cosX
    const x2 = x * cos - z1 * sin
    const z2 = x * sin + z1 * cos
    const scale = zoom * 100 / (100 + z2)
    return { x: x2 * scale, y: y1 * scale, z: z2, scale }
  }

  const projected = atoms.map(a => ({ ...a, ...project(a.x, a.y, a.z) }))

  return (
    <div className="w-full">
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Atom className="w-5 h-5 text-mint-300" />
            <div>
              <h3 className="font-display text-base font-bold text-white">{moleculeName}</h3>
              <p className="text-xs text-surface-600 font-mono">{formula}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setZoom(z => Math.max(0.5, z - 0.2))}
              className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5 text-white" />
            </button>
            <button
              onClick={() => setZoom(z => Math.min(2, z + 0.2))}
              className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5 text-white" />
            </button>
            <button
              onClick={() => { setRotation(0); setRotX(-15); setZoom(1) }}
              className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        <div
          className="relative w-full aspect-video rounded-xl overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ background: 'radial-gradient(ellipse at center, #1a1530 0%, #131118 100%)' }}
          onMouseDown={(e) => {
            setDragging(true)
            dragStart.current = { x: e.clientX, y: e.clientY, rotX: rotation, rotY: rotX }
          }}
          onMouseMove={(e) => {
            if (dragging) {
              setRotation(dragStart.current.rotX + (e.clientX - dragStart.current.x) * 0.5)
              setRotX(dragStart.current.rotY + (e.clientY - dragStart.current.y) * 0.5)
            }
          }}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
        >
          <svg className="w-full h-full" viewBox="-200 -150 400 300">
            {/* Bonds */}
            {bonds.map((bond, i) => {
              const a = projected[bond.from]
              const b = projected[bond.to]
              const lines = bond.type === 'double' ? [-3, 3] : bond.type === 'triple' ? [-4, 0, 4] : [0]
              return lines.map((offset, j) => (
                <line
                  key={`${i}-${j}`}
                  x1={a.x}
                  y1={a.y + offset}
                  x2={b.x}
                  y2={b.y + offset}
                  stroke="#a855f7"
                  strokeWidth="2"
                  opacity="0.5"
                />
              ))
            })}
            {/* Atoms */}
            {projected.map((atom, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <circle cx={atom.x} cy={atom.y} r={atom.radius * atom.scale / 20} fill={atom.color} opacity="0.3" />
                <circle cx={atom.x} cy={atom.y} r={atom.radius * atom.scale / 20} fill="none" stroke={atom.color} strokeWidth="2" />
                <text x={atom.x} y={atom.y + 4} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  {atom.element}
                </text>
              </motion.g>
            ))}
          </svg>

          <div className="absolute bottom-3 left-3 text-[10px] text-surface-500">
            Drag to rotate · Scroll to zoom
          </div>
        </div>

        {description && (
          <p className="text-sm text-surface-600 mt-4 leading-relaxed">{description}</p>
        )}

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4">
          {Array.from(new Set(atoms.map(a => a.element))).map(el => {
            const atom = atoms.find(a => a.element === el)!
            return (
              <div key={el} className="flex items-center gap-1.5 text-xs text-surface-600">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: atom.color }} />
                {el}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
