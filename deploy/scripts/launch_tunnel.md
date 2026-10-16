# Atlas closed-test launch — laptop hosting via Cloudflare Tunnel

## One-time setup (owner)
1. Install cloudflared:  winget install Cloudflare.cloudflared
2. Pick ONE:
   a) Quick test URL (no account, URL changes on restart):
      cloudflared tunnel --url http://localhost:3001
      → copy the https://*.trycloudflare.com URL for testers.
   b) Stable URL (needs a Cloudflare account + a domain you own):
      cloudflared tunnel login
      cloudflared tunnel create atlas-test
      cloudflared tunnel route dns atlas-test atlas.yourdomain.com
      cloudflared tunnel run --url http://localhost:3001 atlas-test

## Before the 14-day window (owner)
- power: plugged in, sleep = never (Settings → System → Power)
- updates: Settings → Windows Update → pause updates for 5 weeks
- run the pagefile→SSD change (admin powershell, one command — provided)

## PREFLIGHT — every morning of the test (2 minutes)
1. `docker ps` → all 7 containers "healthy". Backends take 15-25 min to
   boot on this HDD (launch gate + warm corpus index) — that is normal.
   The gate now prints a live heartbeat: `docker logs dream-backend-1`
   shows `[....] <check> — started HH:MM:SS` then per-check PASS/FAIL.
   A bounded warm that overruns logs "WARM STEP ... ABANDONED" and the
   app STILL serves (degraded, slower first requests) — it can no longer
   wedge forever.
2. `curl http://localhost:3001/api/health` → "status":"ok"
3. Open the tunnel URL on YOUR phone → sign in → answer one practice
   question → confirm feedback appears.
4. Anything red: `docker restart dream-backend-1 dream-backend-2`, wait
   for healthy, re-run step 3 — BEFORE testers wake up.

## Tester instructions (copy-paste to your 12+ testers)
1. Open <your-tunnel-url> in Chrome on your phone.
2. Sign up (any email + password). Class 10 students: pick Class 10.
3. Use it like you mean it: missions, practice, games — 15 min/day.
4. Found something broken? Screenshot + send it to me.

## Play Store note
The privacy policy lives at <tunnel-url>/privacy (the app ships the page).
Play's closed track needs 12 testers for 14 days using the AAB — the
Android build steps are in deploy/frontend/capacitor/README-STORE.md.
