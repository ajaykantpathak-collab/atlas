'use client'

import { motion } from 'framer-motion'
import { Brain, GraduationCap, Trophy, Compass } from 'lucide-react'
import { PrismLogo, PrismCardGraph } from '@/components/prism/PrismLogo'
import { GoldenGalaxy } from '@/components/prism/GoldenGalaxy'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#0a0a0f]">
      {/* Left panel — branding */}
      <div className="hidden lg:flex w-1/2 relative border-r border-white/10 flex-col justify-between p-12 overflow-hidden">
        {/* Ambient backdrop — the Atlas golden galaxy, dimmed */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <GoldenGalaxy className="absolute inset-0 w-full h-full opacity-40" />
          {/* Radial vignette */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(115% 100% at 50% 45%, transparent 50%, rgba(5,5,8,0.75) 100%)' }}
          />
        </div>

        {/* Wordmark — matches the Atlas front door */}
        <div className="relative z-10 flex items-center gap-2">
          <Compass className="w-6 h-6 text-gold-400" />
          <span className="font-display text-xl font-bold tracking-tight text-white">Atlas</span>
        </div>

        {/* Living graph visual */}
        <div className="relative z-10 my-8 flex justify-center">
          <PrismCardGraph className="opacity-80" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-white leading-tight">
              See every subject
              <br />
              <span className="spectrum-text">in a new light.</span>
            </h1>
            <p className="text-surface-700 text-lg mt-4 max-w-md">
              AI-powered learning for CBSE, ICSE &amp; ISC. All subjects, all classes. Diagnose gaps. Master concepts. Score higher.
            </p>
          </div>

          {/* Feature pills */}
          <div className="space-y-3 max-w-md">
            {[
              { icon: Brain, label: 'Socratic AI Tutor — guides you to answers, never just gives them', color: 'text-gold-300' },
              { icon: GraduationCap, label: 'A knowledge graph spanning CBSE, ICSE & ISC — concepts, prerequisites and gaps', color: 'text-mint-300' },
              { icon: Trophy, label: 'Streaks, XP, mastery rings, and adaptive learning paths', color: 'text-gold-400' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-3 glass-card px-4 py-3"
              >
                <f.icon className={`w-5 h-5 ${f.color} flex-shrink-0`} />
                <span className="text-sm text-surface-800">{f.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Atlas footer */}
        <div className="relative z-10 flex items-center gap-4">
          <PrismLogo size={48} />
          <div>
            <p className="text-sm text-white font-medium">Atlas</p>
            <p className="text-xs text-surface-700">Your learning companion</p>
          </div>
        </div>
      </div>

      {/* Right panel — auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-[#0a0a0f] relative">
        {/* Faint ambient glow behind the form panel */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          aria-hidden
          style={{ background: 'radial-gradient(60% 50% at 50% 0%, rgba(251,191,36,0.06) 0%, transparent 70%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <Compass className="w-7 h-7 text-gold-400" />
            <span className="font-display text-xl font-bold text-white">Atlas</span>
          </div>

          {children}
        </motion.div>
      </div>
    </div>
  )
}
