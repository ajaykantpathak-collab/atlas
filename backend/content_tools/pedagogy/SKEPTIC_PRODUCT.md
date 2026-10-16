# SKEPTIC_PRODUCT — Sceptic investor's product due-diligence (SKEPTIC-2)

**Date:** 2026-10-06 · **Frame:** hostile product review before a term sheet. Only defects, each with evidence. No fixes. No servers were started; zero docker commands; every claim below is grounded in files on `D:\platform` (source), logs on disk, or the vendor's own audit documents.

**Ranked by "would kill the deal."** Severity legend: DEALBREAKER / HIGH / MED.

---

## SECTION A — DEALBREAKERS (any one of these ends the meeting)

### A1. The paywall does not exist. Paying customers would unlock nothing.
- **Severity:** DEALBREAKER (commercial)
- **Evidence:**
  - The only client gate is `deploy/frontend/components/premium/PremiumGate.tsx:29` — it reads `user.is_premium`.
  - `users.is_premium` is defined at `deploy/backend/models/user.py:37` and is set to `False` exactly once, in `init_db.py:203`. A repo-wide grep finds **no code path anywhere that ever sets it to True** — not in `modules/payments/*` (zero `is_premium` references), not in `routers/auth.py`.
  - The payments module activates an `entitlements` **table row** (`modules/payments/service.py:277` `ent.source = "razorpay"`), a different data store that no learning surface consumes. The only frontend consumer of `/api/payments/entitlement/me` is the pricing page's decorative badge (`app/pricing/page.tsx:100-110`).
  - The advertised free-tier limit — "Classes 9-12: 3 missions every day" (`modules/payments/plans.py:5,34`; pricing FAQ `app/pricing/page.tsx:64`) — is enforced nowhere: `tier_at_least()` (`plans.py:86-88`) has **zero callers outside the payments module**; no mission/practice route checks tier.
- **Why an investor walks:** The entire monetization thesis is a pricing page + an entitlement table wired to nothing. If Razorpay keys were added tomorrow, a paying parent's money would be taken and nothing in the product would change. Revenue cannot exist in the current codebase.

### A2. The platform is down, by its own monitoring, ~85-100% of the time during the launch window.
- **Severity:** DEALBREAKER (ops)
- **Evidence:** The watchdog's own log, `D:\platform\runtime_data\ops\health_log.csv` (5-minute probes, 614 rows, 2026-10-03 → 2026-10-06 16:38):
  - Overall: **91 "up" probes of 613 = 14.8% uptime** since the log began.
  - 2026-10-05: **250/250 probes down — zero up-probes all day.**
  - 2026-10-06 (through 16:38): 200 down, 0 up.
  - 2026-10-04: 90 up / 72 down / rest degraded.
  - `deploy/scripts/launch_tunnel.md` (the 14-day test plan) itself concedes: "Backends take 15-25 min to boot on this HDD", sleep = never, Windows Update paused 5 weeks, tunnel URL changes on every restart.
- **Why an investor walks:** The 14-day, 12-tester closed test — the entire launch milestone — is being executed on a laptop that its own sentinel says is down 85-100% of the time. The last two full days had zero healthy probes. There is no uptime story to underwrite.

### A3. Backup/DR is theater: today's backup silently failed, and the verification layer reported SUCCESS on a 0-byte dump.
- **Severity:** DEALBREAKER (ops / fiduciary)
- **Evidence:**
  - `D:\platform\backups\backup.log`: first dump ever is 2026-10-03 (no backups existed before launch week). Today's run: `failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine` → both `dream_app_2026-10-06_0330.dump` and `atlas_compliance_2026-10-06_0330.dump` exist as **0-byte files** (confirmed by `ls -la`).
  - `C:\AtlasBackups\copy.log` (06-10-2026 04:00): the second-copy script copied the **0-byte dumps** and printed `RESULT: OK - ... sizes verified` — its "verification" is `source 0 = copy 0`. The chain reports green while backing up nothing.
  - The second copy is `C:\AtlasBackups` — a **second internal disk of the same laptop**. There is no offsite copy anywhere (no cloud target in either script; `backup_second_copy.cmd` header explicitly says "second physical disk").
  - Monthly archive `C:\AtlasBackups\monthly\atlas_monthly_2026-10.zip` contains the failed 0-byte pair.
  - Restore drill (`backups/restore_drill.log`) passed on Oct 3-4 — credit where due — but has not run since, and today's drill would have restored a 0-byte dump.
