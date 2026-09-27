/* ═══════════════════════════════════════════════════════════════════════════
   masteryStore.ts — localStorage-based mastery tracking for Class 1-5.
   Records game scores per node, computes mastery, and tracks review schedule.
   No backend needed — everything persists in the browser.
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Types ────────────────────────────────────────────────────

export interface NodeMastery {
  nodeId: string
  bestScore: number       // 0-100, best game score achieved
  playCount: number
  lastPlayed: number      // timestamp
  mastery: number         // 0-1, computed BKT-like probability
  lastReview: number      // timestamp of last review
  nextReview: number      // timestamp when review is due
  status: 'locked' | 'available' | 'in_progress' | 'mastered' | 'needs_review'
}

export interface MasteryData {
  nodes: Record<string, NodeMastery>
  totalStars: number
  classLevel: number
}

// ─── Constants ────────────────────────────────────────────────

const STORAGE_KEY = 'atlas_mastery'
const PENDING_KEY = 'atlas_pending_sync'
const MASTERY_THRESHOLD = 0.7       // 70% to be "mastered"
const REVIEW_INTERVAL = 7 * 24 * 60 * 60 * 1000  // 7 days for spaced review
const IN_PROGRESS_THRESHOLD = 0.15   // Played but not mastered

// ─── Backend sync (fire-and-forget, offline-queued) ───────────
// localStorage stays the fast cache; this pushes each result to the
// server so progress survives device/browser changes.

interface PendingResult {
  attemptId: string
  nodeIds: string[]
  score: number
  simId?: string
  ts: number
}

function pendingQueue(): PendingResult[] {
  try {
    return JSON.parse(localStorage.getItem(PENDING_KEY) || '[]')
  } catch {
    return []
  }
}

function savePending(q: PendingResult[]): void {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(q))
  } catch {}
}

async function postSimResult(r: PendingResult): Promise<boolean> {
  try {
    const { getAuthToken } = await import('./api')
    const token = getAuthToken()
    if (!token) return false
    const base = process.env.NEXT_PUBLIC_API_URL || ''
    const res = await fetch(`${base}/api/progress/sim-result`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        node_ids: r.nodeIds,
        score: r.score,
        sim_id: r.simId,
        attempt_id: r.attemptId,
      }),
      signal: AbortSignal.timeout(8000),
    })
    return res.ok
  } catch {
    return false
  }
}

/** Flush queued results — called on load and after each new result. */
export async function syncPendingResults(): Promise<void> {
  if (typeof window === 'undefined') return
  const q = pendingQueue()
  if (q.length === 0) return
  const remaining: PendingResult[] = []
  for (const r of q) {
    if (!(await postSimResult(r))) remaining.push(r)
  }
  savePending(remaining)
}

// ─── Storage helpers ──────────────────────────────────────────

function loadData(): MasteryData {
  if (typeof window === 'undefined') return { nodes: {}, totalStars: 0, classLevel: 1 }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { nodes: {}, totalStars: 0, classLevel: 1 }
    return JSON.parse(raw)
  } catch {
    return { nodes: {}, totalStars: 0, classLevel: 1 }
  }
}

function saveData(data: MasteryData): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage full or unavailable — non-fatal
  }
}

// ─── Mastery computation ──────────────────────────────────────

/**
 * Compute mastery from score history.
 * Simple BKT-inspired: each play updates the probability.
 * - Score >= 80: strong evidence of mastery, P += 0.3
 * - Score 50-79: some evidence, P += 0.15
 * - Score < 50: evidence of not mastering, P -= 0.2
 * Clamped to [0, 1].
 */
function computeMastery(currentMastery: number, score: number): number {
  let delta = 0
  if (score >= 80) delta = 0.3
  else if (score >= 50) delta = 0.15
  else delta = -0.2
  return Math.max(0, Math.min(1, currentMastery + delta))
}

/**
 * Determine node status from mastery and play history.
 */
function computeStatus(mastery: number, playCount: number, lastReview: number, nextReview: number): NodeMastery['status'] {
  const now = Date.now()
  if (mastery >= MASTERY_THRESHOLD) {
    // Mastered — but check if review is due
    if (now >= nextReview) return 'needs_review'
    return 'mastered'
  }
  if (playCount > 0 && mastery >= IN_PROGRESS_THRESHOLD) return 'in_progress'
  if (playCount > 0) return 'in_progress'
  return 'available'
}

