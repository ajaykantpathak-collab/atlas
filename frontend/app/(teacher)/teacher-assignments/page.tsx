'use client'

/**
 * Teacher Assignments — create class homework and track real completion.
 *
 * Create:   POST /api/assignments           (class + curriculum topic +
 *                                            question count + due date)
 * List:     GET  /api/assignments/teacher   (per-student completion status,
 *                                            computed from real completion
 *                                            rows written by student submits)
 * Topics:   GET  /api/nodes/search          (the canonical CBSE corpus)
 *
 * Every number on this page comes from the database — a student appears
 * "Completed" only after their submit wrote a completion row.
 */

import { useCallback, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ClipboardList, Plus, Search, RefreshCw, ChevronDown, ChevronUp,
  CheckCircle2, Clock, Users, BookOpen, Calendar, AlertCircle,
} from 'lucide-react'
// Page shell is static; ALL data loads client-side after auth, so
// force-static serves the shell instantly instead of per-request SSR.
export const dynamic = 'force-static';

import AuthGuard from '@/components/AuthGuard'
import { useAuthStore } from '@/stores/authStore'
import { getAuthToken } from '@/lib/api'

interface ClassInfo {
  id: string
  name: string
  grade: number
  subject: string
  studentCount: number
}

interface NodeHit {
  node_id: string
  title: string
  class: number
  subject: string
  chapter: number
  definition?: string
}

interface StudentStatus {
  studentId: string
  name: string
  completed: boolean
  scorePct: number | null
  correctCount: number | null
  questionCount: number | null
  completedAt: string | null
}

interface AssignmentRow {
  id: string
  classId: string
  className: string
  topicLabel: string
  subject: string
  questionCount: number
  dueDate: string | null
  note: string | null
  createdAt: string | null
  rosterCount: number
  completedCount: number
  students: StudentStatus[]
}

async function authFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getAuthToken()
  const res = await fetch(path, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  })
  const body = await res.json().catch(() => null)
  if (!res.ok) {
    const detail = body?.detail || body?.message || `Request failed (${res.status})`
    throw new Error(typeof detail === 'string' ? detail : JSON.stringify(detail))
  }
  return body as T
}

function formatDate(iso: string | null): string {
  if (!iso) return 'No due date'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return 'No due date'
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function dueState(iso: string | null): { label: string; tone: 'over' | 'soon' | 'later' } {
  if (!iso) return { label: 'Open-ended', tone: 'later' }
  const days = Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000)
  if (days < 0) return { label: 'Past due', tone: 'over' }
  if (days === 0) return { label: 'Due today', tone: 'soon' }
  if (days === 1) return { label: 'Due tomorrow', tone: 'soon' }
  return { label: `${days} days left`, tone: 'later' }
}

// ───────────────────────────────────────────────────────────────
//  Create form
// ───────────────────────────────────────────────────────────────

