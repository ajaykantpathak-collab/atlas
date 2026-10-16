# ATLAS — FULL AUDIT PACKAGE
**Date:** 2026-10-15 · **Scope:** every layer of the product, measured on production (`:3001` / `:80`) · **Method:** three read-only audit lanes (A product/correctness/content, B security/infra/scale/code, C business/investor) + lead-measured repo facts. Zero product source was modified during the audit.

**Evidence root:** `D:\platform\_work\audit_2026_10_15\` — `laneA/REPORT.md` (+ `battery.jsonl` 300 raw solver records, `verdicts.json`, `ct_matrix.json`, `bq_counts.json`, 40+ screenshots), `laneB/REPORT.md` (+ `unauth_probe.json` 379 routes, `idor.py`, load-test outputs, PII schema), `laneC/REPORT.md` (+ page dumps, SQL outputs, payload measurements), `lead_facts.md`.

> Caveat on every latency figure: the box was running 4 `bank_preroute` worker shards (CPU ~500%) throughout. Numbers are worst-case for the current topology, not steady state.

---

## 1. THE ONE-PAGE VERDICT

**How far from "best edtech app in India"?**
On *teaching substance* — the misconception-first corpus, honest-refusal architecture, teacher remediation tools, 215 junior games, verified-answer design — Atlas is already **ahead of every mass-market Indian player** on things none of them ship. On *trust execution, distribution and business* it is **pre-launch**: the verified badge is wrong 1-in-15 times on novel questions, there are zero real users, nothing is monetised, and the whole company lives on one Windows disk with no git remote.

| Dimension | Score | Distance to best-in-India |
|---|---|---|
| Pedagogy & content depth | **8/10** | Ahead. Authored misconception diagnoses per answer; 24k corpus files; chapter-test matrix near-complete c6-12; 215 junior games 215/215 boot-verified. |
| Premium feel / identity | **7.5/10** | At par or ahead on landing/dashboard/galaxy; behind BYJU'S on motion polish; teacher/junior surfaces emoji-heavy. |
| Solver truth (the core claim) | **5.5/10** | **6.7% verified-wrong on 150 novel stems** (14% of verified responses). Honest wall holds (0 leaks, 33% honest guided). This is the single most important number in the package. |
| Adaptivity | **6/10** | BKT mastery genuinely moves (15 wrong → 14 rows). Steering invisible in chapter-test (`difficulty: None`, no next-question adaptation). |
| Security | **6/10** | Strong fundamentals (bcrypt-12, JWT rotation, CSP, 0 SQLi/XSS hits, role walls hold) **but one confirmed IDOR** — any student can read any other student's exam history. |
| Infra / reliability | **5.5/10** | Daily backups but same-disk only; no container limits; no git remote; CI dead-letter. |
| Scalability | **4/10** | Content reads scale (p95 <400ms). Solver/authed paths collapse at concurrency 3-5 under shard load. Ceiling today ≈ 10-30 solver-active students. |
| Code quality | **5/10** | 391k LOC; 11 tsc errors in ship tree; 4 solver files at 10-14k LOC; pytest collection >5 min; two-tree drift machine. |
| Monetization | **4/10** | Razorpay module production-shaped; `require_premium` gates **zero** product surfaces; keys unset; waitlist only. |
| Metrics / PMF measurability | **5/10** | DAU derivable; no funnel events, no LLM cost telemetry, langfuse not deployed. |
| User base | **1/10** | 389 accounts — **every one is a test/audit fixture**. 0 external users. |
| Legal / compliance | **5/10** | Well-drafted DPDP terms+privacy blocked on `[LEGAL ENTITY NAME]` etc; `/refund` `/grievance` 404; LLM sub-processors undisclosed. |
| GTM / distribution | **3.5/10** | All SEO metadata says `localhost`; i18n 379/379 keys translated but 7 consumer files; no referral/invite/share. |

**Weighted honest overall: ~5.8/10 as a company, ~7.5/10 as a product.** The gap between the two numbers is the whole story: the product is further along than the business wrapped around it.

---

## 2. CRITICAL — FIX BEFORE ANYONE ELSE SEES THIS

Ranked by blast radius. All four are days-of-work or less.

| # | Finding | Why it's critical | Fix effort | Evidence |
|---|---|---|---|---|
| 1 | **IDOR: `GET /api/students/{id}/exams/history`** returns any student's exam records to any logged-in student (verified A-reads-B live). | Children's-data privacy incident class under DPDP. Reportable. | **Hours** — ownership check (path id == current_user or linked child). Audit sibling `{student_id}` routes. | laneB `idor.py` |
| 2 | **No git remote, 38 commits, last 2026-09-30, 9,117 uncommitted paths.** Two weeks of production code exists only on this disk. | Single-disk custody of the entire product. Disk dies → company dies. CI workflows exist but can't run. | **Hours** — private remote, commit, push. | lead_facts.md |
| 3 | **Backups same-host only** (`D:\platform\backups\*.dump`, 7-day retention, ~330MB/day). | Same disk as prod; same failure mode as #2 for user data. | **Hours** — rclone/scheduled copy off-host; one restore test. | laneB B4 |
| 4 | **`next@14.2.5` < 14.2.10** — published cache-poisoning advisory GHSA-gp8f-8m3g-qvj9. | Public-facing framework CVE. | **Half day** — bump + Reticle gate (exists). | laneB `npm audit` |

---

## 3. THE TRUST CLAIM — WHAT THE NUMBERS ACTUALLY SAY

The product's entire positioning is *"every answer verified or honestly refused."* Lane A tested that against 150 **novel** stems (not from the bank) across 8 subjects.

**Tier distribution:** verified 47% · guided 33% · method_only 17% · bank_similar <1% · timeouts 1%.
**Student-visible leaks:** 0 (node ids, "the student", LaTeX, long floats — all clean).
**Verified-wrong: 10/150 = 6.7% of answers, 14% of verified responses.**

Three distinct mechanisms — each needs its own fix, not one patch:

| Mechanism | Count | Example | Root cause class | Fix |
|---|---|---|---|---|
| Computed-wrong stamped `VERIFIED` | 3 | "sum 55, diff 15 → larger number?" → answered **55** (the sum). KE from momentum → **900 J** (true 225) *with a fabricated "independent check residual 1.21e-122" step*. Depreciation ₹12,000 → "Useful life = **120,000 years**". | Family matched, slot semantics wrong; verifier confirmed internal consistency not question-correctness. The fabricated check line is the worst finding in the audit — a trust artefact that isn't real. | Second-path check / confidence floor on `DEP_SLM`, `NUMBER_COMPARE`, competency routes; **strip any "independent check" string unless a check actually executed**. |
| `VERIFIED_FROM_NODE` serves a different question's lesson | 6 | LCM(36,84) asked → returned a laddoo-packing narrative; steps literally `"Answered from the authored lesson content"`. | Semantic node lane has no stem↔node similarity gate before verified-tier. | Gate by similarity; demote mismatches to `bank_similar` exemplar with honest label. |
| One-word wrong | 1 | Rowlatt Act → "Revolutionary". | Prose extraction. | Prose answers should carry node-anchored sentence, not a single extracted token. |

**Previously fixed this week (confirmed dead on prod):** cross-domain mis-parse (polsci→accountancy), same-domain wrong-quantity (time→height), family ambiguity (now fails closed), answer-leak in mismatch hints. The hardening trajectory is real — each wave finds a smaller class — but **the badge is not yet trustworthy enough to pitch on.**

**Coverage walls (honest, not wrong):** Hindi 0/10 verified (all guided); chemistry 2/15 verified (molar/molarity has no computed lane); commerce 5/15.

**Also found:** `teach_loop.concept` binds wrong-subject nodes (arithmetic → class-12 history); `board_questions.year` is **NULL on all 403,620 rows** and `source_type` is 100% synthetic categories — the "from a board paper" trust copy can never literally be true. Either ingest real PYQ sets or rename the lane to "authored question bank". *(Lane C.)*

---

## 4. SECURITY & INFRASTRUCTURE — DILIGENCE VIEW

**What holds (verified):** bcrypt cost 12 · HS256 JWT 30-min + `jti` + refresh rotation · login rate-limit (30 burst → 22×429) · generic login errors · role walls (student→teacher routes 403; cross-id weekly-digest 403) · 30 SQLi/path-traversal probes: 0 hits · 0 raw-SQL f-strings in product code · CSP/XFO-DENY/nosniff/Referrer-Policy on both surfaces · mass-assignment ignores `role`/`is_premium` · all DB/cache ports loopback-bound · no third-party trackers · real DPDP deletion pipeline (`deleted_at`, anonymising cascade, password + "DELETE" confirm) · parental consent enforced at signup.

**What fails:**

| Sev | Finding | Fix |
|---|---|---|
| CRIT | IDOR exams/history (§2) | ownership check |
| HIGH | 0 container resource limits — backends 5.6/6.9 GB RSS on 19.5 GB host, worker 167% CPU; one leak OOMs everything | `mem_limit`/`cpus` in compose |
| HIGH | Solver path + API + heavy workers share one box with no admission control → 503 wall at c=5 | isolate worker; off-peak-only shards; queue |
| MED | 5 routes return guest-200 instead of 401 unauthenticated (`/api/exams/history`, `tutor-graph/progress`, `student/onboarding`, `student/a11y-prefs`, `students/{id}/exams/history`) | return 401 |
| MED | `/metrics` Prometheus public on :80 | internal port / bearer |
| MED | Signup 409 enumerates existing emails | standard trade-off; accept or soften |
| MED | Hardcoded `NEO4J_PASSWORD` literal in `content_parsers/load_to_neo4j.py:23` | env |
| MED | 11 `tsc --noEmit` errors in ship tree (missing `LivingWorld` module; 4-tuple→3-tuple) | fix + gate |
| LOW | `qdrant:latest`; 5 loose pins in requirements; `.env.production` on disk (gitignored) | pin |

**Capacity (shard-loaded):** enrichment p95 394 ms @c5, 0 errors — content scales. `/api/progress/overview` @c5 → 58% 503 + 35% 429. Three concurrent identical solves → 2×90 s timeouts. **Practical ceiling right now: 10-30 concurrent solver-active students; hundreds on read paths.** Bottleneck: CPU-bound solver lane sharing cores with preroute + gunicorn 2 workers × 2 replicas.

**Not measured (honest gaps in audit coverage):** DOM-rendered XSS via Playwright (payload probes only), ESLint count (tree too large in timebox), logout token invalidation, 10-min RSS growth trend, PII in logs.

---

## 5. CONTENT & PEDAGOGY — THE MOAT

| Asset | Measured | Defensibility |
|---|---|---|
| CBSE corpus | 14,547 files | Authored paraphrase, original analogies ("host greets every guest" for distributive property), wrong-answer diagnosis per diagnostic option. **Not scraped NCERT** — low copyright exposure. Hard to copy: this is years of misconception authoring. |
| CISCE corpus | 9,516 files | Same quality; ICSE/ISC bank now fully matchable (norm_text backfill landed, 0 NULL). |
| Question bank | 403,620 rows, 312 class×subject cells | **100% synthetic** (diagnostic 216k / worked_example 60k / seed 59k / competency 40k / practice 28k / generator 624). No real paper provenance. Honest relabel needed. |
| Solver | 140 family modules, 242 solvers, 136 generators, 378 verifier relations | Genuinely hard to rebuild; 4 files at 10-14k LOC are the maintenance debt. |
| Junior games | 215 (c1 39 / c2 37 / c3 49 / c4 43 / c5 47), 215/215 booted live, p50 415 ms | **Correction to Lane A item 14:** English is **31 games** and Hindi **20** in the manifest (lead-verified) — the Sept "0 English" gap is closed. Depth per strand (one game/strand) is the remaining thinness. |
| Chapter tests | c6 11 subjects / c8 12 / c10 12 / c12 14 subjects; testReady ≈ chapters | **Gap: c12 accountancy 0 chapters.** |
| Pedagogy sample (12 nodes deep) | accuracy 5/5, NCERT-alignment 5/5, misconception quality 5/5, worked examples 4.5, language level 4.5, **Hindi availability 2/5** | Better than most Indian edtech explainers. |

**Could a competitor rebuild this in 3 months with LLMs?** The *bank* yes (it's synthetic). The *corpus misconception layer*, *verifier families* and *215 games* — no. That's the moat; the pitch should say so precisely and not lean on the bank.

---

## 6. BUSINESS LAYER — WHAT'S ABSENT

Everything a seed-stage diligence expects that does not exist today:

1. Live payment collection (Razorpay keys unset; plumbing complete; CTAs = waitlist)
2. Any enforced free/paid boundary (`require_premium` used by 0 product surfaces — free user gets 100%)
3. Real board-paper provenance (`year` NULL ×403,620)
4. External users (0 organic; DAU 1-13 = audit traffic)
5. Legal entity / CIN / GST / grievance officer; `/refund` + `/grievance` pages (404)
6. Named sub-processors in privacy — **student text reaches DeepSeek/Gemini/Groq when LLM mode is on** (currently `SOLVER_LLM_MODE=off` → ₹0 LLM spend)
7. Funnel instrumentation (signup → onboard → first_solve → d7); LLM cost telemetry rows (`solver_executions` = 0)
8. Domain + HTTPS (all canonical/OG = `localhost:3001`; SEO value zero); `assetlinks.json`; store listings
9. Referral / share / teacher-invite mechanics (B2B2C wedge has enrollment tables, no invite UX)
10. Langfuse/observability running (compose-defined, container not deployed)
11. Hindi solver coverage (content exists; 0/10 Hindi stems verified)
12. Functional i18n (379/379 keys translated, 7 files consume them)

**Pricing as drafted:** Free (c6-8 forever; c9-12 three missions/day) · Scholar ₹199/mo · Topper ₹399/mo. Honest, well-written page. Unit economics with LLM off ≈ ₹0 marginal per ask; if LLM fallback flips on, estimate ₹3-8 per 1,000 asks (DeepSeek-first chain) — labelled estimate.

**Competitive position (estimate):** Atlas wins on doubt honesty, teacher tools, junior coverage, offline; loses on Hindi reach, distribution, polish-at-scale, and *demonstrated* correctness. **Defensible wedge in one sentence:** *the only Indian platform where every doubt answer is either verifiably correct or honestly refused — "we will not lie to your child" — which incumbents cannot copy without rebuilding their AI stack.*

**The three "but…"s an investor will say:**
1. "Verified-wrong is 6.7% and your 'official' bank is synthetic — the trust claim overstates the substrate."
2. "No distribution engine: zero users, no referral loop, no school pipeline, SEO can't index localhost."
3. "Monetization is a waitlist — willingness-to-pay unproven; the free tier is the whole product."

---

## 7. PRODUCT DEFECTS — TOP 15 BY STUDENT IMPACT (Lane A, lead-reviewed)

1. Computed-wrong stamped VERIFIED (3/150) incl. fabricated check line — `battery.jsonl` m30/p21/a05
2. `VERIFIED_FROM_NODE` serving a different question's lesson (6/150)
3. `teach_loop.concept` wrong-subject binding (arithmetic → c12 history)
4. Fresh-signup onboarding: automation found no advancing CTA — **hand-repro required** (may strand new users)
5. Class-3 student sees `/learn/c12_*` recommended nodes on dashboard (wrong-class default)
6. Chapter-test steering absent: `difficulty: None`, no next-question adaptation
7. Chemistry = refusal wall (2/15 verified)
8. Hindi = 0 verified
9. c12 accountancy: 0 chapter-test chapters
10. 2 hard 90 s timeouts + 3/5 signups transiently failed under shard load
11. Bank `correct_answer` meta-text leak (c12 phy TEG row)
12. `/api/next-best`, `/api/practice/review`, `/api/engagement/weekly-digest` 404 (FE works → path drift; one grep)
13. Junior place-value wrong-grade diagram (C15 audit) — re-verify against current 215-game set
14. ~~Junior English 0 games~~ — **CLOSED** (31 English games live; Lane A reused stale audit text)
15. `/teacher` 404 (unlinked, minor)

---

## 8. ROADMAP — WHAT TO DO, IN WHAT ORDER

### Week 0 (this week) — stop the bleeding
- [ ] IDOR fix on `students/{id}/exams/history` + sibling routes; return 401 on the 5 guest-200 routes
- [ ] Private git remote; commit + push; off-host backup sync + one restore test
- [ ] `next` ≥ 14.2.10; fix 11 tsc errors; container mem/cpu limits
- [ ] Move preroute shards to the 02:00-05:00 window only (they are the reason login hit 12 s)

### Weeks 1-2 — make the trust claim true
- [ ] Strip fabricated "independent check" strings unless a check ran (one guard)
- [ ] Stem↔node similarity gate before `VERIFIED_FROM_NODE`
- [ ] Second-path/confidence floor on `DEP_SLM`, `NUMBER_COMPARE`, competency routes
- [ ] Fix `teach_loop.concept` to same-class same-subject binding
- [ ] Re-run the 150-stem novel battery; target **<1% verified-wrong** before any pitch. Make the battery a standing weekly gate.
- [ ] Relabel bank trust copy ("our authored question bank") OR begin real PYQ ingestion with `year`/paper provenance

### Weeks 2-4 — become launchable
- [ ] Domain + HTTPS → regenerate canonical/OG/sitemap; `assetlinks.json`
- [ ] Legal: entity, grievance officer, fill all `[PLACEHOLDER]`s, name LLM sub-processors, add `/refund` + `/grievance`
- [ ] Razorpay test-mode E2E; flip **one** real `require_premium` gate (c9-12 mission cap is already in the pricing copy)
- [ ] Funnel events table + signup→first-solve instrumentation; deploy langfuse
- [ ] Onboarding CTA hand-repro + fix; wrong-class recommendations filter by `class_level`
- [ ] Wire `useTranslations` into the 20 highest-traffic surfaces

### Months 2-3 — earn the first real users
- [ ] Teacher-invite flow (class code → student join) — the only realistic B2B2C wedge with existing machinery
- [ ] One real classroom pilot (20-50 students); measure d7/d30, doubt-ask rate, refusal rate as experienced
- [ ] Chemistry + commerce computed lanes; Hindi tokenization lane; c12 accountancy chapter banks
- [ ] Visible steering in chapter tests (difficulty metadata + next-question adaptation)
- [ ] Worker isolation / admission control → raise solver ceiling from ~30 to hundreds concurrent

---

## 9. WHAT TO PUT IN FRONT OF AN INVESTOR — AND WHAT NOT TO

**Lead with (true, measured, differentiated):**
- 24k authored corpus files with per-answer misconception diagnosis; 140 solver families with independent re-derivation; 215 junior games 215/215 verified; teacher remediation + stuck-student surfaces no competitor has; honest-refusal architecture (33% guided, 0 leaks); real DPDP machinery; distinctive design identity.

**Do not claim until fixed:**
- "Every answer verified" — currently 6.7% verified-wrong on novel stems.
- "Official board question bank" — 100% synthetic, no provenance.
- "Adaptive" — BKT is real, steering is not observable.
- "Hindi-first" — 0 Hindi stems verified; i18n not wired.
- Any user/traction number — there are none.

**The honest pitch line:** *"We built the hardest part first — a teaching engine that knows when it's wrong. We're pre-launch, pre-revenue, and the trust layer is at 93%; the next 90 days take it to 99% and put it in front of its first classroom."*

---

## 10. HOW THIS AUDIT WAS RUN (for diligence reproducibility)

- **Lane A** (`laneA/`): 5 fresh-signup Playwright journeys (c3/c6/c8/c10/c12), teacher + parent walkthroughs, 150 novel-stem solver battery with lead-judged verdicts, chapter-test matrix via authed API, DB cell counts, 12 deep corpus-node reads, 15 bank-row reads, 2 game reads, BKT before/after on 15 deliberate wrong answers, 12-screen premium-feel scoring.
- **Lane B** (`laneB/`): 384 static routes enumerated, 379 unauthenticated probes, two-account IDOR matrix, 30 SQLi/traversal probes, header dumps, `npm audit`, secrets grep, compose/backup/stats inspection, concurrency 5/20/50 load tests (stopped early where backends degraded), `tsc`, test-collection timing, PII schema dump.
- **Lane C** (`laneC/`): pricing/terms/privacy page dumps, `require_premium`/payments grep, `activity_logs` + `users` SQL, provenance SQL on `board_questions`, i18n key counts, payload byte measurements, knowledge-based competitive table (labelled estimate).
- **Lead** (`lead_facts.md`): LOC, route/solver/corpus counts, git state, infra inventory, current verification state (Reticle 10/10, verify-sweep 12/14, 215/215 junior, 135 wave98 tests).

Every number above traces to a file in the evidence root. Where coverage was incomplete it is stated in §4.
