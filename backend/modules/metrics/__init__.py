"""Metrics module (A6-OPS, 2026-10-02): Prometheus exposition + request
middleware.  Dependency-free — emits the Prometheus text format directly,
no prometheus_client requirement.

  middleware.py — raw-ASGI request counter/latency middleware
  router.py     — GET /metrics endpoint (text/plain; version=0.0.4)
"""
