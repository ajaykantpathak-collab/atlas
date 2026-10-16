"""Content-depth scanner v2 for the CBSE enhanced_nodes_md corpus.

Produces:
  - depth histogram (teaching depth score, composition-based)
  - per-class/subject thin counts
  - ranked pick list of the thinnest nodes (class 9-10 core subjects first)
  - an authoring worksheet JSONL for the picked nodes (the sections an
    author needs, so files are read once, not 150 times)

Owner-parked lanes are measured but excluded from the authoring pick:
Hindi/English content-quality waves (hin, eng, engl, english, gram; the
c9_hin_ga soup lane) per AGENTS.md 2026-09-29 decision; Sanskrit/Urdu are
out of scope. _comp companion docs are a different format and excluded.

Usage: python scan_depth_v2.py [--corpus DIR] [--out DIR] [--pick N]
"""

import argparse
import json
import os
import re
import sys
from collections import Counter, defaultdict

DEFAULT_CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
DEFAULT_OUT = r"D:\platform\deploy\backend\content_tools"

SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)
NAME_RE = re.compile(r"^c(\d+)_([a-z]+)_(?:cbse|ch\d*|u\d+|k[a-z]*|\d*)", re.I)
CORE_SUBJECTS = {"math", "phy", "physics", "chem", "bio", "sci"}
PARKED_SUBJECTS = {"hin", "eng", "engl", "english", "gram", "san", "urd", "hind"}

MAX_FILE_BYTES = 4_000_000


def subject_of(fn: str) -> str:
    m = re.match(r"^c\d+_([a-z]+)_", fn)
    return m.group(1) if m else "?"


def grade_of(fn: str) -> int:
    m = re.match(r"^c(\d+)_", fn)
    return int(m.group(1)) if m else 99


def parse_sections(text: str) -> dict:
    matches = list(SECTION_RE.finditer(text))
    return {
        m.group(1): text[m.end(): matches[i + 1].start() if i + 1 < len(matches) else len(text)].strip()
        for i, m in enumerate(matches)
    }


def wc(s: str) -> int:
    return len(s.split())


