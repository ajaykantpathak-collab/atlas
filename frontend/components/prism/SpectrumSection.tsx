'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Atom, FlaskConical, Dna, Sigma, Sparkles, Globe, Leaf, Cpu, Calculator,
  BookOpen, Languages, Landmark, Briefcase, Palette, Heart, X, ArrowRight,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import { usePublicSubjects, usePublicTopics } from '@/hooks/usePublicData'

/**
 * SpectrumSection — REAL subjects from the backend.
 *
 * Fetches the actual subject list from /api/public/subjects (which calls the
 * real backend at /api/content/subjects). Shows real class coverage and boards.
 * Topic counts are fetched per-subject from /api/public/topics.
 *
 * No hardcoded subject lists. The grid is built from what the database actually contains.
 */

// Icon and color mapping for known subjects
const SUBJECT_META: Record<string, { icon: typeof Atom; color: string; category: string }> = {
  Physics: { icon: Atom, color: '#38BDF8', category: 'Science' },
  Chemistry: { icon: FlaskConical, color: '#4ADE80', category: 'Science' },
  Biology: { icon: Dna, color: '#FB7185', category: 'Science' },
  Mathematics: { icon: Sigma, color: '#A78BFA', category: 'Mathematics' },
  'Computer Science': { icon: Cpu, color: '#22D3EE', category: 'Technology' },
  Geography: { icon: Globe, color: '#FB923C', category: 'Humanities' },
  'History & Civics': { icon: Landmark, color: '#FCD34D', category: 'Humanities' },
  Economics: { icon: Briefcase, color: '#F87171', category: 'Commerce' },
  English: { icon: BookOpen, color: '#60A5FA', category: 'Languages' },
  Hindi: { icon: Languages, color: '#FB923C', category: 'Languages' },
  'Applied Maths': { icon: Calculator, color: '#818CF8', category: 'Mathematics' },
  'Environmental Science': { icon: Leaf, color: '#84CC16', category: 'Science' },
  Commerce: { icon: Briefcase, color: '#FBBF24', category: 'Commerce' },
  'Home Science': { icon: Heart, color: '#F472B6', category: 'Applied' },
  'Art & Music': { icon: Palette, color: '#C084FC', category: 'Arts' },
  Biotechnology: { icon: Dna, color: '#C084FC', category: 'Science' },
}

const DEFAULT_META = { icon: BookOpen, color: '#A78BFA', category: 'General' }

function getSubjectMeta(name: string) {
  return SUBJECT_META[name] || DEFAULT_META
}

function formatClasses(classes: number[]): string {
  if (classes.length === 0) return '—'
  if (classes.length === 12) return 'Class 1-12'
  const min = Math.min(...classes)
  const max = Math.max(...classes)
  if (min === max) return `Class ${min}`
  return `Class ${min}-${max}`
}

function formatBoards(boards: string[]): string {
  if (boards.length === 0) return '—'
  return boards.join(', ')
}

