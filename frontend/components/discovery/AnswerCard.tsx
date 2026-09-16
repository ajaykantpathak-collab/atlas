'use client'

/**
 * Atlas answer card — renders a /api/tutor-graph/ask result inside the
 * Atlas map's side panel.
 *
 * When the question resolved to a real graph node (either the ask lane
 * returned node_id itself, or the parallel /api/content/search lookup
 * matched the top topic), the node becomes a GOLD LINK CARD deep-linking
 * to /learn/{nodeId}. The visible title is always friendlyNodeTitle-form
 * ("Class 10 · Physics · Chapter 1 · Topic 1") via prettyNodeTitle —
 * raw node ids never reach the screen.
 */
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Sparkles, TrendingUp, X } from 'lucide-react'
import { subjectName } from '@/lib/nodeTitle'
import { prettyNodeTitle } from './subjectMeta'

export type AtlasAnswer = {
  /** short headline from the ask lane ("Teaching answer", topic name…) */
  topic: string
  /** full answer body (steps already stripped out) */
  answer: string
  /** numbered solution steps (verified solver lane) */
  steps: string[]
  /** live = deterministic engine, sample = offline fallback */
  source: 'live' | 'sample'
  /** resolved graph node id for the gold deep-link card (null = none) */
  nodeId: string | null
  /** optional prerequisite names (offline sample lane) */
  prerequisites?: string[]
}

const ease = [0.16, 1, 0.3, 1] as const

/**
 * Backend-authored answer text occasionally embeds raw node ids mid-sentence
 * ("Recall from Class 7 (c7_bio_ch03_002) …"). Rewrite every id-shaped token
 * into its friendly form so no raw id can reach the screen:
 *   c7_bio_ch03_002     → "Class 7 · Biology · Chapter 3 · Topic 2"
 *   c5_phy_005          → "Class 5 · Physics · Topic 5"
 *   c10_phy_cbse_03_012 → "Class 10 · Physics · Chapter 3 · Topic 12"
 */
const NODE_ID_RE =
  /\bc(\d{1,2})_([a-z]+?)(?:_cbse)?_(?:ch(\d{1,2})_)?(\d{1,3})(?:_(\d{1,3}))?\b/gi

function sanitizeAnswerText(text: string): string {
  return String(text || '').replace(
    NODE_ID_RE,
    (_m, cls: string, subj: string, ch?: string, nn?: string, nn2?: string) => {
      const bits = [`Class ${Number(cls)}`, subjectName(String(subj).toLowerCase())]
      // "…_ch03_002" carries its own ch tag; "…_cbse_03_012" puts the
      // chapter where the ch tag would be and shifts the topic last
      const chapter = ch || (nn2 ? nn : undefined)
      const topic = nn2 || nn
      if (chapter) bits.push(`Chapter ${Number(chapter)}`)
      if (topic) bits.push(`Topic ${Number(topic)}`)
      return bits.join(' · ')
    },
  )
}

export default function AnswerCard({
  answer,
  onClose,
}: {
  answer: AtlasAnswer
  onClose: () => void
}) {
  const nodeTitle = answer.nodeId ? prettyNodeTitle(answer.nodeId) : null
  const learnHref = answer.nodeId
    ? `/learn/${encodeURIComponent(answer.nodeId)}`
    : '/signup'
  const bodyText = sanitizeAnswerText(answer.answer)
  const steps = answer.steps.map(sanitizeAnswerText)

  return (
    <div className="h-full rounded-2xl backdrop-blur-2xl bg-surface-100/70 border border-white/15 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="sticky top-0 flex items-center justify-between px-5 py-4 bg-surface-100/80 backdrop-blur-2xl border-b border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          <Sparkles className="w-4 h-4 text-gold-400 flex-shrink-0" />
          <span className="font-display text-sm font-bold truncate">
            {answer.topic || nodeTitle || 'Answer'}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close answer"
          className="text-surface-500 hover:text-white transition-colors flex-shrink-0 ml-2"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Gold link card — the resolved node, deep-linking into Learn */}
        {answer.nodeId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <Link
              href={learnHref}
              className="group block rounded-xl border border-gold-400/40 bg-gradient-to-br from-gold-400/[0.13] to-gold-500/[0.04] p-4 transition-all duration-200 hover:border-gold-400/70 hover:shadow-lg hover:shadow-gold-500/15"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-display font-semibold uppercase tracking-wider text-gold-500/90 mb-1">
                    Resolved topic
                  </div>
                  <div className="font-display text-sm font-bold text-gold-200 leading-snug">
                    {nodeTitle ?? answer.topic}
                  </div>
                </div>
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gold-400/15 border border-gold-400/30 flex-shrink-0 transition-colors group-hover:bg-gold-400/25">
                  <ArrowRight className="w-4 h-4 text-gold-300 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
              <div className="mt-2.5 text-[11px] font-medium text-gold-500/90">
                Open in Learn — map, prerequisites &amp; practice
              </div>
            </Link>
          </motion.div>
        )}

        {/* Answer body + honesty badge */}
        <div>
          <div className="flex items-center justify-between mb-2 gap-2">
            <div className="font-display text-xs text-surface-600 uppercase tracking-wider">
              Answer
            </div>
            <span
              className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider border whitespace-nowrap ${
                answer.source === 'live'
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-400/30'
                  : 'bg-amber-500/10 text-amber-300 border-amber-400/30'
              }`}
            >
              {answer.source === 'live'
                ? 'live · deterministic engine'
                : 'offline sample'}
            </span>
          </div>
          <p className="text-sm text-surface-300 leading-relaxed whitespace-pre-line">
            {bodyText}
          </p>
        </div>

        {/* Verified solver steps */}
        {steps.length > 0 && (
          <div>
            <div className="font-display text-xs text-surface-600 uppercase tracking-wider mb-2">
              Steps
            </div>
            <div className="space-y-2">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.35, ease }}
                  className="flex items-start gap-2.5 px-3 py-2 rounded-lg bg-white/5"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-md bg-gold-400/15 text-[10px] font-display font-bold text-gold-300 flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-surface-300 leading-relaxed">
                    {s}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Prerequisites (offline sample lane) */}
        {answer.prerequisites && answer.prerequisites.length > 0 && (
          <div>
            <div className="font-display text-xs text-surface-600 mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3" /> Prerequisites
            </div>
            <div className="space-y-1.5">
              {answer.prerequisites.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5"
                >
                  <BookOpen className="w-3 h-3 text-surface-600" />
                  <span className="text-xs text-surface-400">{p}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* CTA — real deep link when resolved, signup otherwise */}
        <Link
          href={learnHref}
          className="block w-full text-center px-4 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-brand-500 text-white text-sm font-display font-semibold hover:shadow-lg hover:shadow-gold-500/25 transition-all"
        >
          {answer.nodeId ? 'Learn this topic →' : 'Unlock the full map →'}
        </Link>
      </div>
    </div>
  )
}
