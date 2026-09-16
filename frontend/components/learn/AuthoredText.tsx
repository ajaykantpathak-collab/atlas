'use client'

/**
 * AuthoredText — renders an authored corpus string verbatim, except that
 * inline node-id references (the corpus writes e.g. "(c9_bio_ch1_2)" or
 * "c10_bio_cbse_01_002 through c10_bio_cbse_01_012" inside prose) are
 * shown through the sanctioned label helper instead of as raw ids.
 *
 * This is a pure display transform of authored text: no wording is added,
 * removed or paraphrased — every rendered token is either the author's own
 * words or the nodeRefLabel of an id the author wrote. Raw node ids must
 * never reach the screen.
 */

import type { ReactNode } from 'react'
import { nodeRefLabel } from './remediation'

/** Corpus node-id shapes: c9_bio_ch1_2 · c10_bio_cbse_01_002 ·
 *  c6_biology_ch09_005 · c12_acc_..._001_comp. Anchored on "c<digits>_"
 *  so ordinary prose words can never match. */
const NODE_ID_RE = /\bc\d{1,2}_[a-z]{2,}(?:_[a-z0-9]+)+\b/gi

export default function AuthoredText({
  text,
  className,
}: {
  /** Authored corpus string (rendered verbatim apart from id labels). */
  text: string | null | undefined
  /** Passed through to the wrapping span. */
  className?: string
}) {
  const value = (text || '').trim()
  if (!value) return null

  const parts: ReactNode[] = []
  let last = 0
  const re = new RegExp(NODE_ID_RE.source, 'gi') // fresh lastIndex per render
  for (let m = re.exec(value); m !== null; m = re.exec(value)) {
    const idx = m.index
    if (idx > last) parts.push(value.slice(last, idx))
    parts.push(nodeRefLabel(m[0]))
    last = idx + m[0].length
  }
  if (last < value.length) parts.push(value.slice(last))

  return <span className={className}>{parts}</span>
}
