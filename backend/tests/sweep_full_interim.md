# Full-Bank Verification Sweep -- Interim Report

- Generated: 2026-10-05 21:38:05
- Runner: `tests/sweep_full_runner.py` (sequential 1 worker, per-question timeout 12s, resumable, stratified (subject, class) round-robin order)
- Scope: ALL board_questions rows with question_text > 10 chars = 253,903 (full bank, not a sample)
- Progress: **1,884 rows done (0.74%)** (checkpoint offset 1,750, fp `21c81078cf8eb33c`)
- Raw findings: `D:\platform\runtime_data\ops\sweep2_findings.jsonl` (1,884 lines, one per row)
- Flag-respecting denominator: **1,682 live rows** (202 of 1,884 covered rows carry a `board_question_flags` reason and are reported separately below, outside every rate). The runner still executes flagged rows (fetch is unfiltered by design, checkpoint-stable); the TALLY, not the fetch, enforces the exclusion.
- Env posture: FREELLM_API_KEY/GEMINI_API_KEY = `POISONED-SENTINEL` + raising tripwires on both LLMClient.chat entrypoints; SEMANTIC_QA_LANE / SOLVER_LLM_MODE at production defaults; CBSE_DATA_DIR isolated (queue quarantined, question_bank.db copied)

## Overall classification (live rows only -- flag-respecting)

| class | n | % of live | meaning |
|---|---|---|---|
| EXACT_HIT | 887 | 52.7% | VERIFIED* and matches the stored key |
| SOFT_HIT | 317 | 18.8% | VERIFIED* but differs -- flag for review |
| VERIFIED_NOKEY | 0 | 0.0% | VERIFIED*, row has no stored key |
| GUIDED | 186 | 11.1% | honest guided/refusal tier |
| AMBIGUOUS | 0 | 0.0% | honest ambiguity refusal |
| SLOW_GUIDED | 278 | 16.5% | exceeded sweep timeout (12s) -- hard lane, honest ceiling marker, NOT an error |
| ERROR | 14 | 0.8% | crash / tripwire / DB -- the real bugs |
| REFUSED | 0 | 0.0% | other non-verified label (kept visible) |
| **live total (denominator)** | **1,682** | 100% | |
| template_class (excluded by flag) | 181 | 9.6% of covered | flag reason `template_row`: do-not-serve BY CONSTRUCTION (serving lanes exclude it); underlying sweep classes: SOFT_HIT=141, EXACT_HIT=16, GUIDED=15, SLOW_GUIDED=8, ERROR=1 |
| no_answer_key_class (excluded by flag) | 21 | 1.1% of covered | flag reason `no_answer_key`: do-not-serve BY CONSTRUCTION (serving lanes exclude it); underlying sweep classes: GUIDED=10, SLOW_GUIDED=9, VERIFIED_NOKEY=2 |
| **covered total** | **1,884** | | live 1,682 + excluded 202 |

**Headline (strict, live rows): VERIFIED = EXACT_HIT only = 887 (52.7% of 1,682 live).**  SOFT_HIT and VERIFIED_NOKEY are *not* counted as verified anywhere in this report -- they are open review items. Flagged by-construction rows (template_class (excluded by flag) 181, no_answer_key_class (excluded by flag) 21) sit outside every rate, and quoting any other number as the verified rate misrepresents the bank.

- Latency ms: p50 2478, p95 12099 (EXACT_HIT p50 566)
- Question types seen: short_answer=793, long_answer=625, fill_blank=189, true_false=51, is_matter=6, mcq_single=5, count_matter=4, classify_change=3, reversibility=2, numeric=2, fill_blank_type=1, identify_state=1

## Per-subject breakdown (live rows; excl = flagged rows excluded)

