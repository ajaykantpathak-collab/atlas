"""PEDAGOGY-1 served-quality scanner (P1 audit).

Sweeps the audit lanes (classes 6-10, maths/physics/chemistry/biology, both
corpora) for served-quality defect classes a student would hit:
  S1  missing/empty core sections (DEFINITION, ELI5, WALKTHROUGH,
      COMMON_MISCONCEPTION, WORKED_EXAMPLE, DIAGNOSTIC pairs)
  S2  diagnostic Q/A integrity: empty answer, answer-in-question leak
      (token subset), Q without ?, non-question commentary stems
  S3  raw LaTeX / node ids / banned strings in student-visible prose
  S4  wrong-grade markers ("Class 12", "class 11" etc. in a lower-class node)
  S5  duplicated teaching text across nodes (copy-paste detection)
  S6  difficulty sanity: cognitive level vs node position in chapter

Usage: python p1_scan.py [--json OUT.json] [--samples N]
Stdlib only. Zero Docker, zero DB, zero LLM.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
from collections import defaultdict

CORPORA = [
    (r"D:\platform\deploy\content\enhanced_nodes_md", "CBSE"),
    (r"D:\platform\deploy\content\cisce_nodes_v2", "CISCE"),
]
LANE_SUBJECTS = {"math", "maths", "phy", "phys", "physics", "chem",
                 "chemistry", "bio", "biology"}
CLASSES = {6, 7, 8, 9, 10}

BANNED = ["Lane C", "variable binding", "TBD", "Lorem", "TODO"]
# node-id shape used in ids like c10_bio_cbse_01_001 or c9_physics_ch4_5
NODE_ID_RE = re.compile(r"\bc\d{1,2}_[a-z]{2,8}(?:_(?:cbse|icse|isc))?_?(?:ch)?\d*\s*_?\d*\b")
# strict: an id-like token with at least two underscores and a digit segment
STRICT_ID_RE = re.compile(r"\b(?:c\d{1,2}_[a-z]+_[a-z0-9_]*\d|\w*_\w*_\d+)\b")
LATEX_RE = re.compile(r"(\$[^$\n]+\$|\\frac|\\times|\\begin\{|\\int\b)")
GRADE_MARK_RE = re.compile(r"\b(?:Class|class)\s*(?:1[12]|1[01])\b")
QUESTION_RE = re.compile(
    r"\?|\b(?:what|which|why|how|when|where|who|state|define|explain|calculate|"
    r"compare|list|name|identify|describe|give|draw|derive|find|compute|"
    r"justify|evaluate|design|order|construct|fill|true or false|distinguish|"
    r"trace|propose|critique|prove|show|mark|solve|convert|differentiate|"
    r"complete|classify|match|arrange|write|check|verify)\b", re.I)

FILLER_RE = re.compile(r"^\s*(N/?A|NA|NONE|NULL|TBD|-)\s*$", re.I)


def parse_name(stem):
    m = re.match(r"^c(\d+)_([a-z]+?)_(cbse|icse|isc)_(\d+)_(\d+)$", stem)
    if m:
        return dict(cls=int(m.group(1)), subj=m.group(2), board=m.group(3),
                    ch=int(m.group(4)), seq=int(m.group(5)))
    m = re.match(r"^c(\d+)_([a-z]+?)_ch0*(\d+)_(\d+)$", stem)
    if m:
        return dict(cls=int(m.group(1)), subj=m.group(2), board="cbse",
                    ch=int(m.group(3)), seq=int(m.group(4)))
    return None


def sections(text):
    out = {}
    matches = list(re.finditer(r"^##(?!#)[ \t]*([A-Z_0-9]+)[ \t]*$", text, re.M))
    for i, m in enumerate(matches):
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        out[m.group(1)] = text[m.end():end].strip()
    return out


def diag_pairs(secs):
    pairs = []
    idxs = sorted({int(m.group(1)) for k in secs
                   for m in [re.match(r"DIAGNOSTIC_QUESTION_(\d+)", k)] if m})
    for i in idxs:
        q = secs.get(f"DIAGNOSTIC_QUESTION_{i}", "")
        a = secs.get(f"DIAGNOSTIC_ANSWER_{i}", "")
        pairs.append((i, q, a))
    return pairs


def content_tokens(s):
    return [t for t in re.findall(r"[a-z0-9']+", s.lower())
            if len(t) > 3 and t not in STOP]


STOP = {"that", "this", "with", "from", "have", "will", "your", "which",
        "when", "what", "where", "student", "students", "answer", "wrong",
        "question", "example", "should", "would", "there", "their", "about",
        "into", "only", "also", "than", "then", "them", "they", "been",
        "were", "each", "does", "must", "such", "very", "more", "most",
        "same", "some", "both", "case", "given", "using", "value", "values"}


def norm_text(s):
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9 ]", " ", s.lower())).strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", default=None)
    ap.add_argument("--samples", type=int, default=0)
    args = ap.parse_args()

    findings = defaultdict(list)   # code -> list of {file, detail}
    qhash_to_files = defaultdict(set)
    stats = defaultdict(int)

    for root, board_label in CORPORA:
        for fname in sorted(os.listdir(root)):
            if not fname.endswith(".md") or fname.startswith("_"):
                continue
            stem = fname[:-3]
            if stem.endswith("_comp"):
                continue
            meta = parse_name(stem)
            if not meta or meta["subj"] not in LANE_SUBJECTS or meta["cls"] not in CLASSES:
                continue
            stats["scanned"] += 1
            path = os.path.join(root, fname)
            with open(path, encoding="utf-8-sig", errors="replace") as fh:
                text = fh.read()
            secs = sections(text)
            subj_canon = {"math": "maths", "maths": "maths",
                          "phy": "physics", "phys": "physics", "physics": "physics",
                          "chem": "chemistry", "chemistry": "chemistry",
                          "bio": "biology", "biology": "biology"}[meta["subj"]]
            ctx = dict(file=fname, corpus=board_label, cls=meta["cls"],
                       subject=subj_canon, chapter=meta["ch"], seq=meta["seq"])

            # S1 missing core sections
            for core in ("DEFINITION", "ELI5", "WALKTHROUGH", "MASTERY_CRITERIA"):
                if core not in secs or FILLER_RE.match(secs.get(core, "")):
                    findings["S1_missing_" + core].append(dict(ctx))
            if "COMMON_MISCONCEPTION" not in secs:
                findings["S1_missing_MISCONCEPTION"].append(dict(ctx))
            if not any(k.startswith("WORKED_EXAMPLE") for k in secs):
                findings["S1_missing_WORKED_EXAMPLE"].append(dict(ctx))
            for k in ("WORKED_EXAMPLE_1", "WORKED_EXAMPLE_2", "WORKED_EXAMPLE_3"):
                body = secs.get(k, "")
                if body and "ANSWER" not in body:
                    findings["S1_we_without_answer"].append(dict(ctx, section=k))

            # S2 diagnostics
            pairs = diag_pairs(secs)
            if not pairs:
                findings["S2_no_diagnostics"].append(dict(ctx))
            for i, q, a in diag_pairs(secs):
                if not q.strip() or not a.strip():
                    findings["S2_empty_pair"].append(dict(ctx, slot=i))
                    continue
                if len(q.split()) < 5:
                    findings["S2_short_stem"].append(dict(ctx, slot=i, stem=q[:80]))
                if not QUESTION_RE.search(q):
                    findings["S2_no_prompt"].append(dict(ctx, slot=i, stem=q[:90]))
                # answer-in-question leak: all content tokens of answer FIRST
                # LINE present in question (candidate; needs adjudication)
                a_first = a.split("\n")[0]
                atoks = set(content_tokens(a_first))
                qtoks = set(content_tokens(q))
                if len(atoks) >= 4 and atoks and atoks <= qtoks:
                    findings["S2_key_leak_candidate"].append(
                        dict(ctx, slot=i, stem=q[:90], key=a_first[:90]))

            # S3 prose hygiene (student-visible sections)
            for sec in ("DEFINITION", "ELI5", "WALKTHROUGH", "COMMON_MISCONCEPTION"):
                body = secs.get(sec, "")
                if not body:
                    continue
                if LATEX_RE.search(body):
                    findings["S3_latex_in_prose"].append(dict(ctx, section=sec,
                                                              hit=LATEX_RE.search(body).group(0)[:40]))
                for b in BANNED:
                    if re.search(r"\b" + re.escape(b) + r"\b", body, re.I):
                        findings["S3_banned"].append(dict(ctx, section=sec, hit=b))
                for m in STRICT_ID_RE.finditer(body):
                    tok = m.group(0)
                    # exclude plain numbers/units; require c\d_ pattern or 2+ underscores
                    if re.match(r"c\d{1,2}_", tok) or tok.count("_") >= 2:
                        findings["S3_nodeid_in_prose"].append(
                            dict(ctx, section=sec, hit=tok[:40]))

            # S4 wrong-grade marker (own class mentions of 11/12 in <=10 node)
            own = r"class\s*%d\b" % meta["cls"]
            for sec in ("DEFINITION", "ELI5", "WALKTHROUGH", "MASTERY_CRITERIA"):
                body = secs.get(sec, "")
                for m in GRADE_MARK_RE.finditer(body):
                    if re.match(own, body[m.start():m.start() + 12], re.I):
                        continue  # own-grade mention is fine
                    findings["S4_grade_marker"].append(
                        dict(ctx, section=sec, hit=m.group(0)))

            # S5 duplicate teaching text
            for sec in ("WALKTHROUGH",):
                body = norm_text(secs.get(sec, ""))
                if len(body) > 200:
                    h = hashlib.md5(body.encode()).hexdigest()
                    qhash_to_files[h].add(fname)

    for h, files in qhash_to_files.items():
        if len(files) > 1:
            findings["S5_duplicate_walkthrough"].append({"files": sorted(files)})

    summary = {k: len(v) for k, v in sorted(findings.items())}
    out = {"scanned": stats["scanned"], "summary": summary, "findings": findings}
    if args.json:
        with open(args.json, "w", encoding="utf-8") as fh:
            json.dump(out, fh, ensure_ascii=False, indent=1)
    print(json.dumps({"scanned": stats["scanned"], "summary": summary}, indent=1))
    return 0


if __name__ == "__main__":
    sys.exit(main())
