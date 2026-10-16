"""W6 lane scanner — ISC classes 11-12 (cisce_nodes_v2 corpus). v2 calibrated.

Scores every ISC c11/c12 node against the wave-2 10/10 rubric:
  R1 DEFINITION >= 40 words, no filler opener ("This node ...")
  R2 WALKTHROUGH >= 150 words AND step/derivation signal AND exam takeaway
  R3 ELI5 genuine (>= 20 words, not a stub)
  R4 DIAGNOSTICS >= 2 questions with answers, avg answer >= 15 words (keys)
  R5 EXAMPLES >= 1 WORKED_EXAMPLE with PROBLEM/SOLUTION
  R6 MISCONCEPTION note >= 15 words
  R7 SCOPE_BOUNDARY with TEACH marker
  R8 HYGIENE (no visible node ids in prose sections, no template rot)

Calibration notes (validated against sampled files):
- Node ids BY DESIGN in: *_NODE_IDS, CROSS_SUBJECT_PREREQS (opaque fetch keys,
  owner decision 2026-09-29). Everything else is visible prose.
- "NaN" in AI/CS data-cleaning lessons, "placeholder" as accounting
  vocabulary, "TODO" in code exercises, "as an AI evaluator" role prompts are
  CURRICULUM VOCABULARY, not slop — not flagged. Template rot IS flagged.
- Step signal for theory subjects includes bullet lists and First/Second/…
  ordinal prose, not just numbered derivations.

Parked families (owner decision 2026-09-29): c11/c12_eng*, c11/c12_hin —
measured only, never edited.

Usage: python w6_scan_isc.py [--corpus DIR] [--out DIR]
"""

import argparse
import json
import os
import re
from collections import Counter, defaultdict

DEFAULT_CORPUS = r"D:\platform\deploy\content\cisce_nodes_v2"
DEFAULT_OUT = r"D:\platform\deploy\backend\content_tools\wave2"

FILE_RE = re.compile(r"^c1[12]_([a-z]+(?:_[a-z0-9]+)*?)_isc_(\d+)_(\d+)\.md$")
PARKED_SUBJECTS = {"eng", "eng_elec", "eng_mod", "hin"}

NODEID_RE = re.compile(r"\bc1[12]_(?:[a-z0-9]+_)?(?:isc|icse|cbse)_\d+_\d+\b")
KEY_SECTIONS_SUFFIX = ("_NODE_IDS",)          # ids travel as keys by design
KEY_SECTIONS_EXACT = {"CROSS_SUBJECT_PREREQS"}
# template-rot / slop strings that are never legitimate curriculum content
BANNED = [r"\bLane C\b", r"\bvariable binding\b", r"\bTBD\b", r"Lorem ipsum",
          r"\bas an AI language model\b", r"\bI am an AI\b", r"\[insert\s"]
EXAM_TAKEAWAY_RE = re.compile(r"EXAM|TRAP|takeaway|examiner|mark|marks|CISCE|board question|scoring", re.I)
STEP_RE = re.compile(
    r"(?m)^\s*(?:\d+\.|[-*•]|\(?[ivx]+\)|Step\b)"
    r"|\b(?:First|Second|Third|Next|Finally|Let us|Consider|Suppose)\b|=")


def parse_sections(text: str) -> dict:
    sec_re = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)
    ms = list(sec_re.finditer(text))
    return {m.group(1): text[m.end(): ms[i + 1].start() if i + 1 < len(ms) else len(text)].strip()
            for i, m in enumerate(ms)}


def wc(s: str) -> int:
    return len(s.split())


def is_key_section(name: str) -> bool:
    return name.endswith(KEY_SECTIONS_SUFFIX) or name in KEY_SECTIONS_EXACT


