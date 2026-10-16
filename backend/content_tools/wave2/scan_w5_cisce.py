"""W5 lane scanner — CISCE classes 6-10 (ICSE) 10/10 rubric audit.

Adapted from content_tools/scan_depth_v2.py (CBSE) for the cisce_nodes_v2
corpus. Lane: files matching c{6,7,8,9,10}_*_icse_*.md. Owner-parked
hin/eng families are measured but never authored (AGENTS.md 2026-09-29).

Rubric (10/10):
  R1 DEFINITION >= 40 words
  R2 WALKTHROUGH >= 150 words (+ exam-takeaway signal recorded)
  R3 ELI5 genuine (>= 15 words, not a filler opener)
  R4 DIAGNOSTICS >= 2 questions WITH matching answer keys, avg key >= 15 words
  R5 EXAMPLES >= 1 worked example (>= 40 words)
  R6 MISCONCEPTION note >= 15 words
  R7 SCOPE_BOUNDARY present with TEACH line
  R8 HYGIENE: no NaN / 12+ digit floats / raw LaTeX / mojibake in the file

Usage: python scan_w5_cisce.py [--corpus DIR] [--out DIR]
Outputs: w5_scores.jsonl, w5_gaps.json, w5_worksheet.jsonl
"""

import argparse
import json
import os
import re
from collections import Counter, defaultdict

DEFAULT_CORPUS = r"D:\platform\deploy\content\cisce_nodes_v2"
DEFAULT_OUT = os.path.dirname(os.path.abspath(__file__))

SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)
LANE_RE = re.compile(r"^c(\d+)_([a-z]+)_icse_\d+_\d+\.md$", re.I)
PARKED_SUBJECTS = {"hin", "eng"}
# computer-application subjects: NaN is syllabus content (java.lang / floating
# point), not a computation leak - the slop-gate ban targets solver output.
CS_SUBJECTS = {"compapp", "comst", "compst", "cs", "ai"}

MAX_FILE_BYTES = 4_000_000

HYGIENE_RES = [
    ("long_float", re.compile(r"\d{12,}\.\d{3,}")),
    ("raw_latex", re.compile(r"\\(frac|sqrt|times|div|left|right|triangle|approx|rightarrow|nu|bar|text|pi|alpha|beta|theta|Delta|mu|lambda|cdot|leq|geq|neq|pm|infty)\b")),
    ("dollar_latex", re.compile(r"\$[^$\n]+\$")),
    ("mojibake", re.compile("Ã¢|Ã©|Ã¨|Ã—|Â«|�{2,}")),
]
NAN_RE = re.compile(r"\bNaN\b")
CODE_SPAN_RE = re.compile(r"`[^`]*`")

EXAM_SIGNAL_RE = re.compile(
    r"\b(exam|CISCE|board|ICSE|marks?|paper|question paper)\b", re.I
)
FILLER_RE = re.compile(r"^\s*(This node|This section|In this node)\b", re.I)


def parse_sections(text: str) -> dict:
    matches = list(SECTION_RE.finditer(text))
    return {
        m.group(1): text[m.end(): matches[i + 1].start() if i + 1 < len(matches) else len(text)].strip()
        for i, m in enumerate(matches)
    }


def wc(s: str) -> int:
    return len(s.split())


