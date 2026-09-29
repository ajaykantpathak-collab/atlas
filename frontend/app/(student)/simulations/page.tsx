'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, FlaskConical, Atom, Waves, Magnet,
  Battery, Thermometer, Microscope, Play,
  Sparkles, Clock, Star, Search, Filter,
  Calculator, Leaf, Globe, Cpu, BookOpen,
  Loader2, ChevronRight, X,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useState, useMemo, useEffect } from 'react'
import { ALL_GAMES, getGamesForClass, type GameMeta } from '@/lib/gameRegistry'
import { useAuthStore } from '@/stores/authStore'

// ─── Subject metadata ───────────────────────────────────────────
const SUBJECT_META: Record<string, { name: string; icon: any; color: string; bg: string; border: string }> = {
  physics: { name: 'Physics', icon: Atom, color: 'text-brand-300', bg: 'bg-brand-500/10', border: 'border-brand-500/20' },
  chemistry: { name: 'Chemistry', icon: FlaskConical, color: 'text-accent-300', bg: 'bg-accent-500/10', border: 'border-accent-500/20' },
  biology: { name: 'Biology', icon: Leaf, color: 'text-mint-300', bg: 'bg-mint-500/10', border: 'border-mint-500/20' },
  maths: { name: 'Mathematics', icon: Calculator, color: 'text-gold-300', bg: 'bg-gold-500/10', border: 'border-gold-500/20' },
  science: { name: 'Science', icon: Microscope, color: 'text-gold-300', bg: 'bg-gold-500/10', border: 'border-gold-500/20' },
  evs: { name: 'EVS', icon: Globe, color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  geography: { name: 'Geography', icon: Globe, color: 'text-gold-300', bg: 'bg-gold-500/10', border: 'border-gold-500/20' },
  history: { name: 'History', icon: BookOpen, color: 'text-amber-300', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  cs: { name: 'Computer Science', icon: Cpu, color: 'text-purple-300', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  english: { name: 'English', icon: BookOpen, color: 'text-rose-300', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  hindi: { name: 'Hindi', icon: BookOpen, color: 'text-orange-300', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  economics: { name: 'Economics', icon: Calculator, color: 'text-yellow-300', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  general: { name: 'General', icon: Sparkles, color: 'text-pink-300', bg: 'bg-pink-500/10', border: 'border-pink-500/20' },
}

function getSubjectMeta(subject: string) {
  // canonical keys hit the map directly; raw strings fall through to the
  // same bucketing as subjectKey
  return SUBJECT_META[subject.toLowerCase().trim()] ?? SUBJECT_META[subjectKey(subject)]
}

// Bucket raw sim subjects ("Biology — Cell Structure", "Physics IX") into
// canonical filter keys so the subject bar has ~10 chips, not 200.
function subjectKey(subject: string): string {
  const k = (subject || '').toLowerCase().trim()
  if (k.includes('phys')) return 'physics'
  if (k.includes('chem')) return 'chemistry'
  if (k.includes('bio')) return 'biology'
  if (k.includes('math')) return 'maths'
  if (k.includes('comp') || k.includes('cs')) return 'cs'
  if (k.includes('geo')) return 'geography'
  if (k.includes('hist')) return 'history'
  if (k.includes('eng') || k.includes('gram') || k.includes('lang')) return 'english'
  if (k.includes('hin')) return 'hindi'
  if (k.includes('evs')) return 'evs'
  if (k.includes('eco')) return 'economics'
  if (k.includes('sci')) return 'science'
  return 'general'
}

export default function SimulationsPage() {
  const { user } = useAuthStore()
  const classLevel = user?.class_level || 10
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState<string>('all')
  const [selectedClass, setSelectedClass] = useState<number | 'all'>('all')
  const [selectedGame, setSelectedGame] = useState<GameMeta | null>(null)
  const [loading, setLoading] = useState(true)

  // Load games from registry
  const allGames = useMemo(() => ALL_GAMES, [])

  useEffect(() => {
    // Simulate brief loading
    const t = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(t)
  }, [])

  // Get available subjects from games (canonical buckets, deduplicated)
  const availableSubjects = useMemo(() => {
    const subjects = new Set(allGames.map(g => subjectKey(g.subject)))
    return Array.from(subjects).sort()
  }, [allGames])

  // Get available classes from games
  const availableClasses = useMemo(() => {
    const classes = new Set(allGames.map(g => g.classLevel))
    return Array.from(classes).sort((a, b) => a - b)
  }, [allGames])

  // Filter games
  const filteredGames = useMemo(() => {
    return allGames.filter((game) => {
      if (selectedSubject !== 'all' && subjectKey(game.subject) !== selectedSubject) return false
      if (selectedClass !== 'all' && game.classLevel !== selectedClass) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          game.name.toLowerCase().includes(q) ||
          game.subject.toLowerCase().includes(q) ||
          game.id.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [allGames, selectedSubject, selectedClass, searchQuery])

  // Group games by subject for display
  const gamesBySubject = useMemo(() => {
    const grouped: Record<string, GameMeta[]> = {}
    filteredGames.forEach((game) => {
      const key = subjectKey(game.subject)
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(game)
    })
    return grouped
  }, [filteredGames])

  const totalGames = allGames.length
  const filteredCount = filteredGames.length

  return (
    <div className="min-h-screen mesh-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Interactive Simulations</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge-brand text-[10px]">{totalGames} Available</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-brand-300" />
            <h2 className="font-display text-xl font-bold text-white">Learn by Doing</h2>
          </div>
          <p className="text-sm text-surface-600">
            {totalGames}+ interactive simulations across Physics, Chemistry, Biology, Maths, and more.
            Change variables, see results in real-time. Aligned to CBSE & CISCE curriculum.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="space-y-3 mb-6">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search simulations..."
              className="w-full pl-10 pr-4 py-3 rounded-xl glass text-sm text-white placeholder:text-surface-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-600 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Subject filter chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-[10px] text-surface-600">
              <Filter className="w-3 h-3" /> Subject:
            </div>
            <button
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedSubject === 'all'
                  ? 'bg-brand-500/20 text-brand-200'
                  : 'glass text-surface-600 hover:text-white'
              }`}
            >
              All
            </button>
            {availableSubjects.map((subj) => {
              const meta = getSubjectMeta(subj)
              const Icon = meta.icon
              return (
                <button
                  key={subj}
                  onClick={() => setSelectedSubject(subj)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    selectedSubject === subj
                      ? `${meta.bg} ${meta.color} ${meta.border} border`
                      : 'glass text-surface-600 hover:text-white'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {meta.name}
                </button>
              )
            })}
          </div>

          {/* Class filter chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 text-[10px] text-surface-600">
              <Filter className="w-3 h-3" /> Class:
            </div>
            <button
              onClick={() => setSelectedClass('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedClass === 'all'
                  ? 'bg-brand-500/20 text-brand-200'
                  : 'glass text-surface-600 hover:text-white'
              }`}
            >
              All
            </button>
            {availableClasses.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedClass === cls
                    ? 'bg-brand-500/20 text-brand-200'
                    : 'glass text-surface-600 hover:text-white'
                }`}
              >
                Class {cls}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-surface-600">
              Showing {filteredCount} of {totalGames} simulations
            </p>
            {(selectedSubject !== 'all' || selectedClass !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedSubject('all')
                  setSelectedClass('all')
                  setSearchQuery('')
                }}
                className="text-[11px] text-brand-300 hover:text-brand-200"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="glass-card p-12 text-center">
            <Loader2 className="w-8 h-8 text-brand-300 mx-auto mb-3 animate-spin" />
            <p className="text-sm text-surface-600">Loading simulations...</p>
          </div>
        )}

        {/* No results */}
        {!loading && filteredCount === 0 && (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-200/20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-surface-600" />
            </div>
            <p className="text-sm font-medium text-white mb-1">No simulations found</p>
            <p className="text-xs text-surface-600">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Games grouped by subject */}
        {!loading && filteredCount > 0 && (
          <div className="space-y-8">
            {Object.entries(gamesBySubject)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([subject, games]) => {
                const meta = getSubjectMeta(subject)
                const Icon = meta.icon
                return (
                  <div key={subject}>
                    {/* Subject header */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-8 h-8 rounded-lg ${meta.bg} ${meta.border} border flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${meta.color}`} />
                      </div>
                      <h3 className="font-display text-sm font-semibold text-white">{meta.name}</h3>
                      <span className="text-[10px] text-surface-600">({games.length})</span>
                    </div>

                    {/* Games grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {games.map((game, i) => (
                        <motion.div
                          key={game.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: Math.min(i * 0.03, 0.3) }}
                          whileHover={{ y: -4 }}
                          className="glass-card-hover p-5 cursor-pointer group"
                          onClick={() => setSelectedGame(game)}
                        >
                          <div className={`w-12 h-12 rounded-xl ${meta.bg} ${meta.border} border flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                            <span className="text-2xl">{game.emoji}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-white mb-1">{game.name}</h4>
                          <p className="text-[10px] text-surface-600 mb-3">
                            Class {game.classLevel} · {meta.name}
                          </p>
                          <div className="flex items-center gap-1 text-[10px] text-brand-300 mb-3">
                            <span>{game.nodeIds.length} topic{game.nodeIds.length !== 1 ? 's' : ''}</span>
                          </div>
                          <button className="btn-secondary w-full text-xs">
                            <Play className="w-3.5 h-3.5" />
                            Launch
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )
              })}
          </div>
        )}
      </div>

      {/* Game detail modal */}
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedGame(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-strong rounded-3xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{selectedGame.emoji}</div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{selectedGame.name}</h3>
                    <p className="text-xs text-surface-600">
                      Class {selectedGame.classLevel} · {getSubjectMeta(selectedGame.subject).name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="text-surface-600 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-200/20">
                  <span className="text-xs text-surface-600">Subject</span>
                  <span className="text-xs font-medium text-white">{getSubjectMeta(selectedGame.subject).name}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-200/20">
                  <span className="text-xs text-surface-600">Class Level</span>
                  <span className="text-xs font-medium text-white">Class {selectedGame.classLevel}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-200/20">
                  <span className="text-xs text-surface-600">Topics Covered</span>
                  <span className="text-xs font-medium text-white">{selectedGame.nodeIds.length}</span>
                </div>
                {selectedGame.nodeIds.length > 0 && (
                  <div className="p-3 rounded-xl bg-surface-200/20">
                    <p className="text-xs text-surface-600 mb-2">Related topics:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedGame.nodeIds.slice(0, 5).map((nodeId) => (
                        <span key={nodeId} className="px-2 py-1 rounded-lg bg-brand-500/15 text-[10px] text-brand-200">
                          {nodeId}
                        </span>
                      ))}
                      {selectedGame.nodeIds.length > 5 && (
                        <span className="px-2 py-1 text-[10px] text-surface-600">
                          +{selectedGame.nodeIds.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href={`/simulations/${selectedGame.id}`}
                className="btn-primary w-full justify-center"
              >
                <Play className="w-4 h-4" />
                Launch Simulation
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
