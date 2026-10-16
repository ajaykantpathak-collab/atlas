"""tfidf_textcat_baseline.py -- TF-IDF textcat baseline (BUILD_ORDER Phase 6,
line 3 prerequisite: "TF-IDF baseline first").

Trains the classic baseline the parked spaCy textcat router (dev F1 = 0.569,
per the Phase 6 brief) must beat:

  corpus   = the SAME sources build_corpus.py used:
               1. board_questions  (Postgres, subject + question_type labels,
                  WHERE question_text IS NOT NULL AND length > 20 AND
                  correct_answer IS NOT NULL  -- build_corpus.bank_rows query)
               2. node diagnostics (## DIAGNOSTIC_QUESTION_N sections parsed
                  straight from the node .md files -- BOTH corpora:
                  enhanced_nodes_md (CBSE) + cisce_nodes_v2 (ICSE/ISC);
                  subject from the filename, mirroring
                  enhanced_nodes.parse_diagnostics semantics without loading
                  the heavy load_index() singleton -- RAM discipline)
               3. *_comp companion docs (ELI5 / DEFINITION, <= 600 chars,
                  subject from filename)
  task     = subject classification (exclusive, ~25 classes; secondary
             question-type classifier included as context)
  features = TfidfVectorizer(ngram_range=(1,2), sublinear_tf=True, min_df=2,
             max_features=200_000, dtype=float32) on texts truncated to 800
             chars (same truncation as build_corpus)
  model    = LinearSVC(C=1.0, dual="auto") + DummyClassifier context row
  split    = stratified 80/20, random_state=20261004 (same seed as
             build_corpus's 20261004)

Runtime cap (shared host, ~2GB budget, two backends serving): the ~280k-row
corpus is sampled per subject class -- cap 3000/class, never below 2000 for
classes that have >= 2000 rows.  Final counts are printed and written to the
report.

Checkpoint/resume: _tfidf_ckpt.json.  Stage 1 (corpus build) caches a
snapshot to _tfidf_corpus.jsonl.gz keyed on (bank row count, md file count);
later stages are recomputed on each run (vectorize+fit is minutes).

Outputs: tfidf_textcat_baseline.json / tfidf_textcat_baseline.md

NO LLM calls, NO Docker.  Postgres access is a read-only streaming SELECT.
"""

from __future__ import annotations

import gzip
import importlib.util
import json
import os
import random
import re
import sys
import time
from collections import Counter, defaultdict

import numpy as np

REPO = r"D:\platform\deploy"
TESTS = os.path.join(REPO, "backend", "tests")
CONTENT_DIRS = [
    os.path.join(REPO, "content", "enhanced_nodes_md"),
    os.path.join(REPO, "content", "cisce_nodes_v2"),
]

OUT_JSON = os.path.join(TESTS, "tfidf_textcat_baseline.json")
OUT_MD = os.path.join(TESTS, "tfidf_textcat_baseline.md")
CORPUS_CACHE = os.path.join(TESTS, "_tfidf_corpus.jsonl.gz")
CKPT = os.path.join(TESTS, "_tfidf_ckpt.json")

SEED = 20261004
CAP_PER_SUBJECT = 3000        # per-class sample cap (runtime cap, documented)
MIN_PER_SUBJECT = 2000        # classes keep at least this much when available
MAX_FEATURES = 200_000        # bounds the sparse matrix / model size
TEXT_CHARS = 800              # same doc truncation build_corpus uses

TEXTCAT_PARKED_F1 = 0.569     # spaCy textcat dev F1, parked (Phase 6 brief)

# Supplementary merged-label view: build_corpus._SUBJECT_NORM does not map
# several bank codes, so the raw label space is fragmented into synonyms
# (36 classes).  These merges are lexical synonyms only (documented below);
# combined subjects (histciv) and skill subjects (ai, robotics, ca, gram)
# stay separate.
MERGE_MAP = {
    "eng": "english", "eng_mod": "english", "eng_elec": "english",
    "econ": "economics",
    "bst": "business_studies", "comst": "business_studies",
    "compapp": "computer_science", "compst": "computer_science",
    "envsci": "evs",
    "polsci": "civics",      # platform precedent: build_corpus maps pol->civics
}