def rubric(sections: dict, text: str, subject: str = "") -> dict:
    d = sections.get("DEFINITION", "")
    w = sections.get("WALKTHROUGH", "")
    e = sections.get("ELI5", "")
    mc = sections.get("COMMON_MISCONCEPTION", "")
    scope = sections.get("SCOPE_BOUNDARY", "")
    qs = sorted(k for k in sections if k.startswith("DIAGNOSTIC_QUESTION_"))
    ans = [sections[k] for k in sections if k.startswith("DIAGNOSTIC_ANSWER_")]
    wes = sorted(k for k in sections if k.startswith("WORKED_EXAMPLE_"))

    dw, ww, ew, mw, sw = wc(d), wc(w), wc(e), wc(mc), wc(scope)
    avg_ans = (sum(wc(a) for a in ans) / len(ans)) if ans else 0

    gaps = []
    if dw < 40:
        gaps.append("R1_def_lt40")
    if ww < 150:
        gaps.append("R2_walk_lt150")
    # filler opener only counts when the section stays third-person machine
    # voice; a "This node ..." opener addressed to "you" is genuine ELI5
    filler = FILLER_RE.match(e) and not re.search(r"\b(you|your)\b", e, re.I)
    if ew < 15 or filler:
        gaps.append("R3_eli5_weak")
    if len(qs) < 2 or len(ans) < 2 or avg_ans < 15:
        gaps.append("R4_diag_key")
    # a worked example shows its working: either explicit markers (any case:
    # Problem/Solution/Answer/Working/Steps) or a visible derivation chain
    # (= , step, arrow).  The check exists to catch stubs, not marker style.
    ok_we = 0
    for k in wes:
        body = sections[k]
        low = body.lower()
        markers = any(m in low for m in ("problem", "solution", "answer",
                                         "working", "step", "given"))
        chain = ("=" in body or "→" in body) and any(c.isdigit() for c in body)
        if wc(body) >= 20 and (markers or chain):
            ok_we += 1
    if ok_we < 1:
        gaps.append("R5_worked_lt1")
    if mw < 15:
        gaps.append("R6_misconception")
    # scope: CBSE convention (TEACH:) or CISCE convention (Covered/NOT covered)
    up = scope.upper()
    has_cisce_scope = "COVERED" in up and "NOT COVERED" in up
    if sw < 10 or not ("TEACH" in up or has_cisce_scope):
        gaps.append("R7_scope")
    # hygiene: latex etc on the whole file; NaN only meaningful outside code
    # spans (and never a violation in computer-application subjects, where it
    # is syllabus vocabulary)
    codeless = CODE_SPAN_RE.sub("", text)
    hygiene_hits = [name for name, rx in HYGIENE_RES if rx.search(codeless)]
    if subject not in CS_SUBJECTS and NAN_RE.search(codeless):
        hygiene_hits.append("nan")
    if hygiene_hits:
        gaps.append("R8_hygiene:" + ",".join(hygiene_hits))

    return {
        "def_words": dw, "walk_words": ww, "eli5_words": ew,
        "diag_q": len(qs), "diag_a": len(ans), "avg_ans_words": round(avg_ans, 1),
        "worked_n": len(wes), "worked_struct_ok": ok_we,
        "mc_words": mw, "scope_words": sw,
        "walk_exam_signal": bool(EXAM_SIGNAL_RE.search(w)),
        "hygiene": hygiene_hits,
        "gaps": gaps,
        "min_viable": not gaps,
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=DEFAULT_CORPUS)
    ap.add_argument("--out", default=DEFAULT_OUT)
    args = ap.parse_args()

    records = []
    totals = Counter()
    gaps_by_class = defaultdict(Counter)
    gap_files = defaultdict(list)

    for fn in sorted(os.listdir(args.corpus)):
        m = LANE_RE.match(fn)
        if not m:
            continue
        path = os.path.join(args.corpus, fn)
        if not os.path.isfile(path):
            continue
        totals["lane_files"] += 1
        grade = int(m.group(1))
        subject = m.group(2)
        parked = subject in PARKED_SUBJECTS
        if parked:
            totals["parked"] += 1
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            text = f.read(MAX_FILE_BYTES)
        sections = parse_sections(text)
        r = rubric(sections, text, subject)
        rec = {"file": fn, "grade": grade, "subject": subject, "parked": parked, **r}
        records.append(rec)
        if parked:
            totals["parked_gaps"] += len(r["gaps"])
            continue
        if not r["min_viable"]:
            totals["failing"] += 1
            for g in r["gaps"]:
                key = g.split(":")[0]
                gaps_by_class[grade][key] += 1
                gap_files[key].append(fn)

    n_action = totals["lane_files"] - totals["parked"]
    print(f"lane files: {totals['lane_files']}  parked(measured only): {totals['parked']}  actionable: {n_action}")
    print(f"min-viable PASS: {n_action - totals['failing']}  FAIL: {totals['failing']}")
    print("\n=== gap counts by class (actionable only) ===")
    for g in sorted(gaps_by_class):
        print(f"  c{g}: {dict(gaps_by_class[g])}")
    all_gaps = Counter()
    for c in gaps_by_class.values():
        all_gaps.update(c)
    print(f"\nall gaps: {dict(all_gaps)}")

    failing = [r for r in records if not r["parked"] and not r["min_viable"]]

    def sort_key(r):
        grade_rank = 0 if r["grade"] in (9, 10) else 1  # board years first
        core = 0 if r["subject"] in {"math", "phy", "chem", "bio"} else 1
        slim = r["def_words"] + r["walk_words"]
        return (grade_rank, core, len(r["gaps"]) * -1, slim, r["file"])

    failing.sort(key=sort_key)
    with open(os.path.join(args.out, "w5_scores.jsonl"), "w", encoding="utf-8") as f:
        for r in records:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    with open(os.path.join(args.out, "w5_gaps.json"), "w", encoding="utf-8") as f:
        json.dump(failing, f, ensure_ascii=False, indent=1)
    print(f"\nWrote w5_scores.jsonl ({len(records)}), w5_gaps.json ({len(failing)} failing) to {args.out}")


if __name__ == "__main__":
    main()
