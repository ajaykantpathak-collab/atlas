'use client'

/**
 * PrereqFixList — the "Fix it" block of the closed-world remediation loop.
 *
 * For each AUTHORED prerequisite id from the node's enrichment:
 *   - a link to /learn/{prereq} labelled with nodeRefLabel (which defers
 *     to the sanctioned friendlyNodeTitle — a raw node id must never
 *     reach the screen)
 *   - the sims authored for that prereq (GET /api/nodes/{id}/sims)
 *     as gold chips linking into the sim player
 *
 * Honest degradation: no prereq_ids → renders null. A prereq with no sims
 * simply shows no chips. Failed sim lookups degrade to no chips, never to
 * invented sim titles.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FlaskConical, Wrench } from 'lucide-react'
import { fetchNodeSims, nodeRefLabel, type SimRef } from './remediation'

export default function PrereqFixList({
  prereqIds,
  heading = 'Fix it — revise these first',
}: {
  prereqIds: string[]
  /** Override the heading (still fixed chrome copy, never generated). */
  heading?: string
}) {
  const [simsByNode, setSimsByNode] = useState<Record<string, SimRef[]>>({})

  useEffect(() => {
    if (!prereqIds.length) return
    let alive = true
    // Parallel lookup, each degrading to [] on failure.
    Promise.all(
      prereqIds.map(async (nid) => [nid, await fetchNodeSims(nid)] as const),
    ).then((pairs) => {
      if (!alive) return
      setSimsByNode(Object.fromEntries(pairs))
    })
    return () => {
      alive = false
    }
  }, [prereqIds])

  if (!prereqIds.length) return null

  return (
    <div data-testid="prereq-fix-list">
      <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-gold-300/80 font-semibold mb-2.5">
        <Wrench className="w-3.5 h-3.5" />
        {heading}
      </p>
      <div className="space-y-3">
        {prereqIds.map((nid, i) => {
          const sims = simsByNode[nid]
          return (
            <motion.div
              key={nid}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.22 }}
            >
              {/* Prereq lesson */}
              <Link
                href={`/learn/${encodeURIComponent(nid)}`}
                className="group inline-flex items-center gap-2 text-sm text-white hover:text-gold-200 transition-colors"
              >
                <span className="w-5 h-5 rounded-md bg-gold-400/15 flex items-center justify-center text-[10px] font-bold text-gold-300 flex-shrink-0">
                  {i + 1}
                </span>
                <span className="underline decoration-gold-500/40 underline-offset-2 group-hover:decoration-gold-400">
                  {nodeRefLabel(nid)}
                </span>
              </Link>

              {/* Sims authored for this prereq — gold chips */}
              {sims && sims.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1.5 ml-7">
                  {sims.map((sim) => (
                    <Link
                      key={sim.id}
                      href={`/sims-v2/${encodeURIComponent(sim.id)}`}
                      className="inline-flex items-center gap-1 rounded-full border border-gold-500/40 bg-gold-400/10 px-2.5 py-1 text-[11px] font-medium text-gold-200 hover:bg-gold-400/20 hover:border-gold-400/60 transition-colors"
                      title={`Simulation: ${sim.title}`}
                    >
                      <FlaskConical className="w-3 h-3 text-gold-300" />
                      {sim.title}
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
