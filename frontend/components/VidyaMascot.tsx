'use client'

import { motion } from 'framer-motion'
import { type ReactNode, useEffect, useState } from 'react'

type VidyaMood = 'idle' | 'happy' | 'thinking' | 'celebrating' | 'encouraging' | 'curious' | 'sleepy'

interface VidyaMascotProps {
  mood?: VidyaMood
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children?: ReactNode
}

const moodConfig: Record<VidyaMood, {
  body: string
  bodyLight: string
  glow: string
  antenna: string
  orb: string
  eyeShape: 'round' | 'happy' | 'thinking' | 'star' | 'sleepy' | 'wide'
  mouthShape: 'smile' | 'open' | 'flat' | 'o' | 'sleepy'
  blush: boolean
}> = {
  idle:        { body: '#a855f7', bodyLight: '#c084fc', glow: 'rgba(168,85,247,0.3)',   antenna: '#d8b4fe', orb: '#c084fc', eyeShape: 'round',    mouthShape: 'smile',  blush: false },
  happy:       { body: '#a855f7', bodyLight: '#c084fc', glow: 'rgba(192,132,252,0.4)',  antenna: '#d8b4fe', orb: '#fda4af', eyeShape: 'happy',    mouthShape: 'open',   blush: true  },
  thinking:    { body: '#7c3aed', bodyLight: '#a855f7', glow: 'rgba(124,58,237,0.3)',   antenna: '#c084fc', orb: '#38bdf8', eyeShape: 'thinking', mouthShape: 'flat',   blush: false },
  celebrating: { body: '#10b981', bodyLight: '#34d399', glow: 'rgba(52,211,153,0.4)',   antenna: '#6ee7b7', orb: '#fcd34d', eyeShape: 'star',     mouthShape: 'open',   blush: true  },
  encouraging: { body: '#f43f5e', bodyLight: '#fb7185', glow: 'rgba(244,63,94,0.35)',   antenna: '#fda4af', orb: '#fcd34d', eyeShape: 'round',    mouthShape: 'smile',  blush: true  },
  curious:     { body: '#a855f7', bodyLight: '#c084fc', glow: 'rgba(168,85,247,0.35)',  antenna: '#d8b4fe', orb: '#38bdf8', eyeShape: 'wide',     mouthShape: 'o',      blush: false },
  sleepy:      { body: '#6b21a8', bodyLight: '#9333ea', glow: 'rgba(107,33,168,0.2)',   antenna: '#a855f7', orb: '#7c3aed', eyeShape: 'sleepy',   mouthShape: 'sleepy', blush: false },
}

const sizeMap = {
  sm: { w: 52,  h: 64  },
  md: { w: 80,  h: 96  },
  lg: { w: 130, h: 156 },
}

