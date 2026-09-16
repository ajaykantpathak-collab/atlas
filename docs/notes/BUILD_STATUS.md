# BUILD STATUS (2026-09-09, wave in flight)

## Policy changes this session
- LANGUAGE SUBJECTS OUT OF SCOPE (hindi, english, sanskrit, urdu, french):
  interpretive literature cannot be answered deterministically (zero-wrong).
  Router excludes them (LANGUAGE_CATALOGS=1 re-includes for audit).
  Coverage denominator now 657 chapters (280 language chapters excluded).
- _normalize_question keeps Devanagari (Hindi was normalizing to empty).
- validate_catalog enforces title pre-flight, 20-char Devanagari copy-run,
  and Devanagari topical grounding (was Latin-only; fabricated Hindi passed).

## Final coverage wave (in flight)
- DONE this wave: Psychology 7, Sociology book1 5, Sociology book2 3,
  Applied Maths 19/19 (all gate-passed; 103 DSL chains audited).
- RUNNING: Computer Science 26ch, Informatics Practices 17ch,
  Biotechnology 27ch, Home Science + Computerised Accounting + practicals 19ch,
  Sociology book2 lesy205-208.
- Permanent skips: 6 am11 cache fragments (20-146 bytes, empty extracts).

## After the wave lands
1. Audit every staging catalog through validate_catalog (tightened gate).
2. Assemble staging -> live competency dir.
3. Full pytest suite; regenerate COVERAGE_MAP.json; re-run scoreboard.
4. Archived 192 language catalogs: backend/its/competency/staging/language_archive/.

## Known deferred
- Grammar-slice language catalogs (objective-only) - parked, optional lane.
- Sealed held-out gate (2416 questions) once solver scope stable >= 90%.
- torch/sklearn native segfaults (environment).


## APP LIVE + LUMEN PORTED (session compact point)

## LIVE STATE
- Backend :8001 (SQLite via run_local.bat), frontend :3000. 1,360 tests green.
- Red-team 90/90 (corpora: _redteam/, redteam_attack/).
- Student-review findings: ALL 10 FIXED (class gate, graded-first serve,
  practice round-trip, real stats, OpenStax quarantine, CBSE exams,
  metadata strip, ask-lane parse fixes, student_id binding, DeepSeek fix).

