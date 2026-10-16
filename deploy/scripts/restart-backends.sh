#!/usr/bin/env bash
# Rolling backend restart — keeps one warm backend serving while the
# other rebuilds its caches (enhanced-nodes index ~10-30s + MiniLM ~10s
# per worker). A simultaneous `docker compose restart` leaves nginx with
# zero warm upstreams and requests queue in the socket backlog for up to
# a minute. Run this instead after `docker cp` deploys.
#
# nginx is restarted LAST: it resolves upstream container IPs only at
# startup, so a stale-IP nginx after backend restarts = fleet-wide 502s.
set -euo pipefail

wait_healthy() {
  local name="$1" tries="${2:-90}"
  for _ in $(seq "$tries"); do
    status=$(docker inspect -f '{{.State.Health.Status}}' "$name" 2>/dev/null || echo "missing")
    [ "$status" = "healthy" ] && return 0
    sleep 5
  done
  echo "WARN: $name did not become healthy in time" >&2
  return 1
}

echo "restarting dream-backend-1..."
docker restart dream-backend-1 >/dev/null
wait_healthy dream-backend-1

echo "restarting dream-backend-2..."
docker restart dream-backend-2 >/dev/null
wait_healthy dream-backend-2

echo "restarting dream-nginx (upstream IP refresh)..."
docker restart dream-nginx >/dev/null
sleep 3

curl -fsS http://localhost/api/health && echo && echo "rolling restart complete"
