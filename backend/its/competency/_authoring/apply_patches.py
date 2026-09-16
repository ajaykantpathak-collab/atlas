#!/usr/bin/env python3
"""Apply _authoring/patches/*.json and _authoring/patches2/*.json to the
enhanced-nodes markdown corpus (content/enhanced_nodes_md/).

A rewrite {N: {q, a}} replaces the BODY of DIAGNOSTIC_QUESTION_N /
DIAGNOSTIC_ANSWER_N (header line kept).  An append {q, a} adds new sections
numbered after the node's last diagnostic.  Idempotent; a one-time backup of
each modified file is kept under _authoring/md_backup/.
"""
import json
import os
import re
import shutil
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PLATFORM = os.path.normpath(os.path.join(HERE, "..", "..", ".."))
ROOT = os.path.dirname(PLATFORM)
MD_DIR = os.path.join(ROOT, "content", "enhanced_nodes_md")
BACKUP = os.path.join(HERE, "md_backup")

PATCH_DIRS = [os.path.join(HERE, "patches"), os.path.join(HERE, "patches2"),
              os.path.join(HERE, "patches3")]

_ANY_HEADER = re.compile(r"^#{1,3}[ \t]*.+?[ \t]*\**[ \t]*$", re.M)
_DIAG_HEADER = re.compile(r"^#{1,3}[ \t]*DIAGNOSTIC_(?:QUESTION|ANSWER)_(\d+)"
                          r"[ \t]*\**[ \t]*$", re.M)


def load_patches():
    patches = {}
    for pd in PATCH_DIRS:
        if not os.path.isdir(pd):
            continue
        for f in sorted(os.listdir(pd)):
            if f.endswith(".json"):
                with open(os.path.join(pd, f), encoding="utf-8") as fh:
                    patches.update(json.load(fh))
    return patches


def section_body_span(text, name):
    """Return (start, end) span of the BODY of the first section whose header
    line equals `name` (header excluded, next header included as end)."""
    hdr = re.compile(r"^#{1,3}[ \t]*" + re.escape(name) +
                     r"[ \t]*\**[ \t]*$", re.M)
    m = hdr.search(text)
    if not m:
        return None
    nxt = _ANY_HEADER.search(text, m.end())
    body_start = m.end()
    # $ is zero-width: the newline that terminated the header line is NOT
    # part of the match -- skip it so it survives the body replacement.
    if text[body_start:body_start + 1] == "\r":
        body_start += 1
    if text[body_start:body_start + 1] == "\n":
        body_start += 1
    body_end = nxt.start() if nxt else len(text)
    return body_start, body_end


def max_diag_number(text):
    return max((int(m.group(1)) for m in _DIAG_HEADER.finditer(text)),
               default=0)


def main():
    patches = load_patches()
    print(f"{len(patches)} nodes in patch sets")
    changed_files = 0
    missing = []
    problems = []
    for nid, spec in sorted(patches.items()):
        path = os.path.join(MD_DIR, nid + ".md")
        if not os.path.isfile(path):
            missing.append(nid)
            continue
        with open(path, encoding="utf-8") as fh:
            original = fh.read()
        text = original
        for k_str in sorted((spec.get("rewrites") or {}), key=int):
            k = int(k_str)
            d = spec["rewrites"][k_str]
            for kind, val in (("QUESTION", d.get("q")),
                              ("ANSWER", d.get("a"))):
                if val is None:
                    continue
                span = section_body_span(text, f"DIAGNOSTIC_{kind}_{k}")
                if span is None:
                    problems.append(f"{nid}: no DIAGNOSTIC_{kind}_{k}")
                    continue
                text = (text[:span[0]] + val.strip() + "\n\n" +
                        text[span[1]:])
        last = max_diag_number(text)
        appends = spec.get("appends") or []
        if appends:
            n = last
            blocks = []
            for app in appends:
                n += 1
                blocks.append(f"\n## DIAGNOSTIC_QUESTION_{n}\n\n"
                              f"{app['q'].strip()}\n")
                blocks.append(f"\n## DIAGNOSTIC_ANSWER_{n}\n\n"
                              f"{app['a'].strip()}\n")
            text = text.rstrip("\n") + "\n" + "".join(blocks)
        if text != original:
            os.makedirs(BACKUP, exist_ok=True)
            bak = os.path.join(BACKUP, nid + ".md")
            if not os.path.isfile(bak):
                shutil.copy2(path, bak)
            with open(path, "w", encoding="utf-8", newline="\n") as fh:
                fh.write(text)
            changed_files += 1
    print(f"modified {changed_files} files")
    if missing:
        print("MISSING NODE FILES:", missing)
    if problems:
        print("PROBLEMS:")
        for p in problems:
            print(" ", p)


if __name__ == "__main__":
    sys.exit(main())
