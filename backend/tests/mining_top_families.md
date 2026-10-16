# Synthesis-Mining PRE-RUN — top miss families (BUILD_ORDER Phase 6, line 1)

Generated: 2026-10-05 10:33:37

## Data snapshot (PARTIAL — sweep still running)

- `sweep2_findings.jsonl`: **1541 rows** read (0.61% of the 253,456-row bank) — full-bank sweep in progress, stratified order.
- Live miss queue `runtime_data/answer_queue.jsonl`: **874** rows (real student-facing misses).
- Sweep's own miss queue (sweep2_datadir): **340** rows (refusal reasons).
- `answer_telemetry.jsonl`: **810** rows.

> **Honest note:** this is the PRE-test ranking mined from the partial sweep + live telemetry. The 14-day test will produce the real student miss-queue and **will re-rank these families**; treat this as a candidate seed list, not a final priority.

## Sweep class distribution (snapshot)

| class | rows |
|---|---|
| EXACT_HIT | 751 |
| SOFT_HIT | 361 |
| VERIFIED_NOKEY | 1 |
| GUIDED | 211 |
| SLOW_GUIDED | 211 |
| ERROR | 6 |

## TOP-5 SYNTHESIS PICKS (volume x feasibility)

True-miss families only (GUIDED/TIMEOUT/ERROR rows dominate the cluster); numeric-computable shapes rank above fuzzy prose; SOFT_HIT-only clusters and cross-subject bank templates are excluded (key-alignment review work, not synthesis work).

| pick | family | miss | feas | why it misses | example |
|---|---|---|---|---|---|
| **1** | Applied Maths: point/determine/justify [<INT>x6] | 3 | 6 | GUIDED with no recorded reason; question carries numeric slots — likely a missing canonica | Determine whether the equation 2x² + 2y² - 8x + 12y + 26 = 0 represents a real c |
| **2** | English: common/lesson/mix [no-numeric-slots] | 6 | 2 | VERIFIED but served text differs from the stored key beyond normalization — answer-form/ke | What common mix-up does this lesson flag about In poetry, supporting characters? |
| **3** | Physics: places/needed/decimal [<INT>x3] | 2 | 5 | modeling layer has no canonical structure rule for this pattern — new family rule needed | Using the formula P = V×I from this topic, calculate P when I = 10, V = 13. Give |
| **4** | Commercial Applications: tenure/emis/loan [<CUR>+<INT>x2+<PCT>+<UNIT:month>+<UNIT:year>] | 2 | 3 | modeling layer has no canonical structure rule for this pattern — new family rule needed | A biotech startup secures a term loan of ₹ 45,00,000 to purchase PCR‑sequencing  |
| **5** | Grammar: countable/uncountable/plural [<INT>x3] | 2 | 3 | refusal reason: multi-hop question; per-hop verdicts below | Fill in the blank: The ______: (1) specific/shared → the; (2) new + singular cou |

## Top 15 families by miss volume (all non-EXACT_HIT rows)