export function VidyaMascot({
  mood = 'idle',
  message,
  size = 'md',
  className = '',
  children,
}: VidyaMascotProps) {
  const cfg = moodConfig[mood]
  const dims = sizeMap[size]
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 150)
    }, 3000 + Math.random() * 2000)
    return () => clearInterval(interval)
  }, [])

  const Eye = ({ cx, isLeft }: { cx: number; isLeft: boolean }) => {
    const cy = 40
    const r = 5

    if (cfg.eyeShape === 'happy') {
      return (
        <path
          d={`M ${cx - r} ${cy} Q ${cx} ${cy - r * 1.6} ${cx + r} ${cy}`}
          fill="none"
          stroke="#1a1a24"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      )
    }

    if (cfg.eyeShape === 'star') {
      return (
        <g transform={`translate(${cx}, ${cy})`}>
          <path
            d="M 0 -5.5 L 1.5 -1.5 L 5.5 0 L 1.5 1.5 L 0 5.5 L -1.5 1.5 L -5.5 0 L -1.5 -1.5 Z"
            fill="#1a1a24"
          />
        </g>
      )
    }

    if (cfg.eyeShape === 'sleepy') {
      return (
        <path
          d={`M ${cx - r} ${cy} Q ${cx} ${cy + 2.5} ${cx + r} ${cy}`}
          fill="none"
          stroke="#1a1a24"
          strokeWidth={2}
          strokeLinecap="round"
        />
      )
    }

    if (cfg.eyeShape === 'thinking') {
      return (
        <g>
          <ellipse cx={cx} cy={cy} rx={r} ry={blink ? 0.5 : r} fill="#1a1a24" />
          {!blink && isLeft && (
            <circle cx={cx - 1.5} cy={cy - 1.5} r={1.8} fill="#fff" opacity={0.85} />
          )}
        </g>
      )
    }

    if (cfg.eyeShape === 'wide') {
      return (
        <g>
          <circle cx={cx} cy={cy} r={r + 1.5} fill="#fff" />
          <circle cx={cx} cy={cy} r={r - 0.5} fill="#1a1a24" />
          <circle cx={cx - 1.5} cy={cy - 1.5} r={1.8} fill="#fff" />
        </g>
      )
    }

    return (
      <g>
        <ellipse cx={cx} cy={cy} rx={r} ry={blink ? 0.5 : r} fill="#1a1a24" />
        {!blink && (
          <circle cx={cx - 1.5} cy={cy - 1.5} r={1.8} fill="#fff" opacity={0.85} />
        )}
      </g>
    )
  }

  const Mouth = () => {
    const cx = 36
    const cy = 52

    if (cfg.mouthShape === 'open') {
      return <ellipse cx={cx} cy={cy} rx={4.5} ry={3.5} fill="#1a1a24" opacity={0.75} />
    }
    if (cfg.mouthShape === 'flat') {
      return (
        <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy}
          stroke="#1a1a24" strokeWidth={2} strokeLinecap="round" />
      )
    }
    if (cfg.mouthShape === 'o') {
      return <circle cx={cx} cy={cy} r={3} fill="#1a1a24" opacity={0.7} />
    }
    if (cfg.mouthShape === 'sleepy') {
      return <ellipse cx={cx} cy={cy + 1} rx={2.5} ry={1.2} fill="#1a1a24" opacity={0.5} />
    }
    return (
      <path
        d={`M ${cx - 5} ${cy} Q ${cx} ${cy + 4} ${cx + 5} ${cy}`}
        fill="none"
        stroke="#1a1a24"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    )
  }

  const floatAnim =
    mood === 'celebrating'
      ? { y: [0, -14, 0], rotate: [0, 4, -4, 0] }
      : mood === 'sleepy'
      ? { y: [0, -3, 0] }
      : { y: [0, -7, 0] }

  const floatTransition = {
    duration: mood === 'celebrating' ? 0.7 : mood === 'sleepy' ? 4.5 : 3.2,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  }

  const uid = `${mood}-${size}`

  return (
    <div className={`flex items-end gap-3 ${className}`}>
      <motion.div
        animate={floatAnim}
        transition={floatTransition}
        className="flex-shrink-0 relative"
        style={{ width: dims.w, height: dims.h }}
      >
        {/* Ambient glow */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 25px ${cfg.glow}, 0 0 50px ${cfg.glow}` }}
        />

        <svg viewBox="0 0 72 90" width={dims.w} height={dims.h} className="relative">
          <defs>
            <radialGradient id={`body-grad-${uid}`} cx="38%" cy="32%">
              <stop offset="0%" stopColor={cfg.bodyLight} stopOpacity="1" />
              <stop offset="60%" stopColor={cfg.body} stopOpacity="1" />
              <stop offset="100%" stopColor={cfg.body} stopOpacity="0.85" />
            </radialGradient>
            <radialGradient id={`core-grad-${uid}`} cx="50%" cy="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="50%" stopColor={cfg.bodyLight} stopOpacity="0.6" />
              <stop offset="100%" stopColor={cfg.body} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`antenna-grad-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={cfg.antenna} stopOpacity="1" />
              <stop offset="100%" stopColor={cfg.body} stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Antenna */}
          <motion.g
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '36px 20px' }}
          >
            <line x1="36" y1="20" x2="36" y2="10" stroke={`url(#antenna-grad-${uid})`} strokeWidth="1.5" strokeLinecap="round" />
            <motion.circle
              cx="36" cy="8" r="3"
              fill={cfg.antenna}
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <circle cx="36" cy="8" r="5" fill={cfg.antenna} opacity="0.2" />
          </motion.g>

          {/* Floating orb companion */}
          <motion.g
            animate={{
              x: [0, 8, 0, -8, 0],
              y: [0, -4, -8, -4, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="58" cy="28" r="3.5" fill={cfg.orb} opacity="0.8" />
            <circle cx="58" cy="28" r="5.5" fill={cfg.orb} opacity="0.15" />
          </motion.g>

          {/* Body — rounded creature shape */}
          <motion.g
            animate={
              mood === 'celebrating'
                ? { scaleY: [1, 0.92, 1], scaleX: [1, 1.08, 1] }
                : mood === 'curious'
                ? { scaleY: [1, 1.04, 1] }
                : {}
            }
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '36px 52px' }}
          >
            {/* Ground shadow */}
            <ellipse cx="36" cy="82" rx="18" ry="3" fill="#000" opacity="0.12" />

            {/* Main body — egg/teardrop shape, wider at bottom */}
            <path
              d="M 36 20
                 C 22 20 16 30 16 44
                 C 16 58 22 72 36 76
                 C 50 76 56 58 56 44
                 C 56 30 50 20 36 20 Z"
              fill={`url(#body-grad-${uid})`}
              stroke={cfg.body}
              strokeWidth="0.5"
              opacity="0.95"
            />

            {/* Inner glow core */}
            <motion.ellipse
              cx="36" cy="48" rx="14" ry="18"
              fill={`url(#core-grad-${uid})`}
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Highlight shine */}
            <ellipse cx="27" cy="32" rx="7" ry="5" fill="#fff" opacity="0.18" />

            {/* Eyes */}
            <Eye cx={27} isLeft={true} />
            <Eye cx={45} isLeft={false} />

            {/* Blush */}
            {cfg.blush && (
              <>
                <circle cx="20" cy="48" r="3.5" fill="#f87171" opacity="0.25" />
                <circle cx="52" cy="48" r="3.5" fill="#f87171" opacity="0.25" />
              </>
            )}

            {/* Mouth */}
            <Mouth />

            {/* Celebration sparkles */}
            {mood === 'celebrating' && (
              <>
                <motion.g
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ transformOrigin: '12px 30px' }}
                >
                  <path d="M 12 26 L 13 29 L 16 30 L 13 31 L 12 34 L 11 31 L 8 30 L 11 29 Z" fill={cfg.antenna} />
                </motion.g>
                <motion.g
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
                  style={{ transformOrigin: '60px 40px' }}
                >
                  <path d="M 60 36 L 61 39 L 64 40 L 61 41 L 60 44 L 59 41 L 56 40 L 59 39 Z" fill={cfg.orb} />
                </motion.g>
              </>
            )}

            {/* Thinking dots */}
            {mood === 'thinking' && (
              <>
                <motion.circle cx="52" cy="24" r="1.5" fill={cfg.antenna}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.circle cx="56" cy="20" r="1.2" fill={cfg.antenna}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                />
                <motion.circle cx="60" cy="16" r="1" fill={cfg.antenna}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                />
              </>
            )}
          </motion.g>
        </svg>
      </motion.div>

      {(message || children) && (
        <motion.div
          initial={{ opacity: 0, x: -10, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mascot-bubble flex-1"
        >
          <div className="text-surface-800 text-sm leading-relaxed">
            {message || children}
          </div>
        </motion.div>
      )}
    </div>
  )
}
