# APP READY — Final State (2026-09-15)

The complete app is sealed in **`D:\platform\deploy\`** — one self-contained
folder (~2.4 GB). Ship it, back it up, or move it; everything travels with it.

## How to run
```
cd D:\platform\deploy
docker compose -f docker-compose.prod.yml --env-file .env.production up -d --build
```
- Frontend (production build): :3001 (nginx :80 in front)
- Backend API (x2, load-balanced): :8001, :8002
- Dev alternative: `frontend: npm run dev` (:3000) + `deploy` backends.

## What's inside the bundle
| Piece | Location | Size |
|---|---|---|
| Backend code + data stores | `backend/` | 519 MB |
| Enhanced-nodes corpus (9,010 official nodes) | `content/enhanced_nodes_md/` (13,398 files) | ~313 MB |
| Lesson content + enrichment dirs | `content/`, `organized/` | ~450 MB |
| Enrichment JSONL (tutor/ITS) | `parsed_output/enrichment.jsonl` | 100 MB |
| Question bank (59,470 questions) | `cbse_data/question_bank.db` | 40 MB |
| Frontend source + 9,010 doodle PNGs | `frontend/` | ~550 MB |
| Docker + envs + nginx | `docker-compose*.yml`, `.env.production` | — |

## API surface
165 documented paths across 18 mounted routers. Everything the frontend
calls is mounted and verified live:
auth, content (enhanced-nodes ONLY for enrichment/teaching), graph,
progress, achievements, practice, practice/deterministic (question bank),
solver, tutor, tutor/its, tutor-graph (competency tutor), intelligence,
teacher-analytics, analytics (dashboard), accessibility, student
(prefs/onboarding), sync, health.

## Content policy (owner directive)
- **9,010 enhanced nodes = the only official corpus.** Never surface the
  21k legacy dataset anywhere.
- Enrichment/teaching content serves from the enhanced-nodes corpus ONLY
  (the 3,624-row CISCE-era `enrichment_content` DB table is not consulted).
- All text in sims/doodle cards is verbatim authored content (zero-wrong).

## Pages verified live today
- `/lumen` — front door: Solar System, Milky Way, Black Hole (rebuilt:
  silhouette + photon ring + sheared disk + halo + jets + starfield)
- `/atlas` — black/gold landing, gold-only headline, honest 9,010 stat
  (live-wired to /api/tutor-graph/stats)
- `/my-world` — student's real galaxy (WorldMap3D over GALAXY.json:
  mastery-lit, hover, click-to-sim, gold beacon, nebula dust, grain)
- `/learn/[nodeId]` — content from enhanced nodes + "Simulations for this
  topic" launcher (authored sims first) + Doodle Card PNG
- `/sims-v2/[id]` — sim player (3,018 sims; classes 9–12 verified 100%
  node coverage)

## Known follow-ups (not blocking)
- 216 REVIEW_NEEDED.json nodes — human authoring queue
- 75 class-11 Hindi cards in Kruti-Dev need transcoding (content pipeline)
- Prereq/unlocks panels on learn page read no graph yet (wire NODE_GRAPH)
- Mystery `_trash/` mover on this machine: restored 3 wired files today;
  find and constrain it before it deletes again
