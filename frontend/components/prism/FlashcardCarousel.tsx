'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCw, Sparkles, Shuffle, Loader2 } from 'lucide-react'

/**
 * FlashcardCarousel — REAL flashcards from the backend.
 * Fetches enrichment nodes from /api/public/flashcard (which calls the real backend).
 * Each card shows a real curriculum topic with its definition and ELI5 explanation.
 *
 * No hardcoded content. Every card comes from the actual knowledge graph.
 */

interface RealFlashcard {
  node_id: string
  title: string
  subject: string
  class_level: number
  definition: string
  eli5: string
  difficulty: string
}

const SUBJECT_COLORS: Record<string, string> = {
  physics: '#38BDF8',
  chemistry: '#4ADE80',
  biology: '#FB7185',
  mathematics: '#A78BFA',
  math: '#A78BFA',
  'computer science': '#22D3EE',
  geography: '#FB923C',
  'environmental science': '#84CC16',
  history: '#FBBF24',
  economics: '#60A5FA',
  english: '#F472B6',
  hindi: '#F87171',
}

function getSubjectColor(subject: string): string {
  return SUBJECT_COLORS[subject.toLowerCase()] || '#A78BFA'
}

function capitalizeSubject(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// Subject + class combos to rotate through for variety
const FETCH_COMBOS = [
  { subject: 'physics', classLevel: 10 },
  { subject: 'chemistry', classLevel: 10 },
  { subject: 'biology', classLevel: 10 },
  { subject: 'mathematics', classLevel: 10 },
  { subject: 'physics', classLevel: 9 },
  { subject: 'chemistry', classLevel: 9 },
  { subject: 'biology', classLevel: 9 },
  { subject: 'mathematics', classLevel: 9 },
  { subject: 'physics', classLevel: 8 },
  { subject: 'chemistry', classLevel: 8 },
  { subject: 'biology', classLevel: 8 },
  { subject: 'mathematics', classLevel: 8 },
  { subject: 'physics', classLevel: 5 },
  { subject: 'mathematics', classLevel: 5 },
  { subject: 'physics', classLevel: 6 },
  { subject: 'mathematics', classLevel: 6 },
  { subject: 'physics', classLevel: 7 },
  { subject: 'mathematics', classLevel: 7 },
]

export function FlashcardCarousel() {
  const [cards, setCards] = useState<RealFlashcard[]>([])
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch real flashcards from the backend
  const fetchCards = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Fetch from multiple subject/class combos to get variety
      const selectedCombos = [...FETCH_COMBOS]
        .sort(() => Math.random() - 0.5)
        .slice(0, 6)

      const fetchedCards: RealFlashcard[] = []

      for (const combo of selectedCombos) {
        try {
          const res = await fetch(
            `/api/public/flashcard?subject=${combo.subject}&class_level=${combo.classLevel}`
          )
          if (res.ok) {
            const data = await res.json()
            if (data.title && data.definition) {
              fetchedCards.push({
                node_id: data.node_id,
                title: data.title,
                subject: data.subject || combo.subject,
                class_level: data.class_level || combo.classLevel,
                definition: data.definition,
                eli5: data.eli5 || '',
                difficulty: data.difficulty || 'medium',
              })
            }
          }
        } catch {
          // Skip this combo if it fails
        }
      }

      if (fetchedCards.length === 0) {
        setError('Unable to load flashcards right now')
      } else {
        setCards(fetchedCards)
        setCurrent(0)
        setFlipped(false)
      }
    } catch {
      setError('Unable to load flashcards right now')
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch on mount
  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  // Auto-flip and auto-advance
  useEffect(() => {
    if (cards.length === 0) return
    const flipTimer = setInterval(() => setFlipped((f) => !f), 3500)
    const nextTimer = setInterval(() => {
      setFlipped(false)
      setCurrent((c) => (c + 1) % cards.length)
    }, 7000)
    return () => { clearInterval(flipTimer); clearInterval(nextTimer) }
  }, [cards.length])

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-full max-w-sm h-56 glass-card rounded-3xl p-6 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-brand-400 animate-spin" />
        </div>
        <div className="text-xs text-surface-600">Loading real curriculum flashcards…</div>
      </div>
    )
  }

  if (error || cards.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-full max-w-sm h-56 glass-card rounded-3xl p-6 flex flex-col items-center justify-center gap-3">
          <p className="text-sm text-surface-600 text-center">{error || 'No flashcards available'}</p>
          <button
            onClick={fetchCards}
            className="text-xs px-4 py-2 rounded-full bg-brand-500/20 text-brand-300 hover:bg-brand-500/30 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  const card = cards[current]
  const color = getSubjectColor(card.subject)

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative w-full max-w-sm h-56 cursor-pointer"
        style={{ perspective: '1000px' }}
        onClick={() => setFlipped(!flipped)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Front — Question / Topic */}
            <div className="absolute inset-0 glass-card rounded-3xl p-6 flex flex-col justify-between" style={{ backfaceVisibility: 'hidden' }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}>
                  {capitalizeSubject(card.subject)} · Class {card.class_level}
                </span>
                <RotateCw className="w-4 h-4 text-surface-600" />
              </div>
              <div className="flex-1 flex items-center justify-center px-2">
                <p className="text-center text-white font-medium text-lg leading-relaxed">{card.title}</p>
              </div>
              <div className="text-center text-xs text-surface-600">Tap to flip</div>
            </div>
            {/* Back — Answer / Definition */}
            <div className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between overflow-hidden"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: `${color}10`, border: `1px solid ${color}30` }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: color }} />
              <div className="relative flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color }} />
                <span className="text-xs font-medium" style={{ color }}>
                  {card.eli5 ? 'Explain Like I\'m 5' : 'Definition'}
                </span>
              </div>
              <div className="relative flex-1 flex items-center px-2 overflow-y-auto scrollbar-hide">
                <p className="text-sm text-surface-700 leading-relaxed whitespace-pre-line">
                  {card.eli5 || card.definition}
                </p>
              </div>
              <div className="relative text-xs text-surface-600 mt-2">
                Difficulty: {card.difficulty}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {cards.slice(0, 6).map((_, i) => (
            <button key={i} onClick={() => { setFlipped(false); setCurrent(i) }}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-brand-400' : 'w-1.5 bg-surface-500'}`} />
          ))}
        </div>
        <button onClick={fetchCards}
          className="flex items-center gap-1 text-xs text-surface-600 hover:text-white transition-colors">
          <Shuffle className="w-3 h-3" /> Shuffle
        </button>
      </div>
    </div>
  )
}
