"""Build the spaCy training corpus from ALL Atlas question sources:

  1. board_questions      (253k, subject + question_type labels)
  2. node diagnostics      (~20k nodes x up to 5 questions, subject from node id)
  3. *_comp companion docs (subject from filename)

Outputs: train/dev DocBins for two textcat components
  - textcat_subject  (exclusive, ~25 classes)
  - textcat_type     (exclusive: mcq/numerical/short/long/fill/tf/diagnostic)
Stratified caps keep training time sane; every source keeps representation.
"""

import json
import os
import random
import re
import sys
from collections import defaultdict
from pathlib import Path

import psycopg2

OUT_DIR = Path(r"D:\platform\deploy\backend\training")
CAP_PER_SUBJECT_TRAIN = 4000     # per subject per source-type bucket
CAP_TOTAL = 0                    # 0 = no global cap
DEV_FRACTION = 0.06

random.seed(20261004)

_PW = [l.strip().split("=", 1)[1]
       for l in open(r"D:\platform\deploy\.env", encoding="utf-8")
       if l.startswith("POSTGRES_PASSWORD=")][0]

_SUBJECT_NORM = {
    "math": "maths", "maths": "maths", "app": "applied_maths",
    "appmath": "applied_maths", "phy": "physics", "physics": "physics",
    "chem": "chemistry", "chemistry": "chemistry", "bio": "biology",
    "biology": "biology", "cs": "computer_science", "comp": "computer_science",
    "ip": "computer_science", "engl": "english", "english": "english",
    "eng_h": "english", "eng_s": "english", "eng_w": "english",
    "eng_f": "english", "eng_k": "english", "eng_v": "english",
    "hist": "history", "history": "history", "civ": "civics",
    "civics": "civics", "pol": "civics", "geo": "geography",
    "geography": "geography", "eco": "economics", "economics": "economics",
    "acc": "accountancy", "bs": "business_studies", "biotech": "biotech",
    "psy": "psychology", "ps": "psychology", "leg": "legal_studies",
    "legal": "legal_studies", "soc": "sociology", "evs": "evs",
    "hindi": "hindi", "hin": "hindi", "hin_ga": "hindi", "hin_a": "hindi",
    "hin_al": "hindi", "hin_ar": "hindi", "hin_v": "hindi",
    "hin_kr": "hindi", "hin_ks": "hindi", "hin_sp": "hindi",
    "home": "home_science", "hs": "home_science", "stat": "statistics",
    "commapp": "commerce_apps", "comm": "commerce_apps",
    "commstud": "commerce_studies", "massmedia": "mass_media",
    "mm": "mass_media", "econapp": "economics_apps",
}

_TYPE_NORM = {
    "mcq": "mcq", "mcq_single": "mcq", "mcq_multi": "mcq",
    "true_false": "true_false", "truefalse": "true_false",
    "numeric": "numerical", "numerical": "numerical",
    "short_answer": "short", "short": "short",
    "long_answer": "long", "long": "long",
    "fill_blank": "fill", "fill": "fill",
    "diagnostic": "diagnostic", "competency": "short",
    "seed": "short", "comprehension": "short",
}


def norm_subject(sub):
    return _SUBJECT_NORM.get((sub or "").strip().lower(),
                             (sub or "").strip().lower() or "unknown")


def norm_type(qt):
    key = (qt or "").strip().lower()
    return _TYPE_NORM.get(key, "diagnostic" if "diag" in key else "other")


def bank_rows():
    conn = psycopg2.connect(host="127.0.0.1", port=5432, dbname="dream_app",
                            user="dream_user", password=_PW)
    cur = conn.cursor()
    cur.execute(
        "SELECT subject, question_type, question_text FROM board_questions "
        "WHERE question_text IS NOT NULL AND length(question_text) > 20 "
        "AND correct_answer IS NOT NULL")
    rows = [(norm_subject(s), norm_type(t), q.strip())
            for s, t, q in cur.fetchall()]
    conn.close()
    return rows


