@echo off
REM Production frontend build (non-Docker path).
REM Requires: node 20+, npm. Produces .next/standalone + .next/static.
cd /d %~dp0frontend
set NEXT_TELEMETRY_DISABLED=1
if not defined NEXT_PUBLIC_API_URL set NEXT_PUBLIC_API_URL=http://localhost:8001
npm ci
npm run build
echo Done. Serve with: node .next\standalone\server.js
