@echo off
REM Atlas frontend — NATIVE production server (no Docker for the frontend).
REM Serves .next on port 3001 with an auto-restart loop. Uses node directly
REM on next's bin — npx resolution dies in detached shells (no PATH update).
title Atlas-Frontend-native-3001
cd /d D:\platform\deploy\frontend

:loop
echo [%date% %time%] frontend server starting >> D:\platform\frontend_serve.log
cmd /c "node node_modules\next\dist\bin\next start -p 3001 >> D:\platform\frontend_serve.log 2>&1"
echo [%date% %time%] frontend server exited - restarting in 3s >> D:\platform\frontend_serve.log
timeout /t 3 /nobreak >nul
goto loop