- **Why an investor walks:** 12+ testers' accounts, minors' learning records, and the *compliance database itself* sit on a single laptop with a backup system that (a) started 3 days ago, (b) fails silently whenever the flaky Docker daemon is down, and (c) reports success on failure. One disk death or one more daemon week = total, unrecoverable data loss with a log trail that says everything was fine.

### A4. The Play Store "AAB" has never been built. The store strategy is a browser frame around the laptop.
- **Severity:** DEALBREAKER (go-to-market)
- **Evidence:**
  - `deploy/frontend/capacitor/README-STORE.md`: "No Android SDK / Android Studio on this machine — `gradlew` builds are NOT possible here." A filesystem search for `*.aab` across `D:\platform` returns nothing.
  - The shipping strategy is "Path A: remote-load shell" — a Capacitor WebView pointing at the live URL; the README itself warns Google's *Minimum Functionality* policy "rejects pure 'wrapped website' apps."
  - `launch_tunnel.md` ties the entire plan to Play's closed track: "12 testers for 14 days using the AAB" — a build artifact that does not exist, on a machine that cannot produce it.
- **Why an investor walks:** Distribution is the second half of the pitch, and it is vapor: no binary, no build machine, a wrapper-app policy risk the vendor has documented against themselves, and the thing the wrapper loads is down 85% of the time (A2).

### A5. The teacher suite cannot onboard a single real student. The landing page's third pillar is demo-data only.
- **Severity:** DEALBREAKER (product, B2B2C)
- **Evidence:**
  - `deploy/backend/api/teacher.py` exposes exactly: GET `/classes`, GET `/classes/{id}/students`, GET `/classes/{id}/progress`, POST/GET `/assignments`, worksheets, misconception-groups, repair-slip (endpoint census lines 277-1035). **There is no endpoint to create a class and none to enroll a student.**
  - `teacher_classes` rows are written only by `seed_teacher_parent_demo.py:125`; `class_enrollments` only by `seed_teacher_parent_demo.py:151` (plus tests). `auth_service.link_teacher_to_class()` (`services/auth_service.py:874-893`) has **no caller** — grep across the backend returns nothing.
  - Frontend confirms the dead end: `app/(teacher)/teacher-overview/page.tsx:769` renders "No classes assigned yet." — forever, for every real teacher.
  - The vendor's own crawl (`deploy/frontend/CRAWL_REPORT.md` §4) had `GET /api/teacher/classes` 404ing; the roster mechanism that exists is seed-only.
  - Meanwhile the public landing page sells: "Teachers assign work straight from the curriculum… watch real completions land" (`app/page.tsx:137-141`).
- **Why an investor walks:** The school/channel motion — the only scalable acquisition path for an EdTech — cannot admit one real teacher or one real class. Everything an investor is shown in a teacher demo is a seed script.

---

## SECTION B — HIGH (material impairments to the round)

### B6. Parent-child linking requires typing the child's internal UUID, which no surface anywhere displays.
- **Severity:** HIGH (activation funnel)
- **Evidence:** `POST /api/auth/link-child` (`deploy/backend/routers/auth.py:449`) links by raw student id; the UI (`app/(parent)/parent-children/page.tsx:188-222`) is a text input for "Student id", and its error copy says "double-check the id with the class teacher" — but teachers have no roster UI (A5) and student-facing pages never show the student their own id (by design; internal-id rule). A parent literally cannot obtain the string the form demands.
- **Why an investor walks:** The parent journey — the paying persona — dead-ends at its first step for anyone outside the seed data.

