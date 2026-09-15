@echo off
REM ---------------------------------------------------------------------------
REM run_local.bat - start the DREAM_APP backend fully on SQLite
REM (no postgres / redis / neo4j / qdrant required).
REM
REM Usage:  backend\run_local.bat
REM Serves: http://127.0.0.1:8001  (docs at /docs, health at /health)
REM ---------------------------------------------------------------------------

setlocal

REM Repo root = parent of this script's directory
set "ROOT=%~dp0.."
cd /d "%ROOT%"
REM Normalize ROOT to a fully-qualified absolute path (portable: works on any
REM checkout location, not just D:\platform)
for %%I in ("%ROOT%") do set "ROOT=%%~fI"

REM --- Local SQLite database (async driver) --------------------------------
if "%PLATFORM_DATABASE_URL%"=="" set "PLATFORM_DATABASE_URL=sqlite+aiosqlite:///%ROOT:\=/%/backend_local.db"

REM --- Dev JWT secret (DO NOT use in production) ----------------------------
if "%PLATFORM_JWT_SECRET%"=="" set "PLATFORM_JWT_SECRET=dev-local-secret-change-me-0123456789abcdef0123456789"

set "PLATFORM_ENV=development"

echo Starting DREAM_APP backend (SQLite local mode)...
echo   DB:     %PLATFORM_DATABASE_URL%
echo   URL:    http://127.0.0.1:8001
echo.

REM First run? Create tables + seed data (idempotent; safe to run every time).
python -m backend.init_db

REM Start the API on port 8001
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8001

endlocal