| rank | family | subject | class | miss_count | share | why_it_misses | example_question |
|---|---|---|---|---|---|---|---|
| 1 | CROSS-SUBJECT BANK TEMPLATE (14 subjects): "What must you be able to do to master this topic?" | Multi-subject | 6-12 | 85 | 10.8% | generic template row: the question text is topic-independent while the stored key is topic-specific  | What must you be able to do to master this topic? |
| 2 | Hindi: conflict/sentence/literal [<INT>] | Hindi | 7-11 | 11 | 1.4% | VERIFIED but served text differs from the stored key beyond normalization — answer-form/key mismatch | पाठ 6 में एक प्रसंग है जहां पात्र कहता है: "मैंने उसे माफ़ नहीं किया, मैंने स्वयं को मुक्त किया।" इस कथन में विरोधाभास… |
| 3 | Applied Maths: point/determine/justify [<INT>x6] | Applied Maths | 11-11 | 3 | 0.4% | GUIDED with no recorded reason; question carries numeric slots — likely a missing canonical-structur | Determine whether the equation 2x² + 2y² - 8x + 12y + 26 = 0 represents a real circle, a point circle, or no real… |
| 4 | English: common/lesson/mix [no-numeric-slots] | English | 6-12 | 6 | 0.8% | VERIFIED but served text differs from the stored key beyond normalization — answer-form/key mismatch | What common mix-up does this lesson flag about In poetry, supporting characters? |
| 5 | Physics: places/needed/decimal [<INT>x3] | Physics | 9-10 | 2 | 0.3% | modeling layer has no canonical structure rule for this pattern — new family rule needed | Using the formula P = V×I from this topic, calculate P when I = 10, V = 13. Give your answer up to 2 decimal places if… |
| 6 | Economics: lesson/definition/markets [no-numeric-slots] | Economics | 6-10 | 4 | 0.5% | VERIFIED but served text differs from the stored key beyond normalization — answer-form/key mismatch | What is Informal credit dependence? State the definition given in this lesson. |
| 7 | Commercial Applications: tenure/emis/loan [<CUR>+<INT>x2+<PCT>+<UNIT:month>+<UNIT:year>] | Commercial Applications | 12-12 | 2 | 0.3% | modeling layer has no canonical structure rule for this pattern — new family rule needed | A biotech startup secures a term loan of ₹ 45,00,000 to purchase PCR‑sequencing equipment. The loan carries a fixed… |
| 8 | Grammar: countable/uncountable/plural [<INT>x3] | Grammar | 9-9 | 2 | 0.3% | refusal reason: multi-hop question; per-hop verdicts below | Fill in the blank: The ______: (1) specific/shared → the; (2) new + singular countable → a/an by sound; (3)… |
| 9 | Biology: lesson/definition/determination [no-numeric-slots] | Biology | 9-10 | 2 | 0.3% | GUIDED with no recorded reason; prose/conceptual shape — likely outside deterministic scope | What is Sex determination in humans? State the definition given in this lesson. |
| 10 | Chemistry: lesson/definition/matter [no-numeric-slots] | Chemistry | 6-10 | 2 | 0.3% | VERIFIED but served text differs from the stored key beyond normalization — answer-form/key mismatch | What is Matter? State the definition given in this lesson. |
| 11 | Civics: common/lesson/mix [no-numeric-slots] | Civics | 6-7 | 2 | 0.3% | GUIDED with no recorded reason; prose/conceptual shape — likely outside deterministic scope | What common mix-up does this lesson flag about Dictatorship? |
| 12 | English: filing/report/uses [no-numeric-slots] | English | 12-12 | 2 | 0.3% | answer() exceeded the 12s sweep budget (production allows 60s) — heavy lane; often solvable, needs p | A university research project compares Asokamitran’s description of the clipping desk at Gemini Studios (manual filing… |
| 13 | Geography: common/lesson/mix [no-numeric-slots] | Geography | 8-8 | 2 | 0.3% | GUIDED with no recorded reason; prose/conceptual shape — likely outside deterministic scope | What common mix-up does this lesson flag about Sustainable use of natural resources? |
| 14 | Grammar: common/lesson/mix [no-numeric-slots] | Grammar | 10-11 | 2 | 0.3% | GUIDED with no recorded reason; prose/conceptual shape — likely outside deterministic scope | What common mix-up does this lesson flag about Reported questions lose their question grammar? |
| 15 | Grammar: reached/earlier/station [no-numeric-slots] | Grammar | 7-7 | 2 | 0.3% | refusal reason: Narrative needs reading support; method shown | Fill in the blank: Past ______ is the earlier-past: 'When I reached the station, the train HAD LEFT' — two past events… |

## Live miss-queue corroboration (answer_queue.jsonl, real platform traffic)

| count | distinct questions | keywords | example | top refusal reason |
|---|---|---|---|---|
| 134 | 1 | color tuesday smell | Explain the color of the smell of Tuesday. | Needs variable binding (Lane C) or is not computational |
| 10 | 1 | consecutive composition two | Assuming the sample composition does not change, what is the probability of obtaining two consecutive clicks? |  |
| 9 | 1 | four capacitors determine | Determine how many identical series strings (each of four capacitors) must be connected in parallel to meet the energy… |  |
| 8 | 3 | meaning goodwill affect | Explain the meaning of goodwill | Needs variable binding (Lane C) or is not computational |
| 8 | 2 | average travels car | A car travels 150 km in 2 hours, then 50 km in 1 hour. What is its average speed? | multi-hop question; per-hop verdicts below |
| 8 | 2 | blank imagine fill | Fill in the blank: Imagine a ______ firm where a partner dies on 15th August. | Needs variable binding (Lane C) or is not computational |
| 8 | 2 | india partners cross | "GlobalLogix LLP" is a India-Singapore cross-border partnership with partners: Rohan (India, 50%), Wei (Singapore… | the fallback model ignores stated values of the question (data-coverage guard), so no veri |
| 8 | 1 | lift analyze reads | A participant's testimonial reads: "After the first week, I felt the curtain of life lift as I kicked across the pond."… |  |
| 8 | 1 | lakhs builds operates | OrionSat Ltd., an Indian startup that builds and operates low‑earth‑observation satellites, closed its financial year… | multi-hop question; per-hop verdicts below |
| 8 | 1 | psychological documentary alter | Synthesize: If the documentary were to insert a voice-over from a gerontologist explaining "aging anxiety"… | Needs variable binding (Lane C) or is not computational |
| 7 | 1 | curve parabola greater | Determine which curve (parabola or line) is right-most (greater x) in the interval [-1,3]. |  |
| 7 | 1 | late horses change | If the Portuguese had supplied Bijapur with 500 additional war-horses in late 1564, estimate the change in Bijapur's… |  |

## answer_telemetry summary

- rows: 810, llm_used rows: 124
- labels: DETERMINISTIC=426, GUIDED_PRACTICE=140, RUBRIC_KEYWORD=122, VERIFIED=76, VERIFIED_OFFICIAL=45, VERIFIED_SEMANTIC=1
- practice correct=false by subject: history=127, maths=23, civics=8, biology=7, physics=7, accountancy=5, chemistry=4, computer_science=3
- top refusal reasons:
  - 58x This question needs a different approach — let me help you work through it step by step
  - 48x No canonical structure matched and no algebraic path exists from extracted knowns to a target. The modeling…
  - 16x Narrative needs reading support; method shown
  - 7x multi-part question; per-part verdicts below
  - 4x No verified formal solution path
  - 3x multi-hop question; per-hop verdicts below

## Caveats

- Snapshot is partial (1541 of 253,456 rows); the stratified order means all 47 subject x class groups are already represented, but small subjects are under-sampled until the sweep finishes.
- GUIDED findings rows carry no refusal_reason; hypotheses were joined from the two answer_queue files by normalized question text — unmatched rows fall back to shape-based inference.
- Cross-subject bank template: the generic mastery-criteria row ("What must you be able to do to master this topic?") appears **8042** times in board_questions — every occurrence will SOFT_HIT (generic text, topic-specific key). That is a bank-row/key-alignment issue, deliberately NOT a synthesis pick.
- Subject-code mapping reuses build_corpus._SUBJECT_NORM plus `gram`→Grammar and `ca`→Commercial Applications (CAS-style accounting-software content — best-effort identification).
- Clustering threshold Jaccard >= 0.30 on skeleton token sets; singleton misses are not counted as families.
