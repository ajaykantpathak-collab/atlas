---
name: atlas-content
description: Add or ingest curriculum content into the Atlas CBSE platform (D:\platform) — new NCERT chapters, Hindi subjects, topic nodes, or Classes 1-5 junior games. Use whenever the user mentions adding content, new chapters, NCERT topics, ingesting writer content, filling curriculum gaps, or authoring new educational material for Atlas.
---

# Atlas Content Pipeline

Add curriculum content to Atlas with zero-wrong verification. One rule above all:
**every fact must be verifiable against authoritative sources (NCERT/CBSE syllabus),
and every derived word/number must trace to an authored file.** Never invent facts.

## Pipeline overview

1. Author content in the canonical format (see references)
2. Place files in the canonical tree: `deploy/content/enhanced_nodes_md/`
3. Rebuild the index ONCE (in backend-1, ~85s; copy cache JSON+pickle to backend-2)
4. Deploy code changes via docker cp + OPS restart-lock (see references/deploy-flow.md)
5. Verify live on :3001/:80, mirror everything to the root tree

## Senior corpus (Classes 6-12): one md file = one topic node

Read `references/node-format.md` for the exact section spec
(ELI5 / DEFINITION / WALKTHROUGH / DIAGNOSTIC_Q&A ≥6 / COMMON_MISCONCEPTION /
ON_FAILURE / WORKED_EXAMPLE / PREREQUISITE_NODE_IDS).
File naming: `<class>_<subject>_cbse_<chapter>_<serial>.md`.
Canonical priority: `deploy/content/enhanced_nodes_md/` (never the stale
`content/md_cache` Desktop-era snapshot).

## Junior games (Classes 1-5): one JSON = one game

Read `references/junior-games.md` for the GameData spec (5 slides + 8 challenges,
named mascots, subject-detection via `getSubjectKey` in app/play/page.tsx).
Files: `frontend/public/data/games/c<N>_<Name>Game.json` + register in
`_manifest.json`. Mirror to `deploy/frontend/public/data/games/`.

## Quality gates — run ALL before declaring done

- `verify_gen_corpus.py` pattern: every word ≥4 chars and every number in derived
  content must exist in the source file (fidelity verifier; Devanagari-aware for Hindi)
- Schema validation for junior games: 5 slides, 8 challenges, options ≥3,
  answer ∈ options, sort challenges have sortItems+bins
- Answer self-consistency: no ambiguous items, no duplicate options, correct
  answer always present
- Live verification: enrichment/questions endpoints return the new content on
  :3001, Story/practice boot for new nodes

## Known traps

- CACHE_VERSION must bump in `enhanced_nodes.py` whenever the parser changes
  (else stale index caches load silently)
- `content/md_cache` is a dead Desktop-era snapshot — never read from it
- `_CORPUS_SUBJECTS` aliases in question_selector must include the new subject
  code or practice/diagnostics serve zero corpus rows
- Board/account content historically leaked across grades — class-gate everything

## Current gap priorities

Read `CURRICULUM_GAPS.md` — it holds the per-class gap list from the 6-student
curriculum audit (author new chapters only where the owner approved authoring).

<!-- semia:inlined-source-start -->

### references/gap-priorities.md

``````text
# CURRICULUM GAPS — synthetic-student audits

One line per gap. Tags: MISSING / THIN / BROKEN / PREREQ-GAP, with evidence.
Auditor: SYNTHETIC STUDENT C7 (fresh signup, Class 7, prod :3001). Audit window 2026-09-20 21:00-22:30 IST. Raw evidence: D:\platform\student_c7\ (verify_all.json, verify_detail.json, ct_start_scan.json, ct_chapters_all.json, diag_debug.json, diag_rest.json, prac_all.json, prac_depth.json, tutor_sessions.json, enrich_rescan.json).
Auditor: SYNTHETIC STUDENT C8 (fresh signup, Class 8, prod :3001). Audit window 2026-09-20 19:45-22:00 IST (resumed after a killed prior run). Raw evidence: D:\platform\_c8_audit\ (corpus_scan.json 561 nodes, stage6_diag.json, stage7_diag_ct.json, stage7b.json, stage7c_diag_final.json, stage8_tutor.json, diag_debug probes, s9c/s10/s11 browser shots).
Auditor: SYNTHETIC STUDENT C1112 (fresh signups, Class 11 + Class 12, prod :3001). Audit window 2026-09-20 19:50-21:40 UTC (resumed after a killed prior run; token-expiry-contaminated records re-verified with fresh logins). Raw evidence: D:\platform\_c1112_audit\ (results_c11.jsonl 1,253 records, results_c12.jsonl 1,194 records, reprobe.jsonl, chapter_map.json, audit.py).
Auditor: SYNTHETIC STUDENT C6 (fresh signup, Class 6, prod :3001). Audit window 2026-09-20 19:52-22:10 UTC (resumed after a killed prior run). Raw evidence: D:\platform\_c6_audit\ (catalog.json, chapter_results.json 59/59 chapters, sweep3_results.json, enrich_results.jsonl 434/434 nodes, story_results*.json, walkD/E/F/G_results.json + shots/, tutor_check.json).
Auditor: SYNTHETIC STUDENT C10 (fresh signup, Class 10, prod :3001). Audit window 2026-09-20 20:10-22:05 UTC (no prior Class 10 section existed to resume; started fresh). Raw evidence: D:\platform\_c10_audit\ (p1_story.jsonl 660 nodes, p2_practice.jsonl 74 chapters, p3_preboard.jsonl + preboard_mathematics/science/social_science_raw.json 3 full papers, p4_diag_tutor.jsonl 14 diagnostics + 11 tutor sessions, p5_grading.jsonl, p6_browser.jsonl 14 screens, shots/, phase*.js harnesses).
Auditor: SYNTHETIC STUDENT C9 (fresh signup, Class 9, prod :3001). Audit window 2026-09-20 20:30-23:30 UTC (no prior Class 9 section existed to resume; started fresh). Raw evidence: D:\platform\student_c9\ (stage1_signup.js/inventory, stage2_catalog.json, stage2b_node_map.json 416 nodes, stage2c_learn.json + stage2c_enrichment_full.json 416/416, stage5a_ct_catalog.json 11 subjects, stage3457_functional.json + stage345_fix.json, stage68_browser.json + stage6b/stage6c + shots/).
Auditor: SYNTHETIC STUDENT C15 (parent of a young child; Classes 1-5 junior-games curriculum audit). Audit window 2026-09-20 22:45-23:40 UTC. Evidence: frontend/public/data/games/_manifest.json + all 133 game JSONs (slide/challenge extraction, schema check 133/133 well-formed), frontend/app/play/page.tsx SUBJECT_META + getSubjectKey heuristics, production probes on :3001 (play HTML 200; /data/games/_manifest.json 404; dream-frontend /app/public has no data/ dir), deploy/frontend/public tree, Class 6 corpus head nodes (deploy/content/enhanced_nodes_md/c6_*). Product defects in BUGS.md as [STUDENT-C15].

## Classes 1-5 (Junior)

Junior (Classes 1-5) is taught through 133 browser games at /play (class chip -> subject card -> game card), data in `frontend/public/data/games/*.json` + `_manifest.json`. Per class: C1 21, C2 20, C3 31, C4 28, C5 33 games; every game = 5 teaching slides + 8 challenges; 133/133 JSONs schema-valid (one per class booted end-to-end at the data layer: slides parse, challenges carry question/answer/options or interactive objects). The UI can ever show only 4 subject chips — maths, science, evs, computer — because `getSubjectKey()` (frontend/app/play/page.tsx) derives subjects from filename regexes; `english` and `social` chips are defined in SUBJECT_META but can never render (0 games). Coverage % below is vs the actual CBSE/NCERT Class 1-5 syllabus (Math-Magic + Looking Around/EVS themes + Marigold English), counting a strand covered only if a game teaches it.

### Class 1 — 21 games (maths 5, EVS/science 13, computer 2). Coverage ~45% (maths 55%, EVS ~75%, English 0%)
- COVERED — maths: counting & teen numbers to 20, comparing (CountingGame); addition AND subtraction to 20 on the number line (AdditionGame — renamed "Add & Subtract" in UI); 2D shapes triangle/square/rectangle/circle (ShapeSortGame); patterns (PatternsGame); heavier/lighter weight comparison (BalanceGame). EVS: body parts + 5 sense organs (BodyGame); food groups & junk food (FoodGame); personal cleanliness (CleanlinessGame); animals-sounds-homes (AnimalsGame, AnimalTypesGame — pets/wild/domestic, habitats); plants-parts-types (PlantsGame, PlantTypesGame); air (AirGame); water sources/save/reuse (WaterGame); sun/moon/day-night (SunMoonGame); transport land/water/air (TransportGame); weather & caring for Earth (EarthWeatherGame); neighbourhood places (NeighbourhoodGame); safety at home/on roads (SafetyGame). Computer: parts, input/output, mouse/keyboard care (ComputerBasicsGame, ComputerInputGame).
- MISSING — maths: numbers 21-100 (NCERT Math-Magic spends 4 chapters there; Atlas stops at 20 — CountingGame caps at teen numbers), money (coins/notes), time/daily-routine, length comparison (long/short — only weight has a game). EVS: **family** (the "myself and my family" core NCERT theme has no game in ANY junior class), clothes, festivals. English: everything (no game exists platform-wide — see bridge below).
- THIN — one game per major maths strand: a C1 child gets 8 challenges on numbers-to-20 and nothing above; "Which is More?" is the only comparison exercise.
- WRONG-GRADE — place-value diagram shows a Crores/Lakhs/Thousands/Ones chart with static digits 1234 on CountingGame/AdditionGame/PatternsGame slides (template reuse — a Class 1 child counting 5 apples is shown crore place value, and the chart contradicts the slide text; also the "14 vs 9 apples" slide draws bars 40 vs 60). Logged as [STUDENT-C15][P2 PLACE-VALUE-TEMPLATE].

### Class 2 — 20 games (maths 6, EVS/science 8, geography 2, physics 2, computer 2). Coverage ~50% (maths 75%, EVS ~65%, English 0%)
- COVERED — maths: numbers to 999 & place value (NumbersGame); 2-digit add/sub with carry/borrow + word problems + estimation (AddSubGame); multiplication as repeated addition, tables 2-5, division as sharing (MulDivGame); patterns (PatternsGame); lines/shapes (ShapesLinesGame); length/weight/capacity (MeasurementGame). EVS: sense organs & body care (BodyFunctionsGame); five food groups (FoodGroupsGame); plants (PlantsGame); animals-habitats-life-cycle (AnimalsGame); air & clean surroundings/germs (AirCleanGame); water (WaterGame); safety & hygiene (SafetyCleanGame); my environment (MyEnvironmentGame). Earth/sky: day-night-seasons (EarthSunGame), directions & simple maps + water sources (DirectionsMapGame). Computer: basics + Paint/files (ComputerBasicsGame, ComputerFilesGame).
- MISSING — maths: money (NCERT "Rupees and Paise" strand), time (clock/calendar), data handling. EVS: family & relationships, shelter/house types (no game this class), festivals, "how your body moves"/games.
- THIN — SolarSystemGame (physics-labeled) is the only space content and duplicates EarthSunGame's day-night slides at greater depth; geometry is one game.
- WRONG-GRADE — NumbersUpTo999/place-value slides reuse the same Crores/Lakhs chart with digits 1234 (NCERT C2 target is 3-digit numbers; the diagram shows neither 2- nor 3-digit numbers).