## CONTENT TOTALS
- 1,226 catalogs (all in-scope chapters, 2026-27 verified)
- 69,790 generated questions (backend/its/questions/generated/)
- 8,873 enhanced-node lessons live at /api/nodes/*
- 945 sims, 753 wired (components/lumen is separate, see below)
- Voice layer (79,965 patterns, Hinglish) + WHY-lane (40 topics)
- Struggling-student: prerequisite retreat, difficulty ladders, micro-wins
- Landing: / = ATLAS art page (galaxy canvas + AstraLoop); /lumen = Lumen
  Lab port (262k GPGPU particles, 3 lessons, Enter path) — CORE UNTOUCHED.
  Lumen canvas renders in real browsers only (headless loses WebGL ctx).

## OPEN QUEUE (next session, in order)
1. DONE: / -> /lumen redirect live (Atlas landing archived at
   app/_archive/atlas-landing/). SIM_BRIEF.md protect rule added.
2. DONE: Hermes wiring — GemmaRenderer (its/agents/gemma_renderer.py):
   Gemma 4 26b-a4b (fast phrasing) + 31b (deep/WHY lane), maxOutputTokens
   8192, thinking parts filtered, LRU+shelve cache, template fallback on
   any failure. Preferred in socratic_pipeline_integrated + /api/intelligence;
   Claude/Fable kept as secondary. _lazy_import now also tries
   its.agents.*. claude_renderer cache-key bug fixed. Verified
   end-to-end (claude_called=True, warm phrasing). RESTART :8001 to load.
3. DONE: micro-win tests (18/18 passing).
4. PCM reader builder: superseded — class 11/12 PCM catalogs+questions
   already live in competency dir.
5. 3D concepts wave (~60 senior topics, Three.js)
7. Known env limits: headless Chromium loses WebGL under GPGPU load —
   verify all visual work via owner's browser or swiftshader fallback.

## KEY FILES
backend/its/solver/* (engine + guards), backend/its/tests/* (1,360),
frontend/components/lumen/* (Lumen core, verbatim), frontend/app/lumen/*
(route + css), backend/api/competency_tutor.py (tutor API),
student_review/ (critic scripts), TRUE_SIM_GAPS.json, COVERAGE_MAP.json.

# SESSION STATE (2026-09-13, post port + galaxy work)

## FRONT DOOR (done, owner-approved direction)
- / redirects to /lumen (cosmos, 262k GPGPU). Lumen fixes: ui.js null-guard,
  cardSwap animation restored in lumen.css, hint bar un-stacked (shared
  position:absolute rule split; hints now flex children of footer),
  lesson-card readability scrim (::before), dock-links row under dock
  (ATLAS / 945 SIMS / PRACTICE / JUNIOR WORLD). Class 1-12 branding.
- Enter the app -> /atlas (NEW route): full port of dream_app PRISM landing
  (1700 lines) + GoldenGalaxy.tsx + AtlasLandscape.tsx copied to
  components/prism/. Syne+Outfit fonts + .premium-link added to globals.css.
  Class cards show REAL concept counts (6:762 7:795 8:829 9:556 10:781
  11:2323 12:2303, JEE/NEET 4626) + spectrum dots + gold selected state.
  Subject chips row REMOVED from Atlas section (owner request).
  GoldenGalaxy = single black-gold spiral (7200 particles, canvas 2D,
  differential rotation, comets, rings) — owner-approved motif.
- app/atlas-v2 = old tabbed Fable showcase; UNLINKED from flow (reference only).

## GEMMA (LLM voice layer, live)
- backend/its/agents/gemma_renderer.py: Gemma-4 26b-a4b (fast) + 31b (deep),
  maxOutputTokens 8192, thinking parts filtered, LRU+shelve 24h cache,
  template fallback. Wired into socratic_pipeline_integrated (Gemma preferred,
  Fable fallback) + api/intelligence._get_renderer. GEMINI_API_KEY in
  D:/platform/.env. _lazy_import now tries its.agents.*. Needs backend
  restart to load.

## IN FLIGHT / NEXT
1. Full-website patch fleet (2 agents): auth+student-core reskin, tutor pages
   + sims health pass. LAUNCH BLOCKED by 2 zombie finished-agent slots in IDE
   — owner must close them or restart session. Full briefs in this session.
2. Knowledge-graph nodes wiring (owner: do LAST).
3. Synthetic struggling students gauntlet class 1-12 (script design agreed,
   not built). Backend :8001 needs restart.
4. Lumen 9.5/10 (owner-approved). Remaining: theatrical lesson transitions,
   hold-to-gather reward animation.

## KEY FILES TODAY
frontend/app/atlas/page.tsx, frontend/components/prism/{GoldenGalaxy,
KnowledgeConstellation(unused),AtlasLandscape}.tsx, frontend/app/lumen/*
(frontend: lumen.css, page.tsx, lessons.js, ui.js), backend/its/agents/
gemma_renderer.py, backend/its/tutoring/socratic_pipeline_integrated.py,
frontend/app/globals.css (fonts).

## ENV NOTES
- dream_app frontend dev server on :3200 (background task) — reference copy.
- Headless IAB browser: WebGL contexts exhaust quickly; GoldenGalaxy is
  canvas-2D (safe). Real-browser verification by owner for GPU work.

## FLEET BRIEF (relaunch immediately after session restart — 2 agents)
AGENT A — COMPLETE AI TUTOR (frontend/app/(student)/competency-tutor):
Build full chat-like tutor on existing /api/tutor-graph/{serve,submit,hint,ask,
teach,progress}: natural-language answers + voice field framing, 3-level hint
ladder UI, teach-me card, free-form ask box, real mastery/progress with honest
empty states, Hinglish when voice provides, NO metadata leaks (abc::3/TOPIC_TAG/
ANSWER), struggling-student features (retreat/micro-wins) displayed. Design
system: #0a0a0f, white/3-6% panels, gold-400 accents, Syne headings, warm copy.
May split into frontend/components/tutor/. Backend changes FORBIDDEN.
AGENT B — SIMS COVERAGE + HEALTH (frontend/components/simulations/):
~945 sims exist, ~753 wired. Wire all existing-but-unwired (registry via
scripts/build_c6_12_registry.js; gaps in TRUE_SIM_GAPS.json). tsc sweep fix
all sim errors. Max 15 NEW sims (board classes 10/12/9 first, SIM_BRIEF.md
exact). PROTECT: never shrink — wc -l before/after every touched file.
Sample 10 sims: 3+ controls, reset, units, no hardcoded results.
BOTH: no heredocs (Read+Edit/Write only), finish gate = zero introduced
tsc errors + curl 200s, do-not-touch: lumen/atlas/atlas-v2/(auth for B)/
components/prism/backend/knowledge-graph. Owner did auth+dashboard+student
core pages AFTER if fleet A covers them — see below.
NOTE: dashboard/(auth)/progress/achievements/practice reskin brief also
pending (was agent A of the first fleet — design system + honesty rules
identical, includes GoldenGalaxy ambient).

## DEEP AUDIT VERDICT (2026-09-13) — ACTION REQUIRED
Headline: main.py mounts only 12 routers; api/tutor.py + api/intelligence.py
NEVER mounted. State machine, unified engine, 6-agent ensemble, orchestrator,
meta-brain, A/B tester, self-play, KST selector = ALL DEAD at runtime.
LIVE stack: competency_tutor (TutorEngine+tutor_voice+simple_explainer+
enhanced_nodes+misconception_catalog) + routers/tutor + practice (BKT/IRT).
FIX ORDER: (2) mount orphaned routers + fix asdict NameError
(unified_socratic_engine.py:34,950) + AgentAction.get no-op (api/tutor.py
~541) + wire GemmaRenderer into engine [partially done: _get_unified_engine
now builds renderer but route unmounted]. (3) science mastery: Curiosity
catalogs have 0 graded items -> _concept_pool must read question/solution/
answer key shape + MCQ-convert numberless templates. (4) retreat: self_check
skips never call _on_wrong; exclude last qid per concept. (5) unify mastery
into KnowledgeTracingEngine. (6) pipeline silent guards: build_state/
get_teaching_context/capture renames + orchestrator.decide must arbitrate
proposed_actions. (7) persisted SM-2 + week tracking. DONE: hint-leak fix
(tutor.py hint L2 mask + L3 revealed-flag + correct_revealed no-credit),
63 tests pass. 2 background agents still running: tutor+sims frontend
builder, and nothing else (audit finished).
