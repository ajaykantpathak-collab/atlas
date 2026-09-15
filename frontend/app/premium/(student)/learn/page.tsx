'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Search, BookOpen, Brain, Calculator,
  FlaskConical, Globe, Languages, Code2, Palette, Music,
  ChevronRight, Sparkles, TrendingUp, Filter,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import {
  CustomCursor, TiltCard, GlowCard, ScrollReveal,
  Spotlight, BorderBeam, StaggerContainer,
  StaggerItem, AnimatedCounter, PremiumLoader,
} from '@/components/premium'
import dynamic from 'next/dynamic'

// three.js graph loads on demand — keeps the learn route light
const KnowledgeGraph3D = dynamic(
  () => import('@/components/premium/KnowledgeGraph3D').then((m) => m.KnowledgeGraph3D),
  { ssr: false, loading: () => <div className="w-full h-full bg-surface-100/20 rounded-3xl animate-pulse" /> }
)
import { useSubjects, useKnowledgeGraph } from '@/hooks'

const subjectIconMap: Record<string, typeof Calculator> = {
  'Mathematics': Calculator, 'Science': FlaskConical, 'Social Science': Globe, 'Social Studies': Globe,
  'English': BookOpen, 'Hindi': Languages, 'Computer Science': Code2, 'Arts': Palette, 'Music': Music,
}
const subjectColorMap: Record<string, { color: string; bg: string; border: string; glow: string }> = {
  'Mathematics': { color: 'text-brand-300', bg: 'bg-brand-500/10', border: 'border-brand-500/20', glow: 'rgba(99,102,241,0.2)' },
  'Science': { color: 'text-accent-300', bg: 'bg-accent-500/10', border: 'border-accent-500/20', glow: 'rgba(217,70,239,0.2)' },
  'Social Science': { color: 'text-gold-300', bg: 'bg-gold-500/10', border: 'border-gold-500/20', glow: 'rgba(251,191,36,0.2)' },
  'Social Studies': { color: 'text-gold-300', bg: 'bg-gold-500/10', border: 'border-gold-500/20', glow: 'rgba(251,191,36,0.2)' },
  'English': { color: 'text-mint-300', bg: 'bg-mint-500/10', border: 'border-mint-500/20', glow: 'rgba(52,211,153,0.2)' },
  'Hindi': { color: 'text-orange-300', bg: 'bg-orange-500/10', border: 'border-orange-500/20', glow: 'rgba(249,115,22,0.2)' },
  'Computer Science': { color: 'text-purple-300', bg: 'bg-purple-500/10', border: 'border-purple-500/20', glow: 'rgba(168,85,247,0.2)' },
}
const defaultColor = { color: 'text-brand-300', bg: 'bg-brand-500/10', border: 'border-brand-500/20', glow: 'rgba(99,102,241,0.2)' }

export default function PremiumLearnPage() {
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'graph' | 'grid'>('graph')

  const { data: subjectsData, isLoading: subjectsLoading } = useSubjects()
  const { data: graphData } = useKnowledgeGraph()

  const subjects = (subjectsData?.subjects ?? []).map((s) => {
    const colors = subjectColorMap[s.name] ?? defaultColor
    return {
      id: s.id,
      name: s.name,
      icon: subjectIconMap[s.name] ?? BookOpen,
      ...colors,
      topics: s.topicsCount ?? 0,
      mastery: s.masteryPercentage ?? 0,
    }
  })

  const filtered = subjects.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  if (subjectsLoading) {
    return (
      <div className="min-h-screen bg-surface-0 mesh-bg flex items-center justify-center">
        <PremiumLoader />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <CustomCursor />

      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/premium/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Knowledge Graph</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search topics..."
                className="input-field pl-9 text-xs h-9 w-40 sm:w-56"
              />
            </div>
            <button
              onClick={() => setView(view === 'graph' ? 'grid' : 'graph')}
              className="btn-ghost px-3 h-9 text-xs"
            >
              {view === 'graph' ? 'Grid View' : '3D Graph'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {view === 'graph' ? (
          <StaggerContainer stagger={0.1}>
            <StaggerItem>
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  Your Knowledge Universe
                </h2>
                <p className="text-sm text-surface-600">
                  Explore subjects and their connections in 3D space. Each node represents a subject with mastery tracking.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <BorderBeam className="glass-card rounded-3xl overflow-hidden" duration={5}>
                <div className="h-[500px] relative">
                  <KnowledgeGraph3D className="w-full h-full" />
                  <div className="absolute top-4 left-4 glass rounded-xl px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3 h-3 text-brand-300" />
                      <span className="text-xs text-surface-600">{graphData?.nodes?.length ?? 0} nodes · {graphData?.links?.length ?? 0} connections</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 glass rounded-xl px-3 py-2">
                    <span className="text-xs text-surface-600">Auto-rotating · Drag to explore</span>
                  </div>
                </div>
              </BorderBeam>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-8">
                <h3 className="font-display text-lg font-bold text-white mb-4">Subject Nodes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {filtered.map((subject) => (
                    <TiltCard key={subject.id} maxTilt={8}>
                      <Link href={`/premium/learn/${subject.id}`}>
                        <GlowCard className="glass-card rounded-xl p-4 cursor-pointer" glowColor={subject.glow} glowSize={150}>
                          <subject.icon className={`w-6 h-6 ${subject.color} mb-3`} />
                          <div className="text-sm font-medium text-white mb-1">{subject.name}</div>
                          <div className="text-xs text-surface-600">
                            <AnimatedCounter value={subject.topics} suffix=" topics" />
                          </div>
                          <div className="mt-2">
                            <div className="flex justify-between text-[10px] text-surface-600 mb-1">
                              <span>Mastery</span>
                              <span>{subject.mastery}%</span>
                            </div>
                            <div className="h-1 rounded-full bg-surface-200/40 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-brand-gradient"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${subject.mastery}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                              />
                            </div>
                          </div>
                        </GlowCard>
                      </Link>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((subject, i) => (
              <ScrollReveal key={subject.id} direction="up" delay={i * 0.08}>
                <TiltCard maxTilt={10}>
                  <Spotlight className={`glass-card rounded-2xl p-6 cursor-pointer border ${subject.border}`} size={300}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${subject.bg} border ${subject.border} flex items-center justify-center`}>
                        <subject.icon className={`w-6 h-6 ${subject.color}`} />
                      </div>
                      <span className={`text-xs font-mono ${subject.color}`}>{subject.mastery}%</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-1">{subject.name}</h3>
                    <p className="text-xs text-surface-600 mb-4">
                      <AnimatedCounter value={subject.topics} suffix=" topics" />
                    </p>
                    <div className="h-1.5 rounded-full bg-surface-200/40 overflow-hidden mb-4">
                      <motion.div
                        className="h-full rounded-full bg-brand-gradient"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${subject.mastery}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-surface-600">Explore topics</span>
                      <ChevronRight className="w-4 h-4 text-surface-600" />
                    </div>
                  </Spotlight>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
