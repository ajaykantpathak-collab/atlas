'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Tag, X, Info } from 'lucide-react'

export interface AnnotatedSVGRendererProps {
  title?: string
  imageUrl?: string
  svgContent?: string
  annotations?: {
    id: string
    x: number
    y: number
    label: string
    description: string
    color?: string
  }[]
}

export function AnnotatedSVGRenderer({
  title,
  imageUrl,
  annotations = [],
}: AnnotatedSVGRendererProps) {
  const [selected, setSelected] = useState<typeof annotations[0] | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-display text-xl font-bold text-white mb-4">{title}</h3>
      )}

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Diagram */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-4 relative">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden glass">
            {imageUrl ? (
              <img src={imageUrl} alt={title || 'Diagram'} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Info className="w-8 h-8 text-surface-400 mx-auto mb-2" />
                  <p className="text-sm text-surface-600">Diagram loads here</p>
                </div>
              </div>
            )}

            {/* Annotation pins */}
            {annotations.map((ann) => (
              <motion.button
                key={ann.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => setSelected(ann)}
                onMouseEnter={() => setHovered(ann.id)}
                onMouseLeave={() => setHovered(null)}
                className="absolute"
                style={{ left: `${ann.x}%`, top: `${ann.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: `${ann.color || '#a855f7'}40` }} />
                  <div
                    className="relative w-7 h-7 rounded-full flex items-center justify-center border-2 border-white/50 shadow-glow-sm transition-transform hover:scale-125"
                    style={{ backgroundColor: `${ann.color || '#a855f7'}cc` }}
                  >
                    <Tag className="w-3 h-3 text-white" />
                  </div>
                </div>
                <AnimatePresence>
                  {hovered === ann.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded-lg glass-strong text-[10px] text-white whitespace-nowrap"
                    >
                      {ann.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Info panel */}
        <div className="lg:col-span-1">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-display text-base font-bold text-white">{selected.label}</h4>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-7 h-7 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-surface-800" />
                  </button>
                </div>
                <p className="text-sm text-surface-600 leading-relaxed">{selected.description}</p>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center min-h-[160px]"
              >
                <Tag className="w-6 h-6 text-surface-400 mb-2" />
                <p className="text-xs text-surface-600">Click the pins on the diagram to learn about each part</p>
                <p className="text-[10px] text-surface-500 mt-2">{annotations.length} parts to explore</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