### B7. The student app has FOUR parent portals, THREE+ teacher portals, and TWO role-redirect maps that disagree.
- **Severity:** HIGH (product coherence / maintenance surface)
- **Evidence:**
  - Login redirect: parent → `/parent-dashboard`, teacher/admin → `/teacher-overview` (`app/(auth)/login/page.tsx:45-47`).
  - AuthGuard role redirect: parent → `/parent-portal`, teacher → `/teacher-portal`, student → `/tutor` (`components/AuthGuard.tsx:62-68`).
  - Parent surfaces that all exist and overlap: `/parent-portal`, `/parent-dashboard`, `/parent-overview`, `/parent-children`. Teacher: `/teacher-portal`, `/teacher-dashboard`, `/teacher-overview`, `/teacher-assignments`, `/teacher-homework`, `/teacher-remediation`, `/teacher-misconceptions`.
  - The vendor's own CRAFT_AUDIT (`deploy/frontend/CRAFT_AUDIT.md`, 2026-10-05) documents the three role sidebars as "the same 90 lines copy-pasted" with two different active-state grammars and a fake static notification dot.
- **Why an investor walks:** Every journey was built twice or thrice and never reconciled; two redirect maps send the same parent to two different homes depending on entry point. This is what a feature team of one writing against itself looks like — the next 12 months of cost are visible in the route tree.

### B8. A duplicate "premium" student app exists with fabricated fallback data — inside the same repo as the honesty law.
- **Severity:** HIGH (product + credibility)
- **Evidence:** `app/premium/**` re-implements dashboard/learn/practice/tutor/progress/settings with a different design system (CustomCursor, GradientOrbs, Marquee — `app/premium/page.tsx:17-31`). Its dashboard hard-codes persona data the main dashboard's own charter forbids: `title: 'Scholar'`, class fallback `'Class 10'`, `levelMax: 100` (`app/premium/dashboard/page.tsx:32-36`). The main dashboard's charter says "placeholder numbers are never shown" (`app/dashboard/page.tsx` header).
- **Why an investor walks:** Either surface counts as shipping quality or it doesn't; the presence of an entire parallel app of the kind the platform's own charter bans means the charter is aspirational, not enforced.

### B9. The "Try Demo Account" button — the first thing an evaluator clicks — creates a ghost session every widget then rejects.
- **Severity:** HIGH (first-impression funnel)
- **Evidence:** `app/(auth)/login/page.tsx:167-183`: the button does a client-side `useAuthStore.setState({ token: 'demo-token', isAuthenticated: true })` and pushes `/dashboard`. The backend has no notion of `demo-token` (zero references in the backend); every API call 401s; `app/dashboard/page.tsx:69-72` maps unauthorized → `SignedOutState` ("Sign in to open your command center"). The public credentials `demo@dreamapp.in / demo123` are hard-coded on the login page and in `init_db.py:193-214`. The premium tree has its own copy of the same fake-token login (`app/premium/(auth)/login/page.tsx:142`).
- **Why an investor walks:** Diligence starts at the demo button. Today it demonstrates that the app cannot tell a real session from a fabricated one, then shows an empty shell.

### B10. Hindi-medium India — roughly half the CBSE demographic — is unserved by owner decision, and the flagship Class 9 Hindi book is machine-salad.
- **Severity:** HIGH (market sizing)
- **Evidence:**
  - Corpus census (directory listing, `deploy/content/enhanced_nodes_md/`): 2,835 of 14,268 files are `hin` lane (19.9%) plus 106 `gram`; i.e. ~20% of the CBSE corpus is Hindi-medium content that AGENTS.md (2026-09-29 owner decision) has **parked** as unusable.
  - Direct read of `c9_hin_ga_cbse_01_001.md` (the Class 9 Gadya flagship, 180 nodes): the diagnostic Q/As are unpunctuated token chains — "उत्तर: (क) पहली — 1880 लमही धनपत राय और असहयोग नौकरी त्याग समर्पण लेखन नाम की कहानी…" — grammar-free keyword soup no student can study from; the misconception section is one 400-character hyphenated run-on.
  - The vendor's own depth report (`content_tools/content_depth_report.md` §2-4): 245 thin nodes sit in the parked Hindi/English lanes and are explicitly excluded from fixing.
  - Meanwhile the marketing (store listing `STORE_LISTING.md`: "for CBSE and CISCE (ICSE & ISC)") and the pricing page sell in English with no Hindi-medium caveat.
