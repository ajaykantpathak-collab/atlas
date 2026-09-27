@echo off
cd /d D:\platform\frontend
set NODE_OPTIONS=--max-old-space-size=8192
set NEXT_DIST_DIR=.next-mobile
set INTERNAL_API_URL=http://localhost:8002
call npx next build --no-lint > _mobile_pwa_build.log 2>&1
echo BUILD_EXIT_%ERRORLEVEL% >> _mobile_pwa_build.log
