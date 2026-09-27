@echo off
cd /d D:\platform\frontend
set NEXT_DIST_DIR=.next-mobile-dev
set INTERNAL_API_URL=http://localhost:8002
call npx next dev -p 3005 > _mobile_pwa_dev3005.log 2>&1
