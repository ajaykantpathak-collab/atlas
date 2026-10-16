"""Scan the CBSE enhanced_nodes_md corpus and score each node's TEACHING DEPTH.

Streams file-by-file (no full-corpus in-memory load). Scores composition:
definition presence/length, walkthrough presence/length, ELI5, diagnostic
Q/A count, worked examples, misconception. Emits a histogram + ranked
thin-list JSON for the authoring wave.

Usage:
    python scan_content_depth.py [--corpus DIR] [--out DIR]

_companion (_comp) docs are counted but ranked separately: they are
cross-node question companions by design and have no teaching sections.
"""

import argparse
import json
import os
import re
import sys
from collections import Counter

DEFAULT_CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
DEFAULT_OUT = r"D:\platform\deploy\backend\content_tools"

SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)

# Filename pattern: c<grade>_<subject>_<board>_<chapter>_<node>.md
NAME_RE = re.compile(r"^c(\d+)_([a-z]+)_([a-z]+)_(\d+)_(\d+)(?:_comp)?\.md$")

CORE_SUBJECTS = {"math", "phy", "physics", "chem", "bio", "sci"}

# Byte-length guards against reading a monster file fully into a line (none
# known, but stay defensive under the 2GB cap).
MAX_FILE_BYTES = 4_000_000


def parse_sections(text: str) -> dict:
    """Return {SECTION_NAME: body_string} for a node .md file."""
    sections = {}
    matches = list(SECTION_RE.finditer(text))
    for i, m in enumerate(matches):
        name = m.group(1)
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        sections[name] = text[start:end].strip()
    return sections


def word_count(s: str) -> int:
    return len(s.split())


def score_node(sections: dict) -> dict:
    """Composition score. Higher = thinner (0 = fully authored)."""
    penalty = 0.0
    detail = {}

    # --- DEFINITION ---
    d = sections.get("DEFINITION", "")
    dw = word_count(d)
    if not d:
        penalty += 35
        detail["definition"] = "missing"
    elif dw < 12:
        penalty += 30
        detail["definition"] = "stub(<12w)"
    elif dw < 25:
        penalty += 15
        detail["definition"] = "short(<25w)"
    else:
        detail["definition"] = f"ok({dw}w)"

    # --- WALKTHROUGH ---
    w = sections.get("WALKTHROUGH", "")
    ww = word_count(w)
    if not w:
        penalty += 30
        detail["walkthrough"] = "missing"
    elif ww < 40:
        penalty += 22
        detail["walkthrough"] = "stub(<40w)"
    elif ww < 80:
        penalty += 10
        detail["walkthrough"] = "short(<80w)"
    else:
        detail["walkthrough"] = f"ok({ww}w)"

    # --- ELI5 ---
    e = sections.get("ELI5", "")
    ew = word_count(e)
    if not e:
        penalty += 10
        detail["eli5"] = "missing"
    elif ew < 10:
        penalty += 4
        detail["eli5"] = "stub(<10w)"
    else:
        detail["eli5"] = f"ok({ew}w)"

    # --- DIAGNOSTIC Q/A pairs ---
    q_keys = [k for k in sections if re.fullmatch(r"DIAGNOSTIC_QUESTION_\d+", k)]
    a_keys = [k for k in sections if re.fullmatch(r"DIAGNOSTIC_ANSWER_\d+", k)]
    n_q, n_a = len(q_keys), len(a_keys)
    paired = sum(
        1 for k in q_keys if k.replace("QUESTION", "ANSWER") in sections
    )
    if n_q == 0:
        penalty += 15
        detail["diagnostics"] = "missing"
    elif n_q < 2 or paired < 2:
        penalty += 8
        detail["diagnostics"] = f"thin(q={n_q},paired={paired})"
    else:
        detail["diagnostics"] = f"ok(q={n_q})"

    # --- WORKED EXAMPLES ---
    we_keys = [k for k in sections if re.fullmatch(r"WORKED_EXAMPLE_\d+", k)]
    if not we_keys:
        penalty += 5
        detail["worked_examples"] = "missing"
    else:
        detail["worked_examples"] = f"ok(n={len(we_keys)})"

    # --- COMMON_MISCONCEPTION ---
    mc = sections.get("COMMON_MISCONCEPTION", "")
    if not mc:
        penalty += 5
        detail["misconception"] = "missing"
    elif word_count(mc) < 15:
        penalty += 2
        detail["misconception"] = "stub"
    else:
        detail["misconception"] = "ok"

    # --- DEFINITION usefulness heuristics: placeholder / banned filler ---
    for bad in ("This node covers", "TBD", "placeholder"):
        if d and d.lower().startswith(bad.lower()):
            penalty += 10
            detail["definition"] += "+filler"

    return {"thinness": penalty, "detail": detail,
            "def_words": dw, "walk_words": ww, "eli5_words": ew,
            "diag_q": n_q, "diag_paired": paired,
            "worked_n": len(we_keys)}


