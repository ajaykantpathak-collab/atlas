"""Batch 5d: sweep remaining LaTeX from FORWARD_REASONS / PREREQUISITE_REASONS /
CROSS_SUBJECT prose across the whole actionable lane (files whose core rubric
sections were already clean were never flagged by the scanner; this closes the
metadata-prose gap). Formula-family sections stay LaTeX by design (KaTeX).
"""

import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from apply_w2 import editable  # noqa: E402
from de_latex import to_plain, residual_report  # noqa: E402

CORPUS = r"D:\platform\deploy\content\enhanced_nodes_md"
SECTION_RE = re.compile(r"^##\s+([A-Z_0-9]+)\s*$", re.M)
LANE = re.compile(r"^c9_(bio|chem|civ|eco|geo|hist|math|physics)_.*\.md$")
TARGETS = ("FORWARD_REASONS", "PREREQUISITE_REASONS", "CROSS_SUBJECT")

edits, residuals = [], []
n_sec = 0
for fn in sorted(os.listdir(CORPUS)):
    if not LANE.match(fn):
        continue
    path = os.path.join(CORPUS, fn)
    text = open(path, encoding="utf-8").read()
    ms = list(SECTION_RE.finditer(text))
    bodies = {}
    for i, m in enumerate(ms):
        name = m.group(1)
        if name not in TARGETS:
            continue
        end = ms[i + 1].start() if i + 1 < len(ms) else len(text)
        body = text[m.end():end].strip()
        if "\\" not in body and "$" not in body:
            continue
        n_sec += 1
        conv = to_plain(body)
        issues = residual_report(conv)
        if issues or conv.strip() == body.strip():
            residuals.append((fn, name, issues))
            continue
        bodies[name] = conv
    if bodies:
        edits.append({"file": fn, "sections": bodies})

with open(os.path.join(HERE, "authoring", "batch5d_metadata_latex.json"), "w",
          encoding="utf-8") as f:
    json.dump({"edits": edits}, f, ensure_ascii=False, indent=1)
print("sections with latex:", n_sec, "| clean conversions:", len(edits),
      "files | residuals:", len(residuals))
for fn, name, iss in residuals:
    print("  RESID", fn, name, iss)
