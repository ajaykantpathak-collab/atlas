'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, BookOpen, Brain, Lightbulb, AlertTriangle, FileText,
  PlayCircle, PenSquare, Circle, ChevronRight,
  Sparkles, TrendingUp, Target, Zap, BookMarked, Award,
  FlaskConical, GraduationCap, WifiOff, Eye, EyeOff, Trophy, Volume2,
} from 'lucide-react'
import { speechManager } from '@/lib/sim-engine'
import Link from 'next/link'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { api } from '@/lib/api'
import { subjectName } from '@/lib/nodeTitle'
import DoodleCardImage from '@/components/doodle/DoodleCardImage'
import QuickQuiz from '@/components/learn/QuickQuiz'
import ChapterPath, { markNodeDone, type ChapterNode } from '@/components/learn/ChapterPath'
import PrereqFixList from '@/components/learn/PrereqFixList'
import AuthoredText from '@/components/learn/AuthoredText'
import { WorkedExampleFading } from '@/components/learn/WorkedExample'
import { InlineSim } from '@/components/learn/InlineSim'
import {
  fetchNodeRemediation,
  nodeRefLabel,
  type NodeRemediation,
} from '@/components/learn/remediation'
import StudySession from '@/components/study/StudySession'
import { fetchBoardTrace, isNodeId, type BoardTrace } from '@/lib/examReady'

interface SimRef { id: string; title: string; classLevel: number; generated: boolean }

