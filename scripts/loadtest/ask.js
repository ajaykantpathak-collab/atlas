/**
 * ask.js — TIER3 load scenario C: the public "ask anything" box.
 *
 * POST /api/tutor/ask is the dashboard ask flow (public, 10s server-side
 * bound). Kept as its own scenario: one ask costs an enrichment-node
 * lookup + AI answer, so it is not mixed into the browse profile.
 *
 * Usage: node ask.js <connections> <durationSeconds>
 */
const autocannon = require('autocannon')

const connections = Number(process.argv[2] || 10)
const duration = Number(process.argv[3] || 30)

autocannon({
  url: `${process.argv[4] || 'http://localhost'}/api/tutor/ask`,
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ message: 'What is a quadratic equation?', class_level: 10 }),
  connections,
  duration,
}, (err, result) => {
  if (err) { console.error(err); process.exit(1) }
  console.log(JSON.stringify({
    scenario: 'ask',
    connections,
    duration,
    requests: result.requests.total,
    errors: result.errors,
    timeouts: result.timeouts,
    non2xx: result.non2xx,
    p50_ms: Math.round(result.latency.p50),
    p95_ms: Math.round(result.latency.p95),
    p99_ms: Math.round(result.latency.p99),
    rps_avg: Math.round(result.requests.average),
  }, null, 2))
  process.exit(0)
})
