"""Convert ner_corpus_v3.jsonl to spaCy DocBins for the V3 NER retrain.

Pattern: make_ner_docbin.py (v2), with three fixes:
  - random.seed BEFORE the shuffle (v2 seeded after, so it was a no-op)
  - v3 input/output paths (ner_corpus_v3.jsonl -> ner_train_v3.spacy /
    ner_dev_v3.spacy; v2 DocBins stay untouched for comparison)
  - counts dropped/misaligned spans instead of failing silently
Entity-free docs are kept as negatives (precision anchors; spaCy NER
eval counts entities, so they only ever penalize phantom predictions).
"""

import json
import random
from collections import Counter
from pathlib import Path

import spacy
from spacy.tokens import DocBin

OUT_DIR = Path(r"D:\platform\deploy\backend\training")
IN_FILE = OUT_DIR / "ner_corpus_v3.jsonl"
DEV_FRACTION = 0.08
DEV_MAX = 8000     # eval runs every 200 steps; 8k docs keeps it < 1 min

random.seed(42)

nlp = spacy.blank("en")

data = []
label_counts = Counter()
n_dropped = n_contracted = 0
for line in open(IN_FILE, encoding="utf-8"):
    d = json.loads(line)
    text = d["text"]
    ents = []
    for start, end, label in d["entities"]:
        ents.append((start, end, label))
        label_counts[label] += 1
    ents = sorted(set(ents), key=lambda e: (e[0], e[1]))
    filtered = []
    last_end = 0
    for s, e, l in ents:
        if s >= last_end:
            filtered.append((s, e, l))
            last_end = e
    data.append((text, {"entities": filtered}))

random.shuffle(data)
dev_size = min(max(1, int(len(data) * DEV_FRACTION)), DEV_MAX)
dev_set = data[:dev_size]
train_set = data[dev_size:]

print(f"total: {len(data):,}  train: {len(train_set):,}  "
      f"dev: {len(dev_set):,}")
print(f"gold entities: {dict(label_counts)}")


def build(items):
    db = DocBin(store_user_data=True)
    global n_dropped, n_contracted
    for text, annots in items:
        doc = nlp.make_doc(text)
        spans = []
        for s, e, l in annots["entities"]:
            span = doc.char_span(s, e, label=l, alignment_mode="contract")
            if span is None:
                n_dropped += 1
                continue
            if (span.start_char, span.end_char) != (s, e):
                n_contracted += 1
            spans.append(span)
        doc.ents = spans
        db.add(doc)
    return db


train_db = build(train_set)
dev_db = build(dev_set)
print(f"span alignment: dropped={n_dropped}  contracted={n_contracted}")

OUT_DIR.mkdir(parents=True, exist_ok=True)
train_db.to_disk(OUT_DIR / "ner_train_v3.spacy")
dev_db.to_disk(OUT_DIR / "ner_dev_v3.spacy")
print(f"wrote ner_train_v3.spacy ({len(train_db)}) + "
      f"ner_dev_v3.spacy ({len(dev_db)})")
