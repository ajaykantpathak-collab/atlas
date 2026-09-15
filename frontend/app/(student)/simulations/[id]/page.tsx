'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Play, Star, Clock, Sparkles,
  Loader2, AlertCircle, CheckCircle2, Trophy,
} from 'lucide-react'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { ALL_GAMES, getGameForNode, type GameMeta } from '@/lib/gameRegistry'
import { useAuthStore } from '@/stores/authStore'

// ─── Subject metadata (mirrors the simulations browser) ─────────────
const SUBJECT_META: Record<string, { name: string; color: string; bg: string; border: string }> = {
  physics:     { name: 'Physics',         color: 'text-brand-300',   bg: 'bg-brand-500/10',   border: 'border-brand-500/20' },
  chemistry:   { name: 'Chemistry',       color: 'text-accent-300',  bg: 'bg-accent-500/10',  border: 'border-accent-500/20' },
  biology:     { name: 'Biology',         color: 'text-mint-300',    bg: 'bg-mint-500/10',    border: 'border-mint-500/20' },
  maths:       { name: 'Mathematics',     color: 'text-gold-300',    bg: 'bg-gold-500/10',    border: 'border-gold-500/20' },
  science:     { name: 'Science',         color: 'text-cyan-300',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/20' },
  evs:         { name: 'EVS',             color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  geography:   { name: 'Geography',       color: 'text-blue-300',    bg: 'bg-blue-500/10',    border: 'border-blue-500/20' },
  history:     { name: 'History',         color: 'text-amber-300',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20' },
  cs:          { name: 'Computer Science',color: 'text-purple-300',  bg: 'bg-purple-500/10',  border: 'border-purple-500/20' },
  general:     { name: 'General',         color: 'text-pink-300',    bg: 'bg-pink-500/10',    border: 'border-pink-500/20' },
}

function getSubjectMeta(subject: string) {
  const key = subject.toLowerCase().trim()
  if (key.includes('phys')) return SUBJECT_META.physics
  if (key.includes('chem')) return SUBJECT_META.chemistry
  if (key.includes('bio')) return SUBJECT_META.biology
  if (key.includes('math')) return SUBJECT_META.maths
  if (key.includes('sci')) return SUBJECT_META.science
  if (key.includes('evs')) return SUBJECT_META.evs
  if (key.includes('geo')) return SUBJECT_META.geography
  if (key.includes('hist')) return SUBJECT_META.history
  if (key.includes('comp') || key.includes('cs')) return SUBJECT_META.cs
  return SUBJECT_META.general
}

// ─── Loading fallback ────────────────────────────────────────────────
function SimulationLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-brand-400" />
        <p className="text-white/60 text-sm">Loading simulation...</p>
      </div>
    </div>
  )
}

// ─── Not-found state ─────────────────────────────────────────────────
function SimulationNotFound({ id }: { id: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px] px-6">
      <div className="text-center space-y-4 max-w-md">
        <AlertCircle className="w-16 h-16 mx-auto text-red-400" />
        <h2 className="text-xl font-bold text-white">Simulation not found</h2>
        <p className="text-white/60 text-sm">
          The simulation <code className="px-1.5 py-0.5 bg-white/10 rounded text-brand-300">{id}</code> doesn&apos;t exist in the registry.
        </p>
        <Link href="/simulations" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Simulations
        </Link>
      </div>
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────
export default function SimulationLaunchPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuthStore()
  const id = params?.id as string

  const [started, setStarted] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Look up the game from the registry
  const game = useMemo<GameMeta | null>(() => {
    if (!id) return null
    return ALL_GAMES.find(g => g.id === id) || getGameForNode(id) || null
  }, [id])

  const subjectMeta = game ? getSubjectMeta(game.subject) : SUBJECT_META.general

  // Reset state when game changes
  useEffect(() => {
    setStarted(false)
    setCompleted(false)
    setScore(null)
    setError(null)
  }, [id])

  // ─── Handle completion ─────────────────────────────────────────────
  const handleComplete = (finalScore: number) => {
    setScore(finalScore)
    setCompleted(true)
  }

  // ─── Render ────────────────────────────────────────────────────────
  if (!game) {
    return (
      <div className="min-h-screen bg-bg-base">
        <Header />
        <SimulationNotFound id={id} />
      </div>
    )
  }

  const GameComponent = game.component

  return (
    <div className="min-h-screen bg-bg-base">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* ─── Breadcrumb ───────────────────────────────────────────── */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link href="/simulations" className="hover:text-white/80 transition-colors">
            Simulations
          </Link>
          <span>/</span>
          <span className="text-white/80">{game.name}</span>
        </div>

        {/* ─── Game info card ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl border ${subjectMeta.border} ${subjectMeta.bg} p-6 mb-6`}
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">{game.emoji}</div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-white">{game.name}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                <span className={`px-2.5 py-1 rounded-full ${subjectMeta.bg} ${subjectMeta.color} ${subjectMeta.border} border`}>
                  {subjectMeta.name}
                </span>
                <span className="text-white/50">Class {game.classLevel}</span>
                {game.nodeIds.length > 0 && (
                  <span className="text-white/40 text-xs">
                    {game.nodeIds.length} curriculum node{game.nodeIds.length !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ─── Game area ────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {!started && !completed && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center space-y-6"
            >
              <div className="space-y-2">
                <Sparkles className="w-10 h-10 mx-auto text-brand-400" />
                <h2 className="text-xl font-semibold text-white">Ready to start?</h2>
                <p className="text-white/60 text-sm max-w-md mx-auto">
                  This interactive simulation will help you master the concepts covered by this topic.
                  Take your time and explore!
                </p>
              </div>
              <button
                onClick={() => setStarted(true)}
                className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3"
              >
                <Play className="w-5 h-5" />
                Start Simulation
              </button>
            </motion.div>
          )}

          {started && !completed && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6"
            >
              <Suspense fallback={<SimulationLoading />}>
                <div className="w-full flex items-center justify-center min-h-[500px]">
                  <GameComponent
                    onComplete={handleComplete}
                    width={900}
                    height={600}
                  />
                </div>
              </Suspense>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setStarted(false)}
                  className="text-sm text-white/50 hover:text-white/80 transition-colors"
                >
                  Pause & go back
                </button>
              </div>
            </motion.div>
          )}

          {completed && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center space-y-6"
            >
              <Trophy className="w-16 h-16 mx-auto text-gold-400" />
              <h2 className="text-2xl font-bold text-white">Simulation Complete!</h2>
              {score !== null && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20">
                  <Star className="w-5 h-5 text-gold-400" />
                  <span className="text-gold-300 font-semibold">Score: {score}</span>
                </div>
              )}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => { setStarted(false); setCompleted(false); setScore(null) }}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Play className="w-4 h-4" /> Try Again
                </button>
                <Link href="/simulations" className="btn-secondary inline-flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back to Browse
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Related nodes ────────────────────────────────────────── */}
        {game.nodeIds.length > 0 && (
          <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-sm font-semibold text-white/80 mb-3">Curriculum nodes covered</h3>
            <div className="flex flex-wrap gap-2">
              {game.nodeIds.map(nid => (
                <span
                  key={nid}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60 font-mono"
                >
                  {nid}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Header component ────────────────────────────────────────────────
function Header() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-bg-base/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/simulations" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Simulations</span>
        </Link>
        <PrismLogo size={32} />
      </div>
    </header>
  )
}
