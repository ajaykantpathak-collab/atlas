'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useMemo } from 'react'

export type AuraState = 'idle' | 'thinking' | 'answering' | 'celebrating' | 'error'

interface AIAuraProps {
  state?: AuraState
  size?: number
  className?: string
}

const STATE_COLORS: Record<AuraState, { primary: string; secondary: string; glow: string }> = {
  idle: { primary: '#6366f1', secondary: '#8b5cf6', glow: 'rgba(99,102,241,0.4)' },
  thinking: { primary: '#818cf8', secondary: '#6366f1', glow: 'rgba(129,140,248,0.5)' },
  answering: { primary: '#a5b4fc', secondary: '#8b5cf6', glow: 'rgba(165,180,252,0.6)' },
  celebrating: { primary: '#fbbf24', secondary: '#f59e0b', glow: 'rgba(251,191,36,0.5)' },
  error: { primary: '#ef4444', secondary: '#dc2626', glow: 'rgba(239,68,68,0.4)' },
}

export function AIAura({ state = 'idle', size = 48, className = '' }: AIAuraProps) {
  const colors = STATE_COLORS[state]
  const halfSize = size / 2

  // Spring-based wobble for organic movement
  const rotate = useSpring(useMotionValue(0), { stiffness: 50, damping: 10 })
  const scale = useSpring(useMotionValue(1), { stiffness: 100, damping: 15 })

  // Different animation configs per state
  const animationConfig = useMemo(() => {
    switch (state) {
      case 'thinking':
        return {
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.08, 1],
          duration: 3,
          borderRadius: ['50%', '40% 60% 50% 50%', '60% 40% 50% 50%', '40% 60% 50% 50%', '50%'],
        }
      case 'answering':
        return {
          rotate: [0, 45, 0, -45, 0],
          scale: [1, 1.12, 1],
          duration: 1.5,
          borderRadius: ['50%', '45% 55% 50% 50%', '50%'],
        }
      case 'celebrating':
        return {
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          duration: 0.8,
          borderRadius: ['50%', '30% 70% 40% 60%', '50%'],
        }
      case 'error':
        return {
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 0.95, 1],
          duration: 0.5,
          borderRadius: ['50%'],
        }
      default: // idle
        return {
          rotate: [0, 180, 360],
          scale: [1, 1.05, 1],
          duration: 8,
          borderRadius: ['50%', '48% 52% 50% 50%', '50%'],
        }
    }
  }, [state])

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer glow */}
      <motion.div
        animate={{
          opacity: state === 'idle' ? [0.3, 0.5, 0.3] : [0.5, 0.8, 0.5],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: animationConfig.duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-full blur-xl"
        style={{ background: colors.glow }}
      />

      {/* Orbiting particles for thinking/answering states */}
      {(state === 'thinking' || state === 'answering') && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute inset-0"
            >
              <motion.div
                animate={{
                  scale: [0.5, 1, 0.5],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  background: colors.primary,
                  top: '0%',
                  left: '50%',
                  transform: `translateX(-50%)`,
                  boxShadow: `0 0 8px ${colors.glow}`,
                }}
              />
            </motion.div>
          ))}
        </>
      )}

      {/* Main orb */}
      <motion.div
        animate={{
          rotate: animationConfig.rotate,
          scale: animationConfig.scale,
          borderRadius: animationConfig.borderRadius,
        }}
        transition={{
          duration: animationConfig.duration,
          repeat: Infinity,
          ease: state === 'celebrating' ? 'easeOut' : 'easeInOut',
        }}
        className="relative"
        style={{
          width: size * 0.75,
          height: size * 0.75,
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          boxShadow: `0 0 ${size * 0.3}px ${colors.glow}, inset 0 0 ${size * 0.15}px rgba(255,255,255,0.2)`,
        }}
      >
        {/* Inner shine */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: animationConfig.duration * 0.7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute rounded-full"
          style={{
            top: '15%',
            left: '15%',
            width: '30%',
            height: '30%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
          }}
        />

        {/* Ripple effect for answering */}
        {state === 'answering' && (
          <motion.div
            animate={{
              scale: [1, 2],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: colors.primary }}
          />
        )}

        {/* Burst particles for celebrating */}
        {state === 'celebrating' && (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => {
              const angle = (i / 6) * Math.PI * 2
              const distance = size * 0.6
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                  style={{
                    background: colors.primary,
                    boxShadow: `0 0 6px ${colors.glow}`,
                  }}
                />
              )
            })}
          </>
        )}
      </motion.div>
    </div>
  )
}
