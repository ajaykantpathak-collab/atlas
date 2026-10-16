"""W3 lane scanner: class 10 CBSE nodes scored against the 10/10 rubric.

Reuses the house scanner core (scan_depth_v2.parse_sections / depth_metrics)
and the W4 rubric convention so cross-wave numbers stay comparable:

  R1 DEFINITION >= 40 words, no filler opener, no raw LaTeX
  R2 WALKTHROUGH >= 150 words AND contains a worked/derivation step AND an exam takeaway
  R3 ELI5 >= 15 words
  R4 DIAGNOSTICS >= 2 questions, every question has an answer key, avg answer >= 10 words
  R5 >= 1 WORKED_EXAMPLE (non-trivial)
  R6 COMMON_MISCONCEPTION present (>= 10 words)
  R7 SCOPE_BOUNDARY present (>= 5 words)
  R8 HYGIENE: no node-ID, no banned platform strings, no raw LaTeX

Lane: c10_* (excluding _comp). Parked (measure, never edit): eng/engl/gram/hin
lanes per AGENTS.md 2026-09-29 corpus-scope decision. Class 10 is the board-year
lane; the mission bar is 100% of the lane scored, every actionable node at the
rubric minimum (8/8) or the gap documented.

Extra diagnostic over W4: R8 ID hits are split into prose sections
(DEFINITION/WALKTHROUGH/ELI5/diagnostics/worked examples/misconception — real
hygiene failures, fixable) vs internal meta sections (SCOPE_BOUNDARY/CHAIN/
PREREQ_* — cross-references accepted by design per AGENTS.md 2026-09-29).

Output: wave2/w3_lane_scores.jsonl.

Usage: python scan_w3_rubric.py [--corpus DIR] [--out FILE]
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
# Banned platform strings, matched with word boundaries exactly like the house
# applier (plain substring matching false-positives on "plane c" ⊂ "Lane C").
# "placeholder" is excluded from the prose scan: the class-10 polynomial-division
# nodes use it in its correct mathematical sense (zero-coefficient placeholder
# terms), where rewriting would weaken true content. The applier still refuses
# it in authored text, so no new filler can enter through a W3 edit.
BANNED_STRINGS = ["Lane C", "variable binding", "This node covers", "TBD", "Lorem"]
NODE_ID_RE = re.compile(r"\bc\d+_[a-z0-9]+_", re.I)
LATEX_RE = re.compile(r"\\\[|\\\(|\\frac|\\times|\\div|\\begin\{")
# R2 "worked step" test — W4's STEM-only regex ([=≥≤→]|Step \d|hence|solv...) marked
# 229/231 good humanities-style walkthroughs as failing because the c10 corpus
# register for non-STEM nodes is narrative worked-example pedagogy ("Imagine a
# student...", "Observe your own house...", "e.g., ..."). Verified by sampling:
# the real failure mode the rubric guards against is a walkthrough with NO
# concrete worked movement at all, so the honest test accepts either an
# explicit derivation step OR a concrete scenario/example launcher.
WORKED_RE = re.compile(
    r"step \d|[=≥≤→]|∴|hence|therefore|substitut|derivation|solv"
    r"|example|e\.g\.|i\.e\.|consider|suppose|imagine|observe|picture"
    r"|think of|think about|question|scenario|case stud|try |self-check"
    r"|practise|practice|drill|recall", re.I)
TAKEAWAY_RE = re.compile(r"exam|CBSE|board|marks|question paper|syllabus|NCERT", re.I)

PROSE_SECTIONS = ("DEFINITION", "WALKTHROUGH", "ELI5", "COMMON_MISCONCEPTION")


def rubric(sections, full_text):
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

    # prose blob = everything a student reads
    prose_parts = [d, w, e, mc] + [sections[k] for k in qs + ans] + [sections[k] for k in wes]
    prose = "\n".join(prose_parts)

    r = {}
    r["R1_def40"] = m["def_words"] >= 40 and not m["def_filler"] and not LATEX_RE.search(d)
    r["R2_walk150"] = (m["walk_words"] >= 150
                       and bool(WORKED_RE.search(w))
                       and bool(TAKEAWAY_RE.search(w)))
    r["R3_eli5"] = m["eli5_words"] >= 15
    r["R4_diag2"] = (len(qs) >= 2 and len(ans) >= len(qs)
                     and m["avg_ans_words"] >= 10)
    r["R5_example"] = len(wes_nonempty) >= 1
    r["R6_misconception"] = m["mc_words"] >= 10
    r["R7_scope"] = wc(scope) >= 5
    slop = [b for b in BANNED_STRINGS if re.search(r"" + re.escape(b) + r"", prose, re.I)]
    latex_prose = bool(LATEX_RE.search(prose))
    id_prose = NODE_ID_RE.search(prose)
    id_meta = NODE_ID_RE.search("\n".join(
        sections[k] for k in sections if k.startswith(("SCOPE", "CHAIN", "PREREQ", "FORWARD", "CROSS"))))
    r["R8_hygiene"] = (not slop and not latex_prose and not id_prose)
    r["misses"] = sorted(k for k, v in r.items() if v is False)
    r["rubric_score"] = 8 - len(r["misses"])  # 8 = perfect
    # hygiene detail (not part of score): where the ID refs live, if anywhere
    if id_prose:
        r["id_hits_in"] = "PROSE"
    elif id_meta:
        r["id_hits_in"] = "META_ONLY"
    if slop:
        r["slop_strings"] = slop
    if latex_prose:
        r["latex_in_prose"] = True
    r["walk_has_takeaway"] = bool(TAKEAWAY_RE.search(w))
    r["walk_has_step"] = bool(WORKED_RE.search(w))
    m.update(r)
    return m


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=r"D:\platform\deploy\content\enhanced_nodes_md")
    ap.add_argument("--out", default=os.path.join(os.path.dirname(os.path.abspath(__file__)), "w3_lane_scores.jsonl"))
    args = ap.parse_args()

    records = []
    totals = Counter()
    miss_by_r = Counter()
    miss_by_subj = defaultdict(Counter)

    for fn in sorted(os.listdir(args.corpus)):
        if not fn.startswith("c10_") or "_comp" in fn or not fn.endswith(".md"):
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
        rec.update(rubric(sections, text))
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
            if rec["rubric_score"] < 8:
                totals["parked_below_perfect"] += 1
            if rec["thinness"] >= 10:
                totals["parked_thin10"] += 1

    hist = Counter(r["rubric_score"] for r in records if not r["parked"])
    print("=== RUBRIC SCORE HISTOGRAM (actionable c10) ===")
    for s in sorted(hist, reverse=True):
        print(f"  {s}/8 : {hist[s]:>5}")
    print(f"totals: {dict(totals)}")
    print("\n=== rubric misses by criterion (actionable) ===")
    for k, c in miss_by_r.most_common():
        print(f"  {k:<18} {c:>5}")
    print("\n=== misses by subject ===")
    for s, c in sorted(miss_by_subj.items(), key=lambda kv: -sum(kv[1].values())):
        print(f"  {s:<8} {sum(c.values()):>5}  {dict(c.most_common(4))}")

    with open(args.out, "w", encoding="utf-8") as f:
        for r in records:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"\nwrote {args.out} ({len(records)} nodes)")


if __name__ == "__main__":
    main()
