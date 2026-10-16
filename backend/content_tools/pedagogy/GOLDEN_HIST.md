# GOLDEN_HIST.md — the humanities honest-refusal contract

*Owner: GOLDEN-HIST batch, 2026-10-06. Evidence: `tests/test_hist_e2e_golden.py`
(one-subject end-to-end golden path for history, CBSE classes 9-10), modeled on
`tests/physics_e2e_golden.py`.*

Humanities questions mostly cannot be auto-graded deterministically. The
platform's contract is therefore **honesty, not coverage**: the deterministic
solver only ever speaks when it can PROVE the answer from the taught corpus,
and refuses — openly withholding the answer — when it cannot. The one
unforgivable failure is a **VERIFIED-wrong** on a factual question. This
document states exactly which question types the engine grades, which it must
refuse, and which grading path handles what the engine refuses.

---

## 1. The truth-label contract (answer_pipeline.py)

Every student-facing answer comes through `its/solver/answer_pipeline.answer()`
and carries exactly one of these labels — never styled otherwise:

| Label | Meaning | Humanities role |
|---|---|---|
| `VERIFIED` | deterministic proof, no unstated assumptions | only for closed-world facts (dates, intervals, orderings) |
| `VERIFIED_WITH_ASSUMPTIONS` | deterministic, chain used domain defaults | rare in humanities |
| `VERIFIED_OFFICIAL` | graded against a Board/escrowed bank key | keyed MCQ/true-false/fill-blank items |
| `AMBIGUOUS` | >1 reading survived | Socratic confirm data attached |
| `GUIDED_PRACTICE` | method/steps only; **answer withheld** | the honest refusal for essays, why-questions, source analysis |

A refusal is a *good* outcome. A wrong answer wearing a verified label is the
failure mode the whole architecture exists to prevent — for humanities even
more than for physics, because a confidently wrong date teaches a false fact.

## 2. What the deterministic engine CAN grade (the SPEAKS list)

All families live in `its/solver/socsci_families.py` (dispatched from
`modeling_layer`); every family is closed-world over the authored corpus
(`enhanced_nodes_md` / `cisce_nodes_v2`) and never invents a date, name, or
figure outside its table. Every matched answer carries the 5-beat step
contract (Method / Given / Computation / Check / Interpretation).

