# INTENT_DICTIONARY_BUILD.md -- the dictionary build brief

Status artifact for the phrasing-generalization work.  Read before
touching the lexicon, binder, or dictionary miners.

## What exists (2026-09)

    intent_lexicon.py          canonical words + synonym map +
                               canonicalize() substitution pass
    relation_binder.py         typed relation schemas (commerce v1:
                               closing capital, ROI) -- slots, linear
                               solve for ANY slot as unknown, ask = the
                               slot whose phrase occurs LAST,
                               sentence-scoped slot binding
    mine_dictionary.py         full-corpus MiniLM miner: 30k bank
                               sentences -> seeded clusters (39 intents)
                               + discovered clusters ->
                               cbse_data/intent_dictionary.json
    commerce variation battery 5/5 incl. REVERSED directions

## The architecture (why this generalizes)

    corpus (bank + CFQ + openstax, all subjects)
        -> MiniLM embed -> cluster (seeded + discovered)
        -> per-cluster slot phrases near numbers, frequency-ranked
        -> DICTIONARY (intent -> synonyms, examples, subjects, counts)
        -> educator approves (provisional -> canonical)
        -> flashtext/PhraseMatcher serves at scale (O(text) matching)
        -> regression batteries run on EVERY dictionary update

    student misses (Lane C bindings, Socratic confirms) feed new
    synonym proposals -> adoption.py validates against EXTERNAL ground
    truth (official keys, NCERT text grounding) -> auto-adopt:
        score >= 0.5  CANONICAL   (official anchor reproduced)
        score >= 0.25 PROVISIONAL (NCERT grounding passed)
        else          QUEUE       (sampled, never gating)
    drift monitor samples 5%, auto-tightens thresholds if the sampled
    error rate exceeds 2%.  No human in the adoption loop; a monthly
    audit sample goes to review as DRIFT DETECTION only.
    dictionary grows from usage at machine speed.  The flywheel.

## Weight

    dictionary is text: ~20k entries across all subjects = a few MB,
    loaded once at boot, matched in microseconds.  Embeddings are
    disposable caches; text is the source of truth.  The app gets
    lighter per question as the dictionary grows -- no tokens, no
    inference on the answer path.

## Next steps (in order)

    1. Wire the mined intent_dictionary.json into intent_lexicon
       (provisional tier; educator approves -> canonical tier)
    2. Adopt flashtext for phrase matching once the dictionary passes
       ~500 entries
    3. Port the remaining commerce relations (GST, cash-flow, ratio
       analysis, partnership) onto relation schemas -- each is slots +
       equation + lexicon entries only
    4. Port physics/chemistry class 11-12 families onto relation
       schemas (they are formula-triggered; the typed-block format)
    5. Renderer v2: Indian names, rupee contexts, natural wrappers --
       quality-critical now that ALL surfaces are rendered (18a)
    6. Battery expansion per dictionary version: every new intent gets
       a regression case or it does not ship
    7. Coverage dashboard: per-relation phrasing count vs corpus hits
       vs refusal rate -- directs the next mining run
