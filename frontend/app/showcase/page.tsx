'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, ArrowRight, Brain, Zap, Trophy, Target,
  BookOpen, WifiOff, Languages, PenTool, LineChart,
  Code2, Eye, MousePointer2, Layers, Globe,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import {
  AuroraBackground, CustomCursor, MagneticButton,
  TiltCard, ScrollReveal, AnimatedCounter,
  PremiumLoader, PremiumSkeleton, PremiumProgress,
  GlowCard, RippleButton, TextReveal, GradientOrb,
  Spotlight, Marquee, Typewriter, BorderBeam,
  StaggerContainer, StaggerItem,
} from '@/components/premium'

// three.js components load on demand so the WebGL bundle never blocks first paint
const ShaderBackground = dynamic(
  () => import('@/components/premium/ShaderBackground').then((m) => m.ShaderBackground),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-surface-0" /> }
)
const ParticleField = dynamic(
  () => import('@/components/premium/ParticleField').then((m) => m.ParticleField),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-surface-0" /> }
)
const KnowledgeGraph3D = dynamic(
  () => import('@/components/premium/KnowledgeGraph3D').then((m) => m.KnowledgeGraph3D),
  { ssr: false, loading: () => <div className="w-full h-full bg-surface-100/20 rounded-3xl animate-pulse" /> }
)

