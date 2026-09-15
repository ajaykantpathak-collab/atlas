'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Highlighter, MessageSquare, BookOpen, X } from 'lucide-react'

export interface TextAnnotationRendererProps {
  title?: string
  text: string
  annotations?: {
    id: string
    start: number
    end: number
    label: string
    type: 'poetic_device' | 'grammar' | 'vocabulary' | 'theme' | 'character' | 'historical'
    explanation: string
  }[]
  translation?: string
  sideNotes?: { title: string; content: string }[]
}

const typeColors: Record<string, string> = {
  poetic_device: '#a855f7',
  grammar: '#34d399',
  vocabulary: '#fbbf24',
  theme: '#fb7185',
  character: '#38bdf8',
  historical: '#d8b4fe',
}

export function TextAnnotationRenderer({
  title,
  text,
  annotations = [],
  translation,
  sideNotes = [],
}: TextAnnotationRendererProps) {
  const [selected, setSelected] = useState<typeof annotations[0] | null>(null)

  // Split text into segments based on annotations
  const segments: { text: string; annotation?: typeof annotations[0] }[] = []
  let lastEnd = 0
  const sorted = [...annotations].sort((a, b) => a.start - b.start)

  for (const ann of sorted) {
    if (ann.start > lastEnd) {
      segments.push({ text: text.slice(lastEnd, ann.start) })
    }
    segments.push({ text: text.slice(ann.start, ann.end), annotation: ann })
    lastEnd = ann.end
  }
  if (lastEnd < text.length) {
    segments.push({ text: text.slice(lastEnd) })
  }

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-300" />
          {title}
        </h3>
      )}

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Annotated text */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="text-base text-surface-700 leading-loose font-serif">
            {segments.map((seg, i) => {
              if (seg.annotation) {
                const color = typeColors[seg.annotation.type] || '#a855f7'
                const isSelected = selected?.id === seg.annotation.id
                return (
                  <button
                    key={i}
                    onClick={() => setSelected(seg.annotation ?? null)}
                    className="relative inline cursor-pointer transition-all rounded px-0.5"
                    style={{
                      backgroundColor: isSelected ? `${color}30` : `${color}15`,
                      borderBottom: `2px dotted ${color}`,
                      color: isSelected ? color : '#e2e0e8',
                    }}
                  >
                    {seg.text}
                  </button>
                )
              }
              return <span key={i}>{seg.text}</span>
            })}
          </div>

          {translation && (
            <div className="mt-6 pt-4 border-t border-surface-300/30">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-mint-300" />
                <span className="text-xs font-medium text-surface-600 uppercase tracking-wider">Translation</span>
              </div>
              <p className="text-sm text-surface-600 leading-relaxed italic">{translation}</p>
            </div>
          )}

          {/* Legend */}
          {annotations.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-surface-300/30">
              {Array.from(new Set(annotations.map(a => a.type))).map(type => (
                <div key={type} className="flex items-center gap-1.5 text-xs text-surface-600">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: typeColors[type] }} />
                  {type.replace(/_/g, ' ')}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="lg:col-span-1 space-y-4">
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
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Highlighter className="w-4 h-4" style={{ color: typeColors[selected.type] }} />
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium border"
                        style={{
                          color: typeColors[selected.type],
                          borderColor: `${typeColors[selected.type]}40`,
                          backgroundColor: `${typeColors[selected.type]}15`,
                        }}
                      >
                        {selected.type.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <h4 className="font-display text-base font-bold text-white">{selected.label}</h4>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-7 h-7 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-surface-800" />
                  </button>
                </div>
                <p className="text-sm text-surface-600 leading-relaxed">{selected.explanation}</p>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center min-h-[120px]"
              >
                <Highlighter className="w-6 h-6 text-surface-400 mb-2" />
                <p className="text-xs text-surface-600">Click highlighted text to see analysis</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Side notes */}
          {sideNotes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="glass-card rounded-2xl p-4"
            >
              <h5 className="text-xs font-bold text-brand-300 uppercase tracking-wider mb-2">{note.title}</h5>
              <p className="text-sm text-surface-600 leading-relaxed">{note.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