### Class 3 — 31 games (maths 9, biology 6, geography 5, evs 3, physics 2, chemistry 2, computer 4). Coverage ~55% (maths 80%, EVS ~70%, English 0%)
- COVERED — maths: 4-digit numbers/place value/ordering (NumbersGame); addition/subtraction with carry/borrow, shop word problems (AddSubGame); 2-digit multiplication & division facts/inverse (MulDivGame); mental math & estimation (MentalMathGame); lines, tangram, tessellation (ShapesTessellationGame); cm/m + maps-and-length (MapsLengthGame); weight & capacity (WeightCapacityGame); calendar, AM/PM, 24-hour clock (TimeCalendarGame); data — pictographs, tally marks (DataPatternsGame). EVS/science: living vs non-living (LivingEVSGame); plants-parts/germination/types (PlantsGame) + uses/medicinal (PlantUsesGame); birds (BirdsGame); insects & life cycles (InsectsGame); health & mosquitoes (HealthGame); food/shelter/transport/crafts (FoodShelterGame); earth-sky-clean habits (EarthSkyGame); float/sink (FloatSinkGame); sun as energy source (SunEnergyGame); matter states (MatterGame); water & sun (WaterSunGame). Social: globe/equator (GlobeGame), 7 continents/5 oceans (ContinentsGame), directions & compass (DirectionsMapsGame), landforms/rivers-of-India (LandformsGame), natural resources (ResourcesGame). Computer: system/Windows/Word, Internet basics, Paint/files (4 games).
- MISSING — maths: money (NCERT C3 "Rupees and Paise"), early fractions (half/quarter are CBSE C3). EVS: family/work-people-do (only partially via FoodShelter), games-we-play, clothes, sharing/feelings.
- THIN — division stops at division-facts (no remainders/long division before C4 Operations); one geometry shapes game for a year-long strand.
- WRONG-GRADE — LivingThingsGame teaches internal organs + respiratory system + inhale/exhale (NCERT C5+ depth) to 8-year-olds while the actual NCERT C3 chapter set (Poonam's Day, It's Raining...) is covered only thinly; India-rivers/monsoon in LandformsGame is C4-5 social-science material (stretch, not harmful).

### Class 4 — 28 games (maths 7, science 10, geography 4, evs 2, chemistry 2, computer 5). Coverage ~60% (maths 80%, science ~85%, social ~55%, English 0%)
- COVERED — maths: 6-digit numbers, Indian system, Roman numerals (NumbersGame); 4-digit operations & estimation (OperationsGame); factors/multiples/prime/HCF-LCM/divisibility (FactorsMultiplesGame); fractions — types, equivalent, like add/sub (FractionsGame); points/lines/rays, parallel/perpendicular, g/kg/mL/L (LinesMeasurementGame); tangram/tessellation/circle/symmetry/area-perimeter intro (ShapesSymmetryGame); time conversions, elapsed time, pictographs/bar graphs, patterns (TimeDataPatternsGame). Science: adaptations (AdaptationsGame); digestion + excretory (DigestionGame); food components, balanced diet, teeth (FoodTeethGame); photosynthesis/transpiration (PlantsAirGame); skin & nervous system (SkinNervousGame); living/non-living (LivingPlantsGame); light sources, shadows, opaque/transparent (LightGame); force/friction (ForceFrictionGame); physical quantities & instruments (MeasurementGame); states of matter + air composition (MatterAirGame); solutions/solubility (SolutionsFloatGame). Social: continents/oceans (ContinentsOceansGame); rotation/revolution/seasons (EarthMotionsGame); map elements & physical divisions of India (MapsIndiaGame); rivers/monsoon/vegetation/soils of India (IndiaClimateGame); changing houses/communication/transport (ChangesTransportGame). Computer: LOGO/algorithms, memory/units, internet/browser, PowerPoint, Word (5 games).
- MISSING — maths: money (NCERT C4 "Shopping with Fathers"); a dedicated perimeter/area game (only folded into ShapesSymmetryGame). EVS/social: family ("Changing Families"), games/culture, women-at-work (NCERT "Defence Officer Wahida"). Any history or civics content.
- THIN — geometry: one composite game for shapes+symmetry+area+perimeter (4 NCERT strands); data handling lives inside TimeDataPatternsGame.
- WRONG-GRADE — force/friction (NCERT C6 Motion & Measurement/Friction), light/shadows with transparent-translucent-opaque (NCERT C6 "Light, Shadows and Reflections"), air composition + respiration (C6), rotation/revolution/leap-years (C5-6 geo), monsoon/soils-of-India (C5-8 social science) are all taught one-plus year early. Marked [stretch] — accurate but above grade; the true C4 NCERT EVS narrative chapters (Nandu/Amrita/honeybees/journeys) are absent entirely.

