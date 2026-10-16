"""W4 diagnostic breakdown: R8 hygiene causes + R2 walk-length severity."""
import json, re, os, sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections

HERE = os.path.dirname(os.path.abspath(__file__))
corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
recs = [json.loads(l) for l in open(os.path.join(HERE, "lane_scores_w4.jsonl"), encoding="utf-8")]
act = [r for r in recs if not r["parked"]]

NODE_ID_RE = re.compile(r"\bc\d+_[a-z0-9]+_", re.I)
LATEX_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{")
BANNED = ["Lane C", "variable binding", "This node covers", "TBD", "placeholder", "Lorem"]

cause = {"nodeid": 0, "latex_defwalk": 0, "banned": 0, "none": 0}
banned_files, latex_files = [], []
walkdist = {"lt80": 0, "80_119": 0, "120_149": 0, "ge150_nohint": 0}
r2_def_lt40 = []
where = {"scope": 0, "walk": 0, "def": 0, "eli5": 0, "other_only": 0}
ids_by_subj = {}

for r in act:
    path = os.path.join(corpus, r["file"])
    text = open(path, encoding="utf-8", errors="replace").read()
    sec = parse_sections(text)
    dw = sec.get("DEFINITION", "")
    ww = sec.get("WALKTHROUGH", "")
    has_id = bool(NODE_ID_RE.search(text))
    has_lx = bool(LATEX_RE.search(dw + ww))
    has_ban = any(b.lower() in text.lower() for b in BANNED)
    if has_id:
        cause["nodeid"] += 1
        ids_by_subj[r["subject"]] = ids_by_subj.get(r["subject"], 0) + 1
    if has_lx:
        cause["latex_defwalk"] += 1
        latex_files.append(r["file"])
    if has_ban:
        cause["banned"] += 1
        banned_files.append(r["file"])
    if not (has_id or has_lx or has_ban):
        cause["none"] += 1
    hits = {k: bool(NODE_ID_RE.search(v)) for k, v in sec.items()
            if k in ("SCOPE_BOUNDARY", "WALKTHROUGH", "DEFINITION", "ELI5")}
    if hits.get("SCOPE_BOUNDARY"):
        where["scope"] += 1
    if hits.get("WALKTHROUGH"):
        where["walk"] += 1
    if hits.get("DEFINITION"):
        where["def"] += 1
    if hits.get("ELI5"):
        where["eli5"] += 1
    if has_id and not any(hits.values()):
        where["other_only"] += 1
    if "R2_walk150" in r["misses"]:
        n = len(ww.split())
        if n < 80:
            walkdist["lt80"] += 1
        elif n < 120:
            walkdist["80_119"] += 1
        elif n < 150:
            walkdist["120_149"] += 1
        else:
            walkdist["ge150_nohint"] += 1
        if len(dw.split()) < 40:
            r2_def_lt40.append(r["file"])

print("R8 causes:", cause)
print("banned files:", banned_files[:10], "total", len(banned_files))
print("latex files sample:", latex_files[:10], "total", len(latex_files))
print("R2 walk-length distribution:", walkdist)
print("R2 nodes whose DEF also <40w:", len(r2_def_lt40))
print("node-id locations (non-exclusive):", where)
print("node-id files by subject:", dict(sorted(ids_by_subj.items(), key=lambda kv: -kv[1])))
