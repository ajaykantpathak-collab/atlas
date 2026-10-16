"""Wave2 rubric scanner — CONTENT-W1 lane (CBSE classes 6-8).

Scores every c6/c7/c8 teaching node on the 10/10 rubric:

  1 DEFINITION      present, >=40 words, no "This node ..." filler, no raw LaTeX
  2 WALKTHROUGH     >=150 words, step-building, has worked step + exam takeaway
  3 ELI5            present, simple (>=10 words), not a near-copy of DEFINITION
  4 DIAGNOSTICS     >=2 question slots that are real questions, each with a
                    non-trivial answer key (>=3 words)
  5 EXAMPLES        >=1 WORKED_EXAMPLE_* section with >=15 words
  6 MISCONCEPTION   COMMON_MISCONCEPTION present with >=10 words
  7 SCOPE           SCOPE_BOUNDARY present with >=8 words
  8 HYGIENE         display sections: no node ids, no banned slop strings,
                    no raw LaTeX, no NaN / 15-digit floats

10/10 = all eight checks pass. Parked Hindi/English/grammar families
(hin, english, engl, gram) are MEASURED but never touched (owner decision
2026-09-29). _comp companions are excluded.

Streaming: one file in memory at a time.

Usage: python scan_wave2_rubric.py [--corpus DIR] [--out DIR]
Outputs: w1_scores.jsonl (per node), prints lane summary.
"""

import argparse
import json
import os
import re
import sys
from collections import Counter, defaultdict

DEFAULT_CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
DEFAULT_OUT = r"D:\platform\deploy\backend\content_tools\wave2"

SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)
LANE_GRADES = {"6", "7", "8"}
PARKED_SUBJECTS = {"hin", "english", "engl", "gram", "eng", "hind", "san", "urd"}

MAX_FILE_BYTES = 4_000_000

# hygiene
NODE_ID_RE = re.compile(r"\bc\d{1,2}_[a-z]+_[a-z0-9_]+", re.I)
RAW_LATEX_RE = re.compile(r"\\[a-zA-Z]+|\\\(|\\\[|\$.+\$")
# NOTE: "placeholder" is NOT banned for scoring — every corpus hit is genuine
# place-value vocabulary ("zero as placeholder"). It stays banned in the
# AUTHORING payload guard (apply tool) only.
# NOTE: node ids in prose are NOT a scoring fail — the frontend AuthoredText
# display transform rewrites every id to a label before it reaches the screen
# (components/learn/AuthoredText.tsx). They are counted informationally, and
# authored text must still add zero.
BANNED_RE = [
    ("Lane C", re.compile(r"\bLane\s+C\b", re.I)),
    ("variable binding", re.compile(r"\bvariable binding\b", re.I)),
    ("This node covers", re.compile(r"\bThis node covers\b", re.I)),
    ("TBD", re.compile(r"\bTBD\b")),
    ("Lorem", re.compile(r"\bLorem\b")),
    ("NaN", re.compile(r"\bnan\b", re.I)),
]
FLOAT15_RE = re.compile(r"\b\d\.\d{10,}\b")

# Sections NOT scanned for hygiene:
#  - id/link fields (ids live there by design, per AGENTS.md payload rule)
#  - THIS_FORMULA: rendered through KaTeX MathText on the learn page —
#    LaTeX in it is the designed representation, not leakage.
#  - SCOPE_BOUNDARY is scanned, except the house scope opener
#    "This node covers X ... excludes Y" is the corpus's boundary register
#    and is not slop (handled below by skipping the banned-string check
#    for that exact section and pattern; DEFINITION filler is caught in
#    check 1 independently).
HYGIENE_SKIP_EXACT = {
    "PREREQUISITE_NODE_IDS", "FORWARD_NODE_IDS", "PREREQUISITE_REASONS",
    "FORWARD_REASONS", "CHAIN_DESCRIPTION", "CROSS_SUBJECT_PREREQS",
    "CROSS_SUBJECT_REASONS", "CROSS_SUBJECT", "THIS_FORMULA",
    "GRADE", "SUBJECT",
}

FILLER_OPENER_RE = re.compile(r"^\s*this (node|topic|section|lesson)\b[^\n]*\b(covers|will cover|explores|we will)\b", re.I)
THISNODE_OPENER_RE = re.compile(r"^\s*this (node|topic|section|lesson)\b", re.I)

