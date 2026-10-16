@echo off
REM Atlas frontend — NATIVE production build on the host (no Docker VM).
REM The old path built inside the 10GB WSL VM (10-20 min, OOM-wedged the
REM engine twice). On the host with node it is faster and can never wedge
REM Docker. Run this, then restart fe_serve.cmd (or it serves the old build
REM until you do).

title Atlas Frontend build (native)
cd /d D:\platform\deploy\frontend
echo Building frontend natively (node on host)...
cmd /c "npm run build"
if errorlevel 1 (
    echo BUILD FAILED - see output above. The running server keeps serving the last good build.
    exit /b 1
)
echo BUILD OK - restart fe_serve.cmd to serve it (or wait for its next restart).
