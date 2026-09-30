/**
 * browse.js — TIER3 load scenario A: realistic browse mix (read-only).
 *
 * Weights: 70% landing page, 15% login page, 10% /api/health pings,
 * 5% corpus topic search — approximates a class-worth of browsing.
 *
 * Usage: node browse.js <connections> <durationSeconds>
 */
const autocannon = require('autocannon')

const connections = Number(process.argv[2] || 50)
const duration = Number(process.argv[3] || 30)
const BASE = process.argv[4] || 'http://localhost'

autocannon({
  url: BASE,
  connections,
  duration,
  requests: [
    { path: '/', weight: 7 },
    { path: '/login', weight: 1.5 },
    { path: '/api/health', weight: 1 },
    { path: '/api/nodes/search?q=light&limit=5', weight: 0.5 },
  ],
}, (err, result) => {
  if (err) { console.error(err); process.exit(1) }
  console.log(JSON.stringify({
    scenario: 'browse',
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