EXAM_MARKER_RE = re.compile(r"in the exam|exam-ready|for the exam|takeaway|exams?\b", re.I)
STEP_MARKER_RE = re.compile(
    r"\bfirst\b|\bnext\b|\bthen\b|\bstep\b|\bsuppose\b|\bconsider\b|\bfor example\b"
    r"|\bnow\b|\bstart by\b|\bbegin\b|\bimagine\b|\bfinally\b|\binitially\b"
    r"|\bto begin\b|\blastly\b|\bafter that\b|\blook at\b|\btry\b", re.I)

Q_SLOT_SLOP_RE = re.compile(r"correct answer|wrong answer|\*\*analysis|reveals (the|a) (student|learner)|misconception regarding|a wrong answer", re.I)
Q_WORD_RE = re.compile(
    r"^(what|why|how|when|which|who|where|can|could|do|does|did|is|are|was|were|if|state|define|name|list|give|find|calculate|solve|explain|identify|estimate|true|false|fill|match|choose|complete|write|draw|convert|simplify|express|should|will|would|in this|according|based|design|create|evaluate|justify|compare|describe|construct|verify|show|suppose|imagine|predict|determine|suggest|represent|illustrate|examine|discuss|analyse|analyze)\b",
    re.I,
)

STOPWORDS = set("""a an the of to in on for with and or is are was were be been being it its
this that these those as at by from we you they he she not no can will would should may might
do does did has have had but if then than so such very more most much many few some any all""".split())


def parse_sections(text: str) -> dict:
    matches = list(SECTION_RE.finditer(text))
    return {
        m.group(1): text[m.end(): matches[i + 1].start() if i + 1 < len(matches) else len(text)].strip()
        for i, m in enumerate(matches)
    }


def wc(s: str) -> int:
    return len(s.split()) if s else 0


def tokens(s: str):
    return {t for t in re.findall(r"[a-z']+", s.lower()) if t not in STOPWORDS and len(t) > 2}


def jaccard(a: set, b: set) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def grade_of(fn: str) -> int:
    m = re.match(r"^c(\d+)_", fn)
    return int(m.group(1)) if m else 99


def subject_of(fn: str) -> str:
    m = re.match(r"^c\d+_([a-z]+)_", fn)
    return m.group(1) if m else "?"


def check_hygiene(sections: dict) -> tuple:
    """Return (hygiene_fail_hits, id_refs_count) for display sections."""
    hits = []
    id_refs = 0
    for name, body in sections.items():
        if name in HYGIENE_SKIP_EXACT:
            continue
        if re.fullmatch(r"(PREREQUISITE|FORWARD)_REASONS", name):
            continue
        id_refs += len(NODE_ID_RE.findall(body))
        for label, rx in BANNED_RE:
            if label == "This node covers" and name == "SCOPE_BOUNDARY":
                continue  # house scope register: "This node covers X ... excludes Y"
            m = rx.search(body)
            if m:
                hits.append(f"{name}:{label}:'{m.group(0)}'")
        for m in RAW_LATEX_RE.finditer(body):
            # record every raw-LaTeX shape: commands, \(..\)/\[..\] math
            # delimiters, $..$ — all render literally on the learn page
            hits.append(f"{name}:latex:'{m.group(0)[:30]}'")
        m = FLOAT15_RE.search(body)
        if m:
            hits.append(f"{name}:float15:'{m.group(0)}'")
    return hits, id_refs


