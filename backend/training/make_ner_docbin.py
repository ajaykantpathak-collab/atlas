"""Convert ner_corpus.jsonl to spaCy DocBin for NER training."""

import json
import random
import sys
from pathlib import Path

import spacy
from spacy.tokens import DocBin
from spacy.util import minibatch, compounding

OUT_DIR = Path(r"D:\platform\deploy\backend\training")
IN_FILE = OUT_DIR / "ner_corpus.jsonl"

nlp = spacy.blank("en")

train_db = DocBin(store_user_data=True)
dev_db = DocBin(store_user_data=True)

data = []
for line in open(IN_FILE, encoding="utf-8"):
    d = json.loads(line)
    text = d["text"]
    ents = []
    for start, end, label in d["entities"]:
        # Validate span alignment (spaCy needs token-aligned spans)
        span = doc_char_span = (start, end, label)
        ents.append(span)
    # Sort and deduplicate
    ents = sorted(set(ents), key=lambda e: (e[0], e[1]))
    # Filter overlapping
    filtered = []
    last_end = 0
    for s, e, l in ents:
        if s >= last_end:
            filtered.append((s, e, l))
            last_end = e
    data.append((text, {"entities": filtered}))

random.shuffle(data)
dev_size = max(1, int(len(data) * 0.08))
dev_set = data[:dev_size]
train_set = data[dev_size:]

print(f"total: {len(data):,}  train: {len(train_set):,}  dev: {len(dev_set):,}")

for text, annots in train_set:
    doc = nlp.make_doc(text)
    spans = []
    for s, e, l in annots["entities"]:
        span = doc.char_span(s, e, label=l, alignment_mode="contract")
        if span is not None:
            spans.append(span)
    doc.ents = spans
    train_db.add(doc)

for text, annots in dev_set:
    doc = nlp.make_doc(text)
    spans = []
    for s, e, l in annots["entities"]:
        span = doc.char_span(s, e, label=l, alignment_mode="contract")
        if span is not None:
            spans.append(span)
    doc.ents = spans
    dev_db.add(doc)

OUT_DIR.mkdir(parents=True, exist_ok=True)
train_db.to_disk(OUT_DIR / "ner_train.spacy")
dev_db.to_disk(OUT_DIR / "ner_dev.spacy")
print(f"wrote ner_train.spacy ({len(train_db)}) + ner_dev.spacy ({len(dev_db)})")

import random
random.seed(42)
