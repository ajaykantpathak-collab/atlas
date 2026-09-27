'use client'

/**
 * ChapterPath — turns a chapter's aspect-nodes into one guided path.
 *
 * Siblings come from GET /api/content/enrichment (same class+subject+chapter,
 * ordered by node index). Completion is tracked in localStorage
 * (`atlas_done:<node_id>`) — set when the node's quick-quiz queue is worked
 * through, so anonymous students get the full journey too. When every node
 * is done the rail unlocks the chapter test.
 */
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, ChevronRight, Lock, Trophy } from 'lucide-react'
import { api } from '@/lib/api'

export interface ChapterNode {
  node_id: string
  title: string
  slug?: string | null
  difficulty?: string | null
}

const DONE_KEY = (id: string) => `atlas_done:${id}`

export function isNodeDone(nodeId: string): boolean {
  try {
    return typeof window !== 'undefined' &&
      window.localStorage.getItem(DONE_KEY(nodeId)) === '1'
  } catch {
    return false
  }
}

export function markNodeDone(nodeId: string): void {
  try {
    window.localStorage.setItem(DONE_KEY(nodeId), '1')
    window.dispatchEvent(new CustomEvent('atlas:node-done', { detail: { nodeId } }))
  } catch {}
}

export function nodeHref(n: ChapterNode): string {
  return `/learn/${encodeURIComponent(n.slug || n.node_id)}`
}

export default function ChapterPath({
  nodeId,
  subject,
  classLevel,
  chapter,
  onNodes,
}: {
  nodeId: string
  subject: string
  classLevel: number
  chapter: string | null
  /** Bubbles the sibling list + done-set up to the page (next-node CTA). */
  onNodes?: (nodes: ChapterNode[], done: Set<string>) => void
}) {
  const [nodes, setNodes] = useState<ChapterNode[]>([])
  const [done, setDone] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  // refresh done-set whenever a node completes (this page or a sibling tab)
  useEffect(() => {
    const refresh = () => {
      setDone((prev) => {
        const next = new Set(prev)
        for (const n of nodes) if (isNodeDone(n.node_id)) next.add(n.node_id)
        return next
      })
    }
    window.addEventListener('atlas:node-done', refresh)
    return () => window.removeEventListener('atlas:node-done', refresh)
  }, [nodes])

  useEffect(() => {
    if (!chapter) { setLoading(false); return }
    let cancelled = false
    api.get<{ nodes: ChapterNode[] }>(
      `/api/content/enrichment?subject=${encodeURIComponent(subject)}` +
      `&class_level=${classLevel}&chapter=${encodeURIComponent(chapter)}&limit=100`
    )
      .then((d) => {
        if (cancelled) return
        const list = (d?.nodes || [])
          .slice()
          .sort((a, b) => a.node_id.localeCompare(b.node_id))
        setNodes(list)
        const doneSet = new Set(list.filter((n) => isNodeDone(n.node_id)).map((n) => n.node_id))
        setDone(doneSet)
        onNodes?.(list, doneSet)
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, classLevel, chapter])

  const idx = useMemo(
    () => nodes.findIndex((n) => n.node_id === nodeId),
    [nodes, nodeId],
  )
  const doneCount = nodes.filter((n) => done.has(n.node_id)).length
  const allDone = nodes.length > 0 && doneCount >= nodes.length

  if (!chapter || loading || nodes.length <= 1) return null

  const chapterTitle = (() => {
    const first = nodes[0]?.title || ''
    return first.includes('—') ? first.split('—')[0].trim() : null
  })()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wider text-surface-600 font-semibold">
            Chapter path
          </p>
          <p className="text-sm font-semibold text-white truncate">
            {chapterTitle || 'This chapter'}
            <span className="text-surface-500 font-normal"> · {doneCount}/{nodes.length}</span>
          </p>
        </div>
        <div className="w-24 h-1.5 rounded-full bg-surface-200/50 overflow-hidden shrink-0 ml-4">
          <div
            className="h-full bg-mint-400 transition-all"
            style={{ width: `${nodes.length ? (doneCount / nodes.length) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1" role="list">
        {nodes.map((n, i) => {
          const isDone = done.has(n.node_id)
          const isCurrent = n.node_id === nodeId
          // gates nothing hard — soft-lock nudge only for far-ahead nodes
          const farAhead = i > idx + 2 && !isDone
          const short = n.title.includes('—')
            ? n.title.split('—').pop()!.trim()
            : n.title
          return (
            <Link
              key={n.node_id}
              href={nodeHref(n)}
              role="listitem"
              title={short}
              className={`group shrink-0 flex items-center justify-center w-9 h-9 rounded-lg text-xs font-semibold transition-all ${
                isCurrent
                  ? 'bg-brand-500/25 text-brand-200 ring-1 ring-brand-400/60'
                  : isDone
                    ? 'bg-mint-500/15 text-mint-300 hover:bg-mint-500/25'
                    : 'bg-surface-200/30 text-surface-600 hover:bg-surface-200/60 hover:text-white'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : farAhead ? (
                <Lock className="w-3.5 h-3.5 opacity-50 group-hover:hidden" />
              ) : null}
              <span className={farAhead ? 'hidden group-hover:inline' : ''}>
                {isDone || isCurrent ? (isCurrent ? i + 1 : '') : i + 1}
                {isDone && !isCurrent && <CheckCircle2 className="w-4 h-4 hidden" />}
              </span>
            </Link>
          )
        })}
      </div>

      {allDone ? (
        <Link
          href={`/chapter-test?subject=${encodeURIComponent(subject)}&class_level=${classLevel}&chapter=${encodeURIComponent(chapter)}`}
          className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gold-500/15 border border-gold-500/30 px-4 py-2.5 text-sm font-semibold text-gold-300 hover:bg-gold-500/25 transition-colors"
        >
          <Trophy className="w-4 h-4" />
          Chapter complete — take the chapter test
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : idx >= 0 && idx < nodes.length - 1 && done.has(nodeId) ? (
        <Link
          href={nodeHref(nodes[idx + 1])}
          className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-500/15 border border-brand-500/30 px-4 py-2.5 text-sm font-semibold text-brand-200 hover:bg-brand-500/25 transition-colors"
        >
          Next: {(nodes[idx + 1].title.split('—').pop() || nodes[idx + 1].title).trim()}
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : null}
    </motion.div>
  )
}
