'use client'

import { motion } from 'framer-motion'
import {
  ArrowLeft, Search, BookOpen, BookOpenCheck, Brain, Calculator,
  FlaskConical, Leaf, Atom, ChevronRight, Sparkles,
  Globe, Landmark, TrendingUp, Monitor, Languages, Scale, Type,
} from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useRef, useMemo } from 'react'
import { api } from '@/lib/api'
import { useAuthStore } from '@/stores/authStore'
import { PrismLogo } from '@/components/prism/PrismLogo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { isNodeDone } from '@/components/learn/ChapterPath'
import { PlayCircle, RotateCcw, CheckCircle2, Compass } from 'lucide-react'

/** Small doodle thumbnail — hides itself if no card was exported. */
function DoodleThumb({ nodeId }: { nodeId: string }) {
  const [ok, setOk] = useState(false)
  const band = nodeId.match(/^c(\d+)_/)?.[1]
  if (!band) return null
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/doodle_cards/class${band}/${nodeId}.png`} alt=""
      onLoad={() => setOk(true)} onError={() => setOk(false)}
      className={`w-14 h-[70px] object-cover rounded-lg border border-white/10 shrink-0 ${ok ? '' : 'hidden'}`} />
  )
}

interface EnrichmentNode {
  node_id: string
  title: string
  slug?: string | null
  subject: string
  class_level: number
  chapter: string | null
  chapter_title: string | null
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
  { key: 'english', name: 'English', icon: BookOpen, color: 'text-rose-300' },
  { key: 'hindi', name: 'Hindi', icon: Languages, color: 'text-orange-300' },
  { key: 'history', name: 'History', icon: Landmark, color: 'text-amber-300' },
  { key: 'geo', name: 'Geography', icon: Globe, color: 'text-teal-300' },
  { key: 'civics', name: 'Civics', icon: Scale, color: 'text-sky-300' },
  { key: 'eco', name: 'Economics', icon: TrendingUp, color: 'text-lime-300' },
  { key: 'grammar', name: 'Grammar', icon: Type, color: 'text-violet-300' },
  { key: 'cs', name: 'Computer Science', icon: Monitor, color: 'text-cyan-300' },
]

// PLUMB (C7 audit [STUDENT-C7][P1 LEARN-NAV]): the /chapter-test picker
// speaks canonical subject keys (mathematics/chemistry/biology/…), so the
// deep link must translate the learn tab keys. Untranslated keys were
// silently dropped by the picker, which kept its 'mathematics' default —
// a child finishing a Chemistry lesson who clicked Chapter Test landed on
// a MATH test. Subjects with no junior chapter-test bank (hindi, cs) map
// to nothing and the button is hidden instead of misrouting.
const CHAPTER_TEST_KEYS: Record<string, string> = {
  physics: 'physics',
  chem: 'chemistry',
  bio: 'biology',
  maths: 'mathematics',
  english: 'english',
  history: 'history',
  geo: 'geography',
  civics: 'civics',
  eco: 'economics',
  grammar: 'grammar',
}

// CHILD-LENS (fix 1 leftover): corpus tags printed raw on the hub read as
// teacher-training vocabulary ("understand", "apply", "medium") to an
// 11-year-old. Child words, same underlying data (audit Q7).
const COGNITIVE_WORDS: Record<string, string> = {
  remember: 'Remember',
  understand: 'Think',
  apply: 'Try it',
  analyze: 'Puzzle',
  evaluate: 'Judge',
  create: 'Make',
}

const DIFFICULTY_WORDS: Record<string, string> = {
  easy: 'Practice',
  medium: 'Think',
  hard: 'Challenge',
}

export default function LearnPage() {
  const user = useAuthStore((s) => s.user)
  // EXAM-LOOP: exam results deep-link here as /learn?search=<weak topic>
  // so a missed section lands the student on a filtered study list.
  const urlSearch = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('search') ?? ''
    : '';
  const [search, setSearch] = useState(urlSearch)
  const [subject, setSubject] = useState('physics')
  // PLUMB (C7 audit [STUDENT-C7][P1 LEARN-NAV]): this was useState(10) and
  // never read the signed-in user — a Class 7 child landed on Class 10
  // physics until they noticed the selector. Same hydration trap the
  // chapter-test page already fixed ([fixed-grademap]): the auth store
  // rehydrates AFTER first render, so classLevel starts neutral and an
  // effect adopts the student's class_level once it lands, never
  // overriding an explicit pick.
  const [classLevel, setClassLevel] = useState(0)
  const classTouchedRef = useRef(false)
  const [nodes, setNodes] = useState<EnrichmentNode[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // guidance layer: resume card, review-due nudge, chapter-grouped path
  const [lastNode, setLastNode] = useState<string | null>(null)
  const [dueCount, setDueCount] = useState(0)
  const [doneSet, setDoneSet] = useState<Set<string>>(new Set())

  // Auth hydration sync: once the signed-in user's own class_level lands
  // in the store, adopt it unless the child already picked a class.
  useEffect(() => {
    if (classTouchedRef.current) return
    const own = Number((user as { class_level?: number } | null)?.class_level)
    if (own >= 1 && own <= 12) {
      setClassLevel((prev) => (prev === own ? prev : own))
    }
  }, [user])

  useEffect(() => {
    if (!classLevel) return // wait for hydration — never fetch class 0
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

  // done-set + resume target — recomputed when the node list lands and
  // whenever a node-done event fires from anywhere in the app
  useEffect(() => {
    setLastNode(localStorage.getItem('atlas_last_node'))
    const refresh = () => setDoneSet(new Set(nodes.filter(n => isNodeDone(n.node_id)).map(n => n.node_id)))
    refresh()
    window.addEventListener('atlas:node-done', refresh)
    return () => window.removeEventListener('atlas:node-done', refresh)
  }, [nodes])

  // review-due nudge — the SM-2 queue count, surfaced where students browse
  useEffect(() => {
    api.get<{ due_today?: number; dueToday?: number }>('/api/progress/review/stats')
      .then(d => setDueCount(d?.due_today ?? d?.dueToday ?? 0))
      .catch(() => setDueCount(0))   // anonymous → no nudge, honest silence
  }, [])

  // chapters in syllabus order (chapter ids sort numerically; nulls last)
  const chapters = useMemo(() => {
    const byCh = new Map<string, EnrichmentNode[]>()
    for (const n of filtered) {
      const k = n.chapter || 'other'
      if (!byCh.has(k)) byCh.set(k, [])
      byCh.get(k)!.push(n)
    }
    return [...byCh.entries()].sort(([a], [b]) => {
      if (a === 'other') return 1
      if (b === 'other') return -1
      return a.localeCompare(b, undefined, { numeric: true })
    })
  }, [filtered])

  // "start here" — first undone node in the first chapter — THEN verify
  // prerequisites: if the candidate's prereqs aren't done, the real next
  // step is the blocking prerequisite itself (adaptive ordering, not just
  // syllabus order)
  const [nextStep, setNextStep] = useState<{ node: EnrichmentNode; reason: string } | null>(null)
  useEffect(() => {
    let alive = true
    const candidate = (() => {
      for (const [, ns] of chapters) {
        const first = ns.find(n => !doneSet.has(n.node_id))
        if (first) return first
      }
      return null
    })()
    if (!candidate) { setNextStep(null); return }
    api.get<{ prerequisites: { node_id: string; name?: string }[] }>(
      `/api/graph/prerequisites/${encodeURIComponent(candidate.node_id)}`)
      .then(d => {
        if (!alive) return
        const unmet = (d?.prerequisites || []).find(p => !isNodeDone(p.node_id))
        if (unmet) {
          setNextStep({
            node: { ...candidate, node_id: unmet.node_id, title: unmet.name || 'Foundation topic' },
            reason: `Learn this first — "${candidate.title.slice(0, 40)}…" needs it`,
          })
        } else {
          setNextStep({ node: candidate, reason: 'All foundations cleared — this is next on your path' })
        }
      })
      .catch(() => alive && setNextStep({ node: candidate, reason: 'Next on your path' }))
    return () => { alive = false }
  }, [chapters, doneSet])
  const lastNodeInfo = useMemo(() => nodes.find(n => n.node_id === lastNode), [nodes, lastNode])
  const lastNodeDone = lastNodeInfo ? doneSet.has(lastNodeInfo.node_id) : false

  return (
    <div className="min-h-screen mesh-bg-animated">
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-300/30" role="banner">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PrismLogo size={28} />
            <Link href="/dashboard" className="btn-ghost px-2" aria-label="Go back to dashboard">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </Link>
            <h1 className="font-display text-sm font-semibold text-white truncate min-w-0">Knowledge Graph</h1>
          </div>
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-surface-600" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search topics..."
                aria-label="Search topics"
                className="input-field pl-9 text-xs h-9 w-28 min-w-0 sm:w-56"
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
            {nodes.length} topics · {doneSet.size} cleared. Pick a card — or use the guide below.
          </p>
        </motion.div>

        {/* ── Your path — ordered by learning value: memory decay first
            (review > resume > next-ready), each card says WHY it's here ── */}
        {!loading && classLevel > 0 && (dueCount > 0 || (lastNodeInfo && !lastNodeDone) || nextStep) && (
          <div className="space-y-2 mb-6">
            {dueCount > 0 && (
              <Link href="/review" className="glass-card-hover p-4 flex items-center gap-3 border-l-4 border-amber-400">
                <RotateCcw className="w-8 h-8 text-amber-300 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-300">Do first — memory fades fast</p>
                  <p className="text-sm font-semibold text-white">{dueCount} topic{dueCount === 1 ? '' : 's'} due for re-testing</p>
                  <p className="text-[11px] text-surface-500">Re-testing now locks them in — cheaper than relearning later</p>
                </div>
              </Link>
            )}
            {lastNodeInfo && !lastNodeDone && (
              <Link href={`/learn/${lastNodeInfo.slug || lastNodeInfo.node_id}`}
                className="glass-card-hover p-4 flex items-center gap-3 border-l-4 border-brand-400">
                <DoodleThumb nodeId={lastNodeInfo.node_id} />
                <PlayCircle className="w-8 h-8 text-brand-300 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-300">Finish what you started</p>
                  <p className="text-sm font-semibold text-white truncate">{lastNodeInfo.title}</p>
                </div>
              </Link>
            )}
            {nextStep && (
              <Link href={`/learn/${nextStep.node.slug || nextStep.node.node_id}`}
                className="glass-card-hover p-4 flex items-center gap-3 border-l-4 border-mint-400">
                <DoodleThumb nodeId={nextStep.node.node_id} />
                <Compass className="w-8 h-8 text-mint-300 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-mint-300">Then this</p>
                  <p className="text-sm font-semibold text-white truncate">{nextStep.node.title}</p>
                  <p className="text-[11px] text-surface-500">{nextStep.reason}</p>
                </div>
              </Link>
            )}
          </div>
        )}

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
            {CHAPTER_TEST_KEYS[subject] && (
              <Link
                href={`/chapter-test?subject=${CHAPTER_TEST_KEYS[subject]}&class=${classLevel || ''}`}
                className="glass-card px-4 py-2 rounded-xl text-sm text-surface-600 hover:text-white inline-flex items-center gap-2"
                aria-label="Take a chapter test"
              >
                <BookOpenCheck className="w-4 h-4 text-sky-300" />
                Chapter Test
              </Link>
            )}
            <label className="text-xs text-surface-600">Class</label>
            <select
              value={classLevel || ''}
              onChange={(e) => {
                classTouchedRef.current = true
                setClassLevel(Number(e.target.value))
              }}
              aria-label="Select class level"
              className="glass-strong border border-surface-300/30 rounded-xl px-3 py-2 text-sm text-white"
            >
              {!classLevel && (
                <option value="" className="bg-surface-800">
                  Class…
                </option>
              )}
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

        {/* All-clear state — when the whole subject is done, the path
            becomes "prove it": chapter test or a harder class */}
        {!loading && classLevel > 0 && nodes.length > 0 && doneSet.size === nodes.length && (
          <div className="glass-card p-5 mb-6 border-l-4 border-gold-400 flex items-center gap-4">
            <span className="text-3xl">🏆</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">You cleared every topic in this subject!</p>
              <p className="text-xs text-surface-500 mt-0.5">Prove it under pressure — take the chapter test, or jump up a class.</p>
            </div>
            {CHAPTER_TEST_KEYS[subject] && (
              <Link href={`/chapter-test?subject=${CHAPTER_TEST_KEYS[subject]}&class=${classLevel}`}
                className="btn-primary text-xs shrink-0">Chapter Test →</Link>
            )}
          </div>
        )}

        {/* Topics — grouped by chapter so the syllabus order is the map */}
        {loading || !classLevel ? (
          <div className="text-center py-12">
            <p className="text-sm text-surface-600">Loading topics...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {chapters.map(([chKey, chNodes]) => {
              const chDone = chNodes.filter(n => doneSet.has(n.node_id)).length
              const chTitle = chNodes[0]?.chapter_title
                || (chKey === 'other' ? 'More topics' : `Chapter ${String(chKey).replace(/^ch0*/i, '')}`)
              return (
                <section key={chKey}>
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="font-display text-base font-bold text-white">{chTitle}</h2>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${chDone === chNodes.length ? 'bg-mint-500/15 text-mint-300' : 'bg-white/5 text-surface-500'}`}>
                      {chDone === chNodes.length ? '✓ all done' : `${chDone}/${chNodes.length}`}
                    </span>
                    <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-mint-500 to-brand-400 transition-all"
                        style={{ width: `${chNodes.length ? (chDone / chNodes.length) * 100 : 0}%` }} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {chNodes.map((node) => {
                      const subj = SUBJECTS.find((s) => s.key === node.subject)
                      const Icon = subj?.icon || BookOpen
                      const done = doneSet.has(node.node_id)
                      return (
                        <Link key={node.node_id} href={`/learn/${node.slug || node.node_id}`}>
                          <div className={`glass-card-hover p-4 h-full group ${done ? 'border-l-2 border-mint-500/50' : ''}`}>
                            <div className="flex items-start gap-3">
                              {done
                                ? <CheckCircle2 className="w-5 h-5 text-mint-400 flex-shrink-0 mt-0.5" />
                                : <Icon className={`w-5 h-5 ${subj?.color || 'text-brand-300'} flex-shrink-0 mt-0.5`} />}
                              <div className="flex-1 min-w-0">
                                <h3 className={`text-sm font-medium group-hover:text-brand-300 transition-colors ${done ? 'text-surface-400' : 'text-white'}`}>
                                  {node.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  {node.cognitive_level && (
                                    <span className="text-[10px] text-surface-600">
                                      {COGNITIVE_WORDS[node.cognitive_level.toLowerCase()] ?? node.cognitive_level}
                                    </span>
                                  )}
                                  {node.difficulty && (
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                      node.difficulty === 'hard'
                                        ? 'bg-red-500/15 text-red-300'
                                        : node.difficulty === 'medium'
                                        ? 'bg-gold-500/15 text-gold-300'
                                        : 'bg-mint-500/15 text-mint-300'
                                    }`}>
                                      {DIFFICULTY_WORDS[node.difficulty.toLowerCase()] ?? node.difficulty}
                                    </span>
                                  )}
                                  {done && <span className="text-[10px] text-mint-400">done ✓</span>}
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-surface-600 group-hover:text-white transition-colors flex-shrink-0" />
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        )}

        {!loading && classLevel && filtered.length === 0 && (
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
