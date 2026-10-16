@echo off
REM Installs the Atlas ops schedules (idempotent - re-run safely).
REM   1. Database backups     - daily 03:30   (deploy\scripts\backup_databases.cmd)
REM   2. Second-copy backups  - daily 04:00   (deploy\scripts\backup_second_copy.cmd)
REM      30 min after the primary dump: newest dream_app + atlas_compliance
REM      copied to C:\AtlasBackups (3 kept) + monthly archive (12 kept).
REM   3. Watchdog             - every 5 min   (deploy\scripts\watchdog.py)
REM      Alerts via toast + Windows Event Log (notify_alert.ps1); auto-starts
REM      backend/frontend containers after 15 min of continuous "down".
REM   4. Weekly restore drill - Sundays 04:15 (deploy\scripts\restore_drill.cmd)
REM Remove all four with: UNINSTALL_SCHEDULES.cmd
REM NOTE: python must be an ABSOLUTE path - Task Scheduler does not resolve
REM the WindowsApps "python" alias (that is why the old task logged 0x80070002).

set PYEXE=C:\ProgramData\anaconda3\python.exe
if not exist "%PYEXE%" set PYEXE=python

schtasks /create /tn "Atlas-DB-Backup" /tr "D:\platform\deploy\scripts\backup_databases.cmd" /sc daily /st 03:30 /f
schtasks /create /tn "Atlas-Backup-SecondCopy" /tr "D:\platform\deploy\scripts\backup_second_copy.cmd" /sc daily /st 04:00 /f
schtasks /create /tn "Atlas-Watchdog" /tr "%PYEXE% D:\platform\deploy\scripts\watchdog.py" /sc minute /mo 5 /f
schtasks /create /tn "Atlas-Restore-Drill" /tr "D:\platform\deploy\scripts\restore_drill.cmd" /sc weekly /d SUN /st 04:15 /f
echo.
echo Installed: Atlas-DB-Backup (daily 03:30), Atlas-Backup-SecondCopy (daily 04:00), Atlas-Watchdog (every 5 min), Atlas-Restore-Drill (Sun 04:15)
schtasks /query /tn "Atlas-DB-Backup" 2>nul | findstr /c:"Atlas-DB-Backup"
schtasks /query /tn "Atlas-Backup-SecondCopy" 2>nul | findstr /c:"Atlas-Backup-SecondCopy"
schtasks /query /tn "Atlas-Watchdog" 2>nul | findstr /c:"Atlas-Watchdog"