function CreateAssignmentCard({ classes, onCreated }: {
  classes: ClassInfo[]
  onCreated: (msg: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [classId, setClassId] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<NodeHit[]>([])
  const [searching, setSearching] = useState(false)
  const [picked, setPicked] = useState<NodeHit | null>(null)
  const [count, setCount] = useState(5)
  const [dueDate, setDueDate] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const selectedClass = classes.find((c) => c.id === classId)

  useEffect(() => {
    if (!query.trim() || query.trim().length < 3) {
      setResults([])
      return
    }
    const t = setTimeout(async () => {
      setSearching(true)
      try {
        const grade = selectedClass?.grade || undefined
        const qs = new URLSearchParams({ q: query.trim(), limit: '8' })
        if (grade) qs.set('class', String(grade))
        const data = await authFetch<{ results: NodeHit[] }>(`/api/nodes/search?${qs}`)
        setResults(data.results || [])
      } catch {
        setResults([])
      } finally {
        setSearching(false)
      }
    }, 350)
    return () => clearTimeout(t)
  }, [query, selectedClass])

  const reset = () => {
    setQuery(''); setResults([]); setPicked(null); setCount(5)
    setDueDate(''); setNote(''); setError('')
  }

  const submit = async () => {
    setError('')
    if (!classId) return setError('Choose a class first.')
    if (!picked) return setError('Search and pick a curriculum topic.')
    setBusy(true)
    try {
      const r = await authFetch<{ assignmentId: string; questionsAvailable: number }>(
        '/api/assignments',
        {
          method: 'POST',
          body: JSON.stringify({
            classId,
            nodeId: picked.node_id,
            topicLabel: picked.title,
            subject: selectedClass?.subject || '',
            classLevel: picked.class || selectedClass?.grade || 0,
            questionCount: count,
            dueDate: dueDate || null,
            note: note || null,
          }),
        },
      )
      onCreated(
        `Assignment created — ${r.questionsAvailable} question(s) available in the bank for "${picked.title}".`,
      )
      reset()
      setOpen(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not create the assignment.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="glass-card rounded-2xl border border-white/10 p-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
            <Plus className="h-5 w-5" />
          </span>
          <span>
            <span className="block font-display text-base font-bold text-white">Create assignment</span>
            <span className="block text-xs text-white/45">
              Pick a class, a curriculum topic, how many questions, when it&apos;s due
            </span>
          </span>
        </span>
        {open ? <ChevronUp className="h-4 w-4 text-white/40" /> : <ChevronDown className="h-4 w-4 text-white/40" />}
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/50">Class</span>
              <select
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="input-field h-10 w-full text-sm"
              >
                <option value="">Select class…</option>
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} · {c.studentCount} students
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/50">Questions</span>
              <input
                type="number"
                min={1}
                max={20}
                value={count}
                onChange={(e) => setCount(Math.max(1, Math.min(20, Number(e.target.value) || 5)))}
                className="input-field h-10 w-full text-sm"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/50">Due date</span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="input-field h-10 w-full text-sm"
              />
            </label>
          </div>

          <div className="relative">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/50">
              Curriculum topic {selectedClass ? `(class ${selectedClass.grade})` : ''}
            </span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPicked(null) }}
                placeholder="Search the CBSE corpus — e.g. quadratic equations, reflection of light…"
                className="input-field h-10 w-full pl-9 text-sm"
              />
            </div>
            {picked && (
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-xs text-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="line-clamp-1">{picked.title}</span>
              </div>
            )}
            {(searching || results.length > 0) && !picked && (
              <div className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur">
                {searching && <p className="px-4 py-3 text-xs text-white/40">Searching…</p>}
                {!searching && results.length === 0 && (
                  <p className="px-4 py-3 text-xs text-white/40">No topics match — try different words.</p>
                )}
                {results.map((n) => (
                  <button
                    key={n.node_id}
                    onClick={() => setPicked(n)}
                    className="block w-full border-b border-white/5 px-4 py-2.5 text-left transition-colors last:border-0 hover:bg-white/5"
                  >
                    <span className="line-clamp-1 text-xs font-medium text-white/90">{n.title}</span>
                    <span className="mt-0.5 block text-[10px] text-white/35">
                      Class {n.class} · {n.subject}{n.chapter ? ` · Chapter ${n.chapter}` : ''}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <label className="block">
            <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-white/50">Note for students (optional)</span>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Solve every step — marks for working"
              className="input-field h-10 w-full text-sm"
            />
          </label>

          {error && (
            <p className="flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-200">
              <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> {error}
            </p>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={submit}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:bg-brand-400 disabled:opacity-50"
            >
              {busy ? 'Creating…' : 'Assign homework'}
            </button>
            <p className="text-[11px] text-white/35">
              Questions are served per student from the verified CBSE question bank — answers stay server-side.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────
//  Assignment row with completion status
// ───────────────────────────────────────────────────────────────

function AssignmentCard({ a, index }: { a: AssignmentRow; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const pct = a.rosterCount > 0 ? Math.round((a.completedCount / a.rosterCount) * 100) : 0
  const due = dueState(a.dueDate)

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.05, 0.3) }}
      className="glass-card rounded-2xl border border-white/10 p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-brand-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-300">
              {a.className || 'Class'}
            </span>
            {a.subject && (
              <span className="rounded-lg bg-white/5 px-2.5 py-1 text-[10px] font-medium text-white/50">
                {a.subject}
              </span>
            )}
            <span
              className={`rounded-lg px-2.5 py-1 text-[10px] font-medium ${
                due.tone === 'over' ? 'bg-red-500/15 text-red-300'
                  : due.tone === 'soon' ? 'bg-amber-500/15 text-amber-300'
                  : 'bg-white/5 text-white/50'
              }`}
            >
              {due.label}
            </span>
          </div>
          <h3 className="font-display text-base font-bold text-white">{a.topicLabel}</h3>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/40">
            <span className="inline-flex items-center gap-1"><BookOpen className="h-3 w-3" /> {a.questionCount} questions</span>
            <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {a.rosterCount} students</span>
            <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> Due {formatDate(a.dueDate)}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-bold text-white">
            {a.completedCount}<span className="text-sm text-white/40">/{a.rosterCount}</span>
          </p>
          <p className="text-[10px] uppercase tracking-wider text-white/40">completed</p>
        </div>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand-300 hover:text-brand-200"
      >
        {expanded ? 'Hide' : 'Show'} student status
        {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </button>

      {expanded && (
        <div className="mt-3 divide-y divide-white/5 overflow-hidden rounded-xl border border-white/10">
          {a.students.length === 0 && (
            <p className="px-4 py-3 text-xs text-white/40">No students enrolled in this class yet.</p>
          )}
          {a.students.map((s) => (
            <div key={s.studentId} className="flex items-center justify-between gap-3 bg-white/[0.02] px-4 py-2.5">
              <span className="truncate text-sm text-white/85">{s.name || 'Student'}</span>
              {s.completed ? (
                <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {s.scorePct ?? 0}% ({s.correctCount ?? 0}/{s.questionCount ?? '?'})
                </span>
              ) : (
                <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1 text-xs font-medium text-white/45">
                  <Clock className="h-3.5 w-3.5" />
                  Pending
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ───────────────────────────────────────────────────────────────
//  Page
// ───────────────────────────────────────────────────────────────

function TeacherAssignmentsContent() {
  const user = useAuthStore((s) => s.user)
  const [classes, setClasses] = useState<ClassInfo[]>([])
  const [assignments, setAssignments] = useState<AssignmentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [spinning, setSpinning] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [cls, asg] = await Promise.all([
        authFetch<{ data: ClassInfo[] }>('/api/teacher/classes?pageSize=50'),
        authFetch<AssignmentRow[]>('/api/assignments/teacher'),
      ])
      setClasses(cls.data || [])
      setAssignments(Array.isArray(asg) ? asg : [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load assignments.')
    } finally {
      setLoading(false)
      setSpinning(true)
      setTimeout(() => setSpinning(false), 900)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const totals = useMemo(() => {
    const roster = assignments.reduce((s, a) => s + a.rosterCount, 0)
    const done = assignments.reduce((s, a) => s + a.completedCount, 0)
    return { assignments: assignments.length, roster, done }
  }, [assignments])

  return (
    <div className="mx-auto max-w-5xl">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-400/80">
            Teacher Suite
          </p>
          <h1 className="mt-1 flex items-center gap-3 font-display text-3xl font-bold text-white sm:text-4xl">
            <ClipboardList className="h-7 w-7 text-brand-300" />
            Assignments
          </h1>
          <p className="mt-1.5 text-sm text-white/45">
            {user?.name ? `${user.name} · ` : ''}Set homework from the CBSE corpus and see exactly who has completed it
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${spinning ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </header>

      {toast && (
        <p className="mb-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          {toast}
        </p>
      )}

      <CreateAssignmentCard
        classes={classes}
        onCreated={(msg) => { setToast(msg); load() }}
      />

      <div className="mt-6 flex items-center gap-4 text-xs text-white/40">
        <span>{totals.assignments} assignment{totals.assignments === 1 ? '' : 's'}</span>
        <span>·</span>
        <span>{totals.done} of {totals.roster} student completions</span>
      </div>

      <div className="mt-3 space-y-4">
        {loading && (
          <div className="glass-card rounded-2xl border border-white/10 p-8 text-center text-sm text-white/40">
            Loading assignments…
          </div>
        )}
        {!loading && error && (
          <div className="glass-card rounded-2xl border border-red-400/20 p-8 text-center">
            <p className="text-sm text-red-200">{error}</p>
            <button onClick={load} className="mt-3 rounded-lg bg-white/10 px-4 py-2 text-xs text-white/80 hover:bg-white/15">
              Retry
            </button>
          </div>
        )}
        {!loading && !error && assignments.length === 0 && (
          <div className="glass-card rounded-2xl border border-white/10 p-10 text-center">
            <ClipboardList className="mx-auto mb-3 h-8 w-8 text-white/20" />
            <p className="font-display text-sm font-bold text-white/70">No assignments yet</p>
            <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-white/40">
              Create your first assignment above — pick a class, search the curriculum for a
              topic, choose how many questions, and set a due date. Your students will see it
              on their Homework page immediately.
            </p>
          </div>
        )}
        {!loading && !error && assignments.map((a, i) => (
          <AssignmentCard key={a.id} a={a} index={i} />
        ))}
      </div>

      <p className="mt-8 pb-6 text-center text-[11px] leading-relaxed text-white/30">
        Completion status is read straight from student submissions — nothing is estimated.
        A student shows Completed only after their answers were graded server-side against
        the verified question bank.
      </p>
    </div>
  )
}

export default function TeacherAssignmentsPage() {
  return (
    <AuthGuard allowedRoles={['teacher', 'admin']}>
      <TeacherAssignmentsContent />
    </AuthGuard>
  )
}
