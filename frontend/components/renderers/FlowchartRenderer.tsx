'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { GitBranch, X, ZoomIn, ZoomOut, Move } from 'lucide-react'

export interface FlowchartNode {
  id: string
  label: string
  type: 'start' | 'process' | 'decision' | 'end' | 'data'
  x: number
  y: number
  detail?: string
}

export interface FlowchartEdge {
  from: string
  to: string
  label?: string
}

export interface FlowchartRendererProps {
  title?: string
  nodes: FlowchartNode[]
  edges: FlowchartEdge[]
}

const nodeColors: Record<string, { fill: string; stroke: string }> = {
  start: { fill: '#34d39920', stroke: '#34d399' },
  process: { fill: '#a855f720', stroke: '#a855f7' },
  decision: { fill: '#fbbf2420', stroke: '#fbbf24' },
  end: { fill: '#fb718520', stroke: '#fb7185' },
  data: { fill: '#38bdf820', stroke: '#38bdf8' },
}

export function FlowchartRenderer({ title, nodes, edges }: FlowchartRendererProps) {
  const [selected, setSelected] = useState<FlowchartNode | null>(null)
  const [zoom, setZoom] = useState(1)

  const nodeMap = new Map(nodes.map(n => [n.id, n]))

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-brand-300" />
          {title}
        </h3>
      )}

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Flowchart canvas */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-4 relative overflow-hidden">
          <div className="flex justify-end gap-2 mb-2">
            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.15))} className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors">
              <ZoomOut className="w-3.5 h-3.5 text-white" />
            </button>
            <button onClick={() => setZoom(z => Math.min(2, z + 0.15))} className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors">
              <ZoomIn className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, #1a1530 0%, #131118 100%)' }}>
            <svg className="w-full h-full" viewBox="0 0 800 450" style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}>
              {/* Edges */}
              {edges.map((edge, i) => {
                const from = nodeMap.get(edge.from)
                const to = nodeMap.get(edge.to)
                if (!from || !to) return null
                const midX = (from.x + to.x) / 2
                const midY = (from.y + to.y) / 2
                return (
                  <g key={i}>
                    <path
                      d={`M ${from.x} ${from.y} Q ${midX} ${midY - 20} ${to.x} ${to.y}`}
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="2"
                      opacity="0.4"
                      markerEnd="url(#arrowhead)"
                    />
                    {edge.label && (
                      <text x={midX} y={midY - 25} textAnchor="middle" fill="#a855f7" fontSize="10" opacity="0.7">
                        {edge.label}
                      </text>
                    )}
                  </g>
                )
              })}
              <defs>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#a855f7" opacity="0.6" />
                </marker>
              </defs>
              {/* Nodes */}
              {nodes.map((node, i) => {
                const colors = nodeColors[node.type] || nodeColors.process
                const isDecision = node.type === 'decision'
                const isSelected = selected?.id === node.id
                return (
                  <motion.g
                    key={node.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => setSelected(node)}
                    className="cursor-pointer"
                  >
                    {isDecision ? (
                      <polygon
                        points={`${node.x},${node.y - 30} ${node.x + 50},${node.y} ${node.x},${node.y + 30} ${node.x - 50},${node.y}`}
                        fill={colors.fill}
                        stroke={colors.stroke}
                        strokeWidth={isSelected ? 3 : 2}
                      />
                    ) : node.type === 'start' || node.type === 'end' ? (
                      <rect x={node.x - 50} y={node.y - 25} width="100" height="50" rx="25" fill={colors.fill} stroke={colors.stroke} strokeWidth={isSelected ? 3 : 2} />
                    ) : (
                      <rect x={node.x - 55} y={node.y - 25} width="110" height="50" rx="8" fill={colors.fill} stroke={colors.stroke} strokeWidth={isSelected ? 3 : 2} />
                    )}
                    <text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="500">
                      {node.label}
                    </text>
                  </motion.g>
                )
              })}
            </svg>
          </div>

          <div className="absolute bottom-3 left-3 text-[10px] text-surface-500 flex items-center gap-1">
            <Move className="w-3 h-3" /> Click nodes for details
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-1">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium border" style={{
                    color: nodeColors[selected.type].stroke,
                    borderColor: `${nodeColors[selected.type].stroke}40`,
                    backgroundColor: `${nodeColors[selected.type].stroke}15`,
                  }}>
                    {selected.type}
                  </span>
                  <h4 className="font-display text-base font-bold text-white mt-2">{selected.label}</h4>
                </div>
                <button onClick={() => setSelected(null)} className="w-7 h-7 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors">
                  <X className="w-3.5 h-3.5 text-surface-800" />
                </button>
              </div>
              {selected.detail && <p className="text-sm text-surface-600 leading-relaxed">{selected.detail}</p>}
            </motion.div>
          ) : (
            <div className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center min-h-[120px]">
              <GitBranch className="w-6 h-6 text-surface-400 mb-2" />
              <p className="text-xs text-surface-600">Click a node to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