- **Why an investor walks:** The honest TAM is English-medium CBSE only — roughly half of the claimed "CBSE Classes 6-12 India" market — and one in nine class-9 students (the Hindi Gadya cohort) who does try the Hindi lane gets word salad. The vendor knows and has parked it.

### B11. CISCE is 9.4% of a product, sold as a full product. ISC (Classes 11-12) is at zero.
- **Severity:** HIGH (claim vs delivery)
- **Evidence:** Vendor's own `deploy/frontend/components/sims_v2/COVERAGE_REPORT.md` (2026-10-05): "CISCE: 884 / 9,432 — 9.4% (only ICSE classes 9-10; six subjects each; everything else is zero)"; §3.2: c11 (2,812 nodes) "none — 0%", c12 "0%"; P0 list includes ICSE Hindi/English/Humanities classes 9-10 (1,122 nodes) with "no sims at all." Compare the store copy (`STORE_LISTING.md`): "Atlas is the study app for CBSE and CISCE (ICSE & ISC), classes 6–12."
- **Why an investor walks:** The second board is a corpus-shaped marketing claim. An ICSE parent evaluating today finds 1 sim per ~10 nodes and literally nothing for ISC; the first credible teacher who checks churns loudly.

### B12. Content is a competent glossary, not an engaging product. Ten nodes read as a bored Class 9 student: competent, text-only, interchangeable.
- **Severity:** HIGH (retention thesis)
- **Evidence (10 nodes read in full or in part):** `c9_math_ch12_1.md` (angle sum — strong structurally, zero visuals), `c10_bio_cbse_01_001.md` (life processes — good prose, zero visuals), `c8_hist_ch3_2.md` (Age of Discovery — good), `c10_engl_cbse_01_001.md` (Lencho — good), `c10_math_icse_01_001.md` (GST — see B13, plus ELI5 and WALKTHROUGH are near-duplicate retellings of the same shirt/Gujarat story), `c9_hin_ga_cbse_01_001.md` (salad — B10), `c10_hin_kr_cbse_13_001.md` (coherent, dense), `c9_math_ch12_1` diagnostics, `c10_bio` diagnostics, plus the depth-report stats. Observations that repeat in every node:
  - One rigid 6-section text template (ELI5/DEFINITION/WALKTHROUGH/6× diagnostic Q&A/misconception/worked examples); **no images, diagrams, or interactive elements in the corpus itself** — engagement is outsourced to a separate sims layer that covers 58% of nodes (COVERAGE_REPORT §1).
  - The authoring spec *caps* walkthroughs at 150-300 words (`content_depth_report.md` §3: "every node now lands in the 150–300-word band") — one paragraph of teaching per node is the target state, by design.
  - Node prose references internal node ids in body text as "house style" (e.g. `c9_math_ch12_1.md` WALKTHROUGH: "(c7_math_ch07_007: Angle Sum Property of a Triangle = 180°)"; depth report §5 admits pre-existing ids were preserved) — the platform's own display-id ban lives one renderer away from a leak.
- **Why an investor walks:** Strip the XP/streak skin and the study layer is a free NCERT summary site with a uniform template. Nothing in the corpus a competitor couldn't regenerate in a quarter; nothing a bored 14-year-old would pick over a YouTube one-shot. Retention rests entirely on the gamification loop, which the vendor's own audits show is inconsistently built (B7, B8, B24).

### B13. Content currency has no process: the ICSE commercial-studies node teaches a GST slab structure that was abolished in September 2025.
- **Severity:** HIGH (trust damage)
- **Evidence:** `deploy/content/cisce_nodes_v2/c10_math_icse_01_001.md` — ELI5 and DEFINITION both teach "rate slabs (5%, 12%, 18%, 28%)" as current tax law, over a year after India's GST 2.0 reform (effective 22 Sep 2025) collapsed the main slabs to 5%/18% (+40% sin). No staleness-scanning tool exists in `content_tools/` (the tooling there measures thinness and slop, not facts).
- **Why an investor walks:** "Every answer verified, never guessed" is the entire brand (landing hero). A merchant-bride ICSE parent who knows GST 2.0 finds the platform confidently teaching the dead 4-slab regime on day one — and the brand promise becomes a liability multiplier instead of an asset.