export function SpectrumSection() {
  const { data: subjectsData, isLoading, isError } = usePublicSubjects()
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  // Fetch topic count for the selected subject
  const selectedSubjectData = useMemo(() => {
    if (!subjectsData || !selectedSubject) return null
    return subjectsData.subjects.find((s) => s.name === selectedSubject) || null
  }, [subjectsData, selectedSubject])

  const { data: topicsData } = usePublicTopics(
    selectedSubjectData?.name.toLowerCase(),
    undefined
  )

  if (isLoading) {
    return (
      <div className="space-y-16">
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-brand-400 animate-spin mb-4" />
          <p className="text-sm text-surface-600">Loading real subjects from the curriculum database…</p>
        </div>
      </div>
    )
  }

  if (isError || !subjectsData || subjectsData.subjects.length === 0) {
    return (
      <div className="space-y-16">
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-sm text-surface-600">Unable to load subjects right now.</p>
          <p className="text-xs text-surface-600 mt-2">Please make sure the backend is running.</p>
        </div>
      </div>
    )
  }

  const subjects = subjectsData.subjects

  // Featured subjects — pick the first 4 that have the most class coverage
  const featured = [...subjects]
    .sort((a, b) => b.classes.length - a.classes.length)
    .slice(0, 4)

  return (
    <div className="space-y-16">
      {/* Featured subjects — expanded with real data */}
      <div className="space-y-24">
        {featured.map((subject, i) => {
          const meta = getSubjectMeta(subject.name)
          const Icon = meta.icon
          const isReversed = i % 2 === 1
          return (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12`}
            >
              {/* Visual side */}
              <div className="flex-1 relative w-full">
                <div
                  className="absolute inset-0 rounded-full blur-[100px] opacity-20 pointer-events-none"
                  style={{ background: meta.color }}
                />
                <div className="relative glass-card rounded-3xl p-8 overflow-hidden">
                  <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ background: meta.color }}
                  />
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-glow"
                      style={{ background: `${meta.color}20`, border: `1px solid ${meta.color}40` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: meta.color }} />
                    </div>
                    <div className="text-4xl font-display font-bold mb-2" style={{ color: meta.color }}>
                      {subject.name}
                    </div>
                    <div className="text-sm text-surface-600 mb-6">
                      {formatClasses(subject.classes)} · {formatBoards(subject.boards)}
                    </div>

                    {/* Real data card */}
                    <div className="bg-surface-200/40 rounded-2xl p-4 border border-surface-300/30">
                      <div className="text-xs text-surface-600 mb-2">In the curriculum:</div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-surface-600">Classes</div>
                          <div className="text-sm text-white font-medium">{subject.classes.length} classes</div>
                        </div>
                        <div>
                          <div className="text-xs text-surface-600">Boards</div>
                          <div className="text-sm text-white font-medium">{subject.boards.length} boards</div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-surface-300/20">
                        <div className="text-xs text-surface-600 mb-1">Classes covered:</div>
                        <div className="text-sm text-white">{formatClasses(subject.classes)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-4 py-1.5 rounded-full mb-4 text-xs font-medium"
                  style={{
                    background: `${meta.color}15`,
                    border: `1px solid ${meta.color}30`,
                    color: meta.color,
                  }}
                >
                  Featured subject
                </motion.div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Master {subject.name}
                </h3>
                <p className="text-surface-600 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                  Real curriculum content from {formatBoards(subject.boards)}.
                  Every concept has definitions, ELI5 explanations, walkthroughs,
                  diagnostic questions, and misconception alerts — all from the
                  knowledge graph.
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* All subjects grid — real data from backend */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-10">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
            Every subject. <span className="spectrum-text">One platform.</span>
          </h3>
          <p className="text-surface-600 text-sm max-w-2xl mx-auto">
            {subjects.length} subjects from the curriculum database.
            From Class {Math.min(...subjects.flatMap((s) => s.classes))} to Class {Math.max(...subjects.flatMap((s) => s.classes))}.
            Across {subjects.flatMap((s) => s.boards).filter((v, i, a) => a.indexOf(v) === i).length} boards.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {subjects.map((subject, i) => {
            const meta = getSubjectMeta(subject.name)
            const Icon = meta.icon
            return (
              <motion.button
                key={subject.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, type: 'spring', stiffness: 200 }}
                whileHover={{ y: -4, scale: 1.03 }}
                onClick={() => setSelectedSubject(subject.name)}
                className="glass-card rounded-2xl p-4 flex items-center gap-3 cursor-pointer group text-left w-full"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: meta.color }} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{subject.name}</div>
                  <div className="text-xs text-surface-600">{subject.classes.length} classes</div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* "and more" badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-surface-600">
            <Sparkles className="w-4 h-4 text-brand-400" />
            More subjects being added as the curriculum graph grows
          </span>
        </motion.div>
      </motion.div>

      {/* Subject detail modal — real data */}
      <AnimatePresence>
        {selectedSubject && selectedSubjectData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSubject(null)}
            className="fixed inset-0 z-[200] bg-surface-0/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-8 max-w-md w-full relative overflow-hidden"
            >
              {(() => {
                const meta = getSubjectMeta(selectedSubjectData.name)
                const Icon = meta.icon
                const topicCount = topicsData?.total
                return (
                  <>
                    {/* Color glow */}
                    <div
                      className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[80px] opacity-30 pointer-events-none"
                      style={{ background: meta.color }}
                    />

                    {/* Close button */}
                    <button
                      onClick={() => setSelectedSubject(null)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-200/40 flex items-center justify-center text-surface-600 hover:text-white transition-colors z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="relative">
                      {/* Icon */}
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shadow-glow"
                        style={{ background: `${meta.color}20`, border: `1px solid ${meta.color}40` }}
                      >
                        <Icon className="w-8 h-8" style={{ color: meta.color }} />
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-3xl font-bold mb-1" style={{ color: meta.color }}>
                        {selectedSubjectData.name}
                      </h3>
                      <div className="text-sm text-surface-600 mb-5">
                        {topicCount !== undefined ? `${topicCount} topics` : 'Loading topics…'} · {meta.category}
                      </div>

                      {/* Meta — real data */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-surface-200/30 rounded-xl p-3 border border-surface-300/20">
                          <div className="text-xs text-surface-600 mb-1">Classes</div>
                          <div className="text-sm text-white font-medium">{formatClasses(selectedSubjectData.classes)}</div>
                        </div>
                        <div className="bg-surface-200/30 rounded-xl p-3 border border-surface-300/20">
                          <div className="text-xs text-surface-600 mb-1">Boards</div>
                          <div className="text-sm text-white font-medium">{formatBoards(selectedSubjectData.boards)}</div>
                        </div>
                      </div>

                      {/* Real topic list preview */}
                      {topicsData && topicsData.topics.length > 0 && (
                        <div className="bg-surface-200/40 rounded-2xl p-4 border border-surface-300/30 mb-5">
                          <div className="text-xs text-surface-600 mb-2">Sample topics from the database:</div>
                          <div className="space-y-1.5">
                            {topicsData.topics.slice(0, 4).map((t) => (
                              <div key={t.node_id} className="text-sm text-white leading-relaxed flex items-start gap-2">
                                <span className="text-surface-600 mt-0.5">•</span>
                                <span>{t.title}</span>
                              </div>
                            ))}
                            {topicsData.total > 4 && (
                              <div className="text-xs text-surface-600 pt-1">
                                + {topicsData.total - 4} more topics
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <Link
                        href="/signup"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-spectrum-gradient text-white text-sm font-semibold shadow-glow hover:scale-[1.02] transition-transform"
                      >
                        Start learning {selectedSubjectData.name} <ArrowRight className="w-4 h-4" />
                      </Link>
                      <p className="text-xs text-surface-600 text-center mt-3">Free to start · No credit card</p>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
