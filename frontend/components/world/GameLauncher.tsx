'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, ArrowRight, RotateCcw, Trophy, Lock } from 'lucide-react'
import { getGameForNode, type GameMeta } from '@/lib/gameRegistry'
import { recordGameScore, getNodeMastery } from '@/lib/masteryStore'
import { speechManager } from '@/lib/sim-engine/speech'
import { AtlasDragon } from '@/components/sim-primitives/AtlasDragon'

/* ═══════════════════════════════════════════════════════════════════════════
   GameLauncher — Full-screen overlay that launches a game for a topic.

   Flow:
   1. Topic intro (dragon speaks, shows topic name + emoji)
   2. Game plays (the actual simulation component)
   3. Score screen (stars, celebration, world update prompt)
   4. Close → world reflects new mastery

   No text chat. No typing. Just tap, play, celebrate.
   ═══════════════════════════════════════════════════════════════════════════ */

interface GameLauncherProps {
  nodeId: string
  nodeTitle: string
  subject: string
  classLevel: number
  onClose: () => void
  onScoreRecorded?: (nodeId: string, score: number) => void
}

type Phase = 'intro' | 'playing' | 'score'

export function GameLauncher({ nodeId, nodeTitle, subject, classLevel, onClose, onScoreRecorded }: GameLauncherProps) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [score, setScore] = useState<number | null>(null)
  const [gameKey, setGameKey] = useState(0)
  const game = getGameForNode(nodeId)
  const previousMastery = useRef(getNodeMastery(nodeId))

  // ─── Speech ──────────────────────────────────────────────

  useEffect(() => {
    if (phase === 'intro') {
      speechManager.unlock()
      const intro = `Let's learn about ${nodeTitle}! Tap the play button when you're ready!`
      speechManager.speak(intro)
    } else if (phase === 'score' && score !== null) {
      speechManager.unlock()
      if (score >= 80) {
        speechManager.speak(`Amazing! You got ${score} percent! You're a star!`)
      } else if (score >= 50) {
        speechManager.speak(`Good job! You got ${score} percent. Let's try again to get even better!`)
      } else {
        speechManager.speak(`That's okay! Practice makes perfect. Let's try again!`)
      }
    }
  }, [phase, score, nodeTitle])

  // ─── Game completion handler ─────────────────────────────

  const handleGameComplete = useCallback((gameScore: number) => {
    setScore(gameScore)
    setPhase('score')

    // Record mastery for ALL nodes this game covers
    if (game) {
      recordGameScore(game.nodeIds, gameScore)
      onScoreRecorded?.(nodeId, gameScore)
    }
  }, [game, nodeId, onScoreRecorded])

  // ─── Replay ──────────────────────────────────────────────

  const handleReplay = useCallback(() => {
    setScore(null)
    setPhase('playing')
    setGameKey(k => k + 1)
  }, [])

  // ─── No game available ───────────────────────────────────

  if (!game) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0e0c18] flex items-center justify-center">
        <div className="text-center max-w-md p-8">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-white mb-2">{nodeTitle}</h2>
          <p className="text-white/60 mb-6">A game for this topic is coming soon!</p>
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
          >
            Back to World
          </button>
        </div>
      </div>
    )
  }

  // ─── Render ──────────────────────────────────────────────

  const GameComponent = game.component

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0c18] flex flex-col">
      {/* ─── Top bar ─── */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/40 backdrop-blur-md z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{game.emoji}</span>
          <div>
            <h2 className="text-white font-bold text-sm">{game.name}</h2>
            <p className="text-white/40 text-xs">{nodeTitle}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* ─── Main content ─── */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {/* ── Intro phase ── */}
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8"
            >
              {/* Dragon mascot */}
              <div className="mb-6 pointer-events-none">
                <AtlasDragon mood="idle" size={120} />
              </div>

              {/* Topic name */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center mb-8"
              >
                <div className="text-7xl mb-4">{game.emoji}</div>
                <h1 className="text-3xl font-bold text-white mb-2">{nodeTitle}</h1>
                <p className="text-white/50 text-lg">Let&apos;s learn and play!</p>
              </motion.div>

              {/* Play button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPhase('playing')}
                className="px-12 py-4 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white font-bold text-xl shadow-lg shadow-amber-500/30 transition-all"
              >
                ▶ Play!
              </motion.button>

              {/* Previous score (if any) */}
              {previousMastery.current && previousMastery.current.playCount > 0 && (
                <div className="mt-6 flex items-center gap-2 text-white/40 text-sm">
                  <Star size={14} className="text-amber-400" />
                  Best score: {previousMastery.current.bestScore}%
                </div>
              )}
            </motion.div>
          )}

          {/* ── Playing phase ── */}
          {phase === 'playing' && (
            <motion.div
              key={`playing-${gameKey}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <GameComponent
                key={gameKey}
                onComplete={handleGameComplete}
                width={typeof window !== 'undefined' ? window.innerWidth : 1200}
                height={typeof window !== 'undefined' ? window.innerHeight - 60 : 700}
              />
            </motion.div>
          )}

          {/* ── Score phase ── */}
          {phase === 'score' && score !== null && (
            <motion.div
              key="score"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-8"
            >
              {/* Dragon celebration */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="mb-6 pointer-events-none"
              >
                <AtlasDragon mood={score >= 80 ? 'celebrate' : 'idle'} size={120} />
              </motion.div>

              {/* Score display */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-8"
              >
                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2, 3].map(i => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
                    >
                      <Star
                        size={48}
                        className={score >= (i === 1 ? 30 : i === 2 ? 60 : 80) ? 'text-amber-400 fill-amber-400' : 'text-white/20'}
                      />
                    </motion.div>
                  ))}
                </div>
                <h1 className="text-5xl font-bold text-white mb-2">{score}%</h1>
                <p className="text-white/60 text-lg">
                  {score >= 80 ? 'Excellent! You mastered it!' : score >= 50 ? 'Good job! Keep practicing!' : 'Keep trying! You can do it!'}
                </p>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4"
              >
                <button
                  onClick={handleReplay}
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center gap-2 transition-colors"
                >
                  <RotateCcw size={18} />
                  Play Again
                </button>
                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-white font-bold flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all hover:scale-105"
                >
                  <ArrowRight size={18} />
                  Back to World
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
