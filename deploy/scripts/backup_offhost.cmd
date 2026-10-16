@echo off
REM backup_offhost.cmd — LAUNCH-FIX-F4 (2026-10-15)
REM Copies the newest backups OFF this host and verifies them at the
REM destination. Audit §2 #3 (CRITICAL): backups were same-disk only.
REM
REM Target resolution (in order):
REM   1. OFFHOST_BACKUP_TARGET env var
REM      - rclone remote form:   atlas-backups:dream_app
REM        (rclone on PATH; install: winget install Rclone.Rclone;
REM         configure: rclone config)
REM      - robocopy path form:   \\NAS\AtlasBackups  or  E:\AtlasBackups
REM        (second physical disk / NAS share — NOT a partition of D:)
REM   2. harness/config.json -> backup.offhost_target
REM
REM Unconfigured = loud exit 2 with the exact owner setup commands in the
REM log — never a silent no-op.
REM Schedule: see INSTALL_OFFHOST_BACKUP.cmd (daily 04:30, after the
REM 03:30 pg_dump + 04:00 second-copy).
REM Log: D:\platform\harness\ops\backups\offhost_copy.log (append)

setlocal
set PYEXE=C:\ProgramData\anaconda3\python.exe
if not exist "%PYEXE%" set PYEXE=python

set LOGDIR=D:\platform\harness\ops\backups
if not exist "%LOGDIR%" mkdir "%LOGDIR%"

echo [%date% %time%] offhost copy start >> "%LOGDIR%\offhost_copy.log"
"%PYEXE%" D:\platform\harness\harness.py offhost-copy >> "%LOGDIR%\offhost_copy.log" 2>&1
if errorlevel 1 (
    echo [%date% %time%] offhost copy EXIT %ERRORLEVEL% - INVESTIGATE >> "%LOGDIR%\offhost_copy.log"
    echo offhost copy FAILED - see %LOGDIR%\offhost_copy.log
    endlocal & exit /b %ERRORLEVEL%
)
echo [%date% %time%] offhost copy OK >> "%LOGDIR%\offhost_copy.log"
echo offhost copy OK - see %LOGDIR%\offhost_copy.log
endlocal & exit /b 0