### B14. The "Socratic tutor" has ~60 authored lines for 11,009 teaching nodes; everything else gets one generic question.
- **Severity:** HIGH (pedagogy honesty)
- **Evidence:** `deploy/backend/its/solver/socratic_moves.py`: `_E` contains exactly **20 misconception families** (counted programmatically: sign_flip … supply_demand_curve), each with one elicitation prompt; `_ISO` has 20 families × 1-2 mini-questions. The generic fallback for any wrong answer outside the catalog (`_GENERIC_ELICIT`, line ~206): "You answered {answer}. Before we fix it: re-read the question and say in one line what it is actually asking for." then hand-off text. That is the actual dialogue for >99% of wrong answers on 11,009 nodes / 253k questions. The module docstring is honest ("turns the 20 authored misconception families into a dialogue script") — the marketing is not.
- **Why an investor walks:** The differentiating pedagogy claim dissolves under a 5-minute file read: it is a lookup table of 20 math/science misconception scripts plus a universal "re-read the question" prompt. Sophistication theater at corpus scale.

### B15. When the flagship solver refuses, the student gets the same four generic steps regardless of subject.
- **Severity:** MED-HIGH (product depth at the marquee moment)
- **Evidence:** `deploy/backend/services/solve_isolation.py:92-99` — `GUIDED_METHOD_STEPS` is a fixed 4-line scaffold ("Identify exactly what is asked… Write the rule or formula… Substitute… Check…") served for **every** GUIDED_PRACTICE refusal (`its/solver/page_solve.py:357-373`); refusal copy is a timer sentence ("Our solver needed more than {N}s… the answer stays withheld"). The doubt UI renders it honestly (`app/(student)/doubt/page.tsx:566`).
- **Why an investor walks:** The refusal path is honest — credit — but a class-9 student refused on a trig identity and one refused on a mole concept receive the identical index card. The marquee "never wrong" engine's failure mode has no subject intelligence attached. (Do note: the vendor's honesty discipline here is real; it's the *depth* that is missing.)

### B16. Two flagship surfaces are hard-locked for every user right now, contradicting the pricing page's own FAQ.
- **Severity:** HIGH (funnel contradiction)
- **Evidence:**
  - `/exam` wraps its entire exam simulator in a hard `PremiumGate` (`app/(student)/exam/page.tsx:2047-2049`); `/offline` likewise (`app/(student)/offline/page.tsx:29`).
  - `is_premium` is False for all users forever (A1), so **every** tester today — including Classes 6-8 that the FAQ promises "get everything… forever, no card" (`app/pricing/page.tsx:64`) — sees the "Premium feature — upgrade to unlock" lock card. The landing page's discovery card actively routes students to the "Board exam simulator" (`app/page.tsx:100-105`).
  - Meanwhile `/exam-simulator` (a different exam page) is **not** gated at all — two exam surfaces, one locked for everyone, one open to everyone.
- **Why an investor walks:** The free tier's promised flagship experience is a paywall with no payment system behind it (A1), pointed at by the landing page. This is the specific demo that dies mid-flight.

### B17. No age assurance or parental consent anywhere in signup — for a product whose users are minors.
- **Severity:** HIGH (regulatory)
- **Evidence:** `deploy/backend/schemas/auth.py:11-21` — `SignupRequest` is name/email/password/role/board/class_level. No DOB, no age gate, no parental-consent flow anywhere in `routers/auth.py`; the frontend signup (`app/(auth)/signup/page.tsx`) collects the same. The signup class selector offers Classes 1-12 — the platform explicitly serves young children (junior-games system for 1-5 per AGENTS.md). The compliance DB (`atlas_compliance`) failed its backup too (A3). DPDP Act 2023 requires verifiable parental consent for processing children's data; Play's Families policy adds its own gate if the listing targets children.
- **Why an investor walks:** Regulatory exposure on the core user base (minors) with zero consent infrastructure, on the same box that loses its backups when Docker hiccups. India's DPDP enforcement is a "when," not "if."

