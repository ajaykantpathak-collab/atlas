"""Dump compact structure of batch-1 chapter files for catalog drafting.

Usage: python _b1_survey.py <code> [<code> ...]   e.g. fepr gepr hepr
Writes _b1_survey_<code>.txt next to this script.
"""
import io
import os
import re
import sys

CACHE = "D:/node_generator/ncert-mcp/data/processed/text_cache_new"
OUT = os.path.dirname(os.path.abspath(__file__))

HEAD = re.compile(
    r"^(Let us |EXERCISE|Exercise|Figure it|Intext|INTEXT"
    r"|Activity|Project|Discuss|Think|Check|Key words"
    r"|Vocabulary|Summary|Poem|\d+\.\d+ )")
KEEP = HEAD


def survey(code):
    lines_out = []
    for stem in sorted(os.listdir(CACHE)):
        if not stem.startswith(code) or not stem.endswith(".txt"):
            continue
        path = os.path.join(CACHE, stem)
        with io.open(path, encoding="utf-8", errors="replace") as fh:
            lines = [l.rstrip() for l in fh]
        lines_out.append("=====%s  (%d lines)" % (stem[:-4], len(lines)))
        shown = 0
        for i, l in enumerate(lines):
            s = l.strip()
            if not s:
                continue
            if i < 12:
                lines_out.append("  %4d| %s" % (i, s[:110]))
                shown += 1
                continue
            if KEEP.match(s) and len(s) < 90:
                lines_out.append("  %4d| %s" % (i, s[:110]))
        lines_out.append("")
    return "\n".join(lines_out)


def main():
    for code in sys.argv[1:]:
        txt = survey(code)
        out = os.path.join(OUT, "_b1_survey_%s.txt" % code)
        with io.open(out, "w", encoding="utf-8") as fh:
            fh.write(txt)
        print("wrote", out, len(txt))


if __name__ == "__main__":
    main()