def score_file(text: str) -> dict:
    s = parse_sections(text)
    gaps = []

    prose_sections = {k: v for k, v in s.items() if not is_key_section(k)}

    # R1 definition
    d = s.get("DEFINITION", "")
    dw = wc(d)
    if dw < 40 or re.match(r"^\s*This node\b", d, re.I):
        gaps.append("R1_def")

    # R2 walkthrough
    w = s.get("WALKTHROUGH", "")
    ww = wc(w)
    if ww < 150:
        gaps.append("R2_walk_len")
    if not EXAM_TAKEAWAY_RE.search(w):
        gaps.append("R2_takeaway")
    if not STEP_RE.search(w):
        gaps.append("R2_steps")

    # R3 eli5
    e = s.get("ELI5", "")
    ew = wc(e)
    if ew < 20 or e.lower().startswith(("this node", "tbd", "n/a")):
        gaps.append("R3_eli5")

    # R4 diagnostics
    qs = sorted(k for k in s if k.startswith("DIAGNOSTIC_QUESTION_"))
    ans = sorted(k for k in s if k.startswith("DIAGNOSTIC_ANSWER_"))
    avg_ans = (sum(wc(s[k]) for k in ans) / len(ans)) if ans else 0
    if len(qs) < 2:
        gaps.append("R4_diag_count")
    if len(ans) < len(qs):
        gaps.append("R4_diag_orphan")
    if ans and avg_ans < 15:
        gaps.append("R4_diag_key")

    # R5 worked examples
    wes = [k for k in s if k.startswith("WORKED_EXAMPLE_")]
    good_we = [k for k in wes if "PROBLEM" in s.get(k, "") and "SOLUTION" in s.get(k, "")]
    if not good_we:
        gaps.append("R5_worked")

    # R6 misconception
    mc = s.get("COMMON_MISCONCEPTION", "")
    if wc(mc) < 15:
        gaps.append("R6_misconception")

    # R7 scope
    sc = s.get("SCOPE_BOUNDARY", "")
    if wc(sc) < 10 or "TEACH" not in sc.upper():
        gaps.append("R7_scope")

    # R8 hygiene
    hy = []
    for k, v in prose_sections.items():
        if NODEID_RE.search(v):
            hy.append(f"id_in_{k}")
    joined = "\n".join(prose_sections.values())
    for b in BANNED:
        if re.search(b, joined, re.I):
            hy.append(f"banned:{b.strip(chr(92) + 'b')}")
    for stub in ("coming soon)", "will be added later"):
        if stub in joined.lower():
            hy.append(f"stub:{stub}")
    if hy:
        gaps.extend(sorted(set(hy))[:4])

    return {
        "def_words": dw, "walk_words": ww, "eli5_words": ew,
        "diag_q": len(qs), "diag_a": len(ans), "avg_ans": round(avg_ans, 1),
        "worked_n": len(wes), "mc_words": wc(mc), "scope_words": wc(sc),
        "gaps": gaps,
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=DEFAULT_CORPUS)
    ap.add_argument("--out", default=DEFAULT_OUT)
    ap.add_argument("--tag", default="", help="suffix for output files")
    args = ap.parse_args()

    records = []
    gap_counter = Counter()
    by_subject = defaultdict(lambda: {"total": 0, "mvgap": 0})
    parked_total = parked_gap = 0

    for fn in sorted(os.listdir(args.corpus)):
        m = FILE_RE.match(fn)
        if not m:
            continue
        subject = m.group(1)
        parked = subject in PARKED_SUBJECTS
        path = os.path.join(args.corpus, fn)
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            text = f.read(4_000_000)
        r = score_file(text)
        cls = "c11" if fn.startswith("c11") else "c12"
        rec = {"file": fn, "cls": cls, "subject": subject, "parked": parked, **r}
        records.append(rec)
        if parked:
            parked_total += 1
            if r["gaps"]:
                parked_gap += 1
            continue
        subj_entry = by_subject[subject]
        subj_entry["total"] += 1
        if r["gaps"]:
            subj_entry["mvgap"] += 1
            for g in r["gaps"]:
                gap_counter[g] += 1

    active = [r for r in records if not r["parked"]]
    clean = [r for r in active if not r["gaps"]]
    dirty = [r for r in active if r["gaps"]]

    print(f"ISC lane scanned: {len(records)} files "
          f"(active {len(active)}, parked {parked_total})")
    print(f"10/10 rubric-clean (active): {len(clean)} / {len(active)} "
          f"({100.0 * len(clean) / max(1, len(active)):.1f}%)")
    print(f"Below minimum-viable (active): {len(dirty)}")
    print(f"Parked measured: {parked_total} (with gaps: {parked_gap}) — NOT touched")
    print("\n=== gap counts (active lane) ===")
    for g, c in gap_counter.most_common():
        print(f"  {g:<22} {c}")
    print("\n=== per-subject gap totals (active) ===")
    for subj in sorted(by_subject, key=lambda k: -by_subject[k]["mvgap"]):
        e = by_subject[subj]
        print(f"  {subj:<10} total={e['total']:<5} below_mv={e['mvgap']}")

    tag = args.tag
    out_jsonl = os.path.join(args.out, f"w6_scores{tag}.jsonl")
    with open(out_jsonl, "w", encoding="utf-8") as f:
        for r in records:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    dirty_sorted = sorted(dirty, key=lambda r: (len(r["gaps"]),
                                                -(r["def_words"] + r["walk_words"])))
    out_pick = os.path.join(args.out, f"w6_picklist{tag}.json")
    with open(out_pick, "w", encoding="utf-8") as f:
        json.dump(dirty_sorted, f, ensure_ascii=False, indent=1)
    print(f"\nWrote {out_jsonl} and {out_pick}")


if __name__ == "__main__":
    main()
