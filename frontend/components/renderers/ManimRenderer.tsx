'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Play, Pause, RotateCcw, Sparkles } from 'lucide-react'

export interface ManimRendererProps {
  sceneName: string
  description?: string
  // In production, this would import manim-web and run the scene
  // For now, we render a styled placeholder with the scene description
  sceneData?: {
    objects?: { type: string; label: string; color: string }[]
    steps?: string[]
  }
}

export function ManimRenderer({ sceneName, description, sceneData }: ManimRendererProps) {
  const [playing, setPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const canvasRef = useRef<HTMLDivElement>(null)

  // TODO: Replace with actual manim-web integration
  // import { Scene, Circle, Create } from 'manim-web'
  // const scene = new Scene(canvasRef.current, { width: 800, height: 450 })
  // await scene.play(new Create(circle))

  const steps = sceneData?.steps || ['Animation loads...', 'Objects appear', 'Transformation plays', 'Final state']

  useEffect(() => {
    if (!playing) return
    if (currentStep >= steps.length) {
      setPlaying(false)
      return
    }
    const timer = setTimeout(() => setCurrentStep(prev => prev + 1), 1500)
    return () => clearTimeout(timer)
  }, [playing, currentStep, steps.length])

  const reset = () => {
    setCurrentStep(0)
    setPlaying(false)
  }

  return (
    <div className="w-full">
      <div
        ref={canvasRef}
        className="relative w-full aspect-video rounded-2xl glass-card overflow-hidden flex items-center justify-center"
        style={{ background: 'radial-gradient(ellipse at center, #1a1530 0%, #131118 100%)' }}
      >
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#a855f7" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Coordinate axes */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 450">
          <line x1="400" y1="50" x2="400" y2="400" stroke="#a855f7" strokeWidth="1.5" opacity="0.4" />
          <line x1="100" y1="225" x2="700" y2="225" stroke="#a855f7" strokeWidth="1.5" opacity="0.4" />
          {sceneData?.objects?.map((obj, i) => {
            const visible = playing && currentStep > i
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <circle
                  cx={150 + i * 120}
                  cy={225}
                  r="30"
                  fill={obj.color}
                  opacity="0.3"
                  stroke={obj.color}
                  strokeWidth="2"
                />
                <text
                  x={150 + i * 120}
                  y={280}
                  textAnchor="middle"
                  fill={obj.color}
                  fontSize="14"
                  fontFamily="monospace"
                >
                  {obj.label}
                </text>
              </motion.g>
            )
          })}
        </svg>

        {/* Step indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-300" />
          <span className="text-xs text-surface-600 font-mono">{sceneName}</span>
        </div>

        {/* Step counter */}
        <div className="absolute top-4 right-4 flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i < currentStep ? 'bg-brand-400' : 'bg-surface-300/40'
              }`}
            />
          ))}
        </div>

        {/* Center play button */}
        {!playing && currentStep === 0 && (
          <button
            onClick={() => setPlaying(true)}
            className="relative z-10 w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center shadow-glow hover:scale-110 transition-transform"
          >
            <Play className="w-6 h-6 text-white ml-1" />
          </button>
        )}

        {/* Controls */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setPlaying(!playing)}
              className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors"
            >
              {playing ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
            </button>
            <button
              onClick={reset}
              className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:bg-surface-200/60 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </button>
          </div>
          {description && (
            <p className="text-xs text-surface-600 max-w-xs text-right">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
