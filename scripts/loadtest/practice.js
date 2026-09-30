/**
 * practice.js — TIER3 load scenario B: the REAL practice write path.
 *
 * Each virtual user loops the genuine student flow against the live
 * pipeline (no mocks):
 *   POST /api/practice/start   → PracticeSession row + IRT-selected question
 *   POST /api/practice/{id}/submit → grading + Attempt row + XP + activity_log
 *
 * Sessions are created under the shared demo student (no auth header),
 * which is exactly what the app's guest practice flow does.
 *
 * Usage:    node practice.js <concurrency> <durationSeconds>
 * Example:  node practice.js 50 30
 */
const BASE = process.argv[4] || 'http://localhost'

const concurrency = Number(process.argv[2] || 50)
const duration = Number(process.argv[3] || 30)

const latencies = []
let ok = 0, fail = 0, starts = 0
let running = true
const deadline = Date.now() + duration * 1000

async function oneVU() {
  while (running && Date.now() < deadline) {
    const t0 = Date.now()
    try {
      const s = await fetch(`${BASE}/api/practice/start`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          student_id: 'demo', subject: 'mathematics', num_questions: 1, class_level: 10,
        }),
      })
      if (!s.ok) throw new Error(`start ${s.status}`)
      const sd = await s.json()
      starts += 1
      const sid = sd.session_id || sd.sessionId || (sd.session && sd.session.id)
      const q = sd.question || (sd.questions && sd.questions[0])
      const qid = q && (q.question_id || q.id)
      if (!sid || !qid) throw new Error('no session/question in start response')

      const r = await fetch(`${BASE}/api/practice/${sid}/submit`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          question_id: qid,
          answer: String(((Number(String(qid).replace(/\D/g, '').slice(-2)) || 7) % 13) - 3),
          time_ms: 3000,
        }),
      })
      if (!r.ok) throw new Error(`submit ${r.status}`)
      ok += 1
      latencies.push(Date.now() - t0)
    } catch {
      fail += 1
      latencies.push(Date.now() - t0)
    }
  }
}

function pct(arr, p) {
  if (!arr.length) return 0
  const s = [...arr].sort((a, b) => a - b)
  return s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))]
}

async function main() {
  await Promise.all(Array.from({ length: concurrency }, oneVU))
  console.log(JSON.stringify({
    scenario: 'practice_start_submit',
    connections: concurrency,
    duration,
    cycles_ok: ok,
    cycles_failed: fail,
    starts: starts,
    p50_ms: pct(latencies, 50),
    p95_ms: pct(latencies, 95),
    p99_ms: pct(latencies, 99),
    rps_avg: Math.round((ok / duration) * 10) / 10,
  }, null, 2))
  process.exit(fail > ok ? 1 : 0)
}

main()
