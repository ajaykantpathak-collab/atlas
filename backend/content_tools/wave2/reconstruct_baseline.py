"""Reconstruct the pre-wave baseline under the FINAL rubric and final debt counts.

Baseline state: backups_w1 copy for the 617 touched files, live corpus for the rest.
Final state: live corpus. Both scored with the current scanner logic.
"""
import warnings
warnings.filterwarnings("ignore")
import json
import os
import re
import sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.dirname(HERE))
sys.path.insert(0, r"D:\platform\deploy\backend\content_tools\wave2")
from scan_wave2_rubric import parse_sections, score_node  # noqa: E402
from apply_content_depth import split_sections  # noqa: E402

corpus = r"D:\platform\deploy\content\enhanced_nodes_md"
bak = os.path.join(HERE, "backups_w1")
touched = {f for f in os.listdir(bak) if f.endswith(".md")}

base_recs, final_recs = [], []
for fn in sorted(os.listdir(corpus)):
    if not fn.endswith(".md") or "_comp" in fn:
        continue
    m = re.match(r"^c([678])_", fn)
    if not m:
        continue
    src = os.path.join(bak, fn) if fn in touched else os.path.join(corpus, fn)
    text = open(src, encoding="utf-8", errors="replace").read()
    base_recs.append(score_node(fn, parse_sections(text)))
    cur = open(os.path.join(corpus, fn), encoding="utf-8", errors="replace").read()
    final_recs.append(score_node(fn, parse_sections(cur)))

def summarize(recs, label):
    act = [r for r in recs if not r["parked"]]
    hist = Counter(r["score10"] for r in act)
    fails = Counter()
    for r in act:
        for k, v in r["checks"].items():
            if not v:
                fails[k] += 1
    mv = sum(1 for r in act if not r["min_viable"])
    print(f"--- {label} ---")
    print("  10/10:", hist[8], "/", len(act), f"({hist[8]/len(act)*100:.1f}%)")
    print("  failing checks:", dict(fails))
    print("  below min-bar:", mv)
    return act

base_act = summarize(base_recs, "BASELINE (reconstructed, final rubric)")
final_act = summarize(final_recs, "FINAL")

# remaining beyond-rubric debt in the actionable lane
q_art_nodes = [r for r in final_act if r["diag_suspects"]]
kinds = Counter()
for r in q_art_nodes:
    for s in r["diag_suspects"]:
        kinds[s.split(":")[1]] += 1
print("\nremaining beyond-rubric debt (actionable):")
print("  nodes with suspect Q slots:", len(q_art_nodes), "| kinds:", dict(kinds))
print("  id_refs in prose:", sum(r["id_refs"] for r in final_act))
thin_ans = sum(1 for r in final_act for s in r["diag_suspects"] if s.endswith("answer_key_thin"))
print("  answer_key_thin slots:", thin_ans)
json.dump({"baseline": base_recs, "final": final_recs},
          open(os.path.join(HERE, "w1_baseline_vs_final.json"), "w", encoding="utf-8"))
print("\nwrote w1_baseline_vs_final.json")