| subject | n | exact | exact% | soft | nokey | guided | ambig | slow | err | refused | excl | worst |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| hin_ks | 16 | 6 | 37.5% | 10 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | SOFT_HIT |
| hin_ga | 16 | 7 | 43.8% | 9 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | SOFT_HIT |
| hin_kr | 16 | 7 | 43.8% | 9 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | SOFT_HIT |
| hin_v | 27 | 8 | 29.6% | 9 | 0 | 2 | 0 | 8 | 0 | 0 | 5 | SOFT_HIT |
| eng_v | 16 | 4 | 25.0% | 4 | 0 | 3 | 0 | 5 | 0 | 0 | 0 | SLOW_GUIDED |
| chemistry | 14 | 6 | 42.9% | 5 | 0 | 1 | 0 | 1 | 1 | 0 | 3 | SOFT_HIT |
| eng_w | 15 | 6 | 40.0% | 5 | 0 | 1 | 0 | 3 | 0 | 0 | 1 | SOFT_HIT |
| hin_sp | 16 | 9 | 56.2% | 7 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | SOFT_HIT |
| history | 14 | 8 | 57.1% | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 2 | SOFT_HIT |
| eng_k | 16 | 6 | 37.5% | 3 | 0 | 2 | 0 | 5 | 0 | 0 | 0 | SLOW_GUIDED |
| ca | 14 | 4 | 28.6% | 1 | 0 | 2 | 0 | 6 | 1 | 0 | 3 | SLOW_GUIDED |
| eng_h | 13 | 6 | 46.2% | 3 | 0 | 1 | 0 | 3 | 0 | 0 | 3 | SOFT_HIT |
| biotech | 27 | 9 | 33.3% | 5 | 0 | 3 | 0 | 10 | 0 | 0 | 7 | SLOW_GUIDED |
| civics | 14 | 8 | 57.1% | 4 | 0 | 1 | 0 | 1 | 0 | 0 | 3 | SOFT_HIT |
| geography | 16 | 9 | 56.2% | 5 | 0 | 1 | 0 | 1 | 0 | 0 | 0 | SOFT_HIT |
| hin_al | 28 | 15 | 53.6% | 11 | 0 | 0 | 0 | 2 | 0 | 0 | 4 | SOFT_HIT |
| eng_f | 16 | 6 | 37.5% | 1 | 0 | 1 | 0 | 8 | 0 | 0 | 0 | SLOW_GUIDED |
| ip | 26 | 10 | 38.5% | 5 | 0 | 4 | 0 | 7 | 0 | 0 | 6 | SLOW_GUIDED |
| stat | 15 | 5 | 33.3% | 0 | 0 | 6 | 0 | 3 | 1 | 0 | 1 | GUIDED |
| english | 13 | 9 | 69.2% | 4 | 0 | 0 | 0 | 0 | 0 | 0 | 3 | SOFT_HIT |
| soc | 31 | 12 | 38.7% | 6 | 0 | 5 | 0 | 7 | 1 | 0 | 1 | SLOW_GUIDED |
| bs | 32 | 12 | 37.5% | 5 | 0 | 3 | 0 | 12 | 0 | 0 | 2 | SLOW_GUIDED |
| eng_s | 13 | 10 | 76.9% | 2 | 0 | 0 | 0 | 1 | 0 | 0 | 3 | SOFT_HIT |
| hin_a | 29 | 16 | 55.2% | 8 | 0 | 1 | 0 | 4 | 0 | 0 | 3 | SOFT_HIT |
| ps | 31 | 13 | 41.9% | 5 | 0 | 2 | 0 | 9 | 2 | 0 | 1 | SLOW_GUIDED |
| acc | 33 | 13 | 39.4% | 4 | 0 | 6 | 0 | 10 | 0 | 0 | 1 | SLOW_GUIDED |
| hs | 28 | 11 | 39.3% | 2 | 0 | 3 | 0 | 12 | 0 | 0 | 4 | SLOW_GUIDED |
| psy | 31 | 13 | 41.9% | 4 | 0 | 5 | 0 | 7 | 2 | 0 | 1 | SLOW_GUIDED |
| hin | 48 | 29 | 60.4% | 19 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | SOFT_HIT |
| hin_ar | 26 | 14 | 53.8% | 1 | 0 | 5 | 0 | 6 | 0 | 0 | 6 | SLOW_GUIDED |
| phy | 44 | 20 | 45.5% | 6 | 0 | 5 | 0 | 13 | 0 | 0 | 4 | SLOW_GUIDED |
| app | 34 | 20 | 58.8% | 4 | 0 | 5 | 0 | 5 | 0 | 0 | 0 | GUIDED |
| cs | 34 | 19 | 55.9% | 2 | 0 | 3 | 0 | 10 | 0 | 0 | 1 | SLOW_GUIDED |
| leg | 32 | 21 | 65.6% | 4 | 0 | 2 | 0 | 5 | 0 | 0 | 0 | SLOW_GUIDED |
| comp | 31 | 23 | 74.2% | 3 | 0 | 4 | 0 | 1 | 0 | 0 | 22 | GUIDED |
| physics | 57 | 31 | 54.4% | 10 | 0 | 9 | 0 | 7 | 0 | 0 | 7 | SOFT_HIT |
| engl | 63 | 35 | 55.6% | 10 | 0 | 13 | 0 | 5 | 0 | 0 | 1 | GUIDED |
| gram | 101 | 57 | 56.4% | 28 | 0 | 11 | 0 | 5 | 0 | 0 | 11 | SOFT_HIT |
| bio | 91 | 53 | 58.2% | 19 | 0 | 8 | 0 | 11 | 0 | 0 | 11 | SOFT_HIT |
| civ | 62 | 43 | 69.4% | 9 | 0 | 4 | 0 | 5 | 1 | 0 | 6 | SOFT_HIT |
| eco | 91 | 49 | 53.8% | 15 | 0 | 9 | 0 | 18 | 0 | 0 | 11 | SLOW_GUIDED |
| geo | 84 | 49 | 58.3% | 10 | 0 | 10 | 0 | 15 | 0 | 0 | 12 | SLOW_GUIDED |
| chem | 112 | 59 | 52.7% | 12 | 0 | 15 | 0 | 21 | 5 | 0 | 7 | SLOW_GUIDED |
| hist | 93 | 59 | 63.4% | 12 | 0 | 11 | 0 | 11 | 0 | 0 | 3 | SOFT_HIT |
| math | 103 | 58 | 56.3% | 11 | 0 | 19 | 0 | 15 | 0 | 0 | 9 | GUIDED |

