"""dedupe_all_catalogs.py -- content-based corpus-wide dedupe.

For every (class, subject, chapter_topic) group:
- Keep ONE authoritative catalog (prefer: hand-built gold > book-grounded subagent > reviewed Gemini > old drafter)
- Archive all others to _archive/deduped/ (recoverable, out of the router)

Matching is CONTENT-based: two catalogs are duplicates if their concept
titles overlap >= 60% (same topics taught), regardless of filename or
chapter numbering scheme.  Generation preference keeps the best quality.

Outputs a full log of every decision.
"""
import json, os, re, shutil, collections

LIVE = r"backend\its\competency"
ARCH = os.path.join(LIVE, "_archive", "deduped")
LOG = os.path.join(ARCH, "DEDUPE_LOG.txt")

APPLY = len(sys.argv) > 1 and sys.argv[1] == "APPLY"


def norm(t):
    return set(re.findall(r"[a-z]{4,}", str(t).lower()))


def jaccard(a, b):
    A, B = set(a.split()), set(b.split())
    if not A and not B:
        return 1.0
    return len(A & B) / max(1, len(A | B))


def generation_score(stem, cat):
    """Higher = keep preferentially."""
    prov = str(cat.get("provenance", "")).lower()
    # hand-built gold
    if "gold" in stem or "integers" in stem or re.search(r"ch\d+_[a-z]", stem):
        return 3
    # book-grounded (drafted from text_cache_new)
    sf = str(cat.get("source_file", ""))
    if "text_cache_new" in sf:
        return 2
    # gemini + reviewed
    if "review" in prov or "gemini" in prov:
        return 1
    return 0


def main():
    os.makedirs(ARCH, exist_ok=True)
    files = sorted(f for f in os.listdir(LIVE)
                   if f.endswith(".json") and f.startswith("catalog_"))

    # load and fingerprint
    catalog_data = {}
    for f in files:
        try:
            cat = json.load(open(os.path.join(LIVE, f), encoding="utf-8"))
        except Exception:
            continue
        cls = str(cat.get("class", "?"))
        subj = str(cat.get("subject", "?"))
        # content fingerprint: union of all concept titles + definition snippets
        c_words = set()
        for c in cat.get("concepts", []):
            c_words.update(norm(c.get("title", "")))
            c_words.update(norm(c.get("definition", ""))[:50].split())
        # also chapter_title
        c_words.update(norm(cat.get("chapter_title", "")))
        gen = generation_score(f[:-5], cat)
        catalog_data[f] = {
            "class": cls, "subj": subj, "words": c_words,
            "gen": gen, "concepts": len(cat.get("concepts", [])),
        }

    # group by (class, subject)
    groups = collections.defaultdict(list)
    for f, d in catalog_data.items():
        groups[(d["class"], d["subj"])].append((f, d))

    log_lines = []
    archived = kept = 0

    for (cls, subj), items in sorted(groups.items()):
        # content-based duplicate detection: pairwise Jaccard >= 0.5 on
        # concept words = same chapter/topic
        n = len(items)
        if n <= 1:
            kept += 1
            continue

        # union-find on content-similar pairs
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
                wi = items[i][1]["words"]
                wj = items[j][1]["words"]
                if jaccard(wi, wj) >= 0.5:
                    union(i, j)

        clusters = collections.defaultdict(list)
        for i in range(n):
            clusters[find(i)].append(i)

        for members in clusters.values():
            if len(members) == 1:
                kept += 1
                continue
            # prefer highest generation score, then most concepts
            members.sort(key=lambda i: (-items[i][1]["gen"],
                                        -items[i][1]["concepts"]))
            keep_f = items[members[0]][0]
            kept += 1
            for i in members[1:]:
                src = os.path.join(LIVE, items[i][0])
                dst = os.path.join(ARCH, items[i][0])
                if APPLY:
                    shutil.move(src, dst)
                log_lines.append(
                    f"ARCHIVE {items[i][0]} -> {dst} | duplicate of {keep_f} "
                    f"| overlap with cluster")
                archived += 1

    print(f"kept {kept} | archive-decisions {archived} | APPLY={APPLY}")
    if log_lines:
        os.makedirs(ARCH, exist_ok=True)
        with open(LOG, "w", encoding="utf-8") as f:
            f.write("\n".join(log_lines) + "\n")


if __name__ == "__main__":
    main()
