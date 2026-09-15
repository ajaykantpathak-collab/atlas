"""repoint_sources.py -- re-point live catalogs from old cache to new cache."""
import json, os, re

LIVE = r"backend\its\competency"
NEW = r"D:\node_generator\ncert-mcp\data\processed\text_cache_new"

# build new-cache index: basename -> (full_path, first_1500_chars_lowered)
new_index = {}
for f in sorted(os.listdir(NEW)):
    if not f.endswith(".txt"):
        continue
    fp = os.path.join(NEW, f)
    try:
        head = open(fp, encoding="utf-8", errors="ignore").read(1500).lower()
        head = re.sub(r"[^a-z0-9 ]", " ", head)
    except Exception:
        continue
    new_index[f] = (fp, head)

repointed = no_equiv = 0
for f in sorted(os.listdir(LIVE)):
    if not f.endswith(".json") or not f.startswith("catalog_"):
        continue
    p = os.path.join(LIVE, f)
    cat = json.load(open(p, encoding="utf-8"))
    sf = cat.get("source_file", "")
    if not sf or "text_cache_new" in sf:
        continue  # already linked or no source
    basename = os.path.basename(sf)

    # try exact basename match in new cache
    if basename in new_index:
        cat["source_file"] = new_index[basename]
        json.dump(cat, open(p, "w", encoding="utf-8", newline=""),
                  indent=1, ensure_ascii=False)
        repointed += 1
        print(f"REPOINTED (exact): {f} -> {basename}")
        continue

    # try title-based match against new cache file openings
    title = str(cat.get("chapter_title", "")).lower()
    words = re.findall(r"[a-z]{4,}", title)
    if not words:
        no_equiv += 1
        continue
    best_score, best_fp = 0, None
    for basename_key, (fp, head) in new_index.items():
        score = sum(1 for w in words if w in head)
        if score > best_score:
            best_score, best_fp = score, fp
    if best_score >= 2 and best_fp:
        cat["source_file"] = best_fp
        json.dump(cat, open(p, "w", encoding="utf-8", newline=""),
                  indent=1, ensure_ascii=False)
        repointed += 1
        print(f"REPOINTED (title): {f} -> {os.path.basename(best_fp)}")
    else:
        no_equiv += 1
        print(f"NO EQUIV: {f}")

print(f"\nre-pointed: {repointed} | no equivalent: {no_equiv}")
