'use client'

import { motion } from 'framer-motion'
import { HelpCircle, Lightbulb, TrendingUp, Trophy } from 'lucide-react'

/**
 * ProgressTimeline — visual journey from "confused" to "mastered".
 * Shows the learning journey a student goes through with Prism.
 * Animated nodes that light up as the student "progresses".
 */

const STAGES = [
  {
    icon: HelpCircle,
    label: 'Confused',
    desc: "You don't know what you don't know.",
    color: '#FF6B6B',
  },
  {
    icon: Lightbulb,
    label: 'Scanned',
    desc: 'Atlas AI scans your knowledge. Finds your gaps.',
    color: '#FFD93D',
  },
  {
    icon: TrendingUp,
    label: 'Learning',
    desc: 'Socratic tutoring. Step by step. At your pace.',
    color: '#6BCB77',
  },
  {
    icon: Trophy,
    label: 'Mastered',
    desc: 'You own the concept. Your spectrum grows.',
    color: '#38BDF8',
  },
]

export function ProgressTimeline() {
  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute top-8 left-8 right-8 h-0.5 bg-surface-300/30 hidden md:block" />
      <motion.div
        className="absolute top-8 left-8 h-0.5 bg-spectrum-gradient hidden md:block"
        initial={{ width: 0 }}
        whileInView={{ width: 'calc(100% - 4rem)' }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="grid md:grid-cols-4 gap-6 md:gap-2 relative">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon
          return (
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: i * 0.3 }}
              className="flex flex-col items-center text-center relative"
            >
              {/* Node */}
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10 mb-4"
                style={{
                  background: `${stage.color}15`,
                  border: `1px solid ${stage.color}40`,
                }}
                whileHover={{ scale: 1.1 }}
                animate={{
                  boxShadow: [
                    `0 0 0px ${stage.color}00`,
                    `0 0 20px ${stage.color}40`,
                    `0 0 0px ${stage.color}00`,
                  ],
                }}
                transition={{
                  boxShadow: { duration: 2, delay: i * 0.5, repeat: Infinity },
                }}
              >
                <Icon className="w-7 h-7" style={{ color: stage.color }} />
              </motion.div>

              {/* Label */}
              <div className="font-display text-lg font-bold text-white mb-1">
                {stage.label}
              </div>
              <p className="text-sm text-surface-600 leading-relaxed max-w-[180px]">
                {stage.desc}
              </p>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
