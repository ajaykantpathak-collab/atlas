"""W2 lane scanner — CBSE class 9 (board year) 10/10 rubric.

Lane: deploy/content/enhanced_nodes_md/c9_*_cbse_*.md excluding _comp.
Parked (measure-only, never edited): c9_hin_*, c9_engl_*, c9_gram_*
  (AGENTS.md 2026-09-29: Hindi/English content-quality waves parked;
   house scanner PARKED_SUBJECTS agrees: hin, eng, engl, english, gram).

Rubric (10/10):
  1 DEFINITION accurate 40+ words, no filler/LaTeX/ids
  2 WALKTHROUGH >=150 words, worked step + exam takeaway cue
  3 ELI5 genuine (>=20 words, not a stub)
  4 DIAGNOSTICS >=2 questions each with a keyed answer (>=10w avg)
  5 EXAMPLES >=1 worked (>=15 words with a step/result cue)
  6 COMMON_MISCONCEPTION present >=15 words
  7 SCOPE boundary present >=10 words
  8 HYGIENE: no node ids / banned slop / raw LaTeX in student-facing
    sections (SCOPE ids are house-style cross-refs, allowed)

Writes w2_scores.jsonl (every lane node, all checks) and prints summary.

Usage: python w2_scan.py [--corpus DIR] [--out DIR]
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

LANE_RE = re.compile(r"^c9_(bio|chem|civ|eco|geo|hist|math|physics)_.*\.md$")
PARKED_RE = re.compile(r"^c9_(hin|engl|gram)_.*\.md$")

# hygiene: raw LaTeX = backslash commands or $..$ containing a backslash
# (currency like "$3,600m" and caret exponents "(x)^(1/10)" are NOT LaTeX)
LATEX_CMD = re.compile(
    r"\\(frac|dfrac|sqrt|text|mathrm|mathbf|overrightarrow|overline|underline|"
    r"underbrace|begin|end|left|right|circ|deg|times|div|pm|mp|cdot|alpha|beta|"
    r"gamma|delta|theta|pi|lambda|mu|nu|omega|Delta|Sigma|sum|int|prod|approx|"
    r"neq|leq|geq|infty|rightarrow|leftrightarrow|angle|triangle|perp|parallel|"
    r"therefore|because|equiv|propto|partial|nabla|log|sin|cos|tan)\b")
LATEX_RE = re.compile(r"\\\(|\\\)|\\\[|\\\]|\$[^$\n]*\\[a-zA-Z]+[^$\n]*\$")
NODEID_RE = re.compile(r"\bc\d+_[a-z]+_[a-z0-9_]+\b", re.I)
BANNED_RE = re.compile(
    r"\b(Lane C|variable binding|This node covers|TBD|Lorem|NaN|"
    r"placeholder text|placeholder here|placeholder for|coming soon)\b", re.I)
CJK_RE = re.compile(r"[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]")
# real mojibake: UTF-8-read-as-Latin1 artefacts or replacement chars
# (proper Unicode like x –  "  are legitimate and must NOT match)
MOJIBAKE_RE = re.compile(r"\ufffd|Ã[\u0080-\u00ff]|â€[\u0080-\u00ff]?|Â ")

# student-facing sections (hygiene applies); SCOPE ids are house cross-refs
FACING_PREFIXES = ("DEFINITION", "ELI5", "WALKTHROUGH", "DIAGNOSTIC_QUESTION_",
                   "DIAGNOSTIC_ANSWER_", "WORKED_EXAMPLE_", "COMMON_MISCONCEPTION")


def parse_sections(text: str) -> dict:
    matches = list(SECTION_RE.finditer(text))
    return {
        m.group(1): text[m.end(): matches[i + 1].start() if i + 1 < len(matches) else len(text)].strip()
        for i, m in enumerate(matches)
    }


def wc(s: str) -> int:
    return len(s.split())


def has_takeaway(w: str) -> bool:
    return bool(re.search(r"\b(takeaway|exam format|exam tip|in the exam|"
                          r"for the exam|exam[- ]relevant|examiners|marks? are|"
                          r"scoring|NCERT (questions|asks)|remember for|"
                          r"board exam|exam pattern|common exam|question paper|"
                          r"marking scheme)\b", w, re.I))


STEP_CUE = re.compile(
    r"\b(step \d|step [ivx]+|first,|second,|third,|next,|then,|finally,|"
    r"for example|for instance|e\.g\.|consider |suppose |let us|let's|"
    r"imagine |picture |observe |recall |begin by|begin with|start by|start with|"
    r"connect this|ask(?:\s|[:,])|ask yourself|draw |write |list |trace |calculat|"
    r"substitut|verify|check |apply |think of|take a|take the|measure|compare |"
    r"notice |look at|follow |practise|practice|now |remember |given |find |"
    r"solve |prove |show that|simplify|expand |factorise|factorize|"
    r"evaluate|plug |work(ed)? through|hence|therefore|"
    r"pluck |watch |listen |strike |drop |pour |mix |heat |touch |hold |"
    r"press |blow |walk |note that|note the|identify |examples include)\b", re.I)
# punctuation-ending cues cannot carry a trailing \b
STEP_PUNCT_CUE = re.compile(r"\b(questions?|examples?|steps?|answers?)\s*[::]", re.I)


def has_worked_step(w: str) -> bool:
    if STEP_CUE.search(w) or STEP_PUNCT_CUE.search(w):
        return True
    if re.search(r"\d+\s*[-+*/x\u00d7\u00f7=]\s*\d+", w):  # inline computation
        return True
    return False


def hygiene_flags(sections: dict) -> dict:
    flags = {}
    for name, body in sections.items():
        if not any(name == p or name.startswith(p) for p in FACING_PREFIXES):
            continue
        f = []
        if LATEX_RE.search(body) or LATEX_CMD.search(body):
            f.append("latex")
        if NODEID_RE.search(body):
            f.append("nodeid")
        if BANNED_RE.search(body):
            f.append("slop")
        # CJK: wrong-language rows are the problem; short scholarly citations
        # of Chinese characters inside English prose (e.g. a history node on
        # the origin of Chinese writing) are legitimate — use a ratio rule.
        letters = re.sub(r"\s", "", body)
        cjk_chars = len(CJK_RE.findall(body))
        if letters and cjk_chars / max(len(letters), 1) > 0.2:
            f.append("cjk")
        if MOJIBAKE_RE.search(body):
            f.append("mojibake")
        if f:
            flags[name] = f
    return flags


def rubric(sections: dict) -> dict:
    d = sections.get("DEFINITION", "")
    w = sections.get("WALKTHROUGH", "")
    e = sections.get("ELI5", "")
    mc = sections.get("COMMON_MISCONCEPTION", "")
    sc = sections.get("SCOPE_BOUNDARY", "")
    qkeys = sorted(k for k in sections if k.startswith("DIAGNOSTIC_QUESTION_"))
    akeys = sorted(k for k in sections if k.startswith("DIAGNOSTIC_ANSWER_"))
    wes = sorted(k for k in sections if k.startswith("WORKED_EXAMPLE_"))

    qn = {int(re.search(r"(\d+)$", k).group(1)) for k in qkeys}
    an = {int(re.search(r"(\d+)$", k).group(1)) for k in akeys}
    unkeyed = len(qn - an)

    ans = [sections[k] for k in akeys]
    avg_ans = (sum(wc(a) for a in ans) / len(ans)) if ans else 0

    hyg = hygiene_flags(sections)
    # node-id refs in prose are ACCEPTED BY DESIGN (AGENTS.md 2026-09-29: ids
    # travel as fetch keys; the AuthoredText display layer converts them to
    # labels — "Do not fix payloads to remove ids"). Tracked, not penalised.
    idref_sections = sorted(s for s, f in hyg.items() if "nodeid" in f)

    checks = {
        # 1 definition
        "def_ok": wc(d) >= 40 and not re.match(r"^\s*This node\b", d, re.I)
                  and not LATEX_RE.search(d) and not LATEX_CMD.search(d)
                  and not BANNED_RE.search(d),
        "def_words": wc(d),
        # 2 walkthrough
        "walk_ok": wc(w) >= 150 and has_takeaway(w) and has_worked_step(w),
        "walk_words": wc(w),
        "walk_takeaway": has_takeaway(w),
        "walk_step": has_worked_step(w),
        # 3 eli5
        "eli5_ok": wc(e) >= 20,
        "eli5_words": wc(e),
        # 4 diagnostics
        "diag_ok": len(qkeys) >= 2 and unkeyed == 0 and avg_ans >= 10,
        "diag_q": len(qkeys),
        "diag_unkeyed": unkeyed,
        "avg_ans_words": round(avg_ans, 1),
        # 5 examples
        "ex_ok": len(wes) >= 1 and all(wc(sections[k]) >= 15 for k in wes)
                 and any(has_worked_step(sections[k]) for k in wes),
        "worked_n": len(wes),
        # 6 misconception
        "mc_ok": wc(mc) >= 15,
        "mc_words": wc(mc),
        # 7 scope
        "scope_ok": wc(sc) >= 10,
        "scope_words": wc(sc),
        # 8 hygiene (nodeid accepted-by-design; latex/slop/cjk/mojibake are not)
        "hyg_ok": not any(f for s, fl in hyg.items() for f in fl if f != "nodeid"),
        "hygiene": {s: [f for f in fl if f != "nodeid"] for s, fl in hyg.items()
                    if [f for f in fl if f != "nodeid"]},
        "idref_sections": idref_sections,
    }
    checks["fails"] = [k for k in ("def_ok", "walk_ok", "eli5_ok", "diag_ok",
                                   "ex_ok", "mc_ok", "scope_ok", "hyg_ok")
                       if not checks[k]]
    checks["perfect"] = not checks["fails"]
    checks["below_min"] = bool(not checks["def_ok"] or not checks["walk_ok"]
                               or not checks["diag_ok"] or not checks["eli5_ok"])
    return checks


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=DEFAULT_CORPUS)
    ap.add_argument("--out", default=DEFAULT_OUT)
    args = ap.parse_args()

    records = []
    counts = Counter()
    fail_counter = Counter()

    for fn in sorted(os.listdir(args.corpus)):
        if not (LANE_RE.match(fn) or PARKED_RE.match(fn)):
            continue
        path = os.path.join(args.corpus, fn)
        if not os.path.isfile(path):
            continue
        parked = bool(PARKED_RE.match(fn))
        text = open(path, encoding="utf-8", errors="replace").read()
        sections = parse_sections(text)
        c = rubric(sections)
        rec = {"file": fn, "parked": parked, **c}
        records.append(rec)
        if parked:
            counts["parked_measured"] += 1
            if c["fails"]:
                counts["parked_with_fails"] += 1
            continue
        counts["actionable"] += 1
        if c["perfect"]:
            counts["perfect"] += 1
        if c["below_min"]:
            counts["below_min"] += 1
        for f in c["fails"]:
            fail_counter[f] += 1

    out_path = os.path.join(args.out, "w2_scores.jsonl")
    with open(out_path, "w", encoding="utf-8") as f:
        for r in records:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    print(f"lane measured: {len(records)} (parked {counts['parked_measured']}, "
          f"actionable {counts['actionable']})")
    print(f"actionable perfect (10/10): {counts['perfect']} / {counts['actionable']}")
    print(f"actionable below minimum-viable: {counts['below_min']}")
    print("fail counts by rubric check (actionable):")
    for k, v in fail_counter.most_common():
        print(f"  {k:<10} {v}")
    print(f"wrote {out_path}")


if __name__ == "__main__":
    main()
