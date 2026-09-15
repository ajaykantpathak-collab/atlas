"""dedupe_by_chapter_title.py -- one file per (class, subject, chapter_title).
Keeps the file with the most concepts; archives the rest to _archive/deduped/."""
import json, os, re, collections, shutil

LIVE = r"backend\its\competency"
ARCH = os.path.join(LIVE, "_archive", "deduped")
os.makedirs(ARCH, exist_ok=True)

files = sorted(f for f in os.listdir(LIVE) if f.endswith(".json") and f.startswith("catalog_"))

# group by (class, subject, normalized chapter_title)
groups = collections.defaultdict(list)
for f in files:
    p = os.path.join(LIVE, f)
    try:
        cat = json.load(open(p, encoding="utf-8"))
    except Exception:
        continue
    cls = str(cat.get("class", "?"))
    subj = str(cat.get("subject", "?"))
    title = re.sub(r"[^a-z0-9 ]", "", str(cat.get("chapter_title", "")).lower()).strip()
    n_concepts = len(cat.get("concepts", []))
    groups[(cls, subj, title)].append((f, n_concepts))

archived = kept = 0
log = []
for (cls, subj, title), group in sorted(groups.items()):
    if len(group) <= 1:
        kept += 1
        continue
    # keep the file with the most concepts
    group.sort(key=lambda x: -x[1])
    keep = group[0][0]
    kept += 1
    for extra_f, _ in group[1:]:
        src = os.path.join(LIVE, extra_f)
        dst = os.path.join(ARCH, extra_f)
        shutil.move(src, dst)
        log.append(f"ARCHIVED {extra_f} (duplicate of {keep})")
        archived += 1

print(f"kept: {kept} | archived duplicates: {archived}")
print(f"live total now: {kept}")
if log:
    log_path = os.path.join(ARCH, "DEDUPE_LOG.txt")
    with open(log_path, "w", encoding="utf-8") as fh:
        fh.write("\n".join(log) + "\n")
    print(f"log: {log_path}")
