@echo off
schtasks /delete /tn "Atlas-DB-Backup" /f 2>nul
schtasks /delete /tn "Atlas-Backup-SecondCopy" /f 2>nul
schtasks /delete /tn "Atlas-Restore-Drill" /f 2>nul
schtasks /delete /tn "Atlas-Watchdog" /f 2>nul
echo All Atlas schedules removed.
