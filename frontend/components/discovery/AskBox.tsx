'use client'

/**
 * Atlas ask box — the landing's ask/search experience.
 *
 * Two live behaviors in one control:
 *   1. ASK  — Enter/submit posts to POST /api/tutor-graph/ask (the parent
 *      owns the answer; this component only raises onAsk).
 *   2. FIND — typing (debounced 300 ms) live-searches the official corpus
 *      via GET /api/content/search?q= and shows a keyboard-navigable
 *      "topics" dropdown. Every result links to /learn/{node_id} using the
 *      REAL topic label returned by the API — raw node ids never render.
 *
 * Keyboard: ↓/↑ move the highlight (Enter still asks while nothing is
 * highlighted), then Enter opens the highlighted topic, Escape closes.
 */
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, BookOpen, CornerDownLeft } from 'lucide-react'
import { prettyNodeTitle, subjectMeta } from './subjectMeta'
import { subjectName } from '@/lib/nodeTitle'

type TopicHit = {
  node_id: string
  label: string
  description?: string
  subject: string
  class_level: number
}

/** subject code → display name ("bio" → "Biology") — codes never render raw */
function humanSubject(s: string): string {
  const named = subjectName(String(s || '').toLowerCase())
  return named.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const DEBOUNCE_MS = 300
const MIN_QUERY_LEN = 2
const MAX_RESULTS = 7

const SUGGESTIONS = [
  "I don't understand quadratic equations",
  'Explain photosynthesis simply',
  'What are the laws of motion?',
  'How do chemical reactions work?',
  'What is the solar system?',
]

const ease = [0.16, 1, 0.3, 1] as const

export default function AskBox({
  value,
  onValueChange,
  onAsk,
  asking,
  inputId = 'atlas-ask-input',
  placeholder = "Ask anything — 'photosynthesis' or 'newton laws'",
}: {
  /** controlled query — the parent renders it elsewhere too (hero handoff) */
  value: string
  onValueChange: (v: string) => void
  /** parent's ask handler (Enter with no highlighted result) */
  onAsk: () => void
  asking: boolean
  inputId?: string
  placeholder?: string
}) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)
  const [hits, setHits] = useState<TopicHit[]>([])
  const [searching, setSearching] = useState(false)
  const [searched, setSearched] = useState(false)
  const [highlight, setHighlight] = useState(-1)

  const q = value.trim()
  const dropdownOpen = focused && q.length >= MIN_QUERY_LEN

  // ── debounced live search ──────────────────────────────────────────────
  useEffect(() => {
    if (q.length < MIN_QUERY_LEN) {
      setHits([])
      setSearching(false)
      setSearched(false)
      setHighlight(-1)
      return
    }
    const controller = new AbortController()
    setSearching(true)
    const t = setTimeout(() => {
      fetch(`/api/content/search?q=${encodeURIComponent(q)}`, {
        signal: controller.signal,
      })
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
        .then((nodes: TopicHit[]) => {
          if (controller.signal.aborted) return
          setHits(Array.isArray(nodes) ? nodes.slice(0, MAX_RESULTS) : [])
          setSearched(true)
          setHighlight(-1)
        })
        .catch(() => {
          if (!controller.signal.aborted) {
            setHits([])
            setSearched(true)
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) setSearching(false)
        })
    }, DEBOUNCE_MS)
    return () => {
      controller.abort()
      clearTimeout(t)
    }
  }, [q])

  function openTopic(hit: TopicHit) {
    setFocused(false)
    inputRef.current?.blur()
    router.push(`/learn/${encodeURIComponent(hit.node_id)}`)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown' && dropdownOpen && hits.length > 0) {
      e.preventDefault()
      setHighlight((h) => Math.min(h + 1, hits.length - 1))
      return
    }
    if (e.key === 'ArrowUp' && dropdownOpen && hits.length > 0) {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, -1))
      return
    }
    if (e.key === 'Escape') {
      setFocused(false)
      inputRef.current?.blur()
      return
    }
    if (e.key === 'Enter') {
      // a highlighted dropdown row wins; otherwise hand off to the ask lane
      if (dropdownOpen && highlight >= 0 && hits[highlight]) {
        e.preventDefault()
        openTopic(hits[highlight])
        return
      }
      onAsk()
    }
  }

  return (
    <div className="relative z-30">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
          focused
            ? 'bg-surface-200/60 border-gold-400/60 shadow-[0_0_0_3px_rgba(251,191,36,0.10),0_0_24px_rgba(251,191,36,0.12)]'
            : 'bg-surface-200/30 border-white/10'
        }`}
      >
        <Search
          className={`w-5 h-5 transition-colors ${focused ? 'text-gold-400' : 'text-surface-600'}`}
        />
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={dropdownOpen}
          aria-controls="atlas-topic-listbox"
          aria-activedescendant={
            highlight >= 0 && hits[highlight]
              ? `atlas-topic-option-${highlight}`
              : undefined
          }
          aria-autocomplete="list"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className="flex-1 bg-transparent text-base text-white placeholder:text-surface-600 outline-none"
        />
        {q && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAsk()}
            disabled={asking}
            className="px-4 py-1.5 rounded-lg bg-gold-400/20 border border-gold-400/50 text-sm text-gold-200 hover:bg-gold-400/30 transition-all font-medium disabled:opacity-50"
          >
            {asking ? '…' : 'Ask →'}
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {focused && !q && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 p-3 rounded-xl bg-surface-200/80 backdrop-blur-xl border border-white/10 text-left shadow-2xl"
          >
            <div className="text-xs text-surface-600 mb-2 px-2 font-medium">
              Try asking:
            </div>
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onValueChange(s)
                  inputRef.current?.focus()
                }}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm text-surface-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <Search className="w-3 h-3 text-surface-600 flex-shrink-0" />
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live topics dropdown — real corpus results */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease }}
            onMouseDown={(e) => e.preventDefault() /* keep input focus */}
            className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-surface-200/90 backdrop-blur-xl border border-gold-400/25 overflow-hidden shadow-2xl shadow-gold-500/5"
          >
            {searching && (
              <div className="px-4 py-3 text-xs text-surface-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                Searching the atlas…
              </div>
            )}

            {!searching && hits.length === 0 && searched && (
              <div className="px-4 py-5 text-center">
                <BookOpen className="w-5 h-5 text-surface-600 mx-auto mb-2" />
                <p className="text-sm text-surface-400">
                  No topics matched — try a chapter name
                </p>
                <p className="text-xs text-surface-600 mt-1">
                  or press Enter to ask the tutor instead
                </p>
              </div>
            )}

            {!searching && hits.length > 0 && (
              <>
                <div className="px-4 pt-2.5 pb-1 text-[10px] font-display font-semibold text-surface-600 uppercase tracking-wider">
                  Topics in the atlas
                </div>
                <motion.ul
                  id="atlas-topic-listbox"
                  role="listbox"
                  initial="initial"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                  className="pb-2"
                >
                  {hits.map((hit, i) => {
                    const { icon: Icon, color } = subjectMeta(hit.subject)
                    const active = i === highlight
                    // friendly title only — a raw node id must never render
                    const title = hit.label || prettyNodeTitle(hit.node_id)
                    if (!title) return null
                    const href = `/learn/${encodeURIComponent(hit.node_id)}`
                    return (
                      <motion.li
                        key={hit.node_id}
                        id={`atlas-topic-option-${i}`}
                        role="option"
                        aria-selected={active}
                        variants={{
                          initial: { opacity: 0, y: 10 },
                          show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.3, ease },
                          },
                        }}
                        className="px-2"
                      >
                        <Link
                          href={href}
                          onClick={() => {
                            setFocused(false)
                          }}
                          onMouseMove={() => setHighlight(i)}
                          className={`w-full flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-left transition-colors ${
                            active ? 'bg-gold-400/10' : 'hover:bg-white/5'
                          }`}
                        >
                          <span
                            className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                            style={{ background: color + '1A', border: `1px solid ${color}38` }}
                          >
                            <Icon className="w-4 h-4" style={{ color }} />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span
                              className={`block text-sm truncate ${
                                active ? 'text-gold-200' : 'text-white'
                              }`}
                            >
                              {title}
                            </span>
                            <span className="block text-[11px] text-surface-600 truncate">
                              {humanSubject(hit.subject)}
                              {Number.isFinite(hit.class_level)
                                ? ` · Class ${hit.class_level}`
                                : ''}
                            </span>
                          </span>
                          {active ? (
                            <CornerDownLeft className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                          ) : (
                            <BookOpen className="w-3.5 h-3.5 text-surface-700 flex-shrink-0" />
                          )}
                        </Link>
                      </motion.li>
                    )
                  })}
                </motion.ul>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
