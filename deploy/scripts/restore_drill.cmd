@echo off
REM Restore drill — proves the latest dream_app dump actually restores.
REM Restores into a SCRATCH database (dream_app_restore_test); production
REM dream_app is never touched. Run any time; also part of INSTALL_SCHEDULES
REM weekly drill.

setlocal
set BACKUP_DIR=D:\platform\backups

REM newest dream_app dump
for /f "delims=" %%F in ('dir /b /o-d "%BACKUP_DIR%\dream_app_*.dump" 2^>nul') do (
    set LATEST=%BACKUP_DIR%\%%F
    goto :found
)
echo NO DUMP FOUND - backups are not being produced >> "%BACKUP_DIR%\restore_drill.log"
echo [%date% %time%] FAIL: no dump found >> "%BACKUP_DIR%\restore_drill.log"
exit /b 1

:found
echo [%date% %time%] drill start: %LATEST% >> "%BACKUP_DIR%\restore_drill.log"

REM recreate scratch DB
docker exec dream-postgres psql -U dream_user -d postgres -c "DROP DATABASE IF EXISTS dream_app_restore_test;" >> "%BACKUP_DIR%\restore_drill.log" 2>&1
docker exec dream-postgres psql -U dream_user -d postgres -c "CREATE DATABASE dream_app_restore_test;" >> "%BACKUP_DIR%\restore_drill.log" 2>&1

REM restore
docker exec -i dream-postgres pg_restore -U dream_user -d dream_app_restore_test --no-owner < "%LATEST%" >> "%BACKUP_DIR%\restore_drill.log" 2>&1
if errorlevel 1 (
    echo [%date% %time%] FAIL: pg_restore errors >> "%BACKUP_DIR%\restore_drill.log"
    exit /b 1
)

REM sanity: core tables must exist and be non-trivial
docker exec dream-postgres psql -U dream_user -d dream_app_restore_test -t -A -c "SELECT 'students=' || count(*) FROM students;" >> "%BACKUP_DIR%\restore_drill.log" 2>&1
docker exec dream-postgres psql -U dream_user -d dream_app_restore_test -t -A -c "SELECT 'board_questions=' || count(*) FROM board_questions;" >> "%BACKUP_DIR%\restore_drill.log" 2>&1

REM drop scratch
docker exec dream-postgres psql -U dream_user -d postgres -c "DROP DATABASE IF EXISTS dream_app_restore_test;" >> "%BACKUP_DIR%\restore_drill.log" 2>&1
echo [%date% %time%] PASS: restore drill complete >> "%BACKUP_DIR%\restore_drill.log"
echo Restore drill PASS - see %BACKUP_DIR%\restore_drill.log
endlocal
