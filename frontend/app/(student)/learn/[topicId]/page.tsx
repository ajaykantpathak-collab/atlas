'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, BookOpen, Brain, Lightbulb, AlertTriangle, FileText,
  PlayCircle, PenSquare, CheckCircle2, Circle, ChevronRight,
  Sparkles, Clock, TrendingUp, Target, Zap, BookMarked, Award,
} from 'lucide-react'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { api } from '@/lib/api'

interface EnrichmentData {
  node_id: string
  title: string
  subject: string
  class_level: number
  chapter: string | null
  definition: string | null
  text_walkthrough: string | null
  eli5: string | null
  common_misconception: string | null
  diagnostic_questions: any[] | null
  on_failure: any[] | null
  examples: string | null
  cognitive_level: string | null
  mastery_criteria: string | null
  scope_boundary: string | null
  prereq_ids: string[]
  depth_prereq_ids: string[]
  forward_node_ids: string[]
  difficulty: string | null
  board: string | null
}

export default function TopicDetailPage({ params }: { params: { topicId: string } }) {
  const { topicId } = params
  const [activeTab, setActiveTab] = useState<'overview' | 'exam' | 'faq' | 'glossary'>('overview')
  const [topic, setTopic] = useState<EnrichmentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    api.get<EnrichmentData>(`/api/content/nodes/${topicId}/enrichment`)
      .then((data) => setTopic(data))
      .catch((e) => setError(e.message || 'Failed to load topic'))
      .finally(() => setLoading(false))
  }, [topicId])

  if (loading) {
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-brand-gradient flex items-center justify-center mx-auto mb-4 animate-pulse">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <p className="text-sm text-surface-600">Loading topic...</p>
        </div>
      </div>
    )
  }

  if (error || !topic) {
    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center">
        <div className="glass-card p-8 text-center max-w-md">
          <AlertTriangle className="w-10 h-10 text-red-300 mx-auto mb-4" />
          <h1 className="font-display text-xl font-bold text-white mb-2">Topic Not Found</h1>
          <p className="text-sm text-surface-600 mb-4">{error || `No enrichment content for node "${topicId}"`}</p>
          <Link href="/learn" className="btn-primary inline-block">
            Back to Topics
          </Link>
        </div>
      </div>
    )
  }

  const subjectName = topic.subject === 'physics' ? 'Physics'
    : topic.subject === 'chem' ? 'Chemistry'
    : topic.subject === 'bio' ? 'Biology'
    : topic.subject === 'maths' ? 'Mathematics'
    : topic.subject

  return (
    <div className="min-h-screen mesh-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PrismLogo size={28} />
            <Link href="/learn" className="btn-ghost px-2">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-xs text-surface-600">
              <span>{topic.board || 'CISCE'}</span>
              <ChevronRight className="w-3 h-3" />
              <span>Class {topic.class_level}</span>
              <ChevronRight className="w-3 h-3" />
              <span>{subjectName}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">{topic.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {topic.difficulty && (
              <span className="badge-brand">
                <Zap className="w-3 h-3" />
                {topic.difficulty}
              </span>
            )}
            {topic.cognitive_level && (
              <span className="badge">
                <Brain className="w-3 h-3" />
                {topic.cognitive_level}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-gradient flex items-center justify-center shadow-glow flex-shrink-0">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold text-white mb-1">{topic.title}</h1>
              <p className="text-sm text-surface-600">
                {topic.chapter || subjectName} · {subjectName} · Class {topic.class_level}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="badge-brand">
                  <Target className="w-3 h-3" />
                  Node: {topic.node_id}
                </span>
                {topic.difficulty && (
                  <span className="badge-accent">
                    <TrendingUp className="w-3 h-3" />
                    {topic.difficulty}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/tutor" className="btn-primary group">
                <PlayCircle className="w-5 h-5" />
                Start Learning
              </Link>
              <Link href="/practice" className="btn-secondary">
                <PenSquare className="w-5 h-5" />
                Take Quiz
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 glass rounded-xl overflow-x-auto">
              {([
                { id: 'overview' as const, label: 'Overview', icon: BookOpen },
                { id: 'exam' as const, label: 'Diagnostics', icon: FileText },
                { id: 'faq' as const, label: 'Remediation', icon: Lightbulb },
                { id: 'glossary' as const, label: 'Scope', icon: BookMarked },
              ]).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-brand-500/15 text-brand-300'
                      : 'text-surface-600 hover:text-white hover:bg-surface-200/30'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Definition */}
                  {topic.definition && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-brand-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Definition</h3>
                      </div>
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">{topic.definition}</p>
                    </div>
                  )}

                  {/* ELI5 */}
                  {topic.eli5 && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-gold-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Simple Explanation (ELI5)</h3>
                      </div>
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">{topic.eli5}</p>
                    </div>
                  )}

                  {/* Walkthrough */}
                  {topic.text_walkthrough && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-mint-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Step-by-Step Walkthrough</h3>
                      </div>
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">{topic.text_walkthrough}</p>
                    </div>
                  )}

                  {/* Misconceptions */}
                  {topic.common_misconception && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-red-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Common Misconceptions</h3>
                      </div>
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">{topic.common_misconception}</p>
                    </div>
                  )}

                  {/* Examples */}
                  {topic.examples && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-5 h-5 text-gold-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Examples</h3>
                      </div>
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">{topic.examples}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'exam' && (
                <motion.div
                  key="exam"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Diagnostic questions */}
                  {topic.diagnostic_questions && topic.diagnostic_questions.length > 0 ? (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-brand-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Diagnostic Questions</h3>
                      </div>
                      <div className="space-y-4">
                        {topic.diagnostic_questions.map((dq: any, i: number) => (
                          <div key={i} className="border-l-2 border-brand-500/40 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="badge-brand text-xs">Q{dq.number || i + 1}</span>
                              {dq.cognitive_type && (
                                <span className="badge text-xs">{dq.cognitive_type}</span>
                              )}
                            </div>
                            <p className="text-sm text-white font-medium mb-2">{dq.question}</p>
                            <p className="text-sm text-surface-700 whitespace-pre-wrap">{dq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card p-6 text-center">
                      <p className="text-sm text-surface-600">No diagnostic questions available.</p>
                    </div>
                  )}

                  {/* Mastery criteria */}
                  {topic.mastery_criteria && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-mint-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Mastery Criteria</h3>
                      </div>
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">{topic.mastery_criteria}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'faq' && (
                <motion.div
                  key="faq"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {/* On failure / remediation */}
                  {topic.on_failure && topic.on_failure.length > 0 ? (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-gold-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Remediation Guidance</h3>
                      </div>
                      <div className="space-y-4">
                        {topic.on_failure.map((of: any, i: number) => (
                          <div key={i} className="border-l-2 border-gold-500/40 pl-4">
                            <p className="text-sm font-medium text-gold-300 mb-1">
                              If Q{of.question_number} fails:
                            </p>
                            <p className="text-sm text-surface-700 whitespace-pre-wrap">{of.remediation_text}</p>
                            {of.review_node_ids && of.review_node_ids.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {of.review_node_ids.map((nid: string, j: number) => (
                                  <Link
                                    key={j}
                                    href={`/learn/${nid}`}
                                    className="badge-brand text-xs hover:scale-105 transition-transform"
                                  >
                                    <ChevronRight className="w-3 h-3" />
                                    {nid}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card p-6 text-center">
                      <p className="text-sm text-surface-600">No remediation guidance available.</p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'glossary' && (
                <motion.div
                  key="glossary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  {/* Scope boundary */}
                  {topic.scope_boundary && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <BookMarked className="w-5 h-5 text-brand-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Scope Boundary</h3>
                      </div>
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">{topic.scope_boundary}</p>
                    </div>
                  )}

                  {/* Mastery criteria */}
                  {topic.mastery_criteria && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-mint-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Mastery Criteria</h3>
                      </div>
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">{topic.mastery_criteria}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prerequisites */}
            <div className="glass-card p-5">
              <h3 className="font-display text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-brand-300" />
                Prerequisites
              </h3>
              <div className="space-y-3">
                {topic.prereq_ids && topic.prereq_ids.length > 0 ? (
                  topic.prereq_ids.map((nid) => (
                    <Link
                      key={nid}
                      href={`/learn/${nid}`}
                      className="flex items-center gap-3 group"
                    >
                      <Circle className="w-4 h-4 text-gold-300 flex-shrink-0" />
                      <p className="text-sm text-white group-hover:text-brand-300 transition-colors">
                        {nid}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-surface-600">No prerequisites — this is a foundational topic.</p>
                )}
              </div>
            </div>

            {/* Forward nodes */}
            <div className="glass-card p-5">
              <h3 className="font-display text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent-300" />
                This Unlocks
              </h3>
              <div className="space-y-2">
                {topic.forward_node_ids && topic.forward_node_ids.length > 0 ? (
                  topic.forward_node_ids.map((nid) => (
                    <Link
                      key={nid}
                      href={`/learn/${nid}`}
                      className="flex items-center gap-2 text-sm text-surface-600 hover:text-white transition-colors group"
                    >
                      <ChevronRight className="w-4 h-4 text-surface-600 group-hover:text-brand-300 transition-colors" />
                      {nid}
                    </Link>
                  ))
                ) : (
                  <p className="text-xs text-surface-600">No forward nodes listed.</p>
                )}
              </div>
            </div>

            {/* Prism AI assistant */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-gradient flex items-center justify-center shadow-glow"><Brain className="w-5 h-5 text-white" /></div>
                <div>
                  <p className="text-sm font-semibold text-white">Ask Prism AI</p>
                  <p className="text-xs text-surface-600">Confused about this topic?</p>
                </div>
              </div>
              <Link href="/tutor" className="btn-secondary w-full text-xs">
                <Sparkles className="w-3 h-3" />
                Start AI Tutor Session
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-sm font-medium text-white">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} className="flex-shrink-0">
          <ChevronRight className="w-4 h-4 text-surface-600" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-surface-700 p-5 pt-0">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
