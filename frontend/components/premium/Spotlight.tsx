'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SpotlightProps {
  children: ReactNode
  className?: string
  size?: number
  color?: string
}

export function Spotlight({
  children,
  className = '',
  size = 400,
  color = 'rgba(99,102,241,0.08)',
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const spot = spotlightRef.current
    if (!el || !spot) return

    function handleMove(e: MouseEvent) {
      if (!el || !spot) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      spot.style.background = `radial-gradient(${size}px circle at ${x}px ${y}px, ${color}, transparent 40%)`
    }

    function handleLeave() {
      if (!spot) return
      spot.style.background = 'transparent'
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [size, color])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

interface MarqueeProps {
  children: ReactNode
  className?: string
  speed?: number
  reverse?: boolean
}

export function Marquee({
  children,
  className = '',
  speed = 30,
  reverse = false,
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-4 whitespace-nowrap"
        animate={{ x: reverse ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="flex gap-4 shrink-0">{children}</div>
        <div className="flex gap-4 shrink-0" aria-hidden>{children}</div>
      </motion.div>
    </div>
  )
}

interface TypewriterProps {
  text: string
  className?: string
  speed?: number
  cursor?: boolean
  delay?: number
}

export function Typewriter({
  text,
  className = '',
  speed = 50,
  cursor = true,
  delay = 0,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let i = 0
    let timeoutId: number

    const startTimeout = setTimeout(() => {
      function type() {
        if (!el || i >= text.length) return
        el.textContent = text.slice(0, i + 1)
        i++
        timeoutId = window.setTimeout(type, speed)
      }
      type()
    }, delay)

    return () => {
      clearTimeout(startTimeout)
      clearTimeout(timeoutId)
    }
  }, [text, speed, delay])

  return (
    <span className={className}>
      <span ref={ref} />
      {cursor && (
        <motion.span
          className="inline-block w-0.5 h-[1em] bg-brand-400 ml-0.5 align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </span>
  )
}

interface BorderBeamProps {
  children: ReactNode
  className?: string
  color?: string
  duration?: number
}

export function BorderBeam({
  children,
  className = '',
  color = '#6366f1',
  duration = 4,
}: BorderBeamProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          backgroundSize: '200% 100%',
          maskImage: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
          maskComposite: 'exclude',
          padding: '1px',
          WebkitMaskImage: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
          WebkitMaskComposite: 'xor',
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
            backgroundSize: '50% 100%',
            backgroundRepeat: 'no-repeat',
          }}
          animate={{ backgroundPosition: ['200% 0', '-100% 0'] }}
          transition={{ duration, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      {children}
    </div>
  )
}