export default function ShowcasePage() {
  const [loading, setLoading] = useState(false)
  const [cursorEnabled, setCursorEnabled] = useState(true)
  const [bgMode, setBgMode] = useState<'aurora' | 'shader' | 'particles'>('aurora')

  return (
    <div className="min-h-screen bg-surface-0 overflow-x-hidden">
      <CustomCursor enabled={cursorEnabled} />

      {/* Background layer */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <AnimatePresence mode="wait">
          {bgMode === 'aurora' && <AuroraBackground key="aurora" intensity="vibrant" speed="normal" />}
          {bgMode === 'shader' && <ShaderBackground key="shader" intensity={1.2} />}
          {bgMode === 'particles' && <ParticleField key="particles" count={1200} speed={0.4} />}
        </AnimatePresence>
      </div>

      {/* Floating gradient orbs */}
      <GradientOrb className="top-10 left-10" size={400} speed={12} />
      <GradientOrb className="bottom-20 right-10" size={350} colors={['#d946ef', '#38bdf8', '#6366f1']} speed={10} />

      {/* Content */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Controls bar */}
        <div className="fixed top-4 right-4 z-50 glass-strong rounded-2xl p-3 flex items-center gap-2">
          <button
            onClick={() => setBgMode('aurora')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${bgMode === 'aurora' ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' : 'text-surface-600 hover:text-white'}`}
          >
            Aurora
          </button>
          <button
            onClick={() => setBgMode('shader')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${bgMode === 'shader' ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' : 'text-surface-600 hover:text-white'}`}
          >
            Shader
          </button>
          <button
            onClick={() => setBgMode('particles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${bgMode === 'particles' ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30' : 'text-surface-600 hover:text-white'}`}
          >
            3D Particles
          </button>
          <div className="w-px h-5 bg-surface-300/40" />
          <button
            onClick={() => setCursorEnabled(!cursorEnabled)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${cursorEnabled ? 'bg-accent-500/20 text-accent-300 border border-accent-500/30' : 'text-surface-600 hover:text-white'}`}
          >
            <MousePointer2 className="w-3 h-3 inline mr-1" />
            Cursor
          </button>
          <button
            onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2500) }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-surface-600 hover:text-white transition-all"
          >
            Loader
          </button>
        </div>

        {/* Hero section */}
        <section className="min-h-screen flex items-center justify-center section-padding relative">
          <div className="max-w-5xl mx-auto text-center">
            <StaggerContainer stagger={0.1}>
              <StaggerItem>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-brand-500/30 mb-8">
                  <Sparkles className="w-4 h-4 text-brand-300" />
                  <span className="text-xs text-surface-600 font-medium">Premium Graphics Showcase</span>
                </div>
              </StaggerItem>

              <StaggerItem>
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6">
                  <TextReveal text="The Most" />
                  <br />
                  <TextReveal text="Premium" delay={0.3} className="gradient-text" />
                  <br />
                  <TextReveal text="EdTech Shell" delay={0.6} />
                </h1>
              </StaggerItem>

              <StaggerItem>
                <p className="text-lg md:text-xl text-surface-600 max-w-2xl mx-auto mb-10">
                  <Typewriter
                    text="3D particle fields, WebGL shaders, aurora backgrounds, magnetic buttons, custom cursors, tilt cards, scroll reveals, and a live 3D knowledge graph."
                    speed={25}
                    delay={1.5}
                  />
                </p>
              </StaggerItem>

              <StaggerItem>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <MagneticButton strength={0.4}>
                    <button className="btn-primary">
                      Explore Features
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </MagneticButton>
                  <MagneticButton strength={0.3}>
                    <button className="btn-secondary">
                      <Eye className="w-4 h-4" />
                      View Demo
                    </button>
                  </MagneticButton>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Stats counter section */}
        <section className="py-20 section-padding">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal direction="up">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: BookOpen, value: 20000, suffix: '+', label: 'Knowledge Nodes', color: 'text-brand-300' },
                  { icon: Brain, value: 6, suffix: '', label: 'AI Self-Improvement Loops', color: 'text-accent-300' },
                  { icon: Trophy, value: 12, suffix: '', label: 'Class Levels (1-12)', color: 'text-gold-300' },
                  { icon: Languages, value: 22, suffix: '+', label: 'Indian Languages', color: 'text-mint-300' },
                ].map((stat, i) => (
                  <TiltCard key={i} maxTilt={8} className="glass-card rounded-2xl p-6 text-center">
                    <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                    <div className="font-display text-3xl font-bold text-white">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-surface-600 mt-1">{stat.label}</div>
                  </TiltCard>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* 3D Knowledge Graph section */}
        <section className="py-20 section-padding">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal direction="blur">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl font-bold text-white mb-4">
                  Interactive 3D Knowledge Graph
                </h2>
                <p className="text-surface-600 max-w-xl mx-auto">
                  Real-time WebGL rendering of subject relationships, prerequisite chains, and mastery connections.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="scale">
              <BorderBeam className="glass-card rounded-3xl overflow-hidden" duration={6}>
                <div className="h-[500px] relative">
                  <KnowledgeGraph3D className="w-full h-full" />
                  <div className="absolute bottom-4 left-4 glass rounded-xl px-3 py-2">
                    <span className="text-xs text-surface-600">Auto-rotating · 12 nodes · 13 connections</span>
                  </div>
                </div>
              </BorderBeam>
            </ScrollReveal>
          </div>
        </section>

        {/* Feature cards with tilt + glow */}
        <section className="py-20 section-padding">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-4xl font-bold text-white text-center mb-12">
                Premium Interactive Cards
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Brain, title: 'AI Socratic Tutor', desc: 'Atlas AI asks questions, never gives answers. Discover knowledge yourself.', color: 'from-brand-500 to-brand-700', glow: 'rgba(99,102,241,0.3)' },
                { icon: PenTool, title: 'Answer Sheet Grading', desc: 'Upload handwritten answers. AI grades against CBSE/CISCE rubrics.', color: 'from-accent-500 to-accent-700', glow: 'rgba(217,70,239,0.3)' },
                { icon: LineChart, title: 'Adaptive Learning Path', desc: 'BKT-powered mastery tracking with prerequisite chain traversal.', color: 'from-mint-500 to-mint-700', glow: 'rgba(52,211,153,0.3)' },
                { icon: WifiOff, title: 'Offline-First PWA', desc: 'Download lessons, study anywhere. Syncs when connectivity returns.', color: 'from-gold-500 to-gold-700', glow: 'rgba(251,191,36,0.3)' },
                { icon: Languages, title: 'Bilingual AI', desc: 'Hindi + English code-switching. Learn in the language you think in.', color: 'from-brand-400 to-accent-600', glow: 'rgba(129,140,248,0.3)' },
                { icon: Trophy, title: 'Gamified Mastery', desc: 'XP, streaks, badges, leaderboards. Learning that feels like playing.', color: 'from-accent-400 to-gold-600', glow: 'rgba(232,121,249,0.3)' },
              ].map((feature, i) => (
                <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                  <TiltCard maxTilt={10} className="h-full">
                    <GlowCard className="glass-card rounded-2xl p-6 h-full" glowColor={feature.glow} glowSize={250}>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-glow mb-4`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-surface-600 leading-relaxed">{feature.desc}</p>
                    </GlowCard>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Spotlight + Ripple section */}
        <section className="py-20 section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="blur">
              <h2 className="font-display text-4xl font-bold text-white text-center mb-12">
                Spotlight & Ripple Effects
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              <Spotlight className="glass-card rounded-3xl p-8 min-h-[200px]" size={500}>
                <Target className="w-8 h-8 text-brand-300 mb-4" />
                <h3 className="font-display text-xl font-bold text-white mb-2">Spotlight Tracking</h3>
                <p className="text-sm text-surface-600">Move your cursor over this card. A radial gradient follows your mouse with smooth interpolation.</p>
              </Spotlight>

              <div className="glass-card rounded-3xl p-8 min-h-[200px] flex flex-col items-center justify-center gap-4">
                <Zap className="w-8 h-8 text-accent-300 mb-2" />
                <h3 className="font-display text-xl font-bold text-white mb-2">Ripple Buttons</h3>
                <RippleButton className="btn-primary">
                  Click for Ripple
                </RippleButton>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee section */}
        <section className="py-12 border-y border-surface-300/20">
          <Marquee speed={25} className="py-6">
            {['AI Tutoring', 'Knowledge Graph', 'Offline-First', 'Bilingual', 'Adaptive Learning', 'Gamified', 'CBSE + CISCE', 'Class 1-12'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-6">
                <Sparkles className="w-4 h-4 text-brand-400" />
                <span className="font-display text-2xl font-bold text-surface-700">{item}</span>
              </div>
            ))}
          </Marquee>
        </section>

        {/* Progress + Skeleton section */}
        <section className="py-20 section-padding">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-4xl font-bold text-white text-center mb-12">
                Loading States
              </h2>
            </ScrollReveal>

            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-surface-600">Mastery Progress</span>
                  <span className="text-xs text-brand-300 font-mono">85%</span>
                </div>
                <PremiumProgress progress={85} />
              </div>

              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-surface-600">Knowledge Graph Loading</span>
                  <span className="text-xs text-accent-300 font-mono">62%</span>
                </div>
                <PremiumProgress progress={62} color="linear-gradient(90deg, #d946ef, #38bdf8)" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <PremiumSkeleton className="h-32" />
                <PremiumSkeleton className="h-32" />
                <PremiumSkeleton className="h-32" />
              </div>
            </div>
          </div>
        </section>

        {/* Atlas AI mascot showcase */}
        <section className="py-20 section-padding">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="scale">
              <div className="glass-card rounded-3xl p-12 text-center">
                <h2 className="font-display text-3xl font-bold text-white mb-8">Atlas AI Mascot</h2>
                <div className="flex flex-wrap items-end justify-center gap-8">
                  {[
                    { mood: 'idle' as const, label: 'Idle' },
                    { mood: 'happy' as const, label: 'Happy' },
                    { mood: 'thinking' as const, label: 'Thinking' },
                    { mood: 'celebrating' as const, label: 'Celebrating' },
                    { mood: 'curious' as const, label: 'Curious' },
                    { mood: 'encouraging' as const, label: 'Encouraging' },
                    { mood: 'sleepy' as const, label: 'Sleepy' },
                  ].map((m, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow"><Brain className="w-6 h-6 text-white" /></div>
                      <span className="text-xs text-surface-600">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Tech badges */}
        <section className="py-20 section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="font-display text-3xl font-bold text-white mb-8">Powered By</h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {['Three.js', 'WebGL Shaders', 'Framer Motion', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Lottie', 'React Three Fiber', 'Canvas API'].map((tech, i) => (
                  <BorderBeam key={i} className="glass rounded-xl px-4 py-2" duration={3 + i * 0.5}>
                    <span className="text-sm text-surface-700 font-medium">{tech}</span>
                  </BorderBeam>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-surface-300/20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center shadow-glow">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                Atlas
              </span>
            </div>
            <p className="text-xs text-surface-600">Premium EdTech Shell — AI Learning for Bharat</p>
          </div>
        </footer>
      </div>

      {/* Loader overlay */}
      <PremiumLoader loading={loading} label="Loading Premium Experience" />
    </div>
  )
}