def node_diag_rows():
    """Diagnostic questions from the content index (subject from node id)."""
    out = []
    try:
        sys.path.insert(0, r"D:\platform\deploy")
        sys.path.insert(0, r"D:\platform\deploy\backend")
        os_env_setup()
        from backend.services.enhanced_nodes import load_index
        idx = load_index()
        for nid, node in (idx.nodes or {}).items():
            m = _SUBJECT_NORM.get(str(node.get("subject", "")).lower())
            if not m:
                continue
            for d in (node.get("diagnostics") or []):
                q = (d.get("q") or "").strip()
                if len(q) > 20:
                    out.append((m, "diagnostic", q))
    except Exception as exc:
        print(f"node diagnostics skipped: {exc}", flush=True)
    return out


def comp_rows():
    """_comp companion docs: DEFINITION + ELI5 texts, subject from filename."""
    import re
    out = []
    base = Path(r"D:\platform\deploy\content\enhanced_nodes_md")
    for f in base.glob("*_comp*.md"):
        stem = f.stem.lower()
        mm = re.match(r"c(\d{1,2})_([a-z_]+?)_(?:comp|cbse|icse|isc)", stem)
        if not mm:
            continue
        code = mm.group(2)
        m = _SUBJECT_NORM.get(code, code)
        try:
            txt = f.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        import re as _re
        for section in ("ELI5", "DEFINITION"):
            seg = _re.search(rf"## {section}\n(.+?)(?:\n##|\Z)", txt, _re.S)
            if seg:
                body = " ".join(seg.group(1).split())
                if len(body) > 40:
                    out.append((m, "companion", body[:600]))
    return out


def os_env_setup():
    os.environ.setdefault(
        "DATABASE_URL",
        f"postgresql+asyncpg://dream_user:{_PW}@127.0.0.1:5432/dream_app")
    os.environ.setdefault("PLATFORM_DATABASE_URL", os.environ["DATABASE_URL"])
    os.environ.setdefault(
        "PLATFORM_JWT_SECRET", "0123456789abcdef0123456789abcdef0123")
    os.environ.setdefault("PLATFORM_ENV", "development")


def main():
    import spacy
    from spacy.tokens import DocBin
    from spacy.util import minibatch

    nlp = spacy.blank("en")
    subject_cats = sorted({
        norm_subject(s) for s, _t, _q in bank_rows()[:2000]
    } | {"hindi", "evs", "unknown"})
    nlp.add_pipe("textcat", last=True)
    textcat = nlp.get_pipe("textcat")
    for c in subject_cats:
        textcat.add_label(f"SUBJ_{c}")
    type_cats = sorted({"mcq", "numerical", "short", "long", "fill",
                        "true_false", "diagnostic"})
    nlp.add_pipe("textcat", last=True, name="textcat_type")
    tcat = nlp.get_pipe("textcat_type")
    for c in type_cats:
        tcat.add_label(f"TYPE_{c}")

    rows = bank_rows() + node_diag_rows() + comp_rows()
    random.shuffle(rows)
    print(f"corpus rows: {len(rows):,}")

    # stratified cap by (subject, type)
    per_key = defaultdict(int)
    train, dev = [], []
    for sub, qt, text in rows:
        key = (sub, qt)
        if per_key[key] >= CAP_PER_SUBJECT_TRAIN:
            continue
        per_key[key] += 1
        (dev if random.random() < DEV_FRACTION else train).append((sub, qt, text))

    print(f"train: {len(train):,}  dev: {len(dev):,}")

    def to_docbin(items, phase):
        db_sub = DocBin(store_user_data=True)
        db_typ = DocBin(store_user_data=True)
        for sub, qt, text in items:
            doc_s = nlp.make_doc(text[:800])
            doc_s.cats = {f"SUBJ_{sub}": 1.0}
            db_sub.add(doc_s)
            doc_t = nlp.make_doc(text[:800])
            doc_t.cats = {f"TYPE_{qt}": 1.0}
            db_typ.add(doc_t)
        db_sub.to_disk(OUT_DIR / f"{phase}_subject.spacy")
        db_typ.to_disk(OUT_DIR / f"{phase}_type.spacy")
        print(f"wrote {phase}_subject.spacy / {phase}_type.spacy "
              f"({len(items)} docs)")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    to_docbin(train, "train")
    to_docbin(dev, "dev")
    meta = {"subject_labels": subject_cats, "type_labels": type_cats,
            "train": len(train), "dev": len(dev)}
    (OUT_DIR / "labels.json").write_text(json.dumps(meta, indent=1),
                                         encoding="utf-8")
    print("labels:", json.dumps(meta))


if __name__ == "__main__":
    main()
