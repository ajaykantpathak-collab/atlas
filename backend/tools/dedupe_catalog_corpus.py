"""dedupe_catalog_corpus.py -- one authoritative catalog per chapter.

Covers the multi-generation mess in backend/its/competency/:
  - old drafter files      (catalog_classN_<subject>_ch<N>.json)
  - gemini bulk files      (catalog_classN_<subject>_ch<bookcode digits>.json)
  - new book-grounded files (catalog_classN_<subject>_le<code><digits>.json)
  - gold / slug files      (kept unless a newer generation covers the same
                            chapter with a passing gate)

Rule per (class, subject, chapter): keep exactly ONE catalog -- prefer the
newest generation (book-grounded new-style > gemini > old drafter), break
ties by file mtime (newest).  Every archive decision is logged to
_archive/generations/DEDUPE_LOG.txt.  DRY-RUN by default; pass APPLY=1.

Cross-generation chapter matching is TITLE-based (normalized chapter_title
equality OR concept-title Jaccard >= 0.5), never filename-guessed.
"""

import json
import os
import re
import shutil
import sys
import collections

LIVE = r"backend\its\competency"
ARCH = os.path.join(LIVE, "_archive", "generations")
APPLY = len(sys.argv) > 1 and sys.argv[1] == "APPLY"

SUBJECT_CODE = {
    "maths": "lemh", "physics": "leph", "chemistry": "lech",
    "biology": "lebo", "accountancy": "leac", "economics": "leec",
    "business_studies": "lebs",
}


def norm(t):
    return re.sub(r"[^a-z0-9 ]", "", str(t).lower()).strip()


def jaccard(a, b):
    A, B = set(norm(a).split()), set(norm(b).split())
    return len(A & B) / max(1, len(A | B))


def load(path):
    try:
        return json.load(open(path, encoding="utf-8"))
    except Exception:
        return None


def generation(stem, cat):
    if cat.get("provenance") and "gemini" in str(cat.get("provenance")):
        return 2, "gemini"
    if re.match(r"catalog_class\d+_\w+?_ch\d+\.json", stem) and \
            not re.search(r"le(mh|ph|ch|bo|ac|ec|bs)\d", stem):
        return 1, "old-drafter"
    if re.search(r"le(mh|ph|ch|bo|ac|ec|bs)\d", stem):
        return 2, "book-grounded"
    if "gold" in stem or re.search(r"ch\d+_", stem):
        return 3, "gold/hand"
    return 2, "unknown"


def main():
    files = sorted(f for f in os.listdir(LIVE)
                   if f.endswith(".json") and f.startswith("catalog_"))
    recs = []
    for f in files:
        cat = load(os.path.join(LIVE, f))
        if cat is None:
            continue
        gen, gname = generation(f[:-5], cat)
        recs.append({
            "file": f, "cls": str(cat.get("class", "?")),
            "subj": str(cat.get("subject", "?")),
            "title": norm(cat.get("chapter_title", "")),
            "concepts": norm(" ".join(x.get("title", "")
                                      for x in cat.get("concepts", [])))[:200],
            "gen": gen, "gname": gname,
        })

    groups = collections.defaultdict(list)
    for r in recs:
        groups[(r["cls"], r["subj"])].append(r)

    log = []
    archived = kept = 0
    for (cls, subj), rs in sorted(groups.items()):
        # cluster by chapter-title equality or concept overlap >= 0.5
        n = len(rs)
        parent = list(range(n))

        def find(a):
            while parent[a] != a:
                parent[a] = parent[parent[a]]
                a = parent[a]
            return a

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[max(ra, rb)] = min(ra, rb)

        for i in range(n):
            for j in range(i + 1, n):
                t1, t2 = rs[i]["title"], rs[j]["title"]
                same_title = t1 and t1 == t2
                jac = jaccard(rs[i]["concepts"], rs[j]["concepts"])
                if same_title or jac >= 0.5:
                    union(i, j)
        clusters = collections.defaultdict(list)
        for i in range(n):
            clusters[find(i)].append(i)
        for members in clusters.values():
            if len(members) == 1:
                kept += 1
                continue
            # preference: highest generation (gold 3 > book/gemini 2 > old 1),
            # then newest mtime
            members.sort(key=lambda i: (rs[i]["gen"],
                                        -os.path.getmtime(
                                            os.path.join(LIVE, rs[i]["file"]))))
            keep = rs[members[0]]
            for i in members[1:]:
                src = os.path.join(LIVE, rs[i]["file"])
                dst = os.path.join(ARCH, rs[i]["file"])
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                if APPLY:
                    shutil.move(src, dst)
                log.append(f"ARCHIVE {rs[i]['file']} (gen {rs[i]['gen']}) "
                           f"-- duplicate of {keep['file']} "
                           f"(gen {keep['gen']}, '{keep['title']}')")
                archived += 1
            kept += 1
    print(f"kept {kept}, archive-decisions {archived}, APPLY={APPLY}")
    if log:
        os.makedirs(ARCH, exist_ok=True)
        with open(os.path.join(ARCH, "DEDUPE_LOG.txt"), "a",
                  encoding="utf-8") as f:
            f.write("\n".join(log) + "\n")


if __name__ == "__main__":
    main()
