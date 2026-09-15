'use client'

import { motion } from 'framer-motion'

/**
 * Skeleton loader primitives for loading states.
 * Use these instead of spinner-only loading states for perceived performance.
 */

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-surface-200/40 ${className}`}
      aria-hidden="true"
    />
  )
}

export function SkeletonCard({ className = '' }: SkeletonProps) {
  return (
    <div className={`glass-card rounded-2xl p-6 ${className}`}>
      <Skeleton className="h-4 w-24 mb-4" />
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-3 w-full mb-3" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}

export function SkeletonGrid({ count = 4, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonList({ count = 5, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
          <div className="flex-1">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonPage({ className = '' }: SkeletonProps) {
  return (
    <div className={`max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 ${className}`}>
      {/* Top bar skeleton */}
      <div className="glass-strong border-b border-surface-300/30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      {/* Stats skeleton */}
      <SkeletonGrid count={4} />
      {/* Content skeleton */}
      <div className="glass-card rounded-3xl p-6 md:p-8">
        <Skeleton className="h-6 w-48 mb-6" />
        <SkeletonList count={4} />
      </div>
    </div>
  )
}

/**
 * Animated loading dots for inline loading states.
 */
export function LoadingDots({ className = '' }: SkeletonProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-brand-400"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  )
}

export default Skeleton
