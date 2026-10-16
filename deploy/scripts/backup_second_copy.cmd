@echo off
REM Second-copy backups - protects against the death of D: (the disk that holds
REM the primary nightly dumps). Copies the NEWEST dream_app + atlas_compliance
REM dumps from D:\platform\backups to C:\AtlasBackups (second physical disk),
REM keeps 3 copies of each, and archives the newest pair once per month into
REM C:\AtlasBackups\monthly (12 monthly archives kept).
REM Scheduled daily 04:00 (30 min after the 03:30 primary backup) - see
REM deploy/scripts/INSTALL_SCHEDULES.cmd. Pure file ops: never touches Docker.

setlocal enabledelayedexpansion
set SRC=D:\platform\backups
set DST=C:\AtlasBackups
set MONTHLY=%DST%\monthly

if not exist "%DST%" mkdir "%DST%"
if not exist "%MONTHLY%" mkdir "%MONTHLY%"

echo [%date% %time%] second-copy run start >> "%DST%\copy.log"

REM --- newest dumps on D: -----------------------------------------------------
set DREAM=
set COMP=
for /f "delims=" %%F in ('dir /b /o-d "%SRC%\dream_app_*.dump" 2^>nul') do if not defined DREAM set DREAM=%%F
for /f "delims=" %%F in ('dir /b /o-d "%SRC%\atlas_compliance_*.dump" 2^>nul') do if not defined COMP set COMP=%%F

if not defined DREAM (
    echo [%date% %time%] ERROR: no dream_app dump found in %SRC% - primary backup broken? >> "%DST%\copy.log"
    endlocal
    exit /b 1
)

REM --- copy newest pair -------------------------------------------------------
robocopy "%SRC%" "%DST%" "%DREAM%" "%COMP%" /NP /NJH /NJS /NDL >> "%DST%\copy.log" 2>&1
if errorlevel 8 (
    echo [%date% %time%] ERROR: robocopy failed rc=%errorlevel% >> "%DST%\copy.log"
    endlocal
    exit /b 1
)

REM --- size verification (a copy that doesn't match is not a backup) ----------
set FAIL=0
call :verify "%DREAM%"
call :verify "%COMP%"
if "%FAIL%"=="1" (
    echo [%date% %time%] RESULT: FAIL - size mismatch above >> "%DST%\copy.log"
    endlocal
    exit /b 1
)

REM --- retention: keep 3 newest of each dump pattern on C: --------------------
set N=0
for /f "delims=" %%F in ('dir /b /o-d "%DST%\dream_app_*.dump" 2^>nul') do (
    set /a N+=1
    if !N! GTR 3 (
        echo [%date% %time%] prune %DST%\%%F >> "%DST%\copy.log"
        del "%DST%\%%F"
    )
)
set N=0
for /f "delims=" %%F in ('dir /b /o-d "%DST%\atlas_compliance_*.dump" 2^>nul') do (
    set /a N+=1
    if !N! GTR 3 (
        echo [%date% %time%] prune %DST%\%%F >> "%DST%\copy.log"
        del "%DST%\%%F"
    )
)

REM --- monthly archive: compress newest pair once per month, keep 12 ----------
for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM"') do set MONTH=%%i
if not exist "%MONTHLY%\atlas_monthly_%MONTH%.zip" (
    echo [%date% %time%] monthly archive start: atlas_monthly_%MONTH%.zip >> "%DST%\copy.log"
    powershell -NoProfile -Command "Compress-Archive -Path '%SRC%\%DREAM%','%SRC%\%COMP%' -DestinationPath '%MONTHLY%\atlas_monthly_%MONTH%.zip' -Force" >> "%DST%\copy.log" 2>&1
    if exist "%MONTHLY%\atlas_monthly_%MONTH%.zip" (
        for %%A in ("%MONTHLY%\atlas_monthly_%MONTH%.zip") do echo [%date% %time%] monthly archive ok %%A %%~zA bytes >> "%DST%\copy.log"
    ) else (
        echo [%date% %time%] ERROR: monthly archive failed >> "%DST%\copy.log"
    )
) else (
    echo [%date% %time%] monthly archive for %MONTH% already present >> "%DST%\copy.log"
)
set N=0
for /f "delims=" %%F in ('dir /b /o-d "%MONTHLY%\atlas_monthly_*.zip" 2^>nul') do (
    set /a N+=1
    if !N! GTR 12 (
        echo [%date% %time%] prune %MONTHLY%\%%F >> "%DST%\copy.log"
        del "%MONTHLY%\%%F"
    )
)

echo [%date% %time%] RESULT: OK - %DREAM% + %COMP% on C:, sizes verified >> "%DST%\copy.log"
echo [%date% %time%] second-copy run done >> "%DST%\copy.log"
endlocal
exit /b 0

:verify
for %%A in ("%SRC%\%~1") do set SA=%%~zA
for %%A in ("%DST%\%~1") do set SB=%%~zA
if "%SA%"=="%SB%" (
    echo [%date% %time%] verified %~1: %SA% bytes ^(source %SA% = copy %SB%^) >> "%DST%\copy.log"
) else (
    echo [%date% %time%] SIZE MISMATCH %~1: source %SA% vs copy %SB% >> "%DST%\copy.log"
    set FAIL=1
)
goto :eof
