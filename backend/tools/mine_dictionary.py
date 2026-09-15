"""mine_dictionary.py -- full-corpus intent dictionary generator.

Passes ALL question banks + CFQs + OpenStax items through MiniLM,
clusters the money-bearing sentences, and generates the intent
dictionary: canonical intent words, synonym surface forms, example
sentences, frequency counts, subject/class tags.

Pipeline (deterministic given the frozen model):
    1. corpus: every sentence from bank + CFQ + openstax tryits/
       examples (all subjects), keeping subject/class tags
    2. keep number-bearing sentences (computable pool)
    3. embed once (batched)
    4. seed with known canonical intents; assign every sentence to its
       nearest seed OR to a new discovered cluster (threshold-gated)
    5. per cluster: extract slot phrases adjacent to numbers, rank by
       frequency, tag subjects/classes
    6. emit dictionary entries -- provisional until educator-approved;
       every adoption runs the regression batteries

Output: cbse_data/intent_dictionary.json
"""

from __future__ import annotations

import collections
import json
import re
import sqlite3
from pathlib import Path

OUT = Path(r"D:\platform\cbse_data\intent_dictionary.json")
SEED_SIM = 0.62          # assignment to known intents
NEW_SIM = 0.72           # forming a new cluster
BATCH = 256

STOP = set("""a an the of and or to in for at by with from on is are was
were be been being it its his her their he she they them this that these
those as during year years end per each all any what which how much many
find calculate compute determine his her was had has have will would can
could should if then so we you i my our your also but not no than more
most other some such only own same too very just now""".split())

_MONEY = re.compile(
    r"\brs\.?(?:\s*\d+)?|\binr\b|\u20b9\s*\d*|\d+\s*%|\d[\d,]{2,}", re.I)


def load_corpus() -> List[Tuple[str, str, str]]:
    """(sentence, subject, class_label) from every source."""
    out = []
    FURNITURE = re.compile(
        r"marking\s+scheme|reprint|answer\s+key|questions?\s+\w+\s+grade"
        r"|all\s+india|compartment|general\s+instructions|time\s+allowed"
        r"|maximum\s+marks|section\s+[a-e]\b|question\s+numbers?\b"
        r"|sample\s+paper|practice\s+questions|attempt\s+any"
        r"|carries?\s+\d+\s+marks?|marks?\s+each", re.I)
    conn = sqlite3.connect(r"D:\platform\cbse_data\question_bank.db")
    rows = conn.execute(
        """SELECT q.text, d.subject, d.class_label FROM questions q
           JOIN documents d ON d.id = q.doc_id
           WHERE length(q.text) BETWEEN 40 AND 500
           LIMIT 60000""").fetchall()
    mrows = conn.execute(
        """SELECT m.text, d.subject, d.class_label FROM marking_steps m
           JOIN documents d ON d.id = m.doc_id
           WHERE length(m.text) BETWEEN 40 AND 300
           LIMIT 40000""").fetchall()
    conn.close()
    for t, subj, cls in rows + mrows:
        for s in re.split(r"[.!?]\s+", t or ""):
            s = s.strip()
            if 40 <= len(s) <= 300 and _MONEY.search(s) \
                    and not FURNITURE.search(s):
                out.append((s, (subj or "?").lower(), cls or "?"))
    for ef in Path(r"D:\platform\cbse_data\openstax_examples").glob("*.json"):
        if ef.name.startswith("_"):
            continue
        ed = json.loads(ef.read_text())
        lic = ed.get("license", "?")[:6]
        for it in ed.get("examples", []):
            q = it.get("problem", "")
            if 25 <= len(q) <= 300 and _MONEY.search(q):
                out.append((q, "openstax:" + lic, "?"))
    for tf in Path(r"D:\platform\cbse_data\openstax_tryits").glob("*.json"):
        if tf.name.startswith("_"):
            continue
        data = json.loads(tf.read_text())
        for it in data.get("tryits", []):
            q = it.get("question", "")
            if 25 <= len(q) <= 300 and _MONEY.search(q):
                out.append((q, "openstax:" + data.get("license", "?")[:6], "?"))
    return out


