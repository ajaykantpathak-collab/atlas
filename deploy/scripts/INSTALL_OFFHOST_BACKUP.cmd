@echo off
REM INSTALL_OFFHOST_BACKUP.cmd — LAUNCH-FIX-F4 (2026-10-15), idempotent.
REM Installs ONE scheduled task: off-host backup copy, daily 04:30
REM (30 min after Atlas-Backup-SecondCopy at 04:00, so the second copy
REM is finished first; the 03:30 pg_dump precedes both).
REM
REM PREREQUISITE (owner, once): set the target before relying on this —
REM   rclone : winget install Rclone.Rclone ^&^& rclone config
REM            setx OFFHOST_BACKUP_TARGET "atlas-backups:dream_app" /M
REM   robocopy: setx OFFHOST_BACKUP_TARGET "\\YOUR-NAS\AtlasBackups" /M
REM Until then the task runs, logs, and exits 2 with the setup commands
REM in harness\ops\backups\offhost_copy.log — deliberately loud.
REM
REM Remove with: schtasks /delete /tn "Atlas-Backup-OffHost" /f

schtasks /create /tn "Atlas-Backup-OffHost" /tr "D:\platform\deploy\scripts\backup_offhost.cmd" /sc daily /st 04:30 /f
echo.
schtasks /query /tn "Atlas-Backup-OffHost" 2>nul | findstr /c:"Atlas-Backup-OffHost"
echo.
echo Next: verify the wiring tonight (or run now):
echo   D:\platform\deploy\scripts\backup_offhost.cmd
echo then check harness\ops\backups\offhost_copy.log
