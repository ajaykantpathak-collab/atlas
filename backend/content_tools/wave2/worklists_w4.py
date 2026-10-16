"""W4: corrected R8 semantics (word-boundary slop) + definitive fix worklists."""
import json, os, re, sys
from collections import Counter

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections, wc

HERE = os.path.dirname(os.path.abspath(__file__))
CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
ID_RE = re.compile(r"\bc\d{1,2}_[a-z]{2,}(?:_[a-z0-9]+)+\b", re.I)
LATEX_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{|\$[^$]+\$")
SLOP_RE = [(re.compile(r"\b" + re.escape(b).replace(r"\ ", r"\s+") + r"\b", re.I), b)
           for b in ["Lane C", "variable binding", "This node covers", "TBD", "placeholder", "Lorem"]]

recs = [json.loads(l) for l in open(os.path.join(HERE, "w4_lane_scores.jsonl"), encoding="utf-8")]
act = [r for r in recs if not r["parked"]]

wl = {"r1": [], "r2_tierA": [], "r2_tierC": [], "r3": [], "latex": [], "slop": [], "id_only": []}
stats = Counter()
begin_files = []

for r in act:
    text = open(os.path.join(CORPUS, r["file"]), encoding="utf-8", errors="replace").read()
    secs = parse_sections(text)
    d = secs.get("DEFINITION", ""); w = secs.get("WALKTHROUGH", ""); e = secs.get("ELI5", "")
    prose_keys = [k for k in secs
                  if k in ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION")
                  or k.startswith(("DIAGNOSTIC_", "WORKED_EXAMPLE_", "COMPETENCY_"))]
    prose = "\n".join(secs[k] for k in prose_keys)
    id_p = bool(ID_RE.search(prose))
    lx_p = bool(LATEX_RE.search(prose))
    slop_p = [b for pat, b in SLOP_RE if pat.search(prose)]
    if "\\begin{" in prose:
        begin_files.append(r["file"])

    if "R1_def40" in r["misses"]:
        cause = []
        if wc(d) < 40: cause.append("short")
        if re.match(r"^\s*This node\b", d, re.I): cause.append("filler")
        if LATEX_RE.search(d): cause.append("latex")
        wl["r1"].append({"file": r["file"], "cause": cause, "def_words": wc(d),
                         "grade": r["grade"], "subject": r["subject"]})
    if "R2_walk150" in r["misses"]:
        n = wc(w)
        rec = {"file": r["file"], "walk_words": n, "grade": r["grade"], "subject": r["subject"],
               "has_step": r["walk_has_step"], "has_takeaway": r["walk_has_takeaway"]}
        if n < 150:
            wl["r2_tierA"].append(rec)
        else:
            wl["r2_tierC"].append(rec)
    if "R3_eli5" in r["misses"]:
        wl["r3"].append({"file": r["file"], "eli5_words": wc(e)})
    if lx_p:
        wl["latex"].append(r["file"])
    if slop_p:
        wl["slop"].append({"file": r["file"], "slop": slop_p})
    if id_p and not lx_p and not slop_p:
        wl["id_only"].append(r["file"])

for k, v in wl.items():
    fn = os.path.join(HERE, f"worklist_{k}.json")
    json.dump(v, open(fn, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

print("worklist sizes:", {k: len(v) for k, v in wl.items()})
print("R1 causes:", Counter(tuple(x["cause"]) for x in wl["r1"]).most_common())
print("R1 by subject:", Counter(x["subject"] for x in wl["r1"]).most_common())
print("R2 tierA by subject:", Counter(x["subject"] for x in wl["r2_tierA"]).most_common())
print("R2 tierA walk-length:", Counter(x["walk_words"] // 20 * 20 for x in wl["r2_tierA"]).most_common())
print("R2 tierC legs:", Counter((x["has_step"], x["has_takeaway"]) for x in wl["r2_tierC"]).most_common())
print("R2 tierC by subject:", Counter(x["subject"] for x in wl["r2_tierC"]).most_common(8))
print("slop files:", wl["slop"])
print("begin{} files:", len(begin_files), begin_files[:10])
print("r3:", wl["r3"])
