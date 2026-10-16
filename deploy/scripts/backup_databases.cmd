@echo off
REM Atlas database backups — pg_dump of dream_app + atlas_compliance.
REM Scheduled daily 03:30 by schtasks (see deploy/scripts/INSTALL_SCHEDULES.cmd).
REM Retention: 7 daily local dumps kept, older deleted.

setlocal
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HHmm"') do set STAMP=%%i
set BACKUP_DIR=D:\platform\backups
set RETENTION_DAYS=7

if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

echo [%date% %time%] backup start >> "%BACKUP_DIR%\backup.log"

REM dream_app (main app database)
docker exec dream-postgres pg_dump -U dream_user -d dream_app -Fc > "%BACKUP_DIR%\dream_app_%STAMP%.dump" 2>>"%BACKUP_DIR%\backup.log"
if errorlevel 1 (
    echo [%date% %time%] ERROR: dream_app dump failed >> "%BACKUP_DIR%\backup.log"
    goto :compliance
)
echo [%date% %time%] dream_app dump ok (%~z1 bytes) >> "%BACKUP_DIR%\backup.log"

:compliance
REM atlas_compliance (separate compliance database)
docker exec dream-postgres pg_dump -U atlas_compliance -d atlas_compliance -Fc > "%BACKUP_DIR%\atlas_compliance_%STAMP%.dump" 2>>"%BACKUP_DIR%\backup.log"
if errorlevel 1 (
    echo [%date% %time%] ERROR: atlas_compliance dump failed >> "%BACKUP_DIR%\backup.log"
) else (
    echo [%date% %time%] atlas_compliance dump ok >> "%BACKUP_DIR%\backup.log"
)

REM retention: delete dumps older than RETENTION_DAYS
forfiles /p "%BACKUP_DIR%" /m *.dump /d -%RETENTION_DAYS% /c "cmd /c del @path && echo deleted @file >> \"%BACKUP_DIR%\backup.log\"" 2>nul

echo [%date% %time%] backup done >> "%BACKUP_DIR%\backup.log"
endlocal