### Class 5 — 33 games (maths 9, biology 7, physics 5, computer 5, geography 3, evs 2, chemistry 2). Coverage ~62% (maths 85%, science ~90%, social ~50%, English 0%)
- COVERED — maths: large numbers/place value/rounding (LargeNumbersGame); multiplication tables to 20, 2-digit division, Roman numerals (LargeOperationsGame); factor trees, HCF x LCM, divisibility (FactorsMultiGame); unlike-fraction compare/add/sub/multiply/divide (FractionsAdvancedGame); decimals place value/compare/add/sub/multiply (DecimalsGame); integers on the number line (IntegersGame); percentages + data charts/graphs (PercentageDataGame); angles, 2D/3D symmetry, nets (AnglesSymmetryGame); perimeter/area with unit conversion (AreaPerimeterGame). Science: skeleton/joints (SkeletalGame); circulatory system & blood (CirculatoryGame); plant reproduction — flower structure, pollination, dispersal (PlantReproductionGame); ecosystems/food chains/waste (EcosystemWasteGame); deficiency & lifestyle diseases (HealthDiseasesGame); crops kharif/rabi, adulteration, hygiene (AgricultureHygieneGame); environment & body (EnvironmentBodyGame); physical/chemical changes & air (ChangesAirGame); luminous/shadows/eclipses (LightEclipseGame); sound & noise pollution (SoundNoiseGame); work/energy forms/renewables (WorkEnergyGame); levers & simple machines (SimpleMachinesGame); solutions/suspensions/separation (MixturesSeparationGame); states/interconversion/sublimation (StatesMatterGame). Social: latitudes/longitudes/time zones (LatLongGame); India location/neighbours/climate/vegetation (IndiaLocationGame); environment/disasters/resources (EnvironmentResourcesGame); agriculture/industries/transport/population (EconomyGame). Computer: history/generations, software, email/internet safety + LOGO, PowerPoint/Scratch, advanced Word (5 games).
- MISSING — maths: money (NCERT C5 opens with "The Fish Tale" — money/estimation; no money game exists in ANY class), volume/"How Big? How Heavy?" (cube volume, 3D-space — AnglesSymmetryGame's nets only gesture at it), mapping-your-way scale work in maths. EVS/social: family/community change ("No Place for Us"), heritage ("Walls Tell Stories"), space travel ("Sunita in Space") — the entire NCERT C5 narrative EVS strand; any history/civics.
- THIN — chemistry: 2 games for a year (states + mixtures); evs: 2 games; geometry constructions absent (no ruler-compass work anywhere in junior).
- WRONG-GRADE — integers (NCERT C6), percentages (C7), fraction multiplication/division (C6), decimal multiplication (C6-7), flower sexuality/androecium-gynoecium (C7), levers Class I/II/III (C6+), work=force x displacement concept (C9 formal), solutions/suspensions/colloids (C6), EconomyGame's industries/population/"Economic Growth & Development" (NCERT C8-10 economics — a 10-year-old taught GDP-adjacent content with zero scaffolding). Much of this is beneficial stretch that smooths the C6 handoff (flagged [stretch]) — EconomyGame and PlantReproductionGame are the two genuinely mis-graded ones.

### The advertised-subject check (SUBJECT_META: maths/science/evs/english/social/computer)
- POPULATED for every class — maths (4-9 games), science (as physics+bio+chem buckets merged by the UI; 8-14 games), computer (2-5 games), evs (4-7 games as catch-all). No class x functioning-subject combo is empty.
- EMPTY EVERYWHERE — **english: 0 of 133 games in all 5 classes** (the chip can never render; the "📖 English" subject does not exist). **social: 0 games** — geography games (Globe, Continents, Maps, LatLong, India, Economy) are silently folded into the "EVS" chip by the filename heuristic, so a parent sees "EVS" containing both plants and time-zones, and no social-studies subject at all.
- Internal `subject` fields in the JSONs (maths/physics/biology/chemistry/geography/evs/cs) match neither SUBJECT_META nor each other; the manifest's `subject` key is undefined for all 133 entries and the page re-derives it from filenames ([STUDENT-C15][P3]).
- 29 of 133 games (12 of 28 C4 games; 17 of 33 C5 games — more than half the C5 catalog) have EMPTY cisceNodes mappings — no syllabus-node linkage for e.g. c4_FractionsGame, c5_IntegersGame, c5_LatLongGame.

### Class 5 -> Class 6 bridge assessment
The Class 6 corpus (434 nodes; math opens "Numbers In Our Everyday Life", physics opens "What is science", english u1 opens plot/setting, grammar opens subject/predicate, history starts at ch04 early-cities) assumes: number sense with large numbers + estimation, number-line fluency, fractions-decimals comfort, chart reading, fluent English reading, and some social-science framing.
- BRIDGED WELL (verified game-to-node) — maths: LargeNumbers/rounding -> estimation & supercells; IntegersGame's number line -> C6 number-line work; FractionsAdvanced + Decimals -> C6 fraction/decimal chapters (Atlas C5 is actually AHEAD of NCERT C5 here); PercentageDataGame's charts -> data handling; AreaPerimeter/AnglesSymmetry -> C6 mensuration/basic-geometry. Science: StatesMatter -> C6 chemistry; LightEclipse/WorkEnergy/SimpleMachines -> C6 physics "what is science" and beyond; Circulatory/PlantReproduction -> C6 biology (because they are already C6-7 material). Geography: LatLongGame is literally C6 geography ch2 content a year early.
- BRIDGE BROKEN 1 — **English literacy: zero -> 50 nodes.** No junior game teaches the alphabet, phonics, reading, or grammar; Class 6 opens with 50 english nodes (plot/setting comprehension) + 12 grammar nodes (subject/predicate) and every story/walkthrough in fluent English prose. A child raised entirely on Atlas junior has never read a paragraph on the platform. This is the single largest handoff failure.
- BRIDGE BROKEN 2 — **History/civics: zero -> 56+41 nodes.** Junior has no timeline/ancient-life/family-tree/community content at all; C6 history starts mid-book at ch04 (early cities) with no "what is history" ramp — the platform's own C6 corpus lacks ch01-03 for history and ch01-09 for civics, so the gap starts before the corpus does.
- BRIDGE BROKEN 3 — **Money.** NCERT teaches money every year C1-C5; Atlas teaches it in none. C6 math's everyday-numbers chapter assumes coin/note/price fluency a child never practiced here.
- BRIDGE SOFT — **Reading volume/writing.** Junior challenges are tap/drag MCQs only; no free writing, no sentence construction — C6 grammar expects sentence-level writing. Volume (How Big? How Heavy?) is untaught, but C6 mensuration restarts from perimeter, so impact is low.
- NET: a child finishing Atlas Class 5 is mathematically READY for Class 6 (partly via above-grade stretch) and scientifically well-prepared, but cannot read the Class 6 curriculum's medium of instruction from Atlas alone, has zero history/civics foundations, and never handled money.

### Verdict
Would a child finishing Atlas Classes 1-5 be ready for Atlas Class 6? **Maths and science: yes — unusually so, because the junior games run a year hot. English, social science, and everyday numeracy (money): no.** Top 5 critical gaps for a young learner: (1) no English whatsoever in 133 games — then Class 6 demands reading fluency; (2) the /play catalog itself is not shipped to production (404 -> zero games render; [STUDENT-C15][P1]); (3) the family/myself/festivals/clothes EVS strand and all history/civics foundations are absent before Class 6 assumes them; (4) the money strand is missing in all five classes; (5) wrong-grade visuals (crores/lakhs charts in Class 1 counting slides) plus mis-graded outliers (EconomyGame, PlantReproductionGame). Coverage bands: C1 ~45%, C2 ~50%, C3 ~55%, C4 ~60%, C5 ~62% of the real CBSE/NCERT junior syllabus.

---

## Class 6

### Corpus studied (nodes / chapters)
Mathematics 123/12 · Physics 52/7 · English 50/5 · History 56/9 · Civics 41/7 · Geography 31/5 · Economics 24/4 · Biology 23/3 · Chemistry 20/2 · Grammar 12/4 · Computer 2/1. = **434 nodes, 11 subject codes, 59 chapters; all 59 chapters swept (teach/enrichment/questions/doubts), 434/434 enrichment records, diagnostics probed in all 11 subjects, practice round-trips in all 11 subjects, full story walks in 8 subjects (browser), chapter-test run on math, real-login browser passes on diagnostic/practice/chapter-test pages.** Micro-quality is strong: 434/434 nodes carry eli5 + walkthrough + examples + 10-11 diagnostic questions + misconception + definition + on_failure; the gaps are assessment, tutor, and content-to-grade mapping.

### What works (verified, for contrast)
- Stories: 6-7-scene interactive narratives with commit-first checks, XP + mastery-movement finish screen — completed end-to-end in mathematics (ch01, ch07), physics (ch12), chemistry (ch05), english (u1), grammar (ch80), economics (ch11); the story doubt panel exists on every scene. (Bio/hist/geo/civics walks are fine when backends are stable — the "Story unavailable" dead-end they hit in one pass is the flake bug below.)
- Practice: start (201) → submit (graded: exact-match fill-blank + MCQ) → end → summary all 200 in every subject; mastery engine (BKT/IRT/SM2) updates per topic with next_review scheduling.
- Math chapter tests: 12/12 chapters testReady with real banks (60-310 questions each); API start→20q→answer→finish 200 with score.
- Tutor teach lane: `/api/tutor-graph/teach` 200 on all 59 chapters with diagnostic question.

### BROKEN (flows a Class 6 child hits)
- BROKEN — **Diagnostics cannot complete in ANY subject (same plan-mismatch defect C7/C8/C11/C12 found):** `/api/diagnostics/start` serves questions as a list but the server grades against a hidden rotated plan (`currentQuestionIndex` starts at 3-4; expected sequence re-asks answered items) — answering in served order rejects 1-4 of 5 answers per subject with 400 "Question mismatch. Expected generator:…PlaceValueGenerator_0, got corpus:a1d6f31d…" (11/11 subjects); batch `/submit` in served order is always 400 → result/misconceptions/remediation unreachable; `/api/diagnostics/history` stays EMPTY (totalCount 0) after 15+ attempts. One affected session can never be finished (the server permanently expects an already-answered question).
- BROKEN — **The diagnostic UI hides the failure with fake local results:** app/(student)/diagnostic/page.tsx (~line 1690 "Fallback: local computation") computes a mastery % client-side when the server submit fails — the child sees results that never reached the server (verified live with a real Class 6 login; server history still empty). No weakness profile is ever produced.
- BROKEN — **Diagnostic chapter picker is Class 10-12 for every grade:** SUBJECT_CHAPTERS (diagnostic/page.tsx:29) offers a Class 6 child "Algebra, Geometry, Trigonometry, Calculus" for math, "Nationalism, Industrialisation, Freedom Struggle" for history, "Development, Sectors, Money & Credit" for economics, "Life Processes, Cell, Heredity" for biology.
- BROKEN — **Computer diagnostic serves the grammar question set verbatim:** identical question ids (ch2_mcq_2917, ch3_mcq_8954, ch2_mcq_8165, ch2_mcq_7271, ch1_mcq_9445) in both the grammar and computer diagnostics — a child taking "Computer" is tested on English grammar.
- BROKEN — **Open-ended diagnostic grading accepts junk:** selectedOptionId="OPEN_ENDED" (literal) on "A juice mix is made with 2 parts orange to 5 parts water…" graded isCorrect=true; and open-ended answers can never pass `/submit` validation (selectedOptionId is a required string) — any diagnostic containing one is unsubmittable server-side.
- BROKEN — **Tutor doubts misroute across class and subject:** "What is symmetry?" (c6 physics) answered with Class 11 PSYCHOLOGY node c11_psy_cbse_04_008 ("Perceptual organisation") plus its story link; "photosynthesis" (c6 bio) answered with Class 10 c10_bio_cbse_01_002; c6 grammar answered with Class 11 trigonometric identities; a c6 math node question answered with English "Writing Skills based on Why the Novel Matters" (tutor_check.json, story_results.json).
- BROKEN — **~40% of doubt asks return 200 with an EMPTY answer** (no text, no node): integers, early-humans, noun/verb probes in tutor_check.json; replies also leak internal scaffolding strings "[object Object]" into student-visible text.
- BROKEN — **Chapter-test UI shows Class 10 chapters to a Class 6 student:** chapter-test/page.tsx:133 `useState(myClass)` initializes the class selector before auth hydration and never syncs — a real logged-in Class 6 child sees "Chapter 1 · The Fundamental Theorem of Arithmetic", "Chapter 2 · The Zeros Of A Polynomial P(X)", "Chapter 3 · A Pair Of Linear Equations In Two Variables", "Chapter 4 · A Quadratic Equation" (verified in walkF with user.class_level=6; the API with class_level=6 correctly returns 12 Class 6 chapters).
- BROKEN — **Story "Story unavailable" dead-end on backend reloads:** StoryMode treats any non-OK enrichment as fatal (no retry) — 4 of 8 story walks hit the dead-end card while dev-driven backend-1 reloads churned; all four stories load normally (7 scenes) when backends are stable and their enrichment is 200 at rest.

### MISSING
- MISSING — **Chapter tests for every subject except mathematics:** `/api/chapter-tests/chapters?class_level=6` → science 0, social_science 0, english 0, physics 0, chemistry 0, biology 0, history 0, geography 0, civics 0, economics 0 chapters; `grammar` and `computer` return 400 "Unknown subject". 419 of 434 taught nodes have no chapter-level assessment.
- MISSING — **Computer Science as a subject:** 2 nodes total and both are English-composition topics ("A paragraph", "An informal letter to a friend or relative…" c6_comp_cbse_85_001/002). The tab exists; the subject does not.
- MISSING — **Hindi/Sanskrit:** no c6 hindi/sanskrit nodes at all (same as every class) yet the diagnostic UI advertises Hindi "Class 6 – 12".
- MISSING — **Civics and Grammar unreachable from Learn navigation** (no subject tab), same defect C7 found for class 7: 41 + 12 taught nodes a child cannot browse to.

### THIN / WRONG-GRADE
- THIN — **Economics is not Class 6 content:** 24 nodes (Infrastructure, Banks/Interest, Barter-to-Money, Markets/Supply/Consumer awareness) are NCERT Class 10-11 economics (Money & Credit, Consumer Awareness, Indian Economic Development) — a Class 6 child is taught the wrong grade outright.
- THIN — **Biology is Class 7-8 content:** ch06 "Adolescence" (physical changes, reproductive maturity, hormones) is the NCERT Class 8 topic; ch09 (digestion/respiration/circulation) and ch10 (plant reproduction) are Class 7 depth; actual Class 6 science themes (components of food, fibre to fabric, sorting materials, water) are absent as such.
- THIN — **Civics is Class 8-9 content:** dominated by Fundamental Rights/Duties (Right to Equality, Right against Exploitation…) instead of Class 6 civics (diversity, family/community, rural local government).
- THIN — **Grammar: 12 nodes for a school year** (sentences, noun families, 3 tense nodes, a/an, prepositions, conjunctions) — no punctuation, adjectives/adverbs, voice, reported speech, or vocabulary strand; also degenerate practice (1 question served of 5 requested).
- THIN — **Chemistry covers a year in 2 chapters** (20 nodes); computer in 1; economics 4 — vs mathematics' 12 chapters/123 nodes. Depth is wildly uneven across subjects.
- THIN — **Practice pools degenerate outside math:** requesting 5 questions serves geography 1, english 1, grammar 1, civics 2, computer 2 (mathematics 4-5) — mirrors the C8 pool-floor defect.
- THIN — **Physics entry nodes are filler:** first nodes titled just "Science", "The scientific method", "Scientific temper" — generic rather than NCERT Class 6 physics.
- THIN — **Chapter-test titles are auto-fragment node titles:** "Chapter 3 · A Fraction", "Chapter 5 · A Variable", "Chapter 7 · A Point", "Chapter 12 · A Number Pattern" — article-led fragments, not NCERT chapter names (Fractions, Algebra, Basic Geometrical Ideas, Patterns).

### PREREQ-GAP
- PREREQ-GAP — **No readiness signal into Class 7:** diagnostics never complete/record (above), so the platform cannot tell whether a child is ready for Class 7 integers/fractions/algebra; the only working assessment (math chapter tests) covers one subject out of eleven.
- PREREQ-GAP — **Off-grade teaching builds wrong foundations:** a child who "finishes" Atlas Class 6 economics/biology/civics has actually studied Class 8/10/11 topics and missed the Class 6 NCERT strands those subjects assume.

### Verdict

Would a child finishing Atlas Class 6 excel in Class 7? **Not on the current platform.** The daily reading loop is genuinely strong — 434/434 complete story-backed nodes with ELI5, walkthroughs, worked examples, misconceptions and quick-checks — and math practice + math chapter tests are real. But Atlas cannot assess (diagnostics dead and silently faked; chapter tests math-only), cannot answer doubts reliably (misrouted across classes, ~40% empty), teaches the wrong grade outright in three subjects (economics/biology/civics), and effectively lacks Computer Science, Hindi, and a navigable grammar curriculum. Priority order: (1) diagnostic plan-mismatch + fake-local-results fix, (2) tutor doubt routing for junior classes, (3) chapter-test banks for the 10 untested subjects + the class-default UI bug, (4) right-grade content decision for economics/biology/civics, (5) grammar/computer corpus build-out or honest tab removal.

---

## Class 7

Platform state verified first: 586 c7 nodes across maths 153 / physics 72 / history 86 / english 75 / geography 54 / economics 42 / biology 36 / civics 33 / chemistry 24 / grammar 9 / writing 2. All 586 nodes pass the content contract (detail 200 with definition+walkthrough+misconception+on_failure; enrichment 200 with eli5+examples+>=1 diagnostic question; >=1 practice-bank question; tutor-graph/teach 200). The gaps below are what a Class 7 child actually hits while using it.

### BROKEN (flows that fail in normal student use)

- BROKEN — Diagnostics cannot complete in ANY Class 7 subject: answering a served question is rejected with 400 "Question mismatch. Expected corpus:0dee8bbd-..., got corpus:bb07563a-..." (math), "Expected RHYME_NUM_8367, got corpus:6aa2e65d-..." (english) — the adaptive plan served to the student and the plan the server checks answers against diverge; session stuck at 2/5 or 4/5, submit returns 400 "Diagnostic incomplete", result/remediation/misconceptions unreachable; reproduced 4x across math/english/science/social_science (evidence diag_debug.json, diag_rest.json; backend log AttributeError "plan exhausted" at backend/api/diagnostics.py:265 via diagnostic_service.py:1202 _irt_select).
- BROKEN — Science/English/Social-science diagnostics 500 on the final question even when earlier answers are accepted: HTTP 500 empty body, traceback AttributeError("plan exhausted") from selector.get_next_question (dream-backend-1/2 logs, 2026-09-20 ~21:05) — child can never finish a science/english/SST diagnostic, so the misconception-remediation engine is dead for 3 of 4 subject groups.
- BROKEN — Chapter tests exist for only a fraction of the taught syllabus: physics 0 of its chapters (GET /api/chapter-tests/chapters?subject=physics&class_level=7 returns {"chapters":[]} while the UI lists Physics as a test subject — empty picker); science 3 chapters (Metals/Life Processes/Growth of a Plant) vs 12 "Curiosity" chapters taught — Light, Electricity, Heat Transfer, Time-and-Motion, Adolescence, Earth-Moon-Sun all untestable; english 5 vs 15 taught (all poetry chapters ch11-15 untestable); social_science 8 vs 44 discipline-chapters (hist 11 + geo 11 + civ 11 + eco 11); biology 3/12, chemistry 2/12, geography 5/11, history 8/11, civics 3/11, economics 4/11 (evidence ct_chapters_all.json; out-of-range starts all return 503 "Not enough questions for this chapter yet — 0 available").
- BROKEN — Learn -> Chapter Test deep link opens the wrong subject for most tabs: /learn passes subject key chem/bio/maths/geo/eco/cs/hindi to /chapter-test, whose accepted keys are chemistry/biology/mathematics/geography/economics/... — unmatched keys silently fall back to Mathematics (app/(student)/chapter-test/page.tsx line ~167 `SUBJECTS.some(s => s.key === qSub)`); a child finishing a Geography lesson who clicks chapter-test gets a MATH test preselected (only physics/english/history keys match).
- BROKEN — Intermittent "no enhanced node" 404s on content that exists: GET /api/content/nodes/c7_phys_ch011_001/enrichment returned 200 (19:55 sweep), then 404 x20 consecutively (21:20), then 200 again in a sequential sweep (21:35) — worker-level content-cache divergence; StoryMode treats non-OK enrichment as fatal loadError (components/story/StoryMode.tsx:501), so a child opening that story sees an error screen until a lucky retry; tutor sessions on the same node 404 "Enrichment content for node not found" in the same window.
- BROKEN — Backend sheds load under one student's normal browsing: 4 parallel GET /api/content/nodes/{id}/enrichment produced 137 of 586 (23%) HTTP 503s; all 137 return 200 when requested sequentially — a Class 7 dashboard/story tab-storm breaks pages that work one-at-a-time (enrich_rescan.json + sequential retest all-200).

### MISSING (syllabus that does not exist)

- MISSING — Hindi (core CBSE Class 7 second language): learn tab exists but GET /api/content/enrichment?subject=hindi&class_level=7 returns 0 nodes; practice start 503 "No questions available for this subject/topic combination"; zero c7_hin_* nodes in catalog — a CBSE Class 7 report card without Hindi.
- MISSING — Sanskrit (CBSE Class 7 third language option): no nodes, no subject, no UI trace anywhere.
- MISSING — Computer Science content behind an empty tab: learn page ships a "Computer Science" tab (key cs) that returns 0 nodes for class 7; the only writing/IT-adjacent content (2 nodes c7_comp_ch085_*) is not linked to any tab.
- MISSING — Civics and Grammar are taught (33 + 9 nodes) but unreachable in the Learn UI: the subject tab list (app/(student)/learn/page.tsx SUBJECTS) has no civics and no grammar entry; a Class 7 child cannot navigate to Constitution/Parliament lessons or the grammar chapters from Learn at all.

### THIN (exists but would not prepare a child for Class 8)

- THIN — Grammar: 3 chapters / 9 nodes total (clauses, tense perfect/continuous, modifiers/determiners/conjunctions) — no voice, reported speech, modals, prepositions, punctuation, letter/essay formats as standalone teaching; 1 question per practice session (prac_depth.json grammar: served 1).
- THIN — Writing/composition: 2 nodes only (informal letter, school notice) for a full composition strand; no formal letter, essay, story-writing, dialogue or summary teaching.
- THIN — Practice pools for non-math subjects: requesting 20 questions serves science 2, social_science 1, physics 1, english 7, grammar 1, computer 1 (mathematics 11) — a 10-question practice in Science serves 1-2 items then ends (prac_depth.json).
- THIN — Chemistry depth: 24 nodes across 12 chapters = 2 concepts per chapter (e.g. "Rusting" and "Thermal conduction" as a chapter's entire teaching); same pattern civics 3/chapter, economics 4/chapter.
- THIN — Math chapter 11 "Common Factors Of Two Numbers": 4 nodes vs 15 per earlier chapter — final chapter is a stub next to ch01-ch10's 14-15 each.
- THIN — English chapter tests: only 5 of 15 chapters testable, so 10 taught chapters (incl. all poetry chapters 11-15: rhyme, imagery, metaphor/simile, poem analysis) have no chapter-test path.
- THIN — Diagnostic question delivery: node enrichment carries >=1 diagnostic question per node (verified 586/586) but the diagnostic SESSION engine cannot serve its own plan consistently (see BROKEN above), so depth of question bank is unverifiable in-session.

### PREREQ-GAP

- PREREQ-GAP — Math test catalog ch12-ch15 ("Decimals", "A Statistical Question", auto-titled "Geometric constructions...", "An Equation") have chapter tests but NO Class 7 learn nodes exist beyond ch011 — either 4 chapters are testable-but-never-taught, or the test taxonomy and the learn taxonomy have diverged; the child sees test chapters that do not exist in their lessons (ct_chapters_all.json math list vs list_math.json node ids).
- PREREQ-GAP — Three conflicting chapter taxonomies for the same content: physics c7 has 11 chapters in the node catalog (c7_phys_ch001-ch011), 7 chapters in the learn enrichment store, and 0 in the chapter-test catalog; a child cannot form a stable mental map of "what are my chapters" per subject.

### Product-defect adjacents (full details in BUGS.md as [STUDENT-C7])

- Learn page class selector defaults to Class 10 for every user including Class 7 students (useState(10), never reads user class_level) — a Class 7 child lands on Class 10 physics unless they notice the selector.
- Chapter-test chapter titles are auto-generated node-definition fragments: "Chapter 1 · Story setting encompasses the physical location", "Chapter 14 · Geometric constructions involve drawing precise figures", "Chapter 4 · Hist · Ch 04" (title literally missing).
- Tutor doubt replies leak internal scaffolding to students: "--- MISCONCEPTION TM_001 --- ... NODE: , , , , , ," rendered in the reply body; hint endpoint text is teacher-directed ("Direct the student to draw...", "have the student trace...") but is shown to the child.
- GET /api/practice/review/{student_id} takes 155.5s to return an empty review queue (timed 2026-09-20) — any UI calling it hangs for 2.5 minutes.

### Verdict

Would a child finishing Atlas Class 7 excel in Class 8? Not on the current platform. The per-node teaching content (story/read path) is genuinely complete and strong for the four core subject groups — 586/586 nodes carry definition, walkthrough, ELI5, worked examples, misconception, on-failure guidance and quick-check questions. But the assessment layer that should prove mastery is broken (diagnostics) or missing for most chapters (chapter tests), practice is a math-only experience in practice, an entire CBSE subject (Hindi) is absent, and navigation bugs hide Civics/Grammar and mislead subject selection. Priority order: fix the diagnostic plan mismatch, fill chapter-test coverage, ship Hindi or remove the tab, fix the learn/chapter-test subject-key and class-default bugs.

---

## Class 8

### Corpus studied (nodes / chapters, first topic of every subject story-walked)
Mathematics 155/23 CT chapters · Physics 100/0 CT chapters · English 85 (+9 grammar)/10 · History 56/10 · Civics 46/10 · Economics 36/6 · Biology 24/4 · Chemistry 24/4 · Geography 24/4 · Grammar 9/0 · Computer Science 2/0 · **Hindi 0**. = **561 nodes, 11 subject codes + Hindi; 12-question diagnostic scans on 9 subjects, 3x6-question practice depth probes on 9 subjects, 15-question chapter tests finished+graded on 9 subjects, full story walks on 11 subjects, tutor doubts on 11 subjects.** Corpus micro-quality is good: 561/561 nodes carry definition, walkthrough, ELI5, worked examples (1 exception) and ≥6 diagnostic Q&A pairs; the gaps are coverage- and product-level.

### What works (verified, for contrast)
- Story layer: all 11 subjects' first topics walk end-to-end (6-7 scenes: Idea → Worked Examples → Watch out → Quick Check → finish) with XP/mastery screen; Quick Check commit-cards render well (c8_math_ch1_1: "Why 5² ≠ 2×5" with area model).
- Chapter tests (where the catalog has chapters): start/answer/finish/result all 200 on 9 subjects; per-node breakdown with `storyUrl` deep links for weak nodes verified (math ch1: 12-node breakdown, 15/15 review items).
- Practice UI (mathematics): session start, submit, instant feedback, auto-advance all work in a real browser.
- Board-question bank attached to class 8: 10,597 questions (math 2,986 / physics 1,938 / engl 1,617 / hist 1,022 / civ 874 / eco 656 / chem 471 / bio 469 / geo 437).

### Gaps

- MISSING — **Hindi subject, end to end:** 0 teaching nodes (`/api/nodes/by-class-subject?class=8&subject=hind` → 404 "no teaching nodes"), diagnostic start → 503 "Question bank returned no questions", practice → 503 "No questions available", 0 rows in board_questions, no chapter-test catalog — yet the diagnostic UI advertises Hindi "Class 6 – 12" with chapters व्याकरण/गद्य/पद्य/लेखन that start into an error. A core CBSE subject simply does not exist for class 8.
- MISSING — **Computer Science as a subject:** 2 nodes total (both missing required CHAIN_DESCRIPTION), /learn shows "Computer Science 0 topics" (nodes unreachable from the UI), practice pool ~4 unique questions led by gibberish ("The logistics checklist inside the warmth: What (birthday dinner), Whe…"), chapter-tests → 400, board questions 21.
- MISSING — **Physics chapter tests:** `/api/chapter-tests/chapters?subject=physics&class_level=8` → 200 with `{"chapters":[]}` while chemistry/biology have 4 and science 6; the /chapter-test UI still offers Physics — empty picker. 100 taught physics nodes with zero chapter-level assessment.
- BROKEN — **Diagnostics cannot complete in ANY subject (same plan-mismatch defect C7/C11/C12 found):** the served question order and the graded plan diverge → answer 400 "Question mismatch. Expected RHYME_MCQ_Rhyme and Sound Play_9840, got corpus:07e93adb-…" from Q2 onward; submit → 400 "Diagnostic incomplete: 2/12"; result/remediation → 400. UI-verified twice (Mathematics: 9 of 12 answer calls 400; English same pattern then auth death): the "results" screen the child sees is a frontend-local fallback computing 0% / "0 of 11 correct" for every subject. No weakness profile or remediation is ever produced for a class 8 child.
- BROKEN — **Class 8 Mathematics diagnostic content is off-grade in both directions:** of 12 served questions ~5 are Class 11-level (equivalence relations with literal unrendered `A = {nums}` placeholder — 3 PLACEHOLDER questions, one with duplicated options), ~3 are Class 5-6 level (place value, tally marks, Indian-system conversion), 1 is MCQ-shaped with zero options. Diagnostic "chapters" offered for class 8 math: Algebra, Geometry, **Trigonometry, Calculus** — neither trigonometry nor calculus is CBSE Class 8.
- BROKEN — **Tutor doubts refuse or misroute for Class 8:** plain conceptual questions return raw JSON refusals `{"verified": false, "label": "GUIDED_PRACTICE", "refusal_reason": "Needs variable binding (Lane C)…"}` for History ("Why did the Battle of Plassey happen in 1757?"), Geography, Economics, and Hindi (refused in English); the vaccine question is answered with Red Biotechnology content; civ "universal adult franchise" answered with women's-representation content; the Story doubt panel returns LIPIDS content for both c8_civ_ch1_1 (Universal Adult Franchise) and c8_eco_ch1_1 (The Production Process), and "work simplification" (home-science) for geo "A Resource". One wrong cached answer served across multiple subjects.
- BROKEN — **30-minute access token expires mid-study with no silent refresh:** English UI diagnostic recorded answers 1-7, then Q8+ all 401 with submit/result/remediation 401 — session dead mid-quiz. Any Class 8 session over 30 minutes (diagnostic + practice, or a long story chain) fails for a child who cannot re-login mid-flow.
- BROKEN — **Grammar nodes are orphaned and mislabelled:** all 9 class-8 gram nodes missing required CHAIN_DESCRIPTION; c8_gram_cbse_81_001 (passive voice) has no worked example; no Grammar tab on /learn so the nodes are unreachable by browsing; the story header renders "Science · Class 8" over the English-grammar topic c8_gram_cbse_80_001 (tense system).
- BROKEN — **Practice pools near-empty for half the subjects:** chemistry serves the SAME single question every session (3 sessions: 1/1/1 questions); grammar 4/2/1; computer 2/1/1; economics 4/3/6 — "5 questions • Adaptive difficulty" is impossible; a chem child re-answers one question forever.
- BROKEN — **Chapter-test chapter titles are topic fragments or empty:** chemistry class 8 lists "Chapter 2" (no title at all), mathematics "Chapter 1 · A Square Number" (topic title, not NCERT "Squares and Square Roots"), history "Chapter 1 · The Turkic and Afghan invasions" — a child cannot tell which NCERT chapter they are testing.
- THIN — **English corpus optional sections:** 73 of 85 engl nodes have empty CROSS_SUBJECT sections (86%); same pattern chem 16/24, bio 15/24, eco 10/36, math 29/155.
- THIN — **Social Science depth vs NCERT:** geography carries 24 nodes / 4 testable chapters for Resources-and-Development; civics 46 nodes / 10 chapters ≈ 4-5 concepts per chapter — the three Class 8 SST books are covered at roughly one-third the per-chapter density of mathematics (155 nodes / 16 NCERT chapters).
- THIN — **board_questions lopsided:** geo 437 / bio 469 / chem 471 vs math 2,986 — geography/biology/chemistry draw from a ~7x smaller bank.
- THIN — **Study tools are class-agnostic:** `/api/content/class-content` returns identical generic decks for class 8 and class 10 (same item IDs, `target_class:[1..12]`); no Class 8-specific flashcards/formula bank/glossary (no square-root table, algebraic identities, or force-pressure formula cards a Class 9-bound child needs).
- THIN — **Computer Science diagnostic bank:** 9 questions for a class-8 CS diagnostic vs 12 everywhere else — the bank depletes inside one scan.
- PREREQ-GAP — **No reliable readiness signal for Class 9:** diagnostics never complete (above) and the math diagnostic samples Class 5-6 and Class 11 material instead of Class 8 scope, so Atlas cannot tell whether a child is ready for Class 9 algebra/geometry.
- PREREQ-GAP — **Hindi continuity broken:** a CBSE child carries Hindi into Class 9; Atlas class 8 has zero Hindi content (above), so Atlas contributes nothing to the second language.
- PREREQ-GAP — **No bridge to Class 9:** exam-prep explicitly serves "classes 10 and 12" only; there is no Class 9 readiness track or syllabus map at the class-8 exit point.
- PREREQ-GAP — **Physics is taught (100 nodes) but never tested** (0 chapter tests), leaving the weakest-assessed science exactly where Class 9 physics begins (motion, force, pressure build directly on class 8).

### Verdict

Would a child finishing Atlas Class 8 excel in Class 9? **Not on the current platform.** The daily reading loop is real — 561 complete story-backed nodes, working graded practice in the big subjects, and chapter tests with per-node story links in 9 subject catalogs. But the platform cannot assess (diagnostics dead platform-wide, physics untestable), cannot answer doubts in four subjects (tutor refusals/misroutes), is missing an entire core subject (Hindi) and effectively a second one (Computer Science: 2 orphan nodes), and practice degenerates to one repeated question in chemistry. Priority order: (1) diagnostic plan-mismatch fix (same root cause as C7/C11/C12), (2) tutor doubt routing, (3) Hindi + CS corpus decision or honest tab removal, (4) physics chapter-test bank, (5) token refresh.

---

## Class 9

### Corpus studied (nodes / chapters, every node's enrichment pulled, key flows executed)
Mathematics 84/8 ch · Physics 64/6 ch · Biology 45/4 ch · English 80/8 ch (+Grammar 7, Computer 3) · History 33/3 ch · Chemistry 31/3 ch · Geography 23/2 ch · Civics 23/2 ch · Economics 23/2 ch · **Hindi 0**. = **416 nodes, 11 subject codes + Hindi; 416/416 enrichment records fetched and field-audited, 12 diagnostic subjects started API-side + exact-UI-sequence replays, 14 practice slugs round-tripped + 3x10 pool-depth probes on 5 subjects, chapter-test catalogs pulled for 11 subjects and 13 tests started→answered→finished, browser story walks (bio/hist 6 scenes each; cold-load checks on 12 nodes), 10 tutor doubt asks, real-login browser passes on dashboard/learn/topic/story/chapter-test/practice/tutor/diagnostic/exam-prep.** Raw evidence: D:\platform\student_c9\ (stage1_signup.js/inventory, stage2_catalog.json, stage2b_node_map.json 416 nodes, stage2c_learn.json + stage2c_enrichment_full.json 416/416, stage5a_ct_catalog.json 11 subjects, stage3457_functional.json + stage345_fix.json, stage68_browser.json + stage6b/stage6c + shots/).

### What works (verified, for contrast)
- Story data layer is complete: 416/416 nodes serve definition + walkthrough + eli5 + worked examples + common misconception + diagnostic Q&A + on_failure; browser walk of c9_bio_ch1_1 and c9_hist_ch1_4 rendered 6 scenes each (hook → big idea → 2 worked examples → trap → finish) with the doubt panel.
- Chapter tests where the catalog exists: start → answer → finish all 200 on 12 chapters across mathematics/science/chemistry/biology/history/geography/civics/economics/english; typed answers graded honestly (all-"B" spam → 0%), per-node breakdown with weak-node Story links and model expected-answers in review.
- Practice: start/submit/end 200 in every subject; UI session renders fill-blank questions with instant feedback and auto-advance.
- Tutor text lane answered class-appropriately for math, bio, english, geo, civ (e.g. verified contradiction proof for irrational sums, Golgi apparatus); the tutor UI ask on a chemistry doubt returned a correct Tyndall-effect explanation in a real browser.
- The corpus quietly pre-teaches some Class 10 math (distance/section formula, pair-of-linear-equations, AP) — useful for boards, though it displaces actual Class 9 chapters (see below).

### Gaps

- MISSING — **Hindi, end to end (compulsory Class 10 board subject):** 0 teaching nodes (`/api/nodes/by-class-subject?class=9&subject=hin|hindi` → 404), diagnostic → 503 "Question bank returned no questions", practice → 503, no board_questions rows, yet the /learn "Hindi" tab is shown to a Class 9 child and renders "0 topics available" (verified in browser, s8_learn_hindi_c9.png). fixed_hin_c9.json exists in pipeline outputs but was never deployed. Cross-validates C8/C10 — the whole 6-10 Hindi ladder is absent.
- MISSING — **Half of NCERT Class 9 Mathematics:** the corpus has 8 chapters (coordinate geometry incl. Class 10 formulas, linear equations, number systems, identities/factorisation, circles, areas/Heron, probability, sequences incl. GP) but zero nodes for **Triangles (congruence), Quadrilaterals (parallelogram theorems), Lines and Angles, Euclid's geometry, Statistics, and Surface Areas & Volumes** (full title list in stage2b_node_map.json; probe hits for congruen/quadrilater/statistic/surface-area/volume/cylinder/cone are only incidental mentions like "congruent circles" and "cyclic quadrilateral").
- MISSING — **Gravitation (NCERT Class 9 physics):** zero gravitation/free-fall/weight nodes in c9 physics (all 64 titles enumerated) AND zero in c10 physics per the C10 audit — a core boards numerical topic taught nowhere on the ladder.
- MISSING — **Chemistry "Matter in Our Surroundings" (NCERT ch1) and Biology "Improvement in Food Resources" (NCERT ch12):** c9 chem starts at "A mixture" (no states-of-matter/evaporation nodes); bio probes (crop/food-resources) all NONE — foundations Class 10 chemistry/biology build on.
- MISSING — **NCERT Class 9 Social Science is a different subject here:** History teaches ancient India (Early Humans, Harappan, Vedic, Mauryan, Gupta, Chola — Class 6-7 content) instead of French Revolution/Socialism/Nazism (the French Revolution is re-taught from scratch in Atlas Class 10); Geography teaches physical geography (plate tectonics, volcanoes, atmosphere) instead of India-focused NCERT (India-Size & Location, Physical Features, Drainage, Natural Vegetation, Population); Economics teaches Class 11-12 micro (scarcity, demand/supply curves, market equilibrium, monopoly) instead of Village Palampur, People as Resource, Poverty, Food Security; Civics covers ~2 of 5 NCERT chapters (Democracy, Elections; Constitutional Design/Institutions/Democratic Rights reduced to single nodes or absent). None of the missing chapters exist in the Class 10 corpus either (probes palampur/people-as-resource/drainage/natural-vegetation/population/constitutional-design/democratic-rights → 0 hits c9+c10).
- MISSING — **Current-syllabus Class 9 English (Beehive + Moments):** zero hits for all 11 Beehive prose/poems and all Moments titles across the 80 c9 english nodes — the corpus teaches retired Literature-Reader-era texts ("How I Taught My Grandmother to Read", "The Pot Maker", "Vitamin-M", "Twin Melodies"...). Class 10 Beehive is correctly present (C10 audit), so the two-year text/skill ladder is missing its first rung. Writing skills and grammar ride on just 7 grammar nodes.
- THIN — **Practice pools degenerate to a handful of questions:** 3 consecutive 10-question sessions yield 5 unique questions for bio, 4 for engl, 7 for math, 16 for english, 0 for hindi (stage345_fix.json); sessions also serve fewer than requested (bio 1, engl 2 when 6 asked) — "adaptive" practice is the same 4-7 items on rotation.
- THIN — **Zero objective/MCQ questions in Class 9 chapter tests:** served tests are 100% typed (short_answer/long_answer/fill_blank/true_false with options=[] on every question) — the Class 10 board's 20-mark MCQ/competency section is never rehearsed; true_false items ship without True/False options.
- THIN — **Computer Applications = 3 nodes**, and the /learn CS tab shows "0 topics" for class 9 (nodes unreachable from the UI); grammar = 7 nodes for the full boards grammar set.
- BROKEN — **Physics chapter tests unreachable — subject-code split:** board_questions stores Class 9 physics under subject `physics` (1,272 questions, 12 chapters, verified in Postgres) while `_SUBJECT_CODES` maps physics→`phy` (deploy/backend/api/chapter_tests.py:53) — catalog returns 200 with empty chapters, start → 503 "0 available", UI shows "No question bank chapters available for this subject and class yet" (s8_ct_physics_c9_loaded.png); the combined "science" catalog also loses all physics chapters (Motion/Force/Work/Sound absent from Class 9 science tests).
- BROKEN — **Every chapter-test catalog lists each chapter TWICE:** two ingestion pipelines filed the same chapters as ch1..ch8 (node-derived: 147-172q, titled) and ch01..ch08 (practice-derived: 25-51q, untitled) — the Class 9 math picker shows "Chapter 1 · The Cartesian Coordinate System (159q)" AND "Chapter 1 (41q)": 16 cards for 8 real chapters (stage5a_ct_catalog.json, browser-confirmed).
- BROKEN — **Combined "Science" tests mix biology and chemistry under one chapter number:** "Chapter 1 · The Discovery Of The Cell" = 352q = bio cell (182) + chem mixtures (170) merged by same chapter code; Science ch2 "Subatomic Particles" = 325q = chem (155) + bio tissues (170) — a child gets a cross-subject quiz labelled as one chapter.
- BROKEN — **Diagnostics can never complete server-side for Class 9:** answering the served questions always 500s on the last one (`AttributeError: plan exhausted`, deploy/backend/api/diagnostics.py:265 via diagnostic_service._irt_select; all 9 subjects stop at 4/5), and the exact UI sequence (post 4 answers, batch-submit all 5) also 500s — result/misconceptions/remediation unreachable; submit honestly refuses "Diagnostic incomplete: 4/5" so no session can ever close. Same defect family as C6/C7/C8, here reproduced end-to-end with the UI's own call pattern.
- BROKEN — **The diagnostic UI masks the failure with a client-side fake + an off-grade bank:** app/(student)/diagnostic/page.tsx catches the failed submit and computes "mastery" locally from a hardcoded QUESTION_BANK whose chapter chips are Algebra/Geometry/**Trigonometry/Calculus** for a Class 9 child (chapters_math, line 93), with correctAnswer shipped in the JS bundle; the English plan additionally mixes a Class 7 bank (400 "Question mismatch. Expected ENG7_001, got corpus:42c40c7c…").
- BROKEN — **Chapter-test picker flashes the WRONG CLASS catalog (Class 10 papers reachable from a Class 9 screen):** on hard load the page mounts before auth rehydration, `myClass` falls back to 10, fetches and RENDERS class_level=10 chapters first (network-logged: GET class_level=10, then class_level=9 seconds later; screenshot captured Class 10 chapters "The Fundamental Theorem of Arithmetic / A Quadratic Equation / The Line Of Sight" under ?class=9) — a child clicking during the race starts a Class 10 test; the deep-link ?class=9 does not win the race.
- BROKEN — **Story dead-end on first view of cold nodes:** StoryMode treats a failed enrichment fetch as fatal ("Story unavailable. We couldn't load the lesson…") — 2 of 12 first-view browser loads failed (c9_math_ch1_11, c9_physics_ch4_11) and then loaded fine on retry; server-side, 49/416 nodes 503 on cold concurrent fetch (6 parallel), 0 after warm — a classroom opening the same new chapter simultaneously hits this.
- BROKEN — **Tutor doubts: empty answers and a dead realtime socket:** API asks return 200 with an EMPTY answer for chemistry (43.8s), economics (34.6s) and Hindi (1.4s) (stage3457_functional.json); doubts about NCERT-9 topics the corpus lacks get mis-answered from unrelated nodes (French Revolution doubt → "social change classified by pace"; Himalayan vs peninsular rivers → generic physiography); the tutor ITS WebSocket ws://…/api/tutor/its/ws fails the handshake (ERR_INVALID_HTTP_RESPONSE) on every load.
- BROKEN — **Junk served as test/content text:** an economics chapter-test question literally opens "Combine with c8_eco_ch1_7 (Human Capital). A rural household in Odisha…" (internal authoring instruction referencing a Class 8 node in a Class 9 test); a science test serves the meta-question "What must you be able to do to master this topic?" (mastery-criteria leak); chapter titles leak raw LaTeX ("Chapter 4 · Identities \^2 = a^2 + 2ab + b^2\)…") or degrade to "Engl · Ch 6".
- BROKEN — **/learn class selector defaults to 10 for every student** (learn/page.tsx `useState(10)`, never reads user.class_level) — a fresh Class 9 child lands on Class 10 topics until they notice the selector; the enrichment list also never sets has_eli5 (always false) although eli5 is populated, so ELI5 badges cannot render.

### PREREQ-GAP (what the Class 10 boards — and Atlas's own Class 10 course — assume Class 9 didn't teach)
- PREREQ-GAP — **Congruence → Similarity:** Atlas c10 Triangles starts from similarity; Class 9 congruence (SAS/ASA/AAS/RHS, isosceles theorems) is taught nowhere (0 nodes c9+c10) — board proof-geometry collapses without it.
- PREREQ-GAP — **Statistics:** zero statistics nodes in BOTH c9 and c10 corpora — the boards' guaranteed statistics section has no coverage anywhere on the ladder.
- PREREQ-GAP — **Surface areas & volumes of solids:** c9 teaches only plane areas/Heron; c10 ch12 (combined solids) assumes the Class 9 cone/cylinder/sphere foundation (c9 has no solid-geometry node).
- PREREQ-GAP — **Gravitation numericals, states-of-matter, food resources:** absent in both adjacent classes (above), yet assumed by Class 10 physics numericals, chemistry stoichiometry grounding and biology production chapters.
- PREREQ-GAP — **The entire NCERT Class 9 Social Science chain** (modern history, India geography, constitutional design/rights, development economics) is absent in c9 and only patched in c10 (French Revolution re-taught; the rest never) — Class 10 boards' "Understanding Economic Development" and "India and the Contemporary World II" assume it.
- PREREQ-GAP — **Hindi and current-syllabus English texts:** two of the best-five CBSE board subjects have no Class 9 rung at all (Hindi absent classes 6-10; English teaches retired texts), so the language ladders the boards assume are one-year ladders here.

### Class 9 verdict
Story/practice/chapter-test machinery works where it points at real content, and the 416-node teaching layer is uniformly rich — but the course itself is not NCERT Class 9: six of twelve math chapters are missing (incl. everything statistics/solids/congruence the boards reuse), SST and English teach a different (largely retired or higher-grade) syllabus, Hindi does not exist, and Physics chapter tests are unreachable by a subject-code typo. The child also cannot get a server-side weakness profile (diagnostics dead) and never rehearses board-format MCQs. Priority: (1) subject-code + duplicate-chapter fixes in the chapter-test catalog (small change, unblocks 1,272 physics questions), (2) diagnostic plan-exhausted 500 + local-fallback masking, (3) NCERT-9 chapter backfill for math (Triangles/Quadrilaterals/Statistics/SAV) plus the SST/English/Hindi ladder decision, (4) MCQ bank for board-format rehearsal, (5) practice pool floor per chapter.

## Class 10

### Corpus studied (nodes / chapters — story-audited on every node, practice round-tripped on every chapter)
Mathematics 153/14 · English (Lang & Lit) 149/18 · Geography 61/7 · Chemistry 56/5 · History 45/5 · Biology 45/4 · Economics 44/5 · Physics 42/4 · Civics 41/5 · Grammar 16/6 (ch 90–95) · Computer 8/4 · **Hindi 0**. = **660 nodes, 11 subjects, 74 chapters; 660/660 story payloads, 74/74 chapter practice round-trips (190/190 answers graded), 22 live chapter-test runs across 9 subjects, all 3 pre-board papers started → answered → server-graded, 14 diagnostic subjects, 11 tutor subjects, 14 screens in a real browser.**

### What works (verified, for contrast)
- Story layer is the strongest in the platform: 660/660 nodes carry eli5, walkthrough, worked examples (PROBLEM/STEPS/REASONING/ANSWER strings), common misconception, and diagnostic Q&A; `missing_sections` empty corpus-wide; every node has board questions attached (e.g. 20 on `c10_math_cbse_01_001` with marks, marking scheme and year).
- Practice: all 74 chapters of 10 subjects start → answer → graded feedback; sessions return the planned question count.
- Chapter tests: 9 subjects with every chapter testReady (banks 768–2,821 questions/subject; 11,857 total); live runs graded with per-node breakdowns and weak-node story links.
- Pre-board papers (mathematics/science/social_science) render the CBSE A–E section skeleton with the official marks distribution (80 marks/180 min), internal-choice pairs (`choiceGroup`), a countdown timer in the UI, and honest grading (junk answers → 0/80, grade F) with section scores, chapterBreakdown and weakChapters.
- Tutor: 11/11 subjects reply <250 ms with class-appropriate pedagogy; hints work; out-of-syllabus probe degrades gracefully.
- Galaxy correctly counts the syllabus ("CLASS 10 UNIVERSE 0/660 stars lit").

### Gaps

- MISSING — **Hindi (A/B) does not exist for Class 10**: 0 nodes (`/api/nodes/by-class-subject?class=10&subject=hin_a|hin_b|hindi` → 404; zero `c10_hin*` corpus files vs 240 `hin_a` nodes one class up), no practice, no chapter tests, no pre-board paper; `/api/diagnostics/start` Hindi → 503 "Question bank returned no questions" while the diagnostic UI still shows a "🪔 Hindi Class 6–12" card. The single largest hole for a CBSE Class 10 board student (cross-validates C8's finding one grade down).
- MISSING — **English pre-board paper**: `/api/preboard/papers?class_level=10` lists only mathematics/science/social_science — the 149-node, 2,717-question English syllabus has no board rehearsal at all.
- MISSING — Sanskrit, IT-402, AI-417 and every other Class 10 board subject outside the 11-subject corpus: zero nodes anywhere.
- MISSING — Chapter tests for Grammar and Computer: `/api/chapter-tests/chapters?subject=grammar|computer&class_level=10` → 400 "Unknown subject 'computer'." — 2 of 11 subjects cannot be chapter-tested.
- BROKEN — **Class 10 grammar practice serves ONLY propositional-logic questions**: all 6 grammar chapters (tenses/modals/reported speech/passive; `c10_gram_cbse_90..95_001`) return "The symbol '→' represents the _____ connective" and "'I will pass AND I will not pass' → tautology/contradiction" items (13/13 questions across 6 probes) — leak from the applied-maths bank `deploy/backend/solvers/appmath/class10_appmath_questions.py` (ids `C10-APP-…`); a child practising CBSE Class 10 grammar trains Boolean logic instead, 100% of the time.
- BROKEN — **Pre-board math Q21–24 are unanswerable as rendered**: question text embeds options ("A) The Ganga river flows through Varanasi … D) Neither A nor B") while the served `options` array is a different set ("It is a proposition"/"It is not a proposition"/…); Q24 duplicates "It cannot be determined" twice — 4 consecutive broken 1-mark MCQs in the paper a child sees first.
- BOARDS-GAP — **Mathematics pre-board carries ≥12 out-of-syllabus questions (~15 marks)**: "Which of the following is a proposition?" ×4 (A21–24), tautology fill-blanks (B25/B30/B31), "evaluate p BICONDITIONAL q" (C32), "Construct the truth table for 'p OR NOT p'" (D40, **5 marks**), contradiction 4-marker (E46) — propositional logic is not in the CBSE Class 10 syllabus; 17/49 paper questions have `chapter: ""`; confirmed as the literal first question in the UI.
- BOARDS-GAP — **Science pre-board has zero MCQs**: 49/49 questions with `options: []` while Section A is labelled "Objective — 20 × 1 mark"; CBSE Section A is 20 objective questions (MCQ/assertion-reason). Assertion-reason items exist but render as typed subjective answers.
- BOARDS-GAP — **Social Science pre-board has zero MCQs** (49/49 `options: []`) and **no map-skills question** (the only "map" hit is a reading passage about Bhakra Nangal; CBSE awards map questions 5 marks).
- BOARDS-GAP — **Chapter tests contain no MCQs anywhere**: math ch01 live run = fill_blank 8 / true_false 2 (no options — child types "True") / short_answer 9 / long_answer 1, `options: []` on 20/20; same across all 13 runs in 9 subjects — the objective exam format is never trained outside the broken pre-board MCQs.
- BOARDS-GAP — Pre-board chapter spread is skewed: math draws 23/49 questions from ch01–05 while ch06–14 get 1 each; social-science labels only ch01–07 for 22 real chapters — the scorecard's chapterBreakdown is too coarse to steer revision.
- BOARDS-GAP — Diagnostic chapter picker for Mathematics offers "Algebra / Geometry / Trigonometry / **Calculus**" — Calculus is not CBSE Class 10 (same off-grade picker C8 found).
- THIN — Computer is 8 nodes / 4 chapters for all of Class 10 computing — far short of IT-402/AI-417 breadth.
- THIN — Fresh-account dashboard (`/api/progress/mastery`) shows **6 total nodes** (Science 3, Mathematics 2, English 1) against a 660-node syllabus — the dashboard tells a Class 10 child the syllabus is ~1% of its real size while galaxy says 660.
- THIN — Tutor answers the node's topic, not the doubt: a discriminant question asked in a session anchored to `c10_math_cbse_01_001` (Real Numbers) was answered with prime-factorisation content — cross-chapter doubts go unanswered.
- THIN — `/exam-simulator` advertises "**Real-time simulator for ISC Board Exams**" with "Science Pre-Board **2025**" to a CBSE Class 10 account (shot 07_exam_simulator.png) — wrong board, stale year.
- THIN — Socratic `/tutor` opens "Mathematics · **Class 11**" for a Class 10 account (shot 07_tutor.png).
- BROKEN (intermittent) — transient 500/422s under concurrent load, all clean on retry: `/api/practice/start` gram ch95 (500→201), `/api/content/nodes/c10_bio_cbse_01_011/enrichment` (500→200), `/api/content/nodes/c10_math_cbse_01_001/questions` (500→200), one pre-board submit (422→200), a /progress page resource (500, not reproducible) — a child hits these raw.

### Verdict

Would a child prepared only by Atlas pass the CBSE Class 10 boards confidently? **No — not as things stand.** The study loop is real (660 complete story-backed nodes, graded practice everywhere, chapter tests with per-node remediation, and a pre-board skeleton with honest marking), but three things would sink a board candidate: (1) the content served for board rehearsal is partly wrong — a math paper that is ~19% out-of-syllabus logic with four broken MCQs, science/social-science "objective" sections with zero MCQs, and grammar practice that is 100% Boolean logic; (2) an entire core board subject (Hindi) plus the English board paper simply do not exist; and (3) the objective exam format (MCQs, assertion-reasoning, map skills) is never trained anywhere. Priority order: (1) purge the C10-APP logic bank out of Class 10 grammar practice, diagnostics and the math pre-board; (2) add MCQ/assertion-reason/map questions to the three pre-board papers and chapter tests; (3) author the Class 10 Hindi corpus + English pre-board paper (or hide the subject cards); (4) fix the four broken math MCQs (text/options mismatch); (5) align dashboard mastery map, tutor class level and exam-simulator board branding with the signed-in child.

---

## Class 11

### Corpus studied (nodes / chapters, lead node of every chapter story-probed)
Mathematics 150/14 · Physics 180/14 · Chemistry 115/9 · Biology 168/19 · Economics (Indian Economic Development) 89/8 · Statistics for Economics 84/8 (the `stat` code) · Accountancy 98/9 · Business Studies 115/11 · Computer Science 150/11 · Informatics Practices 96/8 · Biotechnology 124/12 · Geography 223/26 · History 76/7 · Human Ecology & Family Sciences (`hs`) 132/11 · Political Science 199/18 · Sociology 106/10 · Psychology 86/8 · Hindi Aroh 240/16 · English Hornbill 180/12 · Snapshots 75/5 · Woven Words 405/27 · Grammar 7/4 · `comp` 3/1 (junk) · `soc_d` 106/10 (duplicate of Sociology). = **20 real subjects + 2 junk/duplicate codes; 278 chapters; 105+12 practice round-trips, all server-graded.**

### What works (verified, for contrast)
- Story layer: all 278 chapter lead-nodes serve eli5 + walkthrough + examples + misconception, 0 missing sections; enrichment 278/278 OK; board questions attached to every probed chapter.
- Practice: start/submit/grade round-trip 105/105 across 16 subjects; English practice works for all three books + grammar via the `english` slug.
- Chapter tests: math/phy/chem/bio/geo/eco/history all start and serve real papers (15q verified on all 7 subjects, 20q on math/phy/geo ch01 with a fresh token).
- Tutor: 18 of 24 subject codes reply in <2s with substantive 300-1,000-char corpus-grounded answers (incl. Devanagari for Hindi).

### Gaps
- MISSING — **Applied Mathematics (subject 241) has no corpus at all.** The `stat` code is actually NCERT *Statistics for Economics* (node titles: "Statistics in the plural sense", "Primary data", "Textual presentation of data") — an Applied Maths student has zero content.
- BROKEN — **Diagnostics can never complete in any subject.** Fresh-token full runs: Mathematics 4/8 answers rejected 400 "Question mismatch. Expected corpus:61f3616c…, got C10-APP-069-3499784572-000-FIL" (serve/plan desync — same root cause C7 found); Physics/Chemistry/Biology/Accountancy each 500 on an answer; submit 400 + result 400 on all 6 subjects → no diagnostic result ever. Cross-class/cross-subject leaks: `C10-APP-069-*` (Class 10) ids and a `BIO_C11_PLANT__*` id served inside a c11 **Physics** diagnostic (results_c11.jsonl diag_answer_fail).
- BOARDS-GAP — **Zero pre-board papers for Class 11:** `GET /api/preboard/papers?class_level=11` → `{"papers": []}` with a valid token (twice); `POST /api/preboard/mathematics/start?class_level=11` → 404 "No CBSE pre-board blueprint for mathematics class 11".
- BROKEN — **Tutor doubt lane times out for the science/commerce core:** bio, chem, eco, geo, hin_a replies hang >100s / 504 on three independent attempts (20:0x sweep, 21:09-21:16 reprobe); template-lane subjects answer instantly — the LLM teach-lane subjects all fail.
- BROKEN — `GET /api/homework/student` → **500 Internal Server Error** for a fresh account (both classes).
- MISSING — **Chapter tests for only 7 of ~16 subjects:** accountancy / business_studies / computer_science / political_science / psychology / sociology / informatics_practices / applied_maths / hindi / biotechnology catalogs → 400 "Unknown subject". English has no c11 bank either.
- THIN — **Chapter-test pools borderline:** first sweep 503'd every subject at numQuestions=20 ("Not enough distinct questions for this chapter yet — 5 unique after dedup"); 15q works, and 20q verified on math/phy/geo with a fresh token. Pools are thinner than the catalog's bankQ implies (math claims 2,611 bank questions yet dedup once collapsed ch01 to 5 unique).
- BOARDS-GAP — **History covers ~7 of the 11 NCERT *Themes in World History* chapters** (76 nodes/7 chapters: Mesopotamia, Roman Empire, Third-Century Crisis, Arabia before Islam, Mongol Steppe, Feudal Europe…) — no visible Industrial Revolution / Confrontation of Cultures / Paths to Modernisation chapters. Confirm with a TOC diff.
- MISSING — Informatics Practices c11 practice never verified via a working slug (c12 `ip` slug verified OK; c11 untested — flag to verify).
- THIN — Grammar corpus is 7 nodes in chapters numbered "80-83" (junior numbering shared into senior) — negligible for senior study.
- THIN — 3 chapters have eli5 under 200 chars (bs/hs/stat lead nodes) — usable but shallow.
- HYGIENE — `soc_d` ("Social Science") is a duplicate of the Sociology corpus (106=106 nodes, same chapters); `comp` is a 3-node junior fragment (chapter "86") — both surface in the senior class-subject API and would pollute subject pickers.

---

## Class 12

### Corpus studied (nodes / chapters, lead node of every chapter story-probed)
Mathematics 119/13 · Physics 122/14 · Chemistry 100/10 · Biology 114/13 · Economics 107/11 · Accountancy 92/9 · Business Studies 108/11 · Computer Science 144/13 · Informatics Practices 84/7 · Biotechnology 144/13 · Geography 229/21 · History (Themes in Indian History) 141/12 · HEFS (`hs`) 168/14 · Political Science 150/15 · Sociology 163/15 · Psychology 83/7 · Hindi Aroh 255/17 · English Flamingo 195/13 · Kaleidoscope 315/21 · Vistas 90/6 · Computerised Accounting (`ca`, mislabeled "Commercial Art") 19/4 · Grammar 6/4 · `comp` 3/1 (junk) · `soc_d` 163/15 (dup). = **20 real subjects + 2 junk/dup codes; 279 chapters; 122+12 practice probes, all graded.**

### What works (verified, for contrast)
- Story layer: 279/279 chapter lead-nodes complete (eli5/walkthrough/examples/misconception); enrichment 279/279; board questions on essentially every chapter (1 of 7 probed IP chapters empty).
- Practice: every subject round-trips and grades — incl. math, physics, history, political science, psychology, sociology, Hindi (re-verified after the prior run's token death), English (3 books), IP (`ip` slug), CA (via `accountancy` slug).
- Chapter tests: 7 subjects with real banks — mathematics 13/13 testReady (3,829 q), physics 14/14 (4,115), chemistry 10/10 (3,361), biology 13/13 (3,880), history 12/12 (4,690), geography 21/21 (7,775), economics 11/11 (3,655). Live math ch05 run: 15/15 answers accepted, result with 13-node breakdown + 15 review items.
- Pre-boards (math/phy/chem/bio): live mathematics run = 49 questions, 5 official CBSE sections, OR-choice pairs, graded in <1s with totalScore/percentage/grade/passed + section scores + chapter breakdown.
- Tutor: template-lane subjects answer <1s with high-quality corpus-grounded replies (math, eng_f, eng_k, history, hs verified for c12).

### Gaps
- BROKEN — **Diagnostics cannot complete in any subject (same platform defect as c11):** Mathematics 3/8 answers 400 "Question mismatch. Expected corpus:387918a6…, got Q_2963753650_001"; Physics 1/8 mismatch; Biology/Accountancy/Business Studies 500 on an answer; Chemistry answer hung >60s; submit 400 + result 400 on all 6 → **no student can ever get a weakness profile**.
- PREREQ-GAP — **Off-class question inside a c12 diagnostic:** `c11_acc_008_MCQ_000` (Class 11 id) served in the c12 **Accountancy** diagnostic; the same question 500s in both classes' diagnostics (poison question that breaks any session containing it).
- BOARDS-GAP — **Pre-board papers exist for only 4 of ~16 subjects** (catalog: biology, chemistry, mathematics, physics). No pre-board for Accountancy, Business Studies, Economics, Computer Science, English, Psychology, Geography, History, Political Science, Sociology, Hindi, IP, Biotech — **the entire commerce and humanities stream has no exam rehearsal** before boards.
- MISSING — **Chapter tests for 10 subjects:** accountancy / business_studies / computer_science / political_science / psychology / sociology / informatics_practices / applied_maths / hindi / biotechnology → 400 "Unknown subject".
- BOARDS-GAP — **English has zero test coverage for the 100-mark core paper:** Flamingo chapter-test catalog 0/13 chapters, Kaleidoscope 0/21 (bankQ=0, testReady=0); no English pre-board either.
- MISSING — **Applied Mathematics corpus absent** at class 12 (no `stat` code, no applied-maths nodes).
- BROKEN — **Tutor LLM lane hangs and kills the platform:** c12 physics doubt hung >50s (twice); c12 chemistry doubt **502 after 8.7s and BOTH backends restarted** (observed twice — 21:01 crash after a c11 chem/geo tutor burst, 21:22 crash directly after the c12 chem request; backends "health: starting" 21:23-21:25); psy 504 after 120s; c12 eng_v reply is a 153-char glossary-miss answering a different question. Remaining c12 subjects could not be probed past the crashes — c12 science doubt-answering is effectively broken/unstable.
- THIN — **Economics 11 chapters vs ~18 in NCERT** (Macroeconomics 6 + Indian Economic Development ~12, rationalised) — normal node density, so whole chapters are likely missing; needs TOC diff.
- THIN — **Political Science 15 chapters vs 18** (Contemporary World Politics + Politics in India Since Independence) and **HEFS 14 chapters vs ~25 units** across the two NCERT books — likely partial; needs TOC diff.
- MISSING — 1 of 7 probed IP chapters has zero attached board questions.
- THIN — `ca` corpus is really *Computerised Accounting* (CAS, spreadsheets, payroll) labeled "Commercial Art" — mislabel that misleads subject pickers; 19 nodes/4 chapters is thin for the elective.
- BROKEN — `GET /api/homework/student` → **500** (shared with c11).
- HYGIENE — `comp` junk (3 nodes, chapter "86", "A letter to the editor") and `soc_d` Sociology duplicate (163=163) reachable at class 12.

---

## Cross-cutting (Classes 11-12, C1112)
- MISSING — `GET /api/engagement/summary` → 404 (no such route; the engagement router only exposes /goal, /notifications, /weekly-digest).
- FRONTEND — :3001 serves all 11 routes 200 (home/signup/login/dashboard/learn/quizzes/practice/diagnostic/chapter-test/exam-prep/exam), same-origin-proxies `/api`, and `/learn/<node>/story` renders 200 for c11+c12 nodes. But pages still baking the absolute `NEXT_PUBLIC_API_URL` base do cross-origin calls from the :3001 origin with **no `access-control-allow-origin` header returned** (verified via preflight + POST with `Origin: http://localhost:3001`) — those client-side fetches fail in a real browser on :3001 and the pages degrade to fallbacks (relative-fetch pages unaffected).
- BUG (auth UX) — JWTs expire after 30 min; a long study session or a 180-minute pre-board paper will lose auth mid-flow (observed from API behaviour; the previous audit run itself was killed by this).
- NOTE — GUI-browser automation was unavailable in the audit sandbox; :3001 verification was done by fetching the served routes + proxy + CORS paths as above. API flows were exercised end-to-end exactly as the frontend calls them.

### C1112 verdict
Would a child prepared only by Atlas pass the Class 12 boards confidently? **Not yet.** The daily study loop is genuinely strong — complete Story content, working graded practice, real chapter tests and pre-boards in the science stream — but Atlas cannot tell the child what they are weak at (diagnostics dead platform-wide), cannot answer their doubts in most science subjects (tutor hangs, and the crashes take the whole platform down), and offers no exam rehearsal for commerce/humanities at all. Priority: (1) diagnostic plan-mismatch fix, (2) tutor LLM lane stability, (3) pre-boards + chapter tests for commerce/humanities/English, (4) Applied Maths corpus decision, (5) NCERT TOC diff for eco/pol-sci/HEFS/history.
``````

### references/node-format.md

``````text
# CONTENT AUTHORING SPEC — for new/missing Atlas chapters

Writers: follow this exactly and your content ingests into Atlas automatically
(parser → fidelity verification → index → live on the app). One md file = one
teaching node (≈ one topic, 15–40 min of learning).

## File naming
`<class>_<subject>_cbse_<chapter>_<serial>.md`
Examples: `c9_math_cbse_ch6_001.md`, `c9_sst_cbse_ch2_003.md`, `c10_hin_cbse_ch1_001.md`
- class: 6–12 · subject codes in use: math, phy, chem, bio, sst, his, civ, geo,
  eco, eng, engl, gram, comp, acc, bs, cs, ip, psy, hin (use existing codes for
  the subject you're filling — check a sibling file)
- Place files in the folder for your class/subject (mirror an existing sibling's
  folder path).

## Required sections (## headers, exactly these)
```
## ELI5                     — 2–4 plain-language sentences ("In simple words: …")
## DEFINITION               — the core teaching content, complete and exam-accurate
## COGNITIVE_LEVEL          — remember / understand / apply / analyse
## MASTERY_CRITERIA         — "a student has mastered this when …" (2–4 bullets)
## SCOPE_BOUNDARY           — what this topic does NOT cover (prevents drift)
## WALKTHROUGH              — step-by-step teaching, numbered ("1. … 2. … 3. …")
## DIAGNOSTIC_QUESTION_1..N — N ≥ 6 (aim 10–12); one per ## DIAGNOSTIC_ANSWER_N
## DIAGNOSTIC_ANSWER_1..N   — the exact correct answer (verbatim-matched)
## COMMON_MISCONCEPTION     — the classic wrong belief + the correction
## ON_FAILURE               — what the app shows when the student fails
## WORKED_EXAMPLE           — PROBLEM: … STEPS: … REASONING: … ANSWER: …
## PREREQUISITE_NODE_IDS    — ids of earlier nodes this one builds on
```

## Quality gates (enforced automatically on ingestion)
1. Every word ≥4 chars and every number in derived content must exist in the file
2. Diagnostic answers must be self-consistent (no ambiguous items, no repeats)
3. No node ids leaking into student-facing text
4. Class/subject must match the NCERT syllabus for that grade — this audit's
   finding was wrong-grade content; get the grade mapping right at authoring time

## Priority order (from CURRICULUM_GAPS.md)
1. Class 9 maths missing chapters: Triangles (congruence), Quadrilaterals,
   Lines & Angles, Statistics, Surface Areas & Volumes
2. Class 9 SST correct books: History (French Revolution → Nazism),
   Geography (India-focused), Economics (Palampur, People as Resource)
3. Class 9/12 English: Beehive + Moments (current texts are retired ones)
4. Class 12 Economics remaining chapters, Class 11 History themes,
   Class 12 Pol-Sci (3), HEFS (~11)
5. Hindi subjects for Classes 6–10 · Legal Studies (source TBD) · Applied Maths
``````

