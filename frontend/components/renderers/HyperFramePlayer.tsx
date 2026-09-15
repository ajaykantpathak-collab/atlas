'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect, type ReactNode } from 'react'
import {
  ChevronLeft, ChevronRight, Play, Pause, Maximize2,
  RotateCcw, CheckCircle2, type LucideIcon,
} from 'lucide-react'

export interface HyperFrame {
  id: string
  type: 'text' | 'diagram' | 'video' | 'quiz' | 'interactive'
  title: string
  content?: ReactNode
  duration?: number
}

interface HyperFramePlayerProps {
  frames: HyperFrame[]
  onComplete?: () => void
  className?: string
}

export function HyperFramePlayer({ frames, onComplete, className = '' }: HyperFramePlayerProps) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState<Set<number>>(new Set())
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const frame = frames[currentFrame]
  const isLast = currentFrame === frames.length - 1

  useEffect(() => {
    if (!isPlaying || !frame.duration) return

    timerRef.current = setInterval(() => {
      setProgress((p) => {
        const next = p + (100 / (frame.duration! * 10))
        if (next >= 100) {
          setIsPlaying(false)
          setCompleted((c) => new Set(c).add(currentFrame))
          if (isLast && onComplete) onComplete()
          return 100
        }
        return next
      })
    }, 100)

    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [isPlaying, frame.duration, currentFrame, isLast, onComplete])

  const goToFrame = (idx: number) => {
    if (idx < 0 || idx >= frames.length) return
    setCurrentFrame(idx)
    setProgress(0)
    setIsPlaying(false)
  }

  const nextFrame = () => {
    if (isLast) {
      setCompleted((c) => new Set(c).add(currentFrame))
      if (onComplete) onComplete()
      return
    }
    setCompleted((c) => new Set(c).add(currentFrame))
    goToFrame(currentFrame + 1)
  }

  const prevFrame = () => goToFrame(currentFrame - 1)

  return (
    <div className={`hyper-frame ${className}`}>
      {/* Progress segments */}
      <div className="flex gap-1.5 p-4 pb-0">
        {frames.map((_, i) => (
          <button
            key={i}
            onClick={() => goToFrame(i)}
            className={`progress-segment ${
              i === currentFrame ? 'progress-segment-active scale-y-150' : ''
            } ${completed.has(i) ? 'bg-accent-500/50' : ''}`}
          />
        ))}
      </div>

      {/* Frame content */}
      <div className="p-6 min-h-[300px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={frame.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-semibold text-surface-900">
                {frame.title}
              </h3>
              <span className="text-xs text-surface-600 font-mono">
                {currentFrame + 1} / {frames.length}
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              {frame.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-4 border-t border-surface-300/30">
        <button
          onClick={prevFrame}
          disabled={currentFrame === 0}
          className="btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-2">
          {frame.duration && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
            >
              {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
            </button>
          )}
          {completed.has(currentFrame) && (
            <CheckCircle2 className="w-5 h-5 text-accent-400" />
          )}
        </div>

        <button
          onClick={nextFrame}
          className="btn-primary"
        >
          {isLast ? 'Finish' : 'Next'}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
