'use client'

import { motion } from 'framer-motion'

/**
 * FloatingFacts — "Did you know?" educational facts that float across the screen.
 * Pure CSS animations, lightweight. Adds an educational atmosphere without being distracting.
 */

const FACTS = [
  'A bolt of lightning contains enough energy to toast 100,000 slices of bread.',
  'The human brain uses 20% of your body\'s total energy, despite being 2% of your weight.',
  'Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs — still edible.',
  'Octopuses have three hearts and blue blood.',
  'A single cloud can weigh more than a million pounds.',
  'The speed of light is 299,792,458 m/s — fast enough to circle Earth 7.5 times per second.',
  'Bananas are radioactive. They contain potassium-40.',
  'Sharks existed before trees. Sharks: 400M years ago. Trees: 350M years ago.',
  'There are more possible chess games than atoms in the observable universe.',
  'Your body produces 25 million new cells every second.',
]

export function FloatingFacts() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {FACTS.map((fact, i) => {
        const left = (i * 37) % 80 + 10 // spread across 10-90%
        const delay = i * 8 // staggered start
        const duration = 25 + (i % 5) * 5
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100, x: `${left}%` }}
            animate={{
              opacity: [0, 0.15, 0.15, 0],
              y: [100, -200],
              x: [`${left}%`, `${left + (i % 2 === 0 ? 5 : -5)}%`],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute max-w-xs text-xs text-surface-600 leading-relaxed"
          >
            <span className="text-brand-400/40 font-medium">Did you know? </span>
            {fact}
          </motion.div>
        )
      })}
    </div>
  )
}
