@echo off
REM Production backend — single-process variant (compose runs 2 workers).
REM For a VM without Docker: set env vars then run this.
cd /d %~dp0
if not defined PLATFORM_ENV set PLATFORM_ENV=production
if not defined UVICORN_WORKERS set UVICORN_WORKERS=4
if not defined INTERACTIONS_PATH set INTERACTIONS_PATH=%~dp0cbse_data\interactions.json
gunicorn backend.main:app --worker-class uvicorn.workers.UvicornWorker --workers %UVICORN_WORKERS% --bind 0.0.0.0:8000 --timeout 120 --access-logfile - --error-logfile -