## Subject x class exact-rate matrix (n / exact%)

| subject | c6 | c7 | c8 | c9 | c10 | c11 | c12 |
|---|---|---|---|---|---|---|---|
| acc | - | - | - | - | - | 16 / 68.8% | 17 / 11.8% |
| app | - | - | - | - | - | 17 / 58.8% | 17 / 58.8% |
| bio | - | 16 / 68.8% | 15 / 66.7% | 14 / 42.9% | 15 / 73.3% | 15 / 60.0% | 16 / 37.5% |
| biotech | - | - | - | - | - | 12 / 50.0% | 15 / 20.0% |
| bs | - | - | - | - | - | 16 / 43.8% | 16 / 31.2% |
| ca | - | - | - | - | - | - | 14 / 28.6% |
| chem | 17 / 70.6% | 17 / 76.5% | 17 / 64.7% | 14 / 50.0% | 16 / 43.8% | 14 / 21.4% | 17 / 35.3% |
| chemistry | 14 / 42.9% | - | - | - | - | - | - |
| civ | - | 15 / 66.7% | 17 / 70.6% | 15 / 86.7% | 15 / 53.3% | - | - |
| civics | 14 / 57.1% | - | - | - | - | - | - |
| comp | - | - | - | - | - | 16 / 75.0% | 15 / 73.3% |
| cs | - | - | 1 / 100.0% | - | - | 17 / 58.8% | 16 / 50.0% |
| eco | - | 14 / 71.4% | 14 / 42.9% | 17 / 58.8% | 14 / 57.1% | 17 / 52.9% | 15 / 40.0% |
| eng_f | - | - | - | - | - | - | 16 / 37.5% |
| eng_h | - | - | - | - | - | 13 / 46.2% | - |
| eng_k | - | - | - | - | - | - | 16 / 37.5% |
| eng_s | - | - | - | - | - | 13 / 76.9% | - |
| eng_v | - | - | - | - | - | - | 16 / 25.0% |
| eng_w | - | - | - | - | - | 15 / 40.0% | - |
| engl | - | 16 / 81.2% | 15 / 53.3% | 16 / 56.2% | 16 / 31.2% | - | - |
| english | 13 / 69.2% | - | - | - | - | - | - |
| geo | - | 16 / 81.2% | 12 / 25.0% | 13 / 76.9% | 16 / 56.2% | 14 / 71.4% | 13 / 30.8% |
| geography | 16 / 56.2% | - | - | - | - | - | - |
| gram | 16 / 62.5% | 16 / 56.2% | 15 / 66.7% | 15 / 26.7% | 13 / 53.8% | 11 / 54.5% | 15 / 73.3% |
| hin | 16 / 56.2% | 16 / 62.5% | 16 / 62.5% | - | - | - | - |
| hin_a | - | - | - | - | - | 16 / 50.0% | 13 / 61.5% |
| hin_al | - | - | - | - | - | 16 / 43.8% | 12 / 66.7% |
| hin_ar | - | - | - | - | - | 12 / 75.0% | 14 / 35.7% |
| hin_ga | - | - | - | 16 / 43.8% | - | - | - |
| hin_kr | - | - | - | - | 16 / 43.8% | - | - |
| hin_ks | - | - | - | - | 16 / 37.5% | - | - |
| hin_sp | - | - | - | - | 16 / 56.2% | - | - |
| hin_v | - | - | - | - | - | 13 / 46.2% | 14 / 14.3% |
| hist | - | 16 / 81.2% | 15 / 53.3% | 15 / 46.7% | 15 / 80.0% | 16 / 87.5% | 16 / 31.2% |
| history | 14 / 57.1% | - | - | - | - | - | - |
| hs | - | - | - | - | - | 12 / 50.0% | 16 / 31.2% |
| ip | - | - | - | - | - | 12 / 41.7% | 14 / 35.7% |
| leg | - | - | - | - | - | 16 / 68.8% | 16 / 62.5% |
| math | 14 / 42.9% | 14 / 71.4% | 15 / 66.7% | 15 / 33.3% | 16 / 62.5% | 13 / 46.2% | 16 / 68.8% |
| phy | - | - | - | - | 15 / 60.0% | 13 / 53.8% | 16 / 25.0% |
| physics | 14 / 50.0% | 14 / 71.4% | 16 / 62.5% | 13 / 30.8% | - | - | - |
| ps | - | - | - | - | - | 15 / 53.3% | 16 / 31.2% |
| psy | - | - | - | - | - | 15 / 66.7% | 16 / 18.8% |
| soc | - | - | - | - | - | 16 / 31.2% | 15 / 46.7% |
| stat | - | - | - | - | - | 15 / 33.3% | - |