def score_node(fn: str, sections: dict) -> dict:
    d = sections.get("DEFINITION", "")
    w = sections.get("WALKTHROUGH", "")
    e = sections.get("ELI5", "")
    mc = sections.get("COMMON_MISCONCEPTION", "")
    sc = sections.get("SCOPE_BOUNDARY", "")

    dw, ww, ew, mw, scw = wc(d), wc(w), wc(e), wc(mc), wc(sc)

    gaps = []

    # ---- 1 DEFINITION ----
    defn_ok = True
    if dw == 0:
        defn_ok = False; gaps.append("DEFINITION:missing")
    elif dw < 40:
        defn_ok = False; gaps.append(f"DEFINITION:thin:{dw}w")
    if THISNODE_OPENER_RE.match(d):
        defn_ok = False; gaps.append("DEFINITION:filler_opener")
    if RAW_LATEX_RE.search(d):
        defn_ok = False; gaps.append("DEFINITION:raw_latex")

    # ---- 2 WALKTHROUGH ----
    walk_ok = True
    if ww == 0:
        walk_ok = False; gaps.append("WALKTHROUGH:missing")
    elif ww < 150:
        walk_ok = False; gaps.append(f"WALKTHROUGH:thin:{ww}w")
    else:
        if not EXAM_MARKER_RE.search(w):
            walk_ok = False; gaps.append("WALKTHROUGH:no_exam_takeaway")
        if not STEP_MARKER_RE.search(w):
            walk_ok = False; gaps.append("WALKTHROUGH:no_worked_step")

    # ---- 3 ELI5 ----
    eli5_ok = True
    if ew == 0:
        eli5_ok = False; gaps.append("ELI5:missing")
    elif ew < 10:
        eli5_ok = False; gaps.append(f"ELI5:thin:{ew}w")
    else:
        sim = jaccard(tokens(e), tokens(d))
        if sim > 0.6:
            eli5_ok = False; gaps.append(f"ELI5:copies_definition:{sim:.2f}")

    # ---- 4 DIAGNOSTICS ----
    q_keys = sorted([k for k in sections if re.fullmatch(r"DIAGNOSTIC_QUESTION_\d+", k)],
                    key=lambda k: int(k.rsplit("_", 1)[1]))
    valid_pairs = 0
    q_suspects = []
    orphan_answers = 0
    for k in q_keys:
        n = k.rsplit("_", 1)[1]
        q = sections[k]
        a = sections.get(f"DIAGNOSTIC_ANSWER_{n}", "")
        q_bad = False
        if wc(q) < 4:
            q_bad = True; q_suspects.append(f"Q{n}:too_short")
        elif Q_SLOT_SLOP_RE.search(q):
            q_bad = True; q_suspects.append(f"Q{n}:answer_in_question_slot")
        elif not ("?" in q or "____" in q or Q_WORD_RE.match(q)):
            q_bad = True; q_suspects.append(f"Q{n}:not_question_shaped")
        if not q_bad and wc(a) >= 3:
            valid_pairs += 1
        elif not q_bad:
            q_suspects.append(f"Q{n}:answer_key_thin")
    a_keys = [k for k in sections if re.fullmatch(r"DIAGNOSTIC_ANSWER_\d+", k)]
    for k in a_keys:
        n = k.rsplit("_", 1)[1]
        if f"DIAGNOSTIC_QUESTION_{n}" not in sections:
            orphan_answers += 1
    diag_ok = valid_pairs >= 2
    if not diag_ok:
        gaps.append(f"DIAGNOSTICS:valid_pairs={valid_pairs}")
    if q_suspects:
        gaps.append("DIAGNOSTICS:slot_artifacts(" + ";".join(q_suspects[:4]) + ")")
    if orphan_answers:
        gaps.append(f"DIAGNOSTICS:orphan_answers={orphan_answers}")

    # ---- 5 EXAMPLES ----
    we_keys = [k for k in sections if k.startswith("WORKED_EXAMPLE_")]
    we_good = sum(1 for k in we_keys if wc(sections[k]) >= 15)
    ex_ok = we_good >= 1
    if not ex_ok:
        gaps.append(f"EXAMPLES:worked={we_good}")

    # ---- 6 MISCONCEPTION ----
    mc_ok = mw >= 10
    if not mc_ok:
        gaps.append(f"MISCONCEPTION:{'missing' if mw == 0 else f'thin:{mw}w'}")

    # ---- 7 SCOPE ----
    scope_ok = scw >= 8
    if not scope_ok:
        gaps.append(f"SCOPE:{'missing' if scw == 0 else f'thin:{scw}w'}")

    # ---- 8 HYGIENE ----
    hits, id_refs = check_hygiene(sections)
    hyg_ok = not hits
    if not hyg_ok:
        gaps.append(f"HYGIENE:{len(hits)}hits")

    checks = {
        "DEFINITION": defn_ok, "WALKTHROUGH": walk_ok, "ELI5": eli5_ok,
        "DIAGNOSTICS": diag_ok, "EXAMPLES": ex_ok, "MISCONCEPTION": mc_ok,
        "SCOPE": scope_ok, "HYGIENE": hyg_ok,
    }

    # minimum-viable bar: definition present+non-filler, walkthrough present,
    # ELI5 present, >=2 valid diagnostics
    min_viable = bool(d.strip()) and not THISNODE_OPENER_RE.match(d) and ww > 0 and ew > 0 and valid_pairs >= 2

    return {
        "file": fn, "grade": grade_of(fn), "subject": subject_of(fn),
        "parked": subject_of(fn) in PARKED_SUBJECTS,
        "score10": sum(1 for v in checks.values() if v),
        "checks": checks,
        "gaps": gaps,
        "min_viable": min_viable,
        "def_words": dw, "walk_words": ww, "eli5_words": ew,
        "mc_words": mw, "scope_words": scw,
        "diag_slots": len(q_keys), "diag_valid_pairs": valid_pairs,
        "diag_suspects": q_suspects,
        "worked_n": len(we_keys),
        "eli5_def_jaccard": round(jaccard(tokens(e), tokens(d)), 3) if ew and dw else None,
        "hygiene_hits": hits,
        "id_refs": id_refs,
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=DEFAULT_CORPUS)
    ap.add_argument("--out", default=DEFAULT_OUT)
    args = ap.parse_args()

    os.makedirs(args.out, exist_ok=True)
    out_path = os.path.join(args.out, "w1_scores.jsonl")

    lane = []
    n_files = n_comp = n_other = 0
    with open(out_path, "w", encoding="utf-8") as out:
        for fn in sorted(os.listdir(args.corpus)):
            path = os.path.join(args.corpus, fn)
            if not fn.endswith(".md") or not os.path.isfile(path):
                continue
            n_files += 1
            if "_comp" in fn:
                n_comp += 1
                continue
            if fn[0] != "c" or fn[1] not in LANE_GRADES or not re.match(r"^c[678]_", fn):
                n_other += 1
                continue
            with open(path, "r", encoding="utf-8", errors="replace") as f:
                text = f.read(MAX_FILE_BYTES)
            sections = parse_sections(text)
            rec = score_node(fn, sections)
            lane.append(rec)
            out.write(json.dumps(rec, ensure_ascii=False) + "\n")

    # ---------- summary ----------
    actionable = [r for r in lane if not r["parked"]]
    parked = [r for r in lane if r["parked"]]
    print(f"files={n_files} comp={n_comp} other_grades={n_other} lane_nodes={len(lane)}")
    print(f"  actionable={len(actionable)}  parked(measured-only)={len(parked)}")

    def bucket(rs):
        return Counter(r["score10"] for r in rs)

    print("\n=== 10/10 rubric score histogram (out of 8 checks) ===")
    print(f"{'score':>5} | {'actionable':>10} | {'parked':>7}")
    for s in range(8, -1, -1):
        print(f"{s:>5} | {bucket(actionable).get(s, 0):>10} | {bucket(parked).get(s, 0):>7}")

    print("\n=== actionable: failing-check counts ===")
    cc = Counter()
    for r in actionable:
        for k, v in r["checks"].items():
            if not v:
                cc[k] += 1
    for k, v in cc.most_common():
        print(f"  {k:<15} {v:>5}")

    print("\n=== actionable: below MINIMUM-VIABLE bar ===")
    mv_fail = [r for r in actionable if not r["min_viable"]]
    by_gs = defaultdict(int)
    for r in mv_fail:
        by_gs[(r["grade"], r["subject"])] += 1
    for (g, s), c in sorted(by_gs.items()):
        print(f"  c{g} {s:<10} {c}")
    print(f"  TOTAL below min-bar: {len(mv_fail)}")

    print("\n=== actionable: min-bar OK but not 10/10, by grade ===")
    for g in (8, 7, 6):
        rs = [r for r in actionable if r["grade"] == g and r["min_viable"] and r["score10"] < 8]
        print(f"  c{g}: {len(rs)}")

    print("\n=== parked lanes (measured, untouched): failing-check counts ===")
    pc = Counter()
    for r in parked:
        for k, v in r["checks"].items():
            if not v:
                pc[k] += 1
    for k, v in pc.most_common():
        print(f"  {k:<15} {v:>5}")

    print(f"\ninformational: id_refs in actionable prose = "
          f"{sum(r['id_refs'] for r in actionable)} (AuthoredText sanitizes at render)")

    # worst-first worklist: below min-bar first (c8 > c7 > c6), then lowest score10
    def prio(r):
        return ({8: 0, 7: 1, 6: 2}.get(r["grade"], 3), 0 if not r["min_viable"] else 1,
                r["score10"], -r["def_words"] - r["walk_words"], r["file"])

    worklist = sorted([r for r in actionable if r["score10"] < 8], key=prio)
    with open(os.path.join(args.out, "w1_worklist.json"), "w", encoding="utf-8") as f:
        json.dump(worklist, f, ensure_ascii=False, indent=1)
    print(f"\nWrote {out_path}")
    print(f"Wrote worklist ({len(worklist)} nodes below 10/10): "
          f"{os.path.join(args.out, 'w1_worklist.json')}")


if __name__ == "__main__":
    main()
