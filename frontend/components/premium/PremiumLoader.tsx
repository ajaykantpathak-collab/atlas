'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PremiumLoaderProps {
  loading?: boolean
  label?: string
  className?: string
}

export function PremiumLoader({
  loading = true,
  label = 'Loading',
  className = '',
}: PremiumLoaderProps) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed inset-0 z-[10000] flex items-center justify-center bg-surface-0 ${className}`}
        >
          <div className="relative flex flex-col items-center gap-6">
            {/* Animated rings */}
            <div className="relative w-24 h-24">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-transparent"
                  style={{
                    borderTopColor: i === 0 ? '#6366f1' : i === 1 ? '#d946ef' : '#38bdf8',
                    borderRightColor: i === 0 ? '#6366f140' : i === 1 ? '#d946ef40' : '#38bdf840',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5 - i * 0.3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  initial={{ scale: 1 - i * 0.2, opacity: 1 - i * 0.2 }}
                />
              ))}
              {/* Center glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: '0 0 30px rgba(99,102,241,0.5)' }}
                animate={{ scale: [0.8, 1, 0.8], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Label with animated dots */}
            <div className="flex items-center gap-1">
              <span className="text-sm text-surface-600 font-medium">{label}</span>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1 h-1 rounded-full bg-brand-400"
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface SkeletonProps {
  className?: string
  rounded?: string
}

export function PremiumSkeleton({ className = '', rounded = 'rounded-xl' }: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden bg-surface-200/40 ${rounded} ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(99,102,241,0.1), transparent)',
          backgroundSize: '200% 100%',
        }}
        animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

interface ProgressBarProps {
  progress: number
  className?: string
  color?: string
  height?: string
}

export function PremiumProgress({
  progress,
  className = '',
  color = 'linear-gradient(90deg, #6366f1, #d946ef)',
  height = 'h-1.5',
}: ProgressBarProps) {
  return (
    <div className={`w-full ${height} bg-surface-200/40 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className={`h-full rounded-full relative`}
        style={{ background: color, width: `${progress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    </div>
  )
}
