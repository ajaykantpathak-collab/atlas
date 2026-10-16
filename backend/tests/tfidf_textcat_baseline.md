# TF-IDF textcat baseline (Phase 6 line 3 prerequisite)

Generated: 2026-10-05 10:32:53

## What this is

The classic baseline the parked spaCy textcat router (dev F1 = **0.569**, Phase 6 brief) must beat on the SAME corpus family: TF-IDF (1-2 grams, sublinear, min_df=2) + LinearSVC, stratified 80/20.

## Headline (subject task)

| metric | TF-IDF baseline | parked spaCy textcat |
|---|---|---|
| **macro-F1** | **0.829** | 0.569 (delta **+0.260**) |
| weighted-F1 | 0.827 | — |
| accuracy | 0.827 | — |
| majority-class accuracy | 0.03 | — |

Corpus: 99,960 docs x 200,000 features (vocab 200,000, nnz 6,209,548); 36 subject classes; train/test 79,968/19,992; fit 56.7s.

## Per-subject F1 (sorted worst-first)

| subject | precision | recall | F1 | support |
|---|---|---|---|---|
| comst | 0.707 | 0.557 | 0.623 | 359 |
| commerce_apps | 0.711 | 0.672 | 0.691 | 585 |
| econ | 0.782 | 0.7 | 0.739 | 600 |
| applied_maths | 0.726 | 0.763 | 0.744 | 600 |
| maths | 0.758 | 0.732 | 0.745 | 600 |
| psychology | 0.822 | 0.717 | 0.766 | 600 |
| biology | 0.826 | 0.727 | 0.773 | 600 |
| economics | 0.798 | 0.755 | 0.776 | 600 |
| statistics | 0.653 | 0.962 | 0.778 | 552 |
| computer_science | 0.83 | 0.733 | 0.779 | 600 |
| bst | 0.744 | 0.827 | 0.783 | 600 |
| envsci | 0.74 | 0.845 | 0.789 | 600 |
| geography | 0.82 | 0.762 | 0.79 | 600 |
| polsci | 0.758 | 0.827 | 0.791 | 515 |
| sociology | 0.838 | 0.802 | 0.819 | 600 |
| business_studies | 0.831 | 0.81 | 0.82 | 600 |
| biotech | 0.829 | 0.825 | 0.827 | 600 |
| civics | 0.798 | 0.867 | 0.831 | 600 |
| histciv | 0.825 | 0.838 | 0.831 | 600 |
| eng | 0.821 | 0.85 | 0.835 | 600 |
| history | 0.873 | 0.8 | 0.835 | 600 |
| legal_studies | 0.822 | 0.855 | 0.838 | 600 |
| compapp | 0.809 | 0.889 | 0.847 | 468 |
| compst | 0.857 | 0.876 | 0.867 | 445 |
| english | 0.855 | 0.892 | 0.873 | 600 |
| eng_mod | 0.877 | 0.88 | 0.879 | 600 |
| physics | 0.868 | 0.9 | 0.884 | 600 |
| chemistry | 0.908 | 0.868 | 0.888 | 600 |
| accountancy | 0.88 | 0.905 | 0.892 | 600 |
| home_science | 0.914 | 0.908 | 0.911 | 600 |
| gram | 0.943 | 0.892 | 0.917 | 314 |
| ai | 0.917 | 0.926 | 0.921 | 525 |
| hindi | 0.989 | 0.87 | 0.926 | 600 |
| ca | 0.961 | 0.896 | 0.927 | 192 |
| eng_elec | 0.955 | 0.948 | 0.952 | 600 |
| robotics | 0.979 | 0.957 | 0.968 | 437 |

## Confusion pairs (true -> pred, count >= 3)

| true | predicted | count | % of true class |
|---|---|---|---|
| maths | applied_maths | 105 | 17.5% |
| applied_maths | maths | 86 | 14.3% |
| biology | biotech | 76 | 12.7% |
| computer_science | compapp | 73 | 12.2% |
| commerce_apps | bst | 66 | 11.3% |
| eng_mod | eng | 57 | 9.5% |
| hindi | english | 54 | 9.0% |
| geography | envsci | 52 | 8.7% |
| eng | eng_mod | 48 | 8.0% |
| comst | commerce_apps | 47 | 13.1% |
| bst | commerce_apps | 46 | 7.7% |
| history | histciv | 44 | 7.3% |

## Secondary: question-type task (context for the two-component textcat)

macro-F1 **0.77**, accuracy 0.823 (8 classes, 99,929 docs) — type is near-lexical (MCQ/fill patterns), as expected.

## Supplementary: merged-label view (synonym codes collapsed)

The raw bank label space is fragmented: build_corpus's _SUBJECT_NORM leaves several synonym codes unmapped, so the model sees 36 classes where a human sees ~26 subjects. Collapsing the clear lexical synonyms (eng->english, eng_mod->english, eng_elec->english, econ->economics, bst->business_studies, comst->business_studies, compapp->computer_science, compst->computer_science, envsci->evs, polsci->civics):

- merged macro-F1 **0.841** (27 classes, 99,960 docs)
- merged weakest: commerce_apps=0.633, maths=0.739, applied_maths=0.743, geography=0.763, biology=0.77
- merged top confusions: commerce_apps->business_studies (210); applied_maths->maths (98); maths->applied_maths (97); business_studies->commerce_apps (84); biology->biotech (76); psychology->civics (74)

## Finding: the parked textcat's label space was incomplete

`training/labels.json` (the parked textcat's label set) lists **22** subject labels, but the full corpus carries **36**. `subject_cats` in build_corpus was derived from `bank_rows()[:2000]` (an arbitrary first-2000 slice), so codes like applied_maths, eng/eng_mod/eng_elec, histciv, envsci, bst, econ, comst/compst/compapp, legal_studies, ai, robotics never got a textcat cat — texts of those classes had no valid label at training/dev time. Part of the parked 0.569 is this label-space gap, not pure model weakness. Fix the label list before re-training.

## Method + honest caveats

- Sources = build_corpus.py's inputs: board_questions (streamed from Postgres, same WHERE clause), node diagnostics parsed directly from the node .md files (BOTH enhanced_nodes_md and cisce_nodes_v2), and _comp ELI5/DEFINITION docs. Diagnostics are parsed with the same section semantics as enhanced_nodes.parse_diagnostics but WITHOUT load_index() (the in-memory singleton is too heavy next to two serving backends — RAM discipline).
- Runtime cap: corpus sampled to <= 3000 rows per subject class (min 2000 kept where available); final counts in the JSON. Deterministic: seed 20261004, sorted input order. Corpus snapshot cached at _tfidf_corpus.jsonl.gz (473,194 rows: 250,483 bank + 185,949 diagnostics + 36,762 companion docs).
- max_features=200000 + float32 bound the matrix/model size (the cap was hit); texts truncated to 800 chars exactly like build_corpus.
- The parked 0.569 is the spaCy textcat dev F1 from the Phase 6 brief; its exact dev split may differ slightly from this 80/20 split, so the comparison is indicative, not lab-grade.
- Label noise: bank subject labels are as-ingested; companion and diagnostic texts are content-derived, not student phrasing — the baseline inherits build_corpus's known biases.
- **The bar textcat must beat is THIS baseline, not zero.**
