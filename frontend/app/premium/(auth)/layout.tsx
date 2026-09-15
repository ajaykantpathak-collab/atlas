'use client'

import { motion } from 'framer-motion'
import { Sparkles, GraduationCap, Brain, Trophy } from 'lucide-react'
import {
  CustomCursor, AuroraBackground, GradientOrb,
  StaggerContainer, StaggerItem, TextReveal,
} from '@/components/premium'

export default function PremiumAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <CustomCursor />
      <AuroraBackground intensity="medium" speed="slow" />

      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 relative mesh-bg border-r border-surface-300/30 flex-col justify-between p-12 overflow-hidden">
        <GradientOrb className="top-20 right-20" size={256} speed={8} />
        <GradientOrb className="bottom-20 left-10" size={320} colors={['#d946ef', '#38bdf8', '#6366f1']} speed={10} />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold text-white">
            Prism
          </span>
        </div>

        <div className="relative z-10 space-y-8">
          <StaggerContainer stagger={0.15}>
            <StaggerItem>
              <h1 className="font-display text-4xl font-bold text-white leading-tight">
                <TextReveal text="Your AI tutor" />
                <br />
                <TextReveal text="figures it out" delay={0.3} className="text-aurora" />
                <br />
                <TextReveal text="with you." delay={0.6} />
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="text-surface-600 text-lg mt-4 max-w-md">
                Adaptive learning, Socratic tutoring, and gamified mastery for CBSE & CISCE — Class 1 to 12.
              </p>
            </StaggerItem>

            <div className="space-y-3 max-w-md">
              {[
                { icon: Brain, label: 'AI Socratic Tutor — never gives answers, asks questions', color: 'text-brand-300' },
                { icon: GraduationCap, label: '20,000+ knowledge nodes across all subjects', color: 'text-accent-300' },
                { icon: Trophy, label: 'Spaced repetition + mastery tracking + gamification', color: 'text-gold-300' },
              ].map((f, i) => (
                <StaggerItem key={i}>
                  <motion.div
                    className="flex items-center gap-3 glass-card rounded-xl px-4 py-3"
                  >
                    <f.icon className={`w-5 h-5 ${f.color} flex-shrink-0`} />
                    <span className="text-sm text-surface-700">{f.label}</span>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </div>

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow"><Brain className="w-5 h-5 text-white" /></div>
          <div>
            <p className="text-sm text-white font-medium">Prism AI</p>
            <p className="text-xs text-surface-600">Your personal learning companion</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 mesh-bg relative overflow-hidden">
        <GradientOrb className="top-10 right-10 opacity-50" size={300} speed={12} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md relative z-10"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white">
              Prism
            </span>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  )
}