| Family | Question shape | Example → answer |
|---|---|---|
| `EVENT_YEAR` | direct year recall over the corpus event table (59 rows, 868-1950) | "In which year did the French Revolution begin?" → VERIFIED 1789; "When was the Jallianwala Bagh massacre?" → VERIFIED 1919; "In which year was the Poona Pact signed?" → VERIFIED 1932 |
| `CHRONO_INTERVAL` | duration of a dated movement; gap between two events ("between", "apart", "after", "how long") | "How long did the Non-Cooperation Movement last?" → VERIFIED 2 years; 1857 → 1947 gap → VERIFIED 90 years; "How many years apart were the Congress of Vienna and the Revolutions of 1848?" → VERIFIED 33 |
| `CENTURY_DECADE` | century/decade placement of a dated event | "1789 falls in which century?" → VERIFIED 18th |
| `TIMELINE_ORDER` | arrange events chronologically; **strict**: a listed item the table does not know declines the whole stem (no subset-ordering that silently drops one of the question's events) | Quit India / 1857 / Dandi → VERIFIED ordered chain; Russian Revolution + Quit India + 1857 → honest refusal |
| geography/civics numeric families | timezone, map scale, density, vital stats, FPTP/coalition arithmetic | same closed-world rule |

Guardrails baked into `EVENT_YEAR` (the family added with this batch):

- **Closed world, executable.** An event not in the corpus `_EVENTS`
  table → declined (`GUIDED_PRACTICE`), never guessed. "In which year did
  the Russian Revolution begin?" refuses honestly. The closed world is
  *enforced by test*: `its/tests/test_socsci_families.py` walks the whole
  dual corpus (`enhanced_nodes_md` + `cisce_nodes_v2`) and fails any
  `_EVENTS` row that cannot anchor itself to a corpus file carrying both
  one of its aliases and one of its span years — a row with no corpus
  anchor is a hallucination vector and fails the run.
- **No contradiction with the stem.** A question embedding a year outside the
  event's span (trick/choice phrasing: "1776 or 1789?") → declined.
- **Span awareness.** Begin/launch questions anchor to the start year; end
  questions to the end year; a spanned movement's answer states its full span
  ("began in 1920 (ran until 1922)").
- **Collision-proof aliases.** Sibling corpus facts get separate rows and
  narrow aliases: Gutenberg's press (1448) vs India's first press (1556,
  Goa); Hicky's *Bengal Gazette* (1780, private) vs Gangakishore
  Bhattacharya's *Bengal Gazette* (1816); Bombay's first cotton mill (1854)
  vs Ahmedabad's first mill (1861). Bare "printing press"/"bengal gazette"
  aliases are banned by test.

**Wave-2 corpus expansion (2026-10-06, files-only, Postgres-down).** The
table grew from 19 rows to **59 rows (40 new)**, every row mined out of the
c10_hist corpus and anchored in place: Nationalism in Europe (Napoleonic
Code 1804, Congress of Vienna 1815, Revolutions of 1848, unification of
Italy 1861, unification of Germany 1871), Nationalism in India (Swadeshi
1905, Surat Split 1907, Morley-Minto 1909, Defence of India Act 1915, Home
Rule Leagues 1916, Montagu Declaration 1917, Khilafat 1919-24, Chauri
Chaura 1922, Simon Commission 1927, Nehru Report 1928, Jinnah's Fourteen
Points 1929, Gandhi-Irwin Pact 1931, Karachi Resolution 1931, Communal
Award and Poona Pact 1932), Making of a Global World (Plassey 1757, Diwani
grant 1765, Inland Emigration Act 1859, Suez Canal 1869, Great Depression
1929-34, Bretton Woods 1944), Age of Industrialisation (spinning jenny
1764, water frame 1769, Cromford Mill 1771, power loom 1785, Bombay's
first mill 1854, TISCO 1907), Print Culture (Diamond Sutra 868, Gutenberg
press 1448, Gutenberg Bible 1455, Luther's 95 Theses 1517, first press in
India 1556, Hicky's Bengal Gazette 1780, Vernacular Press Act 1878, Salt
Act 1882). Answer phrasing now matches the entity: acts/pacts/presses
"date to" their year; movements "began"/"ended".

## 3. What must be REFUSED honestly (the WITHHELD list)

Verified by station 3 of the golden test — every probe returns
`GUIDED_PRACTICE` with `answer=None`:

| Question type | Example | Why refused | Where it is graded instead |
|---|---|---|---|
| why / causal explanation (off-bank) | "Why did the Third Estate form the National Assembly?" (not a bank item) | causal prose has no deterministic key; any "verified" essay grade would be an LLM judgement wearing a false badge | teacher rubric / self-assessed model answer (the node's `DIAGNOSTIC_ANSWER_*` sections), or future LLM lane behind an honest label |
| essay / describe / discuss | "Describe the impact of the French Revolution on France." | open-ended; marks depend on argument quality | teacher / model-answer comparison |
| source analysis | "Given a source: 'sovereignty resides in the nation…' identify the principle" | needs reading comprehension over unseen text | teacher / LLM lane |
| open name recall | "Who wrote the book 'Hind Swaraj'?" | **content gap, documented**: no curated people/books table exists. The honest engine refuses rather than recall-guesses. `CONTENT GAP — PEOPLE/BOOKS TABLE` (a closed-world author/figure table would upgrade these to VERIFIED exactly like EVENT_YEAR; parked until an owner go) | bank key match when the item is served from `board_questions` (the row carries `correct_answer`) |
| dates outside the corpus table | "When did the Second World War end?" / "When did Hitler come to power?" | closed-world rule (the corpus carries no dated WWII/Nazi-era anchor — see gaps, §6) | same as above |

(Former refusal example "When did the Great Depression start?" **graduated
to VERIFIED** in wave 2: the corpus dates it (1929, Wall Street Crash;
onset-and-spread 1929-1934), so the event now anchors `EVENT_YEAR` +
`CHRONO_INTERVAL` instead of refusing.)

The refusal ships with `refusal_reason` ("This question needs a different
approach — let me help you work through it step by step") and guided
method steps — the tutor never dead-ends, it just never pretends to know.

**The bank-key exception (Lane D).** When the *exact* item exists in
`board_questions` with an authored key, the pipeline serves/grades it as
`VERIFIED_OFFICIAL` — deterministic, anchored to the Board's official key,
never the engine's own opinion. The golden run's matrix hit this twice:
banked year items ("…1852", "Congress of Berlin (1878)") and one banked
why-item graded against its model answer. That is a different lane doing a
different job: key match, not free-text proof. Off-bank open questions
always refuse.

## 4. Where the rest of the grading actually happens

The solver's honesty lane is one of three grading paths:

1. **Bank keys (deterministic).** `board_questions` rows carry
   `correct_answer`; MCQ / true-false / fill-blank items are graded by exact
   key match when served (Lane D / `VERIFIED_OFFICIAL` when the item has an
   escrowed key). History bank today: **778 rows c9, 873 rows c10**
   (`subject='hist'`; short_answer 454/531, long_answer 233/227,
   fill_blank 74/97, true_false 17/18).
2. **The deterministic solver (this contract).** Closed-world facts →
   `VERIFIED`; everything else → honest `GUIDED_PRACTICE`.
3. **Human grading.** Essays, source analysis, open explanation — teacher
   rubric against the node's authored model answers.

The golden run's grading matrix (station 3d) replays 8 real `board_questions`
history rows through the engine and records each verdict as exactly
SOLVE / REFUSE / WRONG. **Any WRONG (a VERIFIED answer contradicting the
row's deterministic key) fails the run.** The bar to hold:
**zero VERIFIED-wrong on factual history questions.**

**The defect the matrix caught (2026-10-06, fixed in the same batch).** The
first full runs FAILED on a c9 true_false row ("governance affects society is
a one-way top-down process…" — bank key `False`): the answer pipeline's
neurolink concept pre-route did a bank probe with
`question_text ILIKE '%true%or%false%' LIMIT 1` — no order, no identity
check — so a generic T/F prefix matched an ARBITRARY twin (a class-8 maths
row, key `True`), and the foreign key shipped as VERIFIED. Nondeterministic
across runs (the plan picks the row). Fix in `its/solver/neurolink.py`: a
bank match now ships only as a SAME-ITEM match — exact `norm_text` equality
first, then a near-identical-wording fallback (ratio ≥ 0.92); same-prefix
twins fall through to the honest lanes. Verified: the history T/F now grades
`False` (its own key), an absent T/F refuses honestly, and genuine concept
queries still resolve. This is the honest-refusal contract working as
designed: the golden path caught a lane that could break it, and the gate
was closed rather than the test relaxed.

## 5. Session plumbing proven by the golden path

- **Learnpath:** `get_path(9/10, "history", <1..5>)` now serves authored
  chapter paths (34 history files in `_cache/learnpaths/`, classes 6-10;
  c9 corpus stems are `c9_hist_ch*`, c10 are `c10_hist_cbse_*` — both parse).
  `next_lesson` gating orders and unlocks correctly.
- **Batch selector:** `select_batch(subject="history", class_level=9/10)`
  serves subject-pure history sessions (every `node_id` is a
  `c9_hist_*`/`c10_hist_*` node; chapter-gated sessions can never stray
  across subjects per the C10-audit guard).
- **Socratic remediation:** `cause_effect_swap` is catalogued for history
  (classes 6-12); `build_sequence` produces elicit → isolate → retry →
  handoff with the answer keys kept server-side, and
  `grade_move("Heavy rain fell, so the match was cancelled" → "the match was
  cancelled")` grades the EFFECT correctly while the cause-as-effect answer
  grades wrong.
- **BKT / SM-2 / XP** behave identically for a history node as for physics
  (mastery up on correct, down on wrong; review scheduled; XP exactly-once).

## 6. Known content gaps (documented, parked — do not fix without an owner go)

1. **PEOPLE/BOOKS table** — closed-world author/figure recall ("Who wrote
   Hind Swaraj?", "Who was the king of France in 1789?") currently refuses
   honestly. Upgrading is a `socsci_families` table + aliases change, same
   pattern as `_EVENTS`.
2. **c9 modern-history corpus does not exist** — the c9 CBSE history
   corpus (`c9_hist_ch1..5`, 45 files) is ancient/medieval India (early
   humans, Vedic India, Delhi Sultanate, Harappan trade). The NCERT
   "India and the Contemporary World I" chapters (French Revolution,
   Socialism in Europe, Nazism and Hitler) are NOT in the corpus — a full
   grep for `bolshevik|lenin|hitler|nazi` across `c9_hist_*` returns
   nothing. The French Revolution itself anchors from the c10 ch01 files,
   which teach it as the origin of European nationalism. Consequence:
   **Russian Revolution 1917, WWII 1939-45 and Hitler's rise cannot enter
   `_EVENTS` without inventing dates the corpus does not carry** — they
   refuse honestly and stay parked until the c9 modern chapters are
   authored (an `atlas-content` job, not a solver job).
3. **Bank-quality** — a minority of `hist` fill_blank rows are
   mastery-criteria text mined as questions ("The student can compare…" with
   a year key); the selector's template-row filter already excludes these
   from subject-wide sessions.

## 6a. Per-class coverage of the deterministic history lane (wave 2)

`_EVENTS` rows by the class band that teaches them (corpus evidence file
families in parentheses):

| Class band | `_EVENTS` coverage | Typical graded shapes |
|---|---|---|
| c6-c8 (CBSE + ICSE junior) | Plassey 1757, Revolt of 1857, INC 1885, Partition of Bengal 1905 (`c6_history_ch10_*`, `c8_hist_ch*`, ICSE nodes) | EVENT_YEAR, TIMELINE, CENTURY |
| c9 (CBSE) | Constitution adopted 1949 / in force 1950 (`c9_civ_ch1_3`); medieval dates remain out of the numeric lane (closed world: no curated table yet) | EVENT_YEAR (civics-dated) |
| c10 ch01 Nationalism in Europe | French Revolution 1789, Napoleonic Code 1804, Vienna 1815, Revolutions of 1848, Italy 1861, Germany 1871 | EVENT_YEAR, CHRONO, TIMELINE |
| c10 ch02 Nationalism in India | WWI 1914-18, Defence of India Act 1915, Lucknow Pact 1916, Home Rule 1916, Champaran 1917, Montagu 1917, Rowlatt/Jallianwala 1919, Khilafat 1919-24, Non-Cooperation 1920-22, Chauri Chaura 1922, Simon 1927, Nehru Report 1928, Lahore 1929, Jinnah's Points 1929, Dandi 1930, CDM 1930-34, Gandhi-Irwin 1931, Karachi 1931, Communal Award/Poona Pact 1932, GoI Act 1935, Quit India 1942 | EVENT_YEAR, CHRONO, TIMELINE |
| c10 ch03 Making of a Global World | Diwani 1765, Inland Emigration Act 1859, Suez Canal 1869, Great Depression 1929-34, Bretton Woods 1944, UN Charter 1945 | EVENT_YEAR, CHRONO |
| c10 ch04 Age of Industrialisation | spinning jenny 1764, water frame 1769, Cromford Mill 1771, power loom 1785, Bombay mill 1854, TISCO 1907 | EVENT_YEAR |
| c10 ch05 Print Culture | Diamond Sutra 868, Gutenberg press 1448, Gutenberg Bible 1455, Luther 1517, Goa press 1556, Hicky 1780, Vernacular Press Act 1878, Salt Act 1882 | EVENT_YEAR, TIMELINE |
| c11-c12 (civics/legal/ps) | UN Charter 1945, seat-share/majority/coalition arithmetic | EVENT_YEAR + civics families |

Wave-2 class-10 bank depth (board_questions is mined from these sections
by `tools/extract_node_questions.py`): **13 curated year-recall
diagnostic pairs** appended across 12 `c10_hist_cbse_*` files (Lucknow
1916, Montagu 1917, Jallianwala 1919, Non-Cooperation 1920, Chauri Chaura
1922, Poona Pact 1932, Napoleonic Code 1804, Kingdom of Italy 1861,
German unification 1871, Suez Canal 1869, Great Depression 1929, textile
inventions 1764/1769/1785, Luther 1517) — each with a wrong-answer
diagnostic in the corpus house style, each parsed and validated against
the loader's own section regex (45/45 files contiguous, 493 Q/A pairs,
0 mismatches). Two corpus date-errors fixed in `c10_hist_cbse_05_006.md`:
the "Battle of Plassey (1765)" typo (Plassey is 1757; the 1765 event is
the Diwani grant) and the "official government newspaper" conflation of
Hicky's private *Bengal Gazette* with the Company press's output
(contradicted node 05_007's own answer key).

## 7. Running the golden path

```
cd deploy/backend
DATABASE_URL="postgresql+asyncpg://..." PYTHONPATH=. SOLVER_LLM_MODE=off \
  python tests/test_hist_e2e_golden.py
```

Exit 0 = shippable. Stations: 1 learnpath (c9+c10) · 2 batch purity ·
3 grading matrix (3a/3b verified dates, 3c honest refusals, 3d 8-row
SOLVE/REFUSE/WRONG replay) · 4 socratic cause_effect_swap · 5 BKT · 6 SM-2 ·
7 XP. Cleanup removes the test students by `user_id`.

**Offline companion (no Postgres needed)** — the closed-world law as an
always-runnable battery (table invariants, corpus anchoring of every
`_EVENTS` row, year-recall/interval/timeline behaviour, honest refusals,
5-beat step contract):

```
cd deploy/backend
python -m pytest its/tests/test_socsci_families.py -q
```

**Wave-2 acceptance (2026-10-06, files-only, Postgres down):**
`test_socsci_families.py` **54/54 pass** (includes the full-corpus anchor
walk over 23,700 files). The DB-backed e2e (both stations that need
Postgres) is parked until the next DB-up window; its deterministic
stations are covered offline by the battery above, and the 13 curated
bank pairs land as `board_questions` rows on the next
`extract_node_questions` load. Solver file changes are
`deploy/backend/its/solver/socsci_families.py` (no wiring changes —
`model_socsci` is already registered); corpus changes under
`deploy/content/enhanced_nodes_md/` are bind-mounted and visible to the
backends without a rebuild.

**Final acceptance run (2026-10-06, wave 1): 17/17 stations pass, exit 0.**
Matrix verdicts: 6 SOLVE (5 bank-key `VERIFIED_OFFICIAL` — 1852, Berlin
1878, Puranas, Roman-trade why-item, one true_false — plus 1 solver
`VERIFIED` false matching its key), 2 honest REFUSE (GUIDED_PRACTICE,
answer withheld), **0 WRONG**. Date-recall probes: French Revolution →
VERIFIED 1789; Jallianwala Bagh → VERIFIED 1919. Open humanities
(name/why/essay): all honest refusals, `answer=None`.
Post-run DB audit: 0 orphaned test users / mastery / review / reward rows.
