# KNOWN GAPS LEDGER (zero-wrong program)

Each entry is a bug CLASS, not a single question. Found-by: adversarial
probing. Closing an entry = guard/fix landed + regression test + suite.

## OPEN

### GAP-1: unit-blind symbol binding in the chain/binder layer
- WHERE: case_builder._extract_values (regex floats, no units) feeds
  multi_hop.parse_chain_text placements; canonical_equations binder
  binds positionally.
- SYMPTOM: a stated "30 m/s" can be bound into a distance slot; "20
  seconds" into a velocity slot; chains then "verify" circularly.
- CAUGHT BY: hop-planner work 2026-09-11 (3 wrong-VERIFIED probes).
- MITIGATIONS LANDED: incomplete-reading guard (chain lane declines
  when hop clauses > parsed keys); echo guard (answer may not equal an
  ask-sentence parameter); hop_planner refuses broken chains instead
  of guessing.
- FIX DIRECTION: wire unit_registry/slot_schema._extract_quantities
  (already unit-aware) into chain extraction; dimension-check at bind
  sites (slot-name -> expected dimension map). Two systems, one
  connector. Scheduled next.

### GAP-2: speed-carry distance/time chains answer as GUIDED
- WHERE: same root as GAP-1; hop_planner carries hop-1 values honestly
  but hop 2 ("Using this speed, how far in 20 s?") needs the binder
  fix to verify. Tests pin the honest contract (never wrong, may
  refuse).

## CLOSED (this session)
- Router stripped Devanagari -> Hindi normalized empty (fixed + tests)
- Gate blind to Devanagari copy/grounding/title (tightened + tests)
- Incomplete multi-ask chains shipped VERIFIED (guard + tests)
- Ask-parameter echo promoted as answer (guard + tests)
- Language subjects out of scope (router + coverage, 280 chapters)