def main() -> None:
    import logging
    import warnings
    logging.disable(logging.CRITICAL)
    warnings.filterwarnings("ignore")

    import numpy as np
    import torch
    torch.set_num_threads(8)
    from sentence_transformers import SentenceTransformer

    corpus = load_corpus()
    print(f"corpus sentences: {len(corpus)}", flush=True)

    model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    texts = [s for s, _, _ in corpus]
    print("embedding...", flush=True)
    vecs = model.encode(texts, convert_to_numpy=True, batch_size=BATCH,
                        show_progress_bar=False)
    norms = np.linalg.norm(vecs, axis=1, keepdims=True) + 1e-9
    vecs = vecs / norms

    # ---- clustering: seeded intents + discovered clusters ----
    seeds = {
        "profit": "earned a profit on the sale",
        "cost": "the cost price of the item",
        "selling_price": "sold the item at the selling price",
        "discount": "discount allowed on the marked price",
        "interest": "interest charged on the loan",
        "depreciation": "depreciation charged on the asset",
        "opening_capital": "opening capital of the business",
        "closing_capital": "closing capital at the end of the year",
        "drawings": "withdrew for personal use",
        "capital_employed": "capital employed in the business",
        "salary": "salary paid to the employee",
        "rent": "rent paid for the premises",
        "commission": "commission earned on sales",
        "donation": "donation received",
        "admission_fee": "admission fee received",
        "consumables": "consumables consumed during the year",
        "subscription": "subscription received from members",
        "investment": "investment purchased",
        "revenue": "revenue from operations",
        "expenditure": "total expenditure incurred",
        "receipts": "total receipts of the year",
        "deficit": "budgetary deficit",
        "debtors": "amount due from debtors",
        "creditors": "amount due to creditors",
        "stock": "closing stock in hand",
        "cash": "cash in hand",
        "bank": "cash at bank",
        "machinery": "machinery purchased",
        "furniture": "furniture purchased",
        "loan": "loan taken from the bank",
        "interest_on_loan": "interest on loan",
        "tax": "tax paid",
        "dividend": "dividend received",
        "reserve": "general reserve",
        "insurance": "insurance premium paid",
        "bad_debts": "bad debts written off",
        "outstanding": "outstanding expenses",
        "prepaid": "prepaid expenses",
        "golden_ratio": "ratio between two quantities",
    }
    seed_names = list(seeds.keys())
    seed_vecs = model.encode(list(seeds.values()),
                             convert_to_numpy=True, batch_size=64)
    seed_norms = np.linalg.norm(seed_vecs, axis=1, keepdims=True) + 1e-9
    seed_vecs = seed_vecs / seed_norms

    # assign every sentence: best seed, or NEW cluster
    assignments = [[] for _ in seed_names]
    new_clusters: List[Dict] = []          # {vec, members}
    for i in range(len(texts)):
        v = vecs[i]
        sims = seed_vecs @ v
        j = int(np.argmax(sims))
        if sims[j] >= SEED_SIM:
            assignments[j].append(i)
            continue
        # nearest new cluster?
        placed = False
        for cl in new_clusters:
            s = float(cl["vec"] @ v)
            if s >= NEW_SIM:
                cl["members"].append(i)
                n = len(cl["members"])
                cl["vec"] = (cl["vec"] * (n - 1) + v) / n   # running mean
                placed = True
                break
        if not placed:
            new_clusters.append({"vec": v.copy(), "members": [i]})

    # ---- per-cluster slot-phrase extraction ----
    def phrases_of(members):
        """Extract the operative verb/adjective phrase adjacent to each
        money number: walk backwards from the number through content
        words, stopping at sentence-boundary words (subjects, articles).
        Captures variable-length phrases, not just last-3-words."""
        counter = collections.Counter()
        examples = {}
        subj_count = collections.Counter()
        BOUNDARY = {"is", "are", "was", "were", "the", "a", "an", "of",
                    "and", "his", "her", "their", "its"}
        for i in members:
            text, subj, cls = corpus[i]
            m = _MONEY.search(text)
            if not m:
                continue
            before = text[:m.start()].lower()
            words = re.findall(r"[a-z]+", before)
            # walk back from the number through content words, stop at
            # boundary words; capture up to 4 content words
            phrase_words = []
            for w in reversed(words):
                if w in BOUNDARY or w in STOP:
                    break
                phrase_words.insert(0, w)
                if len(phrase_words) >= 4:
                    break
            phrase = " ".join(phrase_words)
            if len(phrase) < 4:
                continue
            counter[phrase] += 1
            examples.setdefault(phrase, text[:180])
            subj_count[subj] += 1
        return counter, examples, subj_count

    dictionary = {"seeded": {}, "discovered": []}
    for j, name in enumerate(seed_names):
        members = assignments[j]
        if not members:
            continue
        counter, examples, subj_count = phrases_of(members)
        dictionary["seeded"][name] = {
            "n_sentences": len(members),
            "top_phrases": [{"phrase": p, "count": c,
                             "example": examples[p]}
                            for p, c in counter.most_common(12)],
            "subjects": dict(subj_count.most_common(5)),
        }
    for ci, cl in enumerate(new_clusters):
        if len(cl["members"]) < 15:
            continue
        counter, examples, subj_count = phrases_of(cl["members"])
        top = counter.most_common(1)
        if not top:
            continue
        dictionary["discovered"].append({
            "cluster_id": ci, "n_sentences": len(cl["members"]),
            "proposed_intent": top[0][0],
            "top_phrases": [{"phrase": p, "count": c,
                             "example": examples[p]}
                            for p, c in counter.most_common(10)],
            "subjects": dict(subj_count.most_common(5)),
            "example": examples[top[0][0]],
        })

    dictionary["discovered"].sort(key=lambda c: -c["n_sentences"])
    # ---- discovery pass: global n-grams near money numbers ----
    # the vocabulary reveals itself by frequency, independent of seeds
    ngram_counter = collections.Counter()
    ngram_examples = {}
    for text, subj, cls in corpus:
        for m in _MONEY.finditer(text):
            lo = max(0, m.start() - 120)
            window = text[lo:m.end()].lower()
            words = [w for w in re.findall(r"[a-z]+", window)
                     if w not in STOP and len(w) > 2]
            for n in (2, 3, 4):
                if len(words) >= n:
                    gram = " ".join(words[-n:])
                    ngram_counter[gram] += 1
                    ngram_examples.setdefault(gram, text[:180])
    top_ngrams = [{"ngram": g, "count": c,
                   "example": ngram_examples.get(g, "")}
                  for g, c in ngram_counter.most_common(80)]
    dictionary["ngram_vocabulary"] = top_ngrams

    dictionary["meta"] = {
        "corpus_sentences": len(corpus),
        "seeded_intents": seed_names,
        "n_discovered_clusters": len(dictionary["discovered"]),
    }
    OUT.write_text(json.dumps(dictionary, indent=1))
    print(json.dumps(dictionary["meta"], indent=1))
    print("top discovered clusters:")
    for c in dictionary["discovered"][:15]:
        print(f"  {c['n_sentences']:5d}x  {c['proposed_intent']:30s} "
              f"{c['subjects']}")
    print(f"saved: {OUT}")


if __name__ == "__main__":
    main()