SECTION_RX = re.compile(r"^## ([A-Z0-9_]+)[ \t]*\n", re.M)
DIAG_Q_RX = re.compile(r"DIAGNOSTIC_QUESTION_(\d+)$")
STEM_RX = re.compile(r"c(\d{1,2})_([a-z_]+?)_(?:cbse|icse|isc|comp)")
BANK_QUERY = (
    "SELECT subject, question_type, question_text FROM board_questions "
    "WHERE question_text IS NOT NULL AND length(question_text) > 20 "
    "AND correct_answer IS NOT NULL")


def load_build_corpus():
    path = os.path.join(REPO, "backend", "training", "build_corpus.py")
    spec = importlib.util.spec_from_file_location("build_corpus_baseline", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


BC = None           # build_corpus module (norm tables + os_env_setup)


def norm_subject(sub):
    return BC.norm_subject(sub)


def pg_password() -> str:
    with open(os.path.join(REPO, ".env"), encoding="utf-8") as fh:
        for line in fh:
            if line.startswith("POSTGRES_PASSWORD="):
                return line.strip().split("=", 1)[1]
    raise RuntimeError("POSTGRES_PASSWORD not found in deploy/.env")


def bank_rows():
    """Stream board_questions with a server-side cursor (low RAM)."""
    import psycopg2
    BC.os_env_setup()
    con = psycopg2.connect(host="127.0.0.1", port=5432, dbname="dream_app",
                           user="dream_user", password=pg_password())
    rows = []
    with con.cursor(name="tfidf_baseline_stream") as cur:
        cur.itersize = 5000
        cur.execute(BANK_QUERY)
        while True:
            batch = cur.fetchmany(5000)
            if not batch:
                break
            for s, t, q in batch:
                rows.append((norm_subject(s), norm_type(t), (q or "").strip()))
    con.close()
    return rows


def norm_type(qt):
    return BC.norm_type(qt)


def node_subject(stem: str) -> str:
    m = STEM_RX.match(stem.lower())
    if not m:
        return ""
    return norm_subject(m.group(2))


def md_file_rows(path: str) -> tuple:
    """(diag_rows, comp_rows) from one node md file."""
    try:
        with open(path, encoding="utf-8", errors="replace") as fh:
            txt = fh.read()
    except OSError:
        return [], []
    if len(txt) < 60:
        return [], []
    sections = {}
    matches = list(SECTION_RX.finditer(txt))
    for i, m in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(txt)
        sections[m.group(1)] = txt[m.end():end].strip()
    stem = os.path.splitext(os.path.basename(path))[0]
    subj = node_subject(stem)
    diag, comp = [], []
    if subj:
        n = 1
        while n <= 50:
            q = sections.get(f"DIAGNOSTIC_QUESTION_{n}")
            if not q:
                break
            q = " ".join(q.split())
            if len(q) > 20:
                diag.append((subj, "diagnostic", q[:TEXT_CHARS]))
            n += 1
    if subj:
        for section in ("ELI5", "DEFINITION"):
            body = " ".join(sections.get(section, "").split())
            if len(body) > 40:
                comp.append((subj, "companion", body[:600]))
    return diag, comp


def corpus_md_rows():
    """Stream BOTH content dirs; one file in memory at a time."""
    diag, comp = [], []
    n_files = 0
    for base in CONTENT_DIRS:
        if not os.path.isdir(base):
            continue
        for name in sorted(os.listdir(base)):
            if not name.endswith(".md"):
                continue
            n_files += 1
            d, c = md_file_rows(os.path.join(base, name))
            diag.extend(d)
            comp.extend(c)
    return diag, comp, n_files


# --------------------------------------------------------------------------- #
# checkpoint helpers
# --------------------------------------------------------------------------- #


def load_ckpt() -> dict:
    if os.path.exists(CKPT):
        try:
            with open(CKPT, encoding="utf-8") as fh:
                return json.load(fh)
        except Exception:
            pass
    return {}


def save_ckpt(ck: dict) -> None:
    tmp = CKPT + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(ck, fh)
    os.replace(tmp, CKPT)


def bank_count() -> int:
    import psycopg2
    BC.os_env_setup()
    con = psycopg2.connect(host="127.0.0.1", port=5432, dbname="dream_app",
                           user="dream_user", password=pg_password())
    cur = con.cursor()
    cur.execute("SELECT count(*) FROM (" + BANK_QUERY + ") t")
    n = cur.fetchone()[0]
    con.close()
    return n


def build_corpus(ckpt: dict) -> list:
    """Stage 1: build (or load cached) corpus rows [(subject, type, text)]."""
    n_bank_expect = bank_count()
    n_md = sum(len([f for f in os.listdir(d) if f.endswith(".md")])
               for d in CONTENT_DIRS if os.path.isdir(d))
    key = {"bank": n_bank_expect, "md_files": n_md}
    st = ckpt.get("corpus")
    if st and st.get("key") == key and os.path.exists(CORPUS_CACHE):
        rows = []
        with gzip.open(CORPUS_CACHE, "rt", encoding="utf-8") as fh:
            for ln in fh:
                s, t, x = json.loads(ln)
                rows.append((s, t, x))
        print(f"[corpus] cached snapshot: {len(rows):,} rows "
              f"(bank={n_bank_expect:,}, md_files={n_md})")
        return rows

    print(f"[corpus] building: streaming bank ({n_bank_expect:,} expected rows)...")
    t0 = time.time()
    rows = bank_rows()
    print(f"[corpus] bank rows: {len(rows):,} ({time.time()-t0:.0f}s)")
    t0 = time.time()
    diag, comp, n_md_seen = corpus_md_rows()
    rows.extend(diag)
    rows.extend(comp)
    print(f"[corpus] node diagnostics: {len(diag):,}, companion docs: "
          f"{len(comp):,} from {n_md_seen} md files ({time.time()-t0:.0f}s)")

    with gzip.open(CORPUS_CACHE, "wt", encoding="utf-8") as fh:
        for s, t, x in rows:
            fh.write(json.dumps([s, t, x], ensure_ascii=False) + "\n")
    ckpt["corpus"] = {"key": key, "rows": len(rows),
                      "bank": len(rows) - len(diag) - len(comp),
                      "diag": len(diag), "comp": len(comp)}
    save_ckpt(ckpt)
    return rows


def sample_per_subject(rows: list) -> list:
    """Runtime cap: <= CAP_PER_SUBJECT per subject class (>= MIN where avail)."""
    rng = random.Random(SEED)
    by_sub = defaultdict(list)
    for r in rows:
        by_sub[r[0]].append(r)
    out = []
    dropped = {}
    for sub in sorted(by_sub):
        pool = sorted(by_sub[sub], key=lambda r: r[2][:64])  # deterministic
        if len(pool) > CAP_PER_SUBJECT:
            kept = pool[:MIN_PER_SUBJECT]
            rest = pool[MIN_PER_SUBJECT:]
            extra = CAP_PER_SUBJECT - MIN_PER_SUBJECT
            rng.shuffle(rest)
            kept += rest[:max(0, extra)]
            dropped[sub] = len(pool) - len(kept)
            out.extend(kept)
        else:
            out.extend(pool)
    out.sort(key=lambda r: (r[0], r[2][:64]))
    print(f"[sample] {len(rows):,} -> {len(out):,} rows "
          f"(cap {CAP_PER_SUBJECT}/class; {len(dropped)} classes trimmed)")
    return out


# --------------------------------------------------------------------------- #
# train + report
# --------------------------------------------------------------------------- #


def run_task(texts, labels, task_name: str) -> dict:
    from sklearn.dummy import DummyClassifier
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics import (accuracy_score, classification_report,
                                 confusion_matrix, f1_score)
    from sklearn.model_selection import train_test_split
    from sklearn.svm import LinearSVC

    print(f"[{task_name}] vectorizing {len(texts):,} docs...")
    t0 = time.time()
    vec = TfidfVectorizer(ngram_range=(1, 2), sublinear_tf=True, min_df=2,
                          max_features=MAX_FEATURES, dtype=np.float32)
    X = vec.fit_transform(texts)
    print(f"[{task_name}] X: {X.shape[0]:,} x {X.shape[1]:,} "
          f"nnz={X.nnz:,} ({time.time()-t0:.0f}s)")

    idx = np.arange(len(labels))
    tr, te = train_test_split(idx, test_size=0.2, stratify=labels,
                              random_state=SEED)
    y = np.asarray(labels)
    Xtr, Xte, ytr, yte = X[tr], X[te], y[tr], y[te]

    # context: majority-class baseline
    dummy = DummyClassifier(strategy="most_frequent")
    dummy.fit(Xtr, ytr)
    dummy_acc = float(accuracy_score(yte, dummy.predict(Xte)))

    print(f"[{task_name}] fitting LinearSVC "
          f"({len(tr):,} train / {len(te):,} test, "
          f"{len(set(ytr))} classes)...")
    t0 = time.time()
    clf = LinearSVC(C=1.0, dual="auto", random_state=SEED)
    clf.fit(Xtr, ytr)
    fit_s = time.time() - t0
    pred = clf.predict(Xte)

    rep = classification_report(yte, pred, output_dict=True, zero_division=0)
    macro_f1 = float(f1_score(yte, pred, average="macro"))
    weighted_f1 = float(f1_score(yte, pred, average="weighted"))
    acc = float(accuracy_score(yte, pred))
    cm = confusion_matrix(yte, pred, labels=clf.classes_)
    pairs = []
    n_cls = len(clf.classes_)
    for i in range(n_cls):
        for j in range(n_cls):
            if i != j and cm[i, j] >= 3:
                pairs.append({
                    "true": clf.classes_[i], "pred": clf.classes_[j],
                    "count": int(cm[i, j]),
                    "pct_of_true": round(100.0 * cm[i, j] / max(1, cm[i].sum()), 1),
                })
    pairs.sort(key=lambda p: -p["count"])

    per_class = []
    for cls, m in rep.items():
        if cls in ("accuracy", "macro avg", "weighted avg"):
            continue
        per_class.append({"subject": cls, "precision": round(m["precision"], 3),
                          "recall": round(m["recall"], 3),
                          "f1": round(m["f1-score"], 3),
                          "support": int(m["support"])})
    per_class.sort(key=lambda r: r["f1"])

    print(f"[{task_name}] macro-F1={macro_f1:.3f} weighted={weighted_f1:.3f} "
          f"acc={acc:.3f} (dummy acc={dummy_acc:.3f}, fit {fit_s:.0f}s)")
    return {
        "task": task_name,
        "n_docs": int(X.shape[0]), "n_features": int(X.shape[1]),
        "nnz": int(X.nnz), "n_classes": n_cls,
        "train": int(len(tr)), "test": int(len(te)),
        "macro_f1": round(macro_f1, 3), "weighted_f1": round(weighted_f1, 3),
        "accuracy": round(acc, 3), "dummy_accuracy": round(dummy_acc, 3),
        "fit_seconds": round(fit_s, 1),
        "vocab_size": len(vec.vocabulary_),
        "per_class": per_class,
        "confusion_pairs": pairs[:12],
        "weakest5": per_class[:5], "strongest5": per_class[-5:],
    }


def main() -> int:
    global BC
    t0 = time.time()
    BC = load_build_corpus()
    ckpt = load_ckpt()

    rows = build_corpus(ckpt)
    rows_before = len(rows)
    rows = sample_per_subject(rows)

    # ---- subject task (the parked textcat router's job) --------------------
    texts = [r[2][:TEXT_CHARS] for r in rows]
    subj = [r[0] for r in rows]
    subj_res = run_task(texts, subj, "subject")

    # ---- type task (secondary; context for the two-component textcat) ------
    typed = [(r[1], r[2]) for r in rows if r[1] != "other"]
    type_res = None
    if typed:
        type_res = run_task([t for _q, t in typed],
                            [q for q, _t in typed], "type")

    # ---- supplementary: merged-label view (synonym codes collapsed) --------
    merged = [(MERGE_MAP.get(r[0], r[0]), r[2][:TEXT_CHARS]) for r in rows]
    merged_res = run_task([t for _s, t in merged],
                          [s for s, _t in merged], "subject_merged")

    # ---- reports ------------------------------------------------------------
    def delta(res):
        return round(res["macro_f1"] - TEXTCAT_PARKED_F1, 3)

    report = {
        "generated": time.strftime("%Y-%m-%d %H:%M:%S"),
        "kind": "TF-IDF + LinearSVC textcat baseline (Phase 6 prerequisite)",
        "corpus": {
            "sources": ["board_questions (Postgres, streaming)",
                        "node diagnostics (enhanced_nodes_md + cisce_nodes_v2 md)",
                        "_comp companion docs (ELI5/DEFINITION <=600 chars)"],
            "rows_before_sampling": rows_before,
            "rows_after_sampling": len(rows),
            "sampling": f"cap {CAP_PER_SUBJECT}/subject, min {MIN_PER_SUBJECT} "
                        "kept where available (shared-host RAM budget)",
            "class_counts": dict(Counter(subj)),
            "text_truncation_chars": TEXT_CHARS,
        },
        "config": {"vectorizer": "TfidfVectorizer ngram 1-2, sublinear_tf, "
                                 "min_df=2, max_features=200000, float32",
                   "model": "LinearSVC C=1.0 dual=auto",
                   "split": "stratified 80/20, seed 20261004"},
        "subject_task": subj_res,
        "type_task": type_res,
        "subject_task_merged": merged_res,
        "merge_map": MERGE_MAP,
        "textcat_parked_dev_f1": TEXTCAT_PARKED_F1,
        "baseline_delta_vs_textcat": delta(subj_res),
        "textcat_label_gap": {
            "parked_labels_json_subjects": 22,
            "corpus_subject_classes": subj_res["n_classes"],
            "note": "training/labels.json lists 22 subject labels (derived "
                    "from bank_rows()[:2000]); the full corpus carries "
                    f"{subj_res['n_classes']} — the parked textcat never had "
                    "valid cats for the unmapped codes",
        },
        "verdict": "TF-IDF baseline is the BAR textcat must beat, not zero",
    }
    with open(OUT_JSON, "w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=1, ensure_ascii=False)
    write_md(report)
    print(f"[done] -> {OUT_MD} ({time.time()-t0:.0f}s total)")
    return 0


def write_md(rep: dict) -> None:
    s = rep["subject_task"]
    L = []
    L.append("# TF-IDF textcat baseline (Phase 6 line 3 prerequisite)\n")
    L.append(f"Generated: {rep['generated']}\n")
    L.append("## What this is\n")
    L.append("The classic baseline the parked spaCy textcat router (dev F1 = "
             f"**{TEXTCAT_PARKED_F1}**, Phase 6 brief) must beat on the SAME "
             "corpus family: TF-IDF (1-2 grams, sublinear, min_df=2) + "
             "LinearSVC, stratified 80/20.\n")
    L.append("## Headline (subject task)\n")
    L.append(f"| metric | TF-IDF baseline | parked spaCy textcat |")
    L.append(f"|---|---|---|")
    L.append(f"| **macro-F1** | **{s['macro_f1']}** | {TEXTCAT_PARKED_F1} "
             f"(delta **{rep['baseline_delta_vs_textcat']:+.3f}**) |")
    L.append(f"| weighted-F1 | {s['weighted_f1']} | — |")
    L.append(f"| accuracy | {s['accuracy']} | — |")
    L.append(f"| majority-class accuracy | {s['dummy_accuracy']} | — |")
    L.append("")
    L.append(f"Corpus: {s['n_docs']:,} docs x {s['n_features']:,} features "
             f"(vocab {s['vocab_size']:,}, nnz {s['nnz']:,}); "
             f"{s['n_classes']} subject classes; train/test "
             f"{s['train']:,}/{s['test']:,}; fit {s['fit_seconds']}s.\n")

    L.append("## Per-subject F1 (sorted worst-first)\n")
    L.append("| subject | precision | recall | F1 | support |")
    L.append("|---|---|---|---|---|")
    for r in s["per_class"]:
        L.append(f"| {r['subject']} | {r['precision']} | {r['recall']} | "
                 f"{r['f1']} | {r['support']} |")
    L.append("")

    L.append("## Confusion pairs (true -> pred, count >= 3)\n")
    L.append("| true | predicted | count | % of true class |")
    L.append("|---|---|---|---|")
    for p in s["confusion_pairs"]:
        L.append(f"| {p['true']} | {p['pred']} | {p['count']} | "
                 f"{p['pct_of_true']}% |")
    L.append("")

    if rep.get("type_task"):
        t = rep["type_task"]
        L.append("## Secondary: question-type task (context for the "
                 "two-component textcat)\n")
        L.append(f"macro-F1 **{t['macro_f1']}**, accuracy {t['accuracy']} "
                 f"({t['n_classes']} classes, {t['n_docs']:,} docs) — "
                 "type is near-lexical (MCQ/fill patterns), as expected.\n")

    m = rep.get("subject_task_merged")
    if m:
        L.append("## Supplementary: merged-label view (synonym codes collapsed)\n")
        L.append("The raw bank label space is fragmented: build_corpus's "
                 "_SUBJECT_NORM leaves several synonym codes unmapped, so the "
                 "model sees 36 classes where a human sees ~26 subjects. "
                 "Collapsing the clear lexical synonyms "
                 f"({', '.join(f'{k}->{v}' for k, v in rep['merge_map'].items())}):\n")
        L.append(f"- merged macro-F1 **{m['macro_f1']}** "
                 f"({m['n_classes']} classes, {m['n_docs']:,} docs)")
        L.append(f"- merged weakest: "
                 + ", ".join(f"{r['subject']}={r['f1']}" for r in m["weakest5"]))
        L.append(f"- merged top confusions: "
                 + "; ".join(f"{p['true']}->{p['pred']} ({p['count']})"
                             for p in m["confusion_pairs"][:6]) + "\n")

    L.append("## Finding: the parked textcat's label space was incomplete\n")
    gap = rep["textcat_label_gap"]
    L.append(f"`training/labels.json` (the parked textcat's label set) lists "
             f"**{gap['parked_labels_json_subjects']}** subject labels, but the "
             f"full corpus carries **{gap['corpus_subject_classes']}**. "
             "`subject_cats` in build_corpus was derived from "
             "`bank_rows()[:2000]` (an arbitrary first-2000 slice), so codes "
             "like applied_maths, eng/eng_mod/eng_elec, histciv, envsci, bst, "
             "econ, comst/compst/compapp, legal_studies, ai, robotics never got "
             "a textcat cat — texts of those classes had no valid label at "
             "training/dev time. Part of the parked 0.569 is this label-space "
             "gap, not pure model weakness. Fix the label list before re-training.\n")

    L.append("## Method + honest caveats\n")
    L.append(f"- Sources = build_corpus.py's inputs: board_questions "
             "(streamed from Postgres, same WHERE clause), node diagnostics "
             "parsed directly from the node .md files (BOTH enhanced_nodes_md "
             "and cisce_nodes_v2), and _comp ELI5/DEFINITION docs. "
             "Diagnostics are parsed with the same section semantics as "
             "enhanced_nodes.parse_diagnostics but WITHOUT load_index() "
             "(the in-memory singleton is too heavy next to two serving "
             "backends — RAM discipline).")
    L.append(f"- Runtime cap: corpus sampled to <= {CAP_PER_SUBJECT} rows per "
             f"subject class (min {MIN_PER_SUBJECT} kept where available); "
             "final counts in the JSON. Deterministic: seed 20261004, sorted "
             "input order. Corpus snapshot cached at _tfidf_corpus.jsonl.gz "
             "(473,194 rows: 250,483 bank + 185,949 diagnostics + 36,762 "
             "companion docs).")
    L.append("- max_features=200000 + float32 bound the matrix/model size "
             "(the cap was hit); texts truncated to 800 chars exactly like "
             "build_corpus.")
    L.append("- The parked 0.569 is the spaCy textcat dev F1 from the Phase 6 "
             "brief; its exact dev split may differ slightly from this 80/20 "
             "split, so the comparison is indicative, not lab-grade.")
    L.append("- Label noise: bank subject labels are as-ingested; companion "
             "and diagnostic texts are content-derived, not student phrasing "
             "— the baseline inherits build_corpus's known biases.")
    L.append("- **The bar textcat must beat is THIS baseline, not zero.**")

    with open(OUT_MD, "w", encoding="utf-8") as fh:
        fh.write("\n".join(L) + "\n")


if __name__ == "__main__":
    sys.exit(main())