interface EnrichmentData {
  node_id: string
  title: string
  slug?: string | null
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

/** One node in a prerequisite / unlock chain (GET /api/graph/prerequisites|unlocks). */
interface GraphNodeRef {
  node_id: string
  name?: string | null
  subject?: string | null
  class_level?: string | number | null
  difficulty?: string | null
}

/** GET /api/tutor-graph/teach response (compact). */
interface TeachDiagnostic {
  index: number
  question: string
  answer: string
  misconception: string | null
}

interface TeachData {
  node_id: string
  definition: string | null
  walkthrough: string | null
  diagnostic: TeachDiagnostic | null
}

type GraphPanelState = 'loading' | 'ready' | 'unavailable'

/** Human label for a graph node — a raw node id must never reach the screen.
 *  Prefer the backend's topic label; fall back to the sanctioned helper.
 *  CHILD-LENS (fix 11): graph rows sometimes carry truncated sentences
 *  ("Comparing numbers is the process of d…") as names — anything longer
 *  than a topic title falls back to the clean friendly label. */
function graphNodeLabel(node: GraphNodeRef): string {
  const name = (node.name || '').trim()
  const looksLikeTopic =
    !!name &&
    name !== node.node_id &&
    !/^[a-z0-9_-]+$/i.test(name) &&
    name.split(/\s+/).length <= 8
  if (looksLikeTopic) return name
  return nodeRefLabel(node.node_id)
}

/** §1 LessonBrief — an advance organizer above the fold. Three honest lines:
 *  what the child will be able to do (authored mastery_criteria), what they
 *  can safely skip worrying about (the scope_boundary's DO NOT TEACH clause),
 *  and where the topic appears in board papers (a real bank trace, hidden
 *  when the node traces to nothing). Goals before instruction — the audit's
 *  first gap. */
function LessonBrief({ topic, nodeId }: { topic: EnrichmentData; nodeId: string }) {
  const [trace, setTrace] = useState<BoardTrace | null>(null)

  useEffect(() => {
    let live = true
    if (isNodeId(nodeId)) {
      fetchBoardTrace(nodeId).then((t) => { if (live) setTrace(t) })
    }
    return () => { live = false }
  }, [nodeId])

  // mastery_criteria is authored "student can …" lines — split into beats.
  const canDos = (topic.mastery_criteria || '')
    .split(/\n|;/)
    .map((s) => s.replace(/^[-*•\s]+|student can\s*/gi, '').trim())
    .filter(Boolean)
    .slice(0, 3)

  // scope_boundary carries "DO NOT TEACH: …" — for the child it becomes
  // "you don't need to worry about this yet".
  const scope = topic.scope_boundary || ''
  const notNeeded = (() => {
    const m = scope.match(/DO NOT TEACH[:\s]+([\s\S]+?)(?:ALREADY COVERED|$)/i)
    const s = (m?.[1] || '').trim()
    return s.length > 4 ? s.replace(/\.$/, '') : ''
  })()

  if (!canDos.length && !notNeeded && !trace) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 mb-6 border-l-2 border-l-mint-400/60"
      data-testid="lesson-brief"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-mint-300 mb-2">
        Before you start
      </p>
      {canDos.length > 0 && (
        <p className="text-sm text-surface-700 leading-relaxed mb-1">
          <span className="text-white font-medium">By the end you can: </span>
          {canDos.join(' · ')}
        </p>
      )}
      {notNeeded && (
        <p className="text-sm text-surface-600 leading-relaxed mb-1">
          <span className="text-surface-500 font-medium">Don&apos;t worry about: </span>
          {notNeeded}
        </p>
      )}
      {trace && (
        <p className="text-xs text-indigo-300/90 mt-1.5">
          This shows up in board exams{trace.marks ? ` — worth ${trace.marks} mark${trace.marks === 1 ? '' : 's'}` : trace.maxMarks > 1 ? ` — up to ${trace.maxMarks} marks` : ''}.
        </p>
      )}
    </motion.div>
  )
}

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-surface-200/40 ${className}`} aria-hidden="true" />
}

function PanelSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3" role="status" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-4" />
      ))}
    </div>
  )
}

/** Internal corpus ids look like c10_bio_cbse_01_001; anything else is a slug. */
const NODE_ID_RE = /^c\d{1,2}_/i

export default function TopicDetailPage({ params }: { params: { topicId: string } }) {
  const { topicId } = params
  // topicId may be a slug — resolve it to the internal node id before fetching.
  const [nodeId, setNodeId] = useState<string | null>(
    NODE_ID_RE.test(topicId) ? topicId : null
  )
  // node_id -> slug map for related-node links (prereqs, unlocks, review ids)
  const [slugById, setSlugById] = useState<Record<string, string>>({})
  const [activeTab, setActiveTab] = useState<'overview' | 'exam' | 'faq' | 'glossary'>('overview')
  const [topic, setTopic] = useState<EnrichmentData | null>(null)
  const [nodeSims, setNodeSims] = useState<SimRef[]>([])
  const [loading, setLoading] = useState(true)
  // 'session' = the staged StudySession engine (default student path);
  // 'library' = the classic all-sections view, one click away.
  const [mode, setMode] = useState<'session' | 'library'>('session')
  const [error, setError] = useState<string | null>(null)

  // Prerequisite / unlock chains (knowledge graph)
  const [prereqs, setPrereqs] = useState<GraphNodeRef[]>([])
  const [prereqsState, setPrereqsState] = useState<GraphPanelState>('loading')
  const [unlocks, setUnlocks] = useState<GraphNodeRef[]>([])
  const [unlocksState, setUnlocksState] = useState<GraphPanelState>('loading')

  // Tutor teach card ("What you'll learn")
  const [teach, setTeach] = useState<TeachData | null>(null)
  const [teachState, setTeachState] = useState<'loading' | 'ready' | 'unavailable'>('loading')
  const [showDiag, setShowDiag] = useState(false)

  // In-page quick quiz
  const [quizOpen, setQuizOpen] = useState(false)
  // Diagnostic to re-serve first (retry CTA from the Remediation tab)
  const [focusDiagnostic, setFocusDiagnostic] = useState<number | null>(null)
  // Chapter path siblings — set by the ChapterPath rail (next-node CTA)
  const [chapterNodes, setChapterNodes] = useState<ChapterNode[]>([])
  const [chapterDone, setChapterDone] = useState<Set<string>>(new Set())

  // Closed-world remediation recipe (misconception + diagnostics + prereqs)
  const [remediation, setRemediation] = useState<NodeRemediation | null>(null)
  const [remediationState, setRemediationState] = useState<'loading' | 'ready'>('loading')
  const [openDiag, setOpenDiag] = useState<Set<number>>(new Set())

  // Resolve slug -> internal node id (raw ids pass through unchanged).
  useEffect(() => {
    if (NODE_ID_RE.test(topicId)) { setNodeId(topicId); return }
    let cancelled = false
    api.get<{ node_id: string; slug: string; title: string }>(
      `/api/content/resolve/${encodeURIComponent(topicId)}`
    )
      .then((d) => { if (!cancelled) setNodeId(d.node_id) })
      .catch(() => {
        if (!cancelled) { setError('Topic not found'); setLoading(false) }
      })
    return () => { cancelled = true }
  }, [topicId])

  useEffect(() => {
    if (!nodeId) return
    setLoading(true)
    setError(null)
    setTopic(null)
    setQuizOpen(false)
    setShowDiag(false)
    setFocusDiagnostic(null)
    setOpenDiag(new Set())
    setRemediation(null)
    setRemediationState('loading')
    api.get<EnrichmentData>(`/api/content/nodes/${nodeId}/enrichment`)
      .then((data) => {
        setTopic(data)
        // Canonicalize raw-id URLs to the human slug URL (no refetch).
        if (data?.slug && NODE_ID_RE.test(topicId)) {
          try { window.history.replaceState(null, '', `/learn/${data.slug}`) } catch {}
        }
      })
      .catch((e) => setError(e.message || 'Failed to load topic'))
      .finally(() => setLoading(false))
    // sims teaching this node — served by the backend from SIM_INDEX
    // (the /api/* rewrite shadows Next-side dynamic handlers, so the
    // lookup lives on the backend like every other endpoint)
    api.get<SimRef[]>(`/api/nodes/${encodeURIComponent(nodeId)}/sims`)
      .then((sims) => setNodeSims(Array.isArray(sims) ? sims : []))
      .catch(() => setNodeSims([]))
    // remediation recipe: authored misconception + servable diagnostics
    // + prereq chain (all from the enhanced-nodes corpus, all optional —
    // the tab degrades per field)
    fetchNodeRemediation(nodeId)
      .then((r) => {
        setRemediation(r)
        setRemediationState('ready')
      })
      .catch(() => setRemediationState('ready'))
  }, [nodeId, topicId])

  // Knowledge-graph chains + tutor teach card (independent sections)
  useEffect(() => {
    setPrereqsState('loading')
    setUnlocksState('loading')
    setTeachState('loading')
    setTeach(null)
    if (!nodeId) return
    api.get<{ prerequisites: GraphNodeRef[] }>(`/api/graph/prerequisites/${encodeURIComponent(nodeId)}`)
      .then((d) => {
        setPrereqs(Array.isArray(d?.prerequisites) ? d.prerequisites : [])
        setPrereqsState('ready')
      })
      .catch(() => setPrereqsState('unavailable'))
    api.get<{ unlocks: GraphNodeRef[] }>(`/api/graph/unlocks/${encodeURIComponent(nodeId)}`)
      .then((d) => {
        setUnlocks(Array.isArray(d?.unlocks) ? d.unlocks : [])
        setUnlocksState('ready')
      })
      .catch(() => setUnlocksState('unavailable'))
    api.get<TeachData>(`/api/tutor-graph/teach?node_id=${encodeURIComponent(nodeId)}`)
      .then((d) => {
        setTeach(d)
        setTeachState('ready')
      })
      .catch(() => setTeachState('unavailable'))
  }, [nodeId])

  // Slug map for every related-node link on the page — keeps internal ids
  // out of the address bar while preserving back-compat fallbacks.
  useEffect(() => {
    const ids = [
      ...prereqs.map((n) => n.node_id),
      ...unlocks.map((n) => n.node_id),
      ...(Array.isArray(remediation?.onFailure)
        ? remediation.onFailure
        : []).flatMap((f) => f.review_node_ids || []),
      ...(remediation?.prereqIds || []),
      ...(topic?.forward_node_ids || []),
      ...(topic?.prereq_ids || []),
    ].filter(Boolean)
    if (!ids.length) return
    // Array.from, not spread-of-Set: the tree compiles under es5 target
    // (tsconfig), where spread iteration needs downlevelIteration.
    api.get<Record<string, { slug?: string | null }>>(
      `/api/content/slugmap?ids=${encodeURIComponent(Array.from(new Set(ids)).join(','))}`
    )
      .then((m) => {
        const out: Record<string, string> = {}
        for (const [k, v] of Object.entries(m || {})) if (v?.slug) out[k] = v.slug
        setSlugById(out)
      })
      .catch(() => {})
  }, [prereqs, unlocks, remediation, topic])

  if (loading && !topic) {
    return (
      <div className="min-h-screen mesh-bg">
        {/* Top bar skeleton */}
        <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
            <PrismLogo size={28} />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-4 w-64 hidden sm:block" />
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header skeleton */}
          <div className="flex items-start gap-4 mb-8">
            <Skeleton className="h-14 w-14 rounded-2xl" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-5 w-40" />
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <Skeleton className="h-12 rounded-xl" />
                <Skeleton className="h-12 rounded-xl" />
              </div>
              <Skeleton className="h-44 rounded-2xl" />
              <div className="flex gap-1 p-1 glass rounded-xl">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-10 flex-1 rounded-lg" />
                ))}
              </div>
              <Skeleton className="h-56 rounded-2xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-40 rounded-2xl" />
              <Skeleton className="h-40 rounded-2xl" />
              <Skeleton className="h-36 rounded-2xl" />
            </div>
          </div>
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
          <p className="text-sm text-surface-600 mb-4">
            {error || `No enrichment content for ${nodeRefLabel(topicId)}.`}
          </p>
          <Link href="/learn" className="btn-primary inline-block">
            Back to Topics
          </Link>
        </div>
      </div>
    )
  }

  const subject = subjectName(topic.subject)

  // Diagnostic entries the corpus actually serves with question text —
  // the enrichment route can carry placeholder entries with null fields;
  // those are dropped here, never rendered as empty blocks.
  const servableDiagnostics = (topic.diagnostic_questions || []).filter(
    (dq: any) => dq && String(dq.question || '').trim(),
  )

  // CHILD-LENS (fix 11): several corpus rows ship an ELI5 that is the
  // definition copy-pasted — showing the same text twice under two
  // headings tells the child the app is talking to itself. When they
  // match, the redundant card is hidden, never re-worded.
  const normalize = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase()
  const eli5DuplicatesDefinition =
    !!topic.eli5 && !!topic.definition &&
    normalize(topic.eli5) === normalize(topic.definition)

  if (mode === 'session' && nodeId) {
    return (
      <>
        <StudySession nodeId={nodeId} />
        <button
          onClick={() => setMode('library')}
          className="fixed top-[72px] right-4 z-30 px-3 py-1.5 rounded-full glass text-xs text-surface-400 hover:text-surface-200 border border-white/10"
        >
          All resources ↗
        </button>
      </>
    )
  }

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
              <span>{subject}</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">{topic.title}</span>
            </div>
          </div>
          {/* CHILD-LENS (fix 11): raw teacher-training tags ("medium",
              "understand") removed from the child's header chrome. */}
          <button
            onClick={() => setMode('session')}
            className="px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-medium hover:bg-indigo-500/25 transition-colors"
          >
            ← Study mode
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* §1 LessonBrief — advance organizer above the fold: what you'll be
            able to do, what you DON'T need yet, and where this shows up in
            boards. Every line is authored content (mastery_criteria /
            scope_boundary) or a real bank trace — nothing invented. */}
        <LessonBrief topic={topic} nodeId={nodeId || topicId} />
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
                {topic.chapter || subject} · {subject} · Class {topic.class_level}
              </p>
              {/* CHILD-LENS (fix 10): one honest "why it matters" line in
                  child words — this topic is in the child's own school year. */}
              <p className="flex items-center gap-1.5 text-xs text-mint-300 mt-2">
                <BookMarked className="w-3.5 h-3.5 shrink-0" />
                This is in your {topic.board || 'CBSE'} Class {topic.class_level} syllabus — part of your school year.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Action buttons — CHILD-LENS (fix 5): "Start Learning" must
                open the lesson's own Story content, never the tutor chat.
                The tutor keeps its own clearly-labelled "Ask your Guide"
                card in the sidebar. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="grid grid-cols-2 gap-3"
            >
              <Link
                href={`/learn/${encodeURIComponent(nodeId || topicId)}/story`}
                className="btn-primary group"
              >
                <PlayCircle className="w-5 h-5" />
                Start Learning
              </Link>
              <button
                onClick={() => setQuizOpen((v) => !v)}
                aria-expanded={quizOpen}
                className={`btn-secondary ${quizOpen ? 'ring-1 ring-gold-400/50' : ''}`}
              >
                <PenSquare className="w-5 h-5" />
                {quizOpen ? 'Hide Quick Quiz' : 'Take Quiz'}
              </button>
            </motion.div>

            {/* Chapter path — this node as one step in the chapter journey */}
            <ChapterPath
              nodeId={topic.node_id || topicId}
              subject={topic.subject}
              classLevel={topic.class_level}
              chapter={topic.chapter}
              onNodes={(list, done) => {
                setChapterNodes(list)
                setChapterDone(done)
              }}
            />

            {/* Story Mode — cinematic retelling of the authored enrichment */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                href={`/learn/${nodeId || topicId}/story`}
                className="group flex items-center gap-3 glass-card rounded-xl px-4 py-3 hover:border-gold-500/40 transition-colors"
              >
                <span className="w-9 h-9 rounded-lg bg-gold-500/15 border border-gold-500/25 flex items-center justify-center text-lg shrink-0" aria-hidden="true">
                  ✨
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold text-white font-display">Story Mode</span>
                  <span className="block text-xs text-surface-600">Story time — watch out for the twist!</span>
                </span>
                <svg className="w-4 h-4 text-gold-400 shrink-0 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
              </Link>
            </motion.div>

            {/* In-page quick quiz — authored diagnostics + remediation loop
                when the node's corpus serves them, practice engine otherwise */}
            <div id="quick-quiz-anchor" />
            <AnimatePresence>
              {quizOpen && (
                <motion.div
                  key="quick-quiz"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <QuickQuiz
                    subject={topic.subject}
                    nodeId={topicId}
                    onAllDone={() => {
                      if (nodeId) {
                        markNodeDone(nodeId)
                        setChapterDone((prev) => new Set(prev).add(nodeId))
                      }
                    }}
                    startDiagnostic={focusDiagnostic}
                    onClose={() => {
                      setQuizOpen(false)
                      setFocusDiagnostic(null)
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* What you'll learn — surfaced from the tutor's teach card */}
            {teachState === 'loading' && (
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-gold-300" />
                  <h3 className="font-display text-base font-semibold text-white">What you&apos;ll learn</h3>
                </div>
                <PanelSkeleton rows={2} />
              </div>
            )}
            {teachState === 'ready' && teach && (teach.definition || teach.diagnostic) && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-gold-300" />
                  <h3 className="font-display text-base font-semibold text-white">What you&apos;ll learn</h3>
                </div>
                {teach.definition && (
                  <p className="text-sm text-surface-800 leading-relaxed mb-3">
                    <AuthoredText text={teach.definition} />
                  </p>
                )}
                {teach.diagnostic && (
                  <div className="rounded-xl border border-gold-500/20 bg-gold-500/5 p-3">
                    <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-gold-300 font-semibold mb-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Warm-up check
                    </p>
                    <p className="text-sm text-white mb-2">
                      <AuthoredText text={teach.diagnostic.question} />
                    </p>
                    <button
                      onClick={() => setShowDiag((v) => !v)}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-300 hover:text-brand-200 transition-colors"
                    >
                      {showDiag ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      {showDiag ? 'Hide answer' : 'Show answer'}
                    </button>
                    <AnimatePresence>
                      {showDiag && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-mint-300 mt-2">
                            <AuthoredText text={teach.diagnostic.answer} />
                          </p>
                          {teach.diagnostic.misconception && (
                            <p className="text-xs text-surface-600 mt-1">
                              Watch out: <AuthoredText text={teach.diagnostic.misconception} />
                            </p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}

            {/* See it happen — the node's sim embedded inside the teach
                step, not a different page (first sim inline; the launcher
                card below lists the rest) */}
            {nodeSims.length > 0 && (
              <InlineSim simId={nodeSims[0].id} title={nodeSims[0].title} />
            )}

            {/* Simulation launcher — only when a sim teaches this node */}
            {nodeSims.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="glass-card p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <FlaskConical className="w-5 h-5 text-brand-300" />
                  <h3 className="font-display text-base font-semibold text-white">
                    {nodeSims.length === 1 ? 'Simulation for this topic' : `${nodeSims.length} simulations for this topic`}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {nodeSims.map((sim) => (
                    <Link
                      key={sim.id}
                      href={`/sims-v2/${encodeURIComponent(sim.id)}`}
                      className="btn-secondary text-sm inline-flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4 text-brand-300" />
                      {sim.title}
                      {sim.generated && (
                        <span className="badge text-[10px] px-1.5 py-0.5">auto</span>
                      )}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Hand-drawn recap card (renders only when exported) */}
            <DoodleCardImage nodeId={topic.node_id || topicId} classLevel={topic.class_level} />

            {/* Tabs — CHILD-LENS (fix 11): child words, no pipeline nouns */}
            <div className="flex gap-1 p-1 glass rounded-xl overflow-x-auto">
              {([
                { id: 'overview' as const, label: 'Learn', icon: BookOpen },
                { id: 'exam' as const, label: 'Check-up', icon: FileText },
                { id: 'faq' as const, label: 'Fix-it', icon: Lightbulb },
                { id: 'glossary' as const, label: "What's inside", icon: BookMarked },
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
                  {/* ELI5 FIRST — a struggling reader meets the simple version
                      before the formal one (cognitive-load: easy tier first).
                      CHILD-LENS (fix 11): hidden entirely when the corpus
                      copy-pasted the definition (identical derive_eli5). */}
                  {topic.eli5 && !eli5DuplicatesDefinition && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-gold-300" />
                        <h3 className="font-display text-lg font-semibold text-white flex-1">In simple words</h3>
                        <button onClick={() => speechManager.speak(topic.eli5!.replace(/[*_`#|]/g, ''))}
                          className="p-1.5 rounded-lg text-surface-500 hover:text-gold-300 hover:bg-gold-500/10 transition-colors"
                          aria-label="Listen to the simple explanation" title="Listen">
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">
                        <AuthoredText text={topic.eli5} />
                      </p>
                    </div>
                  )}

                  {/* Definition — the textbook version, second */}
                  {topic.definition && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-brand-300" />
                        <h3 className="font-display text-lg font-semibold text-white flex-1">The textbook version</h3>
                        <button onClick={() => speechManager.speak(topic.definition!.replace(/[*_`#|]/g, ''))}
                          className="p-1.5 rounded-lg text-surface-500 hover:text-brand-300 hover:bg-brand-500/10 transition-colors"
                          aria-label="Listen to the definition" title="Listen">
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">
                        <AuthoredText text={topic.definition} />
                      </p>
                    </div>
                  )}

                  {/* Walkthrough */}
                  {topic.text_walkthrough && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-mint-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Step-by-Step Walkthrough</h3>
                      </div>
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">
                        <AuthoredText text={topic.text_walkthrough} />
                      </p>
                    </div>
                  )}

                  {/* Misconceptions */}
                  {topic.common_misconception && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-5 h-5 text-red-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Common Misconceptions</h3>
                      </div>
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">
                        <AuthoredText text={topic.common_misconception} />
                      </p>
                    </div>
                  )}

                  {/* Worked examples — interactive fading (guided → faded
                      → bare). Falls back to raw authored text when the
                      node's examples don't parse into the 3-block shape. */}
                  {topic.examples && (
                    nodeId ? (
                      <WorkedExampleFading nodeId={nodeId} rawText={topic.examples} />
                    ) : (
                      <div className="glass-card p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Award className="w-5 h-5 text-gold-300" />
                          <h3 className="font-display text-lg font-semibold text-white">Examples</h3>
                        </div>
                        <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">
                          <AuthoredText text={topic.examples} />
                        </p>
                      </div>
                    )
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
                  {/* Diagnostic questions — servable entries only */}
                  {servableDiagnostics.length > 0 ? (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <FileText className="w-5 h-5 text-brand-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Diagnostic Questions</h3>
                      </div>
                      <div className="space-y-4">
                        {servableDiagnostics.map((dq: any, i: number) => (
                          <div key={i} className="border-l-2 border-brand-500/40 pl-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="badge-brand text-xs">Q{dq.number || i + 1}</span>
                              {dq.cognitive_type && (
                                <span className="badge text-xs">{dq.cognitive_type}</span>
                              )}
                            </div>
                            <p className="text-sm text-white font-medium mb-2">
                              <AuthoredText text={dq.question} />
                            </p>
                            {String(dq.answer || '').trim() && (
                              <p className="text-sm text-surface-700 whitespace-pre-wrap">
                                <AuthoredText text={dq.answer} />
                              </p>
                            )}
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
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">
                        <AuthoredText text={topic.mastery_criteria} />
                      </p>
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
                  {/* Closed-world remediation loop: missed diagnostic →
                      authored misconception → prereq lesson → prereq sim.
                      Every string below is authored corpus content; fields
                      the node lacks are omitted, never invented. */}
                  {remediationState === 'loading' && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Lightbulb className="w-5 h-5 text-gold-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Remediation</h3>
                      </div>
                      <PanelSkeleton rows={3} />
                    </div>
                  )}

                  {remediationState === 'ready' && remediation && (
                    <>
                      {/* Authored on_failure steps (only when the corpus provides them) */}
                      {remediation.onFailure && remediation.onFailure.length > 0 && (
                        <div className="glass-card p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5 text-gold-300" />
                            <h3 className="font-display text-lg font-semibold text-white">Remediation Guidance</h3>
                          </div>
                          <div className="space-y-4">
                            {remediation.onFailure.map((of, i) => (
                              <div key={i} className="border-l-2 border-gold-500/40 pl-4">
                                {of.question_number !== undefined && (
                                  <p className="text-sm font-medium text-gold-300 mb-1">
                                    If Q{of.question_number} fails:
                                  </p>
                                )}
                                <p className="text-sm text-surface-700 whitespace-pre-wrap">
                                  <AuthoredText text={of.remediation_text} />
                                </p>
                                {of.review_node_ids && of.review_node_ids.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {of.review_node_ids.map((nid, j) => (
                                      <Link
                                        key={j}
                                        href={`/learn/${encodeURIComponent(slugById[nid] || nid)}`}
                                        className="badge-brand text-xs hover:scale-105 transition-transform"
                                      >
                                        <ChevronRight className="w-3 h-3" />
                                        {nodeRefLabel(nid)}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Authored common misconception for the node */}
                      {remediation.commonMisconception && (
                        <div className="glass-card p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5 text-red-300" />
                            <h3 className="font-display text-lg font-semibold text-white">Common Misconception</h3>
                          </div>
                          <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">
                            {remediation.commonMisconception}
                          </p>
                        </div>
                      )}

                      {/* Authored diagnostics — each with its misconception
                          and a retry CTA that re-serves it in the quiz */}
                      {remediation.diagnostics.length > 0 && (
                        <div className="glass-card p-6">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-5 h-5 text-brand-300" />
                            <h3 className="font-display text-lg font-semibold text-white">Diagnose Your Gaps</h3>
                          </div>
                          <p className="text-xs text-surface-600 mb-5">
                            Miss one of these and the quiz opens its authored fix-it recipe —
                            the misconception, then the prerequisite lessons and sims.
                          </p>
                          <div className="space-y-5">
                            {remediation.diagnostics.map((dq, i) => (
                              <div key={i} className="border-l-2 border-brand-500/40 pl-4">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="badge-brand text-xs">Q{i + 1}</span>
                                </div>
                                <p className="text-sm text-white font-medium mb-2">
                                  <AuthoredText text={dq.question} />
                                </p>

                                {/* Authored answer, revealed on demand */}
                                <button
                                  onClick={() => setOpenDiag((prev) => {
                                    const next = new Set(prev)
                                    if (next.has(i)) next.delete(i)
                                    else next.add(i)
                                    return next
                                  })}
                                  className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-300 hover:text-brand-200 transition-colors mb-2"
                                >
                                  {openDiag.has(i) ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                  {openDiag.has(i) ? 'Hide answer' : 'Show answer'}
                                </button>
                                <AnimatePresence>
                                  {openDiag.has(i) && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <p className="text-sm text-surface-700 whitespace-pre-wrap mb-2 border-l-2 border-mint-500/30 pl-3">
                                        <AuthoredText text={dq.answer} />
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                {/* Authored misconception for a wrong answer */}
                                {dq.misconception && (
                                  <div className="rounded-lg border border-gold-500/25 bg-gold-500/5 p-3 mt-2">
                                    <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-gold-300 font-semibold mb-1">
                                      <AlertTriangle className="w-3 h-3" />
                                      If you miss this
                                    </p>
                                    <p className="text-xs text-surface-700 leading-relaxed">
                                      <AuthoredText text={dq.misconception} />
                                    </p>
                                  </div>
                                )}

                                {/* Retry CTA — re-serves this diagnostic in the quiz */}
                                <button
                                  onClick={() => {
                                    setFocusDiagnostic(i)
                                    setQuizOpen(true)
                                    document
                                      .getElementById('quick-quiz-anchor')
                                      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                                  }}
                                  className="btn-secondary text-xs inline-flex items-center gap-2 mt-3"
                                >
                                  <PenSquare className="w-3.5 h-3.5" />
                                  Practice this
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Prerequisite chain — each prereq with its sims */}
                      {remediation.prereqIds.length > 0 && (
                        <div className="glass-card p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <Target className="w-5 h-5 text-gold-300" />
                            <h3 className="font-display text-lg font-semibold text-white">Prerequisite Chain</h3>
                          </div>
                          <PrereqFixList
                            prereqIds={remediation.prereqIds}
                            heading="Revise these first — in order — then retry the diagnostic"
                          />
                        </div>
                      )}

                      {/* Honest empty state — no authored recipe for this node */}
                      {!remediation.commonMisconception &&
                        remediation.diagnostics.length === 0 &&
                        remediation.prereqIds.length === 0 &&
                        !(remediation.onFailure && remediation.onFailure.length > 0) && (
                          <div className="glass-card p-6 text-center">
                            <Lightbulb className="w-8 h-8 text-surface-500 mx-auto mb-3" />
                            <p className="text-sm text-surface-600 mb-4">
                              No authored remediation recipe for this topic yet —
                              the quiz below still checks you against the topic&apos;s
                              verified questions.
                            </p>
                            <button
                              onClick={() => setQuizOpen((v) => !v)}
                              className="btn-secondary text-sm inline-flex items-center gap-2"
                            >
                              <PenSquare className="w-4 h-4" />
                              Take Quiz
                            </button>
                          </div>
                        )}
                    </>
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
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">
                        <AuthoredText text={topic.scope_boundary} />
                      </p>
                    </div>
                  )}

                  {/* Mastery criteria */}
                  {topic.mastery_criteria && (
                    <div className="glass-card p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-mint-300" />
                        <h3 className="font-display text-lg font-semibold text-white">Mastery Criteria</h3>
                      </div>
                      <p className="text-surface-800 leading-relaxed whitespace-pre-wrap">
                        <AuthoredText text={topic.mastery_criteria} />
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prerequisites — live from the knowledge graph */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-5"
            >
              <h3 className="font-display text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-brand-300" />
                Prerequisites
              </h3>
              {prereqsState === 'loading' ? (
                <PanelSkeleton rows={2} />
              ) : prereqsState === 'unavailable' ? (
                <p className="text-xs text-surface-600 flex items-center gap-2">
                  <WifiOff className="w-3.5 h-3.5 text-surface-500 flex-shrink-0" />
                  Prerequisite map unavailable right now.
                </p>
              ) : prereqs.length > 0 ? (
                <div className="space-y-3">
                  {prereqs.map((n, i) => (
                    <motion.div
                      key={n.node_id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                    >
                      <Link href={`/learn/${slugById[n.node_id] || n.node_id}`} className="flex items-center gap-3 group">
                        <Circle className="w-4 h-4 text-gold-300 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-white group-hover:text-brand-300 transition-colors truncate">
                            {graphNodeLabel(n)}
                          </p>
                          {(n.difficulty || n.class_level) && (
                            <p className="text-[10px] text-surface-600">
                              {[
                                n.difficulty,
                                n.class_level ? `Class ${n.class_level}` : null,
                              ].filter(Boolean).join(' · ')}
                            </p>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-surface-600">No prerequisites — this is a foundational topic.</p>
              )}
            </motion.div>

            {/* This Unlocks — live from the knowledge graph */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-card p-5"
            >
              <h3 className="font-display text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-accent-300" />
                This Unlocks
              </h3>
              {unlocksState === 'loading' ? (
                <PanelSkeleton rows={2} />
              ) : unlocksState === 'unavailable' ? (
                <p className="text-xs text-surface-600 flex items-center gap-2">
                  <WifiOff className="w-3.5 h-3.5 text-surface-500 flex-shrink-0" />
                  Unlock map unavailable right now.
                </p>
              ) : unlocks.length > 0 ? (
                <div className="space-y-2">
                  {unlocks.slice(0, 12).map((n, i) => (
                    <motion.div
                      key={n.node_id}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                    >
                      <Link
                        href={`/learn/${slugById[n.node_id] || n.node_id}`}
                        className="flex items-center gap-2 text-sm text-surface-600 hover:text-white transition-colors group"
                      >
                        <ChevronRight className="w-4 h-4 text-surface-600 group-hover:text-brand-300 transition-colors flex-shrink-0" />
                        <span className="truncate">{graphNodeLabel(n)}</span>
                      </Link>
                    </motion.div>
                  ))}
                  {unlocks.length > 12 && (
                    <p className="text-xs text-surface-600 pl-6">
                      and {unlocks.length - 12} more topics build on this
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-surface-600">
                  Nothing unlocks from here yet — this is the newest edge of the map.
                </p>
              )}
            </motion.div>

            {/* Ask your Guide — CHILD-LENS (fix 5): the tutor gets its own
                clearly-labelled card so "Start Learning" and "ask for help"
                are never confused. */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-300 to-gold-600 flex items-center justify-center shadow-glow"><Brain className="w-5 h-5 text-[#1a1408]" /></div>
                <div>
                  <p className="text-sm font-semibold text-white">Ask your Guide</p>
                  <p className="text-xs text-surface-600">I ask questions so YOU find the answer</p>
                </div>
              </div>
              <Link href={`/tutor?node=${encodeURIComponent(nodeId)}`} className="btn-secondary w-full text-xs">
                <Sparkles className="w-3 h-3" />
                Ask your Guide
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sticky next-action bar — always tells the student what to tap */}
      {nodeId && (() => {
        const idx = chapterNodes.findIndex((n) => n.node_id === nodeId)
        const thisDone = chapterDone.has(nodeId)
        const next = idx >= 0 && idx < chapterNodes.length - 1 ? chapterNodes[idx + 1] : null
        const allDone = chapterNodes.length > 0 &&
          chapterNodes.every((n) => chapterDone.has(n.node_id))
        if (!chapterNodes.length) return null
        return (
          <div className="sticky bottom-0 z-40 glass-strong border-t border-surface-300/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
              <p className="text-xs text-surface-600 truncate">
                {allDone
                  ? 'Chapter complete — test unlocked'
                  : thisDone
                    ? 'Step done — keep going'
                    : 'Finish the quick check to complete this step'}
              </p>
              {allDone ? (
                <Link
                  href={`/chapter-test?subject=${encodeURIComponent(topic.subject)}&class_level=${topic.class_level}&chapter=${encodeURIComponent(topic.chapter || '')}`}
                  className="btn-primary shrink-0 text-sm"
                >
                  <Trophy className="w-4 h-4" />
                  Chapter test
                </Link>
              ) : thisDone && next ? (
                <Link
                  href={`/learn/${encodeURIComponent(next.slug || next.node_id)}`}
                  className="btn-primary shrink-0 text-sm"
                >
                  Next: {(next.title.split('—').pop() || next.title).trim().slice(0, 28)}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setQuizOpen(true)
                    document.getElementById('quick-quiz-anchor')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="btn-primary shrink-0 text-sm"
                >
                  <PenSquare className="w-4 h-4" />
                  Take the check
                </button>
              )}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
