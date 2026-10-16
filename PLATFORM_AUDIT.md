# ATLAS — Full-App 10/10 Audit
*2026-09-21 — every surface, every hook, every piece. Rating = pedagogical+product quality vs. "would a pedagogy expert + struggling student both call it 10/10".*

---

## A. STUDENT — SENIOR (Classes 6-12)

| Surface | Status | Rating | What's missing for 10/10 |
|---|---|---|---|
| `/learn` hub | Chapter-grouped path + "Your path" queue (review→resume→prereq-verified next) + done markers + doodle thumbs | **8.5** | Backend-mastery-driven ranking (currently localStorage `atlas_done:` + prereq API); no cross-subject "today's plan" |
| `/learn/[topicId]` — StudySession | probe→hook→see→define→try(fading)→check→**recall**→master; ChunkedText, ConfidenceGate, misconception recipes, stuck panel, AskBar, position chip, warmup interleave | **9** | Recall self-check is honor-system (no LLM grading); no buddy/peer explain |
| `library` mode (same page) | Full sections — ELI5/def/walkthrough/misconception/tabs/doodle card | **8** | Library is redundant vs session — could confuse; keep as power view |
| `/sims-v2` + `[id]` | 3,754 defs, explore→predict→play→reflect, BKT per sim, canvas+3D labs, srsrs resume | **8.5** | Senior sims: misconception recipes less wired than learn page; no "sim taught X" backlink |
| `/practice` + deterministic | IRT/BKT adaptive, authored questions | **8** | No error-diary ("why I missed") capture per question |
| `/review` | SM-2 queue, session cap, honest verdicts | **8.5** | Not surfaced on /learn until done; no cram vs spaced distinction |
| `/exam`, `/exam-simulator`, `/exam-prep`, `/chapter-test` | Full assessment suite | **8** | No post-exam "study plan from results" auto-generated |
| `/diagnostic` | Entry diagnostic exists | **8** | One-shot only — no re-diagnosis trend |
| `/tutor` (ai-tutor, socratic-tutor, competency-tutor → redirects) | Single tutor; AskBar in-session | **7.5** | Tutor doesn't know what student is on/did; no lesson mode inside tutor |
| `/progress`, `/portfolio`, `/achievements` | Tracking + badges | **7.5** | Mastery ≠ presented as "what I know" map for the child; portfolio is passive |
| `/solver`, `/study-tools`, `/study-groups`, `/videos`, `/explore`, `/homework` | Exist | **7** | Weak interlinking — none surface "do this because you're on X" |
| `/my-galaxy`, `/my-world`, `/galaxy`, `/world` | Gamification overlays | **6** | Four overlapping metaphors; rewards not tied to mastery depth |
| `/offline`, `/settings`, `/settings/accessibility` | Exist | **7** | Offline = content cache only, no sync queue for progress writes |

## B. STUDENT — JUNIOR (Classes 1-5)

| Surface | Status | Rating | Missing |
|---|---|---|---|
| `/play` | 189 games, mastery-gate (80%+×2), subject chips, **Today's mission** (weakest-subject), sim link, placement check | **8.5** | Cross-subject daily plan (maths→english→evs); no parent-set goals |
| `/junior` (Gajju) | Voice-first, 3 langs, star economy | **7.5** | Not linked to /play mastery — separate progress silo |
| `/sims-v2` junior | Interactive everywhere, validated interacts, 3D auto-mounts, tracing (letters/akshara), fluency (wpm), say-it-back recall, Hindi TTS | **8.5** | No phoneme-level audio; no handwriting stroke order (trace is free-form) |
| Junior curriculum | 189 games + 162 sims mapped 1:1 | **9** | Junior doodle cards don't exist; fluency only c2_eng_reading wired |
| Junior diagnostic | Placement check on /play | **7.5** | LocalStorage only; not adaptive after entry |

## C. PARENT / TEACHER

| Surface | Status | Rating | Missing |
|---|---|---|---|
| `/parent-*` (3 routes) | Dashboard + portal + overview | **7** | Duplicated routes; no "what to do tonight" actionable feed; no sibling comparison off-switch |
| `/teacher-*` (4 routes) | Dashboard, assignments, overview, portal | **7.5** | Assignment→remediation loop not auto-generated from class misses |
| `/admin-dashboard` | Exists | **7** | No content-quality view (orphans, thin chapters) |

## D. CONTENT / PLATFORM

| Piece | Status | Rating | Missing |
|---|---|---|---|
| Senior corpus | 10,941 question tags → 0 orphans; every chapter ≥3 nodes | **10** | Depth ≠ validated by humans; cisceNodes junior are placeholder ids |
| Junior games | 189, Hindi/English strands, numeracy, EVS, computer | **8.5** | ~0 junior doodle recap cards; games are quiz-first not manipulative-first |
| Sim engine | SimDef→JSON, widgets+labs+3D, validation, SRS, TTS | **8.5** | No A/B on teaching order; sim↔lesson linkage not mutual |
| Games engine | GameData, mastery store, completion→sim link | **8** | All games share one engine shape; no drag/build/arrange game types |
| Mastery/backend | BKT+IRT, interactions logged | **8** | Junior game mastery is localStorage-only — doesn't reach backend |
| Auth/roles | student/parent/teacher/admin | **8** | No co-view for parent+child session |

## E. CROSS-CUTTING

| Concern | Status | Rating | Missing |
|---|---|---|---|
| TTS | Cloud proxy + Web Speech fallback; hi/en auto | **8.5** | No regional accent choice; no speed control for juniors |
| Accessibility | settings/accessibility page exists | **7** | Not audited end-to-end for WCAG |
| Offline | Service worker + offline page | **6.5** | Reads cache-only; writes (progress/scores) not queued |
| Perf | Next static + dynamic chunks | **7.5** | Learn page fetches 500 nodes per subject (no pagination) |
| Monitoring | docker healthchecks | **7** | No error tracking, no real-user metrics |
| Tests | Some | **6.5** | No e2e learning-path tests; typecheck OOM'd once |
| Dead routes | `/_archive/*`, `/riv-test`, `/sim-test`, `/game-test`, `/story-visuals-preview`, `/dragon-inspect`, `/junior-simple`, `/atlas`, `/atlas-v2`, `/lumen`, `/organism` live in prod | **—** | **Remove or gate behind dev flag** |
| Premium tree | `/premium/*` = parallel duplicate app (~30 pages) | **—** | **Decide: kill or merge — doubles every UI fix** |

---

## TOP 10 REAL GAPS TO CLOSE FOR 10/10

1. **Backend→hub ranking** — wire real mastery scores into `/learn` "Your path" (not localStorage)
2. **Junior daily plan** — multi-step cross-subject sequence on `/play`
3. **Junior progress→backend** — game mastery is local-only, unreachable by parent/teacher dashboards
4. **Exam→remediation loop** — post-exam auto-study-plan from missed nodes
5. **Tutor context** — tutor should know what topic the student is on
6. **Offline writes** — queue progress/scores, sync on reconnect
7. **Kill duplicates** — `/premium/*` tree, archive/test routes in prod
8. **Junior doodle cards** — recap visuals for c1-5 (content job)
9. **Real-learner validation** — zero user-observation evidence; all quality is inferred
10. **Monitoring/e2e** — no error tracking or learning-path regression tests
