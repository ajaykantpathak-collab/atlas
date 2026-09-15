"""review_cleanup.py -- strip engine artifacts from staged catalogs.

Removes (they are ALWAYS engine artifacts, never original prose):
  - "In brief," frame token-pairs, anywhere in the field
  - consecutive repeated "both" tokens (keeps one)
  - double spaces; fixes leading lowercase after stripping

Then dumps every field containing "'s" for manual flip-damage review.
Writes: possessive_review.json
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
STAGING = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from review_audit import PATTERNS  # noqa: E402

import glob  # noqa: E402


def clean_field(text: str) -> str:
    tokens = text.split()
    out = []
    i = 0
    while i < len(tokens):
        t = tokens[i]
        if t.lower() == "in" and i + 1 < len(tokens) and \
                tokens[i + 1].lower().startswith("brief"):
            i += 2
            continue
        out.append(t)
        i += 1
    # collapse repeated "both"
    coll = []
    for t in out:
        if coll and coll[-1].lower() == "both" and t.lower() == "both":
            continue
        coll.append(t)
    text = " ".join(coll)
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"\s+([,.;:)])", r"\1", text)
    if text and text[0].islower():
        text = text[0].upper() + text[1:]
    return text


def main():
    files = []
    for p in PATTERNS:
        files += glob.glob(os.path.join(STAGING, p))
    stats = {"fields": 0, "cleaned": 0}
    poss = []
    for path in sorted(set(files)):
        fname = os.path.basename(path)
        data = json.load(open(path, encoding="utf-8"))
        changed = False
        for c in data.get("concepts") or []:
            for fld in ("definition", "key_idea"):
                t = str(c.get(fld) or "")
                if not t:
                    continue
                stats["fields"] += 1
                t2 = clean_field(t)
                if t2 != t:
                    c[fld] = t2
                    stats["cleaned"] += 1
                    changed = True
                t = c[fld]
                if "'s" in t:
                    poss.append({"file": fname, "id": c.get("id"),
                                 "field": fld, "text": t})
        if changed:
            with open(path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=1, ensure_ascii=False)
    print(json.dumps(stats))
    with open(os.path.join(HERE, "possessive_review.json"), "w",
              encoding="utf-8") as f:
        json.dump(poss, f, indent=1, ensure_ascii=False)
    print("possessive fields:", len(poss))


if __name__ == "__main__":
    main()
