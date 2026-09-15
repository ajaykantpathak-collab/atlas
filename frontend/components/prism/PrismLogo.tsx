'use client'

import { motion } from 'framer-motion'
import { PrismGraphOrb, PrismGraphWordmark, LivingGraph } from './LivingGraph'

/**
 * PrismLogo — the living graph orb. A small cluster of colored nodes
 * that pulse with warm energy. Used in every nav bar across the app.
 */
export function PrismLogo({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <PrismGraphOrb size={size} />
    </motion.div>
  )
}

/**
 * PrismGlow — glowing orb used as the "mascot" element.
 */
export function PrismGlow({ size = 80, intensity = 1, className = '' }: { size?: number; intensity?: number; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(217,70,239,0.15) 50%, transparent 70%)',
          opacity: intensity * 0.7,
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4 * intensity, 0.7 * intensity, 0.4 * intensity] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <PrismGraphOrb size={size * 0.85} />
      </motion.div>
    </div>
  )
}

/**
 * PrismWordmark — logo + "Prism" text. Used in navigation.
 */
export function PrismWordmark({ className = '' }: { className?: string }) {
  return <PrismGraphWordmark className={className} />
}

/**
 * PrismHeroGraph — full 3D graph for hero sections (dashboard).
 */
export function PrismHeroGraph({ className = '', interactive = false }: { className?: string; interactive?: boolean }) {
  return (
    <LivingGraph
      mode="hero"
      className={className}
      interactive={interactive}
      autoRotate
      density={100}
    />
  )
}

/**
 * PrismCardGraph — medium SVG graph for cards and auth pages.
 */
export function PrismCardGraph({ className = '' }: { className?: string }) {
  return (
    <LivingGraph
      mode="card"
      className={className}
      density={28}
    />
  )
}
