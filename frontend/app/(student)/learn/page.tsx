'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft, Search, BookOpen, Brain, Calculator,
  FlaskConical, Leaf, Atom, ChevronRight, Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { api } from '@/lib/api'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

interface EnrichmentNode {
  node_id: string
  title: string
  subject: string
  class_level: number
  cognitive_level: string | null
  difficulty: string | null
  has_definition: boolean
  has_walkthrough: boolean
  has_eli5: boolean
  has_misconception: boolean
  has_diagnostic: boolean
  prereq_count: number
}

const SUBJECTS = [
  { key: 'physics', name: 'Physics', icon: Atom, color: 'text-brand-300' },
  { key: 'chem', name: 'Chemistry', icon: FlaskConical, color: 'text-accent-300' },
  { key: 'bio', name: 'Biology', icon: Leaf, color: 'text-mint-300' },
  { key: 'maths', name: 'Mathematics', icon: Calculator, color: 'text-gold-300' },
]

export default function LearnPage() {
  const [search, setSearch] = useState('')
  const [subject, setSubject] = useState('physics')
  const [classLevel, setClassLevel] = useState(10)
  const [nodes, setNodes] = useState<EnrichmentNode[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    api.get<{ nodes: EnrichmentNode[]; total: number }>(
      `/api/content/enrichment?subject=${subject}&class_level=${classLevel}&limit=500`
    )
      .then((data) => setNodes(data.nodes))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [subject, classLevel])

  const filtered = nodes.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen mesh-bg-animated">
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30" role="banner">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2" aria-label="Go back to dashboard">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
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
                aria-label="Search topics"
                className="input-field pl-9 text-xs h-9 w-40 sm:w-56"
              />
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 py-8" role="main">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-brand-300" />
            <h2 className="font-display text-xl font-bold text-white">Explore Your Knowledge Universe</h2>
          </div>
          <p className="text-sm text-surface-600">
            {nodes.length} topics available. Click any topic to see full enrichment content.
          </p>
        </motion.div>

        {/* Subject + Class selectors */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {SUBJECTS.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.key}
                onClick={() => setSubject(s.key)}
                aria-pressed={subject === s.key}
                aria-label={`Select ${s.name} subject`}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
                  subject === s.key
                    ? 'glass-strong border border-brand-500/40 text-white'
                    : 'glass-card text-surface-600 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${s.color}`} />
                {s.name}
              </button>
            )
          })}
          <div className="flex items-center gap-2 ml-auto">
            <label className="text-xs text-surface-600">Class</label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(Number(e.target.value))}
              aria-label="Select class level"
              className="glass-strong border border-surface-300/30 rounded-xl px-3 py-2 text-sm text-white"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((c) => (
                <option key={c} value={c} className="bg-surface-800">
                  Class {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="glass-card p-4 mb-4 border border-red-500/30">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Topics grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-sm text-surface-600">Loading topics...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((node, i) => {
              const subj = SUBJECTS.find((s) => s.key === node.subject)
              const Icon = subj?.icon || BookOpen
              return (
                <motion.div
                  key={node.node_id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.02, 0.4) }}
                >
                  <Link href={`/learn/${node.node_id}`}>
                    <div className="glass-card-hover p-4 h-full group">
                      <div className="flex items-start gap-3">
                        <Icon className={`w-5 h-5 ${subj?.color || 'text-brand-300'} flex-shrink-0 mt-0.5`} />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors">
                            {node.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-surface-600">
                              {node.cognitive_level || '—'}
                            </span>
                            {node.difficulty && (
                              <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                node.difficulty === 'hard'
                                  ? 'bg-red-500/15 text-red-300'
                                  : node.difficulty === 'medium'
                                  ? 'bg-gold-500/15 text-gold-300'
                                  : 'bg-mint-500/15 text-mint-300'
                              }`}>
                                {node.difficulty}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-surface-600 mt-1">{node.node_id}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-surface-600 group-hover:text-white transition-colors flex-shrink-0" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="glass-card p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-200/20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-surface-600" />
            </div>
            <p className="text-sm font-medium text-white mb-1">No topics found</p>
            <p className="text-xs text-surface-600 mb-5">
              Nothing matches your search in this subject — try clearing the filters.
            </p>
            <button
              onClick={() => { setSearch('') }}
              className="btn-primary text-xs"
            >
              Clear search
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
