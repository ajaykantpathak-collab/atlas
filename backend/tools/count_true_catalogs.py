"""count_true_catalogs.py -- exact count of live catalogs, true duplicates by chapter title."""
import json, os, re, collections

LIVE = r"backend\its\competency"
files = sorted(f for f in os.listdir(LIVE) if f.endswith(".json") and f.startswith("catalog_"))

by_key = collections.defaultdict(list)
for f in files:
    p = os.path.join(LIVE, f)
    try:
        cat = json.load(open(p, encoding="utf-8"))
    except Exception:
        continue
    cls = str(cat.get("class", "?"))
    subj = str(cat.get("subject", "?"))
    title = re.sub(r"[^a-z0-9 ]", "", str(cat.get("chapter_title", "")).lower()).strip()
    by_key[(cls, subj, title)].append(f)

total_files = len(files)
unique_keys = len(by_key)
dupes = {k: v for k, v in by_key.items() if len(v) > 1}
dupe_files = sum(len(v) for v in dupes.values()) - len(dupes)  # extra copies
no_title = sum(1 for k in by_key if not k[2])

print(f"total live catalog files: {total_files}")
print(f"unique chapters (class+subject+title): {unique_keys}")
print(f"true duplicate copies: {total_files - unique_keys}")
print(f"chapters with empty title: {no_title}")
print()

if dupes:
    print(f"DUPLICATE GROUPS ({len(dupes)}):")
    for (cls, subj, title), group in sorted(dupes.items()):
        print(f"  Class {cls} {subj} \"{title[:50]}\" x{len(group)}:")
        for g in sorted(group):
            print(f"    {g}")
else:
    print("no true duplicates found")
