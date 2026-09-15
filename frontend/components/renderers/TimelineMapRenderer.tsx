'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { MapPin, Clock, ChevronRight, X, Info } from 'lucide-react'

export interface TimelineEvent {
  id: string
  year: string
  date?: string
  title: string
  description: string
  location?: { lat: number; lng: number; name: string }
  image?: string
  category?: 'battle' | 'treaty' | 'movement' | 'policy' | 'cultural'
}

export interface TimelineMapRendererProps {
  events: TimelineEvent[]
  title?: string
}

const categoryColors: Record<string, string> = {
  battle: '#fb7185',
  treaty: '#34d399',
  movement: '#a855f7',
  policy: '#fbbf24',
  cultural: '#38bdf8',
}

export function TimelineMapRenderer({ events, title }: TimelineMapRendererProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const sortedEvents = [...events].sort((a, b) => parseInt(a.year) - parseInt(b.year))

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand-300" />
          {title}
        </h3>
      )}

      <div className="grid lg:grid-cols-5 gap-4">
        {/* Timeline */}
        <div className="lg:col-span-3 glass-card rounded-2xl p-6 relative">
          <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-brand-500/40 via-surface-300/30 to-transparent" />

          <div className="space-y-4">
            {sortedEvents.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedEvent(event)}
                className="relative pl-12 cursor-pointer group"
              >
                {/* Dot */}
                <div
                  className="absolute left-6 top-3 w-4 h-4 rounded-full border-2 border-surface-0 transition-transform group-hover:scale-125"
                  style={{ backgroundColor: categoryColors[event.category || 'movement'] || '#a855f7' }}
                />

                <div className={`glass-card-hover rounded-xl p-4 transition-all ${
                  hoveredId === event.id ? 'border-brand-500/30' : ''
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-brand-300">{event.year}</span>
                    {event.category && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium border"
                        style={{
                          color: categoryColors[event.category],
                          borderColor: `${categoryColors[event.category]}40`,
                          backgroundColor: `${categoryColors[event.category]}15`,
                        }}
                      >
                        {event.category}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-brand-300 transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-xs text-surface-600 line-clamp-2">{event.description}</p>
                  {event.location && (
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-surface-500">
                      <MapPin className="w-3 h-3" />
                      {event.location.name}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map placeholder + event detail */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map */}
          <div className="glass-card rounded-2xl p-4 h-64 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-surface-200/20 to-surface-300/10" />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 256">
              {/* Simplified India outline */}
              <path
                d="M120,40 L180,30 L220,50 L260,40 L280,80 L290,120 L270,160 L240,200 L200,220 L160,210 L130,180 L110,140 L100,90 Z"
                fill="rgba(168, 85, 247, 0.08)"
                stroke="rgba(168, 85, 247, 0.3)"
                strokeWidth="1.5"
              />
              {sortedEvents.filter(e => e.location).map((event) => {
                const x = 100 + (event.location!.lng - 68) * 4
                const y = 30 + (35 - event.location!.lat) * 5
                return (
                  <motion.circle
                    key={event.id}
                    cx={x}
                    cy={y}
                    r={hoveredId === event.id ? 8 : 5}
                    fill={categoryColors[event.category || 'movement'] || '#a855f7'}
                    opacity="0.7"
                    className="cursor-pointer"
                    onClick={() => setSelectedEvent(event)}
                    animate={{ r: hoveredId === event.id ? 8 : 5 }}
                  />
                )
              })}
            </svg>
            <div className="absolute bottom-2 left-2 text-[10px] text-surface-500 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Event locations
            </div>
          </div>

          {/* Selected event detail */}
          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-300">{selectedEvent.year}</span>
                    <h4 className="font-display text-base font-bold text-white mt-1">{selectedEvent.title}</h4>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="w-7 h-7 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 text-surface-800" />
                  </button>
                </div>
                <p className="text-sm text-surface-600 leading-relaxed">{selectedEvent.description}</p>
                {selectedEvent.location && (
                  <div className="flex items-center gap-1 mt-3 text-xs text-surface-500">
                    <MapPin className="w-3 h-3" />
                    {selectedEvent.location.name}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card rounded-2xl p-5 flex flex-col items-center justify-center text-center min-h-[120px]"
              >
                <Info className="w-6 h-6 text-surface-400 mb-2" />
                <p className="text-xs text-surface-600">Click an event to see details</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