def classify(filename: str) -> dict:
    m = NAME_RE.match(filename)
    if not m:
        return {"grade": None, "subject": "unknown", "is_comp": "_comp" in filename}
    grade, subject, board, ch, node = m.groups()
    return {"grade": int(grade), "subject": subject, "board": board,
            "chapter": ch, "node": node, "is_comp": filename.endswith("_comp.md")}


def priority_tuple(rec: dict):
    """Sort key for the authoring wave: board years first, core subjects first."""
    grade = rec["grade"] if rec["grade"] is not None else 99
    grade_rank = 0 if grade in (9, 10) else (1 if grade in (11, 12) else 2)
    core = 0 if rec["subject"] in CORE_SUBJECTS else 1
    return (-rec["thinness"], grade_rank, core, grade, rec["subject"], rec["file"])


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--corpus", default=DEFAULT_CORPUS)
    ap.add_argument("--out", default=DEFAULT_OUT)
    args = ap.parse_args()

    records = []
    hist = Counter()
    total = thin = missing_any = 0
    comp_count = 0

    for fn in sorted(os.listdir(args.corpus)):
        path = os.path.join(args.corpus, fn)
        if not fn.endswith(".md") or not os.path.isfile(path):
            continue
        total += 1
        cls = classify(fn)
        try:
            with open(path, "r", encoding="utf-8", errors="replace") as f:
                text = f.read(MAX_FILE_BYTES)
        except OSError as ex:
            print(f"WARN unreadable {fn}: {ex}", file=sys.stderr)
            continue

        sections = parse_sections(text)
        if cls["is_comp"]:
            comp_count += 1
            continue  # companions ranked separately, not authored here

        sc = score_node(sections)
        rec = {
            "file": fn,
            "size_bytes": os.path.getsize(path),
            "title_hint": sections.get("SCOPE_BOUNDARY", "")[:120],
            **cls,
            **sc,
        }
        records.append(rec)
        bucket = int(sc["thinness"] // 10) * 10
        hist[bucket] += 1
        if sc["thinness"] >= 30:
            thin += 1
        if not sections.get("DEFINITION") or not sections.get("WALKTHROUGH"):
            missing_any += 1

    # Histogram output
    lines = ["thinness_bucket\tnode_count"]
    for b in sorted(hist):
        lines.append(f"{b}-{b + 9}\t{hist[b]}")
    histogram = "\n".join(lines)
    print(histogram)
    print(f"\nTotal .md: {total} | teaching nodes: {len(records)} | "
          f"companion docs: {comp_count}")
    print(f"Thin (score>=30): {thin} | missing DEFINITION or WALKTHROUGH: {missing_any}")

    ranked = sorted(records, key=priority_tuple)
    out_jsonl = os.path.join(args.out, "content_depth_scores.jsonl")
    with open(out_jsonl, "w", encoding="utf-8") as f:
        for r in records:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")

    out_ranked = os.path.join(args.out, "content_depth_thinnest_150.json")
    with open(out_ranked, "w", encoding="utf-8") as f:
        json.dump(ranked[:150], f, ensure_ascii=False, indent=1)

    print(f"Wrote {out_jsonl} and {out_ranked}")
    print("\nTOP 40 THINNEST (priority-ordered):")
    for r in ranked[:40]:
        print(f"  {r['thinness']:5.0f}  {r['file']:<42} "
              f"def={r['detail']['definition']:<14} walk={r['detail']['walkthrough']:<12} "
              f"q={r['diag_q']}")


if __name__ == "__main__":
    main()
