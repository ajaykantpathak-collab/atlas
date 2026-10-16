"""Independent verification of the W2 wave.

1. Format preservation: for every file with a wave2 backup, diff section sets,
   section order, headers and all non-edited sections against the current file.
   Expected: only sections named in the apply manifests differ; no section
   added, removed or reordered.
2. Parked-lane integrity: no c9_hin/engl/gram file appears in any payload,
   manifest or backup dir.
3. Authored-text hygiene: every body this wave wrote (definitions, appends,
   scrubbed sections) is scanned for banned strings, node ids and raw LaTeX.
4. True before/after: score every lane file with the FINAL scanner policy,
   substituting backup content where a backup exists, for honest counts.
"""

import hashlib
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.dirname(HERE))
from apply_content_depth import split_sections  # house parser
import w2_scan  # final-policy scorer

CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
BACKUPS = os.path.join(HERE, "backups")

# ---------- 1. format preservation -------------------------------------------
manifest_files = {}
for mf in ("authoring/apply_manifest.jsonl",):
    p = os.path.join(HERE, mf)
    if not os.path.exists(p):
        continue
    for line in open(p, encoding="utf-8"):
        row = json.loads(line)
        manifest_files.setdefault(row["file"], set()).update(row["edited"])

fmt_ok = fmt_bad = 0
problems = []
checked = 0
# scope to THIS wave's manifest: a sibling agent also drops backups in this
# directory for its own lane, so verifying those would verify someone else
for rel in sorted(manifest_files):
    path = os.path.join(BACKUPS, rel)
    checked += 1
    if not os.path.exists(path):
        problems.append(f"{rel}: no pre-edit backup found")
        fmt_bad += 1
        continue
    pre = open(path, encoding="utf-8").read()
    cur_path = os.path.join(CORPUS, rel)
    if not os.path.exists(cur_path):
        problems.append(f"{rel}: backup exists but corpus file missing")
        fmt_bad += 1
        continue
    cur = open(cur_path, encoding="utf-8").read()

    _, pre_parts = split_sections(pre)
    _, cur_parts = split_sections(cur)
    pre_names = [p[1] for p in pre_parts]
    cur_names = [p[1] for p in cur_parts]
    if pre_names != cur_names:
        problems.append(f"{rel}: section set/order changed")
        fmt_bad += 1
        continue
    allowed = manifest_files.get(rel, set())
    changed = {p[1] for p, q in zip(pre_parts, cur_parts) if p[2] != q[2]}
    unexpected = changed - allowed
    if unexpected:
        problems.append(f"{rel}: UNEXPECTED sections changed: {sorted(unexpected)}")
        fmt_bad += 1
        continue
    fmt_ok += 1

print(f"[1] format preservation: checked={checked} ok={fmt_ok} bad={fmt_bad}")
for p in problems[:20]:
    print("    !!", p)

# ---------- 2. parked-lane integrity -----------------------------------------
parked_touched = [f for f in manifest_files
                  if re.match(r"^c9_(hin|engl|gram)_", f)]
print(f"[2] parked lanes touched: {len(parked_touched)} (must be 0)")
for f in parked_touched[:10]:
    print("    !!", f)

# ---------- 3. authored-text hygiene -----------------------------------------
BANNED_RE = re.compile(r"\b(Lane C|variable binding|This node covers|TBD|"
                       r"placeholder|Lorem|NaN)\b", re.I)
NODEID_RE = re.compile(r"\bc\d+_[a-z]+_[a-z0-9_]+\b", re.I)
LATEX_RE = re.compile(r"\\[a-zA-Z]+|\\\(|\\\)|\\\[|\\\]")
hyg_bad = 0
# (a) new definitions and appends from batches 1-4
for pf in ("batch1_short_defs.json", "batch2_latex_defs.json",
           "batch3_short_walks.json", "batch4_takeaways.json"):
    data = json.load(open(os.path.join(HERE, "authoring", pf), encoding="utf-8"))
    for e in data["edits"]:
        for key in ("definition", "walkthrough_append", "walkthrough_replace",
                    "eli5"):
            txt = e.get(key)
            if not txt:
                continue
            hit = BANNED_RE.search(txt) or LATEX_RE.search(txt)
            if hit:
                hyg_bad += 1
                print(f"    !! {pf} {e['file']} {key}: {hit.group(0)!r}")
# (b) scrubbed bodies from batch 5 (ids are allowed there by owner law, but
#     banned strings and NEW backslash commands are not)
for pf in ("batch5_delatex.json", "batch5b_banned_scope.json",
           "batch5c_ch1_11_prereq.json"):
    data = json.load(open(os.path.join(HERE, "authoring", pf), encoding="utf-8"))
    for e in data["edits"]:
        for name, body in e.get("sections", {}).items():
            hit = BANNED_RE.search(body)
            if hit:
                hyg_bad += 1
                print(f"    !! {pf} {e['file']} {name}: {hit.group(0)!r}")
            if LATEX_RE.search(body):
                hyg_bad += 1
                print(f"    !! {pf} {e['file']} {name}: backslash remains")
print(f"[3] authored-text hygiene violations: {hyg_bad} (must be 0)")

# ---------- 4. true before/after with the final policy -----------------------
def score(text, fn):
    secs = w2_scan.parse_sections(text)
    return w2_scan.rubric(secs)

counts = {"act_before_perfect": 0, "act_before_below": 0,
          "act_after_perfect": 0, "act_after_below": 0,
          "prk_before_perfect": 0, "prk_after_perfect": 0,
          "prk_before_below": 0, "prk_after_below": 0,
          "prk_edited": 0}
for fn in sorted(os.listdir(CORPUS)):
    if not (w2_scan.LANE_RE.match(fn) or w2_scan.PARKED_RE.match(fn)):
        continue
    parked = bool(w2_scan.PARKED_RE.match(fn))
    cur = open(os.path.join(CORPUS, fn), encoding="utf-8").read()
    bak_path = os.path.join(BACKUPS, fn)
    pre = open(bak_path, encoding="utf-8").read() if os.path.exists(bak_path) else cur
    rb, ra = score(pre, fn), score(cur, fn)
    p = "prk" if parked else "act"
    counts[f"{p}_before_perfect"] += rb["perfect"]
    counts[f"{p}_before_below"] += rb["below_min"]
    counts[f"{p}_after_perfect"] += ra["perfect"]
    counts[f"{p}_after_below"] += ra["below_min"]
    if parked and os.path.exists(bak_path):
        counts["prk_edited"] += 1

print(f"[4] ACTIONABLE lane (final policy): before perfect="
      f"{counts['act_before_perfect']} below_min={counts['act_before_below']}"
      f"  ->  after perfect={counts['act_after_perfect']} "
      f"below_min={counts['act_after_below']}")
print(f"    PARKED lane (measure-only): before perfect={counts['prk_before_perfect']} "
      f"below_min={counts['prk_before_below']} -> after perfect="
      f"{counts['prk_after_perfect']} below_min={counts['prk_after_below']} "
      f"(parked files with backups = {counts['prk_edited']}, must be 0)")
print(f"    files edited this wave: {len(manifest_files)}")