## Errors (the real bugs)

By exception kind:

- 14x `THREAD_CAP`

First 40:

| subject | class | qtype | err | label |
|---|---|---|---|---|
| ps | 11 | fill_blank | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |
| ps | 12 | short_answer | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |
| psy | 11 | short_answer | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |
| psy | 12 | long_answer | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |
| soc | 11 | fill_blank | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |
| stat | 11 | short_answer | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |
| ca | 12 | long_answer | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |
| chem | 6 | identify_state | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |
| chem | 7 | short_answer | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |
| chem | 8 | true_false | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |
| chem | 11 | short_answer | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |
| chem | 12 | short_answer | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |
| chemistry | 6 | short_answer | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |
| civ | 8 | long_answer | `THREAD_CAP: too many lingering sweep threads -- row skipped` | ERROR |

## Review queue highlights

- SOFT_HIT (live rows): 317 total; worst subjects: gram (28), hin (19), bio (19), eco (15), chem (12), hist (12), math (11), hin_al (11)
- template_class (excluded by flag): 181 swept rows already sit OUTSIDE the rates above (flag `template_row`) -- generic extraction-template text stamped across thousands of nodes, each keyed to a different answer, so they SOFT_HIT by construction and can never serve honestly.
- SLOW_GUIDED (>12s): 278; worst: chem (21), eco (18), geo (15), math (15), phy (13), hs (12), bs (12), bio (11)

## Flag-excluded rows (do-not-serve by construction)

- `board_question_flags` total: 18,507 -- `template_row`=15,400, `no_answer_key`=3,107
- Covered rows excluded by flag: **202** of 1,884 (10.7%) -- reported as template_class (excluded by flag) (181) / no_answer_key_class (excluded by flag) (21).
- Their engine results were still honest work (SOFT_HIT=141, GUIDED=25, SLOW_GUIDED=17, EXACT_HIT=16, VERIFIED_NOKEY=2, ERROR=1) -- but no excluded row appears in any rate, denominator or headline in this report.

## ZERO-LLM proof (sweep scale)

Proof not completed yet (no `sweep2_llmproof_result.json`).

## How to continue the sweep

```
cd D:\platform\deploy\backend
python tests\sweep_full_runner.py --resume          # keep going
python tests\sweep_full_runner.py --resume --report  # refresh report
```
