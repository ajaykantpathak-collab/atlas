@echo off
setlocal
REM ============================================================
REM  Atlas local CI runner (Windows) - mirrors .github/workflows/ci.yml
REM
REM  Usage:
REM    backend\scripts\run_checks.bat          backend tests + frontend typecheck gate
REM    backend\scripts\run_checks.bat -Build   also run the frontend Next build
REM                                            - was known-RED: the sim-corpus
REM                                            type baseline existed; it reached 0
REM                                            on 2026-09-14 - see
REM                                            frontend\components\sims_v2\ARCHITECTURE.md
REM
REM  NOTE: cmd batch - NEVER put unescaped parentheses inside echo lines
REM  that sit within if (...) blocks. Exit code 0 = all checks green.
REM ============================================================
set "ROOT=%~dp0..\.."
set FAILS=0

echo.
echo ==== [1/2] Backend: python -m pytest its/tests -q ====
pushd "%ROOT%\backend"
python -m pytest its/tests -q
if errorlevel 1 (
    echo [FAIL] backend pytest
    set /a FAILS+=1
) else (
    echo [PASS] backend pytest
)
popd

echo.
echo ==== [2/2] Frontend: tsc behind the pinned baseline gate ====
pushd "%ROOT%\frontend"
node scripts\check_types_baseline.mjs
if errorlevel 1 (
    echo [FAIL] frontend typecheck gate
    set /a FAILS+=1
) else (
    echo [PASS] frontend typecheck gate
)

if /i "%~1"=="-Build" goto :build
popd
goto :summary

:build
echo.
echo ==== [optional] Frontend: npm run build - EXPECTED RED, see ARCHITECTURE.md ====
call npm run build
if errorlevel 1 (
    echo [FAIL] frontend build
    set /a FAILS+=1
) else (
    echo [PASS] frontend build
)
popd

:summary
echo.
if %FAILS% GTR 0 (
    echo ==== run_checks: %FAILS% checks FAILED ====
    exit /b 1
)
echo ==== run_checks: ALL GREEN ====
exit /b 0