// ─── Public API ───────────────────────────────────────────────

/**
 * Record a game completion and update mastery for all nodes the game covers.
 */
export function recordGameScore(nodeIds: string | readonly string[], score: number, _total = 100): void {
  const data = loadData()
  const now = Date.now()
  const ids = typeof nodeIds === 'string' ? [nodeIds] : nodeIds

  for (const nodeId of ids) {
    const existing = data.nodes[nodeId] || {
      nodeId,
      bestScore: 0,
      playCount: 0,
      lastPlayed: 0,
      mastery: 0,
      lastReview: 0,
      nextReview: 0,
      status: 'available' as const,
    }

    const newMastery = computeMastery(existing.mastery, score)
    const newBestScore = Math.max(existing.bestScore, score)
    const newPlayCount = existing.playCount + 1
    const newNextReview = now + REVIEW_INTERVAL

    data.nodes[nodeId] = {
      nodeId,
      bestScore: newBestScore,
      playCount: newPlayCount,
      lastPlayed: now,
      mastery: newMastery,
      lastReview: now,
      nextReview: newNextReview,
      status: computeStatus(newMastery, newPlayCount, now, newNextReview),
    }
  }

  // Recompute total stars (1 star per mastered node)
  data.totalStars = Object.values(data.nodes).filter(n => n.mastery >= MASTERY_THRESHOLD).length
  saveData(data)

  // ── Server sync (best-effort) ──────────────────────────────
  const result: PendingResult = {
    attemptId: `${now}-${Math.random().toString(36).slice(2, 9)}`,
    nodeIds: [...ids],
    score,
    ts: now,
  }
  const q = pendingQueue()
  q.push(result)
  savePending(q)
  // fire-and-forget — sync flushes the queue incl. this attempt
  void syncPendingResults()
}

/**
 * Get mastery data for a single node.
 */
export function getNodeMastery(nodeId: string): NodeMastery | null {
  const data = loadData()
  return data.nodes[nodeId] || null
}

/**
 * Get mastery data for multiple nodes.
 * Returns a map of nodeId -> NodeMastery.
 * Nodes not yet played get a default 'available' status.
 */
export function getNodesMastery(nodeIds: string[]): Record<string, NodeMastery> {
  const data = loadData()
  const result: Record<string, NodeMastery> = {}
  for (const nodeId of nodeIds) {
    if (data.nodes[nodeId]) {
      // Update status in case review is now due
      const n = data.nodes[nodeId]
      result[nodeId] = {
        ...n,
        status: computeStatus(n.mastery, n.playCount, n.lastReview, n.nextReview),
      }
    } else {
      result[nodeId] = {
        nodeId,
        bestScore: 0,
        playCount: 0,
        lastPlayed: 0,
        mastery: 0,
        lastReview: 0,
        nextReview: 0,
        status: 'available',
      }
    }
  }
  return result
}

/**
 * Get total stars earned across all nodes.
 */
export function getTotalStars(): number {
  return loadData().totalStars
}

/**
 * Get all mastered node IDs.
 */
export function getMasteredNodes(): string[] {
  const data = loadData()
  return Object.values(data.nodes).filter(n => n.mastery >= MASTERY_THRESHOLD).map(n => n.nodeId)
}

/**
 * Get nodes that need review (mastered but review interval has passed).
 */
export function getNodesNeedingReview(): string[] {
  const data = loadData()
  const now = Date.now()
  return Object.values(data.nodes)
    .filter(n => n.mastery >= MASTERY_THRESHOLD && now >= n.nextReview)
    .map(n => n.nodeId)
}

/**
 * Check if a node is unlocked (prerequisites mastered).
 * A node with no prerequisites is always unlocked.
 */
export function isNodeUnlocked(nodeId: string, prerequisites: string[]): boolean {
  if (prerequisites.length === 0) return true
  const data = loadData()
  return prerequisites.every(prereqId => {
    const node = data.nodes[prereqId]
    return node && node.mastery >= MASTERY_THRESHOLD
  })
}

/**
 * Reset all mastery data (for testing).
 */
export function resetMastery(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