---

## SECTION C — MED (adds up; each alone is survivable)

### C18. Auth is client-side theater: middleware is a pass-through, tokens live in localStorage, and the two token stores disagree.
- **Evidence:** `deploy/frontend/middleware.ts:5-8` returns `NextResponse.next()` for everything; all protection happens post-hydration. `lib/api.ts:18-32` reads three token locations; `clearTokens()` (`api.ts:70-77`) purges `token`/`auth_token`/`refresh_token` but **not** the `dream-auth` zustand store — a failed refresh leaves a live-looking token in one store while the other is empty, producing signed-in chrome over 401 widgets. Sessions predating the refresh-token fix never refresh at all (`getRefreshToken()` reads only one key).
- **Why it hurts:** For a children's product this is a weak security posture; for diligence it signals auth was retrofitted around UI states rather than designed.

### C19. The new-student first session is 30-45 seconds of skeletons by construction.
- **Evidence:** `components/dashboard/useDashboardData.ts:75-76,145-147` — every widget retries 3× at 5s with 8-15s timeouts ("the skeleton IS 'Loading your data…'"), and the file's own comment cites "a cold backend (60-170s boot after idle hours)". On the HDD laptop (A2), a tester's first login after the box wakes lands in retry purgatory before any content appears. The honest empty state itself ("Light your first star. All sky. No stars yet.", `messages/en.json:226-227`) is good copy — but it arrives after the spinners.
- **Why it hurts:** Day-1 retention on a 15-minute daily-usage plan cannot survive a 45-second blank wall; the plan document (A2) guarantees the cold-boot scenario every morning.

### C20. 13 production routes are orphans or self-declared demos, and 6 student-facing pages wear an "InternalDemoBadge".
- **Evidence:** Zero-inbound-link routes: `/world`, `/showcase`, `/unregister-sw`, plus near-orphan `/parent-portal`, `/teacher-portal`, `/teacher-misconceptions`, `/topic-map`, `/next-best`, `/welcome`, `/play`, `/atlas`, `/game-test` (repo-wide href census). `InternalDemoBadge` is mounted on `/cognitive`, `/coding-playground`, `/holistic`, `/study-groups`, `/videos`, `/world` — student-dock-reachable pages that self-describe as decorative demos.
- **Why it hurts:** 20 testers will find these within a week; the screenshot that circulates in the tester WhatsApp group will be the page that says it's a demo.

### C21. The pricing page FAQ describes payment methods for a system that is explicitly unconfigured, and the waitlist is the only functional feature.
- **Evidence:** FAQ: "Which payment methods work? UPI, cards, netbanking and wallets through Razorpay." (`app/pricing/page.tsx:~56-60`) — presented unconditionally, while the page body correctly shows "payments launching" + waitlist when `configured=false` (backend scaffold note `main.py:586-597`; no Razorpay env in `.env.example`). A parent ready to pay today can only surrender an email.
- **Why it hurts:** It's the exact dark pattern the page's own charter ("zero dark patterns") claims to abjure — answering "how do I pay" with methods that don't exist.

### C22. The marketing funnel promises an "AI tutor"; the shipping default is rule-based with LLM keys unset.
- **Evidence:** Vendor's own crawl (`CRAWL_REPORT.md` D2): "container env has GEMINI_API_KEY= and DEEPSEEK_API_KEY= declared but empty → replies come from the backend's rule-based `_fallback_hint` heuristic, not an LLM." Config default is `solver_llm_mode: "parse_only"` (`config.py:150-158`) — no LLM fallback unless env-flipped. Store copy sells "Atlas AI" answers.
- **Why it hurts:** The highest-CAC category claim (AI tutor) is a deterministic hint system in the shipping configuration. Defensible as *honest*, indefensible as *competitive*.

