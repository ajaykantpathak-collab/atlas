@echo off
cd /d D:\platform\frontend\.next-mobile\standalone
set PORT=3004
set HOSTNAME=127.0.0.1
set INTERNAL_API_URL=http://localhost:8002
node server.js > ..\..\_mobile_pwa_start.log 2>&1