def depth_metrics(sections: dict) -> dict:
    d = sections.get("DEFINITION", "")
    w = sections.get("WALKTHROUGH", "")
    e = sections.get("ELI5", "")
    mc = sections.get("COMMON_MISCONCEPTION", "")
    qs = [k for k in sections if k.startswith("DIAGNOSTIC_QUESTION_")]
    ans = [sections[k] for k in sections if k.startswith("DIAGNOSTIC_ANSWER_")]
    wes = [k for k in sections if k.startswith("WORKED_EXAMPLE_")]

    avg_ans = (sum(wc(a) for a in ans) / len(ans)) if ans else 0
    filler = bool(re.match(r"^\s*This node\b", d, re.I))

    # ---- thinness penalty (0 = deep, higher = thinner) ----
    p = 0.0
    dw, ww, ew = wc(d), wc(w), wc(e)
    # definition
    if dw == 0:
        p += 30
    elif dw < 20:
        p += 26
    elif dw < 25:
        p += 16
    elif dw < 35:
        p += 9
    elif dw < 50:
        p += 4
    if filler:
        p += 8  # banned filler opener
    # walkthrough
    if ww == 0:
        p += 28
    elif ww < 40:
        p += 24
    elif ww < 80:
        p += 18
    elif ww < 120:
        p += 9
    elif ww < 160:
        p += 4
    # eli5
    if ew == 0:
        p += 10
    elif ew < 15:
        p += 4
    # diagnostics
    if len(qs) == 0:
        p += 14
    elif len(qs) < 2:
        p += 8
    if ans and avg_ans < 10:
        p += 7
    elif ans and avg_ans < 15:
        p += 3
    # worked examples / misconception
    if len(wes) == 0:
        p += 5
    elif len(wes) == 1:
        p += 2
    if wc(mc) == 0:
        p += 5
    elif wc(mc) < 15:
        p += 2

    return {
        "thinness": p, "def_words": dw, "walk_words": ww, "eli5_words": ew,
        "diag_q": len(qs), "avg_ans_words": round(avg_ans, 1),
        "worked_n": len(wes), "mc_words": wc(mc), "def_filler": filler,
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=DEFAULT_CORPUS)
    ap.add_argument("--out", default=DEFAULT_OUT)
    ap.add_argument("--pick", type=int, default=150)
    args = ap.parse_args()

    records, worksheet = [], []
    hist = Counter()
    thin_by_cls_subj = defaultdict(int)
    totals = Counter()

    for fn in sorted(os.listdir(args.corpus)):
        path = os.path.join(args.corpus, fn)
        if not fn.endswith(".md") or not os.path.isfile(path):
            continue
        totals["md_total"] += 1
        if "_comp" in fn:
            totals["comp_docs"] += 1
            continue
        totals["teaching_nodes"] += 1
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            text = f.read(MAX_FILE_BYTES)
        sections = parse_sections(text)
        m = depth_metrics(sections)
        rec = {"file": fn, "grade": grade_of(fn), "subject": subject_of(fn),
               "parked": subject_of(fn) in PARKED_SUBJECTS, **m}
        records.append(rec)
        hist[int(m["thinness"] // 5) * 5] += 1
        if m["thinness"] >= 10:
            thin_by_cls_subj[(rec["grade"], rec["subject"])] += 1

    # ---- histogram ----
    print("=== THINNESS HISTOGRAM (teaching nodes only) ===")
    for b in sorted(hist):
        print(f"  {b:>3}-{b+4:<3} {hist[b]:>6}")
    print(f"totals: {dict(totals)}")
    n_thin10 = sum(1 for r in records if r["thinness"] >= 10)
    n_thin10_live = sum(1 for r in records if r["thinness"] >= 10 and not r["parked"])
    print(f"thin>=10: {n_thin10} (non-parked: {n_thin10_live})")
    print("\n=== thin>=10 by (grade,subject) ===")
    for (g, s), c in sorted(thin_by_cls_subj.items()):
        parked = "PARKED-LANE" if s in PARKED_SUBJECTS else ""
        print(f"  c{g:<2} {s:<8} {c:>3}  {parked}")

    # ---- pick list ----
    def sort_key(r):
        g = r["grade"]
        grade_rank = 0 if g in (9, 10) else (1 if g in (11, 12) else 2)
        core = 0 if r["subject"] in CORE_SUBJECTS else 1
        slimness = r["def_words"] + r["walk_words"] + r["eli5_words"]
        return (-r["thinness"], grade_rank, core, slimness, g, r["file"])

    eligible = [r for r in records if not r["parked"]]
    picked = sorted(eligible, key=sort_key)[: args.pick]

    print(f"\n=== PICKED {len(picked)} (non-parked, priority-sorted) ===")
    for r in picked[:30]:
        print(f"  {r['thinness']:5.1f} c{r['grade']} {r['subject']:<6} "
              f"def={r['def_words']:<3}w walk={r['walk_words']:<4}w "
              f"ans={r['avg_ans_words']:<5} {r['file']}")

    # ---- write outputs ----
    with open(os.path.join(args.out, "depth_scores_v2.jsonl"), "w", encoding="utf-8") as f:
        for r in records:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    with open(os.path.join(args.out, "depth_pick_150.json"), "w", encoding="utf-8") as f:
        json.dump(picked, f, ensure_ascii=False, indent=1)

    # ---- authoring worksheet: dump the sections the author needs ----
    with open(os.path.join(args.out, "authoring_worksheet.jsonl"), "w", encoding="utf-8") as f:
        for r in picked:
            path = os.path.join(args.corpus, r["file"])
            text = open(path, encoding="utf-8", errors="replace").read()
            s = parse_sections(text)
            ws = {
                "file": r["file"], "grade": r["grade"], "subject": r["subject"],
                "scope": s.get("SCOPE_BOUNDARY", "")[:300],
                "definition": s.get("DEFINITION", ""),
                "eli5": s.get("ELI5", ""),
                "walkthrough": s.get("WALKTHROUGH", ""),
                "misconception": s.get("COMMON_MISCONCEPTION", ""),
                "diag_q": [s[k] for k in sorted(s) if k.startswith("DIAGNOSTIC_QUESTION_")][:3],
                "cognitive": s.get("COGNITIVE_LEVEL", ""),
            }
            f.write(json.dumps(ws, ensure_ascii=False) + "\n")
    print(f"\nWrote depth_scores_v2.jsonl, depth_pick_150.json, authoring_worksheet.jsonl to {args.out}")


if __name__ == "__main__":
    main()
