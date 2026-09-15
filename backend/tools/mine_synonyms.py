"""mine_synonyms.py -- MiniLM-driven synonym discovery for the intent
lexicon.

The loop that was missing: MiniLM embeds corpus sentences and finds
sentences that are SEMANTICALLY near a canonical intent phrase but
contain NO known signal word for it.  Those sentences hold unknown
synonyms.  The miner extracts the candidate phrase occupying the
slot (the verb/phrase adjacent to the bound number) and emits ranked
proposals -- each with a real corpus example -- for human approval.

Approach (deterministic, no LLM):
    1. load corpus sentences (bank + CFQ + openstax tryits)
    2. embed canonical intent phrases + candidate sentences (batched,
       one encode per unique string)
    3. sentence is a CANDIDATE for intent I when:
         sim(sentence, canonical phrase I) > threshold
         AND sentence contains a money number
         AND sentence contains NO existing signal for I
    4. candidate phrase = the content words between the sentence's
       subject region and the number, minus stopwords and minus words
       already claimed by another intent
    5. proposals ranked by frequency across the corpus

Output: cbse_data/synonym_proposals.json
"""

from __future__ import annotations

import collections
import json
import re
import sqlite3
from pathlib import Path

OUT = Path(r"D:\platform\cbse_data\synonym_proposals.json")
STOP = set("""a an the of and or to in for at by with from on is are was
were be been being it its his her their he she they them this that these
those as during year years end per each all any what which how much many
find find the calculate compute determine his her their was were had has
have will would can could should if then so we you i my our your""".split())

_CANONICAL = {
    "withdrew": r"\bwithdrew\b|\bdrawings?\b",
    "profit": r"\bprofit\b",
    "opening capital": r"opening\s+capital",
    "closing capital": r"closing\s+capital",
    "EBIT": r"\bEBIT\b",
    "capital employed": r"capital\s+employed",
    "depreciation": r"depreciat",
    "introduced capital": r"introduc\w+\s+capital",
}


def _corpus(limit: int = 6000) -> List[str]:
    conn = sqlite3.connect(r"D:\platform\cbse_data\question_bank.db")
    rows = conn.execute(
        """SELECT q.text FROM questions q
           JOIN documents d ON d.id = q.doc_id
           WHERE d.subject IN ('accountancy', 'economics',
                               'business_studies', 'maths')
             AND length(q.text) BETWEEN 40 AND 400
           LIMIT ?""", (limit,)).fetchall()
    conn.close()
    sents = []
    for (t,) in rows:
        for s in re.split(r"[.!?]\s+", t):
            s = s.strip()
            if 25 <= len(s) <= 300:
                sents.append(s)
    return sents


def main() -> None:
    import logging
    import warnings
    logging.disable(logging.CRITICAL)
    warnings.filterwarnings("ignore")

    import torch
    torch.set_num_threads(4)
    from sentence_transformers import SentenceTransformer

    model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

    sents = _corpus()
    print(f"corpus sentences: {len(sents)}")

    # existing signals: sentences already covered by the lexicon are
    # NOT candidates (their phrasings are known)
    known = {intent: re.compile(pat, re.I)
             for intent, pat in _CANONICAL.items()}

    # embed canonical phrases
    canon_phrases = {
        "withdrew": "withdrew capital for personal use",
        "profit": "earned a profit",
        "opening capital": "opening capital of the business",
        "closing capital": "closing capital at the end of the year",
        "EBIT": "earnings before interest and taxes",
        "capital employed": "capital employed in the business",
        "depreciation": "depreciation charged on the asset",
        "introduced capital": "introduced additional capital",
    }
    canon_vecs = model.encode(list(canon_phrases.values()),
                              convert_to_numpy=True)

    # embed money-bearing sentences once
    money_re = re.compile(r"(?:rs\.?|inr|₹)?\s*\d[\d,]{2,}", re.I)
    cand = [(i, s) for i, s in enumerate(sents) if money_re.search(s)]
    print(f"money sentences: {len(cand)}")
    vecs = model.encode([s for _, s in cand], convert_to_numpy=True,
                        batch_size=128)

    proposals: Dict[str, Dict[str, int]] = collections.defaultdict(
        lambda: collections.Counter())
    examples: Dict[str, Dict[str, str]] = collections.defaultdict(dict)

    import numpy as np
    for (idx, sent), vec in zip(cand, vecs):
        low = sent.lower()
        for ci, (intent, phrase) in enumerate(canon_phrases.items()):
            sim = float(np.dot(vec, canon_vecs[ci])
                        / ((np.linalg.norm(vec) *
                            np.linalg.norm(canon_vecs[ci])) + 1e-9))
            if sim < 0.62:
                continue
            if known[intent].search(low):
                continue        # already covered by a known signal
            # candidate phrase: content words before the money number
            m = money_re.search(sent)
            before = sent[:m.start()] if m else sent
            words = [w for w in re.findall(r"[a-z]+", before.lower())
                     if w not in STOP and len(w) > 2]
            if not words:
                continue
            phrase = " ".join(words[-4:])
            proposals[intent][phrase] += 1
            examples[intent].setdefault(phrase, sent[:200])

    out = {}
    for intent, counter in proposals.items():
        ranked = counter.most_common(15)
        out[intent] = [
            {"phrase": p, "count": c,
             "example": examples[intent][p]} for p, c in ranked]
    OUT.write_text(json.dumps(out, indent=1))
    for intent, props in out.items():
        print(f"\n== {intent}: {len(props)} proposals")
        for p in props[:5]:
            print(f"   {p['count']:3d}x  {p['phrase']}  "
                  f"e.g. {p['example'][:60]}")
    print(f"\nsaved: {OUT}")


if __name__ == "__main__":
    main()
