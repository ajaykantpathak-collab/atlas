'use client'

/**
 * Atlas subject strip — real per-subject topic counts from the official
 * corpus, surfaced under the Atlas map.
 *
 * Data contract (all live, all honest):
 *   GET /api/tutor-graph/stats → { concepts, subjects: {code: count}, … }
 *     — chips show the REAL per-subject counts (never a total like 21k;
 *       the official graph is 9,010 teaching nodes).
 *   GET /api/graph/search?q={subject}&limit=25 → { nodes: [{node_id, …}] }
 *     — each chip deep-links to /learn/{nodeId} of a REAL node of that
 *       subject, resolved live from the graph. A chip only renders once
 *       its link target has been verified against the live graph, so
 *       there are no hardcoded ids and no dead links.
 *
 * The "enhanced"/"unknown" keys in the stats dict are corpus buckets, not
 * subjects — never rendered as chips.
 */
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { subjectMeta } from './subjectMeta'

/** corpus buckets, not subjects — never rendered as chips */
const HIDDEN_KEYS = new Set(['enhanced', 'unknown'])

/** stats subject code → display name (codes observed in the live corpus) */
const SUBJECT_NAMES: Record<string, string> = {
  phy: 'Physics',
  physics: 'Physics',
  chem: 'Chemistry',
  chemistry: 'Chemistry',
  bio: 'Biology',
  biology: 'Biology',
  maths: 'Maths',
  math: 'Maths',
  mathematics: 'Maths',
  appmath: 'Applied Maths',
  applied_maths: 'Applied Maths',
  science: 'Science',
  evs: 'EVS',
  eng: 'English',
  english: 'English',
  eng_w: 'English',
  eng_k: 'English',
  english_grammar: 'English Grammar',
  hin: 'Hindi',
  hindi: 'Hindi',
  hin_a: 'Hindi',
  hin_ar: 'Hindi',
  hindi_grammar: 'Hindi Grammar',
  hist: 'History',
  histciv: 'History & Civics',
  geo: 'Geography',
  geography: 'Geography',
  soc: 'Social Science',
  social: 'Social Science',
  social_science: 'Social Science',
  ps: 'Political Science',
  pol: 'Political Science',
  polsci: 'Political Science',
  political_science: 'Political Science',
  political_theory: 'Political Theory',
  eco: 'Economics',
  economics: 'Economics',
  acc: 'Accountancy',
  accountancy: 'Accountancy',
  bs: 'Business Studies',
  bst: 'Business Studies',
  psy: 'Psychology',
  psychology: 'Psychology',
  sociology: 'Sociology',
  cs: 'Computer Science',
  ip: 'Informatics Practices',
  comp: 'Computer Science',
  biotech: 'Biotechnology',
  hs: 'Home Science',
  sans: 'Sanskrit',
  urd: 'Urdu',
  physical: 'Physical Education',
  massmedia: 'Mass Media',
  legal: 'Legal Studies',
  entrepreneurship: 'Entrepreneurship',
}

const MAX_CHIPS = 8

type GraphHit = { node_id?: string; name?: string; subject?: string }

/**
 * Resolve one REAL node id for a subject via the live graph full-text
 * search. Best-match scoring prefers nodes whose subject/node_id carry the
 * subject code; falls back to the top search hit (the query WAS the
 * subject name, so relevance is on-subject by construction).
 */
async function resolveSubjectNode(
  key: string,
  name: string,
): Promise<string | null> {
  try {
    const r = await fetch(
      `/api/graph/search?q=${encodeURIComponent(name)}&limit=25`,
    )
    if (!r.ok) return null
    const d = await r.json()
    const nodes: GraphHit[] = Array.isArray(d?.nodes) ? d.nodes : []
    const ids = nodes
      .map((n) => String(n?.node_id || ''))
      .filter(Boolean)
    if (ids.length === 0) return null
    const k = key.toLowerCase()
    let best: string | null = null
    let bestScore = 0
    for (const n of nodes) {
      const id = String(n?.node_id || '')
      const subj = String(n?.subject || '').toLowerCase().replace(/\s+/g, '_')
      let score = 0
      if (id.toLowerCase().includes(`_${k}_`) || id.toLowerCase().includes(`_${k}`))
        score += 2
      if (subj === k) score += 3
      else if (k.length >= 3 && subj.includes(k)) score += 1
      if (score > bestScore) {
        bestScore = score
        best = id
      }
    }
    return bestScore > 0 ? best : ids[0]
  } catch {
    return null
  }
}

const ease = [0.16, 1, 0.3, 1] as const

export default function SubjectStrip({
  subjects,
  totalTopics,
}: {
  /** live dict from /api/tutor-graph/stats → "subjects" (null while loading) */
  subjects: Record<string, number> | null
  /** live teaching_nodes count (honest 9,010 fallback) */
  totalTopics: number
}) {
  const chips = Object.entries(subjects ?? {})
    .filter(([key]) => !HIDDEN_KEYS.has(key) && SUBJECT_NAMES[key])
    .sort((a, b) => b[1] - a[1])
    .slice(0, MAX_CHIPS)

  /** key → resolved node id ('' = resolution failed, no chip) */
  const [resolved, setResolved] = useState<Record<string, string>>({})
  const startedRef = useRef<string>('')

  useEffect(() => {
    const signature = chips.map(([k]) => k).join(',')
    if (!signature || signature === startedRef.current) return
    startedRef.current = signature
    let cancelled = false
    ;(async () => {
      for (const [key] of chips) {
        if (cancelled) return
        const nodeId = await resolveSubjectNode(key, SUBJECT_NAMES[key])
        if (cancelled) return
        setResolved((prev) => ({ ...prev, [key]: nodeId || '' }))
      }
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjects])

  const pendingCount = chips.filter(([
    key,
  ]) => resolved[key] === undefined).length

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
        <h3 className="font-display text-lg font-bold text-white">
          Browse by subject
        </h3>
        <p className="text-sm text-surface-500">
          <span className="text-gold-300 font-display font-semibold">
            {totalTopics.toLocaleString('en-IN')} topics
          </span>{' '}
          · live from the Atlas graph
        </p>
      </div>

      <motion.div
        initial="initial"
        whileInView="show"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ show: { transition: { staggerChildren: 0.04 } } }}
        className="flex flex-wrap gap-2.5"
      >
        {/* loading skeleton — same chip shape, no fake counts */}
        {Array.from({ length: pendingCount }).map((_, i) => (
          <div
            key={`sk-${i}`}
            className="h-10 w-28 rounded-xl bg-white/[0.04] border border-white/10 animate-pulse"
          />
        ))}
        {chips.map(([key, count]) => {
          const nodeId = resolved[key]
          if (!nodeId) return null // unresolved or failed — no dead chip
          const name = SUBJECT_NAMES[key]
          const { icon: Icon, color } = subjectMeta(key)
          return (
            <motion.div
              key={key}
              variants={{
                initial: { opacity: 0, y: 14 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease },
                },
              }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={`/learn/${encodeURIComponent(nodeId)}`}
                className="group flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-xl border transition-all duration-200 hover:bg-white/[0.06]"
                style={{
                  borderColor: color + '2E',
                  background: color + '0A',
                }}
                title={`Open a real ${name} topic in Learn`}
              >
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-lg"
                  style={{ background: color + '1C' }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color }} />
                </span>
                <span className="text-sm font-display font-semibold text-white">
                  {name}
                </span>
                <span className="text-xs text-surface-500 tabular-nums">
                  {count.toLocaleString('en-IN')}
                </span>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
