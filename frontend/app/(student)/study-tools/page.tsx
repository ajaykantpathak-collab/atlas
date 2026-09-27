'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Wrench, Layers, Sigma, Book, AlertTriangle, Globe, PenTool,
  Loader2, Search, ChevronRight, ChevronLeft, RotateCcw,
  Atom, FlaskConical, Leaf, Calculator, Sparkles, ChevronDown,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useAuthStore } from '@/stores/authStore'

interface ContentItem {
  id: string
  target_class: number
  target_subject: string
  content_type: string
  title: string
  content: string
  source_file?: string
  board?: string
}

interface ApiResponse {
  items: ContentItem[]
  total: number
}

type ToolId =
  | 'quick_revision_cards'
  | 'formula_bank'
  | 'glossary'
  | 'misconceptions'
  | 'real_world_applications'
  | 'worked_examples'


/* Corpus rows ship raw markdown with parser headers (SUBJECT:/CHAPTER:/
   Target subject:/Target class:) that must not reach the student. */
function cleanCorpus(raw: string): string {
  return (raw || '')
    .split('\n')
    .filter((line) => {
      const t = line.trim()
      return !/^(TARGET|SUBJECT|CHAPTER|CLASS|BOARD|SOURCE|NODE_ID)\s*:/i.test(t)
    })
    .join('\n')
    .replace(/```[\s\S]*?```/g, (m) => m.replace(/```\w*/g, '').replace(/```/g, ''))
    .trim()
}

function CorpusText({ raw, className }: { raw: string; className?: string }) {
  return (
    <div className={className}>
      <ReactMarkdown
        components={{
          h1: (p) => <p className="font-bold text-white" {...p} />,
          h2: (p) => <p className="font-bold text-white" {...p} />,
          h3: (p) => <p className="font-semibold text-white/90" {...p} />,
          code: (p) => <code className="rounded bg-white/10 px-1 text-xs" {...p} />,
        }}
      >
        {cleanCorpus(raw)}
      </ReactMarkdown>
    </div>
  )
}

interface ToolMeta {
  id: ToolId
  name: string
  description: string
  icon: typeof Layers
  accent: string
}

const TOOLS: ToolMeta[] = [
  {
    id: 'quick_revision_cards',
    name: 'Flashcards',
    description: 'Flip through quick revision cards to reinforce key concepts.',
    icon: Layers,
    accent: 'from-indigo-500 to-purple-500',
  },
  {
    id: 'formula_bank',
    name: 'Formula Bank',
    description: 'Searchable library of every formula you need to memorise.',
    icon: Sigma,
    accent: 'from-sky-500 to-cyan-500',
  },
  {
    id: 'glossary',
    name: 'Glossary',
    description: 'Alphabetical glossary of important terms and definitions.',
    icon: Book,
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'misconceptions',
    name: 'Mistakes to Avoid',
    description: 'Common mistakes and the corrections that fix them.',
    icon: AlertTriangle,
    accent: 'from-rose-500 to-red-500',
  },
  {
    id: 'real_world_applications',
    name: 'Real-World Applications',
    description: 'See how classroom concepts power the real world.',
    icon: Globe,
    accent: 'from-amber-500 to-orange-500',
  },
  {
    id: 'worked_examples',
    name: 'Worked Examples',
    description: 'Step-by-step solutions you can expand and follow along.',
    icon: PenTool,
    accent: 'from-fuchsia-500 to-pink-500',
  },
]

const SUBJECTS = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'Physics', label: 'Physics', icon: Atom },
  { id: 'Chemistry', label: 'Chemistry', icon: FlaskConical },
  { id: 'Biology', label: 'Biology', icon: Leaf },
  { id: 'Maths', label: 'Maths', icon: Calculator },
]

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

