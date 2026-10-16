"""W4 lane scanner v2: class 11-12 CBSE nodes, W3-convention rubric (comparable).

Adopts the exact rubric of scan_w3_rubric.py so cross-wave numbers are comparable:
  R1 DEFINITION >= 40 words, no filler opener, no raw LaTeX
  R2 WALKTHROUGH >= 150 words AND worked/derivation step AND exam takeaway
  R3 ELI5 >= 15 words
  R4 DIAGNOSTICS >= 2 Q, every Q has an answer key, avg answer >= 10 words
  R5 >= 1 non-trivial WORKED_EXAMPLE
  R6 COMMON_MISCONCEPTION >= 10 words
  R7 SCOPE_BOUNDARY >= 5 words
  R8 HYGIENE: prose (DEF/WALK/ELI5/MC + DIAGNOSTIC_*/WORKED_EXAMPLE_*/COMPETENCY_*)
     free of node-IDs, banned strings, raw LaTeX. Meta sections (SCOPE/CHAIN/PREREQ/
     FORWARD/CROSS) are accepted-by-design id carriers (AGENTS.md 2026-09-29).

Lane: c11_* / c12_* (excluding _comp). Parked (scored, never edited):
eng/engl/gram/hin lanes. Output: wave2/w4_lane_scores.jsonl.
"""

import argparse
import json
import os
import re
import sys
from collections import Counter, defaultdict

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from scan_depth_v2 import parse_sections, depth_metrics, wc, subject_of, grade_of  # noqa: E402

PARKED = {"eng", "engl", "english", "gram", "hin", "hind"}
BANNED_STRINGS = ["Lane C", "variable binding", "This node covers", "TBD", "placeholder", "Lorem"]
NODE_ID_RE = re.compile(r"\bc\d+_[a-z0-9]+_", re.I)
LATEX_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{|\$[^$]+\$")
DERIV_HINT_RE = re.compile(r"[=≥≤→]|Step \d|step \d|Example|∴|hence|therefore|substitut|derivation|solving", re.I)
TAKEAWAY_RE = re.compile(r"exam|CBSE|board|marks|question paper|syllabus|NCERT", re.I)


def rubric(sections):
    m = depth_metrics(sections)
    d = sections.get("DEFINITION", "")
    w = sections.get("WALKTHROUGH", "")
    e = sections.get("ELI5", "")
    mc = sections.get("COMMON_MISCONCEPTION", "")
    scope = sections.get("SCOPE_BOUNDARY", "")
    qs = sorted(k for k in sections if k.startswith("DIAGNOSTIC_QUESTION_"))
    ans = sorted(k for k in sections if k.startswith("DIAGNOSTIC_ANSWER_"))
    wes = sorted(k for k in sections if k.startswith("WORKED_EXAMPLE_"))
    wes_nonempty = [k for k in wes if wc(sections[k]) >= 10]

    prose_parts = [d, w, e, mc] + [sections[k] for k in qs + ans] + [sections[k] for k in wes]
    prose = "\n".join(prose_parts)

    r = {}
    r["R1_def40"] = m["def_words"] >= 40 and not m["def_filler"] and not LATEX_RE.search(d)
    r["R2_walk150"] = (m["walk_words"] >= 150
                       and bool(DERIV_HINT_RE.search(w))
                       and bool(TAKEAWAY_RE.search(w)))
    r["R3_eli5"] = m["eli5_words"] >= 15
    r["R4_diag2"] = (len(qs) >= 2 and len(ans) >= len(qs)
                     and m["avg_ans_words"] >= 10)
    r["R5_example"] = len(wes_nonempty) >= 1
    r["R6_misconception"] = m["mc_words"] >= 10
    r["R7_scope"] = wc(scope) >= 5
    slop = [b for b in BANNED_STRINGS if b.lower() in prose.lower()]
    latex_prose = bool(LATEX_RE.search(prose))
    id_prose = NODE_ID_RE.search(prose)
    id_meta = NODE_ID_RE.search("\n".join(
        sections[k] for k in sections if k.startswith(("SCOPE", "CHAIN", "PREREQ", "FORWARD", "CROSS"))))
    r["R8_hygiene"] = (not slop and not latex_prose and not id_prose)
    r["misses"] = sorted(k for k, v in r.items() if v is False)
    r["rubric_score"] = 8 - len(r["misses"])
    if id_prose:
        r["id_hits_in"] = "PROSE"
    elif id_meta:
        r["id_hits_in"] = "META_ONLY"
    if slop:
        r["slop_strings"] = slop
    if latex_prose:
        r["latex_in_prose"] = True
    r["walk_has_takeaway"] = bool(TAKEAWAY_RE.search(w))
    r["walk_has_step"] = bool(DERIV_HINT_RE.search(w))
    m.update(r)
    return m


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=r"D:\platform\deploy\content\enhanced_nodes_md")
    ap.add_argument("--out", default=os.path.join(os.path.dirname(os.path.abspath(__file__)), "w4_lane_scores.jsonl"))
    args = ap.parse_args()

    records = []
    totals = Counter()
    miss_by_r = Counter()
    miss_by_subj = defaultdict(Counter)

    for fn in sorted(os.listdir(args.corpus)):
        if not fn.startswith(("c11_", "c12_")) or "_comp" in fn or not fn.endswith(".md"):
            continue
        path = os.path.join(args.corpus, fn)
        if not os.path.isfile(path):
            continue
        totals["lane_nodes"] += 1
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            text = f.read()
        sections = parse_sections(text)
        rec = {"file": fn, "grade": grade_of(fn), "subject": subject_of(fn),
               "parked": subject_of(fn) in PARKED}
        rec.update(rubric(sections))
        rec["thinness"] = rec.pop("thinness", None)
        records.append(rec)
        if not rec["parked"]:
            totals["actionable"] += 1
            if rec["rubric_score"] < 8:
                totals["below_perfect"] += 1
                for miss in rec["misses"]:
                    miss_by_r[miss] += 1
                    miss_by_subj[rec["subject"]][miss] += 1
            if rec["thinness"] >= 10:
                totals["thin10"] += 1
        else:
            totals["parked"] += 1
            if rec["thinness"] >= 10:
                totals["parked_thin10"] += 1

    hist = Counter(r["rubric_score"] for r in records if not r["parked"])
    print("=== RUBRIC HISTOGRAM (actionable c11+c12, W3 convention) ===")
    for s in sorted(hist, reverse=True):
        print(f"  {s}/8 : {hist[s]:>5}")
    print(f"totals: {dict(totals)}")
    print("\n=== misses by criterion ===")
    for k, c in miss_by_r.most_common():
        print(f"  {k:<14} {c:>5}")
    print("\n=== misses by subject ===")
    for s, c in sorted(miss_by_subj.items(), key=lambda kv: -sum(kv[1].values())):
        print(f"  {s:<8} {sum(c.values()):>5}  {dict(c.most_common(4))}")

    with open(args.out, "w", encoding="utf-8") as f:
        for r in records:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"\nwrote {args.out} ({len(records)} nodes)")


if __name__ == "__main__":
    main()
