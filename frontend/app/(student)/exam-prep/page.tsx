'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Trophy, FileText, Lightbulb, Star, MessageSquare,
  CheckCircle, FileEdit, BookOpen, Loader2, ChevronDown,
  Atom, FlaskConical, Leaf, Calculator, Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { useState, useEffect, useMemo } from 'react'
import { useAuthStore } from '@/stores/authStore'

interface ContentItem {
  id: string
  target_class: number[]
  target_subject: string
  content_type: string
  title: string
  content: string
  source_file: string
  board: string
}

interface ContentResponse {
  items: ContentItem[]
  total: number
}

// Seeded rows carry raw filenames ("acc_blueprint") — humanize for display.
const SUBJECT_NAMES: Record<string, string> = {
  acc: 'Accountancy', bio: 'Biology', bs: 'Business Studies', chem: 'Chemistry',
  comm: 'Commerce', commapp: 'Commercial Applications', commstud: 'Commercial Studies',
  econ: 'Economics', econapp: 'Economic Applications', eng: 'English',
  geo: 'Geography', hist: 'History', histciv: 'History & Civics', home: 'Home Science',
  legal: 'Legal Studies', massmedia: 'Mass Media', maths: 'Mathematics',
  phy: 'Physics', physics: 'Physics', pol: 'Political Science', psy: 'Psychology',
  soc: 'Sociology', hin: 'Hindi', cs: 'Computer Science',
}

function prettyTitle(raw: string): string {
  const s = (raw || '').replace(/\.(marker|md|txt)$/i, '').replace(/_/g, ' ').trim()
  return s.replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bAcc\b/i, 'Accountancy').replace(/\bBs\b/, 'Business Studies')
    .replace(/\bHistciv\b/i, 'History & Civics').replace(/\bPp\b/, 'Past Paper')
}

function subjectName(code: string): string {
  return SUBJECT_NAMES[(code || '').toLowerCase()] ?? prettyTitle(code)
}

const CONTENT_TYPES = [
  { key: 'blueprint', label: 'Exam Blueprints', count: 70, icon: FileText, color: 'text-brand-300' },
  { key: 'exam_technique', label: 'Exam Techniques', count: 66, icon: Lightbulb, color: 'text-gold-300' },
  { key: 'high_yield_guides', label: 'High-Yield Guides', count: 48, icon: Star, color: 'text-accent-300' },
  { key: 'pp_comments', label: 'Past Paper Comments', count: 48, icon: MessageSquare, color: 'text-mint-300' },
  { key: 'model_answers', label: 'Model Answers', count: 113, icon: CheckCircle, color: 'text-mint-300' },
  { key: 'revision_sheets', label: 'Revision Sheets', count: 48, icon: FileEdit, color: 'text-brand-300' },
  { key: 'summaries', label: 'Chapter Summaries', count: 48, icon: BookOpen, color: 'text-gold-300' },
] as const

const SUBJECTS = [
  { key: 'all', name: 'All', icon: Sparkles, color: 'text-white' },
  { key: 'physics', name: 'Physics', icon: Atom, color: 'text-brand-300' },
  { key: 'chemistry', name: 'Chemistry', icon: FlaskConical, color: 'text-accent-300' },
  { key: 'biology', name: 'Biology', icon: Leaf, color: 'text-mint-300' },
  { key: 'maths', name: 'Maths', icon: Calculator, color: 'text-gold-300' },
] as const

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export default function ExamPrepHubPage() {
  const user = useAuthStore((s) => s.user)
  const defaultClass = user?.classLevel ?? 10

  const [activeTab, setActiveTab] = useState<string>('blueprint')
  const [subject, setSubject] = useState<string>('all')
  const [classLevel, setClassLevel] = useState<number>(defaultClass)
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  useEffect(() => {
    setExpandedId(null)
  }, [activeTab, subject, classLevel])

  useEffect(() => {
    setLoading(true)
    setError(null)
    const params = new URLSearchParams({
      content_type: activeTab,
      class_level: String(classLevel),
      limit: '50',
    })
    if (subject !== 'all') params.set('subject', subject)
    fetch(`${API_BASE}/api/content/class-content?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load content (${res.status})`)
        return res.json() as Promise<ContentResponse>
      })
      .then((data) => setItems(data.items ?? []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [activeTab, subject, classLevel])

  const activeType = useMemo(
    () => CONTENT_TYPES.find((t) => t.key === activeTab) ?? CONTENT_TYPES[0],
    [activeTab]
  )

  return (
    <div className="min-h-screen mesh-bg-animated">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white">Exam Prep Hub</h1>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-surface-600">Class</label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(Number(e.target.value))}
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
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-6 h-6 text-gold-300" />
            <h2 className="font-display text-2xl font-bold text-white">Exam Prep Hub</h2>
          </div>
          <p className="text-sm text-surface-600">
            Everything you need to ace your CISCE exams
          </p>
        </motion.div>

        {/* Subject filter */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {SUBJECTS.map((s) => {
            const Icon = s.icon
            return (
              <button
                key={s.key}
                onClick={() => setSubject(s.key)}
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
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
          {CONTENT_TYPES.map((t) => {
            const Icon = t.icon
            const isActive = activeTab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? 'glass-strong border border-brand-500/40 text-white'
                    : 'glass-card text-surface-600 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? t.color : ''}`} />
                {t.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-brand-500/20 text-brand-300' : 'bg-surface-700/50 text-surface-600'
                }`}>
                  {t.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Error */}
        {error && (
          <div className="glass-card p-4 mb-4 border border-red-500/30">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Content area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-6 h-6 text-brand-300 animate-spin" />
            <p className="text-sm text-surface-600">Loading {activeType.label.toLowerCase()}...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-sm text-surface-600">
              No {activeType.label.toLowerCase()} found for this selection.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {items.map((item, i) => {
              const isExpanded = expandedId === item.id
              const truncated = item.content.length > 200
              const preview = truncated ? item.content.slice(0, 200) : item.content
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.04, 0.6) }}
                  whileHover={{ scale: 1.01 }}
                  className="glass-card p-5 cursor-pointer group hover:border-brand-500/40 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <div className="flex items-start gap-3">
                    <activeType.icon className={`w-5 h-5 ${activeType.color} flex-shrink-0 mt-0.5`} />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-white group-hover:text-brand-300 transition-colors">
                        {prettyTitle(item.title)}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {item.target_subject && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-700/50 text-surface-600">
                            {subjectName(item.target_subject)}
                          </span>
                        )}
                        {item.board && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-500/15 text-brand-300">
                            {item.board}
                          </span>
                        )}
                        {item.target_class?.length > 0 && (
                          <span className="text-[10px] text-surface-600">
                            Class {Math.min(...item.target_class)}–{Math.max(...item.target_class)}
                          </span>
                        )}
                      </div>
                      <div className="mt-3 text-sm text-surface-600 leading-relaxed">
                        <AnimatePresence initial={false}>
                          {isExpanded ? (
                            <motion.div
                              key="full"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden whitespace-pre-wrap"
                            >
                              {item.content}
                            </motion.div>
                          ) : (
                            <motion.div key="preview" className="whitespace-pre-wrap">
                              {preview}
                              {truncated && (
                                <span className="text-brand-300 ml-1">... Read more</span>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-surface-600 group-hover:text-white transition-all flex-shrink-0 mt-1 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
