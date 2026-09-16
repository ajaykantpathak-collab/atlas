'use client'

/**
 * MisconceptionPanel — the "why you missed it" panel of the closed-world
 * remediation loop. Renders ONLY authored corpus strings:
 *   - the missed diagnostic's authored misconception analysis
 *   - the node's authored common misconception, when relevant
 * plus the caller's "Fix it" block (prereq lessons + sims) as children.
 *
 * Honest degradation: any field the corpus lacks is omitted; when nothing
 * at all is available the panel renders null (never an invented recipe).
 */

import { motion } from 'framer-motion'
import { AlertTriangle, XCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import AuthoredText from './AuthoredText'

export default function MisconceptionPanel({
  misconception,
  commonMisconception,
  children,
}: {
  /** Authored misconception analysis for the specific missed question. */
  misconception?: string | null
  /** Authored node-level common misconception (shown when present). */
  commonMisconception?: string | null
  /** The "Fix it" block: prereq lessons + their sims. */
  children?: ReactNode
}) {
  const hasMisconception = !!misconception?.trim()
  const hasCommon = !!commonMisconception?.trim()

  // Nothing authored for this node/question → the loop honestly ends here.
  if (!hasMisconception && !hasCommon && !children) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="mt-3 rounded-xl border border-gold-500/30 bg-gold-500/5 overflow-hidden"
      data-testid="misconception-panel"
    >
      {/* Wrong-answer banner */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-2">
        <XCircle className="w-4 h-4 text-gold-300 flex-shrink-0" />
        <p className="font-display text-sm font-semibold text-gold-300">
          Not quite — here&apos;s the trap
        </p>
      </div>

      {hasMisconception && (
        <div className="px-4 pb-3">
          <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-gold-300/80 font-semibold mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Misconception
          </p>
          <p className="text-sm text-surface-800 leading-relaxed">
            <AuthoredText text={misconception} />
          </p>
        </div>
      )}

      {hasCommon && (
        <div className="px-4 pb-3">
          <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-gold-300/80 font-semibold mb-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Common misconception on this topic
          </p>
          <p className="text-sm text-surface-700 leading-relaxed">
            <AuthoredText text={commonMisconception} />
          </p>
        </div>
      )}

      {/* Fix-it block (prereq lessons → prereq sims) */}
      {children && <div className="border-t border-gold-500/20 px-4 py-3">{children}</div>}
    </motion.div>
  )
}