### C23. The landing page ships internal commentary and hard-coded numbers on the one page every investor sees first.
- **Evidence:** `app/page.tsx:52` — `questions: 253456` is hard-coded in code (the adjacent comment says "213k rows"; AGENTS.md says 253,456); fallback strings `'9,099'` / `'200,000+'` render when the backend is down (lines 71-72) — i.e., on this box, most of the time (A2); and the public footer literally reads "Counts are fetched live from the backend — topics from /api/nodes/stats, questions from the board_questions table" (lines 315-318). Hero claim "The CBSE app that's never wrong" sits above a stats row that shows stale hard-coded numbers precisely when the backend is dead.
- **Why it hurts:** First impressions compound; the footer line is a dev note in production clothing.

### C24. The vendor's own craft audit documents the UI as ~40% unbuilt to spec — and the mobile 390px run has a recorded failure.
- **Evidence:** `CRAFT_AUDIT.md` (2026-10-05): "about 40% of its surfaces never got the memo"; four different near-black page bases across 17 route roots; five button dialects (1,367 instances in 380 sim files); 28 student pages with no header; undefined Tailwind classes rendering nothing (`bg-mint-gradient` chips transparent — since patched in `tailwind.config.js:54-57`, but the audit's P0 list is dated yesterday). `_mobile_pwa_results.json`: "story no horizontal overflow @390" → **FAIL** (scrollW > 390). ICE 1.2 (owner law) requires every FE surface to meet the ui-skills constraints; the vendor's audit is the counter-evidence.
- **Why it hurts:** The internal bar exists and the internal audit proves it isn't met; an investor reads that as either self-awareness without capacity, or a gate that gets waived when inconvenient.

### C25. Chrome i18n calls the product "CISCE Learning Platform" — in the Atlas bundle — and offers a Hindi toggle over an English-only product.
- **Evidence:** `deploy/frontend/messages/en.json:3` — `"appName": "CISCE Learning Platform"`; `hi.json` exists with translated chrome (e.g. first-star copy) while the Hindi content lane is parked/unusable (B10). A Hindi-medium student toggling to their language gets a Hindi shell around English text — the "English-in-Hindi" experience the owner already parked as a known defect.
- **Why it hurts:** Rebrand fossils in the i18n bundle and a toggle that manufactures the exact disappointment it looks like it solves.

### C26. Payments were built to the compliance minimum and the monitoring ceiling is a Windows toast.
- **Evidence:** `launch_tunnel.md` — the entire monitoring posture: a 2-minute morning preflight plus `watchdog.py` (5-min probe → Windows toast + Event Log). Self-heal is `docker start dream-backend-1 dream-backend-2 dream-frontend` (`watchdog.py` header) — which (a) references the **retired** frontend container per AGENTS.md, and (b) cannot fix a dead Docker daemon, the exact failure that zeroed today's backup (A3). No CDN, single box, no second host, tunnel URL rotates on restart.
- **Why it hurts:** There is no recovery story for the single failure mode the platform demonstrably has.

---

## SECTION D — COUNTING THE WALK-AWAY

**Findings: 26 (5 dealbreakers, 12 high, 9 medium).** Every claim above is checkable in the repo in under a minute; the three most damning (A2, A3, A4) are logs and build artifacts, not opinions.

**The pattern an investor will name out loud:** the platform's real achievements — a genuinely rubric-clean 20k-node corpus, a deterministic solver with honest refusal paths, a disciplined honesty charter — are all *content and backend* wins. Everything that turns those assets into a company — monetization (A1), distribution (A4), uptime (A2), data survival (A3), the teacher channel (A5), the parent funnel (B6), the minor-consent posture (B17) — is either missing, seeded, or failing silently while logging SUCCESS. The product has been built from the content outward and has not yet been built from the customer inward.

**What would have to be true to reopen the conversation:** a real gating path from payment to feature, one built AAB, a second host or honest cloud migration, an offsite backup with a verification that can fail, one teacher class-creation + enrollment flow, and an age/consent gate. None of these exist in the codebase today.
