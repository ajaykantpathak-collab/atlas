"""W4 final verification battery."""
import json, os, re, sys, hashlib, random
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, ".")
from scan_depth_v2 import parse_sections, depth_metrics, wc
from scan_lane_w4 import PARKED, BANNED_STRINGS, NODE_ID_RE, LATEX_RE, DERIV_HINT_RE
from delatex_w4 import split_sections

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
recs = [json.loads(l) for l in open(os.path.join(HERE, "w4_lane_scores.jsonl"), encoding="utf-8")]
act = [r for r in recs if not r["parked"]]

# 1. Sample 12 remaining R2 misses: do they genuinely lack a worked step?
print("=== 1. Remaining R2 misses: genuine vs heuristic ===")
r2miss = [r for r in act if "R2_walk150" in r["misses"]]
bysubj = {}
for r in r2miss:
    bysubj.setdefault(r["subject"], []).append(r)
random.seed(7)
sample = []
for subj in ["geo", "ps", "bio", "hs", "hist", "biotech", "soc", "acc", "cs", "bs", "eco", "psy"]:
    if subj in bysubj:
        sample.append(random.choice(bysubj[subj]))
genuine = 0
for r in sample:
    text = open(os.path.join(CORPUS, r["file"]), encoding="utf-8", errors="replace").read()
    w = parse_sections(text).get("WALKTHROUGH", "")
    # soft check: does it contain a concrete worked element the strict regex misses?
    soft = bool(re.search(r"\d", w) and re.search(r"₹|%|per cent|for example|e\.g\.|imagine|consider|case|scenario|classify|step", w, re.I))
    if not soft:
        genuine += 1
    print(f"  {r['file']:<28} walk={wc(w):>3}w softstep={'Y' if soft else 'N'}")

# 2. Parked lanes untouched?
print("\n=== 2. Parked lanes untouched ===")
manifest_files = []
for mf in ["delatex_manifest.jsonl", os.path.join("authoring", "w4_apply_manifest.jsonl")]:
    p = os.path.join(HERE, mf)
    if os.path.exists(p):
        manifest_files += [json.loads(l)["file"] for l in open(p, encoding="utf-8")]
parked_edits = [f for f in manifest_files if f.split("_")[1] in PARKED]
print(f"total manifest edits: {len(manifest_files)}, parked-lane edits: {len(parked_edits)}")

# 3. Digest guard spot check: 5 edited files vs backup — only intended sections differ
print("\n=== 3. Digest spot-check (backup vs current, 6 files) ===")
backups = os.path.join(HERE, "backups_w4")
sample_files = random.sample(manifest_files, 6)
all_ok = True
for fn in sample_files:
    bak = os.path.join(backups, fn)
    cur = os.path.join(CORPUS, fn)
    if not os.path.exists(bak):
        print("  no backup:", fn)
        continue
    old = open(bak, encoding="utf-8").read()
    new = open(cur, encoding="utf-8").read()
    _, oparts = split_sections(old)
    _, nparts = split_sections(new)
    names_o = [p[1] for p in oparts]
    names_n = [p[1] for p in nparts]
    if names_o != names_n:
        print("  SECTION SET CHANGED:", fn)
        all_ok = False
        continue
    changed = []
    for (h1, n1, b1), (h2, n2, b2) in zip(oparts, nparts):
        if b1 != b2:
            changed.append(n1)
    print(f"  {fn:<28} changed sections: {changed}")

# 4. Slop scan of ALL authored payload text
print("\n=== 4. Slop/node-id scan of authored payloads ===")
import glob
bad = 0
total_texts = 0
for pf in glob.glob(os.path.join(HERE, "authoring", "w4_batch*.json")):
    payload = json.load(open(pf, encoding="utf-8"))
    for e in payload["edits"]:
        for key in ("definition", "eli5", "walkthrough_append", "walkthrough_replace"):
            t = e.get(key)
            if not t:
                continue
            total_texts += 1
            if any(re.search(r"\b" + re.escape(b) + r"\b", t, re.I) for b in BANNED_STRINGS):
                print("  BANNED in", e["file"], key)
                bad += 1
            if NODE_ID_RE.search(t):
                print("  NODE-ID in", e["file"], key)
                bad += 1
            if LATEX_RE.search(t):
                print("  LATEX in", e["file"], key)
                bad += 1
print(f"  authored texts scanned: {total_texts}, violations: {bad}")

# 5. Final counts
perfect = sum(1 for r in act if r["rubric_score"] == 8)
print("\n=== 5. Final counts ===")
print(f"actionable: {len(act)}, 8/8: {perfect}, below: {len(act) - perfect}")
print(f"files edited this wave (manifests + hand fixes): {len(set(manifest_files))}")