export default function StudyToolsPage() {
  const { user } = useAuthStore()
  const classLevel = user?.classLevel || 10

  const [activeTool, setActiveTool] = useState<ToolId | null>(null)
  const [subject, setSubject] = useState<string>('all')
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Live per-tool item totals for this student's class — replaces the old
  // hardcoded card counts that advertised items the backend doesn't have.
  const [liveCounts, setLiveCounts] = useState<Partial<Record<ToolId, number>>>({})

  useEffect(() => {
    let cancelled = false
    async function loadCounts() {
      const entries = await Promise.all(
        TOOLS.map(async (t) => {
          try {
            const params = new URLSearchParams({
              content_type: t.id,
              class_level: String(classLevel),
              limit: '1',
            })
            const res = await fetch(`${API_BASE}/api/content/class-content?${params.toString()}`)
            if (!res.ok) throw new Error(String(res.status))
            const data: ApiResponse = await res.json()
            return [t.id, data.total ?? data.items?.length ?? 0] as const
          } catch {
            return [t.id, 0] as const
          }
        })
      )
      if (!cancelled) setLiveCounts(Object.fromEntries(entries))
    }
    loadCounts()
    return () => {
      cancelled = true
    }
  }, [classLevel])

  useEffect(() => {
    if (!activeTool) return
    let cancelled = false

    async function load() {
      if (!activeTool) return
      setLoading(true)
      setError(null)
      try {
        const params = new URLSearchParams({
          content_type: activeTool,
          class_level: String(classLevel),
          limit: '50',
        })
        if (subject !== 'all') params.set('subject', subject)
        const res = await fetch(
          `${API_BASE}/api/content/class-content?${params.toString()}`
        )
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data: ApiResponse = await res.json()
        if (!cancelled) setItems(data.items || [])
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load content')
          setItems([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [activeTool, subject, classLevel])

  const activeMeta = TOOLS.find((t) => t.id === activeTool) || null

  return (
    <div className="min-h-screen mesh-bg-animated">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="glass-card flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Wrench className="h-4 w-4" />
            <span>Class {classLevel}</span>
          </div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-4 ring-1 ring-white/10">
            <Wrench className="h-8 w-8 text-indigo-300" />
          </div>
          <h1 className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Study Tools
          </h1>
          <p className="mt-3 text-lg text-white/60">
            Interactive tools to master every topic
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTool === null ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ToolGrid onSelect={setActiveTool} counts={liveCounts} />
            </motion.div>
          ) : (
            <motion.div
              key="tool"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ToolView
                meta={activeMeta!}
                items={items}
                loading={loading}
                error={error}
                subject={subject}
                onSubjectChange={setSubject}
                onBack={() => setActiveTool(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tool grid                                                           */
/* ------------------------------------------------------------------ */

function ToolGrid({
  onSelect,
  counts,
}: {
  onSelect: (id: ToolId) => void
  counts: Partial<Record<ToolId, number>>
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {TOOLS.map((tool, i) => (
        <motion.button
          key={tool.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          whileHover={{ y: -6, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(tool.id)}
          className="glass-card group relative overflow-hidden rounded-2xl p-6 text-left"
        >
          <div
            className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${tool.accent} opacity-20 blur-2xl transition-opacity group-hover:opacity-40`}
          />
          <div
            className={`mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${tool.accent} p-3 shadow-lg`}
          >
            <tool.icon className="h-6 w-6 text-white" />
          </div>
          <h3 className="mb-1 text-xl font-semibold text-white">{tool.name}</h3>
          <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/70">
            {counts[tool.id] ?? 0} items
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            {tool.description}
          </p>
          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-white/50 transition group-hover:text-white/80">
            Open tool
            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </div>
        </motion.button>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tool view wrapper                                                   */
/* ------------------------------------------------------------------ */

function ToolView({
  meta,
  items,
  loading,
  error,
  subject,
  onSubjectChange,
  onBack,
}: {
  meta: ToolMeta
  items: ContentItem[]
  loading: boolean
  error: string | null
  subject: string
  onSubjectChange: (s: string) => void
  onBack: () => void
}) {
  return (
    <div>
      {/* Back + title */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={onBack}
          className="glass-card inline-flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/80 transition hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          All Tools
        </button>
        <div className="flex items-center gap-3">
          <div
            className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${meta.accent} p-2.5 shadow-lg`}
          >
            <meta.icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{meta.name}</h2>
            <p className="text-xs text-white/50">{items.length} items loaded</p>
          </div>
        </div>
      </div>

      {/* Subject filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            onClick={() => onSubjectChange(s.id)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              subject === s.id
                ? 'bg-white text-slate-900 shadow-lg'
                : 'glass-card text-white/70 hover:text-white'
            }`}
          >
            <s.icon className="h-3.5 w-3.5" />
            {s.label}
          </button>
        ))}
      </div>

      {/* Body */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-300" />
          <p className="mt-4 text-sm text-white/60">Loading {meta.name}…</p>
        </div>
      ) : error ? (
        <div className="glass-card rounded-2xl p-8 text-center">
          <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-rose-400" />
          <p className="text-white/80">{error}</p>
        </div>
      ) : items.length === 0 ? (
        <div className="glass-card rounded-2xl p-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
            <Search className="h-6 w-6 text-white/40" />
          </div>
          <h3 className="font-display text-base font-semibold text-white mb-2">
            No {meta.name.toLowerCase()} for this class yet
          </h3>
          <p className="mx-auto max-w-sm text-sm text-white/60 mb-5">
            Try another class or subject — or sharpen with practice while the library grows.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <a href="/practice" className="btn-primary text-sm">Practice instead</a>
            <a href="/learn" className="btn-secondary text-sm">Browse lessons</a>
          </div>
        </div>
      ) : (
        <ToolContent kind={meta.id} items={items} />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tool-specific content                                               */
/* ------------------------------------------------------------------ */

function ToolContent({ kind, items }: { kind: ToolId; items: ContentItem[] }) {
  switch (kind) {
    case 'quick_revision_cards':
      return <Flashcards items={items} />
    case 'formula_bank':
      return <FormulaBank items={items} />
    case 'glossary':
      return <Glossary items={items} />
    case 'misconceptions':
      return <Misconceptions items={items} />
    case 'real_world_applications':
      return <RealWorld items={items} />
    case 'worked_examples':
      return <WorkedExamples items={items} />
    default:
      return null
  }
}

/* ----------------------------- Flashcards -------------------------- */

function Flashcards({ items }: { items: ContentItem[] }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const card = items[index]
  const total = items.length

  const next = () => {
    setFlipped(false)
    setIndex((i) => (i + 1) % total)
  }
  const prev = () => {
    setFlipped(false)
    setIndex((i) => (i - 1 + total) % total)
  }
  const reset = () => {
    setFlipped(false)
    setIndex(0)
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-4 flex items-center justify-between text-sm text-white/60">
        <span>
          Card {index + 1} / {total}
        </span>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1 text-white/60 transition hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      </div>
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          animate={{ width: `${((index + 1) / total) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Flip card */}
      <div
        className="relative h-80 w-full cursor-pointer"
        style={{ perspective: '1200px' }}
        onClick={() => setFlipped((f) => !f)}
      >
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
        >
          {/* Front */}
          <div
            className="glass-card absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-8 text-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <Layers className="mb-4 h-8 w-8 text-indigo-300" />
            <p className="text-xs uppercase tracking-wider text-white/40">
              Question
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              {card.title}
            </h3>
            <p className="mt-4 text-xs text-white/40">Click to flip</p>
          </div>
          {/* Back */}
          <div
            className="glass-card absolute inset-0 flex flex-col items-center justify-center rounded-3xl p-8 text-center"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <p className="text-xs uppercase tracking-wider text-white/40">
              Answer
            </p>
            <p className="mt-3 max-h-full overflow-auto text-base leading-relaxed text-white/90">
              <CorpusText raw={card.content} />
            </p>
          </div>
        </motion.div>
      </div>

      {/* Nav */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={prev}
          className="glass-card inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-white/80 transition hover:text-white"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        <button
          onClick={next}
          className="glass-card inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium text-white/80 transition hover:text-white"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

/* --------------------------- Searchable list ----------------------- */

function useSearch(items: ContentItem[]) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (it) =>
        it.title.toLowerCase().includes(q) ||
        it.content.toLowerCase().includes(q)
    )
  }, [items, query])
  return { query, setQuery, filtered }
}

function SearchBar({
  query,
  setQuery,
  placeholder,
}: {
  query: string
  setQuery: (q: string) => void
  placeholder: string
}) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="glass-card w-full rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
      />
    </div>
  )
}

/* --------------------------- Formula Bank -------------------------- */

function FormulaBank({ items }: { items: ContentItem[] }) {
  const { query, setQuery, filtered } = useSearch(items)
  return (
    <div className="mx-auto max-w-3xl">
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search formulas…"
      />
      <div className="grid gap-4">
        {filtered.map((it, i) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="mb-2 flex items-center gap-2">
              <Sigma className="h-4 w-4 text-sky-300" />
              <h3 className="font-semibold text-white">{it.title}</h3>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70">
              <CorpusText raw={it.content} />
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ----------------------------- Glossary ---------------------------- */

function Glossary({ items }: { items: ContentItem[] }) {
  const { query, setQuery, filtered } = useSearch(items)
  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
      ),
    [filtered]
  )
  return (
    <div className="mx-auto max-w-3xl">
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search terms…"
      />
      <div className="grid gap-3">
        {sorted.map((it, i) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="glass-card rounded-xl p-4"
          >
            <div className="mb-1 flex items-center gap-2">
              <Book className="h-4 w-4 text-emerald-300" />
              <h3 className="font-semibold text-white">{it.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              <CorpusText raw={it.content} />
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* -------------------------- Misconceptions ------------------------- */

function Misconceptions({ items }: { items: ContentItem[] }) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(
      (it) =>
        it.title.toLowerCase().includes(q) ||
        it.content.toLowerCase().includes(q)
    )
  }, [items, query])

  return (
    <div className="mx-auto max-w-5xl">
      <SearchBar
        query={query}
        setQuery={setQuery}
        placeholder="Search mistakes…"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((it, i) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.02 }}
            className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5"
          >
            <div className="mb-2 flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
              <h3 className="font-semibold text-rose-100">{it.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/80">
              <CorpusText raw={it.content} />
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* --------------------------- Real World ---------------------------- */

function RealWorld({ items }: { items: ContentItem[] }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it, i) => (
        <motion.div
          key={it.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          whileHover={{ y: -4 }}
          className="glass-card relative overflow-hidden rounded-2xl p-5"
        >
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/30 blur-2xl" />
          <div className="mb-3 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 p-2.5 shadow-lg">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">{it.title}</h3>
          <p className="text-sm leading-relaxed text-white/70"><CorpusText raw={it.content} /></p>
        </motion.div>
      ))}
    </div>
  )
}

/* -------------------------- Worked Examples ------------------------ */

function WorkedExamples({ items }: { items: ContentItem[] }) {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-3">
        {items.map((it, i) => {
          const isOpen = open === it.id
          return (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="glass-card overflow-hidden rounded-xl"
            >
              <button
                onClick={() => setOpen(isOpen ? null : it.id)}
                className="flex w-full items-center justify-between gap-3 p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-500 p-2">
                    <PenTool className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-white">{it.title}</h3>
                </div>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-white/50 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 p-4">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/80">
                        <CorpusText raw={it.content} />
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
