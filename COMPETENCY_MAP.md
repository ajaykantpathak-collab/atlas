# COMPETENCY ENGINE MAP -- quick reference

## WHERE THINGS LIVE

| What | Where |
|---|---|
| Routers + engines (the brain) | `backend\its\solver\` |
| Competency catalogs (what routes where) | `backend\its\competency\catalog_*.json` (602 concepts) |
| Catalogs awaiting review | `backend\its\competency\staging\` |
| Catalogs awaiting salvage | `backend\its\competency\staging\gatefail\` |
| Bulk generator (Gemini drafter) | `backend\tools\bulk_catalog_generator.py` |
| Key miner + fingerprint matcher | `backend\tools\mine_keys.py`, `build_key_fingerprints.py` |
| NCERT book miner | `backend\tools\mine_ncert.py` |
| Scoreboards (the truth) | `backend\tools\competency_scoreboard.py`, `competency90_benchmark.py` |
| Question bank (58.7k questions) | `cbse_data\question_bank.db` |
| Roadmaps | `PENDING.md`, `BUILD_STATUS.md` |

## HOW IT SOLVES A QUESTION

1. NORMALIZE  wording variants -> canonical (S0)
2. ROUTE      concept match via keyword overrides + embeddings (S1)
3. EXTRACT    question -> slots for that concept (S2)
4. VALIDATE   verbatim audit, units, plausibility, uniqueness (S3)
5. EXECUTE    family / slot-schema / catalog steps / CAS kernel (S4)
6. LABEL      VERIFIED / VERIFIED-OFFICIAL (board key) / SOCRATIC /
              GUIDED with the NCERT method. Never wrong. (S5)

## DONE (all measured)

- Solver: 38 families, 17 slot-schemas, kernel + symbolic channel,
  multi-part splitter, MCQ gate, validator stack. 1,094 tests green.
- Keys: 3,180 mined (95-100% precision), fingerprint matcher LIVE --
  conceptual MCQs answer VERIFIED-OFFICIAL wherever a key exists.
- Catalogs: 178 live / 237 staged / 39 in salvage -- Class 6-12 maths,
  sciences, commerce, social science. ~850 concepts.
- NCERT: all 1,604 chapters discovered; 16.4k book questions mined.
- Data proved the gates work: 3 fake verifications killed, 14 invented
  catalogs deleted, 4 wrong-answer generator classes caught at review.

## LEFT (in order)

1. Gemini wave finishing: ~80 social-science/commerce chapters
   (auto-resumes every 3h on schedule; quota resets nightly).
2. Review+promote the 237 staged (2 reviewer agents finish this).
3. Re-run scoreboards on the full router -> the honest coverage number.
4. Executors for the new-book experiential concepts (56 slot-gaps).
5. Word-problem -> equation setup (construction grammar, deferred).
6. Fix torch/sklearn native segfaults (environment, not code).

## THE DEAL

Solver answers everything computable at zero wrong. Board keys answer
conceptual MCQs at zero wrong. Everything else teaches the method and
admits it. 90% competency = solver-scope >= 90% + keys covering the
rest -- measured by the held-out gate, never claimed without it.
