"""lang_diag_tools.py — LANG-ALL diagnostic rewrite harness.

Two commands:

  dump    — extract compact authoring context (the node's GOOD sections:
            ELI5/DEFINITION/MASTERY/SCOPE heads) for every soup-diagnostic
            file in a class-book group, as JSON the author reads once.
  patch   — apply authored diagnostics JSON ({file: [[q1,a1],[q2,a2],
            [q3,a3]]}) replacing the 6 template-soup DIAGNOSTIC_Q/A
            sections with 3 hand-authored pairs (house format:
            [level|format] question + संकेत/उत्तर/गलत-उत्तर-संकेत answer).

Every authored pair must be grounded in the node's own ELI5/DEFINITION/
WALKTHROUGH text (zero fabrication); the dump exists so the author never
works from memory.

Usage:
  python lang_diag_tools.py dump c7_hin --corpus <dir> --out <json>
  python lang_diag_tools.py patch authored_c7_hin_ch01.json --corpus <dir>
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys

SOUP_MARK = re.compile(
    r"इस नोड के (?:पहलुओं|मुख्य-बिंदुओं|मुख्य बिंदुओं|मुख्य-तत्वों|"
    r"तत्वों)|उदाहरण-सहित विवरण लिखिए|से मिलाइए|व्यवस्थित कीजिए")
QSEC = re.compile(r"## (DIAGNOSTIC_(?:QUESTION|ANSWER)_(\d))\n(.*?)(?=\n## )",
                  re.S)


def is_soup_file(text: str) -> bool:
    qs = re.findall(r"## DIAGNOSTIC_QUESTION_\d\n(.*?)(?=\n## )", text,
                    re.S)
    return bool(qs) and sum(1 for q in qs if SOUP_MARK.search(q)) >= 3


def read(p):
    return open(p, encoding="utf-8").read()


def dump(corpus, group, out):
    pat = re.compile(r"^" + re.escape(group) +
                     r"_(?:cbse|icse|isc|ch\d*)_\d{2}_\d{3}\.md$")
    rows = []
    for f in sorted(os.listdir(corpus)):
        if not pat.match(f):
            continue
        t = read(os.path.join(corpus, f))
        if not is_soup_file(t):
            continue
        row = {"file": f}
        for sec, cap in (("ELI5", 400), ("DEFINITION", 400),
                         ("MASTERY_CRITERIA", 260),
                         ("SCOPE_BOUNDARY", 200),
                         ("COMMON_MISCONCEPTION", 200)):
            m = re.search(r"## " + sec + r"\n(.*?)(?=\n## )", t, re.S)
            if m:
                row[sec] = " ".join(m.group(1).split())[:cap]
        rows.append(row)
    json.dump(rows, open(out, "w", encoding="utf-8"), ensure_ascii=False,
              indent=1)
    print(f"dumped {len(rows)} soup files for {group} -> {out}")


def patch(corpus, authored_path):
    data = json.load(open(authored_path, encoding="utf-8"))
    # accept {file: {pairs: [[q,a],...]}} or {file: [[q,a],...]}
    n_files = 0
    for fname, spec in data.items():
        pairs = spec["pairs"] if isinstance(spec, dict) else spec
        assert 3 <= len(pairs) <= 6, f"{fname}: need 3-6 authored pairs"
        path = os.path.join(corpus, fname)
        t = read(path)
        # verify the file is soup (never patch a clean file)
        assert is_soup_file(t), f"{fname}: not a soup file anymore?"
        levels = {1: "स्मरण", 2: "समझ", 3: "अनुप्रयोग"}
        q_pat = re.compile(r"## DIAGNOSTIC_QUESTION_\d\n(.*?)(?=\n## )",
                           re.S)
        a_pat = re.compile(r"## DIAGNOSTIC_ANSWER_\d\n(.*?)(?=\n## )",
                           re.S)
        # locate the full diagnostic block: from DIAGNOSTIC_QUESTION_1
        # header to the section that follows the last ANSWER section
        first = re.search(r"## DIAGNOSTIC_QUESTION_1\n", t)
        assert first, fname
        after = list(a_pat.finditer(t))
        last = after[-1]
        block_end = last.end()
        # the next '## ' header after the last answer section content
        nxt = re.search(r"\n## ", t[last.end():])
        block_end = last.end() + (nxt.start() if nxt else 0)
        parts = []
        for i, (q, a) in enumerate(pairs, 1):
            parts.append(f"## DIAGNOSTIC_QUESTION_{i}\n"
                         f"[स्तर: {levels.get(i, 'स्मरण')} | प्रारूप: "
                         f"प्रत्यक्ष]\n{q.strip()}\n")
        # interleave answers right after each question (house layout in
        # clean files: QUESTION_n then ANSWER_n sections alternate)
        inter = []
        for i, (q, a) in enumerate(pairs, 1):
            inter.append(f"## DIAGNOSTIC_QUESTION_{i}\n"
                         f"[स्तर: {levels.get(i, 'स्मरण')} | प्रारूप: "
                         f"प्रत्यक्ष]\n{q.strip()}\n\n"
                         f"## DIAGNOSTIC_ANSWER_{i}\n{a.strip()}\n")
        t2 = t[:first.start()] + "\n".join(inter) + "\n\n" + \
            t[block_end:].lstrip("\n")
        open(path, "w", encoding="utf-8").write(t2)
        n_files += 1
    print(f"patched {n_files} files")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("cmd", choices=["dump", "patch"])
    ap.add_argument("target")
    ap.add_argument("--corpus",
                    default=r"D:\platform\deploy\content\enhanced_nodes_md")
    ap.add_argument("--out", default=None)
    a = ap.parse_args()
    if a.cmd == "dump":
        dump(a.corpus, a.target, a.out or f"dump_{a.target}.json")
    else:
        patch(a.corpus, a.target)
