#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# run_local.sh - start the DREAM_APP backend fully on SQLite
# (no postgres / redis / neo4j / qdrant required).
#
# Usage:  bash backend/run_local.sh
# Serves: http://127.0.0.1:8001  (docs at /docs, health at /health)
# ---------------------------------------------------------------------------
set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Local SQLite database (async driver)
export PLATFORM_DATABASE_URL="${PLATFORM_DATABASE_URL:-sqlite+aiosqlite:///D:/platform/backend_local.db}"
# Dev JWT secret (DO NOT use in production)
export PLATFORM_JWT_SECRET="${PLATFORM_JWT_SECRET:-dev-local-secret-change-me-0123456789abcdef0123456789}"
export PLATFORM_ENV=development

echo "Starting DREAM_APP backend (SQLite local mode)..."
echo "  DB:  $PLATFORM_DATABASE_URL"
echo "  URL: http://127.0.0.1:8001"

# First run? Create tables + seed data (idempotent; safe to run every time).
python -m backend.init_db

# Start the API on port 8001
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8001
